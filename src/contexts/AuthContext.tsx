import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const USERS_KEY = "VIVASAYI:users";
const SESSION_KEY = "VIVASAYI:session";

interface StoredUser extends User {
  passwordHash: string;
}

/**
 * Tiny non-crypto hash. Acceptable for a demo/college mini-project that uses
 * localStorage. In production this is replaced by the FastAPI backend's bcrypt.
 */
function hash(input: string): string {
  let h = 5381;
  for (let i = 0; i < input.length; i++) h = (h * 33) ^ input.charCodeAt(i);
  return (h >>> 0).toString(16);
}

function loadUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}
function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const session = localStorage.getItem(SESSION_KEY);
      if (session) setUser(JSON.parse(session));
    } catch {
      /* ignore */
    }
    setLoading(false);
  }, []);

  const persistSession = (u: User | null) => {
    if (u) localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    else localStorage.removeItem(SESSION_KEY);
  };

  const login = async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 500));
    const users = loadUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) throw new Error("No account found with that email.");
    if (found.passwordHash !== hash(password)) throw new Error("Incorrect password.");
    const { passwordHash: _ph, ...safe } = found;
    void _ph;
    setUser(safe);
    persistSession(safe);
  };

  const register = async (name: string, email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 600));
    const users = loadUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("An account with that email already exists.");
    }
    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      name,
      email,
      createdAt: new Date().toISOString(),
      passwordHash: hash(password),
    };
    users.push(newUser);
    saveUsers(users);
    const { passwordHash: _ph, ...safe } = newUser;
    void _ph;
    setUser(safe);
    persistSession(safe);
  };

  const logout = () => {
    setUser(null);
    persistSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
