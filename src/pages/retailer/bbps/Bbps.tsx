import React, { useMemo, useState } from "react";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  Banknote,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  FileText,
  GraduationCap,
  Hash,
  Landmark,
  Menu,
  MessageCircle,
  Printer,
  Receipt,
  Search,
  ShieldCheck,
  Star,
  TrendingUp,
  Wallet,
  X,
  Zap,
} from "lucide-react";

type CategoryKey =
  | "electricity"
  | "water"
  | "pipedGas"
  | "lpgGas"
  | "fastag"
  | "insurance"
  | "loan"
  | "education"
  | "municipal";

type StateName =
  | "All States"
  | "Delhi NCR"
  | "Maharashtra"
  | "Uttar Pradesh"
  | "Karnataka"
  | "Gujarat"
  | "Tamil Nadu";

type Biller = {
  id: string;
  name: string;
  state: StateName;
  commission: number;
  fetchEnabled: boolean;
};

type Category = {
  id: CategoryKey;
  label: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  badge?: string;
};

type BillDetails = {
  customerName: string;
  billNumber: string;
  billDate: string;
  dueDate: string;
  billingPeriod: string;
  amount: number;
};

const categories: Category[] = [
  {
    id: "electricity",
    label: "Electricity",
    icon: <Zap size={28} />,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    badge: "Instant",
  },
  {
    id: "water",
    label: "Water",
    icon: <span className="text-[24px]">💧</span>,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-500",
  },
  {
    id: "pipedGas",
    label: "Piped Gas",
    icon: <span className="text-[24px]">🔥</span>,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    id: "lpgGas",
    label: "LPG Gas",
    icon: <Banknote size={27} />,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
  },
  {
    id: "fastag",
    label: "Fastag",
    icon: <span className="text-[24px]">🚗</span>,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    badge: "Popular",
  },
  {
    id: "insurance",
    label: "Insurance",
    icon: <ShieldCheck size={27} />,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
  },
  {
    id: "loan",
    label: "Loan EMI",
    icon: <Wallet size={27} />,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-500",
  },
  {
    id: "education",
    label: "Education",
    icon: <GraduationCap size={27} />,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
  },
  {
    id: "municipal",
    label: "Municipal",
    icon: <Building2 size={27} />,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-500",
  },
];

