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
      <div
        className="fixed inset-0 z-40 bg-slate-900/45 backdrop-blur-[3px] lg:hidden"
        onClick={() => onOpenChange(false)}
      />

      <aside className="fixed left-0 top-0 z-50 h-screen w-[300px] overflow-hidden border-r border-slate-200/80 bg-white shadow-[16px_0_40px_rgba(15,23,42,0.16)] lg:hidden">
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="Close sidebar"
          className="absolute right-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-[#eef2ff] hover:text-[#315bd1]"
        >
          <X className="h-[18px] w-[18px]" strokeWidth={2} />
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
