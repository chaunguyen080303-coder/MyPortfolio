export function isPlaceholder(value: string | undefined): boolean {
  if (!value) return true;
  return value.includes("[[TODO");
}

export function usableHref(value: string | undefined): string | undefined {
  if (isPlaceholder(value)) return undefined;
  return value;
}

export function mailtoHref(value: string | undefined): string | undefined {
  const email = usableHref(value);
  if (!email) return undefined;
  return `mailto:${email}`;
}
