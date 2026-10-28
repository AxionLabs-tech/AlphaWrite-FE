"use client";

import { Loader2 } from "lucide-react";

type StudyGeneratingCardsProps = {
  documentTitle: string;
  deckName: string;
  cardCount?: number;
};

export function StudyGeneratingCards({
  documentTitle,
  deckName,
  cardCount = 62,
}: StudyGeneratingCardsProps) {
  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-6 sm:px-0">
      <p className="text-sm text-slate-600">
        Let&apos;s learn about{" "}
        <span className="font-semibold text-slate-900">{documentTitle}</span>!
      </p>

      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
        <div className="flex items-center gap-3">
          <Loader2 className="size-5 animate-spin text-[#6642B6]" aria-hidden />
          <p className="text-sm font-bold text-slate-900">Generating cards</p>
        </div>
        <p className="mt-4 rounded-xl bg-sky-50 px-4 py-3 text-sm font-semibold text-sky-900">
          {cardCount} cards created in &ldquo;{deckName}&rdquo;
        </p>
        <p className="mt-3 text-sm italic text-slate-500">
          What relationship should future research further clarify?
        </p>
      </div>

      <p className="text-xs text-slate-400">
        Full deck review and study modes connect to the API next.
      </p>
    </div>
  );
}
