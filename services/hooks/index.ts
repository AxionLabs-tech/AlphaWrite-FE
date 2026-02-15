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
