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

export { useSubmitSurvey } from "./onboarding";
export type { UseSubmitSurveyResult } from "./onboarding";

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

export {
  useAdminLogin,
  useAdminVerifyTotp,
  useAdminVerifyRecovery,
  useUpdateUserPlan,
  useSendEmail,
  useBulkEmail,
  useSendWelcomeEmail,
  useUpdateCredits,
  useUpdateSubscriptions,
  useAdminStats,
  useAdminUsers,
} from "./admin";
export type {
  UseAdminLoginResult,
  UseAdminVerifyTotpResult,
  UseAdminVerifyRecoveryResult,
  UseUpdateUserPlanResult,
  UseSendEmailResult,
  UseBulkEmailResult,
  UseSendWelcomeEmailResult,
  UseUpdateCreditsResult,
  UseUpdateSubscriptionsResult,
  UseAdminStatsResult,
  UseAdminUsersResult,
} from "./admin";

export {
  useChat,
  useChatStream,
  useQuickGenerate,
  useQuickGenerateStream,
  useConversations,
  useConversation,
  useDeleteConversation,
  useQuickHistory,
} from "./writing";
export type {
  UseChatResult,
  UseChatStreamResult,
  UseQuickGenerateResult,
  UseQuickGenerateStreamResult,
  UseConversationsResult,
  UseConversationResult,
  UseDeleteConversationResult,
  UseQuickHistoryResult,
} from "./writing";

export {
  useUploadStyleSamples,
  useStyleFingerprint,
  useDeleteStyleFingerprint,
} from "./style";
export type {
  UseUploadStyleSamplesResult,
  UseStyleFingerprintResult,
  UseDeleteStyleFingerprintResult,
} from "./style";
