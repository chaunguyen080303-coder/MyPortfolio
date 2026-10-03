import type { ReactNode } from "react";

export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 py-12 lg:scroll-mt-20">
      <h2
        id={`${id}-title`}
        className="text-xs font-semibold tracking-[0.18em] text-muted uppercase"
      >
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
