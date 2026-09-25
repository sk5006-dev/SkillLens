"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, HelpCircle, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntelligenceSettingsProps {
  automaticResumeAnalysis: boolean;
  automaticProjectSync: boolean;
  automaticTargetRecalculation: boolean;
  roadmapAutoUpdate: boolean;
  onUpdate: (data: {
    automaticResumeAnalysis?: boolean;
    automaticProjectSync?: boolean;
    automaticTargetRecalculation?: boolean;
    roadmapAutoUpdate?: boolean;
  }) => void;
}

export function IntelligenceSettings({
  automaticResumeAnalysis,
  automaticProjectSync,
  automaticTargetRecalculation,
  roadmapAutoUpdate,
  onUpdate,
}: IntelligenceSettingsProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  const automations = [
    {
      key: "automaticResumeAnalysis" as const,
      title: "Automatic Resume Analysis",
      desc: "Scans uploaded resumes for newly acquired skills when files change.",
      val: automaticResumeAnalysis,
    },
    {
      key: "automaticProjectSync" as const,
      title: "Automatic Project Sync",
      desc: "Synchronizes verified repositories code commits hourly to audit evidence updates.",
      val: automaticProjectSync,
    },
    {
      key: "automaticTargetRecalculation" as const,
      title: "Automatic Target Recalculation",
      desc: "Recalculates target compatibility score whenever resume, projects, or roadmap details shift.",
      val: automaticTargetRecalculation,
    },
    {
      key: "roadmapAutoUpdate" as const,
      title: "Automatic Roadmap Updates",
      desc: "Modifies roadmap tasks sequence automatically to reflect completed skill checkpoints.",
      val: roadmapAutoUpdate,
    },
  ];

  return (
    <div className="space-y-6 text-left max-w-xl">
      <div className="space-y-1">
        <h3 className="text-base font-bold text-white tracking-tight">SkillLens Intelligence</h3>
        <p className="text-xs text-text-secondary/70 leading-relaxed">
          Control how automatically SkillLens analyzes and updates your career intelligence workspace.
        </p>
      </div>

      {/* Expandable Explanation Box */}
      <div className="rounded-xl border border-white/[0.06] bg-[#050816] overflow-hidden text-xs">
        <button
          type="button"
          onClick={() => setShowExplanation(!showExplanation)}
          className="w-full p-4 flex items-center justify-between text-left text-white hover:bg-white/[0.01] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4.5 w-4.5 text-primary" />
            <span className="font-semibold">How SkillLens uses automation</span>
          </div>
          <ChevronDown className={cn("h-4 w-4 text-text-secondary/40 transition-transform", showExplanation && "rotate-180")} />
        </button>

        {showExplanation && (
          <div className="px-4 pb-4 text-text-secondary/70 space-y-2 leading-relaxed border-t border-white/[0.04] pt-3.5">
            <p>
              SkillLens runs secure background workers that index connected git providers and parsed resume data structures.
            </p>
            <p>
              When automation is active, recalculation results immediately refresh target match statistics without requiring manual recalculation.
            </p>
          </div>
        )}
      </div>

      <div className="space-y-3.5 pt-1 text-xs">
        {automations.map((item) => (
          <div
            key={item.key}
            className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.01] flex items-center justify-between gap-4"
          >
            <div className="space-y-1 max-w-[75%]">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">{item.title}</span>
                <Badge className="bg-primary/10 text-primary border border-primary/20 text-[9px] font-mono uppercase">
                  Demo automation
                </Badge>
              </div>
              <p className="text-[11px] text-text-secondary/50 leading-relaxed">
                {item.desc}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onUpdate({ [item.key]: !item.val })}
              className={cn(
                "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                item.val ? "bg-primary" : "bg-white/10"
              )}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                  item.val ? "translate-x-4" : "translate-x-0"
                )}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
