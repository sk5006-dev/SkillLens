"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  FolderGit2, 
  Target, 
  Activity, 
  CheckCircle,
  Code2,
  GitPullRequest,
  CheckSquare
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { fadeIn } from "@/components/animations/presets";

const STAGES = [
  { 
    id: "resume",
    name: "Resume", 
    desc: "Profile ingestion",
    icon: FileText,
    detail: "We parse your professional experience into a structured capability profile, identifying core technical pillars.",
    visualType: "resume"
  },
  { 
    id: "projects",
    name: "Projects", 
    desc: "Codebase verification",
    icon: FolderGit2,
    detail: "Connect public or private repositories. We verify capabilities by analyzing your commit history and project structures directly.",
    visualType: "projects"
  },
  { 
    id: "role",
    name: "Target Role", 
    desc: "Benchmark matching",
    icon: Target,
    detail: "Select your target career position. We benchmark your profile against standard L4, L5, or L6 tech company criteria.",
    visualType: "role"
  },
  { 
    id: "analysis",
    name: "Analysis", 
    desc: "Gap discovery",
    icon: Activity,
    detail: "Discover exact alignment metrics, identifying verified strengths and missing technologies required for the target role.",
    visualType: "analysis"
  },
  { 
    id: "roadmap",
    name: "Roadmap", 
    desc: "Milestone generation",
    icon: CheckCircle,
    detail: "Generate a targeted learning path with specific open-source code project templates designed to bridge gaps and prove capability.",
    visualType: "roadmap"
  },
];

