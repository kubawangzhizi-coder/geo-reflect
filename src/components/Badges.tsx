import { CATEGORY_MAP } from "@/data/categories";
import type { CategoryId, Difficulty } from "@/data/types";

const DIFF = {
  1: { label: "入门", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  2: { label: "进阶", cls: "bg-amber-50 text-amber-700 border-amber-200" },
  3: { label: "挑战", cls: "bg-rose-50 text-rose-700 border-rose-200" },
} as const;

export function DifficultyBadge({ value }: { value: Difficulty }) {
  const d = DIFF[value];
  return <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${d.cls}`}>{d.label}</span>;
}

export function ImportanceBar({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-1" title={`考试权重 ${value}/5`} aria-label={`考试权重 ${value} / 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 w-3.5 rounded-full ${i < value ? "bg-sky-500" : "bg-slate-200"}`}
        />
      ))}
    </span>
  );
}

export function CategoryTag({ id, size = "sm" }: { id: CategoryId; size?: "sm" | "xs" }) {
  const c = CATEGORY_MAP[id];
  if (!c) return null;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 ${
        size === "xs" ? "text-[10px]" : "text-[11px]"
      }`}
      style={{ borderColor: `${c.color}55`, backgroundColor: `${c.color}14`, color: c.accent }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.color }} />
      {c.short}
    </span>
  );
}

export function ConfidencePill({ value }: { value: "高" | "中" | "探索" }) {
  const map = {
    高: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30",
    中: "bg-sky-500/15 text-sky-300 ring-sky-400/30",
    探索: "bg-amber-500/15 text-amber-300 ring-amber-400/30",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${map[value]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {value}可信
    </span>
  );
}

export function MetaRow({ grade, difficulty, importance }: { grade: string; difficulty: Difficulty; importance: number }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
      <span className="inline-flex items-center gap-1.5">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3 21 8v8l-9 5-9-5V8l9-5Z" strokeLinejoin="round" />
        </svg>
        {grade}
      </span>
      <span className="inline-flex items-center gap-1.5">
        难度 <DifficultyBadge value={difficulty} />
      </span>
      <span className="inline-flex items-center gap-1.5">
        权重 <ImportanceBar value={importance} />
      </span>
    </div>
  );
}
