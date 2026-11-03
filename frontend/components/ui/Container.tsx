import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Container({ children, className, id }: ContainerProps) {
  return (
    <div id={id} className={cn("mx-auto max-w-7xl px-6 md:px-12 lg:px-16", className)}>
      {children}
    </div>
  );
}
