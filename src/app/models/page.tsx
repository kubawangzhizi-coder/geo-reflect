import type { Metadata } from "next";
import ModelBrowser from "@/components/ModelBrowser";
import { CATEGORIES } from "@/data/categories";
import { MODELS, MODEL_STATS } from "@/data/models";
import { toPreview } from "@/lib/preview";

export const metadata: Metadata = {
  title: "模型库",
  description: "六大分类、48 个初中几何模型的标准知识卡片，含辅助线画法、推导与证明。",
};

export default async function ModelsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const previews = MODELS.map(toPreview);
  return (
    <div className="container-x py-10 sm:py-12">
      <nav className="flex items-center gap-2 text-xs text-slate-400" aria-label="面包屑">
        <a href="/" className="hover:text-slate-600">首页</a>
        <span>/</span>
        <span className="text-slate-600">模型库</span>
      </nav>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="section-eyebrow">Model Library</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">几何模型库</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            {MODEL_STATS.total} 张标准知识卡片，覆盖 {CATEGORIES.length} 大分类。每张卡片都包含「条件 → 模型 → 辅助线 → 新关系 → 证明」的完整链条。
          </p>
        </div>
        <div className="flex gap-2 text-center">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-2">
            <p className="text-lg font-black text-slate-900">{MODEL_STATS.total}</p>
            <p className="text-[10px] text-slate-400">模型</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-2">
            <p className="text-lg font-black text-slate-900">{MODEL_STATS.totalAuxSteps}</p>
            <p className="text-[10px] text-slate-400">辅助线步骤</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-2">
            <p className="text-lg font-black text-slate-900">{MODEL_STATS.totalProofSteps}</p>
            <p className="text-[10px] text-slate-400">证明步骤</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <ModelBrowser
          models={previews}
          initialCategory={sp.category ?? "all"}
          initialQuery={sp.q ?? ""}
        />
      </div>
    </div>
  );
}
