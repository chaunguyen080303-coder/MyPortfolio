import Image from "next/image";
import { FlowDiagram } from "@/components/FlowDiagram";
import type { ProjectFlow, ProjectImage } from "@/data/types";

export function ProjectFrame({
  image,
  flow,
  label,
  priority = false,
  tall = false,
  decorative = false,
}: {
  image: ProjectImage;
  flow?: ProjectFlow;
  label: string;
  priority?: boolean;
  tall?: boolean;
  decorative?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-card transition-transform duration-300 ease-out group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="size-2 rounded-full bg-line" aria-hidden="true" />
        <span className="size-2 rounded-full bg-line" aria-hidden="true" />
        <span className="size-2 rounded-full bg-line" aria-hidden="true" />
        <span className="ml-2 text-xs text-muted">{label}</span>
      </div>
      {flow ? (
        <FlowDiagram flow={flow} label={image.alt} tall={tall} decorative={decorative} />
      ) : (
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          priority={priority}
          className="h-auto w-full"
        />
      )}
    </div>
  );
}
