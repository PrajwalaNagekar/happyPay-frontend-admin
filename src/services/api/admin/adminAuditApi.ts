import { apiClient } from "../client";
import type { AuditLog, AuditLogFilters } from "../../../types/admin/audit";
import { getAdminToken } from "../../../utils/adminAuth";

export function getAdminAuditLogs(filters: AuditLogFilters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "") params.set(key, String(value));
  });

  return apiClient<{ data: { logs: AuditLog[]; total?: number; page: number; limit: number; totalPages: number } }>(
    `/api/admin/audit-logs?${params.toString()}`,
    { token: getAdminToken() ?? undefined },
  );
}
