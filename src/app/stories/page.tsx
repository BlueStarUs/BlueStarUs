import React from "react";
import { Metadata } from "next";
import { StoriesHero } from "@/components/sections/StoriesHero";
import { StoriesListing } from "@/components/sections/StoriesListing";
import { FreeWorkbookSection } from "@/components/sections/FreeWorkbookSection";
import { CTA } from "@/components/sections/CTA";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SUCCESS_STORIES } from "@/lib/stories-data";

export const metadata: Metadata = {
  title: "Student Success Stories & Admissions Journeys",
  description:
    "Explore genuine college acceptance stories, student profiles, full-tuition scholarship wins, and testimonials from Blue Stars families across the United States.",
  alternates: {
    canonical: "https://bluestars.us/stories",
  },
  openGraph: {
    title: "Student Success Stories & Admissions Journeys | Blue Stars",
    description:
      "Explore genuine college acceptance stories, student profiles, full-tuition scholarship wins, and testimonials from Blue Stars families across the United States.",
    url: "https://bluestars.us/stories",
    images: [
      {
        url: "/images/sub_images/ready_to_take.png",
        width: 1200,
        height: 630,
        alt: "Blue Stars Student Success Stories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Success Stories & Admissions Journeys | Blue Stars",
    description:
      "Explore genuine college acceptance stories, student profiles, full-tuition scholarship wins, and testimonials from Blue Stars families across the United States.",
    images: ["/images/sub_images/ready_to_take.png"],
  },
};

export default function StoriesPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Student Success Stories", url: "/stories" },
  ];

  return (
    <div className="w-full bg-white">
      <BreadcrumbJsonLd items={breadcrumbs} />
      {/* Dynamic Success Stories Hero with Collegiate Scene & Live Typography */}
      <StoriesHero />

      {/* Main Interactive Stories Listing */}
      <StoriesListing initialStories={SUCCESS_STORIES} />

      {/* Free College Planning Foundations Workbook */}
      <FreeWorkbookSection />

      {/* Free Consultation CTA */}
      <CTA />
    </div>
  );
}

