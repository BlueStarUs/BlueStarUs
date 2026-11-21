import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface StudentStoryItem {
  id: string;
  name: string;
  role: string;
  admittedTo: string;
  quote: string;
  accent: "blue" | "green";
  tags?: string[];
}

const TESTIMONIALS_DATA: StudentStoryItem[] = [
  {
    id: "sandy-los-gatos",
    name: "Sandy",
    role: "Blue Stars Parent • Los Gatos, CA",
    admittedTo: "Harvard, Stanford, UC Berkeley & NYU Stern",
    quote:
      "We have trusted Blue Stars with all three of our children. Our first was admitted to NYU Stern, our second to UC Berkeley, and our third was admitted to both Stanford and Harvard. Each child is completely different, and Blue Stars found the story true to each of them. We are deeply grateful for their guidance throughout each journey.",
    accent: "blue",
    tags: ["All 3 Children", "Ivy & Stanford", "Merit Honors"],
  },
  {
    id: "sharon-washu-ed",
    name: "Sharon",
    role: "Parent of Student Accepted ED",
    admittedTo: "Washington University in St. Louis (ED)",
    quote:
      "Helen has been an absolute gift to our family over the past four years. From the beginning, she respected my daughter’s clarity of purpose and academic direction, supporting her goals rather than trying to reshape her into someone else for the sake of admissions optics.",
    accent: "green",
    tags: ["Early Decision", "Washington University", "First Choice"],
  },
  {
    id: "jeanie-risd-arts",
    name: "Jeanie",
    role: "Blue Stars Student • Palo Alto, CA",
    admittedTo: "Rhode Island School of Design (RISD)",
    quote:
      "When I first started working with Blue Stars, I wasn’t completely sure I wanted to pursue art. She encouraged me to immerse myself in the art world by visiting art museums and listening to podcasts. With Blue Stars’ guidance during the college admissions process, I was admitted into my dream school, RISD!",
    accent: "blue",
    tags: ["RISD Acceptance", "Arts & Portfolio", "Dream School"],
  },
];

export function Testimonials() {
  const [featured, ...others] = TESTIMONIALS_DATA;

  return (
    <section id="stories" className="relative w-full bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1160px] px-6 sm:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="text-[11.5px] font-semibold tracking-[0.22em] uppercase text-brand-blue mb-4">
              Families in their own words
            </p>
            <h2 className="text-[32px] sm:text-[42px] leading-[1.1] text-brand-ink">Real students. Real journeys.</h2>
          </div>
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-brand-ink hover:text-brand-blue"
          >
            More family stories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {featured && (
          <figure className="border-t border-[#e6dfd3] pt-12 pb-14 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_260px] gap-8 lg:gap-16">
            <blockquote className="font-display text-[24px] sm:text-[30px] leading-[1.45] text-brand-ink">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <figcaption className="lg:pt-2">
              <span className="block font-display text-[20px] text-brand-ink">{featured.name}</span>
              <span className="block text-[13px] text-[#7a7f88] mt-1">{featured.role}</span>
              <span className="block text-[13.5px] font-semibold text-brand-blue mt-4">{featured.admittedTo}</span>
              <Link
                href={`/stories/${featured.id}`}
                className="inline-block mt-5 text-[13.5px] font-semibold text-brand-ink underline decoration-brand-mint decoration-2 underline-offset-[6px] hover:text-brand-blue"
              >
                Read the full story
              </Link>
            </figcaption>
          </figure>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 border-t border-[#e6dfd3]">
          {others.map((story) => (
            <figure key={story.id} className="pt-10 pb-4">
              <blockquote className="font-display italic text-[18px] sm:text-[19px] leading-[1.6] text-[#3f4a5a] mb-6">
                &ldquo;{story.quote}&rdquo;
              </blockquote>
              <figcaption className="flex flex-wrap items-baseline justify-between gap-3">
                <span>
                  <span className="block font-display text-[18px] text-brand-ink">{story.name}</span>
                  <span className="block text-[13px] text-[#7a7f88] mt-0.5">{story.role}</span>
                  <span className="block text-[13px] font-semibold text-brand-blue mt-2">{story.admittedTo}</span>
                </span>
                <Link
                  href={`/stories/${story.id}`}
                  className="text-[13px] font-semibold text-brand-ink hover:text-brand-blue inline-flex items-center gap-1"
                >
                  Story <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
