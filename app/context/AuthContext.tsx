"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Cookies from "js-cookie";
import type { User } from "@/services/dtos";
import type { AuthUser, LoginResponse } from "@/services/dtos/auth";
import type { RefreshResponse } from "@/services/dtos/auth";
import type { PaymentSuccessResponse } from "@/services/dtos/billing";
import { setTokenGetter } from "@/services/apiClient";
import { authApi } from "@/services/modules/auth";

const COOKIE_OPTS = { expires: 7, path: "/", sameSite: "Lax" as const };
const SESSION_STORAGE_KEY = "alphawrite_session";

interface StoredSession {
  access_token: string;
  refresh_token: string;
  user: AuthUser;
}

function setSessionCookies(data: StoredSession) {
  if (typeof window === "undefined") return;
  Cookies.set("alphawriteToken", data.access_token, COOKIE_OPTS);
  Cookies.set("alphawriteRefreshToken", data.refresh_token, COOKIE_OPTS);
  Cookies.set("alphawriteUserId", data.user.id, COOKIE_OPTS);
  Cookies.set("alphawriteUserName", data.user.name ?? "", COOKIE_OPTS);
  Cookies.set("alphawriteAvatarUrl", data.user.avatar_url ?? "", COOKIE_OPTS);
  Cookies.set("alphawriteEmail", data.user.email, COOKIE_OPTS);
  Cookies.set("alphawritePlan", data.user.plan_type, COOKIE_OPTS);
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage full or disabled
  }
}

function clearSessionCookies() {
  if (typeof window === "undefined") return;
  ["alphawriteToken", "alphawriteRefreshToken", "alphawriteUserId", "alphawriteUserName", "alphawriteAvatarUrl", "alphawriteEmail", "alphawritePlan"].forEach((name) => Cookies.remove(name, { path: "/" }));
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    // ignore
  }
}

function authUserToUser(a: AuthUser): User {
  return {
    id: a.id,
    email: a.email,
    name: a.name,
    image: a.avatar_url,
    plan_type: a.plan_type,
    trial_used: a.trial_used,
  };
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  /** True after the first refreshSession() has completed (success or fail). Prevents API calls with stale token before refresh. */
  initialRefreshDone: boolean;
}

interface AuthContextValue extends AuthState {
  setSession: (data: LoginResponse | RefreshResponse | PaymentSuccessResponse) => void;
  signIn: (email: string) => Promise<void>;
  signInWithGoogle: () => void;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: null,
    isLoading: true,
    isAuthenticated: false,
    initialRefreshDone: false,
  });

  // Let apiClient send Bearer token on requests
  useEffect(() => {
    setTokenGetter(() => state.accessToken);
  }, [state.accessToken]);

  const refreshSession = useCallback(async () => {
    const markRefreshDone = (patch: Partial<AuthState>) => {
      setState((prev) => ({ ...prev, ...patch, initialRefreshDone: true }));
    };

    if (typeof window === "undefined") {
      setState({ user: null, accessToken: null, isLoading: false, isAuthenticated: false, initialRefreshDone: true });
      return;
    }

    // 1) Try refresh API if we have a refresh token (cookie or localStorage)
    const refreshTokenCookie = Cookies.get("alphawriteRefreshToken");
    let stored: StoredSession | null = null;
    try {
      const raw = localStorage.getItem(SESSION_STORAGE_KEY);
      if (raw) stored = JSON.parse(raw) as StoredSession;
    } catch {
      stored = null;
    }
    const refreshToken = refreshTokenCookie ?? stored?.refresh_token;

    if (refreshToken) {
      try {
        const data = await authApi.refreshToken({ refresh_token: refreshToken });
        markRefreshDone({
          user: authUserToUser(data.user),
          accessToken: data.access_token,
          isLoading: false,
          isAuthenticated: true,
        });
        setSessionCookies({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          user: data.user,
        });
        return;
      } catch {
        clearSessionCookies();
      }
    }

    // 2) Restore from cookies (token + email) – token may be expired; do NOT set initialRefreshDone
    //    so subscription-status and other auth APIs are not called with a stale token
    const token = Cookies.get("alphawriteToken");
    const email = Cookies.get("alphawriteEmail");
    const userId = Cookies.get("alphawriteUserId");
    if (token && email) {
      setState((prev) => ({
        ...prev,
        user: {
          id: userId ?? "",
          email,
          name: Cookies.get("alphawriteUserName") ?? undefined,
          image: Cookies.get("alphawriteAvatarUrl") ?? undefined,
          plan_type: Cookies.get("alphawritePlan") ?? undefined,
        },
        accessToken: token,
        isLoading: false,
        isAuthenticated: true,
        initialRefreshDone: false,
      }));
      return;
    }

    // 3) Restore from localStorage (works when cookies are blocked) – same as 2, no initialRefreshDone
    if (stored?.access_token && stored?.user?.email) {
      setSessionCookies(stored);
      setState((prev) => ({
        ...prev,
        user: authUserToUser(stored!.user),
        accessToken: stored!.access_token,
        isLoading: false,
        isAuthenticated: true,
        initialRefreshDone: false,
      }));
      return;
    }

    markRefreshDone({ user: null, accessToken: null, isLoading: false, isAuthenticated: false });
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const setSession = useCallback((data: LoginResponse | RefreshResponse | PaymentSuccessResponse) => {
    setState({
      user: authUserToUser(data.user as AuthUser),
      accessToken: data.access_token,
      isLoading: false,
      isAuthenticated: true,
      initialRefreshDone: true,
    });
    setSessionCookies({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      user: data.user as AuthUser,
    });
  }, []);

  const signIn = useCallback(async (_email: string) => {
    // Magic link is sent via useRequestLogin in AuthModal; no-op here
    await Promise.resolve();
  }, []);

  const signInWithGoogle = useCallback(() => {
    // Google auth not ready yet
    if (typeof window !== "undefined") {
      window.location.href = "/#humanizer";
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // Clear local state even if API fails
    }
    clearSessionCookies();
    setState({ user: null, accessToken: null, isLoading: false, isAuthenticated: false, initialRefreshDone: true });
  }, []);

  const value: AuthContextValue = {
    ...state,
    setSession,
    signIn,
    signInWithGoogle,
    signOut,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

export function useAuthOptional(): AuthContextValue | null {
  return useContext(AuthContext);
}
