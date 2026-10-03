import { ExperienceCard } from "@/components/ExperienceCard";
import { MobileHeader } from "@/components/MobileHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import { Sidebar } from "@/components/Sidebar";
import { TagList } from "@/components/TagList";
import type { SiteContent } from "@/data/types";
import { mailtoHref, usableHref } from "@/lib/links";
import { personJsonLd } from "@/lib/structured-data";

export function PortfolioHome({ content }: { content: SiteContent }) {
  const { ui, profile } = content;
  const sectionTitle = (id: string) =>
    content.navigation.find((item) => item.id === id)?.label ?? id;
  const upworkHref = usableHref(profile.upworkUrl);
  const emailHref = mailtoHref(profile.email);
  const cvHref = usableHref(profile.cvUrl);
  const year = new Date().getFullYear();

  return (
    <div id="top">
      <a
        href="#content"
        className="absolute left-4 top-4 z-50 -translate-y-24 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition-transform duration-200 focus:translate-y-0"
      >
        {ui.skipToContent}
      </a>
      <MobileHeader
        name={profile.name}
        items={content.navigation}
        openLabel={ui.openMenu}
        closeLabel={ui.closeMenu}
        toLightLabel={ui.switchToLight}
        toDarkLabel={ui.switchToDark}
      />
      <div className="mx-auto grid w-full max-w-6xl gap-0 px-5 sm:px-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16">
        <Sidebar content={content} />
        <main id="content" tabIndex={-1} className="pb-20 outline-none lg:py-16">
          <Section id="about" title={sectionTitle("about")}>
            <div className="max-w-2xl space-y-4 text-base leading-7 text-muted">
              {content.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Section>

          <Section id="skills" title={sectionTitle("skills")}>
            <div className="space-y-8">
              {content.skills.map((group) => (
                <div key={group.id}>
                  <h3 className="text-sm font-semibold text-ink">{group.label}</h3>
                  <div className="mt-3">
                    <TagList tags={group.items} />
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="experience" title={sectionTitle("experience")}>
            <div className="space-y-2">
              {content.experience.map((item) => (
                <ExperienceCard key={item.id} item={item} />
              ))}
            </div>
          </Section>

          <Section id="projects" title={sectionTitle("projects")}>
            <div className="space-y-12">
              {content.projects.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  viewLabel={ui.viewProject}
                  liveLabel={ui.live}
                  codeLabel={ui.code}
                  frameLabel={ui.preview}
                  priority={index === 0}
                />
              ))}
            </div>
          </Section>

          <Section id="process" title={sectionTitle("process")}>
            <ol className="grid gap-4 sm:grid-cols-2">
              {content.process.map((step, index) => (
                <li key={step.title} className="rounded-xl border border-line bg-card p-5">
                  <p className="font-mono text-xs text-accent tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-base font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="contact" title={sectionTitle("contact")}>
            <p className="max-w-2xl text-base leading-7 text-muted">{content.contactIntro}</p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{profile.location}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={upworkHref ?? "#contact"}
                className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-on-accent"
                {...(upworkHref ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {ui.hireMe}
              </a>
              <a
                href={emailHref ?? "#contact"}
                className="inline-flex items-center justify-center rounded-full border border-line bg-card px-4 py-2.5 text-sm font-semibold text-ink"
              >
                {ui.emailMe}
              </a>
            </div>
            <ul className="mt-8 space-y-2 text-sm text-muted">
              <li>{emailHref ? <a href={emailHref}>{profile.email}</a> : profile.email}</li>
              <li>
                {upworkHref ? (
                  <a href={upworkHref} target="_blank" rel="noreferrer">
                    {profile.upworkUrl}
                  </a>
                ) : (
                  profile.upworkUrl
                )}
              </li>
              <li>
                {usableHref(profile.githubUrl) ? (
                  <a href={profile.githubUrl} target="_blank" rel="noreferrer">
                    {profile.githubUrl}
                  </a>
                ) : (
                  profile.githubUrl
                )}
              </li>
              <li>
                {usableHref(profile.linkedinUrl) ? (
                  <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
                    {profile.linkedinUrl}
                  </a>
                ) : (
                  profile.linkedinUrl
                )}
              </li>
              <li>
                {ui.cv}
                {": "}
                {cvHref ? (
                  <a href={cvHref} target="_blank" rel="noreferrer">
                    {profile.cvUrl}
                  </a>
                ) : (
                  profile.cvUrl
                )}
              </li>
            </ul>
          </Section>

          <footer className="border-t border-line py-8 text-sm text-muted">
            <p>
              {ui.footer} · <span className="tabular-nums">{year}</span>
            </p>
          </footer>
        </main>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(content)) }}
      />
    </div>
  );
}
