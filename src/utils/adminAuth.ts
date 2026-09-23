import type { AdminUser } from "../types/admin/auth";

const ADMIN_TOKEN_KEY = "happyPayAdminAccessToken";
const ADMIN_USER_KEY = "happyPayAdminUser";

export function getAdminToken(): string | null {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function getAdminUser(): AdminUser | null {
  const value = localStorage.getItem(ADMIN_USER_KEY);
  if (!value) return null;

  try {
    return JSON.parse(value) as AdminUser;
  } catch {
    return null;
  }
}

export function saveAdminSession(token: string, user?: AdminUser): void {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
  if (user) localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
}

export function clearAdminSession(): void {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_USER_KEY);
}

export function isAdminAuthenticated(): boolean {
  return Boolean(getAdminToken());
}
