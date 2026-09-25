"use client";

import React from "react";
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";

interface GrowthInsightsProps {
  strongestImprovement: string;
  biggestCareerImpact: string;
  emergingGap: string;
  positiveTrend: string;
}

export function GrowthInsights({
  strongestImprovement,
  biggestCareerImpact,
  emergingGap,
  positiveTrend,
}: GrowthInsightsProps) {
  return (
    <div className="p-5 rounded-xl border border-white/[0.08] bg-[#070B1E] space-y-4 text-left shadow-sm">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-primary" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
            Derived Growth Insights
          </h4>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1 text-xs">
        {/* Strongest Improvement */}
        <div className="p-3.5 rounded-lg border border-white/[0.04] bg-[#050816] space-y-1">
          <span className="text-[10px] text-primary uppercase font-mono block font-bold">
            Strongest Improvement
          </span>
          <p className="text-text-secondary/80 leading-relaxed text-[11.5px] font-medium">
            {strongestImprovement}
          </p>
        </div>

        {/* Biggest Career Impact */}
        <div className="p-3.5 rounded-lg border border-white/[0.04] bg-[#050816] space-y-1">
          <span className="text-[10px] text-cyan-400 uppercase font-mono block font-bold">
            Biggest Career Impact
          </span>
          <p className="text-text-secondary/80 leading-relaxed text-[11.5px] font-medium">
            {biggestCareerImpact}
          </p>
        </div>

        {/* Emerging Gap */}
        <div className="p-3.5 rounded-lg border border-white/[0.04] bg-[#050816] space-y-1">
          <span className="text-[10px] text-rose-400 uppercase font-mono block font-bold">
            Emerging Gap
          </span>
          <p className="text-text-secondary/80 leading-relaxed text-[11.5px] font-medium">
            {emergingGap}
          </p>
        </div>

        {/* Positive Trend */}
        <div className="p-3.5 rounded-lg border border-white/[0.04] bg-[#050816] space-y-1">
          <span className="text-[10px] text-emerald-400 uppercase font-mono block font-bold">
            Positive Trend
          </span>
          <p className="text-text-secondary/80 leading-relaxed text-[11.5px] font-medium">
            {positiveTrend}
          </p>
        </div>
      </div>
    </div>
  );
}
