"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface SettingsSaveBarProps {
  isDirty: boolean;
  onSave: () => void;
  onDiscard: () => void;
}

export function SettingsSaveBar({ isDirty, onSave, onDiscard }: SettingsSaveBarProps) {
  if (!isDirty) return null;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-lg px-4"
    >
      <div className="p-3.5 rounded-xl border border-primary/20 bg-[#0A0F24] shadow-2xl flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-white font-mono">
          <AlertCircle className="h-4.5 w-4.5 text-primary shrink-0" />
          <span>You have unsaved changes</span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px]">
          <button
            onClick={onDiscard}
            className="h-8 px-3 rounded border border-white/10 hover:bg-white/5 text-text-secondary font-semibold cursor-pointer"
          >
            Discard
          </button>
          
          <button
            onClick={onSave}
            className="h-8 px-4 rounded bg-primary hover:bg-primary/90 text-background-primary font-bold cursor-pointer transition-all active:scale-[0.97]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </motion.div>
  );
}
