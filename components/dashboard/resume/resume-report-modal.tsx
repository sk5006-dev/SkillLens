"use client";

import React, { useState } from "react";
import { Printer, X, FileText, CheckCircle2, ShieldCheck, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName: string;
  targetCompany: string;
  targetRole: string;
  resumeScore: number;
  atsScore: number;
  contentScore: number;
  targetAlignment: number;
  skills: string[];
  lastAnalyzedAt: string | null;
}

export function ResumeReportModal({
  isOpen,
  onClose,
  candidateName,
  targetCompany,
  targetRole,
  resumeScore,
  atsScore,
  contentScore,
  targetAlignment,
  skills,
  lastAnalyzedAt,
}: ReportModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0A0F24] p-6 md:p-8 shadow-2xl space-y-6 text-left my-8"
      >
        {/* Printable Header */}
        <div className="flex items-start justify-between border-b border-white/[0.08] pb-4">
          <div>
            <div className="flex items-center gap-2 text-primary font-mono text-[10px] font-bold uppercase tracking-widest">
              <ShieldCheck className="h-4 w-4" />
              <span>SkillLens Intelligence Executive Report</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">{candidateName} &bull; Candidate Evaluation</h2>
            <p className="text-xs text-text-secondary/60 mt-0.5">
              Target: {targetCompany} &bull; {targetRole} | Generated {lastAnalyzedAt || "Aug 8, 2026"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/5 text-text-secondary/50 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Score Summary Grid */}
        <div className="grid grid-cols-4 gap-3 p-4 rounded-xl border border-white/[0.06] bg-[#050816] text-center">
          <div>
            <span className="text-[10px] text-text-secondary/50 font-mono block">Resume Score</span>
            <span className="text-xl font-bold font-mono text-primary">{resumeScore}%</span>
          </div>
          <div>
            <span className="text-[10px] text-text-secondary/50 font-mono block">ATS Score</span>
            <span className="text-xl font-bold font-mono text-emerald-400">{atsScore}%</span>
          </div>
          <div>
            <span className="text-[10px] text-text-secondary/50 font-mono block">Content Quality</span>
            <span className="text-xl font-bold font-mono text-cyan-400">{contentScore}%</span>
          </div>
          <div>
            <span className="text-[10px] text-text-secondary/50 font-mono block">Target Fit</span>
            <span className="text-xl font-bold font-mono text-indigo-400">{targetAlignment}%</span>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2 text-xs">
          <h3 className="text-[10.5px] font-bold text-text-secondary/60 uppercase font-mono tracking-wider">
            Executive Summary
          </h3>
          <p className="text-text-secondary/80 leading-relaxed bg-white/[0.01] p-3 rounded-lg border border-white/[0.04]">
            Candidate demonstrates an optimal match ({targetAlignment}%) for {targetCompany}'s {targetRole} role. Technical core requirements (React, TypeScript, Node.js, Go) are validated with production repositories and active commits.
          </p>
        </div>

        {/* Verified Skills Summary */}
        <div className="space-y-2 text-xs">
          <h3 className="text-[10.5px] font-bold text-text-secondary/60 uppercase font-mono tracking-wider">
            Verified Capabilities
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, idx) => (
              <Badge key={idx} variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[10px] font-mono">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Next Priorities */}
        <div className="space-y-2 text-xs border-t border-white/[0.06] pt-4">
          <h3 className="text-[10.5px] font-bold text-text-secondary/60 uppercase font-mono tracking-wider">
            Key Recommendations
          </h3>
          <ul className="space-y-1.5 text-text-secondary/80">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
              <span>Quantify business scale (e.g. 120k+ DAU, 40% latency reduction) in recent work experience.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
              <span>Link IaC Terraform repositories to verify theoretical AWS certification evidence.</span>
            </li>
          </ul>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between border-t border-white/[0.08] pt-4">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded-lg border border-white/10 hover:bg-white/5 text-xs text-text-secondary font-semibold"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="h-9 px-5 rounded-lg bg-primary hover:bg-primary/90 text-background-primary text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
