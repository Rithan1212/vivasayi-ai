import { Leaf, Code2, MessageCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200/70 bg-white/60 backdrop-blur dark:border-stone-800/70 dark:bg-stone-950/60">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow">
                <Leaf size={18} />
              </div>
              <div className="text-base font-bold text-stone-900 dark:text-stone-100">
                VIVASAYI <span className="text-emerald-500">AI</span>
              </div>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              Empowering Indian farmers with instant AI-powered agricultural advisory in Tamil and
              English — built with Gemini, FastAPI, and a lot of love for the land.
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">Product</div>
            <ul className="mt-3 space-y-2 text-sm text-stone-600 dark:text-stone-400">
              <li><Link to="/" className="hover:text-emerald-600">Home</Link></li>
              <li><Link to="/chat" className="hover:text-emerald-600">AI Chat</Link></li>
              <li><Link to="/dashboard" className="hover:text-emerald-600">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">Connect</div>
            <ul className="mt-3 space-y-2 text-sm text-stone-600 dark:text-stone-400">
              <li className="flex items-center gap-2"><Code2 size={14} /> github.com/VIVASAYI</li>
              <li className="flex items-center gap-2"><MessageCircle size={14} /> @VIVASAYI_ai</li>
              <li className="flex items-center gap-2"><Mail size={14} /> hello@VIVASAYI.ai</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-stone-200 pt-6 text-xs text-stone-500 sm:flex-row dark:border-stone-800">
          <div>© {new Date().getFullYear()} VIVASAYI AI · College Mini Project</div>
          <div>Made with 🌱 for farmers everywhere.</div>
        </div>
      </div>
    </footer>
  );
}
