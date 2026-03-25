/**
 * Admin API DTOs — request/response types for /api/v1/admin/* endpoints.
 */

// ── Auth ──

export interface AdminLoginBody {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  temp_token: string;
  requires_2fa: boolean;
}

export interface AdminVerifyTotpBody {
  temp_token: string;
  code: string;
}

export interface AdminVerifyRecoveryBody {
  temp_token: string;
  recovery_code: string;
}

export interface AdminAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

// ── Stats ──

export interface AdminStatsResponse {
  total_users: number;
  active_users: number;
  basic_users: number;
  pro_users: number;
  premium_users: number;
  free_users: number;
  total_requests: number;
  requests_today: number;
  total_humanized_texts: number;
  humanized_texts_today: number;
  revenue: number;
}

// ── Users ──

export interface AdminUser {
  email: string;
  plan_type: string;
  subscription_status: string;
  created_at: string;
  last_login: string;
  total_requests: number;
  requests_today: number;
  trial_used: boolean;
  billing_interval: string;
  remaining_credits: number;
}

export interface AdminUsersParams {
  skip?: number;
  limit?: number;
  plan_type?: string;
  subscription_status?: string;
}

// ── Requests ──

export interface AdminRequestsParams {
  start_date?: string;
  end_date?: string;
}

// ── Email ──

export interface SendEmailResponse {
  message: string;
}
