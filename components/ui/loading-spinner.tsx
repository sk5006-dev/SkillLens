import React from "react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({ size = "md", className, ...props }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-2.5",
    lg: "h-12 w-12 border-3",
  };

  return (
    <div className={cn("flex items-center justify-center", className)} {...props}>
      <div
        className={cn(
          "animate-spin rounded-full border-white/10 border-t-primary",
          sizeClasses[size]
        )}
        role="status"
        aria-label="loading"
      />
    </div>
  );
}
