import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, User, Leaf, Check } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

function passwordStrength(p: string): { score: number; label: string; color: string } {
  let s = 0;
  if (p.length >= 6) s++;
  if (p.length >= 10) s++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  const map = [
    { label: "Too weak", color: "bg-red-500" },
    { label: "Weak", color: "bg-orange-500" },
    { label: "Okay", color: "bg-yellow-500" },
    { label: "Good", color: "bg-lime-500" },
    { label: "Strong", color: "bg-emerald-500" },
    { label: "Very strong", color: "bg-emerald-600" },
  ];
  return { score: s, ...map[s] };
}

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const strength = passwordStrength(password);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (name.trim().length < 2) return setError("Please enter your full name (min 2 chars).");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Please enter a valid email address.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (password !== confirm) return setError("Passwords do not match.");

    setSubmitting(true);
    try {
      await register(name.trim(), email.trim(), password);
      navigate("/chat", { replace: true });
    } catch (err) {
      setError((err as Error).message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative grid min-h-[calc(100vh-4rem)] place-items-center px-4 py-12">
      <div className="absolute inset-0 -z-10 animated-grad opacity-30" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass rounded-3xl p-8 shadow-2xl">
          <div className="mb-6 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow-lg">
              <Leaf size={22} />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-stone-900 dark:text-white">Create your account</h1>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
              Join thousands of farmers using VIVASAYI AI.
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
            >
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field icon={User} label="Full name">
              <input
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ravi Kumar"
                className="input-base pl-10"
              />
            </Field>

            <Field icon={Mail} label="Email">
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ravi@example.com"
                className="input-base pl-10"
              />
            </Field>

            <Field icon={Lock} label="Password">
              <input
                type={show ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="input-base pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-2.5 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                {show ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </Field>

            {password && (
              <div>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition ${
                        i < strength.score ? strength.color : "bg-stone-200 dark:bg-stone-800"
                      }`}
                    />
                  ))}
                </div>
                <div className="mt-1 text-[11px] text-stone-500">Strength: {strength.label}</div>
              </div>
            )}

            <Field icon={Check} label="Confirm password">
              <input
                type={show ? "text" : "password"}
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Re-enter password"
                className="input-base pl-10"
              />
            </Field>

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:shadow-xl disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Creating account…
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-stone-600 dark:text-stone-400">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-emerald-600 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </motion.div>

      <style>{`
        .input-base {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgb(214 211 209);
          background: rgba(255,255,255,0.8);
          padding: 0.625rem 0.75rem;
          font-size: 0.875rem;
          color: rgb(28 25 23);
          outline: none;
          transition: all .15s;
        }
        .input-base:focus {
          border-color: #10b981;
          box-shadow: 0 0 0 4px rgb(209 250 229);
        }
        .dark .input-base {
          background: rgba(28,25,23,0.8);
          border-color: rgb(68 64 60);
          color: white;
        }
        .dark .input-base:focus {
          box-shadow: 0 0 0 4px rgba(16,185,129,0.2);
        }
      `}</style>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Mail;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-stone-700 dark:text-stone-300">
        {label}
      </label>
      <div className="relative">
        <Icon
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-stone-400"
        />
        {children}
      </div>
    </div>
  );
}
