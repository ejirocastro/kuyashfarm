"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useCartStore } from "@/lib/store/useCartStore";
import { ShoppingCart, Check, Bell } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, getCurrentUser } from "@/lib/utils";
import type { User } from "@/lib/types";
import { createApplication } from "@/lib/admin-utils";
import { WholesaleBanner } from "@/components/banners/WholesaleBanner";
import { WholesaleVerifiedBanner } from "@/components/banners/WholesaleVerifiedBanner";
import { WholesaleApplicationModal } from "@/components/modals/WholesaleApplicationModal";
import { StockBadge } from "@/components/ui/StockBadge";
import { getAllProducts, subscribeToRestock } from "@/lib/inventory-manager";

/**
 * Shop Page - Airbnb-style product listing with infinite scroll
 */
export default function ShopPage() {
  const params = useParams();
  const category = params.category as string;
  const [searchQuery, setSearchQuery] = useState("");
  const addItem = useCartStore((state) => state.addItem);
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showWholesaleModal, setShowWholesaleModal] = useState(false);

  // Get user on mount
  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  // Get products for this category from inventory (real-time stock data)
  const allInventoryProducts = getAllProducts();
  const products = allInventoryProducts.filter((p) => p.category === category);

  // Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle add to cart with animation feedback
  const handleAddToCart = (product: Product) => {
    addItem(product, category);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  // Handle wholesale application
  const handleWholesaleApplication = (businessName: string, businessAddress: string) => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      console.log('Creating application for user:', currentUser);

      // Create application record
      const userId = currentUser.id || `user_${Date.now()}`;
      const userName = currentUser.name || 'User';
      const userEmail = currentUser.email || '';

      const application = createApplication(
        userId,
        userName,
        userEmail,
        businessName,
        businessAddress
      );

      console.log('Application created:', application);
      console.log('Checking localStorage after creation:', localStorage.getItem('wholesale_applications'));

      // Update user status to pending
      const updatedUser = {
        ...currentUser,
        userType: 'wholesale_pending' as const,
        businessInfo: { businessName, businessAddress },
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setShowWholesaleModal(false);

      alert('Application submitted! We will review your request within 1-2 business days.');
    }
  };

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

          {/* Wholesale Banner - Only show to retail users */}
          {user?.userType === 'retail' && (
            <div className="mb-6">
              <WholesaleBanner onApply={() => setShowWholesaleModal(true)} />
            </div>
          )}

          {/* Pending Status Banner */}
          {user?.userType === 'wholesale_pending' && (
            <div className="mb-6 rounded-lg bg-amber-50 border border-amber-200 p-4">
              <p className="text-sm text-amber-800">
                <strong>Application Pending:</strong> Your wholesale application is under review. You'll be notified once verified.
              </p>
            </div>
          )}

          {/* Verified Wholesale Banner */}
          {user?.userType === 'wholesale_verified' && (
            <div className="mb-6">
              <WholesaleVerifiedBanner />
            </div>
          )}

          {/* Products Horizontal Scroll - Prime Video Style */}
          <div className="py-8">
            {filteredProducts.length > 0 ? (
              <div className="relative">
                {/* Horizontal Scrollable Container */}
                <div className="scrollbar-hide flex gap-4 sm:gap-6 overflow-x-auto pb-4 scroll-smooth">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group shrink-0 w-[260px] sm:w-[280px]"
                    >
                      {/* Product Image Card */}
                      <div className="relative mb-4 aspect-4/3 overflow-hidden rounded-2xl">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Add to Cart Button / Stock Badge on Image */}
                        {product.stock > 0 ? (
                          <button
                            onClick={() => handleAddToCart(product)}
                            disabled={addedToCart === product.id}
                            className={`absolute right-4 top-4 flex h-10 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 ${
                              addedToCart === product.id
                                ? 'bg-green-600 text-white px-4'
                                : 'bg-white text-gray-800 w-10 hover:bg-primary hover:text-white'
                            }`}
                          >
                            {addedToCart === product.id ? (
                              <>
                                <Check className="h-4 w-4 mr-1" />
                                <span className="text-xs font-semibold">Added</span>
                              </>
                            ) : (
                              <ShoppingCart className="h-4 w-4" />
                            )}
                          </button>
                        ) : (
                          <div className="absolute right-4 top-4 bg-gray-900 bg-opacity-75 text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                            Out of Stock
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="space-y-1">
                        {/* Product Name and Rating */}
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-sans text-sm font-semibold text-gray-900 line-clamp-2">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-1 shrink-0">
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

                        {/* Price and Description */}
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {product.description}
                        </p>

                        {/* Stock Badge */}
                        <div className="mt-2">
                          <StockBadge product={product} showQuantity={true} />
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div>
                            <span className="font-sans text-base font-semibold text-gray-900">
                              {formatPrice(product.price)}
                            </span>
                            <span className="text-sm text-gray-500"> {product.unit}</span>
                          </div>
                          {product.stock > 0 ? (
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-full hover:bg-secondary transition-colors"
                            >
                              Add to Cart
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                const currentUser = getCurrentUser();
                                const userId = currentUser?.id || `guest_${Date.now()}`;
                                const userEmail = currentUser?.email || 'guest@example.com';

                                if (currentUser && currentUser.id && currentUser.email) {
                                  subscribeToRestock(product.id, userId, userEmail);
                                } else {
                                  alert('Please log in to get restock notifications');
                                }
                              }}
                              className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-1"
                            >
                              <Bell className="w-3 h-3" />
                              Notify Me
                            </button>
                          )}
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

      {/* Wholesale Application Modal */}
      <WholesaleApplicationModal
        isOpen={showWholesaleModal}
        onClose={() => setShowWholesaleModal(false)}
        onSubmit={handleWholesaleApplication}
      />
    </>
  );
}
