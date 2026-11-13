import React, { Suspense } from "react";
import { Metadata } from "next";
import { BreadcrumbHero } from "@/components/ui/BreadcrumbHero";
import { BlogListing } from "@/components/sections/BlogListing";
import { CTA } from "@/components/sections/CTA";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { BLOG_POSTS } from "@/lib/blogs-data";

export const metadata: Metadata = {
  title: "College Admissions Blog & Strategy Guides",
  description:
    "Actionable college admissions insights, Ivy League acceptance strategies, UC PIQ breakdowns, and academic planning advice from expert counselors.",
  alternates: {
    canonical: "https://bluestars.us/blogs",
  },
  openGraph: {
    title: "College Admissions Blog & Strategy Guides | Blue Stars",
    description:
      "Actionable college admissions insights, Ivy League acceptance strategies, UC PIQ breakdowns, and academic planning advice from expert counselors.",
    url: "https://bluestars.us/blogs",
    images: [
      {
        url: "/images/blogs/blogs1.png",
        width: 1200,
        height: 630,
        alt: "Blue Stars Admissions Consulting Blogs & Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "College Admissions Blog & Strategy Guides | Blue Stars",
    description:
      "Actionable college admissions insights, Ivy League acceptance strategies, UC PIQ breakdowns, and academic planning advice from expert counselors.",
    images: ["/images/blogs/blogs1.png"],
  },
};

export default function BlogsPage() {
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Blogs & Insights", url: "/blogs" },
  ];

  return (
    <div className="w-full bg-white">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      {/* Short, Compact Breadcrumb Hero */}
      <BreadcrumbHero
        breadcrumbs={[{ label: "Blogs & Insights" }]}
        badge="EXPERT ADMISSIONS INSIGHTS"
        title="Admissions Insights, Guides & Strategies"
        description="Explore proven frameworks, multi-year high school roadmaps, essay brainstorming methods, and merit scholarship guidance crafted by Dr. Amy Morgenstern and our senior admissions team."
      />

      {/* Main Interactive Blog Listing */}
      <Suspense
        fallback={
          <div className="w-full py-16 text-center text-sm font-sans text-brand-text">
            Loading admissions articles...
          </div>
        }
      >
        <BlogListing initialPosts={BLOG_POSTS} />
      </Suspense>

      {/* Free Consultation CTA */}
      <CTA />
    </div>
  );
}
