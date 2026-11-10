import React from "react";
import type { Metadata } from "next";
import { StoriesHero } from "@/components/sections/StoriesHero";
import { StoriesListing } from "@/components/sections/StoriesListing";
import { CTA } from "@/components/sections/CTA";
import { SUCCESS_STORIES } from "@/lib/stories-data";

export const metadata: Metadata = {
  title: "Testimonials & Reviews | Blue Stars Admissions Consulting",
  description:
    "Read firsthand testimonials from parents and students admitted to Stanford, Harvard, Brown, WashU, RISD, UC Berkeley, and other top-tier universities through Blue Stars Admissions Consulting.",
};

export default function TestimonialsPage() {
  return (
    <div className="w-full bg-white">
      {/* Testimonials Hero */}
      <StoriesHero />

      {/* Main Interactive Testimonials & Family Reviews Listing */}
      <StoriesListing initialStories={SUCCESS_STORIES} />

      {/* Free Consultation CTA */}
      <CTA />
    </div>
  );
}

