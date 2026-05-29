/**
 * Style Fingerprint API module.
 * Base URL is expected to include /api/v1.
 * upload-samples uses raw fetch because it's multipart — we must not set Content-Type
 * (the browser sets it with the boundary).
 */

import { get, del, buildAuthHeaders, buildUrl, ApiError } from "../apiClient";
import type {
  UploadStyleSamplesResponse,
  StyleFingerprintResponse,
  DeleteStyleFingerprintResponse,
} from "../dtos/style";

const STYLE_ENDPOINTS = {
  uploadSamples: "/style/upload-samples",
  fingerprint: "/style/fingerprint",
} as const;

async function handleMultipartResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const body = isJson ? await res.json().catch(() => ({})) : await res.text();
  if (!res.ok) {
    let message = res.statusText;
    if (isJson && typeof body === "object" && body !== null) {
      const b = body as Record<string, unknown>;
      if (typeof b.detail === "string") message = b.detail;
      else if (typeof b.message === "string") message = b.message;
    }
    throw new ApiError(message, res.status, body);
  }
  return body as T;
}

/** POST /style/upload-samples – multipart upload of 2–3 writing samples. */
export async function uploadStyleSamples(
  files: File[]
): Promise<UploadStyleSamplesResponse> {
  const form = new FormData();
  for (const file of files) form.append("files", file);
  const res = await fetch(buildUrl(STYLE_ENDPOINTS.uploadSamples), {
    method: "POST",
    headers: buildAuthHeaders(),
    body: form,
    credentials: "include",
  });
  return handleMultipartResponse<UploadStyleSamplesResponse>(res);
}

/** GET /style/fingerprint – fetch the user's current fingerprint. 404 if never uploaded. */
export async function getStyleFingerprint(): Promise<StyleFingerprintResponse> {
  return get<StyleFingerprintResponse>(STYLE_ENDPOINTS.fingerprint);
}

/** DELETE /style/fingerprint – irreversible removal of profile + samples. */
export async function deleteStyleFingerprint(): Promise<DeleteStyleFingerprintResponse> {
  return del<DeleteStyleFingerprintResponse>(STYLE_ENDPOINTS.fingerprint);
}

export const styleApi = {
  uploadStyleSamples,
  getStyleFingerprint,
  deleteStyleFingerprint,
};
