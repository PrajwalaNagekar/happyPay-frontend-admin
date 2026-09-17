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
    <aside className="h-full w-[248px] shrink-0">
      <div className="h-full overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#172536] shadow-[0_12px_40px_rgba(23,37,54,0.18)]">
        <SidebarContent
          onLogout={onLogout}
          onNavigate={onNavigate}
        />
      </div>
    </aside>  
  );
};

export default SidebarDesktop;