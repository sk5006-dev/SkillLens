"use client";

import React from "react";
import { ArrowRight, CheckCircle2, ListTodo } from "lucide-react";
import { cn } from "@/lib/utils";

interface MilestoneCategoryProgress {
  name: string;
  percent: number;
}

interface MilestoneProgressProps {
  completedCount: number;
  totalCount: number;
  onNavigateTab: (tab: string) => void;
}

export function MilestoneProgress({
  completedCount,
  totalCount,
  onNavigateTab,
}: MilestoneProgressProps) {
  const categories: MilestoneCategoryProgress[] = [
    { name: "Foundation & Core", percent: 100 },
    { name: "Infrastructure & Containers", percent: 100 },
    { name: "System Design & Consensus", percent: 75 },
    { name: "Production Engineering", percent: 40 },
    { name: "Evidence & Portfolio Packaging", percent: 20 },
    { name: "Final Interview Prep", percent: 0 },
  ];

  return (
    <div className="p-5 rounded-xl border border-white/[0.08] bg-white/[0.01] space-y-4 text-left shadow-sm">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
            Roadmap Milestone Progression
          </h3>
          <p className="text-[11px] text-text-secondary/60 mt-0.5">
            Summarized status of weekly milestones in active targets.
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-primary">
          {completedCount} / {totalCount} completed
        </span>
      </div>

      <div className="space-y-3 pt-1">
        {categories.map((cat, idx) => (
          <div key={idx} className="space-y-1 text-xs">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-text-secondary/80 font-medium">{cat.name}</span>
              <span className="font-mono font-bold text-white">{cat.percent}%</span>
            </div>

            <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  cat.percent === 100 ? "bg-emerald-400" : "bg-primary"
                )}
                style={{ width: `${cat.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/[0.04] pt-3 flex justify-end">
        <button
          onClick={() => onNavigateTab("Roadmap")}
          className="text-xs text-primary hover:underline font-mono font-semibold flex items-center gap-1 cursor-pointer"
        >
          <span>View Full Roadmap</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
