"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, AlertTriangle, ArrowRight, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { forgotPasswordSchema, ForgotPasswordInput } from "../../../validation/auth-schemas";
import { useAuthStore } from "../../../store/auth-store";
import { AuthLayout } from "../../../components/auth/auth-layout";
import { AuthCard } from "../../../components/auth/auth-card";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { forgotPassword, isLoading, isSuccess, error, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ""
    }
  });

  const emailValue = watch("email");

  // Clear errors on mount
  useEffect(() => {
    clearError();
  }, [clearError]);

  const onSubmit = async (data: ForgotPasswordInput) => {
    try {
      await forgotPassword(data);
    } catch (err) {
      // Handled in store
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {isSuccess ? (
            /* Success confirmation display */
            <div className="space-y-6 text-center py-4">
              <div className="h-12 w-12 rounded-full bg-success/15 border border-success/30 flex items-center justify-center text-success mx-auto">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Check your email</h3>
                <p className="text-xs text-text-secondary mt-2 leading-relaxed max-w-sm mx-auto">
                  We sent a secure recovery link to <span className="text-white font-semibold font-mono">{emailValue}</span>. Please verify.
                </p>
              </div>
              <button
                onClick={() => router.push("/auth/login")}
                className="w-full h-11 rounded-lg border border-white/10 hover:bg-white/[0.04] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
              </button>
            </div>
          ) : (
            /* Form input display */
            <>
              {/* Header */}
              <div className="text-center">
                <h2 className="text-xl font-bold tracking-tight text-white">Reset password</h2>
                <p className="text-[11px] text-text-secondary mt-1">Enter your registered email to request recovery credentials.</p>
              </div>

              {/* Inline Error Banners */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 rounded-lg border border-danger/25 bg-danger/5 flex items-start gap-2.5 text-danger"
                >
                  <AlertTriangle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold leading-none">Recovery Failed</p>
                    <p className="text-[9px] text-text-secondary mt-1">{error}</p>
                  </div>
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                {/* Email Input (Floating Labels) */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary/40">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    disabled={isLoading}
                    {...register("email")}
                    className={`w-full bg-white/[0.02] border rounded-lg h-11 pl-10 pr-4 text-xs text-white placeholder-transparent focus:outline-none transition-all duration-300 ${
                      errors.email 
                        ? "border-danger focus:border-danger focus:ring-1 focus:ring-danger" 
                        : "border-white/10 focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_15px_rgba(91,140,255,0.15)]"
                    }`}
                    placeholder="Email Address"
                  />
                  <label 
                    className={`absolute left-10 text-[10px] text-text-secondary/50 font-semibold pointer-events-none transition-all duration-300 ${
                      emailValue 
                        ? "top-1 text-[8px] text-primary" 
                        : "top-3.5"
                    }`}
                  >
                    Email Address
                  </label>
                  {errors.email && (
                    <p className="text-[9px] text-danger mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Continue button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-11 rounded-lg bg-primary hover:bg-primary/95 text-background-primary text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 shadow-lg shadow-primary/10 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Send Recovery Link <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </motion.button>

              </form>

              {/* Link: Back to login */}
              <div className="text-center pt-2">
                <button 
                  type="button"
                  onClick={() => router.push("/auth/login")}
                  className="text-text-secondary hover:text-white transition-colors text-[10px] font-semibold flex items-center justify-center gap-1.5 focus:outline-none w-full"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
                </button>
              </div>
            </>
          )}
        </motion.div>
      </AuthCard>
    </AuthLayout>
  );
}
