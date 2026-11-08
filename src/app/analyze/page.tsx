import type { Metadata } from "next";
import Analyzer from "@/components/Analyzer";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "几何题智能分析",
  description: "粘贴几何题题干，自动提取条件、推荐几何模型与辅助线，并给出建议推理路径。",
};

export default function AnalyzePage() {
  return (
    <div>
      <PageHeader
        label="Problem Analyzer / 智能分析"
        title="把题干交给档案。"
        description="自动识别条件信号，匹配几何模型，给出辅助线画法与推理路径。先看分析，再自己动笔，最后回到模型卡片把证明补完整。"
        meta={["条件关键词提取", "模型匹配 + 可信度", "推理路径建议"]}
      />
      <div className="container-x py-10">
        <Analyzer />
      </div>
    </div>
  );
}
