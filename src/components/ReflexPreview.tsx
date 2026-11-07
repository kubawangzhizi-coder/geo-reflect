"use client";

import Link from "next/link";
import { useState } from "react";
import MathText from "./MathText";

export interface ReflexDemo {
  conditionId: string;
  label: string;
  recs: { id: string; name: string; confidence: "高" | "中" | "探索"; reason: string; aux: string; gain: string }[];
}

export default function ReflexPreview({ demos }: { demos: ReflexDemo[] }) {
  const [active, setActive] = useState(0);
  const current = demos[active];
  if (!current) return null;
  return (
    <div className="card-light overflow-hidden">
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 p-4">
        <span className="mr-1 text-xs font-semibold tracking-wider text-slate-500">题目出现</span>
        {demos.map((d, i) => (
          <button
            key={d.conditionId}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              i === active
                ? "border-sky-500 bg-sky-500 text-white shadow-sm"
                : "border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-700"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>
      <div className="p-4 sm:p-5">
        <div className="mb-3 flex items-center gap-2 text-[11px] text-slate-400">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-sky-500" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          系统联想到 {current.recs.length} 个模型，按可信度排序
        </div>
        <div className="space-y-2.5">
          {current.recs.map((r, i) => (
            <div key={r.id} className="group rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 transition hover:border-sky-200 hover:bg-white">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] font-bold text-slate-400">0{i + 1}</span>
                <Link href={`/models/${r.id}`} className="text-sm font-bold text-slate-900 group-hover:text-sky-700">
                  {r.name}
                </Link>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    r.confidence === "高"
                      ? "bg-emerald-50 text-emerald-700"
                      : r.confidence === "中"
                        ? "bg-sky-50 text-sky-700"
                        : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {r.confidence}可信
                </span>
                <Link href={`/models/${r.id}`} className="ml-auto text-[11px] text-sky-600 opacity-0 transition group-hover:opacity-100">
                  查看卡片 →
                </Link>
              </div>
              <MathText className="mt-1 block text-[12.5px] leading-5 text-slate-600" text={r.reason} />
              <MathText className="mt-0.5 block text-[12px] leading-5 text-amber-700/90" text={`辅助线：${r.aux}`} />
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">支持多条件组合判断，例如“中点＋线段相等”</span>
          <Link href="/conditions" className="text-xs font-semibold text-sky-600 hover:text-sky-700">
            打开完整条件反射 →
          </Link>
        </div>
      </div>
    </div>
  );
}
