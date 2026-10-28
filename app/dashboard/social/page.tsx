"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SocialPage() {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden px-6 py-6 sm:px-10">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Home
      </Link>
      <h1 className="mt-8 text-xl font-bold text-slate-900">Social</h1>
      <p className="mt-3 text-sm text-slate-500">
        Follow classmates and share decks — coming soon.
      </p>
    </div>
  );
}
