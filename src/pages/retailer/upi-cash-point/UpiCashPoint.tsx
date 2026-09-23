import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  QrCode,
  RefreshCw,
  Smartphone,
  Wallet,
  XCircle,
} from "lucide-react";

interface UpiCashPointProps {
  onBack?: () => void;
}

type TransactionStatus = "IDLE" | "PROCESSING" | "SUCCESS" | "FAILED";

const UpiCashPoint: React.FC<UpiCashPointProps> = ({ onBack }) => {
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const [showQr, setShowQr] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [transactionStatus, setTransactionStatus] =
    useState<TransactionStatus>("IDLE");
  const [transactionId, setTransactionId] = useState("");
  const [transactionDate, setTransactionDate] = useState<Date | null>(null);

  const isValidAmount = Number(amount) > 0;
  const isValidMobile = mobile.length === 10;

  const resetForm = () => {
    setMobile("");
    setAmount("");
    setUpiId("");
    setShowQr(false);
    setTimeLeft(120);
    setTransactionStatus("IDLE");
    setTransactionId("");
    setTransactionDate(null);
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

  const handleUpiIdChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setUpiId(event.target.value);
  };

  const handleGenerateQr = () => {
    if (!isValidMobile || !isValidAmount) {
      return;
    }

    setTimeLeft(120);
    setTransactionStatus("PROCESSING");
    setShowQr(true);

    window.setTimeout(() => {
      setTransactionStatus("IDLE");
    }, 600);
  };

  useEffect(() => {
    if (!showQr || timeLeft <= 0 || transactionStatus === "SUCCESS") {
      return;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [showQr, timeLeft, transactionStatus]);

  const handleVerifyPayment = () => {
    if (!showQr || timeLeft <= 0) {
      return;
    }

    setTransactionStatus("PROCESSING");

    window.setTimeout(() => {
      setTransactionId(
        `UPI${Math.floor(100000000 + Math.random() * 900000000)}`,
      );
      setTransactionDate(new Date());
      setTransactionStatus("SUCCESS");
    }, 1800);
  };

  const handleCancelQr = () => {
    setShowQr(false);
    setTimeLeft(120);
    setTransactionStatus("IDLE");
  };

  const formattedTime = `${Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0")}:${(timeLeft % 60)
    .toString()
    .padStart(2, "0")}`;

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
            UPI Cash Point
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Accept UPI payments and provide cash to customers securely.
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
                <QrCode className="h-5 w-5 text-[#315bd1]" />
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-900">
                  UPI Cash Transaction
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Enter customer details and generate a payment QR.
                </p>
              </div>
            </div>

            {/* Mobile */}
            <div>
              <label
                htmlFor="upi-mobile"
                className="text-xs font-semibold text-slate-600"
              >
                Customer Mobile Number
              </label>

              <div className="mt-2 flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-[#315bd1] focus-within:bg-white">
                <Smartphone className="h-4 w-4 shrink-0 text-slate-400" />

                <input
                  id="upi-mobile"
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  value={mobile}
                  onChange={handleMobileChange}
                  disabled={showQr || transactionStatus === "SUCCESS"}
                  placeholder="Enter 10-digit mobile number"
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />

                <span className="text-[10px] text-slate-400">
                  {mobile.length}/10
                </span>
              </div>
            </div>

            {/* UPI ID */}
            <div className="mt-4">
              <label
                htmlFor="upi-id"
                className="text-xs font-semibold text-slate-600"
              >
                Customer UPI ID
                <span className="ml-1 font-normal text-slate-400">
                  (Optional)
                </span>
              </label>

              <div className="mt-2 flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-[#315bd1] focus-within:bg-white">
                <Wallet className="h-4 w-4 shrink-0 text-slate-400" />

                <input
                  id="upi-id"
                  type="text"
                  value={upiId}
                  onChange={handleUpiIdChange}
                  disabled={showQr || transactionStatus === "SUCCESS"}
                  placeholder="example@upi"
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Amount */}
            <div className="mt-4">
              <label
                htmlFor="upi-amount"
                className="text-xs font-semibold text-slate-600"
              >
                Cash Amount
              </label>

              <div className="mt-2 flex h-11 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-[#315bd1] focus-within:bg-white">
                <span className="mr-2 text-sm font-bold text-slate-400">
                  ₹
                </span>

                <input
                  id="upi-amount"
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={handleAmountChange}
                  disabled={showQr || transactionStatus === "SUCCESS"}
                  placeholder="Enter cash amount"
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Generate QR */}
            {!showQr && transactionStatus !== "SUCCESS" && (
              <button
                type="button"
                onClick={handleGenerateQr}
                disabled={!isValidMobile || !isValidAmount}
                className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#315bd1] px-4 text-sm font-bold text-white transition hover:bg-[#274dbd] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <QrCode className="h-4 w-4" />
                Generate Payment QR
              </button>
            )}

            {/* QR State */}
            {showQr && transactionStatus !== "SUCCESS" && (
              <div className="mt-5 rounded-2xl border border-slate-200 bg-[#f7f8fc] p-5">
                <div className="text-center">
                  <p className="text-sm font-bold text-slate-900">
                    Scan to Pay
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Customer can scan this QR using any supported UPI app.
                  </p>

                  <div className="mx-auto mt-5 flex h-48 w-48 items-center justify-center rounded-2xl border-8 border-white bg-white shadow-sm">
                    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-white">
                      <QrCode className="h-36 w-36 text-slate-900" />

                      <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-white shadow-sm">
                        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#315bd1]">
                          <span className="text-[10px] font-black text-white">
                            UPI
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Amount
                    </p>

                    <p className="mt-1 text-2xl font-bold text-[#315bd1]">
                      ₹{amount || "0"}
                    </p>
                  </div>

                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-600">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        timeLeft > 0
                          ? "bg-emerald-500"
                          : "bg-red-500"
                      }`}
                    />

                    {timeLeft > 0
                      ? `QR expires in ${formattedTime}`
                      : "QR expired"}
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={handleCancelQr}
                    disabled={transactionStatus === "PROCESSING"}
                    className="flex h-10 flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleVerifyPayment}
                    disabled={
                      timeLeft <= 0 ||
                      transactionStatus === "PROCESSING"
                    }
                    className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-[#315bd1] text-xs font-bold text-white transition hover:bg-[#274dbd] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {transactionStatus === "PROCESSING" ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Verify Payment
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Success */}
            {transactionStatus === "SUCCESS" && (
              <>
                <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-emerald-500" />

                    <div>
                      <p className="text-sm font-bold text-emerald-700">
                        Payment Successful
                      </p>

                      <p className="mt-1 text-xs text-emerald-600">
                        Transaction ID: {transactionId}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  New Transaction
                </button>
              </>
            )}

            {/* Failed */}
            {transactionStatus === "FAILED" && (
              <div className="mt-5 rounded-xl border border-red-100 bg-red-50 p-4">
                <div className="flex items-center gap-3">
                  <XCircle className="h-6 w-6 text-red-500" />

                  <div>
                    <p className="text-sm font-bold text-red-700">
                      Payment Failed
                    </p>

                    <p className="mt-1 text-xs text-red-600">
                      Please retry the transaction.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="rounded-2xl bg-[#f7f8fc] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef2ff]">
                <Wallet className="h-5 w-5 text-[#315bd1]" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Transaction Summary
                </h3>

                <p className="mt-1 text-[11px] text-slate-500">
                  Review payment information.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
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
                  UPI ID
                </p>

                <p className="mt-1 break-all text-sm font-semibold text-slate-700">
                  {upiId || "Not provided"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Cash Amount
                </p>

                <p className="mt-1 text-lg font-bold text-[#315bd1]">
                  ₹{amount || "0"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Status
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      transactionStatus === "SUCCESS"
                        ? "bg-emerald-500"
                        : transactionStatus === "PROCESSING"
                          ? "bg-amber-500"
                          : "bg-slate-300"
                    }`}
                  />

                  <span className="text-xs font-bold text-slate-700">
                    {transactionStatus === "IDLE"
                      ? "Ready"
                      : transactionStatus === "PROCESSING"
                        ? "Processing"
                        : transactionStatus === "SUCCESS"
                          ? "Successful"
                          : "Failed"}
                  </span>
                </div>
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
                How it works
              </p>

              <ol className="mt-2 space-y-2 text-[11px] leading-5 text-slate-600">
                <li>
                  <span className="mr-1 font-bold text-[#315bd1]">1.</span>
                  Enter the customer mobile number and cash amount.
                </li>

                <li>
                  <span className="mr-1 font-bold text-[#315bd1]">2.</span>
                  Generate the UPI payment QR.
                </li>

                <li>
                  <span className="mr-1 font-bold text-[#315bd1]">3.</span>
                  Customer scans and completes the payment.
                </li>

                <li>
                  <span className="mr-1 font-bold text-[#315bd1]">4.</span>
                  Verify payment and hand over the cash.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpiCashPoint;