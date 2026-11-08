import type { Metadata } from "next";
import KnowledgeGraph from "@/components/KnowledgeGraph";
import PageHeader from "@/components/PageHeader";
import { buildGraphData } from "@/lib/graph";

export const metadata: Metadata = {
  title: "知识图谱",
  description: "以图谱方式查看初中几何模型之间的关联，按分类筛选、点击节点查看模型关系。",
};

export default function GraphPage() {
  const data = buildGraphData();
  return (
    <div>
      <PageHeader
        label="Knowledge Graph / 知识图谱"
        title="模型不是孤岛，是一张网。"
        description="手拉手可以转化为旋转全等，倍长中线与中位线互相呼应，角平分线又能和等腰、全等联动。沿着图谱探索，把零散的模型连成一张网。"
        meta={["分类筛选", "关联关系", "节点详情"]}
      />
      <div className="container-x py-10">
        <KnowledgeGraph data={data} />
      </div>
    </div>
  );
}
