"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

const DemoContext = createContext<{
  demoText: string;
  setDemoText: (text: string) => void;
} | null>(null);

const DEFAULT_DEMO_TEXT =
  "The Rise of Remote Work: How Digital Transformation is Reshaping the Modern Workplace\n\n" +
  "With rapid advancements in technology, remote work has become a cornerstone of modern business. " +
  "Organizations around the globe are embracing digital tools to foster collaboration and flexibility. " +
  "This shift not only enhances work-life balance but also drives innovation and productivity. " +
  "As companies adapt to these changes, they face new opportunities and challenges in a rapidly evolving landscape.";

export function DemoProvider({ children }: { children: ReactNode }) {
  const [demoText, setDemoTextState] = useState("");
  const setDemoText = useCallback((text: string) => {
    setDemoTextState(text);
  }, []);

  return (
    <DemoContext.Provider value={{ demoText, setDemoText }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemoText() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemoText must be used within DemoProvider");
  return ctx;
}

export function useDemoTextOptional() {
  return useContext(DemoContext);
}

export { DEFAULT_DEMO_TEXT };
