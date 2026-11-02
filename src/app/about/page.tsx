import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, CheckCircle2, Award, Users2, Compass } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { WHY_CHOOSE_BENEFITS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about BlueStars Admissions Consulting, our philosophy, team, and dedicated approach to student college admissions success.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        {/* Page Hero */}
        <section className="bg-gradient-to-b from-[#f3f9ff] to-white py-16 sm:py-20 border-b border-brand-border/40">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
            <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-brand-blue mb-3 font-heading">
              Our Story &amp; Mission
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy mb-4 font-heading tracking-tight">
              Empowering Students to Reach Their Full Potential
            </h1>
            <p className="text-sm sm:text-base text-brand-text max-w-2xl mx-auto leading-relaxed">
              At BlueStars Admissions Consulting, we believe college admissions is not just about getting accepted—it&apos;s about discovering who you are, building confidence, and finding the right environment to flourish.
            </p>
          </div>
        </section>

        {/* Narrative & Values */}
        <section className="py-16">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="relative aspect-[4/3] rounded-brand overflow-hidden shadow-card border border-brand-border">
                <Image
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80"
                  alt="BlueStars mentor working with student"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy mb-4 font-heading">
                  A Personalized, Human-First Approach
                </h2>
                <p className="text-[13.5px] text-brand-text mb-4 leading-relaxed">
                  Founded with a vision to demystify higher education admissions, BlueStars pairs ambitious high school and transfer students with dedicated admissions strategists.
                </p>
                <p className="text-[13.5px] text-brand-text mb-6 leading-relaxed">
                  We don&apos;t apply a one-size-fits-all formula. Instead, we dive deep into your passions, extracurricular commitments, and academic strengths to create an application that is authentic, compelling, and uniquely yours.
                </p>

                <ul className="space-y-3 mb-8">
                  {WHY_CHOOSE_BENEFITS.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3 text-[13px] text-brand-navy font-medium">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Button variant="primary" size="md" href="/contact">
                  <span>Speak With a Counselor</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-brand-border/60">
              <div className="bg-brand-bg rounded-brand p-6 border border-brand-border/40">
                <div className="w-12 h-12 rounded-full bg-brand-sky text-brand-blue grid place-items-center mb-4">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-base text-brand-navy mb-2">
                  Strategic Guidance
                </h3>
                <p className="text-xs text-brand-text leading-relaxed">
                  Navigating early action, regular decision, standardized testing, and financial aid strategies with data-driven precision.
                </p>
              </div>

              <div className="bg-brand-bg rounded-brand p-6 border border-brand-border/40">
                <div className="w-12 h-12 rounded-full bg-brand-green text-brand-greenDark grid place-items-center mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-base text-brand-navy mb-2">
                  Proven Excellence
                </h3>
                <p className="text-xs text-brand-text leading-relaxed">
                  Our alumni have earned spots at top Ivy League, public flagship, and liberal arts institutions across the country.
                </p>
              </div>

              <div className="bg-brand-bg rounded-brand p-6 border border-brand-border/40">
                <div className="w-12 h-12 rounded-full bg-brand-sky text-brand-blue grid place-items-center mb-4">
                  <Users2 className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-base text-brand-navy mb-2">
                  Dedicated Mentors
                </h3>
                <p className="text-xs text-brand-text leading-relaxed">
                  Consultants who actively mentor, motivate, and guide students through every draft and deadline with genuine care.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

