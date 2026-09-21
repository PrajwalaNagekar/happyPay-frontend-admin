import type {
  SelectHTMLAttributes,
  ReactNode,
} from "react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  required?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
}

export default function Select({
  label,
  options,
  error,
  helperText,
  leftIcon,
  required = false,
  fullWidth = true,
  placeholder = "Select an option",
  className = "",
  id,
  ...props
}: SelectProps) {
  const selectId =
    id ||
    `select-${label?.toLowerCase().replace(/\s+/g, "-") || "field"}`;

  return (
    <div className={fullWidth ? "w-full" : ""}>
      {label && (
        <label
          htmlFor={selectId}
          className="mb-1.5 block text-[13px] font-semibold text-slate-700"
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
        {leftIcon && (
          <div className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-400">
            {leftIcon}
          </div>
        )}

        <select
          id={selectId}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${selectId}-error`
              : helperText
                ? `${selectId}-helper`
                : undefined
          }
          className={`h-12 appearance-none rounded-xl border bg-slate-50/70 text-sm text-slate-900 outline-none transition hover:border-slate-300 focus:bg-white focus:ring-4 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 ${
            leftIcon ? "pl-10" : "px-3.5"
          } ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-100"
              : "border-slate-200 focus:border-[#315bd1] focus:ring-[#315bd1]/20"
          } ${fullWidth ? "w-full" : ""} ${className}`}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      {error ? (
        <p
          id={`${selectId}-error`}
          className="mt-1.5 text-xs text-red-500"
        >
          {error}
        </p>
      ) : helperText ? (
        <p
          id={`${selectId}-helper`}
          className="mt-1.5 text-xs text-slate-500"
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
}