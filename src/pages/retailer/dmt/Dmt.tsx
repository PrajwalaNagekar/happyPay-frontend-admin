import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleUserRound,
  LockKeyhole,
  MessageSquare,
  Phone,
  Plus,
  Printer,
  RefreshCw,
  Send,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import OtpInput from "../../../components/common/OtpInput";

type Screen =
  | "transfer-details"
  | "otp"
  | "customer-details"
  | "add-beneficiary"
  | "send-money"
  | "success";

interface Bank {
  name: string;
  code: string;
  ifsc: string;
}

interface Beneficiary {
  id: number;
  name: string;
  initials: string;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  mobile: string;
}

/* =========================
   BANK LIST
========================= */

const banks: Bank[] = [
  {
    name: "HDFC Bank",
    code: "HDFC",
    ifsc: "HDFC0001234",
  },
  {
    name: "State Bank of India",
    code: "SBIN",
    ifsc: "SBIN0001234",
  },
  {
    name: "ICICI Bank",
    code: "ICIC",
    ifsc: "ICIC0000045",
  },
  {
    name: "Punjab National Bank",
    code: "PUNB",
    ifsc: "PUNB0001234",
  },
  {
    name: "Bank of Baroda",
    code: "BARB",
    ifsc: "BARB0001234",
  },
  {
    name: "Axis Bank",
    code: "UTIB",
    ifsc: "UTIB0001234",
  },
  {
    name: "Canara Bank",
    code: "CNRB",
    ifsc: "CNRB0001234",
  },
  {
    name: "Union Bank of India",
    code: "UBIN",
    ifsc: "UBIN0001234",
  },
];

/* =========================
   SAMPLE BENEFICIARIES
========================= */

const initialBeneficiaries: Beneficiary[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    initials: "RS",
    bankName: "HDFC Bank",
    accountNumber: "XXXX XXXX 4521",
    ifsc: "HDFC0001234",
    mobile: "9876543210",
  },
  {
    id: 2,
    name: "Priya Patel",
    initials: "PP",
    bankName: "State Bank of India",
    accountNumber: "XXXX XXXX 7832",
    ifsc: "SBIN0001234",
    mobile: "9988776655",
  },
  {
    id: 3,
    name: "Amit Verma",
    initials: "AV",
    bankName: "ICICI Bank",
    accountNumber: "XXXX XXXX 9912",
    ifsc: "ICIC0000045",
    mobile: "9876543211",
  },
];

