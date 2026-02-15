"use client";

import { useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import {
  User,
  Mail,
  Briefcase,
  RefreshCw,
  CreditCard,
  Zap,
  Calendar,
} from "lucide-react";
import { useAuth } from "@/services/hooks";
import { useDashboardView } from "./DashboardViewContext";

const workTypes = [
  "Student",
  "Professional",
  "Writer",
  "Educator",
  "Legal",
  "Finance",
  "Other",
];

const COOKIE_OPTS = { expires: 7, path: "/", sameSite: "Lax" as const };

export default function DashboardPage() {
  const { view } = useDashboardView();
  const { user } = useAuth();
  const [firstName, setFirstName] = useState(
    user?.name?.split(" ")[0] ?? user?.email?.split("@")[0] ?? ""
  );
  const [lastName, setLastName] = useState(user?.name?.split(" ")[1] ?? "");
  const [workType, setWorkType] = useState(workTypes[0]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const email = user?.email ?? Cookies.get("alphawriteEmail") ?? "";
  const plan = (user?.plan_type ?? Cookies.get("alphawritePlan") ?? "free").toLowerCase();
  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);

  const handleSave = () => {
    setIsUpdating(true);
    setMessage(null);
    const fullName = `${firstName} ${lastName}`.trim();
    Cookies.set("alphawriteUserName", fullName || (email.split("@")[0] ?? ""), COOKIE_OPTS);
    setMessage({ type: "success", text: "Profile updated." });
    setTimeout(() => setMessage(null), 3000);
    setIsUpdating(false);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {view === "home" && (
        <>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-slate-600">Manage your account and subscription.</p>

          <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 text-slate-600">
              <Zap className="size-5 text-[#8B5CF6]" />
              <p className="text-sm font-medium">Need to humanize or detect AI text?</p>
            </div>
            <Link
              href="/#humanizer"
              className="mt-4 inline-flex items-center rounded-xl bg-[#8B5CF6] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:bg-violet-600"
            >
              Open Humanizer
            </Link>
          </div>
        </>
      )}

      {view === "profile" && (
        <>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#8B5CF6] text-white">
              <User className="size-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Profile</h2>
              <p className="text-sm text-slate-500">Update your name and preferences</p>
            </div>
          </div>

          {message && (
            <div
              className={`mb-6 rounded-xl border p-4 ${
                message.type === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">First name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:border-[#8B5CF6] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
                    placeholder="First name"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Last name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:border-[#8B5CF6] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
                    placeholder="Last name"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-slate-500"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-slate-700">Work type</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                <select
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-slate-900 focus:border-[#8B5CF6] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
                >
                  {workTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-8">
              <button
                type="button"
                onClick={handleSave}
                disabled={isUpdating}
                className="inline-flex items-center gap-2 rounded-xl bg-[#8B5CF6] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:bg-violet-600 disabled:opacity-60"
              >
                {isUpdating && <RefreshCw className="size-4 animate-spin" />}
                Save changes
              </button>
            </div>
          </div>
        </>
      )}

      {view === "subscription" && (
        <>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#8B5CF6] text-white">
              <CreditCard className="size-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Subscription</h2>
              <p className="text-sm text-slate-500">Your plan and billing</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="bg-[#8B5CF6] px-6 py-8 text-white sm:px-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-white/20">
                    <CreditCard className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{planLabel} plan</h3>
                    <p className="text-violet-100">{user?.email}</p>
                  </div>
                </div>
                <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold">
                  Active
                </span>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Zap className="size-5 text-[#8B5CF6]" />
                    <span className="text-sm font-medium">Plan</span>
                  </div>
                  <p className="mt-2 font-semibold text-slate-900">{planLabel}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {plan === "free" && "200 words per request, 1 request per day"}
                    {plan === "basic" && "500 words per request, 10K words per period"}
                    {plan === "pro" && "2,000 words per request, 20K words per period"}
                    {plan === "premium" && "4,000 words per request, 40K words per period"}
                    {!["free", "basic", "pro", "premium"].includes(plan) && "—"}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="size-5 text-[#8B5CF6]" />
                    <span className="text-sm font-medium">Billing</span>
                  </div>
                  <p className="mt-2 font-semibold text-slate-900">
                    {plan === "free" ? "No billing" : "Managed by Stripe"}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {plan === "free"
                      ? "Upgrade for more words and features"
                      : "View and manage billing in your account"}
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <Link
                  href="/#pricing"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#8B5CF6] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:bg-violet-600"
                >
                  {plan === "free" ? "Upgrade plan" : "Change plan"}
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
