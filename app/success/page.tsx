"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth, usePaymentSuccess } from "@/services/hooks";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setSession } = useAuth();
  const { paymentSuccess, isLoading, error } = usePaymentSuccess();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const done = useRef(false);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (done.current) return;
    if (!sessionId) {
      setStatus("error");
      return;
    }
    done.current = true;
    (async () => {
      const res = await paymentSuccess({ session_id: sessionId });
      if (res && setSession) {
        setSession(res);
        setStatus("success");
        router.replace("/dashboard");
      } else {
        setStatus("error");
      }
    })();
  }, [searchParams, paymentSuccess, setSession, router]);

  if (error || status === "error") {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="text-xl font-semibold text-slate-900">Payment confirmation failed</h1>
        <p className="mt-2 text-slate-600">
          {error ?? "Something went wrong. Your payment may still have succeeded — check your dashboard."}
        </p>
        <a
          href="/dashboard"
          className="mt-6 inline-block rounded-xl bg-[#8B5CF6] px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-600"
        >
          Go to Dashboard
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      {isLoading || status === "idle" ? (
        <>
          <div className="mx-auto size-12 animate-spin rounded-full border-4 border-[#8B5CF6] border-t-transparent" />
          <p className="mt-4 text-slate-600">Confirming your payment…</p>
        </>
      ) : (
        <p className="text-slate-600">Redirecting to dashboard…</p>
      )}
    </div>
  );
}
