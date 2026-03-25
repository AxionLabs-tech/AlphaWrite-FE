"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Check, AlertTriangle, ArrowRight } from "lucide-react";

export default function BeforeAfter() {
  const [disclaimerOpen, setDisclaimerOpen] = useState(true);

  return (
    <section id="before-after" className="px-4 pt-8 pb-16 sm:px-6 sm:pt-12 sm:pb-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center">
          <span className="text-xs font-medium uppercase tracking-widest text-[#8B5CF6]">
            Real Results
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            From 100% AI to fully human
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600">
            See how AlphaWrite transforms AI-generated text that scores 100% on
            detectors into natural writing that passes as completely human.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {/* ── Before ── */}
          <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/80">
            {/* Card header */}
            <div className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-4">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-red-100">
                <X
                  className="size-3.5 text-red-500"
                  strokeWidth={2.5}
                  aria-hidden
                />
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Before Using Our Humanizer
                </h3>
                <p className="text-[11px] font-medium text-red-500">
                  AI Text Detected
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="group relative overflow-hidden">
              <Image
                src="/before.png"
                alt="AI detection result showing 100% AI GPT score with highlighted text"
                width={600}
                height={400}
                className="h-auto max-h-[280px] w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
              />
            </div>

            {/* Result banner */}
            <div className="mt-auto border-t border-red-100 bg-red-50/60 px-5 py-3">
              <p className="text-xs font-semibold text-red-600">
                100% AI Detected &mdash; Flagged as AI-generated content
              </p>
            </div>
          </div>

          {/* ── After ── */}
          <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/80">
            {/* Card header */}
            <div className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-4">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                <Check
                  className="size-3.5 text-emerald-500"
                  strokeWidth={2.5}
                  aria-hidden
                />
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  After Using Our Humanizer
                </h3>
                <p className="text-[11px] font-medium text-emerald-500">
                  Human Text
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="group relative overflow-hidden">
              <Image
                src="/after.png"
                alt="AI detection result showing 0% AI score — text classified as human written"
                width={600}
                height={400}
                className="h-auto max-h-[280px] w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
              />
            </div>

            {/* Result banner */}
            <div className="mt-auto border-t border-emerald-100 bg-emerald-50/60 px-5 py-3">
              <p className="text-xs font-semibold text-emerald-700">
                0% AI Detected &mdash; Recognized as authentic human writing
              </p>
            </div>
          </div>
        </div>

        {/* Connector */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
          <span>Same content. Same meaning.</span>
          <ArrowRight className="size-3.5 text-[#8B5CF6]" aria-hidden />
          <span className="font-semibold text-[#8B5CF6]">
            Just humanized by AlphaWrite.
          </span>
        </div>

        {/* Disclaimer */}
        {disclaimerOpen && (
          <div className="mt-8 rounded-xl border border-amber-200/60 bg-amber-50/80 px-4 py-4 sm:px-5">
            <div className="flex items-start gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-100">
                <AlertTriangle
                  className="size-4 text-amber-600"
                  aria-hidden
                />
              </span>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-amber-900">
                  Note on AI Detectors
                </h4>
                <p className="mt-0.5 text-xs leading-relaxed text-amber-800/80">
                  AI detectors are not always 100% reliable and can give varying
                  results for the same text. They should be seen as a tool, not
                  absolute truth. AlphaWrite typically reduces 100% AI text to{" "}
                  <strong className="font-semibold text-amber-900">
                    30% or lower for large texts
                  </strong>
                  , and usually even{" "}
                  <strong className="font-semibold text-amber-900">
                    0% AI
                  </strong>
                  . The exact score can differ per detector, but our technology
                  ensures natural, human-sounding texts.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDisclaimerOpen(false)}
                className="shrink-0 rounded-lg p-1 text-amber-400 transition hover:bg-amber-100 hover:text-amber-600"
                aria-label="Dismiss note"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
