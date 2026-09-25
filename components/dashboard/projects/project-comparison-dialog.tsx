"use client";

import React from "react";
import { GitCompare, X, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ProjectDetailData } from "./project-detail-panel";

interface ProjectComparisonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  projectA: ProjectDetailData | null;
  projectB: ProjectDetailData | null;
}

export function ProjectComparisonDialog({
  isOpen,
  onClose,
  projectA,
  projectB,
}: ProjectComparisonDialogProps) {
  if (!isOpen || !projectA || !projectB) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0A0F24] p-6 md:p-8 shadow-2xl space-y-6 text-left my-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
              <GitCompare className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Project Evidence Comparison</h3>
              <p className="text-xs text-text-secondary/60">
                Comparing engineering complexity, architecture, and verification signals
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

        {/* Comparison Table */}
        <div className="rounded-xl border border-white/[0.06] bg-[#050816] overflow-hidden">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                <th className="p-3.5 text-text-secondary/50 font-mono uppercase text-[10px]">Dimension</th>
                <th className="p-3.5 text-white font-bold">{projectA.name}</th>
                <th className="p-3.5 text-white font-bold">{projectB.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-text-secondary/80">
              <tr>
                <td className="p-3.5 font-medium">Verification Score</td>
                <td className="p-3.5 font-mono text-primary font-bold">{projectA.verification.score}%</td>
                <td className="p-3.5 font-mono text-primary font-bold">{projectB.verification.score}%</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium">Technical Depth</td>
                <td className="p-3.5 font-mono text-white">{projectA.technicalDepth.complexity}%</td>
                <td className="p-3.5 font-mono text-white">{projectB.technicalDepth.complexity}%</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium">Architecture</td>
                <td className="p-3.5 font-mono text-white">{projectA.technicalDepth.architecture}%</td>
                <td className="p-3.5 font-mono text-white">{projectB.technicalDepth.architecture}%</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium">Code Evidence</td>
                <td className="p-3.5 font-mono text-white">{projectA.technicalDepth.codeQuality}%</td>
                <td className="p-3.5 font-mono text-white">{projectB.technicalDepth.codeQuality}%</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium">Activity & Commits</td>
                <td className="p-3.5 font-mono text-white">{projectA.commits} commits</td>
                <td className="p-3.5 font-mono text-white">{projectB.commits} commits</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium">Documentation</td>
                <td className="p-3.5 font-mono text-white">{projectA.technicalDepth.documentation}%</td>
                <td className="p-3.5 font-mono text-white">{projectB.technicalDepth.documentation}%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Strongest Evidence Assessment Verdict */}
        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5 text-primary font-mono font-bold uppercase text-[10.5px]">
            <ShieldCheck className="h-4 w-4" />
            <span>Strongest Engineering Evidence</span>
          </div>
          <p className="text-text-secondary/90 leading-relaxed">
            <strong className="text-white">{projectA.verification.score >= projectB.verification.score ? projectA.name : projectB.name}</strong> demonstrates stronger production backend architecture, containerization configuration, and higher commit depth.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end border-t border-white/[0.06] pt-4">
          <button
            onClick={onClose}
            className="h-9 px-5 rounded-lg bg-primary hover:bg-primary/90 text-background-primary text-xs font-bold transition-all shadow-sm"
          >
            Close Comparison
          </button>
        </div>
      </motion.div>
    </div>
  );
}
