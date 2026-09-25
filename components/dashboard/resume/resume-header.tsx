"use client";

import React from "react";
import { UploadCloud, FileDown, RefreshCw, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResumeHeaderProps {
  lastAnalyzedAt: string | null;
  onReAnalyze: () => void;
  onUploadClick: () => void;
  onDownloadReport: () => void;
  isReanalyzing?: boolean;
}

export function ResumeHeader({
  lastAnalyzedAt,
  onReAnalyze,
  onUploadClick,
  onDownloadReport,
  isReanalyzing = false,
}: ResumeHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.06] text-left">
      <div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary font-mono">
            Intelligence Workspace
          </span>
          <span className="h-3 w-[1px] bg-white/10" />
          <div className="flex items-center gap-1.5 text-[10.5px] text-text-secondary/60 font-mono">
            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
            <span>Analysis complete</span>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1 tracking-tight">
          Resume Intelligence
        </h1>
        <p className="text-xs md:text-sm text-text-secondary/70 mt-1 max-w-2xl leading-relaxed">
          Understand how your resume performs against your target benchmarks, verify detected skills with codebase evidence, and apply high-impact improvements.
        </p>

        {lastAnalyzedAt && (
          <div className="flex items-center gap-2 mt-2 text-[11px] text-text-secondary/50 font-mono">
            <span>Last analyzed: {lastAnalyzedAt}</span>
            <span>&bull;</span>
            <button
              onClick={onReAnalyze}
              disabled={isReanalyzing}
              className="text-primary hover:underline font-semibold flex items-center gap-1 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={cn("h-3 w-3", isReanalyzing && "animate-spin")} />
              <span>{isReanalyzing ? "Re-analyzing..." : "Re-analyze"}</span>
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={onDownloadReport}
          className="h-9 px-3.5 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <FileDown className="h-3.5 w-3.5 text-text-secondary/70" />
          <span>Download Report</span>
        </button>

        <button
          onClick={onUploadClick}
          className="h-9 px-4 rounded-lg bg-primary hover:bg-primary/90 text-background-primary text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <UploadCloud className="h-4 w-4" />
          <span>Upload New Resume</span>
        </button>
      </div>
    </div>
  );
}
