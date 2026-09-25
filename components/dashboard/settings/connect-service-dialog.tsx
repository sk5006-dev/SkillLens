"use client";

import React, { useState, useEffect } from "react";
import { Link2, ShieldCheck, Loader2, X, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface ConnectServiceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: "github" | "gitlab" | "bitbucket" | null;
  onConfirmConnect: (service: "github" | "gitlab" | "bitbucket") => void;
}

export function ConnectServiceDialog({
  isOpen,
  onClose,
  serviceName,
  onConfirmConnect,
}: ConnectServiceDialogProps) {
  const [stage, setStage] = useState<number>(-1);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const connectionStages = [
    "Redirecting to OAuth gateway...",
    "Authenticating with credentials security keys...",
    "Reading repository commit structures...",
    "Importing manifests and package lock configurations...",
    "Connection verified successfully!",
  ];

  const displayName = serviceName
    ? serviceName.charAt(0).toUpperCase() + serviceName.slice(1)
    : "";

  useEffect(() => {
    if (!isOpen) {
      setStage(-1);
      setIsConnecting(false);
    }
  }, [isOpen]);

  const handleStartConnection = () => {
    setIsConnecting(true);
    setStage(0);

    const interval = setInterval(() => {
      setStage((prev) => {
        if (prev < connectionStages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsConnecting(false);
          onConfirmConnect(serviceName!);
          setTimeout(() => onClose(), 600);
          return prev;
        }
      });
    }, 500);
  };

  if (!isOpen || !serviceName) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0A0F24] p-6 shadow-2xl space-y-5 text-left"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <Link2 className="h-5 w-5 text-primary" />
            <div>
              <h3 className="text-base font-bold text-white">Connect {displayName}</h3>
              <p className="text-xs text-text-secondary/60">
                Link repository workspace evidence
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isConnecting}
            className="p-1.5 rounded-lg hover:bg-white/5 text-text-secondary/50 hover:text-white shrink-0 disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Info card */}
        <div className="space-y-3">
          <p className="text-xs text-text-secondary/80 leading-relaxed">
            SkillLens will import your public repository commit history, metadata, and container configurations to verify engineering skills.
          </p>
          <div className="flex items-center gap-2 font-mono">
            <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] uppercase">
              Integration Preview
            </Badge>
          </div>
        </div>

        {/* Progress verification stack */}
        {isConnecting && (
          <div className="space-y-2 py-2 border-t border-b border-white/[0.04]">
            {connectionStages.slice(0, stage + 1).map((st, idx) => {
              const isCurrent = idx === stage;
              return (
                <div
                  key={idx}
                  className={`p-2 rounded text-xs flex items-center gap-2.5 font-mono ${
                    isCurrent ? "text-primary bg-primary/5 font-semibold" : "text-text-secondary/60"
                  }`}
                >
                  {isCurrent ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0 text-primary" />
                  ) : (
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  )}
                  <span>{st}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Actions */}
        {!isConnecting && (
          <div className="border-t border-white/[0.06] pt-3 flex justify-end gap-2.5">
            <button
              onClick={onClose}
              className="h-9 px-4 rounded border border-white/10 hover:bg-white/5 text-xs text-text-secondary font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleStartConnection}
              className="h-9 px-5 rounded bg-primary hover:bg-primary/90 text-background-primary text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-[0.98]"
            >
              Connect Service
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
