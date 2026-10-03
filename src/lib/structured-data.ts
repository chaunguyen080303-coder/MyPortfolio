import type { SiteContent } from "@/data/types";
import { isPlaceholder, usableHref } from "@/lib/links";

export function personJsonLd(content: SiteContent) {
  const { profile, siteUrl } = content;
  const sameAs = [profile.upworkUrl, profile.githubUrl, profile.linkedinUrl].filter(
    (url) => !isPlaceholder(url),
  );
  const email = usableHref(profile.email);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    description: profile.tagline,
    url: siteUrl,
    ...(email ? { email } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    address: {
      "@type": "PostalAddress",
      addressCountry: "VN",
    },
    knowsLanguage: profile.languages.map((language) => language.name),
  };
}
