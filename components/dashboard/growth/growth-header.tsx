"use client";

import React from "react";
import { Sparkles, Calendar, TrendingUp, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface GrowthHeaderProps {
  targetCompany: string;
  targetRole: string;
  currentReadiness: number;
  lastUpdated: string;
  selectedPeriod: "7D" | "30D" | "90D" | "All Time";
  onPeriodChange: (period: "7D" | "30D" | "90D" | "All Time") => void;
  onNavigateTab: (tab: string) => void;
  onRecalculate: () => void;
  isRecalculating?: boolean;
}

export function GrowthHeader({
  targetCompany,
  targetRole,
  currentReadiness,
  lastUpdated,
  selectedPeriod,
  onPeriodChange,
  onNavigateTab,
  onRecalculate,
  isRecalculating = false,
}: GrowthHeaderProps) {
  const periods: Array<"7D" | "30D" | "90D" | "All Time"> = ["7D", "30D", "90D", "All Time"];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.06] text-left">
      <div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary font-mono">
            Growth Intelligence
          </span>
          <span className="h-3 w-[1px] bg-white/10" />
          <span className="text-[10.5px] text-text-secondary/50 font-mono">
            Updated {lastUpdated}
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1 tracking-tight">
          Career Growth
        </h1>
        <p className="text-xs md:text-sm text-text-secondary/70 mt-1 max-w-2xl leading-relaxed">
          Track how your skills, verified evidence, and target readiness are improving over time.
        </p>

        {/* Current target info */}
        <div className="flex flex-wrap items-center gap-2.5 mt-3 text-[11px] font-mono text-text-secondary/60">
          <span>Current Target:</span>
          <span className="text-white font-bold">{targetRole} @ {targetCompany}</span>
          <span>&bull;</span>
          <span>Target Match:</span>
          <span className="text-primary font-bold">{currentReadiness}%</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 shrink-0">
        {/* Period selection */}
        <div className="flex items-center gap-1 bg-[#050816] p-1 rounded-lg border border-white/10">
          {periods.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onPeriodChange(p)}
              className={cn(
                "px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all cursor-pointer",
                selectedPeriod === p
                  ? "bg-primary text-background-primary font-bold shadow-sm"
                  : "text-text-secondary/70 hover:text-white hover:bg-white/5"
              )}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          onClick={onRecalculate}
          disabled={isRecalculating}
          className="h-9 px-3 rounded-lg border border-white/10 hover:bg-white/5 text-xs text-text-secondary font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={cn("h-3.5 w-3.5", isRecalculating && "animate-spin")} />
          <span>{isRecalculating ? "Recalculating..." : "Recalculate"}</span>
        </button>

        <button
          onClick={() => onNavigateTab("Roadmap")}
          className="h-9 px-4 rounded-lg bg-primary hover:bg-primary/90 text-background-primary text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
        >
          <span>View Roadmap</span>
        </button>
      </div>
    </div>
  );
}
