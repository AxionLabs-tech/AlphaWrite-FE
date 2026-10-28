"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is AlphaWrite?",
    answer:
      "AlphaWrite is an AI study companion for students. It helps you understand your course materials, build flashcards and practice quizzes, prepare for exams, and polish the writing you turn in — all in one workspace.",
  },
  {
    question: "Which features are available today?",
    answer:
      "Academic Writing is live: paraphraser, humanizer, grammar assistance, summarizer, and a multi-detector check against Turnitin, GPTZero, Copyleaks and more. The AI Study Assistant, Flashcards, and Exam Prep pillars are in active development — join the waitlist to be among the first in.",
  },
  {
    question: "When will the Study Assistant, Flashcards and Exam Prep ship?",
    answer:
      "Study Workspace, AI Flashcards, and Practice Quizzes are our P0 priorities for the next release. The Daily Study Loop follows shortly after. We're building them in order — upload materials first, then understand, then test knowledge, then review weak areas on a schedule tied to your exam date.",
  },
  {
    question: "Can AlphaWrite answer questions about my uploaded materials?",
    answer:
      "Yes — when the Study Workspace ships. Answers will be grounded in the passages we retrieve from your documents and cite the pages they came from, so you can verify everything. Answers without source backing will be clearly flagged.",
  },
  {
    question: "Is academic use of AlphaWrite allowed?",
    answer:
      "AlphaWrite is designed to help you learn, revise and improve your own writing — not to misrepresent authorship. Always follow your institution's policies on AI use and proper citation. Humanize and Detect are tools to help you understand how your writing reads; they're not a shortcut around academic integrity.",
  },
  {
    question: "Can I try AlphaWrite for free?",
    answer:
      "Yes. The Free plan gets you access to the Academic Writing tools with a daily request limit — no credit card required. Paid plans unlock higher limits and will include the new study features as they ship.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center">
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#8B5CF6]">
            FAQ
          </span>
          <h2 className="mt-4 text-balance text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-slate-900">
            Frequently asked questions.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-slate-600">
            What AlphaWrite is now, what&apos;s shipping next, and how to use it
            without breaking your institution&apos;s rules.
          </p>
        </div>

        {/* Soft card rows */}
        <div className="mt-14 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`group rounded-2xl bg-white transition-shadow duration-300 ${
                  isOpen
                    ? "shadow-[0_0_0_1px_rgba(139,92,246,0.18),0_1px_0_0_rgba(255,255,255,0.8)_inset,0_18px_38px_-18px_rgba(139,92,246,0.25),0_4px_8px_-4px_rgba(15,23,42,0.06)]"
                    : "shadow-[0_0_0_1px_rgba(15,23,42,0.04),0_1px_0_0_rgba(255,255,255,0.8)_inset,0_8px_24px_-12px_rgba(15,23,42,0.12),0_2px_4px_-2px_rgba(15,23,42,0.04)] hover:shadow-[0_0_0_1px_rgba(139,92,246,0.12),0_1px_0_0_rgba(255,255,255,0.8)_inset,0_14px_30px_-14px_rgba(15,23,42,0.16),0_4px_8px_-4px_rgba(15,23,42,0.06)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-[15px] font-semibold tracking-tight text-slate-900 sm:text-base">
                    {faq.question}
                  </span>
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                      isOpen
                        ? "bg-gradient-to-br from-[#8B5CF6] to-violet-600 text-white shadow-md shadow-violet-500/40"
                        : "bg-violet-50 text-[#8B5CF6] group-hover:bg-violet-100"
                    }`}
                  >
                    <ChevronDown
                      className={`size-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      strokeWidth={2.5}
                      aria-hidden
                    />
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-[14.5px] leading-relaxed text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
