import { Upload, Lightbulb, ClipboardCheck, Target } from "lucide-react";

type Step = {
  n: string;
  title: string;
  body: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Upload materials",
    body: "Drop in PDFs, lecture notes, slides or links. AlphaWrite organizes them by subject.",
    Icon: Upload,
  },
  {
    n: "02",
    title: "Understand",
    body: "Ask questions and get answers rooted in your materials, with page-level citations you can trust.",
    Icon: Lightbulb,
  },
  {
    n: "03",
    title: "Practice",
    body: "Auto-generated flashcards and quizzes test what you know and surface what you don't.",
    Icon: ClipboardCheck,
  },
  {
    n: "04",
    title: "Review weak areas",
    body: "A daily study loop brings missed topics back on a schedule tuned to your exam date.",
    Icon: Target,
  },
];

export default function StudyFlow() {
  return (
    <section
      id="how"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#6642B6] shadow-sm">
          How it works
        </span>
        <h2 className="mt-5 text-[clamp(2rem,4vw,2.75rem)] font-bold leading-[1.05] tracking-tight text-slate-900">
          A loop that takes you from{" "}
          <span
            style={{ fontFamily: "var(--font-fraunces-raw)" }}
            className="font-serif italic text-[#6642B6]"
          >
            new material
          </span>{" "}
          to mastery.
        </h2>
      </div>

      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ n, title, body, Icon }, i) => (
          <li
            key={n}
            className="relative flex flex-col gap-4 rounded-3xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.08),0_8px_16px_-6px_rgba(15,23,42,0.04)]"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Step {n}
              </span>
              <div className="flex size-9 items-center justify-center rounded-xl bg-violet-50 text-[#6642B6]">
                <Icon className="size-4" />
              </div>
            </div>
            <h3
              style={{ fontFamily: "var(--font-fraunces-raw)" }}
              className="text-lg font-semibold tracking-tight text-slate-900"
            >
              {title}
            </h3>
            <p className="text-[14px] leading-relaxed text-slate-600">
              {body}
            </p>
            {i < STEPS.length - 1 && (
              <div
                aria-hidden
                className="absolute -right-2.5 top-1/2 hidden size-5 -translate-y-1/2 items-center justify-center rounded-full border border-violet-200 bg-white text-[#6642B6] shadow-sm lg:flex"
              >
                <svg viewBox="0 0 10 10" className="size-2.5">
                  <path
                    d="M3 2l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
