/**
 * AI API module.
 * Base URL is expected to include /api/v1 (e.g. NEXT_PUBLIC_API_URL=https://api.example.com/api/v1).
 * Do not consume from UI until ready.
 */

import { post } from "../apiClient";
import type {
  DetectAiBody,
  DetectAiResponse,
  ParaphraseBody,
  ParaphraseResponse,
} from "../dtos/ai";

const AI = {
  detectAi: "/detect-ai",
  paraphrase: "/paraphrase",
} as const;

/** POST /api/v1/detect-ai – detect AI-generated content. */
export async function detectAi(body: DetectAiBody): Promise<DetectAiResponse> {
  return post<DetectAiResponse, DetectAiBody>(AI.detectAi, body);
}

/** POST /api/v1/paraphrase – paraphrase text. */
export async function paraphrase(body: ParaphraseBody): Promise<ParaphraseResponse> {
  return post<ParaphraseResponse, ParaphraseBody>(AI.paraphrase, body);
}

export const aiApi = {
  detectAi,
  paraphrase,
};
