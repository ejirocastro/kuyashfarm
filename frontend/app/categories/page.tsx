"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FARM_CATEGORIES } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, ArrowRight, Sparkles } from "lucide-react";

/**
 * Farm Categories Page - Next Generation Interactive Design
 */
export default function CategoriesPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-b from-white via-green-50/30 to-white pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-16 text-center animate-fade-in">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-green-600/30 bg-green-50 px-6 py-2 hover:bg-green-100 hover:border-green-600/50 transition-all duration-300 cursor-default">
              <Sparkles className="h-4 w-4 text-green-600 animate-pulse" />
              <span className="font-sans text-sm font-medium text-green-700">
                Premium Farm Products
              </span>
            </div>

            <h1 className="font-serif text-5xl font-bold leading-tight md:text-6xl lg:text-7xl mb-6 animate-slide-up">
              <span className="block bg-linear-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Visit Our Farm
              </span>
            </h1>
            <p className="mt-6 font-sans text-lg text-gray-600 md:text-xl max-w-2xl mx-auto animate-slide-up animation-delay-200">
              Discover fresh, sustainable products from our integrated farm
            </p>
          </div>

          {/* Categories Grid - Bento Style */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FARM_CATEGORIES.map((category, index) => (
              <Link
                key={category.id}
                href={`/shop/${category.slug}`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 animate-slide-up"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                {/* Card Container */}
                <div className="relative h-80 overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-500">
                  {/* Background Image with Parallax Effect */}
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover opacity-70 transition-opacity duration-500 group-hover:opacity-90"
                    />
                  </div>

                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/60 to-transparent" />
                  <div className="absolute inset-0 bg-linear-to-br from-green-500/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Animated Border Glow */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute inset-0 rounded-3xl border-2 border-green-400/50 blur-sm" />
                  </div>

                  {/* Content */}
                  <div className="relative flex h-full flex-col justify-end p-6">
                    {/* Category Icon/Number */}
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-green-400/40 bg-green-500/30 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-green-400/60 group-hover:bg-green-500/50">
                      <span className="font-serif text-base font-bold text-green-200 group-hover:text-white transition-colors">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Category Name */}
                    <h2 className="mb-3 font-serif text-3xl font-bold text-white transition-all duration-300 group-hover:translate-x-2 group-hover:text-green-50">
                      {category.name}
                    </h2>

                    {/* Description */}
                    <p className="mb-4 font-sans text-sm leading-relaxed text-gray-300 transition-all duration-500 group-hover:text-white line-clamp-2">
                      {category.description}
                    </p>

                    {/* Shop Now Button */}
                    <div className="flex items-center gap-3">
                      <div className="inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 font-sans text-sm font-semibold text-white transition-all duration-300 group-hover:bg-green-500 group-hover:px-6 group-hover:shadow-xl group-hover:shadow-green-500/50">
                        <ShoppingCart className="h-4 w-4" />
                        <span>Shop Now</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>

                      {/* Active Indicator */}
                      {hoveredCard === index && (
                        <div className="flex items-center gap-1 animate-fade-in">
                          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '150ms' }} />
                          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '300ms' }} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute right-0 top-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-linear-to-br from-green-400/30 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                {/* Bottom Glow Effect */}
                <div className="absolute -bottom-2 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-full bg-green-500/40 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100" />
              </Link>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 rounded-3xl border-2 border-green-100 bg-linear-to-br from-green-50/50 to-white p-10 shadow-sm hover:shadow-lg transition-all duration-500 animate-slide-up" style={{ animationDelay: '600ms' }}>
            {[
              { value: "6+", label: "Product Categories", icon: "📦" },
              { value: "100%", label: "Organic & Fresh", icon: "🌱" },
              { value: "24/7", label: "Farm to Table", icon: "🚚" },
            ].map((stat, i) => (
              <div key={i} className="text-center group cursor-default">
                <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="font-serif text-4xl font-bold text-green-600 md:text-5xl mb-2 group-hover:text-green-700 transition-colors">
                  {stat.value}
                </div>
                <div className="mt-2 font-sans text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
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
