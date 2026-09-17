import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ShieldCheck,
  Store,
  UserRound,
  Fingerprint,
  Building2,
  CircleCheck,
  Smartphone,
  Lock,
  BadgeCheck,
  Clock,
  Sparkles,
} from "lucide-react";

import AccountStep from "./registerSteps/AccountSteps";
import ShopDetailsStep from "./registerSteps/ShopDetailsStep";
import AboutRetailerStep from "./registerSteps/AboutRetailerStep";
import AadhaarStep from "./registerSteps/AadhaarStep";
import BankDetailsStep from "./registerSteps/BankDetailsStep";

/* ============================================================
   🎨 HAPPY PAY THEME — Purple + Navy
============================================================ */
const theme = {
  // ============================================================
  // CORE
  // ============================================================

  primary: "#172536",
  primaryHover: "#0F1C2A",

  accent: "#4A3E94",
  accentHover: "#3B317A",
  accentSoft: "#D9D5EF",

  // ============================================================
  // SEMANTIC
  // ============================================================

  success: "#4F8A68",
  successSoft: "#EAF4EE",

  warning: "#C58A32",
  warningSoft: "#FBF4E5",

  danger: "#B85C5C",

  // ============================================================
  // SURFACES
  // ============================================================

  bg: "#D8D6D1",
  surface: "#FFFFFF",
  surfaceAlt: "#E7E5E1",
  surfaceMuted: "#F1F0EE",

  // ============================================================
  // BORDERS & TEXT
  // ============================================================

  border: "#E1E0DE",
  borderStrong: "#CECDCA",

  textPrimary: "#172536",
  textSecondary: "#686C74",
  textMuted: "#777A81",
  textFaint: "#999BA0",
};

const steps = [
  {
    title: "Account",
    description: "Mobile & email verification",
    icon: Smartphone,
    cta: "Send OTP",
  },
  {
    title: "Shop Details",
    description: "Business & address info",
    icon: Store,
    cta: "Save & Continue",
  },
  {
    title: "About Retailer",
    description: "Personal KYC details",
    icon: UserRound,
    cta: "Save & Continue",
  },
  {
    title: "Aadhaar KYC",
    description: "UIDAI identity verification",
    icon: Fingerprint,
    cta: "Verify Aadhaar",
  },
  {
    title: "Bank Account",
    description: "Settlement & payouts",
    icon: Building2,
    cta: "Submit for Review",
  },
];

