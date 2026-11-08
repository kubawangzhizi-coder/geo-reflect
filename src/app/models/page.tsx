import type { Metadata } from "next";
import ModelBrowser from "@/components/ModelBrowser";
import PageHeader from "@/components/PageHeader";
import { CATEGORIES } from "@/data/categories";
import { MODELS, MODEL_STATS } from "@/data/models";
import { toPreview } from "@/lib/preview";

export const metadata: Metadata = {
  title: "模型库",
  description: "六大分类、46 个初中几何模型的标准知识卡片，含辅助线画法、推导与证明。",
};

export default async function ModelsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const previews = MODELS.map(toPreview);
  return (
    <div>
      <PageHeader
        label="Model Library / 模型库"
        title="四十六张卡片。"
        description={`每张卡片都包含「条件 → 模型 → 辅助线 → 新关系 → 证明」的完整链条。当前收录 ${MODEL_STATS.total} 个模型，覆盖 ${CATEGORIES.length} 大分类。`}
        meta={[`${MODEL_STATS.total} 个模型`, `${MODEL_STATS.totalAuxSteps} 条辅助线步骤`, `${MODEL_STATS.totalProofSteps} 步证明`]}
      />
      <div className="container-x py-10">
        <ModelBrowser
          models={previews}
          initialCategory={sp.category ?? "all"}
          initialQuery={sp.q ?? ""}
        />
      </div>
    </div>
  );
}
