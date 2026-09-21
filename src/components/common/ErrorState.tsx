import { AlertCircle, RefreshCw } from "lucide-react";
import type { ReactNode } from "react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  icon?: ReactNode;
  action?: ReactNode;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load the requested information. Please try again.",
  icon,
  action,
  onRetry,
  retryLabel = "Try Again",
  className = "",
}: ErrorStateProps) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center rounded-2xl border border-red-100 bg-white px-5 py-12 text-center shadow-[0_8px_24px_-20px_rgba(15,23,42,0.35)] ${className}`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
        {icon || <AlertCircle size={28} />}
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-1 max-w-md text-sm text-slate-500">
        {message}
      </p>

      {(onRetry || action) && (
        <div className="mt-5 flex items-center justify-center gap-3">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#315bd1] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#274dbd] focus:outline-none focus:ring-2 focus:ring-[#315bd1] focus:ring-offset-2"
            >
              <RefreshCw size={16} />
              {retryLabel}
            </button>
          )}

          {action}
        </div>
      )}
    </div>
  );
}