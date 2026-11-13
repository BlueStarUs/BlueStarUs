import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blogs-data";
import { SUCCESS_STORIES } from "@/lib/stories-data";
import { SERVICES_CATALOG } from "@/lib/services-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url.replace(/\/+$/, "");

  // 1. Core High-Value Static Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2026-11-12T00:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2026-11-10T00:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date("2026-11-10T00:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/successes`,
      lastModified: new Date("2026-11-10T00:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date("2026-11-10T00:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/stories`,
      lastModified: new Date("2026-11-10T00:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date("2026-11-12T00:00:00.000Z"),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2026-11-10T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date("2026-11-10T00:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources/faq`,
      lastModified: new Date("2026-11-10T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources/guides`,
      lastModified: new Date("2026-11-10T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources/videos`,
      lastModified: new Date("2026-11-10T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/resources/webinars`,
      lastModified: new Date("2026-11-10T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: new Date("2026-11-10T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date("2026-11-10T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/art-admissions`,
      lastModified: new Date("2026-11-10T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/free-workbook`,
      lastModified: new Date("2026-11-10T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date("2026-11-01T00:00:00.000Z"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // 2. Individual Services Pages
  const serviceRoutes: MetadataRoute.Sitemap = Object.keys(SERVICES_CATALOG).map(
    (slug) => ({
      url: `${baseUrl}/services/${slug}`,
      lastModified: new Date("2026-11-10T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.85,
    })
  );

  // 3. Published Blog Posts (169 posts)
  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => {
    let date = new Date("2026-10-01T00:00:00.000Z");
    if (post.dateIso) {
      const parsed = new Date(post.dateIso);
      if (!isNaN(parsed.getTime())) date = parsed;
    }

    return {
      url: `${baseUrl}/blogs/${post.slug}`,
      lastModified: date,
      changeFrequency: "monthly",
      priority: post.featured ? 0.8 : 0.7,
    };
  });

  // 4. Student Success Stories (55 stories)
  const storyRoutes: MetadataRoute.Sitemap = SUCCESS_STORIES.map((story) => ({
    url: `${baseUrl}/stories/${story.id}`,
    lastModified: new Date("2026-11-10T00:00:00.000Z"),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...storyRoutes];
}

