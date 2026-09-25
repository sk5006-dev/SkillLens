"use client";

import React, { useState } from "react";
import { ArrowUpRight, CheckCircle2, ChevronRight, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SkillProgressionItem } from "./growth-detail-drawer";

interface SkillGrowthProps {
  skills: SkillProgressionItem[];
  onSelectSkill: (skill: SkillProgressionItem) => void;
}

export function SkillGrowth({ skills, onSelectSkill }: SkillGrowthProps) {
  const [sortBy, setSortBy] = useState<"Improvement" | "Target" | "Impact" | "Needs Attention">("Improvement");

  const sortedSkills = [...skills].sort((a, b) => {
    if (sortBy === "Improvement") {
      return b.change - a.change;
    }
    if (sortBy === "Target") {
      const aDelta = a.targetLevel - a.currentLevel;
      const bDelta = b.targetLevel - b.currentLevel;
      return aDelta - bDelta; // Closest to target first
    }
    if (sortBy === "Impact") {
      return b.currentLevel - a.currentLevel; // Highest current levels
    }
    // Needs Attention: lowest current relative to target
    const aNeed = a.targetLevel - a.currentLevel;
    const bNeed = b.targetLevel - b.currentLevel;
    return bNeed - aNeed;
  });

  const getStatusBadge = (item: SkillProgressionItem) => {
    if (item.currentLevel >= item.targetLevel) {
      return { label: "Target Reached", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
    }
    if (item.change >= 15) {
      return { label: "Improving", className: "bg-primary/10 text-primary border-primary/20" };
    }
    if (item.currentLevel >= 80) {
      return { label: "Strong", className: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" };
    }
    return { label: "Needs Attention", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" };
  };

  return (
    <div className="p-5 rounded-xl border border-white/[0.08] bg-white/[0.01] space-y-4 text-left shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
            Skill Progression Matrix
          </h3>
          <p className="text-[11px] text-text-secondary/60 mt-0.5">
            Click any technology to view connection artifacts, commits, and resume evidence checkpoints.
          </p>
        </div>

        {/* Sort triggers */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {(["Improvement", "Target", "Impact", "Needs Attention"] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => setSortBy(opt)}
              className={cn(
                "px-2.5 py-1 rounded text-[10.5px] font-mono transition-all cursor-pointer",
                sortBy === opt
                  ? "bg-primary/15 text-primary border border-primary/30 font-bold"
                  : "text-text-secondary/60 hover:text-white bg-white/[0.01] border border-white/[0.04]"
              )}
            >
              {opt === "Improvement"
                ? "Biggest Improvement"
                : opt === "Target"
                ? "Closest to Target"
                : opt === "Impact"
                ? "Highest Impact"
                : "Needs Attention"}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-[#050816] overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.02]">
              <th className="p-3 text-text-secondary/50 font-mono uppercase text-[9.5px]">Skill</th>
              <th className="p-3 text-text-secondary/50 font-mono uppercase text-[9.5px]">Previous</th>
              <th className="p-3 text-text-secondary/50 font-mono uppercase text-[9.5px]">Current</th>
              <th className="p-3 text-text-secondary/50 font-mono uppercase text-[9.5px]">Target</th>
              <th className="p-3 text-text-secondary/50 font-mono uppercase text-[9.5px]">Change</th>
              <th className="p-3 text-text-secondary/50 font-mono uppercase text-[9.5px]">Evidence</th>
              <th className="p-3 text-text-secondary/50 font-mono uppercase text-[9.5px]">Status</th>
              <th className="p-3 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04] text-text-secondary/80">
            {sortedSkills.map((item, idx) => {
              const statusBadge = getStatusBadge(item);

              return (
                <tr
                  key={idx}
                  onClick={() => onSelectSkill(item)}
                  className="hover:bg-white/[0.02] cursor-pointer group transition-colors"
                >
                  <td className="p-3 font-bold text-white group-hover:text-primary transition-colors">
                    {item.skill}
                  </td>
                  <td className="p-3 font-mono">{item.previousLevel}%</td>
                  <td className="p-3 font-mono text-white font-semibold">{item.currentLevel}%</td>
                  <td className="p-3 font-mono">{item.targetLevel}%</td>
                  <td className="p-3 font-mono text-emerald-400 font-bold">+{item.change}</td>
                  <td className="p-3">
                    <span className="text-[10.5px] text-text-secondary/60">
                      {item.evidenceAdded.length} verified signals
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={cn("text-[9px] px-2 py-0.5 rounded border font-mono", statusBadge.className)}>
                      {statusBadge.label}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <ChevronRight className="h-4 w-4 text-text-secondary/30 group-hover:text-white transition-colors ml-auto" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
