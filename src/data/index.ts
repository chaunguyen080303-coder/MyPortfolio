import { en } from "@/data/en";
import { locales, type Locale, type SiteContent } from "@/data/types";

const dictionaries: Record<Locale, SiteContent> = {
  en,
};

export function getContent(locale: Locale = "en"): SiteContent {
  return dictionaries[locale];
}

export function getProject(locale: Locale, slug: string) {
  return getContent(locale).projects.find((project) => project.slug === slug);
}

export { locales };
export type { Locale, SiteContent };
