"use client";

import {
  Users,
  UserCheck,
  DollarSign,
  TrendingUp,
  Activity,
  Zap,
  Search,
  Filter,
  Download,
} from "lucide-react";
import AdminLayout from "../components/admin/AdminLayout";
import { useAdminStats, useAdminUsers } from "@/services/hooks/admin";

function planBadge(plan: string) {
  const styles: Record<string, string> = {
    premium: "bg-violet-50 text-[#8B5CF6] ring-violet-200/60",
    pro: "bg-blue-50 text-blue-600 ring-blue-200/60",
    basic: "bg-slate-50 text-slate-600 ring-slate-200/60",
    free: "bg-slate-50 text-slate-500 ring-slate-200/60",
  };
  return styles[plan] || styles.free;
}

function statusBadge(status: string) {
  return status === "active"
    ? "bg-emerald-50 text-emerald-600 ring-emerald-200/60"
    : "bg-amber-50 text-amber-600 ring-amber-200/60";
}

function formatNumber(n: number): string {
  return n.toLocaleString();
}

function formatCurrency(n: number): string {
  return `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-slate-200 ${className}`} />;
}

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: users, isLoading: usersLoading } = useAdminUsers({ skip: 0, limit: 5 });

  const primaryStats = stats
    ? [
        { title: "Total Users", value: formatNumber(stats.total_users), icon: Users },
        { title: "Active Users", value: formatNumber(stats.active_users), icon: UserCheck },
        { title: "Total Revenue", value: formatCurrency(stats.revenue), icon: DollarSign },
        { title: "Total Requests", value: formatNumber(stats.total_requests), icon: TrendingUp },
      ]
    : null;

  const secondaryStats = stats
    ? [
        { title: "Humanized Texts", value: formatNumber(stats.total_humanized_texts), icon: Activity },
        { title: "Humanized Today", value: formatNumber(stats.humanized_texts_today), icon: Zap },
        { title: "Pro Users", value: formatNumber(stats.pro_users), icon: Users },
        { title: "Premium Users", value: formatNumber(stats.premium_users), icon: UserCheck },
      ]
    : null;

  const activityStats = stats
    ? [
        { title: "Requests Today", value: formatNumber(stats.requests_today), icon: TrendingUp },
        { title: "Humanized Today", value: formatNumber(stats.humanized_texts_today), icon: Activity },
        { title: "Free Users", value: formatNumber(stats.free_users), icon: Users },
      ]
    : null;

  return (
    <AdminLayout title="Dashboard" subtitle="Overview of your application">
      <div className="space-y-6">
        {/* Primary stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statsLoading || !primaryStats
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-slate-200/60 bg-white p-5">
                  <Skeleton className="mb-2 h-3 w-20" />
                  <Skeleton className="mb-1 h-7 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              ))
            : primaryStats.map((s) => (
                <div key={s.title} className="rounded-xl border border-slate-200/60 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-500">{s.title}</p>
                      <p className="mt-1.5 text-2xl font-bold text-slate-900">{s.value}</p>
                    </div>
                    <span className="flex size-10 items-center justify-center rounded-xl bg-violet-50">
                      <s.icon className="size-5 text-[#8B5CF6]" aria-hidden />
                    </span>
                  </div>
                </div>
              ))}
        </div>

        {/* Secondary stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statsLoading || !secondaryStats
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-slate-200/60 bg-white p-5">
                  <Skeleton className="mb-2 h-3 w-20" />
                  <Skeleton className="mb-1 h-7 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              ))
            : secondaryStats.map((s) => (
                <div key={s.title} className="rounded-xl border border-slate-200/60 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-500">{s.title}</p>
                      <p className="mt-1.5 text-2xl font-bold text-slate-900">{s.value}</p>
                    </div>
                    <span className="flex size-10 items-center justify-center rounded-xl bg-violet-50">
                      <s.icon className="size-5 text-[#8B5CF6]" aria-hidden />
                    </span>
                  </div>
                </div>
              ))}
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-slate-200/60 bg-white p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Recent Activity</h2>
            <button
              type="button"
              className="text-xs font-medium text-[#8B5CF6] hover:underline"
            >
              View all
            </button>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {statsLoading || !activityStats
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="text-center">
                    <Skeleton className="mx-auto mb-2 size-10" />
                    <Skeleton className="mx-auto mb-1 h-6 w-16" />
                    <Skeleton className="mx-auto h-3 w-20" />
                  </div>
                ))
              : activityStats.map((a) => (
                  <div key={a.title} className="text-center">
                    <span className="mx-auto mb-2 flex size-10 items-center justify-center rounded-xl bg-violet-50">
                      <a.icon className="size-5 text-[#8B5CF6]" aria-hidden />
                    </span>
                    <p className="text-xl font-bold text-slate-900">{a.value}</p>
                    <p className="text-xs text-slate-500">{a.title}</p>
                  </div>
                ))}
          </div>
        </div>

        {/* Search + Users table */}
        <div className="rounded-xl border border-slate-200/60 bg-white p-5">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 transition focus:border-[#8B5CF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-xl bg-violet-50 px-3.5 py-2.5 text-xs font-semibold text-[#8B5CF6] transition hover:bg-violet-100"
              >
                <Filter className="size-3.5" aria-hidden />
                Filter
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3.5 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-200"
              >
                <Download className="size-3.5" aria-hidden />
                Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  {["User", "Plan", "Status", "Requests", "Joined"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {usersLoading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i}>
                        <td className="px-4 py-3"><Skeleton className="h-4 w-40" /></td>
                        <td className="px-4 py-3"><Skeleton className="h-4 w-16" /></td>
                        <td className="px-4 py-3"><Skeleton className="h-4 w-16" /></td>
                        <td className="px-4 py-3"><Skeleton className="h-4 w-12" /></td>
                        <td className="px-4 py-3"><Skeleton className="h-4 w-24" /></td>
                      </tr>
                    ))
                  : users?.map((u) => (
                      <tr key={u.email} className="transition hover:bg-slate-50/50">
                        <td className="whitespace-nowrap px-4 py-3">
                          <div className="flex items-center gap-3">
                            <span className="flex size-8 items-center justify-center rounded-full bg-violet-50 text-xs font-semibold text-[#8B5CF6]">
                              {u.email.charAt(0).toUpperCase()}
                            </span>
                            <span className="text-sm font-medium text-slate-800">{u.email}</span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ${planBadge(u.plan_type)}`}>
                            {u.plan_type}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ${statusBadge(u.subscription_status)}`}>
                            {u.subscription_status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm tabular-nums text-slate-700">
                          {u.total_requests.toLocaleString()}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-500">
                          {new Date(u.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </td>
                      </tr>
                    ))}
                {!usersLoading && (!users || users.length === 0) && (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-400">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
