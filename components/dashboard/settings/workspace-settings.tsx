"use client";

import React, { useState } from "react";
import { Sidebar, Play } from "lucide-react";

interface WorkspaceSettingsProps {
  workspaceName: string;
  onboardingCompleted: boolean;
  lastSync: string;
  targetCompany: string;
  targetRole: string;
  connectedProvider: string;
  onUpdate: (data: { workspaceName?: string }) => void;
  onRestartOnboarding: () => void;
}

export function WorkspaceSettings({
  workspaceName,
  onboardingCompleted,
  lastSync,
  targetCompany,
  targetRole,
  connectedProvider,
  onUpdate,
  onRestartOnboarding,
}: WorkspaceSettingsProps) {
  const [localName, setLocalName] = useState(workspaceName);

  return (
    <div className="space-y-6 text-left max-w-xl">
      <div className="space-y-1">
        <h3 className="text-base font-bold text-white tracking-tight">Workspace Preferences</h3>
        <p className="text-xs text-text-secondary/70 leading-relaxed">
          Manage workspace settings, names, and review initial profile setup onboarding parameters.
        </p>
      </div>

      <div className="space-y-4 pt-1 text-xs">
        {/* Workspace Name */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-semibold text-text-secondary/50 uppercase tracking-wider block font-mono">
            Workspace Name
          </label>
          <input
            type="text"
            value={localName}
            onChange={(e) => {
              setLocalName(e.target.value);
              onUpdate({ workspaceName: e.target.value });
            }}
            className="h-10 w-full px-4 rounded-lg border border-white/10 bg-white/[0.01] focus:border-primary/50 text-xs text-white placeholder-text-secondary/30 transition-all focus:outline-none"
            placeholder="Workspace Name"
          />
        </div>

        {/* Metadata Details */}
        <div className="p-3.5 rounded-xl border border-white/[0.06] bg-[#050816] space-y-2.5 font-mono text-[10.5px] text-text-secondary/60">
          <div className="flex justify-between">
            <span>Onboarding Status:</span>
            <span className={onboardingCompleted ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
              {onboardingCompleted ? "Completed" : "Incomplete"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Last Synchronization:</span>
            <span className="text-white font-bold">{lastSync}</span>
          </div>
          <div className="flex justify-between">
            <span>Active target:</span>
            <span className="text-white font-bold">{targetRole} @ {targetCompany}</span>
          </div>
          <div className="flex justify-between">
            <span>Connected Git Host:</span>
            <span className="text-primary font-bold">{connectedProvider}</span>
          </div>
        </div>

        {/* Re-run Onboarding */}
        <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.01] space-y-3">
          <div className="space-y-0.5">
            <span className="font-bold text-white block">Re-run Initial Setup Onboarding</span>
            <p className="text-[10.5px] text-text-secondary/50 leading-relaxed">
              Launches the step-by-step setup guides to update target goals or resume configurations.
            </p>
          </div>

          <button
            type="button"
            onClick={onRestartOnboarding}
            className="h-8.5 px-4 rounded border border-white/10 hover:bg-white/5 text-[11px] font-bold text-text-secondary hover:text-white flex items-center gap-1.5 cursor-pointer"
          >
            <Play className="h-3 w-3 text-text-secondary/70" />
            <span>Re-run Onboarding</span>
          </button>
        </div>
      </div>
    </div>
  );
}
