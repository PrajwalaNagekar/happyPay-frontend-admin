import { useMemo, useState } from "react";
import {
  ReceiptText,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Fingerprint,
  SlidersHorizontal,
  X,
  Send,
  WalletCards,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import Modal from "../../components/common/Modal";

type ServiceType = "ALL" | "AEPS" | "DMT" | "CMS";

type Transaction = {
  id: string;
  service: "AEPS" | "DMT" | "CMS";
  title: string;
  date: string;
  time: string;
  amount: number;
  type: "CREDIT" | "DEBIT";
  status: "Success" | "Pending" | "Failed";
};

const transactions: Transaction[] = [
  {
    id: "TXN001",
    service: "AEPS",
    title: "AEPS Cash Withdrawal",
    date: "04 Sep 2026",
    time: "10:42 AM",
    amount: 5000,
    type: "CREDIT",
    status: "Success",
  },
  {
    id: "TXN002",
    service: "DMT",
    title: "DMT Money Transfer",
    date: "04 Sep 2026",
    time: "09:18 AM",
    amount: 2500,
    type: "DEBIT",
    status: "Success",
  },
  {
    id: "TXN003",
    service: "CMS",
    title: "CMS Collection",
    date: "03 Sep 2026",
    time: "05:32 PM",
    amount: 8200,
    type: "CREDIT",
    status: "Success",
  },
  {
    id: "TXN004",
    service: "AEPS",
    title: "AEPS Balance Enquiry",
    date: "03 Sep 2026",
    time: "02:15 PM",
    amount: 0,
    type: "DEBIT",
    status: "Success",
  },
];

const serviceOptions: {
  value: ServiceType;
  label: string;
}[] = [
  {
    value: "ALL",
    label: "All Services",
  },
  {
    value: "AEPS",
    label: "AEPS",
  },
  {
    value: "DMT",
    label: "DMT",
  },
  {
    value: "CMS",
    label: "CMS",
  },
];

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const formatSelectedDate = (date: string) => {
  if (!date) {
    return "Date";
  }

  const selected = new Date(`${date}T00:00:00`);

  return selected.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
};

const getServiceIcon = (service: Transaction["service"]) => {
  if (service === "AEPS") {
    return Fingerprint;
  }

  if (service === "DMT") {
    return Send;
  }

  return WalletCards;
};

const getServiceIconClasses = (
  service: Transaction["service"],
) => {
  if (service === "AEPS") {
    return "bg-[#ffe6ea] text-[#e4002b]";
  }

  if (service === "DMT") {
    return "bg-[#fff2df] text-[#c56b08]";
  }

  return "bg-[#e5f7ee] text-[#087f5b]";
};

const getStatusIcon = (status: Transaction["status"]) => {
  if (status === "Success") return CheckCircle2;
  if (status === "Pending") return Clock3;
  return XCircle;
};

const getStatusClasses = (status: Transaction["status"]) => {
  if (status === "Success") return "bg-[#e5f7ee] text-[#087f5b]";
  if (status === "Pending") return "bg-[#fff2df] text-[#c56b08]";
  return "bg-[#ffe6ea] text-[#c21d3d]";
};

const getAmountClasses = (
  type: Transaction["type"],
) => {
  if (type === "CREDIT") {
    return "text-[#08a873]";
  }

  return "text-[#df4b43]";
};

export default function Transactions() {
  const [selectedDate, setSelectedDate] = useState(
    "2026-09-04",
  );

  const [draftDate, setDraftDate] = useState(
    "2026-09-04",
  );

  const [selectedService, setSelectedService] =
    useState<ServiceType>("ALL");

  const [showDatePicker, setShowDatePicker] =
    useState(false);

  const [showServiceMenu, setShowServiceMenu] =
    useState(false);

  const [calendarMonth, setCalendarMonth] = useState(
    new Date(2026, 8, 1),
  );

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesService =
        selectedService === "ALL" ||
        transaction.service === selectedService;

      if (!matchesService) {
        return false;
      }

      if (!selectedDate) {
        return true;
      }

      const transactionDate = new Date(
        transaction.date.replace(
          /(\d{2}) (\w{3}) (\d{4})/,
          "$2 $1, $3",
        ),
      );

      const filterDate = new Date(
        `${selectedDate}T00:00:00`,
      );

      if (
        Number.isNaN(transactionDate.getTime())
      ) {
        return true;
      }

      return (
        transactionDate.getFullYear() ===
          filterDate.getFullYear() &&
        transactionDate.getMonth() ===
          filterDate.getMonth() &&
        transactionDate.getDate() ===
          filterDate.getDate()
      );
    });
  }, [selectedDate, selectedService]);

  const calendarYear =
    calendarMonth.getFullYear();

  const calendarMonthIndex =
    calendarMonth.getMonth();

  const firstDay = new Date(
    calendarYear,
    calendarMonthIndex,
    1,
  ).getDay();

  const daysInMonth = new Date(
    calendarYear,
    calendarMonthIndex + 1,
    0,
  ).getDate();

  const monthName =
    calendarMonth.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

  const selectedDateObject = selectedDate
    ? new Date(`${selectedDate}T00:00:00`)
    : null;

  const isSelectedDay = (day: number) => {
    if (!selectedDateObject) {
      return false;
    }

    return (
      selectedDateObject.getFullYear() ===
        calendarYear &&
      selectedDateObject.getMonth() ===
        calendarMonthIndex &&
      selectedDateObject.getDate() === day
    );
  };

  const handleOpenDatePicker = () => {
    setDraftDate(selectedDate);
    setShowDatePicker(true);
  };

  const handleCancelDate = () => {
    setDraftDate(selectedDate);
    setShowDatePicker(false);
  };

  const handleApplyDate = () => {
    setSelectedDate(draftDate);
    setShowDatePicker(false);
  };

  const handleDateSelect = (day: number) => {
    const month = String(
      calendarMonthIndex + 1,
    ).padStart(2, "0");

    const formattedDay = String(day).padStart(
      2,
      "0",
    );

    setDraftDate(
      `${calendarYear}-${month}-${formattedDay}`,
    );
  };

  const handlePreviousMonth = () => {
    setCalendarMonth(
      new Date(
        calendarYear,
        calendarMonthIndex - 1,
        1,
      ),
    );
  };

  const handleNextMonth = () => {
    setCalendarMonth(
      new Date(
        calendarYear,
        calendarMonthIndex + 1,
        1,
      ),
    );
  };

  const handleServiceSelect = (
    service: ServiceType,
  ) => {
    setSelectedService(service);
    setShowServiceMenu(false);
  };

  const clearDate = () => {
    setSelectedDate("");
  };

  const selectedServiceLabel =
    serviceOptions.find(
      (option) =>
        option.value === selectedService,
    )?.label || "All Services";

  return (
    <div>
      <main className="pb-4">
        <div className="mx-auto w-full max-w-[900px]">

          {/* Header */}
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#edf1fc] text-[#172033]">
              <ReceiptText className="h-5 w-5" strokeWidth={2} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#172033]">
                Transactions
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                View your complete transaction history
              </p>
            </div>
          </div>

          {/* Filters */}
          <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-[0_8px_24px_-20px_rgba(15,23,42,0.32)] sm:p-4">
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">

              {/* Date */}
              <button
                type="button"
                onClick={handleOpenDatePicker}
                className={`flex min-h-[50px] items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition ${
                  selectedDate
                    ? "border-[#172033]/15 bg-[#f6f7f9] text-[#172033]"
                    : "border-slate-200 bg-white text-[#4b5563] hover:bg-slate-50"
                }`}
              >
                {selectedDate ? (
                  <X
                    className="h-4.5 w-4.5 shrink-0"
                    onClick={(event) => {
                      event.stopPropagation();
                      clearDate();
                    }}
                  />
                ) : (
                  <CalendarDays className="h-4.5 w-4.5 shrink-0" />
                )}

                <span>
                  {selectedDate
                    ? formatSelectedDate(
                        selectedDate,
                      )
                    : "Date"}
                </span>
              </button>

              {/* Service */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setShowServiceMenu(
                      (previous) => !previous,
                    )
                  }
                  className={`flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition ${
                    selectedService !== "ALL"
                      ? "border-[#172033]/15 bg-[#f6f7f9] text-[#172033]"
                      : "border-slate-200 bg-white text-[#4b5563] hover:bg-slate-50"
                  }`}
                >
                  <SlidersHorizontal className="h-4.5 w-4.5 shrink-0" />

                  <span>
                    {selectedService === "ALL"
                      ? "Service"
                      : selectedServiceLabel}
                  </span>
                </button>

                {showServiceMenu && (
                  <div className="absolute right-0 top-[58px] z-30 w-[205px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_16px_35px_-16px_rgba(15,23,42,0.35)]">
                    {serviceOptions.map(
                      (option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() =>
                            handleServiceSelect(
                              option.value,
                            )
                          }
                          className={`block w-full px-5 py-3.5 text-left text-sm font-semibold transition ${
                            selectedService ===
                            option.value
                              ? "bg-[#f0f2f5] text-[#172033]"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {option.label}
                        </button>
                      ),
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Transaction List */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_28px_-22px_rgba(15,23,42,0.32)] px-5 py-1 sm:px-6">
            {filteredTransactions.length ===
            0 ? (
              <div className="px-4 py-14 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f0f2f5] text-[#172033]">
                  <CalendarDays className="h-7 w-7" />
                </div>

                <h2 className="mt-4 text-lg font-bold text-[#172033]">
                  No transactions found
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Try another date or service.
                </p>

              </div>
            ) : (
              filteredTransactions.map(
                (transaction, index) => {
                  const Icon = getServiceIcon(
                    transaction.service,
                  );
                  const StatusIcon = getStatusIcon(
                    transaction.status,
                  );

                  const isLast =
                    index ===
                    filteredTransactions.length -
                      1;

                  return (
                    <div
                      key={transaction.id}
                      className={`group flex items-center gap-3 py-3.5 transition-colors hover:bg-slate-50/60 ${
                        !isLast
                          ? "border-b border-slate-100"
                          : ""
                      }`}
                    >

                      {/* Service Icon */}
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${getServiceIconClasses(
                          transaction.service,
                        )}`}
                      >
                        <Icon className="h-[18px] w-[18px]" />
                      </div>

                      {/* Details */}
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-bold text-[#172033]">
                          {transaction.title}
                        </h3>

                        <p className="mt-0.5 text-xs text-[#9aa0ab]">
                          {transaction.date} •{" "}
                          {transaction.time}
                        </p>
                      </div>

                      {/* Amount + Status */}
                      <div className="shrink-0 text-right">

                        <p
                          className={`text-sm font-bold ${getAmountClasses(
                            transaction.type,
                          )}`}
                        >
                          {transaction.type ===
                          "CREDIT"
                            ? "+"
                            : "-"}{" "}
                          ₹
                          {formatAmount(
                            transaction.amount,
                          )}
                        </p>

                        <span className={`mt-1 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${getStatusClasses(transaction.status)}`}>
                          <StatusIcon className="h-3 w-3" />
                          {transaction.status}
                        </span>

                      </div>

                    </div>
                  );
                },
              )
            )}
          </section>

        </div>
      </main>

      {/* Date Picker */}
      <Modal
        open={showDatePicker}
        onClose={handleCancelDate}
        title="Select date"
        size="lg"
      >
        <div className="-mx-1">

          {/* Selected date */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-5">

            <div>
              <p className="text-2xl font-bold text-[#172033]">
                {draftDate
                  ? new Date(
                      `${draftDate}T00:00:00`,
                    ).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      },
                    )
                  : "Select a date"}
              </p>
            </div>

            <CalendarDays className="h-7 w-7 text-[#172033]" />

          </div>

          {/* Calendar Header */}
          <div className="mt-4 flex items-center justify-between">

            <p className="text-lg font-bold text-[#172033]">
              {monthName}
            </p>

            <div className="flex items-center gap-2">

              <button
                type="button"
                onClick={handlePreviousMonth}
                className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100"
              >
                <ChevronLeft className="h-[18px] w-[18px]" />
              </button>

              <button
                type="button"
                onClick={handleNextMonth}
                className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100"
              >
                <ChevronRight className="h-[18px] w-[18px]" />
              </button>

            </div>

          </div>

          {/* Weekdays */}
          <div className="mt-4 grid grid-cols-7 text-center">
            {[
              "S",
              "M",
              "T",
              "W",
              "T",
              "F",
              "S",
            ].map((day, index) => (
              <div
                key={`${day}-${index}`}
                className="text-sm font-semibold text-slate-500"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="mt-2 grid grid-cols-7 gap-y-1 text-center">

            {Array.from({
              length: firstDay,
            }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="h-9"
              />
            ))}

            {Array.from({
              length: daysInMonth,
            }).map((_, index) => {
              const day = index + 1;

              const selected =
                isSelectedDay(day);

              return (
                <div
                  key={day}
                  className="flex h-11 items-center justify-center"
                >
                  <button
                    type="button"
                    onClick={() =>
                      handleDateSelect(day)
                    }
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition ${
                      selected
                        ? "bg-[#172033] text-white shadow-sm"
                        : "text-[#172033] hover:bg-[#f0f2f5]"
                    }`}
                  >
                    {day}
                  </button>
                </div>
              );
            })}

          </div>

          {/* Actions */}
          <div className="mt-4 flex justify-end gap-6 border-t border-slate-100 pt-4">

            <button
              type="button"
              onClick={handleCancelDate}
              className="px-3 py-2 text-base font-bold text-[#172033]"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleApplyDate}
              className="px-3 py-2 text-base font-bold text-[#172033]"
            >
              OK
            </button>

          </div>

        </div>
      </Modal>
    </div>
  );
}