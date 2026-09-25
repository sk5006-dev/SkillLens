"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, HelpCircle, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface PrivacyPreferences {
  profileVisibility: string;
  repositoryAnalysisPermission: boolean;
  analyticsSharing: boolean;
  dataRetention: string;
}

interface PrivacySettingsProps {
  preferences: PrivacyPreferences;
  onUpdate: (prefs: Partial<PrivacyPreferences>) => void;
}

export function PrivacySettings({ preferences, onUpdate }: PrivacySettingsProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  const visibilities = ["Private", "Internal Team Only", "Public Portfolio Link"];
  const retentions = ["30 Days", "90 Days", "Keep Indefinitely"];

  return (
    <div className="space-y-6 text-left max-w-xl">
      <div className="space-y-1">
        <h3 className="text-base font-bold text-white tracking-tight">Privacy & Data</h3>
        <p className="text-xs text-text-secondary/70 leading-relaxed">
          Manage how your telemetry history and profile metadata are exposed and retained.
        </p>
      </div>

      {/* Expandable Explanation Box */}
      <div className="rounded-xl border border-white/[0.06] bg-[#050816] overflow-hidden text-xs">
        <button
          type="button"
          onClick={() => setShowExplanation(!showExplanation)}
          className="w-full p-4 flex items-center justify-between text-left text-white hover:bg-white/[0.01] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4.5 w-4.5 text-primary" />
            <span className="font-semibold">How your data is used</span>
          </div>
          <ChevronDown className={cn("h-4 w-4 text-text-secondary/40 transition-transform", showExplanation && "rotate-180")} />
        </button>

        {showExplanation && (
          <div className="px-4 pb-4 text-text-secondary/70 space-y-2 leading-relaxed border-t border-white/[0.04] pt-3.5">
            <p>
              These settings control how SkillLens uses profile, resume, repository, and analytics information within the application.
            </p>
            <p>
              Your source code repositories are parsed strictly locally inside memory buffers. Raw code files are never cloned, cached, or persisted on public servers.
            </p>
          </div>
        )}
      </div>

      <div className="space-y-4 pt-1 text-xs">
        {/* Profile Visibility */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-semibold text-text-secondary/50 uppercase tracking-wider block font-mono">
            Profile Visibility
          </label>
          <select
            value={preferences.profileVisibility}
            onChange={(e) => onUpdate({ profileVisibility: e.target.value })}
            className="h-10 w-full px-3 rounded-lg border border-white/10 bg-[#050816] focus:border-primary/50 text-xs text-white transition-all focus:outline-none appearance-none cursor-pointer"
          >
            {visibilities.map((v) => (
              <option key={v} value={v} className="bg-[#0A0F24]">
                {v}
              </option>
            ))}
          </select>
        </div>

        {/* Repository Analysis Toggle */}
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.01]">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white block">Repository Analysis Permission</span>
            <span className="text-[10px] text-text-secondary/50 block">
              Allows background tasks to map skill evidence commits inside repositories.
            </span>
          </div>

          <button
            type="button"
            onClick={() => onUpdate({ repositoryAnalysisPermission: !preferences.repositoryAnalysisPermission })}
            className={cn(
              "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
              preferences.repositoryAnalysisPermission ? "bg-primary" : "bg-white/10"
            )}
          >
            <span
              className={cn(
                "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                preferences.repositoryAnalysisPermission ? "translate-x-4" : "translate-x-0"
              )}
            />
          </button>
        </div>

        {/* Analytics Sharing Toggle */}
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.01]">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white block">Analytics Sharing</span>
            <span className="text-[10px] text-text-secondary/50 block">
              Share anonymous usage metrics to improve compatibility scoring formulas.
            </span>
          </div>

          <button
            type="button"
            onClick={() => onUpdate({ analyticsSharing: !preferences.analyticsSharing })}
            className={cn(
              "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
              preferences.analyticsSharing ? "bg-primary" : "bg-white/10"
            )}
          >
            <span
              className={cn(
                "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                preferences.analyticsSharing ? "translate-x-4" : "translate-x-0"
              )}
            />
          </button>
        </div>

        {/* Data Retention */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-semibold text-text-secondary/50 uppercase tracking-wider block font-mono">
            Data Retention Timeline
          </label>
          <select
            value={preferences.dataRetention}
            onChange={(e) => onUpdate({ dataRetention: e.target.value })}
            className="h-10 w-full px-3 rounded-lg border border-white/10 bg-[#050816] focus:border-primary/50 text-xs text-white transition-all focus:outline-none appearance-none cursor-pointer"
          >
            {retentions.map((r) => (
              <option key={r} value={r} className="bg-[#0A0F24]">
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
