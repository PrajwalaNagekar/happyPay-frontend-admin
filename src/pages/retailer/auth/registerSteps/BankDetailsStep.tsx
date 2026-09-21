import { useState } from "react";
import {
  Building2,
  CreditCard,
  Hash,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const BankDetailsStep = () => {
  const [bankName, setBankName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [confirmAccountNumber, setConfirmAccountNumber] =
    useState("");

  const banks = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Kotak Mahindra Bank",
    "Bank of Baroda",
    "Punjab National Bank",
    "Other",
  ];

  const handleIfscChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 11);

    setIfscCode(value);
  };

  const handleAccountNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 18);

    setAccountNumber(value);
  };

  const handleConfirmAccountNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 18);

    setConfirmAccountNumber(value);
  };

  const accountsMatch =
    accountNumber.length > 0 &&
    confirmAccountNumber.length > 0 &&
    accountNumber === confirmAccountNumber;

  return (
    <div className="space-y-7">
      {/* =====================================================
          BANK NAME
      ===================================================== */}

      <div>
        <label className="mb-2.5 block text-[15px] font-semibold text-[#172033]">
          Bank Name
        </label>

        <div className="relative">
          <Building2 className="pointer-events-none absolute left-5 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-[#8992a3]" />

          <select
            value={bankName}
            onChange={(event) =>
              setBankName(event.target.value)
            }
            className={`h-[58px] w-full appearance-none rounded-xl border border-[#dfe3e9] bg-[#fafbfd] pl-11 pr-12 text-[15px] outline-none transition focus:border-[#315bd1] ${
              bankName
                ? "font-medium text-[#172033]"
                : "text-[#9ba2af]"
            }`}
          >
            <option value="" disabled>
              Select bank
            </option>

            {banks.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>

          <svg
            className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7c8595]"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* =====================================================
          IFSC CODE
      ===================================================== */}

      <div>
        <label className="mb-2.5 block text-[15px] font-semibold text-[#172033]">
          IFSC Code
        </label>

        <div className="relative">
          <Hash className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8992a3]" />

          <input
            type="text"
            value={ifscCode}
            onChange={handleIfscChange}
            placeholder="Enter IFSC code"
            maxLength={11}
            autoComplete="off"
            className={`h-[58px] w-full rounded-xl border bg-[#fafbfd] pl-11 pr-5 text-[15px] uppercase tracking-[0.04em] text-[#172033] outline-none transition placeholder:normal-case placeholder:tracking-normal placeholder:text-[#a1a8b5] focus:border-[#315bd1] ${
              ifscCode
                ? "border-[#315bd1]"
                : "border-[#dfe3e9]"
            }`}
          />
        </div>

        <p className="mt-2 text-[12px] text-[#9299a7]">
          Enter the 11-character IFSC code of your bank
          branch.
        </p>
      </div>

      {/* =====================================================
          ACCOUNT NUMBER
      ===================================================== */}

      <div>
        <label className="mb-2.5 block text-[15px] font-semibold text-[#172033]">
          Account Number
        </label>

        <div className="relative">
          <CreditCard className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8992a3]" />

          <input
            type="password"
            value={accountNumber}
            onChange={handleAccountNumberChange}
            placeholder="Enter account number"
            maxLength={18}
            inputMode="numeric"
            autoComplete="off"
            className={`h-[58px] w-full rounded-xl border bg-[#fafbfd] pl-11 pr-5 text-[15px] tracking-[0.08em] text-[#172033] outline-none transition placeholder:tracking-normal placeholder:text-[#a1a8b5] focus:border-[#315bd1] ${
              accountNumber
                ? "border-[#315bd1]"
                : "border-[#dfe3e9]"
            }`}
          />
        </div>
      </div>

      {/* =====================================================
          CONFIRM ACCOUNT NUMBER
      ===================================================== */}

      <div>
        <label className="mb-2.5 block text-[15px] font-semibold text-[#172033]">
          Confirm Account Number
        </label>

        <div className="relative">
          <CreditCard className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8992a3]" />

          <input
            type="password"
            value={confirmAccountNumber}
            onChange={handleConfirmAccountNumberChange}
            placeholder="Re-enter account number"
            maxLength={18}
            inputMode="numeric"
            autoComplete="off"
            className={`h-[58px] w-full rounded-xl border bg-[#fafbfd] pl-11 pr-12 text-[15px] tracking-[0.08em] text-[#172033] outline-none transition placeholder:tracking-normal placeholder:text-[#a1a8b5] focus:border-[#315bd1] ${
              accountsMatch
                ? "border-[#08ae82]"
                : confirmAccountNumber
                  ? "border-[#d85b5b]"
                  : "border-[#dfe3e9]"
            }`}
          />

          {accountsMatch && (
            <CheckCircle2 className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#08ae82]" />
          )}
        </div>

        {confirmAccountNumber.length > 0 &&
          accountNumber !== confirmAccountNumber && (
            <p className="mt-2 text-[12px] text-[#d85b5b]">
              Account numbers do not match.
            </p>
          )}
      </div>

      {/* =====================================================
          SECURITY INFORMATION
      ===================================================== */}

      <div className="flex items-start gap-4 rounded-xl border border-[#dbe3f7] bg-[#f1f4ff] px-5 py-4">
        <ShieldCheck
          className="mt-0.5 h-5 w-5 shrink-0 text-[#315bd1]"
          strokeWidth={2}
        />

        <div>
          <p className="text-[14px] font-semibold text-[#172033]">
            Your bank details are secure
          </p>

          <p className="mt-1 text-[12px] leading-5 text-[#697386]">
            Your bank account information will be used for
            retailer payouts and transaction settlements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BankDetailsStep;



