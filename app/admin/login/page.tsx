"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Eye, EyeOff, User, Lock, KeyRound } from "lucide-react";

const CODE_LENGTH = 6;

function CodeInput({
  value,
  onChange,
  autoFocus,
}: {
  value: string;
  onChange: (code: string) => void;
  autoFocus?: boolean;
}) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length: CODE_LENGTH }, (_, i) => value[i] ?? "");

  const focusInput = (i: number) => inputsRef.current[i]?.focus();

  const handleChange = useCallback(
    (index: number, char: string) => {
      const digit = char.replace(/\D/g, "").slice(-1);
      if (!digit) return;
      const next = digits.slice();
      next[index] = digit;
      onChange(next.join(""));
      if (index < CODE_LENGTH - 1) focusInput(index + 1);
    },
    [digits, onChange]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        const next = digits.slice();
        if (digits[index]) {
          next[index] = "";
          onChange(next.join(""));
        } else if (index > 0) {
          next[index - 1] = "";
          onChange(next.join(""));
          focusInput(index - 1);
        }
      } else if (e.key === "ArrowLeft" && index > 0) {
        focusInput(index - 1);
      } else if (e.key === "ArrowRight" && index < CODE_LENGTH - 1) {
        focusInput(index + 1);
      }
    },
    [digits, onChange]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
      if (pasted) {
        onChange(pasted);
        focusInput(Math.min(pasted.length, CODE_LENGTH - 1));
      }
    },
    [onChange]
  );

  return (
    <div className="flex justify-center gap-2.5">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => { inputsRef.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          autoFocus={autoFocus && i === 0}
          value={d}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          style={{ width: 48, height: 56 }}
          className="rounded-xl border border-slate-200 bg-slate-50/50 text-center text-lg font-bold text-slate-800 transition focus:border-[#8B5CF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
          aria-label={`Digit ${i + 1}`}
        />
      ))}
    </div>
  );
}
import { setAdminToken } from "../../utils/adminAuth";
import { useAdminLogin, useAdminVerifyTotp, useAdminVerifyRecovery } from "@/services/hooks/admin";

type Step = "credentials" | "totp" | "recovery";

export default function AdminLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [tempToken, setTempToken] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");

  const { login, isLoading: loginLoading, error: loginError } = useAdminLogin();
  const { verifyTotp, isLoading: totpLoading, error: totpError } = useAdminVerifyTotp();
  const { verifyRecovery, isLoading: recoveryLoading, error: recoveryError } = useAdminVerifyRecovery();

  const isLoading = loginLoading || totpLoading || recoveryLoading;
  const error = loginError || totpError || recoveryError;

  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login({ email, password });
    if (!res) return;
    setTempToken(res.temp_token);
    if (res.requires_2fa) {
      setStep("totp");
    } else {
      // No 2FA required (unlikely but handle gracefully)
      setAdminToken(res.temp_token, { email, name: "Administrator", plan: "Admin" });
      router.push("/admin");
    }
  };

  const handleTotp = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await verifyTotp({ temp_token: tempToken, code: totpCode });
    if (!res) return;
    setAdminToken(res.access_token, { email, name: "Administrator", plan: "Admin" });
    router.push("/admin");
  };

  const handleRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await verifyRecovery({ temp_token: tempToken, recovery_code: recoveryCode });
    if (!res) return;
    setAdminToken(res.access_token, { email, name: "Administrator", plan: "Admin" });
    router.push("/admin");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F5FF] p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-[#8B5CF6] shadow-lg shadow-violet-500/20">
            <Shield className="size-7 text-white" aria-hidden />
          </span>
          <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
          <p className="mt-1 text-sm text-slate-500">
            {step === "credentials"
              ? "Access the admin dashboard"
              : step === "totp"
              ? "Enter your 6-digit authenticator code"
              : "Enter your recovery code"}
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-slate-200/60 bg-white p-7 shadow-sm">
          {/* Step 1: Credentials */}
          {step === "credentials" && (
            <form onSubmit={handleCredentials} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Email Address
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 transition focus:border-[#8B5CF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-11 text-sm text-slate-800 placeholder:text-slate-400 transition focus:border-[#8B5CF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-[#8B5CF6] py-2.5 text-sm font-semibold text-white shadow-sm shadow-violet-500/20 transition hover:bg-violet-600 disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          )}

          {/* Step 2: TOTP */}
          {step === "totp" && (
            <form onSubmit={handleTotp} className="space-y-5">
              <div>
                <label className="mb-3 block text-center text-sm font-medium text-slate-700">
                  Authenticator Code
                </label>
                <CodeInput
                  value={totpCode}
                  onChange={setTotpCode}
                  autoFocus
                />
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || totpCode.length !== 6}
                className="w-full rounded-xl bg-[#8B5CF6] py-2.5 text-sm font-semibold text-white shadow-sm shadow-violet-500/20 transition hover:bg-violet-600 disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Verifying...
                  </span>
                ) : (
                  "Verify"
                )}
              </button>

              <button
                type="button"
                onClick={() => { setStep("recovery"); setTotpCode(""); }}
                className="w-full text-center text-sm font-medium text-[#8B5CF6] hover:underline"
              >
                Use recovery code instead
              </button>
            </form>
          )}

          {/* Step 2 alt: Recovery code */}
          {step === "recovery" && (
            <form onSubmit={handleRecovery} className="space-y-5">
              <div>
                <label
                  htmlFor="recovery"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Recovery Code
                </label>
                <div className="relative">
                  <KeyRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="recovery"
                    type="text"
                    value={recoveryCode}
                    onChange={(e) => setRecoveryCode(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 transition focus:border-[#8B5CF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
                    placeholder="Enter recovery code"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !recoveryCode.trim()}
                className="w-full rounded-xl bg-[#8B5CF6] py-2.5 text-sm font-semibold text-white shadow-sm shadow-violet-500/20 transition hover:bg-violet-600 disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Verifying...
                  </span>
                ) : (
                  "Verify Recovery Code"
                )}
              </button>

              <button
                type="button"
                onClick={() => { setStep("totp"); setRecoveryCode(""); }}
                className="w-full text-center text-sm font-medium text-[#8B5CF6] hover:underline"
              >
                Use authenticator code instead
              </button>
            </form>
          )}

          <div className="mt-5 text-center">
            <Link
              href="/"
              className="text-sm font-medium text-[#8B5CF6] hover:underline"
            >
              &larr; Back to Application
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Admin access only. Contact system administrator for credentials.
        </p>
      </div>
    </div>
  );
}
