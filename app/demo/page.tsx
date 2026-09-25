"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  FolderGit2, 
  Target, 
  Activity, 
  CheckCircle,
  ArrowRight,
  Briefcase,
  Layers,
  Map,
  LineChart,
  Settings,
  Bell,
  Search,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Terminal,
  UploadCloud,
  ChevronDown,
  Sparkles,
  GitCommit,
  Clock,
  Compass,
  FileCheck,
  ShieldCheck,
  Code2,
  Maximize2,
  Share2,
  RefreshCw,
  Send,
  Play,
  Pause,
  SkipForward
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// 1. DATA MODELS
interface Candidate {
  id: string;
  name: string;
  avatar: string;
  title: string;
  exp: string;
  skills: string[];
  repos: { name: string; commits: number; language: string; description: string }[];
  evidence: { skill: string; file: string; line: number; commit: string; snippet: string }[];
  milestones: { week: string; title: string; desc: string; tasks: string[] }[];
}

interface Company {
  id: string;
  name: string;
  logo: string;
  reqs: string[];
  baseline: number;
}

// 5 CANDIDATES DATA SET
const CANDIDATES: Candidate[] = [
  {
    id: "pranav",
    name: "Pranav",
    avatar: "PR",
    title: "Senior Full Stack Engineer",
    exp: "6 Years Experience",
    skills: ["TypeScript", "React", "Node.js", "PostgreSQL", "Docker", "API Design"],
    repos: [
      { name: "portfolio-web", commits: 120, language: "TypeScript", description: "Personal dev portfolio and serverless gateway API" },
      { name: "career-dashboard", commits: 48, language: "React", description: "Realtime candidate tracking dashboard" },
      { name: "task-manager", commits: 15, language: "PostgreSQL", description: "Backend distributed cron sync daemon" }
    ],
    evidence: [
      { skill: "PostgreSQL", file: "src/db/replication.ts", line: 45, commit: "a854df", snippet: "const client = new Client({ connectionString: process.env.DATABASE_URL });" },
      { skill: "TypeScript", file: "src/types/index.d.ts", line: 12, commit: "f248bb", snippet: "export interface CandidateProfile { id: string; capabilities: string[] }" },
      { skill: "API Design", file: "src/routes/api/v1/auth.ts", line: 89, commit: "c0182a", snippet: "router.post('/login', validateSchema(loginSchema), async (req, res) => {" }
    ],
    milestones: [
      { week: "Week 1", title: "Improve Containerization", desc: "Build multi-stage Dockerfiles and set up local network clusters.", tasks: ["Write dev.Dockerfile", "Establish Compose scale values"] },
      { week: "Week 2", title: "CI/CD Pipeline Setup", desc: "Configure automated workflows verifying staging deployments.", tasks: ["Create release.yml", "Integrate ESLint check tests"] },
      { week: "Week 3", title: "Scale DB Architecture", desc: "Integrate Postgres multi-node sync architectures.", tasks: ["Set up replication nodes", "Verify connection failover parameters"] }
    ]
  },
  {
    id: "praful",
    name: "Praful",
    avatar: "PF",
    title: "Backend Engineer",
    exp: "4 Years Experience",
    skills: ["Python", "PyTorch", "CUDA", "TensorFlow", "gRPC", "Docker"],
    repos: [
      { name: "llm-inference", commits: 145, language: "Python", description: "Optimized model parsing scripts on consumer GPUs" },
      { name: "cuda-kernels", commits: 72, language: "CUDA", description: "Custom matrix-multiplication kernels" }
    ],
    evidence: [
      { skill: "CUDA", file: "kernels/matmul.cu", line: 104, commit: "b854d1", snippet: "__global__ void matmul(float* A, float* B, float* C, int N) {" },
      { skill: "PyTorch", file: "train/finetune.py", line: 67, commit: "e82d8c", snippet: "model = AutoModelForCausalLM.from_pretrained(model_id, device_map='auto')" }
    ],
    milestones: [
      { week: "Week 1", title: "Optimize Model Ingestion", desc: "Configure CUDA-accelerated stream pipelines.", tasks: ["Write kernel matrix streams", "Evaluate memory bandwidth limiters"] },
      { week: "Week 2", title: "Establish gRPC API Gateway", desc: "Build high-throughput proto endpoints.", tasks: ["Write server.proto", "Integrate streaming client callbacks"] }
    ]
  },
  {
    id: "kavi",
    name: "Kavi",
    avatar: "KV",
    title: "AI/ML Engineer",
    exp: "8 Years Experience",
    skills: ["TypeScript", "React", "Next.js", "Webpack", "WASM", "API Design"],
    repos: [
      { name: "ui-core", commits: 240, language: "TypeScript", description: "Enterprise-grade design system and components" },
      { name: "wasm-image-filter", commits: 35, language: "Rust", description: "Image processing pipeline compiled to WebAssembly" }
    ],
    evidence: [
      { skill: "WASM", file: "src/wasm/filter.rs", line: 18, commit: "d85f1c", snippet: "#[wasm_bindgen] pub fn apply_grayscale(pixels: &mut [u8]) {" },
      { skill: "Next.js", file: "app/page.tsx", line: 24, commit: "a0928e", snippet: "export const dynamic = 'force-static'; export default function Page() {" }
    ],
    milestones: [
      { week: "Week 1", title: "WASM Filter Integration", desc: "Embed Rust-compiled file filters in Next.js pages.", tasks: ["Integrate wasm loader Webpack", "Build web worker callbacks"] },
      { week: "Week 2", title: "Design Tokens Scaffolding", desc: "Establish tailwind global CSS mappings.", tasks: ["Write theme.json tokens", "Build CSS class merging utility"] }
    ]
  },
  {
    id: "nikesh",
    name: "Nikesh",
    avatar: "NK",
    title: "DevOps Engineer",
    exp: "5 Years Experience",
    skills: ["Go", "Kubernetes", "gRPC", "Redis", "PostgreSQL", "System Design"],
    repos: [
      { name: "api-gateway", commits: 180, language: "Go", description: "High-throughput reverse proxy routing traffic" },
      { name: "raft-consensus", commits: 55, language: "Go", description: "Toy implementation of Raft consensus protocol" }
    ],
    evidence: [
      { skill: "Go", file: "gateway/proxy.go", line: 72, commit: "c894db", snippet: "func (p *Proxy) ServeHTTP(w http.ResponseWriter, r *http.Request) {" },
      { skill: "Kubernetes", file: "deploy/helm/values.yaml", line: 15, commit: "e348df", snippet: "replicaCount: 5; resources: limits: cpu: 2" }
    ],
    milestones: [
      { week: "Week 1", title: "Configure Kubernetes Deploy", desc: "Build Helm charts managing pod replicas and limits.", tasks: ["Create deployment.yaml", "Integrate Liveness Probe checks"] },
      { week: "Week 2", title: "Setup Redis Caching", desc: "Build redis rate-limiters routing traffic gateways.", tasks: ["Write token_bucket.go", "Establish failover connection pools"] }
    ]
  },
  {
    id: "kawin",
    name: "Kawin",
    avatar: "KW",
    title: "Frontend Engineer",
    exp: "5 Years Experience",
    skills: ["Python", "TensorFlow", "PostgreSQL", "SQL Server", "API Design", "Docker"],
    repos: [
      { name: "sales-forecasting", commits: 95, language: "Python", description: "ML model predicting quarter sales yields" },
      { name: "db-queries-analytics", commits: 42, language: "SQL Server", description: "Advanced analytical reporting procedures" }
    ],
    evidence: [
      { skill: "TensorFlow", file: "models/lstm.py", line: 55, commit: "f842aa", snippet: "model.add(LSTM(units=50, return_sequences=True, input_shape=(x_train.shape[1], 1)))" },
      { skill: "PostgreSQL", file: "queries/report.sql", line: 89, commit: "b01a2f", snippet: "SELECT candidate_id, COUNT(*) FROM evaluations GROUP BY candidate_id HAVING COUNT(*) > 5;" }
    ],
    milestones: [
      { week: "Week 1", title: "Setup ML Pipeline", desc: "Configure TensorFlow prediction pipelines.", tasks: ["Write trainer script", "Evaluate loss parameters"] },
      { week: "Week 2", title: "Build Analytical SQL views", desc: "Build advanced PostgreSQL queries reporting stats.", tasks: ["Write aggregation view", "Optimize query index configurations"] }
    ]
  }
];

