"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  FileText, 
  FolderGit2, 
  Target, 
  Activity, 
  CheckCircle,
  ArrowRight,
  Briefcase,
  Layers,
  Map,
  LineChart,
  Settings as SettingsIcon,
  Bell,
  Search,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Terminal,
  UploadCloud,
  ChevronDown,
  Sparkles,
  GitCommit,
  Clock,
  Compass,
  FileCheck,
  ShieldCheck,
  Code2,
  Maximize2,
  Share2,
  RefreshCw,
  Loader2,
  ChevronLeft,
  MessageSquare,
  Send,
  X,
  Plus,
  Trash2,
  Play,
  User,
  MapPin,
  Laptop,
  CheckCircle as ValidCheck,
  Menu,
  MoreHorizontal
} from "lucide-react";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as ReTooltip
} from "recharts";

import { useOnboardingStore } from "@/store/onboarding-store";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Combobox } from "@/components/onboarding/shared/combobox";
import { ResumeWorkspace } from "@/components/dashboard/resume/resume-workspace";
import { ProjectsWorkspace } from "@/components/dashboard/projects/projects-workspace";
import { TargetsWorkspace } from "@/components/dashboard/targets/targets-workspace";
import { RoadmapWorkspace } from "@/components/dashboard/roadmap/roadmap-workspace";
import { GrowthWorkspace } from "@/components/dashboard/growth/growth-workspace";
import { SettingsWorkspace } from "@/components/dashboard/settings/settings-workspace";
import { SettingsConfirmDialog } from "@/components/dashboard/settings/settings-confirm-dialog";

type ActiveTab = 
  | "Dashboard" 
  | "Resume" 
  | "Projects" 
  | "Targets" 
  | "Roadmap" 
  | "Growth" 
  | "Settings";

interface Company {
  id: string;
  name: string;
  logo: string;
  reqs: string[];
  baseline: number;
}

const COMPANIES: Company[] = [
  { id: "stripe", name: "Stripe", logo: "ST", reqs: ["TypeScript", "React", "PostgreSQL", "Node.js", "API Design"], baseline: 75 },
  { id: "google", name: "Google", logo: "GO", reqs: ["Go", "Kubernetes", "System Design", "Python", "CUDA"], baseline: 70 },
  { id: "microsoft", name: "Microsoft", logo: "MS", reqs: ["TypeScript", "React", "PostgreSQL", "SQL Server", "Docker"], baseline: 72 },
  { id: "amazon", name: "Amazon", logo: "AM", reqs: ["Python", "Go", "Docker", "PostgreSQL", "API Design"], baseline: 68 },
  { id: "netflix", name: "Netflix", logo: "NX", reqs: ["gRPC", "Docker", "Go", "CUDA", "System Design"], baseline: 74 }
];

