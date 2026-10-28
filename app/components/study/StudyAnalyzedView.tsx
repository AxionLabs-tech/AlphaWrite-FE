"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  MoreVertical,
} from "lucide-react";
import { StudySaveDeckModal } from "@/app/components/study/StudySaveDeckModal";
import { StudyGeneratingCards } from "@/app/components/study/StudyGeneratingCards";
import { addSavedDeck } from "@/lib/savedDecks";

export type StudyMode = "memorize" | "note" | "lesson";

type StudyAnalyzedViewProps = {
  documentTitle: string;
  fileName: string;
};

type Step = "choose" | "save-deck" | "generating";

const MODES: {
  id: StudyMode;
  title: string;
  subtitle: string;
  emoji: string;
  selectedRing: string;
}[] = [
  {
    id: "memorize",
    title: "Memorize",
    subtitle: "Generate flashcards",
    emoji: "🐘",
    selectedRing: "ring-2 ring-emerald-400 bg-emerald-50/80",
  },
  {
    id: "note",
    title: "Note",
    subtitle: "Generate a note",
    emoji: "📜",
    selectedRing: "ring-2 ring-amber-300 bg-amber-50/80",
  },
  {
    id: "lesson",
    title: "Step-by-step lesson",
    subtitle: "Learn it in order",
    emoji: "🦉",
    selectedRing: "ring-2 ring-sky-300 bg-sky-50/80",
  },
];

export function StudyAnalyzedView({
  documentTitle,
  fileName,
}: StudyAnalyzedViewProps) {
  const [mode, setMode] = useState<StudyMode>("memorize");
  const [draft, setDraft] = useState("");
  const [step, setStep] = useState<Step>("choose");
  const [deckName, setDeckName] = useState(documentTitle);

  const lessonSubtitle =
    documentTitle.length > 28
      ? `${documentTitle.slice(0, 28)}…`
      : documentTitle;

  const primaryLabel =
    mode === "memorize"
      ? "Start memorizing"
      : mode === "note"
        ? "Generate note"
        : "Start lesson";

  const handlePrimary = () => {
    if (mode === "memorize") {
      setDeckName(documentTitle);
      setStep("save-deck");
      return;
    }
    setStep("generating");
  };

  const handleSaveDeck = () => {
    const name = deckName.trim() || documentTitle;
    setDeckName(name);
    addSavedDeck({
      title: name,
      fileName,
      cardCount: 62,
    });
    setStep("generating");
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#FAFAFA]">
      {step === "save-deck" && (
        <StudySaveDeckModal
          defaultName={documentTitle}
          deckName={deckName}
          onDeckNameChange={setDeckName}
          onClose={() => setStep("choose")}
          onSave={handleSaveDeck}
        />
      )}

      <header className="flex shrink-0 items-center gap-3 border-b border-slate-100 bg-white px-4 py-3 sm:px-6">
        <Link
          href="/dashboard"
          className="flex size-9 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100"
          aria-label="Back to home"
        >
          <ArrowLeft className="size-5" aria-hidden />
        </Link>
        <h1 className="min-w-0 flex-1 truncate text-center text-sm font-bold text-slate-900 sm:text-base">
          {documentTitle}
        </h1>
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
          aria-label="More options"
        >
          <MoreVertical className="size-5" aria-hidden />
        </button>
      </header>

      <div className="relative min-h-0 flex-1 overflow-y-auto px-4 pb-6 pt-6 sm:px-8">
        {step === "generating" ? (
          <StudyGeneratingCards
            documentTitle={documentTitle}
            deckName={deckName.trim() || documentTitle}
          />
        ) : (
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 flex justify-end">
              <div className="flex flex-col items-center gap-2 rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-slate-200/60">
                <div className="flex size-14 items-center justify-center rounded-xl bg-red-50">
                  <FileText className="size-8 text-red-500" aria-hidden />
                </div>
                <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  PDF
                </span>
                <span className="max-w-[120px] truncate text-[10px] text-slate-400">
                  {fileName}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Image
                src="/logos/Alpha-Writes-Logo/mark/alpha-writes-mark-purple.png"
                alt=""
                width={36}
                height={36}
                className="size-9 shrink-0 rounded-full bg-violet-100 p-0.5"
              />
              <div className="min-w-0 flex-1 space-y-6">
                <p className="text-sm leading-relaxed text-slate-700">
                  I see you&apos;ve shared a document on{" "}
                  <span className="font-semibold text-slate-900">
                    {documentTitle.toLowerCase()}
                  </span>
                  ; how would you like to study this material?
                </p>

                <div className="grid gap-3 sm:grid-cols-3">
                  {MODES.map((m) => {
                    const selected = mode === m.id;
                    const subtitle =
                      m.id === "lesson" ? lessonSubtitle : m.subtitle;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMode(m.id)}
                        className={`flex flex-col items-center rounded-2xl px-3 py-5 text-center transition ${
                          selected
                            ? m.selectedRing
                            : "bg-white ring-1 ring-slate-200/80 hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-3xl" aria-hidden>
                          {m.emoji}
                        </span>
                        <span className="mt-3 text-sm font-bold text-slate-900">
                          {m.title}
                        </span>
                        <span className="mt-1 line-clamp-2 text-xs text-slate-500">
                          {subtitle}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={handlePrimary}
                  className="relative z-10 w-full cursor-pointer rounded-2xl bg-[#2E1065] py-3.5 text-sm font-bold text-white transition hover:bg-[#3b0d82] active:scale-[0.99]"
                >
                  {primaryLabel}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="shrink-0 border-t border-slate-100 bg-white px-4 py-4 sm:px-8">
        <form
          className="mx-auto flex max-w-2xl items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="I want to learn…"
            className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
        </form>
      </div>
    </div>
  );
}
