"use client";

import React from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { pageTransitionVariants } from "@/components/animations/presets";
import { cn } from "@/lib/utils";

interface PageWrapperProps extends HTMLMotionProps<"main"> {
  children: React.ReactNode;
}

export function PageWrapper({ children, className, ...props }: PageWrapperProps) {
  return (
    <motion.main
      variants={pageTransitionVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn("flex-grow flex flex-col justify-center", className)}
      {...props}
    >
      {children}
    </motion.main>
  );
}
