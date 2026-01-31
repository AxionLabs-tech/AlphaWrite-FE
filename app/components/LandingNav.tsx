"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, Menu, X } from "lucide-react";
import AuthModal from "./AuthModal";

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/#pricing", label: "Pricing" },
  { href: "https://discord.gg/alphawrite", label: "Discord", external: true },
];

export default function LandingNav() {
  const [authOpen, setAuthOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
            <span className="flex size-9 items-center justify-center rounded-xl bg-[#8B5CF6] text-white shadow-sm">
              <Zap className="size-5" aria-hidden />
            </span>
            <span className="hidden sm:inline">AlphaWrite</span>
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
              <Link
                href="/#humanizer"
                className="rounded-xl bg-[#8B5CF6] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-500/20 transition hover:bg-violet-600 hover:shadow-violet-500/30"
              >
                Try for free
              </Link>
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
              </div>
            </nav>
          </div>
        )}
      </header>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
