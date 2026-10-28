"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ChevronRight,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuthOptional, useSubscriptionStatus } from "@/services/hooks";
import { BrandLogo } from "@/app/components/BrandLogo";
import { DashboardTopBar } from "@/app/components/DashboardTopBar";
import { useSavedDecks } from "@/app/hooks/useSavedDecks";
import { truncateDeckTitle } from "@/lib/savedDecks";

type NavItem = {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  imageSrc?: string;
  /** Tune perceived size when PNG padding differs between exports */
  imageVisual?: "default" | "compact" | "prominent";
  exact?: boolean;
  iconColor: string;
};

/** Fixed slot so labels line up regardless of icon aspect ratio */
const NAV_ICON_SLOT =
  "flex h-9 w-10 shrink-0 items-center justify-center";

const NAV_IMAGE_VISUAL: Record<
  NonNullable<NavItem["imageVisual"]>,
  string
> = {
  default: "max-h-8 max-w-9 object-contain",
  compact: "max-h-[26px] max-w-8 object-contain",
  prominent: "max-h-9 max-w-10 object-contain scale-[1.15]",
};

const PRIMARY_NAV: NavItem[] = [
  {
    href: "/dashboard",
    label: "Home",
    imageSrc: "/icons/nav-home.png",
    exact: true,
    iconColor: "text-sky-600",
  },
  {
    href: "/dashboard/decks",
    label: "My deck",
    imageSrc: "/icons/nav-deck.png",
    iconColor: "text-[#6642B6]",
  },
];

/** Routes grouped under Writing & detection */
export const WRITING_AREA_PATHS = [
  "/dashboard/writing",
  "/dashboard/write",
  "/dashboard/humanize",
  "/dashboard/history",
  "/dashboard/settings/style",
] as const;

const WRITING_NAV: NavItem[] = [
  {
    href: "/dashboard/writing",
    label: "Overview",
    imageSrc: "/icons/nav-overview-dashboard.png",
    imageVisual: "prominent",
    exact: true,
    iconColor: "text-slate-600",
  },
  {
    href: "/dashboard/write",
    label: "AI Writer",
    imageSrc: "/icons/nav-ai-writer.png",
    iconColor: "text-violet-600",
  },
  {
    href: "/dashboard/humanize",
    label: "Humanizer & Detector",
    imageSrc: "/icons/nav-humanizer.png",
    imageVisual: "prominent",
    iconColor: "text-amber-600",
  },
];

