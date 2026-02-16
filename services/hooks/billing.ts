"use client";

import { useState, useCallback, useEffect } from "react";
import { billingApi } from "../modules/billing";
import type {
  SubscriptionStatusResponse,
  CheckSubscriptionResponse,
  CancelSubscriptionBody,
  PaymentSuccessResponse,
} from "../dtos/billing";
import { ApiError } from "../apiClient";
import { useAuthOptional } from "./auth";

function getErrorMessage(e: unknown, fallback: string): string {
  if (!(e instanceof ApiError) || typeof e.body !== "object" || e.body === null || !("detail" in e.body)) {
    return e instanceof Error ? e.message : fallback;
  }
  const detail = (e.body as { detail: unknown }).detail;
  return typeof detail === "string" ? detail : fallback;
}

// --- useCreateCheckoutSession ---
export interface UseCreateCheckoutSessionResult {
  createCheckoutSession: (params: { plan: string; billing_interval?: "weekly" | "monthly" | "yearly" }) => Promise<{ url: string } | null>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useCreateCheckoutSession(): UseCreateCheckoutSessionResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCheckoutSession = useCallback(
    async (params: { plan: string; billing_interval?: "weekly" | "monthly" | "yearly" }) => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await billingApi.createCheckoutSession(params);
        if (res.url) window.location.href = res.url;
        return { url: res.url };
      } catch (e) {
        setError(getErrorMessage(e, "Failed to start checkout."));
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const resetError = useCallback(() => setError(null), []);

  return { createCheckoutSession, isLoading, error, resetError };
}

// --- useSubscriptionStatus ---
export interface UseSubscriptionStatusResult {
  data: SubscriptionStatusResponse | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  resetError: () => void;
}

export function useSubscriptionStatus(options?: { enabled?: boolean }): UseSubscriptionStatusResult {
  const auth = useAuthOptional();
  const enabled = options?.enabled !== false;
  const [data, setData] = useState<SubscriptionStatusResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(
    async (retryAfterRefresh = false) => {
      setError(null);
      setIsLoading(true);
      try {
        const res = await billingApi.getSubscriptionStatus();
        setData(res);
      } catch (e) {
        if (!retryAfterRefresh && e instanceof ApiError && e.status === 401 && auth?.refreshSession) {
          try {
            await auth.refreshSession();
            await fetchStatus(true);
            return;
          } catch {
            // refresh failed, fall through to set error
          }
        }
        setError(getErrorMessage(e, "Failed to load subscription status."));
        setData(null);
      } finally {
        setIsLoading(false);
      }
    },
    [auth?.refreshSession]
  );

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      setData(null);
      return;
    }
    // Delay one tick so AuthContext's setTokenGetter effect has run and the new token is in the getter
    const t = setTimeout(() => {
      void fetchStatus();
    }, 0);
    return () => clearTimeout(t);
  }, [enabled, fetchStatus]);

  const resetError = useCallback(() => setError(null), []);

  return { data, isLoading, error, refetch: () => fetchStatus(), resetError };
}

// --- useCheckSubscription ---
export interface UseCheckSubscriptionResult {
  checkSubscription: (params?: { token?: string | null }) => Promise<CheckSubscriptionResponse | null>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useCheckSubscription(): UseCheckSubscriptionResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkSubscription = useCallback(async (params?: { token?: string | null }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await billingApi.checkSubscription(params);
      return res;
    } catch (e) {
      setError(getErrorMessage(e, "Failed to check subscription."));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetError = useCallback(() => setError(null), []);

  return { checkSubscription, isLoading, error, resetError };
}

// --- usePaymentSuccess ---
export interface UsePaymentSuccessResult {
  paymentSuccess: (body: { session_id: string }) => Promise<PaymentSuccessResponse | null>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function usePaymentSuccess(): UsePaymentSuccessResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const paymentSuccess = useCallback(async (body: { session_id: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await billingApi.paymentSuccess(body);
      return res;
    } catch (e) {
      setError(getErrorMessage(e, "Payment confirmation failed."));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetError = useCallback(() => setError(null), []);

  return { paymentSuccess, isLoading, error, resetError };
}

// --- useCancelSubscription ---
export interface UseCancelSubscriptionResult {
  cancelSubscription: (body: CancelSubscriptionBody) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useCancelSubscription(): UseCancelSubscriptionResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cancelSubscription = useCallback(async (body: CancelSubscriptionBody) => {
    setIsLoading(true);
    setError(null);
    try {
      await billingApi.cancelSubscription(body);
      return true;
    } catch (e) {
      setError(getErrorMessage(e, "Failed to cancel subscription."));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetError = useCallback(() => setError(null), []);

  return { cancelSubscription, isLoading, error, resetError };
}

// --- useReactivateSubscription ---
export interface UseReactivateSubscriptionResult {
  reactivateSubscription: () => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useReactivateSubscription(): UseReactivateSubscriptionResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reactivateSubscription = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await billingApi.reactivateSubscription();
      return true;
    } catch (e) {
      setError(getErrorMessage(e, "Failed to reactivate subscription."));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetError = useCallback(() => setError(null), []);

  return { reactivateSubscription, isLoading, error, resetError };
}
