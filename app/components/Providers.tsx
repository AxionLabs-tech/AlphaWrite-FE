"use client";

import { type ReactNode } from "react";
import { AuthProvider } from "@/app/context/AuthContext";

export function Providers({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
