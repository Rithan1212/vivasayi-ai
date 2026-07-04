import { Leaf } from "lucide-react";

export default function Logo({ size = 36 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="grid place-items-center rounded-xl bg-gradient-to-br from-emerald-400 via-green-500 to-lime-500 text-white shadow-lg shadow-emerald-500/30"
        style={{ width: size, height: size }}
      >
        <Leaf size={size * 0.55} strokeWidth={2.2} />
      </div>
      <div className="leading-tight">
        <div className="text-base font-bold tracking-tight text-stone-900 dark:text-stone-50">
          VIVASAYI<span className="text-emerald-500">AI</span>
        </div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
          Farmer Advisory
        </div>
      </div>
    </div>
  );
}
