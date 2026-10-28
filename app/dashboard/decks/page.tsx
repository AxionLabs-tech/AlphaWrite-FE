"use client";

import { useStudyPdfUpload } from "@/app/components/study/useStudyPdfUpload";
import { DeckGrid, MyDecksHeader } from "@/app/components/decks/DeckGrid";
import { useSavedDecks } from "@/app/hooks/useSavedDecks";

export default function DecksPage() {
  const decks = useSavedDecks();
  const { openFilePicker, input: pdfInput } = useStudyPdfUpload();

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden px-5 py-4 sm:px-8 lg:px-10">
      {pdfInput}
      <div className="shrink-0">
        <MyDecksHeader onAddDeck={openFilePicker} />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <DeckGrid decks={decks} />
      </div>
    </div>
  );
}
