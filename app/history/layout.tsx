"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthOptional } from "@/services/hooks";
import LandingNav from "@/app/components/LandingNav";
import Footer from "@/app/components/Footer";
import { Skeleton } from "@/app/components/Skeleton";

export default function HistoryLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const auth = useAuthOptional();

  useEffect(() => {
    if (auth && !auth.isLoading && !auth.isAuthenticated) {
      router.replace("/");
    }
  }, [auth, router]);

  if (auth?.isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-violet-50/70 to-violet-100/80">
        <LandingNav />
        <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="mt-1 h-4 w-96" />
          <div className="mt-10 space-y-4">
            <Skeleton className="h-24 w-full rounded-2xl" />
            <Skeleton className="h-24 w-full rounded-2xl" />
            <Skeleton className="h-24 w-full rounded-2xl" />
          </div>
        </main>
      </div>
    );
  }

  if (!auth?.isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-violet-50/70 to-violet-100/80 text-slate-900">
      <LandingNav />
      <main className="min-h-screen">
        {children}
        <Footer />
      </main>
    </div>
  );
}
