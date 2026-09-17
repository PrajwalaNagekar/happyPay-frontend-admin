import { Smartphone, CreditCard } from "lucide-react";

const AccountStep = () => {
  return (
    <div className="space-y-6">

      {/* PAN */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-[#303947]">
          PAN Number
        </label>

        <div className="relative">
          <CreditCard className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Enter PAN number"
            maxLength={10}
            className="h-[50px] w-full rounded-xl border border-gray-200 bg-[#fafafa] pl-11 pr-4 text-sm uppercase text-[#26384a] outline-none transition placeholder:normal-case placeholder:text-gray-400 hover:border-gray-300 focus:border-[#7668aa] focus:bg-white focus:ring-4 focus:ring-[#7668aa]/10"
          />
        </div>
      </div>

      {/* Mobile */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-[#303947]">
          Mobile Number
        </label>

        <div className="relative">
          <Smartphone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <span className="absolute left-10 top-1/2 -translate-y-1/2 border-r border-gray-200 pr-3 text-xs font-medium text-gray-500">
            +91
          </span>

          <input
            type="tel"
            placeholder="Enter mobile number"
            maxLength={10}
            inputMode="numeric"
            className="h-[50px] w-full rounded-xl border border-gray-200 bg-[#fafafa] pl-[78px] pr-4 text-sm text-[#26384a] outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-[#7668aa] focus:bg-white focus:ring-4 focus:ring-[#7668aa]/10"
          />
        </div>
      </div>

      {/* OTP verification */}
      <div className="rounded-2xl border border-[#e9e5f5] bg-[#f8f7fc] p-4">

        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white">
            <Smartphone className="h-4 w-4 text-[#7668aa]" />
          </div>

          <div>
            <p className="text-xs font-semibold text-[#26384a]">
              Mobile verification
            </p>

            <p className="mt-1 text-[11px] leading-5 text-gray-400">
              An OTP will be sent to verify your mobile number.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="mt-4 rounded-xl bg-[#7668aa] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#685a9b]"
        >
          Verify Mobile OTP
        </button>

      </div>

    </div>
  );
};

export default AccountStep;