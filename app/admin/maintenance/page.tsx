"use client";

import { useState } from "react";
import { AlertTriangle, Info, Megaphone, Save, Wrench } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  useAdminSystemStatus,
  useUpdateSystemStatus,
} from "@/services/hooks/admin";

type FormDraft = Partial<{
  downtime: boolean;
  banner: boolean;
  message: string;
}>;

export default function AdminMaintenancePage() {
  const { data, isLoading, error: loadError, refetch } = useAdminSystemStatus();
  const { updateStatus, isLoading: saving, error: saveError, resetError } =
    useUpdateSystemStatus();

  // Edits layered on top of the server state — avoids a hydration effect.
  const [draft, setDraft] = useState<FormDraft>({});
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const downtime = draft.downtime ?? data?.downtime ?? false;
  const banner = draft.banner ?? data?.banner ?? false;
  const message = draft.message ?? data?.message ?? "";

  const setDowntime = (v: boolean) => setDraft((d) => ({ ...d, downtime: v }));
  const setBanner = (v: boolean) => setDraft((d) => ({ ...d, banner: v }));
  const setMessage = (v: string) => setDraft((d) => ({ ...d, message: v }));

  const dirty =
    !!data &&
    (downtime !== data.downtime ||
      banner !== data.banner ||
      (message ?? "") !== (data.message ?? ""));

  const handleSave = async () => {
    resetError();
    const res = await updateStatus({ downtime, banner, message });
    if (res) {
      setDraft({});
      setSavedAt(new Date().toLocaleTimeString());
      void refetch();
    }
  };

  return (
    <AdminLayout
      title="Maintenance"
      subtitle="Control the public banner and downtime overlay"
    >
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Status summary */}
        <div className="rounded-xl border border-slate-200/60 bg-white p-5">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-violet-50">
              <Wrench className="size-4 text-[#8B5CF6]" aria-hidden />
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-900">System status</h2>
              <p className="text-xs text-slate-500">
                Current state across all users
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="h-6 w-40 animate-pulse rounded bg-slate-200" />
          ) : loadError ? (
            <p className="text-sm text-red-600">{loadError}</p>
          ) : (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <StatusPill
                active={!!data?.downtime}
                activeTone="red"
                activeLabel="Downtime on"
                inactiveLabel="Downtime off"
              />
              <StatusPill
                active={!!data?.banner}
                activeTone="amber"
                activeLabel="Banner on"
                inactiveLabel="Banner off"
              />
              {data?.updated_at && (
                <span className="text-slate-500">
                  Updated {new Date(data.updated_at).toLocaleString()}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Downtime toggle */}
        <ToggleCard
          icon={<AlertTriangle className="size-4 text-red-600" aria-hidden />}
          iconWrap="bg-red-50"
          title="Downtime mode"
          description="Block the app with a full-screen overlay. Public pages (/, /login, /blog, etc.) remain reachable."
          value={downtime}
          onChange={setDowntime}
          activeTone="bg-red-500"
        />

        {/* Banner toggle */}
        <ToggleCard
          icon={<Megaphone className="size-4 text-amber-600" aria-hidden />}
          iconWrap="bg-amber-50"
          title="Info banner"
          description="Show a sticky info bar at the top of every page without blocking usage."
          value={banner}
          onChange={setBanner}
          activeTone="bg-amber-500"
        />

        {/* Message */}
        <div className="rounded-xl border border-slate-200/60 bg-white p-5">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-violet-50">
              <Info className="size-4 text-[#8B5CF6]" aria-hidden />
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Message</h2>
              <p className="text-xs text-slate-500">
                Shown as the subtitle on both the banner and the overlay. Leave
                empty for a sensible default per mode.
              </p>
            </div>
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="e.g. We're deploying new study features. Short interruption expected around 2pm UTC."
            className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 transition focus:border-[#8B5CF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
          />
          <p className="mt-2 text-[11px] text-slate-500">
            {message.trim().length} characters
          </p>
        </div>

        {saveError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {saveError}
          </div>
        )}

        {/* Save bar */}
        <div className="flex items-center justify-between rounded-xl border border-slate-200/60 bg-white px-5 py-4">
          <p className="text-xs text-slate-500">
            {dirty
              ? "Unsaved changes — users will see them within ~30s of saving."
              : savedAt
                ? `Saved at ${savedAt}. Live for users within ~30s.`
                : "No pending changes."}
          </p>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !dirty}
            className="inline-flex items-center gap-2 rounded-xl bg-[#8B5CF6] px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-violet-500/20 transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="size-4" aria-hidden />
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

function ToggleCard({
  icon,
  iconWrap,
  title,
  description,
  value,
  onChange,
  activeTone,
}: {
  icon: React.ReactNode;
  iconWrap: string;
  title: string;
  description: string;
  value: boolean;
  onChange: (next: boolean) => void;
  activeTone: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200/60 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-2.5">
          <span className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${iconWrap}`}>
            {icon}
          </span>
          <div>
            <p className="text-sm font-bold text-slate-900">{title}</p>
            <p className="mt-0.5 max-w-md text-xs leading-snug text-slate-500">
              {description}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onChange(!value)}
          aria-pressed={value}
          aria-label={title}
          className={`relative h-6 w-11 shrink-0 rounded-full transition ${
            value ? activeTone : "bg-slate-300"
          }`}
        >
          <span
            className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow transition-transform ${
              value ? "translate-x-5" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}

function StatusPill({
  active,
  activeTone,
  activeLabel,
  inactiveLabel,
}: {
  active: boolean;
  activeTone: "red" | "amber";
  activeLabel: string;
  inactiveLabel: string;
}) {
  const activeClasses =
    activeTone === "red"
      ? "bg-red-50 text-red-700 ring-red-200"
      : "bg-amber-50 text-amber-700 ring-amber-200";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${
        active
          ? activeClasses
          : "bg-slate-50 text-slate-600 ring-slate-200/80"
      }`}
    >
      <span
        aria-hidden
        className={`inline-block size-1.5 rounded-full ${
          active
            ? activeTone === "red"
              ? "bg-red-500"
              : "bg-amber-500"
            : "bg-slate-400"
        }`}
      />
      {active ? activeLabel : inactiveLabel}
    </span>
  );
}
