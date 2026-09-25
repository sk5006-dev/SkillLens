"use client";

import React from "react";
import { CheckCircle2, ShieldCheck, Flame, ArrowUpRight } from "lucide-react";

interface GrowthSummaryProps {
  currentReadiness: number;
  readinessChange: number;
  skillsImprovedCount: number;
  evidenceAddedCount: number;
  completedMilestones: number;
  totalMilestones: number;
  previousReadiness: number;
}

export function GrowthSummary({
  currentReadiness,
  readinessChange,
  skillsImprovedCount,
  evidenceAddedCount,
  completedMilestones,
  totalMilestones,
  previousReadiness,
}: GrowthSummaryProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-left">
      {/* 1. Career Readiness */}
      <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.01] space-y-1">
        <span className="text-[10px] text-text-secondary/50 font-mono uppercase block">
          Career Readiness
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-extrabold font-mono text-white">{currentReadiness}%</span>
          <span className="text-[10.5px] text-emerald-400 font-mono font-bold">
            +{readinessChange}% since May
          </span>
        </div>
      </div>

      {/* 2. Skill Growth */}
      <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.01] space-y-1">
        <span className="text-[10px] text-text-secondary/50 font-mono uppercase block">
          Skill Growth
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-extrabold font-mono text-white">+{skillsImprovedCount}%</span>
          <span className="text-[10px] text-text-secondary/40 font-mono">12 skills improved</span>
        </div>
      </div>

      {/* 3. Evidence Added */}
      <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.01] space-y-1">
        <span className="text-[10px] text-text-secondary/50 font-mono uppercase block">
          Evidence Added
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-extrabold font-mono text-cyan-400">+{evidenceAddedCount}</span>
          <span className="text-[10px] text-text-secondary/40 font-mono">verified signals</span>
        </div>
      </div>

      {/* 4. Milestones */}
      <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.01] space-y-1">
        <span className="text-[10px] text-text-secondary/50 font-mono uppercase block">
          Milestones
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-extrabold font-mono text-white">
            {completedMilestones}/{totalMilestones}
          </span>
          <span className="text-[10px] text-text-secondary/40 font-mono">completed</span>
        </div>
      </div>

      {/* 5. Target Progress */}
      <div className="p-3.5 rounded-xl border border-primary/20 bg-primary/5 space-y-1">
        <span className="text-[10px] text-primary font-mono uppercase block font-bold">
          Target Progress
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-extrabold font-mono text-emerald-400">
            {previousReadiness}% &rarr; {currentReadiness}%
          </span>
        </div>
      </div>
    </div>
  );
}
