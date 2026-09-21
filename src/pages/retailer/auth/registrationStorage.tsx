export interface RegistrationData {
  // ==========================================================
  // ACCOUNT
  // ==========================================================
  pan?: string;
  mobile?: string;
  otpSent?: boolean;
  otpVerified?: boolean;

  // ==========================================================
  // SHOP DETAILS
  // ==========================================================
  email?: string;
  emailOtpSent?: boolean;
  shopName?: string;
  category?: string;
  propertyType?: string;
  address?: string;
  locationAdded?: boolean;

  // ==========================================================
  // ABOUT RETAILER
  // ==========================================================
  fullName?: string;
  selfieName?: string;
  gender?: string;
  maritalStatus?: string;
  education?: string;

  // ==========================================================
  // PAN VERIFICATION
  // ==========================================================
  panFileName?: string;
  panNumber?: string;
  nameAsPerPan?: string;
  panDateOfBirth?: string;
  fatherName?: string;

  // ==========================================================
  // AADHAAR
  // ==========================================================
  aadhaarNumber?: string;
  aadhaarFileName?: string;
  aadhaarConsent?: boolean;
  aadhaarLinkedMobile?: "yes" | "no";
  aadhaarDateOfBirth?: string;

  // ==========================================================
  // DOB
  // ==========================================================
  dateOfBirth?: string;

  // ==========================================================
  // BUSINESS PROOF
  // ==========================================================
  businessProof?: string;
  businessProofFileName?: string;

  // ==========================================================
  // BANK DETAILS
  // ==========================================================
  bankName?: string;
  ifscCode?: string;
  accountNumber?: string;
  confirmAccountNumber?: string;
}

/*
 * ============================================================
 * STORAGE KEY
 * ============================================================
 *
 * All registration-step data is stored under one key.
 *
 * This prevents data from disappearing when a step component
 * is unmounted and mounted again while navigating.
 */
const STORAGE_KEY = "happyPayRetailerRegistration";

/*
 * ============================================================
 * GET REGISTRATION DATA
 * ============================================================
 */
export const getRegistrationData = (): RegistrationData => {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);

    if (!rawData) {
      return {};
    }

    const parsedData = JSON.parse(rawData);

    if (
      parsedData &&
      typeof parsedData === "object" &&
      !Array.isArray(parsedData)
    ) {
      return parsedData as RegistrationData;
    }

    return {};
  } catch (error) {
    console.error(
      "Failed to read HappyPay registration data:",
      error,
    );

    return {};
  }
};

/*
 * ============================================================
 * UPDATE REGISTRATION DATA
 * ============================================================
 *
 * Only the fields supplied in `updates` are changed.
 *
 * Existing fields remain untouched.
 */
export const updateRegistrationData = (
  updates: Partial<RegistrationData>,
): RegistrationData => {
  const existingData = getRegistrationData();

  const updatedData: RegistrationData = {
    ...existingData,
    ...updates,
  };

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedData),
    );
  } catch (error) {
    console.error(
      "Failed to save HappyPay registration data:",
      error,
    );
  }

  return updatedData;
};

/*
 * ============================================================
 * REMOVE A SINGLE FIELD
 * ============================================================
 *
 * Useful when a document is replaced and dependent extracted
 * information needs to be cleared before new data is generated.
 */
export const removeRegistrationField = (
  field: keyof RegistrationData,
): RegistrationData => {
  const existingData = getRegistrationData();

  const updatedData = {
    ...existingData,
  };

  delete updatedData[field];

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedData),
    );
  } catch (error) {
    console.error(
      "Failed to remove registration field:",
      error,
    );
  }

  return updatedData;
};

/*
 * ============================================================
 * CLEAR REGISTRATION DATA
 * ============================================================
 *
 * Called only after the complete retailer registration has
 * been submitted successfully.
 */
export const clearRegistrationData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error(
      "Failed to clear HappyPay registration data:",
      error,
    );
  }
};

/*
 * ============================================================
 * CHECK WHETHER REGISTRATION DATA EXISTS
 * ============================================================
 */
export const hasRegistrationData = (): boolean => {
  const data = getRegistrationData();

  return Object.keys(data).length > 0;
};