"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { User, LogOut, Coins, CreditCard } from "lucide-react";
import { useAuth, useSubscriptionStatus, useCancelSubscription, useReactivateSubscription } from "@/services/hooks";

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
              {subscriptionLoading ? (
                <div className="h-10 w-24 animate-pulse rounded-lg bg-slate-200" />
              ) : subscriptionError ? (
                <p className="text-sm text-amber-600">{subscriptionError}</p>
              ) : (
                <>
                  <span className="text-3xl font-bold tracking-tight text-slate-900">{credits}</span>
                  <p className="text-sm text-slate-500">credits</p>
                  <p className="text-xs text-slate-400">Available now</p>
                </>
              )}
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
              {subscriptionLoading ? (
                <div className="h-10 w-32 animate-pulse rounded-lg bg-slate-200" />
              ) : subscriptionError ? (
                <p className="text-sm text-amber-600">{subscriptionError}</p>
              ) : (
                <>
                  <span className="text-3xl font-bold tracking-tight text-slate-900">{planLabel} Plan</span>
                  <p className="text-sm text-slate-500">{planWordsLabel(plan)}</p>
                  {isCancelPending ? (
                    <p className="mt-1 text-xs text-amber-600">
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
                    className="inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-blue-500 to-[#8B5CF6] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:opacity-95 hover:shadow-violet-500/30"
                  >
                    Upgrade to Pro
                  </Link>
                )}

                {isPaidPlan && !isCancelPending && (
                  <button
                    type="button"
                    onClick={() => setShowCancelModal(true)}
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-500 transition hover:border-red-200 hover:text-red-600"
                  >
                    Cancel Subscription
                  </button>
                )}

                {isCancelPending && (
                  <button
                    type="button"
                    onClick={handleReactivate}
                    disabled={reactivateLoading}
                    className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-600 disabled:opacity-50"
                  >
                    {reactivateLoading ? "Reactivating…" : "Reactivate Subscription"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel confirmation modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900">Cancel Subscription?</h3>
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
                className="flex-1 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Keep Plan
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={cancelLoading}
                className="flex-1 rounded-2xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-50"
              >
                {cancelLoading ? "Cancelling…" : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
