"use client";

import React from "react";
import { Clock, TrendingUp, AlertTriangle, CheckCircle2, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoadmapHealthProps {
  healthStatus: "ON TRACK" | "AT RISK" | "BEHIND";
  weeklyHours: number;
  onSelectWeeklyHours: (hours: number) => void;
  estimatedWeeks: number;
}

export function RoadmapHealth({
  healthStatus,
  weeklyHours,
  onSelectWeeklyHours,
  estimatedWeeks,
}: RoadmapHealthProps) {
  const availabilityOptions = [5, 10, 15, 20];

  const getHealthConfig = (status: RoadmapHealthProps["healthStatus"]) => {
    switch (status) {
      case "ON TRACK":
        return {
          label: "ON TRACK",
          text: "You are completing milestones at the expected pace for your target role.",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          icon: CheckCircle2,
        };
      case "AT RISK":
        return {
          label: "AT RISK",
          text: "One high-priority infrastructure milestone is slightly behind schedule.",
          badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
          icon: AlertTriangle,
        };
      case "BEHIND":
        return {
          label: "BEHIND",
          text: "Your roadmap progress is approximately 1 week behind planned timeline.",
          badgeClass: "bg-rose-500/10 text-rose-400 border-rose-500/20",
          icon: AlertTriangle,
        };
    }
  };

  const config = getHealthConfig(healthStatus);
  const StatusIcon = config.icon;

  return (
    <div className="p-4 md:p-5 rounded-xl border border-white/[0.08] bg-[#070B1E] flex flex-col md:flex-row md:items-center justify-between gap-5 text-left shadow-sm">
      {/* Pacing status */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className={cn("text-[9.5px] px-2 py-0.5 rounded border font-mono font-bold flex items-center gap-1", config.badgeClass)}>
            <StatusIcon className="h-3 w-3" />
            <span>{config.label}</span>
          </span>
          <span className="text-xs font-bold text-white">Execution Pace</span>
        </div>
        <p className="text-xs text-text-secondary/80 leading-relaxed max-w-lg">
          {config.text}
        </p>
      </div>

      {/* Weekly availability planner */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-white/[0.06]">
        <div className="text-left sm:text-right">
          <span className="text-[10px] text-text-secondary/50 font-mono uppercase block">
            Weekly Availability
          </span>
          <span className="text-xs font-mono text-primary font-bold">
            {estimatedWeeks} weeks @ {weeklyHours}h/week
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-[#050816] p-1 rounded-lg border border-white/10">
          {availabilityOptions.map((hours) => (
            <button
              key={hours}
              type="button"
              onClick={() => onSelectWeeklyHours(hours)}
              className={cn(
                "px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all cursor-pointer",
                weeklyHours === hours
                  ? "bg-primary text-background-primary font-bold shadow-sm"
                  : "text-text-secondary/70 hover:text-white hover:bg-white/5"
              )}
            >
              {hours}h
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
