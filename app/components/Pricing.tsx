import Link from "next/link";
import { Star, Zap, Crown, Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "Perfect for trying out HumanAI.",
    price: "Free forever",
    cta: "Get Started Free",
    ctaStyle: "border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50",
    icon: Star,
    features: [
      "500 words per month",
      "Basic humanization",
      "Standard processing speed",
      "Email support",
      "Web access",
    ],
    popular: false,
  },
  {
    name: "Professional",
    description: "For regular writers and creators.",
    price: "$19 /per month",
    cta: "Start Free Trial",
    ctaStyle: "bg-[var(--brand-purple)] text-white hover:opacity-90",
    icon: Zap,
    features: [
      "50,000 words per month",
      "Advanced humanization",
      "Priority processing",
      "Multiple tone options",
      "Priority email support",
      "Export to multiple formats",
      "Plagiarism checker integration",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For teams and heavy users.",
    price: "$49 /per month",
    cta: "Start Free Trial",
    ctaStyle: "border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50",
    icon: Crown,
    features: [
      "Unlimited words",
      "Premium humanization models",
      "Instant processing",
      "API access",
      "Custom tone profiles",
      "Team collaboration",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
    ],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="border-t border-zinc-200 bg-zinc-50/50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border bg-white p-6 shadow-sm sm:p-8 ${
                plan.popular ? "border-[var(--brand-purple)] ring-2 ring-[var(--brand-purple)]/20" : "border-zinc-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--brand-purple)] px-4 py-1 text-xs font-semibold text-white">
                  Most Popular
                </div>
              )}
              <div className="inline-flex rounded-xl bg-zinc-100 p-3 text-[var(--brand-purple)]">
                <plan.icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-zinc-900">{plan.name}</h3>
              <p className="mt-2 text-sm text-zinc-600">{plan.description}</p>
              <p className="mt-4 text-2xl font-bold text-zinc-900">{plan.price}</p>
              <Link
                href="#cta"
                className={`mt-6 inline-block w-full rounded-lg px-4 py-3 text-center text-sm font-semibold transition ${plan.ctaStyle}`}
              >
                {plan.cta}
              </Link>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-zinc-600">
                    <Check className="h-5 w-5 shrink-0 text-emerald-500" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-zinc-600">
          All plans include a 14-day free trial. No credit card required. Cancel anytime.
        </p>
        <p className="mt-2 text-center text-sm text-zinc-600">
          Need a custom plan?{" "}
          <Link href="#cta" className="font-medium text-[var(--brand-purple)] hover:underline">
            Contact our sales team
          </Link>
        </p>
      </div>
    </section>
  );
}
