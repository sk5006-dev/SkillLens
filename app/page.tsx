"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/animations/magnetic-button";
import { HeroDashboard } from "@/components/landing/hero-dashboard";
import { ChallengeEditorial } from "@/components/landing/challenge-editorial";
import { ProductPreview } from "@/components/landing/product-preview";
import { InteractiveWorkflow } from "@/components/landing/interactive-workflow";
import { WhySkillLens } from "@/components/landing/why-skilllens";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the hero section for downscaling
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Scale dashboard from 1 to 0.92, fade out slowly
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Stagger entry configurations
  const entryTitle: Variants = {
    hidden: { y: 25, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 } }
  };

  const entryDesc: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.3 } }
  };

  const entryActions: Variants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring" as const, damping: 20, stiffness: 120, delay: 0.5 } }
  };

  const entryDashboard: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.7 } }
  };

  return (
    <PageWrapper className="relative">
      
      {/* 1. HERO SECTION */}
      <section 
        ref={heroRef}
        className="min-h-[calc(100vh-4rem)] flex items-center relative overflow-hidden pt-12 pb-20"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left: Text copy and CTA buttons (5 Cols) */}
            <div className="lg:col-span-5 text-left flex flex-col justify-center">
              <motion.h1
                variants={entryTitle}
                initial="hidden"
                animate="visible"
                className="text-hero tracking-tight font-extrabold text-white"
              >
                Stop Guessing.<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Start Growing.</span>
              </motion.h1>

              <motion.p
                variants={entryDesc}
                initial="hidden"
                animate="visible"
                className="text-subheading mt-5 max-w-md leading-relaxed"
              >
                Evaluate your technical experience against role requirements, verify capabilities automatically, and follow a clear roadmap to bridge target gaps.
              </motion.p>

              {/* Action buttons (click compression) */}
              <motion.div
                variants={entryActions}
                initial="hidden"
                animate="visible"
                className="mt-8 flex flex-wrap gap-4 items-center"
              >
                <Magnetic>
                  <Button 
                    variant="primary" 
                    className="rounded-full shadow-lg hover:shadow-primary/20 group h-11 px-5"
                    onClick={() => window.location.href = "/demo"}
                  >
                    Get Started <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Magnetic>
                <Button 
                  variant="outline" 
                  className="rounded-full gap-1.5 h-11 px-5"
                  onClick={() => {
                    const el = document.getElementById("product-preview-anchor");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Play className="h-3.5 w-3.5 fill-current" /> See How It Works
                </Button>
              </motion.div>
            </div>

            {/* Right: Parallax Tilt App Mockup (7 Cols) */}
            <motion.div
              variants={entryDashboard}
              initial="hidden"
              animate="visible"
              style={{ scale: scale, opacity: opacity }}
              className="lg:col-span-7 w-full h-full flex justify-center items-center"
            >
              <HeroDashboard />
            </motion.div>

          </div>
        </Container>
      </section>

      {/* Cinematic Transition layout line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* 2. THE CHALLENGE SECTION */}
      <ChallengeEditorial />

      {/* Cinematic Transition grid fade */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/5 rounded-full blur-xl pointer-events-none" />
      </div>

      {/* 3. CENTERPIECE PRODUCT PREVIEW SECTION */}
      <div id="product-preview-anchor" className="scroll-mt-20">
        <ProductPreview />
      </div>

      {/* Cinematic Transition grid fade */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* 4. WORKFLOW WALKTHROUGH SECTION */}
      <InteractiveWorkflow />

      {/* Cinematic Transition layout line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* 5. WHY SKILLLENS, FINAL CTA & FOOTER */}
      <WhySkillLens />

    </PageWrapper>
  );
}
