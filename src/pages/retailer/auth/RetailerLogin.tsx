import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Smartphone,
  LockKeyhole,
  Check,
  Store,
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
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] w-full max-w-[1180px] items-center justify-center">
        <div className="w-full overflow-hidden rounded-[30px] border border-white bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
          <div className="grid min-h-[700px] lg:grid-cols-[0.9fr_1.1fr]">
            {/* LEFT — PREMIUM LOGIN */}
            <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-14 xl:px-20">
              <div className="w-full max-w-[430px]">
                {/* BRAND */}
                <div className="mb-10 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7c3aed] shadow-[0_10px_24px_rgba(49,91,209,0.25)]">
                    <span className="text-xl font-bold text-white">H</span>
                  </div>

                  <div>
                    <p className="text-[20px] font-bold tracking-tight text-[#172033]">
                      HappyPay
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[#8992a3]">
                      Retailer Portal
                    </p>
                  </div>
                </div>

                {/* HEADER */}
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#dce4f8] bg-[#f3f6ff] px-3 py-1.5">
                    {otpSent ? (
                      <ShieldCheck className="h-4 w-4 text-[#7c3aed]" />
                    ) : (
                      <Smartphone className="h-4 w-4 text-[#7c3aed]" />
                    )}

                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#7c3aed]">
                      {otpSent ? "Mobile Verification" : "Secure Retailer Access"}
                    </span>
                  </div>

                  <h1 className="mt-5 text-[34px] font-bold leading-tight tracking-[-0.035em] text-[#172033] sm:text-[38px]">
                    {otpSent ? "Verify your mobile" : "Welcome back"}
                  </h1>

                  <p className="mt-3 max-w-[410px] text-[14px] leading-6 text-[#737c8c]">
                    {otpSent
                      ? `Enter the 6-digit verification code sent to +91 ${mobile}.`
                      : "Sign in securely with the mobile number registered to your HappyPay retailer account."}
                  </p>
                </div>

                {/* STEP INDICATOR */}
                <div className="mt-8 flex items-center gap-2">
                  <div className="h-1.5 w-14 rounded-full bg-[#7c3aed]" />
                  <div
                    className={`h-1.5 w-14 rounded-full transition-all duration-300 ${
                      otpSent ? "bg-[#7c3aed]" : "bg-[#dce1e9]"
                    }`}
                  />
                  <span className="ml-1 text-[11px] font-medium text-[#8992a3]">
                    Step {otpSent ? "2" : "1"} of 2
                  </span>
                </div>

                {/* ERROR */}
                {error && (
                  <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#f0cccc] bg-[#fff5f5] px-4 py-3.5">
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#c84f4f]" />
                    <p className="text-[13px] leading-5 text-[#c84f4f]">
                      {error}
                    </p>
                  </div>
                )}

                {/* MOBILE */}
                <div className={error ? "mt-5" : "mt-8"}>
                  <label
                    htmlFor="retailer-login-mobile"
                    className="mb-2.5 block text-[13px] font-semibold text-[#172033]"
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
                      className="h-[58px] w-full rounded-2xl border border-[#dfe3e9] bg-[#fafbfd] pl-[105px] pr-4 text-[15px] font-medium text-[#172033] outline-none transition placeholder:text-[#a1a8b5] hover:border-[#c5cad4] focus:border-[#7c3aed] focus:ring-4 focus:ring-[#7c3aed]/10 disabled:bg-[#f1f3f6]"
                    />
                  </div>
                </div>

                {/* OTP */}
                {otpSent && (
                  <div className="mt-5">
                    <div className="mb-2.5 flex items-center justify-between">
                      <label
                        htmlFor="retailer-login-otp"
                        className="text-[13px] font-semibold text-[#172033]"
                      >
                        Verification Code
                      </label>

                      <button
                        type="button"
                        onClick={handleChangeMobile}
                        className="text-[12px] font-semibold text-[#7c3aed] hover:underline"
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
                      className={`h-[58px] w-full rounded-2xl border bg-[#fafbfd] px-4 text-center text-[19px] font-bold tracking-[0.5em] text-[#172033] outline-none transition placeholder:text-[11px] placeholder:tracking-normal focus:border-[#7c3aed] focus:ring-4 focus:ring-[#7c3aed]/10 ${
                        otpVerified
                          ? "border-[#b9e8d4] bg-[#f4fcf8]"
                          : "border-[#dfe3e9]"
                      }`}
                    />

                    <div className="mt-2.5 flex items-center justify-between">
                      <span className="text-[11px] text-[#9299a7]">
                        Didn't receive the code?
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          setOtp("");
                          setError("");
                          setOtpVerified(false);
                        }}
                        className="text-[11px] font-semibold text-[#7c3aed] hover:underline"
                      >
                        Resend OTP
                      </button>
                    </div>
                  </div>
                )}

                {/* VERIFIED */}
                {otpVerified && (
                  <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#cce9dc] bg-[#f2fbf7] px-4 py-3.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#08a77e]">
                      <Check
                        className="h-4 w-4 text-white"
                        strokeWidth={2.5}
                      />
                    </div>

                    <div>
                      <p className="text-[13px] font-semibold text-[#087b5d]">
                        Mobile number verified
                      </p>
                      <p className="mt-1 text-[11px] leading-5 text-[#5f756c]">
                        Your registered retailer account is ready to continue.
                      </p>
                    </div>
                  </div>
                )}

                {/* PRIMARY ACTION */}
                <button
                  type="button"
                  onClick={otpSent ? handleLogin : handleSendOtp}
                  className={`mt-7 flex h-[58px] w-full items-center justify-center gap-2 rounded-2xl text-[14px] font-bold text-white shadow-[0_12px_26px_rgba(49,91,209,0.22)] transition active:scale-[0.99] ${
                    otpVerified
                      ? "bg-[#08ae82] hover:bg-[#079b74]"
                      : "bg-[#7c3aed] hover:bg-[#294fb8]"
                  }`}
                >
                  {otpVerified
                    ? "Login to Retailer Portal"
                    : otpSent
                      ? "Verify & Continue"
                      : "Continue with OTP"}

                  {otpVerified ? (
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                </button>

                {/* REGISTER */}
                <div className="mt-7 text-center">
                  <p className="text-[12px] text-[#737c8c]">
                    Don't have a HappyPay retailer account?
                  </p>

                  <button
                    type="button"
                    onClick={() => navigate("/retailer/register")}
                    className="mt-1.5 text-[13px] font-bold text-[#7c3aed] hover:underline"
                  >
                    Register as a Retailer
                  </button>
                </div>

                {/* SECURITY */}
                <div className="mt-8 border-t border-[#edf0f4] pt-5">
                  <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] text-[#8992a3]">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#7c3aed]" />
                      Secure OTP authentication
                    </span>

                    <span className="text-[#d2d5db]">•</span>

                    <span className="flex items-center gap-1.5">
                      <LockKeyhole className="h-3.5 w-3.5 text-[#7c3aed]" />
                      Protected access
                    </span>
                  </div>

                  <p className="mt-3 text-center text-[10px] text-[#a1a8b5]">
                    Demo OTP: 123456
                  </p>
                </div>
              </div>
            </section>

            {/* RIGHT — PREMIUM BRAND PANEL */}
            <section className="relative hidden overflow-hidden bg-gradient-to-br from-[#315bd1] via-[#6366f1] to-[#7c3aed] lg:flex">
              {/* Decorative background */}
              <div className="absolute -right-28 -top-24 h-[350px] w-[350px] rounded-full bg-white/10 blur-[80px]" />
              <div className="absolute -bottom-28 -left-24 h-[330px] w-[330px] rounded-full bg-white/20 blur-[90px]" />
              <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:40px_40px]" />

              <div className="relative flex w-full flex-col justify-between p-10 xl:p-14">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#35c993]" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/60">
                      Secure Retailer Platform
                    </span>
                  </div>

                  <h2 className="mt-8 max-w-[470px] text-[40px] font-bold leading-[1.08] tracking-[-0.04em] text-white xl:text-[48px]">
                    Your business.
                    <br />
                    <span className="text-[#8ea8ff]">Your payments.</span>
                    <br />
                    One portal.
                  </h2>

                  <p className="mt-5 max-w-[440px] text-[14px] leading-7 text-white/55">
                    Access your retailer services through a secure and
                    streamlined platform built for everyday transactions.
                  </p>
                </div>

                {/* PREMIUM FEATURE CARDS — NO ANALYTICS */}
                <div className="mt-12 space-y-3">
                  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#7c3aed]/20">
                      <ShieldCheck className="h-5 w-5 text-[#8ea8ff]" />
                    </div>

                    <div>
                      <p className="text-[13px] font-semibold text-white">
                        Secure retailer access
                      </p>
                      <p className="mt-1 text-[11px] leading-5 text-white/40">
                        OTP-based authentication for your registered account.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#08ae82]/15">
                      <LockKeyhole className="h-5 w-5 text-[#52d7ad]" />
                    </div>

                    <div>
                      <p className="text-[13px] font-semibold text-white">
                        Protected transactions
                      </p>
                      <p className="mt-1 text-[11px] leading-5 text-white/40">
                        Your retailer access stays protected throughout the
                        session.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.07]">
                      <Store className="h-5 w-5 text-white/70" />
                    </div>

                    <div>
                      <p className="text-[13px] font-semibold text-white">
                        Built for retailers
                      </p>
                      <p className="mt-1 text-[11px] leading-5 text-white/40">
                        A clean portal for your HappyPay retailer services.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-[10px] font-medium text-white/30">
                    HAPPY PAY RETAILER PORTAL
                  </span>

                  <span className="flex items-center gap-1.5 text-[10px] text-white/35">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#35c993]" />
                    Secure Platform
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>

        <p className="fixed bottom-3 left-0 right-0 text-center text-[10px] text-[#8992a3]">
          © {new Date().getFullYear()} HappyPay · Retailer Portal
        </p>
      </div>
    </div>
  );
};

export default RetailerLogin;
