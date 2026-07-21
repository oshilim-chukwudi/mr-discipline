import type { MetadataRoute } from "next";

const DOWNLOAD_SLUGS = ["planner", "workbook", "guide", "laws", "shopping-list"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mr-discipline.vercel.app";

  // "/about", "/fitness", "/contact" are redirect-only stubs to homepage
  // anchors (see src/app/{about,fitness,contact}/page.tsx) — excluded so
  // crawlers aren't sent through a redirect hop for content "/" already covers.
  const staticRoutes = [
    "",
    "/products",
    "/consult",
    "/privacy",
    "/terms",
    "/refund",
  ];

  const downloadRoutes = DOWNLOAD_SLUGS.map((slug) => `/downloads/${slug}`);

  return [...staticRoutes, ...downloadRoutes].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
