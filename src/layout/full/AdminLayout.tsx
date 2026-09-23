import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { clearAdminSession } from "../../utils/adminAuth";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false); const [mobileOpen, setMobileOpen] = useState(false); const navigate = useNavigate();
  const logout = () => { clearAdminSession(); navigate("/admin/login", { replace: true }); };
  return <div className="hp-canvas flex h-screen overflow-hidden text-[#0f172a]"><AdminSidebar collapsed={collapsed} mobileOpen={mobileOpen} onToggle={() => setCollapsed((value) => !value)} onCloseMobile={() => setMobileOpen(false)} onLogout={logout} /><div className="flex min-w-0 flex-1 flex-col overflow-hidden"><div className="shrink-0 px-3 pb-0 pt-3 sm:px-4 lg:px-6 lg:pt-4"><AdminNavbar onOpenMobile={() => setMobileOpen(true)} /></div><main className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-3 py-4 sm:px-4 lg:px-6 lg:py-5"><Outlet /></main></div></div>;
}
