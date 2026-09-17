import {
  UserRound,
  Camera,
} from "lucide-react";

const AboutRetailerStep = () => {
  return (
    <div className="space-y-5">

      {/* Full Name */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-[#303947]">
          Retailer Full Name
        </label>

        <div className="relative">
          <UserRound className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Enter your full name"
            className="h-[50px] w-full rounded-xl border border-gray-200 bg-[#fafafa] pl-11 pr-4 text-sm text-[#26384a] outline-none transition placeholder:text-gray-400 focus:border-[#7668aa] focus:bg-white focus:ring-4 focus:ring-[#7668aa]/10"
          />
        </div>
      </div>

      {/* Photo */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-[#303947]">
          Retailer Photo
        </label>

        <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-gray-300 bg-[#fafafa] p-4 transition hover:border-[#7668aa] hover:bg-[#faf9fd]">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white">
            <Camera className="h-5 w-5 text-[#7668aa]" />
          </div>

          <div>
            <p className="text-xs font-semibold text-[#26384a]">
              Upload your photo
            </p>

            <p className="mt-1 text-[10px] text-gray-400">
              JPG or PNG • Clear face photo
            </p>
          </div>

          <input
            type="file"
            accept="image/*"
            capture="user"
            className="hidden"
          />

        </label>
      </div>

      {/* Gender + Marital */}
      <div className="grid gap-5 sm:grid-cols-2">

        <div>
          <label className="mb-2 block text-xs font-semibold text-[#303947]">
            Gender
          </label>

          <select
            className="h-[50px] w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 text-sm text-[#26384a] outline-none focus:border-[#7668aa] focus:bg-white focus:ring-4 focus:ring-[#7668aa]/10"
          >
            <option value="">Select gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold text-[#303947]">
            Marital Status
          </label>

          <select
            className="h-[50px] w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 text-sm text-[#26384a] outline-none focus:border-[#7668aa] focus:bg-white focus:ring-4 focus:ring-[#7668aa]/10"
          >
            <option value="">Select status</option>
            <option>Single</option>
            <option>Married</option>
            <option>Other</option>
          </select>
        </div>

      </div>

      {/* Education */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-[#303947]">
          Educational Qualification
        </label>

        <input
          type="text"
          placeholder="Enter your qualification"
          className="h-[50px] w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 text-sm text-[#26384a] outline-none transition placeholder:text-gray-400 focus:border-[#7668aa] focus:bg-white focus:ring-4 focus:ring-[#7668aa]/10"
        />
      </div>

    </div>
  );
};

export default AboutRetailerStep;