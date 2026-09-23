import { Navigate, Outlet } from "react-router-dom";
import { isAdminAuthenticated } from "../../utils/adminAuth";

export default function AdminPublicRoute() {
  return isAdminAuthenticated() ? <Navigate to="/admin/dashboard" replace /> : <Outlet />;
}
