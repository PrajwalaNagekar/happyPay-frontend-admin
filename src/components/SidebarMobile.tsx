import { X } from "lucide-react";
import SidebarContent from "./SidebarContent";

interface SidebarMobileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SidebarMobile = ({
  open,
  onOpenChange,
}: SidebarMobileProps) => {
  if (!open) return null;

  return (
    <>
      {/* =========================================================
          OVERLAY
      ========================================================= */}

      <div
        className="fixed inset-0 z-40 bg-[#172033]/45 backdrop-blur-[2px] lg:hidden"
        onClick={() => onOpenChange(false)}
      />

      {/* =========================================================
          MOBILE SIDEBAR
      ========================================================= */}

      <aside className="fixed left-0 top-0 z-50 h-screen w-[290px] overflow-hidden border-r border-[#e1e5ec] bg-white shadow-[10px_0_35px_rgba(23,32,51,0.14)] lg:hidden">
        {/* =======================================================
            CLOSE BUTTON
        ======================================================= */}

        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="Close sidebar"
          className="absolute right-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-lg bg-[#f3f5f8] text-[#687286] transition hover:bg-[#eef2ff] hover:text-[#315bd1]"
        >
          <X className="h-[18px] w-[18px]" strokeWidth={2} />
        </button>

        {/* =======================================================
            SIDEBAR CONTENT
        ======================================================= */}

        <SidebarContent
          onLogout={() => {
            onOpenChange(false);
          }}
          onNavigate={() => {
            onOpenChange(false);
          }}
        />
      </aside>
    </>
  );
};

export default SidebarMobile;