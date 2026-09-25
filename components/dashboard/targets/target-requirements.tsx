"use client";

import React, { useState } from "react";
import { ChevronDown, Layers, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface TargetRequirementItem {
  category: string;
  items: Array<{
    skill: string;
    importance: string;
    currentEvidence: "Strong" | "Partial" | "Missing";
    requiredLevel: string;
    gap: number;
  }>;
}

interface TargetRequirementsProps {
  requirements: TargetRequirementItem[];
}

export function TargetRequirements({ requirements }: TargetRequirementsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.01] p-5 space-y-4 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
            Target Role Requirements Matrix
          </h4>
          <p className="text-[11px] text-text-secondary/60 mt-0.5">
            Full competency breakdown across core engineering, architecture, and infrastructure
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-primary hover:underline font-mono font-semibold flex items-center gap-1 cursor-pointer"
        >
          <span>{isExpanded ? "Collapse Matrix" : `Expand Matrix (${requirements.length} Categories)`}</span>
          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", isExpanded && "rotate-180")} />
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4 pt-2">
          {requirements.map((cat, cIdx) => (
            <div key={cIdx} className="space-y-2">
              <span className="text-[10px] font-bold text-text-secondary/50 uppercase font-mono block">
                {cat.category}
              </span>

              <div className="rounded-lg border border-white/[0.04] bg-[#050816] divide-y divide-white/[0.04] overflow-hidden text-xs">
                {cat.items.map((req, rIdx) => (
                  <div key={rIdx} className="p-2.5 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{req.skill}</span>
                      <span className="text-[9px] text-text-secondary/40 font-mono">
                        Importance: {req.importance}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 font-mono">
                      <span className="text-text-secondary/60">{req.requiredLevel}</span>
                      <span
                        className={cn(
                          "px-2 py-0.2 rounded border text-[9px]",
                          req.currentEvidence === "Strong"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : req.currentEvidence === "Partial"
                            ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        )}
                      >
                        {req.currentEvidence}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
