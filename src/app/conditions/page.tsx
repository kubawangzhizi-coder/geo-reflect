import type { Metadata } from "next";
import ConditionReflex from "@/components/ConditionReflex";
import PageHeader from "@/components/PageHeader";

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
      <PageHeader
        label="Condition Reflex / 条件反射"
        title="先选条件，再看模型。"
        description="几何高手看到条件就能想到模型。勾选题目中出现的条件（可多选），系统会根据规则库推荐可能使用的模型、推荐理由、适用条件、具体辅助线画法、添加后能得到什么，并给出可信程度。"
        meta={["支持多条件组合", "每条推荐都有辅助线画法", "可信度分级：高 / 中 / 探索"]}
      />
      <div className="container-x py-10">
        <ConditionReflex initial={initial} />
      </div>
    </div>
  );
}
