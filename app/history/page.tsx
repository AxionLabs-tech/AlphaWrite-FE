"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  History,
  RotateCcw,
  Sparkles,
  Wand2,
} from "lucide-react";
import { useQuickHistory } from "@/services/hooks";
import type { QuickHistoryItem } from "@/services/dtos/writing";

const PAGE_SIZE = 10;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function buildRerunHref(item: QuickHistoryItem): string {
  const q = new URLSearchParams({
    topic: item.topic,
    type: item.type,
    tone: item.tone,
    target_length: String(item.target_length),
  });
  if (item.additional_instructions) {
    q.set("additional_instructions", item.additional_instructions);
  }
  if (item.style_fingerprint_used) q.set("use_style", "1");
  return `/write/quick?${q.toString()}`;
}

export default function HistoryPage() {
  const history = useQuickHistory();
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    void history.fetchHistory({ page, limit: PAGE_SIZE });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const toggleExpand = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleCopy = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  }, []);

  const items = history.data?.history ?? [];
  const totalPages = history.data?.total_pages ?? 1;
  const hasPrev = history.data?.has_prev ?? false;
  const hasNext = history.data?.has_next ?? false;

  const empty = useMemo(
    () => !history.isLoading && items.length === 0,
    [history.isLoading, items.length]
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="border-l-4 border-[#8B5CF6] pl-4">
        <h1 className="bg-linear-to-r from-[#8B5CF6] to-violet-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
          Generation history
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Re-run, copy, or expand any past quick generate.
        </p>
      </header>

      {history.error && (
        <div className="mt-6 rounded-xl bg-red-50 p-3 text-sm text-red-700">
          {history.error}
        </div>
      )}

      <div className="mt-8 space-y-4">
        {history.isLoading && items.length === 0 ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl bg-white/70" />
          ))
        ) : empty ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-[0_4px_24px_-4px_rgba(15,23,42,0.08),0_8px_16px_-6px_rgba(15,23,42,0.04)]">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-violet-50">
              <History className="size-6 text-[#8B5CF6]" aria-hidden />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              No generations yet
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Quick generates you create will show up here.
            </p>
            <Link
              href="/write/quick"
              className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-[#8B5CF6] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:bg-violet-600"
            >
              <Sparkles className="size-4" aria-hidden />
              Generate something
            </Link>
          </div>
        ) : (
          items.map((item) => (
            <HistoryRow
              key={item.id}
              item={item}
              expanded={expanded.has(item.id)}
              onToggle={() => toggleExpand(item.id)}
              onCopy={() => void handleCopy(item.output_text)}
            />
          ))
        )}
      </div>

      {!empty && totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Page {page} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!hasPrev || history.isLoading}
              className="flex items-center gap-1 rounded-lg border-2 border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              <ChevronLeft className="size-3.5" aria-hidden />
              Previous
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasNext || history.isLoading}
              className="flex items-center gap-1 rounded-lg border-2 border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Next
              <ChevronRight className="size-3.5" aria-hidden />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function HistoryRow({
  item,
  expanded,
  onToggle,
  onCopy,
}: {
  item: QuickHistoryItem;
  expanded: boolean;
  onToggle: () => void;
  onCopy: () => void;
}) {
  return (
    <article className="rounded-3xl bg-white p-5 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.08),0_8px_16px_-6px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_8px_32px_-4px_rgba(15,23,42,0.1),0_12px_24px_-6px_rgba(15,23,42,0.06)]">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="rounded-full bg-violet-50 px-2 py-0.5 font-semibold uppercase tracking-wide text-[#8B5CF6]">
              {item.type}
            </span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-600">
              {item.tone}
            </span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-600">
              {item.target_length} words target
            </span>
            {item.style_fingerprint_used && (
              <span className="flex items-center gap-1 rounded-full bg-violet-50 px-2 py-0.5 font-medium text-[#8B5CF6]">
                <Wand2 className="size-3" aria-hidden />
                Your style
              </span>
            )}
            <span className="text-slate-400">{formatDate(item.timestamp)}</span>
          </div>
          <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-slate-900">
            {item.topic}
          </h3>
          {item.additional_instructions && (
            <p className="mt-1 line-clamp-1 text-xs text-slate-500">
              <span className="font-medium">Instructions:</span> {item.additional_instructions}
            </p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={buildRerunHref(item)}
            className="flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200"
          >
            <RotateCcw className="size-3.5" aria-hidden />
            Re-run
          </Link>
          <button
            type="button"
            onClick={onCopy}
            className="flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200"
          >
            <Copy className="size-3.5" aria-hidden />
            Copy
          </button>
        </div>
      </header>

      <p className={`mt-3 whitespace-pre-wrap text-sm text-slate-700 ${expanded ? "" : "line-clamp-3"}`}>
        {item.output_text}
      </p>

      <button
        type="button"
        onClick={onToggle}
        className="mt-3 flex items-center gap-1 text-xs font-medium text-[#8B5CF6] hover:underline"
      >
        <ChevronDown
          className={`size-3.5 transition-transform ${expanded ? "rotate-180" : ""}`}
          aria-hidden
        />
        {expanded ? "Collapse" : `Show full (${item.word_count} words)`}
      </button>
    </article>
  );
}
