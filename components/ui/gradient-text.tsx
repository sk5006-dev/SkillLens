import React from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  gradient?: string;
}

export function GradientText({ children, gradient = "from-primary via-accent to-secondary", className, ...props }: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r select-none",
        gradient,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
