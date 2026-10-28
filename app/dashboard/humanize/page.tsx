"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  AlertTriangle,
  BarChart3,
  Check,
  ClipboardPaste,
  Copy,
  RefreshCw,
  ShieldCheck,
  Upload,
  Wand2,
  Zap,
} from "lucide-react";
import { useDetectAi, useParaphrase } from "@/services/hooks";
import type { DetectAiResponse } from "@/services/dtos/ai";
import {
  getDetectionProbabilities,
  isDetectionAIGenerated,
} from "@/services/detection";
import { ApiError } from "@/services/apiClient";

type Mode = "humanize" | "detect";

export default function HumanizePage() {
  const [mode, setMode] = useState<Mode>("humanize");
  const [text, setText] = useState("");
  const [humanized, setHumanized] = useState<string[] | null>(null);
  const [versionIdx, setVersionIdx] = useState(0);
  const [detection, setDetection] = useState<DetectAiResponse | null>(null);
  const [insufficient, setInsufficient] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const {
    paraphrase,
    isParaphrasing,
    error: humanizeError,
    resetError: resetHumanizeError,
  } = useParaphrase();
  const {
    detectAi,
    isDetecting,
    error: detectError,
    resetError: resetDetectError,
  } = useDetectAi();

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const handleHumanize = useCallback(async () => {
    if (!text.trim()) return;
    setHumanized(null);
    setInsufficient(false);
    resetHumanizeError();
    try {
      const res = await paraphrase({ text: text.trim() });
      const cleaned =
        res.paraphrased_texts?.map((t) => t.replace(/\*\*/g, "")) ?? [];
      setHumanized(cleaned);
      setVersionIdx(0);
    } catch (e) {
      if (e instanceof ApiError && e.status === 403) setInsufficient(true);
      throw e;
    }
  }, [text, paraphrase, resetHumanizeError]);

  const handleDetect = useCallback(async () => {
    if (!text.trim()) return;
    setDetection(null);
    resetDetectError();
    try {
      const res = await detectAi({ text: text.trim() });
      setDetection(res);
    } catch {
      /* surfaced via detectError */
    }
  }, [text, detectAi, resetDetectError]);

  const handlePaste = useCallback(async () => {
    try {
      const t = await navigator.clipboard.readText();
      setText((prev) => prev + (prev ? "\n\n" : "") + t);
    } catch {
      /* permission denied */
    }
  }, []);

  const handleFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const r = new FileReader();
      r.onload = () => {
        const c = typeof r.result === "string" ? r.result : "";
        setText((prev) => prev + (prev ? "\n\n" : "") + c);
      };
      r.readAsText(file);
      e.target.value = "";
    },
    []
  );

  const handleCopy = useCallback(() => {
    if (!humanized?.length) return;
    void navigator.clipboard.writeText(humanized[versionIdx]);
    toast.success("Copied to clipboard");
  }, [humanized, versionIdx]);

  const showHumanizedResult = mode === "humanize" && humanized !== null;
  const showDetectionResult = mode === "detect" && detection !== null;

  useEffect(() => {
    if ((showHumanizedResult || showDetectionResult) && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showHumanizedResult, showDetectionResult]);

  const scores = detection
    ? (() => {
        const p = getDetectionProbabilities(detection);
        return {
          human: Math.round(p.human),
          ai: Math.round(p.ai),
          paraphrased: Math.round(p.ai_paraphrased),
          isAi: isDetectionAIGenerated(detection),
        };
      })()
    : null;

  const busy = isParaphrasing || isDetecting;

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden px-4 py-4 sm:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-105 bg-[radial-gradient(60%_55%_at_50%_0%,rgba(141,105,243,0.14),transparent_70%)]"
      />
      <div className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain pb-10">
      {/* Header */}
      <header className="mb-6 max-w-3xl">
        <div className="flex items-start gap-4">
          <Image
            src="/icons/nav-humanizer.png"
            alt=""
            width={56}
            height={56}
            className="size-14 shrink-0 object-contain sm:size-16"
            priority
          />
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#6642B6] shadow-sm ring-1 ring-violet-100 backdrop-blur">
              Humanize &amp; detect
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Humanizer &amp;{" "}
              <span className="bg-linear-to-r from-[#8D69F3] to-[#6642B6] bg-clip-text text-transparent">
                Detector
              </span>
            </h1>
            <p className="mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
              Rewrite AI text to sound human, or scan any passage for AI patterns.
            </p>
          </div>
        </div>
      </header>

      {/* Primary card */}
      <div className="rounded-3xl bg-white p-6 shadow-[0_18px_50px_-24px_rgba(102,66,182,0.25)] ring-1 ring-slate-200/70 sm:p-8">
        {/* Mode toggle */}
        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex rounded-2xl bg-slate-100/80 p-1 ring-1 ring-slate-200/70">
            {(
              [
                { k: "humanize" as const, label: "Humanize", icon: Wand2 },
                { k: "detect" as const, label: "Detect", icon: BarChart3 },
              ]
            ).map(({ k, label, icon: Icon }) => {
              const active = mode === k;
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setMode(k)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-white text-[#6642B6] shadow-sm ring-1 ring-slate-200/70"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Icon className="size-4" />
                  {label}
                </button>
              );
            })}
          </div>
          <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold tabular-nums text-slate-500 ring-1 ring-slate-200/70">
            {wordCount} words
          </span>
        </div>

        {/* Textarea */}
        <div className="relative mt-5">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              mode === "humanize"
                ? "Paste AI-written text to rewrite in a human voice…"
                : "Paste text to scan for AI patterns…"
            }
            rows={12}
            className="w-full resize-y rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-[15px] leading-relaxed text-slate-800 placeholder:text-slate-400 transition focus:border-[#8D69F3]/60 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#8D69F3]/15"
          />
          {text === "" && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="pointer-events-auto flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                <button
                  type="button"
                  onClick={handlePaste}
                  className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-[#6642B6] transition hover:bg-violet-50"
                >
                  <ClipboardPaste className="size-3.5" />
                  Paste
                </button>
                <span className="h-4 w-px bg-slate-200" />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-[#6642B6] transition hover:bg-violet-50"
                >
                  <Upload className="size-3.5" />
                  Upload
                </button>
              </div>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.text,text/plain"
            onChange={handleFile}
            className="sr-only"
            aria-hidden
          />
        </div>

        {/* Action bar */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1.5 font-semibold text-[#6642B6] ring-1 ring-violet-100">
              <BarChart3 className="size-3.5" />
              Detect limit 1,000 words
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 font-semibold text-slate-600 ring-1 ring-slate-200/80">
              <Zap className="size-3.5" />
              Humanize limit 250 words
            </span>
          </div>
          <div className="flex items-center gap-2">
            {(humanized || detection) && (
              <button
                type="button"
                onClick={() => {
                  setHumanized(null);
                  setDetection(null);
                  resetHumanizeError();
                  resetDetectError();
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-slate-600 ring-1 ring-slate-200/80 transition hover:bg-slate-50"
              >
                <RefreshCw className="size-3.5" />
                Reset
              </button>
            )}
            <button
              type="button"
              onClick={mode === "humanize" ? handleHumanize : handleDetect}
              disabled={busy || !text.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-linear-to-br from-[#8D69F3] to-[#6642B6] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-500/25 transition hover:shadow-lg hover:shadow-violet-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? (
                <>
                  <span
                    className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                    aria-hidden
                  />
                  {mode === "humanize" ? "Humanizing…" : "Analyzing…"}
                </>
              ) : mode === "humanize" ? (
                <>
                  <Zap className="size-4" />
                  Humanize text
                </>
              ) : (
                <>
                  <BarChart3 className="size-4" />
                  Detect AI
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {(humanizeError || detectError) && (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {mode === "humanize" ? humanizeError : detectError}
          </div>
        )}

        {/* Insufficient credits */}
        {insufficient && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-orange-800">
              <AlertTriangle className="size-4" />
              Not enough credits for this request.
            </div>
            <button
              type="button"
              className="rounded-xl bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-orange-600"
            >
              Top up
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      <div ref={resultRef}>
        {showHumanizedResult && humanized && humanized.length > 0 && (
          <HumanizedResult
            original={text}
            versions={humanized}
            versionIdx={versionIdx}
            onVersion={setVersionIdx}
            onCopy={handleCopy}
          />
        )}
        {showDetectionResult && scores && (
          <DetectionResult scores={scores} onSwitchHumanize={() => setMode("humanize")} />
        )}
      </div>
      </div>
    </div>
  );
}

function HumanizedResult({
  original,
  versions,
  versionIdx,
  onVersion,
  onCopy,
}: {
  original: string;
  versions: string[];
  versionIdx: number;
  onVersion: (i: number) => void;
  onCopy: () => void;
}) {
  const current = versions[versionIdx] ?? "";
  return (
    <section className="mt-6 overflow-hidden rounded-3xl bg-white shadow-[0_18px_50px_-24px_rgba(16,185,129,0.25)] ring-1 ring-slate-200/70">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-6 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-emerald-400 to-emerald-500 text-white shadow-md shadow-emerald-500/30">
            <Check className="size-5" />
          </span>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Humanized
            </h2>
            <p className="text-xs text-slate-500">
              Your text has been rewritten in a natural voice.
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-100">
          <ShieldCheck className="size-3.5" />
          Passes detection
        </span>
      </header>

      <div className="grid lg:grid-cols-2">
        <div className="border-b border-slate-100 bg-slate-50/60 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
            Original
          </p>
          <p className="max-h-[400px] overflow-y-auto whitespace-pre-wrap text-sm leading-[1.8] text-slate-500">
            {original}
          </p>
        </div>
        <div className="p-6 sm:p-8">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6642B6]">
              Humanized
            </p>
            {versions.length > 1 && (
              <div className="flex items-center gap-1 rounded-full bg-slate-100 p-0.5">
                {versions.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onVersion(i)}
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold transition ${
                      versionIdx === i
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    v{i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
          <p className="max-h-[400px] overflow-y-auto whitespace-pre-wrap text-sm leading-[1.8] text-slate-800">
            {current}
          </p>
        </div>
      </div>

      <footer className="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/40 px-6 py-3 sm:px-8">
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98]"
        >
          <Copy className="size-4" />
          Copy result
        </button>
      </footer>
    </section>
  );
}

function DetectionResult({
  scores,
  onSwitchHumanize,
}: {
  scores: { human: number; ai: number; paraphrased: number; isAi: boolean };
  onSwitchHumanize: () => void;
}) {
  const mainScore = scores.isAi ? scores.ai : scores.human;
  const r = 54;
  const c = 2 * Math.PI * r;
  const offset = c - (mainScore / 100) * c;
  const ringStroke = scores.isAi ? "#ef4444" : "#10b981";
  const ringTrack = scores.isAi ? "#fecaca" : "#d1fae5";

  return (
    <section className="mt-6 overflow-hidden rounded-3xl bg-white shadow-[0_18px_50px_-24px_rgba(102,66,182,0.2)] ring-1 ring-slate-200/70">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-6 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-violet-200 to-violet-300 text-[#6642B6] shadow-inner">
            <BarChart3 className="size-5" />
          </span>
          <h2 className="text-base font-bold text-slate-900">
            Detection results
          </h2>
        </div>
        <span className="rounded-full bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-500 ring-1 ring-slate-200/70">
          Analyzed
        </span>
      </header>

      <div className="flex flex-col items-center px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex items-center gap-2.5">
          <span
            className={`flex size-9 items-center justify-center rounded-full ${
              scores.isAi ? "bg-red-100" : "bg-emerald-100"
            }`}
          >
            {scores.isAi ? (
              <AlertTriangle className="size-5 text-red-500" />
            ) : (
              <Check className="size-5 text-emerald-500" />
            )}
          </span>
          <h3
            className={`text-xl font-bold sm:text-2xl ${
              scores.isAi ? "text-red-600" : "text-emerald-600"
            }`}
          >
            {scores.isAi ? "Likely AI" : "Likely Human"}
          </h3>
        </div>
        <p className="mt-1 text-sm text-slate-500">
          {scores.isAi
            ? "This passage reads as AI-generated."
            : "This passage reads as human-written."}
        </p>

        <div className="relative mt-6 size-36 sm:size-44">
          <svg className="size-full -rotate-90" viewBox="0 0 128 128">
            <circle cx="64" cy="64" r={r} fill="none" stroke={ringTrack} strokeWidth="10" />
            <circle
              cx="64"
              cy="64"
              r={r}
              fill="none"
              stroke={ringStroke}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={`text-2xl font-bold tabular-nums sm:text-3xl ${
                scores.isAi ? "text-red-600" : "text-emerald-600"
              }`}
            >
              {mainScore}%
            </span>
          </div>
        </div>
        <p className="mt-3 text-xs font-semibold text-slate-500">
          Detection confidence
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 px-6 pb-6 sm:grid-cols-3 sm:px-8">
        <Pill label="Human" value={scores.human} tone="emerald" />
        <Pill label="AI" value={scores.ai} tone="red" />
        <Pill label="AI Paraphrased" value={scores.paraphrased} tone="orange" />
      </div>

      {scores.isAi && (
        <div className="border-t border-slate-100 bg-violet-50/40 px-6 py-5 text-center sm:px-8">
          <p className="text-sm text-slate-600">
            Your text may be flagged by AI detectors. Humanize it to make it
            undetectable.
          </p>
          <button
            type="button"
            onClick={onSwitchHumanize}
            className="mt-3 inline-flex items-center gap-2 rounded-xl bg-linear-to-br from-[#8D69F3] to-[#6642B6] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-500/25 transition hover:shadow-lg hover:shadow-violet-500/30 active:scale-[0.98]"
          >
            <Zap className="size-4" />
            Humanize this text
          </button>
        </div>
      )}
    </section>
  );
}

function Pill({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "emerald" | "red" | "orange";
}) {
  const bg = {
    emerald: "border-emerald-200 bg-emerald-50/60",
    red: "border-red-200 bg-red-50/60",
    orange: "border-orange-200 bg-orange-50/60",
  }[tone];
  const text = {
    emerald: "text-emerald-700",
    red: "text-red-700",
    orange: "text-orange-700",
  }[tone];
  const bar = {
    emerald: "bg-emerald-500",
    red: "bg-red-500",
    orange: "bg-orange-500",
  }[tone];
  const track = {
    emerald: "bg-emerald-200",
    red: "bg-red-200",
    orange: "bg-orange-200",
  }[tone];
  return (
    <div className={`rounded-2xl border p-4 text-center ${bg}`}>
      <p className={`text-xl font-bold tabular-nums ${text}`}>
        {value}%
      </p>
      <p className={`mt-0.5 text-xs font-semibold ${text}`}>{label}</p>
      <div className={`mx-auto mt-2 h-1.5 w-full rounded-full ${track}`}>
        <div
          className={`h-1.5 rounded-full ${bar}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
