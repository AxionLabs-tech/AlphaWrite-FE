"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Copy, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface OutputPanelProps {
  value: string;
  onCopy?: () => void;
  onRewrite?: () => void;
  placeholder?: string;
  className?: string;
}

export default function OutputPanel({
  value,
  onCopy,
  onRewrite,
  placeholder = "AlphaWrite result…",
  className,
}: OutputPanelProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label className="mb-2 text-sm font-medium text-slate-700">Output</label>
      <div className="min-h-[280px] w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3">
        <p className="whitespace-pre-wrap text-slate-900">
          {value || <span className="text-slate-400">{placeholder}</span>}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={onCopy}
          disabled={!value}
          className="inline-flex items-center gap-2"
        >
          <Copy className="h-4 w-4" aria-hidden />
          Copy
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onRewrite}
          className="inline-flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
          Rewrite again
        </Button>
      </div>
    </div>
  );
}
