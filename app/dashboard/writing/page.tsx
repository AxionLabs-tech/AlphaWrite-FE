"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Feather,
  ScanSearch,
} from "lucide-react";

type Tool = {
  href: string;
  title: string;
  description: string;
  tone: string;
  iconTone: string;
  cta: string;
  tag?: string;
  featured?: boolean;
  imageSrc?: string;
  useImage?: boolean;
  plainImage?: boolean;
  icon?: typeof ScanSearch;
};

const TOOLS: Tool[] = [
  {
    href: "/dashboard/write",
    title: "AI Writer",
    description: "Chat workspace for drafts, essays, and rewrites.",
    imageSrc: "/icons/nav-ai-writer.png",
    useImage: true,
    tone: "from-violet-500/10 to-violet-500/0",
    iconTone: "bg-linear-to-br from-violet-200 to-violet-300 text-violet-700",
    cta: "Open writer",
    tag: "Popular",
    featured: true,
  },
  {
    href: "/dashboard/humanize",
    title: "Humanizer & Detector",
    description: "Humanize text and scan for AI patterns in one flow.",
    imageSrc: "/icons/nav-humanizer.png",
    useImage: true,
    plainImage: true,
    tone: "from-amber-400/10 to-amber-400/0",
    iconTone: "bg-transparent shadow-none",
    cta: "Scan & humanize",
  },
  {
    href: "/dashboard/history",
    title: "History",
    description: "Past humanizations, detections, and outputs.",
    icon: Clock3,
    tone: "from-teal-400/10 to-teal-400/0",
    iconTone: "bg-linear-to-br from-teal-200 to-teal-300 text-teal-800",
    cta: "View history",
  },
  {
    href: "/dashboard/settings/style",
    title: "My Writing Style",
    description: "Train the AI on how you usually write.",
    icon: Feather,
    tone: "from-rose-400/10 to-rose-400/0",
    iconTone: "bg-linear-to-br from-rose-200 to-rose-300 text-rose-800",
    cta: "Tune style",
  },
];

export default function WritingHubPage() {
  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden px-5 py-4 sm:px-8 lg:px-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-105 bg-[radial-gradient(60%_55%_at_50%_0%,rgba(141,105,243,0.14),transparent_70%)]"
      />

      <div className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain pb-10">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-800"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Home
        </Link>

        {/* Header */}
        <header className="mt-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#6642B6] shadow-sm ring-1 ring-violet-100 backdrop-blur">
            Writing &amp; detection
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to{" "}
            <span className="bg-linear-to-r from-[#8D69F3] to-[#6642B6] bg-clip-text text-transparent">
              write &amp; refine
            </span>
          </h1>
          <p className="mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
            All your writing and detection tools in one place — separate from Study.
          </p>
        </header>

        {/* Tool grid */}
        <ul className="mt-10 grid max-w-5xl gap-4 sm:grid-cols-2">
          {TOOLS.map((tool) => (
            <li key={tool.href}>
              <ToolCard tool={tool} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  return (
    <Link
      href={tool.href}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-5 ring-1 ring-slate-200/70 transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-slate-300"
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-linear-to-br ${tool.tone} opacity-0 transition group-hover:opacity-100`}
      />

      {tool.tag && (
        <span className="absolute right-4 top-4 rounded-full bg-violet-50 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-violet-700 ring-1 ring-violet-100">
          {tool.tag}
        </span>
      )}

      <div className="relative flex items-start gap-4">
        <span
          className={`flex size-12 shrink-0 items-center justify-center rounded-2xl shadow-inner ${tool.iconTone}`}
        >
          {tool.useImage && tool.imageSrc ? (
            <Image
              src={tool.imageSrc}
              alt=""
              width={tool.plainImage ? 40 : 28}
              height={tool.plainImage ? 40 : 28}
              className={
                tool.plainImage ? "size-10 object-contain" : "size-7 object-contain"
              }
            />
          ) : Icon ? (
            <Icon strokeWidth={2.2} className="size-5" aria-hidden />
          ) : null}
        </span>
        <div className="min-w-0 flex-1 pt-0.5">
          <h2 className="text-base font-bold text-slate-900">{tool.title}</h2>
          <p className="mt-1 text-sm leading-snug text-slate-500">
            {tool.description}
          </p>
        </div>
      </div>

      <div className="relative mt-5 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#6642B6]">
          {tool.cta}
          <ArrowRight
            strokeWidth={2.5}
            className="size-3.5 transition group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
        <ArrowUpRight
          strokeWidth={2}
          className="size-4 text-slate-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#6642B6]"
          aria-hidden
        />
      </div>
    </Link>
  );
}
