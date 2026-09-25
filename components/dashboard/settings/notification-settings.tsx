"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface NotificationPreferences {
  roadmapUpdates: boolean;
  targetScoreChanges: boolean;
  resumeAnalysisComplete: boolean;
  projectSyncComplete: boolean;
  weeklyProgressSummary: boolean;
}

interface NotificationSettingsProps {
  preferences: NotificationPreferences;
  onUpdate: (prefs: Partial<NotificationPreferences>) => void;
}

export function NotificationSettings({ preferences, onUpdate }: NotificationSettingsProps) {
  const groups = [
    {
      title: "Career Progress",
      items: [
        {
          key: "targetScoreChanges" as const,
          label: "Target score changes",
          desc: "Notify when benchmark alignment shifts relative to company targets.",
          val: preferences.targetScoreChanges,
          recommended: true,
        },
        {
          key: "roadmapUpdates" as const,
          label: "Roadmap milestone updates",
          desc: "Notify when repository evidence verifies learning tasks.",
          val: preferences.roadmapUpdates,
          recommended: true,
        },
        {
          key: "weeklyProgressSummary" as const,
          label: "Weekly progress summary",
          desc: "Chronological log summary reports delivered on Sundays.",
          val: preferences.weeklyProgressSummary,
          recommended: false,
        },
      ],
    },
    {
      title: "Analysis",
      items: [
        {
          key: "resumeAnalysisComplete" as const,
          label: "Resume analysis completed",
          desc: "Alerts when parsed skill matrices are updated.",
          val: preferences.resumeAnalysisComplete,
          recommended: false,
        },
        {
          key: "projectSyncComplete" as const,
          label: "Project sync completed",
          desc: "Alerts when Git codebase evidence indexes are refreshed.",
          val: preferences.projectSyncComplete,
          recommended: false,
        },
      ],
    },
  ];

  return (
    <div className="space-y-6 text-left max-w-xl">
      <div className="space-y-1">
        <h3 className="text-base font-bold text-white tracking-tight">Notification Settings</h3>
        <p className="text-xs text-text-secondary/70 leading-relaxed">
          Configure alerts and report frequencies for career intelligence updates.
        </p>
      </div>

      <div className="space-y-6 pt-1 text-xs">
        {groups.map((group) => (
          <div key={group.title} className="space-y-3">
            <span className="text-[10px] font-semibold text-text-secondary/40 uppercase tracking-wider block font-mono">
              {group.title}
            </span>

            <div className="space-y-3">
              {group.items.map((item) => (
                <div
                  key={item.key}
                  className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.01] flex items-center justify-between gap-4"
                >
                  <div className="space-y-0.5 max-w-[75%]">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{item.label}</span>
                      {item.recommended && (
                        <Badge className="bg-primary/20 text-primary border-primary/30 text-[9px] font-mono">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <p className="text-[11px] text-text-secondary/50 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onUpdate({ [item.key]: !item.val })}
                    className={cn(
                      "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                      item.val ? "bg-primary" : "bg-white/10"
                    )}
                  >
                    <span
                      className={cn(
                        "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                        item.val ? "translate-x-4" : "translate-x-0"
                      )}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
