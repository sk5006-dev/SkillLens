"use client";

import React from "react";
import { Download, RotateCcw, Database, AlertCircle } from "lucide-react";

interface DataManagementProps {
  onExport: () => void;
  onResetPreferences: () => void;
  onClearDemoData: () => void;
  onRestartOnboarding: () => void;
}

export function DataManagement({
  onExport,
  onResetPreferences,
  onClearDemoData,
  onRestartOnboarding,
}: DataManagementProps) {
  const actions = [
    {
      title: "Export My Data",
      desc: "Downloads a complete backup JSON file of your SkillLens profiles, target parameters, and milestone progress log.",
      btnLabel: "Export JSON",
      handler: onExport,
      icon: Download,
    },
    {
      title: "Reset Preferences",
      desc: "Restores workspace preferences to their defaults without deleting resume analysis, projects, roadmap progress, or growth history.",
      btnLabel: "Reset Preferences",
      handler: onResetPreferences,
      icon: RotateCcw,
    },
    {
      title: "Clear Demo Data",
      desc: "Clears temporary caching storage files instantly. The application will refresh to the onboarding stage.",
      btnLabel: "Clear cache",
      handler: onClearDemoData,
      icon: AlertCircle,
    },
    {
      title: "Re-run Onboarding",
      desc: "Review your initial career goals and candidate configurations without erasing target scores or verified repository projects.",
      btnLabel: "Re-run",
      handler: onRestartOnboarding,
      icon: Database,
    },
  ];

  return (
    <div className="space-y-6 text-left max-w-xl">
      <div className="space-y-1">
        <h3 className="text-base font-bold text-white tracking-tight">Data Management</h3>
        <p className="text-xs text-text-secondary/70 leading-relaxed">
          Manage system configurations, backup records, and reset workspace parameters.
        </p>
      </div>

      <div className="space-y-4 pt-1 text-xs">
        {actions.map((act, idx) => {
          const Icon = act.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.01] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-0.5 max-w-[70%]">
                <span className="font-bold text-white block">{act.title}</span>
                <p className="text-[10.5px] text-text-secondary/50 leading-relaxed">
                  {act.desc}
                </p>
              </div>

              <button
                type="button"
                onClick={act.handler}
                className="h-8.5 px-4 rounded border border-white/10 bg-[#050816] hover:bg-white/5 text-[11px] font-bold text-text-secondary hover:text-white flex items-center justify-center gap-1.5 cursor-pointer shrink-0 transition-colors"
              >
                <Icon className="h-3.5 w-3.5 text-text-secondary/70" />
                <span>{act.btnLabel}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
