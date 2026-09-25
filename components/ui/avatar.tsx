"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
}

export function Avatar({ src, alt = "Avatar", fallback, size = "md", className, ...props }: AvatarProps) {
  const [error, setError] = useState(false);

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-base",
  };

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/[0.03] text-white items-center justify-center select-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src && !error ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setError(true)}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      ) : fallback ? (
        <span className="font-semibold text-text-secondary uppercase tracking-wider">{fallback.slice(0, 2)}</span>
      ) : (
        <User className="h-[50%] w-[50%] text-text-secondary" />
      )}
    </div>
  );
}
