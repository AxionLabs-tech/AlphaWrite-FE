import Link from "next/link";
import { Zap, Check } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="px-4 pt-12 pb-6 sm:px-6 sm:pt-16 sm:pb-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="text-center lg:text-left">
            {/* Chip: directly above hero text */}
            <div className="mb-6 flex justify-center lg:justify-start">
              <span
                className="inline-flex items-center gap-2 rounded-full border border-[#E0E7FF] bg-[#F7F8FC] px-4 py-2.5 text-sm font-normal text-slate-700"
                role="status"
                aria-label="50,000+ writers writing smarter, sounding human"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#6EE7B7]" aria-hidden />
                50,000+ writers. Smarter. More human.
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Write Smarter. Sound Human.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-slate-600 lg:mx-0">
              AlphaWrite helps students rewrite, improve originality, and polish essays in seconds.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Link
                href="/#humanizer"
                className="rounded-2xl bg-[#8B5CF6] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:bg-violet-600 hover:shadow-violet-500/30"
              >
                Try AlphaWrite
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-600 lg:justify-start">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-500" aria-hidden />
                No credit card required
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-500" aria-hidden />
                500 words free
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-500" aria-hidden />
                Cancel anytime
              </li>
            </ul>
          </div>
          <HeroDemoCard />
        </div>
      </div>
    </section>
  );
}

function HeroDemoCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
      <div className="mb-4 text-right text-sm text-slate-500">Processing time ~2s</div>
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">BEFORE AI-Generated Text</p>
          <p className="rounded-lg bg-rose-50/80 p-4 text-sm text-slate-700">
            It is important to note that the implementation of sustainable practices in modern organizations can significantly impact their overall performance metrics and stakeholder satisfaction levels.
          </p>
        </div>
        <div className="flex justify-center">
          <Zap className="h-6 w-6 text-[#8B5CF6]" aria-hidden />
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">AFTER AlphaWrite</p>
          <p className="rounded-lg bg-emerald-50/80 p-4 text-sm text-slate-700">
            When companies adopt sustainable practices, they often see real improvements in performance and stakeholder satisfaction.
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-4">
        <div className="min-w-[80px] flex-1">
          <p className="text-xs font-medium text-slate-500">Tone</p>
          <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
            <div className="h-2 w-full rounded-full bg-emerald-500" style={{ width: "100%" }} />
          </div>
          <p className="mt-1 text-xs text-emerald-600">Natural</p>
        </div>
        <div className="min-w-[80px] flex-1">
          <p className="text-xs font-medium text-slate-500">Clarity</p>
          <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
            <div className="h-2 w-full rounded-full bg-emerald-500" style={{ width: "100%" }} />
          </div>
          <p className="mt-1 text-xs text-emerald-600">Clear</p>
        </div>
        <div className="min-w-[80px] flex-1">
          <p className="text-xs font-medium text-slate-500">Meaning</p>
          <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
            <div className="h-2 w-full rounded-full bg-emerald-500" style={{ width: "100%" }} />
          </div>
          <p className="mt-1 text-xs text-emerald-600">Preserved</p>
        </div>
      </div>
    </div>
  );
}
