"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useOnboardingStore } from "@/store/onboarding-store";
import { GrowthHeader } from "./growth-header";
import { GrowthSummary } from "./growth-summary";
import { ReadinessChart } from "./readiness-chart";
import { SkillGrowth } from "./skill-growth";
import { AchievementTimeline } from "./achievement-timeline";
import { MilestoneProgress } from "./milestone-progress";
import { GrowthInsights } from "./growth-insights";
import { GrowthNextAction } from "./growth-next-action";
import { GrowthComparison } from "./growth-comparison";
import { GrowthDetailDrawer, SkillProgressionItem } from "./growth-detail-drawer";
import { Loader2 } from "lucide-react";

interface GrowthWorkspaceProps {
  onNavigateTab: (tab: string) => void;
}

export function GrowthWorkspace({ onNavigateTab }: GrowthWorkspaceProps) {
  const {
    targetCompany,
    targetRole,
    targetMatchScore,
    verifiedRoadmapTasks,
    growthSelectedPeriod,
    growthSelectedSkill,
    updateData,
  } = useOnboardingStore();

  const [growthData, setGrowthData] = useState<any>(null);
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [selectedSkillItem, setSelectedSkillItem] = useState<SkillProgressionItem | null>(null);

  // Fetch static growth data on mount
  useEffect(() => {
    fetch("/data/growth-dashboard.json")
      .then((res) => res.json())
      .then((data) => setGrowthData(data))
      .catch(() => {});
  }, []);

  // Recalculate simulation
  const handleRecalculate = () => {
    setIsRecalculating(true);
    setTimeout(() => {
      setIsRecalculating(false);
    }, 600);
  };

  // Derive dynamic period-filtered stats
  const activeStats = useMemo(() => {
    if (!growthData) return null;

    const period = growthSelectedPeriod || "All Time";
    let checkpoints = [...growthData.checkpoints];
    let achievements = [...growthData.achievements];

    // Simulate different subsets for period filters
    if (period === "7D") {
      checkpoints = checkpoints.slice(-3);
      achievements = achievements.slice(0, 1);
    } else if (period === "30D") {
      checkpoints = checkpoints.slice(-5);
      achievements = achievements.slice(0, 2);
    } else if (period === "90D") {
      checkpoints = checkpoints.slice(-8);
      achievements = achievements.slice(0, 3);
    }

    // Determine current match score
    const currentScore = targetMatchScore || 92;
    const previousScore = checkpoints[0]?.score || 84;
    const scoreDiff = currentScore - previousScore;

    // Build skill deltas
    const skillsList: SkillProgressionItem[] = growthData.skills.map((s: any) => {
      // If task is verified, boost skill levels proportionally
      let boost = 0;
      if (s.skill === "Kubernetes" && verifiedRoadmapTasks.includes("ms-k8s-deploy")) {
        boost = 6;
      }
      return {
        ...s,
        currentLevel: Math.min(s.currentLevel + boost, 98),
        change: s.change + boost,
      };
    });

    return {
      currentReadiness: currentScore,
      previousReadiness: previousScore,
      readinessChange: scoreDiff,
      checkpoints,
      skills: skillsList,
      achievements,
      insights: growthData.insights,
      nextAction: growthData.nextAction,
    };
  }, [growthData, targetMatchScore, growthSelectedPeriod, verifiedRoadmapTasks]);

  // Loading state placeholder skeleton
  if (!growthData || !activeStats) {
    return (
      <div className="space-y-6 text-left py-12 text-xs text-text-secondary/50 font-mono flex flex-col items-center justify-center">
        <Loader2 className="h-6 w-6 text-primary animate-spin" />
        <span>Loading Growth Intelligence...</span>
      </div>
    );
  }

  return (
    <div className="space-y-7 text-left pb-12">
      {/* 1. Header controls */}
      <GrowthHeader
        targetCompany={targetCompany}
        targetRole={targetRole}
        currentReadiness={activeStats.currentReadiness}
        lastUpdated="Just now"
        selectedPeriod={growthSelectedPeriod || "All Time"}
        onPeriodChange={(p) => updateData({ growthSelectedPeriod: p })}
        onNavigateTab={onNavigateTab}
        onRecalculate={handleRecalculate}
        isRecalculating={isRecalculating}
      />

      {/* Recalculating Loader Frame */}
      {isRecalculating && (
        <div className="p-3.5 rounded-xl border border-white/[0.08] bg-[#070B1E] flex items-center gap-3 text-xs text-primary font-mono font-bold animate-pulse">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Recalibrating historical capability checkpoints...</span>
        </div>
      )}

      {/* 2. Top Summary KPI Blocks */}
      <GrowthSummary
        currentReadiness={activeStats.currentReadiness}
        readinessChange={activeStats.readinessChange}
        skillsImprovedCount={14}
        evidenceAddedCount={18 + verifiedRoadmapTasks.length}
        completedMilestones={verifiedRoadmapTasks.length + 7}
        totalMilestones={13}
        previousReadiness={activeStats.previousReadiness}
      />

      {/* 3. Primary Readiness trajectory and derived insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        <div className="lg:col-span-8">
          <ReadinessChart
            checkpoints={activeStats.checkpoints}
            onNavigateTab={onNavigateTab}
          />
        </div>

        <div className="lg:col-span-4">
          <GrowthInsights
            strongestImprovement={activeStats.insights.strongestImprovement}
            biggestCareerImpact={activeStats.insights.biggestCareerImpact}
            emergingGap={activeStats.insights.emergingGap}
            positiveTrend={activeStats.insights.positiveTrend}
          />
        </div>
      </div>

      {/* 4. Skill progression matrix & Milestone progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        <div className="lg:col-span-8">
          <SkillGrowth
            skills={activeStats.skills}
            onSelectSkill={(skill) => setSelectedSkillItem(skill)}
          />
        </div>

        <div className="lg:col-span-4">
          <MilestoneProgress
            completedCount={verifiedRoadmapTasks.length + 7}
            totalCount={13}
            onNavigateTab={onNavigateTab}
          />
        </div>
      </div>

      {/* 5. Today vs Previous delta & Next Action */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        <div className="lg:col-span-6">
          <GrowthComparison
            companyName={targetCompany}
            roleName={targetRole}
          />
        </div>

        <div className="lg:col-span-6">
          <GrowthNextAction
            title={activeStats.nextAction.title}
            currentLevel={activeStats.nextAction.currentLevel}
            targetLevel={activeStats.nextAction.targetLevel}
            estimatedHours={activeStats.nextAction.estimatedHours}
            projectedScoreImpact={activeStats.nextAction.projectedScoreImpact}
            onNavigateTab={onNavigateTab}
          />
        </div>
      </div>

      {/* 6. Vertical achievement timeline */}
      <AchievementTimeline achievements={activeStats.achievements} />

      {/* Detailed skill inspector drawer */}
      <GrowthDetailDrawer
        isOpen={!!selectedSkillItem}
        onClose={() => setSelectedSkillItem(null)}
        skillItem={selectedSkillItem}
        onNavigateTab={onNavigateTab}
      />
    </div>
  );
}
