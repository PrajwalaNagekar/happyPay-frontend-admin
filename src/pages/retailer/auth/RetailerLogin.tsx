import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Smartphone,
  LockKeyhole,
  Check,
  WalletCards,
  TrendingUp,
  Fingerprint,
  Send,
  CircleDollarSign,
  Store,
  AlertCircle,
} from "lucide-react";

const RetailerLogin = () => {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [error, setError] = useState("");

  // ============================================================
  // MOBILE CHANGE
  // ============================================================

  const handleMobileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 10);

    setMobile(value);
    setError("");
    setOtpSent(false);
    setOtp("");
    setOtpVerified(false);
  };

  // ============================================================
  // SEND OTP
  // ============================================================

  const handleSendOtp = () => {
    setError("");

    if (mobile.length !== 10) {
      setError(
        "Please enter a valid 10-digit mobile number.",
      );
      return;
    }

    /*
     * ==========================================================
     * REGISTERED MOBILE CHECK
     * ==========================================================
     *
     * Registration stores the completed retailer mobile as:
     *
     * registeredRetailerMobile
     *
     * Only that number is allowed to continue.
     */

    const registeredMobile = localStorage.getItem(
      "registeredRetailerMobile",
    );

    // No retailer has completed registration yet.
    if (!registeredMobile) {
      setError(
        "This mobile number is not registered with HappyPay. Please register as a retailer first.",
      );
      return;
    }

    // Entered mobile does not match registered mobile.
    if (mobile !== registeredMobile) {
      setError(
        "This mobile number is not registered with HappyPay. Please use your registered mobile number.",
      );
      return;
    }

    // Correct registered number.
    setOtpSent(true);
  };

  // ============================================================
  // OTP CHANGE
  // ============================================================

  const handleOtpChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 6);

    setOtp(value);
    setError("");

    if (value.length === 6) {
      if (value === "123456") {
        setOtpVerified(true);
      } else {
        setOtpVerified(false);
        setError("Invalid OTP. Please enter the correct OTP.");
      }
    } else {
      setOtpVerified(false);
    }
  };

  // ============================================================
  // LOGIN
  // ============================================================

  const handleLogin = () => {
    setError("");

    const registeredMobile = localStorage.getItem(
      "registeredRetailerMobile",
    );

    if (!registeredMobile) {
      setError(
        "No registered retailer account was found. Please register first.",
      );
      return;
    }

    if (mobile !== registeredMobile) {
      setError(
        "This mobile number is not registered with HappyPay.",
      );
      return;
    }

    if (otp.length !== 6) {
      setError(
        "Please enter the 6-digit OTP.",
      );
      return;
    }

    if (otp !== "123456") {
      setError(
        "Invalid OTP. Please enter the correct OTP.",
      );
      return;
    }

    /*
     * Store the currently logged-in retailer mobile.
     *
     * Dashboard can use this value for retailer-specific
     * daily 2FA tracking.
     */

    localStorage.setItem(
      "retailerMobile",
      registeredMobile,
    );

    localStorage.setItem(
      "token",
      "dummy-retailer-token",
    );

    localStorage.setItem(
      "role",
      "retailer",
    );

    navigate("/retailer", {
      replace: true,
    });
  };

  // ============================================================
  // CHANGE MOBILE
  // ============================================================

  const handleChangeMobile = () => {
    setOtpSent(false);
    setOtpVerified(false);
    setOtp("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-[#172033]">
      {/* =========================================================
          HEADER
      ========================================================= */}

      <header className="border-b border-[#e2e6ed] bg-white">
        <div className="mx-auto flex h-[76px] w-full max-w-[1280px] items-center justify-between px-6 lg:px-8">
          {/* LOGO */}

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-[#3156d9] to-[#10a88a] shadow-[0_5px_12px_rgba(49,91,209,0.18)]">
              <span className="text-lg font-bold text-white">
                H
              </span>
            </div>

            <div>
              <p className="text-[20px] font-bold tracking-tight text-[#172033]">
                HappyPay
              </p>

              <p className="hidden text-[12px] text-[#8992a3] sm:block">
                Retailer Portal
              </p>
            </div>
          </div>

          {/* REGISTER */}

          <div className="flex items-center gap-3">
            <span className="hidden text-[13px] text-[#737c8c] sm:block">
              New to HappyPay?
            </span>

            <button
              type="button"
              onClick={() =>
                navigate("/retailer/register")
              }
              className="rounded-xl border border-[#cbd5ed] bg-white px-4 py-2 text-[13px] font-semibold text-[#315bd1] transition hover:bg-[#f3f6ff]"
            >
              Register
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          MAIN
      ========================================================= */}

      <main className="mx-auto w-full max-w-[1280px] px-6 py-8 lg:px-8 lg:py-10">
        <div className="grid min-h-[650px] grid-cols-1 overflow-hidden rounded-2xl border border-[#dfe4eb] bg-white shadow-[0_10px_35px_rgba(23,32,51,0.07)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          {/* =====================================================
              LEFT LOGIN SECTION
          ===================================================== */}

          <section className="flex items-center justify-center border-b border-[#e5e8ee] px-6 py-10 sm:px-10 lg:border-b-0 lg:border-r lg:px-14 xl:px-20">
            <div className="w-full max-w-[440px]">
              {/* =================================================
                  LOGIN HEADER
              ================================================= */}

              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef2ff] text-[#315bd1]">
                  {otpSent ? (
                    <ShieldCheck
                      className="h-6 w-6"
                      strokeWidth={2}
                    />
                  ) : (
                    <Smartphone
                      className="h-6 w-6"
                      strokeWidth={2}
                    />
                  )}
                </div>

                <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#315bd1]">
                  Retailer Portal
                </p>

                <h1 className="mt-2 text-[30px] font-bold tracking-[-0.025em] text-[#172033] sm:text-[34px]">
                  {otpSent
                    ? "Verify your mobile"
                    : "Welcome back"}
                </h1>

                <p className="mt-2 max-w-[400px] text-[15px] leading-6 text-[#737c8c]">
                  {otpSent
                    ? `We've sent a verification code to +91 ${mobile}`
                    : "Sign in securely using the mobile number registered with your HappyPay retailer account."}
                </p>
              </div>

              {/* =================================================
                  PROGRESS
              ================================================= */}

              <div className="mt-7 flex items-center gap-2">
                <div className="h-1.5 w-12 rounded-full bg-gradient-to-r from-[#3156d9] to-[#10a88a]" />

                <div
                  className={`h-1.5 w-12 rounded-full transition ${
                    otpSent
                      ? "bg-gradient-to-r from-[#3156d9] to-[#10a88a]"
                      : "bg-[#d4d8e0]"
                  }`}
                />

                <span className="ml-1 text-[12px] font-medium text-[#8992a3]">
                  {otpSent ? "Step 2 of 2" : "Step 1 of 2"}
                </span>
              </div>

              {/* =================================================
                  ERROR
              ================================================= */}

              {error && (
                <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#f0cccc] bg-[#fff5f5] px-4 py-3">
                  <AlertCircle
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#c84f4f]"
                    strokeWidth={2}
                  />

                  <p className="text-[13px] leading-5 text-[#c84f4f]">
                    {error}
                  </p>
                </div>
              )}

              {/* =================================================
                  MOBILE NUMBER
              ================================================= */}

              <div
                className={
                  error
                    ? "mt-5"
                    : "mt-7"
                }
              >
                <label
                  htmlFor="retailer-login-mobile"
                  className="mb-2 block text-[14px] font-semibold text-[#172033]"
                >
                  Mobile Number
                </label>

                <div className="relative">
                  <Smartphone className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8992a3]" />

                  <span className="pointer-events-none absolute left-[52px] top-1/2 -translate-y-1/2">
                    <span className="border-r border-[#d9dde5] pr-3 text-[14px] font-semibold text-[#687286]">
                      +91
                    </span>
                  </span>

                  <input
                    id="retailer-login-mobile"
                    type="tel"
                    value={mobile}
                    onChange={handleMobileChange}
                    placeholder="Enter registered mobile number"
                    maxLength={10}
                    inputMode="numeric"
                    autoComplete="tel"
                    disabled={otpSent}
                    className="h-[56px] w-full rounded-xl border border-[#dfe3e9] bg-[#fafbfd] pl-[105px] pr-4 text-[15px] font-medium text-[#172033] outline-none transition placeholder:text-[#a1a8b5] hover:border-[#c5cad4] focus:border-[#315bd1] focus:ring-4 focus:ring-[#315bd1]/10 disabled:bg-[#f1f3f6] disabled:text-[#7d8594]"
                  />
                </div>
              </div>

              {/* =================================================
                  OTP
              ================================================= */}

              {otpSent && (
                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="retailer-login-otp"
                      className="text-[14px] font-semibold text-[#172033]"
                    >
                      Verification Code
                    </label>

                    <button
                      type="button"
                      onClick={handleChangeMobile}
                      className="text-[12px] font-semibold text-[#315bd1] hover:underline"
                    >
                      Change number
                    </button>
                  </div>

                  <input
                    id="retailer-login-otp"
                    type="text"
                    value={otp}
                    onChange={handleOtpChange}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    disabled={otpVerified}
                    className={`h-[56px] w-full rounded-xl border bg-[#fafbfd] px-4 text-center text-[18px] font-bold tracking-[0.45em] text-[#172033] outline-none transition placeholder:text-[#a1a8b5] placeholder:tracking-normal focus:border-[#315bd1] focus:ring-4 focus:ring-[#315bd1]/10 ${
                      otpVerified
                        ? "border-[#b9e8d4] bg-[#f4fcf8]"
                        : "border-[#dfe3e9]"
                    }`}
                  />

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[12px] text-[#9299a7]">
                      Didn't receive the code?
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        setOtp("");
                        setError("");
                      }}
                      className="text-[12px] font-semibold text-[#315bd1] hover:underline"
                    >
                      Resend OTP
                    </button>
                  </div>
                </div>
              )}

              {/* =================================================
                  VERIFIED
              ================================================= */}

              {otpVerified && (
                <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#cce9dc] bg-[#f2fbf7] px-4 py-3">
                  <Check
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#08a77e]"
                    strokeWidth={2.5}
                  />

                  <div>
                    <p className="text-[13px] font-semibold text-[#087b5d]">
                      Mobile number verified
                    </p>

                    <p className="mt-1 text-[12px] text-[#5f756c]">
                      Your registered retailer account has
                      been verified.
                    </p>
                  </div>
                </div>
              )}

              {/* =================================================
                  PRIMARY BUTTON
              ================================================= */}

              <button
                type="button"
                onClick={
                  otpSent
                    ? handleLogin
                    : handleSendOtp
                }
                className={`mt-7 flex h-[54px] w-full items-center justify-center gap-2 rounded-xl text-[15px] font-semibold text-white shadow-[0_7px_18px_rgba(49,91,209,0.22)] transition ${
                  otpVerified
                    ? "bg-[#08ae82] hover:bg-[#079b74]"
                    : "bg-gradient-to-r from-[#3156d9] to-[#10a88a] hover:opacity-90"
                }`}
              >
                {otpVerified
                  ? "Login to Retailer Portal"
                  : otpSent
                    ? "Verify & Continue"
                    : "Continue with OTP"}

                {otpVerified ? (
                  <Check
                    className="h-4 w-4"
                    strokeWidth={2.5}
                  />
                ) : (
                  <ArrowRight
                    className="h-4 w-4"
                    strokeWidth={2.2}
                  />
                )}
              </button>

              {/* =================================================
                  REGISTER
              ================================================= */}

              <div className="mt-7 text-center">
                <p className="text-[13px] text-[#737c8c]">
                  Don't have a HappyPay retailer account?
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/retailer/register")
                  }
                  className="mt-1.5 text-[14px] font-semibold text-[#315bd1] hover:underline"
                >
                  Register as a Retailer
                </button>
              </div>

              {/* =================================================
                  SECURITY
              ================================================= */}

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-[#edf0f4] pt-5 text-[11px] text-[#8992a3]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#315bd1]" />
                  Secure OTP authentication
                </span>

                <span className="hidden text-[#d2d5db] sm:block">
                  •
                </span>

                <span className="flex items-center gap-1.5">
                  <LockKeyhole className="h-3.5 w-3.5 text-[#315bd1]" />
                  Protected access
                </span>
              </div>

              {/* DEMO OTP */}

              <div className="mt-3 text-center">
                <span className="text-[11px] text-[#9ba2ae]">
                  Demo OTP: 123456
                </span>
              </div>
            </div>
          </section>

          {/* =====================================================
              RIGHT INFORMATION PANEL
          ===================================================== */}

          <section className="relative hidden overflow-hidden bg-[#eef2ff] lg:flex">
            {/* BACKGROUND CIRCLES */}

            <div className="absolute -right-32 -top-32 h-[440px] w-[440px] rounded-full bg-[#dce5ff]" />

            <div className="absolute -bottom-40 -left-32 h-[440px] w-[440px] rounded-full bg-[#dfe9ff]" />

            <div className="relative flex w-full flex-col items-center justify-center px-10 py-10 xl:px-16">
              {/* INTRO */}

              <div className="max-w-[540px] text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#315bd1] shadow-sm">
                  <Store
                    className="h-7 w-7"
                    strokeWidth={2}
                  />
                </div>

                <p className="mt-5 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#315bd1]">
                  HappyPay Retailer Portal
                </p>

                <h2 className="mt-2 text-[32px] font-bold leading-tight tracking-[-0.03em] text-[#172033] xl:text-[38px]">
                  Everything you need.
                  <br />
                  <span className="text-[#315bd1]">
                    One powerful portal.
                  </span>
                </h2>

                <p className="mx-auto mt-4 max-w-[470px] text-[14px] leading-6 text-[#687286]">
                  Manage AEPS, DMT, CMS, wallet and retailer
                  transactions from one secure platform.
                </p>
              </div>

              {/* =================================================
                  DASHBOARD PREVIEW
              ================================================= */}

              <div className="relative mt-9 w-full max-w-[560px]">
                <div className="relative rounded-2xl border border-white bg-white p-5 shadow-[0_20px_45px_rgba(49,91,209,0.14)]">
                  {/* BALANCE */}

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-medium text-[#8992a3]">
                        AVAILABLE BALANCE
                      </p>

                      <p className="mt-1 text-[24px] font-bold tracking-tight text-[#172033]">
                        ₹32,485.95
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef2ff] text-[#315bd1]">
                      <WalletCards
                        className="h-5 w-5"
                        strokeWidth={2}
                      />
                    </div>
                  </div>

                  {/* SERVICES */}

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    <ServiceCard
                      icon={
                        <Fingerprint
                          className="h-5 w-5"
                          strokeWidth={2}
                        />
                      }
                      title="AEPS"
                      amount="₹12,950"
                    />

                    <ServiceCard
                      icon={
                        <Send
                          className="h-5 w-5"
                          strokeWidth={2}
                        />
                      }
                      title="DMT"
                      amount="₹8,654"
                    />

                    <ServiceCard
                      icon={
                        <CircleDollarSign
                          className="h-5 w-5"
                          strokeWidth={2}
                        />
                      }
                      title="CMS"
                      amount="₹5,240"
                    />
                  </div>

                  {/* TRANSACTION OVERVIEW */}

                  <div className="mt-4 rounded-xl border border-[#e4e7ed] bg-[#fafbfd] p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-medium text-[#8992a3]">
                          TRANSACTION OVERVIEW
                        </p>

                        <p className="mt-1 text-[17px] font-bold text-[#172033]">
                          ₹26,844
                        </p>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-semibold text-[#08a77e]">
                        <TrendingUp className="h-3.5 w-3.5" />
                        12.8%
                      </div>
                    </div>

                    {/* GRAPH */}

                    <div className="relative mt-4 h-[72px]">
                      <div className="absolute inset-x-0 top-0 border-t border-dashed border-[#dfe3e9]" />

                      <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-[#dfe3e9]" />

                      <div className="absolute inset-x-0 bottom-0 border-t border-dashed border-[#dfe3e9]" />

                      <svg
                        viewBox="0 0 500 100"
                        className="absolute inset-0 h-full w-full"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="
                            M0 78
                            C40 70, 55 76, 90 60
                            S150 70, 180 48
                            S230 56, 260 42
                            S310 55, 340 30
                            S400 45, 430 24
                            S470 30, 500 12
                          "
                          fill="none"
                          stroke="#315bd1"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* STATS */}

                  <div className="mt-4 grid grid-cols-3 divide-x divide-[#e4e7ed] border-t border-[#e4e7ed] pt-4">
                    <Stat
                      title="TODAY'S EARNINGS"
                      value="₹1,284.50"
                    />

                    <Stat
                      title="TRANSACTIONS"
                      value="128"
                    />

                    <Stat
                      title="SUCCESS RATE"
                      value="98.6%"
                      green
                    />
                  </div>
                </div>

                {/* SUCCESS CARD */}

                <div className="absolute -right-3 top-8 hidden items-center gap-3 rounded-xl border border-[#e0e5f0] bg-white px-4 py-3 shadow-[0_12px_30px_rgba(23,32,51,0.14)] xl:flex">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e7f8f2]">
                    <Check
                      className="h-5 w-5 text-[#08a77e]"
                      strokeWidth={2.5}
                    />
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-[#172033]">
                      Transaction Successful
                    </p>

                    <p className="mt-0.5 text-[10px] text-[#8992a3]">
                      ₹2,500 transferred
                    </p>
                  </div>
                </div>
              </div>

              {/* SERVICE LABELS */}

              <div className="mt-8 flex items-center gap-4 text-[11px] font-medium text-[#737c8c]">
                <span>AEPS</span>

                <span className="text-[#bdc4d0]">
                  •
                </span>

                <span>DMT</span>

                <span className="text-[#bdc4d0]">
                  •
                </span>

                <span>CMS</span>

                <span className="text-[#bdc4d0]">
                  •
                </span>

                <span>Secure Payments</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

/* =============================================================
   SERVICE CARD
============================================================= */

const ServiceCard = ({
  icon,
  title,
  amount,
}: {
  icon: React.ReactNode;
  title: string;
  amount: string;
}) => {
  return (
    <div className="rounded-xl border border-[#e2e6ef] bg-[#f8f9fc] p-3.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eef2ff] text-[#315bd1]">
        {icon}
      </div>

      <p className="mt-3 text-[10px] font-medium text-[#8992a3]">
        {title}
      </p>

      <p className="mt-1 text-[14px] font-bold text-[#172033]">
        {amount}
      </p>
    </div>
  );
};

/* =============================================================
   STAT
============================================================= */

const Stat = ({
  title,
  value,
  green = false,
}: {
  title: string;
  value: string;
  green?: boolean;
}) => {
  return (
    <div className="px-3 text-center first:pl-0 last:pr-0">
      <p className="text-[9px] font-medium text-[#8992a3]">
        {title}
      </p>

      <p
        className={`mt-1 text-[14px] font-bold ${
          green
            ? "text-[#08a77e]"
            : "text-[#172033]"
        }`}
      >
        {value}
      </p>
    </div>
  );
};

export default RetailerLogin;
