"use client";

import React, { useState } from "react";
import { Award, ShieldCheck, CheckCircle2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GrowthAchievement {
  id: string;
  title: string;
  description: string;
  date: string;
  impact: string;
  category: string;
  relatedModule: string;
}

interface AchievementTimelineProps {
  achievements: GrowthAchievement[];
}

export function AchievementTimeline({ achievements }: AchievementTimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="p-5 rounded-xl border border-white/[0.08] bg-white/[0.01] space-y-4 text-left shadow-sm">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
            Verified Achievements Timeline
          </h3>
          <p className="text-[11px] text-text-secondary/60 mt-0.5">
            Chronological log of verified evidence updates, ATS resume scores, and roadmap checkpoints.
          </p>
        </div>
      </div>

      <div className="relative pl-6 space-y-5 border-l border-white/[0.08] ml-3 py-1 text-xs">
        {achievements.map((ach) => {
          const isExpanded = expandedId === ach.id;

          return (
            <div key={ach.id} className="relative">
              {/* Point Node Indicator */}
              <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border border-primary bg-[#0A0F24] flex items-center justify-center text-[8px] text-primary">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              </div>

              <div
                onClick={() => toggleExpand(ach.id)}
                className="p-3 rounded-lg border border-white/[0.05] bg-[#050816] hover:border-white/10 transition-all cursor-pointer space-y-1"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-text-secondary/40 font-mono">
                      {ach.date}
                    </span>
                    <span className="text-[9.5px] px-1.5 py-0.2 rounded border border-white/5 bg-white/[0.01] font-mono text-text-secondary/70">
                      {ach.category}
                    </span>
                  </div>

                  <span className="font-mono text-emerald-400 font-bold text-[10.5px]">
                    {ach.impact}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <h4 className="font-bold text-white tracking-tight">
                    {ach.title}
                  </h4>
                  <ChevronDown className={cn("h-3.5 w-3.5 text-text-secondary/40 transition-transform", isExpanded && "rotate-180")} />
                </div>

                {isExpanded && (
                  <p className="text-text-secondary/70 leading-relaxed text-[11px] pt-1.5 border-t border-white/[0.04] mt-1.5">
                    {ach.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {achievements.length === 0 && (
          <div className="p-4 text-center text-xs text-text-secondary/50 font-mono">
            No verified achievements logged in this period.
          </div>
        )}
      </div>
    </div>
  );
}
