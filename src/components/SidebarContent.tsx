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
  return (
    <div className="flex h-full w-full flex-col bg-[#172536] text-white">

      {/* ============================================================
          HEADER / LOGO
      ============================================================ */}

      <div className="flex h-[76px] shrink-0 items-center border-b border-white/[0.08] px-5">
        <div className="flex items-center gap-3">

          {/* Logo */}
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-[#4A3E94]
              shadow-[0_8px_20px_rgba(74,62,148,0.30)]
            "
          >
            <span className="text-lg font-bold text-white">
              H
            </span>
          </div>

          {/* Brand */}
          <div>
            <h1 className="text-[16px] font-bold tracking-tight text-white">
              HappyPay
            </h1>

            <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
              Retailer Portal
            </p>
          </div>

        </div>
      </div>

      {/* ============================================================
          SCROLLABLE CONTENT
      ============================================================ */}

      <div className="custom-scrollbar flex-1 overflow-y-auto px-3 py-5">

        {/* ==========================================================
            QUICK SERVICES
        ========================================================== */}

        <div className="grid grid-cols-2 gap-2.5 px-1">

          {/* AEPS */}
          <button
            type="button"
            onClick={onNavigate}
            className="
              group
              flex
              h-[78px]
              flex-col
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-white/[0.08]
              bg-[#223449]
              text-white
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:border-[#4A3E94]/50
              hover:bg-[#2A3D52]
              hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)]
            "
          >
            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                bg-[#4A3E94]/20
                transition
                group-hover:bg-[#4A3E94]
              "
            >
              <Fingerprint className="h-4 w-4 text-[#B5AFD5] group-hover:text-white" />
            </div>

            <span className="text-[10px] font-medium text-white/75 group-hover:text-white">
              AEPS
            </span>
          </button>

          {/* DMT */}
          <button
            type="button"
            onClick={onNavigate}
            className="
              group
              flex
              h-[78px]
              flex-col
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-white/[0.08]
              bg-[#223449]
              text-white
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:border-[#4A3E94]/50
              hover:bg-[#2A3D52]
              hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)]
            "
          >
            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                bg-[#4A3E94]/20
                transition
                group-hover:bg-[#4A3E94]
              "
            >
              <Send className="h-4 w-4 text-[#B5AFD5] group-hover:text-white" />
            </div>

            <span className="text-[10px] font-medium text-white/75 group-hover:text-white">
              DMT
            </span>
          </button>

          {/* CMS */}
          <button
            type="button"
            onClick={onNavigate}
            className="
              group
              flex
              h-[78px]
              flex-col
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-white/[0.08]
              bg-[#223449]
              text-white
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:border-[#4A3E94]/50
              hover:bg-[#2A3D52]
              hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)]
            "
          >
            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                bg-[#4A3E94]/20
                transition
                group-hover:bg-[#4A3E94]
              "
            >
              <Banknote className="h-4 w-4 text-[#B5AFD5] group-hover:text-white" />
            </div>

            <span className="text-[10px] font-medium text-white/75 group-hover:text-white">
              CMS
            </span>
          </button>

          {/* HISTORY */}
          <button
            type="button"
            onClick={onNavigate}
            className="
              group
              flex
              h-[78px]
              flex-col
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-white/[0.08]
              bg-[#223449]
              text-white
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:border-[#4A3E94]/50
              hover:bg-[#2A3D52]
              hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)]
            "
          >
            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                bg-[#4A3E94]/20
                transition
                group-hover:bg-[#4A3E94]
              "
            >
              <History className="h-4 w-4 text-[#B5AFD5] group-hover:text-white" />
            </div>

            <span className="text-[10px] font-medium text-white/75 group-hover:text-white">
              History
            </span>
          </button>

        </div>

        {/* ==========================================================
            MAIN
        ========================================================== */}

        <p
          className="
            mb-2
            mt-7
            px-3
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-white/30
          "
        >
          Main
        </p>

        <nav className="space-y-1">

          {/* Dashboard — ACTIVE */}
          <button
            type="button"
            onClick={onNavigate}
            className="
              group
              flex
              w-full
              items-center
              justify-between
              rounded-xl
              bg-[#4A3E94]
              px-3.5
              py-2.5
              text-[11px]
              font-semibold
              text-white
              shadow-[0_6px_16px_rgba(74,62,148,0.22)]
              transition-all
              hover:bg-[#5549A0]
            "
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard className="h-[17px] w-[17px]" />
              <span>Dashboard</span>
            </div>

            <ChevronRight className="h-3.5 w-3.5 text-white/50" />
          </button>

          {/* Transactions */}
          <button
            type="button"
            onClick={onNavigate}
            className="
              group
              flex
              w-full
              items-center
              justify-between
              rounded-xl
              px-3.5
              py-2.5
              text-[11px]
              font-medium
              text-white/55
              transition-all
              hover:bg-white/[0.06]
              hover:text-white
            "
          >
            <div className="flex items-center gap-3">
              <ReceiptText className="h-[17px] w-[17px] text-white/45 group-hover:text-[#B5AFD5]" />
              <span>Transactions</span>
            </div>

            <ChevronRight className="h-3.5 w-3.5 text-white/10 group-hover:text-white/30" />
          </button>

          {/* Wallet */}
          <button
            type="button"
            onClick={onNavigate}
            className="
              group
              flex
              w-full
              items-center
              justify-between
              rounded-xl
              px-3.5
              py-2.5
              text-[11px]
              font-medium
              text-white/55
              transition-all
              hover:bg-white/[0.06]
              hover:text-white
            "
          >
            <div className="flex items-center gap-3">
              <Wallet className="h-[17px] w-[17px] text-white/45 group-hover:text-[#B5AFD5]" />
              <span>Wallet</span>
            </div>

            <ChevronRight className="h-3.5 w-3.5 text-white/10 group-hover:text-white/30" />
          </button>

        </nav>

        {/* ==========================================================
            MANAGEMENT
        ========================================================== */}

        <p
          className="
            mb-2
            mt-7
            px-3
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-white/30
          "
        >
          Management
        </p>

        <nav className="space-y-1">

          {/* Reports */}
          <button
            type="button"
            onClick={onNavigate}
            className="
              group
              flex
              w-full
              items-center
              justify-between
              rounded-xl
              px-3.5
              py-2.5
              text-[11px]
              font-medium
              text-white/55
              transition-all
              hover:bg-white/[0.06]
              hover:text-white
            "
          >
            <div className="flex items-center gap-3">
              <BarChart3 className="h-[17px] w-[17px] text-white/45 group-hover:text-[#B5AFD5]" />
              <span>Reports</span>
            </div>

            <ChevronRight className="h-3.5 w-3.5 text-white/10 group-hover:text-white/30" />
          </button>

          {/* KYC */}
          <button
            type="button"
            onClick={onNavigate}
            className="
              group
              flex
              w-full
              items-center
              justify-between
              rounded-xl
              px-3.5
              py-2.5
              text-[11px]
              font-medium
              text-white/55
              transition-all
              hover:bg-white/[0.06]
              hover:text-white
            "
          >
            <div className="flex items-center gap-3">
              <FileCheck2 className="h-[17px] w-[17px] text-white/45 group-hover:text-[#B5AFD5]" />
              <span>KYC Status</span>
            </div>

            <ChevronRight className="h-3.5 w-3.5 text-white/10 group-hover:text-white/30" />
          </button>

          {/* Profile */}
          <button
            type="button"
            onClick={onNavigate}
            className="
              group
              flex
              w-full
              items-center
              justify-between
              rounded-xl
              px-3.5
              py-2.5
              text-[11px]
              font-medium
              text-white/55
              transition-all
              hover:bg-white/[0.06]
              hover:text-white
            "
          >
            <div className="flex items-center gap-3">
              <UserCircle className="h-[17px] w-[17px] text-white/45 group-hover:text-[#B5AFD5]" />
              <span>Profile</span>
            </div>

            <ChevronRight className="h-3.5 w-3.5 text-white/10 group-hover:text-white/30" />
          </button>

        </nav>

        {/* ==========================================================
            SUPPORT
        ========================================================== */}

        <p
          className="
            mb-2
            mt-7
            px-3
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-white/30
          "
        >
          Support
        </p>

        <nav>
          <button
            type="button"
            onClick={onNavigate}
            className="
              group
              flex
              w-full
              items-center
              justify-between
              rounded-xl
              px-3.5
              py-2.5
              text-[11px]
              font-medium
              text-white/55
              transition-all
              hover:bg-white/[0.06]
              hover:text-white
            "
          >
            <div className="flex items-center gap-3">
              <Headphones className="h-[17px] w-[17px] text-white/45 group-hover:text-[#B5AFD5]" />
              <span>Support</span>
            </div>

            <ChevronRight className="h-3.5 w-3.5 text-white/10 group-hover:text-white/30" />
          </button>
        </nav>

      </div>

      {/* ============================================================
          LOGOUT
      ============================================================ */}

      <div className="shrink-0 border-t border-white/[0.08] p-3">
        <button
          type="button"
          onClick={onLogout}
          className="
            group
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-3.5
            py-2.5
            text-[11px]
            font-medium
            text-white/50
            transition-all
            hover:bg-[#B85C5C]/10
            hover:text-[#D98A8A]
          "
        >
          <LogOut className="h-[17px] w-[17px] transition-transform group-hover:-translate-x-0.5" />

          <span>Logout</span>
        </button>
      </div>

    </div>
  );
};

export default SidebarContent;