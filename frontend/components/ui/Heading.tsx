import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Level = "h1" | "h2" | "h3" | "h4";
type Scale = "hero" | "display" | "section" | "subsection" | "card";

const scales: Record<Scale, string> = {
  hero:       "text-[clamp(2.6rem,6vw,4.8rem)] leading-[1.04]",
  display:    "text-[clamp(2.6rem,5vw,4rem)]   leading-[1.04]",
  section:    "text-[clamp(1.8rem,3vw,2.8rem)]  leading-[1.08]",
  subsection: "text-[clamp(1.6rem,2.5vw,2.2rem)] leading-[1.06]",
  card:       "text-base leading-snug",
};

interface HeadingProps {
  as?: Level;
  scale?: Scale;
  children: ReactNode;
  className?: string;
  light?: boolean;
}

export function Heading({ as: Tag = "h2", scale = "section", children, className, light = false }: HeadingProps) {
  return (
    <Tag className={cn(
      "font-serif font-bold",
      scales[scale],
      light ? "text-white" : "text-dark",
      className
    )}>
      {children}
    </Tag>
  );
}
