import SidebarContent from "./SidebarContent";

interface SidebarDesktopProps {
  onLogout: () => void;
  onNavigate?: () => void;
}

const SidebarDesktop = ({
  onLogout,
  onNavigate,
}: SidebarDesktopProps) => {
  return (
    <aside className="h-full w-[260px] shrink-0">
      <div className="h-full w-full overflow-hidden rounded-2xl border border-[#e3e7ee] bg-white shadow-sm">
        <SidebarContent
          onLogout={onLogout}
          onNavigate={onNavigate}
        />
      </div>
    </aside>
  );
};

export default SidebarDesktop;