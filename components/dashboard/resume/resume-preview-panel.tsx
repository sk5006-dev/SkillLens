"use client";

import React from "react";
import { FileText, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ResumePreviewProps {
  fullName: string;
  jobTitle: string;
  country: string;
  linkedin: string;
  portfolio: string;
  professionalSummary: string;
  experience: Array<{ role: string; company: string; period: string; description: string }>;
  education: Array<{ degree: string; school: string; period: string }>;
  skills: string[];
  certifications: string[];
  appliedSuggestionsCount?: number;
}

export function ResumePreviewPanel({
  fullName,
  jobTitle,
  country,
  linkedin,
  portfolio,
  professionalSummary,
  experience,
  education,
  skills,
  certifications,
  appliedSuggestionsCount = 0,
}: ResumePreviewProps) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#070B1E] p-6 md:p-8 space-y-6 text-left shadow-lg relative overflow-hidden font-sans">
      {/* Top Header metadata in document preview */}
      <div className="flex items-start justify-between border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">{fullName || "Pranav"}</h2>
            {appliedSuggestionsCount > 0 && (
              <Badge className="bg-primary/10 border-primary/20 text-primary text-[9.5px] font-mono">
                {appliedSuggestionsCount} AI Improvements Applied
              </Badge>
            )}
          </div>
          <p className="text-xs text-primary font-medium mt-0.5">{jobTitle || "Senior Full Stack Engineer"}</p>
          <p className="text-[11px] text-text-secondary/60 mt-1">
            {country || "United States"} &bull; {portfolio || "portfolio.dev"} &bull; {linkedin || "linkedin.com"}
          </p>
        </div>

        <div className="h-8 w-8 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center text-text-secondary/40">
          <FileText className="h-4 w-4" />
        </div>
      </div>

      {/* Professional Summary */}
      <div className="space-y-1.5">
        <h3 className="text-[10.5px] font-bold text-text-secondary/50 uppercase tracking-wider font-mono">
          Professional Summary
        </h3>
        <p className="text-xs text-text-secondary/80 leading-relaxed">
          {professionalSummary ||
            "Senior Full Stack Engineer with 6+ years of experience designing high-throughput distributed systems, modern web architectures with React and Next.js, and low-latency microservices with Node.js and Go."}
        </p>
      </div>

      {/* Work Experience */}
      <div className="space-y-4">
        <h3 className="text-[10.5px] font-bold text-text-secondary/50 uppercase tracking-wider font-mono">
          Work Experience
        </h3>
        <div className="space-y-4">
          {experience.map((exp, idx) => (
            <div key={idx} className="space-y-1.5 border-l-2 border-primary/30 pl-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                <span className="font-bold text-white">
                  {exp.role} &bull; <span className="text-text-secondary font-normal">{exp.company}</span>
                </span>
                <span className="text-[10.5px] text-text-secondary/50 font-mono mt-0.5 sm:mt-0">{exp.period}</span>
              </div>
              <p className="text-[11.5px] text-text-secondary/80 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <div className="space-y-2">
        <h3 className="text-[10.5px] font-bold text-text-secondary/50 uppercase tracking-wider font-mono">
          Core Technologies
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {skills.slice(0, 10).map((skill, idx) => (
            <span
              key={idx}
              className="text-[10.5px] px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-text-secondary/90 font-mono"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Education & Certifications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/[0.06] pt-4">
        <div className="space-y-1">
          <h3 className="text-[10px] font-bold text-text-secondary/50 uppercase tracking-wider font-mono">
            Education
          </h3>
          {education.map((edu, idx) => (
            <div key={idx} className="text-xs">
              <p className="font-semibold text-white">{edu.degree}</p>
              <p className="text-[10.5px] text-text-secondary/60">
                {edu.school} &bull; {edu.period}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-1">
          <h3 className="text-[10px] font-bold text-text-secondary/50 uppercase tracking-wider font-mono">
            Certifications
          </h3>
          <div className="space-y-1">
            {certifications.map((cert, idx) => (
              <p key={idx} className="text-[11px] text-text-secondary/80 flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
                <span>{cert}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
