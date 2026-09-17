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
  CircleDollarSign,
} from "lucide-react";

const RetailerLogin = () => {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");

  // ============================================================
  // SEND OTP
  // ============================================================

  const handleSendOtp = () => {
    setError("");

    if (mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setOtpSent(true);
  };

  // ============================================================
  // LOGIN
  // ============================================================

  const handleLogin = () => {
    setError("");

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    if (otp !== "123456") {
      setError("Invalid OTP. Please try again.");
      return;
    }

    localStorage.setItem("token", "dummy-retailer-token");
    localStorage.setItem("role", "retailer");

    navigate("/retailer/kyc-pending", {
      replace: true,
    });
  };

  return (
    <div className="min-h-screen bg-[#D8D6D1] p-2 sm:p-3 lg:p-4">
      {/* ============================================================
          MAIN CONTAINER
      ============================================================ */}

      <div
        className="
          mx-auto flex
          h-auto
          min-h-[calc(100vh-16px)]
          max-w-[1400px]
          overflow-hidden
          rounded-[24px]
          border border-white/70
          bg-white
          shadow-[0_20px_60px_rgba(23,37,54,0.18)]
          sm:min-h-[calc(100vh-24px)]
          lg:h-[calc(100vh-32px)]
          lg:min-h-0
        "
      >
        {/* ============================================================
            LEFT — LOGIN
        ============================================================ */}

        <div
          className="
            flex
            w-full
            items-center
            justify-center
            bg-[#E7E5E1]
            px-6
            py-8
            sm:px-10
            lg:w-[44%]
            lg:px-12
            lg:py-6
            xl:px-16
          "
        >
          <div className="w-full max-w-[380px]">
            {/* ======================================================
                LOGO
            ====================================================== */}

            <div className="mb-7 flex items-center gap-3">
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-[10px]
                  bg-[#172536]
                  shadow-[0_6px_16px_rgba(23,37,54,0.20)]
                "
              >
                <span className="text-base font-bold text-white">H</span>
              </div>

              <div>
                <h1
                  className="
                    text-[16px]
                    font-bold
                    tracking-tight
                    text-[#172536]
                  "
                >
                  HappyPay
                </h1>

                <p
                  className="
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.15em]
                    text-[#6E7178]
                  "
                >
                  Retailer Portal
                </p>
              </div>
            </div>

            {/* ======================================================
                HEADING
            ====================================================== */}

            <div>
              <h2
                className="
                  text-[27px]
                  font-semibold
                  tracking-[-0.03em]
                  text-[#172536]
                "
              >
                {otpSent ? "Verify your mobile" : "Welcome back"}
              </h2>

              <p
                className="
                  mt-1.5
                  max-w-[320px]
                  text-[13px]
                  leading-5
                  text-[#686C74]
                "
              >
                {otpSent
                  ? `We've sent a verification code to +91 ${mobile}`
                  : "Sign in securely to manage your retailer account and transactions."}
              </p>
            </div>

            {/* ======================================================
                STEP INDICATOR
            ====================================================== */}

            <div className="mt-5 flex items-center gap-2">
              <div
                className="
                  h-1
                  w-9
                  rounded-full
                  bg-[#4A3E94]
                "
              />

              <div
                className={`
                  h-1
                  w-9
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    otpSent
                      ? "bg-[#4A3E94]"
                      : "bg-[#C9C8C5]"
                  }
                `}
              />

              <span
                className="
                  ml-1.5
                  text-[10px]
                  text-[#777A81]
                "
              >
                {otpSent ? "Step 2 of 2" : "Step 1 of 2"}
              </span>
            </div>

            {/* ======================================================
                ERROR
            ====================================================== */}

            {error && (
              <div
                className="
                  mt-4
                  rounded-lg
                  border
                  border-red-100
                  bg-red-50
                  px-3
                  py-2.5
                  text-[11px]
                  text-red-600
                "
              >
                {error}
              </div>
            )}

            {/* ======================================================
                MOBILE NUMBER
            ====================================================== */}

            <div className={error ? "mt-4" : "mt-5"}>
              <label
                htmlFor="mobile"
                className="
                  mb-1.5
                  block
                  text-[11px]
                  font-semibold
                  text-[#172536]
                "
              >
                Mobile Number
              </label>

              <div className="relative">
                <Smartphone
                  className="
                    absolute
                    left-3.5
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-[#70737A]
                  "
                />

                <span
                  className="
                    absolute
                    left-10
                    top-1/2
                    -translate-y-1/2
                    border-r
                    border-[#D0CFCC]
                    pr-2.5
                    text-[11px]
                    font-medium
                    text-[#686C74]
                  "
                >
                  +91
                </span>

                <input
                  id="mobile"
                  type="tel"
                  value={mobile}
                  maxLength={10}
                  disabled={otpSent}
                  inputMode="numeric"
                  autoComplete="tel"
                  onChange={(e) =>
                    setMobile(
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                  placeholder="Enter mobile number"
                  className="
                    h-[46px]
                    w-full
                    rounded-[10px]
                    border
                    border-[#CECDCA]
                    bg-white
                    pl-[76px]
                    pr-4
                    text-[13px]
                    text-[#172536]
                    outline-none
                    transition-all
                    placeholder:text-[#999BA0]
                    hover:border-[#AAA9A6]
                    focus:border-[#4A3E94]
                    focus:ring-4
                    focus:ring-[#4A3E94]/10
                    disabled:bg-[#DCDAD6]
                    disabled:text-[#6E7178]
                  "
                />
              </div>
            </div>

            {/* ======================================================
                OTP
            ====================================================== */}

            {otpSent && (
              <div className="mt-4">
                <div
                  className="
                    mb-1.5
                    flex
                    items-center
                    justify-between
                  "
                >
                  <label
                    htmlFor="otp"
                    className="
                      text-[11px]
                      font-semibold
                      text-[#172536]
                    "
                  >
                    Verification Code
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setOtp("");
                      setError("");
                    }}
                    className="
                      text-[10px]
                      font-semibold
                      text-[#4A3E94]
                      hover:text-[#3B317A]
                      hover:underline
                    "
                  >
                    Change number
                  </button>
                </div>

                <input
                  id="otp"
                  type="text"
                  value={otp}
                  maxLength={6}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  onChange={(e) =>
                    setOtp(
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                  placeholder="Enter 6-digit OTP"
                  className="
                    h-[46px]
                    w-full
                    rounded-[10px]
                    border
                    border-[#CECDCA]
                    bg-white
                    px-4
                    text-center
                    text-base
                    font-semibold
                    tracking-[0.45em]
                    text-[#172536]
                    outline-none
                    transition
                    placeholder:text-[#999BA0]
                    focus:border-[#4A3E94]
                    focus:ring-4
                    focus:ring-[#4A3E94]/10
                  "
                />

                <div
                  className="
                    mt-2
                    flex
                    justify-between
                  "
                >
                  <span
                    className="
                      text-[10px]
                      text-[#999BA0]
                    "
                  >
                    Didn't receive the code?
                  </span>

                  <button
                    type="button"
                    className="
                      text-[10px]
                      font-semibold
                      text-[#4A3E94]
                      hover:text-[#3B317A]
                    "
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
            )}

            {/* ======================================================
                BUTTON
            ====================================================== */}

            <button
              type="button"
              onClick={
                otpSent
                  ? handleLogin
                  : handleSendOtp
              }
              className="
                mt-5
                flex
                h-[46px]
                w-full
                items-center
                justify-center
                gap-2
                rounded-[10px]
                bg-[#172536]
                text-[13px]
                font-semibold
                text-white
                shadow-[0_8px_18px_rgba(23,37,54,0.18)]
                transition-all
                hover:bg-[#0F1C2A]
                hover:shadow-[0_10px_22px_rgba(23,37,54,0.22)]
                active:scale-[0.99]
              "
            >
              {otpSent
                ? "Verify & Continue"
                : "Continue with OTP"}

              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            {/* ======================================================
                REGISTER
            ====================================================== */}

            <div className="mt-5 text-center">
              <p className="text-[10px] text-[#686C74]">
                Don't have a HappyPay retailer account?
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/retailer/register")
                }
                className="
                  mt-1
                  text-[11px]
                  font-semibold
                  text-[#4A3E94]
                  hover:text-[#3B317A]
                  hover:underline
                "
              >
                Register as a Retailer
              </button>
            </div>

            {/* ======================================================
                SECURITY
            ====================================================== */}

            <div
              className="
                mt-6
                flex
                items-center
                justify-center
                gap-1.5
                text-[9px]
                text-[#898B91]
              "
            >
              <ShieldCheck className="h-3 w-3" />

              <span>Secure OTP authentication</span>

              <span className="text-[#C4C3C1]">
                •
              </span>

              <LockKeyhole className="h-2.5 w-2.5" />

              <span>Protected access</span>
            </div>

            {/* ======================================================
                DEMO OTP
            ====================================================== */}

            <div className="mt-2 flex justify-center">
              <span
                className="
                  flex
                  items-center
                  gap-1
                  text-[9px]
                  text-[#898B91]
                "
              >
                <Check
                  className="
                    h-2.5
                    w-2.5
                    text-[#4F8A68]
                  "
                />

                Demo OTP: 123456
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================
            RIGHT — FINTECH VISUAL
        ============================================================ */}

        <div
          className="
            relative
            hidden
            overflow-hidden
            bg-[#C8C4D8]
            lg:flex
            lg:w-[56%]
          "
        >
          {/* ======================================================
              BACKGROUND
          ====================================================== */}

          <div
            className="
              absolute
              -right-32
              -top-32
              h-[420px]
              w-[420px]
              rounded-full
              bg-[#EEECE9]/65
              blur-3xl
            "
          />

          <div
            className="
              absolute
              -bottom-32
              -left-20
              h-[360px]
              w-[360px]
              rounded-full
              bg-[#4A3E94]/20
              blur-3xl
            "
          />

          {/* ======================================================
              CONTENT
          ====================================================== */}

          <div
            className="
              relative
              flex
              h-full
              w-full
              flex-col
              items-center
              px-8
              py-8
              xl:px-10
            "
          >
            {/* ====================================================
                TOP TEXT
            ==================================================== */}

            <div className="text-center">
              <p
                className="
                  text-[12px]
                  font-medium
                  text-[#4A3E94]
                "
              >
                Simple. Secure. Reliable.
              </p>

              <h2
                className="
                  mt-1.5
                  max-w-[520px]
                  text-[31px]
                  font-semibold
                  leading-[1.08]
                  tracking-[-0.04em]
                  text-[#172536]
                "
              >
                Everything you need.
                <br />

                <span className="text-[#4A3E94]">
                  One powerful portal.
                </span>
              </h2>

              <p
                className="
                  mx-auto
                  mt-2.5
                  max-w-[410px]
                  text-[12px]
                  leading-5
                  text-[#5F626A]
                "
              >
                Manage AEPS, DMT, CMS, wallet and your
                retailer transactions from one secure platform.
              </p>
            </div>

            {/* ====================================================
                DASHBOARD
            ==================================================== */}

            <div
              className="
                relative
                mt-7
                w-full
                max-w-[535px]
              "
            >
              {/* Glow */}

              <div
                className="
                  absolute
                  inset-x-10
                  bottom-0
                  top-5
                  rounded-[35px]
                  bg-white/35
                  blur-3xl
                "
              />

              {/* Dashboard */}

              <div
                className="
                  relative
                  rounded-[20px]
                  border
                  border-white/70
                  bg-[#F9F8F7]/95
                  p-4
                  shadow-[0_20px_50px_rgba(23,37,54,0.20)]
                  backdrop-blur-xl
                "
              >
                {/* ==================================================
                    BALANCE
                ================================================== */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div>
                    <p
                      className="
                        text-[8px]
                        text-[#85878D]
                      "
                    >
                      AVAILABLE BALANCE
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-xl
                        font-semibold
                        tracking-tight
                        text-[#172536]
                      "
                    >
                      ₹32,485.95
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#D9D5EF]
                    "
                  >
                    <WalletCards
                      className="
                        h-3.5
                        w-3.5
                        text-[#4A3E94]
                      "
                    />
                  </div>
                </div>

                {/* ==================================================
                    SERVICE CARDS
                ================================================== */}

                <div
                  className="
                    mt-3
                    grid
                    grid-cols-3
                    gap-2
                  "
                >
                  {/* AEPS */}

                  <div
                    className="
                      rounded-xl
                      bg-[#E8E5ED]
                      p-3
                    "
                  >
                    <div
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-lg
                        bg-white
                      "
                    >
                      <FingerprintIcon />
                    </div>

                    <p
                      className="
                        mt-2
                        text-[8px]
                        text-[#85878D]
                      "
                    >
                      AEPS
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-xs
                        font-semibold
                        text-[#172536]
                      "
                    >
                      ₹12,950
                    </p>
                  </div>

                  {/* DMT */}

                  <div
                    className="
                      rounded-xl
                      bg-[#E8E5ED]
                      p-3
                    "
                  >
                    <div
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-lg
                        bg-white
                      "
                    >
                      <SendIcon />
                    </div>

                    <p
                      className="
                        mt-2
                        text-[8px]
                        text-[#85878D]
                      "
                    >
                      DMT
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-xs
                        font-semibold
                        text-[#172536]
                      "
                    >
                      ₹8,654
                    </p>
                  </div>

                  {/* CMS */}

                  <div
                    className="
                      rounded-xl
                      bg-[#E8E5ED]
                      p-3
                    "
                  >
                    <div
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-lg
                        bg-white
                      "
                    >
                      <CircleDollarSign
                        className="
                          h-3.5
                          w-3.5
                          text-[#4A3E94]
                        "
                      />
                    </div>

                    <p
                      className="
                        mt-2
                        text-[8px]
                        text-[#85878D]
                      "
                    >
                      CMS
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-xs
                        font-semibold
                        text-[#172536]
                      "
                    >
                      ₹5,240
                    </p>
                  </div>
                </div>

                {/* ==================================================
                    TRANSACTION OVERVIEW
                ================================================== */}

                <div
                  className="
                    mt-3
                    rounded-xl
                    border
                    border-[#E0DEDB]
                    bg-white
                    p-3
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <div>
                      <p
                        className="
                          text-[8px]
                          text-[#85878D]
                        "
                      >
                        TRANSACTION OVERVIEW
                      </p>

                      <p
                        className="
                          mt-0.5
                          text-xs
                          font-semibold
                          text-[#172536]
                        "
                      >
                        ₹26,844
                      </p>
                    </div>

                    <div
                      className="
                        flex
                        items-center
                        gap-1
                        text-[9px]
                        text-[#4F8A68]
                      "
                    >
                      <TrendingUp className="h-3 w-3" />
                      12.8%
                    </div>
                  </div>

                  {/* GRAPH */}

                  <div
                    className="
                      relative
                      mt-3
                      h-14
                    "
                  >
                    <div
                      className="
                        absolute
                        inset-x-0
                        top-0
                        border-t
                        border-dashed
                        border-[#E1E0DE]
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-x-0
                        top-1/2
                        border-t
                        border-dashed
                        border-[#E1E0DE]
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-x-0
                        bottom-0
                        border-t
                        border-dashed
                        border-[#E1E0DE]
                      "
                    />

                    <svg
                      viewBox="0 0 500 100"
                      className="
                        absolute
                        inset-0
                        h-full
                        w-full
                      "
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
                        stroke="#4A3E94"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* ==================================================
                    BOTTOM STATS
                ================================================== */}

                <div
                  className="
                    mt-3
                    flex
                    items-center
                    justify-between
                    border-t
                    border-[#E1E0DE]
                    pt-3
                  "
                >
                  <div>
                    <p
                      className="
                        text-[8px]
                        text-[#85878D]
                      "
                    >
                      TODAY'S EARNINGS
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-xs
                        font-semibold
                        text-[#172536]
                      "
                    >
                      ₹1,284.50
                    </p>
                  </div>

                  <div
                    className="
                      h-6
                      w-px
                      bg-[#E1E0DE]
                    "
                  />

                  <div>
                    <p
                      className="
                        text-[8px]
                        text-[#85878D]
                      "
                    >
                      TRANSACTIONS
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-xs
                        font-semibold
                        text-[#172536]
                      "
                    >
                      128
                    </p>
                  </div>

                  <div
                    className="
                      h-6
                      w-px
                      bg-[#E1E0DE]
                    "
                  />

                  <div>
                    <p
                      className="
                        text-[8px]
                        text-[#85878D]
                      "
                    >
                      SUCCESS RATE
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-xs
                        font-semibold
                        text-[#4F8A68]
                      "
                    >
                      98.6%
                    </p>
                  </div>
                </div>
              </div>

              {/* ==================================================
                  FLOATING NOTIFICATION
              ================================================== */}

              <div
                className="
                  absolute
                  -right-2
                  top-12
                  flex
                  items-center
                  gap-2.5
                  rounded-xl
                  border
                  border-white/80
                  bg-white/95
                  px-3
                  py-2.5
                  shadow-[0_12px_28px_rgba(23,37,54,0.18)]
                  backdrop-blur-xl
                "
              >
                <div
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#D9D5EF]
                  "
                >
                  <Check
                    className="
                      h-3.5
                      w-3.5
                      text-[#4A3E94]
                    "
                  />
                </div>

                <div>
                  <p
                    className="
                      text-[8px]
                      font-semibold
                      text-[#172536]
                    "
                  >
                    Transaction Successful
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[8px]
                      text-[#85878D]
                    "
                  >
                    ₹2,500 transferred
                  </p>
                </div>
              </div>
            </div>

            {/* ======================================================
                BOTTOM SERVICES
            ====================================================== */}

            <div
              className="
                mt-auto
                flex
                items-center
                gap-5
                text-[9px]
                text-[#666A72]
              "
            >
              <span>AEPS</span>

              <span className="text-[#AAA8AF]">
                •
              </span>

              <span>DMT</span>

              <span className="text-[#AAA8AF]">
                •
              </span>

              <span>CMS</span>

              <span className="text-[#AAA8AF]">
                •
              </span>

              <span>Secure Payments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================================================================
   FINGERPRINT ICON
================================================================ */

const FingerprintIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-3.5 w-3.5 text-[#4A3E94]"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="M12 11a3 3 0 0 1 3 3c0 3-.5 5-1.5 7" />

    <path d="M8.5 20c1-2 1.5-4 1.5-6a2 2 0 0 1 4 0c0 2.5-.4 4.7-1.2 6.5" />

    <path d="M6 17c.5-1.5.7-3 .7-4.5a5.3 5.3 0 0 1 10.6 0c0 1.7-.2 3.2-.6 4.6" />

    <path d="M4.5 14.5c-.1-.7-.1-1.3-.1-2a7.6 7.6 0 0 1 15.2 0" />
  </svg>
);

/* ================================================================
   SEND ICON
================================================================ */

const SendIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-3.5 w-3.5 text-[#4A3E94]"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="M21 3 10 14" />

    <path d="m21 3-7 18-4-7-7-4Z" />
  </svg>
);

export default RetailerLogin;