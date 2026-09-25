import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide border transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-primary",
  {
    variants: {
      variant: {
        primary: "bg-primary/10 border-primary/20 text-primary shadow-[0_0_10px_rgba(108,99,255,0.05)]",
        success: "bg-success/10 border-success/20 text-success shadow-[0_0_10px_rgba(34,197,94,0.05)]",
        warning: "bg-warning/10 border-warning/20 text-warning shadow-[0_0_10px_rgba(245,158,11,0.05)]",
        danger: "bg-danger/10 border-danger/20 text-danger shadow-[0_0_10px_rgba(239,68,68,0.05)]",
        gradient: "bg-gradient-to-r from-primary/10 to-accent/10 border-primary/15 text-white shadow-sm shadow-primary/5",
        outline: "border-white/10 bg-transparent text-text-secondary hover:text-white hover:border-white/20",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
export { badgeVariants };
