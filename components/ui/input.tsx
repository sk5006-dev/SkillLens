"use client";

import React, { useId, useState } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, success, helperText, onFocus, onBlur, ...props }, ref) => {
    const inputId = useId();
    const [focused, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      if (onFocus) onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      setHasValue(!!e.target.value);
      if (onBlur) onBlur(e);
    };

    const isFloating = focused || hasValue || props.placeholder;

    return (
      <div className="relative w-full flex flex-col gap-1.5">
        <div
          className={cn(
            "relative w-full rounded-lg border bg-[#0F172A]/40 transition-all duration-300",
            focused ? "border-primary/50 ring-1 ring-primary/30 shadow-[0_0_20px_rgba(108,99,255,0.15)]" : "border-white/10",
            error && "border-danger/50 ring-1 ring-danger/30 shadow-[0_0_20px_rgba(239,68,68,0.15)]",
            success && "border-success/50 ring-1 ring-success/30 shadow-[0_0_20px_rgba(34,197,94,0.15)]",
            className
          )}
        >
          {label && (
            <label
              htmlFor={inputId}
              className={cn(
                "absolute left-4.5 select-none pointer-events-none transition-all duration-250 ease-out origin-[0_0]",
                isFloating
                  ? "top-1.5 text-xs text-text-secondary scale-90 translate-y-0"
                  : "top-1/2 -translate-y-1/2 text-sm text-text-secondary"
              )}
            >
              {label}
            </label>
          )}
          <input
            id={inputId}
            ref={ref}
            type={type}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              "w-full bg-transparent px-4.5 text-sm text-white placeholder-text-secondary/50 focus:outline-none",
              label ? (isFloating ? "pt-5 pb-1.5 h-12" : "py-3 h-12") : "py-3.5 h-12"
            )}
            onChange={(e) => {
              setHasValue(!!e.target.value);
              if (props.onChange) props.onChange(e);
            }}
            {...props}
          />
        </div>

        {/* Status Messages */}
        {error && (
          <p className="text-xs text-danger font-medium tracking-wide pl-1.5">
            {error}
          </p>
        )}
        {!error && success && (
          <p className="text-xs text-success font-medium tracking-wide pl-1.5">
            {success}
          </p>
        )}
        {!error && !success && helperText && (
          <p className="text-xs text-text-secondary/70 pl-1.5">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
