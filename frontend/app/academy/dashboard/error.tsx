"use client";

import { useEffect } from "react";
import { RotateCcw, Leaf } from "lucide-react";
import Link from "next/link";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="max-w-sm w-full text-center">
        <div className="w-14 h-14 rounded-2xl bg-brand-bg border border-brand-border flex items-center justify-center mx-auto mb-5">
          <Leaf className="w-6 h-6 text-brand" />
        </div>
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted mb-2">
          Dashboard Error
        </p>
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
          Something went wrong
        </h2>
        <p className="text-sm text-gray-400 font-sans leading-relaxed mb-8">
          We couldn&apos;t load your dashboard. Please try again or contact the academy if the problem persists.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 bg-brand text-white font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-brand-hover transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Try Again
          </button>
          <Link
            href="/academy"
            className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-semibold text-sm px-6 py-2.5 rounded-full hover:border-brand-border hover:text-brand transition-colors"
          >
            Back to Academy
          </Link>
        </div>
      </div>
    </div>
  );
}
