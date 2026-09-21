import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Fingerprint,
  Send,
  WalletCards,
  Eye,
  EyeOff,
  Plus,
  CheckCircle2,
  ShieldCheck,
  X,
  IdCard,
  Smartphone,
  Tv,
  CreditCard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type ServicePath =
  | "/retailer/aeps"
  | "/retailer/dmt"
  | "/retailer/cms";

type PendingNavigation = ServicePath | null;

type ComingSoonService = "Mobile Recharge" | "DTH" | "PAN Services";

const getToday = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getLoggedInRetailerMobile = (): string => {
  const mobile = localStorage.getItem("retailerMobile");

  if (!mobile) {
    return "";
  }

  return mobile.replace(/\D/g, "").slice(-10);
};

const Dashboard = () => {
  const navigate = useNavigate();

  const retailerMobile = getLoggedInRetailerMobile();
  const twoFAStorageKey = `happypay_2fa_completed_${retailerMobile}`;

  const [activeBanner, setActiveBanner] = useState(0);
  const [showBalance, setShowBalance] = useState(true);
  const [walletBalance, setWalletBalance] = useState(24580.5);

  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [addMoneyAmount, setAddMoneyAmount] = useState("500");
  const [showMoneyAddedToast, setShowMoneyAddedToast] = useState(false);
  const [lastAddedAmount, setLastAddedAmount] = useState(0);

  const [is2FACompleted, setIs2FACompleted] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [show2FASuccess, setShow2FASuccess] = useState(false);
  const [show2FAToast, setShow2FAToast] = useState(false);
  const [pendingNavigation, setPendingNavigation] =
    useState<PendingNavigation>(null);
  const [aadhaar, setAadhaar] = useState("");

  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const [comingSoonService, setComingSoonService] =
    useState<ComingSoonService | null>(null);

  const banners = useMemo(
    () => [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    ],
    [],
  );

  const maskedMobile =
    retailerMobile.length === 10
      ? `+91 ${retailerMobile.slice(0, 2)}XXXXXX${retailerMobile.slice(-2)}`
      : "Registered mobile number";

  const checkDaily2FA = useCallback(() => {
    if (!retailerMobile) {
      setIs2FACompleted(false);
      setShow2FAModal(false);
      return;
    }

    const completedDate = localStorage.getItem(twoFAStorageKey);

    if (completedDate === getToday()) {
      setIs2FACompleted(true);
      setShow2FAModal(false);
    } else {
      setIs2FACompleted(false);
      setShow2FAModal(true);
    }
  }, [
    retailerMobile,
    twoFAStorageKey,
    setIs2FACompleted,
    setShow2FAModal,
  ]);

  useEffect(() => {
    const initialCheck = window.setTimeout(() => {
      checkDaily2FA();
    }, 0);

    const interval = window.setInterval(() => {
      checkDaily2FA();
    }, 60 * 1000);

    return () => {
      window.clearTimeout(initialCheck);
      window.clearInterval(interval);
    };
  }, [checkDaily2FA]);

  const handleBannerScroll = (
    event: React.UIEvent<HTMLDivElement>,
  ) => {
    const container = event.currentTarget;
    const children = Array.from(
      container.children,
    ) as HTMLElement[];

    if (!children.length) {
      return;
    }

    let closestIndex = 0;
    let closestDistance = Infinity;

    children.forEach((child, index) => {
      const distance = Math.abs(
        child.offsetLeft - container.scrollLeft,
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveBanner(closestIndex);
  };

  const goToBanner = (index: number) => {
    const container =
      document.getElementById("dashboard-banners");
    const banner = document.getElementById(
      `dashboard-banner-${index}`,
    );

    if (!container || !banner) {
      return;
    }

    container.scrollTo({
      left: banner.offsetLeft,
      behavior: "smooth",
    });

    setActiveBanner(index);
  };

  const handleAadhaarChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 12);

    setAadhaar(value);
  };

  const handleServiceClick = (path: ServicePath) => {
    if (is2FACompleted) {
      navigate(path);
      return;
    }

    setPendingNavigation(path);
    setShow2FASuccess(false);
    setShow2FAModal(true);
  };

  const handleComingSoonClick = (
    service: ComingSoonService,
  ) => {
    setComingSoonService(service);
    setShowComingSoonModal(true);
  };

  const handleStart2FA = () => {
    if (aadhaar.length !== 12) {
      return;
    }

    /*
     * Same biometric UX used in AEPS:
     * show fingerprint capture first, then complete
     * the authentication step.
     *
     * This is the existing AEPS-style frontend simulation.
     * Aeps.tsx is not modified.
     */
    setIsAuthenticating(true);
    setShow2FASuccess(false);

    window.setTimeout(() => {
      localStorage.setItem(
        twoFAStorageKey,
        getToday(),
      );

      setIsAuthenticating(false);
      setIs2FACompleted(true);
      setShow2FASuccess(true);
      setShow2FAToast(true);

      window.setTimeout(() => {
        setShow2FAToast(false);
      }, 4000);
    }, 2500);
  };

  const handleClose2FA = () => {
    if (isAuthenticating || show2FASuccess) {
      return;
    }

    setShow2FAModal(false);
    setShow2FASuccess(false);
    setPendingNavigation(null);
  };

  useEffect(() => {
    if (!show2FASuccess) {
      return;
    }

    const timer = window.setTimeout(() => {
      setShow2FAModal(false);
      setShow2FASuccess(false);

      if (pendingNavigation) {
        navigate(pendingNavigation);
        setPendingNavigation(null);
      }
    }, 1200);

    return () => {
      window.clearTimeout(timer);
    };
  }, [show2FASuccess, pendingNavigation, navigate]);

  const handleAddMoney = () => {
    const numericAmount = Number(addMoneyAmount);

    if (!numericAmount || numericAmount <= 0) {
      return;
    }

    setWalletBalance((previous) => previous + numericAmount);
    setLastAddedAmount(numericAmount);
    setShowAddMoneyModal(false);
    setAddMoneyAmount("500");
    setShowMoneyAddedToast(true);

    window.setTimeout(() => {
      setShowMoneyAddedToast(false);
    }, 3500);
  };

  const handleAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 6);

    setAddMoneyAmount(value);
  };

  const quickServices = [
    {
      title: "AEPS",
      description: "Aadhaar ATM",
      icon: Fingerprint,
      iconClass: "text-[#315bd1]",
      bgClass: "bg-[#edf1fc]",
      path: "/retailer/aeps" as ServicePath,
    },
    {
      title: "DMT",
      description: "Send Money",
      icon: Send,
      iconClass: "text-[#7c3aed]",
      bgClass: "bg-[#f3eaff]",
      path: "/retailer/dmt" as ServicePath,
    },
    {
      title: "CMS",
      description: "Cash Management",
      icon: WalletCards,
      iconClass: "text-[#08a873]",
      bgClass: "bg-[#e5f8f1]",
      path: "/retailer/cms" as ServicePath,
    },
    {
      title: "Mobile Recharge",
      description: "Recharge Mobile",
      icon: Smartphone,
      iconClass: "text-[#315bd1]",
      bgClass: "bg-[#edf1fc]",
      comingSoon: true,
    },
    {
      title: "DTH",
      description: "DTH Recharge",
      icon: Tv,
      iconClass: "text-[#7c3aed]",
      bgClass: "bg-[#f3eaff]",
      comingSoon: true,
    },
    {
      title: "PAN Services",
      description: "PAN Card Services",
      icon: CreditCard,
      iconClass: "text-[#08a873]",
      bgClass: "bg-[#e5f8f1]",
      comingSoon: true,
    },
  ];

  return (
    <div className="min-h-full bg-[#eef2f7]">
      {show2FAToast && (
        <div className="fixed right-4 top-4 z-[100] animate-in slide-in-from-right-5 duration-300 sm:right-6 sm:top-6">
          <div className="flex items-center gap-3 rounded-2xl border border-[#dfe1e6] bg-white px-4 py-3.5 shadow-[0_18px_45px_-25px_rgba(23,32,51,0.35)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e7f8f3]">
              <CheckCircle2 className="h-5 w-5 text-[#08ae82]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#172033]">
                2FA Completed
              </p>
              <p className="text-xs text-[#8992a3]">
                Your daily 2FA is successfully completed.
              </p>
            </div>
          </div>
        </div>
      )}

      {showMoneyAddedToast && (
        <div className="fixed right-4 top-4 z-[100] animate-in slide-in-from-right-5 duration-300 sm:right-6 sm:top-6">
          <div className="flex items-center gap-3 rounded-2xl border border-[#dfe1e6] bg-white px-4 py-3.5 shadow-[0_18px_45px_-25px_rgba(23,32,51,0.35)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef1ff]">
              <WalletCards className="h-5 w-5 text-[#315bd1]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#172033]">
                Money Added!
              </p>
              <p className="text-xs text-[#8992a3]">
                ₹{lastAddedAmount.toLocaleString("en-IN")} added to your
                wallet.
              </p>
            </div>
          </div>
        </div>
      )}

      <main className="px-3 pb-8 pt-4 sm:px-5 sm:pt-5">
        <div className="mx-auto w-full max-w-6xl">
          {/* BANNER */}
          <section>
            <div
              id="dashboard-banners"
              onScroll={handleBannerScroll}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
              style={{ scrollbarWidth: "none" }}
            >
              {banners.map((banner, index) => (
                <div
                  id={`dashboard-banner-${index}`}
                  key={`${banner}-${index}`}
                  className="w-full shrink-0 snap-center overflow-hidden rounded-[28px] border border-white bg-white shadow-[0_20px_45px_-28px_rgba(23,32,51,0.35)]"
                >
                  <img
                    src={banner}
                    alt={`HappyPay banner ${index + 1}`}
                    className="h-[160px] w-full object-cover sm:h-[180px] lg:h-[200px]"
                  />
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-center gap-1.5">
              {banners.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to banner ${index + 1}`}
                  onClick={() => goToBanner(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeBanner === index
                      ? "w-7 bg-[#315bd1]"
                      : "w-1.5 bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </section>

          {/* BALANCE */}
          <section className="mt-5 overflow-hidden rounded-[28px] bg-[#172033] p-5 text-white shadow-[0_22px_50px_-28px_rgba(23,32,51,0.5)] sm:p-6">
            <div className="relative">
              <div className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-[#315bd1]/20" />

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-medium text-white/65 sm:text-sm">
                      Available Balance
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setShowBalance((previous) => !previous)
                      }
                      className="text-white/65 transition hover:text-white"
                      aria-label={
                        showBalance
                          ? "Hide balance"
                          : "Show balance"
                      }
                    >
                      {showBalance ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                    {showBalance
                      ? `₹${walletBalance.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`
                      : "₹••••••"}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddMoneyModal(true)}
                  className="flex shrink-0 items-center gap-1.5 rounded-xl bg-white px-3 py-2.5 text-xs font-bold text-[#315bd1] shadow-sm transition hover:bg-[#f5f7fb] sm:px-4"
                >
                  <Plus className="h-4 w-4" />
                  ADD MONEY
                </button>
              </div>

              <div className="relative mt-5 grid max-w-xl grid-cols-2 border-t border-white/10 pt-4">
                <div className="border-r border-white/20 pr-4">
                  <p className="text-xs text-white/55">
                    Today's Earnings
                  </p>
                  <p className="mt-1 text-base font-bold text-white">
                    ₹1,250.00
                  </p>
                </div>

                <div className="pl-4">
                  <p className="text-xs text-white/55">
                    Retailer ID
                  </p>
                  <p className="mt-1 text-base font-bold text-white">
                    HP100245
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* QUICK SERVICES */}
          <section className="mt-6 rounded-[28px] border border-[#dfe1e6] bg-white p-5 shadow-[0_18px_45px_-30px_rgba(23,32,51,0.35)] sm:p-6">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-[#172033] sm:text-2xl">
                  Quick Services
                </h2>
                <p className="mt-1 text-xs text-[#8992a3] sm:text-sm">
                  Access your financial services
                </p>
              </div>

              <span className="rounded-full bg-[#eef1ff] px-3 py-1 text-[10px] font-semibold text-[#315bd1] sm:text-xs">
                6 Services
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {quickServices.map((service) => {
                const Icon = service.icon;

                return (
                  <button
                    key={service.title}
                    type="button"
                    onClick={() => {
                      if (service.comingSoon) {
                        handleComingSoonClick(
                          service.title as ComingSoonService,
                        );
                      } else if (service.path) {
                        handleServiceClick(service.path);
                      }
                    }}
                    className="group flex min-h-[142px] min-w-0 flex-col items-center justify-center rounded-2xl border border-[#e3e6eb] bg-[#fafbfd] px-2 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#315bd1]/30 hover:bg-white hover:shadow-[0_14px_30px_-20px_rgba(49,91,209,0.35)]"
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${service.bgClass} transition-transform duration-200 group-hover:scale-105`}
                    >
                      <Icon
                        className={`h-6 w-6 ${service.iconClass}`}
                      />
                    </div>

                    <h3 className="mt-2.5 text-center text-xs font-bold leading-tight text-slate-800 sm:text-sm">
                      {service.title}
                    </h3>

                    <p className="mt-1 text-center text-[10px] leading-tight text-[#8992a3] sm:text-[11px]">
                      {service.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      {/* SERVICE COMING SOON MODAL */}
      {showComingSoonModal && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#172033]/55 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowComingSoonModal(false);
            }
          }}
        >
          <div className="w-full max-w-sm rounded-[28px] border border-[#dfe1e6] bg-white p-6 text-center shadow-[0_25px_70px_-30px_rgba(23,32,51,0.5)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eef1ff]">
              <WalletCards className="h-8 w-8 text-[#315bd1]" />
            </div>

            <h2 className="mt-4 text-xl font-bold text-[#172033]">
              Service Coming Soon
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#8992a3]">
              {comingSoonService
                ? `${comingSoonService} will be available soon.`
                : "This service will be available soon."}
            </p>

            <button
              type="button"
              onClick={() => setShowComingSoonModal(false)}
              className="mt-5 flex h-11 w-full items-center justify-center rounded-xl bg-[#315bd1] text-sm font-bold text-white transition hover:bg-[#274dbd] hover:shadow-[0_10px_25px_-12px_rgba(49,91,209,0.8)]"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* ADD MONEY MODAL */}
      {showAddMoneyModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#172033]/55 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowAddMoneyModal(false);
            }
          }}
        >
          <div className="w-full max-w-sm overflow-hidden rounded-[28px] border border-[#dfe1e6] bg-white shadow-[0_25px_70px_-30px_rgba(23,32,51,0.5)]">
            <div className="flex items-center justify-between border-b border-[#edf0f4] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef1ff]">
                  <WalletCards className="h-5 w-5 text-[#315bd1]" />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-[#172033]">
                    Add Money to Wallet
                  </h2>
                  <p className="text-xs text-[#8992a3]">
                    Current: ₹
                    {walletBalance.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAddMoneyModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8992a3] transition hover:bg-[#f5f7fb]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="px-5 py-6">
              <div className="flex items-center gap-2 rounded-xl border-2 border-[#dfe1e6] bg-[#fafbfd] px-4 py-3 focus-within:border-[#315bd1] focus-within:bg-white">
                <span className="text-2xl font-semibold text-slate-300">
                  ₹
                </span>

                <input
                  type="text"
                  inputMode="numeric"
                  value={addMoneyAmount}
                  onChange={handleAmountChange}
                  autoFocus
                  placeholder="0"
                  className="min-w-0 flex-1 bg-transparent text-2xl font-bold text-[#315bd1] outline-none placeholder:text-[#b2b8c3]"
                />
              </div>

              <div className="mt-3 grid grid-cols-4 gap-2">
                {["500", "1000", "2000", "5000"].map(
                  (amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() =>
                        setAddMoneyAmount(amount)
                      }
                      className={`rounded-lg border py-1.5 text-xs font-semibold transition ${
                        addMoneyAmount === amount
                          ? "border-[#315bd1] bg-[#315bd1] text-white"
                          : "border-slate-200 bg-white text-slate-600 hover:border-[#315bd1]/40"
                      }`}
                    >
                      ₹{amount}
                    </button>
                  ),
                )}
              </div>

              <button
                type="button"
                onClick={handleAddMoney}
                disabled={
                  !addMoneyAmount ||
                  Number(addMoneyAmount) <= 0
                }
                className="mt-4 flex h-10 w-full items-center justify-center rounded-xl bg-[#315bd1] text-sm font-bold text-white transition hover:bg-[#274dbd] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add ₹
                {addMoneyAmount
                  ? Number(addMoneyAmount).toLocaleString(
                      "en-IN",
                    )
                  : "0"}{" "}
                to Wallet
              </button>

              <button
                type="button"
                onClick={() =>
                  setShowAddMoneyModal(false)
                }
                className="mt-2.5 flex w-full items-center justify-center py-2 text-xs font-semibold text-slate-500 transition hover:text-[#315bd1]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DAILY 2FA MODAL */}
      {show2FAModal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#172033]/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !isAuthenticating &&
              !show2FASuccess
            ) {
              handleClose2FA();
            }
          }}
        >
          <div className="w-full max-w-xl overflow-hidden rounded-[28px] border border-[#dfe1e6] bg-white shadow-[0_25px_70px_-30px_rgba(23,32,51,0.55)]">
            <div className="border-b border-[#edf0f4] px-6 py-5">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#172033]">
                    {show2FASuccess
                      ? "2FA Authentication Successful"
                      : "Retailer Daily 2FA"}
                  </h2>

                  <p className="mt-1 text-sm text-[#8992a3]">
                    {show2FASuccess
                      ? "Your daily biometric authentication has been completed."
                      : "Complete your daily authentication to continue."}
                  </p>
                </div>

                {!isAuthenticating &&
                  !show2FASuccess && (
                    <button
                      type="button"
                      onClick={handleClose2FA}
                      className="flex h-9 w-9 items-center justify-center rounded-xl text-[#8992a3] transition hover:bg-[#f5f7fb]"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
              </div>
            </div>

            <div className="max-h-[80vh] overflow-y-auto p-6">
              {isAuthenticating ? (
                /* ==================================================
                   SAME BIOMETRIC CAPTURE UI AS AEPS
                ================================================== */
                <div className="w-full rounded-[22px] bg-white p-8 text-center sm:p-10">
                  <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-[#edf1fc]">
                    <Fingerprint className="h-24 w-24 text-[#315bd1]" />
                  </div>

                  <h3 className="mt-8 text-xl font-bold text-[#4d596d] sm:text-2xl">
                    Capturing Fingerprint...
                  </h3>

                  <p className="mt-3 text-lg text-slate-500">
                    Place finger on Mantra MFS100
                  </p>

                  <div className="mx-auto mt-8 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#315bd1]" />
                </div>
              ) : show2FASuccess ? (
                /* ==================================================
                   SUCCESS
                ================================================== */
                <div className="flex flex-col items-center py-7 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#e7f8f3]">
                    <CheckCircle2 className="h-12 w-12 text-[#08ae82]" />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-[#172033]">
                    2FA is Done
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#8992a3]">
                    Your daily 2FA authentication has been
                    successfully completed.
                  </p>

                  {pendingNavigation && (
                    <p className="mt-3 text-sm font-semibold text-[#315bd1]">
                      Redirecting you to the selected service...
                    </p>
                  )}
                </div>
              ) : (
                <>
                  {/* ==================================================
                     PENDING
                  ================================================== */}
                  <div className="rounded-2xl border border-[#f3d6a5] bg-[#fff8ed] p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff0d8]">
                        <ShieldCheck className="h-5 w-5 text-[#e69a22]" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-[#172033]">
                          Your 2FA is pending
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-[#697386]">
                          Daily biometric authentication is
                          required before accessing financial
                          services.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ==================================================
                     MOBILE NUMBER
                  ================================================== */}
                  <div className="mt-4 rounded-xl border border-[#dfe1e6] bg-[#fafbfd] p-4">
                    <p className="text-xs font-medium text-[#8992a3]">
                      Registered Mobile Number
                    </p>

                    <p className="mt-1 text-sm font-bold tracking-wide text-[#172033]">
                      {maskedMobile}
                    </p>
                  </div>

                  {/* ==================================================
                     AADHAAR
                  ================================================== */}
                  <div className="mt-5">
                    <label
                      htmlFor="dashboard-aadhaar"
                      className="mb-2 block text-sm font-semibold text-[#172033]"
                    >
                      Retailer Aadhaar Number
                    </label>

                    <div className="flex min-h-[56px] items-center gap-3 rounded-xl border border-[#dfe1e6] bg-[#fafbfd] px-4 transition focus-within:border-[#315bd1] focus-within:bg-white">
                      <IdCard className="h-5 w-5 shrink-0 text-[#8992a3]" />

                      <input
                        id="dashboard-aadhaar"
                        type="text"
                        inputMode="numeric"
                        maxLength={12}
                        value={aadhaar}
                        onChange={handleAadhaarChange}
                        disabled={isAuthenticating}
                        placeholder="Enter 12-digit Aadhaar number"
                        className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#172033] outline-none placeholder:text-[#a1a8b5]"
                      />

                      <span className="text-xs text-[#8992a3]">
                        {aadhaar.length}/12
                      </span>
                    </div>
                  </div>

                  {/* ==================================================
                     BIOMETRIC DEVICE
                  ================================================== */}
                  <div className="mt-4 rounded-xl border border-[#d9e0f5] bg-[#f1f4ff] p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#315bd1]">
                        <Fingerprint className="h-6 w-6 text-white" />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-[#172033]">
                          Mantra MFS100
                        </p>

                        <p className="mt-1 flex items-center gap-2 text-xs font-semibold text-[#08ae82]">
                          <span className="h-2 w-2 rounded-full bg-[#08ae82]" />
                          RD Service Active
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ==================================================
                     COMPLETE 2FA
                  ================================================== */}
                  <button
                    type="button"
                    onClick={handleStart2FA}
                    disabled={
                      aadhaar.length !== 12 ||
                      isAuthenticating
                    }
                    className="mt-5 flex min-h-[56px] w-full items-center justify-center gap-3 rounded-xl bg-[#315bd1] px-5 text-sm font-bold text-white transition hover:bg-[#274dbd] hover:shadow-[0_12px_25px_-15px_rgba(49,91,209,0.8)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Fingerprint className="h-5 w-5" />
                    COMPLETE 2FA
                  </button>

                  <p className="mt-4 text-center text-xs leading-5 text-[#8992a3]">
                    You need to complete 2FA once every day
                    before initiating financial transactions.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
