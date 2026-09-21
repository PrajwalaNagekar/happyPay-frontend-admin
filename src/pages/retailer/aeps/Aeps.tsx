import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Building2,
  Check,
  ChevronRight,
  Edit3,
  Fingerprint,
  IdCard,
  Phone,
  Play,
  Search,
  ShieldCheck,
  ReceiptText,
  WalletCards,
  Printer,
  RefreshCw,
  LockKeyhole,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import OtpInput from "../../../components/common/OtpInput";
import StepIndicator from "../../../components/common/StepIndicator";

type Step = 0 | 1 | 2 | 3 | 4;

type ServiceId =
  | "cash-withdrawal"
  | "balance-check"
  | "mini-statement"
  | "balance-withdrawal";

type ModalType =
  | ""
  | "amount"
  | "otp"
  | "biometric";

type ReceiptType =
  | ""
  | "withdrawal"
  | "balance"
  | "mini-statement"
  | "balance-withdrawal";

interface Bank {
  name: string;
  code: string;
  shortName: string;
}

interface Transaction {
  description: string;
  date: string;
  amount: string;
  type: "DEBIT" | "CREDIT";
}

interface ReceiptData {
  receiptType: ReceiptType;
  bankName: string;
  amount: number;
  balance: number;
  aadhaar: string;
  mobile: string;
  transactionId: string;
  rrn: string;
  biometricDevice: string;
  authMode: string;
  status: string;
  transactions: Transaction[];
}

/*
 * ============================================================
 * BANK LIST
 * ============================================================
 *
 * Existing banks are preserved.
 */
const banks: Bank[] = [
  {
    name: "State Bank of India",
    code: "SBIN",
    shortName: "SBI",
  },
  {
    name: "HDFC Bank",
    code: "HDFC",
    shortName: "HDFC",
  },
  {
    name: "ICICI Bank",
    code: "ICIC",
    shortName: "ICICI",
  },
  {
    name: "Punjab National Bank",
    code: "PUNB",
    shortName: "PNB",
  },
  {
    name: "Bank of Baroda",
    code: "BARB",
    shortName: "BOB",
  },
  {
    name: "Axis Bank",
    code: "UTIB",
    shortName: "AXIS",
  },
  {
    name: "Canara Bank",
    code: "CNRB",
    shortName: "CNRB",
  },
  {
    name: "Union Bank of India",
    code: "UBIN",
    shortName: "UBI",
  },
  {
    name: "Bank of India",
    code: "BKID",
    shortName: "BOI",
  },
  {
    name: "Kotak Mahindra Bank",
    code: "KKBK",
    shortName: "KOTAK",
  },
  {
    name: "Central Bank of India",
    code: "CBIN",
    shortName: "CBI",
  },
  {
    name: "Indian Bank",
    code: "IDIB",
    shortName: "IB",
  },
  {
    name: "Yes Bank",
    code: "YESB",
    shortName: "YES",
  },
  {
    name: "IndusInd Bank",
    code: "INDB",
    shortName: "INDUS",
  },
  {
    name: "IDBI Bank",
    code: "IBKL",
    shortName: "IDBI",
  },
  {
    name: "UCO Bank",
    code: "UCBA",
    shortName: "UCO",
  },
  {
    name: "Punjab & Sind Bank",
    code: "PSIB",
    shortName: "PSB",
  },
  {
    name: "Federal Bank",
    code: "FDRL",
    shortName: "FED",
  },
  {
    name: "Bank of Maharashtra",
    code: "MAHB",
    shortName: "BOM",
  },
  {
    name: "Indian Overseas Bank",
    code: "IOBA",
    shortName: "IOB",
  },
  {
    name: "Karnataka Bank",
    code: "KARB",
    shortName: "KBL",
  },
  {
    name: "South Indian Bank",
    code: "SIBL",
    shortName: "SIB",
  },
  {
    name: "RBL Bank",
    code: "RATN",
    shortName: "RBL",
  },
  {
    name: "Bandhan Bank",
    code: "BDBL",
    shortName: "BANDHAN",
  },
  {
    name: "IDFC FIRST Bank",
    code: "IDFB",
    shortName: "IDFC",
  },
  {
    name: "AU Small Finance Bank",
    code: "AUBL",
    shortName: "AU",
  },
  {
    name: "Equitas Small Finance Bank",
    code: "ESFB",
    shortName: "EQUITAS",
  },
  {
    name: "Ujjivan Small Finance Bank",
    code: "UJVN",
    shortName: "UJJIVAN",
  },
  {
    name: "Jana Small Finance Bank",
    code: "JSFB",
    shortName: "JANA",
  },
  {
    name: "ESAF Small Finance Bank",
    code: "ESMF",
    shortName: "ESAF",
  },
  {
    name: "Suryoday Small Finance Bank",
    code: "SURY",
    shortName: "SURYODAY",
  },
  {
    name: "DCB Bank",
    code: "DCBL",
    shortName: "DCB",
  },
  {
    name: "City Union Bank",
    code: "CIUB",
    shortName: "CUB",
  },
  {
    name: "Tamilnad Mercantile Bank",
    code: "TMBL",
    shortName: "TMB",
  },
  {
    name: "Karur Vysya Bank",
    code: "KVBL",
    shortName: "KVB",
  },
  {
    name: "Dhanlaxmi Bank",
    code: "DLXB",
    shortName: "DLB",
  },
  {
    name: "Karnataka Gramin Bank",
    code: "PKGB",
    shortName: "KGB",
  },
  {
    name: "Kerala Gramin Bank",
    code: "KLGB",
    shortName: "KGB",
  },
  {
    name: "Rajasthan Marudhara Gramin Bank",
    code: "RMGB",
    shortName: "RMGB",
  },
  {
    name: "Andhra Pradesh Grameena Vikas Bank",
    code: "APGV",
    shortName: "APGVB",
  },
  {
    name: "Telangana Grameena Bank",
    code: "TGBL",
    shortName: "TGB",
  },
  {
    name: "Odisha Gramya Bank",
    code: "IOBA",
    shortName: "OGB",
  },
  {
    name: "Baroda Gujarat Gramin Bank",
    code: "BARB",
    shortName: "BGGB",
  },
];

