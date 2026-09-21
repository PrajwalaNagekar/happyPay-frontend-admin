import type {
  InputHTMLAttributes,
  ReactNode,
} from "react";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helper?: string;
  helperText?: string;
  icon?: ReactNode;
  required?: boolean;
  fullWidth?: boolean;
}

export default function Input({
  label,
  error,
  helper,
  helperText,
  icon,
  required = false,
  fullWidth = true,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId =
    id ||
    (label
      ? `input-${label
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")}`
      : undefined);

  const message = error || helperText || helper;

  return (
    <div className={fullWidth ? "w-full" : "w-auto"}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-2 block text-[13px] font-semibold text-slate-700"
        >
          {label}
          {required && (
            <span className="ml-1 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span
            className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 items-center justify-center text-slate-500"
            aria-hidden="true"
          >
            {icon}
          </span>
        )}

        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            message && inputId ? `${inputId}-message` : undefined
          }
          className={`min-h-[50px] w-full rounded-xl border bg-slate-50/70 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:bg-white focus:ring-4 disabled:cursor-not-allowed disabled:bg-slate-100 ${
            icon ? "pl-12" : ""
          } ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-100"
              : "border-slate-200 focus:border-[#315bd1] focus:ring-[#315bd1]/12"
          } ${className}`}
          {...props}
        />
      </div>

      {message && (
        <p
          id={inputId ? `${inputId}-message` : undefined}
          className={`mt-1.5 text-xs ${
            error ? "text-red-500" : "text-slate-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
