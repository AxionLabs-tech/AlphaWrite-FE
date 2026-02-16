"use client";

import { useState, useCallback } from "react";
import { authApi } from "../modules/auth";
import type { RequestLoginBody } from "../dtos/auth";
import { ApiError } from "../apiClient";

// Re-export context hooks
export { useAuth, useAuthOptional } from "@/app/context/AuthContext";

// --- Error helper ---
function getErrorMessage(
  e: unknown,
  fallback: string
): string {
  if (!(e instanceof ApiError) || typeof e.body !== "object" || e.body === null || !("detail" in e.body)) {
    return e instanceof Error ? e.message : fallback;
  }
  const detail = (e.body as { detail: unknown }).detail;
  return typeof detail === "string" ? detail : fallback;
}

// --- useRequestLogin ---
export interface UseRequestLoginResult {
  requestLogin: (body: RequestLoginBody) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useRequestLogin(): UseRequestLoginResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLogin = useCallback(async (body: RequestLoginBody) => {
    setIsLoading(true);
    setError(null);
    try {
      await authApi.requestLogin(body);
    } catch (e) {
      setError(getErrorMessage(e, "Something went wrong"));
      throw e;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetError = useCallback(() => setError(null), []);

  return { requestLogin, isLoading, error, resetError };
}

// --- useGoogleAuth ---
export interface UseGoogleAuthResult {
  signInWithGoogle: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useGoogleAuth(): UseGoogleAuthResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithGoogle = useCallback(async () => {
    if (typeof window === "undefined") return;
    setIsLoading(true);
    setError(null);
    try {
      const { url, state, code_verifier } = await authApi.getGoogleAuthUrl();
      try {
        sessionStorage.setItem("alphawrite_oauth_state", state);
        sessionStorage.setItem("alphawrite_oauth_code_verifier", code_verifier);
      } catch {
        // sessionStorage full or private mode
      }
      window.location.href = url;
    } catch (e) {
      setError(getErrorMessage(e, "Failed to start Google sign-in"));
      setIsLoading(false);
    }
  }, []);

  const resetError = useCallback(() => setError(null), []);

  return { signInWithGoogle, isLoading, error, resetError };
}

// --- useLogout ---
export interface UseLogoutResult {
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

/**
 * Calls POST /api/v1/auth/logout.
 * On success, call auth context's signOut() to clear local state.
 */
export function useLogout(): UseLogoutResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await authApi.logout();
    } catch (e) {
      setError(getErrorMessage(e, "Failed to log out"));
      throw e;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetError = useCallback(() => setError(null), []);

  return { logout, isLoading, error, resetError };
}
