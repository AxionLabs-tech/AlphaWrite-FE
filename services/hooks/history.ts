"use client";

import { useState, useCallback } from "react";
import { historyApi } from "../modules/history";
import type {
  UserHistoryResponse,
  UserHistoryParams,
} from "../dtos/history";
import { ApiError } from "../apiClient";
import { useAuthOptional } from "./auth";

function getErrorMessage(e: unknown, fallback: string): string {
  if (!(e instanceof ApiError) || typeof e.body !== "object" || e.body === null || !("detail" in e.body)) {
    return e instanceof Error ? e.message : fallback;
  }
  const detail = (e.body as { detail: unknown }).detail;
  return typeof detail === "string" ? detail : fallback;
}

// --- useUserHistory ---
export interface UseUserHistoryResult {
  data: UserHistoryResponse | null;
  isLoading: boolean;
  error: string | null;
  fetchHistory: (params?: UserHistoryParams) => Promise<UserHistoryResponse | null>;
  resetError: () => void;
}

export function useUserHistory(): UseUserHistoryResult {
  const auth = useAuthOptional();
  const [data, setData] = useState<UserHistoryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(
    async (params?: UserHistoryParams, retryAfterRefresh = false): Promise<UserHistoryResponse | null> => {
      setError(null);
      setIsLoading(true);
      try {
        const res = await historyApi.getUserHistory(params);
        setData(res);
        return res;
      } catch (e) {
        if (!retryAfterRefresh && e instanceof ApiError && e.status === 401 && auth?.refreshSession) {
          try {
            await auth.refreshSession();
            return fetchHistory(params, true);
          } catch {
            // refresh failed
          }
        }
        setError(getErrorMessage(e, "Failed to load history."));
        setData(null);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [auth?.refreshSession],
  );

  const resetError = useCallback(() => setError(null), []);

  return { data, isLoading, error, fetchHistory, resetError };
}
