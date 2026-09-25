"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useOnboardingStore } from "@/store/onboarding-store";
import { RoadmapHeader } from "./roadmap-header";
import { RoadmapOverview } from "./roadmap-overview";
import { RoadmapHealth } from "./roadmap-health";
import { RoadmapNextAction } from "./roadmap-next-action";
import { RoadmapPriorityGaps, PriorityGapItem } from "./roadmap-priority-gaps";
import { RoadmapCurrentWeek, CurrentWeekTask } from "./roadmap-current-week";
import { RoadmapTimeline, RoadmapWeekSchedule } from "./roadmap-timeline";
import { RoadmapMilestoneData } from "./roadmap-milestone";
import { RoadmapTaskDrawer } from "./roadmap-task-drawer";
import { RoadmapVerificationDialog } from "./roadmap-verification-dialog";
import { RoadmapProgress } from "./roadmap-progress";
import { RoadmapSummary } from "./roadmap-summary";
import { CheckCircle2, RefreshCw } from "lucide-react";

interface RoadmapWorkspaceProps {
  onNavigateTab?: (tab: string) => void;
}

export function RoadmapWorkspace({ onNavigateTab }: RoadmapWorkspaceProps) {
  const {
    targetCompany,
    targetRole,
    targetMatchScore,
    completedRoadmapTasks,
    inProgressRoadmapTasks,
    verifiedRoadmapTasks,
    submittedEvidenceTasks,
    activeRoadmapFilter,
    weeklyAvailability,
    roadmapHealth,
    appliedRoadmapScoreBoost,
    roadmapTargetSnapshot,
    setMilestoneStatus,
    submitMilestoneEvidence,
    verifyMilestone,
    setWeeklyAvailability,
    updateData,
  } = useOnboardingStore();

  const [roadmapData, setRoadmapData] = useState<any>(null);
  const [activeTaskDrawerId, setActiveTaskDrawerId] = useState<string | null>(null);
  const [activeVerificationId, setActiveVerificationId] = useState<string | null>(null);
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [targetChangeNotice, setTargetChangeNotice] = useState<string | null>(null);

  // Fetch mock roadmap dataset
  useEffect(() => {
    fetch("/data/roadmap-dashboard.json")
      .then((res) => res.json())
      .then((data) => setRoadmapData(data))
      .catch(() => {});
  }, []);

  // Detect target changes and adaptively trigger recalculation
  useEffect(() => {
    if (
      roadmapTargetSnapshot &&
      (roadmapTargetSnapshot.company !== targetCompany ||
        roadmapTargetSnapshot.role !== targetRole)
    ) {
      setIsRecalculating(true);
      setTargetChangeNotice(`Roadmap updated for ${targetRole} @ ${targetCompany}`);
      const timer = setTimeout(() => {
        setIsRecalculating(false);
        updateData({
          roadmapTargetSnapshot: { company: targetCompany, role: targetRole },
          roadmapLastRecalculatedAt: "Just now",
        });
      }, 700);

      const clearNotice = setTimeout(() => setTargetChangeNotice(null), 4000);
      return () => {
        clearTimeout(timer);
        clearTimeout(clearNotice);
      };
    }
  }, [targetCompany, targetRole, roadmapTargetSnapshot, updateData]);

  // Compute active roadmap configuration based on company/role
  const activePlan = useMemo(() => {
    const isGoogle = targetCompany.toLowerCase().includes("google");
    const isStripe = targetCompany.toLowerCase().includes("stripe");

    let base = roadmapData?.roadmaps?.["stripe-full-stack"];
    if (isGoogle) {
      base = roadmapData?.roadmaps?.["google-backend"] || base;
    } else if (!isStripe && roadmapData?.roadmaps?.["default-custom"]) {
      base = roadmapData?.roadmaps?.["default-custom"];
    }

    const currentScore = targetMatchScore || 92;
    const projectedScore = Math.min(currentScore + 5, 99);

    // Calculate duration based on weekly availability (e.g. 10h -> 6 weeks, 20h -> 4 weeks, 5h -> 8 weeks)
    const hours = weeklyAvailability || 10;
    const estimatedWeeks = Math.max(Math.round((base?.totalEstimatedHours || 36) / hours), 3);

    // Build milestones with live state
    const rawMilestones: any[] = base?.milestones || [];
    const milestones: RoadmapMilestoneData[] = rawMilestones.map((m) => {
      let status: RoadmapMilestoneData["status"] = "Not Started";
      if (verifiedRoadmapTasks.includes(m.id)) {
        status = "Verified";
      } else if (submittedEvidenceTasks[m.id]) {
        status = "Evidence Submitted";
      } else if (inProgressRoadmapTasks.includes(m.id)) {
        status = "In Progress";
      }

      // Check dependency status
      let isBlocked = false;
      let blockedByTitle = "";
      if (m.dependencies && m.dependencies.length > 0) {
        const depId = m.dependencies[0];
        const depVerified = verifiedRoadmapTasks.includes(depId);
        if (!depVerified) {
          isBlocked = true;
          const depObj = rawMilestones.find((x) => x.id === depId);
          blockedByTitle = depObj ? depObj.title : "Prerequisite Milestone";
        }
      }

      return {
        ...m,
        status,
        isBlocked,
        blockedByTitle,
      };
    });

    // 6-Week timeline schedules
    const weeks: RoadmapWeekSchedule[] = [
      {
        weekNumber: 1,
        title: "Foundation & Core Engineering",
        theme: "TypeScript & Data Contracts",
        status: "Completed",
        milestones: milestones.filter((m) => m.week === 1),
      },
      {
        weekNumber: 2,
        title: "Infrastructure & Production Engineering",
        theme: "Kubernetes & CI/CD Pipelines",
        status: "Current",
        milestones: milestones.filter((m) => m.week === 2),
      },
      {
        weekNumber: 3,
        title: "System Design & Concurrency",
        theme: "Distributed Consensus & Rate Limiting",
        status: "Upcoming",
        milestones: milestones.filter((m) => m.week === 3),
      },
      {
        weekNumber: 4,
        title: "Reliability & Observability",
        theme: "OpenTelemetry & Prometheus",
        status: "Upcoming",
        milestones: milestones.filter((m) => m.week === 4),
      },
      {
        weekNumber: 5,
        title: "Evidence & Portfolio Packaging",
        theme: "Documentation & Benchmarks",
        status: "Upcoming",
        milestones: milestones.filter((m) => m.week === 5),
      },
      {
        weekNumber: 6,
        title: "Final Target Calibration",
        theme: "Interview Preparation",
        status: "Upcoming",
        milestones: milestones.filter((m) => m.week === 6),
      },
    ];

    // Priority capability gaps
    const gaps: PriorityGapItem[] = [
      {
        id: "gap-1",
        skill: "Kubernetes",
        category: "Infrastructure",
        priority: "Critical",
        projectedImpact: 3,
        estimatedHours: 6,
        currentLevel: "Intermediate",
        targetLevel: "Advanced",
        milestoneId: "ms-k8s-deploy",
      },
      {
        id: "gap-2",
        skill: "Distributed Systems",
        category: "Architecture",
        priority: "Critical",
        projectedImpact: 4,
        estimatedHours: 8,
        currentLevel: "Intermediate",
        targetLevel: "Advanced",
        milestoneId: "ms-dist-consensus",
      },
      {
        id: "gap-3",
        skill: "CI/CD Automation",
        category: "Infrastructure",
        priority: "High",
        projectedImpact: 2,
        estimatedHours: 4,
        currentLevel: "Partial",
        targetLevel: "Advanced",
        milestoneId: "ms-cicd-pipeline",
      },
      {
        id: "gap-4",
        skill: "OpenTelemetry",
        category: "Architecture",
        priority: "Medium",
        projectedImpact: 2,
        estimatedHours: 5,
        currentLevel: "Beginner",
        targetLevel: "Advanced",
        milestoneId: "ms-telemetry-otel",
      },
    ];

    // Next Best Action milestone
    const nextActionMilestone = milestones.find((m) => m.id === "ms-k8s-deploy") || milestones[0] || {
      id: "ms-k8s-deploy",
      title: "Build Kubernetes Deployment & Service Manifests",
      skill: "Kubernetes",
      estimatedHours: 6,
      projectedScoreImpact: 3,
      whyItMatters: "Stripe expects production container orchestration proof. Adding Helm manifests to api-gateway completes verified code proof.",
      evidenceRequired: ["k8s/deployment.yaml", "k8s/service.yaml", "helm/api-gateway/Chart.yaml"],
      status: "In Progress",
      currentMatch: currentScore,
    };

    // Active Week 2 tasks
    const currentWeekTasks: CurrentWeekTask[] = milestones
      .filter((m) => m.week === 2)
      .map((m) => ({
        id: m.id,
        title: m.title,
        skill: m.skill,
        estimatedHours: m.estimatedHours,
        projectedScoreImpact: m.projectedScoreImpact,
        priority: m.priority,
        status: m.status,
        week: m.week,
      }));

    return {
      currentScore,
      projectedScore,
      estimatedWeeks,
      milestones,
      weeks,
      gaps,
      nextActionMilestone: { ...nextActionMilestone, currentMatch: currentScore },
      currentWeekTasks,
      totalHours: base?.totalEstimatedHours || 36,
    };
  }, [
    roadmapData,
    targetCompany,
    targetRole,
    targetMatchScore,
    weeklyAvailability,
    verifiedRoadmapTasks,
    submittedEvidenceTasks,
    inProgressRoadmapTasks,
  ]);

  // Recalculate simulation handler
  const handleRecalculate = () => {
    setIsRecalculating(true);
    setTimeout(() => {
      setIsRecalculating(false);
      setTargetChangeNotice(`Roadmap recalibrated for ${targetRole} @ ${targetCompany}`);
      setTimeout(() => setTargetChangeNotice(null), 3000);
    }, 600);
  };

  // Milestone Actions
  const handleStartMilestone = (id: string) => {
    setMilestoneStatus(id, "In Progress");
  };

  const handleSubmitEvidence = (id: string) => {
    submitMilestoneEvidence(id, {
      repo: "api-gateway",
      files: ["k8s/deployment.yaml", "k8s/service.yaml", "helm/api-gateway/Chart.yaml"],
      notes: "Added production Kubernetes manifests and automated resource limits.",
    });
    setActiveTaskDrawerId(null);
    setActiveVerificationId(id);
  };

  const handleConfirmVerification = (taskId: string, impact: number) => {
    verifyMilestone(taskId, impact);
  };

  const inspectedMilestone = activePlan.milestones.find((m) => m.id === activeTaskDrawerId) || null;
  const verifyingMilestone = activePlan.milestones.find((m) => m.id === activeVerificationId) || null;

  return (
    <div className="space-y-7 text-left pb-12">
      {/* 1. Header with Targets Metadata and Recalculate Actions */}
      <RoadmapHeader
        targetCompany={targetCompany}
        targetRole={targetRole}
        currentMatch={activePlan.currentScore}
        projectedMatch={activePlan.projectedScore}
        estimatedWeeks={activePlan.estimatedWeeks}
        healthStatus={roadmapHealth || "ON TRACK"}
        onRecalculate={handleRecalculate}
        onChangeTarget={() => {
          if (onNavigateTab) onNavigateTab("Targets");
        }}
        isRecalculating={isRecalculating}
      />

      {/* Target Change Flash Banner */}
      {targetChangeNotice && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 flex items-center gap-2 animate-in fade-in slide-in-from-top duration-300">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{targetChangeNotice}</span>
        </div>
      )}

      {/* 2. Compact 6-Part Metrics Overview */}
      <RoadmapOverview
        currentReadiness={activePlan.currentScore}
        projectedReadiness={activePlan.projectedScore}
        progressPercent={Math.round((verifiedRoadmapTasks.length / (activePlan.milestones.length || 1)) * 100)}
        currentWeek="Week 2"
        completedMilestones={verifiedRoadmapTasks.length}
        totalMilestones={activePlan.milestones.length}
        verifiedEvidenceCount={verifiedRoadmapTasks.length + 2}
        totalEvidenceCount={7}
      />

      {/* 3. Execution Health & Weekly Hours Availability Switcher */}
      <RoadmapHealth
        healthStatus={roadmapHealth || "ON TRACK"}
        weeklyHours={weeklyAvailability || 10}
        onSelectWeeklyHours={(h) => setWeeklyAvailability(h)}
        estimatedWeeks={activePlan.estimatedWeeks}
      />

      {/* 4. Prominent Next Best Action Card */}
      <RoadmapNextAction
        milestone={activePlan.nextActionMilestone}
        onStartMilestone={handleStartMilestone}
        onOpenDetails={(id) => setActiveTaskDrawerId(id)}
      />

      {/* 5. Priority Capability Gaps Ranked by Career Impact */}
      <RoadmapPriorityGaps
        gaps={activePlan.gaps}
        onSelectMilestone={(id) => setActiveTaskDrawerId(id)}
      />

      {/* 6. Active Focus: THIS WEEK (Week 2 Tasks) */}
      <RoadmapCurrentWeek
        weekNumber={2}
        weekTitle="Infrastructure & Production Engineering"
        weekTheme="Kubernetes Helm Manifests & CI/CD Pipelines"
        tasks={activePlan.currentWeekTasks}
        onOpenTaskDrawer={(id) => setActiveTaskDrawerId(id)}
        onStartTask={handleStartMilestone}
      />

      {/* 7. 6-Week Progressive Execution Timeline */}
      <RoadmapTimeline
        weeks={activePlan.weeks}
        activeFilter={activeRoadmapFilter || "All"}
        onFilterChange={(f) => updateData({ activeRoadmapFilter: f })}
        onOpenDrawer={(id) => setActiveTaskDrawerId(id)}
        onStartMilestone={handleStartMilestone}
        onSubmitEvidence={handleSubmitEvidence}
      />

      {/* 8. Readiness Trajectory Progress */}
      <RoadmapProgress
        currentMatch={activePlan.currentScore}
        projectedMatch={activePlan.projectedScore}
        completedMilestones={verifiedRoadmapTasks.length}
        totalMilestones={activePlan.milestones.length}
        verifiedEvidenceCount={verifiedRoadmapTasks.length + 2}
        totalEvidenceCount={7}
      />

      {/* 9. Outcome Summary Card */}
      <RoadmapSummary
        targetCompany={targetCompany}
        targetRole={targetRole}
        currentMatch={activePlan.currentScore}
        projectedMatch={activePlan.projectedScore}
        skillsCount={5}
        milestonesCount={activePlan.milestones.length}
        totalHours={activePlan.totalHours}
      />

      {/* Detail Drawer for Selected Milestone */}
      <RoadmapTaskDrawer
        isOpen={!!activeTaskDrawerId}
        onClose={() => setActiveTaskDrawerId(null)}
        milestone={inspectedMilestone}
        onStart={handleStartMilestone}
        onSubmitEvidence={handleSubmitEvidence}
        onNavigateTab={onNavigateTab}
      />

      {/* 7-Stage Simulated Verification Dialog */}
      <RoadmapVerificationDialog
        isOpen={!!activeVerificationId}
        onClose={() => setActiveVerificationId(null)}
        milestone={verifyingMilestone}
        onConfirmVerification={handleConfirmVerification}
      />
    </div>
  );
}
