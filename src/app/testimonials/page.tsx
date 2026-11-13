import React from "react";
import type { Metadata } from "next";
import { StoriesHero } from "@/components/sections/StoriesHero";
import { StoriesListing } from "@/components/sections/StoriesListing";
import { FreeWorkbookSection } from "@/components/sections/FreeWorkbookSection";
import { CTA } from "@/components/sections/CTA";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SUCCESS_STORIES } from "@/lib/stories-data";

export const metadata: Metadata = {
  title: "Parent & Student Admissions Reviews",
  description:
    "Read firsthand testimonials from parents and students admitted to Stanford, Harvard, Brown, WashU, RISD, UC Berkeley, and other top-tier universities.",
  alternates: {
    canonical: "https://bluestars.us/testimonials",
  },
  openGraph: {
    title: "Parent & Student Admissions Reviews | Blue Stars",
    description:
      "Read firsthand testimonials from parents and students admitted to Stanford, Harvard, Brown, WashU, RISD, UC Berkeley, and other top-tier universities.",
    url: "https://bluestars.us/testimonials",
    images: [
      {
        url: "/images/sub_images/ready_to_take.png",
        width: 1200,
        height: 630,
        alt: "Blue Stars Admissions Consulting Testimonials",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parent & Student Admissions Reviews | Blue Stars",
    description:
      "Read firsthand testimonials from parents and students admitted to Stanford, Harvard, Brown, WashU, RISD, UC Berkeley, and other top-tier universities.",
    images: ["/images/sub_images/ready_to_take.png"],
  },
};

export default function TestimonialsPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Testimonials", url: "/testimonials" },
  ];

  return (
    <div className="w-full bg-white">
      <BreadcrumbJsonLd items={breadcrumbs} />
      {/* Testimonials Hero */}
      <StoriesHero />

      {/* Main Interactive Testimonials & Family Reviews Listing */}
      <StoriesListing initialStories={SUCCESS_STORIES} />

      {/* Free College Planning Foundations Workbook */}
      <FreeWorkbookSection />

      {/* Free Consultation CTA */}
      <CTA />
    </div>
  );
}

