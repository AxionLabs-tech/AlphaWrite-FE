"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  AlertCircle,
  ArrowRight,
  Check,
  ChevronDown,
  Copy,
  FileText,
  Loader2,
  MessageSquare,
  Plus,
  Sparkles,
  StopCircle,
  Wand2,
  X,
  Zap,
} from "lucide-react";
import { useQuickGenerateStream, useQuickHistory, useStyleFingerprint } from "@/services/hooks";
import { WRITING, PLAN_TARGET_LENGTH_CAPS, type PlanType } from "@/services/dtos/writing";
import { useAuthOptional } from "@/app/context/AuthContext";
import { WriterShell, WriterTabs } from "@/app/components/WriterShell";

const STYLE_PREF_KEY = "alphawrite.quick.useStyleFingerprint";

function planCap(plan: string | undefined): number {
  const p = (plan ?? "free").toLowerCase() as PlanType;
  return PLAN_TARGET_LENGTH_CAPS[p] ?? WRITING.TARGET_LENGTH_MAX;
}

function title(s: string): string {
  return s ? s[0].toUpperCase() + s.slice(1).replace(/-/g, " ") : s;
}

const SUGGESTED_TOPICS = [
  "A welcome email for new SaaS customers",
  "A LinkedIn post on async work",
  "A 500-word blog intro about morning routines",
];

