"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from "react";
import { useAuthOptional } from "@/services/hooks";
import OnboardingSurvey from "@/app/components/OnboardingSurvey";

const STORAGE_KEY = "alphawrite_show_survey";

const OnboardingContext = createContext<{
  openSurvey: () => void;
  closeSurvey: () => void;
} | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const shownRef = useRef(false);
  const session = useAuthOptional();
  const user = session?.user ?? null;
  const trialUsed = user?.trial_used;

  const openSurvey = useCallback(() => setOpen(true), []);
  const closeSurvey = useCallback(() => {
    setOpen(false);
    // Refresh session so local state picks up updated trial_used from backend
    session?.refreshSession();
  }, [session]);

  // Check for survey flag when user data loads
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (trialUsed !== false) return;
    if (shownRef.current) return;

    const checkFlag = () => {
      const flag = sessionStorage.getItem(STORAGE_KEY);
      if (flag) {
        sessionStorage.removeItem(STORAGE_KEY);
        shownRef.current = true;
        setOpen(true);
      }
    };

    // Check immediately
    checkFlag();

    // Also check after a short delay to catch flag set during navigation
    const timer = setTimeout(checkFlag, 500);
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
