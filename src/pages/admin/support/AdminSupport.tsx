import { ArrowLeft, FileText, Paperclip, Search, Send, UserRound, Eye, X } from "lucide-react";
import { useMemo, useState } from "react";

type TicketStatus = "Open" | "In Progress" | "Resolved";
type Message = { id: number; author: string; role: "Retailer" | "Admin"; text: string; time: string };
type Ticket = { id: string; retailer: string; retailerId: string; subject: string; category: string; status: TicketStatus; assignee: string; updated: string; messages: Message[] };

const initialTickets: Ticket[] = [
  { id: "SUP-10428", retailer: "Metro Digital Point", retailerId: "RET-10481", subject: "CMS commission configuration issue", category: "CMS Configuration", status: "In Progress", assignee: "Operations Admin", updated: "10 min ago", messages: [{ id: 1, author: "Metro Digital Point", role: "Retailer", text: "The commission value is not reflecting for the new CMS company.", time: "10:32 AM" }, { id: 2, author: "Operations Admin", role: "Admin", text: "We are checking the company mapping and will update this ticket shortly.", time: "10:40 AM" }] },
  { id: "SUP-10421", retailer: "Shree Ganesh Kirana", retailerId: "RET-10482", subject: "Retailer KYC document review", category: "Retailer Management", status: "Open", assignee: "Unassigned", updated: "1 hour ago", messages: [{ id: 1, author: "Shree Ganesh Kirana", role: "Retailer", text: "Please confirm whether the submitted business proof is readable.", time: "9:18 AM" }] },
  { id: "SUP-10398", retailer: "Aarav Telecom", retailerId: "RET-10480", subject: "Transaction report export", category: "Reports", status: "Resolved", assignee: "Super Admin", updated: "Yesterday", messages: [{ id: 1, author: "Aarav Telecom", role: "Retailer", text: "The transaction report export is not downloading.", time: "Yesterday" }, { id: 2, author: "Super Admin", role: "Admin", text: "The report export issue has been resolved.", time: "Yesterday" }] },
];

const statusStyles: Record<TicketStatus, string> = { Open: "bg-blue-50 text-blue-700", "In Progress": "bg-amber-50 text-amber-700", Resolved: "bg-emerald-50 text-emerald-700" };

