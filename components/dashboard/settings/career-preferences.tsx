"use client";

import React, { useState } from "react";
import { Briefcase, Building, Clock, Compass, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CareerPreferencesProps {
  preferredIndustry: string;
  preferredWorkMode: string;
  preferredLocations: string[];
  availabilityHoursPerWeek: number;
  preferredCompanySize: string;
  onUpdate: (data: {
    preferredIndustry?: string;
    preferredWorkMode?: string;
    preferredLocations?: string[];
    availabilityHoursPerWeek?: number;
    preferredCompanySize?: string;
  }) => void;
}

export function CareerPreferences({
  preferredIndustry,
  preferredWorkMode,
  preferredLocations = [],
  availabilityHoursPerWeek,
  preferredCompanySize,
  onUpdate,
}: CareerPreferencesProps) {
  const industries = ["Product Company", "Startup", "FinTech", "Healthcare", "AI", "E-Commerce", "Enterprise", "Custom"];
  const workModes = ["Remote", "Hybrid", "On-site", "Flexible"];
  const companySizes = ["Startup", "Small", "Medium", "Large Enterprise"];
  const hourOptions = [5, 10, 15, 20, 30, 40];

  const [isCustomIndustry, setIsCustomIndustry] = useState(!industries.includes(preferredIndustry));
  const [customIndustry, setCustomIndustry] = useState(isCustomIndustry ? preferredIndustry : "");
  
  // Preferred Locations state
  const [locationInput, setLocationInput] = useState("");

  const handleIndustryChange = (val: string) => {
    if (val === "Custom") {
      setIsCustomIndustry(true);
      onUpdate({ preferredIndustry: customIndustry || "Custom" });
    } else {
      setIsCustomIndustry(false);
      onUpdate({ preferredIndustry: val });
    }
  };

  const handleAddLocation = () => {
    if (locationInput.trim() && !preferredLocations.includes(locationInput.trim())) {
      const updated = [...preferredLocations, locationInput.trim()];
      onUpdate({ preferredLocations: updated });
      setLocationInput("");
    }
  };

  const handleRemoveLocation = (loc: string) => {
    const updated = preferredLocations.filter((item) => item !== loc);
    onUpdate({ preferredLocations: updated });
  };

  return (
    <div className="space-y-6 text-left max-w-xl">
      <div className="space-y-1">
        <h3 className="text-base font-bold text-white tracking-tight">Career Preferences</h3>
        <p className="text-xs text-text-secondary/70 leading-relaxed">
          Configure preferences to customize compatibility calculations and learning timelines.
        </p>
      </div>

      <div className="space-y-4 pt-1 text-xs">
        {/* Industry */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-semibold text-text-secondary/50 uppercase tracking-wider block font-mono">
            Preferred Industry
          </label>
          <div className="relative">
            <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/30" />
            <select
              value={isCustomIndustry ? "Custom" : preferredIndustry}
              onChange={(e) => handleIndustryChange(e.target.value)}
              className="h-10 w-full pl-10 pr-4 rounded-lg border border-white/10 bg-[#050816] focus:border-primary/50 text-xs text-white transition-all focus:outline-none appearance-none cursor-pointer"
            >
              {industries.map((ind) => (
                <option key={ind} value={ind} className="bg-[#0A0F24]">
                  {ind}
                </option>
              ))}
            </select>
          </div>

          {isCustomIndustry && (
            <input
              type="text"
              value={customIndustry}
              onChange={(e) => {
                setCustomIndustry(e.target.value);
                onUpdate({ preferredIndustry: e.target.value });
              }}
              className="h-10 w-full px-4 mt-2 rounded-lg border border-white/10 bg-white/[0.01] focus:border-primary/50 text-xs text-white placeholder-text-secondary/30 transition-all focus:outline-none"
              placeholder="Custom industry..."
            />
          )}
        </div>

        {/* Work Mode */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-semibold text-text-secondary/50 uppercase tracking-wider block font-mono">
            Work Mode Environment
          </label>
          <div className="relative">
            <Compass className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/30" />
            <select
              value={preferredWorkMode}
              onChange={(e) => onUpdate({ preferredWorkMode: e.target.value })}
              className="h-10 w-full pl-10 pr-4 rounded-lg border border-white/10 bg-[#050816] focus:border-primary/50 text-xs text-white transition-all focus:outline-none appearance-none cursor-pointer"
            >
              {workModes.map((wm) => (
                <option key={wm} value={wm} className="bg-[#0A0F24]">
                  {wm}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Multi-select Locations */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-semibold text-text-secondary/50 uppercase tracking-wider block font-mono">
            Preferred Locations
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddLocation();
                }
              }}
              className="h-10 flex-grow px-4 rounded-lg border border-white/10 bg-white/[0.01] focus:border-primary/50 text-xs text-white placeholder-text-secondary/30 transition-all focus:outline-none"
              placeholder="e.g. San Francisco, London (Press Enter)"
            />
            <button
              type="button"
              onClick={handleAddLocation}
              className="h-10 w-10 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center text-text-secondary hover:text-white cursor-pointer"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1.5">
            {preferredLocations.map((loc) => (
              <Badge
                key={loc}
                className="bg-white/5 border border-white/10 text-white font-mono text-[9.5px] px-2 py-0.5 flex items-center gap-1.5 rounded"
              >
                <span>{loc}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveLocation(loc)}
                  className="text-text-secondary/50 hover:text-danger cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Learning Hours */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-text-secondary/50 uppercase tracking-wider block font-mono">
              Learning Hours
            </label>
            <div className="relative">
              <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/30" />
              <select
                value={availabilityHoursPerWeek}
                onChange={(e) => onUpdate({ availabilityHoursPerWeek: parseInt(e.target.value) })}
                className="h-10 w-full pl-10 pr-4 rounded-lg border border-white/10 bg-[#050816] focus:border-primary/50 text-xs text-white transition-all focus:outline-none appearance-none cursor-pointer"
              >
                {hourOptions.map((hrs) => (
                  <option key={hrs} value={hrs} className="bg-[#0A0F24]">
                    {hrs} hours/week
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Company Size */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-text-secondary/50 uppercase tracking-wider block font-mono">
              Preferred Company Size
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/30" />
              <select
                value={preferredCompanySize}
                onChange={(e) => onUpdate({ preferredCompanySize: e.target.value })}
                className="h-10 w-full pl-10 pr-4 rounded-lg border border-white/10 bg-[#050816] focus:border-primary/50 text-xs text-white transition-all focus:outline-none appearance-none cursor-pointer"
              >
                {companySizes.map((size) => (
                  <option key={size} value={size} className="bg-[#0A0F24]">
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-text-secondary/40 font-mono pt-2">
          * These preferences help SkillLens prioritize relevant target match scoring opportunities and weekly learning path milestones.
        </p>
      </div>
    </div>
  );
}
