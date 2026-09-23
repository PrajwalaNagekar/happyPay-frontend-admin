import { Eye, EyeOff, LockKeyhole, Mail, Phone, ShieldCheck, UserRound } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { registerAdmin } from "../../../services/api/admin/adminAuthApi";

export default function AdminRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitted(false);

    if (!name.trim() || !email.trim() || !mobile.trim() || !password || !confirmPassword) {
      setError("Please complete all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    registerAdmin({
      name: name.trim(),
      email: email.trim(),
      mobile,
      password,
      confirmPassword,
    })
      .then(() => setSubmitted(true))
      .catch((caught: unknown) => {
        setError(caught instanceof Error ? caught.message : "Registration failed.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <main className="hp-canvas flex min-h-screen items-center justify-center p-4 sm:p-6">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-white bg-white shadow-[0_24px_70px_-32px_rgba(15,23,42,0.35)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="hidden bg-[#172033] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-sm font-extrabold text-[#172033]">HP</div>
              <span className="text-xl font-extrabold">HappyPay</span>
            </div>
            <p className="mt-16 max-w-sm text-4xl font-bold leading-tight">Create your admin workspace.</p>
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-300">Set up an administrator profile for secure platform operations.</p>
          </div>
          <p className="text-xs text-slate-400">HappyPay Super Admin Portal</p>
        </div>

        <div className="p-6 sm:p-10 lg:p-14">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#172033] text-sm font-extrabold text-white">HP</div>
            <span className="font-extrabold text-slate-900">HappyPay</span>
          </div>

          <div className="mx-auto max-w-md">
            <div className="mb-7">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef2ff] text-[#315bd1]"><ShieldCheck className="h-6 w-6" /></div>
              <h1 className="text-2xl font-bold text-slate-900">Create Admin Account</h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">Add the details for a Super Admin profile.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label htmlFor="admin-name" className="mb-2 block text-sm font-semibold text-slate-700">Full name</label><div className="relative"><UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input id="admin-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter full name" className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm outline-none focus:border-[#315bd1] focus:bg-white focus:ring-4 focus:ring-[#315bd1]/10" /></div></div>
              <div><label htmlFor="admin-email" className="mb-2 block text-sm font-semibold text-slate-700">Email address</label><div className="relative"><Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input id="admin-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@happypay.in" className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm outline-none focus:border-[#315bd1] focus:bg-white focus:ring-4 focus:ring-[#315bd1]/10" /></div></div>
              <div><label htmlFor="admin-mobile" className="mb-2 block text-sm font-semibold text-slate-700">Mobile number</label><div className="relative"><Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input id="admin-mobile" type="tel" value={mobile} onChange={(event) => setMobile(event.target.value.replace(/\D/g, ""))} placeholder="Enter mobile number" className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm outline-none focus:border-[#315bd1] focus:bg-white focus:ring-4 focus:ring-[#315bd1]/10" /></div></div>
              <div><label htmlFor="admin-register-password" className="mb-2 block text-sm font-semibold text-slate-700">Password</label><div className="relative"><LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input id="admin-register-password" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Create password" className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-12 text-sm outline-none focus:border-[#315bd1] focus:bg-white focus:ring-4 focus:ring-[#315bd1]/10" /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:bg-slate-100" aria-label="Toggle password visibility">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></div>
              <div><label htmlFor="admin-confirm-password" className="mb-2 block text-sm font-semibold text-slate-700">Confirm password</label><div className="relative"><LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input id="admin-confirm-password" type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm password" className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-12 text-sm outline-none focus:border-[#315bd1] focus:bg-white focus:ring-4 focus:ring-[#315bd1]/10" /><button type="button" onClick={() => setShowConfirmPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:bg-slate-100" aria-label="Toggle confirm password visibility">{showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></div>

              {error && <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">{error}</p>}
              {submitted && <p role="status" className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">Details are valid and ready for backend registration.</p>}

              <button type="submit" disabled={loading} className="flex min-h-12 w-full items-center justify-center rounded-xl bg-[#315bd1] px-5 text-sm font-bold text-white transition hover:bg-[#274dbd] disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Creating account..." : "Create Admin Account"}</button>
              <p className="text-center text-sm text-slate-500">Already have an account? <Link to="/admin/login" className="font-semibold text-[#315bd1] hover:underline">Sign in</Link></p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
