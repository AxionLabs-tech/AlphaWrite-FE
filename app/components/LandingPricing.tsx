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
    <section
      id="pricing"
      className="border-t border-slate-200 bg-slate-50/60 px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <header className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Choose the plan that fits your needs. Limits match what the product
            enforces.
          </p>
        </header>

        {error && (
          <div className="mx-auto mt-6 max-w-xl rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700" role="alert">
            {error}
          </div>
        )}

        {/* Monthly / Yearly (only affects Pro & Premium) */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setInterval("monthly")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                interval === "monthly"
                  ? "bg-[#8B5CF6] text-white"
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
                  ? "bg-[#8B5CF6] text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Yearly
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  interval === "yearly"
                    ? "bg-white/20 text-white"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                Save
              </span>
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => {
            const effectiveInterval =
              plan.id === "basic" ? "weekly" : plan.intervalsAvailable.includes(interval) ? interval : "monthly";
            const { main, sub } = formatPrice(plan, effectiveInterval);
            const isPopular = plan.id === "pro";

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 ${
                  isPopular
                    ? "border-[#8B5CF6] ring-2 ring-[#8B5CF6]/20 lg:-translate-y-1"
                    : ""
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#8B5CF6] px-4 py-1.5 text-xs font-semibold text-white">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{plan.tagline}</p>

                <div className="mt-6 flex flex-col gap-0.5">
                  <span className="text-3xl font-bold text-slate-900">
                    {main}
                  </span>
                  {sub && (
                    <span className="text-sm text-slate-500">{sub}</span>
                  )}
                </div>

                {plan.id === "free" ? (
                  <Link
                    href="/#humanizer"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-2xl border-2 border-slate-200 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 transition hover:border-violet-300 hover:bg-slate-50"
                  >
                    Get started free
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleCheckout(plan.id)}
                    className={`mt-6 inline-flex w-full items-center justify-center rounded-2xl px-6 py-3.5 text-base font-semibold transition disabled:opacity-70 ${
                      isPopular
                        ? "bg-[#8B5CF6] text-white shadow-lg shadow-violet-500/25 hover:bg-violet-600"
                        : "border-2 border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:bg-slate-50"
                    }`}
                  >
                    {checkingOutPlan === plan.id && isLoading
                      ? "Redirecting…"
                      : plan.id === "basic"
                        ? "Subscribe"
                        : "Subscribe"}
                  </button>
                )}

                <ul className="mt-6 space-y-2.5">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-slate-600"
                    >
                      <Check
                        className="mt-0.5 size-5 shrink-0 text-[#8B5CF6]"
                        aria-hidden
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-slate-600">
          No credit card required for Free. Cancel anytime on paid plans.
        </p>
        <p className="mt-2 text-center text-sm text-slate-600">
          Need a custom plan?{" "}
          <Link
            href="#cta"
            className="font-medium text-[#8B5CF6] hover:underline"
          >
            Contact our sales team
          </Link>
        </p>
      </div>
    </section>
  );
}
