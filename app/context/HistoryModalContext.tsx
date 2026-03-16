"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import HistoryModal from "@/app/components/HistoryModal";

const HistoryModalContext = createContext<{
  openHistoryModal: () => void;
  closeHistoryModal: () => void;
} | null>(null);

export function HistoryModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openHistoryModal = useCallback(() => setOpen(true), []);
  const closeHistoryModal = useCallback(() => setOpen(false), []);

  return (
    <HistoryModalContext.Provider value={{ openHistoryModal, closeHistoryModal }}>
      {children}
      <HistoryModal open={open} onClose={closeHistoryModal} />
    </HistoryModalContext.Provider>
  );
}

export function useHistoryModal() {
  const ctx = useContext(HistoryModalContext);
  if (!ctx) throw new Error("useHistoryModal must be used within HistoryModalProvider");
  return ctx;
}
