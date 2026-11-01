"use client";

import { usePathname } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { useSystemStatus } from "@/app/context/SystemStatusContext";

const DOWNTIME_FALLBACK =
  "We're performing maintenance. We'll be back shortly.";

/**
 * Routes that stay interactive during downtime: public marketing pages
 * and the auth flow. Everything else is blocked by a full-screen overlay
 * while `downtime === true`.
 */
const PUBLIC_PREFIXES = [
  "/login",
  "/auth",
  "/blog",
  "/privacy",
  "/terms",
  "/cancel",
  "/success",
];

function isPublicRoute(pathname: string | null): boolean {
  if (!pathname) return true;
  if (pathname === "/") return true;
  return PUBLIC_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
}

export function DowntimeOverlay() {
  const { downtime, message } = useSystemStatus();
  const pathname = usePathname();

  if (!downtime) return null;
  if (isPublicRoute(pathname)) return null;

  const adminMessage = message?.trim();

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="downtime-overlay-title"
      aria-describedby="downtime-overlay-body"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 px-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-md rounded-3xl bg-white p-6 text-center shadow-2xl ring-1 ring-slate-200/70 sm:p-8">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 ring-1 ring-red-100">
          <AlertTriangle strokeWidth={2} className="size-6" aria-hidden />
        </div>
        <h2
          id="downtime-overlay-title"
          className="mt-5 text-lg font-bold tracking-tight text-slate-900 sm:text-xl"
        >
          Service temporarily unavailable
        </h2>
        <div
          id="downtime-overlay-body"
          className="mt-3 space-y-2 text-sm leading-snug text-slate-600"
        >
          {adminMessage && <p>{adminMessage}</p>}
          <p>{DOWNTIME_FALLBACK}</p>
        </div>
        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          Checking status…
        </p>
      </div>
    </div>
  );
}
