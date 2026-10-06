"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function HeroPhrase({ frames, tagline }: { frames: string[]; tagline: string }) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState<number | null>(null);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    if (reduced || frames.length < 2) return;

    const timers: number[] = [];
    const queue = (callback: () => void, delay: number) => {
      timers.push(window.setTimeout(callback, delay));
    };

    queue(() => setIndex(0), 500);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [frames.length, reduced]);

  useEffect(() => {
    if (reduced || index === null || index >= frames.length - 1) return;

    const fadeOut = window.setTimeout(() => setShown(false), 1500);
    const advance = window.setTimeout(() => {
      setIndex((current) => (current === null ? current : current + 1));
      setShown(true);
    }, 1800);

    return () => {
      window.clearTimeout(fadeOut);
      window.clearTimeout(advance);
    };
  }, [frames.length, index, reduced]);

  if (reduced || index === null) {
    return <p className="max-w-sm text-sm leading-6 text-ink">{tagline}</p>;
  }

  return (
    <>
      <p className="max-w-sm min-h-[4.5rem] text-sm leading-6 text-ink" aria-hidden="true">
        <span
          className={`block transition-opacity duration-300 motion-reduce:transition-none ${shown ? "opacity-100" : "opacity-0"}`}
        >
          {frames[index]}
        </span>
      </p>
      <p className="sr-only">{tagline}</p>
    </>
  );
}
