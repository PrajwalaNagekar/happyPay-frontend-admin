import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DUMMY_RETAILERS } from "./mockRetailers";

type Tab = 'registration' | 'transactions' | 'retailers';
type TxFilter = 'AEPS' | 'DMT' | 'CMS' | 'Others';

export default function AdminRetailerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<Tab>('registration');
  const [txFilter, setTxFilter] = useState<TxFilter>('AEPS');

  // Just read from dummy items
  const selected = DUMMY_RETAILERS.find(item => item.id === id);

  if (!selected) {
    return <div className="p-8 text-center text-slate-500 font-medium">Retailer not found</div>;
  }

  // Dummy sub-retailers for distributors
  const subRetailers = [
    { name: "Ashok Kumar", aadhar: "1234-5678-9012", email: "ashok@example.com", mobile: "9000011111", createdAt: "2026-09-20" },
    { name: "Sunita Devi", aadhar: "9876-5432-1098", email: "sunita@example.com", mobile: "9000022222", createdAt: "2026-09-22" }
  ];

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              {selected.fullName}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {selected.id} • <span className="uppercase text-[10px] font-bold text-[#315bd1] ml-1 bg-[#f0f4ff] px-2 py-0.5 rounded-full">{selected.role}</span>
              <span className={`ml-2 uppercase text-[10px] font-bold px-2 py-0.5 rounded-full ${
                selected.status === 'active' ? 'bg-emerald-50 text-emerald-700' :
                selected.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                'bg-rose-50 text-rose-700'
              }`}>{selected.status}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Action buttons removed as requested */}
        </div>
      </div>

      <div className="hp-card rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex gap-6 border-b border-slate-100 pb-0">
          <button
            onClick={() => setActiveTab('registration')}
            className={`text-sm font-bold pb-3 px-1 ${activeTab === 'registration' ? 'text-[#315bd1] border-b-2 border-[#315bd1]' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Registration
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`text-sm font-bold pb-3 px-1 ${activeTab === 'transactions' ? 'text-[#315bd1] border-b-2 border-[#315bd1]' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Transactions
          </button>
          {selected.role === 'distributor' && (
            <button
              onClick={() => setActiveTab('retailers')}
              className={`text-sm font-bold pb-3 px-1 ${activeTab === 'retailers' ? 'text-[#315bd1] border-b-2 border-[#315bd1]' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Retailers
            </button>
          )}
        </div>

        {activeTab === 'registration' && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Email", selected.email],
              ["Mobile", selected.mobile],
              ["Shop", selected.shop?.name],
              ["Address", `${selected.shop.address.addressLine}, ${selected.shop.address.city}, ${selected.shop.address.state}`],
              ["PAN verification", "External verification pending"],
              ["Aadhaar verification", selected.aadhaarVerified ? "Verified" : "External verification pending"],
              ["KYC status", selected.kycStatus],
              ["Account status", selected.status],
              ["Registered", new Date(selected.createdAt).toLocaleDateString()],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-4"
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  {label}
                </p>
                <p className="mt-1 text-sm font-bold text-slate-800">
                  {value || "-"}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="mt-6 flex flex-col gap-5">
            <div className="flex gap-2">
              {(['AEPS', 'DMT', 'CMS', 'Others'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setTxFilter(tab)}
                  className={`px-5 py-2 rounded-lg text-xs font-bold transition-colors ${txFilter === tab ? 'bg-[#315bd1] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="overflow-x-auto rounded-xl border border-slate-100">
              {txFilter === 'AEPS' && (
                <table className="hp-table">
                  <thead>
                    <tr>
                      <th>Customer No</th>
                      <th>Aadhar</th>
                      <th>Bank</th>
                      <th>Transaction Type</th>
                      <th>Amount</th>
                      <th>Commission</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selected.status === 'pending' ? (
                      <tr>
                        <td colSpan={7} className="text-center py-6 text-slate-500 font-medium">No transactions found</td>
                      </tr>
                    ) : (
                      <tr>
                        <td className="font-medium text-slate-700">9876543210</td>
                        <td>XXXX-XXXX-1234</td>
                        <td>SBI</td>
                        <td className="font-medium">Cash Withdraw</td>
                        <td className="font-medium text-slate-700">₹5,000</td>
                        <td className="font-bold text-emerald-600">₹15.00</td>
                        <td><span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-bold">Success</span></td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
              {txFilter === 'DMT' && (
                <table className="hp-table">
                  <thead>
                    <tr>
                      <th>Sender Mobile</th>
                      <th>Receiver Name</th>
                      <th>Account No</th>
                      <th>IFSC</th>
                      <th>Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selected.status === 'pending' ? (
                      <tr>
                        <td colSpan={6} className="text-center py-6 text-slate-500 font-medium">No transactions found</td>
                      </tr>
                    ) : (
                      <tr>
                        <td className="font-medium text-slate-700">9998887776</td>
                        <td>John Doe</td>
                        <td>1234567890</td>
                        <td>SBIN0001234</td>
                        <td className="font-medium text-slate-700">₹15,000</td>
                        <td>2026-09-24</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
              {txFilter === 'CMS' && (
                <table className="hp-table">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Emp Info</th>
                      <th>Transaction Type</th>
                      <th>Amount</th>
                      <th>Trans ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selected.status === 'pending' ? (
                      <tr>
                        <td colSpan={5} className="text-center py-6 text-slate-500 font-medium">No transactions found</td>
                      </tr>
                    ) : (
                      <tr>
                        <td className="font-medium text-slate-700">Zomato</td>
                        <td>EMP-1029</td>
                        <td className="font-medium">Cash Drop</td>
                        <td className="font-medium text-slate-700">₹8,500</td>
                        <td>TXN987654321</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
              {txFilter === 'Others' && (
                <div className="p-8 text-center text-slate-500 font-medium">No other transactions found</div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'retailers' && selected.role === 'distributor' && (
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-100">
            <table className="hp-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Aadhar</th>
                  <th>Email</th>
                  <th>Mobile Number</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {subRetailers.map((sub, idx) => (
                  <tr key={idx}>
                    <td className="font-bold text-slate-800">{sub.name}</td>
                    <td>{sub.aadhar}</td>
                    <td>{sub.email}</td>
                    <td>{sub.mobile}</td>
                    <td>{sub.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
