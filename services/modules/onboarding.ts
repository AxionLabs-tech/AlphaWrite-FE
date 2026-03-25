import { post } from "../apiClient";
import type { SurveyRequest, SurveyResponse } from "../dtos/onboarding";

const ONBOARDING = {
  survey: "/onboarding/survey",
} as const;

/** POST /api/v1/onboarding/survey – submit onboarding survey answers. */
export async function submitSurvey(
  body: SurveyRequest
): Promise<SurveyResponse> {
  return post<SurveyResponse, SurveyRequest>(ONBOARDING.survey, body);
}

export const onboardingApi = { submitSurvey };