const RetailerRegister = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState("next");
  const [saving, setSaving] = useState(false);

  // 💡 Wire real per-step validation here
  const canContinue = true;

  const totalSteps = steps.length;

  const progressPct = useMemo(
    () =>
      Math.round(((currentStep + 1) / totalSteps) * 100),
    [currentStep, totalSteps]
  );

  /* ============================================================
     NEXT STEP
  ============================================================ */

  const nextStep = () => {
    if (
      currentStep < totalSteps - 1 &&
      canContinue
    ) {
      setDirection("next");

      setCurrentStep((p) => p + 1);
    }
  };

  /* ============================================================
     PREVIOUS STEP
  ============================================================ */

  const previousStep = () => {
    if (currentStep > 0) {
      setDirection("previous");

      setCurrentStep((p) => p - 1);
    }
  };

  /* ============================================================
     SUBMIT REGISTRATION
  ============================================================ */

  const handleSubmit = async () => {
    setSaving(true);

    // 💡 Persist payload here before navigating

    navigate("/retailer/kyc-pending", {
      replace: true,
    });
  };

  return (
    <div
      className="min-h-screen p-3 sm:p-5 lg:p-6"
      style={{
        backgroundColor: theme.bg,
      }}
    >
      {/* ==========================================================
          MAIN CONTAINER
      ========================================================== */}

      <div
        className="
          mx-auto
          flex
          min-h-[calc(100vh-24px)]
          max-w-[1380px]
          overflow-hidden
          rounded-2xl
          border
          shadow-[0_20px_60px_rgba(23,37,54,0.12)]
          sm:min-h-[calc(100vh-40px)]
          lg:min-h-[calc(100vh-48px)]
        "
        style={{
          backgroundColor: theme.surface,
          borderColor: theme.border,
        }}
      >
        {/* ========================================================
            LEFT PANEL — ONBOARDING RAIL
        ========================================================= */}

        <aside
          className="
            relative
            hidden
            w-[340px]
            shrink-0
            flex-col
            border-r
            p-7
            lg:flex
            xl:w-[380px]
            xl:p-9
          "
          style={{
            backgroundColor: theme.surfaceAlt,
            borderColor: theme.border,
          }}
        >
          {/* ======================================================
              SUBTLE GRID BACKGROUND
          ====================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.35]
            "
            style={{
              backgroundImage: `
                linear-gradient(
                  ${theme.border} 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  ${theme.border} 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "28px 28px",
              maskImage:
                "radial-gradient(ellipse at top left, black 30%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at top left, black 30%, transparent 75%)",
            }}
          />

          {/* ======================================================
              LOGO
          ====================================================== */}

          <button
            type="button"
            onClick={() =>
              navigate("/login/retailer")
            }
            className="
              relative
              flex
              w-fit
              items-center
              gap-2.5
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                shadow-sm
              "
              style={{
                backgroundColor: theme.primary,
              }}
            >
              <span
                className="
                  text-[15px]
                  font-bold
                  text-white
                "
              >
                H
              </span>
            </div>

            <div className="text-left">
              <p
                className="
                  text-[15px]
                  font-bold
                  leading-none
                  tracking-tight
                "
                style={{
                  color: theme.textPrimary,
                }}
              >
                HappyPay
              </p>

              <p
                className="
                  mt-1
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
                "
                style={{
                  color: theme.textFaint,
                }}
              >
                Retailer · KYC
              </p>
            </div>
          </button>

          {/* ======================================================
              HEADING
          ====================================================== */}

          <div className="relative mt-12">
            <div
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                px-2.5
                py-1
                text-[10px]
                font-semibold
                uppercase
                tracking-wider
              "
              style={{
                backgroundColor:
                  theme.accentSoft,
                color: theme.accent,
              }}
            >
              <Sparkles className="h-3 w-3" />

              Onboarding · ~5 min
            </div>

            <h1
              className="
                mt-4
                text-[26px]
                font-semibold
                leading-[1.15]
                tracking-[-0.02em]
              "
              style={{
                color: theme.textPrimary,
              }}
            >
              Set up your
              <br />

              <span
                style={{
                  color: theme.accent,
                }}
              >
                payments account.
              </span>
            </h1>

            <p
              className="
                mt-3
                text-[13px]
                leading-6
              "
              style={{
                color: theme.textMuted,
              }}
            >
              Complete KYC to activate
              settlements. Your data is encrypted
              and shared only with regulated
              partners.
            </p>
          </div>

          {/* ======================================================
              STEPS TIMELINE
          ====================================================== */}

          <nav className="relative mt-10">
            {steps.map((step, index) => {
              const Icon = step.icon;

              const isActive =
                index === currentStep;

              const isCompleted =
                index < currentStep;

              return (
                <div
                  key={step.title}
                  className="
                    relative
                    flex
                    gap-3.5
                  "
                >
                  {/* ==================================================
                      VERTICAL RAIL
                  ================================================== */}

                  {index < steps.length - 1 && (
                    <div
                      className="
                        absolute
                        left-[15px]
                        top-8
                        h-[calc(100%-8px)]
                        w-px
                      "
                      style={{
                        backgroundColor:
                          isCompleted
                            ? theme.success
                            : theme.border,
                      }}
                    />
                  )}

                  {/* ==================================================
                      STEP NODE
                  ================================================== */}

                  <div
                    className="
                      relative
                      z-10
                      mt-1
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      border
                      transition-all
                    "
                    style={{
                      backgroundColor:
                        isCompleted
                          ? theme.success
                          : isActive
                          ? theme.accent
                          : theme.surface,

                      borderColor:
                        isCompleted
                          ? theme.success
                          : isActive
                          ? theme.accent
                          : theme.borderStrong,

                      color:
                        isCompleted ||
                        isActive
                          ? "#FFFFFF"
                          : theme.textFaint,

                      boxShadow: isActive
                        ? `0 0 0 4px ${theme.accentSoft}`
                        : "none",
                    }}
                  >
                    {isCompleted ? (
                      <Check
                        className="h-4 w-4"
                        strokeWidth={3}
                      />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                  </div>

                  {/* ==================================================
                      STEP TEXT
                  ================================================== */}

                  <div className="pb-6">
                    <p
                      className="
                        text-[13px]
                        font-semibold
                        leading-tight
                      "
                      style={{
                        color: isActive
                          ? theme.textPrimary
                          : isCompleted
                          ? theme.textSecondary
                          : theme.textFaint,
                      }}
                    >
                      {step.title}
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-[11px]
                        leading-snug
                      "
                      style={{
                        color: theme.textFaint,
                      }}
                    >
                      {step.description}
                    </p>

                    {/* ==================================================
                        COMPLETED
                    ================================================== */}

                    {isCompleted && (
                      <p
                        className="
                          mt-1
                          inline-flex
                          items-center
                          gap-1
                          text-[10px]
                          font-semibold
                        "
                        style={{
                          color: theme.success,
                        }}
                      >
                        <BadgeCheck className="h-3 w-3" />

                        Verified
                      </p>
                    )}

                    {/* ==================================================
                        ACTIVE
                    ================================================== */}

                    {isActive && (
                      <p
                        className="
                          mt-1
                          inline-flex
                          items-center
                          gap-1
                          text-[10px]
                          font-semibold
                        "
                        style={{
                          color: theme.accent,
                        }}
                      >
                        <Clock className="h-3 w-3" />

                        In progress
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </nav>

          {/* ======================================================
              TRUST FOOTER
          ====================================================== */}

          <div
            className="
              relative
              mt-auto
              pt-6
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
                rounded-lg
                border
                px-3
                py-2.5
              "
              style={{
                backgroundColor: theme.surface,
                borderColor: theme.border,
              }}
            >
              <ShieldCheck
                className="
                  h-4
                  w-4
                  shrink-0
                "
                style={{
                  color: theme.success,
                }}
              />

              <div
                className="
                  text-[10px]
                  leading-tight
                "
              >
                <p
                  className="font-semibold"
                  style={{
                    color: theme.textPrimary,
                  }}
                >
                  256-bit AES · PCI-DSS
                </p>

                <p
                  style={{
                    color: theme.textFaint,
                  }}
                >
                  RBI-aligned KYC partner
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* ==========================================================
            RIGHT PANEL — FORM
        ========================================================== */}

        <main
          className="
            relative
            flex
            flex-1
            flex-col
            bg-white
          "
        >
          {/* ======================================================
              TOP BAR
          ====================================================== */}

          <header
            className="
              relative
              flex
              items-center
              justify-between
              border-b
              px-6
              py-4
              sm:px-8
              lg:px-10
            "
            style={{
              borderColor: theme.border,
            }}
          >
            <button
              type="button"
              onClick={() =>
                navigate("/login/retailer")
              }
              className="
                group
                flex
                items-center
                gap-2
                text-[12px]
                font-medium
                transition
                hover:opacity-70
              "
              style={{
                color: theme.textMuted,
              }}
            >
              <ArrowLeft
                className="
                  h-3.5
                  w-3.5
                  transition-transform
                  group-hover:-translate-x-0.5
                "
              />

              Back to login
            </button>

            <div className="flex items-center gap-3">
              {/* ==================================================
                  KYC STATUS
              ================================================== */}

              <span
                className="
                  hidden
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  px-2.5
                  py-1
                  text-[10px]
                  font-semibold
                  sm:inline-flex
                "
                style={{
                  backgroundColor:
                    theme.warningSoft,

                  borderColor:
                    "#E8D49C",

                  color:
                    theme.warning,
                }}
              >
                <Clock className="h-3 w-3" />

                KYC Pending
              </span>

              {/* ==================================================
                  STEP COUNT
              ================================================== */}

              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  px-2.5
                  py-1
                  text-[10px]
                  font-semibold
                "
                style={{
                  backgroundColor:
                    theme.surfaceMuted,

                  color:
                    theme.textSecondary,
                }}
              >
                Step {currentStep + 1} /{" "}
                {totalSteps}
              </span>
            </div>
          </header>

          {/* ======================================================
              PROGRESS BAR
          ====================================================== */}

          <div
            className="
              relative
              px-6
              pt-5
              sm:px-8
              lg:px-10
            "
          >
            <div
              className="
                mb-2
                flex
                items-center
                justify-between
              "
            >
              <p
                className="
                  text-[11px]
                  font-medium
                "
                style={{
                  color: theme.textMuted,
                }}
              >
                Onboarding progress
              </p>

              <p
                className="
                  text-[11px]
                  font-semibold
                "
                style={{
                  color: theme.accent,
                }}
              >
                {progressPct}%
              </p>
            </div>

            <div
              className="
                h-1.5
                w-full
                overflow-hidden
                rounded-full
              "
              style={{
                backgroundColor:
                  theme.surfaceMuted,
              }}
            >
              <div
                className="
                  h-full
                  rounded-full
                  transition-all
                  duration-500
                "
                style={{
                  width: `${progressPct}%`,
                  backgroundColor:
                    theme.accent,
                }}
              />
            </div>
          </div>

          {/* ======================================================
              FORM CONTENT
          ====================================================== */}

          <div
            className="
              relative
              flex-1
              overflow-y-auto
              px-6
              py-7
              sm:px-8
              lg:px-10
              xl:px-14
            "
          >
            <div
              key={currentStep}
              className={
                direction === "next"
                  ? "animate-slide-in-right"
                  : "animate-slide-in-left"
              }
            >
              {/* ==================================================
                  STEP HEADING
              ================================================== */}

              <div
                className="
                  mb-6
                  flex
                  items-start
                  justify-between
                  gap-4
                "
              >
                <div>
                  <div
                    className="
                      flex
                      items-center
                      gap-2.5
                    "
                  >
                    {/* STEP ICON */}

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                      "
                      style={{
                        backgroundColor:
                          theme.accentSoft,
                      }}
                    >
                      {(() => {
                        const Icon =
                          steps[currentStep]
                            .icon;

                        return (
                          <Icon
                            className="
                              h-4.5
                              w-4.5
                            "
                            style={{
                              color:
                                theme.accent,
                            }}
                          />
                        );
                      })()}
                    </div>

                    <div>
                      <p
                        className="
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.14em]
                        "
                        style={{
                          color:
                            theme.textFaint,
                        }}
                      >
                        Step {currentStep + 1}
                      </p>

                      <h2
                        className="
                          text-[19px]
                          font-semibold
                          tracking-[-0.01em]
                        "
                        style={{
                          color:
                            theme.textPrimary,
                        }}
                      >
                        {
                          steps[currentStep]
                            .title
                        }
                      </h2>
                    </div>
                  </div>

                  <p
                    className="
                      mt-2
                      max-w-[560px]
                      text-[13px]
                      leading-5
                    "
                    style={{
                      color:
                        theme.textMuted,
                    }}
                  >
                    {
                      steps[currentStep]
                        .description
                    }
                  </p>
                </div>
              </div>

              {/* ==================================================
                  ACTUAL STEP FORM
              ================================================== */}

              <div className="max-w-[640px]">
                {currentStep === 0 && (
                  <AccountStep />
                )}

                {currentStep === 1 && (
                  <ShopDetailsStep />
                )}

                {currentStep === 2 && (
                  <AboutRetailerStep />
                )}

                {currentStep === 3 && (
                  <AadhaarStep />
                )}

                {currentStep === 4 && (
                  <BankDetailsStep />
                )}
              </div>
            </div>
          </div>

          {/* ======================================================
              BOTTOM NAVIGATION
          ====================================================== */}

          <footer
            className="
              relative
              flex
              items-center
              justify-between
              border-t
              px-6
              py-4
              sm:px-8
              lg:px-10
            "
            style={{
              borderColor: theme.border,
            }}
          >
            {/* ==================================================
                PREVIOUS
            ================================================== */}

            <button
              type="button"
              onClick={previousStep}
              disabled={currentStep === 0}
              className="
                group
                flex
                items-center
                gap-2
                rounded-lg
                px-3
                py-2.5
                text-[12px]
                font-semibold
                transition
                hover:bg-[#F1F0EE]
                disabled:pointer-events-none
                disabled:opacity-30
              "
              style={{
                color: theme.textMuted,
              }}
            >
              <ArrowLeft
                className="
                  h-3.5
                  w-3.5
                  transition-transform
                  group-hover:-translate-x-0.5
                "
              />

              Previous
            </button>

            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              {/* ==================================================
                  ENCRYPTION HINT
              ================================================== */}

              <span
                className="
                  hidden
                  items-center
                  gap-1.5
                  text-[10px]
                  md:inline-flex
                "
                style={{
                  color: theme.textFaint,
                }}
              >
                <Lock className="h-3 w-3" />

                Encrypted end-to-end
              </span>

              {/* ==================================================
                  NEXT BUTTON
              ================================================== */}

              {currentStep <
              totalSteps - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!canContinue}
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    px-4
                    py-2.5
                    text-[12px]
                    font-semibold
                    text-white
                    shadow-[0_4px_12px_rgba(23,37,54,0.20)]
                    transition
                    hover:brightness-110
                    active:scale-[0.98]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    disabled:shadow-none
                  "
                  style={{
                    backgroundColor:
                      theme.primary,
                  }}
                >
                  {steps[currentStep].cta}

                  <ArrowRight
                    className="
                      h-3.5
                      w-3.5
                      transition-transform
                      group-hover:translate-x-0.5
                    "
                  />
                </button>
              ) : (
                /* ==================================================
                   SUBMIT BUTTON
                ================================================== */

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={saving}
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    px-4
                    py-2.5
                    text-[12px]
                    font-semibold
                    text-white
                    shadow-[0_4px_12px_rgba(74,62,148,0.25)]
                    transition
                    hover:brightness-110
                    active:scale-[0.98]
                    disabled:opacity-60
                  "
                  style={{
                    backgroundColor:
                      theme.accent,
                  }}
                >
                  <CircleCheck
                    className="
                      h-3.5
                      w-3.5
                    "
                  />

                  {saving
                    ? "Submitting…"
                    : "Submit for Verification"}
                </button>
              )}
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default RetailerRegister;