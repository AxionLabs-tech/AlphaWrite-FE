"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { writingApi } from "../modules/writing";
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
import { ApiError } from "../apiClient";
import { useAuthOptional } from "./auth";

function getErrorMessage(e: unknown, fallback: string): string {
  if (
    !(e instanceof ApiError) ||
    typeof e.body !== "object" ||
    e.body === null ||
    !("detail" in e.body)
  ) {
    return e instanceof Error ? e.message : fallback;
  }
  const detail = (e.body as { detail: unknown }).detail;
  return typeof detail === "string" ? detail : fallback;
}

// --- useChat (non-streaming) ---

export interface UseChatResult {
  send: (body: ChatRequest) => Promise<ChatResponse>;
  isSending: boolean;
  error: string | null;
  resetError: () => void;
}

export function useChat(): UseChatResult {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = useCallback(async (body: ChatRequest): Promise<ChatResponse> => {
    setIsSending(true);
    setError(null);
    try {
      return await writingApi.chat(body);
    } catch (e) {
      setError(getErrorMessage(e, "Chat failed."));
      throw e;
    } finally {
      setIsSending(false);
    }
  }, []);

  const resetError = useCallback(() => setError(null), []);
  return { send, isSending, error, resetError };
}

// --- useChatStream ---

export interface UseChatStreamResult {
  text: string;
  isStreaming: boolean;
  conversationId: string | null;
  wordCount: number | null;
  error: string | null;
  send: (body: ChatRequest) => Promise<void>;
  abort: () => void;
  reset: () => void;
}

