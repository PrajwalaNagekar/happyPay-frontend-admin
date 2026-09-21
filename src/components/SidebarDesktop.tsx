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
    <aside className="h-full w-[250px] shrink-0 border-r border-[#e5e7eb] bg-white">
      <SidebarContent
        onLogout={onLogout}
        onNavigate={onNavigate}
      />
    </aside>
  );
};

export default SidebarDesktop;