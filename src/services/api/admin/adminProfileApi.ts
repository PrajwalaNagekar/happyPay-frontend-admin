import { apiClient } from "../client";
import type { AdminUser } from "../../../types/admin/auth";
import { getAdminToken } from "../../../utils/adminAuth";

export function getAdminProfile() {
  return apiClient<AdminUser>("/api/admin/profile", {
    token: getAdminToken() ?? undefined,
  });
}
