"use client";

import React, { useEffect, useState } from "react";
import { RefreshCw, CheckCircle2, Loader2, X, Terminal, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface SyncDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSyncComplete: () => void;
}

const SYNC_STAGES = [
  "Connecting to repository sources...",
  "Fetching repository metadata & commits...",
  "Analyzing commits & author patterns...",
  "Scanning source files & Docker manifests...",
  "Detecting technologies & framework versions...",
  "Verifying architecture & reliability signals...",
  "Updating portfolio intelligence & evidence graph...",
];

export function ProjectSyncDialog({ isOpen, onClose, onSyncComplete }: SyncDialogProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStage(0);
      setIsCompleted(false);
      return;
    }

    let stage = 0;
    const interval = setInterval(() => {
      stage += 1;
      setCurrentStage(stage);

      if (stage >= SYNC_STAGES.length) {
        clearInterval(interval);
        setIsCompleted(true);
        setTimeout(() => {
          onSyncComplete();
          onClose();
        }, 800);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [isOpen, onSyncComplete, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0A0F24] p-6 shadow-2xl space-y-5 text-left"
      >
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-primary animate-spin" />
            <h3 className="text-base font-bold text-white">Synchronizing Portfolio Evidence</h3>
          </div>
          {isCompleted && (
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-white/5 text-text-secondary/50 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="p-4 rounded-xl border border-white/[0.06] bg-[#050816] space-y-2 max-h-60 overflow-y-auto">
          {SYNC_STAGES.map((stageName, idx) => {
            const isDone = idx < currentStage;
            const isCurr = idx === currentStage;
            return (
              <div
                key={idx}
                className={`flex items-center justify-between text-xs py-1 transition-colors font-mono ${
                  isCurr ? "text-primary font-semibold" : isDone ? "text-text-secondary/80" : "text-text-secondary/30"
                }`}
              >
                <span>{stageName}</span>
                {isDone && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />}
                {isCurr && <Loader2 className="h-3.5 w-3.5 text-primary animate-spin shrink-0" />}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-[11px] text-text-secondary/50 font-mono pt-1">
          <span>5 projects &bull; 18 technologies</span>
          <span>{isCompleted ? "Sync Complete" : `Stage ${currentStage + 1} of 7`}</span>
        </div>
      </motion.div>
    </div>
  );
}
