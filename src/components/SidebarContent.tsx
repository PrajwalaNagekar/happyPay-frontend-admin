import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ReceiptText,
  Wallet,
  BarChart3,
  UserCircle,
  FileCheck2,
  Headphones,
  LogOut,
  Banknote,
  Send,
  Fingerprint,
  History,
  ChevronRight,
} from "lucide-react";

interface SidebarContentProps {
  onLogout: () => void;
  onNavigate?: () => void;
}

const SidebarContent = ({
  onLogout,
  onNavigate,
}: SidebarContentProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const goTo = (path: string) => {
    navigate(path);
    onNavigate?.();
  };

  const isActive = (path: string) => {
    if (path === "/retailer") {
      return (
        location.pathname === "/retailer" ||
        location.pathname === "/retailer/"
      );
    }
    return location.pathname === path;
  };

  return (
    <div className="flex h-full w-full flex-col bg-white text-[#172033]">

      {/* HEADER */}
      <div className="flex h-[64px] shrink-0 items-center border-b border-[#e7eaf0] px-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#3156d9] via-[#218bbd] to-[#10a88a] shadow-[0_4px_10px_rgba(49,91,209,0.22)]">
            <span className="text-base font-bold text-white">H</span>
          </div>
          <div>
            <h1 className="text-[15px] font-bold tracking-tight text-[#172033]">HappyPay</h1>
            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#8992a3]">
              Retailer Portal
            </p>
          </div>
        </div>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="custom-scrollbar flex-1 overflow-y-auto px-3 py-4">

        {/* QUICK SERVICES */}
        <p className="mb-2.5 px-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#9aa2b1]">
          Quick Services
        </p>

        <div className="grid grid-cols-2 gap-2">
          <QuickService
            title="AEPS"
            icon={<Fingerprint />}
            active={isActive("/retailer/aeps")}
            onClick={() => goTo("/retailer/aeps")}
          />
          <QuickService
            title="DMT"
            icon={<Send />}
            active={isActive("/retailer/dmt")}
            onClick={() => goTo("/retailer/dmt")}
          />
          <QuickService
            title="CMS"
            icon={<Banknote />}
            active={isActive("/retailer/cms")}
            onClick={() => goTo("/retailer/cms")}
          />
          <QuickService
            title="History"
            icon={<History />}
            active={isActive("/retailer/transactions")}
            onClick={() => goTo("/retailer/transactions")}
          />
        </div>

        {/* MAIN */}
        <SidebarSection title="Main">
          <SidebarItem
            label="Dashboard"
            icon={<LayoutDashboard />}
            active={isActive("/retailer")}
            onClick={() => goTo("/retailer")}
          />
          <SidebarItem
            label="Transactions"
            icon={<ReceiptText />}
            active={isActive("/retailer/transactions")}
            onClick={() => goTo("/retailer/transactions")}
          />
          <SidebarItem
            label="Wallet"
            icon={<Wallet />}
            onClick={onNavigate}
          />
        </SidebarSection>

        {/* MANAGEMENT */}
        <SidebarSection title="Management">
          <SidebarItem
            label="Reports"
            icon={<BarChart3 />}
            onClick={onNavigate}
          />
          <SidebarItem
            label="KYC Status"
            icon={<FileCheck2 />}
            onClick={onNavigate}
          />
          <SidebarItem
            label="Profile"
            icon={<UserCircle />}
            active={location.pathname.startsWith("/retailer/profile")}
            onClick={() => goTo("/retailer/profile")}
          />
        </SidebarSection>

        {/* SUPPORT */}
        <SidebarSection title="Support">
          <SidebarItem
            label="Help & Support"
            icon={<Headphones />}
            active={isActive("/retailer/profile/support")}
            onClick={() => goTo("/retailer/profile/support")}
          />
        </SidebarSection>

      </div>

      {/* LOGOUT */}
      <div className="shrink-0 border-t border-[#e7eaf0] p-3">
        <button
          type="button"
          onClick={onLogout}
          className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[12px] font-semibold text-[#70798a] transition hover:bg-[#fff5f5] hover:text-[#c84f4f]"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f3f5f8] transition group-hover:bg-[#ffe9e9]">
            <LogOut className="h-[14px] w-[14px]" />
          </div>
          <span>Logout</span>
        </button>
      </div>

    </div>
  );
};

/* =============================================================
   QUICK SERVICE
============================================================= */

const QuickService = ({
  title,
  icon,
  active,
  onClick,
}: {
  title: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex h-[68px] flex-col items-center justify-center gap-1.5 rounded-xl border transition-all duration-200 ${
        active
          ? "border-transparent bg-gradient-to-br from-[#3156d9] via-[#218bbd] to-[#10a88a]"
          : "border-[#e0e4eb] bg-[#f8fafc] hover:border-[#c9d4ee] hover:bg-[#f3f6fc]"
      }`}
    >
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-lg transition ${
          active
            ? "bg-white/20 text-white"
            : "bg-[#e9eeff] text-[#315bd1] group-hover:bg-[#dfe7ff]"
        }`}
      >
        <span className="[&>svg]:h-3.5 [&>svg]:w-3.5">
          {icon}
        </span>
      </div>
      <span
        className={`text-[10px] font-semibold ${
          active ? "text-white" : "text-[#596476]"
        }`}
      >
        {title}
      </span>
    </button>
  );
};

/* =============================================================
   SECTION
============================================================= */

const SidebarSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="mt-5">
      <p className="mb-1.5 px-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#9aa2b1]">
        {title}
      </p>
      <div className="space-y-0.5">
        {children}
      </div>
    </div>
  );
};

/* =============================================================
   SIDEBAR ITEM
============================================================= */

const SidebarItem = ({
  label,
  icon,
  active = false,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center justify-between rounded-xl px-3 py-2.5 transition-all duration-200 ${
        active
          ? "bg-gradient-to-r from-[#3156d9] via-[#218bbd] to-[#10a88a] text-white shadow-[0_4px_12px_rgba(49,91,209,0.20)]"
          : "text-[#687286] hover:bg-[#f3f5fa] hover:text-[#315bd1]"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-lg ${
            active
              ? "bg-white/15 text-white"
              : "text-[#8992a3] group-hover:text-[#315bd1]"
          }`}
        >
          <span className="[&>svg]:h-[15px] [&>svg]:w-[15px]">
            {icon}
          </span>
        </div>
        <span className="text-[12px] font-semibold">{label}</span>
      </div>

      <ChevronRight
        className={`h-3 w-3 ${
          active ? "text-white/70" : "text-[#c2c8d2] group-hover:text-[#315bd1]"
        }`}
      />
    </button>
  );
};

export default SidebarContent;
