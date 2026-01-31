"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { BarChart3, Zap, Check, ChevronLeft, ChevronRight, Copy, BookOpen, ArrowUp, ClipboardPaste, DollarSign, User, Monitor, RefreshCw, AlertTriangle } from "lucide-react";

// Mock: generate humanized versions for demo (replace with API later)
function mockHumanize(input: string): string[] {
  const sample =
    "The Growth of Remote Work: How Digital Transformation is Playing Out in the Present Day Workplace\n\n" +
    "As we see great advances in tech which are at an all time high remote work is becoming the base structure of what we see in business today. " +
    "Around the world companies are adopting digital resources that in turn promote better collaboration and flexibility. " +
    "This transition also improves work life balance as well as what we see out of that which is innovation and productivity. " +
    "As organizations transform to this new model they present themselves with what may be great opportunities but also very real issues in a very dynamic setting.";
  if (!input.trim()) return [sample, sample + "\n\n(Alternative phrasing could go here.)", sample + "\n\n(Another variation.)"];
  // Use input with light transformation for demo
  const base = input.trim();
  return [
    sample,
    base + "\n\n(Humanized variation 2 – connect to your API for real results.)",
    base + "\n\n(Humanized variation 3 – connect to your API for real results.)",
  ];
}

// Mock: generate paraphrased versions for demo (replace with API later)
function mockParaphrase(input: string): string[] {
  const sample =
    "The Rise of Remote Work: How Digital Change Is Shaping Today’s Workplace\n\n" +
    "With technology advancing quickly, remote work is now a core part of how many businesses operate. " +
    "Companies worldwide are turning to digital tools to support collaboration and flexibility. " +
    "This shift is also improving work-life balance and helping drive innovation and productivity. " +
    "As companies adapt to this model, they face both new opportunities and real challenges in a fast-changing environment.";
  if (!input.trim()) return [sample, sample + "\n\n(Another paraphrase option.)", sample + "\n\n(Third variation.)"];
  const base = input.trim();
  return [
    sample,
    base + "\n\n(Paraphrased variation 2 – connect to your API for real results.)",
    base + "\n\n(Paraphrased variation 3 – connect to your API for real results.)",
  ];
}

