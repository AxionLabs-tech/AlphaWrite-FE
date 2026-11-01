"use client";

import { AlertTriangle, Info } from "lucide-react";
import { useSystemStatus } from "@/app/context/SystemStatusContext";

const DOWNTIME_TITLE = "Service temporarily unavailable";
const DOWNTIME_FALLBACK =
  "We're performing maintenance. We'll be back shortly.";

const BANNER_TITLE = "Heads up";
const BANNER_FALLBACK = "We're working on something — service is still running.";

export function SystemBanner() {
  const { downtime, banner, message } = useSystemStatus();
  if (!downtime && !banner) return null;

  // Downtime wins over banner-only when both flags are on.
  const isDown = downtime;
  const title = isDown ? DOWNTIME_TITLE : BANNER_TITLE;
  const body =
    message?.trim() || (isDown ? DOWNTIME_FALLBACK : BANNER_FALLBACK);

  const tone = isDown
    ? {
        wrap: "border-red-200 bg-red-50 text-red-900",
        iconWrap: "bg-red-100 text-red-700 ring-red-200",
        body: "text-red-800",
        Icon: AlertTriangle,
      }
    : {
        wrap: "border-amber-200 bg-amber-50 text-amber-900",
        iconWrap: "bg-amber-100 text-amber-700 ring-amber-200",
        body: "text-amber-800",
        Icon: Info,
      };

  const Icon = tone.Icon;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`sticky top-0 z-[100] w-full border-b shadow-sm ${tone.wrap}`}
    >
      <div className="mx-auto flex max-w-6xl items-start gap-3 px-4 py-3 sm:items-center sm:px-6">
        <span
          className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full ring-1 sm:mt-0 ${tone.iconWrap}`}
        >
          <Icon strokeWidth={2.2} className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold tracking-tight sm:text-base">
            {title}
          </p>
          <p className={`mt-0.5 text-xs leading-snug sm:text-sm ${tone.body}`}>
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}
