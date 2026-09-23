export interface DashboardStats {
  totalRetailers: number;
  pendingKyc: number;
  approvedRetailers: number;
  suspendedRetailers: number;
  totalAepsTransactions: number;
  totalDmtTransactions: number;
  totalCmsTransactions: number;
  totalCommission: number;
}

export interface RecentRetailer {
  id: string;
  name: string;
  mobile: string;
  kycStatus: "Approved" | "Pending" | "Rejected";
  registrationDate: string;
}

export interface RecentTransaction {
  id: string;
  retailer: string;
  service: "AEPS" | "DMT" | "CMS";
  amount: number;
  status: "Success" | "Pending" | "Failed";
  date: string;
}
