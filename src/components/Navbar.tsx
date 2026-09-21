import { Menu } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  return (
    <header className="flex h-12 items-center justify-between rounded-xl border border-[#e3e7ee] bg-white px-4 shadow-sm">

      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={onMenuClick}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#687286] transition hover:bg-[#f3f5fa] hover:text-[#315bd1] lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Desktop: Brand */}
      <div className="hidden items-center gap-2.5 lg:flex">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#3156d9] via-[#218bbd] to-[#10a88a]">
          <span className="text-xs font-bold text-white">H</span>
        </div>
        <span className="text-sm font-semibold text-[#172033]">HappyPay</span>
        <span className="text-[#dde1e9]">/</span>
        <span className="text-xs text-[#8992a3]">Retailer Portal</span>
      </div>

      {/* Right — empty spacer on mobile so hamburger aligns left */}
      <div className="ml-auto" />

    </header>
  );
};

export default Navbar;
