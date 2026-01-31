"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TextEditorPanelProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function TextEditorPanel({
  value,
  onChange,
  placeholder = "Paste your text here…",
  className,
}: TextEditorPanelProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label className="mb-2 text-sm font-medium text-slate-700">Input</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[280px] w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-[#8B5CF6] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
        rows={10}
      />
    </div>
  );
}