export default function HumanizerDetectorSection() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"humanizer" | "detector" | "paraphraser">("humanizer");
  const [humanizedResult, setHumanizedResult] = useState<string[] | null>(null);
  const [isHumanizing, setIsHumanizing] = useState(false);
  const [currentVersionIndex, setCurrentVersionIndex] = useState(0);
  const [detectionResult, setDetectionResult] = useState<{ humanScore: number; aiScore: number; aiParaphrasedScore: number } | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [paraphrasedResult, setParaphrasedResult] = useState<string[] | null>(null);
  const [isParaphrasing, setIsParaphrasing] = useState(false);
  const [paraphraseVersionIndex, setParaphraseVersionIndex] = useState(0);
  const [insufficientCredits] = useState(false); // Set to true when user has insufficient credits (e.g. from API)

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const detectionUsed = Math.min(wordCount, 1000);
  const humanizeUsed = Math.min(wordCount, 250);

  const handleHumanize = useCallback(() => {
    setIsHumanizing(true);
    setHumanizedResult(null);
    setTimeout(() => {
      const versions = mockHumanize(text);
      setHumanizedResult(versions);
      setCurrentVersionIndex(0);
      setIsHumanizing(false);
    }, 1500);
  }, [text]);

  const handleDetect = useCallback(() => {
    setIsDetecting(true);
    setDetectionResult(null);
    setTimeout(() => {
      setDetectionResult({ humanScore: 22, aiScore: 56, aiParaphrasedScore: 22 });
      setIsDetecting(false);
    }, 1200);
  }, []);

  const handleParaphrase = useCallback(() => {
    setIsParaphrasing(true);
    setParaphrasedResult(null);
    setTimeout(() => {
      const versions = mockParaphrase(text);
      setParaphrasedResult(versions);
      setParaphraseVersionIndex(0);
      setIsParaphrasing(false);
    }, 1400);
  }, [text]);

  const handleCopy = useCallback(() => {
    if (!humanizedResult || humanizedResult.length === 0) return;
    const toCopy = humanizedResult[currentVersionIndex];
    void navigator.clipboard.writeText(toCopy);
  }, [humanizedResult, currentVersionIndex]);

  const handleCopyParaphrase = useCallback(() => {
    if (!paraphrasedResult || paraphrasedResult.length === 0) return;
    const toCopy = paraphrasedResult[paraphraseVersionIndex];
    void navigator.clipboard.writeText(toCopy);
  }, [paraphrasedResult, paraphraseVersionIndex]);

  const handlePaste = useCallback(async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText((prev) => prev + (prev ? "\n\n" : "") + clipboardText);
    } catch {
      // Permission denied or clipboard empty
    }
  }, []);

  const currentText = humanizedResult?.[currentVersionIndex] ?? "";
  const resultWordCount = currentText.trim() ? currentText.trim().split(/\s+/).length : 0;
  const versionsCount = humanizedResult?.length ?? 0;

  const showResult = humanizedResult !== null && humanizedResult.length > 0;
  const showDetectionResult = detectionResult !== null;
  const showParaphraseResult = paraphrasedResult !== null && paraphrasedResult.length > 0;
  const paraphraseText = paraphrasedResult?.[paraphraseVersionIndex] ?? "";
  const paraphraseWordCount = paraphraseText.trim() ? paraphraseText.trim().split(/\s+/).length : 0;
  const paraphraseVersionsCount = paraphrasedResult?.length ?? 0;

  const resultRef = useRef<HTMLDivElement>(null);
  const detectionResultRef = useRef<HTMLDivElement>(null);
  const paraphraseResultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showResult && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showResult]);

  useEffect(() => {
    if (showDetectionResult && detectionResultRef.current) {
      detectionResultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showDetectionResult]);

  useEffect(() => {
    if (showParaphraseResult && paraphraseResultRef.current) {
      paraphraseResultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showParaphraseResult]);

  return (
    <section id="humanizer" className="mx-auto max-w-6xl px-4 pt-8 pb-12 sm:px-6 sm:pt-10 sm:pb-16 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 shadow-xl shadow-slate-200/50 backdrop-blur-sm sm:rounded-[1.75rem]">
        <div className="flex flex-col gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-4">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#8B5CF6]" aria-hidden />
            <span className="text-sm font-semibold text-slate-700 sm:text-base">AlphaWrite Workspace</span>
          </div>
          <div className="flex rounded-xl border border-slate-200/80 bg-white p-1 shadow-sm" role="tablist">
            {(["humanizer", "detector", "paraphraser"] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                onClick={() => setMode(m)}
                className={`rounded-lg px-4 py-2.5 text-xs font-semibold transition-all duration-200 sm:text-sm ${
                  mode === m
                    ? "bg-[#8B5CF6] text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                {m === "humanizer" ? "AI Humanizer" : m === "detector" ? "AI Detector" : "Paraphraser"}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="mb-3 flex items-center justify-start">
            <button
              type="button"
              onClick={handlePaste}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-[#8B5CF6]/50 hover:bg-violet-50/50 hover:text-[#8B5CF6]"
            >
              <ClipboardPaste className="size-4" aria-hidden />
              Paste text
            </button>
          </div>
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your AI-generated text here... ✨ Pro tip: The more text you provide, the better our humanization algorithm can work its magic!"
              rows={14}
              className="min-h-[280px] w-full resize-y rounded-2xl border border-slate-200/80 bg-slate-50/50 px-4 py-4 pr-20 text-sm text-slate-800 placeholder:text-slate-400 transition-all duration-200 focus:border-[#8B5CF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 sm:min-h-[320px] sm:px-5 sm:py-5 sm:pr-24 sm:text-base"
            />
            <span className="absolute bottom-4 right-4 rounded-lg border border-slate-200/80 bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-500 shadow-sm sm:bottom-5 sm:right-5">
              {wordCount} words
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/30 px-4 py-3.5 shadow-sm transition-colors duration-200 sm:px-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <span className="size-2 rounded-full bg-[#8B5CF6]" aria-hidden />
                {wordCount} words
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-violet-50/80 px-3 py-1.5 text-xs font-medium text-[#8B5CF6]">
                <BarChart3 className="size-3.5" aria-hidden />
                Detection: {detectionUsed}/1000
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100/80 px-3 py-1.5 text-xs font-medium text-slate-600">
                <Zap className="size-3.5" aria-hidden />
                Humanize: {humanizeUsed}/250
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {mode === "humanizer" && (
                <button
                  type="button"
                  onClick={handleHumanize}
                  disabled={isHumanizing}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#8B5CF6] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-all duration-200 hover:bg-violet-600 hover:shadow-xl hover:shadow-violet-500/25 disabled:opacity-70"
                >
                  {isHumanizing ? (
                    <>
                      <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden />
                      Humanizing…
                    </>
                  ) : (
                    <>
                      <Zap className="size-4" aria-hidden />
                      Humanize AI Writing
                    </>
                  )}
                </button>
              )}
              {mode === "detector" && (
                <button
                  type="button"
                  onClick={handleDetect}
                  disabled={isDetecting}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#8B5CF6] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-all duration-200 hover:bg-violet-600 hover:shadow-xl hover:shadow-violet-500/25 disabled:opacity-70"
                >
                  {isDetecting ? (
                    <>
                      <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden />
                      Analyzing…
                    </>
                  ) : (
                    <>
                      <BarChart3 className="size-4" aria-hidden />
                      Detect AI Writing
                    </>
                  )}
                </button>
              )}
              {mode === "paraphraser" && (
                <button
                  type="button"
                  onClick={handleParaphrase}
                  disabled={isParaphrasing}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#8B5CF6] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-all duration-200 hover:bg-violet-600 hover:shadow-xl hover:shadow-violet-500/25 disabled:opacity-70"
                >
                  {isParaphrasing ? (
                    <>
                      <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden />
                      Paraphrasing…
                    </>
                  ) : (
                    <>
                      <RefreshCw className="size-4" aria-hidden />
                      Paraphrase Text
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {mode === "humanizer" && showResult && (
            <div ref={resultRef} className="mt-8 animate-result-in">
              {insufficientCredits && (
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-orange-200/70 bg-orange-50/70 px-5 py-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-9 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                      <DollarSign className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-orange-900 sm:text-base">Insufficient Credits</p>
                      <p className="text-sm text-orange-800">You need 30 more credits for this request.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-orange-500 to-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
                  >
                    Upgrade to Pro
                    <ArrowUp className="size-4" aria-hidden />
                  </button>
                </div>
              )}

              <div className="mb-6 rounded-2xl border border-emerald-200/80 bg-emerald-50/70 px-6 py-5 text-center shadow-sm">
                <div className="flex items-center justify-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
                    <Check className="size-5" aria-hidden />
                  </span>
                  <p className="text-base font-semibold text-emerald-900 sm:text-lg">
                    Success! Your text has been humanized. 🎉
                  </p>
                </div>
                <p className="mt-2 text-sm text-emerald-700">Your humanized text is ready below</p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-emerald-200/80 bg-white shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-white px-5 py-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex size-6 items-center justify-center rounded-full border border-emerald-300 bg-emerald-100 text-emerald-700">
                      <Check className="size-4" aria-hidden />
                    </span>
                    <h3 className="text-base font-semibold text-slate-900 sm:text-lg">Humanized Text</h3>
                    <span className="rounded-full border border-emerald-200 bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                      ✓ UNDETECTABLE
                    </span>
                  </div>
                  <span className="text-xs font-medium text-slate-500 sm:text-sm">Step 2 of 2 - Complete!</span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-200/60 bg-emerald-50/70 px-5 py-3.5">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentVersionIndex((i) => Math.max(0, i - 1))}
                      disabled={currentVersionIndex === 0}
                      className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-500 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
                      aria-label="Previous version"
                    >
                      <ChevronLeft className="size-5" aria-hidden />
                    </button>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Version {currentVersionIndex + 1} of {versionsCount}
                      </p>
                      <p className="text-xs text-slate-500">Multiple variations generated.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentVersionIndex((i) => Math.min(versionsCount - 1, i + 1))}
                      disabled={currentVersionIndex >= versionsCount - 1}
                      className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-500 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
                      aria-label="Next version"
                    >
                      <ChevronRight className="size-5" aria-hidden />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                  >
                    <Copy className="size-4" aria-hidden />
                    Copy Text
                  </button>
                </div>

                <div className="relative min-h-[220px] bg-white px-5 py-4 sm:min-h-[260px] sm:py-5">
                  <div className="min-h-[180px] whitespace-pre-wrap rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-800 shadow-sm sm:min-h-[220px] sm:text-base">
                    {currentText}
                  </div>
                  <span className="absolute bottom-4 right-5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500 shadow-sm">
                    {resultWordCount} words
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-200/80 bg-emerald-50/70 px-4 py-3.5 shadow-sm">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-100">
                    <Check className="size-5 text-emerald-600" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">AI Detection</p>
                    <p className="text-sm font-medium text-emerald-700">Bypassed ✓</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-sky-200/80 bg-sky-50/70 px-4 py-3.5 shadow-sm">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-sky-200 bg-sky-100">
                    <BookOpen className="size-5 text-sky-600" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Readability</p>
                    <p className="text-sm font-medium text-sky-700">Enhanced ✓</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-violet-200/80 bg-violet-50/70 px-4 py-3.5 shadow-sm">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-violet-200 bg-violet-100">
                    <Zap className="size-5 text-[#8B5CF6]" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Human-like</p>
                    <p className="text-sm font-medium text-[#8B5CF6]">Optimized ✓</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setHumanizedResult(null)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Humanize again
                </button>
              </div>
            </div>
          )}

          {mode === "detector" && showDetectionResult && detectionResult && (
            <div ref={detectionResultRef} className="mt-8 animate-result-in">
              <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/40 ring-1 ring-slate-200/50">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-linear-to-b from-slate-50/90 to-white px-5 py-4 backdrop-blur-sm sm:px-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6]">
                      <BarChart3 className="size-5" aria-hidden />
                    </span>
                    <h3 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">Detection Results</h3>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#8B5CF6] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm shadow-violet-500/25">
                      <Zap className="size-3.5" aria-hidden />
                      Analyzed
                    </span>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">Step 2 of 2 · Complete</span>
                </div>

                <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-3 sm:gap-5 sm:p-6">
                  <div className="group rounded-2xl border border-emerald-200/80 bg-linear-to-b from-emerald-50/80 to-white p-5 shadow-sm ring-1 ring-emerald-200/40 transition-all duration-200 hover:shadow-md hover:ring-emerald-300/50">
                    <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-2xl bg-emerald-500 shadow-lg shadow-emerald-500/30">
                      <User className="size-7 text-white" aria-hidden />
                    </div>
                    <p className="text-3xl font-bold tabular-nums text-emerald-700">{detectionResult.humanScore}%</p>
                    <p className="mt-1 text-sm font-semibold text-emerald-800">Human Score</p>
                    <p className="mt-0.5 text-xs font-medium text-emerald-600/90">Likely written by human</p>
                  </div>
                  <div className="group rounded-2xl border border-red-200/80 bg-linear-to-b from-red-50/80 to-white p-5 shadow-sm ring-1 ring-red-200/40 transition-all duration-200 hover:shadow-md hover:ring-red-300/50">
                    <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-2xl bg-red-500 shadow-lg shadow-red-500/30">
                      <Monitor className="size-7 text-white" aria-hidden />
                    </div>
                    <p className="text-3xl font-bold tabular-nums text-red-700">{detectionResult.aiScore}%</p>
                    <p className="mt-1 text-sm font-semibold text-red-800">AI Score</p>
                    <p className="mt-0.5 text-xs font-medium text-red-600/90">Likely AI generated</p>
                  </div>
                  <div className="group rounded-2xl border border-amber-200/80 bg-linear-to-b from-amber-50/80 to-white p-5 shadow-sm ring-1 ring-amber-200/40 transition-all duration-200 hover:shadow-md hover:ring-amber-300/50">
                    <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-2xl bg-amber-500 shadow-lg shadow-amber-500/30">
                      <RefreshCw className="size-7 text-white" aria-hidden />
                    </div>
                    <p className="text-3xl font-bold tabular-nums text-amber-700">{detectionResult.aiParaphrasedScore}%</p>
                    <p className="mt-1 text-sm font-semibold text-amber-800">AI Paraphrased</p>
                    <p className="mt-0.5 text-xs font-medium text-amber-600/90">Likely AI rewritten</p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-4 sm:flex-row sm:justify-center sm:gap-3 sm:px-6">
                  <p className="text-sm font-bold text-slate-800">Overall Assessment</p>
                  <p className="flex items-center justify-center gap-2 rounded-xl bg-amber-50/80 px-4 py-2.5 text-sm font-medium text-amber-800 ring-1 ring-amber-200/60">
                    <AlertTriangle className="size-5 shrink-0 text-amber-500" aria-hidden />
                    This text is likely to be flagged as AI-generated.
                  </p>
                </div>

                <div className="rounded-b-2xl border-t border-slate-100 bg-linear-to-b from-sky-50/70 to-sky-50/40 px-5 py-6 text-center sm:px-6">
                  <div className="mx-auto flex max-w-md flex-col items-center gap-2">
                    <p className="flex items-center gap-2.5 text-lg font-bold text-slate-900">
                      <span className="flex size-9 items-center justify-center rounded-xl bg-red-100 text-red-600 ring-1 ring-red-200/60">
                        <AlertTriangle className="size-5" aria-hidden />
                      </span>
                      AI Content Detected
                    </p>
                    <p className="text-sm leading-relaxed text-slate-600">
                      Your text has a high chance of being flagged by AI detectors. Humanize it now to make it undetectable.
                    </p>
                    <button
                      type="button"
                      onClick={() => setMode("humanizer")}
                      className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#8B5CF6] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-all duration-200 hover:bg-violet-600 hover:shadow-xl hover:shadow-violet-500/25"
                    >
                      <Zap className="size-4" aria-hidden />
                      Humanize This Text
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => setDetectionResult(null)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800"
                >
                  Detect again
                </button>
              </div>
            </div>
          )}

          {mode === "paraphraser" && showParaphraseResult && (
            <div ref={paraphraseResultRef} className="mt-8 animate-result-in">
              <div className="mb-6 rounded-2xl border border-sky-200/80 bg-sky-50/80 px-5 py-4 shadow-sm">
                <p className="flex items-center gap-2 text-base font-semibold text-sky-800">
                  <Check className="size-5 text-sky-600" aria-hidden />
                  Success! Your text has been paraphrased. 🎉
                </p>
                <p className="mt-1 text-sm text-sky-700">Your paraphrased text is ready below.</p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-sky-200/80 bg-white shadow-xl shadow-slate-200/40 ring-1 ring-slate-200/50">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 bg-linear-to-b from-sky-50/80 to-white px-5 py-4 backdrop-blur-sm sm:px-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600">
                      <RefreshCw className="size-5" aria-hidden />
                    </span>
                    <h3 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">Paraphrased Text</h3>
                    <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-800">Multiple variations</span>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">Step 2 of 2 · Complete</span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sky-200/60 bg-sky-50/50 px-5 py-3 sm:px-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setParaphraseVersionIndex((i) => Math.max(0, i - 1))}
                      disabled={paraphraseVersionIndex === 0}
                      className="rounded-xl border border-slate-200 bg-white p-2 text-slate-500 transition hover:bg-slate-50 disabled:opacity-50"
                      aria-label="Previous version"
                    >
                      <ChevronLeft className="size-5" aria-hidden />
                    </button>
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        Version {paraphraseVersionIndex + 1} of {paraphraseVersionsCount}
                      </p>
                      <p className="text-xs text-slate-500">Multiple variations generated.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setParaphraseVersionIndex((i) => Math.min(paraphraseVersionsCount - 1, i + 1))}
                      disabled={paraphraseVersionIndex >= paraphraseVersionsCount - 1}
                      className="rounded-xl border border-slate-200 bg-white p-2 text-slate-500 transition hover:bg-slate-50 disabled:opacity-50"
                      aria-label="Next version"
                    >
                      <ChevronRight className="size-5" aria-hidden />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyParaphrase}
                    className="inline-flex items-center gap-2 rounded-xl border border-sky-300 bg-sky-100 px-3.5 py-2 text-sm font-medium text-sky-800 shadow-sm transition hover:bg-sky-200/80"
                  >
                    <Copy className="size-4" aria-hidden />
                    Copy Text
                  </button>
                </div>

                <div className="relative min-h-[220px] bg-white p-5 sm:min-h-[260px] sm:p-6">
                  <div className="min-h-[180px] whitespace-pre-wrap rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-800 shadow-sm sm:min-h-[220px] sm:text-base">
                    {paraphraseText}
                  </div>
                  <span className="absolute bottom-5 right-5 text-xs font-medium text-slate-500">
                    {paraphraseWordCount} words
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => setParaphrasedResult(null)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800"
                >
                  Paraphrase again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
