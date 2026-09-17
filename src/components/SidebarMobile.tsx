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
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        onClick={() => onOpenChange(false)}
      />

      {/* Mobile Sidebar */}
      <aside className="fixed left-0 top-0 z-50 h-screen w-[280px] bg-[#1f3043] shadow-2xl lg:hidden">

        {/* Close Button */}
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-3 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

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