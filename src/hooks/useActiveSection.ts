"use client";

import { useEffect, useState } from "react";

export function useActiveSection(ids: readonly string[]) {
  const idKey = ids.join("|");
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    const sectionIds = idKey.split("|").filter(Boolean);
    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.15, 0.4, 0.7],
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [idKey]);

  return activeId;
}
