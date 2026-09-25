"use client";

import React from "react";
import { ArrowUpRight, TrendingUp, ChevronRight, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface PriorityGapItem {
  id: string;
  skill: string;
  category: string;
  priority: "Critical" | "High" | "Medium";
  projectedImpact: number;
  estimatedHours: number;
  currentLevel: string;
  targetLevel: string;
  milestoneId: string;
}

interface RoadmapPriorityGapsProps {
  gaps: PriorityGapItem[];
  onSelectMilestone: (milestoneId: string) => void;
}

export function RoadmapPriorityGaps({ gaps, onSelectMilestone }: RoadmapPriorityGapsProps) {
  const getPriorityBadge = (priority: PriorityGapItem["priority"]) => {
    switch (priority) {
      case "Critical":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "High":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "bg-white/[0.04] text-text-secondary/70 border-white/10";
    }
  };

  return (
    <div className="p-5 rounded-xl border border-white/[0.08] bg-white/[0.01] space-y-4 text-left shadow-sm">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
            Priority Capability Gaps
          </h3>
          <p className="text-[11px] text-text-secondary/60 mt-0.5">
            Ranked by impact score: (Gap Size &times; Importance &times; Impact / Effort)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {gaps.map((gap, idx) => (
          <div
            key={gap.id}
            onClick={() => onSelectMilestone(gap.milestoneId)}
            className="p-3.5 rounded-lg border border-white/[0.05] bg-[#050816] hover:border-primary/30 space-y-2 cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-text-secondary/40 font-bold">
                0{idx + 1}
              </span>
              <span className={cn("text-[9px] px-1.5 py-0.2 rounded border font-mono", getPriorityBadge(gap.priority))}>
                {gap.priority}
              </span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white group-hover:text-primary transition-colors">
                {gap.skill}
              </h4>
              <span className="text-[10px] text-text-secondary/50 font-mono block mt-0.5">
                {gap.category}
              </span>
            </div>

            <div className="pt-1.5 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono">
              <span className="text-emerald-400 font-bold">+{gap.projectedImpact}% Readiness</span>
              <span className="text-text-secondary/50">{gap.estimatedHours}h</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
