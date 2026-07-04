import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
  message: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: "" };

  static getDerivedStateFromError(err: Error): State {
    return { hasError: true, message: err.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // In production this would ship to a logging service
    console.error("[VIVASAYI] Uncaught error:", error, info);
  }

  reset = () => this.setState({ hasError: false, message: "" });

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="grid min-h-screen place-items-center bg-stone-50 px-4 text-center dark:bg-stone-950">
        <div className="max-w-md">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-300">
            <AlertTriangle size={26} />
          </div>
          <h1 className="mt-5 text-2xl font-bold text-stone-900 dark:text-white">
            Something went wrong
          </h1>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            We hit an unexpected error. Don't worry — your data is safe. Try reloading the page.
          </p>
          {this.state.message && (
            <pre className="mt-3 overflow-auto rounded-lg bg-stone-100 p-3 text-left text-[11px] text-stone-700 dark:bg-stone-900 dark:text-stone-300">
              {this.state.message}
            </pre>
          )}
          <button
            onClick={() => {
              this.reset();
              window.location.hash = "#/";
              window.location.reload();
            }}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30"
          >
            <RefreshCw size={14} /> Reload App
          </button>
        </div>
      </div>
    );
  }
}
