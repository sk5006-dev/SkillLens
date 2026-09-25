"use client";

import React, { useState } from "react";
import { Sparkles, RefreshCw, CheckCircle2 } from "lucide-react";
import { CompanySelector, CompanyItem } from "./company-selector";
import { RoleSelector, RoleItem } from "./role-selector";
import { cn } from "@/lib/utils";

interface TargetSelectorProps {
  companies: CompanyItem[];
  roles: RoleItem[];
  currentCompany: string;
  currentRole: string;
  isCustomCompany: boolean;
  isCustomRole: boolean;
  onApplyTarget: (company: string, role: string, isCustomCompany: boolean, isCustomRole: boolean) => void;
  isAnalyzing?: boolean;
}

export function TargetSelector({
  companies,
  roles,
  currentCompany,
  currentRole,
  isCustomCompany,
  isCustomRole,
  onApplyTarget,
  isAnalyzing = false,
}: TargetSelectorProps) {
  const [selectedCompany, setSelectedCompany] = useState(currentCompany);
  const [selectedRole, setSelectedRole] = useState(currentRole);
  const [customComp, setCustomComp] = useState(isCustomCompany);
  const [customRl, setCustomRl] = useState(isCustomRole);

  const hasChanges =
    selectedCompany !== currentCompany ||
    selectedRole !== currentRole ||
    customComp !== isCustomCompany ||
    customRl !== isCustomRole;

  const handleApply = () => {
    onApplyTarget(selectedCompany, selectedRole, customComp, customRl);
  };

  return (
    <div className="p-4 md:p-5 rounded-xl border border-white/[0.08] bg-[#070B1E] space-y-4 text-left shadow-md">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
        <span className="text-[10px] font-bold text-text-secondary/50 uppercase tracking-widest font-mono">
          Target Configuration
        </span>
        <span className="text-[10.5px] text-text-secondary/40 font-mono">
          Select or enter a custom target to calibrate readiness
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-end">
        <div className="sm:col-span-5">
          <CompanySelector
            companies={companies}
            selectedCompany={selectedCompany}
            isCustom={customComp}
            onSelectCompany={(c, isC) => {
              setSelectedCompany(c);
              setCustomComp(isC);
            }}
          />
        </div>

        <div className="sm:col-span-5">
          <RoleSelector
            roles={roles}
            selectedRole={selectedRole}
            isCustom={customRl}
            onSelectRole={(r, isC) => {
              setSelectedRole(r);
              setCustomRl(isC);
            }}
          />
        </div>

        <div className="sm:col-span-2">
          <button
            type="button"
            onClick={handleApply}
            disabled={isAnalyzing || (!hasChanges && selectedCompany === currentCompany && selectedRole === currentRole)}
            className={cn(
              "w-full h-10 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm focus:outline-none",
              hasChanges
                ? "bg-primary hover:bg-primary/90 text-background-primary active:scale-[0.98]"
                : "bg-white/[0.04] text-text-secondary/60 hover:text-white border border-white/10"
            )}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>Calibrating...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" />
                <span>Analyze Target</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
