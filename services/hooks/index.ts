/**
 * Data-fetching and API hooks.
 * Use these in components instead of calling authApi directly.
 */

export {
  useAuth,
  useAuthOptional,
  useRequestLogin,
  useGoogleAuth,
  useLogout,
} from "./auth";
export type {
  UseRequestLoginResult,
  UseGoogleAuthResult,
  UseLogoutResult,
} from "./auth";

export { useDetectAi, useParaphrase } from "./ai";
export type { UseDetectAiResult, UseParaphraseResult } from "./ai";

export { useUserHistory } from "./history";
export type { UseUserHistoryResult } from "./history";

export {
  useCreateCheckoutSession,
  useSubscriptionStatus,
  useCheckSubscription,
  usePaymentSuccess,
  useCancelSubscription,
  useReactivateSubscription,
} from "./billing";
export type {
  UseCreateCheckoutSessionResult,
  UseSubscriptionStatusResult,
  UseCheckSubscriptionResult,
  UsePaymentSuccessResult,
  UseCancelSubscriptionResult,
  UseReactivateSubscriptionResult,
} from "./billing";
