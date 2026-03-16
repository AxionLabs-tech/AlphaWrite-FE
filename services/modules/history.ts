/**
 * History API module.
 * GET /api/v1/user-history – fetch paginated user history.
 */

import { get } from "../apiClient";
import type { UserHistoryResponse, UserHistoryParams } from "../dtos/history";

const HISTORY = {
  userHistory: "/user-history",
} as const;

/** GET /api/v1/user-history – fetch user paraphrase history. */
export async function getUserHistory(
  params?: UserHistoryParams,
): Promise<UserHistoryResponse> {
  const queryParams: Record<string, string> = {};
  if (params?.page) queryParams.page = String(params.page);
  if (params?.limit) queryParams.limit = String(params.limit);
  if (params?.search) queryParams.search = params.search;
  if (params?.type) queryParams.type = params.type;

  return get<UserHistoryResponse>(HISTORY.userHistory, { params: queryParams });
}

export const historyApi = {
  getUserHistory,
};
