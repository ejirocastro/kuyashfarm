"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { NavWorkMenuProps } from "./types";

export function NavWorkMenu({ pathname, services, projects }: NavWorkMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const isActive = pathname.startsWith("/projects") || pathname.startsWith("/services");

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          "relative flex items-center gap-1 px-3 py-2 font-sans text-sm font-medium transition-colors duration-200 group",
          isOpen || isActive ? "text-white" : "text-white/75 hover:text-white"
        )}
      >
        Our Work
        <ChevronDown className={cn(
          "w-3 h-3 transition-transform duration-200",
          isOpen ? "rotate-180 text-white" : "text-white/50"
        )} />
        <span className={cn(
          "absolute bottom-1 left-3 right-5 h-px bg-muted transition-transform duration-200 origin-left",
          isOpen || isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        )} />
      </button>

      {/* invisible bridge so mouse doesn't close menu mid-travel */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full h-3 pointer-events-auto" />
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-full mt-3 w-[420px] bg-dark/96 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            <div className="px-6 pt-5 pb-4 border-b border-white/[0.07]">
              <p className="font-serif text-sm font-semibold text-white tracking-tight">Our Work</p>
              <p className="font-sans text-[11px] text-white/40 mt-0.5">What Kuyash grows, raises and builds.</p>
            </div>

            <div className="grid grid-cols-2 gap-0 divide-x divide-white/[0.07]">
              <div className="px-5 py-4">
                <p className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted mb-3">Our Services</p>
                <ul className="space-y-0.5">
                  {services.map((p) => (
                    <li key={p.label}>
                      <Link
                        href={p.href}
                        prefetch={false}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "block py-1.5 font-sans text-[13px] transition-all duration-150 hover:translate-x-0.5",
                          pathname === p.href ? "text-white font-medium" : "text-white/70 hover:text-white"
                        )}
                      >
                        {p.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-5 py-4">
                <p className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted mb-3">Coming Soon</p>
                <ul className="space-y-0.5">
                  {projects.map((p) => (
                    <li key={p.label}>
                      <Link
                        href={p.href}
                        prefetch={false}
                        onClick={() => setIsOpen(false)}
                        className="block py-1.5 font-sans text-[13px] text-white/50 hover:text-white/80 transition-all duration-150 hover:translate-x-0.5"
                      >
                        {p.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
