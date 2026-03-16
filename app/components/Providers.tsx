"use client";

import { type ReactNode } from "react";
import { AuthProvider } from "@/app/context/AuthContext";
import { AuthModalProvider } from "@/app/context/AuthModalContext";
import { HistoryModalProvider } from "@/app/context/HistoryModalContext";
import { DemoProvider } from "@/app/context/DemoContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AuthModalProvider>
        <HistoryModalProvider>
          <DemoProvider>{children}</DemoProvider>
        </HistoryModalProvider>
      </AuthModalProvider>
    </AuthProvider>
  );
}
