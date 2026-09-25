"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceDot,
} from "recharts";
import { AlertCircle, HelpCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface ReadinessCheckpoint {
  date: string;
  score: number;
  company: string;
  role: string;
  change: number;
  majorImprovement: string;
  completedMilestone: string;
}

interface ReadinessChartProps {
  checkpoints: ReadinessCheckpoint[];
  onNavigateTab: (tab: string) => void;
}

export function ReadinessChart({ checkpoints, onNavigateTab }: ReadinessChartProps) {
  const [selectedPoint, setSelectedPoint] = useState<ReadinessCheckpoint | null>(checkpoints[checkpoints.length - 1] || null);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: ReadinessCheckpoint = payload[0].payload;
      return (
        <div className="p-3.5 rounded-lg border border-white/10 bg-[#0A0F24] text-xs font-mono text-left space-y-1 shadow-xl">
          <span className="text-[10px] text-text-secondary/40">{data.date}</span>
          <div className="flex items-center gap-1.5">
            <span className="text-white font-bold">Readiness:</span>
            <span className="text-primary font-bold">{data.score}%</span>
          </div>
          <p className="text-[10.5px] text-text-secondary/70">
            Target: {data.role} @ {data.company}
          </p>
          <p className="text-[10.5px] text-emerald-400 font-semibold border-t border-white/[0.06] pt-1 mt-1">
            {data.majorImprovement}
          </p>
        </div>
      );
    }
    return null;
  };

  const handlePointClick = (data: any) => {
    if (data && data.activePayload && data.activePayload[0]) {
      setSelectedPoint(data.activePayload[0].payload);
    }
  };

  return (
    <div className="p-5 rounded-xl border border-white/[0.08] bg-white/[0.01] space-y-5 text-left">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
            Target Readiness Trajectory
          </h4>
          <p className="text-[11px] text-text-secondary/60 mt-0.5">
            Click any point along the timeline to audit the primary score change contributors.
          </p>
        </div>
      </div>

      {/* Chart container */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={checkpoints}
            onClick={handlePointClick}
            margin={{ top: 15, right: 15, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
            <XAxis
              dataKey="date"
              stroke="rgba(255,255,255,0.2)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={[50, 100]}
              stroke="rgba(255,255,255,0.2)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="score"
              stroke="var(--primary)"
              strokeWidth={2.5}
              dot={{ r: 4, stroke: "#0A0F24", strokeWidth: 1 }}
              activeDot={{ r: 6, stroke: "var(--primary)", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Detail breakdown panel */}
      {selectedPoint && (
        <div className="p-4 rounded-xl border border-white/[0.05] bg-[#050816] space-y-3.5 text-xs">
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-2">
            <div>
              <span className="text-[10px] text-text-secondary/50 font-mono uppercase block">
                Readiness Checkpoint &bull; {selectedPoint.date}
              </span>
              <span className="text-sm font-bold text-white tracking-tight">
                {selectedPoint.role} @ {selectedPoint.company}
              </span>
            </div>
            <div className="text-right">
              <span className="text-base font-extrabold font-mono text-primary">{selectedPoint.score}%</span>
              <span className="text-[10px] text-emerald-400 font-mono block">
                Change: +{selectedPoint.change || 0}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-emerald-400 uppercase font-mono block">
                Major Improvement Signal
              </span>
              <p className="text-text-secondary/80 text-[11.5px] leading-relaxed">
                {selectedPoint.majorImprovement}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-text-secondary/50 uppercase font-mono block">
                Primary Contributor Share
              </span>
              <div className="space-y-1 font-mono text-[10.5px]">
                <div className="flex justify-between">
                  <span className="text-text-secondary/80">Kubernetes Evidence</span>
                  <span className="text-primary font-bold">+3%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary/80">Project Verification</span>
                  <span className="text-primary font-bold">+2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary/80">Resume Alignment</span>
                  <span className="text-primary font-bold">+1%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary/80">Roadmap Completion</span>
                  <span className="text-primary font-bold">+2%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick jump actions */}
          <div className="flex items-center gap-2 border-t border-white/[0.04] pt-3">
            <button
              onClick={() => onNavigateTab("Resume")}
              className="h-7.5 px-3 rounded bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 text-[10.5px] font-semibold text-text-secondary hover:text-white"
            >
              Open Resume
            </button>
            <button
              onClick={() => onNavigateTab("Projects")}
              className="h-7.5 px-3 rounded bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 text-[10.5px] font-semibold text-text-secondary hover:text-white"
            >
              Open Project
            </button>
            <button
              onClick={() => onNavigateTab("Roadmap")}
              className="h-7.5 px-3 rounded bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 text-[10.5px] font-semibold text-text-secondary hover:text-white"
            >
              Open Roadmap
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
