"use client";

import React, { useState } from "react";
import { User, Mail, Award, MapPin, Globe, Clock } from "lucide-react";

interface ProfileSettingsProps {
  name: string;
  email: string;
  professionalTitle: string;
  experienceLevel: string;
  country: string;
  timezone: string;
  onUpdate: (data: {
    name?: string;
    email?: string;
    professionalTitle?: string;
    experienceLevel?: string;
    country?: string;
    timezone?: string;
  }) => void;
}

export function ProfileSettings({
  name,
  email,
  professionalTitle,
  experienceLevel,
  country,
  timezone,
  onUpdate,
}: ProfileSettingsProps) {
  const levels = ["Junior", "Mid-level", "Senior", "Staff", "Principal"];
  const [localName, setLocalName] = useState(name);
  const [localEmail, setLocalEmail] = useState(email);
  const [localTitle, setLocalTitle] = useState(professionalTitle);
  const [localCountry, setLocalCountry] = useState(country);
  const [localTimezone, setLocalTimezone] = useState(timezone);
  
  // Validation status
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (val: string) => {
    setLocalEmail(val);
    if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
      onUpdate({ email: val });
    }
  };

  // Profile completeness count
  const completeness = (() => {
    let score = 0;
    if (name) score += 20;
    if (email && !emailError) score += 20;
    if (professionalTitle) score += 20;
    if (experienceLevel) score += 20;
    if (country) score += 10;
    if (timezone) score += 10;
    return score;
  })();

  return (
    <div className="space-y-6 text-left max-w-xl">
      <div className="space-y-1">
        <h3 className="text-base font-bold text-white tracking-tight">Profile Settings</h3>
        <p className="text-xs text-text-secondary/70 leading-relaxed">
          Keep your professional profile information up to date to personalize your workspace compatibility matching.
        </p>
      </div>

      {/* Completeness bar */}
      <div className="p-4 rounded-xl border border-white/[0.06] bg-[#050816] space-y-2.5">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-text-secondary/80">Profile Completeness</span>
          <span className="font-mono font-bold text-primary">{completeness}%</span>
        </div>
        <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${completeness}%` }}
          />
        </div>
      </div>

      {/* Form Controls */}
      <div className="space-y-4 pt-1 text-xs">
        <div className="space-y-1.5">
          <label className="text-[10px] font-semibold text-text-secondary/50 uppercase tracking-wider block font-mono">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/30" />
            <input
              type="text"
              value={localName}
              onChange={(e) => {
                setLocalName(e.target.value);
                onUpdate({ name: e.target.value });
              }}
              className="h-10 w-full pl-10 pr-4 rounded-lg border border-white/10 bg-white/[0.01] focus:border-primary/50 text-xs text-white placeholder-text-secondary/30 transition-all focus:outline-none"
              placeholder="Full Name"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-semibold text-text-secondary/50 uppercase tracking-wider block font-mono">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/30" />
            <input
              type="email"
              value={localEmail}
              onChange={(e) => handleEmailChange(e.target.value)}
              className="h-10 w-full pl-10 pr-4 rounded-lg border border-white/10 bg-white/[0.01] focus:border-primary/50 text-xs text-white placeholder-text-secondary/30 transition-all focus:outline-none"
              placeholder="Email"
            />
          </div>
          {emailError && (
            <p className="text-[10px] text-danger font-mono mt-1">{emailError}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-semibold text-text-secondary/50 uppercase tracking-wider block font-mono">
            Professional Title
          </label>
          <div className="relative">
            <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/30" />
            <input
              type="text"
              value={localTitle}
              onChange={(e) => {
                setLocalTitle(e.target.value);
                onUpdate({ professionalTitle: e.target.value });
              }}
              className="h-10 w-full pl-10 pr-4 rounded-lg border border-white/10 bg-white/[0.01] focus:border-primary/50 text-xs text-white placeholder-text-secondary/30 transition-all focus:outline-none"
              placeholder="e.g. Senior Full Stack Engineer"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-semibold text-text-secondary/50 uppercase tracking-wider block font-mono">
            Experience Level
          </label>
          <div className="relative">
            <Award className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/30" />
            <select
              value={experienceLevel}
              onChange={(e) => onUpdate({ experienceLevel: e.target.value })}
              className="h-10 w-full pl-10 pr-4 rounded-lg border border-white/10 bg-[#050816] focus:border-primary/50 text-xs text-white transition-all focus:outline-none appearance-none cursor-pointer"
            >
              {levels.map((lvl) => (
                <option key={lvl} value={lvl} className="bg-[#0A0F24]">
                  {lvl} Level
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-text-secondary/50 uppercase tracking-wider block font-mono">
              Country
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/30" />
              <input
                type="text"
                value={localCountry}
                onChange={(e) => {
                  setLocalCountry(e.target.value);
                  onUpdate({ country: e.target.value });
                }}
                className="h-10 w-full pl-10 pr-4 rounded-lg border border-white/10 bg-white/[0.01] focus:border-primary/50 text-xs text-white placeholder-text-secondary/30 transition-all focus:outline-none"
                placeholder="Country"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-text-secondary/50 uppercase tracking-wider block font-mono">
              Timezone
            </label>
            <div className="relative">
              <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/30" />
              <input
                type="text"
                value={localTimezone}
                onChange={(e) => {
                  setLocalTimezone(e.target.value);
                  onUpdate({ timezone: e.target.value });
                }}
                className="h-10 w-full pl-10 pr-4 rounded-lg border border-white/10 bg-white/[0.01] focus:border-primary/50 text-xs text-white placeholder-text-secondary/30 transition-all focus:outline-none"
                placeholder="e.g. EST / UTC-5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
