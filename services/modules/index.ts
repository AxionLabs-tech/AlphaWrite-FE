/**
 * API modules: group endpoints by domain (auth, user, billing, etc.).
 */

export { authApi, requestLogin, loginWithToken, getGoogleAuthUrl, getAuthCallback, refreshToken, logout } from "./auth";
export { aiApi, detectAi, paraphrase } from "./ai";
export {
  billingApi,
  createCheckoutSession,
  checkSubscription,
  paymentSuccess,
  getSubscriptionStatus,
  cancelSubscription,
  reactivateSubscription,
} from "./billing";
