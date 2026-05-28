/**
 * API modules: group endpoints by domain (auth, user, billing, etc.).
 */

export { authApi, requestLogin, loginWithToken, getGoogleAuthUrl, getAuthCallback, refreshToken, logout } from "./auth";
export { aiApi, detectAi, paraphrase } from "./ai";
export { historyApi, getUserHistory } from "./history";
export {
  billingApi,
  createCheckoutSession,
  checkSubscription,
  paymentSuccess,
  getSubscriptionStatus,
  cancelSubscription,
  reactivateSubscription,
} from "./billing";
export {
  writingApi,
  chat,
  chatStream,
  quickGenerate,
  quickGenerateStream,
  listConversations,
  getConversation,
  deleteConversation,
  getQuickHistory,
} from "./writing";
export {
  styleApi,
  uploadStyleSamples,
  getStyleFingerprint,
  deleteStyleFingerprint,
} from "./style";