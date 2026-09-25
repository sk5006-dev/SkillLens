"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, HelpCircle } from "lucide-react";
import { Container } from "@/components/layout/container";
import { fadeIn, staggerContainer } from "@/components/animations/presets";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/animations/magnetic-button";

export function WhySkillLens() {
  return (
    <div className="relative">
      
      {/* 1. WHY SKILLLENS SECTION */}
      <section className="py-24 relative overflow-hidden">
        <Container>
          
          {/* Header */}
          <motion.div
            variants={fadeIn("up", 0.6, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-2xl mb-16"
          >
            <span className="text-label-premium text-primary">The Philosophy</span>
            <h2 className="text-heading text-white mt-3 font-extrabold tracking-tight">
              Evidence over assumptions.
            </h2>
            <p className="text-subheading mt-4.5">
              We design software that verifies actual code contributions to prove real qualification levels.
            </p>
          </motion.div>

          {/* Value Propositions Grid (Asymmetrical Offset) */}
          <motion.div
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Value 1 */}
            <motion.div 
              variants={fadeIn("up", 0.6)}
              className="rounded-2xl border border-white/[0.06] bg-[#0A0F24]/40 p-6 md:p-8 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <ShieldCheck className="h-6 w-6 text-primary mb-4" />
                <h3 className="text-lg font-bold text-white tracking-tight">Verified Capability</h3>
                <p className="text-xs text-text-secondary mt-3 leading-relaxed">
                  We check public code bases and parsed commits to verify actual skills, replacing claims with evidence.
                </p>
              </div>
            </motion.div>

            {/* Value 2 */}
            <motion.div 
              variants={fadeIn("up", 0.6)}
              className="rounded-2xl border border-white/[0.06] bg-[#0A0F24]/40 p-6 md:p-8 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <Zap className="h-6 w-6 text-secondary mb-4" />
                <h3 className="text-lg font-bold text-white tracking-tight">Personalized Alignment</h3>
                <p className="text-xs text-text-secondary mt-3 leading-relaxed">
                  Get custom reports mapping your profile to target enterprise benchmarks automatically.
                </p>
              </div>
            </motion.div>

            {/* Value 3 */}
            <motion.div 
              variants={fadeIn("up", 0.6)}
              className="rounded-2xl border border-white/[0.06] bg-[#0A0F24]/40 p-6 md:p-8 flex flex-col justify-between group shadow-xl md:col-span-2"
            >
              <div>
                <CheckCircle2 className="h-6 w-6 text-primary mb-4" />
                <h3 className="text-lg font-bold text-white tracking-tight">Milestone Roadmaps</h3>
                <p className="text-xs text-text-secondary mt-3 leading-relaxed max-w-2xl">
                  Recycle gap analysis metrics into actionable projects. Build Docker networks or replication clusters based on verified requirements to achieve next-tier goals.
                </p>
              </div>
            </motion.div>
          </motion.div>

        </Container>
      </section>

      {/* Subtle Divider transition */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent my-12" />

      {/* 2. FINAL CTA SECTION */}
      <section className="py-32 relative overflow-hidden text-center">
        {/* Soft background light */}
        <div className="absolute inset-0 bg-radial-light pointer-events-none opacity-40" />

        <Container className="relative z-10">
          <motion.div
            variants={fadeIn("up", 0.7, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-2xl mx-auto flex flex-col items-center"
          >
            <h2 className="text-hero font-extrabold tracking-tight text-white">
              Understand where you stand.
            </h2>
            <p className="text-subheading mt-5 max-w-lg mx-auto">
              Map your experience, identify gaps, and start growing today.
            </p>
            
            {/* Magnetic CTA Button */}
            <div className="mt-10">
              <Magnetic>
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="rounded-full shadow-2xl transition-all duration-300 font-bold tracking-wide group"
                  onClick={() => window.location.href = "/demo"}
                >
                  Get Started <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Magnetic>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* 3. PREMIUM FOOTER */}
      <footer className="border-t border-white/[0.06] bg-[#050816] pt-20 pb-12 relative overflow-hidden">
        {/* Faint footer glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[30%] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

        <Container>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/[0.05] pb-16">
            
            {/* Branding Column */}
            <div className="md:col-span-2 space-y-4">
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                SkillLens <span className="text-secondary text-xs px-2 py-0.5 rounded border border-secondary/20 bg-secondary/5 uppercase tracking-wide">Enterprise</span>
              </span>
              <p className="text-xs text-text-secondary leading-relaxed max-w-sm">
                Building evidence-based career progression pathways by verifying repository commits and mapping requirements automatically.
              </p>
            </div>

            {/* Navigation 1 */}
            <div>
              <h5 className="text-[10px] font-bold text-white uppercase tracking-widest mb-4">Platform</h5>
              <ul className="space-y-2 text-xs text-text-secondary">
                <li><a href="#" className="hover:text-white transition-colors">Career Fit</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Roadmaps</a></li>
              </ul>
            </div>

            {/* Navigation 2 */}
            <div>
              <h5 className="text-[10px] font-bold text-white uppercase tracking-widest mb-4">Company</h5>
              <ul className="space-y-2 text-xs text-text-secondary">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
              </ul>
            </div>

          </div>

          {/* Copyright & Watermark */}
          <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-6 relative">
            <span className="text-xs text-text-secondary/50">
              &copy; {new Date().getFullYear()} SkillLens AI. All rights reserved. Handcrafted for performance.
            </span>

            {/* Large Watermark Text */}
            <span className="absolute left-1/2 -translate-x-1/2 -top-1 font-extrabold text-[9vw] select-none pointer-events-none opacity-[0.015] tracking-tight text-white uppercase font-sans">
              SkillLens
            </span>

            {/* Social handles placeholders */}
            <div className="flex gap-4.5 text-xs text-text-secondary/50">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </Container>
      </footer>

      <style jsx global>{`
        .bg-radial-light {
          background: radial-gradient(circle at center, rgba(91, 140, 255, 0.08) 0%, rgba(91, 140, 255, 0) 70%);
        }
      `}</style>
    </div>
  );
}
