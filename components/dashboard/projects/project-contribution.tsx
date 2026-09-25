"use client";

import React from "react";
import { GitCommit, GitPullRequest, FileDiff, Activity } from "lucide-react";

export interface RecentCommit {
  hash: string;
  message: string;
  date: string;
  author: string;
}

export interface ContributionMetrics {
  commits: number;
  pullRequests: number;
  filesChanged: number;
  consistencyScore: number;
  recentActivityLevel: string;
  recentCommits: RecentCommit[];
}

interface ProjectContributionProps {
  metrics: ContributionMetrics;
}

export function ProjectContribution({ metrics }: ProjectContributionProps) {
  return (
    <div className="space-y-3.5 text-left">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
            Contribution & Codebase Activity
          </h4>
          <p className="text-[11px] text-text-secondary/60 mt-0.5">
            Commit history, pull request merges, and development frequency patterns.
          </p>
        </div>
      </div>

      {/* 4 compact metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.01]">
          <span className="text-[10px] text-text-secondary/50 font-mono block">Total Commits</span>
          <span className="text-base font-extrabold font-mono text-white mt-0.5 block">{metrics.commits}</span>
        </div>
        <div className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.01]">
          <span className="text-[10px] text-text-secondary/50 font-mono block">Pull Requests</span>
          <span className="text-base font-extrabold font-mono text-primary mt-0.5 block">{metrics.pullRequests}</span>
        </div>
        <div className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.01]">
          <span className="text-[10px] text-text-secondary/50 font-mono block">Files Changed</span>
          <span className="text-base font-extrabold font-mono text-cyan-400 mt-0.5 block">{metrics.filesChanged}</span>
        </div>
        <div className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.01]">
          <span className="text-[10px] text-text-secondary/50 font-mono block">Consistency</span>
          <span className="text-base font-extrabold font-mono text-emerald-400 mt-0.5 block">{metrics.consistencyScore}%</span>
        </div>
      </div>

      {/* Recent commits timeline */}
      <div className="space-y-2 pt-1">
        <span className="text-[10px] font-bold text-text-secondary/50 uppercase font-mono block">
          Recent Validated Commits
        </span>
        <div className="space-y-2">
          {metrics.recentCommits.map((c, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-lg border border-white/[0.04] bg-[#050816] flex items-center justify-between text-xs font-mono"
            >
              <div className="flex items-center gap-2 min-w-0 pr-2">
                <GitCommit className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="text-text-secondary/90 truncate">{c.message}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0 text-text-secondary/50 text-[10px]">
                <span className="text-primary/70">{c.hash}</span>
                <span>&bull;</span>
                <span>{c.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
