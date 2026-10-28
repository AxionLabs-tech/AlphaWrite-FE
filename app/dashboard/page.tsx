"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  ClipboardPaste,
  FileUp,
  MoreHorizontal,
  Plus,
  ScanSearch,
  Search,
  Youtube,
  Zap,
} from "lucide-react";
import { useStudyPdfUpload } from "@/app/components/study/useStudyPdfUpload";
import { useSavedDecks } from "@/app/hooks/useSavedDecks";
import { DeckCard } from "@/app/components/decks/DeckGrid";

const CHIP_CLASS =
  "inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm ring-1 ring-slate-200/70 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md hover:ring-slate-300";

const SOURCE_CHIPS = [
  { kind: "file" as const, label: "File", icon: FileUp },
  {
    kind: "link" as const,
    href: "/dashboard/humanize",
    label: "Paste",
    icon: ClipboardPaste,
  },
  {
    kind: "link" as const,
    href: "/dashboard/decks",
    label: "YouTube",
    icon: Youtube,
  },
  {
    kind: "link" as const,
    href: "/dashboard/writing",
    label: "More",
    icon: MoreHorizontal,
  },
] as const;

const JUMP_BACK_IN = [
  {
    id: "a",
    title: "Introduction to Computer Networking",
    subtitle: "Chat",
    kind: "chat" as const,
  },
  {
    id: "b",
    title: "Academic pressures and the sleep–achievement gap",
    subtitle: "Quiz · Sleep Deprivation",
    kind: "quiz" as const,
    progress: 50,
  },
];

const RECENT_CHATS = [
  { id: "c1", title: "Introduction to Computer Networking", when: "17m" },
  { id: "c2", title: "Sleep Deprivation and Academic Performance", when: "1h" },
];

