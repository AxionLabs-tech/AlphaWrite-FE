"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  FileText,
  Loader2,
  RefreshCw,
  Sparkles,
  Trash2,
  Upload,
  Wand2,
  X,
} from "lucide-react";
import {
  useDeleteStyleFingerprint,
  useStyleFingerprint,
  useUploadStyleSamples,
} from "@/services/hooks";
import { STYLE } from "@/services/dtos/style";
import type { StyleFingerprint, StyleSample } from "@/services/dtos/style";
import { WriterShell } from "@/app/components/WriterShell";

function countFileWords(file: File): Promise<number | null> {
  // Word count for .txt only (text/plain). PDF/DOCX skip client-side validation.
  if (!file.type.startsWith("text/")) return Promise.resolve(null);
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      resolve(text.trim() ? text.trim().split(/\s+/).length : 0);
    };
    reader.onerror = () => resolve(null);
    reader.readAsText(file);
  });
}

function fileExt(name: string): string {
  const i = name.lastIndexOf(".");
  return i >= 0 ? name.slice(i).toLowerCase() : "";
}

export default function StyleSettingsPage() {
  const fingerprint = useStyleFingerprint();
  const upload = useUploadStyleSamples();
  const remove = useDeleteStyleFingerprint();

  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    void fingerprint.fetchFingerprint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateFiles = useCallback(async (files: File[]): Promise<string | null> => {
    if (files.length < STYLE.MIN_FILES || files.length > STYLE.MAX_FILES) {
      return `Upload ${STYLE.MIN_FILES}–${STYLE.MAX_FILES} files.`;
    }
    for (const f of files) {
      const ext = fileExt(f.name);
      if (!STYLE.ALLOWED_EXTENSIONS.includes(ext as (typeof STYLE.ALLOWED_EXTENSIONS)[number])) {
        return `${f.name}: unsupported file type. Allowed: ${STYLE.ALLOWED_EXTENSIONS.join(", ")}`;
      }
      const wc = await countFileWords(f);
      if (wc !== null && wc < STYLE.MIN_WORDS_PER_SAMPLE) {
        return `${f.name}: needs at least ${STYLE.MIN_WORDS_PER_SAMPLE} words (found ${wc}).`;
      }
    }
    return null;
  }, []);

  const handlePickFiles = useCallback((files: FileList | null) => {
    setValidationError(null);
    if (!files || files.length === 0) {
      setPendingFiles([]);
      return;
    }
    setPendingFiles(Array.from(files).slice(0, STYLE.MAX_FILES));
  }, []);

  const handleAnalyze = useCallback(async () => {
    const err = await validateFiles(pendingFiles);
    if (err) {
      setValidationError(err);
      return;
    }
    setValidationError(null);
    try {
      await upload.upload(pendingFiles);
      toast.success("Your writing style is ready");
      setPendingFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      void fingerprint.fetchFingerprint();
    } catch {
      // upload.error is set
    }
  }, [pendingFiles, validateFiles, upload, fingerprint]);

  const handleDelete = useCallback(async () => {
    try {
      await remove.remove();
      toast.success("Writing style removed");
      setConfirmDelete(false);
      void fingerprint.fetchFingerprint();
    } catch {
      toast.error(remove.error ?? "Failed to delete");
    }
  }, [remove, fingerprint]);

  const status = fingerprint.data?.status;
  const showReady = status === "ready" && fingerprint.data?.fingerprint;
  const showProcessing = status === "processing";
  const showEmpty = fingerprint.notFound || (status === "failed" && !fingerprint.data?.fingerprint);

  return (
    <WriterShell>
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

      <header className="border-l-4 border-[#8B5CF6] pl-4">
        <h1 className="bg-linear-to-r from-[#8B5CF6] to-violet-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
          Your writing style
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Upload {STYLE.MIN_FILES}–{STYLE.MAX_FILES} samples and we&apos;ll learn how you write. Toggle &quot;Use my style&quot; on any generation to apply it.
        </p>
      </header>

      {fingerprint.isLoading && !fingerprint.data && (
        <div className="mt-8 flex items-center justify-center rounded-3xl bg-white p-12 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.08),0_8px_16px_-6px_rgba(15,23,42,0.04)]">
          <Loader2 className="size-6 animate-spin text-[#8B5CF6]" aria-hidden />
        </div>
      )}

      {fingerprint.error && (
        <div className="mt-6 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>{fingerprint.error}</span>
        </div>
      )}

      {/* READY STATE */}
      {showReady && fingerprint.data && (
        <div className="mt-8 space-y-6">
          <ReadyCard
            fingerprint={fingerprint.data.fingerprint!}
            samples={fingerprint.data.samples}
            samplesCount={fingerprint.data.samples_count}
            promptInjection={fingerprint.data.prompt_injection}
            updatedAt={fingerprint.data.updated_at}
            showAdvanced={showAdvanced}
            onToggleAdvanced={() => setShowAdvanced((v) => !v)}
            onReanalyzeClick={() => fileInputRef.current?.click()}
            onDeleteClick={() => setConfirmDelete(true)}
          />
          <UploadZone
            pendingFiles={pendingFiles}
            onPickFiles={handlePickFiles}
            onRemoveFile={(i) => setPendingFiles((prev) => prev.filter((_, idx) => idx !== i))}
            onAnalyze={handleAnalyze}
            isUploading={upload.isUploading}
            error={validationError ?? upload.error}
            inputRef={fileInputRef}
            ctaLabel="Re-analyze with new samples"
            icon={<RefreshCw className="size-4" aria-hidden />}
          />
        </div>
      )}

      {/* PROCESSING STATE */}
      {showProcessing && !showReady && (
        <div className="mt-8 flex flex-col items-center justify-center rounded-3xl bg-white p-12 text-center shadow-[0_4px_24px_-4px_rgba(15,23,42,0.08),0_8px_16px_-6px_rgba(15,23,42,0.04)]">
          <Loader2 className="size-7 animate-spin text-[#8B5CF6]" aria-hidden />
          <h2 className="mt-4 text-lg font-semibold text-slate-900">Analyzing your samples</h2>
          <p className="mt-1 text-sm text-slate-500">This usually takes 10–30 seconds.</p>
          <button
            type="button"
            onClick={() => void fingerprint.fetchFingerprint()}
            className="mt-5 flex items-center gap-1.5 rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
          >
            <RefreshCw className="size-4" aria-hidden />
            Refresh
          </button>
        </div>
      )}

      {/* EMPTY STATE */}
      {showEmpty && !showReady && !showProcessing && (
        <div className="mt-8">
          <UploadZone
            pendingFiles={pendingFiles}
            onPickFiles={handlePickFiles}
            onRemoveFile={(i) => setPendingFiles((prev) => prev.filter((_, idx) => idx !== i))}
            onAnalyze={handleAnalyze}
            isUploading={upload.isUploading}
            error={validationError ?? upload.error}
            inputRef={fileInputRef}
            ctaLabel="Analyze my writing"
            icon={<Sparkles className="size-4" aria-hidden />}
          />
        </div>
      )}

      {/* Delete confirm modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-slate-900">Delete your writing style?</h3>
            <p className="mt-2 text-sm text-slate-500">
              This removes your fingerprint and all stored sample files. You can re-upload anytime, but the current profile cannot be recovered.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="rounded-xl border-2 border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void handleDelete()}
                disabled={remove.isDeleting}
                className="flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-red-500/25 hover:bg-red-700 disabled:opacity-70"
              >
                {remove.isDeleting && <Loader2 className="size-4 animate-spin" aria-hidden />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
      </div>
    </WriterShell>
  );
}

function ReadyCard({
  fingerprint,
  samples,
  samplesCount,
  promptInjection,
  updatedAt,
  showAdvanced,
  onToggleAdvanced,
  onReanalyzeClick,
  onDeleteClick,
}: {
  fingerprint: StyleFingerprint;
  samples: StyleSample[];
  samplesCount: number;
  promptInjection: string | null;
  updatedAt: string;
  showAdvanced: boolean;
  onToggleAdvanced: () => void;
  onReanalyzeClick: () => void;
  onDeleteClick: () => void;
}) {
  const detailRows: Array<[string, string]> = [
    ["Vocabulary", fingerprint.vocabulary_level],
    ["Sentence structure", fingerprint.sentence_structure],
    ["Tone", fingerprint.tone],
    ["Voice", fingerprint.voice],
    ["Punctuation habits", fingerprint.punctuation_habits],
    ["Paragraph style", fingerprint.paragraph_style],
    ["Transitions", fingerprint.transition_patterns],
    ["Writing quirks", fingerprint.writing_quirks],
  ];

  return (
    <article className="rounded-3xl bg-white p-6 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.08),0_8px_16px_-6px_rgba(15,23,42,0.04)]">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-full bg-violet-50">
            <Wand2 className="size-4 text-[#8B5CF6]" aria-hidden />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-slate-900">Your style is ready</h2>
              <CheckCircle2 className="size-4 text-emerald-600" aria-hidden />
            </div>
            <p className="text-xs text-slate-500">
              {samplesCount} {samplesCount === 1 ? "sample" : "samples"} · updated{" "}
              {new Date(updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onDeleteClick}
          className="flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 className="size-3.5" aria-hidden />
          Delete
        </button>
      </header>

      <p className="mt-4 rounded-xl bg-violet-50/70 p-4 text-sm leading-relaxed text-slate-700">
        {fingerprint.overall_summary}
      </p>

      <div className="mt-4">
        <button
          type="button"
          onClick={onToggleAdvanced}
          className="flex items-center gap-1 text-xs font-medium text-[#8B5CF6] hover:underline"
        >
          <ChevronDown
            className={`size-3.5 transition-transform ${showAdvanced ? "rotate-180" : ""}`}
            aria-hidden
          />
          {showAdvanced ? "Hide details" : "Show details"}
        </button>

        {showAdvanced && (
          <div className="mt-4 space-y-4">
            <dl className="grid gap-3 sm:grid-cols-2">
              {detailRows.map(([label, value]) => (
                <div key={label} className="rounded-xl border border-slate-100 p-3">
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm text-slate-700">{value}</dd>
                </div>
              ))}
            </dl>

            {fingerprint.distinctive_phrases.length > 0 && (
              <div className="rounded-xl border border-slate-100 p-3">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Distinctive phrases
                </div>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {fingerprint.distinctive_phrases.map((p, i) => (
                    <li
                      key={i}
                      className="rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-[#8B5CF6]"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {promptInjection && (
              <details className="rounded-xl border border-slate-100 p-3">
                <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Prompt injection (advanced)
                </summary>
                <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
                  {promptInjection}
                </pre>
              </details>
            )}
          </div>
        )}
      </div>

      {samples.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Samples
          </h3>
          <ul className="mt-2 space-y-2">
            {samples.map((s) => (
              <li
                key={s.gridfs_id}
                className="flex items-start gap-3 rounded-xl border border-slate-100 p-3"
              >
                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-50">
                  <FileText className="size-4 text-[#8B5CF6]" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="truncate text-sm font-medium text-slate-900">
                      {s.filename}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                      {s.file_type}
                    </span>
                    <span className="text-[11px] text-slate-400">{s.word_count} words</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-slate-500">{s.text_preview}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={onReanalyzeClick}
          className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
        >
          <RefreshCw className="size-4" aria-hidden />
          Re-analyze
        </button>
      </div>
    </article>
  );
}

function UploadZone({
  pendingFiles,
  onPickFiles,
  onRemoveFile,
  onAnalyze,
  isUploading,
  error,
  inputRef,
  ctaLabel,
  icon,
}: {
  pendingFiles: File[];
  onPickFiles: (files: FileList | null) => void;
  onRemoveFile: (index: number) => void;
  onAnalyze: () => void;
  isUploading: boolean;
  error: string | null;
  inputRef: React.RefObject<HTMLInputElement | null>;
  ctaLabel: string;
  icon: React.ReactNode;
}) {
  const [dragOver, setDragOver] = useState(false);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.08),0_8px_16px_-6px_rgba(15,23,42,0.04)]">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          onPickFiles(e.dataTransfer.files);
        }}
        className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition ${
          dragOver
            ? "border-[#8B5CF6] bg-violet-50/70"
            : "border-slate-200 bg-slate-50/40"
        }`}
      >
        <div className="flex size-12 items-center justify-center rounded-full bg-violet-50">
          <Upload className="size-5 text-[#8B5CF6]" aria-hidden />
        </div>
        <h3 className="mt-3 text-sm font-semibold text-slate-900">
          Drop {STYLE.MIN_FILES}–{STYLE.MAX_FILES} samples here
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          {STYLE.ALLOWED_EXTENSIONS.join(", ")} · min {STYLE.MIN_WORDS_PER_SAMPLE} words each
        </p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-4 rounded-xl border-2 border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-[#8B5CF6] hover:text-[#8B5CF6]"
        >
          Choose files
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={STYLE.ALLOWED_EXTENSIONS.join(",")}
          onChange={(e) => onPickFiles(e.target.files)}
          className="sr-only"
          aria-hidden
        />
      </div>

      {pendingFiles.length > 0 && (
        <ul className="mt-4 space-y-2">
          {pendingFiles.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700"
            >
              <FileText className="size-4 shrink-0 text-slate-400" aria-hidden />
              <span className="truncate">{f.name}</span>
              <span className="ml-auto text-[11px] text-slate-400">
                {(f.size / 1024).toFixed(1)} KB
              </span>
              <button
                type="button"
                onClick={() => onRemoveFile(i)}
                className="rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-600"
                aria-label="Remove file"
              >
                <X className="size-3.5" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && (
        <div className="mt-3 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>{error}</span>
        </div>
      )}

      <button
        type="button"
        onClick={onAnalyze}
        disabled={pendingFiles.length === 0 || isUploading}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#8B5CF6] py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:bg-violet-600 disabled:opacity-60"
      >
        {isUploading ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Analyzing… (10–30s)
          </>
        ) : (
          <>
            {icon}
            {ctaLabel}
          </>
        )}
      </button>
    </div>
  );
}
