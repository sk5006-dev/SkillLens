"use client";

import React from "react";
import { X, CheckCircle2, ShieldCheck, FolderGit2, FileText, ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export interface SkillProgressionItem {
  skill: string;
  previousLevel: number;
  currentLevel: number;
  targetLevel: number;
  change: number;
  evidenceAdded: string[];
  category: string;
}

interface GrowthDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  skillItem: SkillProgressionItem | null;
  onNavigateTab: (tab: string) => void;
}

export function GrowthDetailDrawer({
  isOpen,
  onClose,
  skillItem,
  onNavigateTab,
}: GrowthDetailDrawerProps) {
  if (!isOpen || !skillItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="w-full max-w-lg h-full bg-[#0A0F24] border-l border-white/10 p-6 md:p-8 flex flex-col justify-between overflow-y-auto space-y-6 text-left shadow-2xl"
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-white/[0.08] pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary font-mono block">
                {skillItem.category} progression
              </span>
              <h3 className="text-base md:text-lg font-bold text-white tracking-tight mt-1">
                {skillItem.skill} Capability Depth
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/5 text-text-secondary/50 hover:text-white shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Level stats */}
          <div className="grid grid-cols-3 gap-2.5 p-3.5 rounded-xl border border-white/[0.04] bg-[#050816] text-center font-mono">
            <div>
              <span className="text-[9.5px] text-text-secondary/50 block">Previous</span>
              <span className="text-xs font-bold text-white mt-0.5 block">{skillItem.previousLevel}%</span>
            </div>
            <div>
              <span className="text-[9.5px] text-text-secondary/50 block">Current Level</span>
              <span className="text-xs font-bold text-primary mt-0.5 block">{skillItem.currentLevel}%</span>
            </div>
            <div>
              <span className="text-[9.5px] text-text-secondary/50 block">Target benchmark</span>
              <span className="text-xs font-bold text-emerald-400 mt-0.5 block">{skillItem.targetLevel}%</span>
            </div>
          </div>

          {/* Point delta notice */}
          <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs text-emerald-300 flex items-center justify-between font-mono">
            <span>Overall Improvement</span>
            <span className="font-bold">+{skillItem.change} points</span>
          </div>

          {/* Evidence Checklist */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary/50 font-mono block">
              Verified Code & Experience Proofs
            </span>

            {/* Resume Proof */}
            <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.01] space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-text-secondary/50 font-mono text-[10px]">
                <div className="flex items-center gap-1.5 text-primary">
                  <FileText className="h-3.5 w-3.5" />
                  <span>Resume Citation</span>
                </div>
                <span>Pranav_Resume.pdf</span>
              </div>
              <p className="text-text-secondary/80 leading-relaxed text-[11.5px]">
                CKA Certification & backend engineering roles listed under TechCorp employment section.
              </p>
            </div>

            {/* Project code proof */}
            <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.01] space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-text-secondary/50 font-mono text-[10px]">
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <FolderGit2 className="h-3.5 w-3.5" />
                  <span>Codebase Evidence</span>
                </div>
                <span>api-gateway</span>
              </div>
              <p className="text-text-secondary/80 leading-relaxed text-[11.5px]">
                Helm templates, ClusterIP ingress definitions, and unprivileged multi-stage Alpine Dockerfiles authenticated.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-white/[0.08] pt-4 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded-lg border border-white/10 hover:bg-white/5 text-xs text-text-secondary hover:text-white font-semibold transition-colors"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onNavigateTab("Resume");
              }}
              className="h-9 px-3 rounded bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 text-xs font-semibold text-text-secondary hover:text-white"
            >
              Open Resume
            </button>
            <button
              onClick={() => {
                onClose();
                onNavigateTab("Projects");
              }}
              className="h-9 px-3 rounded bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 text-xs font-semibold text-text-secondary hover:text-white"
            >
              Open Project
            </button>
            <button
              onClick={() => {
                onClose();
                onNavigateTab("Roadmap");
              }}
              className="h-9 px-4 rounded-lg bg-primary hover:bg-primary/90 text-background-primary text-xs font-bold transition-all shadow-sm"
            >
              Open Roadmap
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
