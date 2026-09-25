"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  ArrowRight, 
  Layers, 
  FolderGit2, 
  LineChart, 
  CheckSquare, 
  GitCommit,
  ExternalLink
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { fadeIn, scaleIn } from "@/components/animations/presets";

const VERIFIED_SKILLS = [
  { name: "System Architecture", detail: "Verified via Github Commits in 3 Repositories", commits: 48 },
  { name: "TypeScript Core", detail: "Verified via 12 Public Projects", commits: 32 },
  { name: "React Framework", detail: "Verified via 5 Corporate Interfaces", commits: 120 },
];

const MISSING_SKILLS = [
  { name: "Docker Deployment", gap: "Missing deployment configuration files", priority: "High" },
  { name: "Distributed Databases", gap: "No public system architecture references", priority: "Medium" },
];

const ROADMAP_STEPS = [
  { step: "01", title: "Containerize Applications", desc: "Build Dockerfiles and set up local Docker Compose environments." },
  { step: "02", title: "Scale Deployment Infrastructure", desc: "Configure GitHub Actions pipelines for automated staging releases." },
  { step: "03", title: "Distributed DB Integration", desc: "Establish multi-node replication parameters for Postgres clusters." },
];

export function ProductPreview() {
  const [activeTab, setActiveTab] = useState<"analysis" | "roadmap">("analysis");
  const [percentAnimated, setPercentAnimated] = useState(0);

  // Animate progress ring on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setPercentAnimated(92);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0A0F24]/10 pointer-events-none" />

      <Container>
        {/* Section Header */}
        <motion.div
          variants={fadeIn("up", 0.6, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-label-premium text-primary">The Result</span>
          <h2 className="text-heading text-white mt-3 font-extrabold tracking-tight">
            Understand exactly where you stand.
          </h2>
          <p className="text-subheading mt-4.5 max-w-lg mx-auto">
            SkillLens parses your technical experience against role requirements, defining clear gaps and generating learning roadmaps automatically.
          </p>
        </motion.div>

        {/* Centerpiece Application Mockup Window */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full rounded-2xl border border-white/[0.08] bg-[#0A0F24]/75 shadow-[0_30px_70px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* Header Window Chrome */}
          <div className="flex h-12 items-center border-b border-white/[0.06] bg-white/[0.01] px-5 justify-between">
            <div className="flex gap-2">
              <span className="h-3.5 w-3.5 rounded-full bg-[#EF4444]/60" />
              <span className="h-3.5 w-3.5 rounded-full bg-[#F59E0B]/60" />
              <span className="h-3.5 w-3.5 rounded-full bg-[#22C55E]/60" />
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setActiveTab("analysis")}
                className={`text-xs font-semibold tracking-wide transition-colors pb-1 border-b-2 ${
                  activeTab === "analysis" ? "border-primary text-white" : "border-transparent text-text-secondary hover:text-white"
                }`}
              >
                Capability Analysis
              </button>
              <button 
                onClick={() => setActiveTab("roadmap")}
                className={`text-xs font-semibold tracking-wide transition-colors pb-1 border-b-2 ${
                  activeTab === "roadmap" ? "border-primary text-white" : "border-transparent text-text-secondary hover:text-white"
                }`}
              >
                Targeted Roadmap
              </button>
            </div>
            <div className="w-12" /> {/* spacer */}
          </div>

          {/* Main Dashboard Window Content */}
          <div className="p-6 md:p-8 min-h-[480px]">
            <AnimatePresence mode="wait">
              {activeTab === "analysis" ? (
                <motion.div
                  key="analysis"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                  
                  {/* Left Column: Progress Ring & Growth Graph (5 Cols) */}
                  <div className="lg:col-span-5 flex flex-col gap-6">
                    
                    {/* Role Fit Ring */}
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-6 flex flex-col items-center justify-center text-center shadow-lg relative group">
                      <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Role Benchmarking</p>
                      <h4 className="text-base font-bold text-white mt-1.5 tracking-tight">Staff Systems Architect</h4>
                      
                      {/* SVG Progress Ring */}
                      <div className="relative h-32 w-32 mt-6 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="64" cy="64" r="54" className="stroke-white/[0.04] fill-none" strokeWidth="8" />
                          <motion.circle 
                            cx="64" 
                            cy="64" 
                            r="54" 
                            className="stroke-primary fill-none" 
                            strokeWidth="8" 
                            strokeDasharray="339.29"
                            initial={{ strokeDashoffset: 339.29 }}
                            animate={{ strokeDashoffset: 339.29 - (339.29 * percentAnimated) / 100 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className="absolute text-2xl font-extrabold text-white tracking-tight">{percentAnimated}%</span>
                      </div>
                      <p className="text-xs text-text-secondary/70 mt-5">Match requirements: 11 / 12 fulfilled</p>
                    </div>

                    {/* Growth Chart */}
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-6 shadow-lg">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Capability Growth</p>
                        <span className="text-[10px] font-semibold text-secondary uppercase tracking-wide">6 Months Velocity</span>
                      </div>
                      
                      {/* SVG vector chart mockup */}
                      <div className="h-28 w-full mt-6">
                        <svg className="w-full h-full" viewBox="0 0 200 60">
                          <defs>
                            <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2"/>
                              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0"/>
                            </linearGradient>
                          </defs>
                          <path 
                            d="M0,50 Q40,48 80,38 T140,15 T200,5" 
                            fill="none" 
                            stroke="var(--primary)" 
                            strokeWidth="2.5" 
                          />
                          <path 
                            d="M0,50 Q40,48 80,38 T140,15 T200,5 L200,60 L0,60 Z" 
                            fill="url(#chart-glow)" 
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Verified vs Missing lists (7 Cols) */}
                  <div className="lg:col-span-7 flex flex-col gap-6">
                    
                    {/* Verified Capabilities */}
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-6 shadow-lg">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-white/[0.05] pb-2">
                        Verified Capability Stack
                      </h4>
                      <div className="space-y-4">
                        {VERIFIED_SKILLS.map((skill, index) => (
                          <div key={index} className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                              <div>
                                <p className="text-xs font-bold text-white tracking-tight">{skill.name}</p>
                                <p className="text-[10px] text-text-secondary mt-0.5">{skill.detail}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-[9px] text-text-secondary/50 font-mono">
                              <GitCommit className="h-3 w-3" /> {skill.commits} Commits
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Missing Gaps */}
                    <div className="rounded-xl border border-white/[0.06] bg-[#EF4444]/[0.01] p-6 shadow-lg">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-white/[0.05] pb-2">
                        Identified Gaps
                      </h4>
                      <div className="space-y-4">
                        {MISSING_SKILLS.map((skill, index) => (
                          <div key={index} className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                              <div>
                                <p className="text-xs font-bold text-white tracking-tight">{skill.name}</p>
                                <p className="text-[10px] text-text-secondary mt-0.5">{skill.gap}</p>
                              </div>
                            </div>
                            <span className="text-[9px] font-bold uppercase tracking-wider text-warning px-2 py-0.5 rounded border border-warning/20 bg-warning/5">
                              {skill.priority}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </motion.div>
              ) : (
                <motion.div
                  key="roadmap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                  
                  {/* Left Column: Milestones Timeline (7 Cols) */}
                  <div className="lg:col-span-7 flex flex-col gap-4">
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-6 shadow-lg">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-5 border-b border-white/[0.05] pb-2">
                        Targeted Milestone Tracks
                      </h4>
                      <div className="space-y-6">
                        {ROADMAP_STEPS.map((step, index) => (
                          <div key={index} className="flex items-start gap-4">
                            <div className="h-6 w-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
                              {step.step}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white tracking-tight">{step.title}</p>
                              <p className="text-[10px] text-text-secondary mt-1 leading-relaxed">{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Suggested Projects (5 Cols) */}
                  <div className="lg:col-span-5 flex flex-col gap-4">
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-6 shadow-lg h-full flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-white/[0.05] pb-2">
                          Bridge-Gap Projects
                        </h4>
                        <p className="text-[10px] text-text-secondary leading-relaxed mb-4">
                          Build evidence of capability by executing target repositories.
                        </p>
                        
                        <div className="space-y-3">
                          <div className="p-3 rounded-lg border border-white/[0.05] bg-white/[0.01] hover:border-white/10 transition-colors cursor-pointer group/item flex items-center justify-between">
                            <div>
                              <h5 className="text-[11px] font-bold text-white group-hover/item:text-primary transition-colors">pg-replication-cluster</h5>
                              <p className="text-[9px] text-text-secondary mt-0.5">Postgres multi-node sync setup</p>
                            </div>
                            <ExternalLink className="h-3 w-3 text-text-secondary/50" />
                          </div>
                          <div className="p-3 rounded-lg border border-white/[0.05] bg-white/[0.01] hover:border-white/10 transition-colors cursor-pointer group/item flex items-center justify-between">
                            <div>
                              <h5 className="text-[11px] font-bold text-white group-hover/item:text-primary transition-colors">actions-deployment-flow</h5>
                              <p className="text-[9px] text-text-secondary mt-0.5">GitHub deployment actions template</p>
                            </div>
                            <ExternalLink className="h-3 w-3 text-text-secondary/50" />
                          </div>
                        </div>
                      </div>

                      <button className="w-full mt-6 flex items-center justify-center gap-1.5 h-10 px-4 rounded-lg bg-primary text-background-primary text-xs font-bold transition-all hover:bg-primary/95 group">
                        Begin Roadmap <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </Container>
    </section>
  );
}
