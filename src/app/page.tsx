import Link from "next/link";
import GeometryFigure from "@/components/GeometryFigure";
import CategoryGlyph from "@/components/CategoryGlyph";
import ModelCard from "@/components/ModelCard";
import ReflexPreview, { type ReflexDemo } from "@/components/ReflexPreview";
import { CATEGORIES } from "@/data/categories";
import { CONDITIONS } from "@/data/conditions";
import { MODEL_STATS, featuredModels, modelsByCategory } from "@/data/models";
import { recommend } from "@/lib/reflex";
import { buildFigure } from "@/lib/figures";
import { toPreview } from "@/lib/preview";

const DEMO_CONDITIONS = [
  "midpoint",
  "angle-bisector",
  "angle-45",
  "angle-60",
  "perpendicular",
  "two-sides-equal",
  "common-vertex",
  "sum-difference",
  "parallel",
];

const WORKFLOW = [
  { no: "01", title: "看到条件", desc: "从题干中提取中点、角平分线、特殊角、垂直、平行等信号。" },
  { no: "02", title: "识别结构", desc: "判断图形属于共顶点、共边、一线三等角、对角互补等哪种结构。" },
  { no: "03", title: "联想模型", desc: "把条件与模型库中的标准模型建立对应关系。" },
  { no: "04", title: "画辅助线", desc: "明确辅助线画在哪里、为什么这样画、画完能产生什么。" },
  { no: "05", title: "推导证明", desc: "用全等、等腰、相似、勾股等定理把新关系写成完整证明。" },
];

const FEATURES = [
  {
    title: "辅助线不是“试试看”",
    desc: "每条辅助线都对应明确的数学目的：制造公共边、构造旋转、拼出线段和、把折线拉直。",
    icon: "pen",
  },
  {
    title: "条件反射式检索",
    desc: "选择“中点＋线段相等”“角平分线＋垂直”等条件组合，系统按可信度推荐模型与辅助线。",
    icon: "reflex",
  },
  {
    title: "图形与文字一致",
    desc: "所有标准图形由几何坐标精确计算生成，等长、垂直、平行、特殊角都与文字描述严格对应。",
    icon: "figure",
  },
  {
    title: "面向初二，也衔接初三",
    desc: "以全等、等腰、角平分线、轴对称为主线，相似与比例作为衔接拓展，不超纲堆砌。",
    icon: "route",
  },
];

function FeatureIcon({ name }: { name: string }) {
  const cls = "h-5 w-5";
  if (name === "pen")
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="m4 20 4-1 10-10-3-3L5 16l-1 4Z" strokeLinejoin="round" />
        <path d="m13 6 3 3" />
      </svg>
    );
  if (name === "reflex")
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4" strokeLinecap="round" />
        <path d="m6.3 6.3 2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8" strokeLinecap="round" />
        <circle cx="12" cy="12" r="2.4" />
      </svg>
    );
  if (name === "figure")
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M3 19 10 5l7 14H3Z" strokeLinejoin="round" />
        <path d="M7 19h10M17 19V9" strokeDasharray="2.6 2.6" />
        <circle cx="17" cy="19" r="1" fill="currentColor" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="5" cy="6" r="1.8" />
      <circle cx="19" cy="6" r="1.8" />
      <circle cx="12" cy="18" r="1.8" />
      <path d="M6.5 7.2 11 16M17.5 7.2 13 16M7 6h10" strokeLinecap="round" />
    </svg>
  );
}