/*
 * ============================================================
 * HELPERS
 * ============================================================
 */

const generateTransactionId = () => {
  return `AEPS${Date.now()}${Math.floor(
    100 + Math.random() * 900
  )}`;
};

const generateRRN = () => {
  return `${Math.floor(
    10000000000 +
      Math.random() * 89999999999
  )}`;
};

/*
 * ============================================================
 * PROGRESS HEADER
 * ============================================================
 */

const ProgressHeader = ({ step }: { step: Step }) => {
  const progressSteps = [
    { label: "Biometric" },
    { label: "Bank & Mobile" },
    { label: "Review" },
    { label: "Service" },
  ];

  const activeProgress = step === 0 ? 1 : step;

  return (
    <StepIndicator
      steps={progressSteps}
      currentStep={activeProgress}
    />
  );
};

/*
 * ============================================================
 * COMPONENT
 * ============================================================
 */

const Aeps = () => {
  const navigate = useNavigate();

  /*
   * Step 0 = Retailer 2FA
   * Step 1 = Aadhaar & Biometric
   * Step 2 = Bank & Mobile
   * Step 3 = Review
   * Step 4 = AEPS Service
   */

  const [step, setStep] = useState<Step>(0);

  /*
   * Retailer authentication
   */
  const [retailerAadhaar, setRetailerAadhaar] =
    useState("");

  const [isCapturingRetailer, setIsCapturingRetailer] =
    useState(false);

  const [retailerAuthenticated, setRetailerAuthenticated] =
    useState(false);

  /*
   * Customer Aadhaar
   */
  const [customerAadhaar, setCustomerAadhaar] =
    useState("");

  const [customerVerified, setCustomerVerified] =
    useState(false);

  const [isVerifyingCustomer, setIsVerifyingCustomer] =
    useState(false);

  /*
   * Bank
   */
  const [selectedBank, setSelectedBank] =
    useState<Bank | null>(null);

  const [showBankSelection, setShowBankSelection] =
    useState(false);

  const [bankSearch, setBankSearch] =
    useState("");

  const [consent, setConsent] =
    useState(false);

  /*
   * AEPS service
   */
  const [selectedService, setSelectedService] =
    useState<ServiceId | "">("");

  /*
   * Modal
   */
  const [modalType, setModalType] =
    useState<ModalType>("");

  /*
   * Processing state
   */
  const [isProcessing, setIsProcessing] =
    useState(false);

  /*
   * Withdrawal amount
   */
  const [withdrawalAmount, setWithdrawalAmount] =
    useState(1000);

  /*
   * OTP
   */
  const [otp, setOtp] = useState("");

  /*
   * Receipt
   */
  const [showReceipt, setShowReceipt] =
    useState(false);

  const [receiptData, setReceiptData] =
    useState<ReceiptData | null>(null);

  const retailerMobile = "+91 1234567890";

  const customerMobile = "+91 98XXXX832";

  /*
   * ============================================================
   * COMMON HELPERS
   * ============================================================
   */

  const formatCurrency = (value: number) => {
    return `₹${value.toFixed(2)}`;
  };

  const handleRetailerAadhaarChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 12);

    setRetailerAadhaar(value);
  };

  const handleCustomerAadhaarChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 12);

    setCustomerAadhaar(value);

    /*
     * If Aadhaar is edited after verification,
     * verification should be reset.
     */
    setCustomerVerified(false);
  };

  /*
   * ============================================================
   * RETAILER 2FA
   * ============================================================
   */

  const handleRetailerBiometric = () => {
    if (retailerAadhaar.length !== 12) {
      return;
    }

    setIsCapturingRetailer(true);

    /*
     * Temporary frontend simulation.
     * Replace with Mantra RD Service later.
     */
    setTimeout(() => {
      setIsCapturingRetailer(false);
      setRetailerAuthenticated(true);
    }, 2500);
  };

  const handleStartTransaction = () => {
    setStep(1);
  };

  /*
   * ============================================================
   * CUSTOMER AADHAAR
   * ============================================================
   */

  const handleCustomerVerify = () => {
    if (customerAadhaar.length !== 12) {
      return;
    }

    setIsVerifyingCustomer(true);

    /*
     * Temporary frontend simulation.
     */
    setTimeout(() => {
      setIsVerifyingCustomer(false);
      setCustomerVerified(true);
    }, 2000);
  };

  /*
   * ============================================================
   * BANK SELECTION
   * ============================================================
   */

  const filteredBanks = banks.filter(
    (bank) =>
      bank.name
        .toLowerCase()
        .includes(
          bankSearch.toLowerCase()
        ) ||
      bank.code
        .toLowerCase()
        .includes(
          bankSearch.toLowerCase()
        )
  );

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    setShowBankSelection(false);
    setBankSearch("");
  };

  /*
   * ============================================================
   * SERVICE HELPERS
   * ============================================================
   */

  const getSelectedBankName = () => {
    return selectedBank?.name || "ICICI Bank";
  };

  const getCustomerAadhaarDisplay = () => {
    return `XXXX XXXX ${
      customerAadhaar.slice(-4) || "9999"
    }`;
  };

  /*
   * ============================================================
   * BIOMETRIC
   * ============================================================
   *
   * IMPORTANT:
   *
   * serviceId is passed directly into this function.
   *
   * This prevents the React state timing issue where:
   *
   * setSelectedService(...)
   * startBiometric()
   *
   * could use the previous service value.
   */

  const startBiometric = (
    serviceId: ServiceId
  ) => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      /*
       * B. BALANCE CHECK
       */
      if (serviceId === "balance-check") {
        completeTransaction("balance");
        return;
      }

      /*
       * C. MINI STATEMENT
       */
      if (serviceId === "mini-statement") {
        completeTransaction("mini-statement");
        return;
      }

      /*
       * A. CASH WITHDRAWAL
       */
      if (serviceId === "cash-withdrawal") {
        completeTransaction("withdrawal");
        return;
      }

      /*
       * D. BALANCE CHECK + WITHDRAWAL
       */
      if (
        serviceId ===
        "balance-withdrawal"
      ) {
        completeTransaction(
          "balance-withdrawal"
        );
      }
    }, 2500);
  };

  /*
   * ============================================================
   * SERVICE CLICK
   * ============================================================
   */

  const handleServiceClick = (
    serviceId: ServiceId
  ) => {
    /*
     * Set selected service.
     */
    setSelectedService(serviceId);

    /*
     * A and D require amount.
     */
    if (
      serviceId ===
        "cash-withdrawal" ||
      serviceId ===
        "balance-withdrawal"
    ) {
      setWithdrawalAmount(1000);
      setModalType("amount");
      return;
    }

    /*
     * B and C directly require biometric.
     *
     * IMPORTANT:
     * serviceId is passed directly.
     */
    if (
      serviceId === "balance-check" ||
      serviceId === "mini-statement"
    ) {
      setModalType("biometric");

      startBiometric(serviceId);
    }
  };

  /*
   * ============================================================
   * AMOUNT CONFIRM
   * ============================================================
   */

  const handleConfirmAmount = () => {
    if (withdrawalAmount <= 0) {
      return;
    }

    if (
      selectedService !==
        "cash-withdrawal" &&
      selectedService !==
        "balance-withdrawal"
    ) {
      return;
    }

    /*
     * More than ₹5,000 requires OTP first.
     */
    if (withdrawalAmount > 5000) {
      setOtp("");
      setModalType("otp");
      return;
    }

    /*
     * ₹5,000 or below:
     * biometric directly.
     */
    setModalType("biometric");

    startBiometric(selectedService);
  };

  /*
   * ============================================================
   * OTP
   * ============================================================
   */


  /*
   * ============================================================
   * COMPLETE TRANSACTION
   * ============================================================
   */

  const completeTransaction = (
    type: ReceiptType
  ) => {
    const currentBalance = 14250;

    let finalBalance =
      currentBalance;

    /*
     * Withdrawal decreases balance.
     */
    if (
      type === "withdrawal" ||
      type ===
        "balance-withdrawal"
    ) {
      finalBalance =
        currentBalance -
        withdrawalAmount;
    }

    /*
     * Sample recent transactions
     * matching the shared UI.
     */
    const transactions: Transaction[] =
      [
        {
          description:
            "UPI/P2A/Grocery",
          date: "09 Sep",
          amount: "-₹450.00",
          type: "DEBIT",
        },
        {
          description:
            "AEPS Cash Wdl",
          date: "07 Sep",
          amount: "-₹2,000.00",
          type: "DEBIT",
        },
        {
          description:
            "Salary Credit",
          date: "05 Sep",
          amount: "+₹24,500.00",
          type: "CREDIT",
        },
        {
          description:
            "ATM Cash Wdl",
          date: "01 Sep",
          amount: "-₹1,500.00",
          type: "DEBIT",
        },
        {
          description:
            "NEFT Inward",
          date: "28 Aug",
          amount: "+₹5,000.00",
          type: "CREDIT",
        },
      ];

    const data: ReceiptData = {
      receiptType: type,
      bankName:
        getSelectedBankName(),
      amount:
        type === "balance" ||
        type === "mini-statement"
          ? 0
          : withdrawalAmount,
      balance: finalBalance,
      aadhaar:
        getCustomerAadhaarDisplay(),
      mobile: customerMobile,
      transactionId:
        generateTransactionId(),
      rrn: generateRRN(),
      biometricDevice:
        "Mantra MFS100",
      authMode:
        "Biometric / 2FA Verified",
      status: "SUCCESS",
      transactions,
    };

    setReceiptData(data);
    setModalType("");
    setOtp("");
    setShowReceipt(true);
  };

  /*
   * ============================================================
   * RECEIPT HOME
   * ============================================================
   */

  const handleReceiptHome = () => {
    setShowReceipt(false);
    setReceiptData(null);
    setSelectedService("");
    setWithdrawalAmount(1000);
    setOtp("");
    setStep(4);
  };

  /*
   * ============================================================
   * START NEW TRANSACTION
   * ============================================================
   */

  const handleStartNewTransaction = () => {
    setShowReceipt(false);
    setReceiptData(null);
    setSelectedService("");
    setWithdrawalAmount(1000);
    setOtp("");
    setModalType("");
    setStep(1);
  };

  /*
   * ============================================================
   * PRINT
   * ============================================================
   */

  const handlePrintReceipt = () => {
    window.print();
  };

  /*
   * ============================================================
   * BACK
   * ============================================================
   */

  const handleBack = () => {
    /*
     * Close receipt first.
     */
    if (showReceipt) {
      setShowReceipt(false);
      setReceiptData(null);
      return;
    }

    /*
     * Close modal first.
     */
    if (modalType) {
      if (!isProcessing) {
        setModalType("");
      }
      return;
    }

    /*
     * Bank selection back.
     */
    if (showBankSelection) {
      setShowBankSelection(false);
      setBankSearch("");
      return;
    }

    if (step === 0) {
      navigate("/retailer");
      return;
    }

    if (step === 1) {
      setStep(0);
      return;
    }

    if (step === 2) {
      setStep(1);
      return;
    }

    if (step === 3) {
      setStep(2);
      return;
    }

    if (step === 4) {
      setStep(3);
    }
  };

  /*
   * ============================================================
   * STEP 0
   * RETAILER AUTH
   * ============================================================
   */

  const renderRetailerAuth = () => {
    return (
      <>
        <div className="hp-brand rounded-[22px] p-5 text-white shadow-[0_16px_36px_-16px_rgba(49,91,209,0.5)] sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15">
              <ShieldCheck className="h-8 w-8" />
            </div>

            <div>
              <h2 className="text-xl font-bold sm:text-2xl">
                Retailer Daily 2FA Active
              </h2>

              <p className="mt-1 text-sm text-white/75 sm:text-base">
                NPCI Mandatory Biometric Verification
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-white/90 sm:text-base">
            As per regulatory compliance,
            complete 2FA authentication once
            every morning before initiating
            cash transactions.
          </p>
        </div>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              Select Biometric Device
            </h2>

            <span className="rounded-full bg-[#dff7ec] px-3 py-1.5 text-xs font-semibold text-[#20a46b] sm:text-sm">
              ✓ USB / OTG
            </span>
          </div>

          <div className="rounded-[22px] border-2 border-[#315bd1] bg-white p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#edf1fc]">
                <Fingerprint className="h-8 w-8 text-[#315bd1]" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold text-[#315bd1]">
                  Mantra MFS100
                </h3>

                <p className="mt-1 flex items-center gap-2 text-sm font-medium text-[#20a46b]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#20a46b]" />
                  Ready · RD Service Active
                </p>
              </div>

              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[#315bd1]">
                <div className="h-3 w-3 rounded-full bg-[#315bd1]" />
              </div>
            </div>
          </div>
        </section>

        <section>
          <label className="mb-3 block text-lg font-bold text-slate-900 sm:text-xl">
            Retailer Mobile Number{" "}
            <span className="text-sm font-medium text-slate-500">
              (Autofetched)
            </span>
          </label>

          <div className="flex min-h-[72px] items-center gap-4 rounded-[22px] border border-slate-200 bg-[#f1f2f6] px-5">
            <Phone className="h-6 w-6 text-[#315bd1]" />

            <span className="text-lg font-semibold text-slate-800">
              {retailerMobile}
            </span>
          </div>
        </section>

        <section>
          <label
            htmlFor="retailer-aadhaar"
            className="mb-3 block text-lg font-bold text-slate-900 sm:text-xl"
          >
            Retailer Aadhaar Number
          </label>

          <div className="flex min-h-[72px] items-center gap-4 rounded-[22px] border-2 border-slate-200 bg-white px-5 focus-within:border-[#315bd1]">
            <IdCard className="h-7 w-7 shrink-0 text-slate-500" />

            <input
              id="retailer-aadhaar"
              type="text"
              inputMode="numeric"
              maxLength={12}
              value={retailerAadhaar}
              onChange={
                handleRetailerAadhaarChange
              }
              disabled={
                isCapturingRetailer ||
                retailerAuthenticated
              }
              placeholder="Enter 12-digit Aadhaar number"
              className="w-full bg-transparent text-lg font-medium outline-none placeholder:text-slate-400"
            />
          </div>
        </section>

        {isCapturingRetailer && (
          <div className="rounded-[22px] border-2 border-[#315bd1] bg-white p-8 text-center">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#edf1fc]">
              <Fingerprint className="h-16 w-16 animate-pulse text-[#315bd1]" />
            </div>

            <h2 className="mt-6 text-xl font-bold text-slate-900">
              Capturing Biometric Fingerprint...
            </h2>

            <p className="mt-2 text-slate-500">
              Place your finger on Mantra MFS100 scanner
            </p>

            <div className="mx-auto mt-6 h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-[#315bd1]" />
          </div>
        )}

        {retailerAuthenticated &&
          !isCapturingRetailer && (
            <>
              <div className="rounded-[22px] border-2 border-[#8edfc1] bg-[#e2f8ef] p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#19b86d]">
                    <Check className="h-8 w-8 text-white" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-[#16a467]">
                      Retailer 2FA Authentication Success
                    </h2>

                    <p className="mt-1 text-slate-700">
                      Verified with UIDAI
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={
                  handleStartTransaction
                }
                className="flex min-h-[64px] w-full items-center justify-center gap-3 rounded-[22px] bg-[#08ad7c] px-6 text-lg font-bold text-white shadow-md hover:bg-[#07996e] sm:text-xl"
              >
                <Play className="h-6 w-6 fill-current" />
                START TRANSACTION
              </button>
            </>
          )}

        {!retailerAuthenticated &&
          !isCapturingRetailer && (
            <button
              type="button"
              onClick={
                handleRetailerBiometric
              }
              disabled={
                retailerAadhaar.length !== 12
              }
              className="flex min-h-[64px] w-full items-center justify-center gap-3 rounded-[22px] bg-[#315bd1] px-6 text-lg font-bold text-white shadow-md disabled:cursor-not-allowed disabled:opacity-50 sm:text-xl"
            >
              <Fingerprint className="h-7 w-7" />
              PROCEED FOR BIOMETRIC AUTH
            </button>
          )}
      </>
    );
  };

  /*
   * ============================================================
   * STEP 1
   * CUSTOMER AADHAAR
   * ============================================================
   */

  const renderCustomerAadhaar = () => {
    return (
      <>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Step 1: Aadhaar & Biometric
          </h2>

          <p className="mt-2 text-base text-slate-500">
            Verify customer identity using connected
            biometric device.
          </p>
        </div>

        <section>
          <label
            htmlFor="customer-aadhaar"
            className="mb-3 block text-lg font-bold text-slate-900"
          >
            Customer Aadhaar Number
          </label>

          <div
            className={`flex min-h-[72px] items-center gap-4 rounded-[22px] border-2 bg-white px-5 ${
              customerVerified
                ? "border-slate-200"
                : "border-slate-200 focus-within:border-[#315bd1]"
            }`}
          >
            <IdCard className="h-7 w-7 shrink-0 text-slate-500" />

            <input
              id="customer-aadhaar"
              type="text"
              inputMode="numeric"
              maxLength={12}
              value={customerAadhaar}
              onChange={
                handleCustomerAadhaarChange
              }
              disabled={
                customerVerified ||
                isVerifyingCustomer
              }
              placeholder="Enter 12-digit Aadhaar number"
              className="min-w-0 flex-1 bg-transparent text-lg font-medium outline-none placeholder:text-slate-400"
            />

            {!customerVerified &&
              customerAadhaar.length ===
                12 && (
                <button
                  type="button"
                  onClick={
                    handleCustomerVerify
                  }
                  disabled={
                    isVerifyingCustomer
                  }
                  className="shrink-0 font-bold text-[#315bd1] hover:text-[#2448b8] disabled:opacity-60"
                >
                  {isVerifyingCustomer
                    ? "VERIFYING..."
                    : "VERIFY"}
                </button>
              )}

            {customerVerified && (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#19b86d]">
                <Check className="h-6 w-6 text-white" />
              </div>
            )}
          </div>
        </section>

        {customerVerified && (
          <div className="flex items-center justify-between rounded-[22px] border-2 border-[#a9e5d0] bg-[#e4f8f0] p-5">
            <div className="flex items-center gap-4">
              <Phone className="h-7 w-7 text-[#19a96d]" />

              <div>
                <p className="text-sm font-semibold text-slate-600">
                  Registered Mobile with Aadhaar
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900">
                  {customerMobile}
                </p>
              </div>
            </div>

            <span className="rounded-full bg-[#d5f1e6] px-3 py-2 text-sm font-bold text-[#18a56a]">
              ✓ Verified
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={() => setStep(2)}
          disabled={!customerVerified}
          className="flex min-h-[64px] w-full items-center justify-center gap-3 rounded-[22px] bg-[#315bd1] text-lg font-bold text-white shadow-md disabled:cursor-not-allowed disabled:bg-[#9db1e8] sm:text-xl"
        >
          <ArrowRight className="h-7 w-7" />
          CONTINUE TO BANK SELECTION
        </button>
      </>
    );
  };

  /*
   * ============================================================
   * STEP 2
   * BANK SELECTION
   * ============================================================
   */

  const renderBankSelection = () => {
    if (showBankSelection) {
      return (
        <>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setShowBankSelection(false);
                setBankSearch("");
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>

            <h2 className="text-2xl font-bold text-slate-900">
              Select Bank
            </h2>
          </div>

          <div className="flex min-h-[72px] items-center gap-3 rounded-[22px] border-2 border-[#315bd1] bg-white px-5">
            <Search className="h-6 w-6 text-slate-500" />

            <input
              type="text"
              value={bankSearch}
              onChange={(event) =>
                setBankSearch(
                  event.target.value
                )
              }
              placeholder="Search bank by name or code..."
              className="w-full bg-transparent text-lg outline-none placeholder:text-slate-400"
              autoFocus
            />
          </div>

          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            {filteredBanks.map((bank) => (
              <button
                type="button"
                key={`${bank.code}-${bank.shortName}`}
                onClick={() =>
                  handleBankSelect(bank)
                }
                className="flex w-full items-center gap-4 border-b border-slate-100 px-6 py-5 text-left hover:bg-slate-50"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#edf1fc] text-lg font-bold text-[#315bd1]">
                  {bank.shortName}
                </div>

                <div className="flex-1">
                  <p className="text-xl font-semibold text-slate-900">
                    {bank.name}
                  </p>

                  <p className="mt-1 text-base text-slate-500">
                    Code: {bank.code}
                  </p>
                </div>

                <ChevronRight className="h-6 w-6 text-slate-700" />
              </button>
            ))}

            {filteredBanks.length === 0 && (
              <div className="p-8 text-center text-slate-500">
                No bank found.
              </div>
            )}
          </div>
        </>
      );
    }

    return (
      <>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Step 2: Bank
          </h2>

          <p className="mt-2 text-base text-slate-500">
            select the linked bank account.
          </p>
        </div>

        <section>
          <h3 className="mb-4 text-lg font-bold text-slate-900">
            Select Bank
          </h3>

          {!selectedBank ? (
            <button
              type="button"
              onClick={() =>
                setShowBankSelection(true)
              }
              className="flex min-h-[76px] w-full items-center justify-center gap-4 rounded-[22px] border-2 border-[#c0cceb] bg-transparent text-lg font-bold text-[#315bd1]"
            >
              <Building2 className="h-7 w-7" />
              PLEASE SELECT BANK
            </button>
          ) : (
            <div className="flex min-h-[138px] items-center gap-4 rounded-[22px] border-2 border-slate-200 bg-white p-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#edf1fc] text-lg font-bold text-[#315bd1]">
                {selectedBank.shortName}
              </div>

              <div className="flex-1">
                <p className="text-xl font-bold text-slate-900">
                  {selectedBank.name}
                </p>

                <p className="mt-1 text-base text-slate-500">
                  Bank Code:{" "}
                  {selectedBank.code}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowBankSelection(true)
                }
                className="text-lg font-bold text-[#315bd1]"
              >
                Change
              </button>
            </div>
          )}
        </section>

        <label className="flex cursor-pointer items-start gap-4 rounded-[22px] border-2 border-slate-200 bg-white p-5">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) =>
              setConsent(
                event.target.checked
              )
            }
            className="mt-1 h-8 w-8 accent-[#315bd1]"
          />

          <span className="text-base leading-6 text-slate-800 sm:text-lg">
            I hereby give consent to use my
            Aadhaar number and biometric data
            for fetching balance and cash
            withdrawal as per NPCI guidelines.
          </span>
        </label>

        <button
          type="button"
          onClick={() => setStep(3)}
          disabled={!selectedBank || !consent}
          className="flex min-h-[64px] w-full items-center justify-center gap-3 rounded-[22px] bg-[#315bd1] text-lg font-bold text-white shadow-md disabled:bg-[#9db1e8] sm:text-xl"
        >
          <ArrowRight className="h-7 w-7" />
          PROCEED TO REVIEW
        </button>
      </>
    );
  };

  /*
   * ============================================================
   * STEP 3
   * REVIEW
   * ============================================================
   */

  const renderReview = () => {
    return (
      <>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Step 3: Verify Your Details
          </h2>

          <p className="mt-2 text-base text-slate-500">
            Please confirm the details before
            proceeding to services.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold text-slate-900">
            Collected Information
          </h3>

          <div className="overflow-hidden rounded-[22px] border-2 border-slate-200 bg-white">
            <div className="flex items-center gap-4 border-b-2 border-slate-200 p-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#edf1fc]">
                <IdCard className="h-7 w-7 text-[#315bd1]" />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-500">
                  Aadhaar Number
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900">
                  {getCustomerAadhaarDisplay()}
                </p>
              </div>

              <span className="rounded-full bg-[#dff7ec] px-3 py-2 text-sm font-bold text-[#18a56a]">
                ✓ Verified
              </span>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf1fc] text-[#315bd1]"
              >
                <Edit3 className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center gap-4 border-b-2 border-slate-200 p-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#edf1fc]">
                <Phone className="h-7 w-7 text-[#315bd1]" />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-500">
                  Mobile Number
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900">
                  {customerMobile}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf1fc] text-[#315bd1]"
              >
                <Edit3 className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center gap-4 p-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#edf1fc]">
                <Building2 className="h-7 w-7 text-[#315bd1]" />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-500">
                  Linked Bank
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900">
                  {selectedBank?.name}
                </p>
              </div>

              <span className="rounded-xl bg-[#edf1fc] px-3 py-2 font-bold text-[#315bd1]">
                {selectedBank?.shortName}
              </span>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf1fc] text-[#315bd1]"
              >
                <Edit3 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setStep(4)}
          className="flex min-h-[64px] w-full items-center justify-center gap-3 rounded-[22px] bg-[#315bd1] text-lg font-bold text-white shadow-md sm:text-xl"
        >
          <ArrowRight className="h-7 w-7" />
          PROCEED TO SERVICES
        </button>
      </>
    );
  };

  /*
   * ============================================================
   * STEP 4
   * AEPS SERVICES
   * ============================================================
   */

  const services: {
    id: ServiceId;
    title: string;
    description: string;
    icon: React.ElementType;
    iconClass: string;
    bgClass: string;
  }[] = [
    {
      id: "cash-withdrawal",
      title: "A. Cash Withdrawal",
      description: "Withdraw cash from A/C",
      icon: WalletCards,
      iconClass: "text-[#315bd1]",
      bgClass: "bg-[#f2dfc5]",
    },
    {
      id: "balance-check",
      title: "B. Balance Check",
      description: "Enquire A/C balance",
      icon: Banknote,
      iconClass: "text-[#08a873]",
      bgClass: "bg-[#e6e8c9]",
    },
    {
      id: "mini-statement",
      title: "C. Mini Statement",
      description: "Last 5 transactions",
      icon: ReceiptText,
      iconClass: "text-[#8c42db]",
      bgClass: "bg-[#f0d7d5]",
    },
    {
      id: "balance-withdrawal",
      title: "D. Bal Check + Wdl",
      description: "Check & withdraw",
      icon: ArrowRight,
      iconClass: "text-[#f15c19]",
      bgClass: "bg-[#f3dfc8]",
    },
  ];

  const renderServices = () => {
    return (
      <>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Step 4: Select AEPS Service
          </h2>

          <p className="mt-2 text-base text-slate-500">
            Select the transaction you want to
            perform.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;

            const selected =
              selectedService ===
              service.id;

            return (
              <button
                type="button"
                key={service.id}
                onClick={() =>
                  handleServiceClick(
                    service.id
                  )
                }
                className={`rounded-[22px] border-2 p-5 text-left transition ${
                  selected
                    ? "border-[#315bd1] shadow-md"
                    : "border-[#d8d8d8]"
                } bg-[#f4d3a6]`}
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${service.bgClass}`}
                >
                  <Icon
                    className={`h-8 w-8 ${service.iconClass}`}
                  />
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {service.title}
                </h3>

                <p className="mt-1 text-base text-slate-700">
                  {service.description}
                </p>
              </button>
            );
          })}
        </div>
      </>
    );
  };

  /*
   * ============================================================
   * BIOMETRIC MODAL
   * ============================================================
   */

  const renderBiometricModal = () => {
    if (modalType !== "biometric") {
      return null;
    }

    let title = "Biometric Authentication";

    if (
      selectedService ===
      "balance-check"
    ) {
      title = "Balance Check";
    }

    if (
      selectedService ===
      "mini-statement"
    ) {
      title = "Mini Statement";
    }

    if (
      selectedService ===
      "balance-withdrawal"
    ) {
      title = "Biometric Authentication";
    }

    if (
      selectedService ===
      "cash-withdrawal"
    ) {
      title =
        withdrawalAmount > 5000
          ? "Biometric Authentication (> ₹5,000)"
          : "Biometric Authentication (≤ ₹5,000)";
    }

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
        <div className="w-full max-w-xl rounded-[22px] bg-white p-8 text-center shadow-2xl sm:p-10">
          <h2 className="text-left text-2xl font-bold text-slate-900 sm:text-3xl">
            {title}
          </h2>

          <div className="mx-auto mt-10 flex h-40 w-40 items-center justify-center rounded-full bg-[#edf1fc]">
            <Fingerprint className="h-24 w-24 text-[#315bd1]" />
          </div>

          <h3 className="mt-8 text-xl font-bold text-[#4d596d] sm:text-2xl">
            Capturing Fingerprint...
          </h3>

          <p className="mt-3 text-lg text-slate-500">
            Place finger on Mantra MFS100
          </p>

          <div className="mx-auto mt-8 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#315bd1]" />
        </div>
      </div>
    );
  };

  /*
   * ============================================================
   * AMOUNT MODAL
   * ============================================================
   */

  const amountOptions = [
    500,
    1000,
    2000,
    3000,
    5000,
    7000,
    10000,
  ];

  const renderAmountModal = () => {
    if (modalType !== "amount") {
      return null;
    }

    const requiresOtp =
      withdrawalAmount > 5000;

    return (
      <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 sm:items-center">
        <div className="w-full max-w-2xl rounded-t-[32px] bg-[#f7f7ff] p-7 shadow-2xl sm:rounded-[22px] sm:p-10">
          <div className="mx-auto mb-7 h-1.5 w-16 rounded-full bg-slate-200 sm:hidden" />

          <h2 className="text-2xl font-bold text-slate-900">
            Enter Withdrawal Amount
          </h2>

          <p className="mt-2 text-base text-slate-600 sm:text-lg">
            Amounts above ₹5,000 require
            Mobile OTP + Biometric validation
          </p>

          <div className="mt-8 flex min-h-[108px] items-center rounded-[22px] border-2 border-slate-200 bg-white px-7">
            <span className="text-3xl font-bold text-[#315bd1]">
              ₹
            </span>

            <input
              type="number"
              value={withdrawalAmount}
              onChange={(event) =>
                setWithdrawalAmount(
                  Number(
                    event.target.value
                  )
                )
              }
              className="ml-2 w-full bg-transparent text-3xl font-bold text-slate-900 outline-none"
            />
          </div>

          <div className="mt-7 grid grid-cols-4 gap-3">
            {amountOptions.map(
              (amount) => {
                const active =
                  withdrawalAmount ===
                  amount;

                return (
                  <button
                    key={amount}
                    type="button"
                    onClick={() =>
                      setWithdrawalAmount(
                        amount
                      )
                    }
                    className={`min-h-[64px] rounded-2xl border-2 px-2 text-base font-semibold sm:text-lg ${
                      active
                        ? "border-transparent bg-[#e1e9ff] text-[#315bd1]"
                        : "border-slate-200 bg-white text-slate-800"
                    }`}
                  >
                    {active && (
                      <Check className="mr-1 inline h-4 w-4" />
                    )}
                    ₹{amount}
                  </button>
                );
              }
            )}
          </div>

          {requiresOtp ? (
            <div className="mt-7 flex items-start gap-4 rounded-[22px] border-2 border-[#f1d09e] bg-[#fff2dc] p-5">
              <LockKeyhole className="mt-1 h-7 w-7 shrink-0 text-[#ef9914]" />

              <p className="text-base font-semibold text-[#e99a1d] sm:text-lg">
                Amount is &gt; ₹5,000: Both
                Customer OTP and Fingerprint
                will be required.
              </p>
            </div>
          ) : (
            <div className="mt-7 flex items-start gap-4 rounded-[22px] border-2 border-[#c9d4f7] bg-[#edf1ff] p-5">
              <Fingerprint className="mt-1 h-7 w-7 shrink-0 text-[#315bd1]" />

              <p className="text-base font-semibold text-[#315bd1] sm:text-lg">
                Amount is ≤ ₹5,000: Only
                Fingerprint Biometric will be
                required.
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={
              handleConfirmAmount
            }
            disabled={
              withdrawalAmount <= 0
            }
            className="mt-8 flex min-h-[68px] w-full items-center justify-center rounded-[22px] bg-[#315bd1] text-xl font-bold text-white shadow-md disabled:opacity-50"
          >
            CONFIRM AMOUNT
          </button>
        </div>
      </div>
    );
  };

  /*
   * ============================================================
   * OTP MODAL
   * ============================================================
   */

  const renderOtpModal = () => {
    if (modalType !== "otp") {
      return null;
    }

    function handleVerifyOtp(): void {
      if (otp.length !== 6 || !selectedService) {
        return;
      }

      setModalType("biometric");
      startBiometric(selectedService);
    }

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
        <div className="w-full max-w-xl rounded-[22px] bg-white p-8 shadow-2xl sm:p-10">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff0d9]">
              <ShieldCheck className="h-7 w-7 text-[#ee9914]" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Customer OTP Required
            </h2>
          </div>

          <p className="mt-7 text-base leading-7 text-slate-600 sm:text-lg">
            As per AEPS security rules,
            transactions exceeding ₹5,000
            require OTP verification.
          </p>

          <div className="mt-6 inline-flex rounded-2xl bg-[#fff0db] px-5 py-3 text-base font-bold text-[#995d19]">
            Amount:{" "}
            {formatCurrency(
              withdrawalAmount
            )}{" "}
            • Sent to +91
          </div>

          <div className="mt-7">
            <OtpInput
              value={otp}
              onChange={setOtp}
              length={6}
              disabled={isProcessing}
            />
          </div>

          <div className="mt-7 flex items-center justify-end gap-5">
            <button
              type="button"
              onClick={() => {
                setModalType("");
                setOtp("");
              }}
              className="px-4 py-3 text-lg font-bold text-[#315bd1]"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={
                handleVerifyOtp
              }
              disabled={otp.length !== 6}
              className="min-h-[64px] min-w-[190px] rounded-[22px] bg-[#315bd1] px-6 text-lg font-bold text-white shadow-md disabled:bg-[#9db1e8]"
            >
              VERIFY OTP
            </button>
          </div>
        </div>
      </div>
    );
  };

  /*
   * ============================================================
   * RECEIPT HELPERS
   * ============================================================
   */

  const getReceiptTitle = (
    type: ReceiptType
  ) => {
    switch (type) {
      case "withdrawal":
        return "Cash Withdrawal Successful";

      case "balance":
        return "Balance Enquiry Successful";

      case "mini-statement":
        return "Mini Statement Generated";

      case "balance-withdrawal":
        return "Withdrawal & Balance Check Successful";

      default:
        return "";
    }
  };

  const renderReceiptRow = (
    label: string,
    value: React.ReactNode,
    valueClass = "text-slate-900"
  ) => {
    return (
      <div className="flex items-center justify-between gap-6">
        <span className="text-base text-slate-600 sm:text-lg">
          {label}
        </span>

        <span
          className={`text-right text-base font-semibold sm:text-lg ${valueClass}`}
        >
          {value}
        </span>
      </div>
    );
  };

  /*
   * ============================================================
   * MINI STATEMENT
   * ============================================================
   */

  const renderRecentTransactions = (
    transactions: Transaction[]
  ) => {
    return (
      <div className="mt-8 rounded-[22px] border-2 border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex items-center gap-4 border-b border-slate-200 pb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf1fc]">
            <FileText className="h-7 w-7 text-[#315bd1]" />
          </div>

          <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Recent 5 Transactions
          </h3>
        </div>

        <div className="mt-4 space-y-7">
          {transactions.map(
            (transaction, index) => (
              <div
                key={`${transaction.description}-${index}`}
                className="flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="text-base font-bold text-slate-900 sm:text-xl">
                    {transaction.description}
                  </p>

                  <p className="mt-1 text-sm text-slate-600 sm:text-base">
                    {transaction.date}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p
                    className={`text-base font-bold sm:text-xl ${
                      transaction.type ===
                      "CREDIT"
                        ? "text-[#19aa6d]"
                        : "text-slate-900"
                    }`}
                  >
                    {transaction.amount}
                  </p>

                  <span
                    className={`mt-1 inline-block rounded-lg px-2.5 py-1 text-xs font-bold ${
                      transaction.type ===
                      "CREDIT"
                        ? "bg-[#dff7ec] text-[#18a56a]"
                        : "bg-[#e8e8ee] text-slate-700"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    );
  };

  /*
   * ============================================================
   * RECEIPT SCREEN
   * ============================================================
   */

  const renderReceipt = () => {
    if (!showReceipt || !receiptData) {
      return null;
    }

    const isMiniStatement =
      receiptData.receiptType ===
      "mini-statement";

    const isWithdrawal =
      receiptData.receiptType ===
        "withdrawal" ||
      receiptData.receiptType ===
        "balance-withdrawal";

    return (
      <div className="">
        <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white px-4 py-3 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.4)] sm:px-5">
          <button
            type="button"
            onClick={
              handleReceiptHome
            }
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-800 hover:bg-slate-100"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>

          <h1 className="text-2xl font-bold text-slate-900">
            AEPS Receipt
          </h1>
        </div>

        <main className="px-4 py-8 sm:px-6">
          <div className="mx-auto w-full max-w-3xl">
            <div className="text-center">
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-[#dff7ec]">
                <Check className="h-20 w-20 text-[#19b86d]" />
              </div>

              <h2 className="mt-8 text-3xl font-bold text-[#19aa6d] sm:text-4xl">
                {getReceiptTitle(
                  receiptData.receiptType
                )}
              </h2>

              <p className="mt-3 text-xl text-slate-700 sm:text-2xl">
                {receiptData.bankName}
              </p>
            </div>

            <div className="mt-10 rounded-[22px] border-2 border-slate-200 bg-white p-7 shadow-sm sm:p-9">
              {isWithdrawal && (
                <>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-slate-900 sm:text-5xl">
                      ₹
                      {receiptData.amount.toFixed(
                        2
                      )}
                    </p>

                    <p className="mt-2 text-lg text-slate-600 sm:text-xl">
                      Amount Withdrawn
                    </p>
                  </div>

                  <div className="my-7 border-t border-slate-200" />
                </>
              )}

              <div className="space-y-6">
                {renderReceiptRow(
                  "Account Balance",
                  formatCurrency(
                    receiptData.balance
                  ),
                  "text-[#19aa6d]"
                )}

                {renderReceiptRow(
                  "Customer Aadhaar",
                  receiptData.aadhaar
                )}

                {renderReceiptRow(
                  "Customer Mobile",
                  receiptData.mobile
                )}

                {renderReceiptRow(
                  "Bank Name",
                  receiptData.bankName
                )}

                {renderReceiptRow(
                  "Transaction ID",
                  receiptData.transactionId
                )}

                {renderReceiptRow(
                  "RRN Number",
                  receiptData.rrn
                )}

                {renderReceiptRow(
                  "Biometric Device",
                  receiptData.biometricDevice
                )}

                {renderReceiptRow(
                  "Auth Mode",
                  receiptData.authMode
                )}

                {renderReceiptRow(
                  "Transaction Status",
                  receiptData.status,
                  "text-[#19aa6d]"
                )}
              </div>
            </div>

            {isMiniStatement &&
              renderRecentTransactions(
                receiptData.transactions
              )}

            <div className="mt-8 space-y-5">
              <button
                type="button"
                onClick={
                  handlePrintReceipt
                }
                className="flex min-h-[68px] w-full items-center justify-center gap-3 rounded-[22px] border-2 border-[#bdc9eb] bg-transparent text-xl font-bold text-[#315bd1]"
              >
                <Printer className="h-7 w-7" />
                PRINT RECEIPT
              </button>

              {receiptData.receiptType ===
                "withdrawal" ? (
                <button
                  type="button"
                  onClick={
                    handleStartNewTransaction
                  }
                  className="flex min-h-[68px] w-full items-center justify-center gap-3 rounded-[22px] bg-[#315bd1] text-xl font-bold text-white shadow-md"
                >
                  <RefreshCw className="h-7 w-7" />
                  START TRANSACTION
                </button>
              ) : (
                <button
                  type="button"
                  onClick={
                    handleReceiptHome
                  }
                  className="flex min-h-[68px] w-full items-center justify-center gap-3 rounded-[22px] bg-[#315bd1] text-xl font-bold text-white shadow-md"
                >
                  <RefreshCw className="h-7 w-7" />
                  Home
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  };

  /*
   * ============================================================
   * MAIN RENDER
   * ============================================================
   */

  if (showReceipt) {
    return renderReceipt();
  }

  return (
    <div className="">
      {/* Page Header */}
      <div className="hp-page-head mx-auto w-full max-w-5xl">
        <button
          type="button"
          onClick={handleBack}
          className="hp-back"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Aadhaar ATM
          </p>
          <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
            Withdraw Money
          </h1>
        </div>
      </div>

      {/* Progress */}
      {step > 0 && (
        <div className="mx-auto mt-4 w-full max-w-5xl rounded-[22px] border border-white/80 bg-white px-4 py-4">
          <ProgressHeader step={step} />
        </div>
      )}

      {/* Content */}
      <main className="mt-4">
        <div className="mx-auto w-full max-w-5xl space-y-5">
          {step === 0 &&
            renderRetailerAuth()}

          {step === 1 &&
            renderCustomerAadhaar()}

          {step === 2 &&
            renderBankSelection()}

          {step === 3 &&
            renderReview()}

          {step === 4 &&
            renderServices()}
        </div>
      </main>

      {/* ======================================================
          MODALS
          ====================================================== */}

      {renderAmountModal()}

      {renderOtpModal()}

      {renderBiometricModal()}
    </div>
  );
};

export default Aeps;
