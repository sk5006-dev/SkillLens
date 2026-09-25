"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, FileText, CheckCircle2, AlertTriangle, Loader2, X, FileCheck } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface UploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: (fileData: { name: string; size: string; type: string }) => void;
}

const PARSING_STAGES = [
  "Uploading Resume",
  "Parsing Document",
  "Extracting Sections",
  "Detecting Skills",
  "Analyzing Experience",
  "Matching Career Target",
  "Building Resume Intelligence",
  "Complete",
];

const VALID_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const VALID_EXTENSIONS = [".pdf", ".doc", ".docx"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function ResumeUploadDialog({ isOpen, onClose, onUploadComplete }: UploadDialogProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    setErrorMessage(null);

    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    const isValidExt = VALID_EXTENSIONS.includes(ext);
    const isValidMime = VALID_TYPES.includes(file.type) || file.type === "";

    if (!isValidExt && !isValidMime) {
      setErrorMessage("Unsupported file type. Please upload a PDF, DOC, or DOCX file.");
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage("File size exceeds 10MB limit. Please upload a smaller document.");
      return false;
    }

    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const startParsingSequence = () => {
    if (!selectedFile) return;
    setIsParsing(true);
    setCurrentStageIdx(0);

    let stage = 0;
    const interval = setInterval(() => {
      stage += 1;
      setCurrentStageIdx(stage);

      if (stage >= PARSING_STAGES.length - 1) {
        clearInterval(interval);
        setTimeout(() => {
          setIsParsing(false);
          onUploadComplete({
            name: selectedFile.name,
            size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
            type: selectedFile.type || "application/pdf",
          });
          onClose();
          setSelectedFile(null);
          setCurrentStageIdx(0);
        }, 600);
      }
    }, 450);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0A0F24] p-6 shadow-2xl space-y-6 text-left"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div>
            <h3 className="text-base font-bold text-white">Upload New Resume</h3>
            <p className="text-xs text-text-secondary/60">
              Upload your updated resume in PDF, DOC, or DOCX format (Max 10MB).
            </p>
          </div>
          {!isParsing && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/5 text-text-secondary/50 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Error Message if invalid */}
        {errorMessage && (
          <div className="p-3 rounded-lg border border-rose-500/25 bg-rose-500/10 text-rose-300 text-xs flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {!isParsing ? (
          <div className="space-y-4">
            {/* Drag & Drop Area */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "p-8 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center cursor-pointer",
                dragActive
                  ? "border-primary bg-primary/10"
                  : "border-white/10 bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.02]"
              )}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-3">
                <UploadCloud className="h-6 w-6" />
              </div>

              {selectedFile ? (
                <div className="space-y-1">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5 justify-center">
                    <FileCheck className="h-4 w-4 text-emerald-400" />
                    {selectedFile.name}
                  </span>
                  <p className="text-[11px] text-text-secondary/50">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB &bull; Ready to parse
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-white">
                    Drag and drop your file here, or <span className="text-primary underline">browse</span>
                  </p>
                  <p className="text-[11px] text-text-secondary/50">Supports PDF, DOC, DOCX up to 10MB</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                className="h-9 px-4 rounded-lg border border-white/10 hover:bg-white/5 text-xs text-text-secondary font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={startParsingSequence}
                disabled={!selectedFile}
                className="h-9 px-5 rounded-lg bg-primary hover:bg-primary/90 text-background-primary text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              >
                Start Analysis
              </button>
            </div>
          </div>
        ) : (
          /* 8-Stage Parsing Animation */
          <div className="space-y-5 py-4 text-left">
            <div className="space-y-1 text-center">
              <Loader2 className="h-7 w-7 text-primary animate-spin mx-auto mb-2" />
              <h4 className="text-sm font-bold text-white">Analyzing Resume Document</h4>
              <p className="text-[11px] text-text-secondary/60">
                Stage {currentStageIdx + 1} of {PARSING_STAGES.length}: {PARSING_STAGES[currentStageIdx]}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-white/[0.06] bg-[#050816] space-y-2.5 max-h-56 overflow-y-auto">
              {PARSING_STAGES.map((stageName, idx) => {
                const isCompleted = idx < currentStageIdx;
                const isActive = idx === currentStageIdx;

                return (
                  <div
                    key={idx}
                    className={cn(
                      "flex items-center justify-between text-xs py-1 transition-colors",
                      isActive && "text-primary font-semibold",
                      isCompleted && "text-text-secondary/80",
                      !isActive && !isCompleted && "text-text-secondary/30"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-[10px]">0{idx + 1}</span>
                      <span>{stageName}</span>
                    </span>

                    {isCompleted && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />}
                    {isActive && <Loader2 className="h-3.5 w-3.5 text-primary animate-spin shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
