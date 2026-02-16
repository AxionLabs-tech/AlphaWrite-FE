/**
 * AI API request/response DTOs.
 * Matches backend: POST /api/v1/detect-ai, POST /api/v1/paraphrase.
 * Do not consume from UI until ready.
 */

// --- Detect AI (POST /api/v1/detect-ai) ---

export interface DetectAiBody {
  text: string;
}

export interface DetectAiProbabilities {
  human: number;
  ai: number;
  ai_paraphrased: number;
}

export interface DetectAiResponse {
  prediction: "human" | "ai";
  confidence: number;
  probabilities: DetectAiProbabilities;
  raw_probabilities: DetectAiProbabilities;
  weighted_probabilities: DetectAiProbabilities;
  max_ai_score: number;
  avg_ai_score: number;
  pure_ai_score: number;
  human_score: number;
  ai_dominant_ratio: number;
  strong_ai_paragraph_ratio: number;
}

// --- Paraphrase (POST /api/v1/paraphrase) ---

export interface ParaphraseBody {
  text: string;
}

export interface ParaphraseResponse {
  paraphrased_texts: string[];
  remaining_credits: number;
  word_limit: number;
  message: string;
}
