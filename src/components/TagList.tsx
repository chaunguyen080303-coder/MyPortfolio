export function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-line bg-card px-3 py-1 text-xs font-medium text-accent"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
