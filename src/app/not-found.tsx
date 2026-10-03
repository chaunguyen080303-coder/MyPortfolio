import Link from "next/link";
import { getContent } from "@/data";

export default function NotFound() {
  const content = getContent("en");

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col justify-center px-5">
      <h1 className="text-3xl font-semibold text-ink">{content.ui.notFoundTitle}</h1>
      <p className="mt-4 text-base leading-7 text-muted">{content.ui.notFoundBody}</p>
      <Link href="/" className="mt-8 text-sm font-semibold text-accent">
        {content.ui.backToPortfolio}
      </Link>
    </main>
  );
}
