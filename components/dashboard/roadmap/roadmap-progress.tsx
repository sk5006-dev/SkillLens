"use client";

import React from "react";
import { TrendingUp, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoadmapProgressProps {
  currentMatch: number;
  projectedMatch: number;
  completedMilestones: number;
  totalMilestones: number;
  verifiedEvidenceCount: number;
  totalEvidenceCount: number;
}

export function RoadmapProgress({
  currentMatch,
  projectedMatch,
  completedMilestones,
  totalMilestones,
  verifiedEvidenceCount,
  totalEvidenceCount,
}: RoadmapProgressProps) {
  const progressPercent = Math.round((completedMilestones / (totalMilestones || 1)) * 100);

  return (
    <div className="p-5 rounded-xl border border-white/[0.08] bg-white/[0.01] space-y-4 text-left shadow-sm">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
            Execution Progress & Readiness Trajectory
          </h3>
          <p className="text-[11px] text-text-secondary/60 mt-0.5">
            Projected score progression upon completing and verifying weekly milestones
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-primary">{progressPercent}% Completed</span>
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 3-Step Readiness Trajectory Cards */}
      <div className="grid grid-cols-3 gap-3 text-center pt-2">
        <div className="p-3 rounded-lg border border-white/[0.06] bg-[#050816] space-y-0.5">
          <span className="text-[9.5px] text-text-secondary/50 uppercase font-mono block">
            Baseline
          </span>
          <span className="text-lg md:text-xl font-extrabold font-mono text-white block">
            {currentMatch}%
          </span>
          <span className="text-[9.5px] text-text-secondary/40 font-mono block">Current</span>
        </div>

        <div className="p-3 rounded-lg border border-white/[0.06] bg-[#050816] space-y-0.5">
          <span className="text-[9.5px] text-cyan-400 uppercase font-mono block font-bold">
            After Week 3
          </span>
          <span className="text-lg md:text-xl font-extrabold font-mono text-cyan-400 block">
            {Math.min(currentMatch + 2, 98)}%
          </span>
          <span className="text-[9.5px] text-cyan-400/60 font-mono block">Midpoint</span>
        </div>

        <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 space-y-0.5">
          <span className="text-[9.5px] text-emerald-400 uppercase font-mono block font-bold">
            Full Roadmap
          </span>
          <span className="text-lg md:text-xl font-extrabold font-mono text-emerald-400 block">
            {projectedMatch}%
          </span>
          <span className="text-[9.5px] text-emerald-400/60 font-mono block">Target Reached</span>
        </div>
      </div>
    </div>
  );
}
