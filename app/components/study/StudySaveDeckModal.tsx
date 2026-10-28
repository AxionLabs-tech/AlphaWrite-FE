"use client";

import { X } from "lucide-react";

type StudySaveDeckModalProps = {
  defaultName: string;
  deckName: string;
  onDeckNameChange: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
};

export function StudySaveDeckModal({
  defaultName,
  deckName,
  onDeckNameChange,
  onClose,
  onSave,
}: StudySaveDeckModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/30 p-4 sm:items-center sm:p-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="save-deck-title"
        className="relative w-full max-w-md rounded-3xl bg-white px-6 pb-6 pt-5 shadow-xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute left-4 top-4 flex size-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
          aria-label="Close"
        >
          <X className="size-4" aria-hidden />
        </button>

        <h2
          id="save-deck-title"
          className="text-center text-lg font-bold text-slate-900"
        >
          ✨ Save cards into
        </h2>

        <label className="mt-8 block text-sm font-semibold text-slate-700">
          New deck name
          <input
            value={deckName}
            onChange={(e) => onDeckNameChange(e.target.value)}
            placeholder={defaultName}
            className="mt-2 w-full rounded-2xl bg-slate-100 px-4 py-3.5 text-sm text-slate-900 outline-none ring-2 ring-transparent focus:ring-[#6642B6]/30"
          />
        </label>

        <button
          type="button"
          onClick={onSave}
          disabled={!deckName.trim()}
          className="mt-6 w-full rounded-2xl bg-[#2E1065] py-3.5 text-sm font-bold text-white transition hover:bg-[#3b0d82] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save
        </button>
      </div>
    </div>
  );
}
