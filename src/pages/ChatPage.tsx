import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Languages, Leaf, AlertCircle, Trash2, BookOpen } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { askGemini, type AdvisoryAnswer } from "../services/geminiService";
import { addHistory } from "../services/historyService";
import AdvisoryCard from "../components/AdvisoryCard";

type ChatMessage =
  | { role: "user"; content: string; id: string; language: "en" | "ta" }
  | { role: "assistant"; content: AdvisoryAnswer; id: string }
  | { role: "error"; content: string; id: string };

const SUGGESTIONS_EN = [
  "My tomato leaves are turning yellow.",
  "How to control aphids on chilli plants?",
  "Best fertiliser schedule for paddy?",
  "When should I sow groundnut in Tamil Nadu?",
];
const SUGGESTIONS_TA = [
  "எனது தக்காளி இலைகள் மஞ்சளாக மாறுகின்றன.",
  "மிளகாய் செடியில் மா பூச்சியை எப்படி கட்டுப்படுத்துவது?",
  "நெல் பயிருக்கு சிறந்த உர அட்டவணை என்ன?",
  "தமிழ்நாட்டில் நிலக்கடலை எப்போது விதைக்க வேண்டும்?",
];

export default function ChatPage() {
  const { user } = useAuth();
  const [language, setLanguage] = useState<"en" | "ta">("en");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const submit = async (text: string) => {
    const q = text.trim();
    if (!q) return;
    if (q.length > 800) {
      setMessages((m) => [
        ...m,
        { role: "error", content: "Your question is too long. Please keep it under 800 characters.", id: crypto.randomUUID() },
      ]);
      return;
    }

    const userMsg: ChatMessage = {
      role: "user",
      content: q,
      id: crypto.randomUUID(),
      language,
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const answer = await askGemini(q, language);
      setMessages((m) => [...m, { role: "assistant", content: answer, id: crypto.randomUUID() }]);
      if (user) {
        addHistory({ userId: user.id, question: q, language, answer });
      }
    } catch (err) {
      const msg =
        !navigator.onLine
          ? "You appear to be offline. Please check your connection and try again."
          : (err as Error).message || "Something went wrong. Please try again.";
      setMessages((m) => [...m, { role: "error", content: msg, id: crypto.randomUUID() }]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit(input);
  };

  const suggestions = language === "ta" ? SUGGESTIONS_TA : SUGGESTIONS_EN;

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-5xl flex-col px-3 py-4 sm:px-6">
      {/* Header */}
      <div className="mb-3 flex flex-wrap items-center gap-3 rounded-2xl border border-stone-200 bg-white/80 px-4 py-3 backdrop-blur dark:border-stone-800 dark:bg-stone-900/70">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow">
          <Leaf size={16} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm font-semibold text-stone-900 dark:text-white">
            VIVASAYI Advisor
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
              <Sparkles size={10} /> Gemini
            </span>
          </div>
          <div className="text-[11px] text-stone-500">Ask in Tamil or English · advice in seconds</div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-xl border border-stone-200 bg-stone-50 p-1 text-xs dark:border-stone-800 dark:bg-stone-900">
            <button
              onClick={() => setLanguage("en")}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-semibold transition ${
                language === "en"
                  ? "bg-white text-emerald-700 shadow dark:bg-stone-800 dark:text-emerald-300"
                  : "text-stone-500"
              }`}
            >
              <Languages size={12} /> EN
            </button>
            <button
              onClick={() => setLanguage("ta")}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-semibold transition ${
                language === "ta"
                  ? "bg-white text-emerald-700 shadow dark:bg-stone-800 dark:text-emerald-300"
                  : "text-stone-500"
              }`}
            >
              த TA
            </button>
          </div>
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="grid h-8 w-8 place-items-center rounded-lg border border-stone-200 bg-white text-stone-500 transition hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:hover:bg-stone-800"
              title="Clear chat"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto rounded-2xl border border-stone-200 bg-gradient-to-b from-white/60 to-stone-50/60 p-4 dark:border-stone-800 dark:from-stone-900/60 dark:to-stone-950/60"
      >
        {messages.length === 0 && !loading && (
          <EmptyState
            language={language}
            suggestions={suggestions}
            onPick={(s) => submit(s)}
          />
        )}

        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4"
            >
              {m.role === "user" && (
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-emerald-500 to-green-600 px-4 py-2.5 text-sm text-white shadow-md">
                    {m.content}
                  </div>
                </div>
              )}
              {m.role === "assistant" && (
                <div className="flex gap-2">
                  <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow">
                    <Leaf size={14} />
                  </div>
                  <div className="max-w-[92%] flex-1">
                    <AdvisoryCard answer={m.content} />
                  </div>
                </div>
              )}
              {m.role === "error" && (
                <div className="flex gap-2">
                  <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-red-500 text-white">
                    <AlertCircle size={14} />
                  </div>
                  <div className="max-w-[85%] rounded-2xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
                    {m.content}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <div className="flex gap-2">
            <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow">
              <Leaf size={14} />
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-sm dark:bg-stone-800/60">
              <span className="typing-dot h-2 w-2 rounded-full bg-emerald-500" />
              <span className="typing-dot h-2 w-2 rounded-full bg-emerald-500" />
              <span className="typing-dot h-2 w-2 rounded-full bg-emerald-500" />
              <span className="ml-1 text-xs text-stone-500">
                {language === "ta" ? "ஆலோசகர் சிந்திக்கிறார்…" : "Advisor is thinking…"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={onSubmit}
        className="mt-3 flex items-end gap-2 rounded-2xl border border-stone-200 bg-white p-2 shadow-sm dark:border-stone-800 dark:bg-stone-900"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit(input);
            }
          }}
          rows={1}
          placeholder={
            language === "ta"
              ? "உங்கள் கேள்வியை இங்கே தட்டச்சு செய்யவும்…"
              : "Type your farming question here…"
          }
          className="max-h-40 flex-1 resize-none bg-transparent px-3 py-2 text-sm text-stone-900 outline-none placeholder:text-stone-400 dark:text-white"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-md transition hover:shadow-lg disabled:opacity-40"
        >
          <Send size={16} />
        </button>
      </form>
      <div className="mt-1.5 px-1 text-[11px] text-stone-500">
        Press <kbd className="rounded border border-stone-300 px-1 dark:border-stone-700">Enter</kbd> to send ·{" "}
        <kbd className="rounded border border-stone-300 px-1 dark:border-stone-700">Shift+Enter</kbd> for new line
      </div>
    </div>
  );
}

function EmptyState({
  language,
  suggestions,
  onPick,
}: {
  language: "en" | "ta";
  suggestions: string[];
  onPick: (s: string) => void;
}) {
  return (
    <div className="grid h-full place-items-center py-10 text-center">
      <div className="max-w-xl">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow-lg">
          <BookOpen size={22} />
        </div>
        <h2 className="mt-4 text-xl font-bold text-stone-900 dark:text-white">
          {language === "ta" ? "உங்கள் வேளாண் கேள்விகளை கேளுங்கள்" : "Ask any farming question"}
        </h2>
        <p className="mt-1.5 text-sm text-stone-600 dark:text-stone-400">
          {language === "ta"
            ? "பயிர், பூச்சி, மண், நீர் — எதைப் பற்றியும் கேளுங்கள். தெளிவான தீர்வை பெறுங்கள்."
            : "Crops, pests, soil, water — anything. You'll get a clear plan you can apply today."}
        </p>

        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => onPick(s)}
              className="rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-left text-sm text-stone-700 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-emerald-500/40"
            >
              <span className="mr-1 text-emerald-500">›</span>
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
