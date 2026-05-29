/**
 * Style Fingerprint DTOs.
 * Backend: POST /api/v1/style/upload-samples (multipart),
 * GET /api/v1/style/fingerprint, DELETE /api/v1/style/fingerprint.
 */

export type StyleStatus = "processing" | "ready" | "failed";
export type StyleFileType = "txt" | "pdf" | "docx";

export interface StyleFingerprint {
  vocabulary_level: string;
  sentence_structure: string;
  tone: string;
  voice: string;
  punctuation_habits: string;
  paragraph_style: string;
  transition_patterns: string;
  distinctive_phrases: string[];
  writing_quirks: string;
  overall_summary: string;
}

export interface StyleSample {
  filename: string;
  file_type: StyleFileType;
  word_count: number;
  uploaded_at: string;
  gridfs_id: string;
  text_preview: string;
}

export interface UploadStyleSamplesResponse {
  status: "ready";
  fingerprint: StyleFingerprint;
  prompt_injection: string;
  samples_count: number;
  message: string;
}

export interface StyleFingerprintResponse {
  status: StyleStatus;
  fingerprint: StyleFingerprint | null;
  prompt_injection: string | null;
  samples: StyleSample[];
  samples_count: number;
  created_at: string;
  updated_at: string;
}

export interface DeleteStyleFingerprintResponse {
  status: "deleted";
}

// --- Constants ---

export const STYLE = {
  MIN_FILES: 2,
  MAX_FILES: 3,
  MIN_WORDS_PER_SAMPLE: 50,
  ALLOWED_EXTENSIONS: [".txt", ".pdf", ".docx"],
  ALLOWED_MIME: [
    "text/plain",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
} as const;
