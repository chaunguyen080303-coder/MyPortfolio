"use client";

import { useLayoutEffect } from "react";
import { readTheme } from "@/lib/theme";

export function ThemeBoot() {
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = readTheme();
  }, []);

  return null;
}
