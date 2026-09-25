import { useState } from "react";
import { Activity, Search } from "lucide-react";

type ServiceType = "ALL" | "AEPS" | "DMT" | "CMS";

type Transaction = {
  id: string;
  service: "AEPS" | "DMT" | "CMS";
  title: string;
  customerName: string;
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
    customerName: "Rahul Sharma",
    date: "2026-09-24",
    time: "10:42 AM",
    amount: 5000,
    type: "CREDIT",
    status: "Success",
  },
  {
    id: "TXN002",
    service: "DMT",
    title: "DMT Money Transfer",
    customerName: "Priya Patel",
    date: "2026-09-24",
    time: "09:18 AM",
    amount: 2500,
    type: "DEBIT",
    status: "Success",
  },
  {
    id: "TXN003",
    service: "CMS",
    title: "CMS Collection",
    customerName: "Neha Gupta",
    date: "2026-09-23",
    time: "05:32 PM",
    amount: 8200,
    type: "CREDIT",
    status: "Success",
  },
  {
    id: "TXN004",
    service: "AEPS",
    title: "AEPS Balance Enquiry",
    customerName: "Amit Singh",
    date: "2026-09-23",
    time: "02:15 PM",
    amount: 0,
    type: "DEBIT",
    status: "Success",
  },
];

export default function Transactions() {
  const [filter, setFilter] = useState<ServiceType>('ALL');
  const [dateStr, setDateStr] = useState<string>("2026-09-24");
  const [search, setSearch] = useState("");

  const filteredTransactions = transactions.filter(tx => 
    (filter === 'ALL' || tx.service === filter) && 
    (tx.date === dateStr || dateStr === "") &&
    (tx.id.toLowerCase().includes(search.toLowerCase()) || tx.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <section>
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7c3aed]">
          History
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          Transactions
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          View your complete transaction history.
        </p>
      </section>

      <section className="hp-card overflow-hidden rounded-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 p-5">
          <div className="flex items-center gap-2 shrink-0">
            <Activity className="h-5 w-5 text-[#7c3aed]" />
            <h2 className="text-base font-bold text-slate-900">
              Transaction Records
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-full sm:w-[220px] rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs outline-none focus:border-[#7c3aed] focus:bg-white"
              />
            </div>
            
            <input
              type="date"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
              className="h-9 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs outline-none focus:border-[#7c3aed] focus:bg-white"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as ServiceType)}
              className="h-9 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs outline-none"
            >
              <option value="ALL">All Services</option>
              <option value="AEPS">AEPS</option>
              <option value="DMT">DMT</option>
              <option value="CMS">CMS</option>
            </select>
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-500">
            No transactions found for the selected filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="border-b border-slate-100 bg-slate-50/70 text-[10px] uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-3 font-semibold">Transaction ID</th>
                  <th className="px-5 py-3 font-semibold">Customer Name</th>
                  <th className="px-5 py-3 font-semibold">Service</th>
                  <th className="px-5 py-3 font-semibold">Flow</th>
                  <th className="px-5 py-3 font-semibold">Amount</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Date & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="text-slate-600 hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4 font-bold text-[#7c3aed]">{tx.id}</td>
                    <td className="px-5 py-4 font-bold text-slate-800">{tx.customerName}</td>
                    <td className="px-5 py-4 font-bold text-slate-800">{tx.title}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${tx.type === 'DEBIT' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className={`px-5 py-4 font-bold ${tx.type === 'CREDIT' ? 'text-emerald-600' : 'text-rose-600'}`}>₹{tx.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${tx.status === 'Success' ? 'bg-[#e5f7ee] text-[#087f5b]' : tx.status === 'Pending' ? 'bg-[#fff2df] text-[#c56b08]' : 'bg-[#ffe6ea] text-[#c21d3d]'}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs font-semibold">{tx.date} <span className="text-slate-400">{tx.time}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}