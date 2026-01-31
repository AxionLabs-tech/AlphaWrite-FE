"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, Mail, Loader2 } from "lucide-react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    // TODO: call your auth API to send magic link
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
    setLoading(false);
  };

  const handleGoogle = () => {
    // TODO: redirect to Google OAuth or call your auth API
    window.location.href = "/#humanizer"; // redirect to tool on landing
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-[400px]">
        <Link
          href="/"
          className="mb-10 flex items-center justify-center gap-2 text-xl font-bold text-slate-900"
        >
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#8B5CF6] text-white">
            <Zap className="size-5" aria-hidden />
          </span>
          AlphaWrite
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create an account</h1>
          <p className="mt-2 text-sm text-slate-600">Get started with AlphaWrite in seconds.</p>

          <button
            type="button"
            onClick={handleGoogle}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border-2 border-slate-200 bg-white py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <svg className="size-5" viewBox="0 0 24 24" aria-hidden>
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-slate-500">Or continue with email</span>
            </div>
          </div>

          {sent ? (
            <div className="rounded-xl bg-violet-50 p-4 text-center text-sm text-[#8B5CF6]">
              Check your inbox — we sent you a magic link to complete sign up.
            </div>
          ) : (
            <form onSubmit={handleMagicLink} className="space-y-4">
              <label htmlFor="signup-email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" aria-hidden />
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full rounded-xl border-2 border-slate-200 bg-white py-3.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:border-[#8B5CF6] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#8B5CF6] py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:bg-violet-600 disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 className="size-5 animate-spin" aria-hidden />
                ) : (
                  "Send magic link"
                )}
              </button>
            </form>
          )}
        </div>

        <p className="mt-8 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-semibold text-[#8B5CF6] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
