"use client";

import { useEffect, useRef, useState } from "react";
import { ClipboardList, BarChart3, Sparkles, Play } from "lucide-react";

interface Step {
  num: string;
  eyebrow: string;
  EyebrowIcon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  title: string;
  body: string;
}

const STEPS: Step[] = [
  {
    num: "01",
    eyebrow: "Paste & upload",
    EyebrowIcon: ClipboardList,
    title: "Paste your text",
    body:
      "Paste any content — homework, assignment, or AI-generated draft. We accept up to 4,000 words per request on Premium.",
  },
  {
    num: "02",
    eyebrow: "Multi-detector check",
    EyebrowIcon: BarChart3,
    title: "Check the AI score",
    body:
      "One click runs your text against Turnitin, GPTZero, Copyleaks, ZeroGPT, QuillBot and Grammarly — see exactly how much reads as human.",
  },
  {
    num: "03",
    eyebrow: "Rewrite",
    EyebrowIcon: Sparkles,
    title: "Humanize",
    body:
      "Rewrite to sound 100% human-written, preserving your meaning, tone and structure — and pass any AI detection check.",
  },
];

export default function HowItWorks() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Lazy-load the video when the section scrolls into view
  useEffect(() => {
    const el = containerRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !video.src) {
            video.src = "/how-it-works.mp4";
            video.load();
            video.play().catch(() => {});
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="how"
      ref={containerRef}
      className="px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-16 max-w-2xl">
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#8B5CF6]">
            How it works
          </span>
          <h2 className="mt-4 text-balance text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-slate-900">
            Humanize AI writing in three simple steps.
          </h2>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-slate-600">
            Perfect for essays, assignments, blog posts and research papers.
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:items-start">
          {/* Steps with violet hairline rail */}
          <ol className="relative flex flex-col gap-1">
            <span
              aria-hidden
              className="absolute left-[30px] top-9 bottom-9 w-px rounded-full bg-gradient-to-b from-violet-200 to-violet-200/5"
            />
            {STEPS.map((s) => {
              const Icon = s.EyebrowIcon;
              return (
                <li
                  key={s.num}
                  className="relative grid grid-cols-[60px_1fr] gap-5 py-5"
                >
                  <div className="flex size-[60px] items-center justify-center rounded-[18px] bg-white font-serif text-[22px] font-semibold tracking-[-0.02em] tabular-nums text-violet-700 shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_8px_24px_-8px_rgba(15,23,42,0.12)]">
                    {s.num}
                  </div>
                  <div className="pt-1">
                    <p className="mb-1.5 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8B5CF6]">
                      <span className="flex size-[18px] items-center justify-center rounded-md bg-violet-100/80">
                        <Icon className="size-3 text-[#8B5CF6]" aria-hidden />
                      </span>
                      {s.eyebrow}
                    </p>
                    <h3 className="mb-1.5 text-[22px] font-bold tracking-[-0.015em] text-slate-900">
                      {s.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-slate-600">
                      {s.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Sticky video frame — 16:10 */}
          <div className="lg:sticky lg:top-24">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-slate-900 shadow-[0_0_0_1px_rgba(15,23,42,0.08),0_30px_60px_-20px_rgba(15,23,42,0.35)]">
              {/* Gradient fallback visible until the video has data */}
              <div
                aria-hidden
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                  loaded ? "opacity-0" : "opacity-100"
                }`}
                style={{
                  background:
                    "radial-gradient(120% 60% at 50% 20%, rgba(139, 92, 246, 0.45), transparent 60%), linear-gradient(160deg, #0F172A, #6D28D9)",
                }}
              >
                <span className="flex size-[88px] items-center justify-center rounded-full bg-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18),0_20px_40px_-10px_rgba(139,92,246,0.5)]">
                  <Play
                    className="size-9 translate-x-0.5 text-white/85"
                    strokeWidth={1.5}
                    fill="currentColor"
                    aria-hidden
                  />
                </span>
              </div>
              <video
                ref={videoRef}
                loop
                muted
                playsInline
                preload="none"
                onLoadedData={() => setLoaded(true)}
                className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${
                  loaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
