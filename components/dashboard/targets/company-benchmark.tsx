"use client";

import React from "react";
import { TrendingUp, Award, Building2, Info } from "lucide-react";

interface CompanyBenchmarkProps {
  matchScore: number;
  roleBenchmark: number;
  companyBaseline: number;
  companyName: string;
  roleName: string;
  isCustomCompany?: boolean;
}

export function CompanyBenchmark({
  matchScore,
  roleBenchmark,
  companyBaseline,
  companyName,
  roleName,
  isCustomCompany = false,
}: CompanyBenchmarkProps) {
  const delta = matchScore - roleBenchmark;

  return (
    <div className="p-5 rounded-xl border border-white/[0.08] bg-white/[0.01] space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
            Hiring Bar & Benchmark Comparison
          </h4>
          <p className="text-[11px] text-text-secondary/60 mt-0.5">
            {isCustomCompany
              ? `Estimated simulated benchmark for ${companyName}`
              : `Calibrated benchmark data for ${companyName}`}
          </p>
        </div>
      </div>

      {/* 3 Metric Comparison Cards */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-3 rounded-lg border border-primary/20 bg-primary/5 space-y-0.5">
          <span className="text-[9.5px] text-primary uppercase font-mono block font-bold">
            Your Match
          </span>
          <span className="text-lg md:text-xl font-extrabold font-mono text-white block">
            {matchScore}%
          </span>
        </div>

        <div className="p-3 rounded-lg border border-white/[0.06] bg-[#050816] space-y-0.5">
          <span className="text-[9.5px] text-text-secondary/50 uppercase font-mono block">
            Role Benchmark
          </span>
          <span className="text-lg md:text-xl font-extrabold font-mono text-cyan-400 block">
            {roleBenchmark}%
          </span>
        </div>

        <div className="p-3 rounded-lg border border-white/[0.06] bg-[#050816] space-y-0.5">
          <span className="text-[9.5px] text-text-secondary/50 uppercase font-mono block">
            Company Baseline
          </span>
          <span className="text-lg md:text-xl font-extrabold font-mono text-text-secondary/80 block">
            {companyBaseline}%
          </span>
        </div>
      </div>

      {/* Qualitative assessment line */}
      <div className="p-3 rounded-lg border border-white/[0.04] bg-[#050816] text-xs text-text-secondary/80 flex items-start gap-2">
        <TrendingUp className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed text-[11.5px]">
          {delta >= 0 ? (
            <>
              You currently <strong className="text-emerald-400">exceed the estimated {roleName} benchmark</strong> by {delta} points. Your verified backend and systems evidence places you in the top candidate tier.
            </>
          ) : (
            <>
              You are currently <strong className="text-amber-400">{Math.abs(delta)} points below</strong> the typical {companyName} hiring bar for {roleName}. Closing your top skill gaps will bring you into competitive alignment.
            </>
          )}
        </p>
      </div>
    </div>
  );
}
