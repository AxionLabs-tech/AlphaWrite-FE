"use client";

import { useState } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextEditorPanel from "../components/TextEditorPanel";
import OutputPanel from "../components/OutputPanel";
import {
  Sparkles,
  Shield,
  PenLine,
  Zap,
  LogOut,
  DollarSign,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  BookOpen,
  BarChart3,
  Check,
} from "lucide-react";

export default function AppWorkspacePage() {
  const [humanizeInput, setHumanizeInput] = useState("");
  const [humanizeOutput, setHumanizeOutput] = useState("");
  const [detectorInput, setDetectorInput] = useState("");
  const [detectorOutput, setDetectorOutput] = useState("");
  const [essayInput, setEssayInput] = useState("");
  const [essayOutput, setEssayOutput] = useState("");
  const [credits] = useState(5000);
  const outputWordCount = humanizeOutput.trim()
    ? humanizeOutput.trim().split(/\s+/).length
    : 0;

  const handleHumanize = () => {
    setHumanizeOutput(humanizeInput ? `Humanized: ${humanizeInput.slice(0, 100)}…` : "");
  };

  const handleCopy = (text: string) => () => {
    if (text) navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-slate-900 transition hover:text-[#8B5CF6]"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-[#8B5CF6] text-white">
              <Zap className="size-5" aria-hidden />
            </span>
            AlphaWrite
          </Link>
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-violet-100 px-3 py-1.5 text-sm font-medium text-[#8B5CF6]">
              {credits.toLocaleString()} words left
            </span>
            <Link
              href="/sign-in"
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <LogOut className="size-4" aria-hidden />
              Sign in
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <Tabs defaultValue="humanize" className="w-full">
            <TabsList className="mb-8 inline-flex h-12 w-full flex-wrap justify-start gap-1 rounded-2xl bg-slate-100 p-1.5 sm:w-auto sm:flex-nowrap">
              <TabsTrigger
                value="humanize"
                className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <Sparkles className="size-4" aria-hidden />
                Humanize
              </TabsTrigger>
              <TabsTrigger
                value="detector"
                className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <Shield className="size-4" aria-hidden />
                AI Detector
              </TabsTrigger>
              <TabsTrigger
                value="essay"
                className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <PenLine className="size-4" aria-hidden />
                Essay Assistant
              </TabsTrigger>
            </TabsList>

            <TabsContent value="humanize" className="mt-0">
              {humanizeOutput ? (
                <div className="grid gap-8 lg:grid-cols-2">
                  <TextEditorPanel
                    value={humanizeInput}
                    onChange={setHumanizeInput}
                    placeholder="Paste your text here…"
                  />
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-orange-200 bg-orange-50 px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex size-10 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                          <DollarSign className="size-4" aria-hidden />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Insufficient Credits</p>
                          <p className="text-xs text-slate-600">
                            You need 30 more credits for this request.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-orange-500/30 transition hover:from-orange-600 hover:to-red-600"
                      >
                        <Zap className="size-3.5" aria-hidden />
                        Upgrade to Pro
                      </button>
                    </div>

                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-5 text-center">
                      <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-emerald-500 text-white">
                        <CheckCircle2 className="size-5" aria-hidden />
                      </div>
                      <p className="mt-2 text-sm font-semibold text-emerald-700">
                        Success! Your text has been humanized. 🎉
                      </p>
                      <p className="text-xs text-emerald-600">Your humanized text is ready below</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <span className="flex size-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                          <Check className="size-3.5" aria-hidden />
                        </span>
                        Humanized Text
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                          <Check className="size-3" aria-hidden />
                          Undetectable
                        </span>
                      </div>
                      <span className="text-xs font-medium text-slate-500">
                        Step 2 of 2 - Complete!
                      </span>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50/30">
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-200 bg-emerald-50 px-4 py-3">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            className="inline-flex size-9 items-center justify-center rounded-xl border border-emerald-200 bg-white text-slate-400 transition hover:bg-emerald-50"
                          >
                            <ChevronLeft className="size-4" aria-hidden />
                          </button>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">Version 1 of 3</p>
                            <p className="text-xs text-slate-500">Multiple variations generated</p>
                          </div>
                          <button
                            type="button"
                            className="inline-flex size-9 items-center justify-center rounded-xl border border-emerald-200 bg-white text-slate-400 transition hover:bg-emerald-50"
                          >
                            <ChevronRight className="size-4" aria-hidden />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopy(humanizeOutput)}
                          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                        >
                          <Copy className="size-4" aria-hidden />
                          Copy Text
                        </button>
                      </div>
                      <div className="relative bg-white px-5 py-5">
                        <p className="min-h-[220px] whitespace-pre-wrap text-sm leading-relaxed text-slate-900">
                          {humanizeOutput}
                        </p>
                        <span className="absolute bottom-4 right-4 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-500">
                          {outputWordCount} words
                        </span>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                        <span className="flex size-8 items-center justify-center rounded-full bg-emerald-500 text-white">
                          <Shield className="size-4" aria-hidden />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">AI Detection</p>
                          <p className="text-xs text-emerald-600">Bypassed ✓</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3">
                        <span className="flex size-8 items-center justify-center rounded-full bg-blue-600 text-white">
                          <BookOpen className="size-4" aria-hidden />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Readability</p>
                          <p className="text-xs text-blue-600">Enhanced ✓</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3">
                        <span className="flex size-8 items-center justify-center rounded-full bg-violet-600 text-white">
                          <BarChart3 className="size-4" aria-hidden />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Human-like</p>
                          <p className="text-xs text-violet-600">Optimized ✓</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <TextEditorPanel
                    value={humanizeInput}
                    onChange={setHumanizeInput}
                    placeholder="Paste your text here…"
                  />
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={handleHumanize}
                      disabled={!humanizeInput.trim()}
                      className="inline-flex items-center gap-2 rounded-2xl bg-[#8B5CF6] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:bg-violet-600 disabled:opacity-50 disabled:hover:bg-[#8B5CF6]"
                    >
                      <Sparkles className="size-4" aria-hidden />
                      Humanize
                    </button>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="detector" className="mt-0">
              {detectorOutput ? (
                <div className="grid gap-8 lg:grid-cols-2">
                  <TextEditorPanel
                    value={detectorInput}
                    onChange={setDetectorInput}
                    placeholder="Paste your text here to check AI detection…"
                  />
                  <OutputPanel
                    value={detectorOutput}
                    onCopy={handleCopy(detectorOutput)}
                    onRewrite={() =>
                      setDetectorOutput(detectorInput ? "AI detection score: — (demo)" : "")
                    }
                    placeholder="AlphaWrite result…"
                  />
                </div>
              ) : (
                <>
                  <TextEditorPanel
                    value={detectorInput}
                    onChange={setDetectorInput}
                    placeholder="Paste your text here to check AI detection…"
                  />
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() =>
                        setDetectorOutput(
                          detectorInput.trim() ? "AI detection score: — (demo)" : ""
                        )
                      }
                      disabled={!detectorInput.trim()}
                      className="inline-flex items-center gap-2 rounded-2xl bg-[#8B5CF6] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:bg-violet-600 disabled:opacity-50 disabled:hover:bg-[#8B5CF6]"
                    >
                      <Shield className="size-4" aria-hidden />
                      Check AI detection
                    </button>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="essay" className="mt-0">
              {essayOutput ? (
                <div className="grid gap-8 lg:grid-cols-2">
                  <TextEditorPanel
                    value={essayInput}
                    onChange={setEssayInput}
                    placeholder="Paste your essay or draft here…"
                  />
                  <OutputPanel
                    value={essayOutput}
                    onCopy={handleCopy(essayOutput)}
                    onRewrite={() =>
                      setEssayOutput(essayInput ? "Essay feedback: — (demo)" : "")
                    }
                    placeholder="AlphaWrite result…"
                  />
                </div>
              ) : (
                <>
                  <TextEditorPanel
                    value={essayInput}
                    onChange={setEssayInput}
                    placeholder="Paste your essay or draft here…"
                  />
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() =>
                        setEssayOutput(essayInput.trim() ? "Essay feedback: — (demo)" : "")
                      }
                      disabled={!essayInput.trim()}
                      className="inline-flex items-center gap-2 rounded-2xl bg-[#8B5CF6] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:bg-violet-600 disabled:opacity-50 disabled:hover:bg-[#8B5CF6]"
                    >
                      <PenLine className="size-4" aria-hidden />
                      Get feedback
                    </button>
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
