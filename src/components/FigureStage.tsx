"use client";

import { useMemo, useState } from "react";
import GeometryFigure from "./GeometryFigure";
import MathText from "./MathText";
import { buildFigure } from "@/lib/figures";
import type { AuxStep } from "@/data/types";

export default function FigureStage({
  figure,
  auxSteps,
  name,
  newRelations,
}: {
  figure: string;
  auxSteps: AuxStep[];
  name: string;
  newRelations: string[];
}) {
  const spec = useMemo(() => buildFigure(figure), [figure]);
  const max = auxSteps.length;
  const [reveal, setReveal] = useState(max);
  const active = auxSteps.filter((s) => s.step <= reveal);

  return (
    <div className="card-light overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <span className="text-xs font-semibold tracking-wider text-slate-500">标准几何图形 · 辅助线演示</span>
        <span className="font-mono text-[11px] text-slate-400">{reveal === 0 ? "原图" : `已显示 ${reveal} 步`}</span>
      </div>
      <div className="bg-white p-2">
        <GeometryFigure spec={spec} reveal={reveal} />
      </div>
      <div className="flex flex-wrap items-center gap-1.5 border-t border-slate-100 px-3 py-2.5">
        <button
          type="button"
          onClick={() => setReveal(0)}
          data-aux-step={0}
          className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition ${
            reveal === 0 ? "bg-navy-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          只看原图
        </button>
        {auxSteps.map((s) => (
          <button
            key={s.step}
            type="button"
            onClick={() => setReveal(s.step)}
            data-aux-step={s.step}
            className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition ${
              reveal === s.step ? "bg-amber-500 text-white" : "bg-amber-50 text-amber-700 hover:bg-amber-100"
            }`}
            title={s.title}
          >
    辅助线 {s.step}
          </button>
        ))}
        {max > 0 && (
          <button
            type="button"
            onClick={() => setReveal(max)}
            className="ml-auto rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-50"
          >
            全部显示
          </button>
        )}
      </div>
      {active.length > 0 && (
        <div className="space-y-2 border-t border-slate-100 bg-slate-50/60 px-4 py-3">
          {active.map((s) => (
            <div key={s.step} className="text-xs leading-5">
              <span className="mr-1.5 font-mono text-[10px] font-bold text-amber-600">STEP {s.step}</span>
                    <span className="text-[12.5px] font-semibold text-slate-800">
                      <MathText text={s.title} />
                    </span>
              <MathText className="text-slate-600" text={`：${s.detail}`} />
              <MathText className="block text-slate-500" text={`→ ${s.gain}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
