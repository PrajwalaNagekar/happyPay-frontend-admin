import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  const variantClasses = {
    primary:
      "bg-[#315bd1] text-white hover:opacity-90 focus:ring-[#315bd1]",
    secondary:
      "bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-300",
    outline:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
    danger:
      "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",
    ghost:
      "bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-300",
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-sm",
  };

  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {loading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}

      {children}
    </button>
  );
}