function isNavActive(pathname: string, item: NavItem): boolean {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

function NavRow({
  item,
  active,
  onClose,
}: {
  item: NavItem;
  active: boolean;
  onClose?: () => void;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onClose}
      className={`flex items-center gap-2.5 rounded-xl px-2.5 py-3 text-sm font-medium transition ${
        active
          ? "bg-slate-100 text-slate-900"
          : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      {item.imageSrc ? (
        <span className={NAV_ICON_SLOT}>
          <Image
            src={item.imageSrc}
            alt=""
            width={40}
            height={32}
            className={
              NAV_IMAGE_VISUAL[item.imageVisual ?? "default"]
            }
          />
        </span>
      ) : Icon ? (
        <span className={NAV_ICON_SLOT}>
          <Icon
            strokeWidth={2}
            className={`size-5 ${active ? "text-[#6642B6]" : item.iconColor}`}
            aria-hidden
          />
        </span>
      ) : null}
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

function Sidebar({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const auth = useAuthOptional();
  const pathname = usePathname() ?? "";
  const { data: subscription } = useSubscriptionStatus();
  const credits = subscription?.remaining_credits ?? null;
  const savedDecks = useSavedDecks();

  const inWritingArea = useMemo(
    () =>
      WRITING_AREA_PATHS.some(
        (p) => pathname === p || pathname.startsWith(`${p}/`),
      ),
    [pathname],
  );

  const handleSignOut = async () => {
    try {
      await auth?.signOut?.();
    } finally {
      router.replace("/");
    }
  };

  const name =
    auth?.user?.name ||
    auth?.user?.email?.split("@")[0] ||
    "Account";
  const email = auth?.user?.email ?? "";
  const avatar = auth?.user?.image;
  const initial = (name || "A").charAt(0).toUpperCase();

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden py-5 pl-3.5 pr-4">
      <Link
        href="/dashboard"
        onClick={onClose}
        className="rounded-lg py-1 pl-0.5 transition hover:opacity-90"
        aria-label="Alpha Writes home"
      >
        <BrandLogo size="md" variant="light" />
      </Link>

      <nav className="mt-6 flex min-h-0 flex-1 flex-col gap-6 overflow-hidden" aria-label="Dashboard">
        <div>
          <p className="mb-3 pl-1 text-[11px] font-bold uppercase tracking-wide text-slate-400">
            General
          </p>
          <div className="space-y-1">
            {PRIMARY_NAV.map((item) => (
              <NavRow
                key={item.href}
                item={item}
                active={isNavActive(pathname, item)}
                onClose={onClose}
              />
            ))}
          </div>
        </div>

        <div>
          <p
            className={`mb-3 pl-1 text-[11px] font-bold uppercase tracking-wide ${
              inWritingArea ? "text-[#6642B6]" : "text-slate-400"
            }`}
          >
            Writing &amp; detection
          </p>
          <div className="space-y-1">
            {WRITING_NAV.map((item) => (
              <NavRow
                key={item.href}
                item={item}
                active={
                  item.href === "/dashboard/writing"
                    ? pathname === "/dashboard/writing" ||
                      pathname.startsWith("/dashboard/history") ||
                      pathname.startsWith("/dashboard/settings/style")
                    : isNavActive(pathname, item)
                }
                onClose={onClose}
              />
            ))}
          </div>
        </div>

        {savedDecks.length > 0 && (
          <div className="min-h-0 flex-1 overflow-y-auto px-1">
            <p className="mb-2 pl-1 text-[11px] font-bold uppercase tracking-wide text-slate-400">
              Saved
            </p>
            <ul className="space-y-0.5">
              {savedDecks.slice(0, 5).map((deck) => (
                <li key={deck.id}>
                  <Link
                    href="/dashboard/decks"
                    onClick={onClose}
                    className="flex items-center gap-2.5 rounded-xl px-2 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <span
                      className={`size-3 shrink-0 rounded-sm ${deck.headerColor}`}
                      aria-hidden
                    />
                    <span className="truncate">
                      {truncateDeckTitle(deck.title)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      <div className="mt-4 space-y-1 pt-4">
        <Link
          href="/dashboard/settings"
          onClick={onClose}
          className="block rounded-xl px-3 py-2 text-xs transition hover:bg-slate-50"
        >
          <p className="font-semibold text-slate-800">
            {credits !== null ? `${credits} credits left` : "Settings"}
          </p>
          <p className="mt-0.5 text-slate-500">Plan &amp; preferences</p>
        </Link>

        <Link
          href="/dashboard/settings"
          onClick={onClose}
          className="flex items-center gap-2.5 rounded-xl px-2 py-2 transition hover:bg-slate-50"
        >
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatar}
              alt=""
              className="size-8 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-[#6642B6]">
              {initial}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-slate-900">{name}</p>
            {email && (
              <p className="truncate text-[10px] text-slate-400">{email}</p>
            )}
          </div>
          <ChevronRight className="size-3.5 text-slate-300" aria-hidden />
        </Link>

        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
        >
          <LogOut strokeWidth={2} className="size-4" aria-hidden />
          Sign out
        </button>
      </div>
    </div>
  );
}

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-dvh max-h-dvh w-full overflow-hidden bg-[#F3F4F6] lg:py-2 lg:pr-2 lg:pl-0">
      <div className="flex h-full min-h-0 w-full overflow-hidden">
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-[2px] lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-50 flex h-full max-h-dvh w-[280px] flex-col overflow-hidden bg-[#F7F7F8] transition-transform lg:relative lg:z-0 lg:translate-x-0 lg:shrink-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="absolute right-3 top-3 rounded-lg p-1.5 text-slate-400 hover:bg-white/80 lg:hidden"
            aria-label="Close menu"
          >
            <X className="size-4" aria-hidden />
          </button>
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </aside>

        <div className="relative flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white lg:rounded-3xl lg:shadow-[0_8px_40px_-16px_rgba(15,23,42,0.12)]">
          <div className="flex shrink-0 items-center gap-3 px-4 py-3 lg:px-6 lg:py-3.5">
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Open menu"
              >
                <Menu className="size-5" aria-hidden />
              </button>
              <BrandLogo size="sm" variant="light" />
            </div>
            <div className="min-w-0 flex-1" aria-hidden />
            <DashboardTopBar />
          </div>
          <main className="min-h-0 flex-1 overflow-hidden">{children}</main>
        </div>
      </div>
    </div>
  );
}
