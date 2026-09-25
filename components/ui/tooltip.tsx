"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function Tooltip({ content, children, side = "top", className }: TooltipProps) {
  const [hovered, setHovered] = useState(false);

  const sideCoordinates = {
    top: { initial: { y: 6, x: "-50%", opacity: 0 }, animate: { y: 0, x: "-50%", opacity: 1 }, exit: { y: 4, x: "-50%", opacity: 0 }, posClass: "bottom-full left-1/2 mb-2" },
    bottom: { initial: { y: -6, x: "-50%", opacity: 0 }, animate: { y: 0, x: "-50%", opacity: 1 }, exit: { y: -4, x: "-50%", opacity: 0 }, posClass: "top-full left-1/2 mt-2" },
    left: { initial: { x: 6, y: "-50%", opacity: 0 }, animate: { x: 0, y: "-50%", opacity: 1 }, exit: { x: 4, y: "-50%", opacity: 0 }, posClass: "right-full top-1/2 mr-2" },
    right: { initial: { x: -6, y: "-50%", opacity: 0 }, animate: { x: 0, y: "-50%", opacity: 1 }, exit: { x: -4, y: "-50%", opacity: 0 }, posClass: "left-full top-1/2 ml-2" },
  };

  const currentSide = sideCoordinates[side];

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {children}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={currentSide.initial}
            animate={currentSide.animate}
            exit={currentSide.exit}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className={cn(
              "absolute z-50 whitespace-nowrap rounded-md bg-[#0F172A] border border-white/10 px-3 py-1.5 text-xs font-medium text-white shadow-xl pointer-events-none",
              currentSide.posClass,
              className
            )}
            role="tooltip"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
