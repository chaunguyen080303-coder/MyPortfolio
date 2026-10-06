import type { SiteContent } from "@/data/types";
import { mailtoHref, usableHref } from "@/lib/links";

export function SocialLinks({
  profile,
  cvLabel,
}: {
  profile: SiteContent["profile"];
  cvLabel: string;
}) {
  const links = [
    { href: usableHref(profile.githubUrl), label: "GitHub" },
    { href: usableHref(profile.linkedinUrl), label: "LinkedIn" },
    { href: usableHref(profile.upworkUrl), label: "Upwork" },
    { href: mailtoHref(profile.email), label: "Email" },
    { href: usableHref(profile.cvUrl), label: cvLabel },
  ].filter((link): link is { href: string; label: string } => Boolean(link.href));

  if (links.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-2">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            className="text-sm font-medium text-muted hover:text-accent"
            {...(link.href.startsWith("mailto:")
              ? {}
              : { target: "_blank", rel: "noreferrer" })}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
