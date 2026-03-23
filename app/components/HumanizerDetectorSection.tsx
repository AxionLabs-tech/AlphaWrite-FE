"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, Zap, Check, Copy, ArrowUp, ClipboardPaste, DollarSign, AlertTriangle, Upload, Clock, ShieldCheck } from "lucide-react";
import { useDetectAi, useParaphrase } from "@/services/hooks";
import type { DetectAiResponse } from "@/services/dtos/ai";
import { getDetectionProbabilities, isDetectionAIGenerated } from "@/services/detection";
import { ApiError } from "@/services/apiClient";
import { useDemoText } from "@/app/context/DemoContext";
import { useAuthModal } from "@/app/context/AuthModalContext";
import { useHistoryModal } from "@/app/context/HistoryModalContext";
import { useAuthOptional } from "@/services/hooks";
import { toast } from "sonner";

export default function HumanizerDetectorSection() {
  const { demoText, setDemoText } = useDemoText();
  const { openAuthModal } = useAuthModal();
  const { openHistoryModal } = useHistoryModal();
  const auth = useAuthOptional();
  const { paraphrase: paraphraseApi, isParaphrasing: isHumanizing, error: humanizeError, resetError: resetHumanizeError } = useParaphrase();
  const { detectAi: detectAiApi, isDetecting, error: detectError, resetError: resetDetectError } = useDetectAi();

  const [text, setText] = useState("");
  const [mode, setMode] = useState<"humanizer" | "detector">("humanizer");
  const [humanizedResult, setHumanizedResult] = useState<string[] | null>(null);
  const [currentVersionIndex, setCurrentVersionIndex] = useState(0);
  const [detectionResult, setDetectionResult] = useState<DetectAiResponse | null>(null);
  const [insufficientCredits, setInsufficientCredits] = useState(false);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const detectionUsed = Math.min(wordCount, 1000);
  const humanizeUsed = Math.min(wordCount, 250);

  const handleHumanize = useCallback(async () => {
    if (!text.trim()) return;
    if (!auth?.isLoading && !auth?.isAuthenticated) {
      openAuthModal();
      return;
    }
    setHumanizedResult(null);
    setInsufficientCredits(false);
    resetHumanizeError();
    try {
      const res = await paraphraseApi({ text: text.trim() });
      const cleaned = res.paraphrased_texts?.length
        ? res.paraphrased_texts.map((t) => t.replace(/\*\*/g, ""))
        : [];
      setHumanizedResult(cleaned);
      setCurrentVersionIndex(0);
    } catch (e) {
      if (e instanceof ApiError && e.status === 403) {
        setInsufficientCredits(true);
      }
      throw e;
    }
  }, [text, auth?.isLoading, auth?.isAuthenticated, openAuthModal, paraphraseApi, resetHumanizeError]);

  const handleDetect = useCallback(async () => {
    if (!text.trim()) return;
    setDetectionResult(null);
    resetDetectError();
    try {
      const res = await detectAiApi({ text: text.trim() });
      setDetectionResult(res);
    } catch {
      // Error surfaced via detectError from hook
    }
  }, [text, detectAiApi, resetDetectError]);

  const handleCopy = useCallback(() => {
    if (!humanizedResult || humanizedResult.length === 0) return;
    const toCopy = humanizedResult[currentVersionIndex];
    void navigator.clipboard.writeText(toCopy);
    toast.success("Copied to clipboard!");
  }, [humanizedResult, currentVersionIndex]);

  const handlePaste = useCallback(async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText((prev) => prev + (prev ? "\n\n" : "") + clipboardText);
    } catch {
      // Permission denied or clipboard empty
    }
  }, []);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const content = typeof reader.result === "string" ? reader.result : "";
      setText((prev) => prev + (prev ? "\n\n" : "") + content);
    };
    reader.readAsText(file);
    e.target.value = "";
  }, []);

  const currentText = humanizedResult?.[currentVersionIndex] ?? "";

  const versionsCount = humanizedResult?.length ?? 0;

  const showResult = humanizedResult !== null && humanizedResult.length > 0;
  const showDetectionResult = detectionResult !== null;
  const detectionScores = detectionResult
    ? (() => {
        const probs = getDetectionProbabilities(detectionResult);
        return {
          humanScore: Math.round(probs.human),
          aiScore: Math.round(probs.ai),
          aiParaphrasedScore: Math.round(probs.ai_paraphrased),
          isAi: isDetectionAIGenerated(detectionResult),
        };
      })()
    : null;

  const resultRef = useRef<HTMLDivElement>(null);
  const detectionResultRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showResult && resultRef.current) {
      const y = resultRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [showResult]);

  useEffect(() => {
    if (showDetectionResult && detectionResultRef.current) {
      const y = detectionResultRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [showDetectionResult]);

  // Try AlphaWrite: when demo text is set from hero, fill textarea and clear demo state
  useEffect(() => {
    if (demoText) {
      setText(demoText);
      setDemoText("");
    }
  }, [demoText, setDemoText]);

  return (
    <section id="humanizer" className="mx-auto max-w-6xl px-4 pt-8 pb-12 sm:px-6 sm:pt-10 sm:pb-16 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 shadow-xl shadow-slate-200/50 backdrop-blur-sm sm:rounded-[1.75rem]">
        <div className="flex flex-col gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-4">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#8B5CF6]" aria-hidden />
            <span className="text-sm font-semibold text-slate-700 sm:text-base">AI Humanizer & Detector</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-xl border border-slate-200/80 bg-white p-1 shadow-sm" role="tablist">
              {(["humanizer", "detector"] as const).map((m) => (
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
                  {m === "humanizer" ? "AI Humanizer" : "AI Detector"}
                </button>
              ))}
            </div>
            {auth?.isAuthenticated && (
              <button
                type="button"
                onClick={openHistoryModal}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-3 py-2.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-800 sm:text-sm"
                aria-label="View history"
              >
                <Clock className="size-4" aria-hidden />
                <span className="hidden sm:inline">History</span>
              </button>
            )}
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="relative min-h-[280px] sm:min-h-[320px]">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your AI-generated text here... ✨ Pro tip: The more text you provide, the better our humanization algorithm can work its magic!"
              rows={14}
              className="min-h-[280px] w-full resize-y rounded-2xl border border-slate-200/80 bg-slate-50/50 px-4 py-4 pr-20 text-sm text-slate-800 placeholder:text-slate-400 transition-all duration-200 focus:border-[#8B5CF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 sm:min-h-[320px] sm:px-5 sm:py-5 sm:pr-24 sm:text-base"
            />
            {text === "" && (
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl pointer-events-none">
                <div className="pointer-events-auto flex items-center gap-3 rounded-xl border border-[#8B5CF6]/40 bg-white px-4 py-3 shadow-sm">
                  <button
                    type="button"
                    onClick={handlePaste}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B5CF6] transition hover:text-violet-700"
                  >
                    <ClipboardPaste className="size-4" aria-hidden />
                    Paste text
                  </button>
                  <span className="h-4 w-px bg-slate-200" aria-hidden />
                  <button
                    type="button"
                    onClick={handleUploadClick}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B5CF6] transition hover:text-violet-700"
                  >
                    <Upload className="size-4" aria-hidden />
                    Upload file
                  </button>
                </div>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.text,text/plain"
              onChange={handleFileChange}
              className="sr-only"
              aria-hidden
            />
            <span className="absolute bottom-4 right-4 rounded-lg border border-slate-200/80 bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-500 shadow-sm sm:bottom-5 sm:right-5">
              {wordCount} words
            </span>
          </div>

          {(humanizeError || detectError) && (
            <div className="mt-4 rounded-2xl border border-red-200/80 bg-red-50/80 px-4 py-3 text-sm text-red-800">
              {mode === "humanizer" ? humanizeError : detectError}
            </div>
          )}
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
            </div>
          </div>

          {(isHumanizing || isDetecting) && (
            <motion.div
              className="mt-6 overflow-hidden rounded-2xl bg-linear-to-r from-violet-50/60 via-blue-50/40 to-purple-50/60 px-6 py-5 ring-1 ring-violet-200/40"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="flex items-center gap-4">
                <svg className="size-8 shrink-0 animate-spin" viewBox="0 0 36 36" fill="none">
                  <circle cx="18" cy="18" r="14" stroke="#e2e8f0" strokeWidth="4" />
                  <circle cx="18" cy="18" r="14" stroke="url(#spinner-grad)" strokeWidth="4" strokeLinecap="round" strokeDasharray="60 28" />
                  <defs>
                    <linearGradient id="spinner-grad" x1="0" y1="0" x2="36" y2="36">
                      <stop stopColor="#8B5CF6" />
                      <stop offset="1" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {isHumanizing ? "Your request is in the queue! Processing will begin shortly." : "Analyzing your text for AI patterns."}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">This usually takes 10–30 seconds</p>
                </div>
              </div>
            </motion.div>
          )}

          {mode === "humanizer" && showResult && (
            <div ref={resultRef} className="mt-8 animate-result-in">
              {insufficientCredits && (
                <motion.div
                  className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-orange-200/60 bg-linear-to-r from-orange-50 to-amber-50/50 px-6 py-5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-2xl bg-linear-to-br from-orange-400 to-red-500 text-white shadow-lg shadow-orange-500/20">
                      <DollarSign className="size-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Insufficient Credits</p>
                      <p className="text-xs text-slate-500">You need 30 more credits for this request.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-orange-500 to-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:shadow-xl"
                  >
                    Upgrade to Pro
                    <ArrowUp className="size-4" aria-hidden />
                  </button>
                </motion.div>
              )}

              {/* Success banner */}
              <motion.div
                className="relative overflow-hidden rounded-2xl bg-linear-to-r from-emerald-50/80 via-white to-violet-50/60 px-6 py-6 ring-1 ring-slate-200/60 sm:px-8 sm:py-7"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="pointer-events-none absolute -right-6 -top-6 size-28 rounded-full bg-emerald-500/6" aria-hidden />
                <div className="pointer-events-none absolute -bottom-4 -left-4 size-20 rounded-full bg-violet-500/6" aria-hidden />
                <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <motion.div
                      className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 shadow-lg shadow-emerald-500/30 sm:size-12"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <Check className="size-5 text-white sm:size-6" aria-hidden />
                    </motion.div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 sm:text-xl">Humanized Successfully!</h3>
                      <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">Your text has been transformed to sound more natural</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-600 ring-1 ring-emerald-200/50">
                    Bypasses AI Detection
                  </span>
                </div>
              </motion.div>

              {/* Result card */}
              <motion.div
                className="mt-4 overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-900/8 ring-1 ring-slate-900/6"
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Divider with labels */}
                <motion.div
                  className="relative border-b border-slate-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <div className="absolute inset-x-0 top-0 flex items-center justify-center">
                    <div className="flex items-center gap-1 rounded-b-lg bg-slate-50 px-4 py-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-red-400">Before</span>
                      <span className="mx-2 text-slate-300">&rarr;</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B5CF6]">After</span>
                    </div>
                  </div>
                </motion.div>

                {/* Content panels */}
                <div className="grid lg:grid-cols-2">
                  {/* Original */}
                  <motion.div
                    className="border-b border-slate-100 bg-linear-to-br from-red-50/40 via-rose-50/20 to-white lg:border-b-0 lg:border-r"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-6 pt-8 sm:px-8">
                      <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.15em] text-red-400">Original</p>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto px-6 pb-6 sm:px-8">
                      <p className="whitespace-pre-wrap text-sm leading-[1.85] text-slate-500 sm:text-[15px]">
                        {text}
                      </p>
                    </div>
                  </motion.div>

                  {/* Humanized */}
                  <motion.div
                    className="bg-linear-to-br from-violet-50/30 via-white to-emerald-50/20"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-6 pt-8 sm:px-8">
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8B5CF6]">Humanized</p>
                        {versionsCount > 1 && (
                          <div className="flex items-center gap-1 rounded-full bg-slate-100/80 p-0.5">
                            {Array.from({ length: versionsCount }).map((_, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => setCurrentVersionIndex(i)}
                                className={`rounded-full px-3 py-1 text-[11px] font-semibold transition ${
                                  currentVersionIndex === i
                                    ? "bg-white text-slate-900 shadow-sm"
                                    : "text-slate-400 hover:text-slate-600"
                                }`}
                              >
                                Version {i + 1}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto px-6 pb-6 sm:px-8">
                      <motion.p
                        key={currentVersionIndex}
                        className="whitespace-pre-wrap text-sm leading-[1.85] text-slate-800 sm:text-[15px]"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        {currentText}
                      </motion.p>
                    </div>
                  </motion.div>
                </div>

                {/* Footer */}
                <motion.div
                  className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/40 px-6 py-3 sm:px-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-600 ring-1 ring-emerald-200/50">
                    <ShieldCheck className="size-3.5" aria-hidden />
                    100% human written
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    <Copy className="size-4" aria-hidden />
                    Copy
                  </button>
                </motion.div>
              </motion.div>
            </div>
          )}

          {mode === "detector" && showDetectionResult && detectionScores && (
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

                {/* Big circular progress + verdict */}
                {(() => {
                  const mainScore = detectionScores.isAi ? detectionScores.aiScore : detectionScores.humanScore;
                  const radius = 54;
                  const circumference = 2 * Math.PI * radius;
                  const offset = circumference - (mainScore / 100) * circumference;
                  const ringStroke = detectionScores.isAi ? "#ef4444" : "#10b981";
                  const ringTrack = detectionScores.isAi ? "#fecaca" : "#d1fae5";
                  return (
                    <motion.div
                      className="flex flex-col items-center px-5 py-8 sm:px-6 sm:py-10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`flex size-10 items-center justify-center rounded-full ${detectionScores.isAi ? "bg-red-100" : "bg-emerald-100"}`}>
                          {detectionScores.isAi
                            ? <AlertTriangle className="size-5 text-red-500" aria-hidden />
                            : <Check className="size-5 text-emerald-500" aria-hidden />}
                        </span>
                        <h4 className={`text-xl font-bold sm:text-2xl ${detectionScores.isAi ? "text-red-600" : "text-emerald-600"}`}>
                          {detectionScores.isAi ? "AI Generated" : "Human Written"}
                        </h4>
                      </div>
                      <p className="mt-1.5 text-sm text-slate-500">
                        {detectionScores.isAi
                          ? "Your text appears to be generated by AI"
                          : "Your text appears to be written by a human"}
                      </p>

                      <div className="relative mt-6 size-36 sm:size-44">
                        <svg className="size-full -rotate-90" viewBox="0 0 128 128">
                          <circle cx="64" cy="64" r={radius} fill="none" stroke={ringTrack} strokeWidth="10" />
                          <motion.circle
                            cx="64"
                            cy="64"
                            r={radius}
                            fill="none"
                            stroke={ringStroke}
                            strokeWidth="10"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: offset }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-2xl font-bold tabular-nums sm:text-3xl ${detectionScores.isAi ? "text-red-600" : "text-emerald-600"}`}>
                            {mainScore}%
                          </span>
                        </div>
                      </div>

                      <p className="mt-4 text-sm font-bold text-slate-800">Detection Confidence</p>
                      <p className="text-xs text-slate-500">
                        {mainScore >= 80 ? "High confidence" : mainScore >= 50 ? "Medium confidence" : "Low confidence"}
                      </p>
                    </motion.div>
                  );
                })()}

                {/* Probability breakdown cards */}
                <div className="grid grid-cols-1 gap-3 px-5 pb-6 sm:grid-cols-2 sm:gap-4 sm:px-6 lg:grid-cols-3">
                  <motion.div
                    className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 text-center sm:p-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-xl font-bold tabular-nums text-emerald-600 sm:text-2xl">{detectionScores.humanScore}.0%</p>
                    <p className="mt-1 text-xs font-semibold text-emerald-700 sm:text-sm">Human</p>
                    <div className="mx-auto mt-2 h-1.5 w-full rounded-full bg-emerald-200 sm:h-2">
                      <motion.div
                        className="h-1.5 rounded-full bg-emerald-500 sm:h-2"
                        initial={{ width: 0 }}
                        animate={{ width: `${detectionScores.humanScore}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className="rounded-xl border border-red-200 bg-red-50/60 p-4 text-center sm:p-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-xl font-bold tabular-nums text-red-600 sm:text-2xl">{detectionScores.aiScore}.0%</p>
                    <p className="mt-1 text-xs font-semibold text-red-700 sm:text-sm">AI</p>
                    <div className="mx-auto mt-2 h-1.5 w-full rounded-full bg-red-200 sm:h-2">
                      <motion.div
                        className="h-1.5 rounded-full bg-red-500 sm:h-2"
                        initial={{ width: 0 }}
                        animate={{ width: `${detectionScores.aiScore}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className="rounded-xl border border-orange-200 bg-orange-50/60 p-4 text-center sm:col-span-2 sm:p-5 lg:col-span-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-xl font-bold tabular-nums text-orange-600 sm:text-2xl">{detectionScores.aiParaphrasedScore}.0%</p>
                    <p className="mt-1 text-xs font-semibold text-orange-700 sm:text-sm">AI Paraphrased</p>
                    <div className="mx-auto mt-2 h-1.5 w-full rounded-full bg-orange-200 sm:h-2">
                      <motion.div
                        className="h-1.5 rounded-full bg-orange-500 sm:h-2"
                        initial={{ width: 0 }}
                        animate={{ width: `${detectionScores.aiParaphrasedScore}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                      />
                    </div>
                  </motion.div>
                </div>

                {detectionScores.isAi && (
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
                )}
              </div>

              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => { setDetectionResult(null); resetDetectError(); }}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800"
                >
                  Detect again
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
