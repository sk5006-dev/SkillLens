"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, ChevronDown, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ProjectRecommendationItem {
  id: string;
  title: string;
  impact: "High" | "Medium" | "Low";
  why: string;
}

export interface ProjectNextBestAction {
  id: string;
  title: string;
  impact: "High" | "Medium" | "Low";
  why: string;
  potentialImpact: string;
  actionLabel: string;
  secondaryRecommendations?: ProjectRecommendationItem[];
}

interface ProjectRecommendationsProps {
  nextBestAction: ProjectNextBestAction;
  onApplyAction: (id: string) => void;
  appliedActions?: string[];
}

export function ProjectRecommendations({
  nextBestAction,
  onApplyAction,
  appliedActions = [],
}: ProjectRecommendationsProps) {
  const [showSecondary, setShowSecondary] = useState(false);
  const isApplied = appliedActions.includes(nextBestAction.id);
  const secondary = nextBestAction.secondaryRecommendations || [];

  return (
    <div className="space-y-3.5 text-left">
      {/* Primary Next Best Action Card */}
      <div className="p-5 rounded-xl border border-primary/25 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0 mt-0.5">
              <Sparkles className="h-4 w-4" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary font-mono">
                  Next Best Action
                </span>
                <Badge className="bg-primary/20 text-primary border-primary/30 text-[9px] font-mono">
                  Impact: {nextBestAction.impact}
                </Badge>
                {isApplied && (
                  <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Completed
                  </span>
                )}
              </div>

              <h4 className="text-sm font-bold text-white tracking-tight">{nextBestAction.title}</h4>
              <p className="text-xs text-text-secondary/80 leading-relaxed">{nextBestAction.why}</p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[10px] font-mono text-emerald-400 font-bold block">
              {nextBestAction.potentialImpact}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-primary/10 pt-3">
          {secondary.length > 0 ? (
            <button
              onClick={() => setShowSecondary((prev) => !prev)}
              className="text-xs text-text-secondary/60 hover:text-white flex items-center gap-1 font-medium transition-colors cursor-pointer"
            >
              <span>{showSecondary ? "Hide secondary" : `View ${secondary.length} other suggestions`}</span>
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", showSecondary && "rotate-180")} />
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={() => onApplyAction(nextBestAction.id)}
            className="h-8.5 px-4 rounded-lg bg-primary hover:bg-primary/90 text-background-primary text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
          >
            <span>{isApplied ? "Review Action" : nextBestAction.actionLabel}</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Collapsible Secondary Recommendations */}
      {showSecondary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {secondary.map((rec) => (
            <div
              key={rec.id}
              className="p-3.5 rounded-lg border border-white/[0.06] bg-white/[0.01] space-y-1.5 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">{rec.title}</span>
                <Badge variant="outline" className="text-[9px] font-mono border-white/10 text-text-secondary">
                  {rec.impact}
                </Badge>
              </div>
              <p className="text-[11px] text-text-secondary/70 leading-relaxed">{rec.why}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
