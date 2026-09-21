import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Smartphone,
  Store,
  UserRound,
  CreditCard,
  Fingerprint,
  Cake,
  FileText,
  Building2,
} from "lucide-react";

import AccountStep from "./registerSteps/AccountSteps";
import ShopDetailsStep from "./registerSteps/ShopDetailsStep";
import AboutRetailerStep from "./registerSteps/AboutRetailerStep";
import PanVerificationStep from "./registerSteps/PanVerificationStep";
import AadhaarStep from "./registerSteps/AadhaarStep";
import DobStep from "./registerSteps/DobStep";
import BusinessProofStep from "./registerSteps/BusinessProofStep";
import BankDetailsStep from "./registerSteps/BankDetailsStep";

const steps = [
  {
    title: "Account",
    icon: Smartphone,
  },
  {
    title: "Shop Details",
    icon: Store,
  },
  {
    title: "Retailer",
    icon: UserRound,
  },
  {
    title: "PAN Verification",
    icon: CreditCard,
  },
  {
    title: "Aadhaar",
    icon: Fingerprint,
  },
  {
    title: "DOB",
    icon: Cake,
  },
  {
    title: "Business Proof",
    icon: FileText,
  },
  {
    title: "Bank Details",
    icon: Building2,
  },
];

const stepHeadings = [
  "Let's get started",
  "Your Business",
  "About You",
  "Verify your PAN",
  "Verify Aadhaar",
  "Date of Birth",
  "Business Proof",
  "Bank Details",
];

const stepDescriptions = [
  "Create your HappyPay retailer account.",
  "Tell us about your shop and business.",
  "Tell us a little about yourself.",
  "Enter your PAN details for verification.",
  "Verify your Aadhaar information securely.",
  "Enter your date of birth.",
  "Upload your shop and business proof.",
  "Add your bank account for payouts.",
];

