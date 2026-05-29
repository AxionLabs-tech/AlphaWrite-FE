"use client";

import { useCallback, useState } from "react";
import { styleApi } from "../modules/style";
import type {
  UploadStyleSamplesResponse,
  StyleFingerprintResponse,
  DeleteStyleFingerprintResponse,
} from "../dtos/style";
import { ApiError } from "../apiClient";
import { useAuthOptional } from "./auth";

function getErrorMessage(e: unknown, fallback: string): string {
  if (
    !(e instanceof ApiError) ||
    typeof e.body !== "object" ||
    e.body === null ||
    !("detail" in e.body)
  ) {
    return e instanceof Error ? e.message : fallback;
  }
  const detail = (e.body as { detail: unknown }).detail;
  return typeof detail === "string" ? detail : fallback;
}

// --- useUploadStyleSamples ---

export interface UseUploadStyleSamplesResult {
  upload: (files: File[]) => Promise<UploadStyleSamplesResponse>;
  isUploading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useUploadStyleSamples(): UseUploadStyleSamplesResult {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(
    async (files: File[]): Promise<UploadStyleSamplesResponse> => {
      setIsUploading(true);
      setError(null);
      try {
        return await styleApi.uploadStyleSamples(files);
      } catch (e) {
        setError(getErrorMessage(e, "Style analysis failed."));
        throw e;
      } finally {
        setIsUploading(false);
      }
    },
    []
  );

  const resetError = useCallback(() => setError(null), []);
  return { upload, isUploading, error, resetError };
}

// --- useStyleFingerprint ---
// Returns null data on 404 (user has never uploaded). Other errors surface in `error`.

export interface UseStyleFingerprintResult {
  data: StyleFingerprintResponse | null;
  notFound: boolean;
  isLoading: boolean;
  error: string | null;
  fetchFingerprint: () => Promise<StyleFingerprintResponse | null>;
  resetError: () => void;
}

export function useStyleFingerprint(): UseStyleFingerprintResult {
  const auth = useAuthOptional();
  const [data, setData] = useState<StyleFingerprintResponse | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFingerprint = useCallback(
    async (retryAfterRefresh = false): Promise<StyleFingerprintResponse | null> => {
      setError(null);
      setIsLoading(true);
      try {
        const res = await styleApi.getStyleFingerprint();
        setData(res);
        setNotFound(false);
        return res;
      } catch (e) {
        if (e instanceof ApiError && e.status === 404) {
          setData(null);
          setNotFound(true);
          return null;
        }
        if (
          !retryAfterRefresh &&
          e instanceof ApiError &&
          e.status === 401 &&
          auth?.refreshSession
        ) {
          try {
            await auth.refreshSession();
            return fetchFingerprint(true);
          } catch {
            // refresh failed
          }
        }
        setError(getErrorMessage(e, "Failed to load style fingerprint."));
        setData(null);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [auth?.refreshSession]
  );

  const resetError = useCallback(() => setError(null), []);
  return { data, notFound, isLoading, error, fetchFingerprint, resetError };
}

// --- useDeleteStyleFingerprint ---

export interface UseDeleteStyleFingerprintResult {
  remove: () => Promise<DeleteStyleFingerprintResponse>;
  isDeleting: boolean;
  error: string | null;
  resetError: () => void;
}

export function useDeleteStyleFingerprint(): UseDeleteStyleFingerprintResult {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (): Promise<DeleteStyleFingerprintResponse> => {
    setIsDeleting(true);
    setError(null);
    try {
      return await styleApi.deleteStyleFingerprint();
    } catch (e) {
      setError(getErrorMessage(e, "Failed to delete style fingerprint."));
      throw e;
    } finally {
      setIsDeleting(false);
    }
  }, []);

  const resetError = useCallback(() => setError(null), []);
  return { remove, isDeleting, error, resetError };
}
