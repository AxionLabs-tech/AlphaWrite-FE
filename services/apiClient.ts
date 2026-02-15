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

export const apiClient = {
  get,
  post,
  put,
  patch,
  delete: del,
};
