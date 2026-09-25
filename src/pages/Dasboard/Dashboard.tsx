import { useEffect, useMemo, useState } from "react";
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
  QrCode,
  ReceiptIndianRupee,
  Clock3,
  XCircle,
} from "lucide-react";
import { getWalletBalance, setWalletBalance } from "../../utils/wallet";
import { useNavigate } from "react-router-dom";

type ServicePath =
  | "/retailer/aeps"
  | "/retailer/dmt"
  | "/retailer/cms"
  | "/retailer/aadhaar-pay"
  | "/retailer/upi-cash-point"
  | "/retailer/bbps";

type PendingNavigation = ServicePath | null;

type ComingSoonService =
  | "Mobile Recharge"
  | "DTH"
  | "PAN Services";

type QuickService = {
  title: string;
  description: string;
  icon: typeof Fingerprint;
  iconClass: string;
  bgClass: string;
  hoverClass: string;
  cardClass: string;
  path?: ServicePath;
  comingSoon?: boolean;
};

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

type Transaction = {
  id: string;
  service: "AEPS" | "DMT" | "CMS";
  title: string;
  date: string;
  time: string;
  amount: number;
  type: "CREDIT" | "DEBIT";
  status: "Success" | "Pending" | "Failed";
};

const recentTransactions: Transaction[] = [
  {
    id: "TXN001",
    service: "AEPS",
    title: "AEPS Cash Withdrawal",
    date: "04 Sep 2026",
    time: "10:42 AM",
    amount: 5000,
    type: "CREDIT",
    status: "Success",
  },
  {
    id: "TXN002",
    service: "DMT",
    title: "DMT Money Transfer",
    date: "04 Sep 2026",
    time: "09:18 AM",
    amount: 2500,
    type: "DEBIT",
    status: "Success",
  },
  {
    id: "TXN003",
    service: "CMS",
    title: "CMS Collection",
    date: "03 Sep 2026",
    time: "05:32 PM",
    amount: 8200,
    type: "CREDIT",
    status: "Success",
  },
  {
    id: "TXN004",
    service: "AEPS",
    title: "AEPS Balance Enquiry",
    date: "03 Sep 2026",
    time: "02:15 PM",
    amount: 0,
    type: "DEBIT",
    status: "Success",
  },
];

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const getServiceIcon = (service: Transaction["service"]) => {
  if (service === "AEPS") return Fingerprint;
  if (service === "DMT") return Send;
  return WalletCards;
};

const getServiceIconClasses = (service: Transaction["service"]) => {
  if (service === "AEPS") return "bg-[#ffe6ea] text-[#e4002b]";
  if (service === "DMT") return "bg-[#fff2df] text-[#c56b08]";
  return "bg-[#e5f7ee] text-[#087f5b]";
};

const getStatusIcon = (status: Transaction["status"]) => {
  if (status === "Success") return CheckCircle2;
  if (status === "Pending") return Clock3;
  return XCircle;
};

const getStatusClasses = (status: Transaction["status"]) => {
  if (status === "Success") return "bg-[#e5f7ee] text-[#087f5b]";
  if (status === "Pending") return "bg-[#fff2df] text-[#c56b08]";
  return "bg-[#ffe6ea] text-[#c21d3d]";
};

const getAmountClasses = (type: Transaction["type"]) => {
  if (type === "CREDIT") return "text-[#08a873]";
  return "text-[#df4b43]";
};

