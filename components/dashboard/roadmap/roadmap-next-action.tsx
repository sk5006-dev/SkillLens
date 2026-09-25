"use client";

import React from "react";
import { Sparkles, ArrowRight, Clock, FileCode, CheckCircle2, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface NextActionMilestone {
  id: string;
  title: string;
  skill: string;
  estimatedHours: number;
  projectedScoreImpact: number;
  whyItMatters: string;
  evidenceRequired: string[];
  status: string;
  currentMatch: number;
}

interface RoadmapNextActionProps {
  milestone: NextActionMilestone;
  onStartMilestone: (id: string) => void;
  onOpenDetails: (id: string) => void;
}

export function RoadmapNextAction({
  milestone,
  onStartMilestone,
  onOpenDetails,
}: RoadmapNextActionProps) {
  const projectedNewScore = Math.min(milestone.currentMatch + milestone.projectedScoreImpact, 99);

  return (
    <div className="p-5 md:p-6 rounded-xl border border-primary/25 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent space-y-4 text-left shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0 mt-0.5">
            <Sparkles className="h-5 w-5" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary font-mono">
                Next Best Action
              </span>
              <Badge className="bg-primary/20 text-primary border-primary/30 text-[9px] font-mono">
                Priority: Critical
              </Badge>
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[9px] font-mono">
                +{milestone.projectedScoreImpact}% Target Readiness
              </Badge>
            </div>

            <h3 className="text-base md:text-lg font-bold text-white tracking-tight">
              {milestone.title}
            </h3>

            <p className="text-xs text-text-secondary/80 leading-relaxed max-w-2xl">
              {milestone.whyItMatters}
            </p>
          </div>
        </div>

        <div className="text-left sm:text-right shrink-0">
          <span className="text-sm font-bold font-mono text-emerald-400 block">
            {milestone.currentMatch}% &rarr; {projectedNewScore}%
          </span>
          <span className="text-[10px] text-text-secondary/50 font-mono block mt-0.5">
            Estimated effort: {milestone.estimatedHours} hours
          </span>
        </div>
      </div>

      {/* Required evidence tags */}
      <div className="p-3 rounded-lg border border-white/[0.04] bg-[#050816]/70 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[10.5px] text-text-secondary/50 font-mono">Required Evidence:</span>
          <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
            {milestone.evidenceRequired.map((file, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-primary"
              >
                {file}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenDetails(milestone.id)}
            className="h-8 px-3 rounded-lg border border-white/10 hover:bg-white/5 text-xs text-text-secondary hover:text-white font-medium transition-colors cursor-pointer"
          >
            View Details
          </button>
          <button
            onClick={() => onStartMilestone(milestone.id)}
            className="h-8 px-4 rounded-lg bg-primary hover:bg-primary/90 text-background-primary text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-[0.98]"
          >
            <span>Start Milestone</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
