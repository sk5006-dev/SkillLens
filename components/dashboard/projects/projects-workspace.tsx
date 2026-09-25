"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useOnboardingStore } from "@/store/onboarding-store";
import { ProjectsHeader } from "./projects-header";
import { ProjectHealthSummary } from "./project-health-summary";
import { ProjectList, ProjectSummary } from "./project-list";
import { ProjectDetailPanel, ProjectDetailData } from "./project-detail-panel";
import { ProjectComparisonDialog } from "./project-comparison-dialog";
import { ConnectRepositoryDialog } from "./connect-repository-dialog";
import { ProjectSyncDialog } from "./project-sync-dialog";
import { FolderGit2 } from "lucide-react";

export function ProjectsWorkspace() {
  const {
    targetCompany,
    targetRole,
    selectedProjectId,
    projectsLastSyncedAt,
    comparisonProjectIds,
    appliedProjectRecommendations,
    activeProjectFilter,
    projectSearchQuery,
    projectTechnologyFilter,
    projectSortBy,
    updateData,
    toggleComparisonProject,
  } = useOnboardingStore();

  // Local UI State
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [isSyncOpen, setIsSyncOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Fetch projects dataset on mount
  useEffect(() => {
    fetch("/data/projects-dashboard.json")
      .then((res) => res.json())
      .then((data) => setDashboardData(data))
      .catch(() => {});
  }, []);

  const projects: ProjectDetailData[] = dashboardData?.projects || [];
  const readiness = dashboardData?.portfolioReadiness || {
    score: 84,
    status: "Strong Engineering Evidence",
    summary: "Your strongest evidence comes from active Go, TypeScript, and backend microservice architectures.",
    strongEvidence: ["TypeScript", "React", "Node.js", "Go", "Docker", "API Design"],
    needsEvidence: ["Kubernetes", "Automated Integration Testing", "System Design Documentation"],
    metrics: {
      projectsAnalyzed: 5,
      technologiesDetected: 18,
      repositoriesVerified: 4,
      lastSynced: "10 minutes ago",
    },
  };

  // Currently selected project
  const selectedProject = useMemo(() => {
    return projects.find((p) => p.id === selectedProjectId) || projects[0] || null;
  }, [projects, selectedProjectId]);

  // Comparison projects
  const projectA = useMemo(() => {
    if (comparisonProjectIds.length < 1) return null;
    return projects.find((p) => p.id === comparisonProjectIds[0]) || null;
  }, [projects, comparisonProjectIds]);

  const projectB = useMemo(() => {
    if (comparisonProjectIds.length < 2) return null;
    return projects.find((p) => p.id === comparisonProjectIds[1]) || null;
  }, [projects, comparisonProjectIds]);

  // Handle sync completion
  const handleSyncComplete = () => {
    const now = new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    updateData({ projectsLastSyncedAt: `${now}` });
  };

  // Handle repository connection completion
  const handleConnectComplete = (repoName: string, provider: "github" | "gitlab" | "bitbucket") => {
    const now = new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    updateData({
      connectedGitSource: provider,
      projectsLastSyncedAt: `${now}`,
    });
  };

  // Handle applying project recommendation
  const handleApplyRecommendation = (actionId: string) => {
    const current = appliedProjectRecommendations || [];
    if (!current.includes(actionId)) {
      updateData({ appliedProjectRecommendations: [...current, actionId] });
    }
  };

  // Empty state if no projects
  if (dashboardData && projects.length === 0) {
    return (
      <div className="p-12 md:p-20 rounded-2xl border border-dashed border-white/10 bg-[#070B1E] text-center flex flex-col items-center justify-center space-y-4 my-6 text-left">
        <div className="h-14 w-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
          <FolderGit2 className="h-7 w-7" />
        </div>
        <div className="space-y-1 text-center max-w-md">
          <h3 className="text-base font-bold text-white">Connect your repositories</h3>
          <p className="text-xs text-text-secondary/70 leading-relaxed">
            SkillLens uses real code commits, Dockerfiles, and architecture patterns to prove your engineering claims.
          </p>
        </div>
        <button
          onClick={() => setIsConnectOpen(true)}
          className="h-10 px-5 rounded-lg bg-primary hover:bg-primary/90 text-background-primary text-xs font-bold transition-all shadow-sm cursor-pointer"
        >
          Connect Repository
        </button>

        <ConnectRepositoryDialog
          isOpen={isConnectOpen}
          onClose={() => setIsConnectOpen(false)}
          onConnectComplete={handleConnectComplete}
        />
      </div>
    );
  }

  return (
    <div className="space-y-7 text-left pb-12">
      {/* 1. Header with metadata and actions */}
      <ProjectsHeader
        projectsCount={readiness.metrics?.projectsAnalyzed || projects.length}
        technologiesCount={readiness.metrics?.technologiesDetected || 18}
        repositoriesVerified={readiness.metrics?.repositoriesVerified || 4}
        lastSyncedAt={projectsLastSyncedAt || "10 minutes ago"}
        comparisonCount={comparisonProjectIds.length}
        onConnectClick={() => setIsConnectOpen(true)}
        onSyncClick={() => setIsSyncOpen(true)}
        onCompareClick={() => setIsCompareOpen(true)}
      />

      {/* 2. Portfolio Readiness summary bar */}
      <ProjectHealthSummary
        score={readiness.score}
        status={readiness.status}
        summary={readiness.summary}
        strongEvidence={readiness.strongEvidence}
        needsEvidence={readiness.needsEvidence}
      />

      {/* 3. Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Left Column (Master Project List) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-text-secondary/70 font-mono">
              Engineering Repositories ({projects.length})
            </span>
          </div>

          <ProjectList
            projects={projects}
            selectedProjectId={selectedProject?.id || "api-gateway"}
            onSelectProject={(id) => updateData({ selectedProjectId: id })}
            searchQuery={projectSearchQuery || ""}
            onSearchChange={(q) => updateData({ projectSearchQuery: q })}
            activeFilter={activeProjectFilter || "All"}
            onFilterChange={(f) => updateData({ activeProjectFilter: f })}
            techFilter={projectTechnologyFilter || "All"}
            onTechFilterChange={(t) => updateData({ projectTechnologyFilter: t })}
            sortBy={projectSortBy || "Verification"}
            onSortByChange={(s) => updateData({ projectSortBy: s })}
            comparisonIds={comparisonProjectIds || []}
            onToggleCompare={(id) => toggleComparisonProject(id)}
          />
        </div>

        {/* Right Column (Detail Intelligence Workspace) */}
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-text-secondary/70 font-mono block">
            Project Evidence & Intelligence
          </span>

          {selectedProject ? (
            <ProjectDetailPanel
              project={selectedProject}
              targetCompany={targetCompany || "Stripe"}
              targetRole={targetRole || "Full Stack Engineer"}
              onApplyAction={handleApplyRecommendation}
              appliedActions={appliedProjectRecommendations || []}
            />
          ) : (
            <div className="p-12 rounded-xl border border-white/[0.06] bg-[#070B1E] text-center text-xs text-text-secondary/50">
              Select a project from the left list to inspect its engineering evidence.
            </div>
          )}
        </div>
      </div>

      {/* Modals & Dialogs */}
      <ConnectRepositoryDialog
        isOpen={isConnectOpen}
        onClose={() => setIsConnectOpen(false)}
        onConnectComplete={handleConnectComplete}
      />

      <ProjectSyncDialog
        isOpen={isSyncOpen}
        onClose={() => setIsSyncOpen(false)}
        onSyncComplete={handleSyncComplete}
      />

      <ProjectComparisonDialog
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        projectA={projectA}
        projectB={projectB}
      />
    </div>
  );
}
