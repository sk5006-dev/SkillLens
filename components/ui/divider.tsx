import React from "react";
import { cn } from "@/lib/utils";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  gradient?: boolean;
}

export function Divider({ orientation = "horizontal", gradient = true, className, ...props }: DividerProps) {
  return (
    <div
      className={cn(
        orientation === "horizontal"
          ? cn("h-[1px] w-full", gradient ? "bg-gradient-to-r from-transparent via-white/10 to-transparent" : "bg-white/10")
          : cn("w-[1px] h-full min-h-[1em]", gradient ? "bg-gradient-to-b from-transparent via-white/10 to-transparent" : "bg-white/10"),
        className
      )}
      role="separator"
      {...props}
    />
  );
}
