import type { MetadataRoute } from "next";

const DOWNLOAD_SLUGS = ["planner", "workbook", "guide", "affirmations", "shopping-list"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://chukwudi-portfolio-snowy.vercel.app";

  const staticRoutes = [
    "",
    "/about",
    "/tech",
    "/works",
    "/feedbacks",
    "/contact",
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
