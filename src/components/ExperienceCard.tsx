import type { ExperienceItem } from "@/data/types";

export function ExperienceCard({ item }: { item: ExperienceItem }) {
  return (
    <article className="group grid gap-2 rounded-xl border border-transparent px-4 py-4 transition-colors duration-200 hover:border-line hover:bg-surface sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-6">
      <p className="font-mono text-xs text-muted tabular-nums">{item.period}</p>
      <div>
        <h3 className="text-base font-semibold text-ink transition-colors duration-200 group-hover:text-accent">
          {item.role}
          <span className="font-medium text-muted"> · {item.company}</span>
        </h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          {item.highlights.map((highlight, index) => (
            <li key={`${item.id}-${index}`}>{highlight}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
