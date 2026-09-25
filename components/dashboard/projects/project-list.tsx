"use client";

import React from "react";
import { Search, CheckCircle2, AlertCircle, ChevronRight, GitCompare, Code2, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ProjectSummary {
  id: string;
  name: string;
  description: string;
  repository: string;
  primaryLanguage: string;
  technologies: string[];
  stars: number;
  forks: number;
  commits: number;
  lastUpdated: string;
  verification: {
    score: number;
    status: "Verified" | "Strong Evidence" | "Partial Evidence" | "Limited Evidence";
    confidence: number;
    evidenceCount: number;
  };
  technicalDepth: {
    complexity: number;
    architecture: number;
    codeQuality: number;
    testing: number;
    documentation: number;
    activity: number;
  };
}

interface ProjectListProps {
  projects: ProjectSummary[];
  selectedProjectId: string;
  onSelectProject: (id: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeFilter: string;
  onFilterChange: (f: any) => void;
  techFilter: string;
  onTechFilterChange: (t: string) => void;
  sortBy: string;
  onSortByChange: (s: any) => void;
  comparisonIds: string[];
  onToggleCompare: (id: string) => void;
}

export function ProjectList({
  projects,
  selectedProjectId,
  onSelectProject,
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  techFilter,
  onTechFilterChange,
  sortBy,
  onSortByChange,
  comparisonIds,
  onToggleCompare,
}: ProjectListProps) {
  const statusFilters = ["All", "Verified", "Strong Evidence", "Partial Evidence", "Recently Updated"];
  const techOptions = ["All", "Go", "TypeScript", "React", "Docker", "PostgreSQL", "Node.js", "Redis"];

  const getStatusBadge = (status: ProjectSummary["verification"]["status"]) => {
    switch (status) {
      case "Verified":
        return { label: "Verified", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
      case "Strong Evidence":
        return { label: "Strong Evidence", className: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" };
      case "Partial Evidence":
        return { label: "Partial Evidence", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" };
      case "Limited Evidence":
        return { label: "Limited", className: "bg-rose-500/10 text-rose-400 border-rose-500/20" };
    }
  };

  // Filter and Sort logic
  const filteredProjects = projects
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesStatus = true;
      if (activeFilter === "Verified") matchesStatus = p.verification.status === "Verified";
      if (activeFilter === "Strong Evidence") matchesStatus = p.verification.status === "Strong Evidence";
      if (activeFilter === "Partial Evidence") matchesStatus = p.verification.status === "Partial Evidence";
      if (activeFilter === "Recently Updated") matchesStatus = p.lastUpdated.includes("day") || p.lastUpdated.includes("hour");

      let matchesTech = true;
      if (techFilter !== "All") {
        matchesTech = p.technologies.includes(techFilter) || p.primaryLanguage === techFilter;
      }

      return matchesSearch && matchesStatus && matchesTech;
    })
    .sort((a, b) => {
      if (sortBy === "Verification") return b.verification.score - a.verification.score;
      if (sortBy === "Technical Depth") return b.technicalDepth.complexity - a.technicalDepth.complexity;
      if (sortBy === "Activity") return b.technicalDepth.activity - a.technicalDepth.activity;
      if (sortBy === "Last Updated") return a.lastUpdated.localeCompare(b.lastUpdated);
      return 0;
    });

  return (
    <div className="space-y-3.5 text-left">
      {/* Search and filter controls */}
      <div className="space-y-2.5">
        <div className="relative">
          <Search className="h-4 w-4 text-text-secondary/40 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects by name, description, or technology..."
            className="w-full bg-[#050816] border border-white/10 rounded-lg h-9.5 pl-9 pr-3 text-xs text-white placeholder-text-secondary/35 focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Filter row */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Status buttons */}
          <div className="flex flex-wrap gap-1">
            {statusFilters.map((f) => (
              <button
                key={f}
                onClick={() => onFilterChange(f)}
                className={cn(
                  "px-2.5 py-1 rounded text-[10.5px] font-mono transition-all cursor-pointer",
                  activeFilter === f
                    ? "bg-primary/15 text-primary border border-primary/30 font-bold"
                    : "text-text-secondary/60 hover:text-white bg-white/[0.01] border border-white/[0.04]"
                )}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Tech and Sort dropdowns */}
          <div className="flex items-center gap-2">
            <select
              value={techFilter}
              onChange={(e) => onTechFilterChange(e.target.value)}
              className="bg-[#050816] border border-white/10 rounded px-2 py-1 text-[10.5px] text-text-secondary font-mono focus:outline-none focus:border-primary cursor-pointer"
            >
              {techOptions.map((t) => (
                <option key={t} value={t}>
                  Tech: {t}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="bg-[#050816] border border-white/10 rounded px-2 py-1 text-[10.5px] text-text-secondary font-mono focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="Verification">Sort: Verification</option>
              <option value="Technical Depth">Sort: Depth</option>
              <option value="Activity">Sort: Activity</option>
              <option value="Last Updated">Sort: Recent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Project Rows */}
      <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
        {filteredProjects.map((project) => {
          const isSelected = selectedProjectId === project.id;
          const isCompared = comparisonIds.includes(project.id);
          const badge = getStatusBadge(project.verification.status);

          return (
            <div
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className={cn(
                "p-3.5 md:p-4 rounded-xl border transition-all cursor-pointer text-left relative group",
                isSelected
                  ? "border-primary/50 bg-primary/[0.07] shadow-sm"
                  : "border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/15"
              )}
            >
              {/* Left active line indicator */}
              {isSelected && (
                <span className="w-1 bg-primary absolute left-0 top-2 bottom-2 rounded-r-full" />
              )}

              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs md:text-sm font-bold text-white group-hover:text-primary transition-colors truncate">
                      {project.name}
                    </h3>
                    <span className={cn("text-[9px] px-2 py-0.2 rounded border font-mono shrink-0", badge.className)}>
                      {badge.label}
                    </span>
                  </div>

                  <p className="text-[11px] text-text-secondary/70 line-clamp-1 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] text-primary/80 font-mono font-semibold mr-1">
                      {project.primaryLanguage}
                    </span>
                    {project.technologies.slice(0, 3).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[9.5px] px-1.5 py-0.2 rounded bg-white/[0.03] border border-white/[0.05] text-text-secondary/80 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[9px] text-text-secondary/40 font-mono">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Score and actions column */}
                <div className="text-right shrink-0 flex flex-col justify-between items-end h-full space-y-2">
                  <div>
                    <span className="text-sm md:text-base font-extrabold font-mono text-white">
                      {project.verification.score}%
                    </span>
                    <span className="text-[9px] text-text-secondary/50 block font-mono">
                      {project.lastUpdated}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleCompare(project.id);
                    }}
                    className={cn(
                      "text-[9.5px] px-2 py-0.5 rounded border font-mono flex items-center gap-1 transition-colors",
                      isCompared
                        ? "bg-primary/20 text-primary border-primary/40 font-bold"
                        : "text-text-secondary/50 border-white/5 hover:text-white hover:border-white/20"
                    )}
                    title="Toggle comparison (max 2)"
                  >
                    <GitCompare className="h-2.5 w-2.5" />
                    <span>{isCompared ? "Compared" : "Compare"}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredProjects.length === 0 && (
          <div className="p-8 text-center rounded-xl border border-dashed border-white/10 bg-[#050816] text-xs text-text-secondary/50">
            No projects matched your search criteria.
          </div>
        )}
      </div>
    </div>
  );
}
