"use client";

import React from "react";
import { SettingsConfirmDialog } from "./settings-confirm-dialog";

interface ResetSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReset: () => void;
}

export function ResetSettingsDialog({ isOpen, onClose, onConfirmReset }: ResetSettingsDialogProps) {
  return (
    <SettingsConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirmReset}
      title="Reset Workspace Preferences"
      description="This will restore all workspace and career preference values to their original system defaults. Resumes parsed and verified roadmap milestones will NOT be deleted."
      confirmLabel="Reset Preferences"
      cancelLabel="Cancel"
      isDanger={true}
    />
  );
}
