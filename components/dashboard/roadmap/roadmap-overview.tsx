"use client";

import React from "react";
import { CheckCircle2, TrendingUp, Calendar, Layers, ShieldCheck, Flame } from "lucide-react";

interface RoadmapOverviewProps {
  currentReadiness: number;
  projectedReadiness: number;
  progressPercent: number;
  currentWeek: string;
  completedMilestones: number;
  totalMilestones: number;
  verifiedEvidenceCount: number;
  totalEvidenceCount: number;
}

export function RoadmapOverview({
  currentReadiness,
  projectedReadiness,
  progressPercent,
  currentWeek,
  completedMilestones,
  totalMilestones,
  verifiedEvidenceCount,
  totalEvidenceCount,
}: RoadmapOverviewProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-left">
      {/* 1. Current Readiness */}
      <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.01] space-y-1">
        <span className="text-[10px] text-text-secondary/50 font-mono uppercase block">
          Current Readiness
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-extrabold font-mono text-white">{currentReadiness}%</span>
          <span className="text-[10px] text-text-secondary/40 font-mono">baseline</span>
        </div>
      </div>

      {/* 2. Projected Readiness */}
      <div className="p-3.5 rounded-xl border border-primary/20 bg-primary/5 space-y-1">
        <span className="text-[10px] text-primary uppercase font-mono block font-bold">
          Projected Readiness
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-extrabold font-mono text-emerald-400">{projectedReadiness}%</span>
          <span className="text-[10px] text-emerald-400/60 font-mono">+{projectedReadiness - currentReadiness}% boost</span>
        </div>
      </div>

      {/* 3. Progress */}
      <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.01] space-y-1">
        <span className="text-[10px] text-text-secondary/50 font-mono uppercase block">
          Roadmap Progress
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-extrabold font-mono text-white">{progressPercent}%</span>
          <span className="text-[10px] text-text-secondary/40 font-mono">completed</span>
        </div>
      </div>

      {/* 4. Current Week */}
      <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.01] space-y-1">
        <span className="text-[10px] text-text-secondary/50 font-mono uppercase block">
          Current Timeline
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-extrabold font-mono text-cyan-400">{currentWeek}</span>
          <span className="text-[10px] text-text-secondary/40 font-mono">active</span>
        </div>
      </div>

      {/* 5. Milestones Count */}
      <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.01] space-y-1">
        <span className="text-[10px] text-text-secondary/50 font-mono uppercase block">
          Milestones
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-extrabold font-mono text-white">
            {completedMilestones}/{totalMilestones}
          </span>
          <span className="text-[10px] text-text-secondary/40 font-mono">done</span>
        </div>
      </div>

      {/* 6. Evidence Verified */}
      <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.01] space-y-1">
        <span className="text-[10px] text-text-secondary/50 font-mono uppercase block">
          Evidence Verified
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-extrabold font-mono text-emerald-400">
            {verifiedEvidenceCount}/{totalEvidenceCount}
          </span>
          <span className="text-[10px] text-emerald-400/60 font-mono">proofs</span>
        </div>
      </div>
    </div>
  );
}
