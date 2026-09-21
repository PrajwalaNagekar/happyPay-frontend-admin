import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";

export interface ReceiptItem {
  label: string;
  value: ReactNode;
  highlight?: boolean;
}

interface ReceiptCardProps {
  title?: string;
  message?: string;
  items: ReceiptItem[];
  icon?: ReactNode;
  status?: "success" | "pending" | "failed";
  className?: string;
}

export default function ReceiptCard({
  title = "Transaction Successful",
  message,
  items,
  icon,
  status = "success",
  className = "",
}: ReceiptCardProps) {
  const statusConfig = {
    success: {
      iconClass: "bg-emerald-50 text-emerald-600",
      titleClass: "text-emerald-600",
      defaultMessage: "Your transaction has been completed successfully.",
    },
    pending: {
      iconClass: "bg-amber-50 text-amber-600",
      titleClass: "text-amber-600",
      defaultMessage: "Your transaction is currently being processed.",
    },
    failed: {
      iconClass: "bg-red-50 text-red-600",
      titleClass: "text-red-600",
      defaultMessage: "Your transaction could not be completed.",
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={`w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 ${className}`}
    >
      <div className="flex flex-col items-center text-center">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full ${config.iconClass}`}
        >
          {icon || <CheckCircle2 size={30} strokeWidth={2} />}
        </div>

        <h2
          className={`mt-4 text-xl font-bold ${config.titleClass}`}
        >
          {title}
        </h2>

        <p className="mt-1 max-w-md text-sm text-slate-500">
          {message || config.defaultMessage}
        </p>
      </div>

      <div className="mt-6 divide-y divide-slate-100 rounded-xl border border-slate-100 bg-slate-50 px-4">
        {items.map((item, index) => (
          <div
            key={`${item.label}-${index}`}
            className="flex items-center justify-between gap-4 py-3"
          >
            <span className="text-sm text-slate-500">
              {item.label}
            </span>

            <span
              className={`text-right text-sm font-medium ${
                item.highlight
                  ? "font-semibold text-[#315bd1]"
                  : "text-slate-900"
              }`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}