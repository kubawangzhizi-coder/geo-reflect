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
      <div className="card-light p-4 sm:p-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <svg
                viewBox="0 0 24 24"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                data-testid="model-search"
                placeholder="搜索模型名称、关键词，例如：手拉手、中点、45°…"
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as "all" | Difficulty)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-600 focus:border-sky-400 focus:outline-none"
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
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-600 focus:border-sky-400 focus:outline-none"
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
              onClick={() => setCategory("all")}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                category === "all"
                  ? "border-navy-800 bg-navy-800 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-sky-300"
              }`}
            >
              全部 <span className="ml-0.5 opacity-70">{models.length}</span>
            </button>
            {CATEGORIES.map((c) => {
              const count = models.filter((m) => m.categories.includes(c.id)).length;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    category === c.id ? "text-white shadow-sm" : "border-slate-200 bg-white text-slate-600 hover:border-sky-300"
                  }`}
                  style={category === c.id ? { backgroundColor: c.accent, borderColor: c.accent } : undefined}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: category === c.id ? "#fff" : c.color }}
                  />
                  {c.short}
                  <span className="opacity-60">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
        <span>
          共 <strong className="font-semibold text-slate-700">{filtered.length}</strong> 个模型
        </span>
        {(category !== "all" || difficulty !== "all" || query) && (
          <button
            type="button"
            onClick={() => {
              setCategory("all");
              setDifficulty("all");
              setQuery("");
            }}
            className="text-sky-600 hover:text-sky-700"
          >
            清除筛选
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="card-light mt-6 grid place-items-center p-14 text-center">
          <p className="text-sm font-semibold text-slate-700">没有匹配的模型</p>
          <p className="mt-1 text-xs text-slate-500">试试更短的关键词，或清除筛选条件。</p>
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
