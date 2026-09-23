import React, { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  CircleUserRound,
  Loader2,
  RefreshCw,
  Search,
  ShieldCheck,
} from "lucide-react";

interface CashDropProps {
  selectedCompany?: string;
  onBack?: () => void;
}

type TransactionStatus = "IDLE" | "PROCESSING" | "SUCCESS";

const CashDrop: React.FC<CashDropProps> = ({
  selectedCompany,
  onBack,
}) => {
  const [customerId, setCustomerId] = useState("");
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [transactionStatus, setTransactionStatus] =
    useState<TransactionStatus>("IDLE");
  const [transactionId, setTransactionId] = useState("");
  const [transactionDate, setTransactionDate] = useState<Date | null>(null);

  const handleCustomerIdChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCustomerId(event.target.value);
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

  const handleSearchCustomer = () => {
    if (!customerId.trim() && mobile.length !== 10) {
      return;
    }

    setIsSearching(true);

    window.setTimeout(() => {
      setIsSearching(false);
      setCustomerName("Customer");
    }, 1200);
  };

  const handleCashDrop = () => {
    if (!customerName || Number(amount) <= 0) {
      return;
    }

    setIsProcessing(true);
    setTransactionStatus("PROCESSING");

    window.setTimeout(() => {
      setIsProcessing(false);
      setTransactionId(
        `CD${Math.floor(100000000 + Math.random() * 900000000)}`,
      );
      setTransactionDate(new Date());
      setTransactionStatus("SUCCESS");
    }, 1800);
  };

  const resetForm = () => {
    setCustomerId("");
    setMobile("");
    setAmount("");
    setCustomerName("");
    setIsSearching(false);
    setIsProcessing(false);
    setTransactionStatus("IDLE");
    setTransactionId("");
    setTransactionDate(null);
  };

  const isSearchValid =
    customerId.trim().length > 0 || mobile.length === 10;

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
            Cash Drop
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Process cash drop transactions securely through the retailer
            portal.
          </p>
        </div>
      </div>

      {selectedCompany && (
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Selected Company
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-800">
            {selectedCompany}
          </p>
        </div>
      )}

      {/* Main Card */}
      <section className="hp-card rounded-2xl p-5 sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Form */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef2ff]">
                <CircleUserRound className="h-5 w-5 text-[#315bd1]" />
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Customer Details
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Search for the customer before processing the cash drop.
                </p>
              </div>
            </div>

            {/* Customer ID */}
            <div>
              <label
                htmlFor="cash-drop-customer-id"
                className="text-xs font-semibold text-slate-600"
              >
                Customer ID
              </label>

              <div className="mt-2 flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-[#315bd1] focus-within:bg-white">
                <CircleUserRound className="h-4 w-4 shrink-0 text-slate-400" />

                <input
                  id="cash-drop-customer-id"
                  type="text"
                  value={customerId}
                  onChange={handleCustomerIdChange}
                  disabled={
                    isSearching ||
                    isProcessing ||
                    transactionStatus === "SUCCESS"
                  }
                  placeholder="Enter customer ID"
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Mobile */}
            <div className="mt-4">
              <label
                htmlFor="cash-drop-mobile"
                className="text-xs font-semibold text-slate-600"
              >
                Customer Mobile Number
              </label>

              <div className="mt-2 flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-[#315bd1] focus-within:bg-white">
                <span className="text-xs font-bold text-slate-400">
                  +91
                </span>

                <input
                  id="cash-drop-mobile"
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  value={mobile}
                  onChange={handleMobileChange}
                  disabled={
                    isSearching ||
                    isProcessing ||
                    transactionStatus === "SUCCESS"
                  }
                  placeholder="Enter mobile number"
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />

                <span className="text-[10px] text-slate-400">
                  {mobile.length}/10
                </span>
              </div>
            </div>

            {/* Search */}
            {!customerName && transactionStatus !== "SUCCESS" && (
              <button
                type="button"
                onClick={handleSearchCustomer}
                disabled={!isSearchValid || isSearching}
                className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#315bd1] bg-white text-xs font-bold text-[#315bd1] transition hover:bg-[#f4f6fd] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Searching Customer...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Search Customer
                  </>
                )}
              </button>
            )}

            {/* Customer Found */}
            {customerName && transactionStatus !== "SUCCESS" && (
              <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
                    <CircleUserRound className="h-5 w-5 text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {customerName}
                    </p>

                    <p className="mt-1 text-[11px] text-emerald-600">
                      Customer verified successfully
                    </p>
                  </div>

                  <CheckCircle2 className="ml-auto h-5 w-5 text-emerald-500" />
                </div>
              </div>
            )}

            {/* Amount */}
            <div className="mt-4">
              <label
                htmlFor="cash-drop-amount"
                className="text-xs font-semibold text-slate-600"
              >
                Cash Drop Amount
              </label>

              <div className="mt-2 flex h-11 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-[#315bd1] focus-within:bg-white">
                <span className="mr-2 text-sm font-bold text-slate-400">
                  ₹
                </span>

                <input
                  id="cash-drop-amount"
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={handleAmountChange}
                  disabled={
                    !customerName ||
                    isProcessing ||
                    transactionStatus === "SUCCESS"
                  }
                  placeholder="Enter cash drop amount"
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Security Information */}
            <div className="mt-5 rounded-xl border border-[#315bd1]/15 bg-[#f4f6fd] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#315bd1]">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Secure Transaction
                  </p>

                  <p className="mt-1 text-[11px] text-slate-500">
                    Verify customer details before completing the transaction.
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
                      Cash Drop Successful
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
                onClick={handleCashDrop}
                disabled={
                  !customerName ||
                  Number(amount) <= 0 ||
                  isProcessing
                }
                className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#315bd1] px-4 text-sm font-bold text-white transition hover:bg-[#274dbd] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing Cash Drop...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Confirm Cash Drop
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
                New Cash Drop
              </button>
            )}
          </div>

          {/* Summary */}
          <div className="rounded-2xl bg-[#f7f8fc] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef2ff]">
                <ShieldCheck className="h-5 w-5 text-[#315bd1]" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Cash Drop Summary
                </h3>

                <p className="mt-1 text-[11px] text-slate-500">
                  Review the transaction details.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Customer
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {customerName || "Not selected"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Customer ID
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {customerId || "Not entered"}
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
                  Cash Drop Amount
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
                Confirm the customer identity and amount before submitting
                the cash drop transaction.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CashDrop;