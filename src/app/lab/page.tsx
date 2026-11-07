import type { Metadata } from "next";
import LabBench, { type LabModel } from "@/components/LabBench";
import { CATEGORY_MAP } from "@/data/categories";
import { MODELS, MODEL_STATS } from "@/data/models";

export const metadata: Metadata = {
  title: "辅助线实验室",
  description: "逐步显示几何模型的辅助线，观察每一步新增的线段与结论，训练辅助线构造能力。",
};

export default async function LabPage({
  searchParams,
}: {
  searchParams: Promise<{ model?: string }>;
}) {
  const sp = await searchParams;
  const labModels: LabModel[] = MODELS.map((m) => ({
    id: m.id,
    name: m.name,
    summary: m.summary,
    categoryLabel: CATEGORY_MAP[m.categories[0]]?.short ?? "几何",
    color: CATEGORY_MAP[m.categories[0]]?.color ?? "#38bdf8",
    figure: m.figure,
    auxSteps: m.auxSteps,
    newRelations: m.newRelations,
    whyAux: m.whyAux,
    difficulty: m.difficulty,
  }));
  const initial = labModels.some((m) => m.id === sp.model) ? (sp.model as string) : "handshake";

  return (
    <div>
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="absolute inset-0 grid-bg-dark opacity-50" />
        <div
          className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(245,182,66,0.35), transparent 70%)" }}
        />
        <div className="container-x relative py-12 sm:py-16">
          <p className="section-eyebrow text-amber-300">Auxiliary Line Lab</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">辅助线实验室</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            画辅助线不是碰运气。选择一个模型，从原图开始，逐步显示辅助线，观察每一步新增的线段、角与结论。
            先自己口述画法，再点开验证，效果最好。
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-[11px] text-slate-400">
            <span className="chip-dark">{MODEL_STATS.total} 个模型可练习</span>
            <span className="chip-dark">逐步显示 · 自动演示</span>
            <span className="chip-dark">练习模式：先画后看</span>
          </div>
        </div>
      </section>
      <div className="container-x py-10">
        <LabBench models={labModels} initialId={initial} />
      </div>
    </div>
  );
}
