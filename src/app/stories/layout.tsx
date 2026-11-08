import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Student Success Stories & Admissions Results | Blue Stars Admissions Consulting",
  description:
    "Read inspiring stories and college acceptance outcomes from Blue Stars students admitted to Stanford, Harvard, MIT, Columbia, UC Berkeley, RISD, and other top-tier universities.",
};

export default function StoriesLayout({
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

