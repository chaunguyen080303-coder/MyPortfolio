"use client";

import { useEffect, useId, useState } from "react";
import { Nav } from "@/components/Nav";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { NavItem } from "@/data/types";

export function MobileHeader({
  name,
  items,
  openLabel,
  closeLabel,
  toLightLabel,
  toDarkLabel,
}: {
  name: string;
  items: NavItem[];
  openLabel: string;
  closeLabel: string;
  toLightLabel: string;
  toDarkLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur lg:hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-2.5">
        <a href="#top" className="truncate text-sm font-semibold text-ink">
          {name}
        </a>
        <div className="flex items-center gap-2">
          <ThemeToggle toLightLabel={toLightLabel} toDarkLabel={toDarkLabel} />
          <button
            type="button"
            className="inline-flex h-10 items-center rounded-full border border-line bg-card px-3 text-sm font-medium text-ink"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? closeLabel : openLabel}
          </button>
        </div>
      </div>
      {open ? (
        <div id={menuId} className="border-t border-line px-4 py-3">
          <Nav items={items} id={`${menuId}-nav`} onNavigate={() => setOpen(false)} />
        </div>
      ) : null}
    </header>
  );
}
