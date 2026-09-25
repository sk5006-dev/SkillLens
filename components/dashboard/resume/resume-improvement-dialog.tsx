"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, Check, Copy, X, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface ImprovementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  recommendation: {
    id: string;
    impact: "High" | "Medium" | "Low";
    title: string;
    description: string;
    section: string;
    originalText: string;
    recommendedText: string;
    rationale: string;
  } | null;
  onApply: (id: string, updatedText: string) => void;
  isApplied?: boolean;
}

export function ResumeImprovementDialog({
  isOpen,
  onClose,
  recommendation,
  onApply,
  isApplied = false,
}: ImprovementDialogProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !recommendation) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(recommendation.recommendedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#0A0F24] p-6 md:p-7 shadow-2xl space-y-6 text-left"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{recommendation.title}</h3>
              <p className="text-[11px] text-text-secondary/60">
                Targeted improvement for {recommendation.section}
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

        {/* Why this recommendation matters */}
        <div className="p-3.5 rounded-xl border border-primary/20 bg-primary/5 text-xs space-y-1">
          <span className="text-[10px] font-bold text-primary uppercase font-mono block">
            AI Assessment & Rationale
          </span>
          <p className="text-text-secondary/90 leading-relaxed">{recommendation.rationale}</p>
        </div>

        {/* Before vs. Recommended Comparison */}
        <div className="space-y-4">
          {/* Current / Original */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-text-secondary/60 uppercase font-mono">Current Text</span>
              <span className="text-[10px] text-rose-400/80 font-mono">Lacks quantified impact</span>
            </div>
            <div className="p-3 rounded-lg border border-white/[0.06] bg-[#050816] text-xs text-text-secondary/80 leading-relaxed font-sans">
              "{recommendation.originalText}"
            </div>
          </div>

          {/* AI Recommended */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-primary uppercase font-mono">AI-Generated Suggestion</span>
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[9.5px] font-mono">
                High Recruiter Conversion
              </Badge>
            </div>
            <div className="p-3.5 rounded-lg border border-primary/30 bg-primary/10 text-xs text-white leading-relaxed font-medium">
              "{recommendation.recommendedText}"
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
          <button
            onClick={handleCopy}
            className="h-9 px-3.5 rounded-lg border border-white/10 hover:bg-white/5 text-xs text-text-secondary font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Copied" : "Copy Suggestion"}</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="h-9 px-4 rounded-lg border border-white/10 hover:bg-white/5 text-xs text-text-secondary font-semibold"
            >
              Dismiss
            </button>
            <button
              onClick={() => {
                onApply(recommendation.id, recommendation.recommendedText);
                onClose();
              }}
              className="h-9 px-5 rounded-lg bg-primary hover:bg-primary/90 text-background-primary text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              {isApplied ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Applied</span>
                </>
              ) : (
                <>
                  <span>Apply Suggestion</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
