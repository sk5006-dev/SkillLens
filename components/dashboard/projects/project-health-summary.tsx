"use client";

import React from "react";
import { ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HealthSummaryProps {
  score: number;
  status: string;
  summary: string;
  strongEvidence: string[];
  needsEvidence: string[];
}

export function ProjectHealthSummary({
  score,
  status,
  summary,
  strongEvidence,
  needsEvidence,
}: HealthSummaryProps) {
  return (
    <div className="p-4 md:p-5 rounded-xl border border-white/[0.06] bg-white/[0.01] grid grid-cols-1 md:grid-cols-12 gap-5 text-left items-center">
      {/* Score gauge column */}
      <div className="md:col-span-3 flex items-center gap-4 border-b md:border-b-0 md:border-r border-white/[0.06] pb-4 md:pb-0 md:pr-4">
        <div className="relative h-14 w-14 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="28" cy="28" r="22" className="stroke-white/[0.05] fill-none" strokeWidth="4" />
            <circle
              cx="28"
              cy="28"
              r="22"
              className="stroke-primary fill-none transition-all duration-700"
              strokeWidth="4"
              strokeDasharray="138"
              strokeDashoffset={138 - (138 * score) / 100}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-sm font-extrabold font-mono text-white">{score}%</span>
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary/50 font-mono block">
            Portfolio Readiness
          </span>
          <span className="text-xs font-bold text-white block mt-0.5">{status}</span>
        </div>
      </div>

      {/* Summary & tags column */}
      <div className="md:col-span-9 space-y-2.5">
        <p className="text-xs text-text-secondary/80 leading-relaxed">{summary}</p>

        <div className="flex flex-wrap items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span className="text-text-secondary/60 font-mono">Strong Evidence:</span>
            <div className="flex flex-wrap gap-1">
              {strongEvidence.slice(0, 4).map((tech, idx) => (
                <Badge key={idx} variant="outline" className="bg-emerald-500/5 text-emerald-300 border-emerald-500/20 text-[9.5px] font-mono px-1.5 py-0">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
            <span className="text-text-secondary/60 font-mono">Needs Evidence:</span>
            <div className="flex flex-wrap gap-1">
              {needsEvidence.slice(0, 2).map((tech, idx) => (
                <Badge key={idx} variant="outline" className="bg-amber-500/5 text-amber-300 border-amber-500/20 text-[9.5px] font-mono px-1.5 py-0">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
