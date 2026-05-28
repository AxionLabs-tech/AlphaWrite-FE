/**
 * Base API client for backend requests.
 * Uses NEXT_PUBLIC_API_URL or relative /api for server-side.
 * Call setTokenGetter so authenticated requests send Authorization: Bearer <token>.
 */

let tokenGetter: (() => string | null) | null = null;

export function setTokenGetter(getter: (() => string | null) | null): void {
  tokenGetter = getter;
}

function getAuthHeaders(init?: RequestInit): HeadersInit {
  const token = tokenGetter?.() ?? null;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
    ...(init?.headers as Record<string, string>),
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL ?? "";
  }
  return process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL ?? "";
};

export interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const body = isJson ? await res.json().catch(() => ({})) : await res.text();

  if (!res.ok) {
    let message = res.statusText;
    if (isJson && typeof body === "object" && body !== null) {
      const b = body as Record<string, unknown>;
      if (typeof b.message === "string") message = b.message;
      else if (typeof b.detail === "string") message = b.detail;
    }
    throw new ApiError(message, res.status, body);
  }

  return body as T;
}

/**
 * GET request
 */
export async function get<T>(path: string, config: RequestConfig = {}): Promise<T> {
  const { params, ...init } = config;
  const base = getBaseUrl();
  const url = new URL(path.startsWith("http") ? path : `${base}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const res = await fetch(url.toString(), {
    ...init,
    method: "GET",
    headers: getAuthHeaders(init),
    credentials: "include",
  });
  return handleResponse<T>(res);
}

/**
 * POST request
 */
export async function post<T, B = unknown>(
  path: string,
  body?: B,
  config: RequestConfig = {}
): Promise<T> {
  const base = getBaseUrl();
  const url = `${base}${path}`;
  const res = await fetch(url, {
    ...config,
    method: "POST",
    headers: getAuthHeaders(config),
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: "include",
  });
  return handleResponse<T>(res);
}

/**
 * PUT request
 */
export async function put<T, B = unknown>(
  path: string,
  body?: B,
  config: RequestConfig = {}
): Promise<T> {
  const base = getBaseUrl();
  const url = `${base}${path}`;
  const res = await fetch(url, {
    ...config,
    method: "PUT",
    headers: getAuthHeaders(config),
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: "include",
  });
  return handleResponse<T>(res);
}

/**
 * PATCH request
 */
export async function patch<T, B = unknown>(
  path: string,
  body?: B,
  config: RequestConfig = {}
): Promise<T> {
  const base = getBaseUrl();
  const url = `${base}${path}`;
  const res = await fetch(url, {
    ...config,
    method: "PATCH",
    headers: getAuthHeaders(config),
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: "include",
  });
  return handleResponse<T>(res);
}

/**
 * DELETE request
 */
export async function del<T>(path: string, config: RequestConfig = {}): Promise<T> {
  const base = getBaseUrl();
  const url = `${base}${path}`;
  const res = await fetch(url, {
    ...config,
    method: "DELETE",
    headers: getAuthHeaders(config),
    credentials: "include",
  });
  return handleResponse<T>(res);
}

/**
 * POST with a Server-Sent Events response.
 * Parses `data: {json}\n\n` frames and invokes onEvent for each parsed payload.
 * Throws ApiError if the initial response is non-2xx (before any stream data arrives).
 */
export async function postStream<TEvent, TBody = unknown>(
  path: string,
  body: TBody,
  options: {
    onEvent: (event: TEvent) => void;
    signal?: AbortSignal;
    config?: RequestConfig;
  }
): Promise<void> {
  const { onEvent, signal, config = {} } = options;
  const base = getBaseUrl();
  const url = `${base}${path}`;
  const res = await fetch(url, {
    ...config,
    method: "POST",
    headers: getAuthHeaders(config),
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: "include",
    signal,
  });

  if (!res.ok) {
    // Drain the response body so we can surface a useful error message
    const contentType = res.headers.get("content-type");
    const isJson = contentType?.includes("application/json");
    const errBody = isJson
      ? await res.json().catch(() => ({}))
      : await res.text().catch(() => "");
    let message = res.statusText;
    if (isJson && typeof errBody === "object" && errBody !== null) {
      const b = errBody as Record<string, unknown>;
      if (typeof b.detail === "string") message = b.detail;
      else if (typeof b.message === "string") message = b.message;
    }
    throw new ApiError(message, res.status, errBody);
  }

  if (!res.body) {
    throw new ApiError("Response has no body", 500);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // SSE frames are separated by a blank line. Split, keep the trailing partial.
    const frames = buffer.split("\n\n");
    buffer = frames.pop() ?? "";

    for (const frame of frames) {
      // A frame can contain multiple lines (comment :, event:, data:); only data lines matter here.
      for (const line of frame.split("\n")) {
        if (!line.startsWith("data:")) continue;
        const payload = line.slice(5).trimStart();
        if (!payload) continue;
        try {
          onEvent(JSON.parse(payload) as TEvent);
        } catch {
          // Ignore malformed frames rather than killing the stream
        }
      }
    }
  }
}

export const apiClient = {
  get,
  post,
  put,
  patch,
  delete: del,
  postStream,
};

/**
 * Build the auth headers used by JSON requests — re-exported for callers that
 * need to issue raw fetches (e.g. multipart uploads where Content-Type must be
 * left alone for the browser to set the boundary).
 */
export function buildAuthHeaders(extra?: Record<string, string>): Record<string, string> {
  const token = tokenGetter?.() ?? null;
  const headers: Record<string, string> = {
    "ngrok-skip-browser-warning": "true",
    ...(extra ?? {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export function buildUrl(path: string): string {
  const base = getBaseUrl();
  return path.startsWith("http") ? path : `${base}${path}`;
}
