"use client";

import { useMemo, useState } from "react";
import ModelCard from "@/components/ModelCard";
import { CATEGORIES } from "@/data/categories";
import type { CategoryId, Difficulty } from "@/data/types";
import type { ModelPreview } from "@/lib/preview";

const SORTS = [
  { id: "importance", label: "按考试权重" },
  { id: "difficulty", label: "按难度" },
  { id: "name", label: "按名称" },
] as const;

export default function ModelBrowser({
  models,
  initialCategory = "all",
  initialQuery = "",
}: {
  models: ModelPreview[];
  initialCategory?: string;
  initialQuery?: string;
}) {
  const [category, setCategory] = useState<string>(initialCategory);
  const [query, setQuery] = useState(initialQuery);
  const [difficulty, setDifficulty] = useState<"all" | Difficulty>("all");
  const [sort, setSort] = useState<(typeof SORTS)[number]["id"]>("importance");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = models.filter((m) => {
      if (category !== "all" && !m.categories.includes(category as CategoryId)) return false;
      if (difficulty !== "all" && m.difficulty !== difficulty) return false;
      if (!q) return true;
      const hay = [m.name, ...m.alias, m.summary, m.mnemonic, ...m.tags].join(" ").toLowerCase();
      return hay.includes(q);
    });
    list = [...list].sort((a, b) => {
      if (sort === "difficulty") return b.difficulty - a.difficulty || b.importance - a.importance;
      if (sort === "name") return a.name.localeCompare(b.name, "zh-Hans-CN");
      return b.importance - a.importance || a.difficulty - b.difficulty;
    });
    return list;
  }, [models, category, query, difficulty, sort]);

  return (
    <div>
      <div className="border border-[color:var(--color-rule-soft)] bg-[color:var(--color-sheet)] p-4 sm:p-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1 border-b border-[color:var(--color-rule)]">
              <span className="lbl absolute left-0 top-1/2 -translate-y-1/2 text-[color:var(--color-cobalt)]">SEARCH</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                data-testid="model-search"
                placeholder="模型名称、关键词，例如：手拉手、中点、45°…"
                className="w-full bg-transparent py-2.5 pl-[68px] pr-3 text-sm text-[color:var(--color-ink)] placeholder:text-[color:var(--color-muted)] focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as "all" | Difficulty)}
                className="border border-[color:var(--color-rule-soft)] bg-transparent px-3 py-2 text-[11px] tracking-[0.06em] text-[color:var(--color-ink)] focus:border-[color:var(--color-cobalt)] focus:outline-none"
                aria-label="按难度筛选"
              >
                <option value="all">全部难度</option>
                <option value="1">入门</option>
                <option value="2">进阶</option>
                <option value="3">挑战</option>
              </select>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as (typeof SORTS)[number]["id"])}
                className="border border-[color:var(--color-rule-soft)] bg-transparent px-3 py-2 text-[11px] tracking-[0.06em] text-[color:var(--color-ink)] focus:border-[color:var(--color-cobalt)] focus:outline-none"
                aria-label="排序方式"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              data-cursor="btn"
              onClick={() => setCategory("all")}
              className="inline-flex items-center gap-1.5 border px-3 py-1.5 text-[10px] uppercase tracking-[0.12em]"
              style={
                category === "all"
                  ? { background: "var(--color-ink)", borderColor: "var(--color-ink)", color: "var(--color-paper)" }
                  : { background: "transparent", borderColor: "var(--color-rule-soft)", color: "var(--color-ink)" }
              }
            >
              全部 <span className="opacity-60">{models.length}</span>
            </button>
            {CATEGORIES.map((c) => {
              const count = models.filter((m) => m.categories.includes(c.id)).length;
              const active = category === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  data-cursor="btn"
                  onClick={() => setCategory(c.id)}
                  className="inline-flex items-center gap-1.5 border px-3 py-1.5 text-[10px] tracking-[0.1em]"
                  style={
                    active
                      ? { background: "var(--color-cobalt)", borderColor: "var(--color-cobalt)", color: "var(--color-paper)" }
                      : { background: "transparent", borderColor: "var(--color-rule-soft)", color: "var(--color-ink)" }
                  }
                >
                  {c.short}
                  <span className="opacity-60">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.12em] text-[color:var(--color-muted)]">
        <span>
          共 <strong className="font-semibold text-[color:var(--color-ink)]">{filtered.length}</strong> 个模型
        </span>
        {(category !== "all" || difficulty !== "all" || query) && (
          <button
            type="button"
            onClick={() => {
              setCategory("all");
              setDifficulty("all");
              setQuery("");
            }}
            className="text-[color:var(--color-cobalt)] hover:underline"
          >
            清除筛选
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6 grid place-items-center border border-[color:var(--color-rule-soft)] p-14 text-center">
          <p className="text-sm text-[color:var(--color-ink)]">没有匹配的模型</p>
          <p className="mt-1 text-[11px] text-[color:var(--color-muted)]">试试更短的关键词，或清除筛选条件。</p>
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <div key={m.id} data-testid="model-card">
              <ModelCard model={m} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
