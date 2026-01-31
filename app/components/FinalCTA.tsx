import Link from "next/link";
import { Sparkles, Check } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="cta" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-gradient-brand px-6 py-16 text-center shadow-xl sm:px-12 sm:py-20">
          <Sparkles className="mx-auto h-10 w-10 text-white/90" aria-hidden />
          <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
            Ready to write with confidence?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Join thousands of students who use AlphaWrite to rewrite, improve originality, and polish essays in seconds.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-base font-semibold text-[#8B5CF6] transition hover:bg-white/95"
            >
              Start Free Trial
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/pricing"
              className="inline-flex rounded-lg border-2 border-white/80 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              View Pricing
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/90">
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-white" aria-hidden />
              14-day free trial
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-white" aria-hidden />
              No credit card required
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-white" aria-hidden />
              Cancel anytime
            </li>
          </ul>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <p className="text-3xl font-bold text-[#8B5CF6]">50,000+</p>
            <p className="mt-1 text-sm text-slate-600">Active users worldwide</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <p className="text-3xl font-bold text-[#8B5CF6]">10M+</p>
            <p className="mt-1 text-sm text-slate-600">Words humanized</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <p className="text-3xl font-bold text-rose-500">4.9/5</p>
            <p className="mt-1 text-sm text-slate-600">Average rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