export function useChatStream(): UseChatStreamResult {
  const [text, setText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [wordCount, setWordCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const send = useCallback(async (body: ChatRequest): Promise<void> => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setText("");
    setConversationId(null);
    setWordCount(null);
    setError(null);
    setIsStreaming(true);

    try {
      await writingApi.chatStream(
        body,
        (evt: ChatStreamEvent) => {
          if ("text" in evt) {
            setText((prev) => prev + evt.text);
          } else if ("done" in evt) {
            if (evt.conversation_id) setConversationId(evt.conversation_id);
            setWordCount(evt.word_count);
          } else if ("error" in evt) {
            setError(evt.error);
          }
        },
        controller.signal
      );
    } catch (e) {
      if ((e as { name?: string }).name === "AbortError") return;
      setError(getErrorMessage(e, "Chat stream failed."));
      throw e;
    } finally {
      setIsStreaming(false);
    }
  }, []);

  const abort = useCallback(() => {
    abortRef.current?.abort();
    setIsStreaming(false);
  }, []);

  const reset = useCallback(() => {
    setText("");
    setConversationId(null);
    setWordCount(null);
    setError(null);
  }, []);

  return { text, isStreaming, conversationId, wordCount, error, send, abort, reset };
}

// --- useQuickGenerate (non-streaming) ---

export interface UseQuickGenerateResult {
  generate: (body: QuickGenerateRequest) => Promise<QuickGenerateResponse>;
  isGenerating: boolean;
  error: string | null;
  resetError: () => void;
}

export function useQuickGenerate(): UseQuickGenerateResult {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(
    async (body: QuickGenerateRequest): Promise<QuickGenerateResponse> => {
      setIsGenerating(true);
      setError(null);
      try {
        return await writingApi.quickGenerate(body);
      } catch (e) {
        setError(getErrorMessage(e, "Generation failed."));
        throw e;
      } finally {
        setIsGenerating(false);
      }
    },
    []
  );

  const resetError = useCallback(() => setError(null), []);
  return { generate, isGenerating, error, resetError };
}

// --- useQuickGenerateStream ---

export interface UseQuickGenerateStreamResult {
  text: string;
  isStreaming: boolean;
  wordCount: number | null;
  error: string | null;
  generate: (body: QuickGenerateRequest) => Promise<void>;
  abort: () => void;
  reset: () => void;
}

export function useQuickGenerateStream(): UseQuickGenerateStreamResult {
  const [text, setText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [wordCount, setWordCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const generate = useCallback(async (body: QuickGenerateRequest): Promise<void> => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setText("");
    setWordCount(null);
    setError(null);
    setIsStreaming(true);

    try {
      await writingApi.quickGenerateStream(
        body,
        (evt: QuickGenerateStreamEvent) => {
          if ("text" in evt) {
            setText((prev) => prev + evt.text);
          } else if ("done" in evt) {
            setWordCount(evt.word_count);
          } else if ("error" in evt) {
            setError(evt.error);
          }
        },
        controller.signal
      );
    } catch (e) {
      if ((e as { name?: string }).name === "AbortError") return;
      setError(getErrorMessage(e, "Generation stream failed."));
      throw e;
    } finally {
      setIsStreaming(false);
    }
  }, []);

  const abort = useCallback(() => {
    abortRef.current?.abort();
    setIsStreaming(false);
  }, []);

  const reset = useCallback(() => {
    setText("");
    setWordCount(null);
    setError(null);
  }, []);

  return { text, isStreaming, wordCount, error, generate, abort, reset };
}

// --- useConversations (list) ---

export interface UseConversationsResult {
  data: ConversationListResponse | null;
  isLoading: boolean;
  error: string | null;
  fetchConversations: (
    params?: PaginationParams
  ) => Promise<ConversationListResponse | null>;
  resetError: () => void;
}

export function useConversations(): UseConversationsResult {
  const auth = useAuthOptional();
  const [data, setData] = useState<ConversationListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConversations = useCallback(
    async (
      params?: PaginationParams,
      retryAfterRefresh = false
    ): Promise<ConversationListResponse | null> => {
      setError(null);
      setIsLoading(true);
      try {
        const res = await writingApi.listConversations(params);
        setData(res);
        return res;
      } catch (e) {
        if (
          !retryAfterRefresh &&
          e instanceof ApiError &&
          e.status === 401 &&
          auth?.refreshSession
        ) {
          try {
            await auth.refreshSession();
            return fetchConversations(params, true);
          } catch {
            // refresh failed
          }
        }
        setError(getErrorMessage(e, "Failed to load conversations."));
        setData(null);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [auth?.refreshSession]
  );

  const resetError = useCallback(() => setError(null), []);
  return { data, isLoading, error, fetchConversations, resetError };
}

// --- useConversation (detail) ---

export interface UseConversationResult {
  data: ConversationDetail | null;
  isLoading: boolean;
  error: string | null;
  fetchConversation: (id: string) => Promise<ConversationDetail | null>;
  resetError: () => void;
}

export function useConversation(): UseConversationResult {
  const auth = useAuthOptional();
  const [data, setData] = useState<ConversationDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConversation = useCallback(
    async (
      id: string,
      retryAfterRefresh = false
    ): Promise<ConversationDetail | null> => {
      setError(null);
      setIsLoading(true);
      try {
        const res = await writingApi.getConversation(id);
        setData(res);
        return res;
      } catch (e) {
        if (
          !retryAfterRefresh &&
          e instanceof ApiError &&
          e.status === 401 &&
          auth?.refreshSession
        ) {
          try {
            await auth.refreshSession();
            return fetchConversation(id, true);
          } catch {
            // refresh failed
          }
        }
        setError(getErrorMessage(e, "Failed to load conversation."));
        setData(null);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [auth?.refreshSession]
  );

  const resetError = useCallback(() => setError(null), []);
  return { data, isLoading, error, fetchConversation, resetError };
}

// --- useDeleteConversation ---

export interface UseDeleteConversationResult {
  deleteConversation: (id: string) => Promise<DeleteConversationResponse>;
  isDeleting: boolean;
  error: string | null;
  resetError: () => void;
}

export function useDeleteConversation(): UseDeleteConversationResult {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteConversation = useCallback(
    async (id: string): Promise<DeleteConversationResponse> => {
      setIsDeleting(true);
      setError(null);
      try {
        return await writingApi.deleteConversation(id);
      } catch (e) {
        setError(getErrorMessage(e, "Failed to delete conversation."));
        throw e;
      } finally {
        setIsDeleting(false);
      }
    },
    []
  );

  const resetError = useCallback(() => setError(null), []);
  return { deleteConversation, isDeleting, error, resetError };
}

// --- useQuickHistory ---

export interface UseQuickHistoryResult {
  data: QuickHistoryResponse | null;
  isLoading: boolean;
  error: string | null;
  fetchHistory: (params?: PaginationParams) => Promise<QuickHistoryResponse | null>;
  resetError: () => void;
}

export function useQuickHistory(): UseQuickHistoryResult {
  const auth = useAuthOptional();
  const [data, setData] = useState<QuickHistoryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(
    async (
      params?: PaginationParams,
      retryAfterRefresh = false
    ): Promise<QuickHistoryResponse | null> => {
      setError(null);
      setIsLoading(true);
      try {
        const res = await writingApi.getQuickHistory(params);
        setData(res);
        return res;
      } catch (e) {
        if (
          !retryAfterRefresh &&
          e instanceof ApiError &&
          e.status === 401 &&
          auth?.refreshSession
        ) {
          try {
            await auth.refreshSession();
            return fetchHistory(params, true);
          } catch {
            // refresh failed
          }
        }
        setError(getErrorMessage(e, "Failed to load history."));
        setData(null);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [auth?.refreshSession]
  );

  const resetError = useCallback(() => setError(null), []);
  return { data, isLoading, error, fetchHistory, resetError };
}
