"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  FileText,
  Layers,
} from "lucide-react";

type Pillar = {
  n: string;
  title: string;
  description: string;
  foundation: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  cta:
    | { kind: "live"; href: string; label: string }
    | { kind: "soon"; label: string };
};

const PILLARS: Pillar[] = [
  {
    n: "01",
    title: "AI Study Assistant",
    description:
      "Upload PDFs, lecture notes, documents, images or links. AlphaWrite explains difficult concepts, answers questions and simplifies complex topics.",
    foundation: "AI chat + source-cited answers",
    icon: BookOpen,
    gradient: "from-[#8D69F3] to-[#6642B6]",
    cta: { kind: "soon", label: "Coming soon" },
  },
  {
    n: "02",
    title: "Active Recall & Flashcards",
    description:
      "Automatically turn uploaded materials into flashcards, multiple-choice questions and practice tests. Track weak areas and revisit them with spaced repetition.",
    foundation: "New learning and revision workflows",
    icon: Layers,
    gradient: "from-fuchsia-500 to-rose-500",
    cta: { kind: "soon", label: "Coming soon" },
  },
  {
    n: "03",
    title: "Exam Preparation",
    description:
      "Enter your subject, exam date and syllabus. AlphaWrite generates a revision plan, schedules practice and identifies topics that need more attention.",
    foundation: "Personalized exam readiness",
    icon: Calendar,
    gradient: "from-amber-400 to-orange-500",
    cta: { kind: "soon", label: "Coming soon" },
  },
  {
    n: "04",
    title: "Academic Writing",
    description:
      "The paraphraser, humanizer, grammar assistance and summarizer you already use — now part of your study workflow for assignments, reports and essays.",
    foundation: "Shipped. Use it today.",
    icon: FileText,
    gradient: "from-emerald-500 to-teal-500",
    cta: {
      kind: "live",
      href: "/dashboard/humanize",
      label: "Try it now",
    },
  },
];

export default function PillarsSection() {
  return (
    <section
      id="pillars"
      className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#6642B6] shadow-sm">
          Four pillars
        </span>
        <h2 className="mt-5 text-[clamp(2rem,4vw,2.75rem)] font-bold leading-[1.05] tracking-tight text-slate-900">
          From first page to{" "}
          <span
            style={{ fontFamily: "var(--font-fraunces-raw)" }}
            className="font-serif italic text-[#6642B6]"
          >
            final mark
          </span>
          .
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
          A single workflow that goes from understanding your materials to
          writing the assignment that gets graded.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {PILLARS.map((p) => {
          const Icon = p.icon;
          const live = p.cta.kind === "live";
          return (
            <div
              key={p.n}
              className="group relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-slate-200/60 bg-white p-7 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.08),0_8px_16px_-6px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_8px_32px_-4px_rgba(15,23,42,0.1),0_12px_24px_-6px_rgba(15,23,42,0.06)]"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-2 rounded-full bg-linear-to-r ${p.gradient} px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white`}
                >
                  {p.n}
                </span>
                {live ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                    </span>
                    Live
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-700">
                    Coming soon
                  </span>
                )}
              </div>

              <div className="flex items-start gap-4">
                <div
                  className={`flex size-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${p.gradient} text-white shadow-md`}
                >
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3
                    style={{ fontFamily: "var(--font-fraunces-raw)" }}
                    className="text-xl font-semibold tracking-tight text-slate-900"
                  >
                    {p.title}
                  </h3>
                </div>
              </div>

              <p className="text-[15px] leading-relaxed text-slate-600">
                {p.description}
              </p>

              <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
                <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                  {p.foundation}
                </span>
                {p.cta.kind === "live" ? (
                  <Link
                    href={p.cta.href}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#6642B6] px-4 py-2 text-xs font-semibold text-white shadow-md shadow-violet-500/30 transition hover:bg-[#8B5CF6]"
                  >
                    {p.cta.label}
                    <ArrowRight className="size-3.5" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-violet-200 hover:text-[#6642B6]"
                  >
                    Join waitlist
                    <ArrowRight className="size-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
