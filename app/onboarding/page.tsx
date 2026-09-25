"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Search, 
  UploadCloud, 
  Terminal, 
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  Github,
  Loader2,
  FileCheck,
  Compass,
  FileText,
  Briefcase,
  Layers,
  Map,
  Target,
  LineChart,
  Settings,
  ShieldCheck,
  Code2,
  GitCommit,
  ExternalLink,
  Info
} from "lucide-react";

import { useOnboardingStore } from "@/store/onboarding-store";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Combobox } from "@/components/onboarding/shared/combobox";
import { ProfileStrength } from "@/components/onboarding/summary/profile-strength";

// 1. ZOD VALIDATION FOR PROFILE
const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  jobTitle: z.string().min(2, "Job title must be at least 2 characters."),
  experienceYears: z.string().min(1, "Specify years of experience."),
  country: z.string().min(2, "Specify country name."),
  education: z.string().optional(),
  linkedin: z.string().url("Please enter a valid URL.").or(z.literal("")),
  portfolio: z.string().url("Please enter a valid URL.").or(z.literal(""))
});

type ProfileInput = z.infer<typeof profileSchema>;

const INDUSTRIES = [
  "Product Company", "Startup", "Enterprise", "FinTech", "Healthcare", "AI", "Cybersecurity", "Gaming", "E-Commerce", "SaaS"
];

const EXPERIENCE_LEVELS = [
  "Intern", "Junior", "Mid-Level", "Senior", "Staff", "Principal", "Lead", "Engineering Manager"
];

const POPULAR_COMPANIES = [
  "Google", "Microsoft", "Amazon", "Apple", "Meta", "Netflix", "Stripe", "OpenAI", "NVIDIA", "Adobe", "Uber", "Airbnb", "Atlassian"
];

const POPULAR_ROLES = [
  "Frontend Engineer", "Backend Engineer", "Software Engineer", "Full Stack Engineer", "AI Engineer", "Machine Learning Engineer", "Cloud Engineer", "DevOps Engineer"
];

