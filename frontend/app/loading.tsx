export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-brand/20 border-t-brand" />
        </div>
        <p className="font-sans text-sm text-gray-400 tracking-wide">Loading…</p>
      </div>
    </div>
  );
}