const Dashboard = () => {
  const navigate = useNavigate();

  const retailerMobile = getLoggedInRetailerMobile();

  const twoFAStorageKey =
    `happypay_2fa_completed_${retailerMobile}`;

  const [activeBanner, setActiveBanner] = useState(0);
  const [showBalance, setShowBalance] = useState(true);

  const [walletBalance, setWalletBalanceState] =
    useState(getWalletBalance);

  const [showAddMoneyModal, setShowAddMoneyModal] =
    useState(false);

  const [addMoneyAmount, setAddMoneyAmount] =
    useState("500");

  const [showMoneyAddedToast, setShowMoneyAddedToast] =
    useState(false);

  const [lastAddedAmount, setLastAddedAmount] =
    useState(0);

  const [is2FACompleted, setIs2FACompleted] =
    useState(false);

  const [show2FAModal, setShow2FAModal] =
    useState(false);

  const [isAuthenticating, setIsAuthenticating] =
    useState(false);

  const [show2FASuccess, setShow2FASuccess] =
    useState(false);

  const [show2FAToast, setShow2FAToast] =
    useState(false);

  const [pendingNavigation, setPendingNavigation] =
    useState<PendingNavigation>(null);

  const [aadhaar, setAadhaar] = useState("");

  const [showComingSoonModal, setShowComingSoonModal] =
    useState(false);

  const [comingSoonService, setComingSoonService] =
    useState<ComingSoonService | null>(null);

  /* =========================================================
     BANNERS
  ========================================================= */

  const banners = useMemo(
    () => [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1616077168079-7e09a6a4c2f2?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80",
    ],
    [],
  );

  /* =========================================================
     MASKED MOBILE
  ========================================================= */

  const maskedMobile =
    retailerMobile.length === 10
      ? `+91 ${retailerMobile.slice(
          0,
          2,
        )}XXXXXX${retailerMobile.slice(-2)}`
      : "Registered mobile number";

  /* =========================================================
     DAILY 2FA CHECK
  ========================================================= */

  useEffect(() => {
    const checkDaily2FA = () => {
      if (!retailerMobile) {
        setIs2FACompleted(false);
        setShow2FAModal(false);
        return;
      }

      const completedDate =
        localStorage.getItem(twoFAStorageKey);

      if (completedDate === getToday()) {
        setIs2FACompleted(true);
        setShow2FAModal(false);
      } else {
        setIs2FACompleted(false);
        setShow2FAModal(true);
      }
    };

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
  }, [retailerMobile, twoFAStorageKey]);

  /* =========================================================
     BANNER SCROLL
  ========================================================= */

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

  /* =========================================================
     AADHAAR
  ========================================================= */

  const handleAadhaarChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 12);

    setAadhaar(value);
  };

  /* =========================================================
     SERVICE NAVIGATION
  ========================================================= */

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

  /* =========================================================
     START 2FA
  ========================================================= */

  const handleStart2FA = () => {
    if (aadhaar.length !== 12) {
      return;
    }

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

  /* =========================================================
     REDIRECT AFTER 2FA
  ========================================================= */

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
  }, [
    show2FASuccess,
    pendingNavigation,
    navigate,
  ]);

  /* =========================================================
     ADD MONEY
  ========================================================= */

  const handleAddMoney = () => {
    const numericAmount = Number(addMoneyAmount);

    if (!numericAmount || numericAmount <= 0) {
      return;
    }

    setWalletBalanceState((previous) => {
      const nextBalance =
        previous + numericAmount;

      setWalletBalance(nextBalance);

      return nextBalance;
    });

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

  /* =========================================================
     QUICK SERVICES
  ========================================================= */

  const quickServices: QuickService[] = [
    {
      title: "AEPS",
      description: "Aadhaar ATM",
      icon: Fingerprint,
      iconClass: "text-[#2563eb]",
      bgClass: "bg-[#e8f0ff]",
      hoverClass: "hover:bg-[#e8f0ff]",
      cardClass:
        "bg-[#f4f7ff] border-[#dce6ff] hover:bg-[#edf3ff]",
      path: "/retailer/aeps",
    },
    {
      title: "DMT",
      description: "Send Money",
      icon: Send,
      iconClass: "text-[#9333ea]",
      bgClass: "bg-[#f3e8ff]",
      hoverClass: "hover:bg-[#f3e8ff]",
      cardClass:
        "bg-[#faf5ff] border-[#eadcff] hover:bg-[#f7efff]",
      path: "/retailer/dmt",
    },
    {
      title: "CMS",
      description: "Cash Management",
      icon: WalletCards,
      iconClass: "text-[#059669]",
      bgClass: "bg-[#e5f8f0]",
      hoverClass: "hover:bg-[#e5f8f0]",
      cardClass:
        "bg-[#f2fcf8] border-[#d8f3e8] hover:bg-[#eafaf3]",
      path: "/retailer/cms",
    },
    {
      title: "Aadhaar Pay",
      description: "Aadhaar Payment",
      icon: IdCard,
      iconClass: "text-[#dc2626]",
      bgClass: "bg-[#ffe8eb]",
      hoverClass: "hover:bg-[#ffe8eb]",
      cardClass:
        "bg-[#fff5f6] border-[#ffe0e4] hover:bg-[#ffedef]",
      path: "/retailer/aadhaar-pay",
    },
    {
      title: "UPI Cash Point",
      description: "UPI Withdrawal",
      icon: QrCode,
      iconClass: "text-[#0891b2]",
      bgClass: "bg-[#e3f8fc]",
      hoverClass: "hover:bg-[#e3f8fc]",
      cardClass:
        "bg-[#f2fcfe] border-[#d8f3f8] hover:bg-[#e8fafd]",
      path: "/retailer/upi-cash-point",
    },
    {
      title: "BBPS",
      description: "Bill Payments",
      icon: ReceiptIndianRupee,
      iconClass: "text-[#2563eb]",
      bgClass: "bg-[#eef2ff]",
      hoverClass: "hover:bg-[#eef2ff]",
      cardClass:
        "bg-[#f8faff] border-[#dce6ff] hover:bg-[#f0f5ff]",
      path: "/retailer/bbps",
    },
    {
      title: "Mobile Recharge",
      description: "Recharge Mobile",
      icon: Smartphone,
      iconClass: "text-[#ea580c]",
      bgClass: "bg-[#fff0e5]",
      hoverClass: "hover:bg-[#fff0e5]",
      cardClass:
        "bg-[#fff8f2] border-[#ffe8d8] hover:bg-[#fff3e9]",
      comingSoon: true,
    },
    {
      title: "DTH",
      description: "DTH Recharge",
      icon: Tv,
      iconClass: "text-[#db2777]",
      bgClass: "bg-[#fce7f3]",
      hoverClass: "hover:bg-[#fce7f3]",
      cardClass:
        "bg-[#fff5fa] border-[#f9dce9] hover:bg-[#fff0f7]",
      comingSoon: true,
    },
    {
      title: "PAN Services",
      description: "PAN Card Services",
      icon: CreditCard,
      iconClass: "text-[#ca8a04]",
      bgClass: "bg-[#fef9c3]",
      hoverClass: "hover:bg-[#fef9c3]",
      cardClass:
        "bg-[#fffef0] border-[#f7edaa] hover:bg-[#fffce0]",
      comingSoon: true,
    },
  ];

  return (
    <div className="min-h-full bg-transparent">

      {/* =====================================================
          2FA TOAST
      ====================================================== */}

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

      {/* =====================================================
          MONEY ADDED TOAST
      ====================================================== */}

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
                ₹
                {lastAddedAmount.toLocaleString(
                  "en-IN",
                )}{" "}
                added to your wallet.
              </p>
            </div>
          </div>
        </div>
      )}

      <main className="px-3 pb-8 pt-4 sm:px-5 sm:pt-5">
        <div className="mx-auto w-full max-w-7xl">

          {/* =================================================
              HEADER
          ================================================== */}
          
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Dashboard</h1>
              <p className="text-slate-500 text-sm mt-1">You can monitor your account details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-6">
            
            {/* =================================================
                LEFT COLUMN (BANNERS + QUICK CARDS)
            ================================================== */}
            
            <div className="space-y-6">
              
              {/* BANNER SECTION */}
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
                        className="h-[128px] w-full object-cover sm:h-[148px] lg:h-[164px]"
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

              {/* 2FA STATUS CARD */}
              <section className="bg-white rounded-[24px] p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${is2FACompleted ? 'bg-[#e7f8f3] text-[#08ae82]' : 'bg-[#fff0d8] text-[#e69a22]'}`}>
                    {is2FACompleted ? <CheckCircle2 className="h-6 w-6" /> : <ShieldCheck className="h-6 w-6" />}
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-slate-800">
                      {is2FACompleted ? "Daily 2FA Completed" : "Daily 2FA Pending"}
                    </h3>
                    <p className="text-[13px] text-slate-500 mt-0.5">
                      {is2FACompleted 
                        ? "Your biometric authentication for today is done."
                        : "Complete authentication to access financial services."}
                    </p>
                  </div>
                </div>
                {!is2FACompleted && (
                  <button
                    type="button"
                    onClick={() => setShow2FAModal(true)}
                    className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#315bd1] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#274dbd] shadow-[0_8px_20px_-10px_rgba(49,91,209,0.8)]"
                  >
                    <Fingerprint className="h-4 w-4" />
                    Complete 2FA
                  </button>
                )}
              </section>

              {/* QUICK CARDS SECTION */}
              <section className="bg-white rounded-[24px] p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-[17px] font-bold text-slate-800">Quick Services</h2>
                  <span className="rounded-full bg-[#f3eaff] px-3 py-1.5 text-[11px] font-bold text-[#7c3aed]">
                    {quickServices.length} Services
                  </span>
                </div>
                
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
                  {quickServices.map((service, index) => {
                    const cardColors = [
                      "bg-gradient-to-br from-[#7c3aed] to-[#5b21b6]", // Purple
                      "bg-gradient-to-br from-[#2563eb] to-[#1e40af]", // Blue
                      "bg-gradient-to-br from-[#059669] to-[#047857]", // Emerald
                      "bg-gradient-to-br from-[#e11d48] to-[#be123c]", // Rose/Red
                      "bg-gradient-to-br from-[#ea580c] to-[#c2410c]", // Orange
                      "bg-gradient-to-br from-[#0891b2] to-[#0e7490]", // Cyan
                      "bg-gradient-to-br from-[#475569] to-[#334155]", // Slate
                      "bg-gradient-to-br from-[#ca8a04] to-[#a16207]", // Gold/Yellow
                      "bg-gradient-to-br from-[#c026d3] to-[#a21caf]"  // Fuchsia
                    ];
                    const bgClass = cardColors[index % cardColors.length];
                    
                    return (
                      <button
                        key={service.title}
                        type="button"
                        onClick={() => {
                          if (service.comingSoon) {
                            handleComingSoonClick(service.title as ComingSoonService);
                          } else if (service.path) {
                            handleServiceClick(service.path);
                          }
                        }}
                        className={`min-w-[280px] sm:min-w-[310px] h-[180px] sm:h-[190px] rounded-2xl ${bgClass} p-5 sm:p-6 text-white flex flex-col justify-between shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] snap-start relative overflow-hidden text-left hover:scale-[1.02] transition-transform focus:outline-none focus:ring-4 focus:ring-slate-500/50`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/3 blur-xl"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full translate-y-1/3 -translate-x-1/3 blur-xl"></div>
                        
                        <div className="flex justify-between items-start relative z-10 w-full">
                          <div className="text-2xl sm:text-[28px] font-bold tracking-tight break-words max-w-[75%] leading-tight">{service.title}</div>
                          <span className="text-[10px] sm:text-[11px] font-medium opacity-90 mt-1 whitespace-nowrap">{service.comingSoon ? "Soon" : "Service"}</span>
                        </div>
                        <div className="relative z-10 w-full">
                          <div className="font-mono text-sm sm:text-[15px] tracking-[0.2em] opacity-90 mb-2">**** **** **** {2847 + index}</div>
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] sm:text-[10px] opacity-80 font-mono text-left">{service.description}</span>
                            <div className="flex -space-x-2 shrink-0">
                              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-500 opacity-80 mix-blend-multiply"></div>
                              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-yellow-400 opacity-80 mix-blend-multiply"></div>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

            </div>

            {/* =================================================
                RIGHT COLUMN (BALANCE + TRANSACTIONS)
            ================================================== */}
            
            <div className="space-y-6">

            {/* =================================================
                LIGHT PURPLE BALANCE CARD
            ================================================== */}

            <section className="relative overflow-hidden rounded-[1.5rem] border border-[#e5d9ff] bg-gradient-to-br from-[#eee7ff] via-[#e8ddff] to-[#f3edff] px-5 py-4 shadow-[0_12px_30px_-20px_rgba(124,58,237,0.25)] sm:px-6 sm:py-5">

              {/* Decorative circles */}

              <div className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-[#d8c5ff]/40 blur-xl" />

              <div className="pointer-events-none absolute -bottom-8 -left-6 h-20 w-20 rounded-full bg-[#d8c5ff]/30 blur-lg" />

              <div className="relative z-10">

                <div className="relative flex items-start justify-between gap-4">

                  <div>
                    <div className="flex items-center gap-2">

                      <p className="text-[12px] font-semibold uppercase tracking-wide text-[#6d5a96] sm:text-xs">
                        Available Balance
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          setShowBalance(
                            (previous) =>
                              !previous,
                          )
                        }
                        className="text-[#8066b5] transition hover:text-[#63449b]"
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

                    <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#5b21b6] sm:text-3xl">
                      {showBalance
                        ? `₹${walletBalance.toLocaleString(
                            "en-IN",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            },
                          )}`
                        : "₹••••••"}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setShowAddMoneyModal(true)
                    }
                    className="flex shrink-0 items-center gap-1.5 rounded-xl bg-[#8b5cf6] px-3 py-2 text-[11px] font-bold text-white shadow-[0_8px_18px_-10px_rgba(124,58,237,0.6)] transition hover:scale-105 hover:bg-[#7c3aed] sm:px-4 sm:py-2.5"
                  >
                    <Plus className="h-4 w-4" />
                    ADD MONEY
                  </button>

                </div>
              </div>
            </section>

              {/* ACCOUNT SNAPSHOT (Optional, kept small if needed) */}
              <section className="bg-white rounded-[1.5rem] p-5 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#7c3aed]">
                  Account Snapshot
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#f8f5ff] p-3 transition hover:bg-[#f3eaff]">
                    <p className="text-xs font-medium text-[#64748b]">Today's Earnings</p>
                    <p className="mt-1 text-[15px] font-bold text-[#0f172a]">₹1,250.00</p>
                  </div>
                  <div className="rounded-xl bg-[#f8f5ff] p-3 transition hover:bg-[#f3eaff]">
                    <p className="text-xs font-medium text-[#64748b]">Retailer ID</p>
                    <p className="mt-1 text-[15px] font-bold text-[#0f172a]">HP100245</p>
                  </div>
                </div>
              </section>

              {/* RECENT TRANSACTIONS */}
              <section className="bg-white rounded-[1.5rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[16px] font-bold text-slate-800">Recent Transactions</h2>
                  <button 
                    onClick={() => navigate("/retailer/transactions")}
                    className="text-[11px] font-semibold text-[#7c3aed] bg-[#7c3aed]/10 px-3 py-1.5 rounded-md transition hover:bg-[#7c3aed]/20"
                  >
                    View All
                  </button>
                </div>
                
                <div className="flex flex-col gap-0.5">
                  {recentTransactions.map((transaction, index) => {
                    const Icon = getServiceIcon(transaction.service);
                    const StatusIcon = getStatusIcon(transaction.status);
                    const isLast = index === recentTransactions.length - 1;

                    return (
                      <div
                        key={transaction.id}
                        className={`group flex items-center gap-3 py-3 transition-colors hover:bg-slate-50/60 ${
                          !isLast ? "border-b border-slate-100/60" : ""
                        }`}
                      >
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${getServiceIconClasses(transaction.service)}`}>
                          <Icon className="h-[18px] w-[18px]" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-[13px] font-bold text-[#172033]">
                            {transaction.title}
                          </h3>
                          <p className="mt-0.5 text-[11px] text-[#9aa0ab]">
                            {transaction.date} • {transaction.time}
                          </p>
                        </div>

                        <div className="shrink-0 text-right">
                          <p className={`text-[13px] font-bold ${getAmountClasses(transaction.type)}`}>
                            {transaction.type === "CREDIT" ? "+" : "-"} ₹{formatAmount(transaction.amount)}
                          </p>
                          <span className={`mt-0.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold ${getStatusClasses(transaction.status)}`}>
                            <StatusIcon className="h-2.5 w-2.5" />
                            {transaction.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

            </div>
          </div>

        </div>
      </main>

      {/* =====================================================
          COMING SOON MODAL
      ====================================================== */}

      {showComingSoonModal && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#4b0b18]/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              setShowComingSoonModal(false);
            }
          }}
        >

          <div className="w-full max-w-xs rounded-2xl border border-[#f1d9dd] bg-white p-5 text-center shadow-[0_22px_55px_-28px_rgba(128,20,42,0.35)]">

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
              onClick={() =>
                setShowComingSoonModal(false)
              }
              className="mt-5 flex h-11 w-full items-center justify-center rounded-xl bg-[#315bd1] text-sm font-bold text-white transition hover:bg-[#274dbd] hover:shadow-[0_10px_25px_-12px_rgba(49,91,209,0.8)]"
            >
              OK
            </button>

          </div>
        </div>
      )}

      {/* =====================================================
          ADD MONEY MODAL
      ====================================================== */}

      {showAddMoneyModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#4b0b18]/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              setShowAddMoneyModal(false);
            }
          }}
        >

          <div className="w-full max-w-xs overflow-hidden rounded-2xl border border-[#f1d9dd] bg-white shadow-[0_22px_55px_-28px_rgba(128,20,42,0.35)]">

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
                    {walletBalance.toLocaleString(
                      "en-IN",
                      {
                        minimumFractionDigits: 2,
                      },
                    )}
                  </p>

                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowAddMoneyModal(false)
                }
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
                  ? Number(
                      addMoneyAmount,
                    ).toLocaleString("en-IN")
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

      {/* =====================================================
          DAILY 2FA MODAL
      ====================================================== */}

      {show2FAModal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#4b0b18]/40 p-4 backdrop-blur-sm"
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

          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-[#f1d9dd] bg-white shadow-[0_22px_55px_-28px_rgba(128,20,42,0.35)]">

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

                  <div className="mt-4 rounded-xl border border-[#dfe1e6] bg-[#fafbfd] p-4">

                    <p className="text-xs font-medium text-[#8992a3]">
                      Registered Mobile Number
                    </p>

                    <p className="mt-1 text-sm font-bold tracking-wide text-[#172033]">
                      {maskedMobile}
                    </p>

                  </div>

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