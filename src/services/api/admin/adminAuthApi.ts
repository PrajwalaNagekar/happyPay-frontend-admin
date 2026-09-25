import { apiClient } from "../client";
import type {
  AdminLoginRequest,
  AdminLoginResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "../../../types/admin/auth";
import { clearAdminSession, getAdminToken } from "../../../utils/adminAuth";

interface ApiEnvelope<T> {
  data: T;
  message?: string;
}

const unwrap = <T,>(response: ApiEnvelope<T>) => response.data;

export async function loginAdmin(payload: AdminLoginRequest): Promise<AdminLoginResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        accessToken: "dummy_admin_token_12345",
        admin: {
          id: "ADM01",
          name: "Super Admin",
          email: payload.email || "admin@happypay.in",
          mobile: payload.mobile || "9876543210",
          role: "Super Admin",
          status: "active",
        },
      });
    }, 600);
  });
}


export function forgotPassword(payload: ForgotPasswordRequest) {
  return apiClient<ApiEnvelope<{ message?: string; resetUrl?: string }>>("/api/admin/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(payload),
  }).then(unwrap);
}

export function resetPassword(payload: ResetPasswordRequest) {
  return apiClient<ApiEnvelope<{ message?: string }>>("/api/admin/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(payload),
  }).then(unwrap);
}

export function logoutAdmin() {
  const token = getAdminToken();
  clearAdminSession();
  if (!token) return Promise.resolve();

  return apiClient<void>("/api/admin/auth/logout", {
    method: "POST",
    token,
  }).catch(() => undefined);
}