export default function HomePage() {
  const handshakeFigure = buildFigure("handshake");
  const featured = featuredModels(6).map(toPreview);
  const demoConditions = DEMO_CONDITIONS.map((id) => CONDITIONS.find((c) => c.id === id)).filter(Boolean);
  const demos: ReflexDemo[] = demoConditions.map((c) => ({
    conditionId: c!.id,
    label: c!.label,
    recs: recommend([c!.id], 3).map((r) => ({
      id: r.model.id,
      name: r.model.name,
      confidence: r.confidence,
      reason: r.rule.reason,
      aux: r.rule.aux,
      gain: r.rule.gain,
    })),
  }));

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="absolute inset-0 grid-bg-dark opacity-60" />
        <div
          className="pointer-events-none absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(56,189,248,0.35), transparent 65%)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-56 right-0 h-[36rem] w-[36rem] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.35), transparent 65%)" }}
        />
        <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-sky-400/10 px-3 py-1.5 text-[11px] font-medium tracking-wide text-sky-200">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
              面向初中生的几何模型与辅助线学习平台
            </div>
            <h1 className="mt-6 text-4xl font-black leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
              看到条件，
              <br className="sm:hidden" />
              <span className="text-glow">想到模型。</span>
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-8 text-slate-300">
              从题目条件出发，识别几何结构、联想对应模型、判断辅助线怎么画、推导新关系并完成证明。
              这是一个把“模型识别”和“辅助线构造”讲透的几何知识库。
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/conditions" className="btn-primary">
                开始条件反射
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/models" className="btn-ghost-dark">
                浏览 {MODEL_STATS.total} 个模型
              </Link>
              <Link href="/lab" className="btn-ghost-dark">
                打开辅助线实验室
              </Link>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
              {[
                { k: MODEL_STATS.total, v: "模型卡片" },
                { k: CATEGORIES.length, v: "知识分类" },
                { k: MODEL_STATS.totalProofSteps, v: "证明步骤" },
              ].map((s) => (
                <div key={s.v} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <dt className="text-2xl font-black text-white">
                    {s.k}
                    <span className="ml-0.5 text-sm font-semibold text-sky-300">+</span>
                  </dt>
                  <dd className="mt-0.5 text-[11px] tracking-wider text-slate-400">{s.v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-2">
              {["中点", "角平分线", "45°", "60°", "垂直", "线段和差", "共顶点", "平行线"].map((t) => (
                <Link
                  key={t}
                  href={`/conditions`}
                  className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300 transition hover:border-sky-300/40 hover:text-white"
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="card-dark relative overflow-hidden p-4 sm:p-5">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  实时模型 · 手拉手
                </span>
                <span className="font-mono">ROTATION / SAS</span>
              </div>
              <div className="mt-3 overflow-hidden rounded-xl bg-white p-2">
                <GeometryFigure spec={handshakeFigure} reveal={1} />
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                  <p className="text-[10px] tracking-wider text-slate-500">条件</p>
                  <p className="mt-0.5 text-xs text-slate-200">共顶点 · 两边相等 · 顶角相等</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                  <p className="text-[10px] tracking-wider text-slate-500">辅助线</p>
                  <p className="mt-0.5 text-xs text-amber-300">连接 BD、CE</p>
                </div>
              </div>
              <div className="mt-2 rounded-lg border border-sky-400/20 bg-sky-400/5 px-3 py-2">
                <p className="text-[10px] tracking-wider text-sky-300/80">得到</p>
                <p className="mt-0.5 text-xs text-slate-200">△ABD ≌ △ACE ⇒ BD = CE，夹角等于旋转角</p>
              </div>
            </div>
            <div className="absolute -right-3 -top-3 hidden rounded-lg border border-amber-300/25 bg-navy-900/90 px-3 py-1.5 text-[11px] text-amber-300 shadow-xl backdrop-blur sm:block">
              为什么加辅助线？
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="container-x -mt-10 relative z-10">
        <div className="card-light grid gap-0 overflow-hidden sm:grid-cols-2 lg:grid-cols-5">
          {WORKFLOW.map((w, i) => (
            <div
              key={w.no}
              className={`relative p-5 ${i !== WORKFLOW.length - 1 ? "border-b border-slate-100 sm:border-b-0 sm:border-r" : ""}`}
            >
              <span className="font-mono text-[11px] font-bold text-sky-500">{w.no}</span>
              <h3 className="mt-1 text-sm font-bold text-slate-900">{w.title}</h3>
              <p className="mt-1.5 text-[12px] leading-5 text-slate-500">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-x mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">Knowledge System</p>
            <h2 className="section-title mt-2">六大核心知识分类</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              从全等与旋转出发，逐步覆盖中点、角平分线、轴对称、等腰等边，最后衔接相似与比例。每一类都按“模型 → 辅助线 → 证明”组织。
            </p>
          </div>
          <Link href="/models" className="link-underline text-sm font-semibold text-sky-600">
            查看全部模型 →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => {
            const count = modelsByCategory(c.id).length;
            const models = modelsByCategory(c.id).slice(0, 3);
            return (
              <Link
                key={c.id}
                href={`/category/${c.id}`}
                className="group card-light relative overflow-hidden p-5 transition duration-300 hover:-translate-y-0.5"
              >
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ background: `linear-gradient(90deg, ${c.color}, transparent)` }}
                />
                <div className="flex items-start justify-between">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl"
                    style={{ backgroundColor: `${c.color}18`, color: c.accent }}
                  >
                    <CategoryGlyph id={c.id} className="h-6 w-6" />
                  </span>
                  <span className="font-mono text-3xl font-black text-slate-100 transition group-hover:text-slate-200">
                    {c.no}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">{c.name}</h3>
                <p className="mt-1 text-[12px] font-medium" style={{ color: c.accent }}>
                  {c.tagline}
                </p>
                <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-slate-500">{c.description}</p>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-[11px] text-slate-400">
                    {count} 个模型 · {models.map((m) => m.name.replace(/模型|构造/g, "")).slice(0, 2).join(" / ")}
                  </span>
                  <span className="text-xs font-semibold text-sky-600 opacity-0 transition group-hover:opacity-100">
                    进入 →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* REFLEX */}
      <section className="container-x mt-20">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="section-eyebrow">Condition → Model</p>
            <h2 className="section-title mt-2">条件反射系统</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              几何高手不是“背模型”，而是看到条件就能条件反射式地想到对应结构。选择题目中出现的条件，
              系统会给出推荐模型、推荐理由、适用条件、辅助线画法、能推出的新关系以及可信程度。
            </p>
            <ul className="mt-5 space-y-2.5 text-[13px] text-slate-600">
              {[
                "支持多个条件组合判断，例如“中点＋线段相等”。",
                "每条推荐都显示推荐理由与具体辅助线，不只是模型名字。",
                "按可信程度分级：高 / 中 / 探索，避免误导。",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/conditions" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:text-sky-700">
              进入条件反射系统
              <span aria-hidden>→</span>
            </Link>
          </div>
          <ReflexPreview demos={demos} />
        </div>
      </section>

      {/* FEATURES */}
      <section className="container-x mt-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="card-light p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 text-sky-600">
                <FeatureIcon name={f.icon} />
              </span>
              <h3 className="mt-4 text-sm font-bold text-slate-900">{f.title}</h3>
              <p className="mt-1.5 text-[12.5px] leading-6 text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="container-x mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">Essential Models</p>
            <h2 className="section-title mt-2">先从这 6 个模型开始</h2>
            <p className="mt-2 text-sm text-slate-500">考试权重最高的核心模型，建议逐个吃透辅助线与证明。</p>
          </div>
          <Link href="/models" className="link-underline text-sm font-semibold text-sky-600">
            全部模型 →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((m) => (
            <ModelCard key={m.id} model={m} />
          ))}
        </div>
      </section>

      {/* ACCURACY */}
      <section className="container-x mt-20">
        <div className="card-light overflow-hidden">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="section-eyebrow">Math Accuracy</p>
              <h2 className="section-title mt-2">数学准确性，是底线</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                几何学习最怕“差不多”。这里的每一条结论都写明成立条件，每一个图形都由坐标精确计算，
                每一道例题都经过推理核验，不靠“看起来相等”蒙混过关。
              </p>
              <Link href="/graph" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600">
                查看知识图谱，理解模型之间的联系 →
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { t: "定理写清条件", d: "全等只用 SSS、SAS、ASA、AAS、HL，SSA 仅作特殊情形分析。" },
                { t: "对应关系明确", d: "相似必须写清对应角与对应边，比例式与顶点顺序一致。" },
                { t: "辅助线有目的", d: "每条辅助线都对应“为什么画、画完得到什么”，不做无意义连线。" },
                { t: "图形与文字一致", d: "标准图由几何函数计算生成，等长、垂直、平行与描述严格对应。" },
              ].map((x) => (
                <div key={x.t} className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <p className="flex items-center gap-1.5 text-[13px] font-bold text-slate-800">
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-100 text-[10px] text-emerald-600">✓</span>
                    {x.t}
                  </p>
                  <p className="mt-1.5 text-[12px] leading-5 text-slate-500">{x.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x mt-20">
        <div className="relative overflow-hidden rounded-3xl bg-navy-950 p-8 text-white sm:p-12">
          <div className="absolute inset-0 grid-bg-dark opacity-50" />
          <div
            className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(56,189,248,0.4), transparent 70%)" }}
          />
          <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">把“看不懂辅助线”变成“条件反射”</h2>
              <p className="mt-2 max-w-xl text-sm leading-7 text-slate-300">
                先选条件，再找模型，最后在实验室里一步一步把辅助线画出来。每天 10 分钟，建立自己的几何模型识别能力。
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/analyze" className="btn-primary">
                智能分析一道题
              </Link>
              <Link href="/lab" className="btn-ghost-dark">
                辅助线实验室
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
