"use client";

import { type ReactNode } from "react";
import { AuthProvider } from "@/app/context/AuthContext";
import { AuthModalProvider } from "@/app/context/AuthModalContext";
import { DemoProvider } from "@/app/context/DemoContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AuthModalProvider>
        <DemoProvider>{children}</DemoProvider>
      </AuthModalProvider>
    </AuthProvider>
  );
}
