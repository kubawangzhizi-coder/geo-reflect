import Link from "next/link";
import MathText from "./MathText";
import MiniFigure from "./MiniFigure";
import { CategoryTag, DifficultyBadge, ImportanceBar } from "./Badges";
import type { ModelPreview } from "@/lib/preview";

export default function ModelCard({ model, compact = false }: { model: ModelPreview; compact?: boolean }) {
  return (
    <Link
      href={`/models/${model.id}`}
      className="group card-light flex flex-col overflow-hidden transition duration-300 hover:-translate-y-0.5 hover:border-sky-300/70 hover:shadow-[0_20px_50px_-24px_rgba(14,116,233,0.45)]"
    >
      <div className="relative border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white px-2 pt-2">
        <MiniFigure figure={model.figure} compact className="h-36 object-contain sm:h-40" />
        <span className="pointer-events-none absolute left-3 top-3 font-mono text-[10px] uppercase tracking-widest text-slate-400">
          {model.tags[0] ?? "MODEL"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-bold leading-6 text-slate-900 group-hover:text-sky-700">{model.name}</h3>
          <span className="mt-0.5 shrink-0">
            <DifficultyBadge value={model.difficulty} />
          </span>
        </div>
        {!compact && (
          <MathText className="mt-1.5 line-clamp-2 text-[12.5px] leading-5 text-slate-500" text={model.summary} />
        )}
        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-3">
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
