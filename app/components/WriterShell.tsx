"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  CreditCard,
  Home,
  LogOut,
  MessageSquare,
  Sparkles,
  User,
  Wand2,
  X,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { useAuthOptional, useSubscriptionStatus } from "@/services/hooks";

const NAV = [
  {
    href: "/write",
    label: "AI Writer",
    icon: MessageSquare,
    match: (p: string) => p === "/write" || p.startsWith("/write/quick"),
  },
  {
    href: "/settings/style",
    label: "My Writing Style",
    icon: Wand2,
    match: (p: string) => p.startsWith("/settings/style"),
  },
] as const;

function AccountSidebar({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const auth = useAuthOptional();
  const pathname = usePathname() ?? "";
  const { data: subscription } = useSubscriptionStatus();

  const displayName = auth?.user?.name || auth?.user?.email?.split("@")[0] || "Writer";
  const credits = subscription?.remaining_credits ?? null;

  const handleSignOut = async () => {
    try {
      await auth?.signOut?.();
    } finally {
      router.replace("/");
    }
  };

  const isDashboard = pathname === "/dashboard";

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Brand */}
      <div className="flex items-center justify-between px-4 pt-5 pb-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 transition duration-200 hover:opacity-80"
          aria-label="AlphaWrite home"
        >
          <span className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden">
            <Image
              src="/applogo.png"
              alt=""
              width={80}
              height={80}
              priority
              className="size-[3.25rem] max-w-none"
            />
          </span>
          <span className="bg-gradient-to-r from-violet-700 to-fuchsia-600 bg-clip-text text-[18px] font-bold tracking-tight text-transparent">
            AlphaWrite
          </span>
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 lg:hidden"
          aria-label="Close menu"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>

      {/* Primary nav */}
      <nav className="mt-2 flex-1 space-y-1.5 px-3">
        {NAV.map(({ href, label, icon: Icon, match }) => {
          const active = match(pathname);
          return (
            <Link
              key={label}
              href={href}
              onClick={onClose}
              className={`group flex items-center gap-3 rounded-xl px-3.5 py-3 text-[14px] tracking-tight transition-all duration-200 ${
                active
                  ? "bg-gradient-to-r from-[#8B5CF6] to-violet-600 font-semibold text-white shadow-lg shadow-violet-500/40"
                  : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon
                className={`size-[18px] transition ${
                  active
                    ? "text-white"
                    : "text-slate-400 group-hover:text-slate-600"
                }`}
                aria-hidden
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 pt-3">
        {/* User card */}
        <div className="mb-2 flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-50/60 p-2.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-bold text-white shadow-sm">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">{displayName}</p>
            <p className="truncate text-[11px] text-slate-500">
              {credits !== null ? `${credits} credits` : "—"}
            </p>
          </div>
        </div>

        {/* Footer nav */}
        <div className="space-y-0.5">
          <Link
            href="/dashboard"
            onClick={onClose}
            className={`group flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] tracking-tight transition-all duration-200 ${
              isDashboard
                ? "bg-gradient-to-r from-[#8B5CF6] to-violet-600 font-semibold text-white shadow-md shadow-violet-500/40"
                : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <User
              className={`size-[16px] transition ${
                isDashboard
                  ? "text-white"
                  : "text-slate-400 group-hover:text-slate-600"
              }`}
              aria-hidden
            />
            <span>Profile</span>
          </Link>
          <Link
            href="/dashboard"
            onClick={onClose}
            className="group flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium tracking-tight text-slate-600 transition-all duration-200 hover:bg-slate-50 hover:text-slate-900"
          >
            <CreditCard
              className="size-[16px] text-slate-400 transition group-hover:text-slate-600"
              aria-hidden
            />
            <span>Subscription</span>
          </Link>
          <Link
            href="/"
            onClick={onClose}
            className="group flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium tracking-tight text-slate-600 transition-all duration-200 hover:bg-slate-50 hover:text-slate-900"
          >
            <Home
              className="size-[16px] text-slate-400 transition group-hover:text-slate-600"
              aria-hidden
            />
            <span>Home</span>
          </Link>
          <button
            type="button"
            onClick={() => void handleSignOut()}
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium tracking-tight text-slate-500 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut
              className="size-[16px] text-slate-400 transition group-hover:text-red-500"
              aria-hidden
            />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-dvh overflow-hidden bg-white">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left account sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-slate-200 bg-white transition-transform lg:static lg:inset-auto lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <AccountSidebar onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Middle column (optional) */}
      {middleColumn && (
        <aside
          className="hidden w-72 flex-col border-r border-slate-200 bg-slate-50/40 md:flex"
          aria-label={middleColumnLabel ?? "Sidebar"}
        >
          {middleColumn}
        </aside>
      )}

      {/* Main */}
      <main className="relative flex flex-1 flex-col overflow-hidden">
        {/* Mobile open-sidebar button */}
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="absolute left-3 top-3 z-10 rounded-md p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-4" aria-hidden />
        </button>
        {children}
      </main>
    </div>
  );
}

/** Top tab strip used inside the middle column for /write and /write/quick */
export function WriterTabs({ active }: { active: "chat" | "quick" }) {
  return (
    <div className="flex items-center gap-2 border-b border-slate-200/80 px-4 py-3.5">
      <Link
        href="/write"
        className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-semibold transition ${
          active === "chat"
            ? "bg-[#8B5CF6] text-white shadow-sm shadow-violet-500/30"
            : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
        }`}
      >
        <MessageSquare className="size-4" aria-hidden />
        Chat
      </Link>
      <Link
        href="/write/quick"
        className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-semibold transition ${
          active === "quick"
            ? "bg-[#8B5CF6] text-white shadow-sm shadow-violet-500/30"
            : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
        }`}
      >
        <Sparkles className="size-4" aria-hidden />
        Quick Generate
      </Link>
    </div>
  );
}
