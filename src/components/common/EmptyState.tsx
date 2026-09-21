import { Inbox } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export default function EmptyState({
  title = "No data found",
  message = "There is no information to display at the moment.",
  icon,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-5 py-12 text-center shadow-[0_8px_24px_-20px_rgba(15,23,42,0.35)] ${className}`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-50 text-slate-400">
        {icon || <Inbox size={26} />}
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-1 max-w-md text-sm text-slate-500">
        {message}
      </p>

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}