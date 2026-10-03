import type { MetadataRoute } from "next";
import { getContent } from "@/data";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const content = getContent("en");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${content.siteUrl}/sitemap.xml`,
  };
}