// 5 COMPANIES BENCHMARKS
const COMPANIES: Company[] = [
  { id: "stripe", name: "Stripe", logo: "ST", reqs: ["TypeScript", "React", "PostgreSQL", "Node.js", "API Design"], baseline: 75 },
  { id: "google", name: "Google", logo: "GO", reqs: ["Go", "Kubernetes", "System Design", "Python", "CUDA"], baseline: 70 },
  { id: "microsoft", name: "Microsoft", logo: "MS", reqs: ["TypeScript", "React", "PostgreSQL", "SQL Server", "Docker"], baseline: 72 },
  { id: "amazon", name: "Amazon", logo: "AM", reqs: ["Python", "Go", "Docker", "PostgreSQL", "API Design"], baseline: 68 },
  { id: "netflix", name: "Netflix", logo: "NX", reqs: ["gRPC", "Docker", "Go", "CUDA", "System Design"], baseline: 74 }
];

type DemoState = 
  | "BOOT" 
  | "WELCOME" 
  | "RESUME" 
  | "GITHUB" 
  | "ROLE" 
  | "ANALYSIS" 
  | "READY";

type ActiveTab = 
  | "Overview" 
  | "Projects" 
  | "Repositories" 
  | "Skills Matrix" 
  | "Career Readiness" 
  | "Roadmap" 
  | "Analytics" 
  | "Reports" 
  | "Settings";

