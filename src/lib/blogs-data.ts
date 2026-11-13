import { BlogPost } from "@/types";
import rawBlogsData from "./blogs-data.json";

export const BLOG_CATEGORIES = [
  "All",
  "Admissions Strategy",
  "UC PIQs & Essays",
  "College Planning",
  "STEM & Research",
  "Art Admissions",
  "Expert Interviews",
  "College Tours",
  "The Calm Way",
  "Student Well-Being",
  "Admissions Archives",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const BLOG_POSTS: BlogPost[] = rawBlogsData as unknown as BlogPost[];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  if (!slug) return undefined;
  const decoded = decodeURIComponent(slug).toLowerCase().trim();
  return BLOG_POSTS.find((post) => post.slug.toLowerCase() === decoded);
}

export function getRelatedPosts(currentSlug: string, count: number = 3): BlogPost[] {
  const current = getBlogPostBySlug(currentSlug);
  if (!current) return BLOG_POSTS.slice(0, count);

  const related = (current.relatedSlugs || [])
    .map((s) => getBlogPostBySlug(s))
    .filter((p): p is BlogPost => Boolean(p && p.slug !== currentSlug));

  if (related.length >= count) return related.slice(0, count);

  const fallback = BLOG_POSTS.filter(
    (post) =>
      post.slug !== currentSlug &&
      post.category === current.category &&
      !related.some((r) => r.slug === post.slug)
  );

  const remaining = BLOG_POSTS.filter(
    (post) =>
      post.slug !== currentSlug &&
      !related.some((r) => r.slug === post.slug) &&
      !fallback.some((f) => f.slug === post.slug)
  );

  return [...related, ...fallback, ...remaining].slice(0, count);
}

export function getPostsByCategory(category: string): BlogPost[] {
  if (!category || category === "All") return BLOG_POSTS;
  return BLOG_POSTS.filter((post) => post.category === category);
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((post) => post.slug);
}

/**
 * Returns a high-resolution, curated, authentic local image fallback
 * tailored to the blog post's topic and category when no image is provided
 * or when an image fails to load.
 */
export function getDefaultBlogImage(category?: string, title?: string): string {
  const text = `${category || ""} ${title || ""}`.toLowerCase();

  if (
    text.includes("uc ") ||
    text.includes("personal insight") ||
    text.includes("piq") ||
    text.includes("berkeley") ||
    text.includes("ucla")
  ) {
    return "/images/resources/guides/University_of_California_PIQ_Mastery_Handbook.png";
  }

  if (
    text.includes("essay") ||
    text.includes("common app") ||
    text.includes("statement") ||
    text.includes("narrative") ||
    text.includes("writing")
  ) {
    return "/images/services/essay-guidance/Deep_Dive_Narrative_Brainstorming.png";
  }

  if (
    text.includes("stem") ||
    text.includes("research") ||
    text.includes("neuroscience") ||
    text.includes("ai") ||
    text.includes("math") ||
    text.includes("cs ")
  ) {
    return "/images/services/research-internships/Original_Independent_Research_Capstone.png";
  }

  if (
    text.includes("art") ||
    text.includes("portfolio") ||
    text.includes("design") ||
    text.includes("risd")
  ) {
    return "/images/services/others_images/Dream_art_Programs.png";
  }

  if (text.includes("wai cheng") || text.includes("wharton")) {
    return "/images/teams/Wai-Cheng-Headshot.webp";
  }

  if (text.includes("samuel") || text.includes("ortiz")) {
    return "/images/teams/Samuel-Ortiz.png";
  }

  if (text.includes("helen") || text.includes("ingerson")) {
    return "/images/teams/Helen-Ingerson-Upscaled.png";
  }

  if (
    text.includes("tour") ||
    text.includes("visit") ||
    text.includes("campus") ||
    text.includes("college tour")
  ) {
    return "/images/sub_images/Clean_University_Campus_Background.png";
  }

  if (
    text.includes("interview") ||
    text.includes("webinar") ||
    text.includes("expert")
  ) {
    return "/images/sub_images/live_Admissions_Webinars.png";
  }

  if (
    text.includes("calm") ||
    text.includes("stress") ||
    text.includes("mental") ||
    text.includes("well-being")
  ) {
    return "/images/sub_images/Students_hero.png";
  }

  if (
    text.includes("checklist") ||
    text.includes("timeline") ||
    text.includes("grade") ||
    text.includes("planning") ||
    text.includes("plan")
  ) {
    return "/images/resources/guides/College_Planning_Master_Checklist_Timeline.png";
  }

  if (
    text.includes("ivy") ||
    text.includes("harvard") ||
    text.includes("stanford") ||
    text.includes("results")
  ) {
    return "/images/resources/guides/Ivy_League_Top_20_Admissions_Playbook.png";
  }

  return "/images/services/Application_&_Admission_Process.png";
}

