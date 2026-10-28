"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  Coins,
  CreditCard,
  LogOut,
  Mail,
  Sparkles,
  User,
} from "lucide-react";
import {
  useAuth,
  useSubscriptionStatus,
  useCancelSubscription,
  useReactivateSubscription,
} from "@/services/hooks";

function planWordsLabel(plan: string): string {
  const p = plan.toLowerCase();
  if (p === "free") return "250 words one-time";
  if (p === "basic") return "500 words per request";
  if (p === "pro") return "2,000 words per request";
  if (p === "premium") return "4,000 words per request";
  return "—";
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { data: subscription, isLoading: subscriptionLoading, error: subscriptionError, refetch } = useSubscriptionStatus();
  const { cancelSubscription, isLoading: cancelLoading, error: cancelError } = useCancelSubscription();
  const { reactivateSubscription, isLoading: reactivateLoading, error: reactivateError } = useReactivateSubscription();
  const [showCancelModal, setShowCancelModal] = useState(false);

  const email = user?.email ?? Cookies.get("alphawriteEmail") ?? "";
  const plan = (subscription?.plan_type ?? user?.plan_type ?? Cookies.get("alphawritePlan") ?? "free").toLowerCase();
  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);
  const credits = subscription?.remaining_credits ?? 0;
  const isPaidPlan = ["basic", "pro", "premium"].includes(plan);
  const showUpgrade = !isPaidPlan || credits <= 0;
  const isCancelPending = subscription?.cancel_at_period_end === true;
  const periodEnd = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;

  const handleSignOut = async () => {
    await signOut?.();
    router.replace("/");
  };

  const handleCancel = async () => {
    const ok = await cancelSubscription({ cancel_at_period_end: true });
    if (ok) {
      setShowCancelModal(false);
      await refetch();
    }
  };

  const handleReactivate = async () => {
    const ok = await reactivateSubscription();
    if (ok) await refetch();
  };

  const initial = (user?.name || email || "A").charAt(0).toUpperCase();

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden px-4 py-4 sm:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-105 bg-[radial-gradient(60%_55%_at_50%_0%,rgba(141,105,243,0.14),transparent_70%)]"
      />

      <div className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain pb-10">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <header className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#6642B6] shadow-sm ring-1 ring-violet-100 backdrop-blur">
              Account
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Your{" "}
              <span className="bg-linear-to-r from-[#8D69F3] to-[#6642B6] bg-clip-text text-transparent">
                account
              </span>
            </h1>
            <p className="mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
              Manage your profile, credits, and subscription.
            </p>
          </header>

          <div className="mt-8 space-y-6">
            {/* Profile card */}
            <section className="rounded-3xl bg-white p-6 shadow-[0_18px_50px_-24px_rgba(102,66,182,0.25)] ring-1 ring-slate-200/70 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-[#8D69F3] to-[#6642B6] text-xl font-extrabold text-white shadow-md shadow-violet-500/25">
                    {initial}
                    <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-white ring-2 ring-white">
                      <User className="size-3 text-[#6642B6]" aria-hidden />
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-bold text-slate-900">
                      {user?.name || email.split("@")[0] || "Account"}
                    </h2>
                    <p className="text-sm text-slate-500">Your profile information</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex shrink-0 items-center gap-2 self-start rounded-2xl bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-200/80 transition hover:bg-slate-100 sm:self-center"
                >
                  <LogOut className="size-4" />
                  Sign out
                </button>
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-slate-50/70 px-4 py-3 ring-1 ring-slate-200/70">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-violet-200 to-violet-300 text-[#6642B6] shadow-inner">
                  <Mail className="size-4" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    Email address
                  </p>
                  <p className="truncate font-semibold text-slate-900">{email || "—"}</p>
                </div>
              </div>
            </section>

            {/* Credits + Subscription */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Credits */}
              <section className="flex min-h-70 flex-col rounded-3xl bg-white p-6 shadow-[0_18px_50px_-24px_rgba(16,185,129,0.2)] ring-1 ring-slate-200/70 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-200 to-emerald-300 text-emerald-800 shadow-inner">
                    <Coins className="size-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Credits balance</h2>
                    <p className="text-xs text-slate-500">Available for humanization</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-1 flex-col">
                  {subscriptionLoading ? (
                    <div className="h-10 w-24 animate-pulse rounded-lg bg-slate-200" />
                  ) : subscriptionError ? (
                    <p className="text-sm text-amber-600">{subscriptionError}</p>
                  ) : (
                    <>
                      <span className="text-4xl font-extrabold tabular-nums tracking-tight text-slate-900">
                        {credits}
                      </span>
                      <p className="text-sm text-slate-500">credits</p>
                      <p className="text-xs text-slate-400">Available now</p>
                    </>
                  )}
                  <Link
                    href="/#pricing"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-500/25 transition hover:shadow-lg hover:shadow-emerald-500/30 active:scale-[0.98]"
                  >
                    <Sparkles className="size-4" />
                    Upgrade to Pro
                  </Link>
                </div>
              </section>

              {/* Subscription */}
              <section className="flex min-h-70 flex-col rounded-3xl bg-white p-6 shadow-[0_18px_50px_-24px_rgba(102,66,182,0.25)] ring-1 ring-slate-200/70 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-violet-200 to-violet-300 text-[#6642B6] shadow-inner">
                    <CreditCard className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base font-bold text-slate-900">Subscription</h2>
                    <p className="text-xs text-slate-500">Your current plan</p>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider ring-1 ${
                      isPaidPlan
                        ? "bg-violet-50 text-[#6642B6] ring-violet-100"
                        : "bg-slate-50 text-slate-600 ring-slate-200/80"
                    }`}
                  >
                    {planLabel}
                  </span>
                </div>

                <div className="mt-6 flex flex-1 flex-col">
                  {subscriptionLoading ? (
                    <div className="h-10 w-32 animate-pulse rounded-lg bg-slate-200" />
                  ) : subscriptionError ? (
                    <p className="text-sm text-amber-600">{subscriptionError}</p>
                  ) : (
                    <>
                      <span className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                        {planLabel} Plan
                      </span>
                      <p className="text-sm text-slate-500">{planWordsLabel(plan)}</p>
                      {isCancelPending ? (
                        <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
                          Cancels {periodEnd ? `on ${periodEnd}` : "at end of billing period"}
                        </p>
                      ) : (
                        <p className="text-xs text-slate-400">
                          Upgrade to unlock more features and higher limits
                        </p>
                      )}
                    </>
                  )}

                  {(cancelError || reactivateError) && (
                    <p className="mt-2 text-xs text-red-500">{cancelError || reactivateError}</p>
                  )}

                  <div className="mt-6 flex flex-col gap-2">
                    {showUpgrade && (
                      <Link
                        href="/#pricing"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-br from-[#8D69F3] to-[#6642B6] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-violet-500/25 transition hover:shadow-lg hover:shadow-violet-500/30 active:scale-[0.98]"
                      >
                        <Sparkles className="size-4" />
                        Upgrade to Pro
                      </Link>
                    )}

                    {isPaidPlan && !isCancelPending && (
                      <button
                        type="button"
                        onClick={() => setShowCancelModal(true)}
                        className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-500 ring-1 ring-slate-200/80 transition hover:text-red-600 hover:ring-red-200"
                      >
                        Cancel subscription
                      </button>
                    )}

                    {isCancelPending && (
                      <button
                        type="button"
                        onClick={handleReactivate}
                        disabled={reactivateLoading}
                        className="inline-flex items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-500/25 transition hover:shadow-lg hover:shadow-emerald-500/30 active:scale-[0.98] disabled:opacity-50"
                      >
                        {reactivateLoading ? "Reactivating…" : "Reactivate subscription"}
                      </button>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Cancel confirmation modal */}
          {showCancelModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-200/70 sm:p-8">
                <h3 className="text-lg font-bold text-slate-900">Cancel subscription?</h3>
                <p className="mt-3 text-sm text-slate-600">
                  Your subscription will remain active until the end of your current billing period
                  {periodEnd ? ` (${periodEnd})` : ""}. After that, you&apos;ll be moved to the Free plan.
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  You can reactivate anytime before the period ends.
                </p>
                {cancelError && <p className="mt-2 text-xs text-red-500">{cancelError}</p>}
                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCancelModal(false)}
                    disabled={cancelLoading}
                    className="flex-1 rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-200/80 transition hover:bg-slate-50 disabled:opacity-50"
                  >
                    Keep plan
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={cancelLoading}
                    className="flex-1 rounded-2xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600 active:scale-[0.98] disabled:opacity-50"
                  >
                    {cancelLoading ? "Cancelling…" : "Yes, cancel"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
