"use client";

import React, { useEffect } from "react";
import { AlertCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SettingsConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  cancelLabel?: string;
  confirmLabel?: string;
  isDanger?: boolean;
}

export function SettingsConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  isDanger = false,
}: SettingsConfirmDialogProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
      if (e.key === "Enter" && isOpen) {
        onConfirm();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onConfirm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-sm rounded-xl border border-white/10 bg-[#0A0F24] p-5 shadow-2xl space-y-4 text-left"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className={`h-4.5 w-4.5 shrink-0 ${isDanger ? "text-danger" : "text-primary"}`} />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white/5 text-text-secondary/50 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-xs text-text-secondary/80 leading-relaxed font-mono">
          {description}
        </p>

        <div className="flex justify-end gap-2 text-xs font-semibold pt-1 border-t border-white/[0.04]">
          <button
            onClick={onClose}
            className="h-8.5 px-3.5 rounded border border-white/10 hover:bg-white/5 text-text-secondary cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`h-8.5 px-4 rounded font-bold cursor-pointer transition-all active:scale-[0.98] ${
              isDanger
                ? "bg-danger hover:bg-danger/90 text-white"
                : "bg-primary hover:bg-primary/90 text-background-primary"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