export default function DashboardHomePage() {
  const router = useRouter();
  const [draft, setDraft] = useState("");
  const { openFilePicker, input: pdfInput } = useStudyPdfUpload();
  const decks = useSavedDecks();
  const visibleDecks = decks.slice(0, 3);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = draft.trim();
    if (q) {
      router.push(`/dashboard/decks/session?q=${encodeURIComponent(q)}`);
    } else {
      router.push("/dashboard/decks");
    }
  };

  return (
    <div className="relative h-full overflow-y-auto px-5 py-6 sm:px-8 lg:px-12 lg:py-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-105 bg-[radial-gradient(60%_55%_at_50%_0%,rgba(141,105,243,0.14),transparent_70%)]"
      />
      {pdfInput}

      <div className="relative mx-auto max-w-4xl">
        <h1 className="text-lg font-bold text-slate-900">Home</h1>

        {/* Hero */}
        <section className="mt-10 text-center">
          <div className="flex flex-col items-center gap-5">
            <Image
              src="/logos/Alpha-Writes-Logo/mark/alpha-writes-mark-purple.png"
              alt=""
              width={128}
              height={128}
              className="size-24 drop-shadow-[0_12px_28px_rgba(121,85,203,0.35)] sm:size-28"
              priority
            />
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              What shall we{" "}
              <span className="bg-linear-to-r from-[#8D69F3] to-[#6642B6] bg-clip-text text-transparent">
                Study?
              </span>
            </h2>
          </div>

          <form
            onSubmit={onSubmit}
            className="mx-auto mt-8 flex max-w-2xl items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-[0_18px_50px_-24px_rgba(102,66,182,0.25)] transition focus-within:border-[#8D69F3]/55 focus-within:shadow-[0_20px_55px_-20px_rgba(102,66,182,0.45)] focus-within:ring-2 focus-within:ring-[#8D69F3]/15"
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="I want to study…"
              className="min-w-0 flex-1 bg-transparent py-2 text-left text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#8D69F3] to-[#6642B6] text-white shadow-sm transition hover:shadow-md active:scale-95"
              aria-label="Start study"
            >
              <Plus strokeWidth={2.5} className="size-5" aria-hidden />
            </button>
          </form>

          <div className="mx-auto mt-4 flex max-w-2xl flex-wrap justify-center gap-2">
            {SOURCE_CHIPS.map((chip) => {
              const Icon = chip.icon;
              if (chip.kind === "file") {
                return (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={openFilePicker}
                    className={CHIP_CLASS}
                  >
                    <Icon strokeWidth={2} className="size-4 text-[#6642B6]" aria-hidden />
                    {chip.label}
                  </button>
                );
              }
              return (
                <Link key={chip.label} href={chip.href} className={CHIP_CLASS}>
                  <Icon strokeWidth={2} className="size-4 text-[#6642B6]" aria-hidden />
                  {chip.label}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Jump back in */}
        <section className="mt-14">
          <SectionHeader title="Jump back in" href="/dashboard/decks" />
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {JUMP_BACK_IN.map((item) => (
              <Link
                key={item.id}
                href="/dashboard/decks"
                className="group flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200/70 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {item.kind === "chat" ? (
                  <ChatMessageMark />
                ) : (
                  <ProgressRing percent={item.progress ?? 0} />
                )}
                <div className="min-w-0 flex-1 text-left">
                  <p className="truncate font-bold text-slate-900">{item.title}</p>
                  <p className="truncate text-xs text-slate-500">{item.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Upgrade banner */}
        <Link
          href="/dashboard/account"
          className="group relative mt-12 flex items-center justify-between gap-3 overflow-hidden rounded-2xl bg-linear-to-br from-[#2E1065] via-[#5B21B6] to-[#7C3AED] px-5 py-4 text-white shadow-[0_18px_40px_-18px_rgba(76,29,149,0.6)] transition hover:shadow-[0_22px_50px_-18px_rgba(76,29,149,0.75)]"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-inset ring-white/20">
              <Zap strokeWidth={2} className="size-5" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/70">
                Go Pro
              </p>
              <p className="truncate text-sm font-semibold sm:text-base">
                Skip limits — more credits &amp; study power
              </p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#4C1D95] shadow-sm">
            Claim
            <ArrowUpRight className="size-3.5" aria-hidden />
          </span>
        </Link>

        {/* My decks (real data) */}
        <section className="mt-12">
          <SectionHeader
            title="My decks"
            trailing={
              <Link
                href="/dashboard/decks"
                className="inline-flex size-7 items-center justify-center rounded-full bg-white text-slate-700 ring-1 ring-slate-200/80 transition hover:bg-slate-50"
                aria-label="Add deck"
              >
                <Plus strokeWidth={2.5} className="size-4" aria-hidden />
              </Link>
            }
          />
          {decks.length === 0 ? (
            <EmptyDecksCard onBrowse={() => router.push("/dashboard/decks")} />
          ) : (
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visibleDecks.map((deck) => (
                <li key={deck.id}>
                  <DeckCard deck={deck} />
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Recent chats */}
        <section className="mt-12 pb-10">
          <SectionHeader title="Recent chats" href="/dashboard/decks" />
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {RECENT_CHATS.map((chat) => (
              <Link
                key={chat.id}
                href="/dashboard/decks"
                className="group flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-slate-200/70 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <ChatMessageMark className="size-11" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-slate-900">{chat.title}</p>
                  <p className="text-xs text-slate-500">{chat.when}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function ChatMessageMark({ className = "size-12" }: { className?: string }) {
  return (
    <Image
      src="/icons/chat-message.png"
      alt=""
      width={48}
      height={48}
      className={`shrink-0 object-contain ${className ?? ""}`}
      aria-hidden
    />
  );
}

function SectionHeader({
  title,
  href,
  trailing,
}: {
  title: string;
  href?: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h3 className="text-lg font-extrabold text-slate-900">{title}</h3>
      {trailing ??
        (href ? (
          <Link
            href={href}
            className="text-xs font-bold text-slate-500 transition hover:text-slate-800"
          >
            View all
          </Link>
        ) : null)}
    </div>
  );
}

function ProgressRing({ percent }: { percent: number }) {
  const clamped = Math.max(0, Math.min(100, percent));
  const r = 18;
  const c = 2 * Math.PI * r;
  const dash = (clamped / 100) * c;
  return (
    <div className="relative flex size-12 shrink-0 items-center justify-center">
      <svg viewBox="0 0 44 44" className="size-12 -rotate-90">
        <circle cx="22" cy="22" r={r} className="fill-none stroke-emerald-100" strokeWidth="4" />
        <circle
          cx="22"
          cy="22"
          r={r}
          className="fill-none stroke-emerald-500"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
        />
      </svg>
      <span className="absolute text-[10px] font-extrabold text-emerald-700">{clamped}%</span>
    </div>
  );
}

function EmptyDecksCard({ onBrowse }: { onBrowse: () => void }) {
  return (
    <div className="mt-4 rounded-2xl bg-white px-5 py-8 text-center ring-1 ring-slate-200/70">
      <div className="mx-auto mb-3 flex size-11 items-center justify-center rounded-2xl bg-violet-50 text-[#6642B6]">
        <ScanSearch strokeWidth={2} className="size-5" aria-hidden />
      </div>
      <p className="text-sm font-semibold text-slate-700">No decks yet</p>
      <p className="mt-1 text-xs text-slate-500">
        Import a PDF or paste a topic above to build your first deck.
      </p>
      <button
        type="button"
        onClick={onBrowse}
        className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-800"
      >
        <Search strokeWidth={2.5} className="size-3.5" aria-hidden />
        Browse decks
      </button>
    </div>
  );
}
