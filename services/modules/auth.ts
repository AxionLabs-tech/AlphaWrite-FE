/**
 * Auth API module.
 * Base URL is expected to include /api/v1 (e.g. NEXT_PUBLIC_API_URL=https://api.example.com/api/v1).
 * Do not consume from AuthContext/AuthModal until ready.
 */

import { get, post } from "../apiClient";
import type {
  RequestLoginBody,
  RequestLoginResponse,
  LoginResponse,
  GoogleAuthResponse,
  AuthCallbackResponse,
  RefreshResponse,
  LogoutResponse,
} from "../dtos/auth";

const AUTH = {
  requestLogin: "/request-login",
  login: "/login",
  google: "/auth/google",
  callback: "/auth/callback",
  refresh: "/auth/refresh",
  logout: "/auth/logout",
} as const;

/** POST /api/v1/request-login – send magic link to email. */
export async function requestLogin(
  body: RequestLoginBody
): Promise<RequestLoginResponse> {
  return post<RequestLoginResponse, RequestLoginBody>(AUTH.requestLogin, body);
}

/** GET /api/v1/login?token=... – exchange magic link token for session. */
export async function loginWithToken(token: string): Promise<LoginResponse> {
  return get<LoginResponse>(AUTH.login, { params: { token } });
}

/** GET /api/v1/auth/google – get Google OAuth URL (and state/code_verifier for callback). */
export async function getGoogleAuthUrl(): Promise<GoogleAuthResponse> {
  return get<GoogleAuthResponse>(AUTH.google);
}

/**
 * GET /api/v1/auth/callback?code=...&state=...&code_verifier=...
 * Exchange OAuth code for tokens. Use after redirect from Google.
 */
export async function getAuthCallback(params: {
  code: string;
  state?: string;
  code_verifier?: string;
}): Promise<AuthCallbackResponse> {
  return get<AuthCallbackResponse>(AUTH.callback, {
    params: params as Record<string, string>,
  });
}

/** POST /api/v1/auth/refresh – refresh access token (send refresh token via cookie/header per backend). */
export async function refreshToken(): Promise<RefreshResponse> {
  return post<RefreshResponse>(AUTH.refresh);
}

/** POST /api/v1/auth/logout – invalidate session. */
export async function logout(): Promise<LogoutResponse> {
  return post<LogoutResponse>(AUTH.logout);
}

export const authApi = {
  requestLogin,
  loginWithToken,
  getGoogleAuthUrl,
  getAuthCallback,
  refreshToken,
  logout,
};
