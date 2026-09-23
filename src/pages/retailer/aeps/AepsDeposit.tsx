import React, { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Fingerprint,
  Loader2,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  UserCircle,
} from "lucide-react";

interface AepsDepositProps {
  onBack?: () => void;
}

type TransactionStatus = "IDLE" | "PROCESSING" | "SUCCESS";

const AepsDeposit: React.FC<AepsDepositProps> = ({ onBack }) => {
  const [aadhaar, setAadhaar] = useState("");
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [transactionStatus, setTransactionStatus] =
    useState<TransactionStatus>("IDLE");
  const [transactionId, setTransactionId] = useState("");
  const [transactionDate, setTransactionDate] = useState<Date | null>(null);

  const handleAadhaarChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAadhaar(event.target.value.replace(/\D/g, "").slice(0, 12));
  };

  const handleMobileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setMobile(event.target.value.replace(/\D/g, "").slice(0, 10));
  };

  const handleAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;

    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  };

  const resetForm = () => {
    setAadhaar("");
    setMobile("");
    setAmount("");
    setIsScanning(false);
    setTransactionStatus("IDLE");
    setTransactionId("");
    setTransactionDate(null);
  };

  const handleBiometricAuthentication = () => {
    if (
      aadhaar.length !== 12 ||
      mobile.length !== 10 ||
      Number(amount) <= 0
    ) {
      return;
    }

    setIsScanning(true);

    window.setTimeout(() => {
      setIsScanning(false);
      setTransactionStatus("PROCESSING");

      window.setTimeout(() => {
        setTransactionId(
          `TXN${Math.floor(100000000 + Math.random() * 900000000)}`,
        );
        setTransactionDate(new Date());
        setTransactionStatus("SUCCESS");
      }, 1800);
    }, 2200);
  };

  const isFormValid =
    aadhaar.length === 12 &&
    mobile.length === 10 &&
    Number(amount) > 0;

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50"
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        )}

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#315bd1]">
            AEPS
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Aadhaar Enabled Deposit
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Accept cash deposits using Aadhaar-based biometric authentication.
          </p>
        </div>
      </div>

      {/* Main Card */}
      <section className="hp-card rounded-2xl p-5 sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Form */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef2ff]">
                <Fingerprint className="h-5 w-5 text-[#315bd1]" />
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Deposit Details
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Enter customer details and authenticate using biometrics.
                </p>
              </div>
            </div>

            {/* Aadhaar */}
            <div>
              <label
                htmlFor="deposit-aadhaar"
                className="text-xs font-semibold text-slate-600"
              >
                Aadhaar Number
              </label>

              <div className="mt-2 flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-[#315bd1] focus-within:bg-white">
                <UserCircle className="h-4 w-4 shrink-0 text-slate-400" />

                <input
                  id="deposit-aadhaar"
                  type="text"
                  inputMode="numeric"
                  maxLength={12}
                  value={aadhaar}
                  onChange={handleAadhaarChange}
                  disabled={
                    isScanning || transactionStatus === "PROCESSING"
                  }
                  placeholder="Enter 12-digit Aadhaar number"
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />

                <span className="text-[10px] text-slate-400">
                  {aadhaar.length}/12
                </span>
              </div>
            </div>

            {/* Mobile */}
            <div className="mt-4">
              <label
                htmlFor="deposit-mobile"
                className="text-xs font-semibold text-slate-600"
              >
                Customer Mobile Number
              </label>

              <div className="mt-2 flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-[#315bd1] focus-within:bg-white">
                <Smartphone className="h-4 w-4 shrink-0 text-slate-400" />

                <input
                  id="deposit-mobile"
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  value={mobile}
                  onChange={handleMobileChange}
                  disabled={
                    isScanning || transactionStatus === "PROCESSING"
                  }
                  placeholder="Enter 10-digit mobile number"
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />

                <span className="text-[10px] text-slate-400">
                  {mobile.length}/10
                </span>
              </div>
            </div>

            {/* Amount */}
            <div className="mt-4">
              <label
                htmlFor="deposit-amount"
                className="text-xs font-semibold text-slate-600"
              >
                Deposit Amount
              </label>

              <div className="mt-2 flex h-11 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-[#315bd1] focus-within:bg-white">
                <span className="mr-2 text-sm font-bold text-slate-400">
                  ₹
                </span>

                <input
                  id="deposit-amount"
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={handleAmountChange}
                  disabled={
                    isScanning || transactionStatus === "PROCESSING"
                  }
                  placeholder="Enter deposit amount"
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Biometric Device */}
            <div className="mt-5 rounded-xl border border-[#315bd1]/15 bg-[#f4f6fd] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#315bd1]">
                  <Fingerprint className="h-5 w-5 text-white" />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Biometric Device
                  </p>

                  <p className="mt-1 flex items-center gap-2 text-[11px] font-medium text-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Device Ready
                  </p>
                </div>
              </div>
            </div>

            {/* Action */}
            {transactionStatus === "SUCCESS" ? (
              <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />

                  <div>
                    <p className="text-sm font-bold text-emerald-700">
                      Deposit Successful
                    </p>

                    <p className="mt-1 text-xs text-emerald-600">
                      Transaction ID: {transactionId}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleBiometricAuthentication}
                disabled={
                  !isFormValid ||
                  isScanning ||
                  transactionStatus === "PROCESSING"
                }
                className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#315bd1] px-4 text-sm font-bold text-white transition hover:bg-[#274dbd] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Capturing Fingerprint...
                  </>
                ) : transactionStatus === "PROCESSING" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing Deposit...
                  </>
                ) : (
                  <>
                    <Fingerprint className="h-4 w-4" />
                    Authenticate & Deposit
                  </>
                )}
              </button>
            )}

            {transactionStatus === "SUCCESS" && (
              <button
                type="button"
                onClick={resetForm}
                className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                New Deposit
              </button>
            )}
          </div>

          {/* Information Panel */}
          <div className="rounded-2xl bg-[#f7f8fc] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef2ff]">
                <ShieldCheck className="h-5 w-5 text-[#315bd1]" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Secure Deposit
                </h3>

                <p className="mt-1 text-[11px] text-slate-500">
                  Biometric authentication is required.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Customer Aadhaar
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {aadhaar
                    ? `XXXX XXXX ${aadhaar.slice(-4)}`
                    : "Not entered"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Mobile Number
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {mobile || "Not entered"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Deposit Amount
                </p>

                <p className="mt-1 text-lg font-bold text-[#315bd1]">
                  ₹{amount || "0"}
                </p>
              </div>

              {transactionStatus === "SUCCESS" && (
                <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                    Transaction ID
                  </p>

                  <p className="mt-1 text-sm font-bold text-emerald-700">
                    {transactionId}
                  </p>

                  {transactionDate && (
                    <p className="mt-1 text-[10px] text-emerald-600">
                      {transactionDate.toLocaleString("en-IN")}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="mt-5 rounded-xl border border-[#315bd1]/10 bg-[#eef2ff] p-3">
              <p className="text-xs font-bold text-[#315bd1]">
                Important
              </p>

              <p className="mt-1 text-[11px] leading-5 text-slate-600">
                Verify the customer details before starting biometric
                authentication. Do not remove the biometric device while the
                transaction is being processed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AepsDeposit;