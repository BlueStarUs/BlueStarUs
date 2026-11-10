import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "College Admissions Successes & Results | Blue Stars Admissions Consulting",
  description:
    "Explore Blue Stars Admissions Consulting's verified student college acceptances across the Ivy League, Stanford, UC Berkeley, UCLA Regents Scholarships, RISD, and prestigious full-ride merit awards.",
};

export default function SuccessesLayout({
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

