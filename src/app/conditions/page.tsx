import type { Metadata } from "next";
import ConditionReflex from "@/components/ConditionReflex";

export const metadata: Metadata = {
  title: "条件反射系统",
  description: "选择题目中出现的条件，系统推荐对应几何模型、推荐理由、辅助线画法与可信程度，支持多条件组合判断。",
};

export default async function ConditionsPage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string | string[] }>;
}) {
  const sp = await searchParams;
  const initial = sp.c ? (Array.isArray(sp.c) ? sp.c : [sp.c]) : [];
  return (
    <div>
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="absolute inset-0 grid-bg-dark opacity-50" />
        <div
          className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(56,189,248,0.4), transparent 70%)" }}
        />
        <div className="container-x relative py-12 sm:py-16">
          <p className="section-eyebrow text-sky-300">Condition Reflex</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">条件反射系统</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            几何高手看到条件就能想到模型。勾选题目中出现的条件（可多选），系统会根据规则库推荐可能使用的模型、
            推荐理由、适用条件、具体辅助线画法、添加后能得到什么，并给出可信程度。
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-[11px] text-slate-400">
            <span className="chip-dark">支持多条件组合</span>
            <span className="chip-dark">每条推荐都有辅助线画法</span>
            <span className="chip-dark">可信度分级：高 / 中 / 探索</span>
          </div>
        </div>
      </section>

      <div className="container-x py-10">
        <ConditionReflex initial={initial} />
      </div>
    </div>
  );
}
