"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, CheckCircle2, Loader2, X, ArrowRight, FolderGit2, FileCode } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { RoadmapMilestoneData } from "./roadmap-milestone";

interface VerificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  milestone: RoadmapMilestoneData | null;
  onConfirmVerification: (taskId: string, impact: number) => void;
}

export function RoadmapVerificationDialog({
  isOpen,
  onClose,
  milestone,
  onConfirmVerification,
}: VerificationDialogProps) {
  const [stage, setStage] = useState<number>(0);
  const [isVerifying, setIsVerifying] = useState<boolean>(true);

  const verificationStages = [
    "Connecting to repository & git index...",
    "Inspecting Kubernetes manifests and Helm templates...",
    "Auditing commit history and author signatures...",
    "Validating configuration syntax & resource constraints...",
    "Benchmarking evidence against target company hiring bar...",
    "Calculating evidence confidence & capability delta...",
    "Milestone verified successfully!",
  ];

  useEffect(() => {
    if (!isOpen || !milestone) {
      setStage(0);
      setIsVerifying(true);
      return;
    }

    setIsVerifying(true);
    setStage(0);

    const interval = setInterval(() => {
      setStage((prev) => {
        if (prev < verificationStages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsVerifying(false);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(interval);
  }, [isOpen, milestone]);

  if (!isOpen || !milestone) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0A0F24] p-6 shadow-2xl space-y-5 text-left"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <div>
              <h3 className="text-base font-bold text-white">Evidence Verification</h3>
              <p className="text-xs text-text-secondary/60">
                Simulating automated code evidence inspection
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/5 text-text-secondary/50 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Milestone info */}
        <div className="p-3.5 rounded-xl border border-white/[0.04] bg-[#050816] space-y-1 text-xs font-mono">
          <span className="text-[10px] text-text-secondary/50 uppercase block">Milestone Target</span>
          <span className="text-white font-bold block">{milestone.title}</span>
          <span className="text-primary text-[11px] block">
            Repo: {milestone.relatedProject || "api-gateway"} &bull; +{milestone.projectedScoreImpact}% readiness impact
          </span>
        </div>

        {/* Progress simulation steps */}
        <div className="space-y-2 py-2">
          {verificationStages.map((st, idx) => {
            const isCurrent = idx === stage && isVerifying;
            const isCompleted = idx < stage || !isVerifying;

            return (
              <div
                key={idx}
                className={`p-2.5 rounded-lg border text-xs flex items-center gap-3 transition-all ${
                  isCurrent
                    ? "border-primary/40 bg-primary/10 text-white font-medium"
                    : isCompleted
                    ? "border-emerald-500/20 bg-emerald-500/5 text-text-secondary/80"
                    : "border-transparent text-text-secondary/30"
                }`}
              >
                {isCurrent ? (
                  <Loader2 className="h-3.5 w-3.5 text-primary animate-spin shrink-0" />
                ) : isCompleted ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <div className="h-3.5 w-3.5 rounded-full border border-white/20 shrink-0" />
                )}
                <span className="text-[11.5px] font-mono">{st}</span>
              </div>
            );
          })}
        </div>

        {/* Verified Result Card */}
        {!isVerifying && (
          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 space-y-1.5 text-xs text-left animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between">
              <span className="text-emerald-400 font-bold uppercase font-mono text-[11px] flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                <span>Verification Confirmed</span>
              </span>
              <span className="text-xs font-mono font-bold text-white">Confidence: 94%</span>
            </div>
            <p className="text-text-secondary/90 leading-relaxed text-[11.5px]">
              Kubernetes deployment manifests and service definitions have been authenticated. Your career readiness increases by <strong>+{milestone.projectedScoreImpact} points</strong>.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-white/[0.06] pt-3 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="h-8.5 px-4 rounded border border-white/10 hover:bg-white/5 text-xs text-text-secondary font-semibold"
          >
            Cancel
          </button>
          {!isVerifying && (
            <button
              onClick={() => {
                onConfirmVerification(milestone.id, milestone.projectedScoreImpact);
                onClose();
              }}
              className="h-8.5 px-5 rounded bg-emerald-500 hover:bg-emerald-600 text-background-primary text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              Apply Readiness Boost (+{milestone.projectedScoreImpact}%)
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
