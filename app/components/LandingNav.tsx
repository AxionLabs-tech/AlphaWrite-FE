"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronRight } from "lucide-react";
import { Skeleton } from "./Skeleton";
import { useAuthOptional } from "@/services/hooks";
import { useAuthModal } from "@/app/context/AuthModalContext";

function UserNavPillSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-full bg-slate-100 px-3 py-2">
      <Skeleton className="size-8 shrink-0 rounded-full" />
      <div className="min-w-0 flex-1 space-y-1.5">
        <Skeleton className="h-3.5 w-28" />
        <Skeleton className="h-3 w-16" />
      </div>
      <Skeleton className="size-4 shrink-0 rounded" />
    </div>
  );
}

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/#pricing", label: "Pricing" },
  { href: "https://discord.gg/alphawrite", label: "Discord", external: true },
];

function truncateEmail(email: string, maxLength = 20) {
  if (email.length <= maxLength) return email;
  const local = email.split("@")[0];
  const domain = email.split("@")[1] ?? "";
  if (local.length + 4 >= maxLength) return `${local.slice(0, maxLength - 4)}@${domain.slice(0, 1)}...`;
  return `${local}@${domain.slice(0, 1)}...`;
}

function UserNavPill({
  email,
  name,
  image,
  onNavigate,
}: {
  email: string;
  name?: string;
  image?: string;
  onNavigate?: () => void;
}) {
  const initial = (name?.trim()?.[0] ?? email.trim()[0] ?? "?").toUpperCase();
  const displayEmail = truncateEmail(email);

  return (
    <Link
      href="/dashboard"
      onClick={onNavigate}
      className="flex items-center gap-3 rounded-full bg-slate-50 px-3 py-1.5 ring-1 ring-slate-200 transition hover:bg-slate-100"
    >
      {image ? (
        <div className="relative size-8 shrink-0 overflow-hidden rounded-full bg-slate-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" className="size-full object-cover" />
        </div>
      ) : (
        <div
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#8B5CF6] text-xs font-semibold text-white"
          aria-hidden
        >
          {initial}
        </div>
      )}
      <div className="min-w-0 flex-1 text-left">
        <p className="truncate text-sm font-medium text-slate-900">{displayEmail}</p>
        <p className="text-xs text-slate-500">Dashboard</p>
      </div>
      <ChevronRight className="size-4 shrink-0 text-slate-400" aria-hidden />
    </Link>
  );
}

export default function LandingNav() {
  const { openAuthModal } = useAuthModal();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const auth = useAuthOptional();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 transition hover:opacity-80"
          >
            <Image
              alt="AlphaWrite"
              src="/alphawrites.png"
              width={120}
              height={90}
              className="h-20 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  {item.label}
                </Link>
              )
            )}
            <span className="mx-2 h-5 w-px bg-slate-200" aria-hidden />
            <div className="flex items-center gap-2">
              {auth?.isLoading ? (
                <UserNavPillSkeleton />
              ) : auth?.isAuthenticated && auth.user ? (
                <UserNavPill
                  email={auth.user.email}
                  name={auth.user.name}
                  image={auth.user.image}
                />
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      openAuthModal();
                    }}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      openAuthModal();
                    }}
                    className="rounded-lg bg-[#8B5CF6] px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-600"
                  >
                    Try for free
                  </button>
                </>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex size-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 md:hidden"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile nav panel */}
        {mobileOpen && (
          <div className="border-t border-slate-100 bg-white/95 px-4 py-4 backdrop-blur-xl md:hidden">
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((item) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-4">
                {auth?.isLoading ? (
                  <UserNavPillSkeleton />
                ) : auth?.isAuthenticated && auth.user ? (
                  <UserNavPill
                    email={auth.user.email}
                    name={auth.user.name}
                    image={auth.user.image}
                    onNavigate={() => setMobileOpen(false)}
                  />
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        openAuthModal();
                      }}
                      className="rounded-lg border border-slate-200 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      Login
                    </button>
                    <Link
                      href="/#humanizer"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg bg-[#8B5CF6] py-2.5 text-center text-sm font-medium text-white transition hover:bg-violet-600"
                    >
                      Try for free
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
