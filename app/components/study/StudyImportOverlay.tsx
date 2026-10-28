"use client";

import { Loader2, Sparkles, X } from "lucide-react";

type StudyImportOverlayProps = {
  fileName: string;
  onClose: () => void;
};

export function StudyImportOverlay({ fileName, onClose }: StudyImportOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/25 p-4 backdrop-blur-[2px]">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="import-title"
        className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-[0_24px_80px_-20px_rgba(15,23,42,0.35)]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
          aria-label="Close"
        >
          <X className="size-4" aria-hidden />
        </button>

        <div className="flex items-center justify-center gap-2 border-b border-slate-100 px-6 py-5">
          <Sparkles className="size-5 text-[#6642B6]" aria-hidden />
          <h2
            id="import-title"
            className="text-base font-bold text-slate-900"
          >
            Import from PDF
          </h2>
        </div>

        <div className="flex min-h-[280px] flex-col items-center justify-center px-8 py-12">
          <Loader2
            className="size-10 animate-spin text-slate-800"
            strokeWidth={2.5}
            aria-hidden
          />
          <p className="mt-6 max-w-xs text-center text-sm text-slate-500">
            Analyzing{" "}
            <span className="font-semibold text-slate-700">{fileName}</span>
            …
          </p>
        </div>
      </div>
    </div>
  );
}
