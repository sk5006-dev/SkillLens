"use client";

import React from "react";
import { ArrowRight, CheckCircle2, Clock, ShieldCheck, Play, ArrowUpRight, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface CurrentWeekTask {
  id: string;
  title: string;
  skill: string;
  estimatedHours: number;
  projectedScoreImpact: number;
  priority: "Critical" | "High" | "Medium" | "Low";
  status: "Not Started" | "In Progress" | "Evidence Submitted" | "Verified" | "Blocked";
  week: number;
}

interface RoadmapCurrentWeekProps {
  weekNumber: number;
  weekTitle: string;
  weekTheme: string;
  tasks: CurrentWeekTask[];
  onOpenTaskDrawer: (taskId: string) => void;
  onStartTask: (taskId: string) => void;
}

export function RoadmapCurrentWeek({
  weekNumber,
  weekTitle,
  weekTheme,
  tasks,
  onOpenTaskDrawer,
  onStartTask,
}: RoadmapCurrentWeekProps) {
  const getStatusBadge = (status: CurrentWeekTask["status"]) => {
    switch (status) {
      case "Verified":
        return { label: "Verified", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
      case "Evidence Submitted":
        return { label: "Submitted", className: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" };
      case "In Progress":
        return { label: "In Progress", className: "bg-primary/10 text-primary border-primary/20" };
      case "Blocked":
        return { label: "Blocked", className: "bg-rose-500/10 text-rose-400 border-rose-500/20" };
      default:
        return { label: "Not Started", className: "bg-white/[0.04] text-text-secondary/60 border-white/10" };
    }
  };

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#070B1E] p-5 md:p-6 space-y-4 text-left shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase font-mono text-primary">
              Week {weekNumber} &bull; {weekTitle}
            </span>
            <Badge className="bg-primary/15 text-primary border-primary/30 text-[9px] font-mono">
              Active Focus
            </Badge>
          </div>
          <p className="text-xs text-text-secondary/70 mt-0.5">{weekTheme}</p>
        </div>

        <span className="text-[11px] font-mono text-text-secondary/50">
          {tasks.filter((t) => t.status === "Verified").length} of {tasks.length} milestones verified
        </span>
      </div>

      <div className="space-y-2.5">
        {tasks.map((task, idx) => {
          const statusBadge = getStatusBadge(task.status);
          const isVerified = task.status === "Verified";
          const isBlocked = task.status === "Blocked";

          return (
            <div
              key={task.id}
              onClick={() => onOpenTaskDrawer(task.id)}
              className={cn(
                "p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all cursor-pointer group",
                isBlocked
                  ? "border-rose-500/20 bg-rose-500/[0.02] opacity-75"
                  : "border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/15"
              )}
            >
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className="h-6 w-6 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-[10px] font-mono text-text-secondary/60 shrink-0">
                    0{idx + 1}
                  </span>
                  <h4 className="text-xs md:text-sm font-bold text-white group-hover:text-primary transition-colors truncate">
                    {task.title}
                  </h4>
                  <span className={cn("text-[9px] px-1.5 py-0.2 rounded border font-mono shrink-0", statusBadge.className)}>
                    {statusBadge.label}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-text-secondary/50 pl-8">
                  <span>{task.skill}</span>
                  <span>&bull;</span>
                  <span>{task.estimatedHours} hrs</span>
                  <span>&bull;</span>
                  <span className="text-emerald-400 font-semibold">+{task.projectedScoreImpact}% readiness</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pl-8 sm:pl-0 shrink-0">
                {isBlocked ? (
                  <div className="flex items-center gap-1 text-xs text-rose-400 font-mono">
                    <Lock className="h-3.5 w-3.5" />
                    <span>Blocked</span>
                  </div>
                ) : !isVerified ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartTask(task.id);
                    }}
                    className="h-7.5 px-3.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>{task.status === "In Progress" ? "Continue" : "Start"}</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                ) : (
                  <div className="flex items-center gap-1 text-xs text-emerald-400 font-mono font-bold">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Verified</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
