import type { MetadataRoute } from "next";
import { getContent } from "@/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const content = getContent("en");
  const lastModified = new Date();

  return [
    {
      url: `${content.siteUrl}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...content.projects.map((project) => ({
      url: `${content.siteUrl}/projects/${project.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