const billersByCategory: Record<CategoryKey, Biller[]> = {
  electricity: [
    {
      id: "bescom",
      name: "Bangalore Electricity Supply Company (BESCOM)",
      state: "Karnataka",
      commission: 2,
      fetchEnabled: true,
    },
    {
      id: "tneb",
      name: "Tamil Nadu Generation & Distribution Corporation",
      state: "Tamil Nadu",
      commission: 2,
      fetchEnabled: true,
    },
    {
      id: "bseb",
      name: "Bihar State Electricity Board",
      state: "All States",
      commission: 2,
      fetchEnabled: true,
    },
    {
      id: "uppcl",
      name: "Uttar Pradesh Power Corporation Limited",
      state: "Uttar Pradesh",
      commission: 2,
      fetchEnabled: true,
    },
  ],

  water: [
    {
      id: "djb",
      name: "Delhi Jal Board (DJB)",
      state: "Delhi NCR",
      commission: 2,
      fetchEnabled: true,
    },
    {
      id: "bwssb",
      name: "Bangalore Water Supply & Sewerage Board",
      state: "Karnataka",
      commission: 2,
      fetchEnabled: true,
    },
    {
      id: "mjp",
      name: "Maharashtra Jeevan Pradhikaran",
      state: "Maharashtra",
      commission: 2,
      fetchEnabled: true,
    },
  ],

  pipedGas: [
    {
      id: "igl",
      name: "Indraprastha Gas Limited (IGL)",
      state: "Delhi NCR",
      commission: 2.5,
      fetchEnabled: true,
    },
    {
      id: "mgl",
      name: "Mahanagar Gas Limited (MGL)",
      state: "Maharashtra",
      commission: 2.5,
      fetchEnabled: true,
    },
  ],

  lpgGas: [
    {
      id: "indane",
      name: "Indane Gas (Indian Oil)",
      state: "All States",
      commission: 2,
      fetchEnabled: true,
    },
    {
      id: "bharatgas",
      name: "Bharat Gas (BPCL)",
      state: "All States",
      commission: 2,
      fetchEnabled: true,
    },
    {
      id: "hp",
      name: "HP Gas",
      state: "All States",
      commission: 2,
      fetchEnabled: true,
    },
  ],

  fastag: [
    {
      id: "icici-fastag",
      name: "ICICI Bank FASTag",
      state: "All States",
      commission: 2.5,
      fetchEnabled: true,
    },
    {
      id: "hdfc-fastag",
      name: "HDFC Bank FASTag",
      state: "All States",
      commission: 2.5,
      fetchEnabled: true,
    },
  ],

  insurance: [
    {
      id: "lic",
      name: "Life Insurance Corporation of India (LIC)",
      state: "All States",
      commission: 5,
      fetchEnabled: true,
    },
    {
      id: "sbi-life",
      name: "SBI Life Insurance",
      state: "All States",
      commission: 5,
      fetchEnabled: true,
    },
  ],

  loan: [
    {
      id: "hdfc-loan",
      name: "HDFC Bank Loan",
      state: "All States",
      commission: 3,
      fetchEnabled: true,
    },
    {
      id: "icici-loan",
      name: "ICICI Bank Loan",
      state: "All States",
      commission: 3,
      fetchEnabled: true,
    },
  ],

  education: [
    {
      id: "school-fee",
      name: "ABC Education Services",
      state: "All States",
      commission: 2,
      fetchEnabled: true,
    },
    {
      id: "university",
      name: "National Education Payments",
      state: "All States",
      commission: 2,
      fetchEnabled: true,
    },
  ],

  municipal: [
    {
      id: "bbmp",
      name: "Bruhat Bengaluru Mahanagara Palike (BBMP)",
      state: "Karnataka",
      commission: 2,
      fetchEnabled: true,
    },
    {
      id: "ndmc",
      name: "New Delhi Municipal Council (NDMC)",
      state: "Delhi NCR",
      commission: 2,
      fetchEnabled: true,
    },
  ],
};

const states: StateName[] = [
  "All States",
  "Delhi NCR",
  "Maharashtra",
  "Uttar Pradesh",
  "Karnataka",
  "Gujarat",
  "Tamil Nadu",
];

const categoryFieldConfig: Record<
  CategoryKey,
  {
    label: string;
    placeholder: string;
    secondLabel?: string;
    secondPlaceholder?: string;
  }
> = {
  electricity: {
    label: "Consumer Number",
    placeholder: "Enter consumer number",
  },
  water: {
    label: "K Number",
    placeholder: "Enter K number",
  },
  pipedGas: {
    label: "BP Number (Business Partner)",
    placeholder: "Enter 10-digit BP Number",
  },
  lpgGas: {
    label: "Registered Mobile Number",
    placeholder: "Enter 10-digit mobile number",
  },
  fastag: {
    label: "Vehicle Registration Number",
    placeholder: "DL01AB1234",
  },
  insurance: {
    label: "Policy Number",
    placeholder: "Enter policy number",
    secondLabel: "Date of Birth (DD/MM/YYYY)",
    secondPlaceholder: "15/08/1988",
  },
  loan: {
    label: "Loan Account Number",
    placeholder: "Enter loan account number",
  },
  education: {
    label: "Student / Registration Number",
    placeholder: "Enter student number",
  },
  municipal: {
    label: "Property / Consumer Number",
    placeholder: "Enter property number",
  },
};

const initialWalletBalance = 24580.5;

