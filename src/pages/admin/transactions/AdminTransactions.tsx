import { useState } from "react";
import { Activity,  } from "lucide-react";

type TxFilter = 'All' | 'AEPS Cash Withdraw' | 'AEPS Cash Deposit' | 'CMS Cash Collection' | 'CMS Cash Drop' | 'DMT' | 'UPI Cashpoint' | 'Aadhar Pay' | 'BBPS';

import { DUMMY_TRANSACTIONS } from "./mockTransactions";


export default function AdminTransactions() {
  const [filter, setFilter] = useState<TxFilter>('All');
  const [dateStr, setDateStr] = useState<string>(new Date().toISOString().split('T')[0]);

  const filteredTransactions = DUMMY_TRANSACTIONS.filter(tx => 
    (filter === 'All' || tx.type === filter) && 
    tx.date === dateStr
  );

  return (

    <div className="mx-auto w-full max-w-6xl space-y-6">
      <section>
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#315bd1]">
          Management
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          Transactions
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          View and filter transactions across all retailers.
        </p>
      </section>

      <section className="hp-card overflow-hidden rounded-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 p-5">
          <div className="flex items-center gap-2 shrink-0">
            <Activity className="h-5 w-5 text-[#315bd1]" />
            <h2 className="text-base font-bold text-slate-900">
              Transaction Records
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            <input
              type="date"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
              className="h-9 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs outline-none focus:border-[#315bd1] focus:bg-white"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as TxFilter)}
              className="h-9 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs outline-none"
            >
              <option value="All">All Types</option>
              <option value="AEPS Cash Withdraw">AEPS Cash Withdraw</option>
              <option value="AEPS Cash Deposit">AEPS Cash Deposit</option>
              <option value="CMS Cash Collection">CMS Cash Collection</option>
              <option value="CMS Cash Drop">CMS Cash Drop</option>
              <option value="DMT">DMT</option>
              <option value="UPI Cashpoint">UPI Cashpoint</option>
              <option value="Aadhar Pay">Aadhar Pay</option>
              <option value="BBPS">BBPS</option>
            </select>
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-500">
            No transactions found for the selected filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="hp-table whitespace-nowrap">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Transaction ID</th>
                  <th>Retailer ID</th>
                  <th>Name</th>
                  <th>Mobile Number</th>
                  <th>Type</th>
                  <th>Flow</th>
                  <th>Commission</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id}>
                    <td>{tx.date}</td>
                    <td><span className="font-bold text-slate-600">{tx.id}</span></td>
                    <td><span className="font-bold text-[#315bd1]">{tx.retailerId}</span></td>
                    <td className="font-bold text-slate-800">{tx.name}</td>
                    <td>{tx.mobile}</td>
                    <td><span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-[10px] font-bold">{tx.type}</span></td>
                    <td>
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${tx.flow === 'Debit' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        {tx.flow}
                      </span>
                    </td>
                    <td className="font-bold text-emerald-600">{tx.commission}</td>
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
