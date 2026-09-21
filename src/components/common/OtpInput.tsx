import { useEffect, useRef } from "react";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  error?: string;
  onResend?: () => void;
  resendDisabled?: boolean;
  resendSeconds?: number;
}

export default function OtpInput({
  value,
  onChange,
  length = 6,
  disabled = false,
  error,
  onResend,
  resendDisabled = false,
  resendSeconds = 0,
}: OtpInputProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (value.length > length) {
      onChange(value.slice(0, length));
    }
  }, [value, length, onChange]);

  const handleChange = (index: number, inputValue: string) => {
    const digit = inputValue.replace(/\D/g, "").slice(-1);

    const otpArray = value.padEnd(length, "").split("");
    otpArray[index] = digit;

    const newOtp = otpArray.join("").slice(0, length);

    onChange(newOtp);

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace") {
      if (value[index]) {
        const otpArray = value.split("");
        otpArray[index] = "";

        onChange(otpArray.join(""));
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();

        const otpArray = value.split("");
        otpArray[index - 1] = "";

        onChange(otpArray.join(""));
      }
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (
    event: React.ClipboardEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();

    const pastedOtp = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (!pastedOtp) return;

    onChange(pastedOtp);

    const focusIndex = Math.min(pastedOtp.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  const getDigit = (index: number) => value[index] || "";

  return (
    <div className="w-full">
      <div className="flex justify-center gap-2 sm:gap-3">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            maxLength={1}
            value={getDigit(index)}
            disabled={disabled}
            onChange={(event) =>
              handleChange(index, event.target.value)
            }
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            aria-label={`OTP digit ${index + 1}`}
            className={`h-12 w-12 rounded-xl border bg-white text-center text-lg font-semibold text-slate-900 outline-none transition focus:ring-2 sm:h-14 sm:w-14 ${
              error
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-200 focus:border-[#315bd1] focus:ring-[#315bd1]/20"
            } ${
              disabled
                ? "cursor-not-allowed bg-slate-100 text-slate-400"
                : ""
            }`}
          />
        ))}
      </div>

      {error && (
        <p className="mt-2 text-center text-sm text-red-500">
          {error}
        </p>
      )}

      {onResend && (
        <div className="mt-4 flex items-center justify-center">
          {resendDisabled && resendSeconds > 0 ? (
            <p className="text-sm text-slate-500">
              Resend OTP in{" "}
              <span className="font-semibold text-slate-700">
                {resendSeconds}s
              </span>
            </p>
          ) : (
            <button
              type="button"
              onClick={onResend}
              disabled={disabled || resendDisabled}
              className="text-sm font-semibold text-[#315bd1] transition hover:text-[#274dbd] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Resend OTP
            </button>
          )}
        </div>
      )}
    </div>
  );
}