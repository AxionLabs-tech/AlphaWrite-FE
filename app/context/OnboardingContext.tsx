"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { useAuthOptional } from "@/services/hooks";
import OnboardingSurvey from "@/app/components/OnboardingSurvey";

const STORAGE_KEY = "alphawrite_show_survey";

const OnboardingContext = createContext<{
  openSurvey: () => void;
  closeSurvey: () => void;
} | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const session = useAuthOptional();
  const user = session?.user ?? null;
  const trialUsed = user?.trial_used;

  const openSurvey = useCallback(() => setOpen(true), []);
  const closeSurvey = useCallback(() => setOpen(false), []);

  // Check immediately when user object changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (trialUsed !== false) return;
    const flag = sessionStorage.getItem(STORAGE_KEY);
    if (flag) {
      sessionStorage.removeItem(STORAGE_KEY);
      setOpen(true);
    }
  }, [trialUsed]);

  // Also check after a short delay to catch flag set during navigation
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (trialUsed !== false) return;
    const timer = setTimeout(() => {
      const flag = sessionStorage.getItem(STORAGE_KEY);
      if (flag) {
        sessionStorage.removeItem(STORAGE_KEY);
        setOpen(true);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [trialUsed]);

  return (
    <OnboardingContext.Provider value={{ openSurvey, closeSurvey }}>
      {children}
      <OnboardingSurvey open={open} onClose={closeSurvey} />
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}
