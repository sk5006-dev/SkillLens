"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, Target, Building2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AIAnalysisPanelProps {
  targetCompany: string;
  targetRole: string;
  targetAlignment: number;
  breakdown?: {
    technicalSkills: number;
    experience: number;
    projects: number;
    education: number;
    overall: number;
  };
  onSwitchTargetClick?: () => void;
}

export function ResumeAIAnalysisPanel({
  targetCompany,
  targetRole,
  targetAlignment,
  breakdown = {
    technicalSkills: 94,
    experience: 89,
    projects: 93,
    education: 82,
    overall: 92,
  },
  onSwitchTargetClick,
}: AIAnalysisPanelProps) {
  const strengths = [
    "Strong technical coverage across React, TypeScript, and Node.js microservices.",
    "Validated open-source repository evidence backing distributed systems claims.",
    "Progressive career trajectory with senior engineering responsibilities.",
  ];

  const needsImprovement = [
    "Quantify business and performance outcomes across recent TechCorp projects.",
    "Strengthen system architecture and cloud infrastructure manifest evidence.",
    "Add explicit PostgreSQL query optimization and indexing details.",
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Target Match Dynamic Card */}
      <div className="p-5 rounded-xl border border-primary/20 bg-primary/5 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest font-mono">
              Target Benchmark
            </span>
            <div className="flex items-center gap-2 mt-1">
              <Building2 className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-bold text-white">
                {targetCompany} &bull; <span className="font-normal text-text-secondary">{targetRole}</span>
              </h3>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-extrabold font-mono text-primary">{targetAlignment}%</span>
            <span className="text-[9.5px] text-text-secondary/50 block">Target Match</span>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          {[
            { label: "Technical Skills", val: breakdown.technicalSkills },
            { label: "Experience Relevance", val: breakdown.experience },
            { label: "Project Evidence", val: breakdown.projects },
            { label: "Education & Certs", val: breakdown.education },
          ].map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-text-secondary/70">{item.label}</span>
                <span className="font-mono text-white font-semibold">{item.val}%</span>
              </div>
              <div className="h-1 w-full bg-white/[0.05] rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${item.val}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths Card */}
      <div className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.01] space-y-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
            Key Strengths
          </h3>
        </div>
        <ul className="space-y-2 text-xs text-text-secondary/80">
          {strengths.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 leading-relaxed">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60 mt-1.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Needs Improvement Card */}
      <div className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.01] space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
            Improvement Opportunities
          </h3>
        </div>
        <ul className="space-y-2 text-xs text-text-secondary/80">
          {needsImprovement.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 leading-relaxed">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400/60 mt-1.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
