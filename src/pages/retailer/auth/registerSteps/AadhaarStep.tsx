import { useRef, useState } from "react";
import {
  Fingerprint,
  FileText,
  ShieldCheck,
  Upload,
  Circle,
  CheckCircle2,
} from "lucide-react";

const AadhaarStep = () => {
  const aadhaarInputRef = useRef<HTMLInputElement | null>(null);

  const [consent, setConsent] = useState(false);
  const [linkedMobile, setLinkedMobile] = useState<"yes" | "no">("no");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);

  const handleAadhaarUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setAadhaarFile(file);
    }
  };

  const handleAadhaarChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 12);

    setAadhaarNumber(value);
  };

  const formatAadhaar = (value: string) => {
    return value.replace(/(.{4})/g, "$1 ").trim();
  };

  return (
    <div className="space-y-5">
      {/* HEADER INFORMATION */}
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[22px] bg-gradient-to-br from-[#e9efff] to-[#e6f6f1]">
          <Fingerprint
            className="h-9 w-9 text-[#315bd1]"
            strokeWidth={2}
          />
        </div>

        <div>
          <h3 className="text-base font-bold text-[#172033]">
            Aadhaar Verification
          </h3>

          <p className="mt-2 text-sm leading-7 text-[#697386]">
            Verify your Aadhaar information
            <br />
            securely.
          </p>
        </div>
      </div>

      {/* CONSENT */}
      <button
        type="button"
        onClick={() => setConsent((previous) => !previous)}
        className={`flex w-full items-start gap-3 rounded-xl border-2 px-4 py-3 text-left transition ${
          consent
            ? "border-[#315bd1] bg-[#f0f3ff]"
            : "border-[#c9c9ce] bg-[#fafafd]"
        }`}
      >
        {consent ? (
          <CheckCircle2
            className="mt-0.5 h-5 w-5 shrink-0 text-[#315bd1]"
            strokeWidth={2}
          />
        ) : (
          <Circle
            className="mt-0.5 h-5 w-5 shrink-0 text-[#8992a3]"
            strokeWidth={1.8}
          />
        )}

        <span className="pt-1 text-sm font-semibold leading-7 text-[#172033]">
          I provide my consent for Aadhaar-based
          <br />
          identity verification.
        </span>
      </button>

      {/* MOBILE LINK QUESTION */}
      <div>
        <p className="mb-5 text-sm font-bold leading-7 text-[#172033]">
          Is your Aadhaar linked with a mobile number?
        </p>

        <div className="grid grid-cols-2 gap-5">
          {/* YES */}
          <button
            type="button"
            onClick={() => setLinkedMobile("yes")}
            className={`flex h-[48px] items-center justify-center gap-3 rounded-xl border-2 text-sm font-semibold transition ${
              linkedMobile === "yes"
                ? "border-[#315bd1] bg-[#f0f3ff] text-[#172033]"
                : "border-[#d4d5da] bg-[#fafafd] text-[#172033]"
            }`}
          >
            {linkedMobile === "yes" ? (
              <CheckCircle2
                className="h-4 w-4 text-[#315bd1]"
                strokeWidth={2}
              />
            ) : (
              <Circle
                className="h-4 w-4 text-[#8992a3]"
                strokeWidth={1.8}
              />
            )}

            Yes
          </button>

          {/* NO */}
          <button
            type="button"
            onClick={() => setLinkedMobile("no")}
            className={`flex h-[48px] items-center justify-center gap-3 rounded-xl border-2 text-sm font-semibold transition ${
              linkedMobile === "no"
                ? "border-[#315bd1] bg-[#f0f3ff] text-[#172033]"
                : "border-[#d4d5da] bg-[#fafafd] text-[#172033]"
            }`}
          >
            {linkedMobile === "no" ? (
              <CheckCircle2
                className="h-4 w-4 text-[#315bd1]"
                strokeWidth={2}
              />
            ) : (
              <Circle
                className="h-4 w-4 text-[#8992a3]"
                strokeWidth={1.8}
              />
            )}

            No
          </button>
        </div>
      </div>

      {/* AADHAAR NUMBER */}
      <div>
        <label className="mb-3 block text-sm font-bold text-[#172033]">
          Aadhaar Number
        </label>

        <div className="relative">
          <Fingerprint
            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8992a3]"
            strokeWidth={2}
          />

          <input
            type="text"
            inputMode="numeric"
            value={formatAadhaar(aadhaarNumber)}
            onChange={handleAadhaarChange}
            placeholder="Enter Aadhaar number"
            maxLength={14}
            className="h-[48px] w-full rounded-xl border-2 border-[#dfe1e6] bg-[#fafbfd] pl-11 pr-6 text-sm font-medium tracking-wide text-[#172033] outline-none transition placeholder:text-[#a1a8b5] focus:border-[#315bd1]"
          />
        </div>
      </div>

      {/* AADHAAR DOCUMENT */}
      <button
        type="button"
        onClick={() => aadhaarInputRef.current?.click()}
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
            Aadhaar Document
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#9aa1af]">
            {aadhaarFile
              ? aadhaarFile.name
              : "Upload Aadhaar front and back images."}
          </p>
        </div>

        <Upload
          className="h-5 w-5 shrink-0 text-[#315bd1]"
          strokeWidth={2.4}
        />
      </button>

      <input
        ref={aadhaarInputRef}
        type="file"
        accept="image/*,.pdf"
        multiple
        onChange={handleAadhaarUpload}
        className="hidden"
      />

      {/* SECURITY INFORMATION */}
      <div className="flex items-start gap-3 rounded-xl border border-[#d9e0f5] bg-[#eef1ff] px-4 py-3">
        <ShieldCheck
          className="mt-1 h-5 w-5 shrink-0 text-[#315bd1]"
          strokeWidth={2}
        />

        <p className="text-sm leading-7 text-[#3f4759]">
          Sensitive Aadhaar information is securely
          <br />
          handled and masked where appropriate.
        </p>
      </div>
    </div>
  );
};

export default AadhaarStep;





