"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check, Target, Plus, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface RoleItem {
  id: string;
  name: string;
  category: string;
}

interface RoleSelectorProps {
  roles: RoleItem[];
  selectedRole: string;
  isCustom: boolean;
  onSelectRole: (role: string, isCustom: boolean) => void;
}

export function RoleSelector({
  roles,
  selectedRole,
  isCustom,
  onSelectRole,
}: RoleSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isEnteringCustom, setIsEnteringCustom] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setIsEnteringCustom(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredRoles = roles.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      onSelectRole(customInput.trim(), true);
      setIsOpen(false);
      setIsEnteringCustom(false);
      setCustomInput("");
    }
  };

  return (
    <div ref={containerRef} className="relative text-left w-full">
      <label className="text-[10.5px] font-bold text-text-secondary/60 uppercase font-mono block mb-1.5">
        Target Role
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-10 px-3 rounded-lg border border-white/10 bg-[#050816] hover:border-white/20 text-xs text-white flex items-center justify-between transition-colors cursor-pointer focus:outline-none focus:border-primary"
      >
        <div className="flex items-center gap-2 truncate">
          <Target className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
          <span className="font-semibold truncate">{selectedRole}</span>
          {isCustom && (
            <Badge className="bg-cyan-500/20 text-cyan-300 border-0 text-[9px] font-mono px-1 py-0 shrink-0">
              Custom Role
            </Badge>
          )}
        </div>
        <ChevronDown className="h-3.5 w-3.5 text-text-secondary/50 shrink-0" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-40 rounded-xl border border-white/10 bg-[#0A0F24] p-2 shadow-2xl space-y-1.5 backdrop-blur-md">
          {!isEnteringCustom ? (
            <>
              {/* Search input */}
              <div className="relative mb-1">
                <Search className="h-3.5 w-3.5 text-text-secondary/40 absolute left-2.5 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search engineering roles..."
                  className="w-full bg-[#050816] border border-white/10 rounded-lg h-8 pl-8 pr-2 text-xs text-white placeholder-text-secondary/35 focus:outline-none focus:border-primary font-mono"
                  autoFocus
                />
              </div>

              {/* Roles list */}
              <div className="max-h-48 overflow-y-auto space-y-0.5 pr-1">
                {filteredRoles.map((r) => {
                  const isSelected = selectedRole.toLowerCase() === r.name.toLowerCase();
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => {
                        onSelectRole(r.name, false);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "w-full px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer text-left",
                        isSelected
                          ? "bg-primary/15 text-primary font-bold"
                          : "text-text-secondary hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <div>
                        <span className="block font-semibold">{r.name}</span>
                        <span className="text-[10px] text-text-secondary/50 font-mono block">
                          {r.category}
                        </span>
                      </div>
                      {isSelected && <Check className="h-3.5 w-3.5 text-primary" />}
                    </button>
                  );
                })}

                {filteredRoles.length === 0 && (
                  <div className="p-3 text-center text-xs text-text-secondary/50 font-mono">
                    No predefined role found.
                  </div>
                )}
              </div>

              {/* Custom role trigger */}
              <div className="border-t border-white/[0.06] pt-1.5 mt-1">
                <button
                  type="button"
                  onClick={() => setIsEnteringCustom(true)}
                  className="w-full px-2.5 py-1.5 rounded-lg text-xs text-primary hover:bg-primary/10 flex items-center gap-1.5 transition-colors cursor-pointer font-semibold"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>+ Enter a custom role</span>
                </button>
              </div>
            </>
          ) : (
            /* Custom role text input */
            <form onSubmit={handleCustomSubmit} className="space-y-2 p-1">
              <span className="text-[10px] font-bold text-text-secondary/50 uppercase font-mono block">
                Enter Custom Engineering Role
              </span>
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="e.g. Distributed Systems Engineer, Staff Backend"
                className="w-full bg-[#050816] border border-white/10 rounded-lg h-8.5 px-2.5 text-xs text-white placeholder-text-secondary/35 focus:outline-none focus:border-primary font-mono"
                autoFocus
              />
              <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04] text-[10.5px] text-text-secondary/60 flex items-start gap-1.5">
                <Info className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                <span>
                  SkillLens infers core category requirements based on the title keywords and matches your verified evidence.
                </span>
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsEnteringCustom(false)}
                  className="px-2.5 py-1 rounded text-xs text-text-secondary/60 hover:text-white"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded bg-primary text-background-primary text-xs font-bold"
                >
                  Set Custom Role
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
