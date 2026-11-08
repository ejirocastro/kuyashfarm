"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, LogOut, Package, Truck, LayoutDashboard, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { NavMobileMenuProps } from "./types";

function MobileLink({
  href, icon: Icon, label, onClick, accent,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2.5 px-2 py-2.5 text-sm font-medium transition-colors",
        accent ? "text-muted" : "text-white/75 hover:text-white"
      )}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span>{label}</span>
    </Link>
  );
}

export function NavMobileMenu({
  isOpen,
  user,
  userInitials,
  navLinks,
  services,
  projects,
  onClose,
  onOpenAuth,
  onLogout,
}: NavMobileMenuProps) {
  const [isMobileProjectsOpen, setIsMobileProjectsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) setIsMobileProjectsOpen(false);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden overflow-hidden border-t border-white/10 bg-dark/97 backdrop-blur-md"
        >
          <div className="px-4 py-5 flex flex-col gap-1">
            {navLinks.map((link) => (
              link.label === "Academy" ? (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={onClose}
                  className="self-start mt-1 inline-flex items-center bg-gold text-dark2 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gold-hover transition-colors"
                >
                  {link.label}
                </Link>
              ) : link.label === "Our Work" ? (
                <div key="our-work-mobile" className="border-b border-white/5">
                  <button
                    onClick={() => setIsMobileProjectsOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-2 py-2.5 font-sans text-sm font-medium text-white/75 hover:text-white transition-colors"
                  >
                    Our Work
                    <ChevronDown className={cn(
                      "w-3.5 h-3.5 text-white/40 transition-transform duration-200",
                      isMobileProjectsOpen && "rotate-180"
                    )} />
                  </button>
                  <AnimatePresence>
                    {isMobileProjectsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-3 pl-2">
                          <p className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted px-2 pt-1 pb-2">Our Services</p>
                          {services.map((p) => (
                            <Link
                              key={p.label}
                              href={p.href}
                              onClick={() => { onClose(); setIsMobileProjectsOpen(false); }}
                              className="block px-2 py-1.5 text-sm text-white/60 hover:text-white transition-colors"
                            >
                              {p.label}
                            </Link>
                          ))}
                          <p className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted px-2 pt-3 pb-2">Coming Soon</p>
                          {projects.map((p) => (
                            <Link
                              key={p.label}
                              href={p.href}
                              onClick={() => { onClose(); setIsMobileProjectsOpen(false); }}
                              className="block px-2 py-1.5 text-sm text-white/40 hover:text-white/70 transition-colors"
                            >
                              {p.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={onClose}
                  className="px-2 py-2.5 font-sans text-sm font-medium text-white/75 hover:text-white transition-colors border-b border-white/5 last:border-0"
                >
                  {link.label}
                </a>
              )
            ))}

            <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-1">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-2 py-3 mb-1">
                    <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center shrink-0">
                      <span className="text-white text-xs font-bold">{userInitials}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{user.name}</p>
                      <p className="text-[10px] text-white/40">{user.email}</p>
                    </div>
                  </div>

                  <MobileLink href="/profile" icon={User} label="My Profile" onClick={onClose} />
                  <MobileLink href="/orders" icon={Package} label="My Orders" onClick={onClose} />
                  <MobileLink href="/academy/dashboard" icon={LayoutDashboard} label="Academy Dashboard" onClick={onClose} />

                  {user.userType !== "distributor_pending" && user.userType !== "distributor_verified" && (
                    <MobileLink href="/become-distributor" icon={Truck} label="Become a Distributor" onClick={onClose} accent />
                  )}

                  {user.userType === "distributor_pending" && (
                    <div className="px-2 py-2 text-xs text-gold/80 bg-white/5 rounded-xl mt-1">
                      Distributor application pending review
                    </div>
                  )}

                  <button
                    onClick={() => { onLogout(); onClose(); }}
                    className="flex items-center gap-2.5 px-2 py-2.5 text-sm text-red-400 hover:text-red-300 transition-colors mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { onOpenAuth(); onClose(); }}
                  className="w-full rounded-full border border-white/20 bg-white/10 px-6 py-3 text-white font-semibold text-sm hover:bg-white/15 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
