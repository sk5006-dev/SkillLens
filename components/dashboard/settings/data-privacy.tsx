"use client";

import React from "react";
import { Download, Database, RotateCcw, AlertOctagon, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DataPrivacyProps {
  onExport: () => void;
  onDownloadReport: () => void;
  onResetAnalysis: () => void;
  onRestartOnboarding: () => void;
  onClearDemoData: () => void;
  onDeleteProfile: () => void;
  onDeleteWorkspaceData: () => void;
}

export function DataPrivacy({
  onExport,
  onDownloadReport,
  onResetAnalysis,
  onRestartOnboarding,
  onClearDemoData,
  onDeleteProfile,
  onDeleteWorkspaceData,
}: DataPrivacyProps) {
  return (
    <div className="space-y-6 text-left max-w-xl">
      <div className="space-y-1">
        <h3 className="text-base font-bold text-white tracking-tight">Data & Privacy</h3>
        <p className="text-xs text-text-secondary/70 leading-relaxed">
          Manage your telemetry history, export metadata files, or reset repository logs database.
        </p>
      </div>

      <div className="space-y-4 pt-1">
        {/* Exports */}
        <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.01] space-y-3.5 text-xs">
          <span className="font-bold text-white block">Download Data Records</span>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={onExport}
              className="h-8.5 px-4 rounded border border-white/10 hover:bg-white/5 text-[11px] font-semibold text-text-secondary hover:text-white flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export SkillLens JSON Data</span>
            </button>
            
            <button
              onClick={onDownloadReport}
              className="h-8.5 px-4 rounded border border-white/10 hover:bg-white/5 text-[11px] font-semibold text-text-secondary hover:text-white flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Intelligence PDF Report</span>
            </button>
          </div>
        </div>

        {/* Database Control */}
        <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.01] space-y-3.5 text-xs">
          <span className="font-bold text-white block">Database Diagnostics</span>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={onResetAnalysis}
              className="h-8.5 px-4 rounded border border-white/10 hover:bg-white/5 text-[11px] font-semibold text-text-secondary hover:text-white flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Dashboard Analysis</span>
            </button>

            <button
              onClick={onRestartOnboarding}
              className="h-8.5 px-4 rounded border border-white/10 hover:bg-white/5 text-[11px] font-semibold text-text-secondary hover:text-white flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Database className="h-3.5 w-3.5" />
              <span>Restart Setup Flow</span>
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="p-4 rounded-xl border border-danger/25 bg-danger/[0.02] space-y-3.5 text-xs">
          <div className="flex items-center gap-1.5">
            <AlertOctagon className="h-4 w-4 text-danger shrink-0" />
            <span className="font-bold text-danger">Danger Zone</span>
          </div>

          <p className="text-[10px] text-text-secondary/50 leading-relaxed">
            These operations erase profile metadata and connected repository sync history. These actions are irreversible.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <button
              onClick={onDeleteProfile}
              className="h-8.5 px-4 rounded border border-danger/20 bg-danger/5 hover:bg-danger/10 text-danger text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Reset Career Profile</span>
            </button>

            <button
              onClick={onDeleteWorkspaceData}
              className="h-8.5 px-4 rounded border border-danger/20 bg-danger/5 hover:bg-danger/10 text-danger text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Delete Workspace Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
