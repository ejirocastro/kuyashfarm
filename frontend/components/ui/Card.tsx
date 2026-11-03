import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: "div" | "article" | "li";
}

export function Card({ children, className, hover = false, as: Tag = "div" }: CardProps) {
  return (
    <Tag
      className={cn(
        "bg-white border border-border rounded-2xl transition-all duration-300",
        hover && "hover:border-brand-border hover:shadow-[0_20px_40px_rgba(0,0,0,0.10)]",
        className
      )}
    >
      {children}
    </Tag>
  );
}
