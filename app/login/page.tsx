"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAuth } from "@/services/hooks";
import { authApi } from "@/services/modules/auth";
import { Loader2 } from "lucide-react";

const COOKIE_OPTS = { expires: 7, path: "/", sameSite: "Lax" as const };

const Loader = ({ message = "Logging in..." }: { message?: string }) => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
    <Loader2 className="size-10 animate-spin text-[#8B5CF6]" aria-hidden />
    <p className="mt-4 text-lg font-medium text-slate-700">{message}</p>
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
    <div className="max-w-md rounded-xl border border-red-300 bg-red-50 px-6 py-4 text-red-700">
      <strong className="font-bold">Error:</strong>
      <span className="ml-2">{message}</span>
    </div>
  </div>
);

function LoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setSession } = useAuth();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(!!token);

  useEffect(() => {
    if (!token) return;

    let cancelled = false;
    authApi
      .loginWithToken(token)
      .then((data) => {
        if (cancelled) return;
        setSession(data);
        Cookies.set("alphawriteToken", data.access_token, COOKIE_OPTS);
        Cookies.set("alphawriteRefreshToken", data.refresh_token, COOKIE_OPTS);
        Cookies.set("alphawriteUserId", data.user.id, COOKIE_OPTS);
        Cookies.set("alphawriteUserName", data.user.name ?? "", COOKIE_OPTS);
        Cookies.set("alphawriteAvatarUrl", data.user.avatar_url ?? "", COOKIE_OPTS);
        Cookies.set("alphawriteEmail", data.user.email, COOKIE_OPTS);
        Cookies.set("alphawritePlan", data.user.plan_type, COOKIE_OPTS);
        try {
          if (data.user?.trial_used === false) {
            sessionStorage.setItem("alphawrite_show_survey", "1");
          }
        } catch {
          // ignore
        }
        router.push("/");
      })
      .catch(() => {
        if (cancelled) return;
        setError("Invalid or expired token.");
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [token, setSession, router]);

  if (!token) return <ErrorMessage message="Token is missing." />;
  if (loading) return <Loader message="Logging in..." />;
  if (error) return <ErrorMessage message={error} />;

  return null;
}

export default function LoginPage() {
  return (
    <Suspense fallback={<Loader message="Loading..." />}>
      <LoginContent />
    </Suspense>
  );
}
