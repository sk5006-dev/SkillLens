"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useOnboardingStore } from "@/store/onboarding-store";
import { TargetsHeader } from "./targets-header";
import { TargetSelector } from "./target-selector";
import { TargetSummary } from "./target-summary";
import { MatchBreakdown, MatchBreakdownData } from "./match-breakdown";
import { TargetSkillGaps } from "./target-skill-gaps";
import { SkillGapItem } from "./target-evidence-drawer";
import { CompanyBenchmark } from "./company-benchmark";
import { TargetRequirements, TargetRequirementItem } from "./target-requirements";
import { TargetNextAction, TargetActionItem } from "./target-next-action";
import { TargetComparisonDialog, TargetComparisonProfile } from "./target-comparison-dialog";
import { TargetHistory } from "./target-history";
import { CheckCircle2 } from "lucide-react";

interface TargetsWorkspaceProps {
  onNavigateTab?: (tab: string) => void;
}

export function TargetsWorkspace({ onNavigateTab }: TargetsWorkspaceProps) {
  const {
    targetCompany,
    targetRole,
    targetIndustry,
    isCustomCompany,
    isCustomRole,
    targetMatchScore,
    recentTargets,
    resumeExtractedSkills,
    updateData,
    saveTargetToHistory,
  } = useOnboardingStore();

  // Local UI & Dialog states
  const [benchmarkData, setBenchmarkData] = useState<any>(null);
  const [isWhyScoreOpen, setIsWhyScoreOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showSelectorBar, setShowSelectorBar] = useState(false);
  const [justUpdated, setJustUpdated] = useState(false);

  // Fetch benchmark JSON on mount
  useEffect(() => {
    fetch("/data/targets-dashboard.json")
      .then((res) => res.json())
      .then((data) => setBenchmarkData(data))
      .catch(() => {});
  }, []);

  // Predefined companies & roles lists
  const companiesList = benchmarkData?.companies || [
    { id: "stripe", name: "Stripe", industry: "Fintech / Payments", baseline: 84 },
    { id: "google", name: "Google", industry: "Cloud & Distributed Systems", baseline: 88 },
    { id: "microsoft", name: "Microsoft", industry: "Enterprise SaaS", baseline: 82 },
    { id: "amazon", name: "Amazon", industry: "E-Commerce & AWS Cloud", baseline: 85 },
    { id: "netflix", name: "Netflix", industry: "Streaming Media", baseline: 87 },
    { id: "openai", name: "OpenAI", industry: "AI Platforms", baseline: 90 },
    { id: "nvidia", name: "NVIDIA", industry: "GPU Parallel Computing", baseline: 89 },
    { id: "datadog", name: "Datadog", industry: "Cloud Observability", baseline: 83 },
    { id: "meta", name: "Meta", industry: "Social & AI Infrastructure", baseline: 86 },
    { id: "apple", name: "Apple", industry: "Consumer & Cloud", baseline: 86 },
  ];

  const rolesList = benchmarkData?.roles || [
    { id: "full-stack-engineer", name: "Full Stack Engineer", category: "Web Applications" },
    { id: "backend-engineer", name: "Backend Engineer", category: "Backend Systems" },
    { id: "frontend-engineer", name: "Frontend Engineer", category: "Client Performance" },
    { id: "ai-engineer", name: "AI Engineer", category: "LLMs & Applied AI" },
    { id: "cloud-engineer", name: "Cloud Engineer", category: "Infrastructure" },
    { id: "devops-engineer", name: "DevOps Engineer", category: "Automation" },
    { id: "platform-engineer", name: "Platform Engineer", category: "Platform Tooling" },
    { id: "security-engineer", name: "Security Engineer", category: "Application Security" },
    { id: "data-engineer", name: "Data Engineer", category: "Data Pipelines" },
    { id: "solutions-architect", name: "Solutions Architect", category: "Enterprise Architecture" },
    { id: "machine-learning-engineer", name: "Machine Learning Engineer", category: "Applied ML" },
  ];

  // Deterministic calculation logic for active Target
  const targetIntelligence = useMemo(() => {
    const company = companiesList.find(
      (c: any) => c.name.toLowerCase() === targetCompany.toLowerCase()
    );
    const companyBaseline = company ? company.baseline : 80;

    const roleObj = rolesList.find(
      (r: any) => r.name.toLowerCase() === targetRole.toLowerCase()
    );
    const roleBaseline = roleObj?.baselineScore || 85;

    // Calculate deterministic match score
    let calculatedMatch = 92;
    if (targetCompany.toLowerCase() === "stripe" && targetRole.toLowerCase().includes("full stack")) {
      calculatedMatch = 92;
    } else if (targetCompany.toLowerCase() === "google" && targetRole.toLowerCase().includes("backend")) {
      calculatedMatch = 89;
    } else if (targetRole.toLowerCase().includes("frontend")) {
      calculatedMatch = 86;
    } else if (targetRole.toLowerCase().includes("ai") || targetRole.toLowerCase().includes("machine learning")) {
      calculatedMatch = 74;
    } else if (targetRole.toLowerCase().includes("cloud") || targetRole.toLowerCase().includes("devops")) {
      calculatedMatch = 85;
    } else {
      calculatedMatch = Math.min(Math.max(companyBaseline + 5, 70), 96);
    }

    // Dynamic Breakdown
    const breakdown: MatchBreakdownData = {
      technicalSkills: Math.min(calculatedMatch + 2, 98),
      experience: Math.min(calculatedMatch - 3, 94),
      projects: Math.min(calculatedMatch + 1, 96),
      architecture: Math.min(calculatedMatch - 7, 92),
      resumeAlignment: calculatedMatch,
      evidenceStrength: Math.min(calculatedMatch - 4, 95),
    };

    // Dynamic Skill Gaps
    const isAiRole = targetRole.toLowerCase().includes("ai") || targetRole.toLowerCase().includes("machine learning");
    const isFrontend = targetRole.toLowerCase().includes("frontend");

    const skills: SkillGapItem[] = isAiRole
      ? [
          {
            skill: "Python",
            category: "Programming",
            status: "Partial",
            currentLevel: "Intermediate",
            requiredLevel: "Advanced",
            gap: 20,
            importance: "Critical",
            resumeEvidence: "Python scripting in university coursework and data processing.",
            missingDetails: "Requires production model fine-tuning repositories and high-throughput inference serving.",
          },
          {
            skill: "PyTorch",
            category: "Core Engineering",
            status: "Missing",
            currentLevel: "Beginner",
            requiredLevel: "Advanced",
            gap: 45,
            importance: "Critical",
            missingDetails: "No verified model training or tensor computation code detected in connected GitHub repositories.",
          },
          {
            skill: "Docker",
            category: "Infrastructure",
            status: "Verified",
            currentLevel: "Advanced",
            requiredLevel: "Intermediate",
            gap: 0,
            importance: "High",
            resumeEvidence: "Dockerized container pipelines in TechCorp.",
            projectEvidence: {
              projectName: "api-gateway",
              filePath: "Dockerfile",
              details: "Multi-stage Alpine containerization verified.",
            },
            missingDetails: "None. Containerization fully satisfied.",
          },
        ]
      : isFrontend
      ? [
          {
            skill: "React",
            category: "Core Engineering",
            status: "Verified",
            currentLevel: "Expert",
            requiredLevel: "Advanced",
            gap: 0,
            importance: "Critical",
            resumeEvidence: "Architected real-time dashboards with React 19.",
            projectEvidence: {
              projectName: "react-dashboard",
              filePath: "src/components/charts/TelemetryGrid.tsx",
              details: "Virtual canvas rendering with custom hooks.",
            },
            missingDetails: "None. React mastery verified across 96 commits.",
          },
          {
            skill: "TypeScript",
            category: "Programming",
            status: "Verified",
            currentLevel: "Advanced",
            requiredLevel: "Advanced",
            gap: 0,
            importance: "High",
            resumeEvidence: "Strict type safety across client and server packages.",
            projectEvidence: {
              projectName: "react-dashboard",
              filePath: "src/types/telemetry.d.ts",
              details: "Immutable telemetry event union types.",
            },
            missingDetails: "None. TypeScript architecture validated.",
          },
          {
            skill: "Storybook & A11y",
            category: "Testing",
            status: "Partial",
            currentLevel: "Intermediate",
            requiredLevel: "Advanced",
            gap: 15,
            importance: "Medium",
            missingDetails: "Lacks isolated component story test suites.",
          },
        ]
      : [
          {
            skill: "TypeScript",
            category: "Programming",
            status: "Verified",
            currentLevel: "Advanced",
            requiredLevel: "Advanced",
            gap: 0,
            importance: "High",
            resumeEvidence: "Strict type safety across client and server packages.",
            projectEvidence: {
              projectName: "api-gateway",
              filePath: "sdk/client/src/index.ts",
              details: "Exported typed SDK client.",
            },
            missingDetails: "None. Verified in codebase.",
          },
          {
            skill: "Go",
            category: "Programming",
            status: "Verified",
            currentLevel: "Advanced",
            requiredLevel: "Advanced",
            gap: 0,
            importance: "High",
            resumeEvidence: "Built low-latency proxy microservices with Go.",
            projectEvidence: {
              projectName: "api-gateway",
              filePath: "cmd/server/main.go",
              details: "Concurrent HTTP reverse proxy request handlers.",
            },
            missingDetails: "None. Verified in codebase.",
          },
          {
            skill: "React",
            category: "Core Engineering",
            status: "Verified",
            currentLevel: "Advanced",
            requiredLevel: "Advanced",
            gap: 0,
            importance: "High",
            resumeEvidence: "Architected real-time analytics web applications.",
            projectEvidence: {
              projectName: "react-dashboard",
              filePath: "src/components/charts/TelemetryGrid.tsx",
              details: "Optimized React UI data visualization.",
            },
            missingDetails: "None. Verified in codebase.",
          },
          {
            skill: "Node.js",
            category: "Programming",
            status: "Verified",
            currentLevel: "Advanced",
            requiredLevel: "Advanced",
            gap: 0,
            importance: "High",
            resumeEvidence: "Developed scalable REST and WebSocket servers.",
            projectEvidence: {
              projectName: "task-orchestrator",
              filePath: "src/workers/processor.ts",
              details: "Worker threads and async queue processing.",
            },
            missingDetails: "None. Verified in codebase.",
          },
          {
            skill: "Docker",
            category: "Infrastructure",
            status: "Verified",
            currentLevel: "Advanced",
            requiredLevel: "Advanced",
            gap: 0,
            importance: "High",
            resumeEvidence: "Containerized deployment configurations.",
            projectEvidence: {
              projectName: "api-gateway",
              filePath: "Dockerfile",
              details: "Multi-stage Alpine production build.",
            },
            missingDetails: "None. Verified in codebase.",
          },
          {
            skill: "Kubernetes",
            category: "Infrastructure",
            status: "Partial",
            currentLevel: "Intermediate",
            requiredLevel: "Advanced",
            gap: 18,
            importance: "High",
            resumeEvidence: "Certified Kubernetes Administrator (CKA) certification listed.",
            projectEvidence: {
              projectName: "api-gateway",
              filePath: "docker-compose.yml",
              details: "Multi-container local compose orchestration.",
            },
            missingDetails: "CKA certification exists on resume, but public repositories lack Kubernetes manifest configs (Helm charts, ingress).",
          },
          {
            skill: "System Design",
            category: "Architecture",
            status: "Partial",
            currentLevel: "Intermediate",
            requiredLevel: "Advanced",
            gap: 15,
            importance: "High",
            resumeEvidence: "Designed high-throughput distributed architectures.",
            projectEvidence: {
              projectName: "distributed-cache",
              filePath: "pkg/raft/node.go",
              details: "Raft consensus protocol state machine.",
            },
            missingDetails: "Add architecture documentation diagrams explaining failover and partition recovery.",
          },
          {
            skill: "Terraform / IaC",
            category: "Infrastructure",
            status: "Missing",
            currentLevel: "Beginner",
            requiredLevel: "Intermediate",
            gap: 35,
            importance: "Medium",
            missingDetails: "No Terraform or OpenTofu HCL modules found in verified repositories.",
          },
          {
            skill: "Distributed Consensus",
            category: "Architecture",
            status: "Missing",
            currentLevel: "Beginner",
            requiredLevel: "Advanced",
            gap: 40,
            importance: "Critical",
            missingDetails: "Advanced cluster quorum partition testing required for top-tier systems engineering benchmarks.",
          },
        ];

    // Counts
    const strongCount = skills.filter((s) => s.status === "Verified").length;
    const partialCount = skills.filter((s) => s.status === "Partial").length;
    const missingCount = skills.filter((s) => s.status === "Missing").length;

    // Requirements Matrix
    const requirements: TargetRequirementItem[] = [
      {
        category: "Core Engineering & Programming",
        items: [
          { skill: "TypeScript", importance: "High", currentEvidence: "Strong", requiredLevel: "Advanced", gap: 0 },
          { skill: "Go", importance: "High", currentEvidence: "Strong", requiredLevel: "Advanced", gap: 0 },
          { skill: "React", importance: "High", currentEvidence: "Strong", requiredLevel: "Advanced", gap: 0 },
          { skill: "Node.js", importance: "High", currentEvidence: "Strong", requiredLevel: "Advanced", gap: 0 },
        ],
      },
      {
        category: "Infrastructure & Cloud",
        items: [
          { skill: "Docker", importance: "High", currentEvidence: "Strong", requiredLevel: "Advanced", gap: 0 },
          { skill: "Kubernetes", importance: "High", currentEvidence: "Partial", requiredLevel: "Advanced", gap: 18 },
          { skill: "Terraform", importance: "Medium", currentEvidence: "Missing", requiredLevel: "Intermediate", gap: 35 },
        ],
      },
      {
        category: "Architecture & Databases",
        items: [
          { skill: "PostgreSQL", importance: "High", currentEvidence: "Strong", requiredLevel: "Advanced", gap: 0 },
          { skill: "Redis", importance: "Medium", currentEvidence: "Strong", requiredLevel: "Intermediate", gap: 0 },
          { skill: "System Design", importance: "High", currentEvidence: "Partial", requiredLevel: "Advanced", gap: 15 },
        ],
      },
    ];

    // Primary Next Best Action
    const nextAction: TargetActionItem = {
      id: "act-target-k8s",
      title: "Strengthen Kubernetes Evidence",
      impact: "High",
      why: `${targetCompany}'s ${targetRole} benchmark expects production Kubernetes deployment proof. Your CKA certification establishes theoretical mastery, but adding Helm manifests to api-gateway will complete full verification.`,
      potentialImpact: `${calculatedMatch}% → ${Math.min(calculatedMatch + 3, 98)}%`,
      secondaryActions: [
        {
          id: "act-target-iac",
          title: "Add Terraform AWS infrastructure module",
          impact: "Medium",
          why: "Validates IaC automation for cloud infrastructure hiring criteria.",
        },
        {
          id: "act-target-chaos",
          title: "Implement automated load testing scripts",
          impact: "Medium",
          why: "Demonstrates SLA verification under concurrent production load.",
        },
      ],
    };

    return {
      matchScore: calculatedMatch,
      companyBaseline,
      roleBaseline,
      breakdown,
      skills,
      strongCount,
      partialCount,
      missingCount,
      requirements,
      nextAction,
      explanation: `Strong alignment with ${targetCompany}. Your resume and verified portfolio provide robust engineering evidence for core ${targetRole} requirements including TypeScript, Go, React, and containerization.`,
    };
  }, [companiesList, rolesList, targetCompany, targetRole]);

  // Handle target application with short calibrating transition
  const handleApplyTarget = (
    company: string,
    role: string,
    isCustomComp: boolean,
    isCustomRl: boolean
  ) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowSelectorBar(false);
      setJustUpdated(true);
      setTimeout(() => setJustUpdated(false), 4000);
      updateData({
        targetCompany: company,
        targetRole: role,
        isCustomCompany: isCustomComp,
        isCustomRole: isCustomRl,
        targetMatchScore: targetIntelligence.matchScore,
        targetLastAnalyzedAt: "Just now",
      });
      saveTargetToHistory(company, role, targetIntelligence.matchScore);
    }, 600);
  };

  // Restore target from history
  const handleRestoreTarget = (company: string, role: string) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setJustUpdated(true);
      setTimeout(() => setJustUpdated(false), 4000);
      updateData({
        targetCompany: company,
        targetRole: role,
        targetLastAnalyzedAt: "Just now",
      });
    }, 400);
  };

  // Comparison Profiles
  const comparisonProfiles: TargetComparisonProfile[] = [
    {
      id: "tgt-1",
      company: "Stripe",
      role: "Full Stack Engineer",
      overallMatch: 92,
      technicalSkills: 94,
      projects: 93,
      experience: 89,
      architecture: 81,
      evidence: 86,
      verdict: "Strongest overall full-stack match with verified React and Go microservice pipelines.",
    },
    {
      id: "tgt-2",
      company: "Google",
      role: "Backend Engineer",
      overallMatch: 89,
      technicalSkills: 92,
      projects: 95,
      experience: 86,
      architecture: 88,
      evidence: 90,
      verdict: "Exceptional backend concurrency alignment via api-gateway and distributed-cache.",
    },
    {
      id: "tgt-3",
      company: "OpenAI",
      role: "AI Engineer",
      overallMatch: 74,
      technicalSkills: 72,
      projects: 76,
      experience: 78,
      architecture: 75,
      evidence: 70,
      verdict: "Requires additional PyTorch model training and vector indexing evidence.",
    },
  ];

  return (
    <div className="space-y-7 text-left pb-12">
      {/* 1. Header with Metadata and Action Triggers */}
      <TargetsHeader
        targetCompany={targetCompany}
        targetRole={targetRole}
        targetIndustry={targetIndustry || "Product Company"}
        isCustomCompany={isCustomCompany}
        isCustomRole={isCustomRole}
        onOpenSelector={() => setShowSelectorBar(!showSelectorBar)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={recentTargets?.length || 3}
      />

      {/* Target Updated Confirmation Flash */}
      {justUpdated && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 flex items-center justify-between animate-in fade-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>Target updated: <strong>{targetCompany} &bull; {targetRole}</strong> — Analysis refreshed just now.</span>
          </div>
        </div>
      )}

      {/* 2. Target Selector Bar (Expandable on Change Target or always accessible) */}
      {(showSelectorBar || isCustomCompany || isCustomRole) && (
        <TargetSelector
          companies={companiesList}
          roles={rolesList}
          currentCompany={targetCompany}
          currentRole={targetRole}
          isCustomCompany={isCustomCompany}
          isCustomRole={isCustomRole}
          onApplyTarget={handleApplyTarget}
          isAnalyzing={isAnalyzing}
        />
      )}

      {/* 3. Primary Target Match Summary */}
      <TargetSummary
        score={targetIntelligence.matchScore}
        company={targetCompany}
        role={targetRole}
        isCustomCompany={isCustomCompany}
        isCustomRole={isCustomRole}
        strongCount={targetIntelligence.strongCount}
        partialCount={targetIntelligence.partialCount}
        missingCount={targetIntelligence.missingCount}
        explanation={targetIntelligence.explanation}
        onOpenWhyScore={() => setIsWhyScoreOpen(true)}
      />

      {/* 4. Score Breakdown & Company Benchmark Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        <div className="lg:col-span-7">
          <MatchBreakdown
            breakdown={targetIntelligence.breakdown}
            isOpen={isWhyScoreOpen}
            onClose={() => setIsWhyScoreOpen(false)}
            targetCompany={targetCompany}
            targetRole={targetRole}
          />
        </div>

        <div className="lg:col-span-5">
          <CompanyBenchmark
            matchScore={targetIntelligence.matchScore}
            roleBenchmark={targetIntelligence.roleBaseline}
            companyBaseline={targetIntelligence.companyBaseline}
            companyName={targetCompany}
            roleName={targetRole}
            isCustomCompany={isCustomCompany}
          />
        </div>
      </div>

      {/* 5. Primary Next Best Action */}
      <TargetNextAction
        action={targetIntelligence.nextAction}
        onViewRoadmap={() => {
          if (onNavigateTab) onNavigateTab("Roadmap");
        }}
      />

      {/* 6. Skill Gap Analysis with Cross-Module Evidence Links */}
      <TargetSkillGaps
        skills={targetIntelligence.skills}
        onNavigateTab={onNavigateTab}
      />

      {/* 7. Categorized Role Requirements Matrix */}
      <TargetRequirements requirements={targetIntelligence.requirements} />

      {/* Dialogs & Drawers */}
      <TargetComparisonDialog
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        targets={comparisonProfiles}
        onSelectTarget={(c, r) => handleApplyTarget(c, r, false, false)}
      />

      <TargetHistory
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={recentTargets || []}
        currentCompany={targetCompany}
        currentRole={targetRole}
        onRestoreTarget={handleRestoreTarget}
      />
    </div>
  );
}
