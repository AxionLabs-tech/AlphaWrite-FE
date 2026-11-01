"use client";

import { type ReactNode } from "react";
import { AuthProvider } from "@/app/context/AuthContext";
import { AuthModalProvider } from "@/app/context/AuthModalContext";
import { HistoryModalProvider } from "@/app/context/HistoryModalContext";
import { DemoProvider } from "@/app/context/DemoContext";
import { OnboardingProvider } from "@/app/context/OnboardingContext";
import { SystemStatusProvider } from "@/app/context/SystemStatusContext";
import { SystemBanner } from "@/app/components/SystemBanner";
import { DowntimeOverlay } from "@/app/components/DowntimeOverlay";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SystemStatusProvider>
      <SystemBanner />
      <AuthProvider>
        <AuthModalProvider>
          <OnboardingProvider>
            <HistoryModalProvider>
              <DemoProvider>{children}</DemoProvider>
            </HistoryModalProvider>
          </OnboardingProvider>
        </AuthModalProvider>
      </AuthProvider>
      <DowntimeOverlay />
    </SystemStatusProvider>
  );
}
