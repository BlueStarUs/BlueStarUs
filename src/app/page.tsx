import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { RecentAdmissionsLogos } from "@/components/sections/RecentAdmissionsLogos";
import { Services } from "@/components/sections/Services";
import { CoreAreasSection } from "@/components/sections/CoreAreasSection";
import { Process } from "@/components/sections/Process";
import { Features } from "@/components/sections/Features";
import { FounderVision } from "@/components/sections/FounderVision";
import { Testimonials } from "@/components/sections/Testimonials";
import { FreeWorkbookSection } from "@/components/sections/FreeWorkbookSection";
import { Resources } from "@/components/sections/Resources";
import { CTA } from "@/components/sections/CTA";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <RecentAdmissionsLogos />
        <Services />
        <CoreAreasSection />
        <Process />
        <Features />
        <FounderVision />
        <Testimonials />
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
