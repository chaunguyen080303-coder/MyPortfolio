"use client";

import { useEffect, useState } from "react";
import { applyTheme, readTheme, type ThemeChoice } from "@/lib/theme";

export function ThemeToggle({
  toLightLabel,
  toDarkLabel,
}: {
  toLightLabel: string;
  toDarkLabel: string;
}) {
  const [theme, setTheme] = useState<ThemeChoice>("dark");

  useEffect(() => {
    const sync = () => setTheme(readTheme());
    sync();
    window.addEventListener("themechange", sync);
    return () => window.removeEventListener("themechange", sync);
  }, []);

  const nextTheme = theme === "dark" ? "light" : "dark";
  const label = nextTheme === "light" ? toLightLabel : toDarkLabel;

  return (
    <button
      type="button"
      className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-card text-ink"
      aria-label={label}
      onClick={() => {
        const choice = readTheme() === "dark" ? "light" : "dark";
        applyTheme(choice);
        setTheme(choice);
      }}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path
        d="M16.5 13.2A6.2 6.2 0 0 1 10.8 4 6.8 6.8 0 1 0 20 14.6a6.2 6.2 0 0 1-3.5-1.4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
