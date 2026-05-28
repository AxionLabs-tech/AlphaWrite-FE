"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthOptional } from "@/services/hooks";
import { Skeleton } from "@/app/components/Skeleton";

export default function WriteLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const auth = useAuthOptional();

  useEffect(() => {
    if (auth && !auth.isLoading && !auth.isAuthenticated) {
      router.replace("/");
    }
  }, [auth, router]);

  if (auth?.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Skeleton className="h-9 w-48" />
      </div>
    );
  }

  if (!auth?.isAuthenticated) return null;

  return <div className="text-slate-900">{children}</div>;
}
