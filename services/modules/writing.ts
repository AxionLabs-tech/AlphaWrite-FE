/**
 * Writing Assistant API module.
 * Base URL is expected to include /api/v1 (e.g. NEXT_PUBLIC_API_URL=https://api.example.com/api/v1).
 */

import { get, post, del, postStream } from "../apiClient";
import type {
  ChatRequest,
  ChatResponse,
  ChatStreamEvent,
  QuickGenerateRequest,
  QuickGenerateResponse,
  QuickGenerateStreamEvent,
  ConversationListResponse,
  ConversationDetail,
  DeleteConversationResponse,
  QuickHistoryResponse,
  PaginationParams,
} from "../dtos/writing";

const WRITING_ENDPOINTS = {
  chat: "/writing/chat",
  chatStream: "/writing/chat-stream",
  quickGenerate: "/writing/quick-generate",
  quickGenerateStream: "/writing/quick-generate-stream",
  conversations: "/writing/conversations",
  conversation: (id: string) => `/writing/conversations/${encodeURIComponent(id)}`,
  history: "/writing/history",
} as const;

function paginationParams(params?: PaginationParams): Record<string, string> {
  const q: Record<string, string> = {};
  if (params?.page) q.page = String(params.page);
  if (params?.limit) q.limit = String(params.limit);
  return q;
}

/** POST /writing/chat – non-streaming chat turn. */
export async function chat(body: ChatRequest): Promise<ChatResponse> {
  return post<ChatResponse, ChatRequest>(WRITING_ENDPOINTS.chat, body);
}

/** POST /writing/chat-stream – streaming chat turn (SSE). */
export async function chatStream(
  body: ChatRequest,
  onEvent: (event: ChatStreamEvent) => void,
  signal?: AbortSignal
): Promise<void> {
  return postStream<ChatStreamEvent, ChatRequest>(WRITING_ENDPOINTS.chatStream, body, {
    onEvent,
    signal,
  });
}

/** POST /writing/quick-generate – one-shot generation. */
export async function quickGenerate(
  body: QuickGenerateRequest
): Promise<QuickGenerateResponse> {
  return post<QuickGenerateResponse, QuickGenerateRequest>(
    WRITING_ENDPOINTS.quickGenerate,
    body
  );
}

/** POST /writing/quick-generate-stream – streaming one-shot generation (SSE). */
export async function quickGenerateStream(
  body: QuickGenerateRequest,
  onEvent: (event: QuickGenerateStreamEvent) => void,
  signal?: AbortSignal
): Promise<void> {
  return postStream<QuickGenerateStreamEvent, QuickGenerateRequest>(
    WRITING_ENDPOINTS.quickGenerateStream,
    body,
    { onEvent, signal }
  );
}

/** GET /writing/conversations – paginated list of conversations. */
export async function listConversations(
  params?: PaginationParams
): Promise<ConversationListResponse> {
  return get<ConversationListResponse>(WRITING_ENDPOINTS.conversations, {
    params: paginationParams(params),
  });
}

/** GET /writing/conversations/{id} – full conversation. */
export async function getConversation(id: string): Promise<ConversationDetail> {
  return get<ConversationDetail>(WRITING_ENDPOINTS.conversation(id));
}

/** DELETE /writing/conversations/{id} – hard delete. */
export async function deleteConversation(
  id: string
): Promise<DeleteConversationResponse> {
  return del<DeleteConversationResponse>(WRITING_ENDPOINTS.conversation(id));
}

/** GET /writing/history – paginated quick-generate history. */
export async function getQuickHistory(
  params?: PaginationParams
): Promise<QuickHistoryResponse> {
  return get<QuickHistoryResponse>(WRITING_ENDPOINTS.history, {
    params: paginationParams(params),
  });
}

export const writingApi = {
  chat,
  chatStream,
  quickGenerate,
  quickGenerateStream,
  listConversations,
  getConversation,
  deleteConversation,
  getQuickHistory,
};
