"use client";

import { ClipboardPaste, BarChart3, Sparkles } from "lucide-react";

const steps = [
  {
    step: "STEP 1",
    title: "Paste Your Text",
    description:
      "Paste any content — homework, assignment, or AI-generated draft",
    icon: ClipboardPaste,
  },
  {
    step: "STEP 2",
    title: "Check AI Score",
    description:
      "See how much of your text is considered human-written",
    icon: BarChart3,
  },
  {
    step: "STEP 3",
    title: "Humanize",
    description:
      "Rewrite your text to sound 100% human-written and pass AI detection",
    icon: Sparkles,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#8B5CF6]">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Humanize AI Writing in 3 Simple Steps
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Perfect for essays, assignments, blog posts and research papers
          </p>
        </header>

        <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-2xl bg-slate-900 shadow-2xl shadow-slate-900/20 aspect-video">
          <video
            src="/how-it-works.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Step Cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {steps.map((item) => (
            <div
              key={item.step}
              className="group flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-4 transition-all duration-200 hover:border-[#8B5CF6]/30 hover:shadow-md hover:shadow-violet-500/5"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#8B5CF6]/10">
                <item.icon className="size-4 text-[#8B5CF6]" aria-hidden />
              </span>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#8B5CF6]">
                  {item.step}
                </span>
                <h3 className="mt-0.5 text-sm font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
