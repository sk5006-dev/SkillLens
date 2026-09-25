"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Layers } from "lucide-react";
import { Container } from "./container";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Settings", path: "/settings" },
  { name: "Login", path: "/login" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500 ease-in-out border-b",
        isScrolled 
          ? "h-13 bg-[#050816]/75 backdrop-blur-xl border-white/[0.05] shadow-[0_4px_30px_rgba(0,0,0,0.4)]" 
          : "h-16 bg-[#050816]/40 backdrop-blur-md border-white/[0.03]"
      )}
    >
      <Container className="h-full">
        <div className="flex h-full items-center justify-between">
          {/* Logo & Branding */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] transition-colors group-hover:border-primary/50 group-hover:bg-primary/5">
              <Layers className="h-4 w-4 text-white transition-colors group-hover:text-primary" />
              <div className="absolute inset-0 -z-10 rounded-lg bg-primary/20 opacity-0 blur-md transition-opacity group-hover:opacity-100" />
            </div>
            <span className="font-sans font-bold tracking-tight text-white transition-colors group-hover:text-primary">
              SkillLens <span className="text-secondary">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 h-full">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "relative px-3.5 py-1.5 text-xs font-medium transition-colors rounded-lg tracking-wide",
                    isActive ? "text-white" : "text-text-secondary hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-glow"
                      className="absolute inset-0 -z-10 rounded-lg border border-primary/20 bg-primary/5 shadow-[0_0_12px_-3px_rgba(91,140,255,0.2)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white hover:bg-white/5 md:hidden focus:outline-none focus:ring-1 focus:ring-primary/50"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="h-4 w-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </Container>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-white/[0.06] bg-[#050816]/95 backdrop-blur-xl md:hidden overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-4 py-2.5 text-sm font-medium rounded-lg border transition-colors",
                      isActive
                        ? "border-primary/20 bg-primary/5 text-white"
                        : "border-transparent text-text-secondary hover:text-white hover:bg-white/[0.02]"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
