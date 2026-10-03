import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectFrame } from "@/components/ProjectFrame";
import { ProjectHeader } from "@/components/ProjectHeader";
import { TagList } from "@/components/TagList";
import { getContent, getProject } from "@/data";
import { usableHref } from "@/lib/links";

export const dynamicParams = false;

export function generateStaticParams() {
  return getContent("en").projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject("en", slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}/`,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = getContent("en");
  const project = getProject("en", slug);
  if (!project) notFound();

  const liveUrl = usableHref(project.liveUrl);
  const codeUrl = usableHref(project.codeUrl);
  const sections = [
    { title: content.ui.problem, body: project.problem },
    { title: content.ui.built, body: project.built },
    { title: content.ui.result, body: project.result },
  ];

  return (
    <>
      <a
        href="#content"
        className="absolute left-4 top-4 z-50 -translate-y-24 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition-transform duration-200 focus:translate-y-0"
      >
        {content.ui.skipToContent}
      </a>
      <ProjectHeader
        backLabel={content.ui.backToPortfolio}
        toLightLabel={content.ui.switchToLight}
        toDarkLabel={content.ui.switchToDark}
      />
      <main id="content" tabIndex={-1} className="mx-auto w-full max-w-3xl px-5 py-12 outline-none sm:px-8">
        <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
          {content.navigation.find((item) => item.id === "projects")?.label}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">{project.title}</h1>
        <p className="mt-4 text-base leading-7 text-muted">{project.summary}</p>
        <div className="mt-6">
          <TagList tags={project.tags} />
        </div>
        <div className="group mt-8">
          <ProjectFrame image={project.image} label={content.ui.preview} priority />
        </div>
        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-sm font-semibold tracking-[0.16em] text-muted uppercase">
                {section.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-ink">{section.body}</p>
            </section>
          ))}
        </div>
        {liveUrl || codeUrl ? (
          <p className="mt-8 text-sm font-medium">
            {liveUrl ? (
              <a href={liveUrl} className="text-accent" target="_blank" rel="noreferrer">
                {content.ui.live}
              </a>
            ) : null}
            {liveUrl && codeUrl ? (
              <span className="px-2 text-muted" aria-hidden="true">
                /
              </span>
            ) : null}
            {codeUrl ? (
              <a href={codeUrl} className="text-accent" target="_blank" rel="noreferrer">
                {content.ui.code}
              </a>
            ) : null}
          </p>
        ) : null}
      </main>
    </>
  );
}
