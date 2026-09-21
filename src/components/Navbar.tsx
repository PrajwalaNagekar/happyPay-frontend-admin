import { Bell, Headphones, Search } from "lucide-react";

const Navbar = () => {
  return (
    <header className="flex h-16 items-center justify-between gap-3 rounded-[18px] border border-white/80 bg-white/90 px-3 shadow-[0_10px_28px_-20px_rgba(15,23,42,0.45)] backdrop-blur-md sm:px-4 lg:px-5">
      {/* LEFT */}
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              Retailer workspace
            </p>

            <p className="truncate text-sm font-bold tracking-tight text-slate-900">
              HappyPay operations
            </p>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="hidden min-w-0 flex-1 items-center justify-center px-4 md:flex">
        <div className="flex h-10 w-full max-w-md items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-3 text-slate-400">
          <Search className="h-4 w-4 shrink-0" />

          <span className="truncate text-sm">
            Search services, receipts, or tickets
          </span>
        </div>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex shrink-0 items-center gap-2">
        {/* LIVE STATUS */}
        <span className="hidden items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 sm:inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Live
        </span>

        {/* SUPPORT */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-[#315bd1]"
          aria-label="Support"
        >
          <Headphones className="h-[18px] w-[18px]" />
        </button>

        {/* NOTIFICATIONS */}
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-[#315bd1]"
          aria-label="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" />

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500" />
        </button>

        {/* RETAILER PROFILE */}
        <div className="ml-1 hidden h-10 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2 pr-3 sm:flex">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#edf1fc] text-xs font-bold text-[#315bd1]">
            HP
          </div>

          <div className="leading-tight">
            <p className="text-xs font-bold text-slate-900">
              Ashok
            </p>

            <p className="text-[10px] font-medium text-slate-400">
              Retailer
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;