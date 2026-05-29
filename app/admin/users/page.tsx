"use client";

import { useState, useMemo, useRef } from "react";
import { Search, Filter, Download, Mail, Send, X, ChevronDown, ImagePlus, Eye, EyeOff } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { formatEmailBody } from "@/services/modules/admin";
import {
  useAdminUsers,
  useBulkEmail,
  useSendEmail,
  useUpdateUserPlan,
  useSendWelcomeEmail,
} from "@/services/hooks/admin";
import { toast } from "sonner";

const PAGE_SIZE = 10;
const PLAN_OPTIONS = ["free", "basic", "pro", "premium"];
const STATUS_OPTIONS = ["active", "inactive", "cancelled", "trialing"];

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
  const styles: Record<string, string> = {
    active: "bg-emerald-50 text-emerald-600 ring-emerald-200/60",
    inactive: "bg-amber-50 text-amber-600 ring-amber-200/60",
    cancelled: "bg-red-50 text-red-600 ring-red-200/60",
    trialing: "bg-blue-50 text-blue-600 ring-blue-200/60",
  };
  return styles[status] || styles.inactive;
}

function handleImageSelect(
  file: File | undefined,
  setFile: (v: File | null) => void,
  setPreview: (v: string | null) => void,
) {
  if (!file) return;
  setFile(file);
  setPreview(URL.createObjectURL(file));
}

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [filterPlan, setFilterPlan] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [showFilter, setShowFilter] = useState(false);

  // Send email
  const [showSendEmail, setShowSendEmail] = useState(false);
  const [sendTo, setSendTo] = useState("");
  const [sendSubject, setSendSubject] = useState("");
  const [sendBody, setSendBody] = useState("");
  const [sendFile, setSendFile] = useState<File | null>(null);
  const [sendPreview, setSendPreview] = useState<string | null>(null);
  const sendImageRef = useRef<HTMLInputElement>(null);
  const { sendEmail, isLoading: sendLoading } = useSendEmail();

  // Bulk email
  const [showBulkEmail, setShowBulkEmail] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [bulkPreview, setBulkPreview] = useState<string | null>(null);
  const bulkImageRef = useRef<HTMLInputElement>(null);
  const { sendBulkEmail, isLoading: bulkLoading } = useBulkEmail();

  // Plan change
  const { updatePlan, isLoading: planLoading } = useUpdateUserPlan();
  const [changingPlanFor, setChangingPlanFor] = useState<string | null>(null);

  // Welcome email
  const { sendWelcome } = useSendWelcomeEmail();

  const { data: users, isLoading, refetch } = useAdminUsers({
    skip: page * PAGE_SIZE,
    limit: PAGE_SIZE,
    plan_type: filterPlan || undefined,
    subscription_status: filterStatus || undefined,
  });

  const filtered = useMemo(() => {
    if (!users) return [];
    if (!search) return users;
    return users.filter((u) =>
      u.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const handleSendBulkEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    // Omit user_emails so the backend sends to ALL users
    const ok = await sendBulkEmail({
      subject: emailSubject, body: emailBody, user_emails: [],
      ...(bulkFile ? { image: bulkFile } : {}),
    });
    if (ok) {
      toast.success("Bulk email sent to all users");
      setShowBulkEmail(false);
      setEmailSubject("");
      setEmailBody("");
      setBulkFile(null);
      setBulkPreview(null);
    } else {
      toast.error("Failed to send bulk email");
    }
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await sendEmail({
      to: sendTo, subject: sendSubject, body: sendBody,
      ...(sendFile ? { image: sendFile } : {}),
    });
    if (ok) {
      toast.success(`Email sent to ${sendTo}`);
      setShowSendEmail(false);
      setSendTo("");
      setSendSubject("");
      setSendBody("");
      setSendFile(null);
      setSendPreview(null);
    } else {
      toast.error("Failed to send email");
    }
  };

  const handlePlanChange = async (email: string, newPlan: string) => {
    setChangingPlanFor(email);
    const ok = await updatePlan(email, newPlan);
    if (ok) void refetch();
    setChangingPlanFor(null);
  };

  const handleSendWelcome = async (email: string) => {
    await sendWelcome(email);
  };

  const applyFilter = () => {
    setPage(0);
    setShowFilter(false);
  };

  const clearFilter = () => {
    setFilterPlan("");
    setFilterStatus("");
    setPage(0);
    setShowFilter(false);
  };

  return (
    <AdminLayout title="User Management" subtitle="Manage your application users">
      <div className="space-y-5">
        {/* Search + actions */}
        <div className="rounded-xl border border-slate-200/60 bg-white p-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 transition focus:border-[#8B5CF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowFilter(!showFilter)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-violet-50 px-3.5 py-2.5 text-xs font-semibold text-[#8B5CF6] transition hover:bg-violet-100"
                >
                  <Filter className="size-3.5" aria-hidden />
                  Filter
                  {(filterPlan || filterStatus) && (
                    <span className="ml-1 flex size-4 items-center justify-center rounded-full bg-[#8B5CF6] text-[10px] text-white">
                      {(filterPlan ? 1 : 0) + (filterStatus ? 1 : 0)}
                    </span>
                  )}
                </button>
                {showFilter && (
                  <div className="absolute right-0 top-full z-20 mt-1 w-56 rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
                    <div className="mb-2">
                      <label className="mb-1 block text-[11px] font-semibold uppercase text-slate-500">Plan</label>
                      <select
                        value={filterPlan}
                        onChange={(e) => setFilterPlan(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-xs focus:border-[#8B5CF6] focus:outline-none"
                      >
                        <option value="">All</option>
                        {PLAN_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="mb-1 block text-[11px] font-semibold uppercase text-slate-500">Status</label>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-xs focus:border-[#8B5CF6] focus:outline-none"
                      >
                        <option value="">All</option>
                        {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={clearFilter} className="flex-1 rounded-lg border border-slate-200 px-2 py-1.5 text-xs text-slate-600 hover:bg-slate-50">Clear</button>
                      <button type="button" onClick={applyFilter} className="flex-1 rounded-lg bg-[#8B5CF6] px-2 py-1.5 text-xs text-white hover:bg-violet-600">Apply</button>
                    </div>
                  </div>
                )}
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3.5 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-200"
              >
                <Download className="size-3.5" aria-hidden />
                Export
              </button>
              <button
                type="button"
                onClick={() => setShowSendEmail(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-3.5 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-600"
              >
                <Send className="size-3.5" aria-hidden />
                Send Email
              </button>
              <button
                type="button"
                onClick={() => setShowBulkEmail(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#8B5CF6] px-3.5 py-2.5 text-xs font-semibold text-white transition hover:bg-violet-600"
              >
                <Mail className="size-3.5" aria-hidden />
                Bulk Email
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200/60 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  {["User", "Plan", "Status", "Requests", "Joined", "Actions"].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i}>
                        {Array.from({ length: 6 }).map((_, j) => (
                          <td key={j} className="px-5 py-3.5">
                            <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
                          </td>
                        ))}
                      </tr>
                    ))
                  : filtered.map((u) => (
                      <tr key={u.email} className="transition hover:bg-slate-50/50">
                        <td className="whitespace-nowrap px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <span className="flex size-8 items-center justify-center rounded-full bg-violet-50 text-xs font-semibold text-[#8B5CF6]">
                              {u.email.charAt(0).toUpperCase()}
                            </span>
                            <div>
                              <p className="text-sm font-medium text-slate-800">{u.email}</p>
                              <p className="text-[11px] text-slate-400">User</p>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-5 py-3.5">
                          <div className="relative inline-block">
                            <select
                              value={u.plan_type}
                              disabled={planLoading && changingPlanFor === u.email}
                              onChange={(e) => handlePlanChange(u.email, e.target.value)}
                              className={`appearance-none rounded-full py-0.5 pl-2.5 pr-6 text-[11px] font-semibold ring-1 ${planBadge(u.plan_type)} cursor-pointer border-none focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40`}
                            >
                              {PLAN_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 size-3 -translate-y-1/2 opacity-50" />
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-5 py-3.5">
                          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ${statusBadge(u.subscription_status)}`}>
                            {u.subscription_status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-5 py-3.5 text-sm tabular-nums text-slate-700">
                          {u.total_requests.toLocaleString()}
                        </td>
                        <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-500">
                          {new Date(u.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </td>
                        <td className="whitespace-nowrap px-5 py-3.5">
                          <button
                            type="button"
                            onClick={() => handleSendWelcome(u.email)}
                            className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 transition hover:bg-slate-200"
                          >
                            Welcome Email
                          </button>
                        </td>
                      </tr>
                    ))}
                {!isLoading && filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-sm text-slate-400">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
            <p className="text-xs text-slate-400">
              Page {page + 1} &middot; Showing {filtered.length} users
            </p>
            <div className="flex gap-1.5">
              <button
                type="button"
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={!users || users.length < PAGE_SIZE}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Bulk email modal */}
        {showBulkEmail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
              onClick={() => setShowBulkEmail(false)}
            />
            <div className="relative w-full max-w-md rounded-2xl border border-slate-200/60 bg-white p-6 shadow-2xl">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Send Bulk Email</h2>
                <button
                  type="button"
                  onClick={() => setShowBulkEmail(false)}
                  className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>
              <p className="mb-4 text-xs text-slate-500">
                Sending to all users
              </p>
              <form onSubmit={handleSendBulkEmail} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Subject</label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-[#8B5CF6] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Body</label>
                  <textarea
                    className="min-h-[140px] w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-[#8B5CF6] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
                    placeholder={"Type plain text — blank lines become paragraphs.\nUse **bold** and *italic* for emphasis.\nOr paste raw HTML and it'll be sent as-is."}
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    required
                  />
                  <p className="mt-1 text-[11px] text-slate-500">
                    Plain text is auto-formatted into paragraphs. Paste HTML to send it untouched.
                  </p>
                  <EmailBodyPreview subject={emailSubject} body={emailBody} />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Image <span className="text-slate-400 font-normal">(optional)</span></label>
                  <input
                    ref={bulkImageRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageSelect(e.target.files?.[0], setBulkFile, setBulkPreview)}
                  />
                  {bulkPreview ? (
                    <div className="rounded-xl border border-slate-200 p-2">
                      <div className="relative">
                        <img src={bulkPreview} alt="" className="aspect-[3/1] w-full rounded-lg object-cover" />
                        <button type="button" onClick={() => { setBulkFile(null); setBulkPreview(null); }} className="absolute right-1.5 top-1.5 rounded-full bg-black/50 p-1 text-white hover:bg-black/70">
                          <X className="size-3.5" />
                        </button>
                      </div>
                      <p className="mt-1.5 truncate text-[11px] text-slate-500">{bulkFile?.name}</p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => bulkImageRef.current?.click()}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 px-3 py-3 text-xs text-slate-500 transition hover:border-[#8B5CF6] hover:text-[#8B5CF6]"
                    >
                      <ImagePlus className="size-4" />
                      Upload image
                    </button>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowBulkEmail(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={bulkLoading}
                    className="rounded-xl bg-[#8B5CF6] px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-600 disabled:opacity-60"
                  >
                    {bulkLoading ? "Sending..." : "Send"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Send email modal */}
        {showSendEmail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
              onClick={() => setShowSendEmail(false)}
            />
            <div className="relative w-full max-w-md rounded-2xl border border-slate-200/60 bg-white p-6 shadow-2xl">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Send Email</h2>
                <button
                  type="button"
                  onClick={() => setShowSendEmail(false)}
                  className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>
              <form onSubmit={handleSendEmail} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">To</label>
                  <input
                    type="email"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-[#8B5CF6] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
                    placeholder="recipient@example.com"
                    value={sendTo}
                    onChange={(e) => setSendTo(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Subject</label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-[#8B5CF6] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
                    value={sendSubject}
                    onChange={(e) => setSendSubject(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Body</label>
                  <textarea
                    className="min-h-[140px] w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-[#8B5CF6] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20"
                    placeholder={"Type plain text — blank lines become paragraphs.\nUse **bold** and *italic* for emphasis.\nOr paste raw HTML and it'll be sent as-is."}
                    value={sendBody}
                    onChange={(e) => setSendBody(e.target.value)}
                    required
                  />
                  <p className="mt-1 text-[11px] text-slate-500">
                    Plain text is auto-formatted into paragraphs. Paste HTML to send it untouched.
                  </p>
                  <EmailBodyPreview subject={sendSubject} body={sendBody} />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Image <span className="text-slate-400 font-normal">(optional)</span></label>
                  <input
                    ref={sendImageRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageSelect(e.target.files?.[0], setSendFile, setSendPreview)}
                  />
                  {sendPreview ? (
                    <div className="rounded-xl border border-slate-200 p-2">
                      <div className="relative">
                        <img src={sendPreview} alt="" className="aspect-[3/1] w-full rounded-lg object-cover" />
                        <button type="button" onClick={() => { setSendFile(null); setSendPreview(null); }} className="absolute right-1.5 top-1.5 rounded-full bg-black/50 p-1 text-white hover:bg-black/70">
                          <X className="size-3.5" />
                        </button>
                      </div>
                      <p className="mt-1.5 truncate text-[11px] text-slate-500">{sendFile?.name}</p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => sendImageRef.current?.click()}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 px-3 py-3 text-xs text-slate-500 transition hover:border-[#8B5CF6] hover:text-[#8B5CF6]"
                    >
                      <ImagePlus className="size-4" />
                      Upload image
                    </button>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowSendEmail(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={sendLoading}
                    className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-60"
                  >
                    {sendLoading ? "Sending..." : "Send"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

function EmailBodyPreview({ subject, body }: { subject: string; body: string }) {
  const [open, setOpen] = useState(false);
  const hasContent = body.trim().length > 0;
  const html = useMemo(() => formatEmailBody(body), [body]);

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={!hasContent}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {open ? <EyeOff className="size-3.5" aria-hidden /> : <Eye className="size-3.5" aria-hidden />}
        {open ? "Hide preview" : "Preview email"}
      </button>
      {open && hasContent && (
        <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-slate-50/60 px-4 py-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">
              Subject
            </p>
            <p className="mt-0.5 truncate text-sm font-medium text-slate-900">
              {subject || <span className="text-slate-400">No subject</span>}
            </p>
          </div>
          <div
            className="px-5 py-4 text-[14px] leading-relaxed text-slate-700 [&_a]:text-[#8B5CF6] [&_a]:underline [&_em]:italic [&_h1]:my-3 [&_h1]:text-xl [&_h1]:font-bold [&_h1]:text-slate-900 [&_h2]:my-3 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-slate-900 [&_h3]:my-3 [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-slate-900 [&_li]:my-1 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-3 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-slate-900 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      )}
    </div>
  );
}
