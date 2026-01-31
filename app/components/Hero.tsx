import Link from "next/link";
import { Zap, Check } from "lucide-react";

export default function Hero() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
              Write with <span className="text-[var(--brand-purple)]">confidence</span> and clarity
            </h1>
            <p className="mt-6 max-w-xl text-lg text-zinc-600">
              Transform AI-generated text into natural, authentic writing that preserves your meaning and resonates with readers.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#cta"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand-purple)] px-6 py-3 text-base font-medium text-white transition hover:opacity-90"
              >
                <Zap className="h-5 w-5" aria-hidden />
                Try Free
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-6 py-3 text-base font-medium text-zinc-700 transition hover:bg-zinc-50"
              >
                See How It Works
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-6 text-sm text-zinc-600">
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
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg sm:p-8">
      <div className="mb-4 text-right text-sm text-zinc-500">Processing time ~2s</div>
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">BEFORE AI-Generated Text</p>
          <p className="rounded-lg bg-rose-50/80 p-4 text-sm text-zinc-700">
            It is important to note that the implementation of sustainable practices in modern organizations can significantly impact their overall performance metrics and stakeholder satisfaction levels.
          </p>
        </div>
        <div className="flex justify-center">
          <Zap className="h-6 w-6 text-[var(--brand-purple)]" aria-hidden />
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">AFTER Humanized Text</p>
          <p className="rounded-lg bg-emerald-50/80 p-4 text-sm text-zinc-700">
            When companies adopt sustainable practices, they often see real improvements in performance and stakeholder satisfaction.
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[80px]">
          <p className="text-xs font-medium text-zinc-500">Tone</p>
          <div className="mt-1 h-2 w-full rounded-full bg-zinc-200">
            <div className="h-2 w-full rounded-full bg-emerald-500" style={{ width: "100%" }} />
          </div>
          <p className="mt-1 text-xs text-emerald-600">Natural</p>
        </div>
        <div className="flex-1 min-w-[80px]">
          <p className="text-xs font-medium text-zinc-500">Clarity</p>
          <div className="mt-1 h-2 w-full rounded-full bg-zinc-200">
            <div className="h-2 w-full rounded-full bg-emerald-500" style={{ width: "100%" }} />
          </div>
          <p className="mt-1 text-xs text-emerald-600">Clear</p>
        </div>
        <div className="flex-1 min-w-[80px]">
          <p className="text-xs font-medium text-zinc-500">Meaning</p>
          <div className="mt-1 h-2 w-full rounded-full bg-zinc-200">
            <div className="h-2 w-full rounded-full bg-emerald-500" style={{ width: "100%" }} />
          </div>
          <p className="mt-1 text-xs text-emerald-600">Preserved</p>
        </div>
      </div>
    </div>
  );
}
