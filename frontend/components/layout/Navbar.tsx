"use client";

import { useState, useEffect } from "react";
import { cn, getCurrentUser } from "@/lib/utils";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { AuthModal } from "@/components/auth/AuthModal";
import CartButton from "@/components/cart/CartButton";
import CartDrawer from "@/components/cart/CartDrawer";
import { User, LogOut, Settings, Package, Truck } from "lucide-react";
import Link from "next/link";
import type { User as UserType } from "@/lib/types";
import { getTierDisplayName, getTierBadgeColor } from "@/lib/distributor-utils";

/**
 * Responsive Navbar with scroll effect
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  // Check user authentication status
  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    // Listen for user changes (login/logout)
    const handleStorageChange = () => {
      setUser(getCurrentUser());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsUserMenuOpen(false);
    window.location.href = '/';
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-[#2d5f3f]/95 backdrop-blur-md shadow-md"
            : "bg-[#2d5f3f]"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <a
              href="/"
              className="font-serif text-2xl font-bold text-white transition-colors duration-300"
            >
              {SITE_CONFIG.name}
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.label === "Home" ? "/" : link.href}
                  className="font-sans text-sm font-medium text-white/90 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <CartButton onClick={() => setIsCartOpen(true)} />

              {/* User Menu or Sign In */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30"
                  >
                    <User className="w-4 h-4" />
                    <span>{user.name || 'Account'}</span>
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50">
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        href="/orders"
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Package className="w-4 h-4" />
                        <span>My Orders</span>
                      </Link>

                      {/* Become a Distributor - Only show if not already a distributor */}
                      {user.userType !== 'distributor_pending' && user.userType !== 'distributor_verified' && (
                        <>
                          <hr className="my-2" />
                          <Link
                            href="/become-distributor"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-green-50 transition-colors"
                          >
                            <Truck className="w-4 h-4" />
                            <span>Become a Distributor</span>
                          </Link>
                        </>
                      )}

                      {/* Show distributor status if applicable */}
                      {user.userType === 'distributor_pending' && (
                        <div className="px-4 py-2 text-sm text-amber-600 bg-amber-50 mx-2 my-1 rounded">
                          Distributor application pending
                        </div>
                      )}
                      {user.userType === 'distributor_verified' && (
                        <div className="px-4 py-2 mx-2 my-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-green-600">✓ Verified Distributor</span>
                          </div>
                          {user.distributorInfo?.tier && (
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getTierBadgeColor(user.distributorInfo.tier)}`}>
                              {getTierDisplayName(user.distributorInfo.tier)}
                            </span>
                          )}
                        </div>
                      )}

                      <hr className="my-2" />
                      <Link
                        href="/profile?tab=settings"
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="rounded-full bg-white/20 px-6 py-2 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu and Cart Buttons */}
            <div className="md:hidden flex items-center gap-2">
              <CartButton onClick={() => setIsCartOpen(true)} />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-3 rounded-md text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-white/20 bg-[#2d5f3f] py-4">
              <div className="flex flex-col space-y-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.label === "Home" ? "/" : link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-sans text-sm font-medium text-white/90 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}

                {/* Mobile User Menu */}
                {user ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 font-sans text-sm font-medium text-white/90 hover:text-white transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      href="/orders"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 font-sans text-sm font-medium text-white/90 hover:text-white transition-colors"
                    >
                      <Package className="w-4 h-4" />
                      <span>My Orders</span>
                    </Link>

                    {/* Become a Distributor - Only show if not already a distributor */}
                    {user.userType !== 'distributor_pending' && user.userType !== 'distributor_verified' && (
                      <Link
                        href="/become-distributor"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2 font-sans text-sm font-medium text-green-300 hover:text-green-200 transition-colors"
                      >
                        <Truck className="w-4 h-4" />
                        <span>Become a Distributor</span>
                      </Link>
                    )}

                    {/* Show distributor status if applicable */}
                    {user.userType === 'distributor_pending' && (
                      <div className="px-3 py-2 text-xs text-amber-300 bg-white/10 rounded">
                        Distributor application pending
                      </div>
                    )}
                    {user.userType === 'distributor_verified' && (
                      <div className="px-3 py-2 bg-white/10 rounded space-y-2">
                        <div className="text-xs text-green-300 font-medium">
                          ✓ Verified Distributor
                        </div>
                        {user.distributorInfo?.tier && (
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getTierBadgeColor(user.distributorInfo.tier)}`}>
                            {getTierDisplayName(user.distributorInfo.tier)}
                          </span>
                        )}
                      </div>
                    )}

                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 font-sans text-sm font-medium text-red-300 hover:text-red-200 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full rounded-full bg-white/20 px-6 py-2 text-white font-medium hover:bg-white/30 transition-colors backdrop-blur-sm"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setUser(getCurrentUser());
          setIsAuthModalOpen(false);
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
