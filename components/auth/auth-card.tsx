"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface AuthCardProps {
  children: React.ReactNode;
  isSuccess?: boolean;
}

export function AuthCard({ children, isSuccess = false }: AuthCardProps) {
  return (
    <div className="w-full rounded-2xl border border-white/[0.08] bg-[#0A0F24]/75 shadow-2xl relative overflow-hidden p-6 md:p-8 min-h-[380px] flex flex-col justify-between">
      
      {/* Full-Card Success Ripple Transition Overlay */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#050816]/95 backdrop-blur-md z-45 flex flex-col items-center justify-center text-center p-6"
          >
            {/* Pulsing check circle */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative h-16 w-16 mb-6 flex items-center justify-center"
            >
              {/* Ripple circles */}
              <div className="absolute inset-0 rounded-full bg-success/15 border border-success/30 animate-ping" />
              <div className="h-10 w-10 rounded-full bg-success/20 border border-success/30 flex items-center justify-center text-success relative z-10">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </motion.div>
            
            <h3 className="text-lg font-bold text-white tracking-tight">Authentication Complete</h3>
            <p className="text-xs text-text-secondary mt-2">Preparing your secure workspace...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main card forms */}
      <div className="flex-grow flex flex-col justify-between relative z-10">
        {children}
      </div>

    </div>
  );
}
