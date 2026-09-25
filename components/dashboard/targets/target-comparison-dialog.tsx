"use client";

import React from "react";
import { GitCompare, X, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export interface TargetComparisonProfile {
  id: string;
  company: string;
  role: string;
  overallMatch: number;
  technicalSkills: number;
  projects: number;
  experience: number;
  architecture: number;
  evidence: number;
  verdict: string;
}

interface TargetComparisonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  targets: TargetComparisonProfile[];
  onSelectTarget: (company: string, role: string) => void;
}

export function TargetComparisonDialog({
  isOpen,
  onClose,
  targets,
  onSelectTarget,
}: TargetComparisonDialogProps) {
  if (!isOpen) return null;

  const bestMatch = targets.reduce((prev, curr) => (curr.overallMatch > prev.overallMatch ? curr : prev), targets[0]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-3xl rounded-2xl border border-white/10 bg-[#0A0F24] p-6 md:p-8 shadow-2xl space-y-6 text-left my-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
              <GitCompare className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Target Benchmarks Comparison</h3>
              <p className="text-xs text-text-secondary/60">
                Compare readiness across different companies and engineering roles
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
        <div className="rounded-xl border border-white/[0.06] bg-[#050816] overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                <th className="p-3.5 text-text-secondary/50 font-mono uppercase text-[10px]">Dimension</th>
                {targets.map((t, idx) => (
                  <th key={idx} className="p-3.5 text-white font-bold">
                    <div>{t.company}</div>
                    <div className="text-[10.5px] text-text-secondary/50 font-normal font-mono">{t.role}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-text-secondary/80">
              <tr>
                <td className="p-3.5 font-medium">Overall Match</td>
                {targets.map((t, idx) => (
                  <td key={idx} className="p-3.5 font-mono text-primary font-bold text-sm">
                    {t.overallMatch}%
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3.5 font-medium">Technical Skills</td>
                {targets.map((t, idx) => (
                  <td key={idx} className="p-3.5 font-mono text-white">
                    {t.technicalSkills}%
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3.5 font-medium">Project Evidence</td>
                {targets.map((t, idx) => (
                  <td key={idx} className="p-3.5 font-mono text-white">
                    {t.projects}%
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3.5 font-medium">Experience</td>
                {targets.map((t, idx) => (
                  <td key={idx} className="p-3.5 font-mono text-white">
                    {t.experience}%
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3.5 font-medium">Architecture</td>
                {targets.map((t, idx) => (
                  <td key={idx} className="p-3.5 font-mono text-white">
                    {t.architecture}%
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3.5 font-medium">Evidence Confidence</td>
                {targets.map((t, idx) => (
                  <td key={idx} className="p-3.5 font-mono text-white">
                    {t.evidence}%
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Best Match Verdict */}
        {bestMatch && (
          <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-primary font-mono font-bold uppercase text-[10.5px]">
              <ShieldCheck className="h-4 w-4" />
              <span>Best Current Alignment</span>
            </div>
            <p className="text-text-secondary/90 leading-relaxed">
              <strong className="text-white">{bestMatch.role} @ {bestMatch.company} ({bestMatch.overallMatch}%)</strong> represents your strongest immediate career opportunity. Your verified Go, TypeScript, and Docker project evidence closely satisfies their primary benchmarks.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end border-t border-white/[0.06] pt-4">
          <button
            onClick={onClose}
            className="h-9 px-5 rounded-lg bg-primary hover:bg-primary/90 text-background-primary text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            Close Comparison
          </button>
        </div>
      </motion.div>
    </div>
  );
}
