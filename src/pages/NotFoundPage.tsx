import { Link } from "react-router-dom";
import { Home, Leaf } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-4 text-center">
      <div>
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow-lg">
          <Leaf size={28} />
        </div>
        <div className="mt-6 text-6xl font-black text-stone-900 dark:text-white">404</div>
        <h1 className="mt-2 text-xl font-bold text-stone-800 dark:text-stone-100">
          This field is empty
        </h1>
        <p className="mt-1 max-w-sm text-sm text-stone-600 dark:text-stone-400">
          We couldn't find the page you were looking for. Let's get you back to the farm.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:shadow-xl"
        >
          <Home size={14} /> Back to Home
        </Link>
      </div>
    </div>
  );
}
