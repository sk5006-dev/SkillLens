"use client";

import React from "react";
import { TrendingUp, Award, Building2 } from "lucide-react";

interface GrowthComparisonProps {
  companyName: string;
  roleName: string;
}

export function GrowthComparison({ companyName, roleName }: GrowthComparisonProps) {
  const comparisonItems = [
    { label: "Target Readiness", prev: 84, curr: 92, change: "+8%" },
    { label: "Resume ATS Score", prev: 82, curr: 91, change: "+9%" },
    { label: "Projects Verification", prev: 76, curr: 89, change: "+13%" },
    { label: "Technical Skills Matrix", prev: 86, curr: 94, change: "+8%" },
    { label: "Evidence Confidence Share", prev: 71, prevStr: "71%", curr: 86, currStr: "86%", change: "+15%" },
  ];

  return (
    <div className="p-5 rounded-xl border border-white/[0.08] bg-white/[0.01] space-y-4 text-left shadow-sm">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
            Today vs. 30 Days Ago Comparison
          </h4>
          <p className="text-[11px] text-text-secondary/60 mt-0.5">
            Audit delta growth logs against {roleName} @ {companyName} target.
          </p>
        </div>
      </div>

      <div className="space-y-2.5">
        {comparisonItems.map((item, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg border border-white/[0.04] bg-[#050816] flex items-center justify-between gap-3 text-xs"
          >
            <span className="font-semibold text-text-secondary/80">{item.label}</span>

            <div className="flex items-center gap-4 font-mono">
              <span className="text-text-secondary/40">{item.prevStr || `${item.prev}%`}</span>
              <span className="text-text-secondary/30">&rarr;</span>
              <span className="text-white font-bold">{item.currStr || `${item.curr}%`}</span>
              <span className="text-emerald-400 font-bold w-12 text-right">{item.change}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
