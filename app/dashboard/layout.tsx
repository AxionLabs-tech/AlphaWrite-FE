"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User, CreditCard, Home, LogOut, Menu, X, ArrowLeft } from "lucide-react";
import { useAuthOptional } from "@/services/hooks";
import Footer from "@/app/components/Footer";
import { Skeleton } from "@/app/components/Skeleton";
import { DashboardViewProvider, useDashboardView, type DashboardView } from "./DashboardViewContext";

const navItems: { id: DashboardView; label: string; icon: typeof User }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "subscription", label: "Subscription", icon: CreditCard },
];

function DashboardLayoutInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const auth = useAuthOptional();
  const { view, setView } = useDashboardView();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (auth && !auth.isLoading && !auth.isAuthenticated) {
      router.replace("/");
    }
  }, [auth, router]);

  const handleSignOut = async () => {
    if (auth?.signOut) await auth.signOut();
    router.replace("/");
  };

  if (auth?.isLoading) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <aside className="hidden w-72 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
          <div className="flex justify-center border-b border-slate-200 p-6">
            <Skeleton className="h-14 w-32 rounded-lg" />
          </div>
          <div className="border-b border-slate-200 p-4">
            <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
              <Skeleton className="size-10 shrink-0 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-12 w-full rounded-xl" />
            ))}
            <div className="border-t border-slate-200 pt-4">
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </nav>
        </aside>
        <main className="flex-1 p-8">
          <div className="mx-auto max-w-4xl space-y-6">
            <Skeleton className="h-9 w-48" />
            <Skeleton className="h-4 w-72" />
            <Skeleton className="h-40 w-full rounded-2xl" />
          </div>
        </main>
      </div>
    );
  }

  if (!auth?.isAuthenticated) {
    return null;
  }

  const user = auth.user;
  const initial = (user?.name?.trim()?.[0] ?? user?.email?.trim()?.[0] ?? "?").toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Mobile header */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>
        <Link href="/dashboard" className="flex shrink-0">
          <Image src="/alphawrite.png" alt="AlphaWrite" width={160} height={60} className="h-10 w-auto" />
        </Link>
        <div className="w-10" />
      </header>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        >
          <aside
            className="flex h-full w-72 flex-col bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 p-4">
              <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                <Image src="/alphawrite.png" alt="AlphaWrite" width={200} height={75} className="h-12 w-auto" />
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="border-b border-slate-200 p-4">
              <div className="flex items-center gap-3 rounded-xl bg-slate-100 px-3 py-2.5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#8B5CF6] text-sm font-semibold text-white">
                  {initial}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">{user?.name || "User"}</p>
                  <p className="truncate text-xs text-slate-500">{user?.email}</p>
                </div>
              </div>
            </div>
            <nav className="flex-1 space-y-1 p-4">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setView(id);
                    setMobileOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                    view === id ? "bg-[#8B5CF6] text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon className="size-5 shrink-0" />
                  {label}
                </button>
              ))}
              <div className="border-t border-slate-200 pt-4">
                <button
                  type="button"
                  onClick={() => setView("home")}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                    view === "home" ? "bg-[#8B5CF6] text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Home className="size-5 shrink-0" />
                  Home
                </button>
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  <ArrowLeft className="size-5 shrink-0" />
                  Back to site
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    handleSignOut();
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="size-5 shrink-0" />
                  Sign out
                </button>
              </div>
            </nav>
          </aside>
        </div>
      )}

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden w-72 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
          <div className="flex justify-center border-b border-slate-200 p-6">
            <Link href="/dashboard">
              <Image src="/alphawrite.png" alt="AlphaWrite" width={200} height={75} className="h-14 w-auto sm:h-16" />
            </Link>
          </div>
          <div className="border-b border-slate-200 p-4">
            <div className="flex items-center gap-3 rounded-xl bg-slate-100 px-3 py-2.5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#8B5CF6] text-sm font-semibold text-white">
                {initial}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-slate-900">{user?.name || "User"}</p>
                <p className="truncate text-sm text-slate-500">{user?.email}</p>
                {user?.plan_type && (
                  <p className="text-xs font-medium text-[#8B5CF6]">{user.plan_type} plan</p>
                )}
              </div>
            </div>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setView(id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                  view === id ? "bg-[#8B5CF6] text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className="size-5 shrink-0" />
                {label}
              </button>
            ))}
            <div className="border-t border-slate-200 pt-4">
              <button
                type="button"
                onClick={() => setView("home")}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                  view === "home" ? "bg-[#8B5CF6] text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Home className="size-5 shrink-0" />
                Home
              </button>
              <Link
                href="/"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <ArrowLeft className="size-5 shrink-0" />
                Back to site
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <LogOut className="size-5 shrink-0" />
                Sign out
              </button>
            </div>
          </nav>
        </aside>

        <main className="min-h-screen flex-1">
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardViewProvider>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </DashboardViewProvider>
  );
}
