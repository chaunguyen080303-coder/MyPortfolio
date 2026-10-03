"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import type { NavItem } from "@/data/types";

export function Nav({
  items,
  onNavigate,
  id,
}: {
  items: NavItem[];
  onNavigate?: () => void;
  id?: string;
}) {
  const activeId = useActiveSection(items.map((item) => item.id));

  return (
    <nav id={id} aria-label="Sections">
      <ul className="space-y-1">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "true" : undefined}
                onClick={onNavigate}
                className={`group flex items-center rounded-md py-1.5 text-sm font-medium ${active ? "text-accent" : "text-muted"}`}
              >
                <span
                  aria-hidden="true"
                  className={`mr-3 inline-block h-px w-8 origin-left bg-accent transition-transform duration-300 motion-reduce:transition-none ${active ? "scale-x-100 opacity-100" : "scale-x-50 opacity-35"}`}
                />
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
