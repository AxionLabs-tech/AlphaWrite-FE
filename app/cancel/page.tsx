"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, Zap } from "lucide-react";
import { useCreateCheckoutSession } from "@/services/hooks";

export default function PaymentCancelPage() {
  const router = useRouter();
  const { createCheckoutSession, isLoading } = useCreateCheckoutSession();
  const [redirectCount, setRedirectCount] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setRedirectCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [router]);

  const handleRetry = () => {
    void createCheckoutSession({ plan: "pro", billing_interval: "monthly" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl sm:p-10">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-amber-100">
          <AlertTriangle className="size-7 text-amber-500" aria-hidden />
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
          Payment Cancelled
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          Your payment was cancelled. No charges have been made to your account.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            onClick={handleRetry}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#8B5CF6] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:bg-violet-600 disabled:opacity-70"
          >
            {isLoading ? (
              <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Zap className="size-4" aria-hidden />
            )}
            {isLoading ? "Processing..." : "Try Again — Upgrade to Pro"}
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Return Home
          </Link>
        </div>

        <p className="mt-6 text-xs text-slate-400">
          Redirecting to home in {redirectCount} second{redirectCount !== 1 ? "s" : ""}...
        </p>
      </div>
    </div>
  );
}
