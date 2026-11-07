"use client";

import Link from "next/link";
import MathText from "./MathText";
import { ConfidencePill } from "./Badges";
import type { Recommendation } from "@/data/types";
import { CONDITION_MAP } from "@/data/conditions";

export default function RecCard({ rec, rank }: { rec: Recommendation; rank: number }) {
  const meter = Math.round((rec.score / 5) * 100);
  return (
    <div className="card-light overflow-hidden transition hover:border-sky-200" data-testid="rec-card">
      <div className="flex flex-wrap items-center gap-2.5 border-b border-slate-100 bg-slate-50/60 px-4 py-3">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-navy-800 font-mono text-[11px] font-bold text-white">
          {String(rank).padStart(2, "0")}
        </span>
        <Link href={`/models/${rec.model.id}`} className="text-[15px] font-bold text-slate-900 hover:text-sky-700">
          {rec.model.name}
        </Link>
        <ConfidencePill value={rec.confidence} />
        <span className="ml-auto flex items-center gap-2 text-[10px] text-slate-400">
          匹配度
          <span className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-200">
            <span className="block h-full rounded-full bg-gradient-to-r from-sky-400 to-sky-600" style={{ width: `${meter}%` }} />
          </span>
          <span className="font-mono">{rec.score.toFixed(1)}</span>
        </span>
      </div>
      <div className="space-y-2.5 p-4">
        <div>
          <p className="text-[10px] font-semibold tracking-wider text-slate-400">推荐理由</p>
          <MathText className="mt-0.5 block text-[13px] leading-6 text-slate-700" text={rec.rule.reason} />
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-3">
            <p className="text-[10px] font-semibold tracking-wider text-slate-400">适用条件</p>
            <MathText className="mt-0.5 block text-[12px] leading-5 text-slate-600" text={rec.rule.applicable} />
          </div>
          <div className="rounded-lg border border-amber-100 bg-amber-50/60 p-3">
            <p className="text-[10px] font-semibold tracking-wider text-amber-600">具体辅助线画法</p>
            <MathText className="mt-0.5 block text-[12px] leading-5 text-amber-800/90" text={rec.rule.aux} />
          </div>
        </div>
        <div className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-3">
          <p className="text-[10px] font-semibold tracking-wider text-emerald-600">添加后能够得到什么</p>
          <MathText className="mt-0.5 block text-[12px] leading-5 text-emerald-800/90" text={rec.rule.gain} />
        </div>
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          {rec.matched.map((id) => (
            <span key={id} className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 ring-1 ring-emerald-200">
              ✓ {CONDITION_MAP[id]?.label ?? id}
            </span>
          ))}
          {rec.missing.map((id) => (
            <span key={id} className="rounded-full bg-slate-50 px-2 py-0.5 text-[10px] text-slate-400 ring-1 ring-slate-200">
              缺少：{CONDITION_MAP[id]?.label ?? id}
            </span>
          ))}
          <Link href={`/models/${rec.model.id}`} className="ml-auto text-[11px] font-semibold text-sky-600 hover:text-sky-700">
            查看完整卡片 →
          </Link>
        </div>
      </div>
    </div>
  );
}
