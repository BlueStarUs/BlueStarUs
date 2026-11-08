import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Features } from "@/components/sections/Features";
import { FounderVision } from "@/components/sections/FounderVision";
import { Testimonials } from "@/components/sections/Testimonials";
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
        <Services />
        <Process />
        <Features />
        <FounderVision />
        <Testimonials />
        <Resources />
        <CTA />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

