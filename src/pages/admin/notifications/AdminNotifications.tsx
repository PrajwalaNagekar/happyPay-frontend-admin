import { Bell, Check, Info, AlertTriangle, BellRing, Search } from "lucide-react";
import { useState } from "react";

const DUMMY_NOTIFICATIONS = [
  { id: "1", type: "success", title: "Retailer 2FA Completed", message: "Retailer Ramesh Kumar (RET001) successfully completed 2FA authentication.", time: "10 mins ago", isRead: false },
  { id: "2", type: "info", title: "New Transaction", message: "Retailer Suresh Verma (RET042) initiated an AEPS Cash Withdrawal of ₹5,000.", time: "25 mins ago", isRead: false },
  { id: "3", type: "success", title: "New Retailer Registered", message: "Retailer Amit Singh has successfully completed KYC verification.", time: "4 hours ago", isRead: false },
  { id: "4", type: "warning", title: "High Transaction Volume", message: "Unusually high DMT transaction volume detected from Retailer Rajesh (RET012).", time: "1 day ago", isRead: true },
  { id: "5", type: "info", title: "System Update Scheduled", message: "A system update is scheduled for tonight at 2:00 AM.", time: "2 days ago", isRead: true },
];

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState(DUMMY_NOTIFICATIONS);
  const [searchTerm, setSearchTerm] = useState("");

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const filteredNotifications = notifications.filter(n =>
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto w-full max-w-5xl space-y-5 p-4">
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#315bd1]">
            System
          </p>
          <h1 className="mt-1 flex items-center gap-2 text-2xl font-bold tracking-tight text-[#171717]">
            <BellRing className="h-6 w-6 text-[#315bd1]" />
            Notifications
          </h1>
          <p className="mt-1 text-sm text-[#8992a3]">
            Manage and view recent system alerts and updates.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm focus:border-[#315bd1] focus:outline-none focus:ring-2 focus:ring-[#315bd1]/20 sm:w-64 transition-all"
            />
          </div>
          <button
            type="button"
            onClick={markAllAsRead}
            className="flex h-9 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <Check className="h-4 w-4 text-[#087f5b]" />
            Mark all read
          </button>
        </div>
      </section>

      {/* List */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex gap-4 p-5 transition-colors hover:bg-slate-50 ${
                  !notification.isRead ? "bg-blue-50/50" : ""
                }`}
              >
                <div className="mt-1 shrink-0">
                  {notification.type === "info" && (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <Info className="h-5 w-5" />
                    </div>
                  )}
                  {notification.type === "success" && (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Check className="h-5 w-5" />
                    </div>
                  )}
                  {notification.type === "warning" && (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className={`text-sm font-bold ${!notification.isRead ? "text-slate-900" : "text-slate-700"}`}>
                        {notification.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">{notification.message}</p>
                      <p className="mt-2 text-xs font-semibold text-slate-400">{notification.time}</p>
                    </div>
                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="shrink-0 text-xs font-bold text-[#315bd1] hover:text-[#23429b] transition-colors"
                      >
                        Mark read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 mb-4">
              <Bell className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">No notifications found</h3>
            <p className="mt-1 text-sm text-slate-500">
              You're all caught up!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
