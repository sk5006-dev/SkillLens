import React from "react";
import { Container } from "@/components/layout/container";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { GradientText } from "@/components/ui/gradient-text";

export default function SettingsPage() {
  return (
    <PageWrapper>
      <Container className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-hero font-extrabold tracking-tight">
          <GradientText>/settings</GradientText>
        </h1>
        <p className="text-subheading mt-4.5 max-w-lg">
          SkillLens AI user & system configurations.
        </p>
      </Container>
    </PageWrapper>
  );
}
