"use client";

import React from "react";
import { CheckCircle2, AlertCircle, HelpCircle, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ArchitectureSignal {
  signal: string;
  status: "Detected" | "Partial" | "Needs Evidence";
  evidencePath: string;
  explanation: string;
}

interface ProjectArchitectureProps {
  signals: ArchitectureSignal[];
}

export function ProjectArchitecture({ signals }: ProjectArchitectureProps) {
  const getSignalBadge = (status: ArchitectureSignal["status"]) => {
    switch (status) {
      case "Detected":
        return { label: "Detected", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", icon: CheckCircle2 };
      case "Partial":
        return { label: "Partial", className: "bg-amber-500/10 text-amber-400 border-amber-500/20", icon: AlertCircle };
      default:
        return { label: "Needs Evidence", className: "bg-rose-500/10 text-rose-400 border-rose-500/20", icon: HelpCircle };
    }
  };

  return (
    <div className="space-y-3 text-left">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
            Architecture Signals & System Design
          </h4>
          <p className="text-[11px] text-text-secondary/60 mt-0.5">
            Verified backend, infrastructure, reliability, and testing capabilities detected in repository structure.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {signals.map((sig, idx) => {
          const badge = getSignalBadge(sig.status);
          const BadgeIcon = badge.icon;

          return (
            <div
              key={idx}
              className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.01] space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{sig.signal}</span>
                <span className={cn("text-[9px] px-2 py-0.2 rounded border font-mono flex items-center gap-1", badge.className)}>
                  <BadgeIcon className="h-2.5 w-2.5" />
                  <span>{badge.label}</span>
                </span>
              </div>

              {sig.evidencePath !== "N/A" && (
                <div className="flex items-center gap-1 text-[10px] text-primary font-mono truncate">
                  <FileCode className="h-3 w-3 shrink-0" />
                  <span className="truncate">{sig.evidencePath}</span>
                </div>
              )}

              <p className="text-[11px] text-text-secondary/70 leading-relaxed">{sig.explanation}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