export function InteractiveWorkflow() {
  const [activeIdx, setActiveIdx] = useState(0);

  const activeStage = STAGES[activeIdx];

  return (
    <section className="py-24 relative overflow-hidden">
      <Container>
        
        {/* Section Header */}
        <motion.div
          variants={fadeIn("up", 0.6, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl mb-16"
        >
          <span className="text-label-premium text-primary">The Process</span>
          <h2 className="text-heading text-white mt-3 font-extrabold tracking-tight">
            Evidence-based career mapping.
          </h2>
          <p className="text-subheading mt-4.5">
            A structured workflow to evaluate your skill profile, verify capabilities, and bridge career milestones.
          </p>
        </motion.div>

        {/* Horizontal Navigation Steps */}
        <div className="relative mb-16">
          
          {/* Animated Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/[0.04] -translate-y-1/2 hidden md:block" />
          <motion.div 
            className="absolute top-1/2 left-0 h-[1px] bg-primary -translate-y-1/2 hidden md:block"
            initial={{ width: "0%" }}
            animate={{ width: `${(activeIdx / (STAGES.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 relative z-10">
            {STAGES.map((stage, index) => {
              const Icon = stage.icon;
              const isCompleted = index <= activeIdx;
              const isActive = index === activeIdx;

              return (
                <button
                  key={stage.id}
                  onMouseEnter={() => setActiveIdx(index)}
                  className="flex flex-col items-center text-center group focus:outline-none"
                >
                  {/* Outer ring */}
                  <div 
                    className={`h-11 w-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(91,140,255,0.25)] text-primary" 
                        : isCompleted
                          ? "border-primary/45 bg-primary/5 text-primary"
                          : "border-white/10 bg-[#050816] text-text-secondary group-hover:border-white/20 group-hover:text-white"
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h4 className={`text-xs font-bold mt-3 transition-colors ${isActive ? "text-white" : "text-text-secondary group-hover:text-white"}`}>
                    {stage.name}
                  </h4>
                  <p className="text-[10px] text-text-secondary/50 mt-1.5 hidden md:block">
                    {stage.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Showcase Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-white/[0.06] bg-[#0A0F24]/30 p-6 md:p-8 rounded-xl shadow-2xl">
          
          {/* Details Column (5 Cols) */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
              >
                <span className="text-[9px] font-bold text-primary uppercase tracking-widest">
                  Step 0{activeIdx + 1}
                </span>
                <h3 className="text-lg font-bold text-white mt-2.5 tracking-tight">
                  {activeStage.name} Walkthrough
                </h3>
                <p className="text-xs text-text-secondary mt-3.5 leading-relaxed">
                  {activeStage.detail}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Interactive Screen Preview Column (7 Cols) */}
          <div className="lg:col-span-7 h-64 bg-[#050816] rounded-lg border border-white/[0.06] flex items-center justify-center p-6 relative overflow-hidden">
            
            <AnimatePresence mode="wait">
              
              {/* Resume Visual Mockup */}
              {activeStage.visualType === "resume" && (
                <motion.div
                  key="v-resume"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full max-w-sm space-y-3.5"
                >
                  <div className="flex h-5 items-center gap-1.5 border-b border-white/[0.05] pb-2 text-[10px] text-text-secondary font-mono">
                    <FileText className="h-3.5 w-3.5 text-primary" /> Pranav_Resume.pdf
                  </div>
                  <div className="h-3.5 w-[85%] rounded bg-white/[0.04]" />
                  <div className="h-3.5 w-[92%] rounded bg-white/[0.04]" />
                  <div className="h-3.5 w-[65%] rounded bg-[#5B8CFF]/15 border border-[#5B8CFF]/30 flex items-center px-2.5 text-[9px] text-primary font-semibold">
                    Parsed: Senior Full Stack Engineer
                  </div>
                </motion.div>
              )}

              {/* Projects Visual Mockup */}
              {activeStage.visualType === "projects" && (
                <motion.div
                  key="v-projects"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full max-w-sm space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-white/[0.05] pb-2.5 text-[10px] text-text-secondary">
                    <span className="font-mono">github.com/pranav/api-gateway</span>
                    <span className="text-secondary uppercase text-[8px] font-bold tracking-wide">Connected</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-text-secondary/70">
                    <Code2 className="h-3.5 w-3.5 text-secondary" />
                    <span>Parsed 48 commits resolving WebAssembly filters.</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-text-secondary/70">
                    <GitPullRequest className="h-3.5 w-3.5 text-secondary" />
                    <span>Verified dependency patterns in webpack.config.js.</span>
                  </div>
                </motion.div>
              )}

              {/* Target Role Visual Mockup */}
              {activeStage.visualType === "role" && (
                <motion.div
                  key="v-role"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full max-w-sm space-y-3"
                >
                  <span className="text-[9px] font-bold text-text-secondary/40 uppercase tracking-widest block">Role Target Specifications</span>
                  <div className="p-3.5 rounded-lg border border-white/[0.05] bg-white/[0.005] flex items-center justify-between">
                    <div>
                      <h5 className="text-[11px] font-bold text-white leading-none">Staff Engineer (L6)</h5>
                      <span className="text-[9px] text-text-secondary mt-1 block">Requires Architecture Validation</span>
                    </div>
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                </motion.div>
              )}

              {/* Analysis Visual Mockup */}
              {activeStage.visualType === "analysis" && (
                <motion.div
                  key="v-analysis"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full max-w-sm space-y-3"
                >
                  <div className="flex items-center justify-between text-[10px] text-text-secondary">
                    <span>Target Requirements Check</span>
                    <span className="font-semibold text-white">11 / 12 Met</span>
                  </div>
                  <div className="h-2 w-full bg-white/[0.06] rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full w-[91%]" />
                  </div>
                  <p className="text-[9px] text-text-secondary mt-1">Docker deployment pipelines identified as missing.</p>
                </motion.div>
              )}

              {/* Roadmap Visual Mockup */}
              {activeStage.visualType === "roadmap" && (
                <motion.div
                  key="v-roadmap"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full max-w-sm space-y-3 text-left"
                >
                  <span className="text-[9px] font-bold text-text-secondary/40 uppercase tracking-widest block">Generated Code Tasks</span>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 text-[10px] text-white">
                      <CheckSquare className="h-4 w-4 text-primary shrink-0" /> Write multi-stage Dockerfile
                    </div>
                    <div className="flex items-center gap-2.5 text-[10px] text-white">
                      <CheckSquare className="h-4 w-4 text-primary shrink-0" /> Configure actions pipeline script
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

          </div>

        </div>

      </Container>
    </section>
  );
}
