"use client";

import React from "react";
import { History, X, ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface TargetHistoryEntry {
  company: string;
  role: string;
  score: number;
  lastAnalyzed: string;
}

interface TargetHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  history: TargetHistoryEntry[];
  currentCompany: string;
  currentRole: string;
  onRestoreTarget: (company: string, role: string) => void;
}

export function TargetHistory({
  isOpen,
  onClose,
  history,
  currentCompany,
  currentRole,
  onRestoreTarget,
}: TargetHistoryProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md h-full bg-[#0A0F24] border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto space-y-6 text-left shadow-2xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <History className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-bold text-white">Target History</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/5 text-text-secondary/50 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* History List */}
          <div className="space-y-2.5">
            {history.map((item, idx) => {
              const isCurrent =
                item.company.toLowerCase() === currentCompany.toLowerCase() &&
                item.role.toLowerCase() === currentRole.toLowerCase();

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all text-left flex items-center justify-between ${
                    isCurrent
                      ? "border-primary/40 bg-primary/10"
                      : "border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{item.role}</span>
                      {isCurrent && (
                        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[9px] font-mono">
                          Current
                        </Badge>
                      )}
                    </div>
                    <span className="text-[11px] text-text-secondary/70 block">
                      @{item.company} &bull; <span className="font-mono text-text-secondary/40 text-[10px]">{item.lastAnalyzed}</span>
                    </span>
                  </div>

                  <div className="text-right flex flex-col items-end gap-1.5">
                    <span className="text-sm font-bold font-mono text-primary">{item.score}%</span>
                    {!isCurrent && (
                      <button
                        onClick={() => {
                          onRestoreTarget(item.company, item.role);
                          onClose();
                        }}
                        className="text-[10px] text-primary hover:underline font-mono font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <span>Restore</span>
                        <ArrowRight className="h-2.5 w-2.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {history.length === 0 && (
              <div className="p-8 text-center text-xs text-text-secondary/50 font-mono">
                No past targets recorded yet.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/[0.06] flex justify-end">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded-lg border border-white/10 hover:bg-white/5 text-xs text-text-secondary font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
