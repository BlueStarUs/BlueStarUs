import React from "react";
import type { Metadata } from "next";
import { SuccessesHero } from "@/components/sections/SuccessesHero";
import { SuccessesListing } from "@/components/sections/SuccessesListing";
import { SuccessesMethodology } from "@/components/sections/SuccessesMethodology";
import { CTA } from "@/components/sections/CTA";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "College Admissions Results & Ivy League Acceptances",
  description:
    "Explore Blue Stars' verified student college acceptances across the Ivy League, Stanford, UC Regents Honors, selective research, and merit scholarships.",
  alternates: {
    canonical: "https://bluestars.us/successes",
  },
  openGraph: {
    title: "College Admissions Results & Ivy League Acceptances | Blue Stars",
    description:
      "Explore Blue Stars' verified student college acceptances across the Ivy League, Stanford, UC Regents Honors, selective research, and merit scholarships.",
    url: "https://bluestars.us/successes",
    images: [
      {
        url: "/images/sub_images/ready_to_take.png",
        width: 1200,
        height: 630,
        alt: "Blue Stars Admissions Successes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "College Admissions Results & Ivy League Acceptances | Blue Stars",
    description:
      "Explore Blue Stars' verified student college acceptances across the Ivy League, Stanford, UC Regents Honors, selective research, and merit scholarships.",
    images: ["/images/sub_images/ready_to_take.png"],
  },
};

export default function SuccessesPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Successes", url: "/successes" },
  ];

  return (
    <div className="w-full bg-white">
      <BreadcrumbJsonLd items={breadcrumbs} />
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

