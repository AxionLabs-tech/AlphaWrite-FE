"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { User, LogOut, Coins, CreditCard } from "lucide-react";
import { useAuth } from "@/services/hooks";

export default function DashboardPage() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const email = user?.email ?? Cookies.get("alphawriteEmail") ?? "";
  const plan = (user?.plan_type ?? Cookies.get("alphawritePlan") ?? "free").toLowerCase();
  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);

  // Credits can be wired to an API later; placeholder for design
  const credits = 40;
  const planWordsLabel =
    plan === "free"
      ? "250 words one-time"
      : plan === "basic"
        ? "500 words per request"
        : plan === "pro"
          ? "2,000 words per request"
          : plan === "premium"
            ? "4,000 words per request"
            : "—";

  const handleSignOut = async () => {
    await signOut?.();
    router.replace("/");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 min-h-[calc(100vh-12rem)]">
      <div className="mb-8 border-l-4 border-[#8B5CF6] pl-4">
        <h1 className="bg-linear-to-r from-[#8B5CF6] to-violet-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">Account overview</p>
      </div>
      <div className="space-y-6">
        {/* Account card - no border, shadow only */}
        <div className="rounded-3xl bg-white p-8 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.08),0_8px_16px_-6px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_8px_32px_-4px_rgba(15,23,42,0.1),0_12px_24px_-6px_rgba(15,23,42,0.06)]">
          {/* Top row: icon + title left, Sign Out right */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-r from-[#8B5CF6] to-blue-500 text-white shadow-lg shadow-violet-500/25">
                <User className="size-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Account</h2>
                <p className="text-sm text-slate-500">Your profile information</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-2xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-200/80 sm:self-center"
            >
              <LogOut className="size-4" />
              Sign Out
            </button>
          </div>
          {/* Email block - left-aligned below */}
          <div className="mt-6">
            <p className="text-sm text-slate-500">Email Address</p>
            <p className="mt-1 font-semibold text-slate-900">{email}</p>
          </div>
        </div>

        {/* Credits Balance & Subscription row */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Credits Balance card */}
          <div className="flex min-h-[280px] flex-col rounded-3xl bg-white p-8 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.08),0_8px_16px_-6px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_8px_32px_-4px_rgba(15,23,42,0.1),0_12px_24px_-6px_rgba(15,23,42,0.06)]">
            <div className="flex items-center gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/25">
                <Coins className="size-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Credits Balance</h2>
                <p className="text-sm text-slate-500">Available for humanization</p>
              </div>
            </div>
            <div className="mt-6 flex flex-1 flex-col">
              <span className="text-3xl font-bold tracking-tight text-slate-900">{credits}</span>
              <p className="text-sm text-slate-500">credits</p>
              <p className="text-xs text-slate-400">Available now</p>
              <Link
                href="/#pricing"
                className="mt-6 inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-600 hover:shadow-emerald-500/30"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>

          {/* Subscription card */}
          <div className="flex min-h-[280px] flex-col rounded-3xl bg-white p-8 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.08),0_8px_16px_-6px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_8px_32px_-4px_rgba(15,23,42,0.1),0_12px_24px_-6px_rgba(15,23,42,0.06)]">
            <div className="flex items-center gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-slate-800 text-white shadow-lg shadow-slate-900/20">
                <CreditCard className="size-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Subscription</h2>
                <p className="text-sm text-slate-500">Your current plan</p>
              </div>
            </div>
            <div className="mt-6 flex flex-1 flex-col">
              <span className="text-3xl font-bold tracking-tight text-slate-900">{planLabel} Plan</span>
              <p className="text-sm text-slate-500">{planWordsLabel}</p>
              <p className="text-xs text-slate-400">
                Upgrade to unlock more features and higher limits
              </p>
              <Link
                href="/#pricing"
                className="mt-6 inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-blue-500 to-[#8B5CF6] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:opacity-95 hover:shadow-violet-500/30"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
