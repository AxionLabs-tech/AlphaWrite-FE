"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type DashboardView = "home" | "profile" | "subscription";

const DashboardViewContext = createContext<{
  view: DashboardView;
  setView: (v: DashboardView) => void;
} | null>(null);

export function DashboardViewProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<DashboardView>("home");
  return (
    <DashboardViewContext.Provider value={{ view, setView }}>
      {children}
    </DashboardViewContext.Provider>
  );
}

export function useDashboardView() {
  const ctx = useContext(DashboardViewContext);
  if (!ctx) throw new Error("useDashboardView must be used within DashboardViewProvider");
  return ctx;
}
