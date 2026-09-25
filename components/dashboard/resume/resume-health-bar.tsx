"use client";

import React, { useState } from "react";
import { HelpCircle, X, CheckCircle2, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HealthBarProps {
  resumeScore: number;
  atsScore: number;
  contentScore: number;
  targetAlignment: number;
  targetCompany: string;
  targetRole: string;
  breakdown?: {
    skillsCoverage: number;
    experienceRelevance: number;
    projectEvidence: number;
    atsStructure: number;
  };
  summaryExplanation?: string;
}

export function ResumeHealthBar({
  resumeScore,
  atsScore,
  contentScore,
  targetAlignment,
  targetCompany,
  targetRole,
  breakdown = {
    skillsCoverage: 94,
    experienceRelevance: 89,
    projectEvidence: 93,
    atsStructure: 91,
  },
  summaryExplanation = "Your resume has strong technical coverage and relevant project evidence, but measurable outcomes could be improved.",
}: HealthBarProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  const metrics = [
    {
      label: "Resume Health",
      value: resumeScore,
      status: resumeScore >= 85 ? "Optimal" : "Needs Review",
      color: "text-primary",
      barColor: "bg-primary",
      actionable: true,
    },
    {
      label: "ATS Compatibility",
      value: atsScore,
      status: atsScore >= 90 ? "Standard Compliant" : "Format Risk",
      color: "text-emerald-400",
      barColor: "bg-emerald-400",
    },
    {
      label: "Content Quality",
      value: contentScore,
      status: contentScore >= 85 ? "Strong Evidence" : "Low Detail",
      color: "text-cyan-400",
      barColor: "bg-cyan-400",
    },
    {
      label: "Target Alignment",
      value: targetAlignment,
      status: `${targetCompany || "Target"} Fit`,
      color: "text-indigo-400",
      barColor: "bg-indigo-400",
    },
  ];

  return (
    <div className="relative">
      <div className="p-4 md:p-5 rounded-xl border border-white/[0.06] bg-white/[0.01] grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
        {metrics.map((m, idx) => (
          <div key={idx} className="flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-text-secondary/70 tracking-wide">
                {m.label}
              </span>
              {m.actionable && (
                <button
                  onClick={() => setShowExplanation(true)}
                  className="text-[10px] text-text-secondary/50 hover:text-primary transition-colors flex items-center gap-0.5 font-mono cursor-pointer"
                  title="Why this score?"
                >
                  <span>Why this score?</span>
                  <HelpCircle className="h-3 w-3" />
                </button>
              )}
            </div>

            <div className="flex items-baseline gap-2">
              <span className={cn("text-2xl md:text-3xl font-extrabold font-mono tracking-tight", m.color)}>
                {m.value}%
              </span>
              <span className="text-[10px] text-text-secondary/50 font-medium truncate">
                {m.status}
              </span>
            </div>

            <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all duration-500", m.barColor)}
                style={{ width: `${m.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* "Why this score?" Explanation Popover */}
      <AnimatePresence>
        {showExplanation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md rounded-xl border border-white/10 bg-[#0A0F24] p-5 shadow-2xl space-y-4 text-left"
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white">Resume Score Breakdown</h3>
                  <p className="text-[11px] text-text-secondary/60">
                    Calculated against {targetCompany} &bull; {targetRole}
                  </p>
                </div>
                <button
                  onClick={() => setShowExplanation(false)}
                  className="p-1 rounded hover:bg-white/5 text-text-secondary/50 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="text-xs text-text-secondary/80 leading-relaxed bg-white/[0.02] p-3 rounded-lg border border-white/[0.04]">
                {summaryExplanation}
              </p>

              <div className="space-y-3 pt-1">
                {[
                  { label: "Skills Coverage", val: breakdown.skillsCoverage, weight: "35% weight" },
                  { label: "Experience Relevance", val: breakdown.experienceRelevance, weight: "30% weight" },
                  { label: "Project Evidence", val: breakdown.projectEvidence, weight: "20% weight" },
                  { label: "ATS Structure", val: breakdown.atsStructure, weight: "15% weight" },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-white font-medium">{item.label}</span>
                      <span className="font-mono text-primary font-bold">{item.val}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/[0.05] rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${item.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/[0.06] pt-3 flex justify-end">
                <button
                  onClick={() => setShowExplanation(false)}
                  className="h-8 px-4 rounded bg-primary text-background-primary text-xs font-bold"
                >
                  Understood
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
