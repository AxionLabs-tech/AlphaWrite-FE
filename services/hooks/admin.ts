"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { adminApi } from "../modules/admin";
import { ApiError } from "../apiClient";
import type {
  AdminLoginBody,
  AdminLoginResponse,
  AdminVerifyTotpBody,
  AdminVerifyRecoveryBody,
  AdminAuthResponse,
  AdminStatsResponse,
  AdminUser,
  AdminUsersParams,
} from "../dtos/admin";

function getErrorMessage(e: unknown, fallback: string): string {
  if (!(e instanceof ApiError) || typeof e.body !== "object" || e.body === null || !("detail" in e.body)) {
    return e instanceof Error ? e.message : fallback;
  }
  const detail = (e.body as { detail: unknown }).detail;
  return typeof detail === "string" ? detail : fallback;
}

// ── Action hooks ──

export interface UseAdminLoginResult {
  login: (body: AdminLoginBody) => Promise<AdminLoginResponse | null>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useAdminLogin(): UseAdminLoginResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (body: AdminLoginBody) => {
    setIsLoading(true);
    setError(null);
    try {
      return await adminApi.adminLogin(body);
    } catch (e) {
      setError(getErrorMessage(e, "Login failed."));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { login, isLoading, error, resetError: useCallback(() => setError(null), []) };
}

export interface UseAdminVerifyTotpResult {
  verifyTotp: (body: AdminVerifyTotpBody) => Promise<AdminAuthResponse | null>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useAdminVerifyTotp(): UseAdminVerifyTotpResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyTotp = useCallback(async (body: AdminVerifyTotpBody) => {
    setIsLoading(true);
    setError(null);
    try {
      return await adminApi.adminVerifyTotp(body);
    } catch (e) {
      setError(getErrorMessage(e, "TOTP verification failed."));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { verifyTotp, isLoading, error, resetError: useCallback(() => setError(null), []) };
}

export interface UseAdminVerifyRecoveryResult {
  verifyRecovery: (body: AdminVerifyRecoveryBody) => Promise<AdminAuthResponse | null>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useAdminVerifyRecovery(): UseAdminVerifyRecoveryResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyRecovery = useCallback(async (body: AdminVerifyRecoveryBody) => {
    setIsLoading(true);
    setError(null);
    try {
      return await adminApi.adminVerifyRecovery(body);
    } catch (e) {
      setError(getErrorMessage(e, "Recovery code verification failed."));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { verifyRecovery, isLoading, error, resetError: useCallback(() => setError(null), []) };
}

export interface UseUpdateUserPlanResult {
  updatePlan: (email: string, newPlan: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useUpdateUserPlan(): UseUpdateUserPlanResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePlan = useCallback(async (email: string, newPlan: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await adminApi.updateUserPlan({ email, new_plan: newPlan });
      return true;
    } catch (e) {
      setError(getErrorMessage(e, "Failed to update user plan."));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { updatePlan, isLoading, error, resetError: useCallback(() => setError(null), []) };
}

export interface UseSendEmailResult {
  sendEmail: (fields: { to: string; subject: string; body: string; image?: File }) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useSendEmail(): UseSendEmailResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendEmail = useCallback(async (fields: { to: string; subject: string; body: string; image?: File }) => {
    setIsLoading(true);
    setError(null);
    try {
      await adminApi.sendEmail(fields);
      return true;
    } catch (e) {
      setError(getErrorMessage(e, "Failed to send email."));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { sendEmail, isLoading, error, resetError: useCallback(() => setError(null), []) };
}

export interface UseBulkEmailResult {
  sendBulkEmail: (fields: { subject: string; body: string; user_emails: string[]; image?: File }) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useBulkEmail(): UseBulkEmailResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendBulkEmail = useCallback(async (fields: { subject: string; body: string; user_emails: string[]; image?: File }) => {
    setIsLoading(true);
    setError(null);
    try {
      await adminApi.bulkEmail(fields);
      return true;
    } catch (e) {
      setError(getErrorMessage(e, "Failed to send bulk email."));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { sendBulkEmail, isLoading, error, resetError: useCallback(() => setError(null), []) };
}

export interface UseSendWelcomeEmailResult {
  sendWelcome: (email: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useSendWelcomeEmail(): UseSendWelcomeEmailResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendWelcome = useCallback(async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await adminApi.sendWelcomeEmail({ email });
      return true;
    } catch (e) {
      setError(getErrorMessage(e, "Failed to send welcome email."));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { sendWelcome, isLoading, error, resetError: useCallback(() => setError(null), []) };
}

export interface UseUpdateCreditsResult {
  updateCredits: () => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useUpdateCredits(): UseUpdateCreditsResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateCredits = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await adminApi.updateCredits();
      return true;
    } catch (e) {
      setError(getErrorMessage(e, "Failed to update credits."));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { updateCredits, isLoading, error, resetError: useCallback(() => setError(null), []) };
}

export interface UseUpdateSubscriptionsResult {
  updateSubscriptions: () => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useUpdateSubscriptions(): UseUpdateSubscriptionsResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateSubscriptions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await adminApi.updateSubscriptions();
      return true;
    } catch (e) {
      setError(getErrorMessage(e, "Failed to update subscriptions."));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { updateSubscriptions, isLoading, error, resetError: useCallback(() => setError(null), []) };
}

// ── Auto-fetch hooks ──

export interface UseAdminStatsResult {
  data: AdminStatsResponse | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  resetError: () => void;
}

export function useAdminStats(): UseAdminStatsResult {
  const [data, setData] = useState<AdminStatsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  const fetchStats = useCallback(async () => {
    setError(null);
    if (!hasFetched.current) setIsLoading(true);
    try {
      const res = await adminApi.getStats();
      setData(res);
      hasFetched.current = true;
    } catch (e) {
      setError(getErrorMessage(e, "Failed to load stats."));
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchStats();
  }, [fetchStats]);

  return { data, isLoading, error, refetch: fetchStats, resetError: useCallback(() => setError(null), []) };
}

export interface UseAdminUsersResult {
  data: AdminUser[] | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  resetError: () => void;
}

export function useAdminUsers(params?: AdminUsersParams): UseAdminUsersResult {
  const [data, setData] = useState<AdminUser[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  const skip = params?.skip;
  const limit = params?.limit;
  const planType = params?.plan_type;
  const subStatus = params?.subscription_status;

  const fetchUsers = useCallback(async () => {
    setError(null);
    if (!hasFetched.current) setIsLoading(true);
    try {
      const res = await adminApi.getUsers({ skip, limit, plan_type: planType, subscription_status: subStatus });
      setData(res);
      hasFetched.current = true;
    } catch (e) {
      setError(getErrorMessage(e, "Failed to load users."));
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [skip, limit, planType, subStatus]);

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  return { data, isLoading, error, refetch: fetchUsers, resetError: useCallback(() => setError(null), []) };
}
