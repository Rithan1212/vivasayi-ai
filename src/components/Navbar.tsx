import { Link, NavLink, useNavigate } from "react-router-dom";
import { Moon, Sun, LogOut, Menu, X, MessageSquare, LayoutDashboard, Home } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import Logo from "./Logo";
import { cn } from "../utils/cn";

const navLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/chat", label: "AI Chat", icon: MessageSquare, auth: true },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, auth: true },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/60 bg-white/70 backdrop-blur-xl dark:border-stone-800/60 dark:bg-stone-950/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks
            .filter((l) => !l.auth || user)
            .map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                      : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800/60 dark:hover:text-white"
                  )
                }
              >
                <l.icon size={16} />
                {l.label}
              </NavLink>
            ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-lg border border-stone-200 bg-white text-stone-600 transition hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {user ? (
            <div className="hidden items-center gap-2 md:flex">
              <div className="hidden text-right lg:block">
                <div className="text-sm font-medium text-stone-800 dark:text-stone-100">
                  {user.name}
                </div>
                <div className="text-[11px] text-stone-500">{user.email}</div>
              </div>
              <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-green-600 text-sm font-semibold text-white shadow">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                to="/login"
                className="rounded-lg px-3 py-2 text-sm font-medium text-stone-700 transition hover:text-emerald-600 dark:text-stone-300 dark:hover:text-emerald-400"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-500/30 transition hover:shadow-lg hover:shadow-emerald-500/40"
              >
                Get Started
              </Link>
            </div>
          )}

          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-stone-200 bg-white text-stone-600 md:hidden dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300"
            aria-label="Menu"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-stone-200/60 bg-white/90 md:hidden dark:border-stone-800/60 dark:bg-stone-950/80"
          >
            <div className="space-y-1 px-4 py-3">
              {navLinks
                .filter((l) => !l.auth || user)
                .map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.to === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium",
                        isActive
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                          : "text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800/60"
                      )
                    }
                  >
                    <l.icon size={16} />
                    {l.label}
                  </NavLink>
                ))}
              <div className="my-2 h-px bg-stone-200 dark:bg-stone-800" />
              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                >
                  <LogOut size={16} /> Logout ({user.name})
                </button>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-lg border border-stone-200 px-3 py-2 text-center text-sm font-medium text-stone-700 dark:border-stone-800 dark:text-stone-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 px-3 py-2 text-center text-sm font-semibold text-white"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