export default function DashboardPage() {
  const router = useRouter();

  // Load state from persisted store
  const {
    fullName,
    jobTitle,
    experienceYears,
    country,
    education,
    linkedin,
    portfolio,
    profilePicture,
    resumeName,
    resumeExtractedSkills,
    resumeExtractedProjects,
    resumeExperience,
    resumeEducation,
    resumeCertifications,
    githubConnected,
    githubAccount,
    githubReposCount,
    githubRepos,
    targetCompany,
    targetRole,
    experienceLevel,
    preferredIndustry,
    salaryGoal,
    workMode,
    companySize,
    isCompleted,
    theme,
    sidebarCollapsed,
    lastVisitedTab,
    completedRoadmapTasks,
    notificationsList,
    chatHistory,
    updateData,
    resetOnboarding,
    getProfileStrength,
    settingsDirty,
    saveSettings
  } = useOnboardingStore();

  // Mapped parameters for dashboard presentation
  const techStack = resumeExtractedSkills.length > 0 ? resumeExtractedSkills : ["React", "TypeScript", "Node.js", "Docker"];
  const currentStatus = experienceLevel;
  const weeklyAvailability = preferredIndustry;
  const careerGoals = [
    `Become ${targetRole}`,
    "Master System Design",
    `Prepare for ${targetCompany} alignment`
  ];
  const timezone = "UTC+5:30";

  // Redirect if not completed setup
  useEffect(() => {
    if (!isCompleted) {
      router.push("/onboarding");
    }
  }, [isCompleted, router]);

  // UI Local states
  const [activeTab, setActiveTab] = useState<ActiveTab>((lastVisitedTab as ActiveTab) || "Dashboard");
  const [pendingTab, setPendingTab] = useState<ActiveTab | null>(null);
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);

  const handleTabChange = (tab: ActiveTab) => {
    if (activeTab === "Settings" && settingsDirty) {
      setPendingTab(tab);
      setShowUnsavedChangesModal(true);
    } else {
      setActiveTab(tab);
    }
  };

  const [selectedCompany, setSelectedCompany] = useState<Company>(COMPANIES[0]);
  const [recalculatedScore, setRecalculatedScore] = useState(83);
  const [expandedWeek, setExpandedWeek] = useState<string | null>("Week 1");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showGuideChat, setShowGuideChat] = useState(false);
  const [guideInput, setGuideInput] = useState("");
  const [selectedProject, setSelectedProject] = useState<any>(null); // For projects drawer
  const [tooltipDismissed, setTooltipDismissed] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  // Command palette search keyboard hook
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowSearchModal(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Update last visited tab
  useEffect(() => {
    updateData({ lastVisitedTab: activeTab });
  }, [activeTab, updateData]);

  // Persisted onboarding tooltip load check
  useEffect(() => {
    const dismissed = localStorage.getItem("skilllens-sidebar-tooltip-dismissed");
    if (dismissed) {
      setTooltipDismissed(true);
    }
  }, []);

  const dismissTooltip = () => {
    localStorage.setItem("skilllens-sidebar-tooltip-dismissed", "true");
    setTooltipDismissed(true);
  };

  // Recalculate target alignment index
  useEffect(() => {
    if (isCompleted) {
      const skills = resumeExtractedSkills.length > 0 ? resumeExtractedSkills : ["React", "TypeScript", "Node.js"];
      const intersection = skills.filter(s => selectedCompany.reqs.includes(s));
      const ratio = selectedCompany.reqs.length > 0 ? intersection.length / selectedCompany.reqs.length : 0;
      const score = Math.min(Math.floor(selectedCompany.baseline + ratio * 22), 98);
      setRecalculatedScore(score);
    }
  }, [resumeExtractedSkills, selectedCompany, isCompleted]);

  // Company and role options list
  const [companyList, setCompanyList] = useState<string[]>(COMPANIES.map(c => c.name));
  const [roleList, setRoleList] = useState<string[]>([
    "Frontend Engineer", "Backend Engineer", "Software Engineer", "Full Stack Engineer", "AI Engineer"
  ]);

  useEffect(() => {
    fetch("/data/companies.json")
      .then(res => res.json())
      .then(data => {
        setCompanyList(data.map((c: any) => c.name));
        const matched = data.find((c: any) => c.name.toLowerCase() === targetCompany.toLowerCase());
        if (matched) setSelectedCompany(matched);
      })
      .catch(() => {});

    fetch("/data/roles.json")
      .then(res => res.json())
      .then(data => setRoleList(data))
      .catch(() => {});
  }, [targetCompany]);

  // Filter command palette options
  const getSearchItems = () => {
    const pages = ["Dashboard", "Resume", "Projects", "Targets", "Roadmap", "Growth", "Settings"].map(p => ({ type: "Page", name: p }));
    const skills = (resumeExtractedSkills.length > 0 ? resumeExtractedSkills : ["React", "TypeScript", "Node.js", "Docker"]).map(s => ({ type: "Skill", name: s }));
    const repos = (githubRepos.length > 0 ? githubRepos : [{ name: "api-gateway" }]).map(r => ({ type: "Project", name: r.name }));
    const comps = companyList.map(c => ({ type: "Company", name: c }));

    return [...pages, ...skills, ...repos, ...comps].filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleSearchSelect = (item: { type: string; name: string }) => {
    setShowSearchModal(false);
    setSearchQuery("");
    if (item.type === "Page") {
      handleTabChange(item.name as ActiveTab);
    } else if (item.type === "Company") {
      updateData({ targetCompany: item.name });
      handleTabChange("Targets");
    } else if (item.type === "Project") {
      handleTabChange("Projects");
      const found = githubRepos.find(r => r.name === item.name);
      if (found) setSelectedProject(found);
    } else if (item.type === "Skill") {
      handleTabChange("Dashboard");
    }
  };

  // Chat Guide Bot message handler
  const sendChatMessage = () => {
    if (!guideInput.trim()) return;
    const userMsg = { sender: "user" as const, text: guideInput };
    const updatedHistory = [...chatHistory, userMsg];
    updateData({ chatHistory: updatedHistory });
    setGuideInput("");

    setTimeout(() => {
      let replyText = "I parsed your candidate file. Let me check: your profile target matches Stripe full-stack requirements closely.";
      if (guideInput.toLowerCase().includes("resume")) {
        replyText = `Your parsed resume "${resumeName || "Pranav_Resume.pdf"}" has ${resumeExtractedSkills.length} verified technologies. Click the Resume tab to optimize it.`;
      } else if (guideInput.toLowerCase().includes("project") || guideInput.toLowerCase().includes("github")) {
        replyText = `I indexed ${githubReposCount} connected repositories. Your portfolio score is high due to verified WebAssembly components.`;
      } else if (guideInput.toLowerCase().includes("roadmap")) {
        replyText = "Your learning plan is targeting next week's containerization milestones. I suggest verifying your Docker configs.";
      }
      updateData({ chatHistory: [...updatedHistory, { sender: "guide", text: replyText }] });
    }, 850);
  };

  // Mock Radar Chart Data
  const radarData = [
    { subject: "React", A: 85, B: 90, fullMark: 100 },
    { subject: "Next.js", A: 90, B: 85, fullMark: 100 },
    { subject: "Node.js", A: 75, B: 80, fullMark: 100 },
    { subject: "Docker", A: 60, B: 85, fullMark: 100 },
    { subject: "SQL", A: 70, B: 75, fullMark: 100 },
    { subject: "System Design", A: 65, B: 80, fullMark: 100 }
  ];

  // Mock Growth Line Data
  const growthData = [
    { name: "Week 1", alignment: 65, readiness: 60 },
    { name: "Week 2", alignment: 70, readiness: 68 },
    { name: "Week 3", alignment: 78, readiness: 74 },
    { name: "Week 4", alignment: 83, readiness: 84 }
  ];

  // Sidebar list configurations
  const navigationItems = [
    { tab: "Dashboard" as ActiveTab, title: "Dashboard", subtitle: "Your Career Overview", icon: Layers, dot: false },
    { tab: "Resume" as ActiveTab, title: "Resume", subtitle: "Upload & Improve Resume", icon: FileText, dot: true },
    { tab: "Projects" as ActiveTab, title: "Projects", subtitle: "Portfolio Verification", icon: FolderGit2, dot: false },
    { tab: "Targets" as ActiveTab, title: "Targets", subtitle: "Company & Role Target", icon: Target, dot: false },
    { tab: "Roadmap" as ActiveTab, title: "Roadmap", subtitle: "Weekly Learning Plan", icon: Map, dot: true },
    { tab: "Growth" as ActiveTab, title: "Growth", subtitle: "Progress & Achievements", icon: LineChart, dot: false },
    { tab: "Settings" as ActiveTab, title: "Settings", subtitle: "Workspace Preferences", icon: SettingsIcon, dot: false }
  ];

  if (!isCompleted) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-7 w-7 text-primary animate-spin" />
          <span className="text-xs text-text-secondary/50 font-mono">Redirecting to setup...</span>
        </div>
      </div>
    );
  }

  return (
    <PageWrapper className="min-h-screen flex flex-col justify-between relative overflow-hidden bg-[#050816] text-white">
      
      {/* Background blueprint grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dashboard-blueprint" width="45" height="45" patternUnits="userSpaceOnUse">
              <path d="M 45 0 L 0 0 0 45" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dashboard-blueprint)" />
        </svg>
      </div>

      {/* TOP HEADER NAVBAR */}
      <header className="h-16 border-b border-white/[0.06] bg-[#0A0F24]/75 backdrop-blur-md px-6 flex items-center justify-between shrink-0 select-none z-30 fixed top-0 left-0 right-0">
        <div className="flex items-center gap-6">
          <span className="text-sm font-bold text-white tracking-widest font-mono uppercase">SkillLens</span>
          <span className="h-4 w-[1px] bg-white/10 hidden md:block" />
          <span className="text-[10.5px] text-text-secondary/50 font-mono tracking-wide hidden md:block">
            Production SaaS Active &bull; Secure Session
          </span>
        </div>

        {/* Global Toolbar Controls */}
        <div className="flex items-center gap-4">
          
          {/* Ctrl+K Search shortcut triggers */}
          <button 
            onClick={() => setShowSearchModal(true)}
            className="h-9 px-3.5 rounded-lg border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] text-text-secondary/50 hover:text-white transition-all text-xs flex items-center gap-4.5 cursor-pointer"
          >
            <span>Search anything...</span>
            <kbd className="text-[9px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded font-mono">Ctrl K</kbd>
          </button>

          {/* Notifications bell button */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(prev => !prev)}
              className="p-2 rounded-lg border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] text-text-secondary/50 hover:text-white transition-colors"
            >
              <Bell className="h-4 w-4" />
              {notificationsList.some(n => !n.read) && (
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </button>

            {/* Notifications Popover dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute right-0 mt-2 z-50 w-72 rounded-xl border border-white/10 bg-[#0A0F24]/95 shadow-2xl p-4 space-y-3.5"
                >
                  <div className="flex justify-between items-center border-b border-white/[0.05] pb-2">
                    <span className="text-xs font-bold text-white">Notifications</span>
                    <button 
                      onClick={() => {
                        const readList = notificationsList.map(n => ({ ...n, read: true }));
                        updateData({ notificationsList: readList });
                      }}
                      className="text-[9px] text-primary hover:underline font-bold"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {notificationsList.map(notif => (
                      <div key={notif.id} className={cn("p-2 rounded text-[10px] leading-relaxed text-left", notif.read ? "text-text-secondary/40" : "text-white bg-white/[0.01]")}>
                        <p>{notif.text}</p>
                        <span className="text-[8px] text-text-secondary/30 mt-1 block">{notif.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </header>

      {/* DYNAMIC FRAME LAYOUT CONTENT WORKSPACE */}
      <div className="flex-1 flex overflow-hidden pt-16 z-10 pb-16 md:pb-0">
        
        {/* 1. LEFT SIDEBAR (Hidden on mobile) */}
        <aside 
          className={cn(
            "hidden md:flex border-r border-white/[0.05] bg-white/[0.003] p-6 flex-col justify-between shrink-0 select-none overflow-y-auto transition-all duration-500",
            sidebarCollapsed ? "w-20 px-3" : "w-72"
          )}
        >
          <div className="space-y-6">
            
            {/* Workspace Switcher dropdown */}
            {!sidebarCollapsed ? (
              <div className="space-y-1 text-left border-b border-white/[0.05] pb-4">
                <span className="text-[9px] font-bold text-text-secondary/30 uppercase tracking-widest block px-1.5">Active Workspace</span>
                <div className="flex items-center gap-2 px-1.5 mt-1">
                  <div className="h-6 w-6 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-mono font-bold text-primary shrink-0">CW</div>
                  <div className="flex-grow overflow-hidden">
                    <span className="text-xs font-bold text-white block truncate leading-none">Career Workspace</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-mono font-bold text-primary mx-auto">
                CW
              </div>
            )}

            {/* Sidebar toggle chevron */}
            <div className="flex justify-end px-1.5">
              <button 
                onClick={() => updateData({ sidebarCollapsed: !sidebarCollapsed })}
                className="p-1 rounded bg-white/[0.02] border border-white/5 text-text-secondary/50 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer"
              >
                {sidebarCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
              </button>
            </div>

            {/* Navigation links panel */}
            <div className="space-y-1.5 pt-2">
              {navigationItems.map((item, idx) => {
                const isActive = activeTab === item.tab;
                return (
                  <div key={idx} className="relative group">
                    <button
                      onClick={() => handleTabChange(item.tab)}
                      className={cn(
                        "w-full flex items-center transition-all text-left relative",
                        sidebarCollapsed ? "justify-center p-3" : "px-4 py-3 gap-3"
                      )}
                    >
                      {/* Left side active accent indicator line */}
                      {isActive && (
                        <span className="w-[2.5px] bg-primary absolute left-0 top-1 bottom-1 rounded-full" />
                      )}

                      {/* Lucide Outline Icon */}
                      <item.icon className={cn("h-4.5 w-4.5 shrink-0 transition-colors", isActive ? "text-primary" : "text-text-secondary/50 group-hover:text-white")} />
                      
                      {/* Labels / Titles (Fades out dynamically during collapse) */}
                      {!sidebarCollapsed && (
                        <div className="flex-grow overflow-hidden">
                          <span className={cn("text-xs font-bold block leading-tight", isActive ? "text-white" : "text-text-secondary/70 group-hover:text-white")}>
                            {item.title}
                          </span>
                          <span className="text-[9.5px] text-text-secondary/30 block leading-tight truncate mt-0.5 font-medium group-hover:text-text-secondary/50">
                            {item.subtitle}
                          </span>
                        </div>
                      )}

                      {/* Floating Tooltips in Collapsed Mode */}
                      {sidebarCollapsed && (
                        <div className="absolute left-full ml-4 z-50 px-3 py-1.5 rounded border border-white/10 bg-[#0A0F24]/95 text-[10px] font-bold text-white shadow-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none transition-all">
                          {item.title} ({item.subtitle})
                        </div>
                      )}

                      {/* Subtle Notification Attention dots */}
                      {item.dot && (
                        <span className={cn("h-1.5 w-1.5 rounded-full bg-secondary shrink-0", sidebarCollapsed ? "absolute top-2 right-2" : "ml-2")} />
                      )}
                    </button>

                    {/* Single Onboarding Tooltip Bullet */}
                    {idx === 3 && !tooltipDismissed && !sidebarCollapsed && (
                      <div className="absolute left-full ml-6 top-0 z-50 w-52 p-4 rounded-xl border border-primary/20 bg-[#0A0F24]/95 shadow-2xl text-left space-y-2.5">
                        <p className="text-[10px] leading-relaxed text-white">Compare parsed capabilities against target companies benchmark baselines here.</p>
                        <button onClick={dismissTooltip} className="h-6 px-3 rounded bg-primary text-background-primary text-[9.5px] font-bold">Got it</button>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

          </div>

          {/* Bottom Career Readiness pinned widget */}
          <div className="pt-6 border-t border-white/[0.04]">
            {!sidebarCollapsed ? (
              <div className="p-4.5 bg-white/[0.01] border border-white/[0.05] rounded-xl text-left space-y-3">
                <div className="flex justify-between items-center text-[10px] text-text-secondary/50 font-semibold">
                  <span>Career Readiness</span>
                  <span className="font-bold text-white font-mono">84%</span>
                </div>
                <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden relative">
                  <div className="h-full bg-primary rounded-full" style={{ width: "84%" }} />
                </div>
                <div className="flex items-center justify-between text-[9px] text-text-secondary/30 font-mono">
                  <span>+3.2% this week</span>
                  <span>78% complete</span>
                </div>
              </div>
            ) : (
              <div className="relative h-11 w-11 flex items-center justify-center mx-auto group cursor-pointer">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="22" cy="22" r="16" className="stroke-white/[0.04] fill-none" strokeWidth="3.5" />
                  <circle cx="22" cy="22" r="16" className="stroke-primary fill-none" strokeWidth="3.5" strokeDasharray="100.5" strokeDashoffset="16" />
                </svg>
                <span className="absolute text-[8.5px] font-mono font-bold text-white">84%</span>
                <div className="absolute left-full ml-4 z-50 px-3 py-1.5 rounded border border-white/10 bg-[#0A0F24]/95 text-[10px] font-bold text-white shadow-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none transition-all shrink-0">
                  84% Career Readiness (+3.2% this week)
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* 2. ACTIVE VIEWPORT MAIN PANEL */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto relative bg-[#050816]/40 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex-grow flex flex-col justify-between"
            >
              
              {/* TAB 1: DASHBOARD HOME */}
              {activeTab === "Dashboard" && (
                <div className="space-y-8 text-left">
                  
                  {/* Section 1: Welcome Header */}
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-widest block font-mono">Home Workspace</span>
                    <h1 className="text-3xl font-extrabold text-white mt-1 tracking-tight leading-none">Good Morning, {fullName}</h1>
                    <p className="text-sm text-text-secondary/70 mt-2 max-w-xl leading-relaxed">
                      Today you're <span className="text-primary font-bold">{recalculatedScore}% aligned</span> with your target career track. Complete your docker containerization tasks next.
                    </p>
                  </div>

                  {/* Section 2: Circular Progress indicators */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="p-5.5 rounded-xl border border-white/[0.05] bg-white/[0.01] flex items-center gap-5 justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-text-secondary/40 uppercase tracking-wide">Readiness Score</span>
                        <h4 className="text-2xl font-extrabold text-white mt-1 font-mono">{recalculatedScore}%</h4>
                      </div>
                      <div className="relative h-14 w-14 shrink-0">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="28" cy="28" r="22" className="stroke-white/[0.04] fill-none" strokeWidth="4" />
                          <circle cx="28" cy="28" r="22" className="stroke-primary fill-none" strokeWidth="4" strokeDasharray="138" strokeDashoffset={138 - (138 * recalculatedScore) / 100} />
                        </svg>
                      </div>
                    </div>

                    {[
                      { label: "Resume Quality", score: "88%", color: "text-secondary" },
                      { label: "GitHub Code Sync", score: "92%", color: "text-success" },
                      { label: "Learning Road", score: "74%", color: "text-primary" }
                    ].map((metric, idx) => (
                      <div key={idx} className="p-5.5 rounded-xl border border-white/[0.05] bg-white/[0.01] flex flex-col justify-between">
                        <span className="text-[10px] font-bold text-text-secondary/40 uppercase tracking-wide block">{metric.label}</span>
                        <div className="flex items-center justify-between mt-2.5">
                          <span className={cn("text-lg font-bold font-mono", metric.color)}>{metric.score}</span>
                          <span className="text-[9px] text-text-secondary/30">Verified status</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Section 3: Quick Action Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { title: "Upload Resume", desc: "Sync latest experiences", action: () => handleTabChange("Resume") },
                      { title: "Connect GitHub", desc: "Sync repository evidence", action: () => handleTabChange("Projects") },
                      { title: "Choose Company", desc: "Adjust targeted benchmark", action: () => handleTabChange("Targets") },
                      { title: "Continue Roadmap", desc: "Inspect milestone tasks", action: () => handleTabChange("Roadmap") }
                    ].map((card, idx) => (
                      <button
                        key={idx}
                        onClick={card.action}
                        className="p-5.5 rounded-xl border border-white/5 bg-white/[0.005] hover:bg-white/[0.02] text-left hover:-translate-y-1 transition-all group flex flex-col justify-between h-32 active:scale-[0.98]"
                      >
                        <h5 className="text-xs font-bold text-white group-hover:text-primary transition-colors">{card.title}</h5>
                        <p className="text-[10px] text-text-secondary/50 mt-1 leading-relaxed">{card.desc}</p>
                      </button>
                    ))}
                  </div>

                  {/* Section 4 & 5 Split: Radar Chart & Activity log */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Recharts Radar skills matrix */}
                    <div className="p-6.5 rounded-xl border border-white/[0.05] bg-white/[0.01] flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-text-secondary/40 uppercase block mb-3">Skills hex-chart</span>
                        <div className="h-64 w-full flex items-center justify-center">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                              <PolarGrid stroke="rgba(255,255,255,0.05)" />
                              <PolarAngleAxis dataKey="subject" stroke="rgba(255,255,255,0.4)" fontSize={10} />
                              <PolarRadiusAxis stroke="rgba(255,255,255,0.05)" />
                              <Radar name="Candidate" dataKey="A" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.15} />
                              <Radar name="Target" dataKey="B" stroke="var(--secondary)" fill="var(--secondary)" fillOpacity={0.05} />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>

                    {/* Section 5: Activity Timeline */}
                    <div className="p-6.5 rounded-xl border border-white/[0.05] bg-white/[0.01] flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-text-secondary/40 uppercase block mb-4">Latest Activity Log</span>
                        
                        <div className="space-y-4 pr-1">
                          {[
                            { label: "Resume parsing completed.", time: "10 minutes ago" },
                            { label: "GitHub workspace index sync successfully completed.", time: "1 hour ago" },
                            { label: "Target benchmark company changed to Stripe.", time: "2 hours ago" },
                            { label: "Roadmap containerization tasks updated.", time: "Yesterday" }
                          ].map((act, idx) => (
                            <div key={idx} className="flex gap-4 items-start text-xs">
                              <span className="h-5 w-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                                <GitCommit className="h-3 w-3" />
                              </span>
                              <div>
                                <p className="font-semibold text-white">{act.label}</p>
                                <span className="text-[9px] text-text-secondary/40 font-mono mt-0.5 block">{act.time}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Section 6: Recommended Next Step (Single recommendation card) */}
                  <div className="p-6 rounded-xl border border-primary/15 bg-primary/5 flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden">
                    <div className="flex gap-4 items-start">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                        <Sparkles className="h-5 w-5 animate-pulse" />
                      </div>
                      <div className="text-left">
                        <span className="text-[9.5px] font-bold text-primary uppercase tracking-wider block font-mono">Recommended Next Step</span>
                        <h4 className="text-sm font-bold text-white mt-1">Docker Multi-Stage Optimization</h4>
                        <p className="text-[11.5px] text-text-secondary/70 mt-1">Close your active containerization infrastructure gap. (5 hours runtime scope)</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleTabChange("Roadmap")}
                      className="h-10 px-5 rounded-lg bg-primary hover:bg-primary/95 text-background-primary text-xs font-bold transition-all focus:outline-none shrink-0 active:scale-[0.98]"
                    >
                      Start Learning
                    </button>
                  </div>

                </div>
              )}

              {/* TAB 2: RESUME INTELLIGENCE WORKSPACE */}
              {activeTab === "Resume" && <ResumeWorkspace />}

              {/* TAB 3: PROJECTS INTELLIGENCE WORKSPACE */}
              {activeTab === "Projects" && <ProjectsWorkspace />}

              {/* TAB 4: TARGET INTELLIGENCE WORKSPACE */}
              {activeTab === "Targets" && (
                <TargetsWorkspace onNavigateTab={(tab) => handleTabChange(tab as ActiveTab)} />
              )}

              {/* TAB 5: ROADMAP INTELLIGENCE WORKSPACE */}
              {activeTab === "Roadmap" && (
                <RoadmapWorkspace onNavigateTab={(tab) => handleTabChange(tab as ActiveTab)} />
              )}

              {/* TAB 6: GROWTH PAGE */}
              {activeTab === "Growth" && (
                <GrowthWorkspace onNavigateTab={(tab) => handleTabChange(tab as ActiveTab)} />
              )}

              {/* TAB 7: SETTINGS CONFIGS */}
              {activeTab === "Settings" && (
                <SettingsWorkspace />
              )}

            </motion.div>
          </AnimatePresence>

          {/* Bottom status log bar */}
          <footer className="h-8 border-t border-white/[0.06] bg-white/[0.01] px-4 flex items-center justify-between text-[9px] text-text-secondary/40 shrink-0 font-mono select-none mt-10 md:hidden">
            <span>SkillLens Platform v3.0 &bull; Mobile Active</span>
          </footer>

        </main>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR (Visible only on screen width < 768px) */}
      <nav className="md:hidden h-16 border-t border-white/[0.06] bg-[#0A0F24]/90 backdrop-blur-md fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around select-none">
        {[
          { tab: "Dashboard" as ActiveTab, label: "Overview", icon: Layers },
          { tab: "Projects" as ActiveTab, label: "Projects", icon: FolderGit2 },
          { tab: "Roadmap" as ActiveTab, label: "Roadmap", icon: Map },
          { tab: "Growth" as ActiveTab, label: "Growth", icon: LineChart }
        ].map((item, idx) => {
          const isActive = activeTab === item.tab;
          return (
            <button
              key={idx}
              onClick={() => {
                handleTabChange(item.tab);
                setMobileMoreOpen(false);
              }}
              className={cn("flex flex-col items-center gap-1 text-[9px] transition-colors font-medium", isActive ? "text-primary" : "text-text-secondary/50 hover:text-white")}
            >
              <item.icon className="h-4.5 w-4.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
        <button
          onClick={() => setMobileMoreOpen(prev => !prev)}
          className={cn("flex flex-col items-center gap-1 text-[9px] transition-colors font-medium", mobileMoreOpen ? "text-primary" : "text-text-secondary/50 hover:text-white")}
        >
          <MoreHorizontal className="h-4.5 w-4.5" />
          <span>More</span>
        </button>
      </nav>

      {/* MOBILE "MORE" SHEET DRAWER DRAWER */}
      <AnimatePresence>
        {mobileMoreOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed bottom-16 left-0 right-0 z-40 border-t border-white/10 bg-[#0A0F24]/95 p-6 space-y-4 md:hidden shadow-[0_-15px_30px_rgba(0,0,0,0.85)] text-left"
          >
            <div className="flex justify-between items-center border-b border-white/[0.05] pb-2">
              <span className="text-xs font-bold text-white">More options</span>
              <button onClick={() => setMobileMoreOpen(false)} className="text-text-secondary/50 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { tab: "Resume" as ActiveTab, label: "Resume", icon: FileText },
                { tab: "Targets" as ActiveTab, label: "Targets", icon: Target },
                { tab: "Settings" as ActiveTab, label: "Settings", icon: SettingsIcon }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    handleTabChange(item.tab);
                    setMobileMoreOpen(false);
                  }}
                  className="p-3 bg-white/[0.02] border border-white/5 rounded-lg flex flex-col items-center gap-2 text-[10px] font-semibold text-text-secondary hover:text-white text-center hover:bg-white/[0.04] transition-all"
                >
                  <item.icon className="h-4 w-4 text-primary" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING CAREER GUIDE BOT (Bottom Right chatbot trigger) */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block select-none">
        
        {/* Toggle Button */}
        {!showGuideChat ? (
          <button 
            onClick={() => setShowGuideChat(true)}
            className="h-12 px-5 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-md text-primary hover:bg-primary/20 transition-all font-bold text-xs flex items-center gap-2 shadow-[0_4px_15px_rgba(91,140,255,0.2)] select-none cursor-pointer"
          >
            <MessageSquare className="h-4.5 w-4.5 animate-pulse" /> Career Guide
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-80 h-96 border border-white/10 rounded-2xl bg-[#0A0F24]/95 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden"
          >
            {/* Header bar */}
            <div className="h-12 px-4 border-b border-white/[0.05] bg-white/[0.01] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-xs font-bold text-white">Career Guide chat</span>
              </div>
              <button 
                onClick={() => setShowGuideChat(false)}
                className="p-1 rounded hover:bg-white/5 text-text-secondary/50 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Message History list */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 pr-2 text-xs text-left">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={cn("flex flex-col max-w-[85%] rounded-lg p-2.5", msg.sender === "user" ? "bg-primary text-background-primary ml-auto" : "bg-white/[0.02] border border-white/5 text-text-secondary mr-auto")}>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Chat Input controls bar */}
            <div className="p-3.5 border-t border-white/[0.05] bg-white/[0.005] flex gap-2">
              <input
                type="text"
                value={guideInput}
                onChange={(e) => setGuideInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
                placeholder="Ask Career Guide..."
                className="flex-1 bg-[#050816] border border-white/10 rounded-lg h-9.5 px-3 text-xs text-white placeholder-text-secondary/35 focus:outline-none focus:border-primary transition-colors"
              />
              <button 
                onClick={sendChatMessage}
                className="p-2.5 rounded-lg bg-primary hover:bg-primary/95 text-background-primary transition-all flex items-center justify-center shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

          </motion.div>
        )}

      </div>

      {/* SEARCH COMMAND PALETTE MODAL OVERLAY (Toggled via Ctrl+K) */}
      <AnimatePresence>
        {showSearchModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#050816]/75 backdrop-blur-md">
            
            {/* Backdrop close capture */}
            <div className="absolute inset-0 cursor-pointer" onClick={() => setShowSearchModal(false)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-lg rounded-xl border border-white/10 bg-[#0A0F24]/95 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col z-10"
            >
              {/* Input frame search */}
              <div className="relative border-b border-white/[0.05] flex items-center h-13 px-4">
                <Search className="h-4.5 w-4.5 text-text-secondary/40 pointer-events-none absolute left-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search pages, skills, companies, repository projects, and settings..."
                  className="w-full h-full bg-transparent pl-8 text-xs text-white placeholder-text-secondary/30 focus:outline-none ring-0"
                  autoFocus
                />
                <button 
                  onClick={() => setShowSearchModal(false)}
                  className="p-1 rounded hover:bg-white/5 text-text-secondary/50 hover:text-white"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Matched list scrollbox */}
              <div className="p-2 max-h-64 overflow-y-auto space-y-0.5 text-left">
                {getSearchItems().map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSearchSelect(item)}
                    className="w-full px-3 py-2.5 rounded text-xs text-text-secondary hover:text-white hover:bg-white/[0.02] transition-colors flex items-center justify-between group"
                  >
                    <span>{item.name}</span>
                    <span className="text-[8px] uppercase font-mono tracking-wider text-primary border border-primary/20 bg-primary/5 px-2 py-0.5 rounded">
                      {item.type}
                    </span>
                  </button>
                ))}
                {getSearchItems().length === 0 && (
                  <div className="py-8 text-center text-xs text-text-secondary/45 italic">
                    No results matched your search.
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Unsaved Changes Tab Interceptor Dialog */}
      <AnimatePresence>
        {showUnsavedChangesModal && pendingTab && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-sm rounded-xl border border-white/10 bg-[#0A0F24] p-5 shadow-2xl space-y-4 text-left font-mono"
            >
              <div className="flex items-center gap-2 border-b border-white/[0.05] pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Unsaved changes
                </span>
              </div>

              <p className="text-xs text-text-secondary/80 leading-relaxed">
                You have unsaved changes. Do you want to save them before switching tabs?
              </p>

              <div className="flex flex-col gap-2 pt-2 text-xs font-bold">
                <button
                  onClick={() => {
                    saveSettings();
                    setActiveTab(pendingTab);
                    setShowUnsavedChangesModal(false);
                    setPendingTab(null);
                  }}
                  className="h-9 w-full rounded bg-primary hover:bg-primary/90 text-background-primary transition-all flex items-center justify-center cursor-pointer"
                >
                  Save & Continue
                </button>
                <button
                  onClick={() => {
                    updateData({ settingsDirty: false });
                    setActiveTab(pendingTab);
                    setShowUnsavedChangesModal(false);
                    setPendingTab(null);
                  }}
                  className="h-9 w-full rounded border border-danger/25 bg-danger/5 hover:bg-danger/10 text-danger transition-all flex items-center justify-center cursor-pointer"
                >
                  Discard & Continue
                </button>
                <button
                  onClick={() => {
                    setShowUnsavedChangesModal(false);
                    setPendingTab(null);
                  }}
                  className="h-9 w-full rounded border border-white/10 hover:bg-white/5 text-text-secondary transition-all flex items-center justify-center cursor-pointer"
                >
                  Stay
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </PageWrapper>
  );
}
