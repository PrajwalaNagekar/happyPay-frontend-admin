import { useRef, useState } from "react";
import {
  Camera,
  ChevronRight,
  FileBadge,
  FileText,
  Upload,
} from "lucide-react";

const BusinessProofStep = () => {
  const businessProofInputRef = useRef<HTMLInputElement | null>(null);

  const [businessProof, setBusinessProof] = useState("");
  const [businessProofFile, setBusinessProofFile] =
    useState<File | null>(null);

  const proofOptions = [
    "GST Certificate",
    "UDYAM Certificate",
    "MSME Certificate",
    "Electricity Bill",
    "Rental Agreement",
    "Business Agreement",
    "Shop Lease Agreement",
    "Premises Agreement",
    "Gumasta License",
    "Other Valid Business Proof",
  ];

  const handleBusinessProofUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setBusinessProofFile(file);
    }
  };

  const handlePhotoAction = (type: string) => {
    console.log(`${type} photo action`);
  };

  return (
    <div className="space-y-5">
      {/* INSIDE SHOP */}
      <button
        type="button"
        onClick={() => handlePhotoAction("Inside Shop")}
        className="flex w-full items-center gap-6 rounded-xl border-2 border-[#c9c9ce] bg-[#fafafd] px-4 py-3 text-left transition hover:border-[#315bd1]"
      >
        <div className="flex h-[48px] w-[86px] shrink-0 items-center justify-center rounded-xl bg-[#e4f7f3]">
          <Camera
            className="h-5 w-5 text-[#08a77e]"
            strokeWidth={2.1}
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold font-bold text-[#172033]">
            Inside Shop
          </h3>

          <p className="mt-2 text-sm leading-7 text-[#9aa1af]">
            Take a photo of yourself inside the shop.
          </p>
        </div>

        <ChevronRight
          className="h-4 w-4 shrink-0 text-[#08a77e]"
          strokeWidth={2.4}
        />
      </button>

      {/* OUTSIDE SHOP */}
      <button
        type="button"
        onClick={() => handlePhotoAction("Outside Shop")}
        className="flex w-full items-center gap-6 rounded-xl border-2 border-[#c9c9ce] bg-[#fafafd] px-4 py-3 text-left transition hover:border-[#315bd1]"
      >
        <div className="flex h-[48px] w-[86px] shrink-0 items-center justify-center rounded-xl bg-[#e4f7f3]">
          <Camera
            className="h-5 w-5 text-[#08a77e]"
            strokeWidth={2.1}
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold font-bold text-[#172033]">
            Outside Shop
          </h3>

          <p className="mt-2 text-sm leading-7 text-[#9aa1af]">
            Take a clear photo of the shop exterior.
          </p>
        </div>

        <ChevronRight
          className="h-4 w-4 shrink-0 text-[#08a77e]"
          strokeWidth={2.4}
        />
      </button>

      {/* SHOP LOCATION */}
      <button
        type="button"
        onClick={() => handlePhotoAction("Shop Location")}
        className="flex w-full items-center gap-6 rounded-xl border-2 border-[#c9c9ce] bg-[#fafafd] px-4 py-3 text-left transition hover:border-[#315bd1]"
      >
        <div className="flex h-[48px] w-[86px] shrink-0 items-center justify-center rounded-xl bg-[#e4f7f3]">
          <Camera
            className="h-5 w-5 text-[#08a77e]"
            strokeWidth={2.1}
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold font-bold text-[#172033]">
            Shop Location
          </h3>

          <p className="mt-2 text-sm leading-7 text-[#9aa1af]">
            Capture a photo showing the shop location.
          </p>
        </div>

        <ChevronRight
          className="h-4 w-4 shrink-0 text-[#08a77e]"
          strokeWidth={2.4}
        />
      </button>

      {/* ADDRESS / BUSINESS PROOF */}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-[#172033]">
          Address / Business Proof
        </label>

        <div className="relative">
          <FileBadge
            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8992a3]"
            strokeWidth={2}
          />

          <select
            value={businessProof}
            onChange={(event) =>
              setBusinessProof(event.target.value)
            }
            className={`h-[48px] w-full appearance-none rounded-xl border-2 bg-[#fafbfd] pl-11 pr-10 text-sm font-medium outline-none transition focus:border-[#315bd1] ${
              businessProof
                ? "border-[#315bd1] text-[#172033]"
                : "border-[#dfe1e6] text-[#a1a8b5]"
            }`}
          >
            <option value="" disabled>
              Select proof type
            </option>

            {proofOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute right-7 top-1/2 -translate-y-1/2">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#697386]"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* BUSINESS PROOF UPLOAD */}
      <button
        type="button"
        onClick={() => businessProofInputRef.current?.click()}
        className="flex w-full items-center gap-6 rounded-xl border-2 border-[#c9c9ce] bg-[#fafafd] px-4 py-3 text-left transition hover:border-[#315bd1]"
      >
        <div className="flex h-[48px] w-[86px] shrink-0 items-center justify-center rounded-xl bg-[#e8ecfc]">
          <FileText
            className="h-5 w-5 text-[#315bd1]"
            strokeWidth={2}
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold font-bold text-[#172033]">
            Business Proof
          </h3>

          <p className="mt-2 text-sm leading-7 text-[#9aa1af]">
            {businessProofFile
              ? businessProofFile.name
              : "Upload the selected business/address proof."}
          </p>
        </div>

        <Upload
          className="h-5 w-5 shrink-0 text-[#315bd1]"
          strokeWidth={2.4}
        />
      </button>

      <input
        ref={businessProofInputRef}
        type="file"
        accept="image/*,.pdf"
        onChange={handleBusinessProofUpload}
        className="hidden"
      />
    </div>
  );
};

export default BusinessProofStep;






