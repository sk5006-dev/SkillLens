"use client";

import React, { useState } from "react";
import { HelpCircle, X, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface MatchBreakdownData {
  technicalSkills: number;
  experience: number;
  projects: number;
  architecture: number;
  resumeAlignment: number;
  evidenceStrength: number;
}

interface MatchBreakdownProps {
  breakdown: MatchBreakdownData;
  isOpen: boolean;
  onClose: () => void;
  targetCompany: string;
  targetRole: string;
}

export function MatchBreakdown({
  breakdown,
  isOpen,
  onClose,
  targetCompany,
  targetRole,
}: MatchBreakdownProps) {
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null);

  const dimensions = [
    {
      id: "technicalSkills",
      label: "Technical Skills",
      val: breakdown.technicalSkills,
      weight: "25%",
      explanation: "Evaluates the overlap of your verified technical proficiencies (TypeScript, React, Node.js, Go, Docker) against the requirements for this role.",
    },
    {
      id: "experience",
      label: "Experience Relevance",
      val: breakdown.experience,
      weight: "20%",
      explanation: "Analyzes years of seniority, engineering scope, and quantified responsibilities from your TechCorp and DevSolutions positions.",
    },
    {
      id: "projects",
      label: "Project Evidence",
      val: breakdown.projects,
      weight: "20%",
      explanation: "Evaluates repository commits, multi-stage Docker builds, and live systems evidence from api-gateway and react-dashboard.",
    },
    {
      id: "architecture",
      label: "Architecture & Systems",
      val: breakdown.architecture,
      weight: "15%",
      explanation: "Measures validated system design capabilities, API separation, Redis caching, and connection pooling patterns.",
    },
    {
      id: "resumeAlignment",
      label: "Resume Alignment",
      val: breakdown.resumeAlignment,
      weight: "10%",
      explanation: "Assesses ATS keyword match, professional summary relevance, and certification alignment.",
    },
    {
      id: "evidenceStrength",
      label: "Evidence Strength",
      val: breakdown.evidenceStrength,
      weight: "10%",
      explanation: "Checks confidence level across all cited code commits, Dockerfiles, and repository assets.",
    },
  ];

  return (
    <div className="p-5 rounded-xl border border-white/[0.08] bg-white/[0.01] space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
            Match Score Breakdown
          </h4>
          <p className="text-[11px] text-text-secondary/60 mt-0.5">
            Weighted assessment calibrated for {targetCompany} &bull; {targetRole}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
        {dimensions.map((dim) => (
          <div
            key={dim.id}
            onClick={() => setSelectedDimension(dim.id)}
            className="p-3 rounded-lg border border-white/[0.04] bg-[#050816] space-y-1.5 cursor-pointer hover:border-primary/30 transition-all group"
          >
            <div className="flex justify-between items-center text-xs">
              <span className="text-text-secondary/80 group-hover:text-white font-medium">
                {dim.label}
              </span>
              <div className="flex items-center gap-1.5 font-mono">
                <span className="text-[9.5px] text-text-secondary/40">({dim.weight})</span>
                <span className="font-bold text-white group-hover:text-primary">{dim.val}%</span>
              </div>
            </div>

            <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-700"
                style={{ width: `${dim.val}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Modal Drawer */}
      <AnimatePresence>
        {(isOpen || selectedDimension) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0A0F24] p-6 shadow-2xl space-y-5 text-left"
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <div>
                  <h3 className="text-base font-bold text-white">Why this Target Match Score?</h3>
                  <p className="text-xs text-text-secondary/60">
                    Deterministic calculation breakdown for {targetCompany} &bull; {targetRole}
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    setSelectedDimension(null);
                  }}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-text-secondary/50 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                {dimensions.map((dim) => (
                  <div
                    key={dim.id}
                    className="p-3.5 rounded-xl border border-white/[0.06] bg-[#050816] space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{dim.label}</span>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-[10px] text-text-secondary/50">Weight: {dim.weight}</span>
                        <span className="text-primary font-bold">{dim.val}%</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-text-secondary/70 leading-relaxed">
                      {dim.explanation}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/[0.06] pt-3 flex justify-end">
                <button
                  onClick={() => {
                    onClose();
                    setSelectedDimension(null);
                  }}
                  className="h-8.5 px-4 rounded bg-primary text-background-primary text-xs font-bold"
                >
                  Close Explanation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