const RetailerRegister = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    /*
     * ==========================================================
     * REGISTRATION COMPLETED
     * ==========================================================
     *
     * AccountSteps.tsx stores the mobile entered by the
     * retailer in "pendingRetailerMobile".
     *
     * When Step 8 is submitted, move that number to
     * "registeredRetailerMobile".
     *
     * This is frontend-only for now.
     */

    const pendingMobile =
      localStorage.getItem("pendingRetailerMobile");

    if (pendingMobile) {
      localStorage.setItem(
        "registeredRetailerMobile",
        pendingMobile,
      );

      // Remove temporary registration value.
      localStorage.removeItem("pendingRetailerMobile");

      // Make sure an old logged-in retailer value does
      // not remain after a new registration.
      localStorage.removeItem("retailerMobile");
    }

    navigate("/retailer/kyc-pending", {
      replace: true,
    });
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      navigate("/retailer/login");
    }
  };

  const CurrentStepIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-[#172033]">

      {/* HEADER */}
      <header className="border-b border-[#e2e6ed] bg-white">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-5">

          {/* LOGO */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-[#3156d9] to-[#10a88a] shadow-[0_4px_10px_rgba(49,91,209,0.18)]">
              <span className="text-sm font-bold text-white">H</span>
            </div>
            <div>
              <p className="text-[15px] font-bold tracking-tight text-[#172033]">HappyPay</p>
              <p className="hidden text-[10px] text-[#8992a3] sm:block">Retailer Portal</p>
            </div>
          </div>

          {/* PAGE TITLE */}
          <div className="hidden text-center md:block">
            <h1 className="text-sm font-bold text-[#172033]">New Retailer Registration</h1>
            <p className="mt-0.5 text-[11px] text-[#7c8595]">Complete your registration to access HappyPay</p>
          </div>

          {/* STEP COUNT */}
          <div className="rounded-lg bg-[#f3f5fa] px-3 py-1.5">
            <span className="text-xs font-semibold text-[#315bd1]">Step {currentStep + 1}</span>
            <span className="mx-1 text-[#a2a8b3]">/</span>
            <span className="text-xs font-medium text-[#687286]">{steps.length}</span>
          </div>

        </div>
      </header>

      {/* PROGRESS STEPS */}
      <div className="border-b border-[#e4e7ed] bg-white">
        <div className="mx-auto w-full max-w-5xl px-5">
          <div className="flex h-14 items-center">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div key={step.title} className="flex min-w-0 flex-1 items-center">
                  <div className="flex min-w-0 items-center gap-2">
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition ${
                      isCompleted ? "border-transparent bg-[#315bd1] text-white"
                        : isActive ? "border-[#315bd1] bg-[#eef2ff] text-[#315bd1]"
                        : "border-[#d5d9e1] bg-white text-[#929aaa]"
                    }`}>
                      {isCompleted
                        ? <Check className="h-3 w-3" strokeWidth={3} />
                        : <Icon className="h-3 w-3" strokeWidth={2} />
                      }
                    </div>
                    <div className="hidden min-w-0 xl:block">
                      <p className={`truncate text-[12px] font-semibold ${isActive || isCompleted ? "text-[#315bd1]" : "text-[#747d8d]"}`}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`mx-2 h-[2px] flex-1 ${index < currentStep ? "bg-gradient-to-r from-[#3156d9] to-[#10a88a]" : "bg-[#e0e3e9]"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MAIN */}
      <main className="mx-auto w-full max-w-5xl px-5 py-5">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">

          {/* LEFT SIDEBAR NAV */}
          <aside className="hidden lg:block">
            <div className="sticky top-5 rounded-xl border border-[#e1e5ec] bg-white p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#9aa1ae]">Registration</p>

              <div className="mt-3 space-y-0.5">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === currentStep;
                  const isCompleted = index < currentStep;

                  return (
                    <button
                      key={step.title}
                      type="button"
                      disabled={index > currentStep}
                      onClick={() => {
                        if (index <= currentStep) {
                          setCurrentStep(index);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      }}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition ${
                        isActive ? "bg-[#eef2ff] text-[#315bd1]"
                          : isCompleted ? "text-[#315bd1] hover:bg-[#f7f8fc]"
                          : "text-[#a0a6b1]"
                      }`}
                    >
                      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                        isActive ? "bg-[#315bd1] text-white"
                          : isCompleted ? "bg-[#e7edff] text-[#315bd1]"
                          : "bg-[#f1f3f6] text-[#a0a6b1]"
                      }`}>
                        {isCompleted
                          ? <Check className="h-3.5 w-3.5" strokeWidth={3} />
                          : <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                        }
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold">{step.title}</p>
                        <p className="text-[10px] text-[#9ba2ae]">Step {index + 1}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 rounded-lg bg-[#f7f9fd] p-3">
                <p className="text-xs font-semibold text-[#172033]">Need help?</p>
                <p className="mt-0.5 text-[11px] leading-4 text-[#7f8796]">
                  Complete each section with your correct details and documents.
                </p>
              </div>
            </div>
          </aside>

          {/* FORM */}
          <section className="min-w-0">

            {/* FORM HEADER */}
            <div className="rounded-t-xl border border-b-0 border-[#e1e5ec] bg-white px-5 py-4 sm:px-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eef2ff] text-[#315bd1]">
                  <CurrentStepIcon className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#315bd1]">
                    {steps[currentStep].title}
                  </p>
                  <h2 className="mt-0.5 text-lg font-bold tracking-tight text-[#172033]">
                    {stepHeadings[currentStep]}
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-[#737c8c]">
                    {stepDescriptions[currentStep]}
                  </p>
                </div>
              </div>
            </div>

            {/* FORM BODY */}
            <div className="rounded-b-xl border border-[#e1e5ec] bg-white px-5 py-5 sm:px-6">
              {currentStep === 0 ? <AccountStep />
                : currentStep === 1 ? <ShopDetailsStep />
                : currentStep === 2 ? <AboutRetailerStep />
                : currentStep === 3 ? <PanVerificationStep />
                : currentStep === 4 ? <AadhaarStep />
                : currentStep === 5 ? <DobStep />
                : currentStep === 6 ? <BusinessProofStep />
                : <BankDetailsStep />}
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-3 flex items-center justify-between rounded-xl border border-[#e1e5ec] bg-white px-4 py-3">
              <button
                type="button"
                onClick={previousStep}
                className="flex h-9 items-center gap-2 rounded-lg border border-[#d4d9e2] bg-white px-4 text-xs font-semibold text-[#4e586a] transition hover:bg-[#f7f8fa]"
              >
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
                <span>{currentStep === 0 ? "Back to Login" : "Previous"}</span>
              </button>

              <button
                type="button"
                onClick={nextStep}
                className={`flex h-9 items-center gap-2 rounded-lg px-5 text-xs font-semibold text-white shadow-sm transition ${
                  currentStep === steps.length - 1
                    ? "bg-[#08ae82] hover:bg-[#079b74]"
                    : "bg-gradient-to-r from-[#3156d9] to-[#10a88a] hover:opacity-90"
                }`}
              >
                <span>{currentStep === steps.length - 1 ? "Submit Registration" : "Continue"}</span>
                {currentStep === steps.length - 1
                  ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  : <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                }
              </button>
            </div>

          </section>
        </div>
      </main>
    </div>
  );
};

export default RetailerRegister;

