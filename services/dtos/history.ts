/**
 * DTOs for the user-history endpoint.
 * GET /api/v1/user-history
 */

import type { DetectAiProbabilities } from "./ai";

export type HistoryItemType = "paraphrase" | "detection";

export interface HistoryItem {
  id: string;
  type: HistoryItemType;
  original_text: string;
  /** Present on paraphrase items */
  paraphrased_texts: string[];
  /** Present on detection items */
  prediction?: "human" | "ai";
  confidence?: number;
  probabilities?: DetectAiProbabilities;
  created_at: string;
  word_count: number;
  language: string;
}

/** Raw API response — pagination fields are at the root level. */
export interface UserHistoryResponse {
  history: HistoryItem[];
  total_count: number;
  page: number;
  limit: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface UserHistoryParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: "paraphrase" | "detection";
}
