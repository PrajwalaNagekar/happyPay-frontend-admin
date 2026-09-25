import { RefreshCw, Search, Settings, Building2, Eye, ArrowLeft } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

// Mock Data
const dummyCompanies = [
  { id: "1", name: "Cholamandalam Finance", commission: "0.04%" },
  { id: "2", name: "Muthoot Finance", commission: "0.04%" },
  { id: "3", name: "Hero FinCorp", commission: "0.04%" },
  { id: "4", name: "Bajaj Finserv", commission: "0.04%" },
  { id: "5", name: "L&T Finance Holdings", commission: "0.04%" },
  { id: "6", name: "Mahindra & Mahindra Financial Services", commission: "0.04%" },
  { id: "7", name: "TVS Credit Services", commission: "0.04%" },
];

const dummyTransactions = [
  { id: "1", companyId: "1", retailerId: "RET001", retailerName: "Ramesh Store", customerName: "Rajesh Kumar", txType: "CMS Cash Collection", amount: "₹12,000", commission: "₹24.00" },
  { id: "2", companyId: "1", retailerId: "RET002", retailerName: "Suresh Electronics", customerName: "Anita Sharma", txType: "CMS Cash Drop", amount: "₹8,500", commission: "₹17.00" },
  { id: "3", companyId: "2", retailerId: "RET003", retailerName: "Anil Mobile Point", customerName: "Vikram Singh", txType: "CMS Cash Collection", amount: "₹15,000", commission: "₹22.50" },
  { id: "4", companyId: "3", retailerId: "RET001", retailerName: "Ramesh Store", customerName: "Sanjay Patel", txType: "CMS Cash Drop", amount: "₹5,000", commission: "₹12.50" },
  { id: "5", companyId: "4", retailerId: "RET004", retailerName: "Sunita Cyber Cafe", customerName: "Neha Gupta", txType: "CMS Cash Collection", amount: "₹20,000", commission: "₹36.00" },
];

export default function AdminCmsConfig() {
  const [items, setItems] = useState(dummyCompanies);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<{id: string, name: string} | null>(null);
  const [detailTxFilter, setDetailTxFilter] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      let filteredItems = [...dummyCompanies];
      if (search) {
        const query = search.toLowerCase();
        filteredItems = filteredItems.filter(item => 
          item.name.toLowerCase().includes(query)
        );
      }
      setItems(filteredItems);
      setLoading(false);
    }, 400); // Simulate network latency
  }, [search]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const handleSearch = () => {
    load();
  };

  if (selectedCompany) {
    const companyTx = dummyTransactions.filter(tx => tx.companyId === selectedCompany.id);

    return (
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <section>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSelectedCompany(null)}
              className="flex items-center justify-center h-8 w-8 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-[#315bd1] hover:border-[#315bd1] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#315bd1]">
                Configuration / CMS
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                {selectedCompany.name} Transactions
              </h1>
            </div>
          </div>
        </section>

        <section className="hp-card overflow-hidden rounded-2xl">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-[#315bd1]" />
              <h2 className="text-base font-bold text-slate-900">
                Transaction Details
              </h2>
            </div>
            
            <div className="flex items-center gap-2">
              <select
                value={detailTxFilter}
                onChange={(event) => setDetailTxFilter(event.target.value)}
                className="h-9 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs outline-none"
              >
                <option value="">All Types</option>
                <option value="CMS Cash Collection">Cash Collection</option>
                <option value="CMS Cash Drop">Cash Drop</option>
              </select>
            </div>
          </div>

          {companyTx.filter(tx => !detailTxFilter || tx.txType === detailTxFilter).length === 0 ? (
            <div className="p-12 text-center text-sm text-slate-500">
              No transactions found for this company.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="hp-table">
                <thead>
                  <tr>
                    <th>Retailer ID</th>
                    <th>Retailer Name</th>
                    <th>Agent / Customer Name</th>
                    <th>Transaction Type</th>
                    <th>Transaction Amount</th>
                    <th>Commission Earned</th>
                  </tr>
                </thead>
                <tbody>
                  {companyTx.filter(tx => !detailTxFilter || tx.txType === detailTxFilter).map((tx) => (
                    <tr key={tx.id}>
                      <td className="font-bold text-[#315bd1]">{tx.retailerId}</td>
                      <td className="font-bold text-slate-800">{tx.retailerName}</td>
                      <td className="font-medium text-slate-700">{tx.customerName}</td>
                      <td><span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-[10px] font-bold">{tx.txType}</span></td>
                      <td className="font-bold text-emerald-600">{tx.amount}</td>
                      <td className="font-bold text-[#315bd1]">{tx.commission}</td>
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

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <section>
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#315bd1]">
          Configuration
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          CMS Configuration
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage Cash Management Services and view company transactions.
        </p>
      </section>

      <section className="hp-card overflow-hidden rounded-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 p-5">
          <div className="flex items-center gap-2 shrink-0">
            <Settings className="h-5 w-5 text-[#315bd1]" />
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Registered Companies
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            <div className="relative w-full sm:w-[220px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleSearch();
                }}
                placeholder="Search companies..."
                className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs outline-none focus:border-[#315bd1] focus:bg-white"
              />
            </div>

            <button
              type="button"
              onClick={() => load()}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="space-y-3 p-5">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-12 animate-pulse rounded-lg bg-slate-100" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-500">
            No companies found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="hp-table">
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Commission Rate</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((company) => (
                  <tr key={company.id}>
                    <td className="font-bold text-slate-800">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-slate-400" />
                        {company.name}
                      </div>
                    </td>
                    <td className="font-medium text-slate-700">{company.commission}</td>
                    <td className="text-right">
                      <button
                        onClick={() => setSelectedCompany({ id: company.id, name: company.name })}
                        className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-[#315bd1] hover:bg-[#315bd1] hover:text-white transition-colors"
                      >
                        <Eye className="h-3.5 w-3.5" /> View
                      </button>
                    </td>
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
