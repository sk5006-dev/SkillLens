"use client";

import React from "react";
import { CheckCircle2, AlertCircle, HelpCircle, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TargetSummaryProps {
  score: number;
  company: string;
  role: string;
  isCustomCompany?: boolean;
  isCustomRole?: boolean;
  strongCount: number;
  partialCount: number;
  missingCount: number;
  explanation: string;
  onOpenWhyScore: () => void;
}

export function TargetSummary({
  score,
  company,
  role,
  isCustomCompany = false,
  isCustomRole = false,
  strongCount,
  partialCount,
  missingCount,
  explanation,
  onOpenWhyScore,
}: TargetSummaryProps) {
  return (
    <div className="p-6 md:p-7 rounded-xl border border-white/[0.08] bg-[#070B1E] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center text-left shadow-lg">
      {/* Left: Dominant Circular Score */}
      <div className="lg:col-span-4 flex items-center gap-5 border-b lg:border-b-0 lg:border-r border-white/[0.06] pb-5 lg:pb-0 lg:pr-6">
        <div className="relative h-20 w-20 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="40" cy="40" r="32" className="stroke-white/[0.05] fill-none" strokeWidth="5" />
            <circle
              cx="40"
              cy="40"
              r="32"
              className="stroke-primary fill-none transition-all duration-1000"
              strokeWidth="5"
              strokeDasharray="201"
              strokeDashoffset={201 - (201 * score) / 100}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute text-center">
            <span className="text-2xl font-extrabold font-mono text-white block">{score}%</span>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary font-mono block">
            Target Match
          </span>
          <h2 className="text-base font-extrabold text-white leading-tight">
            {company}
          </h2>
          <span className="text-xs text-text-secondary/70 block">{role}</span>

          <button
            onClick={onOpenWhyScore}
            className="text-[10.5px] text-primary hover:underline font-mono inline-flex items-center gap-1 mt-1 cursor-pointer"
          >
            <span>Why {score}%?</span>
            <HelpCircle className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Right: Summary & 3 Evidence Count Pills */}
      <div className="lg:col-span-8 space-y-4">
        <p className="text-xs md:text-sm text-text-secondary/90 leading-relaxed">
          {explanation}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <div>
              <span className="text-[10px] text-emerald-400/70 font-mono block">Strong Evidence</span>
              <span className="text-xs font-bold text-white font-mono">{strongCount} skills</span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-cyan-500/20 bg-cyan-500/5">
            <ShieldCheck className="h-4 w-4 text-cyan-400 shrink-0" />
            <div>
              <span className="text-[10px] text-cyan-400/70 font-mono block">Partial Evidence</span>
              <span className="text-xs font-bold text-white font-mono">{partialCount} skills</span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-amber-500/20 bg-amber-500/5">
            <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
            <div>
              <span className="text-[10px] text-amber-400/70 font-mono block">Missing Evidence</span>
              <span className="text-xs font-bold text-white font-mono">{missingCount} skills</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
