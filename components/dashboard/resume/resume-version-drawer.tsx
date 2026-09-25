"use client";

import React, { useState } from "react";
import { History, X, CheckCircle2, ArrowRight, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ResumeVersion {
  id: string;
  label: string;
  date: string;
  score: number;
  atsScore: number;
  targetAlignment: number;
  status: string;
  changes: string;
  skillsDelta: {
    added: string[];
    removed: string[];
  };
}

interface VersionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  versions: ResumeVersion[];
  activeVersionId: string;
  onSelectVersion: (versionId: string) => void;
}

export function ResumeVersionDrawer({
  isOpen,
  onClose,
  versions,
  activeVersionId,
  onSelectVersion,
}: VersionDrawerProps) {
  const [selectedVersion, setSelectedVersion] = useState<ResumeVersion>(
    versions.find((v) => v.id === activeVersionId) || versions[0]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md h-full bg-[#0A0F24] border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto space-y-6 text-left shadow-2xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <History className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-bold text-white">Resume Version History</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/5 text-text-secondary/50 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Versions List */}
          <div className="space-y-2.5">
            {versions.map((ver) => {
              const isSelected = selectedVersion.id === ver.id;
              const isActive = activeVersionId === ver.id;

              return (
                <button
                  key={ver.id}
                  onClick={() => setSelectedVersion(ver)}
                  className={cn(
                    "w-full p-4 rounded-xl border transition-all text-left flex items-center justify-between cursor-pointer",
                    isSelected
                      ? "border-primary/40 bg-primary/10"
                      : "border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03]"
                  )}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{ver.label}</span>
                      {isActive && (
                        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[9px] font-mono">
                          Active
                        </Badge>
                      )}
                    </div>
                    <span className="text-[10.5px] text-text-secondary/50 font-mono mt-0.5 block">{ver.date}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-bold font-mono text-white">{ver.score}%</span>
                    <span className="text-[9.5px] text-text-secondary/50 block">Health score</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Version Detail Diff */}
          <div className="p-4 rounded-xl border border-white/[0.06] bg-[#050816] space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-2">
              <span className="text-[10px] font-bold text-text-secondary/50 uppercase font-mono">
                Version Snapshot Detail
              </span>
              <span className="font-mono text-primary font-bold">{selectedVersion.label}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[9px] text-text-secondary/50 block">Score</span>
                <span className="text-sm font-bold font-mono text-white">{selectedVersion.score}%</span>
              </div>
              <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[9px] text-text-secondary/50 block">ATS</span>
                <span className="text-sm font-bold font-mono text-emerald-400">{selectedVersion.atsScore}%</span>
              </div>
              <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[9px] text-text-secondary/50 block">Target Fit</span>
                <span className="text-sm font-bold font-mono text-indigo-400">{selectedVersion.targetAlignment}%</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-text-secondary/50 uppercase font-mono block">
                Recorded Changes
              </span>
              <p className="text-text-secondary/80 leading-relaxed text-[11.5px]">{selectedVersion.changes}</p>
            </div>

            {selectedVersion.skillsDelta.added.length > 0 && (
              <div className="space-y-1 pt-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase font-mono block">
                  Skills Introduced
                </span>
                <div className="flex flex-wrap gap-1">
                  {selectedVersion.skillsDelta.added.map((s, idx) => (
                    <Badge key={idx} variant="outline" className="text-[9px] font-mono border-emerald-500/30 text-emerald-300">
                      +{s}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded-lg border border-white/10 hover:bg-white/5 text-xs text-text-secondary font-semibold"
          >
            Close
          </button>
          <button
            onClick={() => {
              onSelectVersion(selectedVersion.id);
              onClose();
            }}
            className="h-9 px-5 rounded-lg bg-primary hover:bg-primary/90 text-background-primary text-xs font-bold transition-all shadow-sm"
          >
            Load This Snapshot
          </button>
        </div>
      </div>
    </div>
  );
}
