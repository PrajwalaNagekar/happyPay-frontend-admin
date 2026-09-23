import { Eye, RefreshCw, Search, Store, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAdminRetailer,
  getAdminRetailers,
} from "../../../services/api/admin/adminRetailerApi";
import type { AdminRetailer } from "../../../types/admin/retailer";
import { clearAdminSession } from "../../../utils/adminAuth";

const date = (value?: string) =>
  value
    ? new Date(value).toLocaleDateString("en-IN", {
        dateStyle: "medium",
      })
    : "-";

const badge: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  under_review: "bg-blue-50 text-blue-700",
  approved: "bg-emerald-50 text-emerald-700",
  rejected: "bg-rose-50 text-rose-700",
  active: "bg-emerald-50 text-emerald-700",
  suspended: "bg-slate-100 text-slate-600",
  blocked: "bg-rose-50 text-rose-700",
};

export default function AdminRetailers() {
  const navigate = useNavigate();

  const [items, setItems] = useState<AdminRetailer[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [kycStatus, setKycStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<AdminRetailer | null>(null);

  const handleRequestError = useCallback(
    (caught: unknown) => {
      const message =
        caught instanceof Error
          ? caught.message
          : "Unable to load retailers.";

      if (
        message
          .toLowerCase()
          .includes("invalid or expired access token")
      ) {
        clearAdminSession();
        navigate("/admin/login", { replace: true });
        return;
      }

      setError(message);
    },
    [navigate],
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getAdminRetailers({
        page,
        limit: 20,
        search,
        status,
        kycStatus,
      });

      setItems(response.data.items);
      setTotal(response.data.total);
      setTotalPages(response.data.totalPages || 1);
    } catch (caught) {
      handleRequestError(caught);
    } finally {
      setLoading(false);
    }
  }, [
    page,
    search,
    status,
    kycStatus,
    handleRequestError,
  ]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void load();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [load]);

  const openDetails = async (id: string) => {
    try {
      const response = await getAdminRetailer(id);
      setSelected(response.data);
    } catch (caught) {
      handleRequestError(caught);
    }
  };

  const handleSearch = () => {
    setPage(1);
    void load();
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <section>
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#315bd1]">
          Management
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          Retailers
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View retailer registration details and verification status.
        </p>
      </section>

      <section className="hp-card rounded-2xl p-4">
        <div className="grid gap-3 md:grid-cols-[minmax(220px,1fr)_180px_180px_auto]">
          <label className="text-xs font-semibold text-slate-600">
            Search

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Name, email, mobile, shop"
              className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-normal outline-none focus:border-[#315bd1] focus:bg-white"
            />
          </label>

          <label className="text-xs font-semibold text-slate-600">
            Account status

            <select
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                setPage(1);
              }}
              className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-normal"
            >
              <option value="">All statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
              <option value="rejected">Rejected</option>
            </select>
          </label>

          <label className="text-xs font-semibold text-slate-600">
            KYC status

            <select
              value={kycStatus}
              onChange={(event) => {
                setKycStatus(event.target.value);
                setPage(1);
              }}
              className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-normal"
            >
              <option value="">All KYC statuses</option>
              <option value="pending">Pending</option>
              <option value="under_review">Under review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </label>

          <button
            type="button"
            onClick={handleSearch}
            className="mt-auto flex h-10 items-center justify-center gap-2 rounded-xl bg-[#315bd1] px-4 text-xs font-bold text-white"
          >
            <Search className="h-3.5 w-3.5" />
            Search
          </button>
        </div>
      </section>

      <section className="hp-card overflow-hidden rounded-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-[#315bd1]" />

            <div>
              <h2 className="text-base font-bold text-slate-900">
                Retailer records
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {total.toLocaleString("en-IN")} total retailers
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => void load()}
            className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-bold text-slate-600"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </button>
        </div>

        {error && (
          <div className="m-5 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-3 p-5">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-12 animate-pulse rounded-lg bg-slate-100"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-500">
            No retailers found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-xs">
              <thead className="border-b border-slate-100 bg-slate-50/70 text-[10px] uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-3">Retailer</th>
                  <th className="px-5 py-3">Contact</th>
                  <th className="px-5 py-3">Shop</th>
                  <th className="px-5 py-3">KYC</th>
                  <th className="px-5 py-3">Account</th>
                  <th className="px-5 py-3">Registered</th>
                  <th className="px-5 py-3">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="text-slate-600"
                  >
                    <td className="px-5 py-4">
                      <p className="font-bold text-slate-800">
                        {item.fullName || "Unnamed retailer"}
                      </p>

                      <p className="mt-1 text-[10px] text-[#315bd1]">
                        {item.id}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p>{item.email || "-"}</p>
                      <p className="mt-1">{item.mobile || "-"}</p>
                    </td>

                    <td className="px-5 py-4">
                      {item.shop?.name || "-"}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                          badge[item.kycStatus || "pending"] ||
                          badge.pending
                        }`}
                      >
                        {item.kycStatus || "pending"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                          badge[item.status || "pending"] ||
                          badge.pending
                        }`}
                      >
                        {item.status || "pending"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      {date(item.createdAt)}
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => void openDetails(item.id)}
                        className="inline-flex items-center gap-1 font-bold text-[#315bd1] hover:underline"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4 text-xs text-slate-500">
          <span>
            Page {page} of {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() =>
                setPage((value) => value - 1)
              }
              className="rounded-lg border border-slate-200 px-3 py-1.5 font-bold disabled:opacity-40"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() =>
                setPage((value) => value + 1)
              }
              className="rounded-lg border border-slate-200 px-3 py-1.5 font-bold disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-[#315bd1]">
                  Retailer details
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {selected.fullName || "Unnamed retailer"}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ["Email", selected.email],
                ["Mobile", selected.mobile],
                ["Shop", selected.shop?.name],
                [
                  "Address",
                  selected.shop?.address
                    ? `${selected.shop.address.addressLine || ""}, ${selected.shop.address.city || ""}, ${selected.shop.address.state || ""}`
                    : undefined,
                ],
                ["PAN verification", "External verification pending"],
                [
                  "Aadhaar verification",
                  selected.aadhaarVerified
                    ? "Verified"
                    : "External verification pending",
                ],
                ["KYC status", selected.kycStatus],
                ["Account status", selected.status],
                ["Registered", date(selected.createdAt)],
                ["Updated", date(selected.updatedAt)],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-slate-200 bg-slate-50/70 p-3"
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
          </div>
        </div>
      )}
    </div>
  );
}