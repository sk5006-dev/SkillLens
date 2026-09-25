"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, HelpCircle, X, ExternalLink, Code2, FileText, Info } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SkillItem {
  name: string;
  status: "Verified" | "Partially Verified" | "Missing Evidence";
  evidence: {
    resumeSnippet: string;
    projectProof: string;
    rationale: string;
  };
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

interface SkillsMatrixProps {
  categories: SkillCategory[];
}

export function ResumeSkillsMatrix({ categories }: SkillsMatrixProps) {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const getStatusBadge = (status: SkillItem["status"]) => {
    switch (status) {
      case "Verified":
        return {
          label: "Verified",
          className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          icon: CheckCircle2,
        };
      case "Partially Verified":
        return {
          label: "Partial Evidence",
          className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
          icon: AlertCircle,
        };
      case "Missing Evidence":
        return {
          label: "Missing Evidence",
          className: "bg-rose-500/10 text-rose-400 border-rose-500/20",
          icon: HelpCircle,
        };
    }
  };

  return (
    <div className="space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight">Verified Technology Evidence</h3>
          <p className="text-xs text-text-secondary/60 mt-0.5">
            Click any skill to inspect the exact resume lines and codebase repositories validating it.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((cat, idx) => (
          <div key={idx} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.01] space-y-3">
            <span className="text-[10.5px] font-bold text-text-secondary/50 uppercase tracking-widest font-mono block border-b border-white/[0.04] pb-2">
              {cat.category}
            </span>

            <div className="space-y-2">
              {cat.items.map((skill, sIdx) => {
                const badge = getStatusBadge(skill.status);
                const BadgeIcon = badge.icon;
                return (
                  <button
                    key={sIdx}
                    onClick={() => setSelectedSkill(skill)}
                    className="w-full p-2.5 rounded-lg border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 flex items-center justify-between transition-all text-left cursor-pointer group"
                  >
                    <span className="text-xs font-semibold text-white group-hover:text-primary transition-colors">
                      {skill.name}
                    </span>
                    <span
                      className={cn(
                        "text-[9.5px] px-2 py-0.5 rounded border font-mono flex items-center gap-1 shrink-0",
                        badge.className
                      )}
                    >
                      <BadgeIcon className="h-3 w-3" />
                      <span>{badge.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Skill Evidence Detail Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-lg rounded-xl border border-white/10 bg-[#0A0F24] p-6 shadow-2xl space-y-5 text-left"
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-base font-bold text-white">{selectedSkill.name}</h3>
                  {(() => {
                    const badge = getStatusBadge(selectedSkill.status);
                    return (
                      <span className={cn("text-[10px] px-2.5 py-0.5 rounded border font-mono", badge.className)}>
                        {badge.label}
                      </span>
                    );
                  })()}
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="p-1 rounded hover:bg-white/5 text-text-secondary/50 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                {/* Rationale explanation */}
                <div className="p-3 bg-white/[0.02] rounded-lg border border-white/[0.04] space-y-1">
                  <span className="text-[10px] font-bold text-primary uppercase font-mono block">
                    SkillLens Assessment
                  </span>
                  <p className="text-text-secondary/80 leading-relaxed">{selectedSkill.evidence.rationale}</p>
                </div>

                {/* Resume Evidence */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-text-secondary/60">
                    <FileText className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[10.5px] font-semibold uppercase font-mono">Resume Citation</span>
                  </div>
                  <blockquote className="border-l-2 border-primary/40 pl-3 py-1 text-white/90 bg-white/[0.01] rounded-r">
                    "{selectedSkill.evidence.resumeSnippet}"
                  </blockquote>
                </div>

                {/* Codebase Project Evidence */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-text-secondary/60">
                    <Code2 className="h-3.5 w-3.5 text-indigo-400" />
                    <span className="text-[10.5px] font-semibold uppercase font-mono">Repository Proof</span>
                  </div>
                  <div className="p-3 bg-[#050816] rounded-lg border border-white/[0.05] text-text-secondary/80 font-mono text-[11px]">
                    {selectedSkill.evidence.projectProof}
                  </div>
                </div>

                {selectedSkill.status === "Missing Evidence" && (
                  <div className="p-3 rounded-lg border border-rose-500/20 bg-rose-500/5 space-y-1 text-rose-300">
                    <div className="flex items-center gap-1.5 font-bold">
                      <Info className="h-3.5 w-3.5" />
                      <span>How to achieve Verified status</span>
                    </div>
                    <p className="text-[11px] text-rose-300/80">
                      Connect a GitHub repository containing active IaC manifests, Docker configurations, or production deployment scripts matching this technology.
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t border-white/[0.06] pt-3 flex justify-end">
                <button
                  onClick={() => setSelectedSkill(null)}
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
