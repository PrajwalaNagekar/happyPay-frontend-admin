import {
  Building2,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

const BankDetailsStep = () => {
  return (
    <div className="space-y-6">

      {/* Info */}
      <div className="rounded-2xl border border-[#e5e1f1] bg-[#f8f7fc] p-4">

        <div className="flex items-start gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white">
            <ShieldCheck className="h-4 w-4 text-[#7668aa]" />
          </div>

          <div>
            <p className="text-xs font-semibold text-[#26384a]">
              Secure bank details
            </p>

            <p className="mt-1 text-[10px] leading-5 text-gray-400">
              Your bank account will be used for retailer
              settlement and earnings.
            </p>
          </div>

        </div>

      </div>

      {/* Bank Name */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-[#303947]">
          Bank Name
        </label>

        <div className="relative">

          <Building2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Enter bank name"
            className="h-[50px] w-full rounded-xl border border-gray-200 bg-[#fafafa] pl-11 pr-4 text-sm text-[#26384a] outline-none transition placeholder:text-gray-400 focus:border-[#7668aa] focus:bg-white focus:ring-4 focus:ring-[#7668aa]/10"
          />

        </div>
      </div>

      {/* IFSC */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-[#303947]">
          IFSC Code
        </label>

        <input
          type="text"
          placeholder="Enter IFSC code"
          maxLength={11}
          className="h-[50px] w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 text-sm uppercase tracking-wider text-[#26384a] outline-none transition placeholder:normal-case placeholder:tracking-normal placeholder:text-gray-400 focus:border-[#7668aa] focus:bg-white focus:ring-4 focus:ring-[#7668aa]/10"
        />
      </div>

      {/* Account Number */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-[#303947]">
          Account Number
        </label>

        <div className="relative">

          <CreditCard className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <input
            type="password"
            inputMode="numeric"
            placeholder="Enter account number"
            className="h-[50px] w-full rounded-xl border border-gray-200 bg-[#fafafa] pl-11 pr-4 text-sm text-[#26384a] outline-none transition placeholder:text-gray-400 focus:border-[#7668aa] focus:bg-white focus:ring-4 focus:ring-[#7668aa]/10"
          />

        </div>
      </div>

      {/* Confirm Account */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-[#303947]">
          Confirm Account Number
        </label>

        <div className="relative">

          <CreditCard className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <input
            type="password"
            inputMode="numeric"
            placeholder="Re-enter account number"
            className="h-[50px] w-full rounded-xl border border-gray-200 bg-[#fafafa] pl-11 pr-4 text-sm text-[#26384a] outline-none transition placeholder:text-gray-400 focus:border-[#7668aa] focus:bg-white focus:ring-4 focus:ring-[#7668aa]/10"
          />

        </div>
      </div>

      {/* Confirmation */}
      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">

        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 accent-[#7668aa]"
        />

        <span className="text-[11px] leading-5 text-gray-500">
          I confirm that the bank account details provided
          above belong to me and are correct.
        </span>

      </label>

    </div>
  );
};

export default BankDetailsStep;