"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

interface SettingsHeaderProps {
  profileComplete: boolean;
  targetCompany: string;
  targetRole: string;
  gitConnected: boolean;
  automationActive: boolean;
  lastSaved: string;
}

export function SettingsHeader({
  profileComplete,
  targetCompany,
  targetRole,
  gitConnected,
  automationActive,
  lastSaved,
}: SettingsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 pb-6 border-b border-white/[0.06] text-left">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary font-mono block">
          Control Center
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1 tracking-tight">
          Workspace Settings
        </h1>
        <p className="text-xs md:text-sm text-text-secondary/70 mt-1 max-w-2xl leading-relaxed">
          Configure how SkillLens analyzes your career data and personalizes your workspace.
        </p>
      </div>

      {/* Compact Status Metadata Row */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2.5 border-t border-white/[0.04] text-[10.5px] font-mono text-text-secondary/60">
        <div className="flex items-center gap-1.5">
          <span>Profile:</span>
          <span className={profileComplete ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
            {profileComplete ? "Complete" : "Incomplete"}
          </span>
        </div>

        <span className="text-white/20 hidden sm:inline">&bull;</span>

        <div className="flex items-center gap-1.5">
          <span>Current Target:</span>
          <span className="text-white font-bold">{targetRole} @ {targetCompany}</span>
        </div>

        <span className="text-white/20 hidden sm:inline">&bull;</span>

        <div className="flex items-center gap-1.5">
          <span>Git Provider:</span>
          <span className={gitConnected ? "text-primary font-bold" : "text-text-secondary/30"}>
            {gitConnected ? "Connected" : "Not Connected"}
          </span>
        </div>

        <span className="text-white/20 hidden sm:inline">&bull;</span>

        <div className="flex items-center gap-1.5">
          <span>Automation:</span>
          <span className={automationActive ? "text-cyan-400 font-bold" : "text-text-secondary/30"}>
            {automationActive ? "Active" : "Paused"}
          </span>
        </div>

        <span className="text-white/20 hidden sm:inline">&bull;</span>

        <div className="flex items-center gap-1.5">
          <span>Last Saved:</span>
          <span className="text-white font-bold">{lastSaved}</span>
        </div>
      </div>
    </div>
  );
}
