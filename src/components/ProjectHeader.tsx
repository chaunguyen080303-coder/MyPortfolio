import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function ProjectHeader({
  backLabel,
  toLightLabel,
  toDarkLabel,
}: {
  backLabel: string;
  toLightLabel: string;
  toDarkLabel: string;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="text-sm font-semibold text-ink">
          {backLabel}
        </Link>
        <ThemeToggle toLightLabel={toLightLabel} toDarkLabel={toDarkLabel} />
      </div>
    </header>
  );
}
