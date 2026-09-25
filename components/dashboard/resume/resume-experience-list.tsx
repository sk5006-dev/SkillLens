"use client";

import React, { useState } from "react";
import { ChevronDown, CheckCircle2, TrendingUp, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  evidenceStrength: string;
  verifiedSkills: string[];
  responsibilities: string[];
  quantifiedAchievements: string[];
}

interface ExperienceListProps {
  experience: ExperienceItem[];
}

export function ResumeExperienceList({ experience }: ExperienceListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight">Experience Timeline & Achievements</h3>
          <p className="text-xs text-text-secondary/60 mt-0.5">
            Expand roles to inspect verified technology tags, quantified achievements, and evidence depth.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {experience.map((exp) => {
          const isExpanded = expandedId === exp.id;
          return (
            <div
              key={exp.id}
              className="rounded-xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.02] transition-colors overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                className="w-full p-4.5 text-left flex items-center justify-between focus:outline-none cursor-pointer"
              >
                <div className="flex items-start gap-3.5">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-xs font-bold text-white">{exp.role}</h4>
                      <span className="text-xs text-text-secondary font-medium">&bull; {exp.company}</span>
                      <Badge variant="outline" className="text-[9px] font-mono border-white/10 text-text-secondary/70">
                        {exp.evidenceStrength} Evidence
                      </Badge>
                    </div>
                    <span className="text-[10.5px] text-text-secondary/50 font-mono mt-0.5 block">{exp.period}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex flex-wrap gap-1.5 max-w-xs justify-end">
                    {exp.verifiedSkills.slice(0, 3).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[9.5px] px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.05] text-text-secondary/80 font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-text-secondary/40 transition-transform shrink-0",
                      isExpanded && "rotate-180"
                    )}
                  />
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-white/[0.04] bg-[#050816]/50 p-5 space-y-4 text-xs">
                  {/* Responsibilities */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-text-secondary/50 uppercase font-mono block">
                      Core Responsibilities
                    </span>
                    <ul className="space-y-1.5 text-text-secondary/80">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary/60 mt-1.5 shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quantified Achievements */}
                  {exp.quantifiedAchievements && exp.quantifiedAchievements.length > 0 && (
                    <div className="space-y-1.5 border-t border-white/[0.04] pt-3">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase font-mono block flex items-center gap-1.5">
                        <TrendingUp className="h-3 w-3" />
                        <span>Quantified Outcomes</span>
                      </span>
                      <ul className="space-y-1.5 text-white/90">
                        {exp.quantifiedAchievements.map((ach, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* All Verified Skills */}
                  <div className="border-t border-white/[0.04] pt-3">
                    <span className="text-[10px] font-bold text-text-secondary/50 uppercase font-mono block mb-1.5">
                      Verified Skill Tags
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.verifiedSkills.map((s, sIdx) => (
                        <Badge
                          key={sIdx}
                          variant="outline"
                          className="bg-primary/5 text-primary border-primary/20 text-[9.5px] font-mono"
                        >
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
