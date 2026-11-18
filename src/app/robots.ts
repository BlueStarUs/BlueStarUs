import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  const isStaging =
    process.env.VERCEL_ENV === "preview" ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ||
    process.env.IS_STAGING === "true";

  // Prevent staging/preview environments from ever being indexed by search engines
  if (isStaging) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
    };
  }

  const baseUrl = SITE_CONFIG.url.replace(/\/+$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/dashboard/",
          "/private/",
          "/research-academy",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

