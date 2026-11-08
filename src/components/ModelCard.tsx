import Link from "next/link";
import MathText from "./MathText";
import MiniFigure from "./MiniFigure";
import { CategoryTag, DifficultyBadge, ImportanceBar } from "./Badges";
import type { ModelPreview } from "@/lib/preview";

export default function ModelCard({ model, compact = false }: { model: ModelPreview; compact?: boolean }) {
  return (
    <Link
      href={`/models/${model.id}`}
      data-cursor="btn"
      className="group flex flex-col border border-[color:var(--color-rule-soft)] bg-[color:var(--color-sheet)] transition-colors hover:border-[color:var(--color-cobalt)]"
    >
      <div className="relative border-b border-[color:var(--color-rule-faint)] p-2">
        <MiniFigure figure={model.figure} compact className="h-36 object-contain sm:h-40" />
        <span className="pointer-events-none absolute left-3 top-2 text-[8px] uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
          {model.tags[0] ?? "MODEL"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[16px] font-semibold leading-6 tracking-[-0.01em] text-[color:var(--color-ink)] group-hover:text-[color:var(--color-cobalt)]">
            {model.name}
          </h3>
          <span className="mt-0.5 shrink-0">
            <DifficultyBadge value={model.difficulty} />
          </span>
        </div>
        {!compact && (
          <MathText className="mt-2 line-clamp-2 text-[12px] leading-5 text-[color:var(--color-muted)]" text={model.summary} />
        )}
        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-[color:var(--color-rule-faint)] pt-3">
          {model.categories.slice(0, 2).map((c) => (
            <CategoryTag key={c} id={c} size="xs" />
          ))}
          <span className="ml-auto flex items-center gap-1.5">
            <ImportanceBar value={model.importance} />
          </span>
        </div>
      </div>
    </Link>
  );
}
