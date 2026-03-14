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
    <section id="how-it-works" className="bg-white px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Humanize AI Writing in 3 Simple Steps
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Perfect for essays, assignments, blog posts and research papers
          </p>
        </header>

        {/* Video */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-violet-200 shadow-lg shadow-violet-500/10 aspect-video">
          <video
            src="/videos/how-it-works.mp4"
            controls
            playsInline
            className="h-full w-full object-cover"
            poster="/videos/how-it-works-poster.png"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Step Cards */}
        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {steps.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-violet-200 hover:shadow-md"
            >
              <div className="flex h-48 items-center justify-center rounded-xl bg-violet-50">
                <item.icon className="size-16 text-[#8B5CF6]/40" aria-hidden />
              </div>
              <span className="mt-5 inline-block rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-[#8B5CF6]">
                {item.step}
              </span>
              <h3 className="mt-3 text-lg font-bold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
