"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { User, LogOut, Settings, Package, Truck, LayoutDashboard, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { getTierDisplayName, getTierBadgeColor } from "@/lib/features/distributor/distributor-utils";
import type { NavUserMenuProps } from "./types";

function DropdownLink({
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
        "flex items-center gap-2.5 px-4 py-2 text-sm transition-colors duration-150",
        accent ? "text-brand hover:bg-brand-bg" : "text-gray-600 hover:bg-gray-50"
      )}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span>{label}</span>
    </Link>
  );
}

export function NavUserMenu({ user, onLogout }: NavUserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const userInitials = user.name
    ? user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "U";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center gap-2.5 rounded-full border border-white/15 bg-white/8 hover:bg-white/14 backdrop-blur-sm px-3 py-1.5 transition-all duration-200"
      >
        <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center shrink-0">
          <span className="text-white text-[10px] font-bold">{userInitials}</span>
        </div>
        <span className="font-sans text-sm font-medium text-white max-w-[100px] truncate">
          {user.name?.split(" ")[0] || "Account"}
        </span>
        <ChevronDown className={cn(
          "w-3.5 h-3.5 text-white/60 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-1.5 z-50"
          >
            <div className="px-4 py-3 border-b border-gray-50">
              <p className="text-xs font-semibold text-dark truncate">{user.name}</p>
              <p className="text-[10px] text-gray-400 truncate mt-0.5">{user.email}</p>
            </div>

            <div className="py-1">
              <DropdownLink href="/profile" icon={User} label="My Profile" onClick={() => setIsOpen(false)} />
              <DropdownLink href="/orders" icon={Package} label="My Orders" onClick={() => setIsOpen(false)} />
              <DropdownLink href="/academy/dashboard" icon={LayoutDashboard} label="Academy Dashboard" onClick={() => setIsOpen(false)} />
            </div>

            {user.userType !== "distributor_pending" && user.userType !== "distributor_verified" && (
              <>
                <div className="h-px bg-gray-50 mx-3" />
                <div className="py-1">
                  <DropdownLink href="/become-distributor" icon={Truck} label="Become a Distributor" onClick={() => setIsOpen(false)} accent />
                </div>
              </>
            )}

            {user.userType === "distributor_pending" && (
              <div className="mx-3 my-1.5 px-3 py-2 bg-gold/20 border border-gold/40 rounded-xl">
                <p className="text-[11px] font-semibold text-dark2">Application pending review</p>
              </div>
            )}

            {user.userType === "distributor_verified" && (
              <div className="mx-3 my-1.5 px-3 py-2 bg-brand-bg border border-brand-border rounded-xl">
                <p className="text-[11px] font-semibold text-brand">✓ Verified Distributor</p>
                {user.distributorInfo?.tier && (
                  <span className={`inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getTierBadgeColor(user.distributorInfo.tier)}`}>
                    {getTierDisplayName(user.distributorInfo.tier)}
                  </span>
                )}
              </div>
            )}

            <div className="h-px bg-gray-50 mx-3" />
            <div className="py-1">
              <DropdownLink href="/profile?tab=settings" icon={Settings} label="Settings" onClick={() => setIsOpen(false)} />
              <button
                onClick={() => { onLogout(); setIsOpen(false); }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors duration-150"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
