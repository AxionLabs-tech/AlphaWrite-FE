"use client";

/**
 * Handles magic link (?token=...) and Google OAuth (?code=...&state=...) callbacks.
 * For local dev, set the Google OAuth redirect URI to: http://localhost:3000/auth/callback
 */

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/services/hooks";
import { authApi } from "@/services/modules/auth";
import { Loader2 } from "lucide-react";

const OAUTH_STATE_KEY = "alphawrite_oauth_state";
const OAUTH_CODE_VERIFIER_KEY = "alphawrite_oauth_code_verifier";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setSession } = useAuth();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const token = searchParams.get("token");
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    // Google OAuth callback
    if (code) {
      let cancelled = false;
      const code_verifier =
        typeof window !== "undefined" ? sessionStorage.getItem(OAUTH_CODE_VERIFIER_KEY) : null;
      if (!code_verifier) {
        setStatus("error");
        setMessage("Missing session. Please try signing in with Google again.");
        return;
      }
      authApi
        .getAuthCallback({ code, state: state ?? undefined, code_verifier })
        .then((data) => {
          if (cancelled) return;
          try {
            sessionStorage.removeItem(OAUTH_STATE_KEY);
            sessionStorage.removeItem(OAUTH_CODE_VERIFIER_KEY);
          } catch {
            // ignore
          }
          setSession(data);
          setStatus("success");
          router.replace("/");
        })
        .catch(() => {
          if (cancelled) return;
          setStatus("error");
          setMessage("Google sign-in failed. Please try again.");
        });
      return () => {
        cancelled = true;
      };
    }

    // Magic link callback
    if (!token) {
      setStatus("error");
      setMessage("Missing login token.");
      return;
    }

    let cancelled = false;
    authApi
      .loginWithToken(token)
      .then((data) => {
        if (cancelled) return;
        setSession(data);
        setStatus("success");
        router.replace("/");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
        setMessage("Invalid or expired link. Please request a new magic link.");
      });

    return () => {
      cancelled = true;
    };
  }, [searchParams, setSession, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-4">
        <Loader2 className="size-10 animate-spin text-[#8B5CF6]" aria-hidden />
        <p className="text-slate-600">Signing you in…</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-red-600">{message}</p>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="rounded-xl bg-[#8B5CF6] px-6 py-3 text-sm font-semibold text-white hover:bg-violet-600"
        >
          Back to home
        </button>
      </div>
    );
  }

  return null;
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-4">
          <Loader2 className="size-10 animate-spin text-[#8B5CF6]" aria-hidden />
          <p className="text-slate-600">Loading…</p>
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}
