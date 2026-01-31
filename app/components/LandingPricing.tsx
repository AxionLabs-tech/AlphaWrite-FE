"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useState } from "react";

type Billing = "annual" | "monthly";

const safeDetectionBasic = "Improves naturalness; works with common AI detection tools";
const safeDetectionPro = "Improves naturalness; works with major AI detection checkers";

const plans = [
  {
    name: "Basic",
    description: "For students who need basic humanization features",
    annualPrice: "$5.99",
    annualPerMonth: "$2.99/month",
    annualDetail: "Billed annually",
    monthlyPrice: "$5.99/month",
    monthlyDetail: null,
    cta: "Subscribe",
    popular: false,
    features: [
      "5,000 words per month",
      "Basic AI Humanizer",
      "Basic AI Detection",
      "Basic Paraphraser",
      "Multilingual support",
      "My Writing Style",
      safeDetectionBasic,
    ],
  },
  {
    name: "Pro",
    description: "For active writers with advanced humanization model",
    annualPrice: "$19.99",
    annualPerMonth: "$9.99/month",
    annualDetail: "Billed annually",
    monthlyPrice: "$19.99/month",
    monthlyDetail: null,
    cta: "Subscribe",
    popular: true,
    features: [
      "15,000 words per month",
      "Advanced AI Humanizer",
      "Advanced AI Detection",
      "Advanced Paraphraser",
      "Multilingual support",
      "My Writing Style",
      safeDetectionPro,
    ],
  },
  {
    name: "Ultra",
    description: "For experts creating long-form articles and papers",
    annualPrice: "$39.99",
    annualPerMonth: "$19.99/month",
    annualDetail: "Billed annually",
    monthlyPrice: "$39.99/month",
    monthlyDetail: null,
    cta: "Subscribe",
    popular: false,
    features: [
      "30,000 words per month",
      "Advanced AI Humanizer",
      "Advanced AI Detection",
      "Advanced Paraphraser",
      "Multilingual support",
      "My Writing Style",
      safeDetectionPro,
      "Fast processing",
      "Priority support",
    ],
  },
  {
    name: "Unlimited",
    description: "For premium users, unlimited access and full power",
    annualPrice: "$79.99",
    annualPerMonth: "$39.99/month",
    annualDetail: "Billed annually",
    monthlyPrice: "$79.99/month",
    monthlyDetail: null,
    cta: "Subscribe",
    popular: false,
    features: [
      "Unlimited words per month",
      "Advanced AI Humanizer",
      "Advanced AI Detection",
      "Advanced Paraphraser",
      "Multilingual support",
      "My Writing Style",
      safeDetectionPro,
      "Fast processing",
      "Priority support",
    ],
  },
];

export default function LandingPricing() {
  const [billing, setBilling] = useState<Billing>("annual");

  return (
    <section id="pricing" className="border-t border-slate-200 bg-slate-50/60 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>
        </header>

        {/* Annual / Monthly toggle */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setBilling("annual")}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                billing === "annual"
                  ? "bg-[#8B5CF6] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Annual
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  billing === "annual" ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"
                }`}
              >
                Save 50%
              </span>
            </button>
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                billing === "monthly"
                  ? "bg-[#8B5CF6] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 ${
                plan.popular
                  ? "border-[#8B5CF6] ring-2 ring-[#8B5CF6]/20 lg:-translate-y-1"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#8B5CF6] px-4 py-1.5 text-xs font-semibold text-white">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{plan.description}</p>

              {billing === "annual" ? (
                <div className="mt-6 flex flex-col gap-0.5">
                  <span className="text-3xl font-bold text-slate-900">{plan.annualPrice}</span>
                  <span className="text-sm text-slate-500">{plan.annualPerMonth}</span>
                  <span className="text-xs text-slate-500">{plan.annualDetail}</span>
                </div>
              ) : (
                <div className="mt-6 flex flex-col gap-0.5">
                  <span className="text-3xl font-bold text-slate-900">{plan.monthlyPrice}</span>
                  {plan.monthlyDetail && (
                    <span className="text-xs text-slate-500">{plan.monthlyDetail}</span>
                  )}
                </div>
              )}

              <Link
                href="/#humanizer"
                className={`mt-6 inline-flex w-full items-center justify-center rounded-2xl px-6 py-3.5 text-base font-semibold transition ${
                  plan.popular
                    ? "bg-[#8B5CF6] text-white shadow-lg shadow-violet-500/25 hover:bg-violet-600"
                    : "border-2 border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:bg-slate-50"
                }`}
              >
                {plan.cta}
              </Link>
              <ul className="mt-6 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check className="mt-0.5 size-5 shrink-0 text-[#8B5CF6]" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-slate-600">
          All plans include a 14-day free trial. No credit card required. Cancel anytime.
        </p>
        <p className="mt-2 text-center text-sm text-slate-600">
          Need a custom plan?{" "}
          <Link href="#cta" className="font-medium text-[#8B5CF6] hover:underline">
            Contact our sales team
          </Link>
        </p>
      </div>
    </section>
  );
}
