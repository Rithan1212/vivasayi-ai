import { AlertTriangle, HelpCircle, Lightbulb, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import type { AdvisoryAnswer } from "../services/geminiService";

const labels = {
  en: { problem: "Problem", reason: "Reason", solution: "Solution", precautions: "Precautions" },
  ta: {
    problem: "பிரச்சனை",
    reason: "காரணம்",
    solution: "தீர்வு",
    precautions: "முன்னெச்சரிக்கைகள்",
  },
};

export default function AdvisoryCard({ answer }: { answer: AdvisoryAnswer }) {
  const t = labels[answer.language];
  const sections = [
    { icon: AlertTriangle, title: t.problem, body: answer.problem, color: "from-rose-400 to-red-500" },
    { icon: HelpCircle, title: t.reason, body: answer.reason, color: "from-amber-400 to-orange-500" },
    { icon: Lightbulb, title: t.solution, body: answer.solution, color: "from-emerald-400 to-green-600" },
  ];

  return (
    <div className="space-y-3">
      {sections.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-800/60"
        >
          <div className="mb-1.5 flex items-center gap-2">
            <div
              className={`grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br ${s.color} text-white`}
            >
              <s.icon size={14} />
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              {s.title}
            </div>
          </div>
          <div className="whitespace-pre-line text-sm leading-relaxed text-stone-800 dark:text-stone-100">
            {s.body}
          </div>
        </motion.div>
      ))}

      {answer.precautions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-800/60"
        >
          <div className="mb-2 flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-sky-400 to-blue-500 text-white">
              <ShieldCheck size={14} />
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              {t.precautions}
            </div>
          </div>
          <ul className="space-y-1.5">
            {answer.precautions.map((p, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm leading-relaxed text-stone-800 dark:text-stone-100"
              >
                <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                {p}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
