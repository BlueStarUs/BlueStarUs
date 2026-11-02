import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with BlueStars Admissions Consulting for personalized college planning, application reviews, and free consultations.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="bg-gradient-to-b from-[#f3f9ff] to-white py-12 border-b border-brand-border/40">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
            <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-brand-blue mb-2.5 font-heading">
              Connect With Us
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy font-heading">
              We&apos;re Here to Help You Succeed
            </h1>
            <p className="text-sm text-brand-text max-w-lg mx-auto mt-3">
              Schedule your complimentary consultation or drop us a question. Our dedicated admissions team is ready to assist you.
            </p>
          </div>
        </div>

        <Contact />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

