"use client";

import { useState } from "react";
import {
  Users,
  DollarSign,
  Activity,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useAdminStats, useAdminUsers } from "@/services/hooks/admin";

// Weekly requests — keep as placeholder (API lacks per-day data)
const weeklyRequests = [
  { day: "Mon", value: 3200 },
  { day: "Tue", value: 4100 },
  { day: "Wed", value: 3800 },
  { day: "Thu", value: 5200 },
  { day: "Fri", value: 4600 },
  { day: "Sat", value: 2900 },
  { day: "Sun", value: 2100 },
];

const tabs = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "users", label: "Users", icon: Users },
  { id: "revenue", label: "Revenue", icon: DollarSign },
  { id: "usage", label: "Usage", icon: Activity },
] as const;

type TabId = (typeof tabs)[number]["id"];

const maxRequest = Math.max(...weeklyRequests.map((d) => d.value));

function planBadge(plan: string) {
  const styles: Record<string, string> = {
    premium: "bg-violet-50 text-[#8B5CF6]",
    pro: "bg-blue-50 text-blue-600",
    basic: "bg-slate-100 text-slate-600",
    free: "bg-slate-100 text-slate-500",
  };
  return styles[plan] || styles.free;
}

function fmt(n: number): string {
  return n.toLocaleString();
}

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-slate-200 ${className}`} />;
}

export default function AdminAnalytics() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [period, setPeriod] = useState("30d");

  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: topUsers, isLoading: usersLoading } = useAdminUsers({ skip: 0, limit: 10 });

  const totalPaidUsers = stats ? stats.basic_users + stats.pro_users + stats.premium_users : 0;

  const overviewStats = stats
    ? [
        { title: "Total Users", value: fmt(stats.total_users), icon: Users },
        { title: "Revenue", value: `$${fmt(stats.revenue)}`, icon: DollarSign },
        { title: "Requests", value: fmt(stats.total_requests), icon: Activity },
        { title: "Subscriptions", value: fmt(totalPaidUsers), icon: TrendingUp },
      ]
    : null;

  const planDistribution = stats
    ? [
        { plan: "Free", users: stats.free_users, pct: stats.total_users ? Math.round((stats.free_users / stats.total_users) * 100) : 0, color: "bg-slate-400" },
        { plan: "Basic", users: stats.basic_users, pct: stats.total_users ? Math.round((stats.basic_users / stats.total_users) * 100) : 0, color: "bg-blue-500" },
        { plan: "Pro", users: stats.pro_users, pct: stats.total_users ? Math.round((stats.pro_users / stats.total_users) * 100) : 0, color: "bg-[#8B5CF6]" },
        { plan: "Premium", users: stats.premium_users, pct: stats.total_users ? Math.round((stats.premium_users / stats.total_users) * 100) : 0, color: "bg-violet-700" },
      ]
    : null;

  const revenueSummary = stats
    ? [
        { label: "Total Revenue", value: `$${fmt(stats.revenue)}`, bg: "bg-emerald-50", text: "text-emerald-700" },
        { label: "Paid Users", value: fmt(totalPaidUsers), bg: "bg-blue-50", text: "text-blue-700" },
        { label: "Avg Revenue/User", value: totalPaidUsers ? `$${(stats.revenue / totalPaidUsers).toFixed(2)}` : "$0", bg: "bg-violet-50", text: "text-[#8B5CF6]" },
      ]
    : null;

  const usageSummary = stats
    ? [
        { label: "Total Requests", value: fmt(stats.total_requests), bg: "bg-blue-50", text: "text-blue-700" },
        { label: "Humanized Texts", value: fmt(stats.total_humanized_texts), bg: "bg-emerald-50", text: "text-emerald-700" },
        { label: "Requests Today", value: fmt(stats.requests_today), bg: "bg-violet-50", text: "text-[#8B5CF6]" },
      ]
    : null;

  const loading = statsLoading;

  return (
    <AdminLayout title="Analytics" subtitle="Comprehensive insights and metrics">
      <div className="space-y-6">
        {/* Tab bar + period */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-1.5 rounded-xl bg-white p-1 ring-1 ring-slate-200/60">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                  activeTab === t.id
                    ? "bg-[#8B5CF6] text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <t.icon className="size-3.5" aria-hidden />
                {t.label}
              </button>
            ))}
          </div>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 focus:border-[#8B5CF6] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {loading || !overviewStats
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-xl border border-slate-200/60 bg-white p-5">
                      <Skeleton className="mb-2 h-3 w-20" />
                      <Skeleton className="h-7 w-24" />
                    </div>
                  ))
                : overviewStats.map((s) => (
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

            <div className="grid gap-5 lg:grid-cols-2">
              {/* Weekly requests bar chart (placeholder) */}
              <div className="rounded-xl border border-slate-200/60 bg-white p-5">
                <h3 className="mb-4 text-sm font-bold text-slate-900">Requests This Week</h3>
                <div className="flex items-end gap-3" style={{ height: 160 }}>
                  {weeklyRequests.map((d) => (
                    <div key={d.day} className="flex flex-1 flex-col items-center gap-1.5">
                      <span className="text-[10px] font-semibold tabular-nums text-slate-500">
                        {(d.value / 1000).toFixed(1)}k
                      </span>
                      <div
                        className="w-full rounded-t-md bg-[#8B5CF6] transition-all"
                        style={{ height: `${(d.value / maxRequest) * 120}px` }}
                      />
                      <span className="text-[10px] font-medium text-slate-400">{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Plan distribution */}
              <div className="rounded-xl border border-slate-200/60 bg-white p-5">
                <h3 className="mb-4 text-sm font-bold text-slate-900">Plan Distribution</h3>
                {loading || !planDistribution ? (
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="h-5 w-full" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {planDistribution.map((p) => (
                      <div key={p.plan} className="flex items-center gap-3">
                        <span className="w-16 text-xs font-medium text-slate-600">{p.plan}</span>
                        <div className="h-2 flex-1 rounded-full bg-slate-100">
                          <div
                            className={`h-2 rounded-full ${p.color} transition-all`}
                            style={{ width: `${Math.max(p.pct, 1)}%` }}
                          />
                        </div>
                        <span className="w-12 text-right text-xs font-semibold tabular-nums text-slate-700">
                          {p.users.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Users tab */}
        {activeTab === "users" && (
          <div className="rounded-xl border border-slate-200/60 bg-white p-5">
            <h3 className="mb-4 text-sm font-bold text-slate-900">Top Active Users</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    {["User", "Plan", "Requests", "Last Login"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {usersLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i}>
                          {Array.from({ length: 4 }).map((_, j) => (
                            <td key={j} className="px-4 py-3"><Skeleton className="h-4 w-20" /></td>
                          ))}
                        </tr>
                      ))
                    : topUsers?.map((u) => (
                        <tr key={u.email} className="hover:bg-slate-50/50">
                          <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-800">
                            {u.email}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3">
                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${planBadge(u.plan_type)}`}>
                              {u.plan_type}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-sm tabular-nums text-slate-700">
                            {u.total_requests.toLocaleString()}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-500">
                            {u.last_login
                              ? new Date(u.last_login).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                              : "—"}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Revenue tab */}
        {activeTab === "revenue" && (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-3">
              {loading || !revenueSummary
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="rounded-xl bg-slate-100 p-5">
                      <Skeleton className="mb-2 h-3 w-24" />
                      <Skeleton className="h-7 w-20" />
                    </div>
                  ))
                : revenueSummary.map((r) => (
                    <div key={r.label} className={`rounded-xl p-5 ${r.bg}`}>
                      <p className={`text-xs font-medium ${r.text} opacity-70`}>{r.label}</p>
                      <p className={`mt-1 text-2xl font-bold ${r.text}`}>{r.value}</p>
                    </div>
                  ))}
            </div>
          </div>
        )}

        {/* Usage tab */}
        {activeTab === "usage" && (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-3">
              {loading || !usageSummary
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="rounded-xl bg-slate-100 p-5">
                      <Skeleton className="mb-2 h-3 w-24" />
                      <Skeleton className="h-7 w-20" />
                    </div>
                  ))
                : usageSummary.map((u) => (
                    <div key={u.label} className={`rounded-xl p-5 ${u.bg}`}>
                      <p className={`text-xs font-medium ${u.text} opacity-70`}>{u.label}</p>
                      <p className={`mt-1 text-2xl font-bold ${u.text}`}>{u.value}</p>
                    </div>
                  ))}
            </div>

            {/* Weekly chart (placeholder) */}
            <div className="rounded-xl border border-slate-200/60 bg-white p-5">
              <h3 className="mb-4 text-sm font-bold text-slate-900">Requests This Week</h3>
              <div className="flex items-end gap-3" style={{ height: 160 }}>
                {weeklyRequests.map((d) => (
                  <div key={d.day} className="flex flex-1 flex-col items-center gap-1.5">
                    <span className="text-[10px] font-semibold tabular-nums text-slate-500">
                      {(d.value / 1000).toFixed(1)}k
                    </span>
                    <div
                      className="w-full rounded-t-md bg-[#8B5CF6] transition-all"
                      style={{ height: `${(d.value / maxRequest) * 120}px` }}
                    />
                    <span className="text-[10px] font-medium text-slate-400">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
