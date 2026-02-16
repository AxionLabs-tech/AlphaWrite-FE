"use client";

import Link from "next/link";
import { Zap, ArrowUp } from "lucide-react";

interface CreditDisplayProps {
  /** Remaining credits (words or credits). */
  remainingCredits: number;
  /** Max credits/words per period or per request. */
  wordLimit: number;
  /** Optional message from API (e.g. "You have 4850 words remaining."). */
  message?: string;
  /** Show upgrade CTA when remaining is below this share of limit (0–1). Default 0.2 (20%). */
  lowThreshold?: number;
}

/**
 * Displays user credits in the workspace. UX: clear numbers, progress cue, upgrade when low.
 */
export default function CreditDisplay({
  remainingCredits,
  wordLimit,
  message,
  lowThreshold = 0.2,
}: CreditDisplayProps) {
  const used = Math.max(0, wordLimit - remainingCredits);
  const percentageUsed = wordLimit > 0 ? Math.min(100, (used / wordLimit) * 100) : 0;
  const isLow = wordLimit > 0 && remainingCredits < wordLimit * lowThreshold;

  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl border px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-3.5 ${
        isLow ? "border-amber-200/80 bg-amber-50/60" : "border-violet-200/60 bg-violet-50/40"
      }`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6]">
          <Zap className="size-4" aria-hidden />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-800">
            <span className="tabular-nums">{remainingCredits.toLocaleString()}</span>
            <span className="ml-1 font-medium text-slate-600">credits left</span>
          </p>
          <p className="text-xs text-slate-500">
            {wordLimit.toLocaleString()} per period
            {message ? ` · ${message}` : ""}
          </p>
        </div>
        {isLow && (
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-100/80 px-2.5 py-1 text-xs font-medium text-amber-800">
            Low credits
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:block">
          <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isLow ? "bg-amber-500" : "bg-[#8B5CF6]"
              }`}
              style={{ width: `${Math.min(100, percentageUsed)}%` }}
            />
          </div>
          <p className="mt-0.5 text-xs text-slate-500">{percentageUsed.toFixed(0)}% used</p>
        </div>
        {isLow && (
          <Link
            href="/dashboard#subscription"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#8B5CF6] px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-violet-600"
          >
            Upgrade
            <ArrowUp className="size-3.5" aria-hidden />
          </Link>
        )}
      </div>
    </div>
  );
}
