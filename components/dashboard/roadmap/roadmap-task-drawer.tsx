"use client";

import React from "react";
import { X, CheckCircle2, Clock, FolderGit2, FileText, ArrowRight, ShieldCheck, BookOpen, Layers, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { RoadmapMilestoneData } from "./roadmap-milestone";

interface RoadmapTaskDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  milestone: RoadmapMilestoneData | null;
  onStart: (id: string) => void;
  onSubmitEvidence: (id: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export function RoadmapTaskDrawer({
  isOpen,
  onClose,
  milestone,
  onStart,
  onSubmitEvidence,
  onNavigateTab,
}: RoadmapTaskDrawerProps) {
  if (!isOpen || !milestone) return null;

  const isVerified = milestone.status === "Verified";
  const isSubmitted = milestone.status === "Evidence Submitted";
  const isInProgress = milestone.status === "In Progress";

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
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary font-mono">
                  Week {milestone.week} &bull; {milestone.category}
                </span>
                <Badge variant="outline" className="text-[9px] font-mono border-white/10 text-white">
                  Priority: {milestone.priority}
                </Badge>
              </div>
              <h3 className="text-base md:text-lg font-bold text-white tracking-tight">
                {milestone.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/5 text-text-secondary/50 hover:text-white shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Capability levels and Readiness Impact */}
          <div className="grid grid-cols-3 gap-2.5 p-3.5 rounded-xl border border-white/[0.04] bg-[#050816] text-center font-mono">
            <div>
              <span className="text-[9.5px] text-text-secondary/50 block">Current Level</span>
              <span className="text-xs font-bold text-white mt-0.5 block">{milestone.currentLevel}</span>
            </div>
            <div>
              <span className="text-[9.5px] text-text-secondary/50 block">Target Level</span>
              <span className="text-xs font-bold text-primary mt-0.5 block">{milestone.targetLevel}</span>
            </div>
            <div>
              <span className="text-[9.5px] text-text-secondary/50 block">Readiness Impact</span>
              <span className="text-xs font-bold text-emerald-400 mt-0.5 block">+{milestone.projectedScoreImpact}%</span>
            </div>
          </div>

          {/* Why It Matters */}
          <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-1.5 text-xs">
            <span className="text-[10px] font-bold uppercase font-mono text-primary block">
              Why this matters for your target
            </span>
            <p className="text-text-secondary/90 leading-relaxed text-[11.5px]">
              {milestone.whyItMatters}
            </p>
          </div>

          {/* Step-by-Step Actions */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary/50 font-mono block">
              Step-by-Step Execution Actions
            </span>
            <div className="rounded-xl border border-white/[0.06] bg-[#050816] divide-y divide-white/[0.04] overflow-hidden text-xs">
              {milestone.actions.map((act, idx) => (
                <div key={idx} className="p-3 flex items-start gap-2.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                  <span className="text-text-secondary/80 leading-relaxed text-[11.5px]">{act}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence Required */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary/50 font-mono block">
              Evidence Required for Verification
            </span>
            <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.01] flex flex-wrap gap-2">
              {milestone.evidenceRequired.map((ev, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-[#050816] border border-white/[0.06] font-mono text-[10.5px] text-cyan-400"
                >
                  {ev}
                </span>
              ))}
            </div>
          </div>

          {/* Cross-Module Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Related Project */}
            {milestone.relatedProject && (
              <div className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.01] space-y-1 text-xs">
                <div className="flex items-center justify-between text-text-secondary/50 font-mono text-[10px]">
                  <div className="flex items-center gap-1.5 text-cyan-400">
                    <FolderGit2 className="h-3.5 w-3.5" />
                    <span>Connected Repo</span>
                  </div>
                </div>
                <span className="font-bold text-white text-xs block">{milestone.relatedProject}</span>
                {onNavigateTab && (
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateTab("Projects");
                    }}
                    className="text-[10px] text-cyan-400 hover:underline font-mono inline-flex items-center gap-1 cursor-pointer pt-1"
                  >
                    <span>&rarr; Open Project</span>
                  </button>
                )}
              </div>
            )}

            {/* Related Resume Citation */}
            {milestone.relatedResumeEvidence && (
              <div className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.01] space-y-1 text-xs">
                <div className="flex items-center justify-between text-text-secondary/50 font-mono text-[10px]">
                  <div className="flex items-center gap-1.5 text-primary">
                    <FileText className="h-3.5 w-3.5" />
                    <span>Resume Citation</span>
                  </div>
                </div>
                <span className="text-[11px] text-text-secondary/80 block line-clamp-2">
                  {milestone.relatedResumeEvidence}
                </span>
                {onNavigateTab && (
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateTab("Resume");
                    }}
                    className="text-[10px] text-primary hover:underline font-mono inline-flex items-center gap-1 cursor-pointer pt-1"
                  >
                    <span>&rarr; Open Resume</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Learning Resources */}
          {milestone.learningResources && milestone.learningResources.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary/50 font-mono block">
                Recommended Resources
              </span>
              <div className="space-y-1.5">
                {milestone.learningResources.map((res, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg border border-white/[0.04] bg-[#050816] flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-3.5 w-3.5 text-primary" />
                      <span className="text-text-secondary/90">{res.title}</span>
                    </div>
                    <span className="text-[9.5px] text-text-secondary/40 font-mono">{res.type}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-white/[0.08] pt-4 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded-lg border border-white/10 hover:bg-white/5 text-xs text-text-secondary hover:text-white font-semibold transition-colors"
          >
            Close
          </button>

          {!isVerified ? (
            <div className="flex items-center gap-2">
              {!isInProgress && !isSubmitted && (
                <button
                  onClick={() => onStart(milestone.id)}
                  className="h-9 px-4 rounded-lg border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-all"
                >
                  Start Milestone
                </button>
              )}
              <button
                onClick={() => onSubmitEvidence(milestone.id)}
                className="h-9 px-5 rounded-lg bg-primary hover:bg-primary/90 text-background-primary text-xs font-bold transition-all shadow-sm active:scale-[0.98]"
              >
                Submit Evidence
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-bold">
              <ShieldCheck className="h-4 w-4" />
              <span>Evidence Verified</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
