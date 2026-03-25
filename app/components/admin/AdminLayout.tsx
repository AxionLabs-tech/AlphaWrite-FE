"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  Settings,
  LogOut,
  Home,
  Shield,
  Menu,
  X,
  UserCheck,
} from "lucide-react";
import { isAdmin, getAdminUser, logoutAdmin } from "../../utils/adminAuth";

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: TrendingUp },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
  children,
  title,
  subtitle,
}: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAdmin()) {
      router.push("/admin/login");
      return;
    }
    setIsLoading(false);
  }, [router]);

  const adminUser = getAdminUser();

  if (isLoading || !adminUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F5FF]">
        <span className="size-10 animate-spin rounded-full border-2 border-[#8B5CF6] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F7F5FF]">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 border-r border-slate-200/60 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-[#8B5CF6]">
                <Shield className="size-4 text-white" aria-hidden />
              </span>
              <span className="text-lg font-bold text-slate-900">Admin</span>
            </div>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="text-slate-400 hover:text-slate-600 lg:hidden"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-[#8B5CF6] text-white shadow-sm shadow-violet-500/20"
                      : "text-slate-600 hover:bg-violet-50 hover:text-[#8B5CF6]"
                  }`}
                >
                  <item.icon className="size-4" aria-hidden />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User footer */}
          <div className="border-t border-slate-100 p-4">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-[#8B5CF6] text-xs font-semibold text-white">
                {adminUser.name?.charAt(0).toUpperCase() || "A"}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900">
                  {adminUser.name}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {adminUser.email}
                </p>
              </div>
            </div>
            <div className="mb-3 flex items-center gap-1.5">
              <UserCheck className="size-3.5 text-[#8B5CF6]" aria-hidden />
              <span className="text-[11px] font-medium text-[#8B5CF6]">
                Administrator
              </span>
            </div>
            <div className="space-y-1">
              <Link
                href="/"
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50"
              >
                <Home className="size-4" aria-hidden />
                Back to App
              </Link>
              <button
                type="button"
                onClick={logoutAdmin}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
              >
                <LogOut className="size-4" aria-hidden />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="shrink-0 border-b border-slate-200/60 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="text-slate-500 hover:text-slate-700 lg:hidden"
              >
                <Menu className="size-5" />
              </button>
              <div>
                {title && (
                  <h1 className="text-xl font-bold text-slate-900">{title}</h1>
                )}
                {subtitle && (
                  <p className="text-sm text-slate-500">{subtitle}</p>
                )}
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-[#8B5CF6] ring-1 ring-violet-200/60">
              <Shield className="size-3" aria-hidden />
              Admin Panel
            </span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
