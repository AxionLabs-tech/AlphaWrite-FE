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
    <section id="faq" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <span className="text-xs font-medium uppercase tracking-widest text-[#8B5CF6]">
            FAQ
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
            Everything you need to know about AlphaWrite. Can&apos;t find the
            answer you&apos;re looking for? Reach out to our support team.
          </p>
        </div>

        {/* Accordion */}
        <div className="mx-auto mt-16 max-w-3xl divide-y divide-slate-200">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index}>
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-base font-semibold text-slate-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-[#8B5CF6] transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-200 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 text-sm leading-relaxed text-slate-600">
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
