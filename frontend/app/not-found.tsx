import Link from "next/link";
import { Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-4">
      <div className="max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand/10">
          <Leaf className="h-7 w-7 text-brand" />
        </div>
        <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-widest text-muted">
          404 — Page not found
        </p>
        <h1 className="mb-4 font-serif text-4xl font-bold text-gray-900 md:text-5xl">
          Lost in the fields?
        </h1>
        <p className="mb-10 font-sans text-base leading-relaxed text-gray-500">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back to fresh ground.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            Back to Home
          </Link>
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-7 py-3 font-sans text-sm font-semibold text-gray-700 transition-colors hover:border-brand hover:text-brand"
          >
            Our Services
          </Link>
        </div>
      </div>
    </div>
  );
}
