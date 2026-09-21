import { useState } from "react";
import { Banknote, Landmark, WalletCards } from "lucide-react";

import CashCollection from "./CashCollection";
import CashDrop from "./CashDrop";

type CmsTab = "collection" | "drop";

export default function Cms() {
  const [activeTab, setActiveTab] = useState<CmsTab>("collection");

  return (
    <div className="w-full px-2 py-2 sm:px-4 sm:py-3">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <section className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)] sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef2f7] text-[#172033]">
              <WalletCards className="h-5 w-5" strokeWidth={2} />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8b99b0]">
                Cash Management
              </p>

              <h1 className="mt-0.5 text-xl font-bold tracking-tight text-[#172033]">
                CMS
              </h1>

              <p className="mt-0.5 text-xs text-[#687286] sm:text-sm">
                Manage cash collection and cash drop transactions
              </p>
            </div>
          </div>
        </section>

        {/* CMS Tabs */}
        <section className="mt-3 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab("collection")}
              className={`flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                activeTab === "collection"
                  ? "bg-[#172033] text-white shadow-[0_6px_14px_rgba(23,32,51,0.18)]"
                  : "text-[#687286] hover:bg-[#f5f7fb] hover:text-[#172033]"
              }`}
            >
              <Banknote className="h-4 w-4" strokeWidth={2} />
              <span>Cash Collection</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("drop")}
              className={`flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                activeTab === "drop"
                  ? "bg-[#172033] text-white shadow-[0_6px_14px_rgba(23,32,51,0.18)]"
                  : "text-[#687286] hover:bg-[#f5f7fb] hover:text-[#172033]"
              }`}
            >
              <Landmark className="h-4 w-4" strokeWidth={2} />
              <span>Cash Drop</span>
            </button>
          </div>
        </section>

        {/* Active CMS Feature */}
        <div className="mt-3">
          {activeTab === "collection" && <CashCollection />}
          {activeTab === "drop" && <CashDrop />}
        </div>
      </div>
    </div>
  );
}
