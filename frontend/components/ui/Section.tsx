import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "py-14",
  md: "py-20",
  lg: "py-24",
};

export function Section({ children, className, id, size = "md" }: SectionProps) {
  return (
    <section id={id} className={cn(sizes[size], className)}>
      {children}
    </section>
  );
}
