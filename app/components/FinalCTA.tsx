import Link from "next/link";
import { Sparkles, Check } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="cta" className="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-brand px-6 py-20 text-center sm:px-16 sm:py-28">
          {/* Subtle background circles */}
          <div className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-white/5" aria-hidden />
          <div className="pointer-events-none absolute -bottom-16 -right-16 size-60 rounded-full bg-white/5" aria-hidden />

          <div className="relative">
            <Sparkles className="mx-auto size-9 text-white/80" aria-hidden />
            <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Ready to write with confidence?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-white/80 sm:text-lg">
              Join thousands of students who use AlphaWrite to rewrite, improve originality, and polish essays in seconds.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#8B5CF6] transition hover:bg-white/90"
              >
                Start Free Trial
                <span aria-hidden>&rarr;</span>
              </Link>
              <Link
                href="/pricing"
                className="inline-flex rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Pricing
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70">
              {["14-day free trial", "No credit card required", "Cancel anytime"].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <Check className="size-4" aria-hidden />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { value: "50,000+", label: "Active users worldwide" },
            { value: "10M+", label: "Words humanized" },
            { value: "4.9/5", label: "Average rating" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-white p-6 text-center ring-1 ring-slate-200/80">
              <p className="text-2xl font-bold text-[#8B5CF6] sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
