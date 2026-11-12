"use client";

import { useState, useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";
import { cn, getCurrentUser } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { AuthModal } from "@/components/auth/AuthModal";
import CartButton from "@/components/cart/CartButton";
import CartDrawer from "@/components/cart/CartDrawer";
import Link from "next/link";
import type { User } from "@/lib/types";
import { BrandLeaf } from "@/components/ui";
import { NavWorkMenu } from "./navbar/NavWorkMenu";
import { NavUserMenu } from "./navbar/NavUserMenu";
import { NavMobileMenu } from "./navbar/NavMobileMenu";

const NAV_SERVICES = [
  { label: "Crop Production",          href: "/services/crop-vegetable-production" },
  { label: "Fisheries & Aquaculture",  href: "/services/fish-farming" },
  { label: "Livestock",                href: "/services/livestock" },
  { label: "Poultry",                  href: "/services/poultry" },
  { label: "Palm Oil Production",      href: "/services/palm-oil-production" },
  { label: "Groundnut Oil Production", href: "/services/groundnut-oil-production" },
];

const NAV_PROJECTS = [
  { label: "Palm Oil Refinery",     href: "/projects/palm-oil-refinery" },
  { label: "Water Factory",         href: "/projects/water-factory" },
  { label: "Soap & Tissue Factory", href: "/projects/soap-tissue-factory" },
  { label: "Slaughter House",       href: "/projects/slaughter-house" },
];

export function Navbar() {
  return (
    <Suspense fallback={<nav className="fixed top-0 left-0 right-0 z-40 h-16 bg-transparent" />}>
      <NavbarInner />
    </Suspense>
  );
}

function NavbarInner() {
  const pathname = usePathname();
  const LIGHT_TOP_PAGES = ["/contact", "/become-distributor", "/services/groundnut-oil-production"];
  const alwaysDark = LIGHT_TOP_PAGES.includes(pathname);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
    const handleStorageChange = () => setUser(getCurrentUser());
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setIsMobileMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  const userInitials = user?.name
    ? user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "U";

  const navDark = alwaysDark || isScrolled;

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
        navDark
          ? "bg-dark/95 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.06)]"
          : "bg-transparent"
      )}>
        {/* brand accent line */}
        <div className={cn(
          "absolute top-0 left-0 right-0 h-0.5 bg-brand transition-opacity duration-500",
          isScrolled ? "opacity-100" : "opacity-0"
        )} />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                <BrandLeaf className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-lg font-bold text-white tracking-tight">Kuyash</span>
                <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-white/50 mt-0.5">Integrated Farm</span>
              </div>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex md:items-center md:gap-1">
              {NAV_LINKS.map((link) => {
                const resolvedHref = link.href.startsWith("#") && pathname !== "/" ? `/${link.href}` : link.href;
                const isActive = !link.href.startsWith("#") && pathname === link.href;

                if (link.label === "Academy") {
                  return (
                    <Link
                      key={link.label}
                      href={resolvedHref}
                      className="ml-2 inline-flex items-center gap-1.5 border border-gold/60 text-gold px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-gold/10 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  );
                }

                if (link.label === "Our Work") {
                  return (
                    <NavWorkMenu
                      key="our-work"
                      pathname={pathname}
                      services={NAV_SERVICES}
                      projects={NAV_PROJECTS}
                    />
                  );
                }

                return (
                  <Link
                    key={link.label}
                    href={resolvedHref}
                    className={cn(
                      "relative px-3 py-2 font-sans text-sm font-medium transition-colors duration-200 group",
                      isActive ? "text-white" : "text-white/75 hover:text-white"
                    )}
                  >
                    {link.label}
                    <span className={cn(
                      "absolute bottom-1 left-3 right-3 h-px bg-muted transition-transform duration-200 origin-left",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )} />
                  </Link>
                );
              })}
            </div>

            {/* Desktop right side */}
            <div className="hidden md:flex items-center gap-3">
              <CartButton onClick={() => setIsCartOpen(true)} />
              {user ? (
                <NavUserMenu user={user} onLogout={handleLogout} />
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="rounded-full border border-white/20 bg-white/10 hover:bg-white/18 backdrop-blur-sm px-5 py-2 font-sans text-sm font-semibold text-white transition-all duration-200"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile: cart + hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <CartButton onClick={() => setIsCartOpen(true)} />
              <button
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                className="p-2.5 rounded-xl text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span className={cn("block h-0.5 bg-white rounded-full transition-all duration-300", isMobileMenuOpen && "rotate-45 translate-y-[7px]")} />
                  <span className={cn("block h-0.5 bg-white rounded-full transition-all duration-300", isMobileMenuOpen && "opacity-0 scale-x-0")} />
                  <span className={cn("block h-0.5 bg-white rounded-full transition-all duration-300", isMobileMenuOpen && "-rotate-45 -translate-y-[9px]")} />
                </div>
              </button>
            </div>
          </div>
        </div>

        <NavMobileMenu
          isOpen={isMobileMenuOpen}
          pathname={pathname}
          user={user}
          userInitials={userInitials}
          navLinks={NAV_LINKS}
          services={NAV_SERVICES}
          projects={NAV_PROJECTS}
          onClose={() => setIsMobileMenuOpen(false)}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
        />
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setUser(getCurrentUser());
          setIsAuthModalOpen(false);
        }}
      />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
