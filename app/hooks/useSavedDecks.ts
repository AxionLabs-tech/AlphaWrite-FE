"use client";

import { useCallback, useEffect, useState } from "react";
import { readSavedDecks, type SavedDeck } from "@/lib/savedDecks";

export function useSavedDecks(): SavedDeck[] {
  const [decks, setDecks] = useState<SavedDeck[]>([]);

  const refresh = useCallback(() => {
    setDecks(readSavedDecks());
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("alphawrite-decks-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("alphawrite-decks-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  return decks;
}
