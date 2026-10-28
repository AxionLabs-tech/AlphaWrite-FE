"use client";

import Link from "next/link";
import { CheckCircle2, FolderPlus, Gamepad2 } from "lucide-react";
import type { SavedDeck } from "@/lib/savedDecks";

type DeckCardProps = {
  deck: SavedDeck;
};

export function DeckCard({ deck }: DeckCardProps) {
  return (
    <Link
      href={`/dashboard/decks/session?deck=${encodeURIComponent(deck.id)}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70 transition hover:shadow-md hover:ring-slate-300"
    >
      <div className={`h-28 ${deck.headerColor}`} />
      <div className="relative flex flex-1 flex-col p-4 pt-5">
        <h2 className="line-clamp-2 text-sm font-bold leading-snug text-slate-900">
          {deck.title}
        </h2>
        <p className="mt-2 text-xs font-medium text-slate-500">
          {deck.cardCount} cards
        </p>
        <CheckCircle2
          className="absolute bottom-4 right-4 size-5 text-slate-300 transition group-hover:text-[#6642B6]"
          aria-hidden
        />
      </div>
    </Link>
  );
}

type DeckGridProps = {
  decks: SavedDeck[];
  onAddDeck: () => void;
};

export function MyDecksHeader({ onAddDeck }: { onAddDeck: () => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <h1 className="text-2xl font-bold text-slate-900">My deck</h1>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onAddDeck}
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-slate-800 shadow-sm ring-1 ring-slate-200/80 transition hover:bg-slate-50"
        >
          <FolderPlus className="size-4" aria-hidden />
          Add deck
        </button>
        <Link
          href="/dashboard/decks/session"
          className="inline-flex items-center gap-2 rounded-full bg-[#2E1065] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#3b0d82]"
        >
          <Gamepad2 className="size-4" aria-hidden />
          Study
        </Link>
      </div>
    </div>
  );
}

export function DeckGrid({ decks }: Pick<DeckGridProps, "decks">) {
  if (decks.length === 0) {
    return (
      <div className="mt-12 rounded-2xl bg-slate-50 px-6 py-16 text-center">
        <p className="text-sm font-semibold text-slate-700">No decks yet</p>
        <p className="mt-2 text-sm text-slate-500">
          Import a PDF from Home or Add deck — saved materials show up here.
        </p>
      </div>
    );
  }

  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {decks.map((deck) => (
        <li key={deck.id}>
          <DeckCard deck={deck} />
        </li>
      ))}
    </ul>
  );
}
