"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  ChevronRight,
  Globe2,
  HelpCircle,
  Mail,
  MessageCircle,
  Share2,
  Shield,
  Sparkles,
  Trash2,
  Type,
  Volume2,
  Vibrate,
} from "lucide-react";
import { useAuth, useSubscriptionStatus } from "@/services/hooks";

const STORAGE_KEY = "alphawrite.settings.v1";

type SettingsState = {
  sounds: boolean;
  haptics: boolean;
  darkMode: boolean;
  doNotDisturb: boolean;
  emailReminders: boolean;
  cardReminders: boolean;
  decksPublic: boolean;
  fontSize: "default" | "large";
  language: string;
};

const DEFAULT_SETTINGS: SettingsState = {
  sounds: true,
  haptics: true,
  darkMode: false,
  doNotDisturb: false,
  emailReminders: true,
  cardReminders: true,
  decksPublic: false,
  fontSize: "default",
  language: "en-US",
};

function loadSettings(): SettingsState {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function planLabel(plan: string): string {
  const p = plan.toLowerCase();
  if (p === "premium") return "Premium";
  if (p === "pro") return "Pro";
  if (p === "basic") return "Basic";
  return "Basic";
}

function planFeatures(plan: string): string[] {
  const p = plan.toLowerCase();
  if (p === "premium" || p === "pro") {
    return [
      "Higher humanize & detect limits",
      "More AI writer credits each month",
      "Priority study & writing features",
      "Unlimited saved decks on your account",
    ];
  }
  if (p === "basic") {
    return [
      "Unlimited cards, decks and quizzes",
      "Losing 15 lives in the quiz leads to a 10 minute timeout",
      "Limited AI suggestions & extra questions per day",
    ];
  }
  return [
    "Study decks saved on this device",
    "250 words per humanize request",
    "Limited credits — upgrade for more",
  ];
}

export default function SettingsPage() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { data: subscription } = useSubscriptionStatus();
  const [settings, setSettings] = useState<SettingsState>(DEFAULT_SETTINGS);
  const [mounted, setMounted] = useState(false);

  const plan = (
    subscription?.plan_type ??
    user?.plan_type ??
    Cookies.get("alphawritePlan") ??
    "basic"
  ).toLowerCase();
  const displayPlan = planLabel(plan);
  const isPaid = ["basic", "pro", "premium"].includes(plan) && plan !== "free";
  const showTryUnlimited = !isPaid || plan === "basic";

  useEffect(() => {
    setSettings(loadSettings());
    setMounted(true);
  }, []);

  const persist = useCallback((next: SettingsState) => {
    setSettings(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const toggle = useCallback(
    (key: keyof SettingsState) => {
      if (key === "fontSize" || key === "language") return;
      persist({ ...settings, [key]: !settings[key] });
    },
    [persist, settings]
  );

  const handleSignOut = async () => {
    await signOut?.();
    router.replace("/");
  };

  if (!mounted) {
    return (
      <div className="flex h-full min-h-0 flex-col overflow-hidden px-4 py-4 sm:px-6 lg:px-8">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="mx-auto max-w-lg animate-pulse space-y-4 py-4">
            <div className="h-40 rounded-3xl bg-slate-100" />
            <div className="h-24 rounded-2xl bg-slate-100" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden px-4 py-4 sm:px-6 lg:px-8">
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-12">
        <div className="mx-auto max-w-lg">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Settings
          </h1>

          {/* Current plan */}
          <section className="mt-6 overflow-hidden rounded-3xl bg-linear-to-br from-[#8D69F3] via-[#6642B6] to-[#4C1D95] p-5 text-white shadow-lg shadow-violet-500/25">
            <p className="text-xs font-bold uppercase tracking-wider text-white/70">
              Current plan
            </p>
            <div className="mt-3 flex gap-4">
              <div
                className="flex shrink-0 flex-col justify-center text-center font-extrabold leading-[0.95] text-white"
                aria-hidden
              >
                {displayPlan.split("").map((ch, i) => (
                  <span
                    key={`${ch}-${i}`}
                    className="text-[1.35rem] sm:text-2xl"
                  >
                    {ch}
                  </span>
                ))}
              </div>
              <ul className="min-w-0 flex-1 space-y-2 text-sm leading-snug text-white/90">
                {planFeatures(plan).map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-white/80" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            {showTryUnlimited && (
              <Link
                href="/dashboard/account"
                className="mt-5 flex w-full items-center justify-center rounded-2xl bg-white py-3 text-sm font-bold text-[#4C1D95] shadow-sm transition hover:bg-white/95"
              >
                Try Unlimited
              </Link>
            )}
          </section>

          {/* Invite */}
          <SettingsCard className="mt-4">
            <button
              type="button"
              className="flex w-full items-center gap-3 text-left"
              onClick={() => {
                void navigator.clipboard.writeText(window.location.origin);
              }}
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-violet-100 text-[#6642B6]">
                <Share2 className="size-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-slate-900">Invite friends</span>
                <span className="block text-sm text-slate-500">
                  Get 1,000 coins per friend you invite
                </span>
              </span>
              <ChevronRight className="size-4 shrink-0 text-slate-300" />
            </button>
          </SettingsCard>

          {/* Help */}
          <SettingsGroup title="Help">
            <SettingsRow
              icon={<MessageCircle className="size-5" />}
              label="Contact AlphaWrite"
              href="mailto:support@alphawrite.com"
              external
            />
            <SettingsRow
              icon={<HelpCircle className="size-5" />}
              label="Help"
              href="/#faq"
            />
            <SettingsRow
              icon={<Sparkles className="size-5" />}
              label="Join our Discord"
              href="https://discord.com"
              external
            />
          </SettingsGroup>

          {/* Preferences */}
          <SettingsGroup title="Account settings">
            <SettingsRow
              icon={<span className="text-lg leading-none">🇺🇸</span>}
              label="Language"
              trailing={
                <select
                  value={settings.language}
                  onChange={(e) =>
                    persist({ ...settings, language: e.target.value })
                  }
                  className="rounded-lg border-0 bg-transparent text-sm font-medium text-slate-600 focus:ring-0"
                >
                  <option value="en-US">English (US)</option>
                </select>
              }
            />
            <SettingsToggle
              icon={<Volume2 className="size-5" />}
              label="Sounds"
              checked={settings.sounds}
              onChange={() => toggle("sounds")}
            />
            <SettingsToggle
              icon={<Vibrate className="size-5" />}
              label="Haptics"
              checked={settings.haptics}
              onChange={() => toggle("haptics")}
            />
            <SettingsToggle
              icon={<MoonIcon />}
              label="Dark mode"
              checked={settings.darkMode}
              onChange={() => toggle("darkMode")}
            />
            <SettingsToggle
              icon={<Shield className="size-5" />}
              label="Do not disturb"
              checked={settings.doNotDisturb}
              onChange={() => toggle("doNotDisturb")}
            />
            <SettingsToggle
              icon={<Mail className="size-5" />}
              label="Email reminders"
              checked={settings.emailReminders}
              onChange={() => toggle("emailReminders")}
            />
            <SettingsToggle
              icon={<Globe2 className="size-5" />}
              label="Card reminder notifications"
              checked={settings.cardReminders}
              onChange={() => toggle("cardReminders")}
            />
            <SettingsToggle
              icon={<Globe2 className="size-5" />}
              label="Decks are public"
              checked={settings.decksPublic}
              onChange={() => toggle("decksPublic")}
            />
            <SettingsRow
              icon={<Type className="size-5" />}
              label="Font size"
              trailing={
                <select
                  value={settings.fontSize}
                  onChange={(e) =>
                    persist({
                      ...settings,
                      fontSize: e.target.value as SettingsState["fontSize"],
                    })
                  }
                  className="rounded-lg border-0 bg-transparent text-sm font-medium text-slate-600 focus:ring-0"
                >
                  <option value="default">Default</option>
                  <option value="large">Large</option>
                </select>
              }
            />
          </SettingsGroup>

          {/* Account */}
          <SettingsGroup title="Account">
            <SettingsRow
              label="Account information"
              href="/dashboard/account"
            />
            <SettingsRow label="Sign in and security" href="/dashboard/account" />
            <button
              type="button"
              onClick={() => void handleSignOut()}
              className="flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Sign out
              <ChevronRight className="size-4 text-slate-300" />
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-between border-t border-slate-100 px-4 py-3.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50/50"
            >
              Delete account
              <Trash2 className="size-4 opacity-70" />
            </button>
          </SettingsGroup>

          <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-medium text-slate-500">
            <Link href="/privacy" className="hover:text-slate-800">
              Privacy policy
            </Link>
            <Link href="/terms" className="hover:text-slate-800">
              Terms of use
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SettingsCard({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl bg-white p-4 ring-1 ring-slate-200/80 ${className}`}
    >
      {children}
    </div>
  );
}

function SettingsGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <h2 className="mb-2 px-1 text-xs font-bold uppercase tracking-wide text-slate-400">
        {title}
      </h2>
      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200/80">
        {children}
      </div>
    </section>
  );
}

function SettingsRow({
  icon,
  label,
  href,
  external,
  trailing,
}: {
  icon?: React.ReactNode;
  label: string;
  href?: string;
  external?: boolean;
  trailing?: React.ReactNode;
}) {
  const inner = (
    <>
      <span className="flex min-w-0 flex-1 items-center gap-3">
        {icon ? (
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
            {icon}
          </span>
        ) : null}
        <span className="text-sm font-semibold text-slate-800">{label}</span>
      </span>
      {trailing ?? <ChevronRight className="size-4 shrink-0 text-slate-300" />}
    </>
  );

  const className =
    "flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition hover:bg-slate-50 border-b border-slate-100 last:border-b-0";

  if (href) {
    if (external) {
      return (
        <a href={href} className={className} target="_blank" rel="noopener noreferrer">
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
}

function SettingsToggle({
  icon,
  label,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3.5 last:border-b-0">
      <span className="flex min-w-0 flex-1 items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
          {icon}
        </span>
        <span className="text-sm font-semibold text-slate-800">{label}</span>
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={onChange}
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          checked ? "bg-[#6642B6]" : "bg-slate-200"
        }`}
      >
        <span
          className={`absolute top-0.5 size-6 rounded-full bg-white shadow transition ${
            checked ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}
