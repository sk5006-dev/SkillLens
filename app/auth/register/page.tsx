"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, User, AlertTriangle, ArrowRight, Loader2, Check } from "lucide-react";
import { useRouter } from "next/navigation";

import { registerSchema, RegisterInput } from "../../../validation/auth-schemas";
import { useAuthStore } from "../../../store/auth-store";
import { AuthLayout } from "../../../components/auth/auth-layout";
import { AuthCard } from "../../../components/auth/auth-card";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { register: registerUser, isLoading, isSuccess, error, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  // Watch inputs for floating labels and password requirements checklist
  const nameValue = watch("name");
  const emailValue = watch("email");
  const passwordValue = watch("password") || "";
  const confirmPasswordValue = watch("confirmPassword");

  // Live password requirements
  const checkMinLength = passwordValue.length >= 6;
  const checkUppercase = /[A-Z]/.test(passwordValue);
  const checkNumber = /[0-9]/.test(passwordValue);
  const checkSpecial = /[^A-Za-z0-9]/.test(passwordValue);

  // Clear errors on mount
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Success redirect hook
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        router.push("/onboarding");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, router]);

  const onSubmit = async (data: RegisterInput) => {
    try {
      await registerUser(data);
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
            <h2 className="text-xl font-bold tracking-tight text-white">Create your account</h2>
            <p className="text-[11px] text-text-secondary mt-1">Start verifying technical strengths with SkillLens.</p>
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
                <p className="text-[10px] font-bold leading-none">Registration Failed</p>
                <p className="text-[9px] text-text-secondary mt-1">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Full Name (Floating Labels) */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary/40">
                <User className="h-4 w-4" />
              </div>
              <input
                type="text"
                disabled={isLoading || isSuccess}
                {...register("name")}
                className={`w-full bg-white/[0.02] border rounded-lg h-11 pl-10 pr-4 text-xs text-white placeholder-transparent focus:outline-none transition-all duration-300 ${
                  errors.name 
                    ? "border-danger focus:border-danger focus:ring-1 focus:ring-danger" 
                    : "border-white/10 focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_15px_rgba(91,140,255,0.15)]"
                }`}
                placeholder="Full Name"
              />
              <label 
                className={`absolute left-10 text-[10px] text-text-secondary/50 font-semibold pointer-events-none transition-all duration-300 ${
                  nameValue 
                    ? "top-1 text-[8px] text-primary" 
                    : "top-3.5"
                }`}
              >
                Full Name
              </label>
              {errors.name && (
                <p className="text-[9px] text-danger mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email (Floating Labels) */}
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

            {/* Password (Floating Labels + Live requirements check) */}
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

            {/* Live requirements list */}
            {passwordValue.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="p-3 bg-white/[0.01] border border-white/[0.05] rounded-lg space-y-1.5 text-[9px] text-text-secondary/70"
              >
                <p className="font-semibold text-white/90">Password must satisfy:</p>
                <div className="grid grid-cols-2 gap-1.5">
                  <div className={`flex items-center gap-1.5 ${checkMinLength ? "text-success" : ""}`}>
                    <div className={`h-3 w-3 rounded-full flex items-center justify-center border ${checkMinLength ? "border-success bg-success/10 text-success" : "border-white/15"}`}>
                      {checkMinLength && <Check className="h-2 w-2" />}
                    </div>
                    6+ Characters
                  </div>
                  <div className={`flex items-center gap-1.5 ${checkUppercase ? "text-success" : ""}`}>
                    <div className={`h-3 w-3 rounded-full flex items-center justify-center border ${checkUppercase ? "border-success bg-success/10 text-success" : "border-white/15"}`}>
                      {checkUppercase && <Check className="h-2 w-2" />}
                    </div>
                    1 Uppercase
                  </div>
                  <div className={`flex items-center gap-1.5 ${checkNumber ? "text-success" : ""}`}>
                    <div className={`h-3 w-3 rounded-full flex items-center justify-center border ${checkNumber ? "border-success bg-success/10 text-success" : "border-white/15"}`}>
                      {checkNumber && <Check className="h-2 w-2" />}
                    </div>
                    1 Number
                  </div>
                  <div className={`flex items-center gap-1.5 ${checkSpecial ? "text-success" : ""}`}>
                    <div className={`h-3 w-3 rounded-full flex items-center justify-center border ${checkSpecial ? "border-success bg-success/10 text-success" : "border-white/15"}`}>
                      {checkSpecial && <Check className="h-2 w-2" />}
                    </div>
                    1 Special Char
                  </div>
                </div>
              </motion.div>
            )}

            {/* Confirm Password (Floating Labels) */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary/40">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                disabled={isLoading || isSuccess}
                {...register("confirmPassword")}
                className={`w-full bg-white/[0.02] border rounded-lg h-11 pl-10 pr-4 text-xs text-white placeholder-transparent focus:outline-none transition-all duration-300 ${
                  errors.confirmPassword 
                    ? "border-danger focus:border-danger focus:ring-1 focus:ring-danger" 
                    : "border-white/10 focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_15px_rgba(91,140,255,0.15)]"
                }`}
                placeholder="Confirm Password"
              />
              <label 
                className={`absolute left-10 text-[10px] text-text-secondary/50 font-semibold pointer-events-none transition-all duration-300 ${
                  confirmPasswordValue 
                    ? "top-1 text-[8px] text-primary" 
                    : "top-3.5"
                }`}
              >
                Confirm Password
              </label>
              {errors.confirmPassword && (
                <p className="text-[9px] text-danger mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Register submit button */}
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
                  Create Account <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </motion.button>

          </form>

          {/* Link: Login */}
          <div className="text-center pt-2 text-[10px] text-text-secondary">
            Already have an account?{" "}
            <button 
              type="button"
              onClick={() => router.push("/auth/login")}
              className="text-primary hover:text-primary/85 transition-colors font-bold focus:outline-none"
            >
              Sign in
            </button>
          </div>

        </motion.div>
      </AuthCard>
    </AuthLayout>
  );
}
