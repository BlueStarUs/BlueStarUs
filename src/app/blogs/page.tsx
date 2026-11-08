import React from "react";
import { Metadata } from "next";
import { BreadcrumbHero } from "@/components/ui/BreadcrumbHero";
import { BlogListing } from "@/components/sections/BlogListing";
import { CTA } from "@/components/sections/CTA";
import { BLOG_POSTS } from "@/lib/blogs-data";

export const metadata: Metadata = {
  title: "Blogs & Admissions Insights | Blue Stars Admissions Consulting",
  description:
    "Expert articles, step-by-step application timelines, personal statement brainstorming guides, and scholarship strategies from Blue Stars Admissions Consulting.",
};

export default function BlogsPage() {
  return (
    <div className="w-full bg-white">
      {/* Short, Compact Breadcrumb Hero */}
      <BreadcrumbHero
        breadcrumbs={[{ label: "Blogs & Insights" }]}
        badge="EXPERT ADMISSIONS INSIGHTS"
        title="Admissions Insights, Guides & Strategies"
        description="Explore proven frameworks, multi-year high school roadmaps, essay brainstorming methods, and merit scholarship guidance crafted by Dr. Amy Morgenstern and our senior admissions team."
      />

      {/* Main Interactive Blog Listing */}
      <BlogListing initialPosts={BLOG_POSTS} />

      {/* Free Consultation CTA */}
      <CTA />
    </div>
  );
}
