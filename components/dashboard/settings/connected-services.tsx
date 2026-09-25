"use client";

import React, { useState } from "react";
import { FolderGit2, RefreshCw, Unlink, Link2, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ConnectedServicesProps {
  githubConnected: boolean;
  connectedGitSource: "github" | "gitlab" | "bitbucket" | null;
  onConnect: (service: "github" | "gitlab" | "bitbucket") => void;
  onDisconnect: (service: "github" | "gitlab" | "bitbucket") => void;
}

export function ConnectedServices({
  githubConnected,
  connectedGitSource,
  onConnect,
  onDisconnect,
}: ConnectedServicesProps) {
  const [syncingProvider, setSyncingProvider] = useState<string | null>(null);

  const handleSync = (provider: string) => {
    setSyncingProvider(provider);
    setTimeout(() => {
      setSyncingProvider(null);
    }, 1200);
  };

  const providers = [
    {
      key: "github" as const,
      name: "GitHub",
      connected: githubConnected || connectedGitSource === "github",
      lastSynced: "Today, 10:32 AM",
      repos: 5,
    },
    {
      key: "gitlab" as const,
      name: "GitLab",
      connected: connectedGitSource === "gitlab",
      lastSynced: "Never",
      repos: 0,
    },
    {
      key: "bitbucket" as const,
      name: "Bitbucket",
      connected: connectedGitSource === "bitbucket",
      lastSynced: "Never",
      repos: 0,
    },
  ];

  return (
    <div className="space-y-6 text-left max-w-xl">
      <div className="space-y-1">
        <h3 className="text-base font-bold text-white tracking-tight">Connected Services</h3>
        <p className="text-xs text-text-secondary/70 leading-relaxed">
          Link repository profiles to extract codebase metadata, Dockerfiles, and commit stats.
        </p>
      </div>

      <div className="space-y-4 pt-1 text-xs">
        {providers.map((prov) => {
          const isSyncing = syncingProvider === prov.key;
          return (
            <div
              key={prov.key}
              className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.01] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-center text-primary shrink-0">
                  <FolderGit2 className="h-4.5 w-4.5" />
                </div>

                <div className="text-left space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{prov.name}</span>
                    <Badge className="bg-white/5 border border-white/10 text-text-secondary/60 text-[9px] font-mono">
                      Integration Preview
                    </Badge>
                  </div>
                  <div className="text-[10px] text-text-secondary/40 font-mono space-y-0.5">
                    <span>
                      Status: {prov.connected ? "Connected" : "Not connected"}
                    </span>
                    {prov.connected && (
                      <div className="flex gap-2">
                        <span>Last synced: {prov.lastSynced}</span>
                        <span>&bull;</span>
                        <span>{prov.repos} repositories analyzed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {prov.connected ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleSync(prov.key)}
                      disabled={isSyncing}
                      className="h-8 px-3 rounded border border-white/10 bg-[#050816] hover:bg-white/5 text-[11px] font-semibold text-text-secondary flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {isSyncing ? (
                        <Loader2 className="h-3 w-3 animate-spin text-primary" />
                      ) : (
                        <RefreshCw className="h-3 w-3 text-text-secondary/70" />
                      )}
                      <span>Sync</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onDisconnect(prov.key)}
                      className="h-8 px-3 rounded border border-danger/20 bg-danger/5 hover:bg-danger/10 text-[11px] font-semibold text-danger flex items-center gap-1.5 cursor-pointer"
                    >
                      <Unlink className="h-3 w-3" />
                      <span>Disconnect</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => onConnect(prov.key)}
                    className="h-8 px-4 rounded bg-primary hover:bg-primary/90 text-background-primary text-[11.5px] font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]"
                  >
                    <Link2 className="h-3.5 w-3.5" />
                    <span>Connect</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
