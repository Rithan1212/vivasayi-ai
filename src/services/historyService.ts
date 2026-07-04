import type { AdvisoryAnswer } from "./geminiService";

export interface QueryRecord {
  id: string;
  userId: string;
  question: string;
  language: "en" | "ta";
  answer: AdvisoryAnswer;
  createdAt: string;
}

const KEY = "VIVASAYI:history";

function loadAll(): QueryRecord[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as QueryRecord[]) : [];
  } catch {
    return [];
  }
}
function saveAll(items: QueryRecord[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function getHistory(userId: string): QueryRecord[] {
  return loadAll()
    .filter((r) => r.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addHistory(record: Omit<QueryRecord, "id" | "createdAt">): QueryRecord {
  const full: QueryRecord = {
    ...record,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const all = loadAll();
  all.push(full);
  saveAll(all);
  return full;
}

export function deleteHistory(userId: string, id: string) {
  const all = loadAll().filter((r) => !(r.userId === userId && r.id === id));
  saveAll(all);
}

export function clearHistory(userId: string) {
  const all = loadAll().filter((r) => r.userId !== userId);
  saveAll(all);
}
