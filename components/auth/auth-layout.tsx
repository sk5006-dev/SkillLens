"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";
import { Container } from "@/components/layout/container";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // Mouse coordinate tracker for background depth reaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({
        x: (e.clientX - window.innerWidth / 2) / 45,
        y: (e.clientY - window.innerHeight / 2) / 45,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 relative overflow-hidden bg-[#050816] text-white">
      
      {/* 1. LEFT BILLBOARD PANEL (Desktop only) */}
      <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#0A0F24] to-[#050816] border-r border-white/[0.05] p-12 flex-col justify-between relative overflow-hidden shrink-0 select-none">
        
        {/* Animated blueprint grid, radial spotlight and glowing connection lines */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ x: coords.x, y: coords.y }}
        >
          {/* Radial gradient spotlight */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,140,255,0.08)_0%,transparent_60%)]" />

          {/* Blueprint SVG grid */}
          <svg className="absolute inset-0 h-full w-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="auth-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#auth-grid)" />
            
            {/* Glowing connection lines */}
            <motion.path 
              d="M 50 100 Q 150 150 250 100 T 450 120" 
              fill="none" 
              stroke="rgba(91, 140, 255, 0.15)" 
              strokeWidth="1.5"
              strokeDasharray="8 8"
              animate={{ strokeDashoffset: [0, -100] }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            />
            <motion.path 
              d="M 100 400 Q 200 450 350 400 T 500 480" 
              fill="none" 
              stroke="rgba(103, 232, 249, 0.12)" 
              strokeWidth="1.5"
              strokeDasharray="6 6"
              animate={{ strokeDashoffset: [0, 100] }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            />
          </svg>

          {/* Floating light particles */}
          <div className="absolute top-[20%] left-[30%] w-1.5 h-1.5 rounded-full bg-primary/45 blur-[1px] animate-pulse" />
          <div className="absolute bottom-[30%] left-[15%] w-1 h-1 rounded-full bg-secondary/30 blur-[1px] animate-pulse" />
          <div className="absolute top-[60%] right-[20%] w-2 h-2 rounded-full bg-primary/20 blur-[2px] animate-pulse" />
        </motion.div>

        {/* Content Top */}
        <div className="relative z-10">
          <span className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            SkillLens <span className="text-secondary text-[9px] px-1.5 py-0.5 rounded border border-secondary/20 bg-secondary/5 tracking-wider font-mono">SECURE</span>
          </span>
        </div>

        {/* Content Middle */}
        <div className="relative z-10 my-auto">
          <h1 className="text-3xl font-extrabold tracking-tight leading-tight text-white">
            Understand your<br />technical strengths.
          </h1>
          <p className="text-xs text-text-secondary mt-5.5 leading-relaxed max-w-sm">
            Analyze your experience, verify your projects, identify skill gaps, and build a personalized career roadmap.
          </p>
        </div>

        {/* Content Bottom */}
        <div className="relative z-10 flex items-center gap-2 text-[10px] text-text-secondary/50 font-mono">
          <ShieldAlert className="h-4 w-4 text-primary/40" />
          <span>AES-256 Mock Encrypted Workspace Session</span>
        </div>

      </div>

      {/* 2. RIGHT INTERACTIVE FORM PANEL (Stacked on mobile/tablet) */}
      <div className="col-span-12 lg:col-span-7 flex flex-col items-center justify-center p-6 md:p-12 relative">
        {/* Subtle backing light blob */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,140,255,0.025)_0%,transparent_60%)] pointer-events-none" />
        <div className="w-full max-w-[460px] relative z-10 flex flex-col items-center justify-center">
          {children}
        </div>
      </div>

    </div>
  );
}
