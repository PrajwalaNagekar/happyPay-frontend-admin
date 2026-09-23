import type { DashboardStats, RecentRetailer, RecentTransaction } from "../../../types/admin/dashboard";

export const dashboardStats: DashboardStats = {
  totalRetailers: 150,
  pendingKyc: 20,
  approvedRetailers: 100,
  suspendedRetailers: 15,
  totalAepsTransactions: 12480,
  totalDmtTransactions: 8360,
  totalCmsTransactions: 4920,
  totalCommission: 284650,
};

export const rejectedRetailers = 15;

export const kycOverview = [
  { label: "Pending KYC", value: dashboardStats.pendingKyc, color: "#e59a20" },
  { label: "Approved", value: dashboardStats.approvedRetailers, color: "#20a873" },
  { label: "Rejected", value: rejectedRetailers, color: "#e05252" },
  { label: "Suspended", value: dashboardStats.suspendedRetailers, color: "#64748b" },
];

export const recentRetailers: RecentRetailer[] = [
  { id: "RET-10482", name: "Shree Ganesh Kirana", mobile: "98765 43210", kycStatus: "Pending", registrationDate: "22 Sep 2026" },
  { id: "RET-10481", name: "Metro Digital Point", mobile: "98111 22004", kycStatus: "Approved", registrationDate: "21 Sep 2026" },
  { id: "RET-10480", name: "Aarav Telecom", mobile: "98990 11772", kycStatus: "Rejected", registrationDate: "20 Sep 2026" },
  { id: "RET-10479", name: "City Connect Services", mobile: "97654 88321", kycStatus: "Pending", registrationDate: "20 Sep 2026" },
];

export const recentTransactions: RecentTransaction[] = [
  { id: "TXN-882104", retailer: "Metro Digital Point", service: "AEPS", amount: 2500, status: "Success", date: "22 Sep, 11:42 AM" },
  { id: "TXN-882103", retailer: "Aarav Telecom", service: "DMT", amount: 12000, status: "Pending", date: "22 Sep, 11:28 AM" },
  { id: "TXN-882102", retailer: "City Connect Services", service: "CMS", amount: 4850, status: "Success", date: "22 Sep, 10:55 AM" },
  { id: "TXN-882101", retailer: "Shree Ganesh Kirana", service: "AEPS", amount: 1000, status: "Failed", date: "22 Sep, 10:41 AM" },
];

export const transactionTrend = [42, 58, 48, 74, 66, 91, 84, 108, 96, 122, 116, 138];

export const earningsOverview = { aeps: 126400, dmt: 98250, cms: 60000, total: 284650 };

export const customerOverview = { total: 4820, aeps: 2940, dmt: 1880 };

export const cmsSummary = { companies: 8, productLines: 24, commission: "Configured", limits: "Configured" };

export const recentAdminActivity = [
  { admin: "Super Admin", action: "KYC Approved", entity: "RET-10481", date: "22 Sep, 11:30 AM" },
  { admin: "Super Admin", action: "Limit Changed", entity: "CMS / Daily Cap", date: "21 Sep, 05:12 PM" },
  { admin: "Operations Admin", action: "Retailer Suspended", entity: "RET-10462", date: "21 Sep, 03:48 PM" },
];
