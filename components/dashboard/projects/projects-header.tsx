"use client";

import React from "react";
import { FolderGit2, RefreshCw, Plus, GitCompare, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectsHeaderProps {
  projectsCount: number;
  technologiesCount: number;
  repositoriesVerified: number;
  lastSyncedAt: string;
  comparisonCount: number;
  onConnectClick: () => void;
  onSyncClick: () => void;
  onCompareClick: () => void;
  isSyncing?: boolean;
}

export function ProjectsHeader({
  projectsCount,
  technologiesCount,
  repositoriesVerified,
  lastSyncedAt,
  comparisonCount,
  onConnectClick,
  onSyncClick,
  onCompareClick,
  isSyncing = false,
}: ProjectsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.06] text-left">
      <div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary font-mono">
            Portfolio Intelligence
          </span>
          <span className="h-3 w-[1px] bg-white/10" />
          <div className="flex items-center gap-1.5 text-[10.5px] text-text-secondary/60 font-mono">
            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
            <span>Verification active</span>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1 tracking-tight">
          Projects
        </h1>
        <p className="text-xs md:text-sm text-text-secondary/70 mt-1 max-w-2xl leading-relaxed">
          Verify the engineering evidence behind your technical skills, inspect code patterns, and evaluate project alignment against your target career.
        </p>

        <div className="flex flex-wrap items-center gap-2 mt-2.5 text-[11px] text-text-secondary/50 font-mono">
          <span>{projectsCount} projects analyzed</span>
          <span>&bull;</span>
          <span>{technologiesCount} technologies detected</span>
          <span>&bull;</span>
          <span>{repositoriesVerified} repositories verified</span>
          <span>&bull;</span>
          <span>Last synced: {lastSyncedAt}</span>
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        {comparisonCount > 0 && (
          <button
            onClick={onCompareClick}
            className="h-9 px-3.5 rounded-lg border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <GitCompare className="h-3.5 w-3.5" />
            <span>Compare ({comparisonCount}/2)</span>
          </button>
        )}

        <button
          onClick={onSyncClick}
          disabled={isSyncing}
          className="h-9 px-3.5 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer focus:outline-none disabled:opacity-50"
        >
          <RefreshCw className={cn("h-3.5 w-3.5 text-text-secondary/70", isSyncing && "animate-spin")} />
          <span>{isSyncing ? "Syncing..." : "Sync Projects"}</span>
        </button>

        <button
          onClick={onConnectClick}
          className="h-9 px-4 rounded-lg bg-primary hover:bg-primary/90 text-background-primary text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm focus:outline-none active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          <span>Connect Repository</span>
        </button>
      </div>
    </div>
  );
}
