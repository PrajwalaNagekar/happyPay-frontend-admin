import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Fingerprint,
  Send,
  WalletCards,
  Eye,
  EyeOff,
  Plus,
  Headphones,
  Bell,
  UserCircle,
  CheckCircle2,
  ShieldCheck,
  Loader2,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type ServicePath =
  | "/retailer/aeps"
  | "/retailer/dmt"
  | "/retailer/cms";

type PendingNavigation = ServicePath | null;

/* ============================================================
   GET TODAY'S LOCAL DATE
============================================================ */

const getToday = (): string => {
  const now = new Date();

  const year = now.getFullYear();

  const month = String(
    now.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    now.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/* ============================================================
   FIND MOBILE NUMBER FROM STORED LOGIN DATA
============================================================ */

const getLoggedInRetailerMobile = (): string => {
  const possibleKeys = [
    "user",
    "retailer",
    "currentUser",
    "authUser",
    "loggedInUser",
    "retailerUser",
  ];

  for (const key of possibleKeys) {
    const storedValue =
      localStorage.getItem(key);

    if (!storedValue) {
      continue;
    }

    try {
      const parsed = JSON.parse(storedValue);

      const mobile =
        parsed.mobile ||
        parsed.mobileNumber ||
        parsed.phone ||
        parsed.phoneNumber ||
        parsed.retailerMobile ||
        parsed.retailer?.mobile ||
        parsed.retailer?.mobileNumber ||
        parsed.retailer?.phone ||
        parsed.retailer?.phoneNumber ||
        parsed.user?.mobile ||
        parsed.user?.mobileNumber ||
        parsed.user?.phone ||
        parsed.user?.phoneNumber;

      if (mobile) {
        return String(mobile)
          .replace(/\D/g, "")
          .slice(-10);
      }
    } catch {
      /*
       * Ignore values that are not JSON.
       */
    }
  }

  /*
   * Temporary fallback for the current UI/demo.
   *
   * IMPORTANT:
   * Your login/AuthContext should store the actual
   * retailer mobile number in localStorage.
   */
  return "9876543210";
};

const Dashboard = () => {
  const navigate = useNavigate();

  /* ============================================================
     RETAILER
  ============================================================ */

  const retailerMobile =
    getLoggedInRetailerMobile();

  /* ============================================================
     2FA STORAGE KEY
  ============================================================ */

  const twoFAStorageKey =
    `happypay_2fa_completed_${retailerMobile}`;

  /* ============================================================
     BANNER STATE
  ============================================================ */

  const [activeBanner, setActiveBanner] =
    useState(0);

  /* ============================================================
     BALANCE STATE
  ============================================================ */

  const [showBalance, setShowBalance] =
    useState(true);

  /* ============================================================
     ADD MONEY STATE
  ============================================================ */

  const [showAddMoneyModal, setShowAddMoneyModal] =
    useState(false);

  const [addMoneyAmount, setAddMoneyAmount] =
    useState("500");

  /* ============================================================
     2FA STATE
  ============================================================ */

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

  const [aadhaar, setAadhaar] =
    useState("");

  /* ============================================================
     BANNERS
  ============================================================ */

  const banners = useMemo(
    () => [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    ],
    []
  );

  /* ============================================================
     MASKED MOBILE
  ============================================================ */

  const maskedMobile =
    retailerMobile.length === 10
      ? `+91 ${retailerMobile.slice(
          0,
          2
        )}XXXXXX${retailerMobile.slice(-2)}`
      : "Registered mobile number";

  /* ============================================================
     CHECK 2FA STATUS
  ============================================================ */

  const checkDaily2FA = useCallback(() => {
    const today = getToday();

    const completedDate =
      localStorage.getItem(
        twoFAStorageKey
      );

    if (completedDate === today) {
      setIs2FACompleted(true);

      /*
       * Don't automatically open the modal
       * if today's 2FA is already completed.
       */
      setShow2FAModal(false);
    } else {
      /*
       * Different day OR this retailer has
       * never completed 2FA.
       */
      setIs2FACompleted(false);
      setShow2FAModal(true);
    }
  }, [
    retailerMobile,
    twoFAStorageKey,
    setIs2FACompleted,
    setShow2FAModal,
  ]);

  /* ============================================================
     INITIAL 2FA CHECK
  ============================================================ */

  useEffect(() => {
    const initialCheck = window.setTimeout(() => {
      checkDaily2FA();
    }, 0);

    /*
     * Check periodically so that if the dashboard
     * stays open across midnight, 2FA becomes pending
     * automatically for the new day.
     */
    const interval = window.setInterval(() => {
      checkDaily2FA();
    }, 60 * 1000);

    return () => {
      window.clearTimeout(initialCheck);
      window.clearInterval(interval);
    };
  }, [checkDaily2FA]);

  /* ============================================================
     BANNER SCROLL
  ============================================================ */

  const handleBannerScroll = (
    event: React.UIEvent<HTMLDivElement>
  ) => {
    const container =
      event.currentTarget;

    const children = Array.from(
      container.children
    ) as HTMLElement[];

    if (!children.length) {
      return;
    }

    let closestIndex = 0;
    let closestDistance = Infinity;

    children.forEach(
      (child, index) => {
        const distance = Math.abs(
          child.offsetLeft -
            container.scrollLeft
        );

        if (
          distance <
          closestDistance
        ) {
          closestDistance = distance;
          closestIndex = index;
        }
      }
    );

    setActiveBanner(closestIndex);
  };

  /* ============================================================
     GO TO BANNER
  ============================================================ */

  const goToBanner = (
    index: number
  ) => {
    const container =
      document.getElementById(
        "dashboard-banners"
      );

    const banner =
      document.getElementById(
        `dashboard-banner-${index}`
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

  /* ============================================================
     AADHAAR INPUT
  ============================================================ */

  const handleAadhaarChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value =
      event.target.value
        .replace(/\D/g, "")
        .slice(0, 12);

    setAadhaar(value);
  };

  /* ============================================================
     SERVICE CLICK
  ============================================================ */

  const handleServiceClick = (
    path: ServicePath
  ) => {
    /*
     * Today's 2FA completed.
     */
    if (is2FACompleted) {
      navigate(path);
      return;
    }

    /*
     * 2FA pending.
     *
     * Remember the page the retailer wanted
     * to open.
     */
    setPendingNavigation(path);
    setShow2FASuccess(false);
    setShow2FAModal(true);
  };

  /* ============================================================
     START 2FA
  ============================================================ */

  const handleStart2FA = () => {
    if (aadhaar.length !== 12) {
      return;
    }

    setIsAuthenticating(true);

    /*
     * Demo biometric authentication.
     *
     * Actual RD Service integration can be added later.
     */

    setTimeout(() => {
      const today = getToday();

      /*
       * IMPORTANT:
       *
       * The key contains the retailer's unique
       * mobile number.
       *
       * Example:
       *
       * happypay_2fa_completed_9876543210
       * happypay_2fa_completed_9988776655
       */
      localStorage.setItem(
        twoFAStorageKey,
        today
      );

      setIsAuthenticating(false);

      setIs2FACompleted(true);

      setShow2FASuccess(true);

      /*
       * Show top-right success notification.
       */
      setShow2FAToast(true);

      window.setTimeout(() => {
        setShow2FAToast(false);
      }, 4000);
    }, 2500);
  };

  /* ============================================================
     CLOSE 2FA
  ============================================================ */

  const handleClose2FA = () => {
    /*
     * Don't close while biometric authentication
     * is running or success screen is displayed.
     */
    if (
      isAuthenticating ||
      show2FASuccess
    ) {
      return;
    }

    setShow2FAModal(false);

    setShow2FASuccess(false);

    setPendingNavigation(null);
  };

  /* ============================================================
     REDIRECT AFTER 2FA
  ============================================================ */

  useEffect(() => {
    if (!show2FASuccess) {
      return;
    }

    const timer =
      window.setTimeout(() => {
        setShow2FAModal(false);

        setShow2FASuccess(false);

        if (pendingNavigation) {
          navigate(
            pendingNavigation
          );

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

  /* ============================================================
     ADD MONEY
  ============================================================ */

  const handleAddMoney = () => {
    const numericAmount =
      Number(addMoneyAmount);

    if (
      !numericAmount ||
      numericAmount <= 0
    ) {
      return;
    }

    /*
     * Payment integration will be connected later.
     */
    console.log(
      "Add money amount:",
      numericAmount
    );

    setShowAddMoneyModal(false);
  };

  /* ============================================================
     ADD MONEY AMOUNT
  ============================================================ */

  const handleAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value =
      event.target.value
        .replace(/\D/g, "")
        .slice(0, 6);

    setAddMoneyAmount(value);
  };

  /* ============================================================
     QUICK SERVICES
  ============================================================ */

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
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fb]">

      {/* ========================================================
          2FA SUCCESS TOAST
      ======================================================== */}

      {show2FAToast && (
        <div className="fixed right-5 top-5 z-[100] animate-in slide-in-from-right-5 duration-300">

          <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-white px-4 py-3 shadow-lg">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50">

              <CheckCircle2 className="h-5 w-5 text-green-600" />

            </div>

            <div>

              <p className="text-sm font-semibold text-slate-900">
                2FA Completed
              </p>

              <p className="text-xs text-slate-500">
                Your daily 2FA is successfully completed.
              </p>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================
          HEADER
      ======================================================== */}

      <header className="px-4 pt-5 sm:px-6 lg:px-8">

        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">

          {/* User */}
          <div className="flex items-center gap-3">

            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white shadow-sm">

              <div className="flex h-full w-full items-center justify-center bg-[#edf1fc]">

                <span className="text-lg font-bold text-[#315bd1]">
                  HP
                </span>

              </div>

            </div>

            <div>

              <p className="text-sm text-slate-400">
                Good Morning 👋
              </p>

              <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Ashok
              </h1>

            </div>

          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-2">

            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <Headphones className="h-5 w-5" />
            </button>

            <button
              type="button"
              className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
            >

              <Bell className="h-5 w-5" />

              <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-red-500" />

            </button>

          </div>

        </div>

      </header>

      {/* ========================================================
          MAIN
      ======================================================== */}

      <main className="px-4 pb-10 pt-5 sm:px-6 lg:px-8">

        <div className="mx-auto w-full max-w-7xl">

          {/* ==================================================
              FOUR SCROLLABLE BANNERS
          ================================================== */}

          <section>

            <div
              id="dashboard-banners"
              onScroll={
                handleBannerScroll
              }
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
              style={{
                scrollbarWidth: "none",
              }}
            >

              {banners.map(
                (
                  banner,
                  index
                ) => (
                  <div
                    id={`dashboard-banner-${index}`}
                    key={`${banner}-${index}`}
                    className="w-full shrink-0 snap-center overflow-hidden rounded-[26px]"
                  >

                    <img
                      src={banner}
                      alt={`HappyPay banner ${
                        index + 1
                      }`}
                      className="h-[190px] w-full object-cover sm:h-[250px] md:h-[300px]"
                    />

                  </div>
                )
              )}

            </div>

            {/* Banner Indicators */}
            <div className="mt-4 flex items-center justify-center gap-3">

              {banners.map(
                (_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to banner ${
                      index + 1
                    }`}
                    onClick={() =>
                      goToBanner(
                        index
                      )
                    }
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeBanner ===
                      index
                        ? "w-10 bg-[#315bd1]"
                        : "w-2.5 bg-slate-300"
                    }`}
                  />
                )
              )}

            </div>

          </section>

          {/* ==================================================
              BALANCE CARD
          ================================================== */}

          <section className="mt-6 overflow-hidden rounded-[30px] bg-gradient-to-r from-[#3156d9] via-[#218bbd] to-[#10a88a] p-5 text-white shadow-lg sm:p-7">

            <div className="relative">

              {/* Decorative Shape */}
              <div className="pointer-events-none absolute right-0 top-0 hidden h-40 w-52 rounded-[40%] bg-white/[0.06] sm:block" />

              {/* Balance */}
              <div className="relative">

                <div className="flex items-center gap-2">

                  <p className="text-sm text-white/75 sm:text-base">
                    Available Balance
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setShowBalance(
                        (
                          previous
                        ) =>
                          !previous
                      )
                    }
                    className="text-white/80 transition hover:text-white"
                  >

                    {showBalance ? (
                      <Eye className="h-5 w-5" />
                    ) : (
                      <EyeOff className="h-5 w-5" />
                    )}

                  </button>

                </div>

                <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">

                  {showBalance
                    ? "₹24580.50"
                    : "₹••••••"}

                </h2>

              </div>

              {/* Earnings / Retailer ID */}
              <div className="relative mt-5 grid grid-cols-2">

                <div className="border-r border-white/25 pr-4">

                  <p className="text-sm text-white/70 sm:text-base">
                    Today's Earnings
                  </p>

                  <p className="mt-1 text-xl font-bold sm:text-2xl">
                    ₹1250.00
                  </p>

                </div>

                <div className="pl-5">

                  <p className="text-sm text-white/70 sm:text-base">
                    Retailer ID
                  </p>

                  <p className="mt-1 text-xl font-bold sm:text-2xl">
                    HP100245
                  </p>

                </div>

              </div>

              {/* Add Money */}
              <button
                type="button"
                onClick={() =>
                  setShowAddMoneyModal(
                    true
                  )
                }
                className="relative mt-5 flex min-h-[58px] w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 text-base font-bold text-[#3156b8] shadow-sm transition hover:bg-slate-50 sm:text-lg"
              >

                <Plus className="h-6 w-6" />

                ADD MONEY

              </button>

            </div>

          </section>

          {/* ==================================================
              QUICK SERVICES
          ================================================== */}

          <section className="mt-7">

            <div className="mb-4">

              <h2 className="text-2xl font-bold text-slate-900">
                Quick Services
              </h2>

              <p className="mt-1 text-sm text-slate-400 sm:text-base">
                Access your financial services
              </p>

            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4">

              {quickServices.map(
                (service) => {

                  const Icon =
                    service.icon;

                  return (
                    <button
                      key={
                        service.title
                      }
                      type="button"
                      onClick={() =>
                        handleServiceClick(
                          service.path
                        )
                      }
                      className="group flex min-h-[180px] flex-col items-center justify-center rounded-[24px] border border-slate-300 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#315bd1]/40 hover:shadow-md sm:min-h-[210px] sm:rounded-[28px]"
                    >

                      <div
                        className={`flex h-20 w-20 items-center justify-center rounded-2xl ${service.bgClass} transition-transform duration-200 group-hover:scale-105 sm:h-24 sm:w-24`}
                      >

                        <Icon
                          className={`h-10 w-10 ${service.iconClass} sm:h-12 sm:w-12`}
                        />

                      </div>

                      <h3 className="mt-5 text-lg font-bold text-slate-900 sm:text-xl">
                        {service.title}
                      </h3>

                      <p className="mt-1 text-center text-xs font-medium text-slate-600 sm:text-sm">
                        {service.description}
                      </p>

                    </button>
                  );
                }
              )}

            </div>

          </section>

        </div>

      </main>

      {/* ========================================================
          ADD MONEY MODAL
      ======================================================== */}

      {showAddMoneyModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/55 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onMouseDown={(
            event
          ) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setShowAddMoneyModal(
                false
              );
            }
          }}
        >

          <div className="w-full overflow-hidden rounded-t-[32px] bg-white shadow-2xl sm:max-w-md sm:rounded-[28px]">

            {/* Header */}
            <div className="bg-[#f5f7fb] px-6 pb-6 pt-7 text-center sm:px-7">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e9eefc]">

                <WalletCards className="h-10 w-10 text-[#315bd1]" />

              </div>

              <h2 className="mt-5 text-2xl font-bold text-slate-900">
                Add Money to Wallet
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Enter the amount you wish to add
              </p>

            </div>

            {/* Body */}
            <div className="px-5 pb-6 pt-6 sm:px-7">

              {/* Amount */}
              <div className="flex items-center border-b-2 border-slate-100 pb-3">

                <span className="mr-4 text-5xl font-semibold text-[#9bb0eb]">
                  ₹
                </span>

                <input
                  type="text"
                  inputMode="numeric"
                  value={
                    addMoneyAmount
                  }
                  onChange={
                    handleAmountChange
                  }
                  autoFocus
                  className="min-w-0 flex-1 bg-transparent text-5xl font-bold text-[#315bd1] outline-none"
                />

              </div>

              {/* Quick Amounts */}
              <div className="mt-5 flex flex-wrap gap-2">

                {[
                  "500",
                  "1000",
                  "2000",
                  "5000",
                ].map(
                  (amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() =>
                        setAddMoneyAmount(
                          amount
                        )
                      }
                      className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                        addMoneyAmount ===
                        amount
                          ? "border-[#315bd1] bg-[#315bd1] text-white"
                          : "border-slate-200 bg-white text-slate-600 hover:border-[#315bd1]/40"
                      }`}
                    >
                      ₹{amount}
                    </button>
                  )
                )}

              </div>

              {/* Proceed */}
              <button
                type="button"
                onClick={
                  handleAddMoney
                }
                disabled={
                  !addMoneyAmount ||
                  Number(
                    addMoneyAmount
                  ) <= 0
                }
                className="mt-6 flex min-h-[58px] w-full items-center justify-center rounded-2xl bg-[#315bd1] px-5 text-base font-bold text-white shadow-sm transition hover:bg-[#274dbd] disabled:cursor-not-allowed disabled:opacity-50"
              >
                PROCEED TO ADD
              </button>

              {/* Cancel */}
              <button
                type="button"
                onClick={() =>
                  setShowAddMoneyModal(
                    false
                  )
                }
                className="mt-4 flex w-full items-center justify-center py-3 text-base font-semibold text-slate-700 transition hover:text-[#315bd1]"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================
          DAILY 2FA MODAL
      ======================================================== */}

      {show2FAModal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/55 p-4 backdrop-blur-sm"
          onMouseDown={(
            event
          ) => {
            if (
              event.target ===
                event.currentTarget &&
              !isAuthenticating &&
              !show2FASuccess
            ) {
              handleClose2FA();
            }
          }}
        >

          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* Header */}
            <div className="border-b border-slate-100 px-5 py-4">

              <div className="flex items-start justify-between">

                <div>

                  <h2 className="text-lg font-semibold text-slate-900">

                    {show2FASuccess
                      ? "2FA Authentication Successful"
                      : "Retailer Daily 2FA"}

                  </h2>

                  <p className="mt-1 text-sm text-slate-500">

                    {show2FASuccess
                      ? "Your daily biometric authentication has been completed."
                      : "Complete your daily authentication to continue."}

                  </p>

                </div>

                {!isAuthenticating &&
                  !show2FASuccess && (
                    <button
                      type="button"
                      onClick={
                        handleClose2FA
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}

              </div>

            </div>

            {/* Body */}
            <div className="max-h-[80vh] overflow-y-auto p-5">

              {show2FASuccess ? (

                /* ==================================================
                   SUCCESS
                ================================================== */

                <div className="flex flex-col items-center py-5 text-center">

                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50">

                    <CheckCircle2 className="h-12 w-12 text-green-500" />

                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    2FA is Done
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Your daily 2FA authentication
                    has been successfully completed.
                  </p>

                  {pendingNavigation && (
                    <p className="mt-3 text-sm font-medium text-[#315bd1]">
                      Redirecting you to the
                      selected service...
                    </p>
                  )}

                </div>

              ) : (

                <>
                  {/* ==================================================
                     PENDING
                  ================================================== */}

                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">

                    <div className="flex items-start gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100">

                        <ShieldCheck className="h-5 w-5 text-amber-600" />

                      </div>

                      <div className="min-w-0">

                        <h3 className="text-sm font-bold text-amber-800">
                          Your 2FA is pending
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-amber-700">
                          Daily biometric authentication
                          is required before accessing
                          financial services.
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* ==================================================
                     MOBILE NUMBER
                  ================================================== */}

                  <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">

                    <p className="text-xs font-medium text-slate-500">
                      Registered Mobile Number
                    </p>

                    <p className="mt-1 text-sm font-bold tracking-wide text-slate-900">
                      {maskedMobile}
                    </p>

                  </div>

                  {/* ==================================================
                     AADHAAR
                  ================================================== */}

                  <div className="mt-5">

                    <label
                      htmlFor="dashboard-aadhaar"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Retailer Aadhaar Number
                    </label>

                    <div className="flex min-h-[56px] items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 focus-within:border-[#315bd1]">

                      <UserCircle className="h-5 w-5 shrink-0 text-slate-400" />

                      <input
                        id="dashboard-aadhaar"
                        type="text"
                        inputMode="numeric"
                        maxLength={12}
                        value={aadhaar}
                        onChange={
                          handleAadhaarChange
                        }
                        disabled={
                          isAuthenticating
                        }
                        placeholder="Enter 12-digit Aadhaar number"
                        className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                      />

                      <span className="text-xs text-slate-400">
                        {aadhaar.length}/12
                      </span>

                    </div>

                  </div>

                  {/* ==================================================
                     BIOMETRIC DEVICE
                  ================================================== */}

                  <div className="mt-4 rounded-xl border border-[#315bd1]/20 bg-[#f4f6fd] p-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#315bd1]">

                        <Fingerprint className="h-6 w-6 text-white" />

                      </div>

                      <div>

                        <p className="text-sm font-bold text-slate-900">
                          Mantra MFS100
                        </p>

                        <p className="mt-1 flex items-center gap-2 text-xs font-medium text-green-600">

                          <span className="h-2 w-2 rounded-full bg-green-500" />

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
                    onClick={
                      handleStart2FA
                    }
                    disabled={
                      aadhaar.length !==
                        12 ||
                      isAuthenticating
                    }
                    className="mt-5 flex min-h-[56px] w-full items-center justify-center gap-3 rounded-xl bg-[#315bd1] px-5 text-sm font-bold text-white transition hover:bg-[#274dbd] disabled:cursor-not-allowed disabled:opacity-50"
                  >

                    {isAuthenticating ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        AUTHENTICATING...
                      </>
                    ) : (
                      <>
                        <Fingerprint className="h-5 w-5" />
                        COMPLETE 2FA
                      </>
                    )}

                  </button>

                  <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                    You need to complete 2FA once
                    every day before initiating
                    financial transactions.
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