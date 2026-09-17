import { Menu } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  return (
    <header className="flex h-16 items-center justify-between rounded-2xl bg-background px-4 shadow-sm">

      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={onMenuClick}
        className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted lg:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Desktop title */}
      <div className="hidden lg:block">
        <h1 className="text-lg font-semibold">
          Retailer Dashboard
        </h1>
      </div>

      {/* Right side */}
      <div className="ml-auto">
        {/* Profile / notifications etc. */}
      </div>

    </header>
  );
};

export default Navbar;