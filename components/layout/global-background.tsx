"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function GlobalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Mouse coordinates mapped to springs for lag-free performance
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 80, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Subtle movement factor (max 15px shift)
  const bgTranslateX = useTransform(smoothX, [-500, 500], [-15, 15]);
  const bgTranslateY = useTransform(smoothY, [-500, 500], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Relative offset from screen center
      const offsetX = e.clientX - window.innerWidth / 2;
      const offsetY = e.clientY - window.innerHeight / 2;
      mouseX.set(offsetX);
      mouseY.set(offsetY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      alphaSpeed: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(40, Math.floor((canvas.width * canvas.height) / 45000));
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.0 + 0.3,
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.08,
          alpha: Math.random() * 0.4 + 0.1,
          alphaSpeed: (Math.random() - 0.5) * 0.003,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaSpeed;

        if (p.alpha <= 0.05 || p.alpha >= 0.5) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        // Soft blue light particles
        ctx.fillStyle = `rgba(91, 140, 255, ${Math.max(0, Math.min(p.alpha, 1))})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-50 w-full h-full overflow-hidden bg-[#050816] pointer-events-none">
      <motion.div
        style={{ x: bgTranslateX, y: bgTranslateY }}
        className="absolute inset-0 w-[105%] h-[105%] -left-[2.5%] -top-[2.5%] overflow-hidden"
      >
        {/* Animated Blueprint Grid */}
        <div className="absolute inset-0 grid-bg opacity-20 animate-pulse-slow" />

        {/* Ambient Radial Lights behind Hero / Content */}
        <div 
          className="absolute top-[-15%] left-[20%] w-[60%] h-[60%] rounded-full opacity-25 blur-[120px]"
          style={{
            background: "radial-gradient(circle, rgba(91, 140, 255, 0.3) 0%, rgba(91, 140, 255, 0) 70%)"
          }}
        />
        <div 
          className="absolute bottom-[-15%] right-[10%] w-[60%] h-[60%] rounded-full opacity-15 blur-[120px]"
          style={{
            background: "radial-gradient(circle, rgba(103, 232, 249, 0.25) 0%, rgba(91, 140, 255, 0) 70%)"
          }}
        />

        {/* Faint Floating Blobs */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.08]">
          <div 
            className="absolute w-[500px] h-[500px] rounded-full blur-[110px]"
            style={{
              background: "var(--primary)",
              top: "15%",
              left: "10%",
              animation: "float-blob-1 30s infinite ease-in-out"
            }}
          />
          <div 
            className="absolute w-[450px] h-[450px] rounded-full blur-[110px]"
            style={{
              background: "var(--secondary)",
              bottom: "20%",
              right: "15%",
              animation: "float-blob-2 35s infinite ease-in-out"
            }}
          />
        </div>
      </motion.div>

      {/* Canvas for fine particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <style jsx global>{`
        @keyframes float-blob-1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -40px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.97); }
        }
        @keyframes float-blob-2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(-40px, 30px) scale(0.95); }
          66% { transform: translate(30px, -20px) scale(1.02); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.25; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