export default function QuickGeneratePage() {
  const auth = useAuthOptional();
  const stream = useQuickGenerateStream();
  const style = useStyleFingerprint();
  const searchParams = useSearchParams();
  const topicRef = useRef<HTMLTextAreaElement>(null);

  const [topic, setTopic] = useState(() => searchParams.get("topic") ?? "");
  const [type, setType] = useState<string>(
    () => searchParams.get("type") ?? WRITING.TYPE_OPTIONS[0]
  );
  const [tone, setTone] = useState<string>(
    () => searchParams.get("tone") ?? WRITING.TONE_OPTIONS[0]
  );
  const [length, setLength] = useState<number>(() => {
    const raw = searchParams.get("target_length");
    const parsed = raw ? Number(raw) : NaN;
    return Number.isFinite(parsed) ? parsed : WRITING.TARGET_LENGTH_DEFAULT;
  });
  const [instructions, setInstructions] = useState(
    () => searchParams.get("additional_instructions") ?? ""
  );
  const [useStyle, setUseStyle] = useState(() => searchParams.get("use_style") === "1");
  const [copied, setCopied] = useState(false);
  const [showInstructions, setShowInstructions] = useState(
    () => !!searchParams.get("additional_instructions")
  );

  useEffect(() => {
    if (!searchParams.get("use_style")) {
      const v = localStorage.getItem(STYLE_PREF_KEY);
      if (v !== null) setUseStyle(v === "1");
    }
    void style.fetchFingerprint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(STYLE_PREF_KEY, useStyle ? "1" : "0");
  }, [useStyle]);

  // Auto-grow topic textarea
  useEffect(() => {
    const t = topicRef.current;
    if (!t) return;
    t.style.height = "0px";
    t.style.height = `${Math.min(t.scrollHeight, 220)}px`;
  }, [topic]);

  const styleReady = style.data?.status === "ready";
  const effectiveUseStyle = useStyle && styleReady;
  const cap = planCap(auth?.user?.plan_type);
  const lengthMax = Math.min(WRITING.TARGET_LENGTH_MAX, cap);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!topic.trim()) {
        toast.error("Add a topic to get started");
        topicRef.current?.focus();
        return;
      }
      if (length > cap) {
        toast.error(`Your plan caps target length at ${cap} words`);
        return;
      }
      stream.reset();
      try {
        await stream.generate({
          topic: topic.trim(),
          type,
          tone,
          target_length: length,
          additional_instructions: instructions.trim() || null,
          use_style_fingerprint: effectiveUseStyle,
        });
      } catch {
        // surfaced in stream.error
      }
    },
    [topic, type, tone, length, instructions, effectiveUseStyle, cap, stream]
  );

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(stream.text);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  }, [stream.text]);

  const handleClear = useCallback(() => {
    stream.reset();
    setTopic("");
    setInstructions("");
    setShowInstructions(false);
    topicRef.current?.focus();
  }, [stream]);

  const hasOutput = stream.text.length > 0 || stream.isStreaming;

  // Quick generate history for middle column
  const history = useQuickHistory();
  useEffect(() => {
    void history.fetchHistory({ page: 1, limit: 30 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApplyHistory = useCallback((item: { topic: string; type: string; tone: string; target_length: number; additional_instructions: string | null; style_fingerprint_used: boolean }) => {
    setTopic(item.topic);
    setType(item.type);
    setTone(item.tone);
    setLength(item.target_length);
    setInstructions(item.additional_instructions ?? "");
    setShowInstructions(!!item.additional_instructions);
    setUseStyle(item.style_fingerprint_used);
    topicRef.current?.focus();
    topicRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const middleColumn = (
    <>
      <WriterTabs active="quick" />
      <div className="flex items-center justify-between px-5 pb-3 pt-5">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-slate-500">
          Generations
        </h2>
        {history.data && (
          <span className="text-[11px] font-medium text-slate-400">
            {history.data.total_count}{" "}
            {history.data.total_count === 1 ? "item" : "items"}
          </span>
        )}
      </div>
      <div className="px-4 pb-4">
        <button
          type="button"
          onClick={handleClear}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-violet-600 px-4 py-3 text-sm font-semibold tracking-tight text-white shadow-lg shadow-violet-500/40 transition hover:shadow-xl hover:shadow-violet-500/50"
        >
          <Plus className="size-4" aria-hidden />
          New Generation
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <ul className="space-y-1.5">
          {history.isLoading && !history.data ? (
            Array.from({ length: 5 }).map((_, i) => (
              <li key={i} className="mx-1 h-14 animate-pulse rounded-xl bg-slate-200/60" />
            ))
          ) : history.data?.history.length ? (
            history.data.history.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleApplyHistory(item)}
                  className="flex w-full min-w-0 flex-col gap-1 overflow-hidden rounded-xl px-3.5 py-3 text-left text-slate-600 transition-all duration-200 hover:bg-white hover:shadow-sm hover:ring-1 hover:ring-slate-200/60"
                >
                  <span className="block w-full truncate text-[14px] font-semibold tracking-tight text-slate-800">
                    {item.topic}
                  </span>
                  <span className="block w-full truncate text-[11px] font-medium text-slate-400">
                    {item.type} · {item.word_count} words
                  </span>
                </button>
              </li>
            ))
          ) : (
            <li className="mx-1 mt-3 rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center text-xs text-slate-400">
              No generations yet
            </li>
          )}
        </ul>
      </div>
    </>
  );

  return (
    <WriterShell middleColumn={middleColumn} middleColumnLabel="Quick Generate history">
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/30">
            <Zap className="size-5 text-white" aria-hidden />
          </div>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            What should we write?
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Tell us the topic — we&apos;ll draft a piece tuned to your length, tone, and style.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          {/* Topic */}
          <div className="rounded-3xl border border-slate-200 bg-white p-1 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.08)] transition focus-within:border-[#8B5CF6]/40 focus-within:shadow-[0_6px_28px_-6px_rgba(139,92,246,0.18)]">
            <textarea
              ref={topicRef}
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  void handleSubmit();
                }
              }}
              rows={3}
              placeholder="A friendly 300-word email introducing our new product to existing customers…"
              className="block max-h-[220px] min-h-[88px] w-full resize-none rounded-3xl bg-transparent px-5 py-4 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            <div className="flex flex-wrap items-center gap-2 px-3 pb-3 pt-1">
              <ChipSelect
                icon={<FileText className="size-3.5" aria-hidden />}
                label="Type"
                value={type}
                options={WRITING.TYPE_OPTIONS.map((o) => ({ value: o, label: title(o) }))}
                onChange={setType}
              />
              <ChipSelect
                icon={<MessageSquare className="size-3.5" aria-hidden />}
                label="Tone"
                value={tone}
                options={WRITING.TONE_OPTIONS.map((o) => ({ value: o, label: title(o) }))}
                onChange={setTone}
              />
              <LengthChip
                value={length}
                min={WRITING.TARGET_LENGTH_MIN}
                max={lengthMax}
                onChange={setLength}
              />
              <button
                type="button"
                onClick={() => setUseStyle((v) => !v)}
                disabled={!styleReady}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  !styleReady
                    ? "cursor-not-allowed border-slate-200 text-slate-300"
                    : useStyle
                      ? "border-transparent bg-gradient-to-r from-[#8B5CF6] to-fuchsia-500 text-white shadow-sm shadow-violet-500/30"
                      : "border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:text-[#8B5CF6]"
                }`}
                title={styleReady ? "Use my writing style" : "Set up writing style first"}
              >
                <Wand2 className="size-3.5" aria-hidden />
                My style
              </button>

              <button
                type="button"
                onClick={() => setShowInstructions((v) => !v)}
                className="flex items-center gap-1.5 rounded-full border border-dashed border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:border-slate-400 hover:text-slate-700"
              >
                <ChevronDown
                  className={`size-3.5 transition-transform ${showInstructions ? "rotate-180" : ""}`}
                  aria-hidden
                />
                {showInstructions ? "Hide instructions" : "Add instructions"}
              </button>

              <div className="ml-auto flex items-center gap-2">
                {stream.isStreaming ? (
                  <button
                    type="button"
                    onClick={stream.abort}
                    className="flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800"
                  >
                    <StopCircle className="size-4" aria-hidden />
                    Stop
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!topic.trim()}
                    className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-violet-500/30 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                  >
                    Generate
                    <ArrowRight className="size-4" aria-hidden />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Instructions */}
          {showInstructions && (
            <div className="rounded-2xl border border-slate-200 bg-white p-1 transition focus-within:border-[#8B5CF6]/40">
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={3}
                placeholder="e.g. Open with a personal anecdote and avoid jargon"
                className="block w-full resize-y rounded-2xl bg-transparent px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          )}

          {/* Style hint */}
          {!styleReady && (
            <Link
              href="/settings/style"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#8B5CF6] hover:underline"
            >
              <Wand2 className="size-3" aria-hidden />
              Set up your writing style to personalize generations →
            </Link>
          )}

          {/* Suggestions (only when empty + no output) */}
          {!topic && !hasOutput && (
            <div className="pt-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Try one
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {SUGGESTED_TOPICS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setTopic(s);
                      topicRef.current?.focus();
                    }}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 transition hover:border-violet-300 hover:bg-violet-50/40 hover:text-[#8B5CF6]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </form>

        {/* Output */}
        {(hasOutput || stream.error) && (
          <section className="mt-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-sm shadow-violet-500/30">
                  <Sparkles className="size-3.5 text-white" aria-hidden />
                </div>
                <h2 className="text-sm font-semibold text-slate-900">Generated</h2>
                {stream.wordCount !== null && (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                    {stream.wordCount} words
                  </span>
                )}
                {effectiveUseStyle && (
                  <span className="flex items-center gap-1 rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-medium text-[#8B5CF6]">
                    <Wand2 className="size-2.5" aria-hidden />
                    Your style
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {stream.text && !stream.isStreaming && (
                  <>
                    <button
                      type="button"
                      onClick={() => void handleCopy()}
                      className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                      {copied ? (
                        <>
                          <Check className="size-3.5" aria-hidden />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="size-3.5" aria-hidden />
                          Copy
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleClear}
                      className="flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      <X className="size-3.5" aria-hidden />
                      Clear
                    </button>
                  </>
                )}
              </div>
            </div>

            {stream.error ? (
              <div className="mt-4 flex items-start gap-2 rounded-2xl border border-red-100 bg-red-50/70 p-4 text-sm text-red-700">
                <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
                <span>{stream.error}</span>
              </div>
            ) : (
              <article className="mt-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.08)] sm:p-8">
                {stream.text ? (
                  <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-slate-800">
                    {stream.text}
                    {stream.isStreaming && (
                      <span className="ml-1 inline-block size-2 animate-pulse rounded-full bg-[#8B5CF6] align-middle" />
                    )}
                  </p>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Loader2 className="size-4 animate-spin text-[#8B5CF6]" aria-hidden />
                    Drafting your piece…
                  </div>
                )}
              </article>
            )}
          </section>
        )}
        </div>
      </div>
    </WriterShell>
  );
}

function ChipSelect({
  icon,
  label,
  value,
  options,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="relative inline-flex">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="peer appearance-none rounded-full border border-slate-200 bg-white py-1.5 pl-8 pr-7 text-xs font-medium text-slate-700 transition hover:border-slate-300 focus:border-[#8B5CF6] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/15"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 peer-focus:text-[#8B5CF6]">
        {icon}
      </span>
      <ChevronDown
        className="pointer-events-none absolute right-2.5 top-1/2 size-3 -translate-y-1/2 text-slate-400"
        aria-hidden
      />
    </label>
  );
}

function LengthChip({
  value,
  min,
  max,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const clampedValue = Math.min(Math.max(value, min), max);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white py-1.5 pl-3 pr-3 text-xs font-medium text-slate-700 transition hover:border-slate-300"
      >
        <span className="text-slate-400">Length</span>
        <span className="tabular-nums">{clampedValue}</span>
        <ChevronDown className={`size-3 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-30 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-600">Target length</span>
            <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[11px] font-semibold text-[#8B5CF6] tabular-nums">
              {clampedValue} words
            </span>
          </div>
          <input
            type="range"
            min={min}
            max={max}
            step={50}
            value={clampedValue}
            onChange={(e) => onChange(Number(e.target.value))}
            className="mt-3 w-full accent-[#8B5CF6]"
          />
          <div className="mt-1 flex justify-between text-[10px] text-slate-400">
            <span>{min}</span>
            <span>{max}</span>
          </div>
        </div>
      )}
    </div>
  );
}
