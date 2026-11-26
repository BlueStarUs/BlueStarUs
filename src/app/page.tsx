import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { AdmitsTicker } from "@/components/sections/AdmitsTicker";
import { FounderNote } from "@/components/sections/FounderNote";
import { ResultsWall } from "@/components/sections/ResultsWall";
import { TeamIntro } from "@/components/sections/TeamIntro";
import { Services } from "@/components/sections/Services";
import { CoreAreasSection } from "@/components/sections/CoreAreasSection";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { FreeWorkbookSection } from "@/components/sections/FreeWorkbookSection";
import { Resources } from "@/components/sections/Resources";
import { CTA } from "@/components/sections/CTA";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: {
    absolute: "Blue Stars Admissions Consulting | College Admissions Counselors",
  },
  description:
    "Personalized admissions consulting to help high school students navigate competitive college applications, build authentic spikes, and gain admission to top universities.",
  alternates: {
    canonical: "https://bluestars.us",
  },
  openGraph: {
    title: "Blue Stars Admissions Consulting | College Admissions Counselors",
    description:
      "Personalized admissions consulting to help high school students navigate competitive college applications, build authentic spikes, and gain admission to top universities.",
    url: "https://bluestars.us",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Blue Stars Admissions Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blue Stars Admissions Consulting | College Admissions Counselors",
    description:
      "Personalized admissions consulting to help high school students navigate competitive college applications, build authentic spikes, and gain admission to top universities.",
    images: ["/images/og-image.png"],
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <Hero />
        <AdmitsTicker />
        <FounderNote />
        <ResultsWall />
        <Services />
        <TeamIntro />
        <Testimonials />
        <Process />
        <CoreAreasSection />
        <FreeWorkbookSection />
        <Resources />
        <CTA />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
