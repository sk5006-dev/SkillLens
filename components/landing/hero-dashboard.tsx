"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  Layers, 
  GitBranch, 
  Search, 
  Bell, 
  TrendingUp, 
  CheckCircle2,
  Cpu, 
  Map, 
  LineChart, 
  Briefcase 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function HeroDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Motion values for tilt coordinates
  const rotateXVal = useMotionValue(0);
  const rotateYVal = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothRotateX = useSpring(rotateXVal, springConfig);
  const smoothRotateY = useSpring(rotateYVal, springConfig);

  // Map coordinate range to rotation angles (subtle: max 8 degrees)
  const rotateX = useTransform(smoothRotateX, [-300, 300], [8, -8]);
  const rotateY = useTransform(smoothRotateY, [-300, 300], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    // Compute offset from center of dashboard
    const mouseX = e.clientX - (left + width / 2);
    const mouseY = e.clientY - (top + height / 2);
    rotateXVal.set(mouseY);
    rotateYVal.set(mouseX);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rotateXVal.set(0);
    rotateYVal.set(0);
  };

  return (
    <div 
      className="relative w-full h-[520px] flex items-center justify-center select-none"
      style={{ perspective: 1200 }}
    >
      {/* Ambience Lighting behind mockup */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/5 rounded-2xl blur-[80px] pointer-events-none opacity-60 scale-95" />

      {/* Floating & Rotating Application Window Mockup */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={!hovered ? {
          y: [0, -10, 0],
        } : {}}
        transition={!hovered ? {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        } : {}}
        className="w-full max-w-2xl rounded-xl border border-white/[0.08] bg-[#0A0F24]/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-md overflow-hidden relative"
      >
        {/* Browser Chrome Window Header */}
        <div 
          className="flex h-11 items-center border-b border-white/[0.06] bg-white/[0.01] px-4 justify-between"
          style={{ transform: "translateZ(10px)" }}
        >
          {/* Traffic light window controls */}
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#EF4444]/60" />
            <span className="h-3 w-3 rounded-full bg-[#F59E0B]/60" />
            <span className="h-3 w-3 rounded-full bg-[#22C55E]/60" />
          </div>
          {/* Mock URL bar */}
          <div className="h-6 w-72 rounded-md bg-white/[0.03] border border-white/[0.04] flex items-center justify-center text-[10px] text-text-secondary/70 tracking-wide">
            app.skilllens.ai/career/staff-architect
          </div>
          {/* Mock profile icons */}
          <div className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-text-secondary/50" />
            <Bell className="h-3.5 w-3.5 text-text-secondary/50" />
          </div>
        </div>

        {/* Inner Window Work Area */}
        <div className="flex h-[475px] overflow-hidden">
          
          {/* Mock App Sidebar */}
          <aside 
            className="w-48 border-r border-white/[0.05] bg-white/[0.005] p-3 flex flex-col gap-1 select-none"
            style={{ transform: "translateZ(15px)" }}
          >
            <div className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-text-secondary/40 tracking-wider uppercase mb-1">
              Main Menu
            </div>
            <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-primary/5 border border-primary/10 text-white text-xs font-medium">
              <Briefcase className="h-3.5 w-3.5 text-primary" />
              <span>Career Fit</span>
            </div>
            <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/[0.02] text-xs font-medium transition-colors">
              <Layers className="h-3.5 w-3.5" />
              <span>Projects</span>
            </div>
            <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/[0.02] text-xs font-medium transition-colors">
              <Map className="h-3.5 w-3.5" />
              <span>Learning Roadmap</span>
            </div>
            <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/[0.02] text-xs font-medium transition-colors">
              <LineChart className="h-3.5 w-3.5" />
              <span>Analytics</span>
            </div>
          </aside>

          {/* Mock App Dashboard Panel Content */}
          <main className="flex-1 p-5 flex flex-col gap-4 overflow-y-auto">
            
            {/* Header section in dashboard */}
            <div 
              className="flex items-center justify-between"
              style={{ transform: "translateZ(20px)" }}
            >
              <div>
                <h4 className="text-sm font-bold text-white tracking-tight">Staff Systems Architect</h4>
                <p className="text-[10px] text-text-secondary/80 mt-0.5">Role target evaluation</p>
              </div>
              <Badge variant="success" className="h-5 text-[9px] uppercase tracking-wide gap-1">
                <CheckCircle2 className="h-2.5 w-2.5" /> Ready
              </Badge>
            </div>

            {/* Layout Grid inside mockup dashboard */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* Career Progress Ring Card (Z-level 30) */}
              <div 
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4.5 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden group/card"
                style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                <p className="text-[10px] font-semibold text-text-secondary tracking-wide uppercase">Role Match Score</p>
                
                {/* SVG Progress Ring */}
                <div className="relative h-20 w-20 mt-3 flex items-center justify-center" style={{ transform: "translateZ(10px)" }}>
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="40" cy="40" r="34" className="stroke-white/[0.04] fill-none" strokeWidth="6" />
                    <motion.circle 
                      cx="40" 
                      cy="40" 
                      r="34" 
                      className="stroke-primary fill-none" 
                      strokeWidth="6" 
                      strokeDasharray="213.6"
                      initial={{ strokeDashoffset: 213.6 }}
                      animate={{ strokeDashoffset: 213.6 - (213.6 * 92) / 100 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-sm font-bold text-white tracking-tight">92%</span>
                </div>
                <p className="text-[10px] text-text-secondary mt-3">Target: Staff (L6)</p>
              </div>

              {/* Analytics Graph Card (Z-level 30) */}
              <div 
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4.5 flex flex-col justify-between shadow-lg relative overflow-hidden group/card"
                style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                <div className="flex items-center justify-between" style={{ transform: "translateZ(10px)" }}>
                  <div>
                    <p className="text-[10px] font-semibold text-text-secondary tracking-wide uppercase">Velocity</p>
                    <h5 className="text-lg font-bold text-white mt-1 tracking-tight">+14.2%</h5>
                  </div>
                  <TrendingUp className="h-4 w-4 text-secondary" />
                </div>

                {/* SVG mini graph */}
                <div className="h-12 w-full mt-3" style={{ transform: "translateZ(5px)" }}>
                  <svg className="w-full h-full" viewBox="0 0 100 40">
                    <defs>
                      <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--secondary)" stopOpacity="0.2"/>
                        <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <path 
                      d="M0,35 Q15,28 30,32 T60,18 T90,8 T100,5" 
                      fill="none" 
                      stroke="var(--secondary)" 
                      strokeWidth="2" 
                    />
                    <path 
                      d="M0,35 Q15,28 30,32 T60,18 T90,8 T100,5 L100,40 L0,40 Z" 
                      fill="url(#chart-grad)" 
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Verified Skills Panel (Z-level 25) */}
            <div 
              className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-4 flex flex-col gap-3 shadow-lg"
              style={{ transform: "translateZ(25px)" }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Verified Capability Stack</span>
                <span className="text-[9px] font-semibold text-secondary tracking-wide uppercase">5 Core Competencies</span>
              </div>
              
              {/* Badges block */}
              <div className="flex flex-wrap gap-1.5">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#5B8CFF]/10 border border-[#5B8CFF]/20 text-[#5B8CFF] text-[10px] font-semibold shadow-[0_2px_10px_rgba(91,140,255,0.05)]">
                  <Cpu className="h-3 w-3" /> System Architecture
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 text-white text-[10px] font-medium">
                  TypeScript
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 text-white text-[10px] font-medium">
                  Go Concurrency
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 text-white text-[10px] font-medium">
                  Docker
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#67E8F9]/10 border border-[#67E8F9]/20 text-[#67E8F9] text-[10px] font-semibold">
                  <GitBranch className="h-3 w-3" /> CI/CD Automation
                </div>
              </div>
            </div>

          </main>
        </div>
      </motion.div>
    </div>
  );
}
