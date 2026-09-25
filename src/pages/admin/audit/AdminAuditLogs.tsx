import {
  ChevronLeft,
  ChevronRight,
  FileClock,
  RefreshCw,
  Search,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { AuditLog } from "../../../types/admin/audit";


const dummyAuditLogs: AuditLog[] = [
  {
    id: "LOG001", adminId: "ADM01", userName: "Super Admin", role: "Super Admin",
    action: "Admin Login", entity: "Auth", description: "Successful login from desktop device.",
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    createdBy: { name: "System", role: "System" }, updatedBy: { name: "System", role: "System" },
    ipAddress: "192.168.1.45"
  },
  {
    id: "LOG002", adminId: "ADM01", userName: "Super Admin", role: "Super Admin",
    action: "KYC Approved", entity: "Retailer", entityId: "RET-98231", description: "Approved KYC documents for Ramesh Store.",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    createdBy: { name: "Super Admin", role: "Super Admin" }, updatedBy: { name: "Super Admin", role: "Super Admin" },
    ipAddress: "192.168.1.45"
  },
  {
    id: "LOG003", adminId: "ADM02", userName: "John Doe", role: "Manager",
    action: "Commission Changed", entity: "Commission Config", entityId: "COMM-004", description: "Updated AePS Cash Withdraw commission to 0.40%.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    createdBy: { name: "John Doe", role: "Manager" }, updatedBy: { name: "John Doe", role: "Manager" },
    ipAddress: "10.0.0.15"
  },
  {
    id: "LOG004", adminId: "ADM02", userName: "John Doe", role: "Manager",
    action: "Retailer Suspended", entity: "Retailer", entityId: "RET-11942", description: "Suspended retailer account due to suspicious activity.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    createdBy: { name: "John Doe", role: "Manager" }, updatedBy: { name: "John Doe", role: "Manager" },
    ipAddress: "10.0.0.15"
  },
  {
    id: "LOG005", adminId: "ADM01", userName: "Super Admin", role: "Super Admin",
    action: "Limit Changed", entity: "Transaction Limits", entityId: "LIM-092", description: "Increased daily DMT limit for verified retailers to ₹2,00,000.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    createdBy: { name: "Super Admin", role: "Super Admin" }, updatedBy: { name: "Super Admin", role: "Super Admin" },
    ipAddress: "192.168.1.45"
  },
  {
    id: "LOG006", adminId: "ADM03", userName: "Alice Smith", role: "Support",
    action: "KYC Rejected", entity: "Retailer", entityId: "RET-77412", description: "Rejected PAN card upload (illegible).",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    createdBy: { name: "Alice Smith", role: "Support" }, updatedBy: { name: "Alice Smith", role: "Support" },
    ipAddress: "172.16.0.8"
  },
  {
    id: "LOG007", adminId: "ADM01", userName: "Super Admin", role: "Super Admin",
    action: "Admin Registered", entity: "Admin", entityId: "ADM03", description: "Created new Support admin account for Alice Smith.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    createdBy: { name: "Super Admin", role: "Super Admin" }, updatedBy: { name: "Super Admin", role: "Super Admin" },
    ipAddress: "192.168.1.45"
  },
];

const formatDate = (value?: string) =>
  value
    ? new Date(value).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "-";

export default function AdminAuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [search, setSearch] = useState("");
  const [action, setAction] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  const loadLogs = useCallback(async () => {
    setLoading(true);
    setError("");

    setTimeout(() => {
      let filteredLogs = [...dummyAuditLogs];

      if (search) {
        const query = search.toLowerCase();
        filteredLogs = filteredLogs.filter(
          log =>
            log.userName.toLowerCase().includes(query) ||
            log.action.toLowerCase().includes(query) ||
            log.entity.toLowerCase().includes(query) ||
            log.description.toLowerCase().includes(query)
        );
      }

      if (action) {
        filteredLogs = filteredLogs.filter(log => log.action === action);
      }

      if (fromDate) {
        const from = new Date(fromDate).getTime();
        filteredLogs = filteredLogs.filter(log => new Date(log.createdAt).getTime() >= from);
      }

      if (toDate) {
        // Set to end of the day for inclusive filtering
        const to = new Date(toDate);
        to.setHours(23, 59, 59, 999);
        filteredLogs = filteredLogs.filter(log => new Date(log.createdAt).getTime() <= to.getTime());
      }

      setLogs(filteredLogs);
      setTotal(filteredLogs.length);
      setTotalPages(Math.ceil(filteredLogs.length / 20) || 1);
      setLoading(false);
    }, 400);
  }, [
    search,
    action,
    fromDate,
    toDate,
  ]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadLogs();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [loadLogs]);

  const applySearch = () => {
    setPage(1);
    void loadLogs();
  };

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6">
      <section>
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#315bd1]">
          System
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          Audit Logs
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Review administrative actions and accountability details.
        </p>
      </section>

      <section className="hp-card rounded-2xl p-4 sm:p-5">
        <div className="grid gap-3 md:grid-cols-[minmax(220px,1fr)_190px_150px_150px_auto] md:items-end">
          <label className="text-xs font-semibold text-slate-600">
            Search

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  applySearch();
                }
              }}
              placeholder="User, action, entity..."
              className="mt-2 min-h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-normal outline-none focus:border-[#315bd1] focus:bg-white"
            />
          </label>

          <label className="text-xs font-semibold text-slate-600">
            Action

            <select
              value={action}
              onChange={(event) => {
                setAction(event.target.value);
                setPage(1);
              }}
              className="mt-2 min-h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-normal outline-none focus:border-[#315bd1] focus:bg-white"
            >
              <option value="">All actions</option>
              <option>Admin Registered</option>
              <option>Admin Login</option>
              <option>KYC Approved</option>
              <option>KYC Rejected</option>
              <option>Retailer Suspended</option>
              <option>Limit Changed</option>
              <option>Commission Changed</option>
            </select>
          </label>

          <label className="text-xs font-semibold text-slate-600">
            From date

            <input
              type="date"
              value={fromDate}
              onChange={(event) => {
                setFromDate(event.target.value);
                setPage(1);
              }}
              className="mt-2 min-h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-normal outline-none focus:border-[#315bd1] focus:bg-white"
            />
          </label>

          <label className="text-xs font-semibold text-slate-600">
            To date

            <input
              type="date"
              value={toDate}
              onChange={(event) => {
                setToDate(event.target.value);
                setPage(1);
              }}
              className="mt-2 min-h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-normal outline-none focus:border-[#315bd1] focus:bg-white"
            />
          </label>

          <button
            type="button"
            onClick={applySearch}
            className="flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#315bd1] px-4 text-xs font-bold text-white hover:bg-[#274dbd]"
          >
            <Search className="h-4 w-4" />
            Search
          </button>
        </div>
      </section>

      <section className="hp-card overflow-hidden rounded-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5">
          <div className="flex items-center gap-2">
            <FileClock className="h-5 w-5 text-[#315bd1]" />

            <div>
              <h2 className="text-base font-bold text-slate-900">
                Administrative activity
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {total.toLocaleString("en-IN")} total records
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => void loadLogs()}
            className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-bold text-slate-600 hover:bg-slate-50"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </button>
        </div>

        {error && (
          <div className="m-5 flex items-center justify-between gap-3 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => void loadLogs()}
              className="font-bold underline"
            >
              Retry
            </button>
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
        ) : !error && logs.length === 0 ? (
          <div className="p-12 text-center">
            <FileClock className="mx-auto h-8 w-8 text-slate-300" />

            <p className="mt-3 text-sm font-bold text-slate-700">
              No audit logs found
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Try changing your filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="hp-table min-w-[1180px]">
              <thead>
                <tr>
                  <th>
                    User / Role
                  </th>
                  <th>
                    Action
                  </th>
                  <th>
                    Entity
                  </th>
                  <th>
                    Details
                  </th>
                  <th>
                    Created by
                  </th>
                  <th>
                    Updated by
                  </th>
                  <th>
                    Created / Updated
                  </th>
                </tr>
              </thead>

              <tbody>
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    className="align-top"
                  >
                    <td className="px-5 py-4">
                      <p className="font-bold text-slate-900">
                        {log.userName}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-400">
                        {log.role}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-[#eef2ff] px-2.5 py-1 text-[10px] font-bold text-[#315bd1]">
                        {log.action}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-800">
                        {log.entity}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-400">
                        {log.entityId ?? "-"}
                      </p>
                    </td>

                    <td className="max-w-[260px] whitespace-normal px-5 py-4 leading-5">
                      {log.description}
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-800">
                        {log.createdBy?.name ?? "-"}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-400">
                        {log.createdBy?.role ?? "-"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-800">
                        {log.updatedBy?.name ?? "-"}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-400">
                        {log.updatedBy?.role ?? "-"}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4">
                      <p>{formatDate(log.createdAt)}</p>

                      <p className="mt-1 text-[10px] text-slate-400">
                        Updated: {formatDate(log.updatedAt)}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">
          <p className="text-xs text-slate-500">
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={() =>
                setPage((value) => value - 1)
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              disabled={page >= totalPages || loading}
              onClick={() =>
                setPage((value) => value + 1)
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}