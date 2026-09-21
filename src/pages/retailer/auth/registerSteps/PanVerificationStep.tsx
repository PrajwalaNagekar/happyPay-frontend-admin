import { useRef, useState } from "react";
import {
  CreditCard,
  Upload,
  UserRound,
  CalendarDays,
  Sparkles,
} from "lucide-react";

const PanVerificationStep = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [panFile, setPanFile] = useState<File | null>(null);
  const [panNumber, setPanNumber] = useState("");
  const [nameAsPerPan, setNameAsPerPan] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [fatherName, setFatherName] = useState("");

  const handlePanUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setPanFile(file);
    }
  };

  return (
    <div className="space-y-5">
      {/* PAN CARD UPLOAD */}
      <div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex w-full items-center gap-6 rounded-xl border-2 border-[#c9c9ce] bg-[#fafafd] px-4 py-3 text-left transition hover:border-[#315bd1]"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e8ecfc]">
            <CreditCard
              className="h-6 w-6 text-[#315bd1]"
              strokeWidth={2}
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-[#172033]">
              PAN Card
            </h3>

            <p className="mt-2 text-sm leading-7 text-[#8b93a3]">
              {panFile
                ? panFile.name
                : "Upload a clear image of your PAN card."}
            </p>
          </div>

          <Upload
            className="h-5 w-5 shrink-0 text-[#315bd1]"
            strokeWidth={2.4}
          />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf"
          onChange={handlePanUpload}
          className="hidden"
        />
      </div>

      {/* PAN NUMBER */}
      <div>
        <label className="mb-3 block text-sm font-bold text-[#172033]">
          PAN Number
        </label>

        <div className="relative">
          <CreditCard
            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8992a3]"
            strokeWidth={2}
          />

          <input
            type="text"
            value={panNumber}
            onChange={(event) =>
              setPanNumber(
                event.target.value
                  .toUpperCase()
                  .replace(/[^A-Z0-9]/g, "")
                  .slice(0, 10),
              )
            }
            placeholder="PAN number"
            maxLength={10}
            className="h-[48px] w-full rounded-xl border-2 border-[#dfe1e6] bg-[#fafbfd] pl-11 pr-6 text-sm font-medium tracking-wide text-[#172033] outline-none transition placeholder:text-[#a1a8b5] focus:border-[#315bd1]"
          />
        </div>
      </div>

      {/* NAME AS PER PAN */}
      <div>
        <label className="mb-3 block text-sm font-bold text-[#172033]">
          Name as per PAN
        </label>

        <div className="relative">
          <UserRound
            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8992a3]"
            strokeWidth={2}
          />

          <input
            type="text"
            value={nameAsPerPan}
            onChange={(event) =>
              setNameAsPerPan(event.target.value)
            }
            placeholder="Name extracted from PAN"
            className="h-[48px] w-full rounded-xl border-2 border-[#dfe1e6] bg-[#fafbfd] pl-11 pr-6 text-sm font-medium text-[#172033] outline-none transition placeholder:text-[#a1a8b5] focus:border-[#315bd1]"
          />
        </div>
      </div>

      {/* DATE OF BIRTH */}
      <div>
        <label className="mb-3 block text-sm font-bold text-[#172033]">
          Date of Birth
        </label>

        <div className="relative">
          <CalendarDays
            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8992a3]"
            strokeWidth={2}
          />

          <input
            type="text"
            value={dateOfBirth}
            onChange={(event) =>
              setDateOfBirth(event.target.value)
            }
            placeholder="DD/MM/YYYY"
            className="h-[48px] w-full rounded-xl border-2 border-[#dfe1e6] bg-[#fafbfd] pl-11 pr-6 text-sm font-medium text-[#172033] outline-none transition placeholder:text-[#a1a8b5] focus:border-[#315bd1]"
          />
        </div>
      </div>

      {/* FATHER'S NAME */}
      <div>
        <label className="mb-3 block text-sm font-bold text-[#172033]">
          Father's Name
        </label>

        <div className="relative">
          <UserRound
            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8992a3]"
            strokeWidth={2}
          />

          <input
            type="text"
            value={fatherName}
            onChange={(event) =>
              setFatherName(event.target.value)
            }
            placeholder="Father's name"
            className="h-[48px] w-full rounded-xl border-2 border-[#dfe1e6] bg-[#fafbfd] pl-11 pr-6 text-sm font-medium text-[#172033] outline-none transition placeholder:text-[#a1a8b5] focus:border-[#315bd1]"
          />
        </div>
      </div>

      {/* OCR INFORMATION */}
      <div className="flex items-start gap-3 rounded-xl border border-[#d9e0f5] bg-[#eef1ff] px-4 py-3">
        <Sparkles
          className="mt-1 h-5 w-5 shrink-0 text-[#315bd1]"
          strokeWidth={2}
        />

        <p className="text-sm leading-7 text-[#3f4759]">
          PAN information can be extracted
          <br />
          automatically using OCR.
        </p>
      </div>
    </div>
  );
};

export default PanVerificationStep;





