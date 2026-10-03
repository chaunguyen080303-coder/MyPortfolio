import { AvailableBadge } from "@/components/AvailableBadge";
import { HeroPhrase } from "@/components/HeroPhrase";
import { Nav } from "@/components/Nav";
import { SocialLinks } from "@/components/SocialLinks";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { SiteContent } from "@/data/types";
import { mailtoHref, usableHref } from "@/lib/links";

export function Sidebar({ content }: { content: SiteContent }) {
  const { profile, ui, navigation } = content;
  const upworkHref = usableHref(profile.upworkUrl) ?? "#contact";
  const emailHref = mailtoHref(profile.email) ?? "#contact";
  const languageLine = profile.languages
    .map((language) => `${language.name} (${language.level})`)
    .join(", ");

  return (
    <aside className="flex flex-col gap-8 pt-20 lg:sticky lg:top-0 lg:h-dvh lg:overflow-y-auto lg:py-12 lg:pt-12">
      <div>
        <div className="flex items-start justify-between gap-3">
          <AvailableBadge label={ui.available} />
          <div className="hidden lg:block">
            <ThemeToggle toLightLabel={ui.switchToLight} toDarkLabel={ui.switchToDark} />
          </div>
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink">{profile.name}</h1>
        <p className="mt-2 text-base font-medium text-ink">{profile.title}</p>
        <div className="mt-3">
          <HeroPhrase frames={profile.heroFrames} tagline={profile.tagline} />
        </div>
        <div className="mt-5 flex flex-col gap-3">
          <a
            href={upworkHref}
            className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-on-accent"
            {...(upworkHref.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            {ui.hireMe}
          </a>
          <a
            href={emailHref}
            className="inline-flex items-center justify-center rounded-full border border-line bg-card px-4 py-2.5 text-sm font-semibold text-ink"
          >
            {ui.emailMe}
          </a>
        </div>
        <div className="mt-8 hidden lg:block">
          <Nav items={navigation} />
        </div>
        <div className="mt-8 space-y-2 text-sm leading-6 text-muted">
          <p>{profile.location}</p>
          <p>{profile.experienceSummary}</p>
          <p>{languageLine}</p>
        </div>
      </div>
      <SocialLinks profile={profile} cvLabel={ui.cv} />
    </aside>
  );
}
