/**
 * Admin-specific API client.
 * Uses a separate admin token (cookie-based) instead of the user auth token.
 * On 401 → auto-redirects to /admin/login.
 */

import { ApiError } from "./apiClient";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL ?? "";
  }
  return process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL ?? "";
};

function getAdminAuthHeaders(): Record<string, string> {
  // Dynamic import to avoid circular deps — the getter is sync so we import eagerly at call time
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { getAdminToken } = require("@/app/utils/adminAuth") as {
    getAdminToken: () => string | null;
  };
  const token = getAdminToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

async function handleResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const body = isJson ? await res.json().catch(() => ({})) : await res.text();

  if (!res.ok) {
    // On 401, clear admin session and redirect to login
    if (res.status === 401 && typeof window !== "undefined") {
      const { logoutAdmin } = await import("@/app/utils/adminAuth");
      logoutAdmin();
      throw new ApiError("Unauthorized", 401, body);
    }

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

export async function adminGet<T>(path: string, params?: Record<string, string>): Promise<T> {
  const base = getBaseUrl();
  const url = new URL(path.startsWith("http") ? path : `${base}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const res = await fetch(url.toString(), {
    method: "GET",
    headers: getAdminAuthHeaders(),
    credentials: "include",
  });
  return handleResponse<T>(res);
}

export async function adminPost<T, B = unknown>(path: string, body?: B): Promise<T> {
  const base = getBaseUrl();
  const url = `${base}${path}`;
  const res = await fetch(url, {
    method: "POST",
    headers: getAdminAuthHeaders(),
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: "include",
  });
  return handleResponse<T>(res);
}

export async function adminPostForm<T>(path: string, formData: FormData): Promise<T> {
  const base = getBaseUrl();
  const url = `${base}${path}`;
  // Don't set Content-Type — browser sets it with boundary automatically
  const headers: Record<string, string> = {
    "ngrok-skip-browser-warning": "true",
  };
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { getAdminToken } = require("@/app/utils/adminAuth") as {
    getAdminToken: () => string | null;
  };
  const token = getAdminToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: formData,
    credentials: "include",
  });
  return handleResponse<T>(res);
}