const Dmt = () => {
  const navigate = useNavigate();

  /* =========================
     SCREEN
  ========================= */

  const [screen, setScreen] =
    useState<Screen>("transfer-details");

  /* =========================
     TRANSFER DETAILS
  ========================= */

  const [customerMobile, setCustomerMobile] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  /* =========================
     OTP
  ========================= */

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);
  const [isVerifyingOtp, setIsVerifyingOtp] =
    useState(false);
  const [otpError, setOtpError] = useState("");

  /* =========================
     BENEFICIARIES
  ========================= */

  const [beneficiaries, setBeneficiaries] =
    useState<Beneficiary[]>(initialBeneficiaries);

  const [selectedBeneficiary, setSelectedBeneficiary] =
    useState<Beneficiary | null>(null);

  /* =========================
     ADD BENEFICIARY
  ========================= */

  const [beneficiaryName, setBeneficiaryName] =
    useState("");

  const [beneficiaryBank, setBeneficiaryBank] =
    useState<Bank | null>(null);

  const [beneficiaryAccount, setBeneficiaryAccount] =
    useState("");

  const [beneficiaryMobile, setBeneficiaryMobile] =
    useState("");

  const [verifyAccount, setVerifyAccount] =
    useState(false);

  const [isVerifyingAccount, setIsVerifyingAccount] =
    useState(false);

  const [accountVerified, setAccountVerified] =
    useState(false);

  /* =========================
     SEND MONEY
  ========================= */

  const [sendAmount, setSendAmount] = useState("");

  const [transferMode, setTransferMode] = useState<
    "IMPS" | "NEFT"
  >("IMPS");

  const [isProcessingTransfer, setIsProcessingTransfer] =
    useState(false);

  /* =========================
     SUCCESS
  ========================= */

  const [transactionId, setTransactionId] =
    useState("");

  /* =========================
     TEMPORARY DATA
  ========================= */

  const availableBalance = 25000;

  const customerName = "Ravi Kumar";

  /*
   * Demo values matching the reference UI.
   */
  const commission = 5;

  /* =========================
     HELPERS
  ========================= */

  const formatMobile = (value: string) => {
    return value.replace(/\D/g, "").slice(0, 10);
  };

  const formatAmount = (value: string) => {
    return value.replace(/\D/g, "");
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);

    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }

    return `${parts[0][0]}${parts[parts.length - 1][0]
      }`.toUpperCase();
  };

  /* =========================
     CCF CALCULATION
  ========================= */

  const numericSendAmount = Number(sendAmount) || 0;

  const ccf = numericSendAmount * 0.01;

  const totalPayable = numericSendAmount + ccf;

  /* =========================
     OTP TIMER
  ========================= */

  useEffect(() => {
    if (!otpSent || otpTimer <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setOtpTimer((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [otpSent, otpTimer]);

  /* =========================
     TRANSFER VALIDATION
  ========================= */

  const isTransferDetailsValid =
    customerMobile.length === 10 &&
    transferAmount.length > 0 &&
    Number(transferAmount) > 0 &&
    Number(transferAmount) <= availableBalance;

  /* =========================
     TRANSFER INPUT
  ========================= */

  const handleCustomerMobileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerMobile(
      formatMobile(event.target.value)
    );
  };

  const handleAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTransferAmount(
      formatAmount(event.target.value)
    );
  };

  /* =========================
     CONTINUE
  ========================= */

  const handleContinue = () => {
    if (!isTransferDetailsValid) {
      return;
    }

    /*
     * Actual API:
     *
     * await sendOtp(customerMobile)
     *
     * Frontend demo for now.
     */

    setOtp("");
    setOtpError("");
    setOtpSent(true);
    setOtpTimer(30);

    setScreen("otp");
  };

  /* =========================
     OTP INPUT
  ========================= */

  /* =========================
     VERIFY OTP
  ========================= */

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      return;
    }

    setOtpError("");
    setIsVerifyingOtp(true);

    /*
     * Demo OTP = 123456
     *
     * Replace with actual OTP verification API.
     */

    setTimeout(() => {
      setIsVerifyingOtp(false);

      if (otp === "123456") {
        setScreen("customer-details");
      } else {
        setOtpError(
          "Invalid OTP. Please enter the correct OTP."
        );
      }
    }, 1200);
  };

  /* =========================
     RESEND OTP
  ========================= */

  const handleResendOtp = () => {
    if (otpTimer > 0) {
      return;
    }

    setOtp("");
    setOtpError("");
    setOtpTimer(30);
    setOtpSent(true);
  };

  /* =========================
     BACK
  ========================= */

  const handleBack = () => {
    switch (screen) {
      case "transfer-details":
        navigate("/retailer");
        break;

      case "otp":
        setOtp("");
        setOtpError("");
        setOtpSent(false);
        setScreen("transfer-details");
        break;

      case "customer-details":
        setScreen("otp");
        break;

      case "add-beneficiary":
        resetBeneficiaryForm();
        setScreen("customer-details");
        break;

      case "send-money":
        setSendAmount("");
        setScreen("customer-details");
        break;

      case "success":
        setScreen("send-money");
        break;
    }
  };

  /* =========================
     RESET BENEFICIARY
  ========================= */

  const resetBeneficiaryForm = () => {
    setBeneficiaryName("");
    setBeneficiaryBank(null);
    setBeneficiaryAccount("");
    setBeneficiaryMobile("");
    setVerifyAccount(false);
    setIsVerifyingAccount(false);
    setAccountVerified(false);
  };

  /* =========================
     OPEN ADD BENEFICIARY
  ========================= */

  const handleOpenAddBeneficiary = () => {
    resetBeneficiaryForm();
    setScreen("add-beneficiary");
  };

  /* =========================
     ACCOUNT VERIFICATION
  ========================= */

  const canVerifyAccount =
    beneficiaryName.trim().length > 0 &&
    beneficiaryBank !== null &&
    beneficiaryAccount.length >= 8 &&
    beneficiaryMobile.length === 10;

  const handleVerifyAccountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;

    if (!checked) {
      setVerifyAccount(false);
      setAccountVerified(false);
      return;
    }

    if (!canVerifyAccount) {
      return;
    }

    setVerifyAccount(true);
    setAccountVerified(false);
    setIsVerifyingAccount(true);

    /*
     * Frontend simulation.
     *
     * Replace with actual bank account verification API.
     */

    setTimeout(() => {
      setIsVerifyingAccount(false);
      setAccountVerified(true);
    }, 1500);
  };

  /* =========================
     ADD BENEFICIARY
  ========================= */

  const canAddBeneficiary =
    beneficiaryName.trim().length > 0 &&
    beneficiaryBank !== null &&
    beneficiaryAccount.length >= 8 &&
    beneficiaryMobile.length === 10 &&
    verifyAccount &&
    accountVerified;

  const handleAddBeneficiary = () => {
    if (!canAddBeneficiary || !beneficiaryBank) {
      return;
    }

    const newBeneficiary: Beneficiary = {
      id: Date.now(),
      name: beneficiaryName.trim(),
      initials: getInitials(beneficiaryName),
      bankName: beneficiaryBank.name,
      accountNumber:
        "XXXX XXXX " +
        beneficiaryAccount.slice(-4),
      ifsc: beneficiaryBank.ifsc,
      mobile: beneficiaryMobile,
    };

    setBeneficiaries((previous) => [
      ...previous,
      newBeneficiary,
    ]);

    resetBeneficiaryForm();
    setScreen("customer-details");
  };

  /* =========================
     SEND TO BENEFICIARY
  ========================= */

  const handleSendToBeneficiary = (
    beneficiary: Beneficiary
  ) => {
    /*
     * IMPORTANT:
     *
     * Clicking SEND now opens the
     * Send Money Transfer screen.
     */

    setSelectedBeneficiary(beneficiary);

    setSendAmount("");

    setTransferMode("IMPS");

    setScreen("send-money");
  };

  /* =========================
     SEND MONEY VALIDATION
  ========================= */

  const canTransfer =
    numericSendAmount > 0 &&
    numericSendAmount <= availableBalance;

  /* =========================
     TRANSFER NOW
  ========================= */

  const handleTransferNow = () => {
    if (!selectedBeneficiary) {
      return;
    }

    if (!canTransfer) {
      return;
    }

    setIsProcessingTransfer(true);

    /*
     * Actual DMT transfer API will be called here.
     *
     * Example:
     *
     * await initiateDmtTransfer({
     *   beneficiaryId: selectedBeneficiary.id,
     *   amount: numericSendAmount,
     *   mode: transferMode,
     * })
     */

    setTimeout(() => {
      setIsProcessingTransfer(false);

      const id = `HP${Date.now()
        .toString()
        .slice(-10)}`;

      setTransactionId(id);

      setScreen("success");
    }, 1800);
  };

  /* =========================
     NEW TRANSACTION
  ========================= */

  const handleAnotherTransaction = () => {
    setCustomerMobile("");
    setTransferAmount("");
    setOtp("");
    setOtpSent(false);
    setOtpTimer(30);
    setOtpError("");

    setSelectedBeneficiary(null);

    setSendAmount("");
    setTransferMode("IMPS");

    setTransactionId("");

    setScreen("transfer-details");
  };

  /* =========================
     PAGE HEADER
  ========================= */

  const PageHeader = ({
    title,
  }: {
    title: string;
  }) => {
    return (
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-5 sm:px-6">
          <button
            type="button"
            onClick={handleBack}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:bg-gray-100"
          >
            <ArrowLeft className="h-6 w-6 text-[#111827]" />
          </button>

          <h1 className="text-2xl font-bold text-[#111827] sm:text-3xl">
            {title}
          </h1>
        </div>
      </div>
    );
  };

  /* =========================
     TRANSFER DETAILS SCREEN
  ========================= */

  const renderTransferDetails = () => {
    return (
      <div className="bg-[#f5f7fb]">
        <main className="px-4 py-7 sm:px-6">
          <div className="mx-auto w-full max-w-5xl space-y-6">
            <section className="min-h-[190px] overflow-hidden rounded-3xl bg-gradient-to-r from-[#3156d9] via-[#218bbd] to-[#10a88a] p-5 text-white shadow-lg sm:p-6">
              <div className="flex h-full flex-col gap-5 md:flex-row md:items-center md:gap-6">
                <div className="flex min-w-0 items-center gap-4 md:w-[32%] md:shrink-0">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                    <Send className="h-7 w-7" />
                  </div>

                  <div className="min-w-0">
                    <h1 className="text-2xl font-bold sm:text-3xl">
                      DMT
                    </h1>

                    <p className="mt-1 text-sm leading-5 text-white/80 sm:text-base">
                      Send money securely to any bank account
                    </p>
                  </div>
                </div>

                <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white/10 p-3.5 sm:p-4">
                    <Wallet className="h-5 w-5" />

                    <p className="mt-2 text-xs text-white/75 sm:text-sm">
                      Available Balance
                    </p>

                    <p className="mt-0.5 text-xl font-bold sm:text-2xl">
                      ₹25,000
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-3.5 sm:p-4">
                    <Send className="h-5 w-5" />

                    <p className="mt-2 text-xs text-white/75 sm:text-sm">
                      Transfer Type
                    </p>

                    <p className="mt-0.5 text-xl font-bold sm:text-2xl">
                      IMPS / NEFT
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-3.5 sm:p-4">
                    <ShieldCheck className="h-5 w-5" />

                    <p className="mt-2 text-xs text-white/75 sm:text-sm">
                      Security
                    </p>

                    <p className="mt-0.5 text-xl font-bold sm:text-2xl">
                      OTP Protected
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-7 rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm sm:p-9">
              <h2 className="text-2xl font-bold text-[#111827]">
                Transfer Details
              </h2>

              <p className="mt-2 text-base text-[#50627d]">
                Enter the customer's mobile number and
                transfer amount.
              </p>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {/* Mobile */}
                <div>
                  <label className="mb-3 block text-base font-semibold text-[#183153]">
                    Customer Mobile Number
                  </label>

                  <div className="flex min-h-[62px] items-center gap-4 rounded-2xl border border-gray-200 px-5 focus-within:border-[#315bd1] focus-within:ring-2 focus-within:ring-[#315bd1]/10">
                    <Phone className="h-6 w-6 text-[#9aa5b5]" />

                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={10}
                      value={customerMobile}
                      onChange={
                        handleCustomerMobileChange
                      }
                      placeholder="Enter 10-digit mobile number"
                      className="w-full bg-transparent text-base outline-none"
                    />
                  </div>

                  {customerMobile.length > 0 &&
                    customerMobile.length !== 10 && (
                      <p className="mt-2 text-sm text-red-500">
                        Enter a valid 10-digit mobile number.
                      </p>
                    )}
                </div>

                {/* Amount */}
                <div>
                  <label className="mb-3 block text-base font-semibold text-[#183153]">
                    Transfer Amount
                  </label>

                  <div className="flex min-h-[62px] items-center gap-4 rounded-2xl border border-gray-200 px-5 focus-within:border-[#315bd1] focus-within:ring-2 focus-within:ring-[#315bd1]/10">
                    <span className="text-2xl text-[#9aa5b5]">
                      ₹
                    </span>

                    <input
                      type="text"
                      inputMode="numeric"
                      value={transferAmount}
                      onChange={handleAmountChange}
                      placeholder="Enter transfer amount"
                      className="w-full bg-transparent text-base outline-none"
                    />
                  </div>

                  {Number(transferAmount) >
                    availableBalance && (
                      <p className="mt-2 text-sm text-red-500">
                        Amount cannot exceed available balance.
                      </p>
                    )}
                </div>
              </div>

              <div className="mt-7 flex items-start gap-4 rounded-2xl bg-[#f1f4fd] p-5">
                <LockKeyhole className="h-6 w-6 shrink-0 text-[#315bd1]" />

                <div>
                  <h3 className="font-semibold text-[#183153]">
                    Secure Money Transfer
                  </h3>

                  <p className="mt-1 text-sm text-[#50627d]">
                    The transaction will require beneficiary
                    verification and OTP authentication.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={!isTransferDetailsValid}
                  className="flex min-h-[60px] items-center gap-3 rounded-2xl bg-[#315bd1] px-8 font-bold text-white transition hover:bg-[#274dbd] disabled:cursor-not-allowed disabled:bg-[#aab9e7]"
                >
                  Continue

                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  };

  /* =========================
     OTP SCREEN
  ========================= */

  const renderOtpVerification = () => {
    return (
      <div className="bg-[#f5f7fb]">
        <PageHeader title="OTP Verification" />

        <main className="mx-auto flex max-w-5xl flex-col items-center px-5 py-14 text-center sm:py-20">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#e5ebfb]">
            <MessageSquare className="h-14 w-14 fill-[#315bd1] text-[#315bd1]" />
          </div>

          <h2 className="mt-10 text-3xl font-bold text-[#172033] sm:text-4xl">
            Enter Verification Code
          </h2>

          <p className="mt-4 text-lg text-[#555b67] sm:text-2xl">
            OTP has been sent to{" "}
            <span className="font-medium">
              +91 {customerMobile}
            </span>
          </p>

          <div className="mt-10 w-full max-w-xl">
            <OtpInput
              value={otp}
              onChange={(value) => {
                setOtp(value);
                setOtpError("");
              }}
              length={6}
              disabled={isVerifyingOtp}
              error={otpError}
            />
          </div>

          {otpError && (
            <p className="mt-4 text-sm font-medium text-red-500">
              {otpError}
            </p>
          )}

          <div className="mt-9 text-lg text-[#555b67]">
            {otpTimer > 0 ? (
              <>
                Resend OTP in{" "}
                <span className="font-bold text-[#315bd1]">
                  00:{String(otpTimer).padStart(2, "0")}
                </span>
              </>
            ) : (
              <button
                type="button"
                onClick={handleResendOtp}
                className="font-semibold text-[#315bd1]"
              >
                Resend OTP
              </button>
            )}
          </div>

          <div className="mt-6 rounded-xl bg-[#fff8e6] px-5 py-3 text-sm text-[#8a6500]">
            Demo OTP: <strong>123456</strong>
          </div>

          <button
            type="button"
            onClick={handleVerifyOtp}
            disabled={
              otp.length !== 6 ||
              isVerifyingOtp
            }
            className="mt-16 flex min-h-[64px] w-full max-w-[700px] items-center justify-center rounded-2xl bg-[#315bd1] text-xl font-bold text-white disabled:cursor-not-allowed disabled:bg-[#aab9e7]"
          >
            {isVerifyingOtp
              ? "VERIFYING..."
              : "VERIFY OTP"}
          </button>
        </main>
      </div>
    );
  };

  /* =========================
     ADD BENEFICIARY
  ========================= */

  const renderAddBeneficiary = () => {
    return (
      <div className="bg-[#f5f7fb]">
        <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
          <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleBack}
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>

              <div>
                <h2 className="text-2xl font-bold text-[#111827] sm:text-3xl">
                  Add Beneficiary
                </h2>

                <p className="mt-1 text-sm text-[#50627d]">
                  Enter the beneficiary bank account details.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {/* Name */}
              <div>
                <label className="mb-2 block font-semibold text-[#183153]">
                  Beneficiary Name
                </label>

                <input
                  type="text"
                  value={beneficiaryName}
                  onChange={(event) => {
                    setBeneficiaryName(
                      event.target.value
                    );
                    setVerifyAccount(false);
                    setAccountVerified(false);
                  }}
                  placeholder="Enter beneficiary name"
                  className="h-14 w-full rounded-2xl border border-gray-200 px-4 outline-none focus:border-[#315bd1]"
                />
              </div>

              {/* Bank */}
              <div>
                <label className="mb-2 block font-semibold text-[#183153]">
                  Bank Name
                </label>

                <select
                  value={
                    beneficiaryBank?.code || ""
                  }
                  onChange={(event) => {
                    const bank =
                      banks.find(
                        (item) =>
                          item.code ===
                          event.target.value
                      ) || null;

                    setBeneficiaryBank(bank);
                    setVerifyAccount(false);
                    setAccountVerified(false);
                  }}
                  className="h-14 w-full rounded-2xl border border-gray-200 bg-white px-4 outline-none focus:border-[#315bd1]"
                >
                  <option value="">
                    Select Bank
                  </option>

                  {banks.map((bank) => (
                    <option
                      key={bank.code}
                      value={bank.code}
                    >
                      {bank.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Account */}
              <div>
                <label className="mb-2 block font-semibold text-[#183153]">
                  Account Number
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={20}
                  value={beneficiaryAccount}
                  onChange={(event) => {
                    setBeneficiaryAccount(
                      event.target.value.replace(
                        /\D/g,
                        ""
                      )
                    );

                    setVerifyAccount(false);
                    setAccountVerified(false);
                  }}
                  placeholder="Enter account number"
                  className="h-14 w-full rounded-2xl border border-gray-200 px-4 outline-none focus:border-[#315bd1]"
                />
              </div>

              {/* IFSC */}
              <div>
                <label className="mb-2 block font-semibold text-[#183153]">
                  IFSC Code
                </label>

                <input
                  type="text"
                  readOnly
                  value={
                    beneficiaryBank?.ifsc || ""
                  }
                  placeholder="IFSC will be auto-filled"
                  className="h-14 w-full cursor-not-allowed rounded-2xl border border-gray-200 bg-gray-50 px-4 uppercase"
                />
              </div>

              {/* Mobile */}
              <div className="md:col-span-2">
                <label className="mb-2 block font-semibold text-[#183153]">
                  Mobile Number
                </label>

                <div className="flex h-14 items-center gap-3 rounded-2xl border border-gray-200 px-4 focus-within:border-[#315bd1]">
                  <Phone className="h-5 w-5 text-[#9aa5b5]" />

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={10}
                    value={beneficiaryMobile}
                    onChange={(event) => {
                      setBeneficiaryMobile(
                        formatMobile(
                          event.target.value
                        )
                      );

                      setVerifyAccount(false);
                      setAccountVerified(false);
                    }}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Verify */}
            <div className="mt-7 rounded-2xl border border-[#dbe3f8] bg-[#f5f7fd] p-5">
              <label
                className={`flex items-start gap-4 ${canVerifyAccount
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                  }`}
              >
                <input
                  type="checkbox"
                  checked={verifyAccount}
                  disabled={
                    !canVerifyAccount ||
                    isVerifyingAccount
                  }
                  onChange={
                    handleVerifyAccountChange
                  }
                  className="mt-1 h-5 w-5 accent-[#315bd1]"
                />

                <div>
                  <p className="font-semibold text-[#183153]">
                    Verify this account
                  </p>

                  <p className="mt-1 text-sm text-[#50627d]">
                    Verify the beneficiary account before
                    adding it.
                  </p>

                  {!canVerifyAccount && (
                    <p className="mt-2 text-xs text-[#8a94a6]">
                      Fill in all required details first.
                    </p>
                  )}

                  {isVerifyingAccount && (
                    <p className="mt-2 text-sm font-medium text-[#315bd1]">
                      Verifying account...
                    </p>
                  )}

                  {accountVerified && (
                    <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#0aa875]">
                      <Check className="h-4 w-4" />
                      Account verified successfully
                    </p>
                  )}
                </div>
              </label>
            </div>

            {/* Add */}
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={handleAddBeneficiary}
                disabled={!canAddBeneficiary}
                className="flex min-h-[58px] items-center gap-3 rounded-2xl bg-[#315bd1] px-8 font-bold text-white disabled:cursor-not-allowed disabled:bg-[#aab9e7]"
              >
                <Plus className="h-5 w-5" />

                Add Beneficiary
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  };

  /* =========================
     CUSTOMER DETAILS
  ========================= */

  const renderCustomerDetails = () => {
    return (
      <div className="bg-[#f5f7fb]">
        <PageHeader title="Customer Details" />

        <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
          {/* Customer Card */}
          <section className="rounded-[30px] bg-gradient-to-r from-[#315bd1] to-[#4568db] p-6 text-white shadow-lg sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-xl font-bold sm:h-20 sm:w-20">
                  RK
                </div>

                <div>
                  <h2 className="text-2xl font-bold sm:text-3xl">
                    {customerName}
                  </h2>

                  <p className="mt-1 text-base text-white/75">
                    +91 {customerMobile}
                  </p>
                </div>
              </div>

              <div className="flex w-fit items-center gap-2 rounded-xl bg-[#09b878] px-4 py-3 text-sm font-bold">
                <Check className="h-5 w-5" />

                eKYC Verified
              </div>
            </div>

            <div className="my-6 h-px bg-white/20" />

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-base text-white/70">
                  Available Balance
                </p>

                <p className="mt-1 text-3xl font-bold">
                  ₹25000.00
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddBeneficiary}
                className="flex min-h-[56px] items-center justify-center gap-3 rounded-2xl bg-white px-6 font-bold text-[#315bd1]"
              >
                <Plus className="h-5 w-5" />

                Add Beneficiary
              </button>
            </div>
          </section>

          {/* Heading */}
          <div className="mt-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#111827] sm:text-3xl">
              List of Beneficiaries
            </h2>

            <span className="text-sm text-[#555b67] sm:text-base">
              {beneficiaries.length} Saved
            </span>
          </div>

          {/* List */}
          <div className="mt-5 space-y-5">
            {beneficiaries.map((beneficiary) => (
              <div
                key={beneficiary.id}
                className="rounded-[26px] border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex min-w-0 flex-1 items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#edf1fc] font-bold text-[#315bd1] sm:h-16 sm:w-16">
                      {beneficiary.initials}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-xl font-bold text-[#111827]">
                        {beneficiary.name}
                      </h3>

                      <p className="mt-1 font-medium text-[#555b67]">
                        {beneficiary.bankName}
                      </p>

                      <p className="mt-1 text-sm text-[#555b67] sm:text-base">
                        A/C: {beneficiary.accountNumber}

                        <span className="mx-2">
                          •
                        </span>

                        IFSC: {beneficiary.ifsc}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleSendToBeneficiary(
                        beneficiary
                      )
                    }
                    className="flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-[#315bd1] px-7 text-base font-bold text-white shadow-sm hover:bg-[#274dbd]"
                  >
                    <Send className="h-5 w-5" />

                    Send
                  </button>
                </div>
              </div>
            ))}
          </div>

          {selectedBeneficiary && (
            <div className="mt-6 flex items-start gap-4 rounded-2xl bg-[#f1f4fd] p-5">
              <CircleUserRound className="h-6 w-6 text-[#315bd1]" />

              <div>
                <p className="font-semibold text-[#183153]">
                  Beneficiary Selected
                </p>

                <p className="mt-1 text-sm text-[#50627d]">
                  {selectedBeneficiary.name}
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  };

  /* =========================
     SEND MONEY TRANSFER
  ========================= */

  const renderSendMoney = () => {
    if (!selectedBeneficiary) {
      return null;
    }

    return (
      <div className="bg-[#f5f7fb]">
        <PageHeader title="Send Money Transfer" />

        <main className="mx-auto max-w-5xl px-5 py-6 sm:py-8">
          {/* Beneficiary Card */}
          <section className="rounded-[28px] border border-gray-300 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#edf1fc] font-bold text-[#315bd1]">
                {selectedBeneficiary.initials}
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-[#111827]">
                  {selectedBeneficiary.name}
                </h2>

                <p className="mt-1 text-base font-semibold text-[#111827]">
                  {selectedBeneficiary.bankName}
                </p>

                <p className="mt-1 text-sm text-[#555b67]">
                  A/C: {selectedBeneficiary.accountNumber}
                  <span className="mx-2">•</span>
                  IFSC: {selectedBeneficiary.ifsc}
                </p>
              </div>

              <span className="rounded-xl bg-[#e5f8ef] px-4 py-2 text-sm font-semibold text-[#16a36d]">
                Active
              </span>
            </div>
          </section>

          {/* Enter Amount */}
          <section className="mt-8">
            <label className="mb-3 block text-xl font-bold text-[#172033]">
              Enter Amount
            </label>

            <div className="flex h-[88px] items-center rounded-[24px] border-2 border-[#315bd1] bg-white px-6">
              <span className="mr-5 text-4xl font-medium text-[#315bd1]">
                ₹
              </span>

              <input
                type="text"
                inputMode="numeric"
                value={sendAmount}
                onChange={(event) => {
                  setSendAmount(
                    formatAmount(
                      event.target.value
                    )
                  );
                }}
                placeholder="1500"
                className="w-full bg-transparent text-4xl font-bold text-[#172033] outline-none placeholder:text-gray-400"
              />
            </div>

            <p className="mt-3 text-lg text-[#555b67]">
              Available Balance: ₹
              {availableBalance.toFixed(2)}
            </p>

            {numericSendAmount >
              availableBalance && (
                <p className="mt-2 text-sm font-medium text-red-500">
                  Amount cannot exceed available balance.
                </p>
              )}
          </section>

          {/* Transfer Mode */}
          <section className="mt-10">
            <h3 className="text-xl font-bold text-[#172033]">
              Transfer Mode
            </h3>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {/* IMPS */}
              <button
                type="button"
                onClick={() =>
                  setTransferMode("IMPS")
                }
                className={`rounded-[24px] border-2 p-6 text-center transition ${transferMode === "IMPS"
                    ? "border-[#315bd1] bg-[#315bd1] text-white shadow-lg"
                    : "border-gray-300 bg-white text-[#172033]"
                  }`}
              >
                <p className="text-2xl font-bold">
                  IMPS
                </p>

                <p
                  className={`mt-1 text-base ${transferMode === "IMPS"
                      ? "text-white/80"
                      : "text-[#555b67]"
                    }`}
                >
                  Instant • 24x7
                </p>
              </button>

              {/* NEFT */}
              <button
                type="button"
                onClick={() =>
                  setTransferMode("NEFT")
                }
                className={`rounded-[24px] border-2 p-6 text-center transition ${transferMode === "NEFT"
                    ? "border-[#315bd1] bg-[#315bd1] text-white shadow-lg"
                    : "border-gray-300 bg-white text-[#172033]"
                  }`}
              >
                <p className="text-2xl font-bold">
                  NEFT
                </p>

                <p
                  className={`mt-1 text-base ${transferMode === "NEFT"
                      ? "text-white/80"
                      : "text-[#555b67]"
                    }`}
                >
                  Batch • Mon–Sat
                </p>
              </button>
            </div>
          </section>

          {/* Summary */}
          {numericSendAmount > 0 && (
            <section className="mt-8 rounded-[28px] border border-gray-300 bg-white p-6 sm:p-8">
              <div className="space-y-6 text-lg">
                <div className="flex items-center justify-between">
                  <span className="text-[#555b67]">
                    Transfer Amount
                  </span>

                  <span className="font-bold text-[#172033]">
                    ₹
                    {numericSendAmount.toFixed(2)}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#555b67]">
                      CCF (1%)
                    </span>

                    <span className="font-bold text-[#172033]">
                      ₹{ccf.toFixed(2)}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-[#8a8f99]">
                    Customer Convenience Fee
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#555b67]">
                    Your Commission
                  </span>

                  <span className="font-bold text-[#10a66d]">
                    +₹{commission.toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-[#172033]">
                      Total Payable
                    </span>

                    <span className="text-2xl font-bold text-[#172033]">
                      ₹{totalPayable.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Transfer Now */}
          <button
            type="button"
            onClick={handleTransferNow}
            disabled={
              !canTransfer ||
              isProcessingTransfer
            }
            className="mt-8 flex min-h-[64px] w-full items-center justify-center rounded-[22px] bg-[#315bd1] text-xl font-bold text-white shadow-md transition hover:bg-[#274dbd] disabled:cursor-not-allowed disabled:bg-[#9eafe4]"
          >
            {isProcessingTransfer ? (
              <div className="flex items-center gap-3">
                <span className="h-6 w-6 animate-spin rounded-full border-3 border-white/30 border-t-white" />

                PROCESSING...
              </div>
            ) : (
              "TRANSFER NOW"
            )}
          </button>

          {/* Save */}
          <button
            type="button"
            className="mt-5 flex min-h-[60px] w-full items-center justify-center rounded-[22px] border-2 border-[#c2cde8] bg-transparent text-xl font-bold text-[#315bd1] transition hover:bg-white"
          >
            SAVE
          </button>
        </main>
      </div>
    );
  };

  /* =========================
     SUCCESS SCREEN
  ========================= */

  const renderSuccess = () => {
    if (!selectedBeneficiary) {
      return null;
    }

    return (
      <div className="bg-[#f5f7fb]">
        <main className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
          {/* Success Icon */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-36 w-36 items-center justify-center rounded-full bg-[#dff7ed]">
              <Check className="h-20 w-20 text-[#13ae6e]" />
            </div>

            <h1 className="mt-8 text-3xl font-bold text-[#12a968] sm:text-4xl">
              Transfer Successful!
            </h1>

            <p className="mt-3 text-xl text-[#555b67]">
              Money transferred to{" "}
              <span className="font-medium">
                {selectedBeneficiary.name}
              </span>
            </p>
          </div>

          {/* Receipt */}
          <section className="mt-10 rounded-[30px] border border-gray-300 bg-white p-7 shadow-sm sm:p-9">
            {/* Amount */}
            <div className="text-center">
              <p className="text-4xl font-bold text-[#172033]">
                ₹{numericSendAmount.toFixed(2)}
              </p>

              <span className="mt-4 inline-flex rounded-xl bg-[#e4f8ef] px-5 py-2 text-sm font-bold tracking-widest text-[#12a968]">
                SUCCESS
              </span>
            </div>

            <div className="my-7 h-px bg-gray-200" />

            {/* Transaction ID */}
            <div className="space-y-5 text-base sm:text-lg">
              <div className="flex items-start justify-between gap-5">
                <span className="text-[#555b67]">
                  Transaction ID
                </span>

                <span className="text-right font-bold text-[#172033]">
                  {transactionId}
                </span>
              </div>

              <div className="flex items-start justify-between gap-5">
                <span className="text-[#555b67]">
                  Beneficiary
                </span>

                <span className="text-right font-semibold text-[#172033]">
                  {selectedBeneficiary.name}
                </span>
              </div>

              <div className="flex items-start justify-between gap-5">
                <span className="text-[#555b67]">
                  Bank Name
                </span>

                <span className="text-right font-semibold text-[#172033]">
                  {selectedBeneficiary.bankName}
                </span>
              </div>

              <div className="flex items-start justify-between gap-5">
                <span className="text-[#555b67]">
                  Account Number
                </span>

                <span className="text-right font-semibold text-[#172033]">
                  {selectedBeneficiary.accountNumber}
                </span>
              </div>

              <div className="flex items-start justify-between gap-5">
                <span className="text-[#555b67]">
                  IFSC Code
                </span>

                <span className="text-right font-semibold text-[#172033]">
                  {selectedBeneficiary.ifsc}
                </span>
              </div>

              <div className="flex items-start justify-between gap-5">
                <span className="text-[#555b67]">
                  Transfer Mode
                </span>

                <span className="text-right font-semibold text-[#172033]">
                  {transferMode}
                </span>
              </div>

              <div className="flex items-start justify-between gap-5">
                <span className="text-[#555b67]">
                  CCF Charged
                </span>

                <span className="text-right font-semibold text-[#172033]">
                  ₹{ccf.toFixed(2)}
                </span>
              </div>

              <div className="flex items-start justify-between gap-5">
                <span className="text-[#555b67]">
                  Commission Earned
                </span>

                <span className="text-right font-bold text-[#12a968]">
                  +₹{commission.toFixed(2)}
                </span>
              </div>

              <div className="flex items-start justify-between gap-5">
                <span className="text-[#555b67]">
                  Total Deducted
                </span>

                <span className="text-right font-bold text-[#172033]">
                  ₹{totalPayable.toFixed(2)}
                </span>
              </div>
            </div>
          </section>

          {/* Print Receipt */}
          <button
            type="button"
            onClick={() => window.print()}
            className="mt-7 flex min-h-[64px] w-full items-center justify-center gap-3 rounded-[22px] border-2 border-[#b9c7e8] bg-transparent text-xl font-bold text-[#315bd1] transition hover:bg-white"
          >
            <Printer className="h-6 w-6" />

            PRINT RECEIPT
          </button>

          {/* Another Transaction */}
          <button
            type="button"
            onClick={handleAnotherTransaction}
            className="mt-5 flex min-h-[64px] w-full items-center justify-center gap-3 rounded-[22px] bg-[#315bd1] text-xl font-bold text-white shadow-md transition hover:bg-[#274dbd]"
          >
            <RefreshCw className="h-6 w-6" />

            ANOTHER TRANSACTION
          </button>
        </main>
      </div>
    );
  };

  /* =========================
     MAIN RENDER
  ========================= */

  return (
    <>
      {screen === "transfer-details" &&
        renderTransferDetails()}

      {screen === "otp" &&
        renderOtpVerification()}

      {screen === "customer-details" &&
        renderCustomerDetails()}

      {screen === "add-beneficiary" &&
        renderAddBeneficiary()}

      {screen === "send-money" &&
        renderSendMoney()}

      {screen === "success" &&
        renderSuccess()}
    </>
  );
};

export default Dmt;
