import type { Metadata } from "next";
import Analyzer from "@/components/Analyzer";

export const metadata: Metadata = {
  title: "几何题智能分析",
  description: "粘贴几何题题干，自动提取条件、推荐几何模型与辅助线，并给出建议推理路径。",
};

export default function AnalyzePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="absolute inset-0 grid-bg-dark opacity-50" />
        <div
          className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(52,211,153,0.35), transparent 70%)" }}
        />
        <div className="container-x relative py-12 sm:py-16">
          <p className="section-eyebrow text-emerald-300">Problem Analyzer</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">几何题智能分析</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            把题目条件交给系统：自动识别条件信号，匹配几何模型，给出辅助线画法与推理路径。
            先看分析，再自己动笔，最后回到模型卡片把证明补完整。
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-[11px] text-slate-400">
            <span className="chip-dark">条件关键词提取</span>
            <span className="chip-dark">模型匹配 + 可信度</span>
            <span className="chip-dark">推理路径建议</span>
          </div>
        </div>
      </section>
      <div className="container-x py-10">
        <Analyzer />
      </div>
    </div>
  );
}
