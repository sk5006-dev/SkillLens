"use client";

import React, { useState } from "react";
import { FolderGit2, X, CheckCircle2, Loader2, Info, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface ConnectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectComplete: (repoName: string, provider: "github" | "gitlab" | "bitbucket") => void;
}

const PROVIDERS = [
  { id: "github" as const, name: "GitHub", domain: "github.com" },
  { id: "gitlab" as const, name: "GitLab", domain: "gitlab.com" },
  { id: "bitbucket" as const, name: "Bitbucket", domain: "bitbucket.org" },
];

export function ConnectRepositoryDialog({
  isOpen,
  onClose,
  onConnectComplete,
}: ConnectDialogProps) {
  const [selectedProvider, setSelectedProvider] = useState<"github" | "gitlab" | "bitbucket">("github");
  const [repoUrl, setRepoUrl] = useState("github.com/pranav-dev/distributed-kv");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectStage, setConnectStage] = useState(0);

  if (!isOpen) return null;

  const stages = [
    "Connecting to repository source...",
    "Fetching repository metadata & branches...",
    "Analyzing commits and author patterns...",
    "Detecting technology manifests...",
    "Building engineering evidence graph...",
    "Complete",
  ];

  const handleStartConnection = () => {
    setIsConnecting(true);
    setConnectStage(0);

    let stage = 0;
    const interval = setInterval(() => {
      stage += 1;
      setConnectStage(stage);

      if (stage >= stages.length - 1) {
        clearInterval(interval);
        setTimeout(() => {
          setIsConnecting(false);
          onConnectComplete(repoUrl, selectedProvider);
          onClose();
          setConnectStage(0);
        }, 500);
      }
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0A0F24] p-6 md:p-7 shadow-2xl space-y-6 text-left"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Connect Repository</h3>
              <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] font-mono">
                Integration Preview
              </Badge>
            </div>
            <p className="text-xs text-text-secondary/60">
              Link a source code repository to analyze commits and verify technical skills.
            </p>
          </div>
          {!isConnecting && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/5 text-text-secondary/50 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {!isConnecting ? (
          <div className="space-y-5">
            {/* Provider selector */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-text-secondary/50 uppercase font-mono block">
                Select Git Provider
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {PROVIDERS.map((prov) => (
                  <button
                    key={prov.id}
                    onClick={() => setSelectedProvider(prov.id)}
                    className={`p-3 rounded-lg border text-xs font-semibold transition-all cursor-pointer text-center ${
                      selectedProvider === prov.id
                        ? "border-primary bg-primary/10 text-white"
                        : "border-white/[0.06] bg-white/[0.01] text-text-secondary hover:text-white"
                    }`}
                  >
                    {prov.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Repo URL Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-text-secondary/50 uppercase font-mono block">
                Repository URL or Path
              </label>
              <input
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="e.g. github.com/username/repository"
                className="w-full bg-[#050816] border border-white/10 rounded-lg h-9.5 px-3 text-xs text-white placeholder-text-secondary/35 focus:outline-none focus:border-primary transition-colors font-mono"
              />
            </div>

            {/* Notice banner */}
            <div className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.01] flex items-start gap-2.5 text-xs text-text-secondary/70">
              <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                This preview simulates connecting public repositories. SkillLens scans commit histories, Dockerfiles, and package manifests to build your evidence portfolio.
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                className="h-9 px-4 rounded-lg border border-white/10 hover:bg-white/5 text-xs text-text-secondary font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleStartConnection}
                className="h-9 px-5 rounded-lg bg-primary hover:bg-primary/90 text-background-primary text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <span>Connect & Scan</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Connection animation */
          <div className="space-y-5 py-4 text-left">
            <div className="space-y-1 text-center">
              <Loader2 className="h-7 w-7 text-primary animate-spin mx-auto mb-2" />
              <h4 className="text-sm font-bold text-white">Connecting & Scanning Repository</h4>
              <p className="text-[11px] text-text-secondary/60">{stages[connectStage]}</p>
            </div>

            <div className="p-4 rounded-xl border border-white/[0.06] bg-[#050816] space-y-2 max-h-52 overflow-y-auto">
              {stages.map((stageName, idx) => {
                const isDone = idx < connectStage;
                const isCurr = idx === connectStage;
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between text-xs py-1 transition-colors ${
                      isCurr ? "text-primary font-semibold" : isDone ? "text-text-secondary/80" : "text-text-secondary/30"
                    }`}
                  >
                    <span>{stageName}</span>
                    {isDone && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />}
                    {isCurr && <Loader2 className="h-3.5 w-3.5 text-primary animate-spin shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
