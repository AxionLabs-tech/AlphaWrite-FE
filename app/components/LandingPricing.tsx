"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import Link from "next/link";
import { useCreateCheckoutSession } from "@/services/hooks";

// --- Types (match backend / checkout) ---
type PlanId = "free" | "basic" | "pro" | "premium";
type BillingInterval = "weekly" | "monthly" | "yearly";

export interface CheckoutPayload {
  plan: "basic" | "pro" | "premium";
  billing_interval: BillingInterval;
}

// --- Plan data (single source of truth: limits + prices + copy) ---
interface PlanData {
  id: PlanId;
  name: string;
  tagline: string;
  priceUsd: number | null;
  priceCad: number | null;
  interval: BillingInterval | null;
  intervalsAvailable: BillingInterval[];
  // yearly display (per-month equivalent for label)
  priceYearlyUsd: number | null;
  priceYearlyCad: number | null;
  yearlyPerMonthUsd: number | null;
  yearlyPerMonthCad: number | null;
  wordsPerRequest: number;
  creditsPerPeriod: number;
  dailyRequests: number;
  features: string[];
}

const PLANS: PlanData[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Good for trying the product.",
    priceUsd: null,
    priceCad: null,
    interval: null,
    intervalsAvailable: [],
    priceYearlyUsd: null,
    priceYearlyCad: null,
    yearlyPerMonthUsd: null,
    yearlyPerMonthCad: null,
    wordsPerRequest: 200,
    creditsPerPeriod: 200,
    dailyRequests: 1,
    features: [
      "200 words per request",
      "200 words per period",
      "1 request per day",
    ],
  },
  {
    id: "basic",
    name: "Basic",
    tagline: "For students and casual writers.",
    priceUsd: 5.99,
    priceCad: 8.15,
    interval: "weekly",
    intervalsAvailable: ["weekly"],
    priceYearlyUsd: null,
    priceYearlyCad: null,
    yearlyPerMonthUsd: null,
    yearlyPerMonthCad: null,
    wordsPerRequest: 500,
    creditsPerPeriod: 10_000,
    dailyRequests: 10,
    features: [
      "500 words per request",
      "10,000 words per period",
      "10 requests per day",
      "Bypass AI detectors",
      "Basic Humanization Engine",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For authors, educators, marketers, and learners.",
    priceUsd: 15.99,
    priceCad: 21.75,
    interval: null,
    intervalsAvailable: ["monthly", "yearly"],
    priceYearlyUsd: 167.88,
    priceYearlyCad: 228.32,
    yearlyPerMonthUsd: 13.99,
    yearlyPerMonthCad: 19.03,
    wordsPerRequest: 2_000,
    creditsPerPeriod: 20_000,
    dailyRequests: 20,
    features: [
      "2,000 words per request",
      "20,000 words per period",
      "20 requests per day",
      "Advanced AI detection & humanizing",
      "20 languages",
      "Plagiarism-free, error-free rewriting",
      "Unlimited AI detection",
      "Standard support",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "For power users.",
    priceUsd: 30.99,
    priceCad: 42.15,
    interval: null,
    intervalsAvailable: ["monthly", "yearly"],
    priceYearlyUsd: 347.88,
    priceYearlyCad: 473.12,
    yearlyPerMonthUsd: 28.99,
    yearlyPerMonthCad: 39.43,
    wordsPerRequest: 4_000,
    creditsPerPeriod: 40_000,
    dailyRequests: 20,
    features: [
      "4,000 words per request",
      "40,000 words per period",
      "20 requests per day",
      "Advanced Turnitin Bypass",
      "Priority support",
      "Everything in Pro",
      "Fastest processing",
      "Undetectable results",
    ],
  },
];

// --- Display helpers (Stripe will show user's local currency at checkout) ---
function formatPrice(
  plan: PlanData,
  interval: BillingInterval
): { main: string; sub?: string } {
  if (plan.id === "free") return { main: "Free" };

  if (plan.id === "basic") {
    const p = plan.priceUsd!;
    return {
      main: `$${p.toFixed(2)}/week`,
      sub: "Billed weekly",
    };
  }

  if (plan.id === "pro" || plan.id === "premium") {
    if (interval === "monthly") {
      const p = plan.priceUsd!;
      return { main: `$${p.toFixed(2)}/month` };
    }
    const perMo = plan.yearlyPerMonthUsd!;
    const total = plan.priceYearlyUsd!;
    return {
      main: `$${perMo.toFixed(2)}/month`,
      sub: `Billed annually ($${total.toFixed(2)}/year)`,
    };
  }

  return { main: "" };
}

/** Build payload for checkout API. Only for paid plans; do not send monthly/yearly for basic. */
export function buildCheckoutPayload(
  plan: "basic" | "pro" | "premium",
  billingInterval: BillingInterval
): CheckoutPayload {
  if (plan === "basic" && billingInterval !== "weekly") {
    throw new Error("Backend only supports basic + weekly");
  }
  return { plan, billing_interval: billingInterval };
}

export default function LandingPricing() {
  const [interval, setInterval] = useState<BillingInterval>("monthly");
  const { createCheckoutSession, isLoading, error, resetError } = useCreateCheckoutSession();
  const [checkingOutPlan, setCheckingOutPlan] = useState<PlanId | null>(null);

  const handleCheckout = async (planId: PlanId) => {
    if (planId === "free") return;
    resetError();
    const billingInterval = planId === "basic" ? "weekly" : interval;
    const payload = buildCheckoutPayload(planId, billingInterval);
    setCheckingOutPlan(planId);
    const result = await createCheckoutSession({
      plan: payload.plan,
      billing_interval: payload.billing_interval,
    });
    setCheckingOutPlan(null);
    if (result?.url) {
      window.location.href = result.url;
    }
  };

  return (
    <section id="pricing" className="px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#8B5CF6]">
            Pricing
          </span>
          <h2 className="mt-4 text-balance text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-slate-900">
            Simple, transparent pricing.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-slate-600">
            Choose the plan that fits your needs. Limits match what the product enforces.
          </p>
        </header>

        {error && (
          <div
            className="mx-auto mt-6 max-w-xl rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Monthly / Yearly toggle */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <button
              type="button"
              onClick={() => setInterval("monthly")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                interval === "monthly"
                  ? "bg-[#8B5CF6] text-white shadow-sm shadow-violet-500/30"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setInterval("yearly")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                interval === "yearly"
                  ? "bg-[#8B5CF6] text-white shadow-sm shadow-violet-500/30"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Yearly
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold tracking-wide ${
                  interval === "yearly"
                    ? "bg-white/20 text-white"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {PLANS.map((plan) => {
            const effectiveInterval =
              plan.id === "basic"
                ? "weekly"
                : plan.intervalsAvailable.includes(interval)
                  ? interval
                  : "monthly";
            const { main, sub } = formatPrice(plan, effectiveInterval);
            const isPopular = plan.id === "pro";

            const cardClass = isPopular
              ? "relative flex flex-col overflow-hidden rounded-3xl bg-slate-900 p-7 text-white shadow-[0_0_0_1px_rgba(139,92,246,0.4),0_32px_64px_-24px_rgba(139,92,246,0.55),0_12px_24px_-8px_rgba(15,23,42,0.25)] sm:p-8"
              : "relative flex flex-col rounded-3xl bg-white p-7 shadow-[0_0_0_1px_rgba(15,23,42,0.04),0_1px_0_0_rgba(255,255,255,0.8)_inset,0_12px_32px_-16px_rgba(15,23,42,0.18),0_4px_8px_-4px_rgba(15,23,42,0.06)] transition-all duration-300 hover:shadow-[0_0_0_1px_rgba(139,92,246,0.18),0_1px_0_0_rgba(255,255,255,0.8)_inset,0_24px_48px_-20px_rgba(15,23,42,0.22),0_6px_12px_-4px_rgba(15,23,42,0.08)] sm:p-8";

            return (
              <div key={plan.id} className={cardClass}>
                {/* Violet halo behind Pro */}
                {isPopular && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-px -z-10 rounded-3xl bg-gradient-to-br from-violet-500/30 via-transparent to-fuchsia-500/30 blur-lg"
                  />
                )}

                {isPopular && (
                  <div className="mb-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-violet-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md shadow-violet-500/40">
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    Most popular
                  </div>
                )}

                <h3
                  className={`text-xl font-bold tracking-tight ${
                    isPopular ? "text-white" : "text-slate-900"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`mt-1 text-sm leading-relaxed ${
                    isPopular ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  {plan.tagline}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span
                    className={`text-4xl font-bold tracking-tight ${
                      isPopular ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {main.split("/")[0]}
                  </span>
                  {main.includes("/") && (
                    <span
                      className={`text-sm font-medium ${
                        isPopular ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      /{main.split("/")[1]}
                    </span>
                  )}
                </div>
                <p
                  className={`mt-1 text-[13px] ${
                    isPopular ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {sub ?? (plan.id === "free" ? "No credit card required" : "Cancel anytime")}
                </p>

                {plan.id === "free" ? (
                  <Link
                    href="/#humanizer"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-white px-5 py-3.5 text-[15px] font-semibold text-slate-800 shadow-[0_0_0_1px_rgba(226,232,240,1),0_1px_2px_rgba(15,23,42,0.04)] transition hover:shadow-[0_0_0_1px_rgba(203,213,225,1),0_4px_10px_-2px_rgba(15,23,42,0.08)]"
                  >
                    Get started free
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleCheckout(plan.id)}
                    className={
                      isPopular
                        ? "mt-6 inline-flex w-full items-center justify-center rounded-xl bg-white px-5 py-3.5 text-[15px] font-semibold text-slate-900 shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_8px_20px_-6px_rgba(0,0,0,0.3)] transition hover:bg-slate-50 disabled:opacity-70"
                        : "mt-6 inline-flex w-full items-center justify-center rounded-xl bg-white px-5 py-3.5 text-[15px] font-semibold text-slate-800 shadow-[0_0_0_1px_rgba(226,232,240,1),0_1px_2px_rgba(15,23,42,0.04)] transition hover:shadow-[0_0_0_1px_rgba(203,213,225,1),0_4px_10px_-2px_rgba(15,23,42,0.08)] disabled:opacity-70"
                    }
                  >
                    {checkingOutPlan === plan.id && isLoading ? "Redirecting…" : "Subscribe"}
                  </button>
                )}

                <div
                  className={`my-6 h-px ${isPopular ? "bg-white/10" : "bg-slate-200/70"}`}
                />

                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-start gap-2.5 text-[13.5px] leading-relaxed ${
                        isPopular ? "text-slate-200" : "text-slate-600"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full ${
                          isPopular
                            ? "bg-violet-500/30 text-violet-200"
                            : "bg-violet-50 text-[#8B5CF6]"
                        }`}
                      >
                        <Check className="size-2.5" strokeWidth={3} aria-hidden />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center gap-1 text-center text-sm text-slate-600">
          <p>No credit card required for Free. Cancel anytime on paid plans.</p>
          <p>
            Need a custom plan?{" "}
            <Link href="#cta" className="font-medium text-[#8B5CF6] hover:underline">
              Contact our sales team
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
