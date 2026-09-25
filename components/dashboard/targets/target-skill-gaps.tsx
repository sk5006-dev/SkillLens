"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, HelpCircle, ChevronRight, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SkillGapItem, TargetEvidenceDrawer } from "./target-evidence-drawer";

interface TargetSkillGapsProps {
  skills: SkillGapItem[];
  onNavigateTab?: (tab: string) => void;
}

export function TargetSkillGaps({ skills, onNavigateTab }: TargetSkillGapsProps) {
  const [activeFilter, setActiveFilter] = useState<"All" | "Verified" | "Partial" | "Missing">("All");
  const [search, setSearch] = useState("");
  const [inspectedSkill, setInspectedSkill] = useState<SkillGapItem | null>(null);

  const filters = ["All", "Verified", "Partial", "Missing"] as const;

  const filteredSkills = skills.filter((s) => {
    const matchesFilter = activeFilter === "All" || s.status === activeFilter;
    const matchesSearch =
      s.skill.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: SkillGapItem["status"]) => {
    switch (status) {
      case "Verified":
        return { label: "Verified", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
      case "Partial":
        return { label: "Partial", className: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" };
      default:
        return { label: "Missing", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" };
    }
  };

  const getImportanceBadge = (imp: SkillGapItem["importance"]) => {
    switch (imp) {
      case "Critical":
        return "text-rose-400 border-rose-500/20 bg-rose-500/5";
      case "High":
        return "text-primary border-primary/20 bg-primary/5";
      default:
        return "text-text-secondary/60 border-white/5 bg-white/[0.01]";
    }
  };

  return (
    <div className="space-y-4 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
            Skill Gap Analysis
          </h3>
          <p className="text-[11px] text-text-secondary/60 mt-0.5">
            Click any skill to inspect cross-module citations from your resume and projects.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
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

      {/* Skills Table List */}
      <div className="rounded-xl border border-white/[0.06] bg-[#050816] overflow-hidden">
        <div className="divide-y divide-white/[0.04]">
          {filteredSkills.map((item, idx) => {
            const statusBadge = getStatusBadge(item.status);
            const impBadge = getImportanceBadge(item.importance);

            return (
              <div
                key={idx}
                onClick={() => setInspectedSkill(item)}
                className="p-3.5 hover:bg-white/[0.02] flex items-center justify-between gap-4 transition-colors cursor-pointer group"
              >
                {/* Skill Name & Category */}
                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white group-hover:text-primary transition-colors truncate">
                      {item.skill}
                    </span>
                    <span className={cn("text-[9px] px-1.5 py-0.2 rounded border font-mono", impBadge)}>
                      {item.importance}
                    </span>
                  </div>
                  <span className="text-[10px] text-text-secondary/50 font-mono block">
                    {item.category}
                  </span>
                </div>

                {/* Level and Gap */}
                <div className="hidden sm:flex items-center gap-6 text-xs font-mono shrink-0">
                  <div>
                    <span className="text-[9.5px] text-text-secondary/40 block">Current</span>
                    <span className="text-text-secondary/80 font-semibold">{item.currentLevel}</span>
                  </div>
                  <div>
                    <span className="text-[9.5px] text-text-secondary/40 block">Target</span>
                    <span className="text-white font-semibold">{item.requiredLevel}</span>
                  </div>
                  <div className="w-12 text-right">
                    <span className="text-[9.5px] text-text-secondary/40 block">Gap</span>
                    <span className={cn("font-bold", item.gap === 0 ? "text-emerald-400" : "text-amber-400")}>
                      {item.gap}%
                    </span>
                  </div>
                </div>

                {/* Status Badge & Arrow */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <span className={cn("text-[9.5px] px-2 py-0.5 rounded border font-mono", statusBadge.className)}>
                    {statusBadge.label}
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-text-secondary/40 group-hover:text-white transition-colors" />
                </div>
              </div>
            );
          })}

          {filteredSkills.length === 0 && (
            <div className="p-8 text-center text-xs text-text-secondary/50 font-mono">
              No skills match the selected filter.
            </div>
          )}
        </div>
      </div>

      {/* Cross-module evidence inspector drawer */}
      <TargetEvidenceDrawer
        isOpen={!!inspectedSkill}
        onClose={() => setInspectedSkill(null)}
        skillItem={inspectedSkill}
        onNavigateTab={onNavigateTab}
      />
    </div>
  );
}
