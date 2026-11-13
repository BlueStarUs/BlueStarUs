import React from "react";
import { Metadata } from "next";
import { ServicesHero } from "@/components/sections/ServicesHero";
import { ServicesProgramsGrid } from "@/components/sections/ServicesProgramsGrid";
import { ServicesDifference } from "@/components/sections/ServicesDifference";
import { ServiceResourcesBanner } from "@/components/sections/ServiceResourcesBanner";
import { ServicesCta } from "@/components/sections/ServicesCta";

export const metadata: Metadata = {
  title: "College Admissions Consulting & Strategy Services",
  description:
    "Explore Blue Stars' personalized admissions consulting services: College Admissions Consulting, Multi-Year Planning, Research & Internships, and Essay Guidance.",
  alternates: {
    canonical: "https://bluestars.us/services",
  },
  openGraph: {
    title: "College Admissions Consulting & Strategy Services | Blue Stars",
    description:
      "Explore Blue Stars' personalized admissions consulting services: College Admissions Consulting, Multi-Year Planning, Research & Internships, and Essay Guidance.",
    url: "https://bluestars.us/services",
    images: [
      {
        url: "/images/sub_images/Admissions _img.png",
        width: 1200,
        height: 630,
        alt: "Blue Stars Admissions Consulting Programs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "College Admissions Consulting & Strategy Services | Blue Stars",
    description:
      "Explore Blue Stars' personalized admissions consulting services: College Admissions Consulting, Multi-Year Planning, Research & Internships, and Essay Guidance.",
    images: ["/images/sub_images/Admissions _img.png"],
  },
};

const GENERAL_SERVICES_FAQS = [
  {
    question: "How do I choose which service package is right for my student?",
    answer:
      "During your free 30-minute consultation, our senior advisors evaluate your student's current grade level, academic profile, and specific timeline to recommend whether our comprehensive multi-year planning, research mentorship, or targeted application package is the best fit.",
  },
  {
    question: "Do you offer combined or comprehensive full-cycle packages?",
    answer:
      "Yes. Most families choose our Comprehensive Full-Cycle Admissions Consulting package, which seamlessly integrates all services—planning, research & internships, application strategy, and essay coaching—under one dedicated team.",
  },
  {
    question: "Who works directly with my student?",
    answer:
      "Each student is paired with a primary senior admissions consultant alongside a specialized writing coach and strategists overseen by our founder, Dr. Amy Morgenstern.",
  },
  {
    question: "Are your services available remotely for non-California families?",
    answer:
      "Yes. We serve families across the entire United States as well as international students worldwide through our interactive video counseling, shared Google Docs workspaces, and regular parent progress updates and milestone check-ins.",
  },
];

export default function ServicesPage() {
  return (
    <div className="w-full bg-white overflow-hidden">
      {/* Modern Services Hero with Books & Graduation Cap (Matching Reference) */}
      <ServicesHero />

      {/* 7 Program Cards Grid (Matching Reference Image) */}
      <ServicesProgramsGrid />

      {/* Why Blue Stars Difference + FAQ Accordion */}
      <ServicesDifference faqs={GENERAL_SERVICES_FAQS} />

      {/* Resources to Help Teens & Families (Blog, Videos, Live Webinars) */}
      <ServiceResourcesBanner />

      {/* Modern Elevated CTA Banner Card */}
      <ServicesCta />
    </div>
  );
}
