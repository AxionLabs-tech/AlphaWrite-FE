"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  AlertCircle,
  ArrowUp,
  BarChart3,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Loader2,
  MessageSquarePlus,
  Plus,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  SquarePen,
  StopCircle,
  Trash2,
  Wand2,
  X,
  Zap,
} from "lucide-react";
import {
  useAuthOptional,
  useChat,
  useChatStream,
  useConversation,
  useConversations,
  useDeleteConversation,
  useDetectAi,
  useParaphrase,
  useStyleFingerprint,
} from "@/services/hooks";
import type { ConversationMessage } from "@/services/dtos/writing";
import type { DetectAiResponse, ParaphraseResponse } from "@/services/dtos/ai";
import { WriterShell, WriterTabs } from "@/app/components/WriterShell";
import { MarkdownMessage } from "@/app/components/MarkdownMessage";

const STREAM_PREF_KEY = "alphawrite.write.streamPreferred";
const STYLE_PREF_KEY = "alphawrite.write.useStyleFingerprint";

type ThreadMessage = ConversationMessage & { pending?: boolean };

interface SuggestedPrompt {
  icon: React.ReactNode;
  title: string;
  prompt: string;
}

const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  {
    icon: <SquarePen className="size-4" aria-hidden />,
    title: "Write an essay on…",
    prompt:
      "Write a well-structured essay on the following topic. Include a clear thesis, 3–4 body paragraphs with evidence, and a concise conclusion.\n\nTopic: ",
  },
  {
    icon: <Sparkles className="size-4" aria-hidden />,
    title: "Polish a paragraph",
    prompt:
      "Polish this paragraph and improve flow without changing the meaning:\n\n",
  },
  {
    icon: <MessageSquarePlus className="size-4" aria-hidden />,
    title: "Outline an essay",
    prompt:
      "Help me outline an essay. Suggest a thesis, 3–5 main arguments, and a brief counterargument.\n\nTopic: ",
  },
];

function nowIso(): string {
  return new Date().toISOString();
}

function countWords(s: string): number {
  return s.trim() ? s.trim().split(/\s+/).length : 0;
}

