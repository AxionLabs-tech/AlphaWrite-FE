/**
 * Shared logic for detection result probabilities.
 * Used by both the detector screen and the History modal so percentages
 * are consistent and add up to 100% (human + ai + ai_paraphrased).
 */

export type DetectionProbabilities = {
  human: number;
  ai: number;
  ai_paraphrased: number;
};

/** Detection result from API (detector screen or history item). */
export type DetectionResultLike = Record<string, unknown> | null | undefined;

function getAIProbabilityFromResult(apiResponse: DetectionResultLike): number {
  if (!apiResponse) return 0;
  const r = apiResponse as Record<string, unknown>;
  if ((r.probabilities as Record<string, number>)?.ai !== undefined) {
    return ((r.probabilities as Record<string, number>).ai ?? 0) * 100;
  }
  if (typeof r.confidence === "number") return r.confidence * 100;
  if (typeof (r as Record<string, unknown>).max_ai_score === "number")
    return ((r as Record<string, unknown>).max_ai_score as number) * 100;
  return ((r.confidence as number) ?? 0) * 100;
}

/**
 * Returns human, ai, and ai_paraphrased percentages (0–100) from a detection result.
 * Uses same fallback order as detector:
 *   probabilities → weighted_probabilities → raw_probabilities → fallback.
 */
export function getDetectionProbabilities(
  detectionResult: unknown,
): DetectionProbabilities {
  if (!detectionResult || typeof detectionResult !== "object")
    return { human: 0, ai: 0, ai_paraphrased: 0 };
  const r = detectionResult as Record<string, unknown>;

  if (r.probabilities && typeof r.probabilities === "object") {
    const p = r.probabilities as Record<string, number>;
    return {
      human: (p.human ?? 0) * 100,
      ai: (p.ai ?? 0) * 100,
      ai_paraphrased: (p.ai_paraphrased ?? 0) * 100,
    };
  }
  if (r.weighted_probabilities && typeof r.weighted_probabilities === "object") {
    const p = r.weighted_probabilities as Record<string, number>;
    return {
      human: (p.human ?? 0) * 100,
      ai: (p.ai ?? 0) * 100,
      ai_paraphrased: (p.ai_paraphrased ?? 0) * 100,
    };
  }
  if (r.raw_probabilities && typeof r.raw_probabilities === "object") {
    const p = r.raw_probabilities as Record<string, number>;
    return {
      human: (p.human ?? 0) * 100,
      ai: (p.ai ?? 0) * 100,
      ai_paraphrased: (p.ai_paraphrased ?? 0) * 100,
    };
  }
  const aiProbability = getAIProbabilityFromResult(r);
  return {
    human: 100 - aiProbability,
    ai: aiProbability,
    ai_paraphrased: 0,
  };
}

/**
 * Returns whether the detection result predicts "ai" (AI generated).
 */
export function isDetectionAIGenerated(detectionResult: unknown): boolean {
  if (!detectionResult || typeof detectionResult !== "object") return false;
  const r = detectionResult as Record<string, unknown>;
  if (r.prediction !== undefined) return r.prediction === "ai";
  return (r.is_ai_generated as boolean) ?? false;
}
