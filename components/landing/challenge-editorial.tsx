"use client";

import React from "react";
import { motion } from "framer-motion";
import { XCircle, CheckCircle, HelpCircle, AlertCircle, RefreshCw } from "lucide-react";
import { fadeIn, staggerContainer } from "@/components/animations/presets";

export function ChallengeEditorial() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0F24]/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <motion.div
          variants={fadeIn("up", 0.6, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl mb-16"
        >
          <span className="text-label-premium text-primary">The Gap</span>
          <h2 className="text-heading text-white mt-3 font-extrabold tracking-tight">
            Traditional career pathways are broken.
          </h2>
          <p className="text-subheading mt-4.5 leading-relaxed">
            Static resumes, fragmented tutorials, and hidden qualifications make finding the right skills or proving capability a challenge.
          </p>
        </motion.div>

        {/* Asymmetrical Editorial Grid */}
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          
          {/* Card 1: Resume Gaps (Large left panel - 7 Cols) */}
          <motion.div
            variants={fadeIn("up", 0.6)}
            className="lg:col-span-7 rounded-2xl border border-white/[0.06] bg-[#0A0F24]/40 p-6 md:p-8 flex flex-col justify-between relative group overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Profile Analysis</span>
              <h3 className="text-xl font-bold text-white mt-2.5 tracking-tight">Resumes don't show real capability.</h3>
              <p className="text-sm text-text-secondary mt-2 max-w-md leading-relaxed">
                Static bullet points conceal the true depth of your technical expertise.
              </p>
            </div>

            {/* Interactive Resume Mockup */}
            <div className="mt-8 rounded-xl border border-white/[0.08] bg-[#050816] p-5 shadow-lg relative max-w-md mx-auto w-full">
              <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-white">PR</div>
                  <div>
                    <h5 className="text-xs font-bold text-white leading-none">Pranav</h5>
                    <span className="text-[9px] text-text-secondary">Senior Full Stack Engineer</span>
                  </div>
                </div>
                <span className="text-[8px] text-text-secondary uppercase tracking-wider">Draft Profile</span>
              </div>

              {/* Resume details */}
              <div className="space-y-3.5 text-left text-[11px] text-text-secondary/70">
                <div>
                  <p className="font-semibold text-white">Senior Full Stack Engineer</p>
                  <p className="mt-1 text-[10px]">Managed React framework transitions across corporate dashboard components.</p>
                </div>
                
                {/* Highlighted Gaps */}
                <div className="rounded-lg border border-warning/15 bg-warning/5 p-3 flex items-start gap-2.5 relative overflow-hidden animate-pulse">
                  <AlertCircle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold text-white leading-none">Missing Architectural Validation</p>
                    <p className="text-[9px] text-text-secondary mt-1">Docker deployment pipelines & System Design parameters not verified.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Fragmented Learning (Small right panel - 5 Cols) */}
          <motion.div
            variants={fadeIn("up", 0.6)}
            className="lg:col-span-5 rounded-2xl border border-white/[0.06] bg-[#0A0F24]/40 p-6 md:p-8 flex flex-col justify-between relative group overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Training Quality</span>
              <h3 className="text-xl font-bold text-white mt-2.5 tracking-tight">Learning the wrong skills.</h3>
              <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                Generic tutorials scatter your attention across modules that don't bridge target gaps.
              </p>
            </div>

            {/* Scattered Course Nodes Network Mockup */}
            <div className="mt-8 h-40 w-full relative flex items-center justify-center border border-white/[0.04] bg-[#050816]/60 rounded-xl overflow-hidden">
              {/* Central Target node */}
              <div className="h-10 w-24 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-bold text-white shadow-lg relative z-10">
                Staff Target
              </div>

              {/* Scattered nodes around */}
              <div className="absolute top-4 left-6 px-2.5 py-1.5 rounded bg-white/[0.02] border border-white/5 text-[9px] text-text-secondary flex items-center gap-1.5">
                <XCircle className="h-3 w-3 text-danger" /> CSS Grid
              </div>
              <div className="absolute bottom-4 left-10 px-2.5 py-1.5 rounded bg-white/[0.02] border border-white/5 text-[9px] text-text-secondary flex items-center gap-1.5">
                <XCircle className="h-3 w-3 text-danger" /> Basic SQL
              </div>
              <div className="absolute top-6 right-8 px-2.5 py-1.5 rounded bg-white/[0.02] border border-white/5 text-[9px] text-text-secondary flex items-center gap-1.5">
                <XCircle className="h-3 w-3 text-danger" /> jQuery Basics
              </div>

              {/* Connecting dashed lines represent broken path */}
              <svg className="absolute inset-0 h-full w-full pointer-events-none">
                <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="25%" y1="80%" x2="50%" y2="50%" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="80%" y1="25%" x2="50%" y2="50%" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="1" strokeDasharray="3,3" />
              </svg>
            </div>
          </motion.div>

          {/* Card 3: Job Description Mismatch (Wide bottom panel - 12 Cols) */}
          <motion.div
            variants={fadeIn("up", 0.6)}
            className="lg:col-span-12 rounded-2xl border border-white/[0.06] bg-[#0A0F24]/40 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative group overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="max-w-md shrink-0">
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Alignment Check</span>
              <h3 className="text-xl font-bold text-white mt-2.5 tracking-tight">Unsure whether you're qualified.</h3>
              <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                Evaluating your profile against targeted positions involves guesswork. SkillLens matches your verified capabilities with job descriptions automatically.
              </p>
            </div>

            {/* Job Matcher Comparison UI */}
            <div className="flex-grow w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 border border-white/[0.06] bg-[#050816] p-4.5 rounded-xl">
              
              {/* Required Job Keywords */}
              <div className="p-3 bg-white/[0.01] rounded-lg border border-white/[0.04]">
                <h5 className="text-[10px] font-bold text-white uppercase tracking-wider border-b border-white/[0.05] pb-2 mb-2.5">
                  Job Requirements
                </h5>
                <ul className="space-y-2 text-[10px] text-text-secondary">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-success shrink-0" /> Webpack Custom Configs
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-success shrink-0" /> TypeScript Struct Interfaces
                  </li>
                  <li className="flex items-center gap-2 text-danger">
                    <AlertCircle className="h-3.5 w-3.5 text-danger shrink-0" /> Distributed DB Systems
                  </li>
                </ul>
              </div>

              {/* Candidate verified check */}
              <div className="p-3 bg-white/[0.01] rounded-lg border border-white/[0.04] flex flex-col justify-between">
                <div>
                  <h5 className="text-[10px] font-bold text-white uppercase tracking-wider border-b border-white/[0.05] pb-2 mb-2.5">
                    Your Verified Profile
                  </h5>
                  <ul className="space-y-2 text-[10px] text-text-secondary">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-success shrink-0" /> Webpack Verified
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-success shrink-0" /> TypeScript Certified
                    </li>
                    <li className="flex items-center gap-2 text-text-secondary/40 line-through">
                      <HelpCircle className="h-3.5 w-3.5 text-text-secondary/30 shrink-0" /> Distributed DB Systems
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
