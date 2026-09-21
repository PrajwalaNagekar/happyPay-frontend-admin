import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import SidebarDesktop from "../../components/SidebarDesktop";
import SidebarMobile from "../../components/SidebarMobile";
import Navbar from "../../components/Navbar";
import { logout } from "../../utils/auth";
const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/retailer/login", {
      replace: true,
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f0f3f9] text-[#172033]">

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex h-full w-[272px] shrink-0 flex-col p-3 pr-0">
        <SidebarDesktop onLogout={handleLogout} />
      </div>

      <SidebarMobile
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
      />

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* Navbar */}
        <div className="shrink-0 px-3 pt-3 pb-0 lg:px-4 lg:pt-3">
          <Navbar
            onMenuClick={() => setSidebarOpen(true)}
          />
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-3 lg:px-4 lg:py-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;