export interface AdminRetailer {
  id: string;
  fullName?: string;
  email?: string;
  mobile?: string;
  panNumber?: string;
  aadhaarNumber?: string;
  aadhaarVerified?: boolean;
  isEmailVerified?: boolean;
  isMobileVerified?: boolean;
  shop?: { name?: string; address?: { addressLine?: string; city?: string; state?: string; pincode?: string } };
  kycStatus?: "pending" | "under_review" | "approved" | "rejected";
  status?: "pending" | "approved" | "active" | "rejected" | "suspended" | "blocked";
  role?: "distributor" | "retailer";
  kycRejectionReason?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RetailerListFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  kycStatus?: string;
}
