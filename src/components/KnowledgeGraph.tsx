"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CATEGORIES, CATEGORY_MAP } from "@/data/categories";
import { MODELS } from "@/data/models";
import type { CategoryId } from "@/data/types";
import type { GraphData, GraphNode } from "@/lib/graph";
import { neighborIds } from "@/lib/graph";

export default function KnowledgeGraph({ data }: { data: GraphData }) {
  const [category, setCategory] = useState<"all" | CategoryId>("all");
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [showAllLabels, setShowAllLabels] = useState(false);

  const focus = selected ?? hovered;
  const neighbors = useMemo(() => (focus ? neighborIds(data, focus) : new Set<string>()), [data, focus]);
  const nodeMap = useMemo(() => Object.fromEntries(data.nodes.map((n) => [n.id, n])), [data]);
  const focusModel = focus ? MODELS.find((m) => m.id === focus) : undefined;

  const dimmed = (n: GraphNode) => category !== "all" && n.category !== category;
  const related = focus ? data.nodes.filter((n) => neighbors.has(n.id) || n.id === focus) : [];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0">
        <div className="card-light overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-3.5">
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setCategory("all")}
                className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${
                  category === "all" ? "border-navy-800 bg-navy-800 text-white" : "border-slate-200 text-slate-600 hover:border-sky-300"
                }`}
              >
                全部
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(category === c.id ? "all" : c.id)}
                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${
                    category === c.id ? "text-white" : "border-slate-200 bg-white text-slate-600 hover:border-sky-300"
                  }`}
                  style={category === c.id ? { backgroundColor: "var(--color-cobalt)", borderColor: "var(--color-cobalt)" } : undefined}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: category === c.id ? "var(--color-paper)" : "var(--color-cobalt)" }} />
                  {c.short}
                </button>
              ))}
            </div>
            <label className="inline-flex cursor-pointer items-center gap-1.5 text-[11px] text-slate-500">
              <input
                type="checkbox"
                checked={showAllLabels}
                onChange={(e) => setShowAllLabels(e.target.checked)}
                className="h-3.5 w-3.5 accent-sky-500"
              />
              显示全部标签
            </label>
          </div>

          <div className="overflow-x-auto bg-[color:var(--color-paper)] p-2 scrollbar-thin">
            <svg
              viewBox="0 0 1200 860"
              className="min-w-[760px]"
              role="img"
              aria-label="几何模型知识图谱"
              onMouseLeave={() => setHovered(null)}
            >
              <defs>
                <radialGradient id="clusterGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#dbeafe" stopOpacity="0" />
                </radialGradient>
              </defs>

              {data.clusters.map((c) => (
                <g key={c.id} opacity={category === "all" || category === c.id ? 1 : 0.25}>
                  <circle cx={c.x} cy={c.y} r={150} fill="url(#clusterGlow)" />
                  <circle cx={c.x} cy={c.y} r={132} fill="none" stroke="var(--color-cobalt)" strokeOpacity="0.18" strokeDasharray="4 6" />
                  <text x={c.x} y={c.y - 145} textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--color-cobalt)" opacity="0.8">
                    {c.short}
                  </text>
                  <text x={c.x} y={c.y - 126} textAnchor="middle" fontSize="10.5" fill="var(--color-muted)">
                    {c.count} models
                  </text>
                </g>
              ))}

              {data.edges.map((e) => {
                const a = nodeMap[e.a];
                const b = nodeMap[e.b];
                if (!a || !b) return null;
                const active = focus && (e.a === focus || e.b === focus);
                const visible = !dimmed(a) && !dimmed(b);
                if (!visible) return null;
                return (
                  <line
                    key={`${e.a}|${e.b}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={active ? "var(--color-cobalt)" : "var(--color-muted)"}
                    strokeOpacity={active ? 0.9 : focus ? 0.12 : 0.22}
                    strokeWidth={active ? 1.8 : 1}
                  />
                );
              })}

              {data.nodes.map((n) => {
                const isDim = dimmed(n);
                const isFocus = n.id === focus;
                const isNeighbor = neighbors.has(n.id);
                const labelVisible =
                  showAllLabels || n.importance >= 5 || isFocus || isNeighbor || category !== "all";
                const op = isDim ? 0.14 : focus ? (isFocus ? 1 : isNeighbor ? 1 : 0.28) : 1;
                return (
                  <g
                    key={n.id}
                    opacity={op}
                    className="cursor-pointer"
                    data-node={n.id}
                    onMouseEnter={() => setHovered(n.id)}
                    onClick={() => setSelected(selected === n.id ? null : n.id)}
                  >
                    <circle cx={n.x} cy={n.y} r={n.r + 9} fill="transparent" />
                    {isFocus && <circle cx={n.x} cy={n.y} r={n.r + 6} fill="none" stroke="var(--color-cobalt)" strokeWidth="1.4" opacity="0.6" />}
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={n.r}
                      fill={isFocus ? "var(--color-cobalt)" : "var(--color-sheet)"}
                      stroke="var(--color-cobalt)"
                      strokeWidth={isFocus ? 2.6 : 1.8}
                    />
                    {labelVisible && (
                      <text
                        x={n.x}
                        y={n.y - n.r - 7}
                        textAnchor="middle"
                        fontSize={isFocus ? 12.5 : 10.5}
                        fontWeight={isFocus ? 700 : 500}
                        fill={isFocus ? "#0b1730" : "#475569"}
                        style={{ paintOrder: "stroke", stroke: "var(--color-paper)", strokeWidth: 3 }}
                      >
                        {n.short}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="border-t border-slate-100 px-4 py-2.5 text-[11px] text-slate-400">
            点击节点查看模型与关联关系；节点大小代表考试权重，连线代表关联模型。
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <div key={c.id} className="card-light p-4">
              <p className="flex items-center gap-2 text-[12px] font-bold text-slate-800">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--color-cobalt)" }} />
                {c.short}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {MODELS.filter((m) => m.categories.includes(c.id)).map((m) => (
                  <Link
                    key={m.id}
                    href={`/models/${m.id}`}
                    className="rounded-md border border-slate-100 bg-slate-50 px-2 py-1 text-[10.5px] text-slate-600 hover:border-sky-300 hover:text-sky-700"
                  >
                    {m.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="card-light p-4">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-slate-400">NODE INSPECTOR</p>
          {focusModel ? (
            <div className="mt-2">
              <p className="text-[10px] font-medium" style={{ color: "var(--color-cobalt)" }}>
                {CATEGORY_MAP[focusModel.categories[0]]?.name}
              </p>
              <h2 className="mt-0.5 text-base font-bold text-slate-900">{focusModel.name}</h2>
              <p className="mt-1.5 line-clamp-3 text-[12px] leading-5 text-slate-500">
                {focusModel.summary.replace(/\$[^$]*\$/g, "")}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {focusModel.tags.slice(0, 4).map((t) => (
                  <span key={t} className="chip text-[10px]">{t}</span>
                ))}
              </div>
              <div className="mt-4 border-t border-slate-100 pt-3">
                <p className="text-[10px] font-semibold tracking-wider text-slate-400">关联模型</p>
                <div className="mt-1.5 grid gap-1">
                  {related
                    .filter((n) => n.id !== focus)
                    .slice(0, 8)
                    .map((n) => (
                      <button
                        key={n.id}
                        type="button"
                        onMouseEnter={() => setHovered(n.id)}
                        onClick={() => setSelected(n.id)}
                        className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[11.5px] text-slate-600 hover:bg-slate-50 hover:text-sky-700"
                      >
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--color-cobalt)" }} />
                        {n.name}
                      </button>
                    ))}
                </div>
              </div>
              <Link
                href={`/models/${focusModel.id}`}
                className="mt-4 flex items-center justify-center rounded-lg bg-navy-800 px-3 py-2 text-xs font-semibold text-white hover:bg-navy-700"
              >
                打开知识卡片 →
              </Link>
            </div>
          ) : (
            <div className="mt-2">
              <h2 className="text-sm font-bold text-slate-900">点击任意节点</h2>
              <p className="mt-1 text-[12px] leading-5 text-slate-500">
                图谱展示模型之间的关联关系。把鼠标移到节点上可以高亮它的邻居；点击节点会在这里显示详细信息。
              </p>
              <div className="mt-4 space-y-2">
                {CATEGORIES.map((c) => (
                  <div key={c.id} className="flex items-center justify-between text-[11px]">
                    <span className="inline-flex items-center gap-1.5 text-slate-600">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--color-cobalt)" }} />
                      {c.short}
                    </span>
                    <span className="font-mono text-slate-400">{MODELS.filter((m) => m.categories.includes(c.id)).length}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 rounded-2xl border border-sky-100 bg-sky-50/60 p-4 text-[11.5px] leading-6 text-slate-600">
          <p className="font-semibold text-sky-700">怎么用知识图谱？</p>
          <p className="mt-1">
            先从最核心的节点（手拉手、倍长中线、三线合一、将军饮马）出发，沿着连线找到它们的“邻居模型”，
            这样记住的不是孤立的模型，而是一张可以互相转化的知识网络。
          </p>
          <Link href="/conditions" className="mt-2 inline-block font-semibold text-sky-700 hover:text-sky-800">
            用条件查找模型 →
          </Link>
        </div>
      </aside>
    </div>
  );
}
