import React from "react";
import Link from "next/link";
import { Container } from "./container";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#050816]/80 py-8 md:py-12 mt-auto">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-text-secondary">
              &copy; {new Date().getFullYear()} SkillLens AI. All rights reserved.
            </p>
          </div>

          {/* Links Placeholders */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-text-secondary">
            <Link href="#" className="hover:text-white transition-colors">
              About
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4.5">
            <a
              href="#"
              className="text-text-secondary hover:text-white transition-colors p-2 rounded-lg border border-transparent hover:border-white/10 hover:bg-white/[0.02]"
              aria-label="Twitter"
            >
              <Twitter className="h-4.5 w-4.5" />
            </a>
            <a
              href="#"
              className="text-text-secondary hover:text-white transition-colors p-2 rounded-lg border border-transparent hover:border-white/10 hover:bg-white/[0.02]"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4.5 w-4.5" />
            </a>
            <a
              href="#"
              className="text-text-secondary hover:text-white transition-colors p-2 rounded-lg border border-transparent hover:border-white/10 hover:bg-white/[0.02]"
              aria-label="GitHub"
            >
              <Github className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
