"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import MathText from "./MathText";
import MiniFigure from "./MiniFigure";
import type { AuxStep, Difficulty } from "@/data/types";

export interface LabModel {
  id: string;
  name: string;
  summary: string;
  categoryLabel: string;
  color: string;
  figure: string;
  auxSteps: AuxStep[];
  newRelations: string[];
  whyAux: string;
  difficulty: Difficulty;
}

export default function LabBench({ models, initialId }: { models: LabModel[]; initialId: string }) {
  const [selectedId, setSelectedId] = useState(initialId);
  const model = models.find((m) => m.id === selectedId) ?? models[0];
  const maxStep = model.auxSteps.length;
  const [reveal, setReveal] = useState(maxStep);
  const [query, setQuery] = useState("");
  const [practice, setPractice] = useState(false);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setReveal(model.auxSteps.length);
    setPlaying(false);
  }, [model.id, model.auxSteps.length]);

  useEffect(() => {
    if (!playing) {
      if (timer.current) clearInterval(timer.current);
      return;
    }
    timer.current = setInterval(() => {
      setReveal((r) => {
        if (r >= model.auxSteps.length) {
          setPlaying(false);
          return r;
        }
        return r + 1;
      });
    }, 1100);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, model.auxSteps.length]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return models;
    return models.filter((m) =>
      [m.name, m.summary, m.categoryLabel].join(" ").toLowerCase().includes(q),
    );
  }, [models, query]);

  const activeSteps = model.auxSteps.filter((s) => s.step <= reveal);
  const nextStep = model.auxSteps.find((s) => s.step === reveal + 1);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="min-w-0 space-y-4">
        <div className="card-light overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: model.color }} />
              <span className="text-xs font-semibold tracking-wider text-slate-500">
                {model.categoryLabel} / 辅助线实验室
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setReveal(0);
                  setPlaying(false);
                }}
                className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition ${
                  reveal === 0 ? "bg-navy-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                原图
              </button>
              {model.auxSteps.map((s) => (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => {
                    setReveal(s.step);
                    setPlaying(false);
                  }}
                  data-lab-step={s.step}
                  className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition ${
                    reveal === s.step ? "bg-amber-500 text-white" : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                  }`}
                >
                  {s.step}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setReveal(0);
                  setPlaying(true);
                }}
                className="ml-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-50"
              >
                {playing ? "演示中…" : "自动演示"}
              </button>
            </div>
          </div>

          <div className="relative bg-white p-2 sm:p-4">
            <MiniFigure figure={model.figure} reveal={reveal} />
            <div className="pointer-events-none absolute bottom-3 left-4 rounded-lg border border-white/60 bg-white/85 px-2.5 py-1 text-[10px] text-slate-500 shadow-sm backdrop-blur">
              {reveal === 0 ? "原始图形：先观察已给条件" : `辅助线进度 ${reveal} / ${maxStep}`}
            </div>
          </div>

          <div className="border-t border-slate-100 px-4 py-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">
                {reveal === 0
                  ? "① 先看原图，想一想：题目给了什么？要证什么？"
                  : `② 第 ${reveal} 步：${model.auxSteps[reveal - 1]?.title ?? ""}`}
              </span>
              <span className="font-mono text-[10px] text-slate-400">{reveal} / {maxStep}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-500"
                style={{ width: `${maxStep ? (reveal / maxStep) * 100 : 0}%` }}
              />
            </div>
            {reveal > 0 && model.auxSteps[reveal - 1] && (
              <div className="mt-3 rounded-xl border border-amber-100 bg-amber-50/60 p-3">
                <MathText
                  className="block text-[12.5px] leading-6 text-amber-900/90"
                  text={model.auxSteps[reveal - 1].detail}
                />
                <MathText
                  className="mt-1 block text-[12px] leading-5 text-emerald-700"
                  text={`→ ${model.auxSteps[reveal - 1].gain}`}
                />
              </div>
            )}
            {nextStep && reveal > 0 && (
              <button
                type="button"
                onClick={() => setReveal(nextStep.step)}
                className="mt-2 text-[11px] font-semibold text-sky-600 hover:text-sky-700"
              >
                下一步：{nextStep.title} →
              </button>
            )}
          </div>
        </div>

        <div className="card-light p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-bold text-slate-900">辅助线步骤 · 练习模式</h2>
            <label className="inline-flex cursor-pointer items-center gap-2 text-[11px] text-slate-500">
              <input
                type="checkbox"
                checked={practice}
                onChange={(e) => setPractice(e.target.checked)}
                className="h-3.5 w-3.5 accent-sky-500"
              />
              先自己画，再看答案
            </label>
          </div>
          <ol className="mt-3 space-y-2">
            {model.auxSteps.map((s) => {
              const done = s.step <= reveal;
              const hidden = practice && !done;
              return (
                <li
                  key={s.step}
                  className={`rounded-xl border p-3 transition ${
                    done ? "border-amber-200 bg-amber-50/40" : "border-slate-100 bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`grid h-5 w-5 place-items-center rounded-full font-mono text-[10px] font-bold ${
                        done ? "bg-amber-500 text-white" : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {s.step}
                    </span>
                    <span className="text-[12.5px] font-semibold text-slate-800">{s.title}</span>
                    {!done && (
                      <button
                        type="button"
                        onClick={() => setReveal(s.step)}
                        className="ml-auto text-[10px] font-semibold text-sky-600 hover:text-sky-700"
                      >
                        显示此步
                      </button>
                    )}
                  </div>
                  <div className={`mt-1.5 text-[12px] leading-5 ${hidden ? "select-none text-slate-300 blur-[3px]" : "text-slate-600"}`}>
                    <MathText text={s.detail} />
                  </div>
                  <div className={`mt-1 text-[11.5px] leading-5 ${hidden ? "select-none text-slate-300 blur-[3px]" : "text-emerald-700"}`}>
                    <MathText text={`→ ${s.gain}`} />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* 右侧：选择模型 */}
      <aside className="space-y-4">
        <div className="card-light p-4">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-slate-400">SELECT MODEL</p>
          <h2 className="mt-1 text-sm font-bold text-slate-900">选择要练习的模型</h2>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索模型 / 分类…"
            className="mt-2.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none"
          />
          <div className="mt-2 max-h-[320px] space-y-1 overflow-y-auto pr-1 scrollbar-thin">
            {filtered.map((m) => {
              const active = m.id === model.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedId(m.id)}
                  data-lab-model={m.id}
                  className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left transition ${
                    active ? "bg-navy-800 text-white" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: active ? "#7dd3fc" : m.color }}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12px] font-medium">{m.name}</span>
                    <span className={`block text-[10px] ${active ? "text-slate-300" : "text-slate-400"}`}>
                      {m.categoryLabel}
                    </span>
                  </span>
                  <span className={`font-mono text-[10px] ${active ? "text-sky-300" : "text-slate-300"}`}>
                    {m.auxSteps.length}步
                  </span>
                </button>
              );
            })}
            {filtered.length === 0 && <p className="px-2 py-6 text-center text-xs text-slate-400">没有匹配的模型</p>}
          </div>
        </div>

        <div className="card-light p-4">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-slate-400">WHY</p>
          <h2 className="mt-1 text-sm font-bold text-slate-900">{model.name}</h2>
          <MathText className="mt-2 block text-[12.5px] leading-6 text-slate-600" text={model.whyAux} />
          <div className="mt-3 border-t border-slate-100 pt-3">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-slate-400">NEW RELATIONS</p>
            <ul className="mt-1.5 space-y-1.5">
              {model.newRelations.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-[12px] leading-5 text-slate-600">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-500" />
                  <MathText text={r} />
                </li>
              ))}
            </ul>
          </div>
          <Link
            href={`/models/${model.id}`}
            className="mt-4 flex items-center justify-center rounded-lg bg-navy-800 px-3 py-2 text-xs font-semibold text-white hover:bg-navy-700"
          >
            查看完整知识卡片 →
          </Link>
        </div>

        <div className="rounded-2xl border border-sky-100 bg-sky-50/60 p-4 text-[11.5px] leading-6 text-slate-600">
          <p className="font-semibold text-sky-700">实验室怎么用？</p>
          <p className="mt-1">
            ① 只看原图，判断条件；② 自己口述辅助线怎么画；③ 点步骤验证；④ 对照“得到”一栏，把新关系写进证明。
            4 到 5 步以上的模型建议分两次练习。
          </p>
        </div>
      </aside>
    </div>
  );
}