export default function UnifiedDemoPage() {
  const router = useRouter();

  // Onboarding sequence state machine
  const [demoState, setDemoState] = useState<DemoState>("BOOT");
  
  // Selected state controllers (Default to Pranav & Stripe)
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(CANDIDATES[0]);
  const [selectedCompany, setSelectedCompany] = useState<Company>(COMPANIES[0]);
  const [activeTab, setActiveTab] = useState<ActiveTab>("Overview");

  // Onboarding animation sub-states
  const [progress, setProgress] = useState(0);
  const [logTicker, setLogTicker] = useState("System booting...");
  const [isPaused, setIsPaused] = useState(false);
  const [termLogs, setTermLogs] = useState<string[]>([]);
  const [scannedRepos, setScannedRepos] = useState<string[]>([]);
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);

  // Recalculated match scores
  const [recalculatedScore, setRecalculatedScore] = useState(0);
  const [expandedWeek, setExpandedWeek] = useState<string | null>("Week 1");
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  // Floating notifications toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Mouse coordinate tracker for backdrop parallax depth
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseCoords({
        x: (e.clientX - window.innerWidth / 2) / 60,
        y: (e.clientY - window.innerHeight / 2) / 60,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 1. BOOT SEQUENCE
  useEffect(() => {
    if (demoState === "BOOT") {
      const logs = [
        "Initializing Core Shaders...",
        "Establishing Secure Sandbox Session...",
        "Loading Candidate Models...",
        "System Ready."
      ];
      
      let idx = 0;
      const interval = setInterval(() => {
        if (idx < logs.length) {
          setLogTicker(logs[idx]);
          idx++;
        }
      }, 450);

      const timer = setTimeout(() => {
        clearInterval(interval);
        setDemoState("WELCOME");
        setLogTicker("Session initialized.");
      }, 2200);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [demoState]);

  // 2. RESUME EXTRACTION SIMULATOR
  const startResumeParsing = () => {
    setDemoState("RESUME");
    showToast("Resume document loaded. Commencing parse...");
    
    // Animate skills extracted one-by-one
    const skills = ["TypeScript", "React", "Node.js", "PostgreSQL", "Docker"];
    skills.forEach((skill, idx) => {
      setTimeout(() => {
        setExtractedSkills(prev => [...prev, skill]);
        showToast(`Parsed capability: ${skill}`);
      }, (idx + 1) * 600);
    });

    // Auto advance to GitHub Connector
    setTimeout(() => {
      startGithubScanning();
    }, 4200);
  };

  // 3. GITHUB SCANNING SIMULATOR
  const startGithubScanning = () => {
    setDemoState("GITHUB");
    showToast("GitHub Connected. Retrieving commits repository data...");
    
    const logs = [
      "[git-scan] Connecting OAuth secure token... Verified",
      "[git-scan] Fetching repository history list...",
      "[git-scan] Parsing: portfolio-web (120 commits)",
      "[git-scan] Parsing: task-manager (15 commits)",
      "[git-scan] Done indexing."
    ];

    logs.forEach((log, idx) => {
      setTimeout(() => {
        setTermLogs(prev => [...prev, log]);
      }, (idx + 1) * 450);
    });

    const repos = ["portfolio-web", "career-dashboard", "task-manager"];
    repos.forEach((repo, idx) => {
      setTimeout(() => {
        setScannedRepos(prev => [...prev, repo]);
        showToast(`Verified repository: ${repo}`);
      }, (idx + 1) * 800);
    });

    // Auto advance to Target Role Select
    setTimeout(() => {
      setDemoState("ROLE");
      showToast("Repository audit completed. Define target path.");
    }, 4500);
  };

  // 4. ROLE SELECT TRIGGER
  const selectRoleAndAnalyze = (roleName: string) => {
    showToast(`Target role locked: ${roleName}. Running gap analysis...`);
    setDemoState("ANALYSIS");
    setProgress(0);
  };

  // 5. CINEMATIC ANALYSIS LOOPS
  useEffect(() => {
    if (demoState === "ANALYSIS") {
      if (isPaused) return;

      const msgs = [
        "Analyzing capabilities database...",
        "Evaluating metrics against company requirement benchmarks...",
        "Validating codebase evidence files...",
        "Compiling study milestone roadmaps...",
        "Structuring analytics metrics graphs..."
      ];

      const interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + 5;
          const msgIdx = Math.min(Math.floor((next / 100) * msgs.length), msgs.length - 1);
          setLogTicker(msgs[msgIdx]);

          if (next >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setDemoState("READY");
              setLogTicker("Evaluation compiled successfully.");
              showToast("Dashboard unlocked! Switch profiles or tabs freely.");
            }, 600);
            return 100;
          }
          return next;
        });
      }, 120);

      return () => clearInterval(interval);
    }
  }, [demoState, isPaused]);

  // 6. DYNAMIC MATCH SCORE CALCULATOR
  useEffect(() => {
    if (demoState === "READY") {
      const intersection = selectedCandidate.skills.filter(s => selectedCompany.reqs.includes(s));
      const matchRatio = selectedCompany.reqs.length > 0 
        ? intersection.length / selectedCompany.reqs.length 
        : 0;

      const calculated = Math.min(
        Math.floor(selectedCompany.baseline + matchRatio * 22),
        98
      );

      let curr = 0;
      const scoreTimer = setInterval(() => {
        if (curr < calculated) {
          curr += 2;
          setRecalculatedScore(Math.min(curr, calculated));
        } else {
          clearInterval(scoreTimer);
        }
      }, 25);

      return () => clearInterval(scoreTimer);
    }
  }, [selectedCandidate, selectedCompany, demoState]);

  // Dynamic Status Text
  const getStatusText = () => {
    if (demoState === "BOOT") return "Initializing system core...";
    if (demoState === "WELCOME") return "Ready to initialize guided demo...";
    if (demoState === "RESUME") return `Ingesting ${selectedCandidate.name}_Resume.pdf...`;
    if (demoState === "GITHUB") return "Scanning repository metadata...";
    if (demoState === "ROLE") return "Awaiting target career select...";
    if (demoState === "ANALYSIS") return `Running sandbox analysis: ${progress}% complete...`;
    return "Evaluation compiled successfully.";
  };

  return (
    <PageWrapper className="min-h-screen py-6 flex items-center justify-center relative overflow-hidden bg-[#050816]">
      
      {/* Background blueprint grid with mouse parallax */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ x: mouseCoords.x, y: mouseCoords.y }}
      >
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="demo-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#demo-grid)" />
        </svg>
      </motion.div>

      {/* Toast ripples */}
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

      <div className="max-w-[1800px] w-[95vw] h-[88vh] mx-auto flex items-center justify-center relative">
        {/* Persistent Application Chassis */}
        <div className="w-full h-full rounded-2xl border border-white/[0.08] bg-[#0A0F24]/85 shadow-[0_30px_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col relative text-white">
          
          {/* Top Window Bar Toolbar */}
          <div className="flex h-16 border-b border-white/[0.06] bg-white/[0.01] px-6 items-center justify-between shrink-0 select-none">
            <div className="flex items-center gap-6">
              <div className="flex gap-2">
                <span className="h-4 w-4 rounded-full bg-[#EF4444]/60" />
                <span className="h-4 w-4 rounded-full bg-[#F59E0B]/60" />
                <span className="h-4 w-4 rounded-full bg-[#22C55E]/60" />
              </div>
              <div className="h-5 w-[1px] bg-white/10 hidden sm:block" />
              <span className="text-xs text-text-secondary/70 font-mono tracking-wide hidden sm:block">
                SkillLens / Onboarding / {demoState}
              </span>
            </div>

            {/* Play/Reset indicators */}
            <div className="flex items-center gap-3.5">
              {demoState === "ANALYSIS" && (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsPaused(!isPaused)} 
                    className="p-1 rounded hover:bg-white/5 text-text-secondary/60 hover:text-white"
                  >
                    {isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                  </button>
                  <button 
                    onClick={() => setDemoState("READY")}
                    className="p-1 rounded hover:bg-white/5 text-text-secondary/60 hover:text-white"
                    title="Skip simulation"
                  >
                    <SkipForward className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
              {demoState === "READY" && (
                <button 
                  onClick={() => {
                    setProgress(0);
                    setDemoState("BOOT");
                    setTermLogs([]);
                    setScannedRepos([]);
                    setExtractedSkills([]);
                  }}
                  className="p-1.5 rounded hover:bg-white/[0.03] text-text-secondary/50 hover:text-white transition-colors"
                  title="Restart onboarding scan"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* SIDEBAR + MAIN PANEL SPLIT (Blurred during onboarding sequence) */}
          <div className="flex flex-1 overflow-hidden relative">
            
            {/* Sidebar Navigation (Blurred when not Ready) */}
            <aside className={cn(
              "w-72 border-r border-white/[0.05] bg-white/[0.003] p-6 flex flex-col justify-between shrink-0 select-none overflow-y-auto transition-all duration-700",
              demoState !== "READY" && "blur-[6px] brightness-[0.4] pointer-events-none"
            )}>
              <div className="space-y-6">
                
                {/* Switcher A: Candidate Dropdown */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-text-secondary/40 uppercase tracking-widest block px-1.5">Candidate Profile</span>
                  <div className="relative group">
                    <select
                      value={selectedCandidate.id}
                      onChange={(e) => {
                        const found = CANDIDATES.find(c => c.id === e.target.value);
                        if (found) setSelectedCandidate(found);
                      }}
                      className="w-full bg-[#050816] border border-white/10 rounded-lg h-11 px-4.5 text-sm text-white appearance-none focus:outline-none focus:border-primary transition-all cursor-pointer font-medium"
                    >
                      {CANDIDATES.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="h-5 w-5 text-text-secondary/50 absolute right-4 top-3 pointer-events-none group-hover:text-white transition-colors" />
                  </div>
                </div>

                {/* Switcher B: Company Benchmark Dropdown */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-text-secondary/40 uppercase tracking-widest block px-1.5">Company Benchmark</span>
                  <div className="relative group">
                    <select
                      value={selectedCompany.id}
                      onChange={(e) => {
                        const found = COMPANIES.find(c => c.id === e.target.value);
                        if (found) setSelectedCompany(found);
                      }}
                      className="w-full bg-[#050816] border border-white/10 rounded-lg h-11 px-4.5 text-sm text-white appearance-none focus:outline-none focus:border-primary transition-all cursor-pointer font-medium"
                    >
                      {COMPANIES.map(c => (
                        <option key={c.id} value={c.id}>{c.name} Stack</option>
                      ))}
                    </select>
                    <ChevronDown className="h-5 w-5 text-text-secondary/50 absolute right-4 top-3 pointer-events-none group-hover:text-white transition-colors" />
                  </div>
                </div>

                {/* Sidebar Navigation items */}
                <div className="space-y-2 pt-4">
                  <span className="text-xs font-bold text-text-secondary/30 uppercase tracking-widest block px-1.5 mb-3">Platform Views</span>
                  {(["Overview", "Projects", "Repositories", "Skills Matrix", "Career Readiness", "Roadmap", "Analytics", "Reports", "Settings"] as ActiveTab[]).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all border text-left",
                        activeTab === tab 
                          ? "bg-primary/5 border-primary/25 text-white" 
                          : "border-transparent text-text-secondary hover:text-white hover:bg-white/[0.01]"
                      )}
                    >
                      {tab === "Overview" && <Layers className="h-4 w-4" />}
                      {tab === "Projects" && <Briefcase className="h-4 w-4" />}
                      {tab === "Repositories" && <FolderGit2 className="h-4 w-4" />}
                      {tab === "Skills Matrix" && <Activity className="h-4 w-4" />}
                      {tab === "Career Readiness" && <Target className="h-4 w-4" />}
                      {tab === "Roadmap" && <Map className="h-4 w-4" />}
                      {tab === "Analytics" && <LineChart className="h-4 w-4" />}
                      {tab === "Reports" && <FileText className="h-4 w-4" />}
                      {tab === "Settings" && <Settings className="h-4 w-4" />}
                      <span>{tab}</span>
                    </button>
                  ))}
                </div>

              </div>

              {/* Sidebar Action bottom */}
              <div className="pt-6 border-t border-white/[0.04] text-xs space-y-3">
                <div className="p-4.5 bg-white/[0.01] border border-white/[0.05] rounded-lg">
                  <span className="font-semibold text-white block leading-none">Sandbox Mode</span>
                  <span className="text-text-secondary/50 text-xs mt-1.5 block">Exploration active</span>
                </div>
              </div>
            </aside>

            {/* Main Workspace Frame (Blurred when not Ready) */}
            <main className={cn(
              "flex-1 p-10 overflow-y-auto relative bg-[#050816]/40 flex flex-col justify-between transition-all duration-700",
              demoState !== "READY" && "blur-[6px] brightness-[0.4] pointer-events-none"
            )}>
              <div className="flex-grow flex flex-col justify-between">
                
                {/* 1. OVERVIEW VIEW */}
                {activeTab === "Overview" && (
                  <div className="space-y-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-white/[0.05] pb-6">
                      <div>
                        <span className="text-xs font-bold text-primary uppercase tracking-widest">Candidate Profile overview</span>
                        <h2 className="text-3xl font-bold text-white mt-2 tracking-tight">{selectedCandidate.name}</h2>
                        <p className="text-sm text-text-secondary mt-1.5">{selectedCandidate.title} &bull; {selectedCandidate.exp}</p>
                      </div>
                      <div className="flex gap-3">
                        <Badge variant="outline" className="py-2 px-4 bg-white/[0.01] text-sm font-semibold">{selectedCandidate.repos.length} Repositories</Badge>
                        <Badge variant="outline" className="py-2 px-4 bg-white/[0.01] text-sm font-semibold">{selectedCandidate.skills.length} Capabilities</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      
                      {/* Match Score */}
                      <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-7 flex flex-col items-center justify-center text-center shadow-lg h-72 relative">
                        <span className="text-xs font-semibold text-text-secondary/70 uppercase tracking-wider block">Benchmark Alignment</span>
                        <span className="text-sm font-bold text-white mt-1.5">{selectedCompany.name} Target fit</span>
                        
                        <div className="relative h-36 w-36 mt-6 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="72" cy="72" r="62" className="stroke-white/[0.03] fill-none" strokeWidth="8" />
                            <circle 
                              cx="72" 
                              cy="72" 
                              r="62" 
                              className="stroke-primary fill-none" 
                              strokeWidth="8" 
                              strokeDasharray="389.55"
                              strokeDashoffset={389.55 - (389.55 * recalculatedScore) / 100}
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="absolute text-3xl font-extrabold text-white tracking-tight">{recalculatedScore}%</span>
                        </div>
                      </div>

                      {/* Requirements checklist */}
                      <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-7 flex flex-col justify-between shadow-lg h-72">
                        <div>
                          <span className="text-xs font-semibold text-text-secondary/70 uppercase tracking-wider block border-b border-white/[0.05] pb-3 mb-4">Benchmark Requirements</span>
                          <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                            {selectedCompany.reqs.map((req, index) => {
                              const isVerified = selectedCandidate.skills.includes(req);
                              return (
                                <div key={index} className="flex items-center justify-between text-sm">
                                  <span className="text-text-secondary font-medium">{req}</span>
                                  {isVerified ? (
                                    <span className="text-xs font-bold uppercase text-success bg-success/10 border border-success/20 px-3 py-1 rounded">Verified</span>
                                  ) : (
                                    <span className="text-xs font-bold uppercase text-danger bg-danger/10 border border-danger/20 px-3 py-1 rounded">Missing</span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Contribution heatmap */}
                      <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-7 flex flex-col justify-between shadow-lg h-72">
                        <div>
                          <span className="text-xs font-semibold text-text-secondary/70 uppercase tracking-wider block mb-4.5">GitHub Verification Matrix</span>
                          <div className="grid grid-cols-7 gap-2 w-full">
                            {Array.from({ length: 28 }).map((_, idx) => {
                              const level = idx % 4;
                              return (
                                <div 
                                  key={idx}
                                  className={cn(
                                    "h-5.5 rounded-[3px] transition-colors duration-300",
                                    level === 0 && "bg-white/[0.03]",
                                    level === 1 && "bg-primary/20",
                                    level === 2 && "bg-primary/45",
                                    level === 3 && "bg-primary"
                                  )}
                                />
                              );
                            })}
                          </div>
                        </div>
                        <p className="text-[11px] text-text-secondary/50 font-mono">Simulating 4 weeks codebase index activity logs.</p>
                      </div>

                    </div>
                  </div>
                )}

                {/* Other Tabs content rendering matches the prior step exactly (Projects, Repositories, Skills Matrix, Career Readiness, Roadmap, Analytics, Reports, Settings) */}
                {activeTab === "Projects" && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-bold text-primary uppercase tracking-widest">Recommended Project Blueprints</span>
                      <h2 className="text-xl font-bold text-white mt-2 tracking-tight">Bridge-Gap Repositories</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="p-6 rounded-xl border border-white/[0.05] bg-white/[0.01] flex flex-col justify-between h-48">
                        <div>
                          <Badge variant="outline" className="text-xs text-primary bg-primary/5 uppercase font-mono mb-3">High Priority</Badge>
                          <h4 className="text-sm font-bold text-white">stripe-signature-verify</h4>
                          <p className="text-xs text-text-secondary mt-2">Verify Stripe transaction signatures and automate webhooks.</p>
                        </div>
                        <button className="flex items-center gap-2 text-xs text-white hover:text-primary transition-colors font-bold mt-6 focus:outline-none">
                          Inspect Template <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="p-6 rounded-xl border border-white/[0.05] bg-white/[0.01] flex flex-col justify-between h-48">
                        <div>
                          <Badge variant="outline" className="text-xs text-secondary bg-secondary/5 uppercase font-mono mb-3">System Gap</Badge>
                          <h4 className="text-sm font-bold text-white">auth-security-tokens</h4>
                          <p className="text-xs text-text-secondary mt-2">Implement OAuth token exchange patterns with verification checks.</p>
                        </div>
                        <button className="flex items-center gap-2 text-xs text-white hover:text-primary transition-colors font-bold mt-6 focus:outline-none">
                          Inspect Template <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "Repositories" && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-bold text-primary uppercase tracking-widest">Project Evidence Checkpoints</span>
                      <h2 className="text-xl font-bold text-white mt-2 tracking-tight">Verified Codebase Evidence</h2>
                    </div>
                    <div className="space-y-5 pr-1 max-h-[480px] overflow-y-auto">
                      {selectedCandidate.evidence.map((ev, index) => (
                        <div key={index} className="p-6 rounded-xl border border-white/[0.05] bg-white/[0.01] space-y-4">
                          <div className="flex items-center justify-between border-b border-white/[0.04] pb-3 text-xs text-text-secondary">
                            <span className="font-mono text-white">{ev.file}#L{ev.line}</span>
                            <span className="font-mono text-secondary">{ev.commit}</span>
                          </div>
                          <pre className="p-4.5 bg-[#050816] rounded border border-white/[0.04] text-xs font-mono text-success overflow-x-auto">
                            <code>{ev.snippet}</code>
                          </pre>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "Skills Matrix" && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-bold text-primary uppercase tracking-widest">Capabilities Grid</span>
                      <h2 className="text-xl font-bold text-white mt-2 tracking-tight">Skill Matrix Map</h2>
                    </div>
                    <div className="h-80 w-full rounded-xl border border-white/[0.05] bg-[#050816]/75 relative overflow-hidden flex items-center justify-center p-10">
                      <div className="h-14 w-40 rounded-xl bg-primary/10 border border-primary/20 flex flex-col items-center justify-center text-center shadow-lg relative z-10">
                        <span className="text-xs font-bold text-white">{selectedCandidate.name}</span>
                        <span className="text-[10px] text-text-secondary">Parsed capabilities</span>
                      </div>
                      {selectedCandidate.skills.map((skill, index) => {
                        const angle = (index * (360 / selectedCandidate.skills.length) * Math.PI) / 180;
                        const radius = 120;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;
                        return (
                          <div key={index} style={{ transform: `translate(${x}px, ${y}px)` }} className="absolute px-3.5 py-2 rounded-lg bg-white/[0.02] border border-white/10 text-xs font-semibold text-white shadow-md">
                            {skill}
                          </div>
                        );
                      })}
                      <svg className="absolute inset-0 h-full w-full pointer-events-none opacity-20">
                        {selectedCandidate.skills.map((_, index) => {
                          const angle = (index * (360 / selectedCandidate.skills.length) * Math.PI) / 180;
                          const radius = 115;
                          const x = Math.cos(angle) * radius;
                          const y = Math.sin(angle) * radius;
                          return (
                            <line key={index} x1="50%" y1="50%" x2={`calc(50% + ${x}px)`} y2={`calc(50% + ${y}px)`} stroke="var(--primary)" strokeWidth="0.8" />
                          );
                        })}
                      </svg>
                    </div>
                  </div>
                )}

                {activeTab === "Career Readiness" && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-bold text-primary uppercase tracking-widest">Alignment statistics</span>
                      <h2 className="text-xl font-bold text-white mt-2 tracking-tight">Career Readiness Checkpoints</h2>
                    </div>
                    <div className="space-y-6.5 rounded-xl border border-white/[0.05] bg-white/[0.01] p-6.5">
                      <div>
                        <div className="flex items-center justify-between text-sm text-text-secondary font-medium mb-2.5">
                          <span>System Architecture Design</span>
                          <span className="font-semibold text-white">92% Ready</span>
                        </div>
                        <div className="h-2.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: "92%" }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm text-text-secondary font-medium mb-2.5">
                          <span>Algorithm Patterns & Complexity</span>
                          <span className="font-semibold text-white">78% Ready</span>
                        </div>
                        <div className="h-2.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: "78%" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "Roadmap" && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-bold text-primary uppercase tracking-widest">Progression Milestones</span>
                      <h2 className="text-xl font-bold text-white mt-2 tracking-tight">Milestone Roadmap</h2>
                    </div>
                    <div className="space-y-4.5">
                      {selectedCandidate.milestones.map((m, index) => {
                        const isExpanded = expandedWeek === m.week;
                        return (
                          <div key={index} className="rounded-xl border border-white/[0.05] bg-white/[0.01] overflow-hidden">
                            <button onClick={() => setExpandedWeek(isExpanded ? null : m.week)} className="w-full p-5.5 text-left flex items-center justify-between focus:outline-none">
                              <div className="flex items-center gap-4">
                                <span className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">0{index + 1}</span>
                                <div>
                                  <h4 className="text-sm font-bold text-white">{m.week}: {m.title}</h4>
                                  <span className="text-xs text-text-secondary">{m.desc}</span>
                                </div>
                              </div>
                            </button>
                            {isExpanded && (
                              <div className="border-t border-white/[0.04] bg-white/[0.003] px-16 py-6">
                                <span className="text-xs font-bold text-secondary uppercase tracking-wider block mb-3">Target Tasks</span>
                                <ul className="space-y-3">
                                  {m.tasks.map((task, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-xs text-text-secondary">
                                      <CheckCircle2 className="h-4.5 w-4.5 text-primary shrink-0" />
                                      {task}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeTab === "Analytics" && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-bold text-primary uppercase tracking-widest">Metrics Graphs</span>
                      <h2 className="text-xl font-bold text-white mt-2 tracking-tight">Analytics Dashboard</h2>
                    </div>
                    <div className="rounded-xl border border-white/[0.05] bg-white/[0.01] p-8.5">
                      <div className="h-64 w-full">
                        <svg className="w-full h-full" viewBox="0 0 400 100">
                          <path d="M0,80 Q80,72 160,50 T320,18 T400,5" fill="none" stroke="var(--primary)" strokeWidth="2.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "Reports" && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-bold text-primary uppercase tracking-widest">Export Options</span>
                      <h2 className="text-xl font-bold text-white mt-2 tracking-tight">Downloadable Reports</h2>
                    </div>
                    <div className="rounded-xl border border-white/[0.05] bg-[#050816]/60 p-10 flex flex-col items-center justify-center text-center gap-6">
                      <FileCheck className="h-14 w-14 text-primary" />
                      <button className="h-12 px-8 rounded-lg bg-primary text-background-primary text-sm font-bold transition-all">Download PDF</button>
                    </div>
                  </div>
                )}

                {activeTab === "Settings" && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-bold text-primary uppercase tracking-widest">Configurations</span>
                      <h2 className="text-xl font-bold text-white mt-2 tracking-tight">Workspace Settings</h2>
                    </div>
                    <div className="rounded-xl border border-white/[0.05] bg-white/[0.01] p-7 space-y-5.5">
                      <div className="flex items-center justify-between text-sm pb-4.5 border-b border-white/[0.04]">
                        <div>
                          <p className="font-bold text-white">Enable Auto-Sync</p>
                          <p className="text-xs text-text-secondary mt-1">Scan repository commits automatically every hour.</p>
                        </div>
                        <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded">Enabled</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Final CTA button footer */}
                <div className="mt-12 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h4 className="text-sm font-bold text-white">Your Career Blueprint is Ready.</h4>
                    <p className="text-xs text-text-secondary">Everything shown was compiled from resumes, repositories, and target benchmarks.</p>
                  </div>
                  <button
                    onClick={() => window.location.href = "/auth/login"}
                    className="flex items-center gap-2 h-12 px-7 rounded-lg bg-primary text-background-primary text-sm font-bold hover:bg-primary/95 transition-all focus:outline-none"
                  >
                    Start My Analysis <ArrowRight className="h-4.5 w-4.5" />
                  </button>
                </div>

              </div>
            </main>

          </div>

          {/* 3. GUIDED ONBOARDING STEP OVERLAYS (Shown centered relative to step) */}
          {demoState !== "READY" && (
            <div className="absolute inset-x-0 bottom-8 top-12 z-30 flex items-center justify-center p-6 bg-transparent pointer-events-auto">
              <div className="w-full max-w-xl rounded-2xl border border-white/[0.08] bg-[#0A0F24]/95 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden p-8 md:p-10 min-h-[420px] flex flex-col justify-between">
                
                <AnimatePresence mode="wait">
                  
                  {/* WELCOME STATE */}
                  {demoState === "WELCOME" && (
                    <motion.div
                      key="welcome-overlay"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center justify-center text-center my-auto space-y-7"
                    >
                      <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(91,140,255,0.2)]">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">See SkillLens in Action</h3>
                        <p className="text-sm text-text-secondary mt-3.5 leading-relaxed">
                          Experience how SkillLens transforms resumes and projects into a validated skill matrix and career roadmap in real-time.
                        </p>
                      </div>
                      <button
                        onClick={startResumeParsing}
                        className="w-full h-13 rounded-lg bg-primary hover:bg-primary/95 text-background-primary text-sm font-bold transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-1.5"
                      >
                        Start Guided Demo <ArrowRight className="h-5 w-5" />
                      </button>
                    </motion.div>
                  )}

                  {/* RESUME PARSE STATE */}
                  {demoState === "RESUME" && (
                    <motion.div
                      key="resume-overlay"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col justify-between flex-grow"
                    >
                      <div>
                        <span className="text-xs font-bold text-primary uppercase tracking-widest">Step 01 / Profile Parse</span>
                        <h3 className="text-base font-bold text-white mt-1.5">Uploading career profile</h3>
                        <p className="text-xs text-text-secondary mt-1">We parse your profile text to extract core capability vectors.</p>
                      </div>

                      <div className="flex-1 flex flex-col justify-center gap-4 my-6">
                        <div className="p-8 rounded-lg border border-white/[0.05] bg-white/[0.01] flex items-center justify-center gap-3 border-dashed">
                          <UploadCloud className="h-8 w-8 text-primary animate-pulse" />
                          <div className="text-left">
                            <p className="text-sm font-bold text-white leading-none">{selectedCandidate.name}_Resume.pdf</p>
                            <p className="text-xs text-text-secondary mt-1">Parsing document elements...</p>
                          </div>
                        </div>

                        {/* Extracted tags list */}
                        <div className="flex flex-wrap gap-1.5 justify-center">
                          <AnimatePresence>
                            {extractedSkills.map((s, index) => (
                              <motion.span
                                key={index}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="px-3 py-1 rounded bg-white/[0.02] border border-white/10 text-xs font-semibold"
                              >
                                {s}
                              </motion.span>
                            ))}
                          </AnimatePresence>
                        </div>
                      </div>

                      <div className="border-t border-white/[0.05] pt-4.5 text-xs text-text-secondary/50 font-mono flex items-center justify-between">
                        <span>Parsing profile text lines...</span>
                        <span className="text-white animate-pulse">Running</span>
                      </div>
                    </motion.div>
                  )}

                  {/* GITHUB SCAN STATE */}
                  {demoState === "GITHUB" && (
                    <motion.div
                      key="github-overlay"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col justify-between flex-grow"
                    >
                      <div>
                        <span className="text-xs font-bold text-primary uppercase tracking-widest">Step 02 / Git Verification</span>
                        <h3 className="text-base font-bold text-white mt-1.5">Scanning repository history</h3>
                        <p className="text-xs text-text-secondary mt-1">We check commit histories to verify practical framework experience.</p>
                      </div>

                      {/* Code terminal mock */}
                      <div className="flex-1 rounded-lg border border-white/[0.05] bg-[#050816] p-4.5 flex flex-col font-mono text-xs text-[#A6E22E] max-h-44 overflow-y-auto my-4 space-y-1 text-left">
                        {termLogs.map((log, index) => (
                          <div key={index}>{log}</div>
                        ))}
                      </div>

                      <div className="border-t border-white/[0.05] pt-4.5 text-xs text-text-secondary/50 font-mono flex items-center justify-between">
                        <span>Indexing repositories...</span>
                        <span className="text-white animate-pulse">Active Scan</span>
                      </div>
                    </motion.div>
                  )}

                  {/* TARGET ROLE SELECT STATE */}
                  {demoState === "ROLE" && (
                    <motion.div
                      key="role-overlay"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col justify-between flex-grow"
                    >
                      <div>
                        <span className="text-xs font-bold text-primary uppercase tracking-widest">Step 03 / Benchmarking</span>
                        <h3 className="text-base font-bold text-white mt-1.5">Select targeted role</h3>
                        <p className="text-xs text-text-secondary mt-1">Select targeted engineering guidelines to compare metrics.</p>
                      </div>

                      <div className="grid grid-cols-1 gap-3.5 my-4">
                        <button
                          onClick={() => selectRoleAndAnalyze("Frontend Architect")}
                          className="p-4.5 text-left rounded-lg border border-white/5 bg-white/[0.01] hover:bg-primary/5 hover:border-primary/30 transition-all flex items-center justify-between group"
                        >
                          <div>
                            <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">Frontend Architect</p>
                            <p className="text-xs text-text-secondary">Target: Staff (L6)</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-text-secondary/40" />
                        </button>

                        <button
                          onClick={() => selectRoleAndAnalyze("Backend Engineer")}
                          className="p-4.5 text-left rounded-lg border border-white/5 bg-white/[0.01] hover:bg-primary/5 hover:border-primary/30 transition-all flex items-center justify-between group"
                        >
                          <div>
                            <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">Backend Engineer</p>
                            <p className="text-xs text-text-secondary">Target: Senior (L5)</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-text-secondary/40" />
                        </button>
                      </div>

                      <div className="border-t border-white/[0.05] pt-4.5 text-xs text-text-secondary/50 font-mono">
                        <span>Awaiting role selection...</span>
                      </div>
                    </motion.div>
                  )}

                  {/* ANALYSIS LOADING STATE */}
                  {demoState === "ANALYSIS" && (
                    <motion.div
                      key="analysis-overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center text-center my-auto space-y-6"
                    >
                      <div className="relative h-18 w-18 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border border-primary/20 bg-primary/5 animate-ping" />
                        <Activity className="h-8 w-8 text-primary animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{logTicker}</h4>
                        <span className="text-xs text-text-secondary font-mono mt-1 block">{progress}% Complete</span>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>

              </div>
            </div>
          )}

          {/* Bottom Status logger bar */}
          <div className="h-8 border-t border-white/[0.06] bg-white/[0.01] px-4 flex items-center justify-between text-[9px] text-text-secondary/60 shrink-0 font-mono select-none">
            <span>Status: {getStatusText()}</span>
            <span>SkillLens Demo Chassis v2.2</span>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
}
