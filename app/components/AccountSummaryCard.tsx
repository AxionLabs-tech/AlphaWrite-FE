"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { UserCircle, ArrowUp } from "lucide-react";
import { useAuthOptional } from "@/services/hooks";

const PLAN_WORDS: Record<string, string> = {
  free: "250 words per request",
  basic: "500 words per request",
  pro: "2,000 words per request",
  premium: "4,000 words per request",
};

export default function AccountSummaryCard() {
  const auth = useAuthOptional();
  if (auth?.isLoading || !auth?.isAuthenticated) return null;

  const email = auth?.user?.email ?? Cookies.get("alphawriteEmail") ?? "";
  const plan = (auth?.user?.plan_type ?? Cookies.get("alphawritePlan") ?? "free").toLowerCase();
  const planLabel = plan === "free" ? "Free" : plan.charAt(0).toUpperCase() + plan.slice(1);
  const wordsLabel = PLAN_WORDS[plan] ?? "250 words per request";
  const credits = 40;

  return (
    <section className="mx-auto max-w-4xl px-4 pt-4 pb-2 sm:px-6 lg:px-8" aria-label="Account summary">
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-[0_4px_24px_-4px_rgba(15,23,42,0.08),0_8px_16px_-6px_rgba(15,23,42,0.04)]">
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex flex-wrap items-start gap-4">
            <div className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/25">
              <UserCircle className="size-7" strokeWidth={2} />
            </div>
            <div className="min-w-0 space-y-1">
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                {planLabel} Account
              </h2>
              {email ? (
                <>
                  <p className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="size-2 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                    {email}
                  </p>
                  <p className="flex flex-wrap items-center gap-2 text-sm text-slate-700">
                    <span className="size-2 shrink-0 rounded-full bg-blue-500" aria-hidden />
                    {wordsLabel}
                    <span className="inline-flex items-center rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-800">
                      {credits} credits remaining
                    </span>
                  </p>
                </>
              ) : (
                <p className="text-sm text-slate-500">Sign in to see your usage and credits</p>
              )}
            </div>
          </div>
          <Link
            href="/#pricing"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 via-[#8B5CF6] to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:opacity-95"
          >
            <ArrowUp className="size-4" />
            Upgrade to Pro
          </Link>
        </div>
        <div
          className="h-1 w-full bg-linear-to-r from-sky-200 via-violet-200 to-violet-200"
          aria-hidden
        />
      </div>
    </section>
  );
}
