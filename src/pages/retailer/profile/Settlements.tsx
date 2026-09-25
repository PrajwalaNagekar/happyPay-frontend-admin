import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  XCircle,
  X
} from "lucide-react";

interface SettlementRecord {
  id: string;
  date: string;
  time: string;
  bankName: string;
  accountLast4: string;
  amount: number;
  status: "Success" | "Pending" | "Failed";
}

const settlements: SettlementRecord[] = [
  {
    id: "SET-20260923-7842",
    date: "23 Sep 2026",
    time: "11:42 AM",
    bankName: "State Bank of India",
    accountLast4: "4821",
    amount: 8500.00,
    status: "Success",
  },
  {
    id: "SET-20260922-6318",
    date: "22 Sep 2026",
    time: "04:18 PM",
    bankName: "HDFC Bank",
    accountLast4: "7214",
    amount: 5200.00,
    status: "Success",
  },
  {
    id: "SET-20260921-4926",
    date: "21 Sep 2026",
    time: "01:26 PM",
    bankName: "ICICI Bank",
    accountLast4: "8392",
    amount: 12500.00,
    status: "Pending",
  },
  {
    id: "SET-20260920-3185",
    date: "20 Sep 2026",
    time: "06:35 PM",
    bankName: "Axis Bank",
    accountLast4: "2145",
    amount: 3750.00,
    status: "Success",
  },
  {
    id: "SET-20260919-2174",
    date: "19 Sep 2026",
    time: "10:15 AM",
    bankName: "State Bank of India",
    accountLast4: "4821",
    amount: 6800.00,
    status: "Failed",
  },
];

export default function Settlements() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"All" | "Success" | "Pending" | "Failed">("All");
  const [selectedRecord, setSelectedRecord] = useState<SettlementRecord | null>(null);

  const filteredSettlements = settlements.filter((record) => {
    if (activeTab === "All") return true;
    return record.status === activeTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Success":
        return "bg-emerald-50 text-emerald-600";
      case "Pending":
        return "bg-orange-50 text-orange-600";
      case "Failed":
        return "bg-red-50 text-red-600";
      default:
        return "bg-slate-50 text-slate-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Success":
        return <CheckCircle2 className="h-10 w-10 text-emerald-500" />;
      case "Pending":
        return <Clock className="h-10 w-10 text-orange-500" />;
      case "Failed":
        return <XCircle className="h-10 w-10 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="px-4 pb-6 sm:px-6 relative">
      <div className="mx-auto w-full max-w-5xl">
        {/* HEADER */}
        <header className="mb-4 flex min-h-14 items-center justify-between rounded-2xl border border-white/80 bg-white/90 px-3 py-2 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.4)] backdrop-blur-md">
          <button
            type="button"
            onClick={() => navigate("/retailer/profile")}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#172033] transition hover:bg-slate-100"
            aria-label="Go back"
          >
            <ArrowLeft size={28} />
          </button>
          <h1 className="text-base font-bold text-[#172033]">Settlements</h1>
          <div className="w-10" />
        </header>

        <main className="space-y-6">
          {/* TOTAL SETTLED CARD */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] p-6 text-white shadow-lg sm:p-8">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            
            <div className="relative z-10 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <p className="text-sm font-medium text-white/80">Total Settled</p>
            </div>
            
            <div className="relative z-10 mt-6">
              <h2 className="text-4xl font-bold tracking-tight">₹17450.00</h2>
              <div className="mt-2 flex items-center gap-2 text-sm text-white/80">
                <CheckCircle2 className="h-4 w-4" />
                <p>Successfully settled amount</p>
              </div>
            </div>
          </section>

          {/* SETTLEMENT HISTORY HEADER */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#172033]">Settlement History</h2>
            <span className="text-sm font-medium text-slate-500">{settlements.length} records</span>
          </div>

          {/* TABS */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {["All", "Success", "Pending", "Failed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "All" | "Success" | "Pending" | "Failed")}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-bold transition-colors ${
                  activeTab === tab
                    ? "bg-[#7c3aed] text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* LIST */}
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-2">
            <div className="flex flex-col">
              {filteredSettlements.map((record, idx) => (
                <div
                  key={record.id}
                  onClick={() => setSelectedRecord(record)}
                  className={`flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-slate-50 ${
                    idx !== filteredSettlements.length - 1 ? "border-b border-slate-100" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f8f5ff] text-[#7c3aed]">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#172033]">{record.id}</h3>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {record.date} • {record.time}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {record.bankName} •••• {record.accountLast4}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-[#172033]">₹{record.amount.toFixed(2)}</span>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </div>
                    <span
                      className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${getStatusColor(
                        record.status
                      )}`}
                    >
                      {record.status}
                    </span>
                  </div>
                </div>
              ))}
              
              {filteredSettlements.length === 0 && (
                <div className="p-8 text-center text-slate-500">
                  No records found for the selected filter.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* POPUP/BOTTOM SHEET */}
      {selectedRecord && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40 bg-slate-900/40"
            onClick={() => setSelectedRecord(null)}
          />
          
          {/* Modal */}
          <div className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-md rounded-t-[2rem] bg-white p-6 shadow-2xl sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-[2rem] sm:p-8">
            <button
              onClick={() => setSelectedRecord(null)}
              className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="mb-8 mt-4 flex flex-col items-center text-center">
              <div className={`flex h-20 w-20 items-center justify-center rounded-full ${getStatusColor(selectedRecord.status).replace('text-', 'bg-').replace('50', '100')}`}>
                {getStatusIcon(selectedRecord.status)}
              </div>
              
              <h2 className="mt-4 text-3xl font-bold text-[#172033]">
                ₹{selectedRecord.amount.toFixed(2)}
              </h2>
              
              <span className={`mt-3 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${getStatusColor(selectedRecord.status)}`}>
                {selectedRecord.status}
              </span>
            </div>
            
            <div className="space-y-4 rounded-2xl bg-slate-50 p-5">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Settlement ID</span>
                <span className="font-bold text-[#172033]">{selectedRecord.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Date & Time</span>
                <span className="font-bold text-[#172033]">{selectedRecord.date} • {selectedRecord.time}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Bank</span>
                <span className="font-bold text-[#172033]">{selectedRecord.bankName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Account</span>
                <span className="font-bold text-[#172033]">•••• {selectedRecord.accountLast4}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
