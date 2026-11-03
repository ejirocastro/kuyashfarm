import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: string;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p className={cn(
      "mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-muted",
      className
    )}>
      {children}
    </p>
  );
}
