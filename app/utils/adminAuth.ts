import Cookies from "js-cookie";

const ADMIN_TOKEN_KEY = "legit";
const ADMIN_USER_KEY = "legitWriterAdminUser";

export interface AdminUserData {
  email: string;
  name: string;
  plan: string;
}

export function setAdminToken(token: string, user?: AdminUserData): void {
  if (typeof window === "undefined") return;
  Cookies.set(ADMIN_TOKEN_KEY, token, {
    expires: 7,
    path: "/",
    sameSite: "Lax",
  });
  if (user) {
    localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
  }
}

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return Cookies.get(ADMIN_TOKEN_KEY) || null;
}

export function getAdminUser(): AdminUserData | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(ADMIN_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminUserData;
  } catch {
    return null;
  }
}

export function isAdmin(): boolean {
  return !!getAdminToken();
}

export function logoutAdmin(): void {
  if (typeof window === "undefined") return;
  Cookies.remove(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_USER_KEY);
  window.location.href = "/admin/login";
}

export function clearAdminSession(): void {
  if (typeof window === "undefined") return;
  Cookies.remove(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_USER_KEY);
}
