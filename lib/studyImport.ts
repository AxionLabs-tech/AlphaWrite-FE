export const STUDY_IMPORT_STORAGE_KEY = "alphawrite.study.import";

export type StoredStudyImport = {
  name: string;
  title: string;
  size: number;
};

export function titleFromFileName(name: string): string {
  const base = name.replace(/\.[^.]+$/, "");
  return base
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function readStoredStudyImport(): StoredStudyImport | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STUDY_IMPORT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredStudyImport;
  } catch {
    return null;
  }
}