export default function AdminSupport() {
  const [tickets, setTickets] = useState(initialTickets);
  const [selectedId, setSelectedId] = useState(initialTickets[0].id);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [viewingChat, setViewingChat] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  const selectedTicket = tickets.find((ticket) => ticket.id === selectedId) ?? tickets[0];
  const filteredTickets = useMemo(() => tickets.filter((ticket) => `${ticket.id} ${ticket.retailer} ${ticket.subject} ${ticket.category} ${ticket.assignee}`.toLowerCase().includes(search.toLowerCase())), [tickets, search]);

  const updateTicket = (field: "status" | "assignee", value: string) => {
    setTickets((current) => current.map((ticket) => {
      if (ticket.id === selectedTicket.id) {
        const updatedMessages = [...ticket.messages];
        if (field === "assignee" && value !== "Unassigned" && value !== ticket.assignee) {
          updatedMessages.push({
            id: Date.now(),
            author: "System",
            role: "Admin",
            text: `${value} is assigned to retailer`,
            time: "Just now"
          });
        }
        return { ...ticket, [field]: value, updated: "Just now", messages: updatedMessages } as Ticket;
      }
      return ticket;
    }));
  };

  const sendMessage = () => {
    if ((!message.trim() && !attachedFile) || !selectedTicket) return;
    
    let text = message.trim();
    if (attachedFile) {
      text = text ? `📎 Attached file: ${attachedFile.name}\n\n${text}` : `📎 Attached file: ${attachedFile.name}`;
    }
    
    const nextMessage: Message = { id: Date.now(), author: selectedTicket.assignee === "Unassigned" ? "Super Admin" : selectedTicket.assignee, role: "Admin", text, time: "Just now" };
    setTickets((current) => current.map((ticket) => ticket.id === selectedTicket.id ? { ...ticket, status: "In Progress", updated: "Just now", messages: [...ticket.messages, nextMessage] } : ticket));
    
    setMessage("");
    setAttachedFile(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setAttachedFile(event.target.files[0]);
    }
    event.target.value = '';
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <section>
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#315bd1]">System</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Support Tickets</h1>
        <p className="mt-1 text-sm text-slate-500">Handle retailer-raised tickets, assign ownership, update status, and continue the conversation.</p>
      </section>
      
      {!viewingChat ? (
        <section className="hp-card overflow-hidden rounded-2xl">
          <div className="border-b border-slate-100 p-5">
            <div className="relative w-full sm:w-[260px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search retailer tickets..." className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs outline-none focus:border-[#315bd1] focus:bg-white" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="hp-table">
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Retailer ID</th>
                  <th>Retailer Name</th>
                  <th>Category</th>
                  <th>Ticket Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td><span className="font-bold text-[#315bd1]">{ticket.id}</span></td>
                    <td className="font-bold text-slate-700">{ticket.retailerId}</td>
                    <td className="font-bold text-slate-900">{ticket.retailer}</td>
                    <td>{ticket.category}</td>
                    <td><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyles[ticket.status]}`}>{ticket.status}</span></td>
                    <td className="text-right">
                      <button 
                        onClick={() => {
                          setSelectedId(ticket.id);
                          setViewingChat(true);
                        }}
                        className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-[#315bd1] hover:bg-[#315bd1] hover:text-white transition-colors"
                      >
                        <Eye className="h-3.5 w-3.5" /> View
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredTickets.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-slate-500 font-medium">No tickets found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <section className="hp-card flex h-[500px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {selectedTicket && (
            <>
              <header className="border-b border-slate-100 p-5 bg-slate-50/50">
                <div className="flex items-center gap-4 mb-4">
                  <button onClick={() => setViewingChat(false)} className="p-2 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">Ticket Details</h2>
                </div>
                <div className="flex flex-wrap items-start justify-between gap-3 pl-10">
                  <div>
                    <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-[#315bd1]" /><span className="text-xs font-bold text-[#315bd1]">{selectedTicket.id}</span></div>
                    <h2 className="mt-2 text-base font-bold text-slate-900">{selectedTicket.subject}</h2>
                    <p className="mt-1 text-xs text-slate-500">{selectedTicket.retailer} · {selectedTicket.retailerId} · {selectedTicket.category}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1.5 text-[10px] font-bold ${statusStyles[selectedTicket.status]}`}>{selectedTicket.status}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-3 pl-10">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Assign to
                    <select value={selectedTicket.assignee} onChange={(event) => updateTicket("assignee", event.target.value)} className="ml-2 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-semibold normal-case tracking-normal text-slate-700">
                      <option>Unassigned</option><option>Super Admin</option><option>Operations Admin</option><option>Support Admin</option>
                    </select>
                  </label>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Status
                    <select value={selectedTicket.status} onChange={(event) => updateTicket("status", event.target.value)} className="ml-2 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-semibold normal-case tracking-normal text-slate-700">
                      <option>Open</option><option>In Progress</option><option>Resolved</option>
                    </select>
                  </label>
                </div>
              </header>
              <div className="flex-1 space-y-5 overflow-y-auto bg-slate-50/60 p-5">
                {selectedTicket.messages.map((item) => (
                  <div key={item.id} className={`flex gap-3 ${item.role === "Admin" ? "justify-end" : ""}`}>
                    <div className={`max-w-[min(520px,85%)] rounded-2xl p-4 ${item.role === "Admin" ? "bg-[#315bd1] text-white" : "border border-slate-200 bg-white text-slate-800"}`}>
                      <div className="flex items-center gap-2 text-[10px] font-bold opacity-75"><UserRound className="h-3 w-3" />{item.author}<span>·</span>{item.time}</div>
                      <p className="mt-2 text-sm leading-6">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-100 p-4">
                {selectedTicket.status === "Resolved" ? (
                  <div className="text-center py-3 text-sm font-semibold text-slate-500 bg-slate-50 rounded-xl border border-slate-100">
                    This ticket is resolved. Change status to Open or In Progress to reply.
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 w-full">
                    {attachedFile && (
                      <div className="flex items-center justify-between bg-[#f5f7ff] border border-[#315bd1]/20 rounded-xl p-3 text-xs text-[#315bd1] mx-1">
                        <span className="truncate font-semibold flex items-center gap-2"><Paperclip className="h-4 w-4" /> {attachedFile.name}</span>
                        <button type="button" onClick={() => setAttachedFile(null)} className="p-1.5 hover:bg-[#315bd1]/10 rounded-full transition-colors"><X className="h-4 w-4" /></button>
                      </div>
                    )}
                    <div className="flex items-end gap-2">
                      <label className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors" aria-label="Attach file">
                        <input type="file" className="hidden" onChange={handleFileChange} />
                        <Paperclip className="h-4 w-4" />
                      </label>
                      <textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={2} placeholder="Reply to retailer..." className="min-h-10 flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#315bd1] focus:bg-white" />
                      <button type="button" onClick={sendMessage} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#315bd1] text-white hover:bg-blue-700 transition-colors" aria-label="Send message"><Send className="h-4 w-4" /></button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </section>
      )}
    </div>
  );
}
