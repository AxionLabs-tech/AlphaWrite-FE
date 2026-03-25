"use client";

import { useState } from "react";
import { Save, Globe, Bell, Shield, Palette, Mail, Wrench } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useUpdateCredits, useUpdateSubscriptions } from "@/services/hooks/admin";

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState("AlphaWrite");
  const [supportEmail, setSupportEmail] = useState("support@alphawrite.ai");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [newUserAlerts, setNewUserAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [saved, setSaved] = useState(false);

  // Maintenance actions
  const { updateCredits, isLoading: creditsLoading } = useUpdateCredits();
  const { updateSubscriptions, isLoading: subsLoading } = useUpdateSubscriptions();
  const [creditsSuccess, setCreditsSuccess] = useState(false);
  const [subsSuccess, setSubsSuccess] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleUpdateCredits = async () => {
    const ok = await updateCredits();
    if (ok) {
      setCreditsSuccess(true);
      setTimeout(() => setCreditsSuccess(false), 2000);
    }
  };

  const handleUpdateSubscriptions = async () => {
    const ok = await updateSubscriptions();
    if (ok) {
      setSubsSuccess(true);
      setTimeout(() => setSubsSuccess(false), 2000);
    }
  };

  return (
    <AdminLayout title="Settings" subtitle="Configure your application">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* General */}
        <div className="rounded-xl border border-slate-200/60 bg-white p-5">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-violet-50">
              <Globe className="size-4 text-[#8B5CF6]" aria-hidden />
            </span>
            <h2 className="text-sm font-bold text-slate-900">General</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Site Name
              </label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-800 transition focus:border-[#8B5CF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Support Email
              </label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-800 transition focus:border-[#8B5CF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
              />
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-slate-800">
                  Maintenance Mode
                </p>
                <p className="text-xs text-slate-500">
                  Temporarily disable public access
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`relative h-6 w-11 rounded-full transition ${
                  maintenanceMode ? "bg-[#8B5CF6]" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow transition-transform ${
                    maintenanceMode ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-xl border border-slate-200/60 bg-white p-5">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-violet-50">
              <Bell className="size-4 text-[#8B5CF6]" aria-hidden />
            </span>
            <h2 className="text-sm font-bold text-slate-900">Notifications</h2>
          </div>
          <div className="space-y-3">
            {[
              {
                label: "Email Notifications",
                desc: "Receive important system alerts via email",
                value: emailNotifications,
                toggle: () => setEmailNotifications(!emailNotifications),
              },
              {
                label: "New User Alerts",
                desc: "Get notified when new users sign up",
                value: newUserAlerts,
                toggle: () => setNewUserAlerts(!newUserAlerts),
              },
              {
                label: "Weekly Reports",
                desc: "Receive weekly analytics summary",
                value: weeklyReports,
                toggle: () => setWeeklyReports(!weeklyReports),
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {item.label}
                  </p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={item.toggle}
                  className={`relative h-6 w-11 rounded-full transition ${
                    item.value ? "bg-[#8B5CF6]" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow transition-transform ${
                      item.value ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance */}
        <div className="rounded-xl border border-slate-200/60 bg-white p-5">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-violet-50">
              <Wrench className="size-4 text-[#8B5CF6]" aria-hidden />
            </span>
            <h2 className="text-sm font-bold text-slate-900">Maintenance</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-slate-800">
                  Update All Credits
                </p>
                <p className="text-xs text-slate-500">
                  Refresh credit balances for all users
                </p>
              </div>
              <button
                type="button"
                onClick={handleUpdateCredits}
                disabled={creditsLoading}
                className="rounded-xl bg-[#8B5CF6] px-4 py-2 text-xs font-semibold text-white transition hover:bg-violet-600 disabled:opacity-60"
              >
                {creditsLoading ? "Updating..." : creditsSuccess ? "Done!" : "Update Credits"}
              </button>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-slate-800">
                  Update All Subscriptions
                </p>
                <p className="text-xs text-slate-500">
                  Sync subscription statuses for all users
                </p>
              </div>
              <button
                type="button"
                onClick={handleUpdateSubscriptions}
                disabled={subsLoading}
                className="rounded-xl bg-[#8B5CF6] px-4 py-2 text-xs font-semibold text-white transition hover:bg-violet-600 disabled:opacity-60"
              >
                {subsLoading ? "Updating..." : subsSuccess ? "Done!" : "Update Subscriptions"}
              </button>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="rounded-xl border border-slate-200/60 bg-white p-5">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-violet-50">
              <Shield className="size-4 text-[#8B5CF6]" aria-hidden />
            </span>
            <h2 className="text-sm font-bold text-slate-900">Security</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-slate-800">
                  Admin Subdomain
                </p>
                <p className="text-xs text-slate-500">
                  admin.alphawrite.ai
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 ring-1 ring-emerald-200/60">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-slate-800">
                  Clickjacking Protection
                </p>
                <p className="text-xs text-slate-500">
                  X-Frame-Options: DENY
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 ring-1 ring-emerald-200/60">
                Enabled
              </span>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="rounded-xl border border-slate-200/60 bg-white p-5">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-violet-50">
              <Palette className="size-4 text-[#8B5CF6]" aria-hidden />
            </span>
            <h2 className="text-sm font-bold text-slate-900">Appearance</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-slate-600">
              Brand Color
            </span>
            <span className="size-8 rounded-lg bg-[#8B5CF6] ring-2 ring-white shadow" />
            <span className="text-xs font-mono text-slate-500">#8B5CF6</span>
          </div>
        </div>

        {/* Email */}
        <div className="rounded-xl border border-slate-200/60 bg-white p-5">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-violet-50">
              <Mail className="size-4 text-[#8B5CF6]" aria-hidden />
            </span>
            <h2 className="text-sm font-bold text-slate-900">Email</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-slate-800">
                  SMTP Provider
                </p>
                <p className="text-xs text-slate-500">Not configured</p>
              </div>
              <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600 ring-1 ring-amber-200/60">
                Pending
              </span>
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-xl bg-[#8B5CF6] px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-violet-500/20 transition hover:bg-violet-600"
          >
            <Save className="size-4" aria-hidden />
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
