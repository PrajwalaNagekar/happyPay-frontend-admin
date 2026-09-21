import {
  Building2,
  CreditCard,
  LockKeyhole,
  Headphones,
  ChevronRight,
  UserCircle,
  ShieldCheck,
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
    <div className="px-1 py-1">
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
        {/* Only the color/theme of this card is changed */}
        <section className="hp-brand mb-5 rounded-[22px] p-5 text-white shadow-[0_16px_36px_-16px_rgba(49,91,209,0.55)]">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

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
                  className="hp-card group flex w-full items-center gap-3 rounded-2xl p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#315bd1]/30 hover:shadow-[0_14px_28px_-18px_rgba(49,91,209,0.4)]"
                >
                  {/* Icon */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#edf1fc] transition-colors duration-200 group-hover:bg-[#315bd1]">
                    <Icon className="h-4 w-4 text-[#315bd1] transition-colors duration-200 group-hover:text-white" />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {option.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {option.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="h-5 w-5 shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#315bd1]" />
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


