import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Family & Student Testimonials | Blue Stars Admissions Consulting",
  description:
    "Read genuine reviews and heartfelt testimonials from parents and students who partnered with Blue Stars Admissions Consulting for elite college planning, essay coaching, and admissions strategy.",
};

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">{children}</main>
      <Footer />
    </>
  );
}

