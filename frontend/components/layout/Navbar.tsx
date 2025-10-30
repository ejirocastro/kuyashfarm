"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

/**
 * Responsive Navbar with scroll effect
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className={cn(
              "font-serif text-2xl font-bold transition-colors duration-300",
              isScrolled ? "text-[#2d5f3f]" : "text-white"
            )}
          >
            {SITE_CONFIG.name}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "font-sans text-sm font-medium transition-colors duration-300 hover:text-[#6b9d7a]",
                  isScrolled ? "text-gray-700" : "text-white/90"
                )}
              >
                {link.label}
              </a>
            ))}
            <button
              className={cn(
                "rounded-full px-6 py-2 font-medium transition-all duration-300",
                isScrolled
                  ? "bg-[#2d5f3f] text-white hover:bg-[#4a7c59]"
                  : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
              )}
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "md:hidden p-2 rounded-md transition-colors",
              isScrolled ? "text-gray-700" : "text-white"
            )}
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white py-4">
            <div className="flex flex-col space-y-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-sans text-sm font-medium text-gray-700 hover:text-[#2d5f3f] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button className="w-full rounded-full bg-[#2d5f3f] px-6 py-2 text-white font-medium hover:bg-[#4a7c59] transition-colors">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
