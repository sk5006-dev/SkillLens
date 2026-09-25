"use client";

import React, { useState } from "react";
import { ChevronDown, Calendar, Filter, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { RoadmapMilestone, RoadmapMilestoneData } from "./roadmap-milestone";

export interface RoadmapWeekSchedule {
  weekNumber: number;
  title: string;
  theme: string;
  status: "Completed" | "Current" | "Upcoming";
  milestones: RoadmapMilestoneData[];
}

interface RoadmapTimelineProps {
  weeks: RoadmapWeekSchedule[];
  activeFilter: "All" | "Current Week" | "High Priority" | "Completed";
  onFilterChange: (filter: "All" | "Current Week" | "High Priority" | "Completed") => void;
  onOpenDrawer: (milestoneId: string) => void;
  onStartMilestone: (milestoneId: string) => void;
  onSubmitEvidence: (milestoneId: string) => void;
}

export function RoadmapTimeline({
  weeks,
  activeFilter,
  onFilterChange,
  onOpenDrawer,
  onStartMilestone,
  onSubmitEvidence,
}: RoadmapTimelineProps) {
  // Track which weeks are expanded (Current week 2 is expanded by default)
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([2]);

  const toggleWeek = (weekNum: number) => {
    if (expandedWeeks.includes(weekNum)) {
      setExpandedWeeks(expandedWeeks.filter((w) => w !== weekNum));
    } else {
      setExpandedWeeks([...expandedWeeks, weekNum]);
    }
  };

  const filterOptions = ["All", "Current Week", "High Priority", "Completed"] as const;

  // Filter weeks based on activeFilter
  const filteredWeeks = weeks
    .map((w) => {
      let filteredMilestones = w.milestones;
      if (activeFilter === "Current Week") {
        if (w.status !== "Current") return null;
      } else if (activeFilter === "High Priority") {
        filteredMilestones = w.milestones.filter(
          (m) => m.priority === "Critical" || m.priority === "High"
        );
      } else if (activeFilter === "Completed") {
        filteredMilestones = w.milestones.filter((m) => m.status === "Verified");
      }
      return { ...w, milestones: filteredMilestones };
    })
    .filter(Boolean) as RoadmapWeekSchedule[];

  return (
    <div className="space-y-4 text-left">
      {/* Header and Filter bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
            6-Week Progressive Execution Plan
          </h3>
          <p className="text-[11px] text-text-secondary/60 mt-0.5">
            Structured competency progression from infrastructure foundations to system design verification
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5">
          {filterOptions.map((f) => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              className={cn(
                "px-2.5 py-1 rounded text-[10.5px] font-mono transition-all cursor-pointer",
                activeFilter === f
                  ? "bg-primary/15 text-primary border border-primary/30 font-bold"
                  : "text-text-secondary/60 hover:text-white bg-white/[0.01] border border-white/[0.04]"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Accordions */}
      <div className="space-y-3">
        {filteredWeeks.map((week) => {
          const isExpanded = expandedWeeks.includes(week.weekNumber) || activeFilter === "Current Week";
          const isCompleted = week.status === "Completed";
          const isCurrent = week.status === "Current";

          return (
            <div
              key={week.weekNumber}
              className={cn(
                "rounded-xl border transition-all overflow-hidden",
                isCurrent
                  ? "border-primary/30 bg-[#06091F]"
                  : isCompleted
                  ? "border-white/[0.04] bg-[#050816]/40 opacity-80"
                  : "border-white/[0.06] bg-white/[0.01]"
              )}
            >
              {/* Week Header Accordion Trigger */}
              <button
                type="button"
                onClick={() => toggleWeek(week.weekNumber)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={cn(
                      "h-7 w-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0",
                      isCurrent
                        ? "bg-primary text-background-primary shadow-sm"
                        : isCompleted
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-white/[0.03] text-text-secondary/60 border border-white/10"
                    )}
                  >
                    0{week.weekNumber}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white tracking-tight">
                        Week {week.weekNumber}: {week.title}
                      </h4>
                      {isCurrent && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-primary/20 text-primary border border-primary/30 font-mono">
                          Current Focus
                        </span>
                      )}
                      {isCompleted && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                          Completed
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-text-secondary/50 font-mono block mt-0.5">
                      {week.theme} &bull; {week.milestones.length} milestones
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <ChevronDown
                    className={cn("h-4 w-4 text-text-secondary/40 transition-transform duration-200", isExpanded && "rotate-180")}
                  />
                </div>
              </button>

              {/* Milestones list within week */}
              {isExpanded && (
                <div className="p-4 pt-1 border-t border-white/[0.04] space-y-2.5">
                  {week.milestones.map((m) => (
                    <RoadmapMilestone
                      key={m.id}
                      milestone={m}
                      onOpenDrawer={onOpenDrawer}
                      onStart={onStartMilestone}
                      onSubmitEvidence={onSubmitEvidence}
                      onViewDependency={(depId) => onOpenDrawer(depId)}
                    />
                  ))}

                  {week.milestones.length === 0 && (
                    <div className="p-4 text-center text-xs text-text-secondary/40 font-mono">
                      No milestones match the current filter in Week {week.weekNumber}.
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
