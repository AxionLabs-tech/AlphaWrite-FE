"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { useSubmitSurvey } from "@/services/hooks/onboarding";

interface OnboardingSurveyProps {
  open: boolean;
  onClose: () => void;
}

const USER_TYPES = [
  "Student",
  "Blogger",
  "Content Creator",
  "Marketing Specialist",
  "Entrepreneur",
  "Other",
];

const REFERRAL_SOURCES = [
  "Instagram",
  "TikTok",
  "Snapchat",
  "Twitter/X",
  "YouTube",
  "Google Search",
  "Friend/Word of Mouth",
  "Other",
];

export default function OnboardingSurvey({ open, onClose }: OnboardingSurveyProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [userType, setUserType] = useState<string | null>(null);
  const { submitSurvey, isLoading } = useSubmitSurvey();

  if (!open) return null;

  const handleUserType = (value: string) => {
    setUserType(value);
    setStep(2);
  };

  const handleReferral = async (value: string) => {
    if (!userType) return;
    try {
      await submitSurvey({ user_type: userType, referral_source: value });
    } catch {
      // close even on error — non-critical
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-[420px] rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="onboarding-title"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-violet-100">
            <Sparkles className="size-6 text-[#8B5CF6]" aria-hidden />
          </div>
          <h2
            id="onboarding-title"
            className="mt-4 text-xl font-bold tracking-tight text-slate-900"
          >
            {step === 1 ? "What describes you best?" : "How did you hear about us?"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {step === 1
              ? "Help us personalize your experience"
              : "We'd love to know where you found us"}
          </p>
        </div>

        {/* Options */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {(step === 1 ? USER_TYPES : REFERRAL_SOURCES).map((option) => (
            <button
              key={option}
              type="button"
              disabled={isLoading}
              onClick={() =>
                step === 1 ? handleUserType(option) : handleReferral(option)
              }
              className="flex items-center justify-center rounded-xl border-2 border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-700 transition hover:border-[#8B5CF6] hover:bg-violet-50 hover:text-[#8B5CF6] disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" aria-hidden />
              ) : (
                option
              )}
            </button>
          ))}
        </div>

        {/* Progress dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div
            className={`size-2 rounded-full transition ${
              step === 1 ? "bg-[#8B5CF6]" : "bg-slate-200"
            }`}
          />
          <div
            className={`size-2 rounded-full transition ${
              step === 2 ? "bg-[#8B5CF6]" : "bg-slate-200"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