function formatRelative(iso: string): string {
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24);
  if (days < 7) return `${days}d`;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function WritePage() {
  // --- preferences (persisted) ---
  const [streamEnabled, setStreamEnabled] = useState(true);
  const [useStyle, setUseStyle] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem(STREAM_PREF_KEY);
    if (s !== null) setStreamEnabled(s === "1");
    const st = localStorage.getItem(STYLE_PREF_KEY);
    if (st !== null) setUseStyle(st === "1");
  }, []);

  useEffect(() => {
    localStorage.setItem(STREAM_PREF_KEY, streamEnabled ? "1" : "0");
  }, [streamEnabled]);
  useEffect(() => {
    localStorage.setItem(STYLE_PREF_KEY, useStyle ? "1" : "0");
  }, [useStyle]);

  // --- data hooks ---
  const auth = useAuthOptional();
  const conversations = useConversations();
  const conversation = useConversation();
  const chat = useChat();
  const chatStream = useChatStream();
  const deleteConv = useDeleteConversation();
  const style = useStyleFingerprint();

  // --- local thread state ---
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ThreadMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const threadRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initial fetch
  useEffect(() => {
    void conversations.fetchConversations({ page: 1, limit: 30 });
    void style.fetchFingerprint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load conversation when activeId changes
  useEffect(() => {
    if (!activeId) {
      setMessages([]);
      return;
    }
    void conversation.fetchConversation(activeId).then((c) => {
      if (c) setMessages(c.messages);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  // Auto-scroll the thread to bottom as messages or stream text grows
  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight });
  }, [messages, chatStream.text]);

  // Auto-grow textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "0px";
    ta.style.height = `${Math.min(ta.scrollHeight, 200)}px`;
  }, [draft]);

  const styleReady = style.data?.status === "ready";
  const effectiveUseStyle = useStyle && styleReady;
  const isBusy = chat.isSending || chatStream.isStreaming;

  const activeConversation = useMemo(
    () => conversations.data?.conversations.find((c) => c.id === activeId) ?? null,
    [conversations.data, activeId]
  );

  const startNewChat = useCallback(() => {
    chatStream.abort();
    setActiveId(null);
    setMessages([]);
    setDraft("");
    textareaRef.current?.focus();
  }, [chatStream]);

  const handleSend = useCallback(async () => {
    const message = draft.trim();
    if (!message || isBusy) return;

    setDraft("");
    const userMsg: ThreadMessage = {
      role: "user",
      content: message,
      timestamp: nowIso(),
      word_count: countWords(message),
    };
    setMessages((prev) => [...prev, userMsg]);

    if (streamEnabled) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "", timestamp: nowIso(), word_count: 0, pending: true },
      ]);
      try {
        chatStream.reset();
        await chatStream.send({
          message,
          conversation_id: activeId,
          use_style_fingerprint: effectiveUseStyle,
        });
      } catch {
        setMessages((prev) => prev.filter((m) => !m.pending));
      }
    } else {
      try {
        const res = await chat.send({
          message,
          conversation_id: activeId,
          use_style_fingerprint: effectiveUseStyle,
        });
        const assistantMsg: ThreadMessage = {
          role: "assistant",
          content: res.response,
          timestamp: nowIso(),
          word_count: res.word_count,
        };
        setMessages((prev) => [...prev, assistantMsg]);
        const isNew = !activeId;
        setActiveId(res.conversation_id);
        if (isNew) void conversations.fetchConversations({ page: 1, limit: 30 });
      } catch {
        // chat.error is populated
      }
    }
  }, [draft, isBusy, streamEnabled, activeId, effectiveUseStyle, chat, chatStream, conversations]);

  // After a successful stream finishes, materialize the streamed text into messages
  const streamedText = chatStream.text;
  const streamingDone = !chatStream.isStreaming && streamedText.length > 0;
  const streamConvId = chatStream.conversationId;
  const streamWordCount = chatStream.wordCount;

  useEffect(() => {
    if (!streamingDone) return;
    setMessages((prev) => {
      const next = prev.filter((m) => !m.pending);
      next.push({
        role: "assistant",
        content: streamedText,
        timestamp: nowIso(),
        word_count: streamWordCount ?? countWords(streamedText),
      });
      return next;
    });
    const isNew = !activeId && !!streamConvId;
    if (streamConvId) setActiveId(streamConvId);
    if (isNew) void conversations.fetchConversations({ page: 1, limit: 30 });
    chatStream.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streamingDone]);

  const confirmDelete = useCallback(async () => {
    if (!deleteTargetId) return;
    try {
      await deleteConv.deleteConversation(deleteTargetId);
      toast.success("Conversation deleted");
      if (activeId === deleteTargetId) startNewChat();
      setDeleteTargetId(null);
      void conversations.fetchConversations({ page: 1, limit: 30 });
    } catch {
      toast.error(deleteConv.error ?? "Failed to delete");
    }
  }, [deleteTargetId, deleteConv, activeId, startNewChat, conversations]);

  const renderedMessages = useMemo<ThreadMessage[]>(() => {
    if (!chatStream.isStreaming) return messages;
    return messages.map((m) => (m.pending ? { ...m, content: chatStream.text } : m));
  }, [messages, chatStream.isStreaming, chatStream.text]);

  const visibleError = chatStream.error ?? chat.error;
  const isEmpty = renderedMessages.length === 0 && !conversation.isLoading;

  const usePrompt = useCallback((p: string) => {
    setDraft(p);
    textareaRef.current?.focus();
  }, []);

  const handleReuse = useCallback((text: string) => {
    setDraft(text);
    textareaRef.current?.focus();
    textareaRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  const middleColumn = (
    <>
      <WriterTabs active="chat" />
      <div className="flex items-center justify-between px-5 pb-3 pt-5">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-slate-500">
          Chat History
        </h2>
        {conversations.data && (
          <span className="text-[11px] font-medium text-slate-400">
            {conversations.data.total_count}{" "}
            {conversations.data.total_count === 1 ? "chat" : "chats"}
          </span>
        )}
      </div>
      <div className="px-4 pb-4">
        <button
          type="button"
          onClick={startNewChat}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-violet-600 px-4 py-3 text-sm font-semibold tracking-tight text-white shadow-lg shadow-violet-500/40 transition hover:shadow-xl hover:shadow-violet-500/50"
        >
          <Plus className="size-4" aria-hidden />
          New Conversation
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <ul className="space-y-1.5">
          {conversations.isLoading && !conversations.data ? (
            Array.from({ length: 5 }).map((_, i) => (
              <li key={i} className="mx-1 h-14 animate-pulse rounded-xl bg-slate-200/60" />
            ))
          ) : conversations.data?.conversations.length ? (
            conversations.data.conversations.map((c) => {
              const isActive = activeId === c.id;
              return (
                <li key={c.id} className="group relative">
                  <button
                    type="button"
                    onClick={() => setActiveId(c.id)}
                    className={`flex w-full min-w-0 flex-col gap-1 overflow-hidden rounded-xl px-3.5 py-3 pr-10 text-left transition-all duration-200 ${
                      isActive
                        ? "bg-white text-slate-900 shadow-md ring-1 ring-slate-200/80"
                        : "text-slate-600 hover:bg-white hover:shadow-sm hover:ring-1 hover:ring-slate-200/60"
                    }`}
                  >
                    <span className="block w-full truncate text-[14px] font-semibold tracking-tight">
                      {c.title || "Untitled"}
                    </span>
                    <span className="block w-full truncate text-[11px] font-medium text-slate-400">
                      {formatRelative(c.updated_at)}
                      {c.last_message?.content ? ` · ${c.last_message.content}` : ""}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTargetId(c.id)}
                    className="absolute right-2 top-3.5 rounded-md p-1.5 text-slate-400 opacity-0 transition hover:bg-red-50 hover:text-red-600 focus:opacity-100 group-hover:opacity-100"
                    aria-label="Delete conversation"
                  >
                    <Trash2 className="size-3.5" aria-hidden />
                  </button>
                </li>
              );
            })
          ) : (
            <li className="mx-1 mt-3 rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center text-xs text-slate-400">
              No conversations yet
            </li>
          )}
        </ul>
      </div>
    </>
  );

  return (
    <WriterShell middleColumn={middleColumn} middleColumnLabel="Chat history">
      <section className="relative flex flex-1 flex-col bg-gradient-to-b from-slate-50/40 via-white to-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-violet-50/40 to-transparent" />
        {/* Header — only renders for active conversations */}
        {activeId && (
          <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-slate-100/80 bg-white/70 px-4 py-3 backdrop-blur-xl pl-14 lg:pl-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-md shadow-violet-500/40">
                <Sparkles className="size-4 text-white" aria-hidden />
                {chatStream.isStreaming && (
                  <span className="absolute -right-0.5 -top-0.5 flex size-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <h1 className="truncate text-[15px] font-semibold tracking-tight text-slate-900">
                  {activeConversation?.title ?? "Conversation"}
                </h1>
                <p className="truncate text-[11px] font-medium text-slate-500">
                  {chatStream.isStreaming ? (
                    <span className="inline-flex items-center gap-1 text-emerald-600">
                      <span className="size-1 animate-pulse rounded-full bg-emerald-500" />
                      Writing…
                    </span>
                  ) : activeConversation ? (
                    `Updated ${formatRelative(activeConversation.updated_at)}`
                  ) : (
                    "Ready"
                  )}
                  {effectiveUseStyle && (
                    <>
                      <span className="mx-1.5 text-slate-300">·</span>
                      <span className="inline-flex items-center gap-0.5 text-[#8B5CF6]">
                        <Wand2 className="size-2.5" aria-hidden />
                        Your style
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={startNewChat}
              className="hidden items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-[12px] font-semibold text-slate-700 shadow-sm backdrop-blur transition hover:border-violet-200 hover:bg-violet-50/60 hover:text-[#8B5CF6] sm:inline-flex"
              title="Start a new chat"
            >
              <Plus className="size-3.5" aria-hidden />
              New
            </button>
          </header>
        )}

        {/* Thread */}
        <div
          ref={threadRef}
          className="flex-1 overflow-y-auto"
          aria-live="polite"
        >
          {isEmpty ? (
            <EmptyState
              styleReady={styleReady}
              prompts={SUGGESTED_PROMPTS}
              onSelectPrompt={usePrompt}
              userName={auth?.user?.name || auth?.user?.email?.split("@")[0] || null}
            />
          ) : conversation.isLoading ? (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="size-6 animate-spin text-[#8B5CF6]" aria-hidden />
            </div>
          ) : (
            <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
              <div className="space-y-8">
                {renderedMessages.map((m, i) => (
                  <Message key={i} message={m} onReuse={handleReuse} />
                ))}
              </div>
              {visibleError && (
                <div className="mt-8 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-700">
                  <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
                  <span>{visibleError}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Composer */}
        <div className="bg-gradient-to-b from-transparent via-white/80 to-white px-3 pt-4 lg:px-8 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="mx-auto max-w-3xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void handleSend();
              }}
              className="group/composer relative overflow-hidden rounded-[28px] bg-white shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_10px_30px_-12px_rgba(15,23,42,0.12),0_4px_8px_-2px_rgba(15,23,42,0.06)] transition-all duration-300 focus-within:shadow-[0_0_0_1.5px_rgba(139,92,246,0.45),0_18px_40px_-12px_rgba(139,92,246,0.22),0_6px_14px_-4px_rgba(15,23,42,0.08)]"
            >
              {/* Top: textarea */}
              <textarea
                ref={textareaRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void handleSend();
                  }
                }}
                rows={1}
                placeholder={isBusy ? "Generating reply…" : "Ask anything…"}
                className="block max-h-[220px] min-h-[60px] w-full resize-none bg-transparent px-5 pt-4 pb-2 text-[15.5px] leading-relaxed text-slate-900 placeholder:text-slate-400 focus:outline-none"
                disabled={isBusy && !chatStream.isStreaming}
              />

              {/* Bottom: tool chips + send */}
              <div className="flex items-center gap-2 px-3 pb-3">
                <ToolChip
                  active={useStyle}
                  onClick={() => setUseStyle((v) => !v)}
                  disabled={!styleReady}
                  icon={<Wand2 className="size-4" aria-hidden />}
                  tooltip={styleReady ? "Use my writing style" : "Set up writing style first"}
                />
                <ToolChip
                  active={streamEnabled}
                  onClick={() => setStreamEnabled((v) => !v)}
                  icon={<Zap className="size-4" aria-hidden />}
                  tooltip="Stream replies as they generate"
                />

                <div className="ml-auto">
                  {chatStream.isStreaming ? (
                    <button
                      type="button"
                      onClick={chatStream.abort}
                      className="group/stop flex h-10 items-center gap-2 rounded-full bg-slate-900 px-3 pr-4 text-[13px] font-semibold text-white shadow-lg shadow-slate-900/30 transition hover:bg-slate-800"
                      aria-label="Stop generating"
                    >
                      <StopCircle className="size-4" aria-hidden />
                      Stop
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!draft.trim() || isBusy}
                      className="relative flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-[#8B5CF6] to-violet-600 text-white shadow-lg shadow-violet-500/40 transition-all duration-200 hover:scale-[1.04] hover:shadow-violet-500/50 active:scale-[0.96] disabled:cursor-not-allowed disabled:bg-slate-100 disabled:bg-none disabled:text-slate-300 disabled:shadow-none disabled:hover:scale-100"
                      aria-label="Send message"
                    >
                      {chat.isSending ? (
                        <Loader2 className="size-4 animate-spin" aria-hidden />
                      ) : (
                        <ArrowUp className="size-[18px]" strokeWidth={2.5} aria-hidden />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>

            {/* Subtle hint below — only on desktop, only when empty */}
            {!draft.trim() && !chatStream.isStreaming && (
              <p className="mt-2 hidden text-center text-[11px] text-slate-400 sm:block">
                Press{" "}
                <kbd className="rounded border border-slate-200 bg-white px-1 py-0.5 font-mono text-[10px] text-slate-500 shadow-sm">
                  ↵
                </kbd>{" "}
                to send,{" "}
                <kbd className="rounded border border-slate-200 bg-white px-1 py-0.5 font-mono text-[10px] text-slate-500 shadow-sm">
                  Shift
                </kbd>{" "}
                +{" "}
                <kbd className="rounded border border-slate-200 bg-white px-1 py-0.5 font-mono text-[10px] text-slate-500 shadow-sm">
                  ↵
                </kbd>{" "}
                for new line
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Delete confirm modal */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-base font-semibold text-slate-900">Delete conversation?</h3>
            <p className="mt-1.5 text-sm text-slate-500">
              This is permanent. The messages cannot be recovered.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteTargetId(null)}
                className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void confirmDelete()}
                disabled={deleteConv.isDeleting}
                className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 disabled:opacity-70"
              >
                {deleteConv.isDeleting && <Loader2 className="size-4 animate-spin" aria-hidden />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </WriterShell>
  );
}

function EmptyState({
  styleReady,
  prompts,
  onSelectPrompt,
  userName,
}: {
  styleReady: boolean;
  prompts: SuggestedPrompt[];
  onSelectPrompt: (p: string) => void;
  userName: string | null;
}) {
  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 5) return "Still up";
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    if (hour < 22) return "Good evening";
    return "Late night";
  })();
  const firstName = userName?.split(/\s+/)[0] ?? null;

  return (
    <div className="relative mx-auto flex h-full w-full max-w-2xl flex-col items-center justify-center px-6">
      {/* Soft violet aura behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-300/15 blur-[120px]"
      />

      <div className="text-center">
        <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-slate-400">
          {greeting}
          {firstName ? `, ${firstName}` : ""}
        </p>
        <h2 className="mt-3 text-balance text-[clamp(2rem,5vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.025em] text-slate-900">
          What shall we{" "}
          <span className="bg-gradient-to-r from-[#8B5CF6] via-violet-500 to-fuchsia-500 bg-clip-text font-serif italic text-transparent">
            write
          </span>
          ?
        </h2>
      </div>

      {/* Horizontal prompt chips */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {prompts.map((p) => (
          <button
            key={p.title}
            type="button"
            onClick={() => onSelectPrompt(p.prompt)}
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-3.5 py-2 text-[13px] font-medium text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-200 hover:bg-white hover:text-slate-900 hover:shadow-md hover:shadow-violet-500/15"
          >
            <span className="flex size-[18px] shrink-0 items-center justify-center text-[#8B5CF6] transition group-hover:scale-110">
              {p.icon}
            </span>
            {p.title}
          </button>
        ))}
      </div>

      {!styleReady && (
        <Link
          href="/settings/style"
          className="group mt-8 inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-violet-50/80 px-4 py-2 text-[12px] font-medium text-violet-800 shadow-[0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-100 hover:shadow-md hover:shadow-violet-500/20"
        >
          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white/80 text-[#8B5CF6] transition group-hover:bg-white">
            <Wand2 className="size-3" aria-hidden />
          </span>
          Personalize replies — set up your writing style
          <ArrowUp
            className="size-3 -rotate-90 text-violet-300 transition group-hover:translate-x-0.5 group-hover:text-[#8B5CF6]"
            aria-hidden
          />
        </Link>
      )}
    </div>
  );
}

function Message({
  message,
  onReuse,
}: {
  message: ThreadMessage;
  onReuse: (text: string) => void;
}) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const paraphrase = useParaphrase();
  const detect = useDetectAi();

  const [humanizeResult, setHumanizeResult] = useState<ParaphraseResponse | null>(null);
  const [detectResult, setDetectResult] = useState<DetectAiResponse | null>(null);
  const [panel, setPanel] = useState<"humanize" | "detect" | null>(null);

  const handleCopy = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, []);

  const runHumanize = useCallback(async () => {
    if (!message.content) return;
    setPanel("humanize");
    paraphrase.resetError();
    try {
      const res = await paraphrase.paraphrase({ text: message.content });
      const cleaned: ParaphraseResponse = {
        ...res,
        paraphrased_texts: (res.paraphrased_texts ?? []).map((t) => t.replace(/\*\*/g, "")),
      };
      setHumanizeResult(cleaned);
    } catch {
      // error surfaced via paraphrase.error
    }
  }, [message.content, paraphrase]);

  const runDetect = useCallback(async () => {
    if (!message.content) return;
    setPanel("detect");
    detect.resetError();
    try {
      const res = await detect.detectAi({ text: message.content });
      setDetectResult(res);
    } catch {
      // error surfaced via detect.error
    }
  }, [message.content, detect]);

  if (isUser) {
    return (
      <div className="animate-msg-in flex justify-end">
        <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-gradient-to-br from-slate-100 to-slate-50 px-4 py-2.5 text-sm leading-relaxed text-slate-900 shadow-sm ring-1 ring-slate-200/60">
          {message.content}
        </div>
      </div>
    );
  }

  const isComplete = !message.pending && Boolean(message.content);

  return (
    <div className="animate-msg-in flex gap-3">
      <div className="relative flex size-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/40">
        <Sparkles className="size-4 text-white" aria-hidden />
        <div className="pointer-events-none absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-br from-violet-400/40 to-fuchsia-400/40 opacity-0 blur-md transition-opacity group-hover:opacity-100" />
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        {message.content ? (
          <div className="text-sm leading-relaxed text-slate-800">
            {message.pending ? (
              <span className="whitespace-pre-wrap">
                {message.content}
                <span className="ml-1 inline-block size-2 animate-pulse rounded-full bg-[#8B5CF6] align-middle" />
              </span>
            ) : (
              <MarkdownMessage content={message.content} />
            )}
          </div>
        ) : message.pending ? (
          <div className="flex items-center gap-2 pt-1 text-sm text-slate-400">
            <span className="flex gap-1">
              <span className="size-1.5 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.3s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.15s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-slate-300" />
            </span>
          </div>
        ) : null}

        {isComplete && (
          <>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => void runHumanize()}
                disabled={paraphrase.isParaphrasing}
                className={`group flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm transition disabled:cursor-wait ${
                  panel === "humanize"
                    ? "border-transparent bg-gradient-to-r from-[#8B5CF6] to-fuchsia-500 text-white shadow-violet-500/30"
                    : "border-violet-200 bg-white text-[#8B5CF6] hover:border-violet-300 hover:bg-violet-50"
                }`}
              >
                {paraphrase.isParaphrasing && panel === "humanize" ? (
                  <Loader2 className="size-3.5 animate-spin" aria-hidden />
                ) : (
                  <Zap className="size-3.5" aria-hidden />
                )}
                Humanize
              </button>
              <button
                type="button"
                onClick={() => void runDetect()}
                disabled={detect.isDetecting}
                className={`group flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm transition disabled:cursor-wait ${
                  panel === "detect"
                    ? "border-transparent bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {detect.isDetecting && panel === "detect" ? (
                  <Loader2 className="size-3.5 animate-spin" aria-hidden />
                ) : (
                  <BarChart3 className="size-3.5" aria-hidden />
                )}
                Detect AI
              </button>
              <div className="ml-auto flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => void handleCopy(message.content)}
                  className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  {copied ? (
                    <>
                      <Check className="size-3.5" aria-hidden />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" aria-hidden />
                      Copy
                    </>
                  )}
                </button>
                {message.word_count > 0 && (
                  <span className="text-[11px] text-slate-400">
                    · {message.word_count} words
                  </span>
                )}
              </div>
            </div>

            {panel === "humanize" && (
              <HumanizePanel
                isLoading={paraphrase.isParaphrasing}
                error={paraphrase.error}
                result={humanizeResult}
                onClose={() => setPanel(null)}
                onRetry={() => void runHumanize()}
                onCopy={(t) => void handleCopy(t)}
                onReuse={onReuse}
              />
            )}

            {panel === "detect" && (
              <DetectPanel
                isLoading={detect.isDetecting}
                error={detect.error}
                result={detectResult}
                onClose={() => setPanel(null)}
                onRetry={() => void runDetect()}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

function HumanizePanel({
  isLoading,
  error,
  result,
  onClose,
  onRetry,
  onCopy,
  onReuse,
}: {
  isLoading: boolean;
  error: string | null;
  result: ParaphraseResponse | null;
  onClose: () => void;
  onRetry: () => void;
  onCopy: (text: string) => void;
  onReuse: (text: string) => void;
}) {
  const versions = result?.paraphrased_texts ?? [];
  const [index, setIndex] = useState(0);
  const current = versions[index] ?? "";
  const hasMany = versions.length > 1;

  return (
    <div className="mt-3 overflow-hidden rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50/60 to-fuchsia-50/40 shadow-sm">
      <div className="flex items-center justify-between border-b border-violet-100/80 bg-white/60 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-md bg-gradient-to-br from-[#8B5CF6] to-fuchsia-500 shadow-sm shadow-violet-500/30">
            <Zap className="size-3 text-white" aria-hidden />
          </div>
          <span className="text-xs font-semibold text-slate-800">Humanized</span>
          {result && (
            <span className="rounded-full bg-slate-900/5 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
              {result.remaining_credits} credits left
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          aria-label="Close humanize panel"
        >
          <X className="size-3.5" aria-hidden />
        </button>
      </div>

      <div className="p-4">
        {isLoading ? (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Loader2 className="size-4 animate-spin text-[#8B5CF6]" aria-hidden />
            Humanizing your text…
          </div>
        ) : error ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2 text-sm text-red-700">
              <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>{error}</span>
            </div>
            <button
              type="button"
              onClick={onRetry}
              className="self-start rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#8B5CF6] shadow-sm hover:bg-violet-50"
            >
              <RefreshCw className="mr-1 inline size-3" aria-hidden />
              Retry
            </button>
          </div>
        ) : (
          <>
            {hasMany && (
              <div className="mb-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIndex((i) => Math.max(0, i - 1))}
                  disabled={index === 0}
                  className="rounded-md p-1 text-slate-500 disabled:opacity-30 hover:bg-white"
                  aria-label="Previous version"
                >
                  <ChevronLeft className="size-3.5" aria-hidden />
                </button>
                <span className="text-[11px] font-medium text-slate-500">
                  Version {index + 1} of {versions.length}
                </span>
                <button
                  type="button"
                  onClick={() => setIndex((i) => Math.min(versions.length - 1, i + 1))}
                  disabled={index === versions.length - 1}
                  className="rounded-md p-1 text-slate-500 disabled:opacity-30 hover:bg-white"
                  aria-label="Next version"
                >
                  <ChevronRight className="size-3.5" aria-hidden />
                </button>
              </div>
            )}

            <div className="whitespace-pre-wrap rounded-xl border border-violet-100 bg-white p-3 text-sm leading-relaxed text-slate-800">
              {current || (
                <span className="text-slate-400">No humanized version returned.</span>
              )}
            </div>

            {current && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => onCopy(current)}
                  className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
                >
                  <Copy className="size-3.5" aria-hidden />
                  Copy
                </button>
                <button
                  type="button"
                  onClick={() => onReuse(current)}
                  className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#8B5CF6] shadow-sm hover:bg-violet-50"
                >
                  <ArrowUp className="size-3.5" aria-hidden />
                  Send to composer
                </button>
                <button
                  type="button"
                  onClick={onRetry}
                  className="ml-auto flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:bg-white hover:text-slate-700"
                >
                  <RefreshCw className="size-3.5" aria-hidden />
                  Regenerate
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function DetectPanel({
  isLoading,
  error,
  result,
  onClose,
  onRetry,
}: {
  isLoading: boolean;
  error: string | null;
  result: DetectAiResponse | null;
  onClose: () => void;
  onRetry: () => void;
}) {
  const isHuman = result?.prediction === "human";
  const confidencePct = result ? Math.round(result.confidence * 100) : 0;
  const probs = result?.probabilities;

  return (
    <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200/80 bg-white/60 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-md bg-slate-900">
            <BarChart3 className="size-3 text-white" aria-hidden />
          </div>
          <span className="text-xs font-semibold text-slate-800">AI Detection</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          aria-label="Close detection panel"
        >
          <X className="size-3.5" aria-hidden />
        </button>
      </div>

      <div className="p-4">
        {isLoading ? (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Loader2 className="size-4 animate-spin text-slate-700" aria-hidden />
            Analyzing the text…
          </div>
        ) : error ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2 text-sm text-red-700">
              <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>{error}</span>
            </div>
            <button
              type="button"
              onClick={onRetry}
              className="self-start rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              <RefreshCw className="mr-1 inline size-3" aria-hidden />
              Retry
            </button>
          </div>
        ) : result && probs ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={`flex size-12 items-center justify-center rounded-2xl ${
                  isHuman
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-rose-100 text-rose-700"
                }`}
              >
                {isHuman ? (
                  <ShieldCheck className="size-6" aria-hidden />
                ) : (
                  <BarChart3 className="size-6" aria-hidden />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold text-slate-900">
                    {isHuman ? "Likely Human" : "Likely AI"}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      isHuman
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {confidencePct}% confidence
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Based on linguistic patterns and paragraph-level signals.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <ProbabilityBar label="Human" value={probs.human} tone="emerald" />
              <ProbabilityBar label="AI" value={probs.ai} tone="rose" />
              <ProbabilityBar label="AI paraphrased" value={probs.ai_paraphrased} tone="amber" />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onRetry}
                className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:bg-white hover:text-slate-700"
              >
                <RefreshCw className="size-3.5" aria-hidden />
                Re-run
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ProbabilityBar({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "emerald" | "rose" | "amber";
}) {
  const pct = Math.round(value * 100);
  const bar =
    tone === "emerald"
      ? "bg-emerald-500"
      : tone === "rose"
        ? "bg-rose-500"
        : "bg-amber-500";
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] font-medium text-slate-600">
        <span>{label}</span>
        <span className="tabular-nums">{pct}%</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-200/70">
        <div
          className={`h-full rounded-full ${bar} transition-[width]`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function ToolChip({
  active,
  onClick,
  disabled,
  icon,
  tooltip,
}: {
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
  icon: React.ReactNode;
  tooltip: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={tooltip}
      aria-pressed={active}
      aria-label={tooltip}
      className={`group/chip relative flex size-9 items-center justify-center rounded-full transition-all duration-200 ${
        disabled
          ? "cursor-not-allowed bg-slate-50 text-slate-300"
          : active
            ? "bg-gradient-to-br from-[#8B5CF6] to-violet-600 text-white shadow-md shadow-violet-500/40 hover:shadow-lg hover:shadow-violet-500/50"
            : "bg-slate-100/70 text-slate-500 hover:bg-slate-200/70 hover:text-slate-700"
      }`}
    >
      {icon}
    </button>
  );
}
