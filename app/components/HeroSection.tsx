"use client";

import {
  ArrowRight,
  BookOpen,
  Check,
  FileText,
  Layers,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthOptional } from "@/services/hooks";
import { useAuthModal } from "@/app/context/AuthModalContext";

export default function HeroSection() {
  const router = useRouter();
  const auth = useAuthOptional();
  const { openAuthModal } = useAuthModal();

  const handleStart = () => {
    if (!auth?.isLoading && !auth?.isAuthenticated) {
      openAuthModal();
      return;
    }
    router.push("/dashboard");
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
            {/* Status chip */}
            <div className="mb-7 flex justify-center lg:justify-start">
              <span
                className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-2 text-[13px] font-medium text-slate-700 shadow-[0_0_0_1px_rgba(139,92,246,0.14),0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-sm"
                role="status"
              >
                <span className="relative flex size-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                50,000+ students. From notes to final draft.
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1] tracking-[-0.025em] text-slate-900">
              Study Smarter.
              <br />
              <span
                style={{ fontFamily: "var(--font-fraunces-raw)" }}
                className="relative inline-block font-serif font-medium italic tracking-[-0.02em] text-slate-900"
              >
                Write&nbsp;Human.
                <span
                  aria-hidden
                  className="absolute -bottom-2 left-0 right-0 h-1.5 rounded-full bg-gradient-to-r from-transparent via-violet-300 to-transparent opacity-50"
                />
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-md text-[17px] leading-relaxed text-slate-600 lg:mx-0">
              AlphaWrite is the AI study companion for students. Understand
              your materials, build flashcards, prep for exams, and polish
              essays that pass any AI detection check.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <button
                type="button"
                onClick={handleStart}
                className="group inline-flex items-center gap-2.5 rounded-2xl bg-[#8B5CF6] px-6 py-4 text-base font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_0_0_1px_rgba(124,58,237,0.4),0_14px_30px_-10px_rgba(139,92,246,0.5),0_4px_10px_-2px_rgba(15,23,42,0.12)] transition-all duration-200 hover:bg-violet-600"
              >
                Start studying
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </button>
              <a
                href="#pillars"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 text-base font-semibold text-slate-800 shadow-[0_0_0_1px_rgba(226,232,240,1),0_1px_2px_rgba(15,23,42,0.04)] transition hover:shadow-[0_0_0_1px_rgba(203,213,225,1),0_4px_10px_-2px_rgba(15,23,42,0.08)]"
              >
                See what&apos;s inside
              </a>
            </div>
          </div>

          <StudyPreviewDeck />
        </div>
      </div>
    </section>
  );
}

function StudyPreviewDeck() {
  return (
    <div className="relative">
      <div className="grid">
        {/* Background card 1 */}
        <div
          aria-hidden
          className="col-start-1 row-start-1 translate-x-7 translate-y-6 rotate-[2.4deg] rounded-[22px] bg-gradient-to-br from-violet-100 to-white opacity-90 shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_24px_60px_-22px_rgba(15,23,42,0.28),0_8px_16px_-6px_rgba(15,23,42,0.06)]"
          style={{ gridArea: "1 / 1", minHeight: 320 }}
        />
        {/* Background card 2 */}
        <div
          aria-hidden
          className="col-start-1 row-start-1 translate-x-3.5 translate-y-2.5 -rotate-[1.2deg] rounded-[22px] bg-white opacity-85 shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_24px_60px_-22px_rgba(15,23,42,0.28),0_8px_16px_-6px_rgba(15,23,42,0.06)]"
          style={{ gridArea: "1 / 1", minHeight: 320 }}
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
              alphawrite.ai · workspace
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
              <Sparkles className="size-3" />
              AI
            </span>
          </div>

          {/* Uploaded source */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Source
            </p>
            <div className="mt-2 flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
                <FileText className="size-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12.5px] font-semibold text-slate-800">
                  Thermodynamics – Chapter 4.pdf
                </p>
                <p className="text-[10px] text-slate-500">
                  28 pages · uploaded just now
                </p>
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="mt-3 rounded-2xl bg-linear-to-br from-violet-50 to-white px-4 py-3.5 shadow-[inset_0_0_0_1px_rgba(196,181,253,0.4)]">
            <div className="mb-1.5 flex items-center gap-2">
              <BookOpen className="size-3.5 text-[#6642B6]" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#6642B6]">
                Explain this concept
              </p>
            </div>
            <p className="text-[12.5px] leading-relaxed text-slate-700">
              Entropy measures how much energy in a system is unavailable to do
              work.{" "}
              <span className="rounded-md bg-violet-100 px-1 py-px text-[11px] font-semibold text-[#6642B6]">
                p.14 §4.2
              </span>
            </p>
          </div>

          {/* Flashcards strip */}
          <div className="mt-3 rounded-2xl bg-emerald-50/70 px-4 py-3 shadow-[inset_0_0_0_1px_rgba(167,243,208,0.4)]">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="size-3.5 text-emerald-600" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                  Auto-generated flashcards
                </p>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700">
                12 cards
              </span>
            </div>
            <div className="flex gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-6 flex-1 rounded-md ${
                    i < 2 ? "bg-emerald-500/80" : "bg-emerald-200"
                  }`}
                />
              ))}
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-[10.5px] font-medium text-emerald-700">
              <Check className="size-3" strokeWidth={3} />
              2 of 12 reviewed today
            </p>
          </div>
        </div>

        {/* Floating readiness badge */}
        <div
          aria-hidden
          className="absolute bottom-3 left-3 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_18px_36px_-12px_rgba(15,23,42,0.22)] sm:-bottom-6 sm:-left-6"
        >
          <div className="relative flex size-11 items-center justify-center">
            <svg width="44" height="44" viewBox="0 0 44 44" className="absolute inset-0">
              <circle cx="22" cy="22" r="18" fill="none" stroke="#EDE9FE" strokeWidth="4" />
              <circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="113"
                strokeDashoffset="25"
                transform="rotate(-90 22 22)"
              />
            </svg>
            <span className="relative text-[11px] font-bold text-[#6642B6]">
              78%
            </span>
          </div>
          <div className="text-left leading-tight">
            <p className="m-0 text-[13px] font-bold text-slate-900">
              Exam-ready
            </p>
            <p className="m-0 text-[11px] text-slate-500">14 days to exam</p>
          </div>
        </div>
      </div>
    </div>
  );
}
