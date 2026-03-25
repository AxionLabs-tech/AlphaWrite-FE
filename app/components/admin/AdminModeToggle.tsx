"use client";

import { useRouter } from "next/navigation";
import { isAdmin, clearAdminSession } from "../../utils/adminAuth";
import { Shield, LogOut } from "lucide-react";

export default function AdminModeToggle() {
  const router = useRouter();

  if (!isAdmin()) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200/60 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Shield className="size-4 text-[#8B5CF6]" aria-hidden />
          <span className="text-xs font-medium text-slate-700">Admin Mode</span>
        </div>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="rounded-lg bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-[#8B5CF6] transition hover:bg-violet-100"
          >
            Admin
          </button>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 transition hover:bg-slate-200"
          >
            User
          </button>
        </div>
        <button
          type="button"
          onClick={clearAdminSession}
          className="rounded-lg p-1 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
          title="Logout Admin"
        >
          <LogOut className="size-3.5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
