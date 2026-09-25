"use client";

import React from "react";
import { FileText, FolderGit2, X, CheckCircle2, AlertCircle, HelpCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export interface SkillGapItem {
  skill: string;
  category: string;
  status: "Verified" | "Partial" | "Missing";
  currentLevel: string;
  requiredLevel: string;
  gap: number;
  importance: "High" | "Medium" | "Low" | "Critical";
  resumeEvidence?: string;
  projectEvidence?: {
    projectName: string;
    filePath: string;
    details: string;
  };
  missingDetails: string;
}

interface EvidenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  skillItem: SkillGapItem | null;
  onNavigateTab?: (tab: string) => void;
}

export function TargetEvidenceDrawer({
  isOpen,
  onClose,
  skillItem,
  onNavigateTab,
}: EvidenceDrawerProps) {
  if (!isOpen || !skillItem) return null;

  const getStatusBadge = (status: SkillGapItem["status"]) => {
    switch (status) {
      case "Verified":
        return { label: "Verified Evidence", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
      case "Partial":
        return { label: "Partial Evidence", className: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" };
      default:
        return { label: "Missing Evidence", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" };
    }
  };

  const badge = getStatusBadge(skillItem.status);

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
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">{skillItem.skill}</h3>
              <span className={`text-[9.5px] px-2 py-0.5 rounded border font-mono ${badge.className}`}>
                {badge.label}
              </span>
            </div>
            <span className="text-[11px] text-text-secondary/50 font-mono mt-0.5 block">
              {skillItem.category} &bull; Importance: {skillItem.importance}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/5 text-text-secondary/50 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Level and Gap stats */}
        <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl border border-white/[0.04] bg-[#050816] text-center font-mono">
          <div>
            <span className="text-[9.5px] text-text-secondary/50 block">Current Level</span>
            <span className="text-xs font-bold text-white mt-0.5 block">{skillItem.currentLevel}</span>
          </div>
          <div>
            <span className="text-[9.5px] text-text-secondary/50 block">Target Required</span>
            <span className="text-xs font-bold text-primary mt-0.5 block">{skillItem.requiredLevel}</span>
          </div>
          <div>
            <span className="text-[9.5px] text-text-secondary/50 block">Capability Gap</span>
            <span className={`text-xs font-bold mt-0.5 block ${skillItem.gap === 0 ? "text-emerald-400" : "text-amber-400"}`}>
              {skillItem.gap}%
            </span>
          </div>
        </div>

        {/* Evidence Sources */}
        <div className="space-y-3">
          {/* Resume Proof */}
          <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.01] space-y-2 text-xs">
            <div className="flex items-center justify-between text-text-secondary/50 font-mono text-[10px]">
              <div className="flex items-center gap-1.5 text-primary">
                <FileText className="h-3.5 w-3.5" />
                <span className="font-bold uppercase">Resume Citation</span>
              </div>
              <span>Pranav_Resume.pdf</span>
            </div>
            <p className="text-text-secondary/80 leading-relaxed text-[11.5px]">
              {skillItem.resumeEvidence || "No direct keyword or experience line found in parsed resume."}
            </p>
            {skillItem.resumeEvidence && onNavigateTab && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateTab("Resume");
                }}
                className="text-[10.5px] text-primary hover:underline font-mono inline-flex items-center gap-1 font-semibold cursor-pointer"
              >
                <span>&rarr; Open Resume</span>
              </button>
            )}
          </div>

          {/* Project Proof */}
          <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.01] space-y-2 text-xs">
            <div className="flex items-center justify-between text-text-secondary/50 font-mono text-[10px]">
              <div className="flex items-center gap-1.5 text-cyan-400">
                <FolderGit2 className="h-3.5 w-3.5" />
                <span className="font-bold uppercase">Codebase Evidence</span>
              </div>
              <span>{skillItem.projectEvidence?.projectName || "No linked repo"}</span>
            </div>
            {skillItem.projectEvidence ? (
              <div className="space-y-1">
                <span className="font-mono text-primary text-[10.5px] block">
                  {skillItem.projectEvidence.filePath}
                </span>
                <p className="text-text-secondary/80 leading-relaxed text-[11.5px]">
                  {skillItem.projectEvidence.details}
                </p>
                {onNavigateTab && (
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateTab("Projects");
                    }}
                    className="text-[10.5px] text-cyan-400 hover:underline font-mono inline-flex items-center gap-1 font-semibold cursor-pointer pt-1"
                  >
                    <span>&rarr; Open Project ({skillItem.projectEvidence.projectName})</span>
                  </button>
                )}
              </div>
            ) : (
              <p className="text-text-secondary/60 text-[11.5px]">
                No code files or Docker manifests detected for this technology in verified repositories.
              </p>
            )}
          </div>

          {/* Missing Gap Analysis */}
          <div className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-1 text-xs">
            <span className="text-[10px] font-bold text-amber-400 uppercase font-mono block">
              Gap Analysis & Recommendation
            </span>
            <p className="text-text-secondary/90 leading-relaxed text-[11.5px]">
              {skillItem.missingDetails}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/[0.06] pt-3 flex justify-end">
          <button
            onClick={onClose}
            className="h-8.5 px-4 rounded bg-primary text-background-primary text-xs font-bold"
          >
            Close Inspector
          </button>
        </div>
      </motion.div>
    </div>
  );
}
