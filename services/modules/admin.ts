/**
 * Admin API module.
 * Auth endpoints use the shared `post` (no admin token needed).
 * Data endpoints use `adminGet`/`adminPost` (admin token required).
 */

import { post } from "../apiClient";
import { adminGet, adminPost, adminPostForm } from "../adminApiClient";
import type {
  AdminLoginBody,
  AdminLoginResponse,
  AdminVerifyTotpBody,
  AdminVerifyRecoveryBody,
  AdminAuthResponse,
  AdminStatsResponse,
  AdminUser,
  AdminUsersParams,
  SendEmailResponse,
} from "../dtos/admin";

const ADMIN = "/admin";

// ── Auth (no token required) ──

export async function adminLogin(body: AdminLoginBody): Promise<AdminLoginResponse> {
  return post<AdminLoginResponse, AdminLoginBody>(`${ADMIN}/login`, body);
}

export async function adminVerifyTotp(body: AdminVerifyTotpBody): Promise<AdminAuthResponse> {
  return post<AdminAuthResponse, AdminVerifyTotpBody>(`${ADMIN}/verify-totp`, body);
}

export async function adminVerifyRecovery(body: AdminVerifyRecoveryBody): Promise<AdminAuthResponse> {
  return post<AdminAuthResponse, AdminVerifyRecoveryBody>(`${ADMIN}/verify-recovery-code`, body);
}

// ── Data (admin token required) ──

export async function getStats(): Promise<AdminStatsResponse> {
  return adminGet<AdminStatsResponse>(`${ADMIN}/stats`);
}

export async function getUsers(params?: AdminUsersParams): Promise<AdminUser[]> {
  const query: Record<string, string> = {};
  if (params?.skip != null) query.skip = String(params.skip);
  if (params?.limit != null) query.limit = String(params.limit);
  if (params?.plan_type) query.plan_type = params.plan_type;
  if (params?.subscription_status) query.subscription_status = params.subscription_status;
  return adminGet<AdminUser[]>(`${ADMIN}/users`, query);
}

export async function getAllUsers(): Promise<AdminUser[]> {
  return adminGet<AdminUser[]>(`${ADMIN}/users/all`);
}

export async function getRequests(params?: { start_date?: string; end_date?: string }): Promise<unknown> {
  const query: Record<string, string> = {};
  if (params?.start_date) query.start_date = params.start_date;
  if (params?.end_date) query.end_date = params.end_date;
  return adminGet(`${ADMIN}/requests`, query);
}

export async function updateUserPlan(body: { email: string; new_plan: string }): Promise<unknown> {
  return adminPost(`${ADMIN}/users/${encodeURIComponent(body.email)}/update-plan?plan_type=${encodeURIComponent(body.new_plan)}`);
}

/**
 * The email backend renders the `body` field as HTML, so plain text with
 * blank-line paragraph breaks collapses. Detect plain-text input and convert
 * it to safe HTML (escape entities, paragraph splits, single-line breaks,
 * light markdown for **bold** / *italic*). HTML input passes through untouched.
 */
function looksLikeHtml(text: string): boolean {
  return /<\s*(p|div|br|h[1-6]|ul|ol|li|a\s|strong|em|b|i|table|img|span|hr)\b/i.test(text);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function applyLightMarkdown(text: string): string {
  // **bold**  →  <strong>bold</strong>
  // *italic*  →  <em>italic</em>     (single asterisk, not inside a **bold**)
  return text
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, "$1<em>$2</em>");
}

export function formatEmailBody(body: string): string {
  const trimmed = body.trim();
  if (!trimmed) return "";
  if (looksLikeHtml(trimmed)) return body;

  const escaped = escapeHtml(trimmed);
  const paragraphs = escaped
    .split(/\n{2,}/)
    .map((para) => applyLightMarkdown(para).replace(/\n/g, "<br>"))
    .map((para) => `<p>${para}</p>`);
  return paragraphs.join("");
}

export async function sendEmail(fields: {
  to: string;
  subject: string;
  body: string;
  image?: File;
}): Promise<SendEmailResponse> {
  const fd = new FormData();
  fd.append("to", fields.to);
  fd.append("subject", fields.subject);
  fd.append("body", formatEmailBody(fields.body));
  if (fields.image) fd.append("image", fields.image);
  return adminPostForm<SendEmailResponse>(`${ADMIN}/send-email`, fd);
}

export async function bulkEmail(fields: {
  subject: string;
  body: string;
  user_emails: string[];
  image?: File;
}): Promise<unknown> {
  const fd = new FormData();
  fd.append("subject", fields.subject);
  fd.append("body", formatEmailBody(fields.body));
  if (fields.user_emails.length > 0) {
    fd.append("user_emails", fields.user_emails.join(", "));
  }
  if (fields.image) fd.append("image", fields.image);
  return adminPostForm(`${ADMIN}/bulk-email`, fd);
}

export async function sendWelcomeEmail(body: { email: string }): Promise<unknown> {
  return adminPost(`${ADMIN}/send-welcome-email`, body);
}

export async function updateCredits(): Promise<unknown> {
  return adminPost(`${ADMIN}/update-credits`);
}

export async function updateSubscriptions(): Promise<unknown> {
  return adminPost(`${ADMIN}/update-subscriptions`);
}

export const adminApi = {
  adminLogin,
  adminVerifyTotp,
  adminVerifyRecovery,
  getStats,
  getUsers,
  getAllUsers,
  getRequests,
  updateUserPlan,
  sendEmail,
  bulkEmail,
  sendWelcomeEmail,
  updateCredits,
  updateSubscriptions,
};
