import Link from "next/link";
import { Sparkles, Check, ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="cta" className="px-4 pb-32 pt-24 sm:px-6 sm:pb-40 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="relative">
          {/* Hero violet card with radial light spot */}
          <div
            className="relative overflow-hidden rounded-[28px] px-6 pb-32 pt-20 text-center sm:px-16 sm:pb-36 sm:pt-24"
            style={{
              background:
                "radial-gradient(120% 100% at 50% 0%, #A78BFA 0%, #8B5CF6 35%, #6D28D9 100%)",
            }}
          >
            {/* Inner top highlight */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
            {/* Radial light spot */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 size-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/15 blur-3xl"
            />
            {/* Subtle bottom-right glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 -right-20 size-80 rounded-full bg-fuchsia-400/20 blur-3xl"
            />

            <div className="relative">
              {/* Chrome sparkle medallion */}
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gradient-to-b from-white/30 to-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_0_0_1px_rgba(255,255,255,0.2),0_10px_30px_-10px_rgba(0,0,0,0.25)] backdrop-blur-sm">
                <Sparkles className="size-6 text-white" strokeWidth={1.8} aria-hidden />
              </div>

              <h2 className="mt-7 text-balance text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white">
                Ready to write with confidence?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-white/85">
                Join thousands of students who use AlphaWrite to rewrite, improve
                originality, and polish essays in seconds.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/#humanizer"
                  className="group inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 text-[15px] font-semibold text-violet-700 shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset,0_10px_24px_-8px_rgba(0,0,0,0.3)] transition hover:bg-slate-50"
                >
                  Start free trial
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
                <Link
                  href="#pricing"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-6 py-4 text-[15px] font-semibold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.22)] backdrop-blur-sm transition hover:bg-white/15"
                >
                  View pricing
                </Link>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-white/75">
                {["14-day free trial", "No credit card required", "Cancel anytime"].map(
                  (item) => (
                    <span key={item} className="inline-flex items-center gap-1.5">
                      <Check className="size-3.5" strokeWidth={2.4} aria-hidden />
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Stats — half-overlap the bottom of the card */}
          <div className="-mt-24 grid gap-4 px-4 sm:grid-cols-3 sm:gap-5 sm:px-12">
            {[
              { value: "50,000+", label: "Active users worldwide" },
              { value: "10M+", label: "Words humanized" },
              { value: "4.9 / 5", label: "Average rating" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white px-6 py-5 text-center shadow-[0_0_0_1px_rgba(15,23,42,0.04),0_1px_0_0_rgba(255,255,255,0.8)_inset,0_18px_38px_-18px_rgba(15,23,42,0.22),0_4px_8px_-4px_rgba(15,23,42,0.06)]"
              >
                <p className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">
                  {stat.value}
                </p>
                <p className="mt-1 text-[13px] text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
