"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, FileCode, GitCommit, X, ExternalLink, ShieldCheck, Info } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface EvidenceItem {
  repository: string;
  filePath: string;
  commit: string;
  commitMessage: string;
  detectedPattern: string;
  explanation: string;
}

export interface TechnologyEvidenceItem {
  technology: string;
  status: "Verified" | "Strong Evidence" | "Partial Evidence" | "Limited Evidence";
  confidence: number;
  evidence: EvidenceItem[];
}

interface ProjectEvidenceProps {
  technologies: TechnologyEvidenceItem[];
  projectName: string;
}

export function ProjectEvidence({ technologies, projectName }: ProjectEvidenceProps) {
  const [selectedTech, setSelectedTech] = useState<TechnologyEvidenceItem | null>(null);

  const getStatusBadge = (status: TechnologyEvidenceItem["status"]) => {
    switch (status) {
      case "Verified":
        return { label: "Verified", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
      case "Strong Evidence":
        return { label: "Strong Evidence", className: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" };
      case "Partial Evidence":
        return { label: "Partial Evidence", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" };
      default:
        return { label: "Limited", className: "bg-rose-500/10 text-rose-400 border-rose-500/20" };
    }
  };

  return (
    <div className="space-y-3.5 text-left">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
            Technology Evidence & Citations
          </h4>
          <p className="text-[11px] text-text-secondary/60 mt-0.5">
            Click any technology to inspect the exact files, commits, and patterns detected in {projectName}.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {technologies.map((tech, idx) => {
          const badge = getStatusBadge(tech.status);
          return (
            <button
              key={idx}
              onClick={() => setSelectedTech(tech)}
              className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/15 flex items-center justify-between transition-all cursor-pointer text-left group"
            >
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-white group-hover:text-primary transition-colors">
                  {tech.technology}
                </span>
                <span className="text-[10px] text-text-secondary/50 font-mono block">
                  {tech.evidence.length} evidence {tech.evidence.length === 1 ? "source" : "sources"} &bull; {tech.confidence}% confidence
                </span>
              </div>

              <span className={cn("text-[9.5px] px-2 py-0.5 rounded border font-mono shrink-0", badge.className)}>
                {badge.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Technology Evidence Inspector Modal */}
      <AnimatePresence>
        {selectedTech && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-lg rounded-xl border border-white/10 bg-[#0A0F24] p-6 shadow-2xl space-y-5 text-left"
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-base font-bold text-white">{selectedTech.technology} Evidence Proof</h3>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    {selectedTech.confidence}% Confidence
                  </span>
                </div>
                <button
                  onClick={() => setSelectedTech(null)}
                  className="p-1 rounded hover:bg-white/5 text-text-secondary/50 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3.5 max-h-[420px] overflow-y-auto pr-1">
                {selectedTech.evidence.map((ev, eIdx) => (
                  <div key={eIdx} className="p-3.5 rounded-lg border border-white/[0.06] bg-[#050816] space-y-2.5 text-xs">
                    <div className="flex items-center justify-between text-[11px] border-b border-white/[0.04] pb-2">
                      <div className="flex items-center gap-1.5 font-mono text-primary">
                        <FileCode className="h-3.5 w-3.5" />
                        <span>{ev.filePath}</span>
                      </div>
                      <span className="font-mono text-text-secondary/50 flex items-center gap-1">
                        <GitCommit className="h-3 w-3" />
                        {ev.commit}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-text-secondary/50 uppercase font-mono block">
                        Commit Summary
                      </span>
                      <p className="text-text-secondary/80 font-mono text-[11px]">"{ev.commitMessage}"</p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase font-mono block">
                        Detected Pattern
                      </span>
                      <p className="text-white/90 text-[11.5px] font-medium">{ev.detectedPattern}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-text-secondary/50 uppercase font-mono block">
                        Verification Rationale
                      </span>
                      <p className="text-text-secondary/70 text-[11px] leading-relaxed">{ev.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/[0.06] pt-3 flex justify-end">
                <button
                  onClick={() => setSelectedTech(null)}
                  className="h-8 px-4 rounded bg-primary text-background-primary text-xs font-bold"
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