export default function OnboardingPage() {
  const router = useRouter();

  // Onboarding Zustand bind
  const {
    step,
    fullName,
    jobTitle,
    experienceYears,
    country,
    education,
    linkedin,
    portfolio,
    profilePicture,
    resumeName,
    resumeUploadStatus,
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
    isCompleted,
    onboardingRestored,
    setStep,
    updateData,
    getProfileStrength
  } = useOnboardingStore();

  // React Hook Form for Profile Setup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      fullName: fullName || "",
      jobTitle: jobTitle || "",
      experienceYears: experienceYears || "0 Years",
      country: country || "",
      education: education || "",
      linkedin: linkedin || "",
      portfolio: portfolio || ""
    }
  });

  // Local state controls
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [companyOptions, setCompanyOptions] = useState<string[]>([]);
  const [roleOptions, setRoleOptions] = useState<string[]>([]);
  
  // Loading animations state
  const [parsingStep, setParsingStep] = useState(0);
  const [parsingLogs, setParsingLogs] = useState<string[]>([]);
  const [gitStep, setGitStep] = useState(0);
  const [gitLogs, setGitLogs] = useState<string[]>([]);
  
  // Analysis Pipeline loading state
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisLogs, setAnalysisLogs] = useState<string[]>([]);

  // Drag state for profile picture
  const [dragActive, setDragActive] = useState(false);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(profilePicture);

  // Restore progress check toast
  useEffect(() => {
    if (step > 1 && !onboardingRestored) {
      setToastMessage("Welcome back! Your onboarding progress has been restored.");
      updateData({ onboardingRestored: true });
      setTimeout(() => setToastMessage(null), 3000);
    }
  }, [step, onboardingRestored, updateData]);

  // Fetch mock companies and roles from public JSON endpoints
  useEffect(() => {
    fetch("/data/companies.json")
      .then((res) => res.json())
      .then((data) => setCompanyOptions(data.map((c: any) => c.name)))
      .catch(() => setCompanyOptions(POPULAR_COMPANIES));

    fetch("/data/roles.json")
      .then((res) => res.json())
      .then((data) => setRoleOptions(data))
      .catch(() => setRoleOptions(POPULAR_ROLES));
  }, []);

  // Sync form state with Zustand
  useEffect(() => {
    if (fullName) setValue("fullName", fullName);
    if (jobTitle) setValue("jobTitle", jobTitle);
    if (experienceYears) setValue("experienceYears", experienceYears);
    if (country) setValue("country", country);
    if (education) setValue("education", education);
    if (linkedin) setValue("linkedin", linkedin);
    if (portfolio) setValue("portfolio", portfolio);
  }, [fullName, jobTitle, experienceYears, country, education, linkedin, portfolio, setValue]);

  // NAVIGATION ACTIONS
  const handleNext = () => {
    if (step < 8) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleProfileSubmit = (data: ProfileInput) => {
    updateData({
      fullName: data.fullName,
      jobTitle: data.jobTitle,
      experienceYears: data.experienceYears,
      country: data.country,
      education: data.education,
      linkedin: data.linkedin,
      portfolio: data.portfolio,
      profilePicture: profilePicPreview
    });
    handleNext();
  };

  // Profile image upload handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // RESUME STAGED PROCESS SIMULATION
  const startResumeParsing = () => {
    updateData({ resumeUploadStatus: "parsing" });
    setParsingStep(0);
    setParsingLogs([]);

    const stages = [
      "Uploading Resume...",
      "Extracting Text...",
      "Detecting Sections...",
      "Finding Work Experience...",
      "Extracting Skills...",
      "Identifying Projects...",
      "Reading Certifications...",
      "Matching Technologies...",
      "Building Candidate Profile...",
      "Resume Successfully Parsed"
    ];

    stages.forEach((stage, idx) => {
      setTimeout(() => {
        setParsingStep(idx + 1);
        setParsingLogs(prev => [...prev, `✓ ${stage}`]);
        
        if (idx === stages.length - 1) {
          // Fetch mock parsed resume.json
          fetch("/data/resume.json")
            .then(res => res.json())
            .then(data => {
              updateData({
                resumeName: "Pranav_Resume.pdf",
                resumeUploadStatus: "done",
                resumeExtractedSkills: data.skills,
                resumeExtractedProjects: data.experience.map((e: any) => e.role),
                resumeExperience: data.experience,
                resumeEducation: data.education,
                resumeCertifications: data.certifications
              });
              setTimeout(() => handleNext(), 1200);
            });
        }
      }, (idx + 1) * 350);
    });
  };

  // GITHUB STAGED CONNECTOR SIMULATION
  const startGithubSync = () => {
    setGitStep(1);
    setGitLogs([]);

    const stages = [
      "Authenticating oauth scope key...",
      "Loading public repositories...",
      "Reading dynamic commit index...",
      "Detecting framework environments...",
      "Verifying project evidence...",
      "Connection Successful!"
    ];

    stages.forEach((stage, idx) => {
      setTimeout(() => {
        setGitStep(idx + 1);
        setGitLogs(prev => [...prev, `[git] ${stage}`]);

        if (idx === stages.length - 1) {
          fetch("/data/repositories.json")
            .then(res => res.json())
            .then(data => {
              updateData({
                githubConnected: true,
                githubAccount: "pranav-dev",
                githubReposCount: data.length,
                githubRepos: data
              });
              setTimeout(() => handleNext(), 1200);
            });
        }
      }, (idx + 1) * 450);
    });
  };

  // STEP 7 CINEMATIC ANALYSIS SYSTEM PIPELINE TIMER
  useEffect(() => {
    if (step === 7) {
      setAnalysisProgress(0);
      setAnalysisLogs([]);

      const stages = [
        "Analyzing Resume Work History...",
        "Building Core Capability Skill Graph...",
        "Analyzing GitHub Codebase Commits...",
        "Comparing Company Requirement Benchmarks...",
        "Calculating Skills Gap Metrics...",
        "Generating Weekly Milestone Roadmap...",
        "Preparing Workspace Dashboard..."
      ];

      stages.forEach((stage, idx) => {
        setTimeout(() => {
          setAnalysisLogs(prev => [...prev, `✓ ${stage}`]);
          setAnalysisProgress(Math.floor(((idx + 1) / stages.length) * 100));

          if (idx === stages.length - 1) {
            setTimeout(() => handleNext(), 1200);
          }
        }, (idx + 1) * 600);
      });
    }
  }, [step]);

  return (
    <PageWrapper className="min-h-screen py-10 flex flex-col justify-between items-center relative overflow-hidden bg-[#050816] text-white">
      
      {/* Background design accents */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="onboarding-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#onboarding-grid)" />
        </svg>
      </div>

      {/* Floating restore toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 15, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 15, x: "-50%" }}
            className="fixed top-8 left-1/2 z-50 px-4 py-2.5 rounded-lg border border-primary/20 bg-[#0A0F24]/90 backdrop-blur-md shadow-2xl text-xs font-semibold text-white tracking-wide"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* STEP 1: WELCOME SCREEN */}
      {step === 1 && (
        <motion.div
          key="welcome"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center text-center my-auto space-y-7 z-10"
        >
          <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(91,140,255,0.25)] animate-pulse">
            <Sparkles className="h-7 w-7" />
          </div>
          <div className="space-y-3.5">
            <h1 className="text-4xl font-extrabold text-white tracking-tight leading-none">Welcome to SkillLens</h1>
            <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
              Let's personalize your workspace. This takes less than two minutes.
            </p>
          </div>
          <button
            onClick={handleNext}
            className="h-12 px-8 rounded-lg bg-primary hover:bg-primary/95 text-background-primary text-xs font-bold transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Start Setup <ArrowRight className="h-4.5 w-4.5" />
          </button>
        </motion.div>
      )}

      {/* PERSISTENT APPLICATION ONBOARDING CARD SHELL */}
      {step > 1 && step < 8 && (
        <div className="max-w-[1800px] w-[95vw] h-[88vh] mx-auto flex items-center justify-center relative z-10">
          <div className="w-full h-full rounded-2xl border border-white/[0.08] bg-[#0A0F24]/85 shadow-[0_30px_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col relative">
            
            {/* Nav Header */}
            <header className="h-16 border-b border-white/[0.06] bg-white/[0.01] px-6 flex items-center justify-between shrink-0 select-none">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-white tracking-widest font-mono uppercase">SkillLens</span>
                <span className="h-4 w-[1px] bg-white/10" />
                <span className="text-xs text-text-secondary/50 font-mono">Workspace Onboarding Mode</span>
              </div>
              <div className="text-[10px] text-text-secondary/50 font-mono">Chassis v3.0 &bull; Secure Setup</div>
            </header>

            {/* Split Sidebar & center viewport */}
            <div className="flex flex-1 overflow-hidden">
              
              {/* Sidebar Checklist Indicator */}
              <aside className="w-72 border-r border-r-white/[0.05] bg-white/[0.003] p-6 flex flex-col justify-between shrink-0 select-none">
                <div className="space-y-6">
                  <span className="text-xs font-bold text-text-secondary/30 uppercase tracking-widest block px-1.5 mb-3">Setup Progress</span>
                  
                  {/* Step Item Links */}
                  <div className="space-y-1.5">
                    {[
                      { stepPointer: 2, label: "Profile Info" },
                      { stepPointer: 3, label: "Resume Upload" },
                      { stepPointer: 4, label: "GitHub Sync" },
                      { stepPointer: 5, label: "Career Target" },
                      { stepPointer: 6, label: "Review Setup" },
                      { stepPointer: 7, label: "Platform Analysis" }
                    ].map((tracker, idx) => {
                      const isActive = step === tracker.stepPointer;
                      const isCompleted = step > tracker.stepPointer;
                      return (
                        <div
                          key={idx}
                          className={cn(
                            "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold border transition-all",
                            isActive 
                              ? "bg-primary/5 border-primary/20 text-white" 
                              : "border-transparent text-text-secondary/60"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div 
                              className={cn(
                                "h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-mono border",
                                isCompleted 
                                  ? "bg-success/10 border-success/20 text-success" 
                                  : isActive 
                                    ? "bg-primary/10 border-primary/20 text-primary" 
                                    : "bg-white/[0.02] border-white/5 text-text-secondary/30"
                              )}
                            >
                              {isCompleted ? <Check className="h-3 w-3" /> : `0${idx + 1}`}
                            </div>
                            <span>{tracker.label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Profile Strength indicator Widget */}
                <ProfileStrength />
              </aside>

              {/* CENTER DISPLAY AREA */}
              <main className="flex-1 p-10 overflow-y-auto relative bg-[#050816]/40 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  
                  {/* STEP 2: PROFILE SETUP */}
                  {step === 2 && (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col justify-between flex-grow"
                    >
                      <div className="space-y-1 text-left">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest block">Step 01 / Profile</span>
                        <h2 className="text-xl font-bold text-white tracking-tight">Create your profile parameters</h2>
                      </div>

                      <form onSubmit={handleSubmit(handleProfileSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6.5 my-8">
                        <div className="space-y-4 flex flex-col justify-center text-left">
                          
                          {/* Full Name */}
                          <div className="relative">
                            <input
                              type="text"
                              {...register("fullName")}
                              className={cn(
                                "w-full bg-white/[0.02] border rounded-lg h-11 px-4 text-xs text-white placeholder-transparent focus:outline-none transition-all",
                                errors.fullName ? "border-danger" : "border-white/10 focus:border-primary"
                              )}
                              placeholder="Full Name"
                            />
                            <label className="absolute left-4 top-3 text-[10px] text-text-secondary/50 font-semibold pointer-events-none transition-all">Full Name</label>
                            {errors.fullName && <p className="text-[9px] text-danger mt-1">{errors.fullName.message}</p>}
                          </div>

                          {/* Job Title */}
                          <div className="relative">
                            <input
                              type="text"
                              {...register("jobTitle")}
                              className={cn(
                                "w-full bg-white/[0.02] border rounded-lg h-11 px-4 text-xs text-white placeholder-transparent focus:outline-none transition-all",
                                errors.jobTitle ? "border-danger" : "border-white/10 focus:border-primary"
                              )}
                              placeholder="Job Title"
                            />
                            <label className="absolute left-4 top-3 text-[10px] text-text-secondary/50 font-semibold pointer-events-none transition-all">Job Title</label>
                            {errors.jobTitle && <p className="text-[9px] text-danger mt-1">{errors.jobTitle.message}</p>}
                          </div>

                          {/* Country & Years of Experience */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                              <input
                                type="text"
                                {...register("country")}
                                className={cn(
                                  "w-full bg-white/[0.02] border rounded-lg h-11 px-4 text-xs text-white placeholder-transparent focus:outline-none transition-all",
                                  errors.country ? "border-danger" : "border-white/10 focus:border-primary"
                                )}
                                placeholder="Country"
                              />
                              <label className="absolute left-4 top-3 text-[10px] text-text-secondary/50 font-semibold pointer-events-none transition-all">Country</label>
                              {errors.country && <p className="text-[9px] text-danger mt-1">{errors.country.message}</p>}
                            </div>
                            <div className="relative">
                              <select
                                {...register("experienceYears")}
                                className="w-full bg-[#050816] border border-white/10 rounded-lg h-11 px-4.5 text-xs text-white focus:outline-none focus:border-primary transition-all cursor-pointer"
                              >
                                <option value="0 Years">0 Years</option>
                                <option value="1-2 Years">1-2 Years</option>
                                <option value="3-5 Years">3-5 Years</option>
                                <option value="5-8 Years">5-8 Years</option>
                                <option value="8+ Years">8+ Years</option>
                              </select>
                            </div>
                          </div>

                          {/* Optional Fields (LinkedIn, Portfolio) */}
                          <div className="relative">
                            <input
                              type="text"
                              {...register("linkedin")}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-lg h-11 px-4 text-xs text-white placeholder-transparent focus:outline-none focus:border-primary transition-all"
                              placeholder="LinkedIn URL"
                            />
                            <label className="absolute left-4 top-3 text-[10px] text-text-secondary/50 font-semibold pointer-events-none transition-all">LinkedIn profile (optional)</label>
                          </div>

                        </div>

                        {/* Drag and Drop Profile Image */}
                        <div
                          onDragEnter={handleDrag}
                          onDragOver={handleDrag}
                          onDragLeave={handleDrag}
                          onDrop={handleDrop}
                          className={cn(
                            "rounded-xl border flex flex-col items-center justify-center p-6 text-center transition-all min-h-[190px] border-dashed",
                            dragActive ? "border-primary bg-primary/5" : "border-white/10 bg-white/[0.01]",
                            profilePicPreview && "border-solid border-white/15"
                          )}
                        >
                          {profilePicPreview ? (
                            <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-primary/20 shadow-md group mx-auto">
                              <img src={profilePicPreview} alt="Profile" className="h-full w-full object-cover" />
                              <button 
                                type="button" 
                                onClick={() => setProfilePicPreview(null)}
                                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[9px] font-bold text-white focus:outline-none"
                              >
                                Remove
                              </button>
                            </div>
                          ) : (
                            <>
                              <UploadCloud className="h-8 w-8 text-text-secondary/40 animate-pulse mb-3" />
                              <p className="text-xs font-bold text-white">Drag & drop profile picture</p>
                              <p className="text-[10px] text-text-secondary/50 mt-1">or browse files from system</p>
                            </>
                          )}
                        </div>
                      </form>

                      {/* Footer actions */}
                      <div className="border-t border-white/[0.05] pt-4.5 flex items-center justify-end">
                        <button
                          onClick={handleSubmit(handleProfileSubmit)}
                          className="h-11 px-6 rounded-lg bg-primary hover:bg-primary/95 text-background-primary text-xs font-bold flex items-center gap-1.5 shadow-lg active:scale-[0.98]"
                        >
                          Continue Setup <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: RESUME UPLOAD */}
                  {step === 3 && (
                    <motion.div
                      key="resume"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col justify-between flex-grow"
                    >
                      <div className="space-y-1 text-left">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest block">Step 02 / Resume</span>
                        <h2 className="text-xl font-bold text-white tracking-tight">Ingest your technical resume</h2>
                      </div>

                      <div className="my-6">
                        {resumeUploadStatus === "idle" && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            
                            {/* Drag and Drop Zone */}
                            <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.005] p-8 text-center flex flex-col items-center justify-center min-h-[190px]">
                              <UploadCloud className="h-8 w-8 text-text-secondary/40 animate-pulse mb-3" />
                              <p className="text-xs font-bold text-white">Drag & drop PDF / DOCX</p>
                              <p className="text-[10px] text-text-secondary/50 mt-1">or browse files from system</p>
                            </div>

                            {/* Demo file button options */}
                            <div className="rounded-xl border border-white/5 bg-white/[0.01] p-8 text-center flex flex-col items-center justify-center min-h-[190px] justify-between">
                              <div>
                                <FileText className="h-8 w-8 text-primary/80 mb-2.5 mx-auto" />
                                <h4 className="text-xs font-bold text-white">No resume file ready?</h4>
                                <p className="text-[10px] text-text-secondary mt-1 max-w-[200px] mx-auto">Use our preloaded candidate model for testing parser outputs.</p>
                              </div>
                              <button
                                onClick={startResumeParsing}
                                className="h-10 px-5 rounded-lg border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 text-xs font-bold transition-all"
                              >
                                Use Demo Resume
                              </button>
                            </div>

                          </div>
                        )}

                        {resumeUploadStatus === "parsing" && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6.5 p-6 rounded-xl border border-white/[0.05] bg-white/[0.003] min-h-[220px]">
                            
                            {/* Left panel logging checklist */}
                            <div className="space-y-1.5 text-left font-mono text-[10px] text-success overflow-y-auto pr-1">
                              {parsingLogs.map((log, idx) => (
                                <div key={idx}>{log}</div>
                              ))}
                            </div>

                            {/* Right panel progress status */}
                            <div className="flex flex-col items-center justify-center text-center space-y-4">
                              <Loader2 className="h-8 w-8 text-primary animate-spin" />
                              <div>
                                <h4 className="text-xs font-bold text-white">Running Parser Simulator</h4>
                                <span className="text-[9.5px] text-text-secondary/40 font-mono mt-1 block">Index: {parsingStep * 10}%</span>
                              </div>
                            </div>

                          </div>
                        )}

                        {resumeUploadStatus === "done" && (
                          <div className="p-6 rounded-xl border border-white/[0.05] bg-white/[0.01] space-y-5 text-left min-h-[220px]">
                            <div className="flex items-center gap-3 border-b border-white/[0.05] pb-3">
                              <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                              <div>
                                <h4 className="text-xs font-bold text-white">{resumeName}</h4>
                                <span className="text-[9.5px] text-success font-semibold">Extracted metadata successfully</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-1.5">Parsed Skills</span>
                                <div className="flex flex-wrap gap-1">
                                  {resumeExtractedSkills.slice(0, 6).map((skill, idx) => (
                                    <Badge key={idx} variant="outline" className="text-[9.5px] bg-white/[0.01]">{skill}</Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1.5">Experience timeline</span>
                                <div className="space-y-1">
                                  {resumeExperience.slice(0, 2).map((exp, idx) => (
                                    <div key={idx} className="text-[10px]">
                                      <p className="font-bold text-white leading-none">{exp.role}</p>
                                      <span className="text-text-secondary/60 text-[9px]">{exp.company} &bull; {exp.period}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Footer Actions */}
                      <div className="border-t border-white/[0.05] pt-4.5 flex items-center justify-between">
                        <button onClick={handleBack} className="h-11 px-5 rounded-lg border border-white/10 hover:bg-white/[0.02] text-xs font-bold flex items-center gap-1.5">
                          <ArrowLeft className="h-4 w-4" /> Back
                        </button>
                        <button
                          disabled={resumeUploadStatus !== "done"}
                          onClick={handleNext}
                          className="h-11 px-6 rounded-lg bg-primary hover:bg-primary/95 text-background-primary text-xs font-bold flex items-center gap-1.5 shadow-lg disabled:opacity-50"
                        >
                          Continue Setup <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: GITHUB SYNC */}
                  {step === 4 && (
                    <motion.div
                      key="github"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col justify-between flex-grow"
                    >
                      <div className="space-y-1 text-left">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest block">Step 03 / GitHub</span>
                        <h2 className="text-xl font-bold text-white tracking-tight">Connect your developer repositories</h2>
                      </div>

                      <div className="my-6">
                        {gitStep === 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            
                            {/* OAuth sync options */}
                            <div className="rounded-xl border border-white/5 bg-white/[0.005] p-8 text-center flex flex-col items-center justify-center min-h-[190px] justify-between">
                              <div>
                                <Github className="h-8 w-8 text-white mb-2.5 mx-auto animate-pulse" />
                                <h4 className="text-xs font-bold text-white">Import code history</h4>
                                <p className="text-[10px] text-text-secondary mt-1 max-w-[200px] mx-auto">Sync commits and active language metrics directly.</p>
                              </div>
                              <button className="h-10 px-5 rounded-lg bg-white text-background-primary hover:bg-white/95 text-xs font-bold transition-all flex items-center gap-1.5">
                                <Github className="h-3.5 w-3.5" /> Connect GitHub
                              </button>
                            </div>

                            {/* Demo repo option */}
                            <div className="rounded-xl border border-white/5 bg-white/[0.01] p-8 text-center flex flex-col items-center justify-center min-h-[190px] justify-between">
                              <div>
                                <Compass className="h-8 w-8 text-secondary/80 mb-2.5 mx-auto" />
                                <h4 className="text-xs font-bold text-white">Use preloaded projects</h4>
                                <p className="text-[10px] text-text-secondary mt-1 max-w-[200px] mx-auto">Sync test repositories and mock index files.</p>
                              </div>
                              <button
                                onClick={startGithubSync}
                                className="h-10 px-5 rounded-lg border border-secondary/20 bg-secondary/5 text-secondary hover:bg-secondary/10 text-xs font-bold transition-all"
                              >
                                Connect Demo Repo
                              </button>
                            </div>

                          </div>
                        )}

                        {gitStep > 0 && gitStep < 6 && (
                          <div className="rounded-xl border border-white/5 bg-[#050816] p-4 flex flex-col font-mono text-[9px] text-[#A6E22E] max-h-36 overflow-y-auto text-left space-y-1">
                            {gitLogs.map((log, idx) => (
                              <div key={idx}>{log}</div>
                            ))}
                          </div>
                        )}

                        {githubConnected && (
                          <div className="space-y-4 text-left">
                            <div className="flex items-center gap-3 border-b border-white/[0.05] pb-2.5">
                              <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                              <div>
                                <h4 className="text-xs font-bold text-white">github.com/{githubAccount}</h4>
                                <span className="text-[9.5px] text-success font-semibold">Indexed {githubReposCount} repositories</span>
                              </div>
                            </div>

                            {/* Dynamic repo cards list */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-36 overflow-y-auto pr-1">
                              {githubRepos.slice(0, 2).map((repo, idx) => (
                                <div key={idx} className="p-3 bg-white/[0.01] border border-white/[0.05] rounded-lg flex items-center justify-between">
                                  <div>
                                    <span className="text-xs font-bold text-white">{repo.name}</span>
                                    <p className="text-[9px] text-text-secondary/60 mt-1">{repo.language} &bull; {repo.commits} commits</p>
                                  </div>
                                  <Badge variant="outline" className="text-[8px] uppercase tracking-wider text-success border-success/20 bg-success/5">Verified</Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Footer Actions */}
                      <div className="border-t border-white/[0.05] pt-4.5 flex items-center justify-between">
                        <button onClick={handleBack} className="h-11 px-5 rounded-lg border border-white/10 hover:bg-white/[0.02] text-xs font-bold flex items-center gap-1.5">
                          <ArrowLeft className="h-4 w-4" /> Back
                        </button>
                        <button
                          disabled={!githubConnected}
                          onClick={handleNext}
                          className="h-11 px-6 rounded-lg bg-primary hover:bg-primary/95 text-background-primary text-xs font-bold flex items-center gap-1.5 shadow-lg disabled:opacity-50"
                        >
                          Continue Setup <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 5: CAREER TARGET */}
                  {step === 5 && (
                    <motion.div
                      key="career"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col justify-between flex-grow"
                    >
                      <div className="space-y-1 text-left">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest block">Step 04 / Goals</span>
                        <h2 className="text-xl font-bold text-white tracking-tight">Define targeted career goals</h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6.5 my-6 text-left">
                        
                        {/* Target inputs column */}
                        <div className="space-y-4 md:col-span-2">
                          
                          {/* Autocomplete Target Company */}
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-semibold text-text-secondary/50 uppercase tracking-wide">Target Company</span>
                            <Combobox
                              value={targetCompany}
                              onChange={(val) => updateData({ targetCompany: val })}
                              options={companyOptions}
                              placeholder="Search target company..."
                            />
                          </div>

                          {/* Autocomplete Target Role */}
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-semibold text-text-secondary/50 uppercase tracking-wide">Target Role</span>
                            <Combobox
                              value={targetRole}
                              onChange={(val) => updateData({ targetRole: val })}
                              options={roleOptions}
                              placeholder="Search target role..."
                            />
                          </div>

                          {/* Preferred Industry selector chips */}
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-semibold text-text-secondary/50 uppercase tracking-wide block">Preferred Industry Segment</span>
                            <div className="flex flex-wrap gap-1.5">
                              {INDUSTRIES.map((ind, idx) => {
                                const isSelected = preferredIndustry === ind;
                                return (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => updateData({ preferredIndustry: ind })}
                                    className={cn(
                                      "px-3 py-1 rounded-full border text-[10px] font-semibold transition-all duration-300",
                                      isSelected 
                                        ? "bg-primary text-background-primary border-primary" 
                                        : "bg-white/[0.01] border-white/10 text-text-secondary hover:text-white"
                                    )}
                                  >
                                    {ind}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Experience levels selector cards */}
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-semibold text-text-secondary/50 uppercase tracking-wide block">Experience Level</span>
                            <div className="grid grid-cols-4 gap-2">
                              {EXPERIENCE_LEVELS.slice(0, 4).map((lvl, idx) => {
                                const isSelected = experienceLevel === lvl;
                                return (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => updateData({ experienceLevel: lvl })}
                                    className={cn(
                                      "p-2.5 rounded-lg border text-center text-[10px] font-bold transition-all",
                                      isSelected 
                                        ? "bg-secondary/5 border-secondary/30 text-secondary" 
                                        : "bg-white/[0.01] border-white/5 text-text-secondary/60 hover:text-white"
                                    )}
                                  >
                                    {lvl}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                        </div>

                        {/* Live Summary Panel column */}
                        <div className="rounded-xl border border-white/[0.05] bg-white/[0.005] p-5 flex flex-col justify-between h-full min-h-[220px]">
                          <div>
                            <span className="text-[9px] font-bold text-primary uppercase tracking-widest block border-b border-white/[0.04] pb-2 mb-3">Live summary scope</span>
                            <div className="space-y-3.5 text-xs">
                              <div>
                                <span className="text-[9px] text-text-secondary/40 block">Target benchmark</span>
                                <span className="text-white font-bold leading-relaxed">{targetCompany || "Pending Selection"}</span>
                              </div>
                              <div>
                                <span className="text-[9px] text-text-secondary/40 block">Engineering target</span>
                                <span className="text-white font-bold leading-relaxed">{targetRole || "Pending Selection"}</span>
                              </div>
                              <div>
                                <span className="text-[9px] text-text-secondary/40 block">Seniority Index</span>
                                <span className="text-white font-bold leading-relaxed">{experienceLevel} ({experienceYears})</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 text-[10px] text-text-secondary/50 border-t border-white/[0.04] pt-3 mt-3">
                            <Info className="h-3.5 w-3.5 shrink-0 text-primary" />
                            <span>Calculated scope compiles instantly.</span>
                          </div>
                        </div>

                      </div>

                      {/* Footer Actions */}
                      <div className="border-t border-white/[0.05] pt-4.5 flex items-center justify-between">
                        <button onClick={handleBack} className="h-11 px-5 rounded-lg border border-white/10 hover:bg-white/[0.02] text-xs font-bold flex items-center gap-1.5">
                          <ArrowLeft className="h-4 w-4" /> Back
                        </button>
                        <button
                          disabled={!targetCompany || !targetRole || !preferredIndustry}
                          onClick={handleNext}
                          className="h-11 px-6 rounded-lg bg-primary hover:bg-primary/95 text-background-primary text-xs font-bold flex items-center gap-1.5 shadow-lg disabled:opacity-50"
                        >
                          Continue Setup <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 6: SUMMARY REVIEW */}
                  {step === 6 && (
                    <motion.div
                      key="review"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col justify-between flex-grow"
                    >
                      <div className="space-y-1 text-left">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest block">Step 05 / Review</span>
                        <h2 className="text-xl font-bold text-white tracking-tight">Validate workspace parameters</h2>
                      </div>

                      {/* Summary dashboard grid */}
                      <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[260px] overflow-y-auto pr-1 text-left">
                        
                        {/* Profile Info Summary card */}
                        <div className="p-4 bg-white/[0.01] border border-white/[0.04] rounded-xl flex items-start justify-between">
                          <div>
                            <span className="text-[9.5px] font-bold text-primary uppercase tracking-wide block mb-1">Personal Profile</span>
                            <h4 className="text-xs font-bold text-white leading-relaxed">{fullName}</h4>
                            <p className="text-[10px] text-text-secondary/60">{jobTitle} &bull; {country}</p>
                          </div>
                          <button onClick={() => setStep(2)} className="text-[10px] text-primary font-bold hover:underline">Edit</button>
                        </div>

                        {/* Resume Summary card */}
                        <div className="p-4 bg-white/[0.01] border border-white/[0.04] rounded-xl flex items-start justify-between">
                          <div>
                            <span className="text-[9.5px] font-bold text-secondary uppercase tracking-wide block mb-1">Resume file</span>
                            <h4 className="text-xs font-bold text-white leading-relaxed">{resumeName || "Not Connected"}</h4>
                            <p className="text-[10px] text-text-secondary/60">{resumeExtractedSkills.length} parsed capabilities</p>
                          </div>
                          <button onClick={() => setStep(3)} className="text-[10px] text-primary font-bold hover:underline">Edit</button>
                        </div>

                        {/* GitHub Summary card */}
                        <div className="p-4 bg-white/[0.01] border border-white/[0.04] rounded-xl flex items-start justify-between">
                          <div>
                            <span className="text-[9.5px] font-bold text-success uppercase tracking-wide block mb-1">GitHub repository</span>
                            <h4 className="text-xs font-bold text-white leading-relaxed">github.com/{githubAccount || "Not Connected"}</h4>
                            <p className="text-[10px] text-text-secondary/60">{githubReposCount} repositories active</p>
                          </div>
                          <button onClick={() => setStep(4)} className="text-[10px] text-primary font-bold hover:underline">Edit</button>
                        </div>

                        {/* Career Goal targets Summary card */}
                        <div className="p-4 bg-white/[0.01] border border-white/[0.04] rounded-xl flex items-start justify-between">
                          <div>
                            <span className="text-[9.5px] font-bold text-primary uppercase tracking-wide block mb-1">Target objectives</span>
                            <h4 className="text-xs font-bold text-white leading-relaxed">{targetRole} at {targetCompany}</h4>
                            <p className="text-[10px] text-text-secondary/60">Preferred Industry: {preferredIndustry}</p>
                          </div>
                          <button onClick={() => setStep(5)} className="text-[10px] text-primary font-bold hover:underline">Edit</button>
                        </div>

                      </div>

                      {/* Footer Actions */}
                      <div className="border-t border-white/[0.05] pt-4.5 flex items-center justify-between">
                        <button onClick={handleBack} className="h-11 px-5 rounded-lg border border-white/10 hover:bg-white/[0.02] text-xs font-bold flex items-center gap-1.5">
                          <ArrowLeft className="h-4 w-4" /> Back
                        </button>
                        <button
                          onClick={handleNext}
                          className="h-11 px-6 rounded-lg bg-primary hover:bg-primary/95 text-background-primary text-xs font-bold flex items-center gap-1.5 shadow-lg active:scale-[0.98]"
                        >
                          Generate My Career Analysis <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 7: CINEMATIC ANALYSIS GENERATOR */}
                  {step === 7 && (
                    <motion.div
                      key="analysis"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-8 my-auto min-h-[300px]"
                    >
                      {/* Left Panel: Monospace status logs timeline */}
                      <div className="rounded-xl border border-white/5 bg-[#050816] p-5 flex flex-col font-mono text-[10px] text-[#A6E22E] text-left space-y-2 overflow-y-auto max-h-[250px] shadow-inner select-none">
                        <span className="text-white/40 block border-b border-white/[0.05] pb-2 mb-2 font-semibold">Live Analysis Log</span>
                        {analysisLogs.map((log, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            {log}
                          </motion.div>
                        ))}
                      </div>

                      {/* Right Panel: Animated progress indicators */}
                      <div className="flex flex-col items-center justify-center text-center space-y-6">
                        <div className="relative h-20 w-20 flex items-center justify-center">
                          <div className="absolute inset-0 rounded-full border border-primary/20 bg-primary/5 animate-ping" />
                          <Activity className="h-8 w-8 text-primary animate-pulse" />
                        </div>
                        
                        <div className="space-y-2 w-full max-w-[240px]">
                          <h4 className="text-xs font-bold text-white">Analyzing target metrics</h4>
                          <span className="text-[10px] text-text-secondary/60 font-mono block">{analysisProgress}% Complete</span>
                          
                          {/* Loader bar */}
                          <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden relative border border-white/[0.02] mt-1.5">
                            <div 
                              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300"
                              style={{ width: `${analysisProgress}%` }}
                            />
                          </div>
                        </div>
                      </div>

                    </motion.div>
                  )}

                </AnimatePresence>
              </main>

            </div>

            {/* Status bar */}
            <footer className="h-8 border-t border-white/[0.06] bg-white/[0.01] px-4 flex items-center justify-between text-[9px] text-text-secondary/60 shrink-0 font-mono select-none">
              <span>Status: Index logs loading.</span>
              <span>Workspace Chassis v3.0 &bull; Secure Setup</span>
            </footer>

          </div>
        </div>
      )}

      {/* STEP 8: DASHBOARD REVEAL WELCOME MODAL */}
      {step === 8 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#050816]/75 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#0A0F24] shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-8 text-center space-y-6"
          >
            <div className="h-14 w-14 rounded-2xl bg-success/10 border border-success/20 flex items-center justify-center text-success mx-auto shadow-[0_0_15px_rgba(34,197,94,0.15)] animate-pulse">
              <ShieldCheck className="h-6 w-6" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white tracking-tight">Welcome, {fullName}!</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Your personalized career analysis report and target benchmarking roadmap are verified and ready.
              </p>
            </div>

            <button
              onClick={() => {
                updateData({ isCompleted: true });
                router.push("/dashboard");
              }}
              className="w-full h-11 rounded-lg bg-primary hover:bg-primary/95 text-background-primary text-xs font-bold transition-all shadow-lg active:scale-[0.98]"
            >
              Continue to Dashboard
            </button>
          </motion.div>
        </div>
      )}

    </PageWrapper>
  );
}
