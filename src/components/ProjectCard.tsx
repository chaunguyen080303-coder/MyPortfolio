import Link from "next/link";
import { ProjectFrame } from "@/components/ProjectFrame";
import { TagList } from "@/components/TagList";
import type { Project } from "@/data/types";
import { usableHref } from "@/lib/links";

export function ProjectCard({
  project,
  viewLabel,
  liveLabel,
  codeLabel,
  privateLabel,
  frameLabel,
  flowLabel,
  priority = false,
}: {
  project: Project;
  viewLabel: string;
  liveLabel: string;
  codeLabel: string;
  privateLabel: string;
  frameLabel: string;
  flowLabel: string;
  priority?: boolean;
}) {
  const liveUrl = usableHref(project.liveUrl);
  const codeUrl = usableHref(project.codeUrl);

  return (
    <article className="group">
      <Link href={`/projects/${project.slug}`} className="block rounded-xl">
        <ProjectFrame
          image={project.image}
          flow={project.flow}
          label={project.flow ? flowLabel : frameLabel}
          priority={priority}
          decorative
        />
        <h3 className="mt-4 text-lg font-semibold text-ink transition-colors duration-200 group-hover:text-accent">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted">{project.summary}</p>
      </Link>
      <div className="mt-4">
        <TagList tags={project.tags} />
      </div>
      <p className="mt-4 text-sm font-medium">
        <Link href={`/projects/${project.slug}`} className="text-accent">
          {viewLabel}
        </Link>
        {liveUrl ? (
          <>
            <span className="px-2 text-muted" aria-hidden="true">
              /
            </span>
            <a href={liveUrl} className="text-accent" target="_blank" rel="noreferrer">
              {liveLabel}
            </a>
          </>
        ) : null}
        {codeUrl ? (
          <>
            <span className="px-2 text-muted" aria-hidden="true">
              /
            </span>
            <a href={codeUrl} className="text-accent" target="_blank" rel="noreferrer">
              {codeLabel}
            </a>
          </>
        ) : null}
        {project.confidential ? (
          <>
            <span className="px-2 text-muted" aria-hidden="true">
              /
            </span>
            <span className="text-muted">{privateLabel}</span>
          </>
        ) : null}
      </p>
    </article>
  );
}
