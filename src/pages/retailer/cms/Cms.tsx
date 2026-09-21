import { useState } from "react";
import { Banknote, Landmark } from "lucide-react";

import CashCollection from "./CashCollection";
import CashDrop from "./CashDrop";

type CmsTab = "collection" | "drop";

export default function Cms() {
  const [activeTab, setActiveTab] = useState<CmsTab>("collection");

  return (
    <div className="bg-[#f5f7fb] p-4 md:p-5">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Cash Management (CMS)
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your cash collection and cash drop transactions
          </p>
        </div>

        {/* CMS Tabs */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("collection")}
              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                activeTab === "collection"
                  ? "bg-[#315bd1] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Banknote size={18} />
              Cash Collection
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("drop")}
              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                activeTab === "drop"
                  ? "bg-[#315bd1] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Landmark size={18} />
              Cash Drop
            </button>
          </div>
        </div>

        {/* Active CMS Feature */}
        {activeTab === "collection" && <CashCollection />}

        {activeTab === "drop" && <CashDrop />}
      </div>
    </div>
  );
}


