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
    <aside className="hp-retailer-card h-full w-[250px] shrink-0 overflow-hidden flex flex-col">
      <SidebarContent
        onLogout={onLogout}
        onNavigate={onNavigate}
      />
    </aside>
  );
};

export default SidebarDesktop;