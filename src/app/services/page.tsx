import React from "react";
import { Metadata } from "next";
import { ServicesHero } from "@/components/sections/ServicesHero";
import { ServicesProgramsGrid } from "@/components/sections/ServicesProgramsGrid";
import { ServicesDifference } from "@/components/sections/ServicesDifference";
import { ServiceResourcesBanner } from "@/components/sections/ServiceResourcesBanner";
import { ServicesCta } from "@/components/sections/ServicesCta";

export const metadata: Metadata = {
  title: "Our Services | Blue Stars Admissions Consulting",
  description:
    "Comprehensive college admissions programs: College & Undergraduate Programs, Master's Programs, Rankings, Admissions Guidance, Financial Aid & Scholarships, International Study, and Career Mentorship.",
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
      "Yes. We serve families across the entire United States as well as international students worldwide through our interactive video counseling, shared Google Docs workspaces, and parent update portals.",
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
