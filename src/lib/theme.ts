export const themeStorageKey = "theme";

export type ThemeChoice = "light" | "dark";

export const themeBootScript = `(function(){try{var key=${JSON.stringify(themeStorageKey)};var stored=localStorage.getItem(key);var theme=stored==="light"||stored==="dark"?stored:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.dataset.theme=theme;}catch(e){}})();`;

export function readTheme(): ThemeChoice {
  const stored = localStorage.getItem(themeStorageKey);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function applyTheme(theme: ThemeChoice) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(themeStorageKey, theme);
  window.dispatchEvent(new Event("themechange"));
}
