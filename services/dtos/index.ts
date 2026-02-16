/**
 * Data transfer objects (DTOs) / API response and request types.
 * Re-export or define shared shapes here.
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  createdAt?: string;
  plan_type?: string;
  trial_used?: boolean;
}

export interface AuthSession {
  user: User;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string;
}

export interface ApiErrorBody {
  message: string;
  code?: string;
  details?: unknown;
}

// Auth DTOs (request/response types for /api/v1 auth endpoints)
export type {
  AuthUser,
  RequestLoginBody,
  RequestLoginResponse,
  LoginResponse,
  GoogleAuthResponse,
  AuthCallbackResponse,
  RefreshRequestBody,
  RefreshResponse,
  LogoutResponse,
  ApiDetailError,
} from "./auth";

// AI DTOs (detect-ai, paraphrase)
export type {
  DetectAiBody,
  DetectAiResponse,
  DetectAiProbabilities,
  ParaphraseBody,
  ParaphraseResponse,
} from "./ai";

// Billing DTOs (create-checkout-session, check-subscription, payment-success, subscription-status, cancel, reactivate)
export type {
  CreateCheckoutSessionResponse,
  CheckSubscriptionResponse,
  PaymentSuccessBody,
  PaymentSuccessResponse,
  PaymentSuccessUser,
  SubscriptionStatusResponse,
  CancelSubscriptionBody,
  CancelSubscriptionResponse,
  ReactivateSubscriptionResponse,
} from "./billing";
