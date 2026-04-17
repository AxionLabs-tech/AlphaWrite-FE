"use client";

import { createContext, useContext, useCallback, type ReactNode } from "react";
// import { useState, useEffect, useRef } from "react";
// import { useAuthOptional } from "@/services/hooks";
// import OnboardingSurvey from "@/app/components/OnboardingSurvey";

// const STORAGE_KEY = "alphawrite_show_survey";

const OnboardingContext = createContext<{
  openSurvey: () => void;
  closeSurvey: () => void;
} | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  // Survey disabled for now
  const openSurvey = useCallback(() => {}, []);
  const closeSurvey = useCallback(() => {}, []);

  // const [open, setOpen] = useState(false);
  // const shownRef = useRef(false);
  // const session = useAuthOptional();
  // const user = session?.user ?? null;
  // const trialUsed = user?.trial_used;

  // const openSurvey = useCallback(() => setOpen(true), []);
  // const closeSurvey = useCallback(() => {
  //   setOpen(false);
  //   session?.refreshSession();
  // }, [session]);

  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //   if (trialUsed !== false) return;
  //   if (shownRef.current) return;
  //   const checkFlag = () => {
  //     const flag = sessionStorage.getItem(STORAGE_KEY);
  //     if (flag) {
  //       sessionStorage.removeItem(STORAGE_KEY);
  //       shownRef.current = true;
  //       setOpen(true);
  //     }
  //   };
  //   checkFlag();
  //   const timer = setTimeout(checkFlag, 500);
  //   return () => clearTimeout(timer);
  // }, [trialUsed]);

  return (
    <OnboardingContext.Provider value={{ openSurvey, closeSurvey }}>
      {children}
      {/* <OnboardingSurvey open={open} onClose={closeSurvey} /> */}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}
