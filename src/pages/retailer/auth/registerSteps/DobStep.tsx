import { useState } from "react";
import {
  CalendarDays,
  ArrowLeftRight,
  MoreHorizontal,
} from "lucide-react";

const DobStep = () => {
  const [dateOfBirth, setDateOfBirth] = useState("");

  return (
    <div className="space-y-5">
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
            inputMode="numeric"
            className="h-[48px] w-full rounded-xl border-2 border-[#dfe1e6] bg-[#fafbfd] pl-11 pr-6 text-sm font-medium text-[#172033] outline-none transition placeholder:text-[#a1a8b5] focus:border-[#315bd1]"
          />
        </div>
      </div>

      {/* DOB VERIFICATION WARNING */}
      <div className="flex items-start gap-3 rounded-xl border-2 border-[#f3d6a5] bg-[#fff2df] px-4 py-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center">
          <MoreHorizontal
            className="h-9 w-9 text-[#e69a22]"
            strokeWidth={2.4}
          />
        </div>

        <p className="text-sm leading-7 text-[#3f3f46]">
          DOB verification will compare PAN, Aadhaar
          <br />
          and retailer-entered information.
        </p>
      </div>

      {/* INFORMATION MESSAGE */}
      <div className="flex items-start gap-3 rounded-xl border border-[#d9e0f5] bg-[#eef1ff] px-4 py-3">
        <ArrowLeftRight
          className="mt-1 h-5 w-5 shrink-0 text-[#315bd1]"
          strokeWidth={2}
        />

        <p className="text-sm leading-7 text-[#4a5263]">
          Your date of birth will be compared with the
          <br />
          information from PAN and Aadhaar.
        </p>
      </div>
    </div>
  );
};

export default DobStep;





