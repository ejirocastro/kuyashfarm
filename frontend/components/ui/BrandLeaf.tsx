import { cn } from "@/lib/utils";

interface BrandLeafProps {
  className?: string;
  strokeWidth?: number;
}

export function BrandLeaf({ className, strokeWidth = 2 }: BrandLeafProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <path d="M12 22V12M12 12C12 7 7 3 2 4c0 5 4 9 10 8M12 12c0-5 5-9 10-8-1 5-5 9-10 8" />
    </svg>
  );
}
