"use client";

import { ArrowRight, Zap } from "lucide-react";
import { useDemoText, DEFAULT_DEMO_TEXT } from "@/app/context/DemoContext";

export default function HeroSection() {
  const { setDemoText } = useDemoText();

  const handleTryDemo = () => {
    setDemoText(DEFAULT_DEMO_TEXT);
    const formSection = document.getElementById("humanizer");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative px-4 pt-12 pb-6 sm:px-6 sm:pt-16 sm:pb-8 lg:px-8 lg:pt-20">
      {/* Ambient spotlights */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 -z-10 size-[640px] rounded-full bg-violet-400/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-0 -z-10 size-[420px] rounded-full bg-fuchsia-300/15 blur-3xl"
      />

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
          <div className="text-center lg:text-left">
            {/* Glass status chip */}
            <div className="mb-7 flex justify-center lg:justify-start">
              <span
                className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-2 text-[13px] font-medium text-slate-700 shadow-[0_0_0_1px_rgba(139,92,246,0.14),0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-sm"
                role="status"
              >
                <span className="relative flex size-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                50,000+ writers. Smarter. More human.
              </span>
            </div>

            {/* Headline with italic serif accent */}
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1] tracking-[-0.025em] text-slate-900">
              Write Smarter.
              <br />
              <span className="relative inline-block font-serif font-medium italic tracking-[-0.02em] text-slate-900">
                Sound&nbsp;Human.
                <span
                  aria-hidden
                  className="absolute -bottom-2 left-0 right-0 h-1.5 rounded-full bg-gradient-to-r from-transparent via-violet-300 to-transparent opacity-50"
                />
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-md text-[17px] leading-relaxed text-slate-600 lg:mx-0">
              AlphaWrite helps students rewrite, improve originality, and polish essays in seconds.
              Built to pass any AI detection check effortlessly.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <button
                type="button"
                onClick={handleTryDemo}
                className="group inline-flex items-center gap-2.5 rounded-2xl bg-[#8B5CF6] px-6 py-4 text-base font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_0_0_1px_rgba(124,58,237,0.4),0_14px_30px_-10px_rgba(139,92,246,0.5),0_4px_10px_-2px_rgba(15,23,42,0.12)] transition-all duration-200 hover:bg-violet-600 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_0_0_1px_rgba(124,58,237,0.5),0_18px_38px_-10px_rgba(139,92,246,0.55),0_6px_14px_-3px_rgba(15,23,42,0.14)]"
              >
                Try AlphaWrite
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </button>
              <a
                href="#how"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 text-base font-semibold text-slate-800 shadow-[0_0_0_1px_rgba(226,232,240,1),0_1px_2px_rgba(15,23,42,0.04)] transition hover:shadow-[0_0_0_1px_rgba(203,213,225,1),0_4px_10px_-2px_rgba(15,23,42,0.08)]"
              >
                See how it works
              </a>
            </div>

          </div>

          <HeroDeck />
        </div>
      </div>
    </section>
  );
}

function HeroDeck() {
  return (
    <div className="relative">
      <div className="grid">
        {/* Background deck card 1 (rotated, behind) */}
        <div
          aria-hidden
          className="col-start-1 row-start-1 translate-x-7 translate-y-6 rotate-[2.4deg] rounded-[22px] bg-gradient-to-br from-violet-100 to-white opacity-90 shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_24px_60px_-22px_rgba(15,23,42,0.28),0_8px_16px_-6px_rgba(15,23,42,0.06)]"
          style={{ gridArea: "1 / 1", minHeight: 280 }}
        />
        {/* Background deck card 2 (slight tilt) */}
        <div
          aria-hidden
          className="col-start-1 row-start-1 translate-x-3.5 translate-y-2.5 -rotate-[1.2deg] rounded-[22px] bg-white opacity-85 shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_24px_60px_-22px_rgba(15,23,42,0.28),0_8px_16px_-6px_rgba(15,23,42,0.06)]"
          style={{ gridArea: "1 / 1", minHeight: 280 }}
        />
        {/* Top card */}
        <div
          className="relative col-start-1 row-start-1 rounded-[22px] bg-white p-5 shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_24px_60px_-22px_rgba(15,23,42,0.28),0_8px_16px_-6px_rgba(15,23,42,0.06)] sm:p-6"
          style={{ gridArea: "1 / 1" }}
        >
          {/* Browser chrome */}
          <div className="mb-4 flex items-center gap-2 px-1">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-slate-200" />
              <span className="size-2.5 rounded-full bg-slate-200" />
              <span className="size-2.5 rounded-full bg-slate-200" />
            </div>
            <span className="flex-1 rounded-md bg-slate-100 px-3 py-1.5 text-center font-mono text-[11px] text-slate-500">
              alphawrite.ai · humanizer
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              ~2s
            </span>
          </div>

          {/* Before pane */}
          <div>
            <div className="mb-2 flex items-center gap-2.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                Before
              </span>
              <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-medium tracking-wide text-red-600">
                100% AI
              </span>
            </div>
            <p className="m-0 mb-4 rounded-2xl bg-gradient-to-b from-red-50/65 to-red-50/25 px-4 py-3.5 text-sm leading-relaxed text-slate-700 shadow-[inset_0_0_0_1px_rgba(252,165,165,0.3)]">
              It is important to note that the implementation of sustainable practices in modern
              organizations can significantly impact their overall performance metrics.
            </p>
          </div>

          {/* Divider with violet zap square */}
          <div className="-mt-1 mb-3.5 flex items-center gap-3">
            <span className="h-px flex-1 bg-slate-200" />
            <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 text-white shadow-[0_8px_18px_-6px_rgba(139,92,246,0.5)]">
              <Zap className="size-4" aria-hidden />
            </span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          {/* After pane */}
          <div>
            <div className="mb-2 flex items-center gap-2.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                After
              </span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium tracking-wide text-emerald-700">
                0% AI
              </span>
            </div>
            <p className="m-0 mb-4 rounded-2xl bg-gradient-to-b from-emerald-50/65 to-emerald-50/25 px-4 py-3.5 text-sm leading-relaxed text-slate-700 shadow-[inset_0_0_0_1px_rgba(110,231,183,0.3)]">
              When companies adopt sustainable practices, they often see real improvements in
              performance and stakeholder satisfaction.
            </p>
          </div>

          {/* Meters */}
          <div className="mt-1.5 grid grid-cols-3 gap-3">
            {[
              { label: "Tone", value: "Natural", pct: 100 },
              { label: "Clarity", value: "Clear", pct: 96 },
              { label: "Meaning", value: "Preserved", pct: 100 },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-xl bg-slate-50 px-3.5 py-3 shadow-[inset_0_0_0_1px_rgba(241,245,249,1)]"
              >
                <p className="m-0 text-[11px] font-medium text-slate-500">{m.label}</p>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                    style={{ width: `${m.pct}%` }}
                  />
                </div>
                <p className="mt-1.5 m-0 text-xs font-semibold text-emerald-700">{m.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Floating "Human written" score badge */}
        <div
          aria-hidden
          className="absolute -bottom-7 -left-7 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_18px_36px_-12px_rgba(15,23,42,0.22)] sm:-bottom-6 sm:-left-6"
        >
          <div className="relative flex size-11 items-center justify-center">
            <svg width="44" height="44" viewBox="0 0 44 44" className="absolute inset-0">
              <circle cx="22" cy="22" r="18" fill="none" stroke="#D1FAE5" strokeWidth="4" />
              <circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke="#10B981"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="113"
                strokeDashoffset="11"
                transform="rotate(-90 22 22)"
              />
            </svg>
            <span className="relative text-[11px] font-bold text-emerald-700">90%</span>
          </div>
          <div className="text-left leading-tight">
            <p className="m-0 text-[13px] font-bold text-slate-900">Human written</p>
            <p className="m-0 text-[11px] text-slate-500">Passes every detector</p>
          </div>
        </div>
      </div>
    </div>
  );
}
