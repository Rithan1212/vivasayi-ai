import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  MessageSquare,
  Leaf,
  Languages,
  ShieldCheck,
  History,
  Zap,
  ArrowRight,
  CloudSun,
  Bug,
  Sprout,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const features = [
  {
    icon: Languages,
    title: "Tamil & English",
    desc: "Ask in your language. Get answers in your language. Built for Bharat.",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: Sparkles,
    title: "Gemini-Powered",
    desc: "Real-time agricultural advice powered by Google's Gemini AI model.",
    color: "from-violet-400 to-fuchsia-500",
  },
  {
    icon: Bug,
    title: "Pest & Disease",
    desc: "Identify common pests and diseases and get organic-first solutions.",
    color: "from-rose-400 to-red-500",
  },
  {
    icon: CloudSun,
    title: "Seasonal Tips",
    desc: "Sowing, irrigation, fertilising and harvest guidance for every season.",
    color: "from-sky-400 to-blue-500",
  },
  {
    icon: History,
    title: "Query History",
    desc: "Every question and answer saved in your personal farmer dashboard.",
    color: "from-emerald-400 to-green-600",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Private",
    desc: "Your data stays with you. Auth-protected dashboard, secure by design.",
    color: "from-teal-400 to-cyan-500",
  },
];

const steps = [
  {
    n: "01",
    title: "Ask Your Question",
    desc: "Type any farming problem in Tamil or English — crop, pest, soil, weather, anything.",
    icon: MessageSquare,
  },
  {
    n: "02",
    title: "AI Analyses Instantly",
    desc: "Gemini processes your query against agronomy best practices and Indian conditions.",
    icon: Zap,
  },
  {
    n: "03",
    title: "Get a Clear Plan",
    desc: "Problem, reason, step-by-step solution and precautions — ready to apply on the field.",
    icon: Sprout,
  },
];

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 animated-grad opacity-40 dark:opacity-30" />
        <div className="absolute inset-0 leaf-pattern" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-xs font-medium text-emerald-700 backdrop-blur dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
              <Sparkles size={12} /> Powered by Gemini AI
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-stone-900 sm:text-5xl md:text-6xl dark:text-white">
              Smart farming
              <br />
              advice in{" "}
              <span className="bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 bg-clip-text text-transparent">
                seconds.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg dark:text-stone-300">
              VIVASAYI AI is your pocket agronomist. Ask any crop, pest, or soil question in
              <span className="font-semibold text-stone-800 dark:text-stone-100"> Tamil</span> or
              <span className="font-semibold text-stone-800 dark:text-stone-100"> English</span> and
              get a clear, practical plan you can apply on the field today.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to={user ? "/chat" : "/register"}
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-emerald-500/30 transition hover:shadow-2xl hover:shadow-emerald-500/50"
              >
                {user ? "Open AI Chat" : "Start for Free"}
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </Link>
              <Link
                to="/chat"
                className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white/70 px-6 py-3 text-sm font-semibold text-stone-700 backdrop-blur transition hover:bg-white dark:border-stone-700 dark:bg-stone-900/70 dark:text-stone-200 dark:hover:bg-stone-900"
              >
                <MessageSquare size={16} /> Try a Question
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-stone-600 dark:text-stone-400">
              <div className="flex items-center gap-2">
                <div className="grid h-7 w-7 place-items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                  ✓
                </div>
                Free for farmers
              </div>
              <div className="flex items-center gap-2">
                <div className="grid h-7 w-7 place-items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                  ✓
                </div>
                No app install
              </div>
              <div className="flex items-center gap-2">
                <div className="grid h-7 w-7 place-items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                  ✓
                </div>
                Works on any phone
              </div>
            </div>
          </motion.div>

          {/* Hero illustration card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-emerald-300/40 via-lime-300/40 to-amber-300/40 blur-2xl" />
            <div className="glass relative rounded-3xl p-5 shadow-2xl">
              <div className="flex items-center gap-2 border-b border-stone-200/60 pb-3 dark:border-stone-700/60">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 text-white">
                  <Leaf size={16} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-stone-800 dark:text-stone-100">
                    VIVASAYI AI
                  </div>
                  <div className="text-[11px] text-stone-500">Online · advisor</div>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                  <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                    Live
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-emerald-500 to-green-600 px-4 py-2.5 text-sm text-white shadow">
                  எனது தக்காளி இலைகள் மஞ்சளாக மாறுகின்றன. என்ன செய்ய வேண்டும்?
                </div>
                <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-white/90 px-4 py-3 text-sm text-stone-800 shadow dark:bg-stone-800/80 dark:text-stone-100">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Problem
                  </div>
                  <div className="mt-0.5">தக்காளி இலைகளில் குளோரோசிஸ் (மஞ்சள் நிறம்).</div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Solution
                  </div>
                  <div className="mt-0.5">
                    நைட்ரஜன் சேர்க்கவும் (தொழு உரம் 1 கிலோ/செடி), வேப்ப எண்ணெய் 3% தெளிக்கவும்,
                    நீரின் அளவை சீராக வைக்கவும்.
                  </div>
                </div>
                <div className="flex items-center gap-1 pl-1">
                  <span className="typing-dot h-2 w-2 rounded-full bg-stone-400" />
                  <span className="typing-dot h-2 w-2 rounded-full bg-stone-400" />
                  <span className="typing-dot h-2 w-2 rounded-full bg-stone-400" />
                  <span className="ml-2 text-[11px] text-stone-500">advisor is typing…</span>
                </div>
              </div>
            </div>

            {/* Floating stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-xl sm:block dark:border-stone-800 dark:bg-stone-900"
            >
              <div className="text-[11px] uppercase tracking-wider text-stone-500">Responses</div>
              <div className="text-xl font-bold text-stone-900 dark:text-white">12,480+</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="absolute -top-6 -right-6 hidden rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-xl sm:block dark:border-stone-800 dark:bg-stone-900"
            >
              <div className="text-[11px] uppercase tracking-wider text-stone-500">Avg. reply</div>
              <div className="text-xl font-bold text-emerald-600">&lt; 3 sec</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
            Features
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl dark:text-white">
            Everything a farmer needs, nothing they don't.
          </h2>
          <p className="mt-3 text-stone-600 dark:text-stone-400">
            Designed with agronomists and built with care, VIVASAYI delivers practical advice — not
            jargon.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-stone-800 dark:bg-stone-900"
            >
              <div
                className={`mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${f.color} text-white shadow-lg`}
              >
                <f.icon size={20} />
              </div>
              <div className="text-lg font-semibold text-stone-900 dark:text-white">{f.title}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                {f.desc}
              </p>
              <div className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-tr from-emerald-300/0 to-emerald-300/20 opacity-0 transition group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 to-transparent py-20 dark:from-emerald-500/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
              How it Works
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl dark:text-white">
              From doubt to decision in three steps.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900"
              >
                <div className="text-5xl font-black text-emerald-100 dark:text-emerald-500/20">
                  {s.n}
                </div>
                <div className="-mt-6 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg">
                  <s.icon size={20} />
                </div>
                <div className="mt-3 text-lg font-semibold text-stone-900 dark:text-white">
                  {s.title}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-green-600 to-lime-600 p-10 shadow-2xl shadow-emerald-500/20 sm:p-14"
        >
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-yellow-300/20 blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                Your next harvest deserves smarter answers.
              </h3>
              <p className="mt-3 max-w-xl text-emerald-50/90">
                Sign up free and start asking. No credit card. No app to install. Just open and grow.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <Link
                to={user ? "/chat" : "/register"}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-emerald-700 shadow-xl transition hover:shadow-2xl"
              >
                {user ? "Open AI Chat" : "Create Free Account"}
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                I already have an account
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
