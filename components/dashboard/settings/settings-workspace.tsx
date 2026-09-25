"use client";

import React, { useState } from "react";
import { useOnboardingStore } from "@/store/onboarding-store";
import { SettingsHeader } from "./settings-header";
import { ProfileSettings } from "./profile-settings";
import { CareerPreferences } from "./career-preferences";
import { IntelligenceSettings } from "./intelligence-settings";
import { NotificationSettings } from "./notification-settings";
import { ConnectedServices } from "./connected-services";
import { PrivacySettings } from "./privacy-settings";
import { WorkspaceSettings } from "./workspace-settings";
import { DataManagement } from "./data-management";
import { SettingsDangerZone } from "./settings-danger-zone";
import { SettingsSaveBar } from "./settings-save-bar";
import { SettingsConfirmDialog } from "./settings-confirm-dialog";
import { ConnectServiceDialog } from "./connect-service-dialog";
import { ResetSettingsDialog } from "./reset-settings-dialog";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function SettingsWorkspace() {
  const router = useRouter();
  const {
    fullName,
    resumeName,
    githubReposCount,
    githubConnected,
    targetCompany,
    targetRole,
    verifiedRoadmapTasks,
    settingsProfile,
    settingsCareerPreferences,
    settingsWorkspace,
    settingsAnalysis,
    settingsNotifications,
    settingsConnections,
    settingsPrivacy,
    settingsLastSavedAt,
    settingsDirty,
    updateProfile,
    updateCareerPreferences,
    updateAnalysisPreferences,
    updateNotificationPreferences,
    updatePrivacyPreferences,
    updateWorkspacePreferences,
    connectService,
    disconnectService,
    saveSettings,
    resetSettings,
    resetOnboarding,
  } = useOnboardingStore();

  const [activeSection, setActiveSection] = useState<string>("Profile");
  const [connectServiceKey, setConnectServiceKey] = useState<"github" | "gitlab" | "bitbucket" | null>(null);
  
  // Dialog visibility states
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [confirmPrompt, setConfirmPrompt] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    confirmLabel: string;
    isDanger: boolean;
    action: () => void;
  }>({
    isOpen: false,
    title: "",
    description: "",
    confirmLabel: "",
    isDanger: false,
    action: () => {},
  });

  const sections = [
    "Profile",
    "Career Preferences",
    "Intelligence",
    "Notifications",
    "Integrations",
    "Privacy & Data",
    "Workspace",
    "Danger Zone",
  ];

  const handleSave = () => {
    saveSettings();
  };

  const handleDiscard = () => {
    // Reload state parameters from storage
    window.location.reload();
  };

  const handleRestartSetup = () => {
    setConfirmPrompt({
      isOpen: true,
      title: "Re-run Onboarding Setup",
      description: "Review target settings and profile metadata parameters. Your existing verified metrics will not be destroyed.",
      confirmLabel: "Re-run Onboarding",
      isDanger: false,
      action: () => {
        resetOnboarding();
        router.push("/onboarding");
      },
    });
  };

  const handleResetWorkspace = () => {
    setConfirmPrompt({
      isOpen: true,
      title: "Reset Workspace preferences",
      description: "Are you sure you want to restore workspace preferences, targets, and learning paths to initial presets?",
      confirmLabel: "Reset",
      isDanger: true,
      action: () => {
        localStorage.removeItem("skilllens-onboarding-store-v7");
        window.location.reload();
      },
    });
  };

  const handleDeleteWorkspace = () => {
    setConfirmPrompt({
      isOpen: true,
      title: "Delete Workspace Data",
      description: "This permanently removes your SkillLens workspace data, profiles, and connected repository sync keys. This action is irreversible.",
      confirmLabel: "Delete Workspace Data",
      isDanger: true,
      action: () => {
        localStorage.removeItem("skilllens-onboarding-store-v7");
        window.location.reload();
      },
    });
  };

  const profileComplete = !!(settingsProfile.name && settingsProfile.email && settingsProfile.professionalTitle);
  const automationActive = settingsAnalysis.automaticProjectSync;

  return (
    <div className="space-y-7 text-left pb-20 relative">
      {/* 1. Workspace settings header */}
      <SettingsHeader
        profileComplete={profileComplete}
        targetCompany={targetCompany}
        targetRole={targetRole}
        gitConnected={githubConnected}
        automationActive={automationActive}
        lastSaved={settingsLastSavedAt || "Just now"}
      />

      {/* 2. Three-column layout: Navigation | Main Content Form | Workspace Status Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Left Column Section Links */}
        <div className="lg:col-span-3 space-y-1 bg-[#050816] p-2 rounded-xl border border-white/[0.05] text-xs font-mono font-semibold">
          {/* Mobile navigation dropdown */}
          <div className="block lg:hidden p-1">
            <select
              value={activeSection}
              onChange={(e) => setActiveSection(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-white/10 bg-[#0A0F24] text-white focus:outline-none focus:border-primary/50 cursor-pointer"
            >
              {sections.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden lg:block space-y-1">
            {sections.map((sec) => {
              const isActive = activeSection === sec;
              return (
                <button
                  key={sec}
                  onClick={() => setActiveSection(sec)}
                  className={cn(
                    "w-full px-3 py-2.5 rounded-lg text-left transition-all flex items-center justify-between group cursor-pointer relative",
                    isActive
                      ? "text-white bg-white/[0.04]"
                      : "text-text-secondary/60 hover:text-white hover:bg-white/[0.02]"
                  )}
                >
                  <span>{sec}</span>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-primary rounded-r" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Main Content Forms */}
        <div className="lg:col-span-6 p-6 rounded-xl border border-white/[0.08] bg-white/[0.01]">
          {activeSection === "Profile" && (
            <ProfileSettings
              name={settingsProfile.name}
              email={settingsProfile.email}
              professionalTitle={settingsProfile.professionalTitle}
              experienceLevel={settingsProfile.experienceLevel}
              country={settingsProfile.country || "United States"}
              timezone={settingsProfile.timezone || "EST"}
              onUpdate={updateProfile}
            />
          )}

          {activeSection === "Career Preferences" && (
            <CareerPreferences
              preferredIndustry={settingsCareerPreferences.industry}
              preferredWorkMode={settingsCareerPreferences.workPreference}
              preferredLocations={settingsCareerPreferences.preferredLocations || []}
              availabilityHoursPerWeek={settingsCareerPreferences.weeklyLearningHours}
              preferredCompanySize={settingsCareerPreferences.preferredCompanySize || "Medium"}
              onUpdate={(data) => {
                updateCareerPreferences({
                  industry: data.preferredIndustry,
                  workPreference: data.preferredWorkMode,
                  preferredLocations: data.preferredLocations,
                  weeklyLearningHours: data.availabilityHoursPerWeek,
                  preferredCompanySize: data.preferredCompanySize,
                });
              }}
            />
          )}

          {activeSection === "Intelligence" && (
            <IntelligenceSettings
              automaticResumeAnalysis={settingsAnalysis.automaticResumeAnalysis}
              automaticProjectSync={settingsAnalysis.automaticProjectSync}
              automaticTargetRecalculation={settingsAnalysis.automaticTargetRecalculation}
              roadmapAutoUpdate={settingsAnalysis.roadmapAutoUpdate}
              onUpdate={updateAnalysisPreferences}
            />
          )}

          {activeSection === "Notifications" && (
            <NotificationSettings
              preferences={settingsNotifications}
              onUpdate={updateNotificationPreferences}
            />
          )}

          {activeSection === "Integrations" && (
            <ConnectedServices
              githubConnected={githubConnected}
              connectedGitSource={settingsConnections.github.connected ? "github" : null}
              onConnect={(svc) => setConnectServiceKey(svc)}
              onDisconnect={(svc) => {
                setConfirmPrompt({
                  isOpen: true,
                  title: "Disconnect Service",
                  description: `Disconnect ${svc} repository connection? Workspace evidence checks will be disabled.`,
                  confirmLabel: "Disconnect",
                  isDanger: true,
                  action: () => disconnectService(svc),
                });
              }}
            />
          )}

          {activeSection === "Privacy & Data" && (
            <PrivacySettings
              preferences={settingsPrivacy}
              onUpdate={updatePrivacyPreferences}
            />
          )}

          {activeSection === "Workspace" && (
            <WorkspaceSettings
              workspaceName={settingsWorkspace.workspaceName || "Pranav's Workspace"}
              onboardingCompleted={true}
              lastSync={settingsConnections.github.lastSynced}
              targetCompany={targetCompany}
              targetRole={targetRole}
              connectedProvider={githubConnected ? "GitHub" : "None"}
              onUpdate={(data) => updateWorkspacePreferences({ workspaceName: data.workspaceName })}
              onRestartOnboarding={handleRestartSetup}
            />
          )}

          {activeSection === "Danger Zone" && (
            <SettingsDangerZone
              onResetWorkspace={handleResetWorkspace}
              onDeleteWorkspace={handleDeleteWorkspace}
            />
          )}

          {/* Section Reset to Defaults Action */}
          {activeSection !== "Danger Zone" && (
            <div className="mt-8 pt-4 border-t border-white/[0.04] text-left">
              <button
                type="button"
                onClick={() => setShowResetDialog(true)}
                className="text-[10.5px] font-mono text-text-secondary/40 hover:text-white transition-colors cursor-pointer"
              >
                Reset section preferences to defaults
              </button>
            </div>
          )}
        </div>

        {/* Right Column Workspace Status Summary Side Panel */}
        <div className="lg:col-span-3 p-4 rounded-xl border border-white/[0.06] bg-[#050816] space-y-4 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary/40 font-mono block">
            Workspace Status Summary
          </span>

          <div className="space-y-3 font-mono text-[10.5px]">
            <div className="flex justify-between border-b border-white/[0.03] pb-1.5">
              <span className="text-text-secondary/60">Profile completion</span>
              <span className="text-white font-bold">{profileComplete ? "92% complete" : "60% incomplete"}</span>
            </div>
            
            <div className="flex justify-between border-b border-white/[0.03] pb-1.5">
              <span className="text-text-secondary/60">Resume analysis</span>
              <span className="text-emerald-400 font-bold">Analyzed</span>
            </div>

            <div className="flex justify-between border-b border-white/[0.03] pb-1.5">
              <span className="text-text-secondary/60">Git sync</span>
              <span className="text-primary font-bold">
                {githubConnected ? `${githubReposCount} repositories analyzed` : "0 repos connected"}
              </span>
            </div>

            <div className="flex justify-between border-b border-white/[0.03] pb-1.5">
              <span className="text-text-secondary/60">Target benchmarks</span>
              <span className="text-white font-bold">{targetRole} @ {targetCompany}</span>
            </div>

            <div className="flex justify-between border-b border-white/[0.03] pb-1.5">
              <span className="text-text-secondary/60">Roadmap execution</span>
              <span className="text-white font-bold">
                Week {verifiedRoadmapTasks.length > 0 ? "2" : "1"} of 6
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-text-secondary/60">Growth progress</span>
              <span className="text-emerald-400 font-bold">+8% readiness</span>
            </div>
          </div>
        </div>
      </div>

      {/* Unsaved Changes Sticky Save Bar */}
      <SettingsSaveBar
        isDirty={settingsDirty}
        onSave={handleSave}
        onDiscard={handleDiscard}
      />

      {/* Services dialog wrapper */}
      <ConnectServiceDialog
        isOpen={!!connectServiceKey}
        onClose={() => setConnectServiceKey(null)}
        serviceName={connectServiceKey}
        onConfirmConnect={(svc) => connectService(svc)}
      />

      {/* Confirmation dialog wrapper */}
      <SettingsConfirmDialog
        isOpen={confirmPrompt.isOpen}
        onClose={() => setConfirmPrompt((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={confirmPrompt.action}
        title={confirmPrompt.title}
        description={confirmPrompt.description}
        confirmLabel={confirmPrompt.confirmLabel}
        isDanger={confirmPrompt.isDanger}
      />

      {/* Reset dialog wrapper */}
      <ResetSettingsDialog
        isOpen={showResetDialog}
        onClose={() => setShowResetDialog(false)}
        onConfirmReset={() => {
          const sectionKey =
            activeSection === "Profile"
              ? "profile"
              : activeSection === "Career Preferences"
              ? "careerPreferences"
              : activeSection === "Intelligence"
              ? "analysis"
              : activeSection === "Notifications"
              ? "notifications"
              : activeSection === "Workspace"
              ? "workspace"
              : "";
          resetSettings(sectionKey);
          setShowResetDialog(false);
        }}
      />
    </div>
  );
}
