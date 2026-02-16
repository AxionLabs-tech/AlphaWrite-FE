/**
 * Billing API request/response DTOs.
 * Matches backend: create-checkout-session, check-subscription, payment-success,
 * subscription-status, cancel-subscription, reactivate-subscription.
 * Excludes: webhook, pricing-info.
 */

// --- POST /api/v1/create-checkout-session ---
export interface CreateCheckoutSessionResponse {
  id: string;
  url: string;
}

// --- GET /api/v1/check-subscription ---
export interface CheckSubscriptionResponse {
  email: string;
  plan_type: string;
  billing_interval: string | null;
  trial_used: boolean;
  subscription_status: string;
  remaining_credits: number;
  word_limit: number;
  subscription_start: string | null;
  subscription_end: string | null;
  next_credit_reset: string | null;
  message: string;
}

// --- POST /api/v1/payment-success ---
export interface PaymentSuccessBody {
  session_id: string;
}

export interface PaymentSuccessUser {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
  plan_type: string;
  subscription_status: string;
  billing_interval: string | null;
  trial_used: boolean;
  remaining_credits: number;
  subscription_start: string | null;
  subscription_end: string | null;
  next_credit_reset: string | null;
}

export interface PaymentSuccessResponse {
  message: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: PaymentSuccessUser;
}

// --- GET /api/v1/subscription-status ---
export interface SubscriptionStatusResponse {
  user_email: string;
  plan_type: string;
  subscription_status: string;
  billing_interval: string | null;
  remaining_credits: number;
  trial_used: boolean;
  subscription_start: string | null;
  subscription_end: string | null;
  next_credit_reset: string | null;
  cancel_at_period_end: boolean;
  current_period_end: string | null;
  message: string;
}

// --- POST /api/v1/cancel-subscription ---
export interface CancelSubscriptionBody {
  cancel_at_period_end: boolean;
}

export interface CancelSubscriptionResponse {
  success: boolean;
  message: string;
  cancel_at_period_end: boolean;
  subscription_status: string;
  current_period_end: string | null;
  access_until: string;
}

// --- POST /api/v1/reactivate-subscription ---
export interface ReactivateSubscriptionResponse {
  success: boolean;
  message: string;
  cancel_at_period_end: boolean;
  subscription_status: string;
  access_until: string;
}
