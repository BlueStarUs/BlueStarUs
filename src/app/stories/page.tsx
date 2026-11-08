import React from "react";
import { Metadata } from "next";
import { StoriesHero } from "@/components/sections/StoriesHero";
import { StoriesListing } from "@/components/sections/StoriesListing";
import { CTA } from "@/components/sections/CTA";
import { SUCCESS_STORIES } from "@/lib/stories-data";

export const metadata: Metadata = {
  title: "Student Success Stories | Blue Stars Admissions Consulting",
  description:
    "Explore genuine college acceptance stories, student profiles, full-tuition scholarship wins, and testimonials from Blue Stars families across the United States.",
};

export default function StoriesPage() {
  return (
    <div className="w-full bg-white">
      {/* Dynamic Success Stories Hero with Collegiate Scene & Live Typography */}
      <StoriesHero />

      {/* Main Interactive Stories Listing */}
      <StoriesListing initialStories={SUCCESS_STORIES} />

      {/* Free Consultation CTA */}
      <CTA />
    </div>
  );
}

