import Link from "next/link";
import { FileText, Sparkles, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Paste your text",
    description: "Copy any AI-generated content into our clean, intuitive editor.",
    icon: FileText,
    iconStyle: { background: "linear-gradient(135deg, #6666FF 0%, #9966FF 100%)" },
  },
  {
    number: "02",
    title: "Humanize instantly",
    description: "Our advanced AI rewrites your content to sound natural and authentic in seconds.",
    icon: Sparkles,
    iconStyle: { background: "linear-gradient(135deg, #9933FF 0%, #CC33FF 100%)" },
  },
  {
    number: "03",
    title: "Use confidently",
    description: "Get polished, human-sounding text that preserves your original meaning.",
    icon: CheckCircle,
    iconStyle: { background: "#33CC66" },
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Simple, fast, effective
          </h2>
          <p className="mt-4 text-lg text-slate-600 sm:text-xl">
            Transform your AI content into natural writing in three effortless steps.
          </p>
        </header>

        <div className="mt-16 lg:mt-24">
          <div className="flex flex-col items-stretch gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-6">
            {steps.map((step, i) => (
              <div key={step.number} className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:gap-6">
                <article className="relative w-full rounded-2xl border border-slate-200 bg-white p-6 pt-10 shadow-md lg:max-w-sm">
                  {/* Oval number badge overlapping top-left corner */}
                  <span className="absolute -left-1 -top-3 flex h-9 min-w-9 items-center justify-center rounded-full bg-slate-900 px-3 text-sm font-bold text-white">
                    {step.number}
                  </span>
                  <div
                    className="inline-flex size-12 items-center justify-center rounded-xl text-white"
                    style={step.iconStyle}
                  >
                    <step.icon className="size-6" aria-hidden />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.description}</p>
                </article>
                {i < steps.length - 1 && (
                  <ArrowRight
                    className="hidden shrink-0 size-6 text-[#8B5CF6] lg:block"
                    aria-hidden
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center lg:mt-20">
          <Link
            href="/#humanizer"
            className="inline-flex items-center gap-2.5 rounded-2xl px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:opacity-95"
            style={{ background: "linear-gradient(90deg, #6666FF 0%, #9966FF 100%)" }}
          >
            Start Writing Better Now
            <Sparkles className="size-5 shrink-0" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
