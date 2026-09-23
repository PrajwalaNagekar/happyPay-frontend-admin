export interface AuditLog {
  id: string;
  adminId: string;
  userName: string;
  role: string;
  action: string;
  entity: string;
  entityId?: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
  createdBy: AuditActor;
  updatedBy: AuditActor;
  ipAddress?: string;
}

export interface AuditActor {
  adminId?: string;
  name: string;
  role: string;
}

export interface AuditLogFilters {
  page?: number;
  limit?: number;
  search?: string;
  action?: string;
  adminId?: string;
  fromDate?: string;
  toDate?: string;
}
