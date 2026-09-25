import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface OnboardingState {
  // Current onboarding step
  step: number;
  
  // Profile Setup fields
  fullName: string;
  jobTitle: string;
  experienceYears: string;
  country: string;
  education: string;
  linkedin: string;
  portfolio: string;
  profilePicture: string | null;

  // Resume Upload status & data
  resumeName: string | null;
  resumeFileType: string | null;
  resumeUploadDate: string | null;
  resumeUploadStatus: "idle" | "parsing" | "done" | "error";
  resumeExtractedSkills: string[];
  resumeExtractedProjects: string[];
  resumeExperience: Array<{ role: string; company: string; period: string; description: string }>;
  resumeEducation: Array<{ degree: string; school: string; period: string }>;
  resumeCertifications: string[];
  professionalSummary: string;

  // Resume Intelligence Scores & Analysis
  resumeScore: number | null;
  atsScore: number | null;
  contentScore: number | null;
  targetAlignment: number | null;
  lastAnalyzedAt: string | null;
  appliedSuggestions: string[];
  activeResumeVersion: string;

  // Projects Intelligence & Verification Fields
  selectedProjectId: string;
  projectsLastSyncedAt: string;
  connectedGitSource: "github" | "gitlab" | "bitbucket" | null;
  comparisonProjectIds: string[];
  appliedProjectRecommendations: string[];
  activeProjectFilter: "All" | "Verified" | "Strong Evidence" | "Partial Evidence" | "Recently Updated";
  projectSearchQuery: string;
  projectTechnologyFilter: string;
  projectSortBy: "Verification" | "Technical Depth" | "Activity" | "Last Updated";

  // GitHub Connection status & repositories
  githubConnected: boolean;
  githubAccount: string | null;
  githubReposCount: number;
  githubRepos: Array<{
    name: string;
    stars: number;
    language: string;
    commits: number;
    lastUpdated: string;
    verified: boolean;
    technologies: string[];
  }>;

  // Career Goal / Target Intelligence fields
  targetCompany: string;
  targetRole: string;
  targetIndustry: string;
  isCustomCompany: boolean;
  isCustomRole: boolean;
  targetMatchScore: number;
  targetLastAnalyzedAt: string;
  recentTargets: Array<{ company: string; role: string; score: number; lastAnalyzed: string }>;
  selectedTargetComparison: string[];
  appliedTargetActions: string[];
  experienceLevel: string;
  preferredIndustry: string;
  salaryGoal: string;
  workMode: string; // Remote / Hybrid / Onsite
  companySize: string;

  // Roadmap Intelligence & Milestone Verification Fields
  completedRoadmapTasks: string[];
  inProgressRoadmapTasks: string[];
  submittedEvidenceTasks: Record<string, { repo: string; files: string[]; notes: string }>;
  verifiedRoadmapTasks: string[];
  activeRoadmapFilter: "All" | "Current Week" | "High Priority" | "Completed";
  weeklyAvailability: number; // 5, 10, 15, 20 hrs/week
  roadmapHealth: "ON TRACK" | "AT RISK" | "BEHIND";
  appliedRoadmapScoreBoost: number;
  roadmapTargetSnapshot: { company: string; role: string };
  roadmapLastRecalculatedAt: string;

  // Growth Intelligence persistence
  growthReadinessHistory: Array<{ date: string; score: number; company: string; role: string; change: number; majorImprovement: string; completedMilestone: string }>;
  growthSkillHistory: Array<{ skill: string; previousLevel: number; currentLevel: number; targetLevel: number; change: number; evidenceAdded: string[]; category: string }>;
  growthAchievements: Array<{ id: string; title: string; description: string; date: string; impact: string; category: string; relatedModule: string }>;
  growthLastUpdatedAt: string;
  growthSelectedPeriod: "7D" | "30D" | "90D" | "All Time";
  growthSelectedSkill: string | null;

  // Settings states
  settingsProfile: { name: string; email: string; professionalTitle: string; experienceLevel: string; country: string; timezone: string; profileCompletion: number };
  settingsCareerPreferences: { industry: string; weeklyLearningHours: number; workPreference: string; careerObjective: string; preferredLocations: string[]; preferredCompanySize: string };
  settingsWorkspace: { workspaceName?: string; defaultTab: string; sidebarCollapsed: boolean; density: "Comfortable" | "Compact"; reduceAnimations: boolean; confirmDestructive: boolean };
  settingsAnalysis: { automaticResumeAnalysis: boolean; automaticProjectSync: boolean; automaticTargetRecalculation: boolean; roadmapAutoUpdate: boolean };
  settingsNotifications: { roadmapUpdates: boolean; targetScoreChanges: boolean; resumeAnalysisComplete: boolean; projectSyncComplete: boolean; weeklyProgressSummary: boolean };
  settingsConnections: {
    github: { connected: boolean; lastSynced: string };
    gitlab: { connected: boolean };
    bitbucket: { connected: boolean };
  };
  settingsPrivacy: { profileVisibility: string; repositoryAnalysisPermission: boolean; analyticsSharing: boolean; dataRetention: string };
  settingsLastSavedAt: string;
  settingsDirty: boolean;

  // Persistent User Preferences & states
  isCompleted: boolean;
  onboardingRestored: boolean;
  theme: "dark" | "light";
  sidebarCollapsed: boolean;
  lastVisitedTab: string;
  
  // Dynamic alerts & guide chat
  notificationsList: Array<{ id: string; text: string; read: boolean; timestamp: string }>;
  chatHistory: Array<{ sender: "user" | "guide"; text: string }>;

  // State actions
  setStep: (step: number) => void;
  updateData: (data: Partial<OnboardingState>) => void;
  resetOnboarding: () => void;
  getProfileStrength: () => number;
  applyResumeSuggestion: (suggestionId: string, updatedDescription: string) => void;
  toggleComparisonProject: (projectId: string) => void;
  saveTargetToHistory: (company: string, role: string, score: number) => void;
  setMilestoneStatus: (taskId: string, status: "Not Started" | "In Progress" | "Evidence Submitted" | "Verified") => void;
  submitMilestoneEvidence: (taskId: string, evidence: { repo: string; files: string[]; notes: string }) => void;
  verifyMilestone: (taskId: string, scoreImpact: number) => void;
  setWeeklyAvailability: (hours: number) => void;
  updateGrowthSelectedPeriod: (period: "7D" | "30D" | "90D" | "All Time") => void;
  selectGrowthSkill: (skillId: string | null) => void;
  
  // Settings Actions
  updateProfile: (profile: Partial<OnboardingState["settingsProfile"]>) => void;
  updateCareerPreferences: (prefs: Partial<OnboardingState["settingsCareerPreferences"]>) => void;
  updateWorkspacePreferences: (prefs: Partial<OnboardingState["settingsWorkspace"]>) => void;
  updateAnalysisPreferences: (prefs: Partial<OnboardingState["settingsAnalysis"]>) => void;
  updateNotificationPreferences: (prefs: Partial<OnboardingState["settingsNotifications"]>) => void;
  updatePrivacyPreferences: (prefs: Partial<OnboardingState["settingsPrivacy"]>) => void;
  connectService: (serviceName: "github" | "gitlab" | "bitbucket") => void;
  disconnectService: (serviceName: "github" | "gitlab" | "bitbucket") => void;
  saveSettings: () => void;
  resetSettings: (section: string) => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      step: 1,
      fullName: "Pranav",
      jobTitle: "Senior Full Stack Engineer",
      experienceYears: "5-8 Years",
      country: "United States",
      education: "B.S. Computer Science",
      linkedin: "https://linkedin.com/in/pranav-dev",
      portfolio: "https://pranav.dev",
      profilePicture: null,
      resumeName: "Pranav_Resume.pdf",
      resumeFileType: "application/pdf",
      resumeUploadDate: "Aug 8, 2026",
      resumeUploadStatus: "done",
      resumeExtractedSkills: ["React", "Next.js", "TypeScript", "Node.js", "Docker", "PostgreSQL", "Go", "gRPC", "Redis", "API Design"],
      resumeExtractedProjects: ["raft-consensus", "api-gateway", "react-dashboard", "distributed-cache", "task-orchestrator"],
      professionalSummary: "Senior Full Stack Engineer with 6+ years of experience designing high-throughput distributed systems, modern web architectures with React and Next.js, and low-latency microservices with Node.js and Go.",
      resumeExperience: [
        {
          role: "Senior Full Stack Engineer",
          company: "TechCorp",
          period: "2023 - Present",
          description: "Architected real-time dashboards and microservices using React, Next.js, and Node.js. Improved query latency by 40% with Redis caching."
        },
        {
          role: "Software Engineer",
          company: "DevSolutions",
          period: "2021 - 2023",
          description: "Built responsive web applications, implemented secure OAuth verification flows, and set up Dockerized container environments."
        }
      ],
      resumeEducation: [
        {
          degree: "B.S. in Computer Science",
          school: "State University",
          period: "2017 - 2021"
        }
      ],
      resumeCertifications: ["AWS Certified Solutions Architect", "Certified Kubernetes Administrator"],
      resumeScore: 88,
      atsScore: 91,
      contentScore: 86,
      targetAlignment: 92,
      lastAnalyzedAt: "8 Aug 2026, 3:24 PM",
      appliedSuggestions: [],
      activeResumeVersion: "v3",

      // Projects Initial State
      selectedProjectId: "api-gateway",
      projectsLastSyncedAt: "10 Aug 2026, 9:45 AM",
      connectedGitSource: "github",
      comparisonProjectIds: [],
      appliedProjectRecommendations: [],
      activeProjectFilter: "All",
      projectSearchQuery: "",
      projectTechnologyFilter: "All",
      projectSortBy: "Verification",

      githubConnected: true,
      githubAccount: "pranav-dev",
      githubReposCount: 5,
      githubRepos: [
        {
          name: "api-gateway",
          stars: 24,
          language: "Go",
          commits: 48,
          lastUpdated: "2 days ago",
          verified: true,
          technologies: ["Go", "TypeScript", "Docker", "Node.js", "PostgreSQL", "Redis"]
        },
        {
          name: "react-dashboard",
          stars: 19,
          language: "TypeScript",
          commits: 96,
          lastUpdated: "3 days ago",
          verified: true,
          technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript"]
        },
        {
          name: "distributed-cache",
          stars: 38,
          language: "Go",
          commits: 34,
          lastUpdated: "1 week ago",
          verified: true,
          technologies: ["Go", "gRPC", "Docker", "Raft"]
        },
        {
          name: "task-orchestrator",
          stars: 15,
          language: "TypeScript",
          commits: 42,
          lastUpdated: "2 weeks ago",
          verified: true,
          technologies: ["TypeScript", "Node.js", "PostgreSQL", "Docker"]
        },
        {
          name: "portfolio-web",
          stars: 8,
          language: "TypeScript",
          commits: 28,
          lastUpdated: "1 month ago",
          verified: true,
          technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"]
        }
      ],

      // Target Intelligence Initial State
      targetCompany: "Stripe",
      targetRole: "Full Stack Engineer",
      targetIndustry: "Fintech / Payments Infrastructure",
      isCustomCompany: false,
      isCustomRole: false,
      targetMatchScore: 92,
      targetLastAnalyzedAt: "Just now",
      recentTargets: [
        { company: "Stripe", role: "Full Stack Engineer", score: 92, lastAnalyzed: "Aug 10, 2026" },
        { company: "Google", role: "Backend Engineer", score: 89, lastAnalyzed: "Aug 8, 2026" },
        { company: "Microsoft", role: "Frontend Engineer", score: 86, lastAnalyzed: "Jul 29, 2026" }
      ],
      selectedTargetComparison: ["Stripe - Full Stack Engineer", "Google - Backend Engineer"],
      appliedTargetActions: [],

      // Roadmap Initial State
      completedRoadmapTasks: ["ms-docker-multi", "ms-postgres-scale"],
      inProgressRoadmapTasks: ["ms-k8s-deploy", "ms-cicd-pipeline"],
      submittedEvidenceTasks: {},
      verifiedRoadmapTasks: ["ms-docker-multi", "ms-postgres-scale"],
      activeRoadmapFilter: "All",
      weeklyAvailability: 10,
      roadmapHealth: "ON TRACK",
      appliedRoadmapScoreBoost: 0,
      roadmapTargetSnapshot: { company: "Stripe", role: "Full Stack Engineer" },
      roadmapLastRecalculatedAt: "Just now",

      // Growth Initial State
      growthReadinessHistory: [
        { date: "2026-05-15", score: 70, company: "Microsoft", role: "Frontend Engineer", change: 0, majorImprovement: "Initial profile and resume parsed", completedMilestone: "Foundation" },
        { date: "2026-05-28", score: 74, company: "Microsoft", role: "Frontend Engineer", change: 4, majorImprovement: "React and TypeScript codebases connected", completedMilestone: "Foundation" },
        { date: "2026-06-10", score: 78, company: "Microsoft", role: "Frontend Engineer", change: 4, majorImprovement: "Completed React 19 state optimization", completedMilestone: "Foundation" },
        { date: "2026-06-22", score: 82, company: "Microsoft", role: "Frontend Engineer", change: 4, majorImprovement: "Strict TypeScript compilation enabled", completedMilestone: "Foundation" },
        { date: "2026-07-05", score: 84, company: "Stripe", role: "Full Stack Engineer", change: 2, majorImprovement: "Target changed: recalibrated for Stripe", completedMilestone: "Recalibration" },
        { date: "2026-07-12", score: 85, company: "Stripe", role: "Full Stack Engineer", change: 1, majorImprovement: "Advisory locks in PostgreSQL optimized", completedMilestone: "Foundation" },
        { date: "2026-07-18", score: 86, company: "Stripe", role: "Full Stack Engineer", change: 1, majorImprovement: "Multi-stage Docker builds verified", completedMilestone: "Infrastructure" },
        { date: "2026-07-25", score: 87, company: "Stripe", role: "Full Stack Engineer", change: 1, majorImprovement: "Resume ATS formatting polished", completedMilestone: "Resume Alignment" },
        { date: "2026-08-02", score: 89, company: "Stripe", role: "Full Stack Engineer", change: 2, majorImprovement: "API Gateway microservice connected", completedMilestone: "Projects" },
        { date: "2026-08-10", score: 92, company: "Stripe", role: "Full Stack Engineer", change: 3, majorImprovement: "Kubernetes Helm charts verified", completedMilestone: "Infrastructure" }
      ],
      growthSkillHistory: [
        { skill: "Kubernetes", previousLevel: 42, currentLevel: 68, targetLevel: 80, change: 26, evidenceAdded: ["CKA Certification", "api-gateway Helm manifests"], category: "Infrastructure" },
        { skill: "TypeScript", previousLevel: 80, currentLevel: 94, targetLevel: 90, change: 14, evidenceAdded: ["strictNullChecks enabled", "Immutable telemetry event union types"], category: "Frontend" },
        { skill: "React", previousLevel: 82, currentLevel: 95, targetLevel: 90, change: 13, evidenceAdded: ["Virtual canvas chart rendering", "Custom react hooks implementation"], category: "Frontend" },
        { skill: "Node.js", previousLevel: 78, currentLevel: 90, targetLevel: 85, change: 12, evidenceAdded: ["Worker threads queue processing", "WebSocket connection pooling"], category: "Backend" },
        { skill: "Go", previousLevel: 74, currentLevel: 88, targetLevel: 85, change: 14, evidenceAdded: ["HTTP reverse proxy routines", "Raft consensus election safety"], category: "Backend" },
        { skill: "Docker", previousLevel: 70, currentLevel: 86, targetLevel: 80, change: 16, evidenceAdded: ["Multi-stage Alpine base builds", "docker-compose local orchestrations"], category: "Infrastructure" }
      ],
      growthAchievements: [
        { id: "ach-k8s", title: "Kubernetes capability verified", description: "Verified Helm deployment manifests in api-gateway codebase.", date: "Aug 10, 2026", impact: "+3% readiness", category: "Infrastructure", relatedModule: "Roadmap" },
        { id: "ach-resume-ats", title: "Resume ATS score improved", description: "Polished strict format standard and added metrics impact.", date: "Aug 06, 2026", impact: "86% → 91%", category: "Resume", relatedModule: "Resume" },
        { id: "ach-api-verify", title: "API Gateway project verified", description: "Authenticated reverse proxy routines and CORS handlers.", date: "Aug 02, 2026", impact: "Strong Evidence", category: "Projects", relatedModule: "Projects" },
        { id: "ach-sys-milestone", title: "System Design milestone completed", description: "Closed consensus protocols design gap.", date: "Jul 28, 2026", impact: "+2% readiness", category: "Roadmap", relatedModule: "Roadmap" }
      ],
      growthLastUpdatedAt: "Just now",
      growthSelectedPeriod: "All Time",
      growthSelectedSkill: null,

      // Settings Initial State
      settingsProfile: { name: "Pranav", email: "pranav@example.com", professionalTitle: "Senior Full Stack Engineer", experienceLevel: "Senior", country: "United States", timezone: "EST", profileCompletion: 92 },
      settingsCareerPreferences: { industry: "Product Company", weeklyLearningHours: 8, workPreference: "Remote", careerObjective: "Switch companies", preferredLocations: ["San Francisco", "London"], preferredCompanySize: "Medium" },
      settingsWorkspace: { workspaceName: "Pranav's Workspace", defaultTab: "Dashboard", sidebarCollapsed: false, density: "Comfortable", reduceAnimations: false, confirmDestructive: true },
      settingsAnalysis: { automaticResumeAnalysis: true, automaticProjectSync: true, automaticTargetRecalculation: true, roadmapAutoUpdate: true },
      settingsNotifications: { roadmapUpdates: true, targetScoreChanges: true, resumeAnalysisComplete: true, projectSyncComplete: true, weeklyProgressSummary: true },
      settingsConnections: {
        github: { connected: true, lastSynced: "Today, 10:32 AM" },
        gitlab: { connected: false },
        bitbucket: { connected: false }
      },
      settingsPrivacy: { profileVisibility: "Private", repositoryAnalysisPermission: true, analyticsSharing: true, dataRetention: "Keep Indefinitely" },
      settingsLastSavedAt: "Just now",
      settingsDirty: false,

      experienceLevel: "Senior",
      preferredIndustry: "Product Company",
      salaryGoal: "$140,000",
      workMode: "Remote",
      companySize: "Medium",
      isCompleted: true,
      onboardingRestored: false,
      theme: "dark",
      sidebarCollapsed: false,
      lastVisitedTab: "Settings",
      notificationsList: [
        { id: "1", text: "Career Roadmap calibrated for Stripe.", read: false, timestamp: "1m ago" },
        { id: "2", text: "Career Target analysis ready.", read: true, timestamp: "10m ago" },
        { id: "3", text: "Projects verification sync complete.", read: true, timestamp: "1h ago" }
      ],
      chatHistory: [
        { sender: "guide", text: "Hello! I am your Career Guide. Ask me anything about settings parameters, integrations, and preferences." }
      ],

      setStep: (step) => set({ step }),
      updateData: (data) => set((state) => ({ ...state, ...data })),
      resetOnboarding: () => set({
        step: 2,
        fullName: "",
        jobTitle: "",
        experienceYears: "0 Years",
        country: "",
        education: "",
        linkedin: "",
        portfolio: "",
        profilePicture: null,
        resumeName: null,
        resumeFileType: null,
        resumeUploadDate: null,
        resumeUploadStatus: "idle",
        resumeExtractedSkills: [],
        resumeExtractedProjects: [],
        professionalSummary: "",
        resumeExperience: [],
        resumeEducation: [],
        resumeCertifications: [],
        resumeScore: null,
        atsScore: null,
        contentScore: null,
        targetAlignment: null,
        lastAnalyzedAt: null,
        appliedSuggestions: [],
        activeResumeVersion: "v3",
        selectedProjectId: "api-gateway",
        projectsLastSyncedAt: "Never",
        connectedGitSource: null,
        comparisonProjectIds: [],
        appliedProjectRecommendations: [],
        activeProjectFilter: "All",
        projectSearchQuery: "",
        projectTechnologyFilter: "All",
        projectSortBy: "Verification",
        githubConnected: false,
        githubAccount: null,
        githubReposCount: 0,
        githubRepos: [],
        targetCompany: "Stripe",
        targetRole: "Full Stack Engineer",
        targetIndustry: "Fintech",
        isCustomCompany: false,
        isCustomRole: false,
        targetMatchScore: 92,
        targetLastAnalyzedAt: "Just now",
        recentTargets: [],
        selectedTargetComparison: [],
        appliedTargetActions: [],
        completedRoadmapTasks: [],
        inProgressRoadmapTasks: [],
        submittedEvidenceTasks: {},
        verifiedRoadmapTasks: [],
        activeRoadmapFilter: "All",
        weeklyAvailability: 10,
        roadmapHealth: "ON TRACK",
        appliedRoadmapScoreBoost: 0,
        roadmapTargetSnapshot: { company: "Stripe", role: "Full Stack Engineer" },
        roadmapLastRecalculatedAt: "Never",
        growthReadinessHistory: [],
        growthSkillHistory: [],
        growthAchievements: [],
        growthLastUpdatedAt: "Never",
        growthSelectedPeriod: "All Time",
        growthSelectedSkill: null,
        settingsProfile: { name: "", email: "", professionalTitle: "", experienceLevel: "Junior", country: "", timezone: "", profileCompletion: 10 },
        settingsCareerPreferences: { industry: "", weeklyLearningHours: 4, workPreference: "Remote", careerObjective: "Get interview-ready", preferredLocations: [], preferredCompanySize: "Medium" },
        settingsWorkspace: { workspaceName: "Pranav's Workspace", defaultTab: "Dashboard", sidebarCollapsed: false, density: "Comfortable", reduceAnimations: false, confirmDestructive: true },
        settingsAnalysis: { automaticResumeAnalysis: true, automaticProjectSync: true, automaticTargetRecalculation: true, roadmapAutoUpdate: true },
        settingsNotifications: { roadmapUpdates: true, targetScoreChanges: true, resumeAnalysisComplete: true, projectSyncComplete: true, weeklyProgressSummary: true },
        settingsConnections: { github: { connected: false, lastSynced: "Never" }, gitlab: { connected: false }, bitbucket: { connected: false } },
        settingsPrivacy: { profileVisibility: "Private", repositoryAnalysisPermission: true, analyticsSharing: true, dataRetention: "Keep Indefinitely" },
        settingsLastSavedAt: "Never",
        settingsDirty: false,
        experienceLevel: "Junior",
        preferredIndustry: "",
        salaryGoal: "",
        workMode: "Remote",
        companySize: "Medium",
        isCompleted: false,
        onboardingRestored: false,
        theme: "dark",
        sidebarCollapsed: false,
        lastVisitedTab: "Settings",
        notificationsList: [
          { id: "1", text: "Ready to track your career progress.", read: false, timestamp: "Just now" }
        ],
        chatHistory: [
          { sender: "guide", text: "Hello! I am your Career Guide. Ask me anything about settings parameters." }
        ]
      }),
      
      getProfileStrength: () => {
        const state = get();
        let score = 0;
        
        if (state.fullName && state.jobTitle && state.country) {
          score += 20;
        }
        if (state.resumeName && state.resumeExtractedSkills.length > 0) {
          score += 25;
        }
        if (state.githubConnected && state.githubAccount) {
          score += 25;
        }
        if (state.targetCompany && state.targetRole && state.preferredIndustry) {
          score += 30;
        }
        
        return score;
      },

      applyResumeSuggestion: (suggestionId: string, updatedDescription: string) => {
        set((state) => {
          const updatedExp = state.resumeExperience.map((exp, idx) => {
            if (idx === 0) {
              return { ...exp, description: updatedDescription };
            }
            return exp;
          });
          const applied = state.appliedSuggestions.includes(suggestionId)
            ? state.appliedSuggestions
            : [...state.appliedSuggestions, suggestionId];

          const newAts = Math.min((state.atsScore || 91) + 2, 98);
          const newResumeScore = Math.min((state.resumeScore || 88) + 3, 98);
          const nowStr = new Date().toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
          const newAchievement = {
            id: `ach-resume-${Date.now()}`,
            title: "Resume score improved",
            description: `Polished resume suggestion response. ATS improved to ${newAts}%.`,
            date: nowStr,
            impact: "ATS Score Boost",
            category: "Resume",
            relatedModule: "Resume"
          };

          return {
            ...state,
            resumeExperience: updatedExp,
            appliedSuggestions: applied,
            resumeScore: newResumeScore,
            atsScore: newAts,
            growthAchievements: [newAchievement, ...state.growthAchievements]
          };
        });
      },

      toggleComparisonProject: (projectId: string) => {
        set((state) => {
          const current = state.comparisonProjectIds;
          if (current.includes(projectId)) {
            return { ...state, comparisonProjectIds: current.filter((id) => id !== projectId) };
          }
          if (current.length >= 2) {
            return { ...state, comparisonProjectIds: [current[1], projectId] };
          }
          return { ...state, comparisonProjectIds: [...current, projectId] };
        });
      },

      saveTargetToHistory: (company: string, role: string, score: number) => {
        set((state) => {
          const now = new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric"
          });
          const exists = state.recentTargets.filter(
            (t) => !(t.company.toLowerCase() === company.toLowerCase() && t.role.toLowerCase() === role.toLowerCase())
          );
          return {
            ...state,
            recentTargets: [
              { company, role, score, lastAnalyzed: now },
              ...exists
            ].slice(0, 8)
          };
        });
      },

      setMilestoneStatus: (taskId: string, status: "Not Started" | "In Progress" | "Evidence Submitted" | "Verified") => {
        set((state) => {
          const inProg = state.inProgressRoadmapTasks.filter((id) => id !== taskId);
          const comp = state.completedRoadmapTasks.filter((id) => id !== taskId);
          const ver = state.verifiedRoadmapTasks.filter((id) => id !== taskId);

          if (status === "In Progress") {
            return { ...state, inProgressRoadmapTasks: [...inProg, taskId] };
          }
          if (status === "Evidence Submitted") {
            return { ...state, completedRoadmapTasks: [...comp, taskId] };
          }
          if (status === "Verified") {
            return {
              ...state,
              completedRoadmapTasks: [...comp, taskId],
              verifiedRoadmapTasks: [...ver, taskId]
            };
          }
          return { ...state, inProgressRoadmapTasks: inProg, completedRoadmapTasks: comp, verifiedRoadmapTasks: ver };
        });
      },

      submitMilestoneEvidence: (taskId: string, evidence: { repo: string; files: string[]; notes: string }) => {
        set((state) => ({
          ...state,
          submittedEvidenceTasks: {
            ...state.submittedEvidenceTasks,
            [taskId]: evidence
          },
          completedRoadmapTasks: Array.from(new Set([...state.completedRoadmapTasks, taskId]))
        }));
      },

      verifyMilestone: (taskId: string, scoreImpact: number) => {
        set((state) => {
          const newVerified = Array.from(new Set([...state.verifiedRoadmapTasks, taskId]));
          const newCompleted = Array.from(new Set([...state.completedRoadmapTasks, taskId]));
          const newBoost = state.appliedRoadmapScoreBoost + scoreImpact;
          const updatedScore = Math.min((state.targetMatchScore || 92) + scoreImpact, 99);
          const nowStr = new Date().toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });

          // Log Growth Achievement
          const newAchievement = {
            id: `ach-verify-${Date.now()}`,
            title: "Roadmap milestone verified",
            description: `Simulated verification of ${taskId} completed. Target readiness boosted by +${scoreImpact}%.`,
            date: nowStr,
            impact: `+${scoreImpact}% readiness`,
            category: "Infrastructure",
            relatedModule: "Roadmap"
          };

          // Update Growth History Checkpoint
          const newCheckpoint = {
            date: new Date().toISOString().split("T")[0],
            score: updatedScore,
            company: state.targetCompany,
            role: state.targetRole,
            change: scoreImpact,
            majorImprovement: `Milestone ${taskId} verified`,
            completedMilestone: "Roadmap"
          };

          return {
            ...state,
            verifiedRoadmapTasks: newVerified,
            completedRoadmapTasks: newCompleted,
            appliedRoadmapScoreBoost: newBoost,
            targetMatchScore: updatedScore,
            growthAchievements: [newAchievement, ...state.growthAchievements],
            growthReadinessHistory: [...state.growthReadinessHistory, newCheckpoint]
          };
        });
      },

      setWeeklyAvailability: (hours: number) => {
        set((state) => ({ ...state, weeklyAvailability: hours }));
      },

      updateGrowthSelectedPeriod: (period) => {
        set((state) => ({ ...state, growthSelectedPeriod: period }));
      },

      selectGrowthSkill: (skillId) => {
        set((state) => ({ ...state, growthSelectedSkill: skillId }));
      },

      // Settings Actions
      updateProfile: (profile) => {
        set((state) => ({
          ...state,
          settingsProfile: { ...state.settingsProfile, ...profile },
          fullName: profile.name !== undefined ? profile.name : state.fullName,
          experienceLevel: profile.experienceLevel !== undefined ? profile.experienceLevel : state.experienceLevel,
          settingsDirty: true
        }));
      },

      updateCareerPreferences: (prefs) => {
        set((state) => ({
          ...state,
          settingsCareerPreferences: { ...state.settingsCareerPreferences, ...prefs },
          preferredIndustry: prefs.industry !== undefined ? prefs.industry : state.preferredIndustry,
          weeklyAvailability: prefs.weeklyLearningHours !== undefined ? prefs.weeklyLearningHours : state.weeklyAvailability,
          settingsDirty: true
        }));
      },

      updateWorkspacePreferences: (prefs) => {
        set((state) => ({
          ...state,
          settingsWorkspace: { ...state.settingsWorkspace, ...prefs },
          sidebarCollapsed: prefs.sidebarCollapsed !== undefined ? prefs.sidebarCollapsed : state.sidebarCollapsed,
          settingsDirty: true
        }));
      },

      updateAnalysisPreferences: (prefs) => {
        set((state) => ({
          ...state,
          settingsAnalysis: { ...state.settingsAnalysis, ...prefs },
          settingsDirty: true
        }));
      },

      updateNotificationPreferences: (prefs) => {
        set((state) => ({
          ...state,
          settingsNotifications: { ...state.settingsNotifications, ...prefs },
          settingsDirty: true
        }));
      },

      updatePrivacyPreferences: (prefs) => {
        set((state) => ({
          ...state,
          settingsPrivacy: { ...state.settingsPrivacy, ...prefs },
          settingsDirty: true
        }));
      },

      connectService: (serviceName) => {
        set((state) => ({
          ...state,
          settingsConnections: {
            ...state.settingsConnections,
            [serviceName]: { connected: true, lastSynced: "Just now" }
          },
          githubConnected: serviceName === "github" ? true : state.githubConnected,
          settingsDirty: true
        }));
      },

      disconnectService: (serviceName) => {
        set((state) => ({
          ...state,
          settingsConnections: {
            ...state.settingsConnections,
            [serviceName]: { connected: false }
          },
          githubConnected: serviceName === "github" ? false : state.githubConnected,
          settingsDirty: true
        }));
      },

      saveSettings: () => {
        set((state) => ({
          ...state,
          settingsLastSavedAt: "Just now",
          settingsDirty: false
        }));
      },

      resetSettings: (section) => {
        set((state) => {
          if (section === "profile") {
            return {
              ...state,
              settingsProfile: { name: "Pranav", email: "pranav@example.com", professionalTitle: "Senior Full Stack Engineer", experienceLevel: "Senior", country: "United States", timezone: "EST", profileCompletion: 92 },
              fullName: "Pranav",
              experienceLevel: "Senior"
            };
          }
          if (section === "careerPreferences") {
            return {
              ...state,
              settingsCareerPreferences: { industry: "Product Company", weeklyLearningHours: 8, workPreference: "Remote", careerObjective: "Switch companies", preferredLocations: ["San Francisco", "London"], preferredCompanySize: "Medium" },
              preferredIndustry: "Product Company",
              weeklyAvailability: 8
            };
          }
          if (section === "workspace") {
            return {
              ...state,
              settingsWorkspace: { workspaceName: "Pranav's Workspace", defaultTab: "Dashboard", sidebarCollapsed: false, density: "Comfortable", reduceAnimations: false, confirmDestructive: true },
              sidebarCollapsed: false
            };
          }
          if (section === "analysis") {
            return {
              ...state,
              settingsAnalysis: { automaticResumeAnalysis: true, automaticProjectSync: true, automaticTargetRecalculation: true, roadmapAutoUpdate: true }
            };
          }
          if (section === "notifications") {
            return {
              ...state,
              settingsNotifications: { roadmapUpdates: true, targetScoreChanges: true, resumeAnalysisComplete: true, projectSyncComplete: true, weeklyProgressSummary: true }
            };
          }
          if (section === "privacy") {
            return {
              ...state,
              settingsPrivacy: { profileVisibility: "Private", repositoryAnalysisPermission: true, analyticsSharing: true, dataRetention: "Keep Indefinitely" }
            };
          }
          return state;
        });
      }
    }),
    {
      name: "skilllens-onboarding-store-v7",
    }
  )
);
