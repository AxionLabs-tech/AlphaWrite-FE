export const SAVED_DECKS_STORAGE_KEY = "alphawrite.savedDecks";

export type SavedDeck = {
  id: string;
  title: string;
  fileName: string;
  cardCount: number;
  headerColor: string;
  createdAt: string;
};

export const DECK_HEADER_COLORS = [
  "bg-rose-200",
  "bg-sky-200",
  "bg-teal-200",
  "bg-violet-200",
  "bg-amber-200",
  "bg-indigo-200",
] as const;

export function readSavedDecks(): SavedDeck[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SAVED_DECKS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedDeck[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeSavedDecks(decks: SavedDeck[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SAVED_DECKS_STORAGE_KEY, JSON.stringify(decks));
  window.dispatchEvent(new Event("alphawrite-decks-updated"));
}

export function addSavedDeck(input: {
  title: string;
  fileName: string;
  cardCount: number;
}): SavedDeck {
  const decks = readSavedDecks();
  const headerColor =
    DECK_HEADER_COLORS[decks.length % DECK_HEADER_COLORS.length];
  const deck: SavedDeck = {
    id: crypto.randomUUID(),
    title: input.title,
    fileName: input.fileName,
    cardCount: input.cardCount,
    headerColor,
    createdAt: new Date().toISOString(),
  };
  writeSavedDecks([deck, ...decks]);
  return deck;
}

export function truncateDeckTitle(title: string, max = 24): string {
  if (title.length <= max) return title;
  return `${title.slice(0, max)}…`;
}
