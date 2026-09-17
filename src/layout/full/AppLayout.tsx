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
    <div className="flex h-screen overflow-hidden bg-muted/40 text-foreground">

      <div className="hidden lg:flex p-4 lg:pr-6 h-full">
        <SidebarDesktop onLogout={handleLogout} />
      </div>

      <SidebarMobile
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        onLogout={handleLogout}
      />

      <div className="flex flex-col flex-1 relative min-w-0">

        <div className="p-4 pb-0 lg:p-4 lg:pl-0 z-20">
          <Navbar
            onMenuClick={() => setSidebarOpen(true)}
          />
        </div>

        <main className="flex-1 overflow-auto p-4 lg:p-4 lg:pl-0 lg:pt-2">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AppLayout;