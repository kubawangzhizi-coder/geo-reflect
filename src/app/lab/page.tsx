import type { Metadata } from "next";
import LabBench, { type LabModel } from "@/components/LabBench";
import PageHeader from "@/components/PageHeader";
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
    color: "#1F3FB0",
    figure: m.figure,
    auxSteps: m.auxSteps,
    newRelations: m.newRelations,
    whyAux: m.whyAux,
    difficulty: m.difficulty,
  }));
  const initial = labModels.some((m) => m.id === sp.model) ? (sp.model as string) : "handshake";

  return (
    <div>
      <PageHeader
        label="Auxiliary Line Lab / 辅助线实验室"
        title="一步一步，画出辅助线。"
        description="画辅助线不是碰运气。选择一个模型，从原图开始，逐步显示辅助线，观察每一步新增的线段、角与结论。先自己口述画法，再点开验证，效果最好。"
        meta={[`${MODEL_STATS.total} 个模型可练习`, "逐步显示 · 自动演示", "练习模式：先画后看"]}
      />
      <div className="container-x py-10">
        <LabBench models={labModels} initialId={initial} />
      </div>
    </div>
  );
}
