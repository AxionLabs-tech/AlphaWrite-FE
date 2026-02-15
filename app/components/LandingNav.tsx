"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronRight } from "lucide-react";
import AuthModal from "./AuthModal";
import { Skeleton } from "./Skeleton";
import { useAuthOptional } from "@/services/hooks";

function UserNavPillSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-100 px-3 py-2">
      <Skeleton className="size-9 shrink-0 rounded-full" />
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
      className="flex items-center gap-3 rounded-xl bg-slate-100 px-3 py-2 shadow-sm transition hover:bg-slate-200/80"
    >
      {image ? (
        <div className="relative size-9 shrink-0 overflow-hidden rounded-full bg-slate-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" className="size-full object-cover" />
        </div>
      ) : (
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-400 text-sm font-semibold text-white"
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
  const [authOpen, setAuthOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const auth = useAuthOptional();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once in case already scrolled
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled
            ? "border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur"
            : ""
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 text-xl font-bold text-slate-900 transition hover:text-[#8B5CF6]"
          >
            <span className="items-center justify-center mb-6">
              <Image
              alt="logo"
              src="/alphawrite.png"
              width={160}
              height={120}
              />
            </span>
            {/* <span className="hidden sm:inline ">AlphaWrite</span> */}
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-slate-600 transition hover:text-[#8B5CF6]"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-slate-600 transition hover:text-[#8B5CF6]"
                >
                  {item.label}
                </Link>
              )
            )}
            <span className="h-4 w-px bg-slate-200" aria-hidden />
            <div className="flex items-center gap-3">
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
                      setAuthOpen(true);
                    }}
                    className="rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-violet-200 hover:bg-violet-50/50 hover:text-[#8B5CF6]"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setAuthOpen(true);
                    }}
                    className="rounded-xl bg-[#8B5CF6] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-500/20 transition hover:bg-violet-600 hover:shadow-violet-500/30"
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
            className="flex size-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 md:hidden"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile nav panel */}
        {mobileOpen && (
          <div className="border-t border-slate-200/80 bg-white/95 px-4 py-4 backdrop-blur md:hidden">
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((item) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#8B5CF6]"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#8B5CF6]"
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="mt-2 flex flex-col gap-2 border-t border-slate-200/80 pt-4">
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
                        setAuthOpen(true);
                      }}
                      className="rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Login
                    </button>
                    <Link
                      href="/#humanizer"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-xl bg-[#8B5CF6] py-3 text-center text-sm font-semibold text-white transition hover:bg-violet-600"
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
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
