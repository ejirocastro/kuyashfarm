import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  external?: boolean;
}

const variants = {
  primary:   "bg-brand text-white hover:bg-brand-hover disabled:opacity-50 disabled:cursor-not-allowed",
  secondary: "bg-white text-brand border-2 border-brand hover:bg-brand hover:text-white disabled:opacity-50 disabled:cursor-not-allowed",
  outline:   "border border-white/30 text-white hover:bg-white hover:text-brand disabled:opacity-50 disabled:cursor-not-allowed",
  ghost:     "text-brand hover:bg-brand-bg disabled:opacity-50 disabled:cursor-not-allowed",
};

const sizes = {
  sm: "px-5 py-2 text-sm gap-1.5",
  md: "px-7 py-3.5 text-sm gap-2",
  lg: "px-8 py-4 text-base gap-2",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  href,
  type = "button",
  disabled = false,
  external = false,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-sans font-semibold rounded-full transition-all duration-200",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    if (external) {
      return <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>{children}</a>;
    }
    return <Link href={href} className={classes}>{children}</Link>;
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