const formatCurrency = (value: number) =>
  `₹${value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const getCategoryLabel = (id: CategoryKey) =>
  categories.find((category) => category.id === id)?.label ?? "BBPS";

const getDefaultBillAmount = (category: CategoryKey) => {
  switch (category) {
    case "electricity":
      return 2808;
    case "water":
      return 1450;
    case "pipedGas":
      return 1161;
    case "lpgGas":
      return 1161;
    case "fastag":
      return 1818;
    case "insurance":
      return 835;
    case "loan":
      return 4250;
    case "education":
      return 3250;
    case "municipal":
      return 2100;
    default:
      return 1161;
  }
};

const getFieldValue = (
  category: CategoryKey,
  values: Record<string, string>,
): string => {
  const config = categoryFieldConfig[category];
  return values[config.label] ?? "";
};

const createBillNumber = () =>
  `BR202609/${Math.floor(10000 + Math.random() * 89999)}`;

const createReference = () =>
  `BBP20260923${Math.floor(100000 + Math.random() * 899999)}`;

const createTransactionId = () =>
  `TXN${Math.floor(100000000 + Math.random() * 899999999)}`;

const BBPS = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryKey>("electricity");

  const [selectedBiller, setSelectedBiller] = useState<Biller>(
    billersByCategory.electricity[0],
  );

  const [selectedState, setSelectedState] =
    useState<StateName>("All States");

  const [showBillerModal, setShowBillerModal] = useState(false);

  const [billerSearch, setBillerSearch] = useState("");

  const [consumerValues, setConsumerValues] = useState<
    Record<string, string>
  >({});

  const [billDetails, setBillDetails] = useState<BillDetails | null>(null);

  const [paymentAmount, setPaymentAmount] = useState("");

  const [consent, setConsent] = useState(false);

  const [screen, setScreen] = useState<
    "form" | "bill" | "success"
  >("form");

  const [isFetching, setIsFetching] = useState(false);

  const [isPaying, setIsPaying] = useState(false);

  const [walletBalance, setWalletBalance] =
    useState(initialWalletBalance);

  const [transactionId, setTransactionId] = useState("");

  const [bbpsReference, setBbpsReference] = useState("");

  const [, setBillNumber] = useState("");

  const [paymentDate, setPaymentDate] = useState("");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentCommission = selectedBiller.commission;

  const filteredBillers = useMemo(() => {
    const allBillers = billersByCategory[selectedCategory];

    const stateFiltered =
      selectedState === "All States"
        ? allBillers
        : allBillers.filter(
            (biller) =>
              biller.state === selectedState ||
              biller.state === "All States",
          );

    if (!billerSearch.trim()) {
      return stateFiltered;
    }

    return stateFiltered.filter((biller) =>
      biller.name
        .toLowerCase()
        .includes(billerSearch.toLowerCase()),
    );
  }, [selectedCategory, selectedState, billerSearch]);

  const handleCategoryChange = (category: CategoryKey) => {
    setSelectedCategory(category);

    const firstBiller = billersByCategory[category][0];

    setSelectedBiller(firstBiller);
    setSelectedState("All States");
    setBillerSearch("");
    setConsumerValues({});
    setBillDetails(null);
    setPaymentAmount("");
    setConsent(false);
    setScreen("form");
  };

  const handleBillerSelect = (biller: Biller) => {
    setSelectedBiller(biller);
    setShowBillerModal(false);
    setBillerSearch("");

    setConsumerValues({});
    setBillDetails(null);
    setPaymentAmount("");
    setConsent(false);
    setScreen("form");
  };

  const handleStateChange = (state: StateName) => {
    setSelectedState(state);
  };

  const handleInputChange = (
    field: string,
    value: string,
  ) => {
    setConsumerValues((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const fetchBillDetails = () => {
    const config = categoryFieldConfig[selectedCategory];

    const primaryValue = getFieldValue(
      selectedCategory,
      consumerValues,
    );

    if (!primaryValue.trim()) {
      alert(`Please enter ${config.label}.`);
      return;
    }

    if (
      config.secondLabel &&
      !consumerValues[config.secondLabel]?.trim()
    ) {
      alert(`Please enter ${config.secondLabel}.`);
      return;
    }

    setIsFetching(true);

    window.setTimeout(() => {
      const amount = getDefaultBillAmount(selectedCategory);

      const details: BillDetails = {
        customerName: "RAMESH CHANDRA SHARMA",
        billNumber: createBillNumber(),
        billDate: "09 Sep 2026",
        dueDate: "30 Sep 2026",
        billingPeriod: "01 Aug 2026 - 30 Sep 2026",
        amount,
      };

      setBillDetails(details);
      setPaymentAmount(amount.toFixed(2));
      setIsFetching(false);
      setScreen("bill");
    }, 700);
  };

  const handlePayNow = () => {
    if (!billDetails) {
      return;
    }

    if (!consent) {
      alert(
        "Please confirm that the customer has handed over cash and consented to the bill payment.",
      );
      return;
    }

    const amount = Number(paymentAmount);

    if (!amount || amount <= 0) {
      alert("Please enter a valid payment amount.");
      return;
    }

    if (amount > walletBalance) {
      alert("Insufficient wallet balance.");
      return;
    }

    setIsPaying(true);

    window.setTimeout(() => {
      const transaction = createTransactionId();
      const reference = createReference();
      const newBillNumber = billDetails.billNumber;

      const newWalletBalance =
        walletBalance - amount + currentCommission;

      setWalletBalance(newWalletBalance);

      setTransactionId(transaction);
      setBbpsReference(reference);
      setBillNumber(newBillNumber);

      setPaymentDate(
        new Date().toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      );

      setIsPaying(false);
      setScreen("success");
    }, 900);
  };

  const resetPayment = () => {
    setConsumerValues({});
    setBillDetails(null);
    setPaymentAmount("");
    setConsent(false);
    setTransactionId("");
    setBbpsReference("");
    setBillNumber("");
    setPaymentDate("");
    setScreen("form");
  };

  const openBillerModal = () => {
    setBillerSearch("");
    setShowBillerModal(true);
  };

  const renderHeader = () => (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-[68px] max-w-[960px] items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (screen === "success") {
                setScreen("bill");
                return;
              }

              if (screen === "bill") {
                setScreen("form");
                return;
              }

              window.history.back();
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100"
            aria-label="Go back"
          >
            <ArrowLeft size={25} className="text-slate-800" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Bharat BillPay (BBPS)
              </h1>

              <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-[#7c3aed]">
                NPCI
              </span>
            </div>

            <p className="hidden text-xs text-slate-500 sm:block">
              Bill payment & collection services
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((value) => !value)}
          className="rounded-lg p-2 hover:bg-slate-100"
        >
          <Menu size={22} />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-3">
          <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
            <div className="flex items-center gap-3">
              <Wallet
                size={20}
                className="text-[#7c3aed]"
              />
              <span className="text-sm text-slate-600">
                Retailer Wallet
              </span>
            </div>

            <strong className="text-[#7c3aed]">
              {formatCurrency(walletBalance)}
            </strong>
          </div>
        </div>
      )}
    </header>
  );

  const renderCategorySection = () => (
    <section>
      <h2 className="mb-4 text-lg font-bold text-slate-900">
        Select Biller Category
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
        {categories.map((category) => {
          const active =
            selectedCategory === category.id;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() =>
                handleCategoryChange(category.id)
              }
              className={`relative flex min-h-[112px] flex-col items-center justify-center rounded-2xl border-2 bg-white px-2 py-4 transition ${
                active
                  ? "border-[#7c3aed] bg-[#faf5ff] shadow-sm"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              {category.badge && (
                <span className="absolute right-2 top-2 rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                  {category.badge}
                </span>
              )}

              <div
                className={`mb-3 flex h-14 w-14 items-center justify-center rounded-2xl ${category.iconBg} ${category.iconColor}`}
              >
                {category.icon}
              </div>

              <span
                className={`text-sm font-medium ${
                  active
                    ? "text-[#7c3aed]"
                    : "text-slate-800"
                }`}
              >
                {category.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );

  const renderBillerSelector = () => (
    <section className="mt-8">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">
          Select Operator / Biller
        </h2>

        <button
          type="button"
          onClick={openBillerModal}
          className="text-sm font-semibold text-[#7c3aed]"
        >
          Change State ({selectedState})
        </button>
      </div>

      <button
        type="button"
        onClick={openBillerModal}
        className="flex w-full items-center justify-between rounded-2xl border-2 border-slate-300 bg-white p-4 text-left hover:border-[#7c3aed]"
      >
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-[#7c3aed]">
            <Landmark size={28} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-base font-bold text-slate-900 sm:text-lg">
              {selectedBiller.name}
            </p>

            <p className="mt-1 text-sm font-medium text-emerald-600">
              {selectedBiller.state} • Comm:{" "}
              {formatCurrency(
                selectedBiller.commission,
              )}
            </p>
          </div>
        </div>

        <ChevronDown
          size={25}
          className="shrink-0 text-slate-800"
        />
      </button>
    </section>
  );

  const renderConsumerForm = () => {
    const config = categoryFieldConfig[selectedCategory];

    return (
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-slate-900">
          Enter Consumer Details
        </h2>

        <div
          className={
            config.secondLabel
              ? "grid gap-5 md:grid-cols-2"
              : "grid gap-5"
          }
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">
              {config.label}
            </label>

            <div className="relative">
              <Hash
                size={23}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7c3aed]"
              />

              <input
                type="text"
                value={
                  consumerValues[config.label] ?? ""
                }
                onChange={(event) =>
                  handleInputChange(
                    config.label,
                    event.target.value,
                  )
                }
                placeholder={config.placeholder}
                className="h-16 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 pl-14 pr-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#7c3aed] focus:bg-white"
              />
            </div>
          </div>

          {config.secondLabel && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">
                {config.secondLabel}
              </label>

              <div className="relative">
                <CalendarDays
                  size={23}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7c3aed]"
                />

                <input
                  type="text"
                  value={
                    consumerValues[
                      config.secondLabel
                    ] ?? ""
                  }
                  onChange={(event) =>
                    handleInputChange(
                      config.secondLabel!,
                      event.target.value,
                    )
                  }
                  placeholder={
                    config.secondPlaceholder
                  }
                  className="h-16 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 pl-14 pr-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#7c3aed] focus:bg-white"
                />
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={fetchBillDetails}
          disabled={isFetching}
          className="mt-7 flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-[#7c3aed] text-lg font-bold text-white shadow-md transition hover:bg-[#6d28d9] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <ArrowDownToLine size={25} />

          {isFetching
            ? "Fetching Bill Details..."
            : "Fetch Bill Details"}
        </button>
      </section>
    );
  };

  const renderFormScreen = () => (
    <>
      <div className="mb-7 rounded-2xl border border-[#e9ddff] bg-[#faf7ff] p-5">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#7c3aed] text-white">
            <Receipt size={18} />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              BBPS Bill Payment
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              Pay utility bills, insurance, FASTag,
              education fees and other BBPS services with
              instant receipt generation.
            </p>
          </div>
        </div>
      </div>

      {renderCategorySection()}
      {renderBillerSelector()}
      {renderConsumerForm()}
    </>
  );

  const renderBillDetails = () => {
    if (!billDetails) {
      return null;
    }

    return (
      <div className="space-y-6">
        <section className="rounded-2xl border-2 border-[#ddd1f7] bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500">
                <Receipt size={28} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#7c3aed]">
                  Bill Details Fetched
                </h2>

                <p className="text-sm text-slate-600">
                  {selectedBiller.name}
                </p>
              </div>
            </div>

            <span className="rounded-lg bg-amber-100 px-3 py-2 text-xs font-bold text-amber-700">
              UNPAID
            </span>
          </div>

          <div className="my-5 border-t border-slate-200" />

          <div className="space-y-4">
            <BillRow
              label="Customer Name"
              value={billDetails.customerName}
              strong
            />

            <BillRow
              label="Bill Number"
              value={billDetails.billNumber}
              strong
            />

            <BillRow
              label="Bill Date"
              value={billDetails.billDate}
            />

            <BillRow
              label="Due Date"
              value={billDetails.dueDate}
              valueClass="text-red-600"
            />

            <BillRow
              label="Billing Period"
              value={billDetails.billingPeriod}
            />
          </div>

          <div className="my-5 border-t border-slate-200" />

          <div className="flex items-center justify-between gap-4">
            <span className="text-lg font-bold text-slate-900">
              Total Amount Due
            </span>

            <span className="text-2xl font-bold text-[#7c3aed]">
              {formatCurrency(billDetails.amount)}
            </span>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-5 text-xl font-bold text-slate-900">
            Payment Amount
          </h2>

          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-3xl font-bold text-[#7c3aed]">
              ₹
            </span>

            <input
              type="number"
              value={paymentAmount}
              onChange={(event) =>
                setPaymentAmount(event.target.value)
              }
              className="h-24 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 pl-20 pr-5 text-4xl font-bold text-slate-900 outline-none focus:border-[#7c3aed] focus:bg-white"
            />
          </div>

          <p className="mt-2 text-center text-sm text-slate-600">
            Full bill amount mandatory for this biller
          </p>

          <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#f3f4fa] px-5 py-4">
            <div className="flex items-center gap-3">
              <Wallet
                size={22}
                className="text-[#7c3aed]"
              />

              <span className="text-sm text-slate-700 sm:text-base">
                Retailer Wallet Balance:
              </span>
            </div>

            <strong className="text-[#7c3aed]">
              {formatCurrency(walletBalance)}
            </strong>
          </div>

          <div className="mt-5 flex items-center gap-2 text-base font-semibold text-emerald-600">
            <Star size={20} fill="currentColor" />
            Commission to earn: +{" "}
            {formatCurrency(currentCommission)}{" "}
            (Instant Credit)
          </div>
        </section>

        <label className="flex cursor-pointer items-start gap-3 px-1">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) =>
              setConsent(event.target.checked)
            }
            className="mt-1 h-5 w-5 accent-[#24478f]"
          />

          <span className="text-sm leading-6 text-slate-600">
            I confirm customer has handed over cash and
            consented to clear this bill via BBPS.
          </span>
        </label>

        <button
          type="button"
          onClick={handlePayNow}
          disabled={isPaying}
          className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-[#7c3aed] text-lg font-bold text-white shadow-md transition hover:bg-[#6d28d9] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Wallet size={25} />

          {isPaying
            ? "Processing Payment..."
            : `Pay Now (${formatCurrency(
                Number(paymentAmount || 0),
              )})`}
        </button>

        <button
          type="button"
          onClick={() => setScreen("form")}
          className="flex w-full items-center justify-center gap-2 py-3 font-semibold text-[#7c3aed]"
        >
          Change Biller / Consumer ID
        </button>
      </div>
    );
  };

  const renderSuccessScreen = () => {
    const amount = Number(paymentAmount || 0);

    const consumerLabel =
      categoryFieldConfig[selectedCategory].label;

    const consumerValue =
      consumerValues[consumerLabel] || "N/A";

    return (
      <div className="space-y-5">
        <div className="py-4 text-center">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-emerald-200 bg-emerald-50 text-emerald-500">
            <CheckCircle2 size={58} />
          </div>

          <h2 className="text-3xl font-bold text-emerald-500">
            Bill Payment Successful!
          </h2>

          <p className="mt-2 text-lg text-slate-700">
            {formatCurrency(amount)} paid to{" "}
            {selectedBiller.name}
          </p>
        </div>

        <section className="rounded-3xl bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] p-6 text-white shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
              <Wallet size={30} />
            </div>

            <div>
              <p className="text-lg font-bold">
                Retailer Wallet Debited:{" "}
                {formatCurrency(amount)}
              </p>

              <p className="mt-1 text-sm text-white/80">
                Customer cash collected. Updated Wallet
                Balance: {formatCurrency(walletBalance)}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border-2 border-emerald-200 bg-emerald-50/70 p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-500">
                <TrendingUp size={30} />
              </div>

              <div>
                <p className="text-base text-slate-700">
                  BBPS Retailer Commission
                </p>

                <p className="mt-1 text-xl font-bold text-emerald-600">
                  + {formatCurrency(currentCommission)}
                  <span className="ml-1 text-sm">
                    (Credited Instantly to Wallet)
                  </span>
                </p>
              </div>
            </div>

            <CheckCircle2
              size={32}
              className="text-emerald-500"
            />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2
                size={30}
                className="text-emerald-500"
              />

              <h2 className="text-xl font-bold text-slate-900">
                BBPS Bill Receipt
              </h2>
            </div>

            <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-[#7c3aed]">
              BHARAT BILLPAY
            </span>
          </div>

          <div className="my-5 border-t border-slate-200" />

          <div className="space-y-5">
            <ReceiptRow
              label="BBPS Ref. Number"
              value={bbpsReference}
            />

            <ReceiptRow
              label="Biller Txn ID"
              value={transactionId}
            />

            <ReceiptRow
              label="Customer Name"
              value="RAMESH CHANDRA SHARMA"
            />

            <ReceiptRow
              label={
                selectedCategory === "fastag"
                  ? "Vehicle Registration Number"
                  : consumerLabel
              }
              value={consumerValue}
            />

            <ReceiptRow
              label="Biller / Board"
              value={selectedBiller.name}
            />

            <ReceiptRow
              label="Category"
              value={getCategoryLabel(selectedCategory)}
            />

            <ReceiptRow
              label="Amount Paid"
              value={formatCurrency(amount)}
              valueClass="font-bold"
            />

            <ReceiptRow
              label="Retailer Commission"
              value={`+ ${formatCurrency(
                currentCommission,
              )}`}
              valueClass="font-bold text-emerald-500"
            />

            <ReceiptRow
              label="Retailer Wallet Balance"
              value={formatCurrency(walletBalance)}
              valueClass="font-bold"
            />

            <ReceiptRow
              label="Date & Time"
              value={paymentDate}
            />

            <ReceiptRow
              label="Payment Mode"
              value="BBPS • Wallet Debit"
            />
          </div>
        </section>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => {
              alert("WhatsApp receipt sharing initiated.");
            }}
            className="flex h-16 items-center justify-center gap-2 rounded-2xl border-2 border-emerald-500 bg-white font-bold text-emerald-600 hover:bg-emerald-50"
          >
            <MessageCircle size={23} />
            WhatsApp
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="flex h-16 items-center justify-center gap-2 rounded-2xl border-2 border-slate-300 bg-white font-bold text-[#7c3aed] hover:bg-slate-50"
          >
            <Printer size={23} />
            Print Receipt
          </button>
        </div>

        <button
          type="button"
          onClick={resetPayment}
          className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-[#7c3aed] text-lg font-bold text-white shadow-md hover:bg-[#6d28d9]"
        >
          <span className="text-3xl leading-none">
            +
          </span>
          New Bill Payment
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f7fc] text-slate-900">
      {renderHeader()}

      <main className="mx-auto w-full max-w-[960px] px-4 py-5 pb-10 sm:px-6 lg:px-8">
        {screen === "form" && renderFormScreen()}

        {screen === "bill" && (
          <>
            <div className="mb-5 flex items-center gap-2 text-sm text-slate-500">
              <button
                type="button"
                onClick={() => setScreen("form")}
                className="font-semibold text-[#7c3aed]"
              >
                BBPS
              </button>

              <ArrowRight size={16} />

              <span>Bill Details</span>
            </div>

            {renderBillDetails()}
          </>
        )}

        {screen === "success" && (
          <>
            <div className="mb-5 flex items-center gap-2 text-sm text-slate-500">
              <span className="font-semibold text-[#7c3aed]">
                BBPS
              </span>

              <ArrowRight size={16} />

              <span>Payment Successful</span>
            </div>

            {renderSuccessScreen()}
          </>
        )}
      </main>

      {showBillerModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-6"
          onClick={() => setShowBillerModal(false)}
        >
          <div
            className="max-h-[88vh] w-full overflow-hidden rounded-t-[32px] bg-[#f8f8ff] sm:max-w-[720px] sm:rounded-[32px]"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex justify-center pt-4">
              <div className="h-1.5 w-16 rounded-full bg-slate-300" />
            </div>

            <div className="flex items-center justify-between px-6 pb-4 pt-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Select Biller /{" "}
                  {getCategoryLabel(selectedCategory)} Board
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Choose a biller to continue
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowBillerModal(false)
                }
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-slate-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-x-auto px-6 pb-2">
              <div className="flex min-w-max gap-3">
                {states.map((state) => {
                  const active =
                    selectedState === state;

                  return (
                    <button
                      key={state}
                      type="button"
                      onClick={() =>
                        handleStateChange(state)
                      }
                      className={`flex h-14 items-center gap-2 rounded-xl border-2 px-5 text-sm font-medium transition ${
                        active
                          ? "border-[#7c3aed] bg-[#7c3aed] text-white"
                          : "border-slate-300 bg-white text-slate-600 hover:border-[#7c3aed]"
                      }`}
                    >
                      {active && <Check size={18} />}
                      {state}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="px-6 py-4">
              <div className="relative">
                <Search
                  size={24}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="text"
                  value={billerSearch}
                  onChange={(event) =>
                    setBillerSearch(
                      event.target.value,
                    )
                  }
                  placeholder="Search biller by name..."
                  className="h-16 w-full rounded-2xl border-2 border-slate-200 bg-white pl-14 pr-4 text-base outline-none placeholder:text-slate-400 focus:border-[#7c3aed]"
                />
              </div>
            </div>

            <div className="max-h-[55vh] overflow-y-auto px-6 pb-8">
              {filteredBillers.length > 0 ? (
                filteredBillers.map((biller, index) => (
                  <button
                    key={biller.id}
                    type="button"
                    onClick={() =>
                      handleBillerSelect(biller)
                    }
                    className={`flex w-full items-center gap-4 py-5 text-left ${
                      index !==
                      filteredBillers.length - 1
                        ? "border-b border-slate-200"
                        : ""
                    }`}
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#eef1fb] text-[#7c3aed]">
                      <Receipt size={27} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-base font-bold text-slate-700 sm:text-lg">
                        {biller.name}
                      </p>

                      <p className="mt-1 text-sm text-emerald-600">
                        {biller.state} • Fetch Enabled •
                        Comm{" "}
                        {formatCurrency(
                          biller.commission,
                        )}
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="py-12 text-center">
                  <FileText
                    size={45}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-4 font-semibold text-slate-600">
                    No biller found
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Try another state or search term.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

type BillRowProps = {
  label: string;
  value: string;
  strong?: boolean;
  valueClass?: string;
};

const BillRow = ({
  label,
  value,
  strong = false,
  valueClass = "",
}: BillRowProps) => (
  <div className="flex items-start justify-between gap-5">
    <span className="text-sm text-slate-500 sm:text-base">
      {label}
    </span>

    <span
      className={`text-right text-sm text-slate-800 sm:text-base ${
        strong ? "font-bold" : ""
      } ${valueClass}`}
    >
      {value}
    </span>
  </div>
);

type ReceiptRowProps = {
  label: string;
  value: string;
  valueClass?: string;
};

const ReceiptRow = ({
  label,
  value,
  valueClass = "",
}: ReceiptRowProps) => (
  <div className="flex items-start justify-between gap-5">
    <span className="max-w-[48%] text-sm text-slate-500 sm:text-base">
      {label}
    </span>

    <span
      className={`max-w-[52%] text-right text-sm text-slate-800 sm:text-base ${valueClass}`}
    >
      {value}
    </span>
  </div>
);

export default BBPS;