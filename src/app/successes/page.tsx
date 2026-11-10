import React from "react";
import type { Metadata } from "next";
import { SuccessesHero } from "@/components/sections/SuccessesHero";
import { SuccessesListing } from "@/components/sections/SuccessesListing";
import { SuccessesMethodology } from "@/components/sections/SuccessesMethodology";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Admissions Successes & Results | Blue Stars Admissions Consulting",
  description:
    "Explore Blue Stars Admissions Consulting's verified student college acceptances across the Ivy League, Stanford, UC Regents Honors, selective summer research, and major merit scholarships.",
};

export default function SuccessesPage() {
  return (
    <div className="w-full bg-white">
      {/* Collegiate Hero Section */}
      <SuccessesHero />

      {/* Main Interactive Year-by-Year Admissions and Summer Placements */}
      <SuccessesListing />

      {/* Strategic Methodology: Why Blue Stars Students Consistently Stand Out */}
      <SuccessesMethodology />

      {/* Free Consultation CTA */}
      <CTA />
    </div>
  );
}

