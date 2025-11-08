"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { AuthModal } from "@/components/auth/AuthModal";
import CartButton from "@/components/cart/CartButton";
import CartDrawer from "@/components/cart/CartDrawer";

/**
 * Responsive Navbar with scroll effect
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="rounded-full bg-white/20 px-6 py-2 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30"
              >
                Sign In
              </button>
            </div>

            {/* Mobile Menu and Cart Buttons */}
            <div className="md:hidden flex items-center gap-2">
              <CartButton onClick={() => setIsCartOpen(true)} />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-white transition-colors"
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
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full rounded-full bg-white/20 px-6 py-2 text-white font-medium hover:bg-white/30 transition-colors backdrop-blur-sm"
                >
                  Sign In
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
