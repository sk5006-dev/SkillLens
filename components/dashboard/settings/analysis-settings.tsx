"use client";

import React from "react";
import { FileSearch, GitBranch, RefreshCcw, ShieldAlert, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisSettingsProps {
  resumeAnalysisFrequency: string;
  githubSyncFrequency: string;
  automaticTargetRecalculation: boolean;
  prioritizeVerifiedEvidence: boolean;
  showBenchmarkDetails: boolean;
  onUpdate: (data: { resumeAnalysisFrequency?: string; githubSyncFrequency?: string; automaticTargetRecalculation?: boolean; prioritizeVerifiedEvidence?: boolean; showBenchmarkDetails?: boolean }) => void;
  onReset: () => void;
}

export function AnalysisSettings({
  resumeAnalysisFrequency,
  githubSyncFrequency,
  automaticTargetRecalculation,
  prioritizeVerifiedEvidence,
  showBenchmarkDetails,
  onUpdate,
  onReset,
}: AnalysisSettingsProps) {
  const resumeOptions = ["Manual", "Weekly", "After upload"];
  const githubOptions = ["Manual", "Daily", "Weekly"];

  return (
    <div className="space-y-6 text-left max-w-xl">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white tracking-tight">Analysis & Benchmarks</h3>
          <p className="text-xs text-text-secondary/70 leading-relaxed">
            Configure how SkillLens scans capabilities, syncs GitHub commits, and computes readiness.
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="text-[10.5px] font-mono text-text-secondary/50 hover:text-white flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset defaults</span>
        </button>
      </div>

      <div className="space-y-5 pt-1">
        {/* Resume Analysis Frequency */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-semibold text-text-secondary/50 uppercase tracking-wider block font-mono">
            Resume Analysis Frequency
          </label>
          <div className="relative">
            <FileSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/30" />
            <select
              value={resumeAnalysisFrequency}
              onChange={(e) => onUpdate({ resumeAnalysisFrequency: e.target.value })}
              className="h-10 w-full pl-10 pr-4 rounded-lg border border-white/10 bg-[#050816] focus:border-primary/50 text-xs text-white transition-all focus:outline-none appearance-none cursor-pointer"
            >
              {resumeOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-[#0A0F24]">
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* GitHub Sync Frequency */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-semibold text-text-secondary/50 uppercase tracking-wider block font-mono">
            GitHub Sync Frequency
          </label>
          <div className="relative">
            <GitBranch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/30" />
            <select
              value={githubSyncFrequency}
              onChange={(e) => onUpdate({ githubSyncFrequency: e.target.value })}
              className="h-10 w-full pl-10 pr-4 rounded-lg border border-white/10 bg-[#050816] focus:border-primary/50 text-xs text-white transition-all focus:outline-none appearance-none cursor-pointer"
            >
              {githubOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-[#0A0F24]">
                  {opt} syncs
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Recalculate target match */}
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.01]">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white block">Auto Target Recalculation</span>
            <span className="text-[10px] text-text-secondary/50 block">
              Refreshes readiness scores immediately upon verifying repository code proofs.
            </span>
          </div>

          <button
            type="button"
            onClick={() => onUpdate({ automaticTargetRecalculation: !automaticTargetRecalculation })}
            className={cn(
              "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
              automaticTargetRecalculation ? "bg-primary" : "bg-white/10"
            )}
          >
            <span
              className={cn(
                "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                automaticTargetRecalculation ? "translate-x-4" : "translate-x-0"
              )}
            />
          </button>
        </div>

        {/* Prioritize verified evidence */}
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.01]">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white block">Prioritize Verified Code Evidence</span>
            <span className="text-[10px] text-text-secondary/50 block">
              Gives higher score weight to verified repository commits over resume keyword occurrences.
            </span>
          </div>

          <button
            type="button"
            onClick={() => onUpdate({ prioritizeVerifiedEvidence: !prioritizeVerifiedEvidence })}
            className={cn(
              "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
              prioritizeVerifiedEvidence ? "bg-primary" : "bg-white/10"
            )}
          >
            <span
              className={cn(
                "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                prioritizeVerifiedEvidence ? "translate-x-4" : "translate-x-0"
              )}
            />
          </button>
        </div>

        {/* Benchmark Transparency */}
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.01]">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white block">Show Benchmark Calculation Share</span>
            <span className="text-[10px] text-text-secondary/50 block">
              Exposes exact weighting and delta equations inside the target intelligence metrics drawer.
            </span>
          </div>

          <button
            type="button"
            onClick={() => onUpdate({ showBenchmarkDetails: !showBenchmarkDetails })}
            className={cn(
              "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
              showBenchmarkDetails ? "bg-primary" : "bg-white/10"
            )}
          >
            <span
              className={cn(
                "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                showBenchmarkDetails ? "translate-x-4" : "translate-x-0"
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
