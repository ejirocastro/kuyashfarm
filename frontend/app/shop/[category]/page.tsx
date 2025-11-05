"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PRODUCTS } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";

/**
 * Shop Page - Airbnb-style product listing with infinite scroll
 */
export default function ShopPage() {
  const params = useParams();
  const category = params.category as string;
  const [searchQuery, setSearchQuery] = useState("");
  const [displayCount, setDisplayCount] = useState(8); // Start with 8 products
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Get products for this category
  const products = PRODUCTS[category as keyof typeof PRODUCTS] || [];

  // Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Products to display (with infinite scroll)
  const displayedProducts = filteredProducts.slice(0, displayCount);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && displayCount < filteredProducts.length) {
          setIsLoading(true);
          setTimeout(() => {
            setDisplayCount((prev) => prev + 8);
            setIsLoading(false);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [displayCount, filteredProducts.length]);

  // Reset display count when search changes
  useEffect(() => {
    setDisplayCount(8);
  }, [searchQuery]);

  // Category title formatting
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-20 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="border-b border-gray-200 pb-6 pt-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <Link
                  href="/categories"
                  className="mb-2 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back to Categories
                </Link>
                <h1 className="font-serif text-3xl font-bold text-gray-900 md:text-4xl">
                  {categoryTitle}
                </h1>
                <p className="mt-2 text-gray-600">
                  {filteredProducts.length} products available
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-gray-300 py-3 pl-12 pr-4 text-sm focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600/20"
                />
                <svg
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Products Horizontal Scroll - Prime Video Style */}
          <div className="py-8">
            {filteredProducts.length > 0 ? (
              <div className="relative">
                {/* Horizontal Scrollable Container */}
                <div className="scrollbar-hide flex gap-6 overflow-x-auto pb-4 scroll-smooth">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group flex-shrink-0 w-[280px] cursor-pointer"
                    >
                      {/* Product Image Card */}
                      <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Bookmark Button */}
                        <button className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-all hover:scale-110">
                          <svg
                            className="h-4 w-4 text-gray-800"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Product Details */}
                      <div className="space-y-1">
                        {/* Product Name and Rating */}
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-sans text-sm font-semibold text-gray-900 line-clamp-2">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <svg
                              className="h-3.5 w-3.5 text-gray-900"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-900">
                              {product.rating}
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <div>
                          <span className="font-sans text-base font-semibold text-gray-900">
                            ${product.price}
                          </span>
                          <span className="text-sm text-gray-500"> {product.unit}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-16 text-center">
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                  <svg
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 font-serif text-xl font-semibold text-gray-900">
                  No products found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
