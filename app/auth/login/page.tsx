"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, AlertTriangle, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { loginSchema, LoginInput } from "../../../validation/auth-schemas";
import { useAuthStore } from "../../../store/auth-store";
import { AuthLayout } from "../../../components/auth/auth-layout";
import { AuthCard } from "../../../components/auth/auth-card";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, isSuccess, error, clearError } = useAuthStore();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  // Watch inputs for floating label transitions
  const emailValue = watch("email");
  const passwordValue = watch("password");

  // Clear errors on mount
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Successful login redirect
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        router.push("/onboarding");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, router]);

  const onSubmit = async (data: LoginInput) => {
    try {
      await login(data);
    } catch (err) {
      // Handled in store
    }
  };

  return (
    <AuthLayout>
      <AuthCard isSuccess={isSuccess}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="text-center">
            <h2 className="text-xl font-bold tracking-tight text-white">Sign in to SkillLens</h2>
            <p className="text-[11px] text-text-secondary mt-1">Enter your secure credentials to verify your workspace.</p>
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
                <p className="text-[10px] font-bold leading-none">Authentication Failed</p>
                <p className="text-[9px] text-text-secondary mt-1">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Email Input (Floating Labels + Glow) */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary/40">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                disabled={isLoading || isSuccess}
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

            {/* Password Input (Show/Hide Toggle + Floating Labels) */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary/40">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                disabled={isLoading || isSuccess}
                {...register("password")}
                className={`w-full bg-white/[0.02] border rounded-lg h-11 pl-10 pr-10 text-xs text-white placeholder-transparent focus:outline-none transition-all duration-300 ${
                  errors.password 
                    ? "border-danger focus:border-danger focus:ring-1 focus:ring-danger" 
                    : "border-white/10 focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_15px_rgba(91,140,255,0.15)]"
                }`}
                placeholder="Password"
              />
              <label 
                className={`absolute left-10 text-[10px] text-text-secondary/50 font-semibold pointer-events-none transition-all duration-300 ${
                  passwordValue 
                    ? "top-1 text-[8px] text-primary" 
                    : "top-3.5"
                }`}
              >
                Password
              </label>
              
              {/* Show/Hide Toggler */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-text-secondary/40 hover:text-white transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>

              {errors.password && (
                <p className="text-[9px] text-danger mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password split */}
            <div className="flex items-center justify-between text-[10px]">
              <label className="flex items-center gap-2 text-text-secondary hover:text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  disabled={isLoading || isSuccess}
                  {...register("rememberMe")}
                  className="rounded border-white/15 bg-white/[0.02] text-primary focus:ring-0"
                />
                Remember Me
              </label>
              <a 
                href="/auth/forgot-password" 
                className="text-primary hover:text-primary/85 transition-colors font-semibold"
              >
                Forgot Password?
              </a>
            </div>

            {/* Continue Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading || isSuccess}
              whileTap={{ scale: 0.98 }}
              className="w-full h-11 rounded-lg bg-primary hover:bg-primary/95 text-background-primary text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 shadow-lg shadow-primary/10 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Continue <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </motion.button>

          </form>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 text-[10px] text-text-secondary/30">
            <span className="h-[1px] bg-white/5 flex-grow" />
            <span>or continue with</span>
            <span className="h-[1px] bg-white/5 flex-grow" />
          </div>

          {/* Social OAuth buttons (Coming Soon Tooltips) */}
          <div className="grid grid-cols-2 gap-3.5">
            {/* Google */}
            <div className="relative group">
              <button
                type="button"
                onClick={() => showToast("Google authentication is coming soon.")}
                className="w-full h-10 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] text-xs font-semibold rounded-lg text-text-secondary transition-colors focus:outline-none"
              >
                Google
              </button>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0A0F24] border border-white/10 text-[8px] font-bold text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                Coming Soon
              </span>
            </div>

            {/* GitHub */}
            <div className="relative group">
              <button
                type="button"
                onClick={() => showToast("GitHub authentication is coming soon.")}
                className="w-full h-10 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] text-xs font-semibold rounded-lg text-text-secondary transition-colors focus:outline-none"
              >
                GitHub
              </button>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0A0F24] border border-white/10 text-[8px] font-bold text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                Coming Soon
              </span>
            </div>
          </div>

          <div className="border-t border-white/[0.05] pt-4.5 space-y-3">
            <div className="text-center text-[10px] text-text-secondary/60 font-medium">New to SkillLens?</div>
            <button
              type="button"
              onClick={() => router.push("/auth/register")}
              className="w-full h-11 border border-white/10 hover:bg-white/[0.04] text-xs font-bold rounded-lg text-white transition-all active:scale-[0.98] focus:outline-none focus:ring-1 focus:ring-primary/30"
            >
              Create Account
            </button>
          </div>

        </motion.div>
      </AuthCard>

      {/* Floating alert notifications */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 15, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 15, x: "-50%" }}
            className="fixed bottom-8 left-1/2 z-50 px-4 py-2.5 rounded-lg border border-primary/20 bg-[#0A0F24]/90 backdrop-blur-md shadow-2xl text-[10px] font-semibold text-white tracking-wide"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

    </AuthLayout>
  );
}
