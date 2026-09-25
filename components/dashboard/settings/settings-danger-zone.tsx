"use client";

import React from "react";
import { AlertTriangle, Trash2, ShieldAlert } from "lucide-react";

interface SettingsDangerZoneProps {
  onResetWorkspace: () => void;
  onDeleteWorkspace: () => void;
}

export function SettingsDangerZone({ onResetWorkspace, onDeleteWorkspace }: SettingsDangerZoneProps) {
  const handleDeleteAccount = () => {
    alert("Account deletion is unavailable in demo mode.");
  };

  return (
    <div className="space-y-6 text-left max-w-xl">
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-danger">
          <AlertTriangle className="h-4.5 w-4.5 shrink-0" />
          <h3 className="text-base font-bold tracking-tight">Danger Zone</h3>
        </div>
        <p className="text-xs text-text-secondary/70 leading-relaxed">
          These operations erase profile metadata and connected repository sync history. These actions are irreversible.
        </p>
      </div>

      <div className="space-y-4 pt-1 text-xs">
        {/* Reset Workspace */}
        <div className="p-4 rounded-xl border border-danger/20 bg-danger/[0.01] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-0.5 max-w-[70%]">
            <span className="font-bold text-white block">Reset Workspace</span>
            <p className="text-[10.5px] text-text-secondary/50 leading-relaxed">
              Restores preferences, clears active target benchmarks, and resets roadmap progress logs.
            </p>
          </div>

          <button
            type="button"
            onClick={onResetWorkspace}
            className="h-8.5 px-4 rounded border border-danger/25 bg-danger/5 hover:bg-danger/10 text-danger text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer shrink-0 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Reset Workspace</span>
          </button>
        </div>

        {/* Delete Workspace Data */}
        <div className="p-4 rounded-xl border border-danger/20 bg-danger/[0.01] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-0.5 max-w-[70%]">
            <span className="font-bold text-white block">Delete Workspace Data</span>
            <p className="text-[10.5px] text-text-secondary/50 leading-relaxed">
              Permanently removes your SkillLens workspace data, profiles, and connected repository sync keys.
            </p>
          </div>

          <button
            type="button"
            onClick={onDeleteWorkspace}
            className="h-8.5 px-4 rounded border border-danger/25 bg-danger/5 hover:bg-danger/10 text-danger text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer shrink-0 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete Workspace Data</span>
          </button>
        </div>

        {/* Delete Account */}
        <div className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.005] opacity-60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-0.5 max-w-[70%]">
            <span className="font-bold text-white/80 block">Delete Account</span>
            <p className="text-[10.5px] text-text-secondary/40 leading-relaxed">
              Permanently deletes your SkillLens user account. Unavailable in demo environment.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDeleteAccount}
            className="h-8.5 px-4 rounded border border-white/10 bg-white/5 text-[11px] font-bold text-text-secondary/50 cursor-pointer shrink-0"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
