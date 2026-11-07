import type { Metadata } from "next";
import KnowledgeGraph from "@/components/KnowledgeGraph";
import { buildGraphData } from "@/lib/graph";

export const metadata: Metadata = {
  title: "知识图谱",
  description: "以图谱方式查看初中几何模型之间的关联，按分类筛选、点击节点查看模型关系。",
};

export default function GraphPage() {
  const data = buildGraphData();
  return (
    <div>
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="absolute inset-0 grid-bg-dark opacity-50" />
        <div
          className="pointer-events-none absolute left-1/3 top-0 h-80 w-80 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(96,165,250,0.4), transparent 70%)" }}
        />
        <div className="container-x relative py-12 sm:py-16">
          <p className="section-eyebrow text-sky-300">Knowledge Graph</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">几何模型知识图谱</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            模型之间不是孤立的：手拉手可以转化为旋转全等，倍长中线与中位线互相呼应，角平分线又能和等腰、全等联动。
            沿着图谱探索，把零散的模型连成一张网。
          </p>
        </div>
      </section>
      <div className="container-x py-10">
        <KnowledgeGraph data={data} />
      </div>
    </div>
  );
}
