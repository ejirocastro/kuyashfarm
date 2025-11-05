"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FARM_CATEGORIES } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/**
 * Farm Categories Page - Next Generation Interactive Design
 */
export default function CategoriesPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-green-950 to-slate-900 pt-24 pb-16">
        {/* Animated Background Elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[10%] top-[20%] h-96 w-96 animate-pulse rounded-full bg-green-500/10 blur-3xl" />
          <div className="absolute right-[15%] bottom-[30%] h-[500px] w-[500px] animate-pulse rounded-full bg-emerald-500/10 blur-3xl animation-delay-2000" />
          <div className="absolute left-[50%] top-[10%] h-64 w-64 animate-pulse rounded-full bg-teal-500/10 blur-3xl animation-delay-4000" />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page Header with Glassmorphism */}
          <div className="mb-16 text-center">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-500/10 px-6 py-2 backdrop-blur-xl">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
              <span className="font-sans text-sm font-medium text-green-300">
                Premium Farm Products
              </span>
            </div>

            <h1 className="font-serif text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
              <span className="block bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
                Visit Our Farm
              </span>
            </h1>
            <p className="mt-6 font-sans text-lg text-gray-300 md:text-xl">
              Discover fresh, sustainable products from our integrated farm
            </p>
          </div>

          {/* Categories Grid - Bento Style */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FARM_CATEGORIES.map((category, index) => (
              <Link
                key={category.id}
                href={`/shop/${category.slug}`}
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02]"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Card Container with Glassmorphism */}
                <div className="relative h-[280px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl">
                  {/* Background Image with Parallax Effect */}
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-80"
                    />
                  </div>

                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Animated Border Glow */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute inset-0 rounded-3xl border-2 border-green-400/50 blur-sm" />
                  </div>

                  {/* Content */}
                  <div className="relative flex h-full flex-col justify-end p-5">
                    {/* Category Icon/Number */}
                    <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-green-400/30 bg-green-500/20 backdrop-blur-sm">
                      <span className="font-serif text-sm font-bold text-green-300">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Category Name */}
                    <h2 className="mb-2 font-serif text-2xl font-bold text-white transition-all duration-300 group-hover:translate-x-2">
                      {category.name}
                    </h2>

                    {/* Description */}
                    <p className="mb-3 font-sans text-xs leading-relaxed text-gray-300 transition-all duration-500 group-hover:text-white">
                      {category.description}
                    </p>

                    {/* Shop Now Button */}
                    <div className="flex items-center gap-2">
                      <div className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 font-sans text-xs font-semibold text-white transition-all duration-300 group-hover:bg-green-500 group-hover:px-5 group-hover:shadow-lg group-hover:shadow-green-500/50">
                        <span>Shop Now</span>
                        <svg
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </div>

                      {/* Hover Indicator */}
                      <div className="flex items-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                        <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse animation-delay-150" />
                        <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse animation-delay-300" />
                      </div>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute right-0 top-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br from-green-400/30 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                {/* Bottom Glow Effect */}
                <div className="absolute -bottom-2 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-full bg-green-500/30 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
              </Link>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-3 gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-xl">
            {[
              { value: "6+", label: "Product Categories" },
              { value: "100%", label: "Organic & Fresh" },
              { value: "24/7", label: "Farm to Table" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-serif text-4xl font-bold text-green-400 md:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 font-sans text-sm text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
