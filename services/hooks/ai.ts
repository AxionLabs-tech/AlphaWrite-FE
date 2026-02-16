"use client";

import { useState, useCallback } from "react";
import { aiApi } from "../modules/ai";
import type { DetectAiBody, DetectAiResponse, ParaphraseBody, ParaphraseResponse } from "../dtos/ai";
import { ApiError } from "../apiClient";

function getErrorMessage(e: unknown, fallback: string): string {
  if (!(e instanceof ApiError) || typeof e.body !== "object" || e.body === null || !("detail" in e.body)) {
    return e instanceof Error ? e.message : fallback;
  }
  const detail = (e.body as { detail: unknown }).detail;
  return typeof detail === "string" ? detail : fallback;
}

// --- useDetectAi ---
export interface UseDetectAiResult {
  detectAi: (body: DetectAiBody) => Promise<DetectAiResponse>;
  isDetecting: boolean;
  error: string | null;
  resetError: () => void;
}

export function useDetectAi(): UseDetectAiResult {
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detectAi = useCallback(async (body: DetectAiBody): Promise<DetectAiResponse> => {
    setIsDetecting(true);
    setError(null);
    try {
      const result = await aiApi.detectAi(body);
      return result;
    } catch (e) {
      setError(getErrorMessage(e, "AI detection failed."));
      throw e;
    } finally {
      setIsDetecting(false);
    }
  }, []);

  const resetError = useCallback(() => setError(null), []);

  return { detectAi, isDetecting, error, resetError };
}

// --- useParaphrase ---
export interface UseParaphraseResult {
  paraphrase: (body: ParaphraseBody) => Promise<ParaphraseResponse>;
  isParaphrasing: boolean;
  error: string | null;
  resetError: () => void;
}

export function useParaphrase(): UseParaphraseResult {
  const [isParaphrasing, setIsParaphrasing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const paraphrase = useCallback(async (body: ParaphraseBody): Promise<ParaphraseResponse> => {
    setIsParaphrasing(true);
    setError(null);
    try {
      const result = await aiApi.paraphrase(body);
      return result;
    } catch (e) {
      setError(getErrorMessage(e, "Paraphrase failed."));
      throw e;
    } finally {
      setIsParaphrasing(false);
    }
  }, []);

  const resetError = useCallback(() => setError(null), []);

  return { paraphrase, isParaphrasing, error, resetError };
}
