"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileUp } from "lucide-react";
import { StudyImportOverlay } from "@/app/components/study/StudyImportOverlay";
import { StudyAnalyzedView } from "@/app/components/study/StudyAnalyzedView";
import {
  readStoredStudyImport,
  STUDY_IMPORT_STORAGE_KEY,
  titleFromFileName,
  type StoredStudyImport,
} from "@/lib/studyImport";

const ANALYZE_MS = 2800;

export default function StudySessionPage() {
  const router = useRouter();
  const [importData, setImportData] = useState<StoredStudyImport | null>(null);
  const [phase, setPhase] = useState<"idle" | "importing" | "ready">("idle");

  useEffect(() => {
    const stored = readStoredStudyImport();
    if (!stored) {
      setPhase("idle");
      return;
    }
    setImportData(stored);
    setPhase("importing");
    const t = window.setTimeout(() => setPhase("ready"), ANALYZE_MS);
    return () => window.clearTimeout(t);
  }, []);

  const cancelImport = useCallback(() => {
    sessionStorage.removeItem(STUDY_IMPORT_STORAGE_KEY);
    router.push("/dashboard");
  }, [router]);

  const onFilePick = (file: File) => {
    const payload: StoredStudyImport = {
      name: file.name,
      title: titleFromFileName(file.name),
      size: file.size,
    };
    sessionStorage.setItem(STUDY_IMPORT_STORAGE_KEY, JSON.stringify(payload));
    setImportData(payload);
    setPhase("importing");
    window.setTimeout(() => setPhase("ready"), ANALYZE_MS);
  };

  if (phase === "importing" && importData) {
    return (
      <StudyImportOverlay fileName={importData.name} onClose={cancelImport} />
    );
  }

  if (phase === "ready" && importData) {
    return (
      <div className="h-full min-h-0 overflow-hidden">
        <StudyAnalyzedView
          documentTitle={importData.title}
          fileName={importData.name}
        />
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden px-6 py-6 sm:px-10">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Home
      </Link>
      <div className="mx-auto mt-16 max-w-md text-center">
        <label className="flex cursor-pointer flex-col items-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 px-8 py-14 transition hover:border-[#6642B6]/40 hover:bg-violet-50/30">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-white shadow-sm">
            <FileUp className="size-7 text-[#6642B6]" aria-hidden />
          </span>
          <span className="mt-4 text-base font-bold text-slate-900">
            Upload a PDF to study
          </span>
          <span className="mt-2 text-sm text-slate-500">
            We&apos;ll analyze it and suggest flashcards, notes, or a lesson.
          </span>
          <input
            type="file"
            accept=".pdf,application/pdf"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onFilePick(file);
              e.target.value = "";
            }}
          />
        </label>
      </div>
    </div>
  );
}
