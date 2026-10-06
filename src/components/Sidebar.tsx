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
    <aside className="flex flex-col gap-8 pt-20 lg:sticky lg:top-0 lg:h-dvh lg:justify-between lg:gap-4 lg:overflow-hidden lg:border-r lg:border-line lg:py-6 lg:pr-10 lg:pt-6">
      <div>
        <div className="flex items-start justify-between gap-3">
          <AvailableBadge label={ui.available} />
          <div className="hidden lg:block">
            <ThemeToggle toLightLabel={ui.switchToLight} toDarkLabel={ui.switchToDark} />
          </div>
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink lg:mt-3 lg:text-2xl">
          {profile.name}
        </h1>
        <p className="mt-2 text-base font-medium text-ink lg:mt-1 lg:text-sm">{profile.title}</p>
        <div className="mt-3 lg:mt-2">
          <HeroPhrase frames={profile.heroFrames} tagline={profile.tagline} />
        </div>
        <div className="mt-5 flex flex-col gap-3 lg:mt-3 lg:gap-2">
          <a
            href={upworkHref}
            className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-on-accent lg:py-2"
            {...(upworkHref.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            {ui.hireMe}
          </a>
          <a
            href={emailHref}
            className="inline-flex items-center justify-center rounded-full border border-line bg-card px-4 py-2.5 text-sm font-semibold text-ink lg:py-2"
          >
            {ui.emailMe}
          </a>
        </div>
        <div className="mt-8 hidden lg:mt-5 lg:block">
          <Nav items={navigation} dense />
        </div>
      </div>
      <div className="mt-8 space-y-4 lg:mt-0">
        <div className="space-y-2 text-sm leading-6 text-muted lg:space-y-1 lg:text-xs lg:leading-4">
          <p>{profile.location}</p>
          <p>{profile.experienceSummary}</p>
          <p>{languageLine}</p>
        </div>
        <SocialLinks profile={profile} cvLabel={ui.cv} />
      </div>
    </aside>
  );
}
