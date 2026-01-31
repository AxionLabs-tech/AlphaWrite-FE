import Link from "next/link";
import PricingCard from "../components/PricingCard";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#F7F5FF] text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Pricing</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Choose the plan that fits your writing needs. Safe language: we help improve naturalness and reduce AI-like patterns.
          </p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <PricingCard
            name="Starter"
            description="For trying out AlphaWrite."
            price="$7/mo"
            cta="Get Started"
            ctaHref="/#humanizer"
            features={[
              "5,000 words per month",
              "Improves naturalness",
              "Helps reduce AI-like patterns",
              "Basic AI detection",
              "Web access",
            ]}
          />
          <PricingCard
            name="Pro"
            description="For regular students and writers."
            price="$19/mo"
            cta="Start Free Trial"
            ctaHref="/#humanizer"
            popular
            features={[
              "50,000 words per month",
              "Advanced humanization",
              "Advanced AI detection & suggestions",
              "Essay assistant",
              "Priority processing",
              "Export options",
            ]}
          />
          <PricingCard
            name="Ultra"
            description="For heavy users and power writers."
            price="$39/mo"
            cta="Start Free Trial"
            ctaHref="/#humanizer"
            features={[
              "Unlimited words",
              "Premium humanization",
              "All Pro features",
              "API access",
              "Priority support",
            ]}
          />
        </div>
        <p className="mt-10 text-center text-sm text-slate-600">
          All plans include a free trial. No credit card required to start.{" "}
          <Link href="/" className="font-medium text-[#8B5CF6] hover:underline">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
