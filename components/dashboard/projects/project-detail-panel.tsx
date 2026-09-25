"use client";

import React, { useState } from "react";
import { ExternalLink, CheckCircle2, ShieldCheck, Target, Building2, HelpCircle, X, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ProjectEvidence, TechnologyEvidenceItem } from "./project-evidence";
import { ProjectArchitecture, ArchitectureSignal } from "./project-architecture";
import { ProjectContribution, ContributionMetrics } from "./project-contribution";
import { ProjectRecommendations, ProjectNextBestAction } from "./project-recommendations";

export interface ProjectDetailData {
  id: string;
  name: string;
  description: string;
  repository: string;
  visibility: string;
  primaryLanguage: string;
  technologies: string[];
  stars: number;
  forks: number;
  commits: number;
  pullRequests: number;
  filesChanged: number;
  lastUpdated: string;
  verification: {
    score: number;
    status: "Verified" | "Strong Evidence" | "Partial Evidence" | "Limited Evidence";
    confidence: number;
    evidenceCount: number;
  };
  technicalDepth: {
    complexity: number;
    architecture: number;
    codeQuality: number;
    testing: number;
    documentation: number;
    activity: number;
  };
  whatThisProjectProves: string[];
  technologyEvidence: TechnologyEvidenceItem[];
  architectureSignals: ArchitectureSignal[];
  contributionMetrics: ContributionMetrics;
  strengths: string[];
  weaknesses: string[];
  nextBestAction: ProjectNextBestAction;
}

interface ProjectDetailPanelProps {
  project: ProjectDetailData;
  targetCompany: string;
  targetRole: string;
  onApplyAction: (actionId: string) => void;
  appliedActions?: string[];
}

export function ProjectDetailPanel({
  project,
  targetCompany,
  targetRole,
  onApplyAction,
  appliedActions = [],
}: ProjectDetailPanelProps) {
  const [showScoreExplanation, setShowScoreExplanation] = useState(false);

  // Dynamic Target Alignment calculation for this project
  const targetRelevance = React.useMemo(() => {
    const isBackendRole = targetRole.toLowerCase().includes("backend") || targetRole.toLowerCase().includes("software");
    const isFrontendRole = targetRole.toLowerCase().includes("frontend");
    
    if (project.id === "api-gateway") {
      return isBackendRole ? 94 : isFrontendRole ? 72 : 88;
    }
    if (project.id === "react-dashboard") {
      return isFrontendRole ? 96 : isBackendRole ? 70 : 86;
    }
    if (project.id === "distributed-cache") {
      return isBackendRole ? 92 : 65;
    }
    if (project.id === "task-orchestrator") {
      return isBackendRole ? 89 : 74;
    }
    return 80;
  }, [project.id, targetRole]);

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#070B1E] p-6 md:p-8 space-y-7 text-left shadow-lg">
      {/* 1. Project Header & Metadata */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/[0.06] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">{project.name}</h2>
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[9.5px] font-mono">
              {project.verification.status} &bull; {project.verification.confidence}% Confidence
            </Badge>
          </div>

          <p className="text-xs text-text-secondary/80 max-w-xl leading-relaxed">{project.description}</p>

          <a
            href={`https://${project.repository}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-primary hover:underline font-mono inline-flex items-center gap-1 mt-1"
          >
            <span>{project.repository}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className="text-right shrink-0">
          <span className="text-3xl font-extrabold font-mono text-primary">{project.verification.score}%</span>
          <span className="text-[10px] text-text-secondary/50 font-mono block">Verification Score</span>
        </div>
      </div>

      {/* 2. Technical Depth Quality Breakdown Bars */}
      <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.01] space-y-3">
        <div className="flex items-center justify-between border-b border-white/[0.04] pb-2">
          <span className="text-[10px] font-bold text-text-secondary/60 uppercase tracking-wider font-mono">
            Technical Quality Breakdown
          </span>
          <button
            onClick={() => setShowScoreExplanation(true)}
            className="text-[10px] text-text-secondary/50 hover:text-primary transition-colors flex items-center gap-1 font-mono cursor-pointer"
          >
            <span>Why this score?</span>
            <HelpCircle className="h-3 w-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
          {[
            { label: "Complexity", val: project.technicalDepth.complexity },
            { label: "Code Evidence", val: project.technicalDepth.codeQuality },
            { label: "Architecture", val: project.technicalDepth.architecture },
            { label: "Testing Coverage", val: project.technicalDepth.testing },
            { label: "Documentation", val: project.technicalDepth.documentation },
            { label: "Activity", val: project.technicalDepth.activity },
          ].map((bar, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-text-secondary/70">{bar.label}</span>
                <span className="font-mono text-white font-semibold">{bar.val}%</span>
              </div>
              <div className="h-1 w-full bg-white/[0.05] rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${bar.val}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. "What This Project Proves" */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
          What This Project Proves
        </h4>
        <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.01]">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-secondary/80">
            {project.whatThisProjectProves.map((claim, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{claim}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 4. Target Role Connection */}
      <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-primary font-mono text-[10px] font-bold uppercase">
            <Building2 className="h-3.5 w-3.5" />
            <span>Target Career Alignment</span>
          </div>
          <p className="text-xs font-semibold text-white">
            {targetCompany} &bull; {targetRole}
          </p>
          <p className="text-[11px] text-text-secondary/70">
            This project directly supports the core backend, concurrency, and containerization requirements of your target.
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="text-2xl font-extrabold font-mono text-primary">{targetRelevance}%</span>
          <span className="text-[9.5px] text-text-secondary/50 font-mono block">Role Relevance</span>
        </div>
      </div>

      {/* 5. Technology Evidence */}
      <ProjectEvidence technologies={project.technologyEvidence} projectName={project.name} />

      {/* 6. Architecture Signals */}
      <ProjectArchitecture signals={project.architectureSignals} />

      {/* 7. Contribution Metrics */}
      <ProjectContribution metrics={project.contributionMetrics} />

      {/* 8. Next Best Action */}
      <ProjectRecommendations
        nextBestAction={project.nextBestAction}
        onApplyAction={onApplyAction}
        appliedActions={appliedActions}
      />

      {/* Score Explanation Popover */}
      {showScoreExplanation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#0A0F24] p-5 shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h3 className="text-sm font-bold text-white">Verification Score Assessment</h3>
              <button
                onClick={() => setShowScoreExplanation(false)}
                className="p-1 rounded hover:bg-white/5 text-text-secondary/50 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-text-secondary/80 leading-relaxed bg-white/[0.02] p-3 rounded-lg border border-white/[0.04]">
              {project.name} achieves a {project.verification.score}% verification score due to high code evidence volume ({project.commits} commits), multi-stage Docker builds, and robust Go concurrency primitives. Testing coverage is the primary remaining growth area.
            </p>
            <div className="border-t border-white/[0.06] pt-3 flex justify-end">
              <button
                onClick={() => setShowScoreExplanation(false)}
                className="h-8 px-4 rounded bg-primary text-background-primary text-xs font-bold"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
