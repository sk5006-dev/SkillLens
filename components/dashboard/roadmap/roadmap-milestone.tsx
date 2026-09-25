"use client";

import React from "react";
import { CheckCircle2, Clock, Lock, ArrowRight, FileCheck, Layers, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface RoadmapMilestoneData {
  id: string;
  title: string;
  skill: string;
  category: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  estimatedHours: number;
  difficulty: string;
  currentLevel: string;
  targetLevel: string;
  projectedScoreImpact: number;
  whyItMatters: string;
  actions: string[];
  evidenceRequired: string[];
  status: "Not Started" | "In Progress" | "Evidence Submitted" | "Verified" | "Blocked";
  week: number;
  dependencies: string[];
  relatedProject?: string;
  relatedResumeEvidence?: string;
  learningResources?: Array<{ title: string; type: string }>;
  completionCriteria?: string;
  isBlocked?: boolean;
  blockedByTitle?: string;
}

interface RoadmapMilestoneProps {
  milestone: RoadmapMilestoneData;
  onOpenDrawer: (id: string) => void;
  onStart: (id: string) => void;
  onSubmitEvidence: (id: string) => void;
  onViewDependency?: (dependencyId: string) => void;
}

export function RoadmapMilestone({
  milestone,
  onOpenDrawer,
  onStart,
  onSubmitEvidence,
  onViewDependency,
}: RoadmapMilestoneProps) {
  const getStatusBadge = (status: RoadmapMilestoneData["status"]) => {
    switch (status) {
      case "Verified":
        return { label: "Verified", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
      case "Evidence Submitted":
        return { label: "Evidence Submitted", className: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" };
      case "In Progress":
        return { label: "In Progress", className: "bg-primary/10 text-primary border-primary/20" };
      case "Blocked":
        return { label: "Blocked", className: "bg-rose-500/10 text-rose-400 border-rose-500/20" };
      default:
        return { label: "Not Started", className: "bg-white/[0.04] text-text-secondary/60 border-white/10" };
    }
  };

  const getPriorityBadge = (priority: RoadmapMilestoneData["priority"]) => {
    switch (priority) {
      case "Critical":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "High":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "bg-white/[0.04] text-text-secondary/60 border-white/10";
    }
  };

  const statusBadge = getStatusBadge(milestone.status);
  const isVerified = milestone.status === "Verified";
  const isSubmitted = milestone.status === "Evidence Submitted";

  return (
    <div
      onClick={() => onOpenDrawer(milestone.id)}
      className={cn(
        "p-4 rounded-xl border transition-all text-left space-y-3 cursor-pointer group",
        milestone.isBlocked
          ? "border-rose-500/20 bg-rose-500/[0.02] opacity-75"
          : isVerified
          ? "border-white/[0.04] bg-[#050816]/50"
          : "border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/15"
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="space-y-1 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn("text-[9px] px-1.5 py-0.2 rounded border font-mono", getPriorityBadge(milestone.priority))}>
              {milestone.priority}
            </span>
            <span className={cn("text-[9px] px-1.5 py-0.2 rounded border font-mono", statusBadge.className)}>
              {statusBadge.label}
            </span>
            <span className="text-[10px] text-text-secondary/50 font-mono">
              Week {milestone.week} &bull; {milestone.category}
            </span>
          </div>

          <h4 className="text-xs md:text-sm font-bold text-white group-hover:text-primary transition-colors">
            {milestone.title}
          </h4>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono shrink-0">
          <div className="text-right">
            <span className="text-emerald-400 font-bold block">+{milestone.projectedScoreImpact}% readiness</span>
            <span className="text-[10px] text-text-secondary/40">{milestone.estimatedHours}h effort</span>
          </div>
          <ChevronRight className="h-4 w-4 text-text-secondary/30 group-hover:text-white transition-colors" />
        </div>
      </div>

      {/* Blocked notice if dependency incomplete */}
      {milestone.isBlocked && (
        <div className="p-2.5 rounded-lg border border-rose-500/20 bg-rose-500/5 text-xs text-rose-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="h-3.5 w-3.5 shrink-0" />
            <span className="text-[11px]">
              BLOCKED: Complete <strong>{milestone.blockedByTitle || "prerequisite milestone"}</strong> first.
            </span>
          </div>
          {onViewDependency && milestone.dependencies[0] && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDependency(milestone.dependencies[0]);
              }}
              className="text-[10px] text-primary hover:underline font-mono font-bold cursor-pointer"
            >
              View Dependency
            </button>
          )}
        </div>
      )}
    </div>
  );
}
