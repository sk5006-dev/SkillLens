"use client";

import React, { useState, useEffect, useMemo } from "react";
import { UploadCloud, FileText, Sparkles, RefreshCw, AlertTriangle } from "lucide-react";
import { useOnboardingStore } from "@/store/onboarding-store";
import { ResumeHeader } from "./resume-header";
import { ResumeHealthBar } from "./resume-health-bar";
import { ResumePreviewPanel } from "./resume-preview-panel";
import { ResumeAIAnalysisPanel } from "./resume-ai-analysis-panel";
import { ResumeNextAction } from "./resume-next-action";
import { ResumeSkillsMatrix, SkillCategory } from "./resume-skills-matrix";
import { ResumeExperienceList, ExperienceItem } from "./resume-experience-list";
import { ResumeUploadDialog } from "./resume-upload-dialog";
import { ResumeImprovementDialog } from "./resume-improvement-dialog";
import { ResumeVersionDrawer, ResumeVersion } from "./resume-version-drawer";
import { ResumeReportModal } from "./resume-report-modal";

export function ResumeWorkspace() {
  const {
    fullName,
    jobTitle,
    country,
    linkedin,
    portfolio,
    resumeName,
    resumeFileType,
    resumeUploadDate,
    resumeExtractedSkills,
    resumeExperience,
    resumeEducation,
    resumeCertifications,
    professionalSummary,
    targetCompany,
    targetRole,
    resumeScore,
    atsScore,
    contentScore,
    targetAlignment,
    lastAnalyzedAt,
    appliedSuggestions,
    activeResumeVersion,
    updateData,
    applyResumeSuggestion,
  } = useOnboardingStore();

  // Local UI State
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [companiesData, setCompaniesData] = useState<any[]>([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isVersionDrawerOpen, setIsVersionDrawerOpen] = useState(false);
  const [activeRecommendation, setActiveRecommendation] = useState<any>(null);
  const [isReanalyzing, setIsReanalyzing] = useState(false);

  // Fetch JSON datasets on mount
  useEffect(() => {
    fetch("/data/resume-dashboard.json")
      .then((res) => res.json())
      .then((data) => setDashboardData(data))
      .catch(() => {});

    fetch("/data/companies.json")
      .then((res) => res.json())
      .then((data) => setCompaniesData(data))
      .catch(() => {});
  }, []);

  // Deterministic Target Alignment calculation based on BOTH targetCompany and targetRole
  const dynamicScores = useMemo(() => {
    const defaultResumeScore = resumeScore || 88;
    const defaultAtsScore = atsScore || 91;
    const defaultContentScore = contentScore || 86;

    // Find company requirements
    const company = companiesData.find(
      (c) => c.name.toLowerCase() === (targetCompany || "Stripe").toLowerCase()
    );
    const companyReqs: string[] = company ? company.reqs : ["TypeScript", "React", "PostgreSQL", "Node.js", "API Design"];
    const companyBaseline: number = company ? company.baseline : 75;

    // Find role requirements
    const roleReqs: string[] = dashboardData?.roleRequirements?.[targetRole] || [
      "TypeScript", "React", "Next.js", "Node.js", "Docker"
    ];

    // Combine requirements
    const combinedReqs = Array.from(new Set([...companyReqs, ...roleReqs]));
    const skills = resumeExtractedSkills.length > 0 ? resumeExtractedSkills : ["React", "TypeScript", "Node.js", "Docker"];
    const matchedCount = combinedReqs.filter((req) => skills.includes(req)).length;
    const matchRatio = combinedReqs.length > 0 ? matchedCount / combinedReqs.length : 0.8;

    // Calculate dynamic alignment score (65% to 98%)
    const calculatedTargetFit = Math.min(Math.round(companyBaseline + matchRatio * 20), 98);

    const techSkillsScore = Math.min(Math.round(matchRatio * 100), 98);
    const expRelevance = Math.min(calculatedTargetFit - 3, 95);
    const projEvidence = Math.min(calculatedTargetFit + 1, 98);
    const eduScore = 82;

    return {
      resumeScore: defaultResumeScore,
      atsScore: defaultAtsScore,
      contentScore: defaultContentScore,
      targetAlignment: calculatedTargetFit,
      breakdown: {
        skillsCoverage: techSkillsScore,
        experienceRelevance: expRelevance,
        projectEvidence: projEvidence,
        atsStructure: defaultAtsScore,
      },
      alignmentBreakdown: {
        technicalSkills: techSkillsScore,
        experience: expRelevance,
        projects: projEvidence,
        education: eduScore,
        overall: calculatedTargetFit,
      },
    };
  }, [
    companiesData,
    dashboardData,
    targetCompany,
    targetRole,
    resumeExtractedSkills,
    resumeScore,
    atsScore,
    contentScore,
  ]);

  // Re-analyze trigger simulation
  const handleReAnalyze = () => {
    setIsReanalyzing(true);
    setTimeout(() => {
      setIsReanalyzing(false);
      const now = new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
      updateData({
        lastAnalyzedAt: now,
        resumeScore: Math.min((resumeScore || 88) + 1, 98),
      });
    }, 1200);
  };

  // Upload complete handler
  const handleUploadComplete = (fileData: { name: string; size: string; type: string }) => {
    const now = new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

    updateData({
      resumeName: fileData.name,
      resumeFileType: fileData.type,
      resumeUploadDate: now,
      resumeUploadStatus: "done",
      lastAnalyzedAt: now,
      resumeScore: 89,
      atsScore: 92,
      contentScore: 88,
    });
  };

  // Version snapshot select handler
  const handleSelectVersion = (versionId: string) => {
    const selected = dashboardData?.versions?.find((v: ResumeVersion) => v.id === versionId);
    if (selected) {
      updateData({
        activeResumeVersion: versionId,
        resumeScore: selected.score,
        atsScore: selected.atsScore,
        targetAlignment: selected.targetAlignment,
      });
    }
  };

  // Empty State if no resume is uploaded/parsed
  if (!resumeName && resumeExtractedSkills.length === 0) {
    return (
      <div className="p-8 md:p-16 rounded-2xl border border-dashed border-white/10 bg-[#070B1E] text-center flex flex-col items-center justify-center space-y-4 my-6 text-left">
        <div className="h-14 w-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
          <UploadCloud className="h-7 w-7" />
        </div>
        <div className="space-y-1 text-center max-w-md">
          <h3 className="text-base font-bold text-white">No resume analyzed yet</h3>
          <p className="text-xs text-text-secondary/70 leading-relaxed">
            Upload your latest resume to see your verified skills, target alignment, and high-impact improvement opportunities.
          </p>
        </div>
        <button
          onClick={() => setIsUploadOpen(true)}
          className="h-10 px-5 rounded-lg bg-primary hover:bg-primary/90 text-background-primary text-xs font-bold transition-all shadow-sm cursor-pointer"
        >
          Upload Resume
        </button>

        <ResumeUploadDialog
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          onUploadComplete={handleUploadComplete}
        />
      </div>
    );
  }

  const nextAction = dashboardData?.recommendations?.nextBestAction || {
    id: "rec-1",
    impact: "High",
    title: "Quantify operational outcomes in recent experience",
    description: "Your TechCorp experience lists responsibilities clearly, but adding concrete business metric outcomes will immediately improve recruiter conversion.",
    section: "Experience — TechCorp",
    originalText: "Architected real-time dashboards and microservices using React, Next.js, and Node.js.",
    recommendedText: "Architected real-time analytics dashboards using React and Next.js, increasing operational visibility by 35% and supporting 120k+ daily users.",
    rationale: "High-impact enterprise roles look for scale numbers (user counts, percentage improvements, latency gains) in primary experience bullet points.",
  };

  const secondarySuggestions = dashboardData?.recommendations?.secondarySuggestions || [];
  const skillCategories: SkillCategory[] = dashboardData?.skills || [];
  const experienceItems: ExperienceItem[] = dashboardData?.experience || [];
  const versions: ResumeVersion[] = dashboardData?.versions || [];

  return (
    <div className="space-y-8 text-left pb-12">
      {/* 1. Header with metadata & actions */}
      <ResumeHeader
        lastAnalyzedAt={lastAnalyzedAt || "8 Aug 2026, 3:24 PM"}
        onReAnalyze={handleReAnalyze}
        onUploadClick={() => setIsUploadOpen(true)}
        onDownloadReport={() => setIsReportOpen(true)}
        isReanalyzing={isReanalyzing}
      />

      {/* 2. Compact Horizontal Health Summary Bar */}
      <ResumeHealthBar
        resumeScore={dynamicScores.resumeScore}
        atsScore={dynamicScores.atsScore}
        contentScore={dynamicScores.contentScore}
        targetAlignment={dynamicScores.targetAlignment}
        targetCompany={targetCompany || "Stripe"}
        targetRole={targetRole || "Full Stack Engineer"}
        breakdown={dynamicScores.breakdown}
        summaryExplanation={dashboardData?.healthScores?.summaryExplanation}
      />

      {/* 3. Primary Next Best Action */}
      <ResumeNextAction
        nextAction={nextAction}
        secondarySuggestions={secondarySuggestions}
        onImproveClick={(rec) => setActiveRecommendation(rec)}
        appliedIds={appliedSuggestions}
      />

      {/* 4. Main Two-Column Viewport: Document Preview (Left) vs. AI Analysis (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Realistic Document Viewer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-text-secondary/70 font-mono">
              Document Preview
            </span>
            <button
              onClick={() => setIsVersionDrawerOpen(true)}
              className="text-xs text-primary hover:underline font-mono font-semibold cursor-pointer"
            >
              Version History ({versions.length})
            </button>
          </div>

          <ResumePreviewPanel
            fullName={fullName}
            jobTitle={jobTitle}
            country={country}
            linkedin={linkedin}
            portfolio={portfolio}
            professionalSummary={professionalSummary}
            experience={resumeExperience}
            education={resumeEducation}
            skills={resumeExtractedSkills}
            certifications={resumeCertifications}
            appliedSuggestionsCount={appliedSuggestions.length}
          />
        </div>

        {/* Right Column: AI Analysis & Target Match */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-text-secondary/70 font-mono block">
            Target Alignment & Analysis
          </span>

          <ResumeAIAnalysisPanel
            targetCompany={targetCompany || "Stripe"}
            targetRole={targetRole || "Full Stack Engineer"}
            targetAlignment={dynamicScores.targetAlignment}
            breakdown={dynamicScores.alignmentBreakdown}
          />
        </div>
      </div>

      {/* 5. Lower Viewport: Verified Technology Evidence Matrix */}
      <div className="pt-4">
        <ResumeSkillsMatrix categories={skillCategories} />
      </div>

      {/* 6. Lower Viewport: Expandable Experience Timeline */}
      <div className="pt-2">
        <ResumeExperienceList experience={experienceItems} />
      </div>

      {/* Modals & Drawers */}
      <ResumeUploadDialog
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadComplete={handleUploadComplete}
      />

      <ResumeImprovementDialog
        isOpen={!!activeRecommendation}
        onClose={() => setActiveRecommendation(null)}
        recommendation={activeRecommendation}
        onApply={(id, updatedText) => applyResumeSuggestion(id, updatedText)}
        isApplied={appliedSuggestions.includes(activeRecommendation?.id)}
      />

      <ResumeVersionDrawer
        isOpen={isVersionDrawerOpen}
        onClose={() => setIsVersionDrawerOpen(false)}
        versions={versions}
        activeVersionId={activeResumeVersion || "v3"}
        onSelectVersion={handleSelectVersion}
      />

      <ResumeReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        candidateName={fullName || "Pranav"}
        targetCompany={targetCompany || "Stripe"}
        targetRole={targetRole || "Full Stack Engineer"}
        resumeScore={dynamicScores.resumeScore}
        atsScore={dynamicScores.atsScore}
        contentScore={dynamicScores.contentScore}
        targetAlignment={dynamicScores.targetAlignment}
        skills={resumeExtractedSkills}
        lastAnalyzedAt={lastAnalyzedAt}
      />
    </div>
  );
}
