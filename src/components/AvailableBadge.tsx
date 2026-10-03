export function AvailableBadge({ label }: { label: string }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-xs font-medium text-ink">
      <span className="relative flex size-2" aria-hidden="true">
        <span className="available-ping absolute inline-flex size-full rounded-full bg-accent" />
        <span className="relative inline-flex size-2 rounded-full bg-accent" />
      </span>
      {label}
    </p>
  );
}
