"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import {
  STUDY_IMPORT_STORAGE_KEY,
  titleFromFileName,
} from "@/lib/studyImport";

export function useStudyPdfUpload() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => inputRef.current?.click();

  const onFileChange = (file: File | undefined) => {
    if (!file) return;
    const payload = {
      name: file.name,
      title: titleFromFileName(file.name),
      size: file.size,
    };
    sessionStorage.setItem(STUDY_IMPORT_STORAGE_KEY, JSON.stringify(payload));
    router.push("/dashboard/decks/session");
  };

  const input = (
    <input
      ref={inputRef}
      type="file"
      accept=".pdf,application/pdf"
      className="sr-only"
      onChange={(e) => {
        onFileChange(e.target.files?.[0]);
        e.target.value = "";
      }}
    />
  );

  return { openFilePicker, input };
}
