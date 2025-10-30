import { SITE_CONFIG } from "@/lib/constants";

/**
 * Hero Section - Full-width background with centered text
 */
export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070')",
          }}
        />
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 text-center">
        <h1 className="font-serif text-5xl font-bold leading-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="block">Farming</span>
          <span className="block">for a future</span>
        </h1>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <div className="flex h-12 w-8 items-start justify-center rounded-full border-2 border-white p-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
        </div>
      </div>
    </section>
  );
}
