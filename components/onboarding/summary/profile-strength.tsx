"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, AlertTriangle, ShieldCheck } from "lucide-react";
import { useOnboardingStore } from "@/store/onboarding-store";
import { cn } from "@/lib/utils";

export function ProfileStrength() {
  const { getProfileStrength, fullName, jobTitle, country, resumeName, githubConnected, targetCompany, targetRole, preferredIndustry } = useOnboardingStore();
  const [strength, setStrength] = useState(0);

  const currentStrength = getProfileStrength();

  // Smooth numeric counter animation
  useEffect(() => {
    let start = strength;
    const end = currentStrength;
    if (start === end) return;

    const duration = 0.4; // seconds
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      const value = Math.round(start + (end - start) * easeProgress);
      setStrength(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [currentStrength]);

  const checklist = [
    {
      label: "Personal Information",
      completed: !!(fullName && jobTitle && country),
      missing: "Name, title, location",
    },
    {
      label: "Resume Ingest",
      completed: !!resumeName,
      missing: "PDF or DOCX file upload",
    },
    {
      label: "GitHub Sync",
      completed: githubConnected,
      missing: "Connecting developer repo",
    },
    {
      label: "Career Goal targets",
      completed: !!(targetCompany && targetRole && preferredIndustry),
      missing: "Benchmarking metrics configuration",
    },
  ];

  // SVG metrics
  const radius = 32;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (strength / 100) * circumference;

  return (
    <div className="rounded-xl border border-white/[0.05] bg-white/[0.01] p-5.5 space-y-5 text-left relative overflow-hidden backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-white tracking-wide">Profile Strength</h4>
          <span className="text-[10px] text-text-secondary/50 font-mono mt-0.5 block">Enterprise Readiness Scope</span>
        </div>
        {/* Animated SVG Progress Ring */}
        <div className="relative h-14 w-14 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="28"
              cy="28"
              r={radius}
              className="stroke-white/[0.04] fill-none"
              strokeWidth={strokeWidth}
            />
            <motion.circle
              cx="28"
              cy="28"
              r={radius}
              className="stroke-primary fill-none"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-xs font-mono font-bold text-white">{strength}%</span>
        </div>
      </div>

      {/* Checklist items */}
      <div className="space-y-2.5">
        {checklist.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2.5 text-[11px] leading-relaxed">
            <div 
              className={cn(
                "h-4 w-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 border",
                item.completed
                  ? "bg-success/10 border-success/20 text-success"
                  : "bg-white/[0.02] border-white/5 text-text-secondary/30"
              )}
            >
              {item.completed ? (
                <Check className="h-2.5 w-2.5" />
              ) : (
                <AlertTriangle className="h-2.5 w-2.5" />
              )}
            </div>
            <div className="text-left overflow-hidden">
              <span className={cn("font-semibold block", item.completed ? "text-white" : "text-text-secondary/60")}>
                {item.label}
              </span>
              {!item.completed && (
                <span className="text-[9.5px] text-text-secondary/40 font-mono italic block">
                  Missing: {item.missing}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {strength === 100 && (
        <div className="pt-3 border-t border-white/[0.05] flex items-center gap-2 text-[10px] text-success font-semibold">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          <span>Candidate file fully validated</span>
        </div>
      )}
    </div>
  );
}
