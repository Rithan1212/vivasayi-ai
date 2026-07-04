import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  MessageSquare,
  Calendar,
  Languages,
  ChevronRight,
  Sparkles,
  History,
  TrendingUp,
  Search,
  Inbox,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import {
  clearHistory,
  deleteHistory,
  getHistory,
  type QueryRecord,
} from "../services/historyService";
import AdvisoryCard from "../components/AdvisoryCard";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [records, setRecords] = useState<QueryRecord[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    if (user) setRecords(getHistory(user.id));
  }, [user]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return records;
    return records.filter(
      (r) =>
        r.question.toLowerCase().includes(q) ||
        r.answer.problem.toLowerCase().includes(q) ||
        r.answer.solution.toLowerCase().includes(q)
    );
  }, [records, search]);

  const selected = filtered.find((r) => r.id === selectedId) ?? filtered[0];

  const onDelete = (id: string) => {
    if (!user) return;
    deleteHistory(user.id, id);
    setRecords(getHistory(user.id));
    if (selectedId === id) setSelectedId(null);
  };

  const onClearAll = () => {
    if (!user) return;
    clearHistory(user.id);
    setRecords([]);
    setSelectedId(null);
    setConfirmClear(false);
  };

  const stats = useMemo(() => {
    const total = records.length;
    const tamil = records.filter((r) => r.language === "ta").length;
    const today = records.filter(
      (r) => new Date(r.createdAt).toDateString() === new Date().toDateString()
    ).length;
    return { total, tamil, english: total - tamil, today };
  }, [records]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Dashboard
          </div>
          <h1 className="mt-1 text-3xl font-bold text-stone-900 dark:text-white">
            Welcome back, {user?.name?.split(" ")[0] ?? "Farmer"} 👋
          </h1>
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
            Here are all the questions you've asked the advisor.
          </p>
        </div>
        <Link
          to="/chat"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:shadow-xl"
        >
          <Sparkles size={14} /> Ask new question
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={MessageSquare} label="Total Queries" value={stats.total} color="from-emerald-400 to-green-600" />
        <StatCard icon={TrendingUp} label="Today" value={stats.today} color="from-amber-400 to-orange-500" />
        <StatCard icon={Languages} label="In Tamil" value={stats.tamil} color="from-rose-400 to-red-500" />
        <StatCard icon={Languages} label="In English" value={stats.english} color="from-sky-400 to-blue-500" />
      </div>

      {/* Main grid */}
      <div className="mt-8 grid gap-4 lg:grid-cols-[380px_1fr]">
        {/* History list */}
        <div className="rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
          <div className="border-b border-stone-200 p-4 dark:border-stone-800">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-stone-900 dark:text-white">
                <History size={16} /> Question History
              </div>
              {records.length > 0 && (
                <button
                  onClick={() => setConfirmClear(true)}
                  className="flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-[11px] font-semibold text-red-600 transition hover:bg-red-100 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
                >
                  <Trash2 size={11} /> Clear all
                </button>
              )}
            </div>
            <div className="relative">
              <Search
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search history…"
                className="w-full rounded-lg border border-stone-200 bg-stone-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-emerald-400 dark:border-stone-800 dark:bg-stone-950 dark:text-white"
              />
            </div>
          </div>

          <div className="max-h-[60vh] divide-y divide-stone-100 overflow-y-auto dark:divide-stone-800">
            {filtered.length === 0 ? (
              <div className="grid place-items-center px-6 py-14 text-center">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-stone-100 text-stone-400 dark:bg-stone-800">
                  <Inbox size={20} />
                </div>
                <div className="mt-3 text-sm font-medium text-stone-700 dark:text-stone-200">
                  {records.length === 0 ? "No questions yet" : "No matches"}
                </div>
                <div className="mt-1 text-xs text-stone-500">
                  {records.length === 0
                    ? "Start a chat to populate your history."
                    : "Try a different search term."}
                </div>
                {records.length === 0 && (
                  <Link
                    to="/chat"
                    className="mt-4 inline-flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    Ask first question <ChevronRight size={12} />
                  </Link>
                )}
              </div>
            ) : (
              filtered.map((r) => {
                const active = selected?.id === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => setSelectedId(r.id)}
                    className={`group flex w-full items-start gap-3 px-4 py-3 text-left transition ${
                      active
                        ? "bg-emerald-50/70 dark:bg-emerald-500/10"
                        : "hover:bg-stone-50 dark:hover:bg-stone-800/50"
                    }`}
                  >
                    <div
                      className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg text-white ${
                        active
                          ? "bg-gradient-to-br from-emerald-500 to-green-600"
                          : "bg-stone-300 dark:bg-stone-700"
                      }`}
                    >
                      <MessageSquare size={14} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="line-clamp-2 text-sm font-medium text-stone-900 dark:text-stone-100">
                        {r.question}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-stone-500">
                        <Calendar size={10} />
                        {formatDate(r.createdAt)}
                        <span className="rounded-full bg-stone-200 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-stone-600 dark:bg-stone-700 dark:text-stone-300">
                          {r.language}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(r.id);
                      }}
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-stone-400 opacity-0 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 dark:hover:bg-red-500/10"
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Detail */}
        <div className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
          {selected ? (
            <div>
              <div className="mb-4 flex items-start justify-between gap-3 border-b border-stone-200 pb-4 dark:border-stone-800">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                    Your question
                  </div>
                  <div className="mt-1 text-base font-semibold text-stone-900 dark:text-white">
                    {selected.question}
                  </div>
                  <div className="mt-1.5 flex items-center gap-2 text-[11px] text-stone-500">
                    <Calendar size={11} /> {formatDate(selected.createdAt)}
                    <span className="rounded-full bg-stone-200 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-stone-600 dark:bg-stone-700 dark:text-stone-300">
                      {selected.language}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onDelete(selected.id)}
                  className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
              <AdvisoryCard answer={selected.answer} />
            </div>
          ) : (
            <div className="grid h-full min-h-[40vh] place-items-center text-center">
              <div>
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-stone-100 text-stone-400 dark:bg-stone-800">
                  <MessageSquare size={22} />
                </div>
                <div className="mt-3 text-sm font-medium text-stone-700 dark:text-stone-200">
                  Select a question from the left
                </div>
                <div className="text-xs text-stone-500">or ask a new one to begin.</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirm modal */}
      <AnimatePresence>
        {confirmClear && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-4 backdrop-blur-sm"
            onClick={() => setConfirmClear(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-stone-900"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-300">
                <Trash2 size={20} />
              </div>
              <h3 className="mt-3 text-lg font-bold text-stone-900 dark:text-white">
                Clear all history?
              </h3>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                This will permanently delete all {records.length} of your saved questions and
                answers. This cannot be undone.
              </p>
              <div className="mt-5 flex justify-end gap-2">
                <button
                  onClick={() => setConfirmClear(false)}
                  className="rounded-lg border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800"
                >
                  Cancel
                </button>
                <button
                  onClick={onClearAll}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Yes, delete all
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof MessageSquare;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900"
    >
      <div className="flex items-center justify-between">
        <div className={`grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br ${color} text-white shadow`}>
          <Icon size={16} />
        </div>
        <div className="text-2xl font-bold text-stone-900 dark:text-white">{value}</div>
      </div>
      <div className="mt-2 text-xs font-medium uppercase tracking-wider text-stone-500">{label}</div>
    </motion.div>
  );
}
