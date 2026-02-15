/**
 * Auth API request/response DTOs.
 * Matches backend: POST request-login, GET login, GET auth/google, GET auth/callback, POST auth/refresh, POST auth/logout.
 */

/** User as returned by auth endpoints (login, callback, refresh). */
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  plan_type: string;
  trial_used: boolean;
  avatar_url?: string;
}

// --- Request Login (magic link) ---
export interface RequestLoginBody {
  email: string;
}

export interface RequestLoginResponse {
  message: string;
}

// --- GET Login (magic link token) ---
export interface LoginResponse {
  message: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: AuthUser;
}

// --- GET auth/google ---
export interface GoogleAuthResponse {
  url: string;
  state: string;
  code_verifier: string;
}

// --- GET auth/callback (Google OAuth callback) ---
export interface AuthCallbackResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: AuthUser;
}

// --- POST auth/refresh ---
export interface RefreshResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: AuthUser;
}

// --- POST auth/logout ---
export interface LogoutResponse {
  message: string;
}

// --- Backend error shape (detail can be string or validation array) ---
export interface ApiDetailError {
  detail: string | Array<{ loc: (string | number)[]; msg: string; type: string }>;
}
