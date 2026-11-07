"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import MathText from "./MathText";
import RecCard from "./RecCard";
import { CONDITIONS, CONDITION_GROUPS, CONDITION_MAP, PRESET_COMBOS } from "@/data/conditions";
import { recommend } from "@/lib/reflex";

export default function ConditionReflex({ initial = [] }: { initial?: string[] }) {
  const [selected, setSelected] = useState<string[]>(initial);

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const recs = useMemo(() => recommend(selected, 10), [selected]);
  const grouped = useMemo(() => {
    const out: Record<string, typeof CONDITIONS> = {};
    for (const g of CONDITION_GROUPS) out[g] = CONDITIONS.filter((c) => c.group === g);
    return out;
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="min-w-0 space-y-5">
        <div className="card-light p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-bold text-slate-900">① 选择题目中出现的条件</h2>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              已选 <strong className="font-mono text-sky-600">{selected.length}</strong> 个
              {selected.length > 0 && (
                <button type="button" onClick={() => setSelected([])} className="text-slate-500 hover:text-rose-600">
                  清空
                </button>
              )}
            </div>
          </div>
          <div className="mt-4 space-y-4">
            {CONDITION_GROUPS.map((g) => (
              <div key={g}>
                <p className="mb-2 text-[11px] font-semibold tracking-wider text-slate-400">
                  {g}
                  <span className="ml-1.5 font-normal normal-case tracking-normal text-slate-300">
                    {grouped[g].length} 项
                  </span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {grouped[g].map((c) => {
                    const active = selected.includes(c.id);
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => toggle(c.id)}
                        title={c.desc}
                        aria-pressed={active}
                        data-condition={c.id}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                          active
                            ? "border-sky-500 bg-sky-500 text-white shadow-[0_4px_14px_-6px_rgba(14,165,233,0.8)]"
                            : "border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-700"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-white" : "bg-sky-400"}`} />
                        {c.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">② 系统推荐的模型与辅助线</h2>
          <span className="text-[11px] text-slate-400">{recs.length} 条结果</span>
        </div>

        {selected.length === 0 ? (
          <div className="card-light grid place-items-center p-12 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-50 text-sky-500">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
            </span>
            <p className="mt-3 text-sm font-semibold text-slate-800">先勾选至少一个条件</p>
            <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500">
              例如勾选“中点”，系统会推荐倍长中线、中位线、斜边中线等；再勾选“两条线段相等”即可进一步聚焦。
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {["中点", "角平分线", "45°", "60°", "垂直", "线段和差"].map((t) => {
                const c = CONDITIONS.find((x) => x.label.includes(t));
                return c ? (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggle(c.id)}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 hover:border-sky-300 hover:text-sky-700"
                  >
                    {c.label}
                  </button>
                ) : null;
              })}
            </div>
          </div>
        ) : recs.length === 0 ? (
          <div className="card-light p-8 text-center">
            <p className="text-sm font-semibold text-slate-800">这组条件暂时没有匹配的模型</p>
            <p className="mt-1 text-xs text-slate-500">再增加一个条件（例如角度、垂直、平行或结论目标）后重试。</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recs.map((r, i) => (
              <RecCard key={r.model.id} rec={r} rank={i + 1} />
            ))}
          </div>
        )}

        {selected.length > 0 && recs.length > 0 && (
          <div className="rounded-xl border border-sky-100 bg-sky-50/50 p-4 text-xs leading-6 text-slate-600">
            <p className="font-semibold text-sky-700">怎么用这些推荐？</p>
            <p className="mt-1">
              可信度“高”表示当前条件与模型成立条件高度吻合，优先尝试；“中”表示还需要补充条件或核对图形位置；“探索”表示这是一种可能的思路，需要自行验证。
              推荐结果用于启发，最终必须以题目图形和已知条件为准写出完整证明。
            </p>
          </div>
        )}
      </div>

      {/* 侧栏 */}
      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <div className="card-light p-4">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-slate-400">SELECTED</p>
          <h3 className="mt-1 text-sm font-bold text-slate-900">已选条件</h3>
          {selected.length === 0 ? (
            <p className="mt-2 text-xs leading-5 text-slate-500">还没有选择条件。可以从左侧挑选，或直接使用下方组合。</p>
          ) : (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {selected.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggle(id)}
                  className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-medium text-sky-700 ring-1 ring-sky-200 hover:bg-sky-100"
                  title="点击移除"
                >
                  {CONDITION_MAP[id]?.label ?? id}
                  <span className="text-sky-400">×</span>
                </button>
              ))}
            </div>
          )}
          <div className="mt-4 border-t border-slate-100 pt-3">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-slate-400">PRESETS</p>
            <div className="mt-2 grid gap-1.5">
              {PRESET_COMBOS.map((p) => (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => setSelected(p.conditions)}
                  className="group rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-2 text-left transition hover:border-sky-200 hover:bg-white"
                >
                  <span className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-slate-700 group-hover:text-sky-700">{p.title}</span>
                    <span className="text-[10px] text-slate-400">套用</span>
                  </span>
                  <span className="mt-0.5 block text-[10.5px] text-slate-400">{p.note}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="card-light bg-gradient-to-br from-navy-900 to-navy-800 p-4 text-white">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-sky-300/80">REFLEX DRILL</p>
          <p className="mt-1.5 text-sm font-bold">把条件反射练成直觉</p>
          <p className="mt-1 text-[11px] leading-5 text-slate-300">
            每做一道题，先不急着写，先在草稿上列出“题目给了哪些条件”，再对照本页看能联想到哪些模型。
          </p>
          <Link
            href="/analyze"
            className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-sky-500 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-400"
          >
            用题干自动提取条件 →
          </Link>
        </div>

        <div className="card-light p-4">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-slate-400">MAP</p>
          <h3 className="mt-1 text-sm font-bold text-slate-900">按知识点浏览</h3>
          <div className="mt-2 grid gap-1">
            {(["midpoint", "angle-bisector", "angle-45", "angle-60", "perpendicular", "two-sides-equal", "common-vertex", "sum-difference", "parallel"] as const).map(
              (id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelected([id])}
                  className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-[12px] text-slate-600 hover:bg-slate-50 hover:text-sky-700"
                >
                  <span>{CONDITION_MAP[id]?.label}</span>
                  <span className="font-mono text-[10px] text-slate-300">→</span>
                </button>
              ),
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
