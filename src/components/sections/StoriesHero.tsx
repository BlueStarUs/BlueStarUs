import React from "react";
import { BreadcrumbHero } from "@/components/ui/BreadcrumbHero";

/** Shared inner-page hero (brand-ink, constellation, tagline). Replaces the former AI campus photo background. */
export function StoriesHero() {
  return (
    <BreadcrumbHero
      breadcrumbs={[{ label: "Success Stories" }]}
      badge="REAL STUDENT JOURNEYS"
      title="Student Success Stories & Acceptance Outcomes"
      description="Explore real stories from Blue Stars students: their journeys, strategies, and acceptance results at top universities, with insights you can learn from."
    />
  );
}
