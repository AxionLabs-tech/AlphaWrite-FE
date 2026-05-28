/**
 * Writing Assistant DTOs.
 * Backend: POST /api/v1/writing/{chat,chat-stream,quick-generate,quick-generate-stream},
 * GET /api/v1/writing/{conversations,conversations/{id},history},
 * DELETE /api/v1/writing/conversations/{id}.
 */

// --- Chat ---

export interface ChatRequest {
  message: string;
  conversation_id?: string | null;
  use_style_fingerprint?: boolean;
}

export interface ChatResponse {
  conversation_id: string;
  response: string;
  word_count: number;
  remaining_credits: number;
}

// --- Quick Generate ---

export interface QuickGenerateRequest {
  topic: string;
  tone?: string;
  type?: string;
  target_length?: number;
  additional_instructions?: string | null;
  use_style_fingerprint?: boolean;
}

export interface QuickGenerateResponse {
  output_text: string;
  word_count: number;
  remaining_credits: number;
  type: string;
  topic: string;
}

// --- SSE events ---

export type ChatStreamEvent =
  | { text: string }
  | { done: true; conversation_id?: string; word_count: number }
  | { error: string };

export type QuickGenerateStreamEvent =
  | { text: string }
  | { done: true; word_count: number }
  | { error: string };

// --- Conversations ---

export type MessageRole = "user" | "assistant";

export interface ConversationListLastMessage {
  role: MessageRole;
  content: string;
  timestamp: string;
}

export interface ConversationListItem {
  id: string;
  title: string;
  last_message: ConversationListLastMessage | null;
  updated_at: string;
}

export interface ConversationListResponse {
  conversations: ConversationListItem[];
  total_count: number;
  page: number;
  limit: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface ConversationMessage {
  role: MessageRole;
  content: string;
  timestamp: string;
  word_count: number;
}

export interface ConversationDetail {
  id: string;
  title: string;
  messages: ConversationMessage[];
  settings: { style_fingerprint_enabled?: boolean };
  total_words_generated: number;
  created_at: string;
  updated_at: string;
  status: "active";
}

export interface DeleteConversationResponse {
  status: "deleted";
}

// --- Quick-generate history ---

export interface QuickHistoryItem {
  id: string;
  type: string;
  topic: string;
  tone: string;
  target_length: number;
  additional_instructions: string | null;
  output_text: string;
  word_count: number;
  style_fingerprint_used: boolean;
  timestamp: string;
}

export interface QuickHistoryResponse {
  history: QuickHistoryItem[];
  total_count: number;
  page: number;
  limit: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

// --- Constants (mirror server-side validation) ---

export const WRITING = {
  TARGET_LENGTH_MIN: 50,
  TARGET_LENGTH_MAX: 5000,
  TARGET_LENGTH_DEFAULT: 300,
  TYPE_OPTIONS: ["essay", "email", "blog", "report", "letter", "story", "social-post"],
  TONE_OPTIONS: ["neutral", "friendly", "formal", "witty", "persuasive", "academic"],
  RATE_LIMIT_HINT: "30 per minute",
} as const;

export type PlanType = "free" | "basic" | "pro" | "premium";

export const PLAN_TARGET_LENGTH_CAPS: Record<PlanType, number> = {
  free: 200,
  basic: 500,
  pro: 2000,
  premium: 4000,
};
