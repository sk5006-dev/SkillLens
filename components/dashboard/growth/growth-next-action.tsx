"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GrowthNextActionProps {
  title: string;
  currentLevel: number;
  targetLevel: number;
  estimatedHours: number;
  projectedScoreImpact: number;
  onNavigateTab: (tab: string) => void;
}

export function GrowthNextAction({
  title,
  currentLevel,
  targetLevel,
  estimatedHours,
  projectedScoreImpact,
  onNavigateTab,
}: GrowthNextActionProps) {
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
                Next Recommended Action
              </span>
              <Badge className="bg-primary/20 text-primary border-primary/30 text-[9px] font-mono">
                High Impact
              </Badge>
            </div>

            <h3 className="text-base font-bold text-white tracking-tight">
              {title}
            </h3>

            <p className="text-xs text-text-secondary/70 leading-relaxed max-w-xl">
              System Design remains your largest outstanding capability gap relative to typical benchmark hiring bars. Focus on Raft election safety models to raise your compatibility share.
            </p>
          </div>
        </div>

        <div className="text-left sm:text-right shrink-0 font-mono text-xs">
          <div className="flex items-baseline gap-1 sm:justify-end">
            <span className="text-text-secondary/50">Current:</span>
            <span className="text-white font-bold">{currentLevel}%</span>
          </div>
          <div className="flex items-baseline gap-1 sm:justify-end">
            <span className="text-text-secondary/50">Target:</span>
            <span className="text-primary font-bold">{targetLevel}%</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold block mt-1">
            Impact: +{projectedScoreImpact}% readiness
          </span>
        </div>
      </div>

      <div className="flex justify-end border-t border-white/[0.06] pt-3.5">
        <button
          onClick={() => onNavigateTab("Roadmap")}
          className="h-8.5 px-4 rounded bg-primary hover:bg-primary/90 text-background-primary text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
        >
          <span>View Roadmap</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
