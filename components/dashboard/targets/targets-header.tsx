"use client";

import React from "react";
import { Target, Building2, History, GitCompare, Sparkles, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TargetsHeaderProps {
  targetCompany: string;
  targetRole: string;
  targetIndustry: string;
  isCustomCompany?: boolean;
  isCustomRole?: boolean;
  onOpenSelector: () => void;
  onOpenCompare: () => void;
  onOpenHistory: () => void;
  historyCount: number;
}

export function TargetsHeader({
  targetCompany,
  targetRole,
  targetIndustry,
  isCustomCompany = false,
  isCustomRole = false,
  onOpenSelector,
  onOpenCompare,
  onOpenHistory,
  historyCount,
}: TargetsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.06] text-left">
      <div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary font-mono">
            Career Target Intelligence
          </span>
          <span className="h-3 w-[1px] bg-white/10" />
          <div className="flex items-center gap-1.5 text-[10.5px] text-text-secondary/60 font-mono">
            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
            <span>Benchmark calibrated</span>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1 tracking-tight">
          Career Target
        </h1>
        <p className="text-xs md:text-sm text-text-secondary/70 mt-1 max-w-2xl leading-relaxed">
          Measure your readiness against specific company and role benchmarks, identify verified skill evidence, and close high-priority capability gaps.
        </p>

        {/* Current target chips */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20 text-xs font-semibold text-white">
            <Building2 className="h-3.5 w-3.5 text-primary" />
            <span>{targetCompany}</span>
            {isCustomCompany && (
              <Badge className="bg-primary/20 text-primary border-0 text-[9px] font-mono px-1 py-0 ml-1">
                Custom
              </Badge>
            )}
          </div>

          <span className="text-text-secondary/30 text-xs">&bull;</span>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs font-semibold text-white">
            <Target className="h-3.5 w-3.5 text-cyan-400" />
            <span>{targetRole}</span>
            {isCustomRole && (
              <Badge className="bg-cyan-500/20 text-cyan-300 border-0 text-[9px] font-mono px-1 py-0 ml-1">
                Custom
              </Badge>
            )}
          </div>

          <span className="text-text-secondary/30 text-xs">&bull;</span>
          <span className="text-[11px] text-text-secondary/50 font-mono">{targetIndustry}</span>
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={onOpenHistory}
          className="h-9 px-3.5 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-text-secondary hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <History className="h-3.5 w-3.5 text-primary" />
          <span>History ({historyCount})</span>
        </button>

        <button
          onClick={onOpenCompare}
          className="h-9 px-3.5 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <GitCompare className="h-3.5 w-3.5 text-primary" />
          <span>Compare Targets</span>
        </button>

        <button
          onClick={onOpenSelector}
          className="h-9 px-4 rounded-lg bg-primary hover:bg-primary/90 text-background-primary text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Change Target</span>
        </button>
      </div>
    </div>
  );
}
