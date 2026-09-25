"use client";

import React from "react";
import { Map, Target, Building2, RefreshCw, Sparkles, CheckCircle2, ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RoadmapHeaderProps {
  targetCompany: string;
  targetRole: string;
  currentMatch: number;
  projectedMatch: number;
  estimatedWeeks: number;
  healthStatus: "ON TRACK" | "AT RISK" | "BEHIND";
  onRecalculate: () => void;
  onChangeTarget: () => void;
  isRecalculating?: boolean;
}

export function RoadmapHeader({
  targetCompany,
  targetRole,
  currentMatch,
  projectedMatch,
  estimatedWeeks,
  healthStatus,
  onRecalculate,
  onChangeTarget,
  isRecalculating = false,
}: RoadmapHeaderProps) {
  const getHealthBadge = (health: RoadmapHeaderProps["healthStatus"]) => {
    switch (health) {
      case "ON TRACK":
        return { label: "ON TRACK", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
      case "AT RISK":
        return { label: "AT RISK", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" };
      case "BEHIND":
        return { label: "BEHIND", className: "bg-rose-500/10 text-rose-400 border-rose-500/20" };
    }
  };

  const healthBadge = getHealthBadge(healthStatus);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.06] text-left">
      <div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary font-mono">
            Career Execution Roadmap
          </span>
          <span className="h-3 w-[1px] bg-white/10" />
          <span className={cn("text-[9.5px] px-2 py-0.2 rounded border font-mono font-bold", healthBadge.className)}>
            {healthBadge.label}
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1 tracking-tight">
          Weekly Learning Plan
        </h1>
        <p className="text-xs md:text-sm text-text-secondary/70 mt-1 max-w-2xl leading-relaxed">
          Your prioritized plan for closing verified capability gaps and reaching candidate alignment for your target role.
        </p>

        {/* Current target chips */}
        <div className="flex flex-wrap items-center gap-2.5 mt-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20 text-xs font-semibold text-white">
            <Building2 className="h-3.5 w-3.5 text-primary" />
            <span>{targetCompany}</span>
          </div>

          <span className="text-text-secondary/30 text-xs">&bull;</span>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs font-semibold text-white">
            <Target className="h-3.5 w-3.5 text-cyan-400" />
            <span>{targetRole}</span>
          </div>

          <span className="text-text-secondary/30 text-xs">&bull;</span>

          <div className="flex items-center gap-1 text-[11px] font-mono text-text-secondary/80">
            <span className="text-white font-bold">{currentMatch}%</span>
            <ArrowRight className="h-3 w-3 text-emerald-400 inline" />
            <span className="text-emerald-400 font-bold">{projectedMatch}% Projected</span>
          </div>

          <span className="text-text-secondary/30 text-xs">&bull;</span>

          <div className="flex items-center gap-1 text-[11px] font-mono text-text-secondary/50">
            <Clock className="h-3 w-3" />
            <span>{estimatedWeeks} weeks estimated</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={onRecalculate}
          disabled={isRecalculating}
          className="h-9 px-3.5 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer focus:outline-none disabled:opacity-50"
        >
          <RefreshCw className={cn("h-3.5 w-3.5 text-text-secondary/70", isRecalculating && "animate-spin")} />
          <span>{isRecalculating ? "Rebuilding..." : "Recalculate"}</span>
        </button>

        <button
          onClick={onChangeTarget}
          className="h-9 px-4 rounded-lg bg-primary hover:bg-primary/90 text-background-primary text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Change Target</span>
        </button>
      </div>
    </div>
  );
}
