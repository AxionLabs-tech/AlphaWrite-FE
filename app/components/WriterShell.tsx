"use client";

import { History, X } from "lucide-react";
import { useState } from "react";

export function WriterShell({
  middleColumn,
  middleColumnLabel,
  children,
}: {
  middleColumn?: React.ReactNode;
  /** Accessible label / mobile sheet title */
  middleColumnLabel?: string;
  children: React.ReactNode;
}) {
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <div className="flex h-full overflow-hidden bg-white">
      {/* Middle column — desktop (md+) */}
      {middleColumn && (
        <aside
          className="hidden w-72 flex-col border-r border-slate-200 bg-slate-50/40 md:flex"
          aria-label={middleColumnLabel ?? "Sidebar"}
        >
          {middleColumn}
        </aside>
      )}

      {/* Mobile backdrop for history sheet */}
      {middleColumn && historyOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm md:hidden"
          onClick={() => setHistoryOpen(false)}
        />
      )}

      {/* Middle column — mobile slide-in sheet from the right */}
      {middleColumn && (
        <aside
          className={`fixed inset-y-0 right-0 z-40 flex w-[88vw] max-w-[340px] flex-col border-l border-slate-200 bg-slate-50/95 backdrop-blur transition-transform md:hidden ${
            historyOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label={middleColumnLabel ?? "Sidebar"}
          onClick={(e) => {
            const target = (e.target as HTMLElement).closest("button, a");
            if (target && !target.hasAttribute("data-keep-sheet-open")) {
              setHistoryOpen(false);
            }
          }}
        >
          <button
            type="button"
            onClick={() => setHistoryOpen(false)}
            className="absolute right-3 top-3 z-10 rounded-md p-1.5 text-slate-500 hover:bg-slate-200/70"
            aria-label="Close history"
          >
            <X className="size-4" aria-hidden />
          </button>
          {middleColumn}
        </aside>
      )}

      {/* Main */}
      <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
        {middleColumn && (
          <button
            type="button"
            onClick={() => setHistoryOpen(true)}
            className="absolute right-3 top-3 z-20 rounded-md p-2 text-slate-500 hover:bg-slate-100 md:hidden"
            aria-label="Open history"
          >
            <History className="size-4" aria-hidden />
          </button>
        )}
        {children}
      </main>
    </div>
  );
}

