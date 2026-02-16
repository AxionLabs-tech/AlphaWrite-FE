/**
 * Billing API module.
 * Base URL is expected to include /api/v1 (e.g. NEXT_PUBLIC_API_URL).
 * Excludes: webhook, pricing-info. Not consumed by UI yet — structure only.
 */

import { get, post } from "../apiClient";
import type {
  CreateCheckoutSessionResponse,
  CheckSubscriptionResponse,
  PaymentSuccessBody,
  PaymentSuccessResponse,
  SubscriptionStatusResponse,
  CancelSubscriptionBody,
  CancelSubscriptionResponse,
  ReactivateSubscriptionResponse,
} from "../dtos/billing";

const BILLING = {
  createCheckoutSession: "/create-checkout-session",
  checkSubscription: "/check-subscription",
  paymentSuccess: "/payment-success",
  subscriptionStatus: "/subscription-status",
  cancelSubscription: "/cancel-subscription",
  reactivateSubscription: "/reactivate-subscription",
} as const;

/** POST /api/v1/create-checkout-session?plan=...&billing_interval=... – create Stripe checkout session. */
export async function createCheckoutSession(params: {
  plan: string;
  billing_interval?: "weekly" | "monthly" | "yearly";
}): Promise<CreateCheckoutSessionResponse> {
  const interval = params.billing_interval ?? "monthly";
  const path = `${BILLING.createCheckoutSession}?${new URLSearchParams({
    plan: params.plan,
    billing_interval: interval,
  }).toString()}`;
  return post<CreateCheckoutSessionResponse>(path);
}

/** GET /api/v1/check-subscription?token=... – check subscription (optional token for magic link flow). */
export async function checkSubscription(params?: { token?: string | null }): Promise<CheckSubscriptionResponse> {
  const search = params?.token != null ? `?token=${encodeURIComponent(params.token)}` : "";
  return get<CheckSubscriptionResponse>(`${BILLING.checkSubscription}${search}`);
}

/** POST /api/v1/payment-success – confirm payment and get updated session (e.g. after Stripe redirect). */
export async function paymentSuccess(body: PaymentSuccessBody): Promise<PaymentSuccessResponse> {
  return post<PaymentSuccessResponse, PaymentSuccessBody>(BILLING.paymentSuccess, body);
}

/** GET /api/v1/subscription-status – get current subscription status (authenticated). */
export async function getSubscriptionStatus(): Promise<SubscriptionStatusResponse> {
  return get<SubscriptionStatusResponse>(BILLING.subscriptionStatus);
}

/** POST /api/v1/cancel-subscription – cancel or schedule cancel at period end. */
export async function cancelSubscription(body: CancelSubscriptionBody): Promise<CancelSubscriptionResponse> {
  return post<CancelSubscriptionResponse, CancelSubscriptionBody>(BILLING.cancelSubscription, body);
}

/** POST /api/v1/reactivate-subscription – reactivate a subscription set to cancel at period end. */
export async function reactivateSubscription(): Promise<ReactivateSubscriptionResponse> {
  return post<ReactivateSubscriptionResponse>(BILLING.reactivateSubscription);
}

export const billingApi = {
  createCheckoutSession,
  checkSubscription,
  paymentSuccess,
  getSubscriptionStatus,
  cancelSubscription,
  reactivateSubscription,
};
