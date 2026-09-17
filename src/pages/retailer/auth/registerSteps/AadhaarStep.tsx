import {
  Fingerprint,
  Camera,
  FileCheck,
  CalendarDays,
} from "lucide-react";

const AadhaarStep = () => {
  return (
    <div className="space-y-6">

      {/* Consent */}
      <div className="rounded-2xl border border-[#e5e1f1] bg-[#f8f7fc] p-5">

        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
            <Fingerprint className="h-5 w-5 text-[#7668aa]" />
          </div>

          <div>
            <p className="text-xs font-semibold text-[#26384a]">
              Aadhaar verification
            </p>

            <p className="mt-1 text-[11px] leading-5 text-gray-400">
              Your Aadhaar details are used only for identity
              verification.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 accent-[#7668aa]"
            />

            <span className="text-xs leading-5 text-gray-500">
              I provide consent for Aadhaar validation.
            </span>
          </label>

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 accent-[#7668aa]"
            />

            <span className="text-xs leading-5 text-gray-500">
              My Aadhaar is linked with my mobile number.
            </span>
          </label>

        </div>

      </div>

      {/* Aadhaar Number */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-[#303947]">
          Aadhaar Number
        </label>

        <div className="relative">
          <Fingerprint className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            inputMode="numeric"
            maxLength={12}
            placeholder="Enter 12-digit Aadhaar number"
            className="h-[50px] w-full rounded-xl border border-gray-200 bg-[#fafafa] pl-11 pr-4 text-sm tracking-wider text-[#26384a] outline-none focus:border-[#7668aa] focus:bg-white focus:ring-4 focus:ring-[#7668aa]/10"
          />
        </div>
      </div>

      {/* Aadhaar Document */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-[#303947]">
          Aadhaar Document
        </label>

        <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-gray-300 bg-[#fafafa] p-4 hover:border-[#7668aa]">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
            <FileCheck className="h-5 w-5 text-[#7668aa]" />
          </div>

          <div>
            <p className="text-xs font-semibold text-[#26384a]">
              Upload Aadhaar document
            </p>

            <p className="mt-1 text-[10px] text-gray-400">
              JPG, PNG or PDF
            </p>
          </div>

          <input
            type="file"
            accept="image/*,.pdf"
            className="hidden"
          />

        </label>
      </div>

      {/* Date */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-[#303947]">
          Date of Birth
        </label>

        <div className="relative">
          <CalendarDays className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <input
            type="date"
            className="h-[50px] w-full rounded-xl border border-gray-200 bg-[#fafafa] pl-11 pr-4 text-sm text-[#26384a] outline-none focus:border-[#7668aa] focus:bg-white focus:ring-4 focus:ring-[#7668aa]/10"
          />
        </div>
      </div>

      {/* Shop photos */}
      <div>

        <p className="mb-3 text-xs font-semibold text-[#303947]">
          Shop Photos
        </p>

        <div className="grid gap-3 sm:grid-cols-3">

          <PhotoUpload
            title="Inside Shop"
            capture="environment"
          />

          <PhotoUpload
            title="Outside Shop"
            capture="environment"
          />

          <PhotoUpload
            title="Shop Location"
            capture="environment"
          />

        </div>

      </div>

      {/* Business Proof */}
      <div>

        <label className="mb-2 block text-xs font-semibold text-[#303947]">
          Address / Business Proof
        </label>

        <select
          className="h-[50px] w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 text-sm text-[#26384a] outline-none focus:border-[#7668aa] focus:bg-white focus:ring-4 focus:ring-[#7668aa]/10"
        >
          <option value="">
            Select proof type
          </option>
          <option>Electricity Bill</option>
          <option>Shop License</option>
          <option>GST Certificate</option>
          <option>Rental Agreement</option>
        </select>

        <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-gray-300 bg-[#fafafa] p-4 hover:border-[#7668aa]">

          <FileCheck className="h-5 w-5 text-[#7668aa]" />

          <span className="text-xs font-medium text-gray-500">
            Upload business proof
          </span>

          <input
            type="file"
            accept="image/*,.pdf"
            className="hidden"
          />

        </label>

      </div>

    </div>
  );
};

interface PhotoUploadProps {
  title: string;
  capture?: "environment" | "user";
}

const PhotoUpload = ({
  title,
  capture,
}: PhotoUploadProps) => {
  return (
    <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-[#fafafa] px-3 py-5 text-center transition hover:border-[#7668aa] hover:bg-[#faf9fd]">

      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
        <Camera className="h-4 w-4 text-[#7668aa]" />
      </div>

      <p className="mt-2 text-[10px] font-semibold text-[#26384a]">
        {title}
      </p>

      <p className="mt-1 text-[9px] text-gray-400">
        Add photo
      </p>

      <input
        type="file"
        accept="image/*"
        capture={capture}
        className="hidden"
      />

    </label>
  );
};

export default AadhaarStep;