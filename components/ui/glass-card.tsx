"use client";

import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: string;
  noPadding?: boolean;
}

export function GlassCard({ children, className, glowColor = "rgba(108, 99, 255, 0.12)", noPadding = false, ...props }: GlassCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative rounded-xl border border-white/[0.06] bg-white/[0.01] backdrop-blur-md transition-all duration-400 hover:border-white/[0.12] hover:bg-white/[0.03] hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40",
        className
      )}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              ${glowColor},
              transparent 80%
            )
          `,
        }}
      />
      <div className={cn("relative z-10", !noPadding && "p-6")}>{children}</div>
    </div>
  );
}

// 1. Feature Card
interface FeatureCardProps extends Omit<GlassCardProps, "children"> {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description, className, ...props }: FeatureCardProps) {
  return (
    <GlassCard className={className} glowColor="rgba(0, 212, 255, 0.12)" {...props}>
      <div className="flex flex-col gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-primary transition-colors group-hover:border-primary/30 group-hover:bg-primary/5">
          {icon}
        </div>
        <div>
          <h4 className="text-base font-semibold text-white tracking-tight group-hover:text-primary transition-colors">
            {title}
          </h4>
          <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

// 2. Dashboard Card
interface DashboardCardProps extends GlassCardProps {
  title: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
}

export function DashboardCard({ title, subtitle, headerAction, children, className, ...props }: DashboardCardProps) {
  return (
    <GlassCard className={className} noPadding {...props}>
      <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4.5">
        <div>
          <h4 className="text-sm font-semibold text-white tracking-tight">{title}</h4>
          {subtitle && <p className="text-xs text-text-secondary mt-0.5">{subtitle}</p>}
        </div>
        {headerAction && <div className="flex items-center">{headerAction}</div>}
      </div>
      <div className="p-6">{children}</div>
    </GlassCard>
  );
}

// 3. Statistic Card
interface StatisticCardProps extends Omit<GlassCardProps, "children"> {
  label: string;
  value: string | number;
  change?: number; // E.g., +12.3 or -2.4
  changePeriod?: string;
}

export function StatisticCard({ label, value, change, changePeriod = "vs last month", className, ...props }: StatisticCardProps) {
  const isPositive = change && change > 0;
  return (
    <GlassCard className={className} glowColor="rgba(139, 92, 246, 0.12)" {...props}>
      <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
        {label}
      </p>
      <div className="mt-3.5 flex items-baseline justify-between">
        <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
        {change !== undefined && (
          <div
            className={cn(
              "inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold",
              isPositive ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
            )}
          >
            {isPositive ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      {changePeriod && (
        <p className="mt-2 text-xs text-text-secondary/60 font-medium">
          {changePeriod}
        </p>
      )}
    </GlassCard>
  );
}

// 4. Empty State Card
interface EmptyStateCardProps extends Omit<GlassCardProps, "children"> {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyStateCard({ icon, title, description, action, className, ...props }: EmptyStateCardProps) {
  return (
    <GlassCard className={cn("text-center border-dashed border-white/10", className)} {...props}>
      <div className="flex flex-col items-center justify-center py-6 px-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-text-secondary mb-4">
          {icon}
        </div>
        <h4 className="text-base font-semibold text-white tracking-tight">{title}</h4>
        <p className="mt-2 text-sm text-text-secondary max-w-xs leading-relaxed">
          {description}
        </p>
        {action && <div className="mt-5">{action}</div>}
      </div>
    </GlassCard>
  );
}
