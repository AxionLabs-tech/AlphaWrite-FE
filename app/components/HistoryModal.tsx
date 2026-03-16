"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  Clock,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  ArrowLeft,
  Globe,
  Zap,
  BarChart3,
  AlertTriangle,
} from "lucide-react";
import { useUserHistory } from "@/services/hooks/history";
import type { HistoryItem, HistoryItemType } from "@/services/dtos/history";
import { getDetectionProbabilities } from "@/services/detection";

interface HistoryModalProps {
  open: boolean;
  onClose: () => void;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function truncate(str: string, maxLen: number) {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen).trimEnd() + "...";
}

/* ---------- List card ---------- */

function HistoryItemCard({
  item,
  onSelect,
}: {
  item: HistoryItem;
  onSelect: (item: HistoryItem) => void;
}) {
  const isDetection = item.type === "detection";

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(item)}
      className="group w-full rounded-xl border border-slate-200/80 bg-white p-4 text-left transition hover:border-violet-200 hover:shadow-md hover:shadow-violet-100/50 sm:p-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-800 line-clamp-2 group-hover:text-[#8B5CF6]">
            {truncate(item.original_text, 120)}
          </p>
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            {/* Type badge */}
            {isDetection ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2 py-0.5 text-[11px] font-semibold text-sky-600 ring-1 ring-sky-200/60">
                <BarChart3 className="size-3" aria-hidden />
                Detection
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-0.5 text-[11px] font-semibold text-[#8B5CF6] ring-1 ring-violet-200/60">
                <Zap className="size-3" aria-hidden />
                Humanized
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-xs text-slate-400">
              <Clock className="size-3" aria-hidden />
              {formatDate(item.created_at)}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
              <FileText className="size-3" aria-hidden />
              {item.word_count} words
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
              <Globe className="size-3" aria-hidden />
              {item.language}
            </span>
            {/* Detection verdict */}
            {isDetection && item.prediction && (
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                item.prediction === "ai" ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
              }`}>
                {item.prediction === "ai" ? "AI Detected" : "Human"}
              </span>
            )}
            {/* Paraphrase version count */}
            {!isDetection && item.paraphrased_texts && item.paraphrased_texts.length > 0 && (
              <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[11px] font-semibold text-[#8B5CF6]">
                {item.paraphrased_texts.length} version{item.paraphrased_texts.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
        <ChevronRight className="mt-0.5 size-4 shrink-0 text-slate-300 transition group-hover:text-[#8B5CF6]" aria-hidden />
      </div>
    </motion.button>
  );
}

/* ---------- Detection detail ---------- */

function DetectionDetailView({ item }: { item: HistoryItem }) {
  if (!item.probabilities) return null;

  const probs = getDetectionProbabilities({
    prediction: item.prediction,
    confidence: item.confidence,
    probabilities: item.probabilities,
  });
  const isAi = item.prediction === "ai";
  const humanScore = Math.round(probs.human);
  const aiScore = Math.round(probs.ai);
  const aiParaphrasedScore = Math.round(probs.ai_paraphrased);
  const mainScore = isAi ? aiScore : humanScore;

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (mainScore / 100) * circumference;
  const ringStroke = isAi ? "#ef4444" : "#10b981";
  const ringTrack = isAi ? "#fecaca" : "#d1fae5";

  return (
    <div>
      <div className="flex flex-col items-center py-5">
        <div className="flex items-center gap-2">
          <span className={`flex size-8 items-center justify-center rounded-full ${isAi ? "bg-red-100" : "bg-emerald-100"}`}>
            {isAi
              ? <AlertTriangle className="size-4 text-red-500" aria-hidden />
              : <Check className="size-4 text-emerald-500" aria-hidden />}
          </span>
          <h4 className={`text-lg font-bold ${isAi ? "text-red-600" : "text-emerald-600"}`}>
            {isAi ? "AI Generated" : "Human Written"}
          </h4>
        </div>
        <div className="relative mt-4 size-28">
          <svg className="size-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={radius} fill="none" stroke={ringTrack} strokeWidth="8" />
            <motion.circle
              cx="50" cy="50" r={radius} fill="none"
              stroke={ringStroke} strokeWidth="8" strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-xl font-bold tabular-nums ${isAi ? "text-red-600" : "text-emerald-600"}`}>
              {mainScore}%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {([
          { label: "Human", score: humanScore, barBg: "bg-emerald-200", barFill: "bg-emerald-500", text: "text-emerald-600" },
          { label: "AI", score: aiScore, barBg: "bg-red-200", barFill: "bg-red-500", text: "text-red-600" },
          { label: "AI Paraphrased", score: aiParaphrasedScore, barBg: "bg-orange-200", barFill: "bg-orange-500", text: "text-orange-600" },
        ] as const).map((s) => (
          <div key={s.label} className="rounded-lg bg-slate-50 p-3 text-center">
            <p className={`text-lg font-bold tabular-nums ${s.text}`}>{s.score}%</p>
            <p className="mt-0.5 text-[10px] font-semibold text-slate-500">{s.label}</p>
            <div className={`mx-auto mt-1.5 h-1 w-full rounded-full ${s.barBg}`}>
              <motion.div
                className={`h-1 rounded-full ${s.barFill}`}
                initial={{ width: 0 }}
                animate={{ width: `${s.score}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Detail view ---------- */

function HistoryDetail({
  item,
  onBack,
}: {
  item: HistoryItem;
  onBack: () => void;
}) {
  const [activeVersion, setActiveVersion] = useState(0);
  const [copied, setCopied] = useState(false);
  const isDetection = item.type === "detection";

  const handleCopy = useCallback((text: string) => {
    void navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex h-full flex-col"
    >
      {/* Detail header */}
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
        <button
          type="button"
          onClick={onBack}
          className="flex size-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        >
          <ArrowLeft className="size-4" aria-hidden />
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold text-slate-800">
              {truncate(item.original_text, 50)}
            </p>
            {isDetection ? (
              <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-semibold text-sky-600">
                <BarChart3 className="size-2.5" aria-hidden />
                Detection
              </span>
            ) : (
              <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-semibold text-[#8B5CF6]">
                <Zap className="size-2.5" aria-hidden />
                Humanized
              </span>
            )}
          </div>
          <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-400">
            <span>{formatDate(item.created_at)}</span>
            <span>{item.word_count} words</span>
            <span>{item.language}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-6">
        {/* Original text */}
        <div className="mb-5">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-red-400">Original Text</p>
            <button
              type="button"
              onClick={() => handleCopy(item.original_text)}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            >
              {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="max-h-[180px] overflow-y-auto rounded-xl bg-red-50/40 p-4 ring-1 ring-red-100/80">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
              {item.original_text}
            </p>
          </div>
        </div>

        {/* Detection results */}
        {isDetection && <DetectionDetailView item={item} />}

        {/* Humanized versions */}
        {!isDetection && item.paraphrased_texts && item.paraphrased_texts.length > 0 && (
          <div>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8B5CF6]">Humanized</p>
              {item.paraphrased_texts.length > 1 && (
                <div className="flex items-center gap-1 rounded-full bg-slate-100/80 p-0.5">
                  {item.paraphrased_texts.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveVersion(i)}
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold transition ${
                        activeVersion === i
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
            <div className="max-h-[200px] overflow-y-auto rounded-xl bg-violet-50/40 p-4 ring-1 ring-violet-100/80">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeVersion}
                  className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.paraphrased_texts[activeVersion]}
                </motion.p>
              </AnimatePresence>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(item.paraphrased_texts[activeVersion])}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              Copy Humanized Text
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ---------- Filter tabs ---------- */

const filterTabs: { label: string; value: HistoryItemType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Humanized", value: "paraphrase" },
  { label: "Detection", value: "detection" },
];

/* ---------- Main modal ---------- */

export default function HistoryModal({ open, onClose }: HistoryModalProps) {
  const { data, isLoading, error, fetchHistory } = useUserHistory();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState<HistoryItemType | "all">("all");
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  const limit = 10;

  useEffect(() => {
    if (open) {
      setSelectedItem(null);
      setSearch("");
      setPage(1);
      setTypeFilter("all");
      void fetchHistory({ page: 1, limit });
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = useCallback(
    (query: string) => {
      setSearch(query);
      setPage(1);
      setSelectedItem(null);
      void fetchHistory({
        page: 1,
        limit,
        search: query || undefined,
        type: typeFilter === "all" ? undefined : typeFilter,
      });
    },
    [fetchHistory, typeFilter],
  );

  const handleFilterChange = useCallback(
    (filter: HistoryItemType | "all") => {
      setTypeFilter(filter);
      setPage(1);
      setSelectedItem(null);
      void fetchHistory({
        page: 1,
        limit,
        search: search || undefined,
        type: filter === "all" ? undefined : filter,
      });
    },
    [fetchHistory, search],
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
      setSelectedItem(null);
      void fetchHistory({
        page: newPage,
        limit,
        search: search || undefined,
        type: typeFilter === "all" ? undefined : typeFilter,
      });
    },
    [fetchHistory, search, typeFilter],
  );

  if (!open) return null;

  const items = data?.history ?? [];
  const totalCount = data?.total_count ?? 0;
  const totalPages = data?.total_pages ?? 1;
  const hasNext = data?.has_next ?? false;
  const hasPrev = data?.has_prev ?? false;
  const currentPage = data?.page ?? 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
        aria-label="Close"
      />

      {/* Modal */}
      <motion.div
        className="relative flex h-[min(85vh,700px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="history-modal-title"
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
      >
        {selectedItem ? (
          <HistoryDetail
            item={selectedItem}
            onBack={() => setSelectedItem(null)}
          />
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6]">
                  <Clock className="size-5" aria-hidden />
                </span>
                <div>
                  <h2 id="history-modal-title" className="text-lg font-bold text-slate-900">
                    History
                  </h2>
                  <p className="text-xs text-slate-400">{totalCount} total entries</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            {/* Search + Filter */}
            <div className="border-b border-slate-100 px-5 py-3 sm:px-6">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search history..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 transition focus:border-[#8B5CF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
                />
              </div>
              <div className="mt-2.5 flex items-center gap-1 rounded-lg bg-slate-100/60 p-0.5">
                {filterTabs.map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => handleFilterChange(tab.value)}
                    className={`flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                      typeFilter === tab.value
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6">
              {isLoading && items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <span className="size-8 animate-spin rounded-full border-2 border-[#8B5CF6] border-t-transparent" />
                  <p className="mt-3 text-sm text-slate-400">Loading history...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <p className="text-sm text-red-500">{error}</p>
                  <button
                    type="button"
                    onClick={() => fetchHistory({ page, limit, search: search || undefined, type: typeFilter === "all" ? undefined : typeFilter })}
                    className="mt-3 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-200"
                  >
                    Try again
                  </button>
                </div>
              ) : items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-slate-100">
                    <FileText className="size-6 text-slate-400" aria-hidden />
                  </div>
                  <p className="mt-4 text-sm font-medium text-slate-600">No history yet</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {search ? "No results match your search" : "Your humanized and detection results will appear here"}
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <HistoryItemCard
                        key={item.id}
                        item={item}
                        onSelect={setSelectedItem}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 sm:px-6">
                <p className="text-xs text-slate-400">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={!hasPrev}
                    onClick={() => handlePageChange(page - 1)}
                    className="flex size-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="size-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    disabled={!hasNext}
                    onClick={() => handlePageChange(page + 1)}
                    className="flex size-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
                    aria-label="Next page"
                  >
                    <ChevronRight className="size-4" aria-hidden />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}
