"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle2, ArrowLeft, RefreshCw, Send } from "lucide-react";
import { useRouter } from "next/navigation";

import { AuthLayout } from "../../../components/auth/auth-layout";
import { AuthCard } from "../../../components/auth/auth-card";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendStatus, setResendStatus] = useState<string | null>(null);

  // Throttled resend button timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleResend = () => {
    if (resendCooldown > 0) return;
    
    setResendStatus("Sending secure token...");
    setTimeout(() => {
      setResendCooldown(30);
      setResendStatus("Verification email sent!");
      setTimeout(() => setResendStatus(null), 3000);
    }, 1000);
  };

  return (
    <AuthLayout>
      <AuthCard>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 text-center py-4"
        >
          {/* Large Mail visual checkmark */}
          <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto relative">
            <div className="absolute inset-0 rounded-full border border-primary/20 bg-primary/5 animate-ping" />
            <Mail className="h-6 w-6 relative z-10" />
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">Verify your email</h2>
            <p className="text-xs text-text-secondary mt-3 leading-relaxed max-w-sm mx-auto">
              Please check your inbox. We sent a secure link to activate your profile.
            </p>
          </div>

          {/* Verification guidelines */}
          <div className="p-4 rounded-xl border border-white/[0.05] bg-white/[0.01] text-left space-y-3.5 text-[10px] text-text-secondary">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
              <span>Verify that the sender matches <span className="text-white font-semibold">noreply@skilllens.ai</span>.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
              <span>Ensure cookies are active to authenticate the session automatically.</span>
            </div>
          </div>

          {/* Dynamic Resend button */}
          <div className="space-y-3">
            <button
              onClick={handleResend}
              disabled={resendCooldown > 0}
              className={`w-full h-11 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 border disabled:opacity-60 ${
                resendCooldown > 0 
                  ? "border-white/5 bg-white/[0.01] text-text-secondary/50 cursor-not-allowed" 
                  : "border-primary/25 bg-primary/5 text-primary hover:bg-primary/10"
              }`}
            >
              <Send className="h-3.5 w-3.5" />
              {resendCooldown > 0 
                ? `Resend Email (${resendCooldown}s)` 
                : "Resend Verification Email"
              }
            </button>

            {resendStatus && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[9px] font-semibold text-secondary animate-pulse"
              >
                {resendStatus}
              </motion.p>
            )}
          </div>

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

        </motion.div>
      </AuthCard>
    </AuthLayout>
  );
}
