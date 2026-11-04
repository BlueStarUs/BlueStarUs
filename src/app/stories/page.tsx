import React from "react";
import { Metadata } from "next";
import { BreadcrumbHero } from "@/components/ui/BreadcrumbHero";
import { StoriesListing } from "@/components/sections/StoriesListing";
import { CTA } from "@/components/sections/CTA";
import { SUCCESS_STORIES } from "@/lib/stories-data";

export const metadata: Metadata = {
  title: "Student Success Stories | BlueStars Admissions Consulting",
  description:
    "Explore genuine college acceptance stories, student profiles, full-tuition scholarship wins, and testimonials from BlueStars families across the United States.",
};

export default function StoriesPage() {
  return (
    <div className="w-full bg-white">
      {/* Short, Compact Breadcrumb Hero */}
      <BreadcrumbHero
        breadcrumbs={[{ label: "Success Stories" }]}
        badge="REAL STUDENTS. REAL RESULTS."
        title="Student Success Stories & Acceptance Outcomes"
        description="Discover how ambitious high school students transformed admissions anxiety into authentic academic spikes, captivating personal statements, and acceptance letters at top-tier universities."
      />

      {/* Main Interactive Stories Listing */}
      <StoriesListing initialStories={SUCCESS_STORIES} />

      {/* Free Consultation CTA */}
      <CTA />
    </div>
  );
}

