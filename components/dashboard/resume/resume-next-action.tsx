"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, ChevronDown, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Recommendation {
  id: string;
  impact: "High" | "Medium" | "Low";
  title: string;
  description: string;
  section: string;
  originalText: string;
  recommendedText: string;
  rationale: string;
}

interface NextActionProps {
  nextAction: Recommendation;
  secondarySuggestions: Recommendation[];
  onImproveClick: (rec: Recommendation) => void;
  appliedIds?: string[];
}

export function ResumeNextAction({
  nextAction,
  secondarySuggestions,
  onImproveClick,
  appliedIds = [],
}: NextActionProps) {
  const [showSecondary, setShowSecondary] = useState(false);
  const isApplied = appliedIds.includes(nextAction.id);

  return (
    <div className="space-y-4 text-left">
      {/* Primary Next Best Action Card */}
      <div className="p-5 md:p-6 rounded-xl border border-primary/25 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0 mt-0.5">
            <Sparkles className="h-5 w-5" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary font-mono">
                Next Best Action
              </span>
              <Badge className="bg-primary/20 text-primary border-primary/30 text-[9px] font-mono px-2 py-0.2">
                Impact: {nextAction.impact}
              </Badge>
              {isApplied && (
                <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Applied
                </span>
              )}
            </div>

            <h3 className="text-sm md:text-base font-bold text-white tracking-tight">{nextAction.title}</h3>
            <p className="text-xs text-text-secondary/80 max-w-2xl leading-relaxed">{nextAction.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {secondarySuggestions.length > 0 && (
            <button
              onClick={() => setShowSecondary((prev) => !prev)}
              className="text-xs text-text-secondary/70 hover:text-white flex items-center gap-1 font-medium transition-colors cursor-pointer"
            >
              <span>{showSecondary ? "Hide" : "Other suggestions"}</span>
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", showSecondary && "rotate-180")} />
            </button>
          )}

          <button
            onClick={() => onImproveClick(nextAction)}
            className="h-9 px-4 rounded-lg bg-primary hover:bg-primary/90 text-background-primary text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 active:scale-[0.98]"
          >
            <span>{isApplied ? "Review Change" : "Improve This"}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Secondary Recommendations Accordion */}
      {showSecondary && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {secondarySuggestions.map((rec) => {
            const recApplied = appliedIds.includes(rec.id);
            return (
              <div
                key={rec.id}
                className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.02] flex flex-col justify-between space-y-3 transition-colors text-left"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/[0.04] pb-2 mb-2">
                    <span className="text-[10px] text-text-secondary/50 font-mono">{rec.section}</span>
                    <Badge variant="outline" className="text-[9px] font-mono border-white/10 text-text-secondary">
                      Impact: {rec.impact}
                    </Badge>
                  </div>
                  <h4 className="text-xs font-bold text-white">{rec.title}</h4>
                  <p className="text-[11px] text-text-secondary/70 mt-1 leading-relaxed">{rec.description}</p>
                </div>

                <div className="flex justify-end pt-2 border-t border-white/[0.04]">
                  <button
                    onClick={() => onImproveClick(rec)}
                    className="text-xs text-primary hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>{recApplied ? "View Applied" : "Inspect Suggestion"}</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
