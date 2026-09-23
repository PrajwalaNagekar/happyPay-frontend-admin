import { apiClient } from "../client";
import { getAdminToken } from "../../../utils/adminAuth";
import type { AdminRetailer, RetailerListFilters } from "../../../types/admin/retailer";

interface Envelope<T> { data: T; message?: string }
interface RetailerList { items: AdminRetailer[]; total: number; page: number; limit: number; totalPages: number }

export function getAdminRetailers(filters: RetailerListFilters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => { if (value !== undefined && value !== "") params.set(key, String(value)); });
  return apiClient<Envelope<RetailerList>>(`/api/admin/retailers?${params.toString()}`, { token: getAdminToken() ?? undefined });
}

export function getAdminRetailer(id: string) {
  return apiClient<Envelope<AdminRetailer>>(`/api/admin/retailers/${id}`, { token: getAdminToken() ?? undefined });
}
