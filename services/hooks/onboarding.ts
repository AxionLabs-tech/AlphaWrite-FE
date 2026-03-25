"use client";

import { useState, useCallback } from "react";
import { onboardingApi } from "../modules/onboarding";
import type { SurveyRequest } from "../dtos/onboarding";
import { ApiError } from "../apiClient";

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

export interface UseSubmitSurveyResult {
  submitSurvey: (body: SurveyRequest) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useSubmitSurvey(): UseSubmitSurveyResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitSurvey = useCallback(async (body: SurveyRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      await onboardingApi.submitSurvey(body);
    } catch (e) {
      setError(getErrorMessage(e, "Something went wrong"));
      throw e;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetError = useCallback(() => setError(null), []);

  return { submitSurvey, isLoading, error, resetError };
}
