import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAdminAuthenticated } from "../../utils/adminAuth";

export default function AdminProtectedRoute() {
  const location = useLocation();
  return isAdminAuthenticated() ? <Outlet /> : <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
}
