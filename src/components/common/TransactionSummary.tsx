import type { ReactNode } from "react";

export interface TransactionSummaryItem {
  label: string;
  value: ReactNode;
  highlight?: boolean;
}

interface TransactionSummaryProps {
  items: TransactionSummaryItem[];
  title?: string;
  className?: string;
}

export default function TransactionSummary({
  items,
  title = "Transaction Summary",
  className = "",
}: TransactionSummaryProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}
    >
      {title && (
        <h3 className="mb-4 text-base font-semibold text-slate-900">
          {title}
        </h3>
      )}

      <div className="divide-y divide-slate-100">
        {items.map((item, index) => (
          <div
            key={`${item.label}-${index}`}
            className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
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