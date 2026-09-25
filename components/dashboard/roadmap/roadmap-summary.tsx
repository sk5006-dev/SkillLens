"use client";

import React from "react";
import { Award, ArrowRight, ShieldCheck, Sparkles, Building2, Target } from "lucide-react";

interface RoadmapSummaryProps {
  targetCompany: string;
  targetRole: string;
  currentMatch: number;
  projectedMatch: number;
  skillsCount: number;
  milestonesCount: number;
  totalHours: number;
}

export function RoadmapSummary({
  targetCompany,
  targetRole,
  currentMatch,
  projectedMatch,
  skillsCount,
  milestonesCount,
  totalHours,
}: RoadmapSummaryProps) {
  return (
    <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#050816] space-y-4 text-left shadow-md">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
            When You Complete This Roadmap
          </h3>
        </div>
        <p className="text-xs text-text-secondary/70 leading-relaxed max-w-2xl">
          Projected career outcomes for your target position as an engineering candidate at {targetCompany}.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
        <div className="p-3.5 rounded-xl border border-primary/20 bg-primary/5 space-y-1 text-xs">
          <span className="text-[10px] text-primary uppercase font-mono block font-bold">
            Target Readiness
          </span>
          <span className="text-base font-extrabold font-mono text-emerald-400 block">
            {currentMatch}% &rarr; {projectedMatch}%
          </span>
          <span className="text-[10px] text-text-secondary/50 block">Competitive hiring alignment</span>
        </div>

        <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.01] space-y-1 text-xs">
          <span className="text-[10px] text-text-secondary/50 uppercase font-mono block">
            Capabilities Closed
          </span>
          <span className="text-base font-extrabold font-mono text-white block">
            {skillsCount} Key Skills
          </span>
          <span className="text-[10px] text-text-secondary/50 block">Verified through code proofs</span>
        </div>

        <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.01] space-y-1 text-xs">
          <span className="text-[10px] text-text-secondary/50 uppercase font-mono block">
            Evidence Milestones
          </span>
          <span className="text-base font-extrabold font-mono text-cyan-400 block">
            {milestonesCount} Authenticated
          </span>
          <span className="text-[10px] text-text-secondary/50 block">Repository artifacts & YAML</span>
        </div>

        <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.01] space-y-1 text-xs">
          <span className="text-[10px] text-text-secondary/50 uppercase font-mono block">
            Target Career Position
          </span>
          <span className="text-xs font-bold text-white block truncate">
            {targetRole}
          </span>
          <span className="text-[10px] text-text-secondary/50 font-mono block">@{targetCompany}</span>
        </div>
      </div>

      <p className="text-[10.5px] text-text-secondary/40 font-mono border-t border-white/[0.04] pt-3">
        * Projected readiness is an estimate derived from deterministic company requirements, repository evidence, and simulated benchmark signals.
      </p>
    </div>
  );
}
