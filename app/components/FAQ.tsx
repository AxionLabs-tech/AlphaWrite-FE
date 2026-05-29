"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is AlphaWrite?",
    answer:
      "AlphaWrite is an AI-powered writing platform that includes both an AI Humanizer and an AI Detector. The Humanizer rewrites AI-generated text so it reads naturally and bypasses major AI detection tools, while the Detector scans text against multiple platforms in one click.",
  },
  {
    question: "How does the AI Humanizer work?",
    answer:
      "Our Humanizer analyzes your AI-generated content and intelligently rewrites it to match natural human writing patterns. It preserves your original meaning and tone while adjusting sentence structure, vocabulary, and flow so the output reads authentically and passes AI detection checks.",
  },
  {
    question: "Which AI detectors does AlphaWrite bypass?",
    answer:
      "AlphaWrite is designed to bypass all major AI detection platforms, including Turnitin, GPTZero, Originality.ai, Copyleaks, and more. Our multi-detector feature lets you check your text against several detectors simultaneously to ensure confidence in your results.",
  },
  {
    question: "Is the humanized content plagiarism-free?",
    answer:
      "Yes. AlphaWrite doesn't simply copy or paraphrase from existing sources — it generates unique rewrites of your content. The output is original text that maintains your intended meaning while being both plagiarism-free and undetectable by AI detectors.",
  },
  {
    question: "Can I try AlphaWrite for free?",
    answer:
      "Absolutely. Our Free plan gives you 200 words per request with 1 request per day — no credit card required. It's a great way to experience the Humanizer and Detector before upgrading to a paid plan for higher limits.",
  },
  {
    question: "What happens if I exceed my plan's word limit?",
    answer:
      "If you reach your plan's word or request limit, you can upgrade to a higher tier at any time for increased capacity. Your existing content and settings are preserved when you switch plans. You can also cancel or change your plan at any time.",
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
            Everything you need to know about AlphaWrite. Can&apos;t find the
            answer you&apos;re looking for? Reach out to our support team.
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
