"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Coins,
  Flame,
  HelpCircle,
  Mail,
  SlidersHorizontal,
  Sparkles,
  UserRound,
  Settings,
} from "lucide-react";
import { useAuthOptional } from "@/services/hooks";

const COINS_STORAGE_KEY = "alphawrite.coins";

function readCoins(): number {
  if (typeof window === "undefined") return 0;
  try {
    const n = Number(localStorage.getItem(COINS_STORAGE_KEY));
    return Number.isFinite(n) && n >= 0 ? n : 0;
  } catch {
    return 0;
  }
}

function StatPill({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 shadow-sm ring-1 ring-slate-200/90"
      aria-label={label}
    >
      <span className="flex size-6 items-center justify-center">{icon}</span>
      <span className="min-w-[1.25rem] text-sm font-extrabold tabular-nums text-slate-900">
        {value.toLocaleString()}
      </span>
    </div>
  );
}

const MENU_LINKS = [
  {
    href: "/dashboard/account",
    label: "Profile",
    icon: UserRound,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
  },
  {
    href: "mailto:support@alphawrite.com",
    label: "Contact",
    icon: Mail,
    external: true,
  },
  {
    href: "/#faq",
    label: "Help",
    icon: HelpCircle,
  },
] as const;

/** Gizmo-style streak, coins, and menu */
export function DashboardTopBar() {
  const auth = useAuthOptional();
  const [coins, setCoins] = useState(0);
  const [streak, setStreak] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCoins(readCoins());
    setStreak(0);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [menuOpen]);

  const name =
    auth?.user?.name ||
    auth?.user?.email?.split("@")[0] ||
    "Profile";

  return (
    <div className="flex items-center gap-2 sm:gap-2.5">
      <StatPill
        label="Study streak"
        value={streak}
        icon={
          <Flame
            className="size-[18px] fill-orange-500 text-orange-500"
            strokeWidth={2}
          />
        }
      />
      <StatPill
        label="Coins"
        value={coins}
        icon={
          <Coins className="size-[18px] text-amber-500" strokeWidth={2.2} aria-hidden />
        }
      />

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-200/90 transition hover:bg-slate-50 active:scale-[0.98]"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-haspopup="menu"
        >
          <SlidersHorizontal className="size-5" strokeWidth={2.2} aria-hidden />
        </button>

        {menuOpen && (
          <div
            role="menu"
            className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-56 overflow-hidden rounded-2xl bg-white py-2 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.35)] ring-1 ring-slate-200/90"
          >
            <div className="border-b border-slate-100 px-4 pb-2 pt-1">
              <p className="truncate text-xs font-semibold text-slate-900">{name}</p>
              {auth?.user?.email && (
                <p className="truncate text-[10px] text-slate-400">{auth.user.email}</p>
              )}
            </div>

            <Link
              href="/dashboard/account"
              role="menuitem"
              onClick={() => setMenuOpen(false)}
              className="mx-2 mt-2 flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#8D69F3] to-[#6642B6] px-3 py-2.5 text-sm font-bold text-white shadow-md shadow-violet-500/25 transition hover:opacity-95"
            >
              <Sparkles className="size-4" aria-hidden />
              Unlimited
            </Link>

            <ul className="mt-2 px-1">
              {MENU_LINKS.map(({ href, label, icon: Icon, external }) => (
                <li key={label}>
                  {external ? (
                    <a
                      href={href}
                      role="menuitem"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      <Icon className="size-4 text-slate-500" strokeWidth={2} aria-hidden />
                      {label}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      role="menuitem"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      <Icon className="size-4 text-slate-500" strokeWidth={2} aria-hidden />
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
