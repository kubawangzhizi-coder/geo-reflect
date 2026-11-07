"use client";

import Link from "next/link";
import { useState } from "react";
import MathText from "./MathText";
import RecCard from "./RecCard";
import { EXAMPLE_PROBLEMS, analyzeProblem, type AnalysisResult } from "@/lib/analyzer";

const EXAMPLES = EXAMPLE_PROBLEMS;

export default function Analyzer() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const run = (input?: string) => {
    const t = (input ?? text).trim();
    if (!t) return;
    setText(t);
    setResult(analyzeProblem(t));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="min-w-0 space-y-5">
        <div className="card-light p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">粘贴一道几何题</h2>
            <span className="text-[11px] text-slate-400">支持条件关键词与结论目标识别</span>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            data-testid="problem-input"
            placeholder="例如：在 △ABC 中，D 是 BC 的中点，AD 平分 ∠BAC，∠B=2∠C，求证 AC=AB+BD。"
            className="mt-3 w-full resize-y rounded-xl border border-slate-200 bg-white p-3.5 text-[13.5px] leading-7 text-slate-700 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
          />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => run()} data-testid="analyze-btn" className="btn-primary !px-4 !py-2.5 text-xs">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              分析题干
            </button>
            <button
              type="button"
              onClick={() => {
                setText("");
                setResult(null);
              }}
              className="rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-500 hover:bg-slate-50"
            >
              清空
            </button>
            <span className="text-[11px] text-slate-400">提示：把“中点、角平分线、垂直、平行、特殊角”等条件写完整，识别更准。</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="text-[11px] text-slate-400">试试示例：</span>
            {EXAMPLES.map((e) => (
              <button
                key={e.title}
                type="button"
                onClick={() => run(e.text)}
                className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-600 hover:border-sky-300 hover:text-sky-700"
              >
                {e.title}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div className="space-y-4" data-testid="analysis-result">
            <div className="rounded-2xl bg-navy-900 p-5 text-white">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold tracking-[0.2em] text-sky-300/80">ANALYSIS REPORT</p>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-slate-300">规则引擎 · 启发式</span>
              </div>
              <MathText className="mt-2 block text-[13.5px] font-medium leading-7 text-slate-100" text={result.summary} />
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                  <p className="text-[10px] tracking-wider text-slate-400">识别到的条件</p>
                  <p className="mt-1 text-xs leading-6 text-slate-200">
                    {result.hits.length ? result.hits.map((h) => h.condition.label).join(" · ") : "未识别到"}
                  </p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                  <p className="text-[10px] tracking-wider text-slate-400">推荐模型</p>
                  <p className="mt-1 text-xs leading-6 text-slate-200">
                    {result.recommendations.length
                      ? result.recommendations.slice(0, 3).map((r) => r.model.name).join(" · ")
                      : "暂无"}
                  </p>
                </div>
              </div>
            </div>

            {result.hits.length > 0 && (
              <div className="card-light p-4">
                <h3 className="text-sm font-bold text-slate-900">条件提取明细</h3>
                <p className="mt-1 text-[11px] text-slate-400">括号内是题干中的定位片段，便于核对是否识别准确。</p>
                <div className="mt-3 grid gap-2">
                  {result.hits.map((h) => (
                    <div key={h.condition.id} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold text-sky-700 ring-1 ring-sky-100">
                          {h.condition.label}
                        </span>
                        <span className="text-[10px] text-slate-400">{h.condition.group}</span>
                        <span className="ml-auto font-mono text-[10px] text-slate-300">score {h.score.toFixed(1)}</span>
                      </div>
                      <p className="mt-1.5 text-[11.5px] leading-5 text-slate-500">
                        {h.condition.desc}
                        {h.evidence.length > 0 && (
                          <span className="ml-1 text-slate-400">｜定位：{h.evidence.slice(0, 2).join("；")}</span>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.recommendations.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900">推荐模型与辅助线</h3>
                {result.recommendations.map((r, i) => (
                  <RecCard key={r.model.id} rec={r} rank={i + 1} />
                ))}
              </div>
            )}

            <div className="card-light p-4">
              <h3 className="text-sm font-bold text-slate-900">建议推理路径</h3>
              <ol className="mt-3 space-y-3">
                {result.path.map((p) => (
                  <li key={p.title} className="flex gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-sky-50 text-[10px] font-bold text-sky-600">
                      {p.title.slice(0, 1)}
                    </span>
                    <div>
                      <p className="text-[12.5px] font-semibold text-slate-800">{p.title}</p>
                      <MathText className="mt-0.5 block text-[12px] leading-6 text-slate-500" text={p.detail} />
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
              <p className="text-[10px] font-semibold tracking-wider text-amber-700">注意事项</p>
              <ul className="mt-1.5 space-y-1">
                {result.notes.map((n, i) => (
                  <li key={i} className="flex items-start gap-2 text-[12px] leading-6 text-amber-900/90">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {!result && (
          <div className="card-light p-8 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-sky-50 text-sky-500">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M4 5h16M4 12h10M4 19h7" strokeLinecap="round" />
                <circle cx="18" cy="16" r="3" />
                <path d="m21 19 1.5 1.5" strokeLinecap="round" />
              </svg>
            </span>
            <p className="mt-3 text-sm font-semibold text-slate-800">输入题干，自动提取条件</p>
            <p className="mx-auto mt-1 max-w-md text-xs leading-6 text-slate-500">
              系统会识别中点、角平分线、垂直、平行、45°、60°、共顶点、线段和差等信号，并给出推荐模型、辅助线与推理路径。
              这是规则匹配工具，用于启发思路，不能替代完整证明。
            </p>
          </div>
        )}
      </div>

      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <div className="card-light p-4">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-slate-400">HOW IT WORKS</p>
          <h2 className="mt-1 text-sm font-bold text-slate-900">分析器的工作原理</h2>
          <ol className="mt-2.5 space-y-2 text-[11.5px] leading-5 text-slate-500">
            {[
              "识别题干中的条件关键词与数字角度。",
              "把条件映射到条件反射规则库。",
              "按匹配度给模型打分，并生成辅助线建议。",
              "输出推理路径与易错提示。",
            ].map((t, i) => (
              <li key={i} className="flex gap-2">
                <span className="font-mono text-[10px] text-sky-500">0{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>
          <div className="mt-3 rounded-lg border border-slate-100 bg-slate-50 p-2.5 text-[11px] leading-5 text-slate-500">
            识别是规则匹配，遇到生僻表述可能漏识别；建议先对照
            <Link href="/conditions" className="mx-0.5 font-semibold text-sky-600 hover:text-sky-700">条件反射系统</Link>
            手动勾选条件。
          </div>
        </div>

        <div className="card-light p-4">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-slate-400">TIPS</p>
          <h2 className="mt-1 text-sm font-bold text-slate-900">让识别更准的写法</h2>
          <ul className="mt-2 space-y-1.5 text-[11.5px] leading-5 text-slate-500">
            {[
              "写清“D 是 BC 的中点”“AD 平分 ∠BAC”。",
              "角度用“45°、60°、90°”或“直角”表示。",
              "结论写成“求证 AB=CD”“求证 AD⊥BC”。",
              "出现辅助线背景时写明“以 AB 为边作等边三角形”。",
            ].map((t) => (
              <li key={t} className="flex items-start gap-1.5">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sky-400" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <Link href="/lab" className="card-light flex items-center justify-between p-4 transition hover:border-amber-300">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-slate-400">NEXT STEP</p>
            <p className="mt-1 text-sm font-bold text-slate-900">去实验室验证辅助线</p>
            <p className="mt-0.5 text-[11px] text-slate-500">逐步显示，边看边想</p>
          </div>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-amber-50 text-amber-600">→</span>
        </Link>
      </aside>
    </div>
  );
}
