import {
  Building2,
  CreditCard,
  LockKeyhole,
  Headphones,
  ChevronRight,
  UserCircle,
  ShieldCheck,
  Receipt,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const profileOptions = [
    {
      title: "Shop Information",
      description: "Manage your shop and business information",
      icon: Building2,
      path: "/retailer/profile/shop",
    },
    {
      title: "Bank Details",
      description: "View and manage your registered bank details",
      icon: CreditCard,
      path: "/retailer/profile/bank",
    },
    {
      title: "Settlements",
      description: "View and manage your settlements",
      icon: Receipt,
      path: "/retailer/profile/settlements",
    },
    {
      title: "Security Settings",
      description: "Manage your password and account security",
      icon: LockKeyhole,
      path: "/retailer/profile/security",
    },
    {
      title: "Help & Support",
      description: "Get help and contact support",
      icon: Headphones,
      path: "/retailer/profile/support",
    },
  ];

  return (
    <div className="px-4 py-4 sm:px-6">
      <div className="mx-auto w-full max-w-5xl">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-lg font-bold text-slate-900">
            Profile
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your profile, business information and account settings
          </p>
        </div>

        {/* Profile Overview */}
        <section className="hp-retailer-gradient-card relative mb-6 overflow-hidden rounded-[1.5rem] p-6 text-white">
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center">

            {/* Avatar */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/15">
              <UserCircle className="h-8 w-8 text-white" />
            </div>

            {/* User Information */}
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold text-white">
                Retailer
              </h2>

              <p className="mt-1 text-sm text-white/80">
                Retailer Account
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2">

                {/* Active */}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  Active
                </span>

                {/* Retailer */}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Retailer
                </span>

              </div>
            </div>
          </div>
        </section>

        {/* Account Settings */}
        <section>
          <div className="mb-3">
            <h2 className="text-sm font-semibold text-slate-900">
              Account Settings
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Choose an option to manage your account
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {profileOptions.map((option) => {
              const Icon = option.icon;

              return (
                <button
                  key={option.path}
                  type="button"
                  onClick={() => navigate(option.path)}
                  className="hp-retailer-card group flex w-full items-center gap-4 rounded-[1.25rem] p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed]/50"
                >
                  {/* Icon */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f8f5ff] transition-colors duration-300 group-hover:bg-[#7c3aed]">
                    <Icon className="h-5 w-5 text-[#7c3aed] transition-colors duration-300 group-hover:text-white" />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] font-bold text-[#0f172a]">
                      {option.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-[#64748b]">
                      {option.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="h-5 w-5 shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#7c3aed]" />
                </button>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Profile;


