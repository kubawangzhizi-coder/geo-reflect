import { CATEGORY_MAP } from "@/data/categories";
import type { CategoryId, Difficulty } from "@/data/types";

const DIFF = {
  1: "入门",
  2: "进阶",
  3: "挑战",
} as const;

export function DifficultyBadge({ value }: { value: Difficulty }) {
  return (
    <span className="inline-flex border border-[color:var(--color-rule-soft)] px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
      {DIFF[value]}
    </span>
  );
}

export function ImportanceBar({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-[3px]" title={`考试权重 ${value}/5`} aria-label={`考试权重 ${value} / 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-[5px] w-[10px] ${i < value ? "bg-[color:var(--color-cobalt)]" : "bg-[color:rgba(20,20,20,0.14)]"}`}
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
      className={`inline-flex items-center border border-[color:var(--color-rule-soft)] px-2 py-0.5 uppercase tracking-[0.12em] text-[color:var(--color-cobalt)] ${
        size === "xs" ? "text-[8.5px]" : "text-[9.5px]"
      }`}
    >
      {c.short}
    </span>
  );
}

export function ConfidencePill({ value }: { value: "高" | "中" | "探索" }) {
  return (
    <span className="inline-flex items-center gap-1 border border-[color:var(--color-cobalt)] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-cobalt)]">
      {value}可信
    </span>
  );
}

export function MetaRow({ grade, difficulty, importance }: { grade: string; difficulty: Difficulty; importance: number }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.1em] text-[color:var(--color-muted)]">
      <span>{grade}</span>
      <span className="inline-flex items-center gap-1.5">
        难度 <DifficultyBadge value={difficulty} />
      </span>
      <span className="inline-flex items-center gap-1.5">
        权重 <ImportanceBar value={importance} />
      </span>
    </div>
  );
}
