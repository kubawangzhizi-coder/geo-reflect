import type { Metadata } from "next";
import Link from "next/link";
import ArchiveShelf, { type ArchiveTape } from "@/components/ArchiveShelf";
import ReflexPreview, { type ReflexDemo } from "@/components/ReflexPreview";
import CategoryGlyph from "@/components/CategoryGlyph";
import { CATEGORIES, CATEGORY_MAP } from "@/data/categories";
import { CONDITIONS } from "@/data/conditions";
import { MODEL_STATS, MODELS, modelsByCategory } from "@/data/models";
import type { CategoryId } from "@/data/types";
import { recommend } from "@/lib/reflex";

export const metadata: Metadata = {
  title: "几何模型档案 · GeoReflex 几何反射",
  description:
    "把每一个初中几何模型做成可翻阅的档案带：拖动书架，打开封面，读条件、辅助线与完整证明。",
};

const CATEGORY_EN: Record<CategoryId, string> = {
  congruence: "CONGRUENCE / ROTATION",
  midpoint: "MIDPOINT / SEGMENTS",
  bisector: "ANGLE BISECTOR",
  axis: "AXIS / SHORTEST PATH",
  isosceles: "ISOSCELES / EQUILATERAL",
  similarity: "SIMILARITY / RATIO",
};

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
  { no: "03", title: "联想模型", desc: "把条件与档案里的标准模型建立对应关系。" },
  { no: "04", title: "画辅助线", desc: "明确辅助线画在哪里、为什么这样画、画完能产生什么。" },
  { no: "05", title: "推导证明", desc: "用全等、等腰、相似、勾股等定理把新关系写成完整证明。" },
];

const FEATURES = [
  { title: "辅助线不是“试试看”", desc: "每条辅助线都对应明确的数学目的：制造公共边、构造旋转、拼出线段和、把折线拉直。" },
  { title: "条件反射式检索", desc: "选择“中点＋线段相等”“角平分线＋垂直”等条件组合，系统按可信度推荐模型与辅助线。" },
  { title: "图形与文字一致", desc: "所有标准图形由几何坐标精确计算生成，等长、垂直、平行、特殊角都与文字描述严格对应。" },
  { title: "面向初二，也衔接初三", desc: "以全等、等腰、角平分线、轴对称为主线，相似与比例作为衔接拓展，不超纲堆砌。" },
];

const ACCURACY = [
  { t: "定理写清条件", d: "全等只用 SSS、SAS、ASA、AAS、HL，SSA 仅作特殊情形分析。" },
  { t: "对应关系明确", d: "相似必须写清对应角与对应边，比例式与顶点顺序一致。" },
  { t: "辅助线有目的", d: "每条辅助线都对应“为什么画、画完得到什么”，不做无意义连线。" },
  { t: "图形与文字一致", d: "标准图由几何函数计算生成，等长、垂直、平行与描述严格对应。" },
];

const DIFF_LABEL: Record<number, string> = { 1: "入门", 2: "进阶", 3: "挑战" };

export default function HomePage() {
  const tapes: ArchiveTape[] = MODELS.map((m) => {
    const cat = CATEGORY_MAP[m.categories[0]];
    return {
      id: m.id,
      name: m.name,
      category: cat?.short ?? "几何",
      categoryEn: CATEGORY_EN[m.categories[0]] ?? "GEOMETRY",
      figure: m.figure,
      difficulty: m.difficulty,
      importance: m.importance,
      summary: m.summary,
      definition: m.definition,
      conditions: m.conditions,
      auxSteps: m.auxSteps,
      newRelations: m.newRelations,
      tags: m.tags,
    };
  });

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
      <ArchiveShelf tapes={tapes} />

      {/* METHOD */}
      <section className="container-x border-t border-[color:var(--color-rule)] py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="section-eyebrow">How the archive reads</p>
            <div className="mt-5" data-reveal>
              <div className="reveal-mask">
                <h2 className="section-title">五步，<br />把条件读成模型。</h2>
              </div>
            </div>
            <p className="mt-6 max-w-[38ch] text-[13.5px] leading-7 text-[color:var(--color-ink-soft)]">
              几何高手不是“背模型”，而是看到条件就能条件反射式地想到对应结构。档案按同一套阅读顺序组织：
              条件进入，结构被识别，辅助线被画出，证明被写完。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/conditions" className="btn-primary" data-cursor="btn">
                开始条件反射
              </Link>
              <Link href="/models" className="btn-outline" data-cursor="btn">
                浏览全部 46 个模型
              </Link>
            </div>
          </div>
          <ol className="border-t border-[color:var(--color-rule)]">
            {WORKFLOW.map((w) => (
              <li
                key={w.no}
                className="grid grid-cols-[48px_1fr] gap-4 border-b border-[color:var(--color-rule-soft)] py-5"
              >
                <span className="pt-1 text-[10px] tracking-[0.16em] text-[color:var(--color-cobalt)]">{w.no}</span>
                <div>
                  <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-[color:var(--color-ink)]">{w.title}</h3>
                  <p className="mt-1.5 text-[12.5px] leading-6 text-[color:var(--color-muted)]">{w.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-x border-t border-[color:var(--color-rule)] py-16 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div data-reveal>
            <div className="reveal-mask">
              <h2 className="section-title">六个抽屉</h2>
            </div>
          </div>
          <Link href="/models" className="lbl text-[color:var(--color-cobalt)]" data-cursor="btn">
            完整索引 →
          </Link>
        </div>
        <div className="mt-10 border-t border-[color:var(--color-rule)]">
          {CATEGORIES.map((c) => {
            const count = modelsByCategory(c.id).length;
            return (
              <Link
                key={c.id}
                href={`/category/${c.id}`}
                data-cursor="btn"
                className="group grid grid-cols-[34px_1fr_auto] items-center gap-4 border-b border-[color:var(--color-rule-soft)] py-5 sm:grid-cols-[60px_1.1fr_1fr_auto] sm:gap-6"
              >
                <span className="text-[11px] tracking-[0.16em] text-[color:var(--color-muted)]">{c.no}</span>
                <span className="flex items-center gap-4">
                  <CategoryGlyph id={c.id} className="hidden h-8 w-8 shrink-0 text-[color:var(--color-cobalt)] sm:block" />
                  <span>
                    <span className="block text-[20px] font-semibold tracking-[-0.015em] text-[color:var(--color-ink)] group-hover:text-[color:var(--color-cobalt)]">
                      {c.name}
                    </span>
                    <span className="mt-1 block text-[11.5px] text-[color:var(--color-muted)] sm:hidden">{c.tagline}</span>
                  </span>
                </span>
                <span className="hidden text-[12px] text-[color:var(--color-muted)] sm:block">{c.tagline}</span>
                <span className="flex items-center gap-5">
                  <span className="text-[10px] tracking-[0.14em] text-[color:var(--color-muted)]">{count} 个模型</span>
                  <span className="text-[color:var(--color-cobalt)]">→</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* REFLEX */}
      <section className="container-x border-t border-[color:var(--color-rule)] py-20">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="section-eyebrow">Condition → Model</p>
            <div className="mt-5" data-reveal>
              <div className="reveal-mask">
                <h2 className="section-title">先选条件，<br />再看模型。</h2>
              </div>
            </div>
            <p className="mt-6 max-w-[36ch] text-[13.5px] leading-7 text-[color:var(--color-ink-soft)]">
              选择题目中出现的条件，系统给出推荐模型、适用条件、具体辅助线画法、能推出的新关系与可信程度。
              支持多条件组合，例如“中点＋线段相等”。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/conditions" className="btn-primary" data-cursor="btn">进入条件反射</Link>
              <Link href="/analyze" className="btn-outline" data-cursor="btn">分析一道题</Link>
            </div>
          </div>
          <ReflexPreview demos={demos} />
        </div>
      </section>

      {/* FEATURES */}
      <section className="container-x border-t border-[color:var(--color-rule)] py-16">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <p className="section-eyebrow">Archive principles</p>
          <div className="grid border-t border-[color:var(--color-rule)] sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="border-b border-[color:var(--color-rule-soft)] py-5 sm:odd:pr-8 sm:even:pl-8 sm:even:border-l">
                <h3 className="text-[15px] font-semibold text-[color:var(--color-ink)]">{f.title}</h3>
                <p className="mt-2 text-[12px] leading-6 text-[color:var(--color-muted)]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section className="container-x border-t border-[color:var(--color-rule)] py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div data-reveal>
            <div className="reveal-mask">
              <h2 className="section-title">全集索引</h2>
            </div>
            <p className="mt-3 max-w-[52ch] text-[13px] leading-6 text-[color:var(--color-ink-soft)]">
              {MODEL_STATS.total} 个模型，按分类归档。每一个名字都可以直接打开完整知识卡片。
            </p>
          </div>
          <span className="lbl text-[color:var(--color-muted)]">{MODEL_STATS.total} TAPES / 6 DRAWERS</span>
        </div>
        <div className="mt-10 border-t border-[color:var(--color-rule)]">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="grid gap-6 border-b border-[color:var(--color-rule-soft)] py-7 lg:grid-cols-[260px_1fr]">
              <div>
                <Link href={`/category/${cat.id}`} className="group flex items-baseline gap-3" data-cursor="btn">
                  <span className="text-[10px] tracking-[0.14em] text-[color:var(--color-muted)]">{cat.no}</span>
                  <span className="text-[18px] font-semibold text-[color:var(--color-ink)] group-hover:text-[color:var(--color-cobalt)]">
                    {cat.name}
                  </span>
                </Link>
                <p className="mt-2 text-[11.5px] leading-5 text-[color:var(--color-muted)]">{cat.tagline}</p>
              </div>
              <ul className="grid gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
                {modelsByCategory(cat.id).map((m) => (
                  <li key={m.id}>
                    <Link
                      href={`/models/${m.id}`}
                      data-cursor="btn"
                      className="group flex items-baseline justify-between gap-3 border-b border-[color:var(--color-rule-faint)] py-2"
                    >
                      <span className="text-[13px] text-[color:var(--color-ink)] group-hover:text-[color:var(--color-cobalt)]">
                        {m.name}
                      </span>
                      <span className="shrink-0 text-[9px] tracking-[0.12em] text-[color:var(--color-muted)]">
                        {DIFF_LABEL[m.difficulty]}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ACCURACY */}
      <section className="bg-[color:var(--color-ink)] py-20 text-[color:var(--color-paper)]">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="section-eyebrow !text-[color:rgba(243,240,234,0.7)]">Math accuracy</p>
            <div className="mt-5" data-reveal>
              <div className="reveal-mask">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(30px,3.4vw,48px)] font-extrabold leading-[1.02] tracking-[-0.03em]">
                  数学准确性，是底线。
                </h2>
              </div>
            </div>
            <p className="mt-6 max-w-[36ch] text-[13px] leading-7 text-[color:rgba(243,240,234,0.72)]">
              几何学习最怕“差不多”。这里的每一条结论都写明成立条件，每一个图形都由坐标精确计算，每一道例题都经过推理核验。
            </p>
            <Link href="/graph" className="mt-7 inline-flex items-center gap-2 border-b border-[color:rgba(243,240,234,0.5)] pb-1 text-[11px] tracking-[0.14em] text-[color:var(--color-paper)]" data-cursor="btn">
              查看知识图谱 →
            </Link>
          </div>
          <div className="grid gap-0 border-t border-[color:rgba(243,240,234,0.25)]">
            {ACCURACY.map((a, i) => (
              <div key={a.t} className="grid grid-cols-[40px_1fr] gap-4 border-b border-[color:rgba(243,240,234,0.22)] py-4">
                <span className="pt-0.5 text-[10px] tracking-[0.14em] text-[color:rgba(243,240,234,0.55)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-[14px] font-medium text-[color:var(--color-paper)]">{a.t}</p>
                  <p className="mt-1 text-[11.5px] leading-5 text-[color:rgba(243,240,234,0.65)]">{a.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x py-16">
        <div className="border border-[color:var(--color-cobalt)] p-8 sm:p-12">
          <p className="lbl text-[color:var(--color-cobalt)]">START HERE</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(28px,3.6vw,50px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-[color:var(--color-ink)]">
            把“看不懂辅助线”变成条件反射。
          </h2>
          <p className="mt-4 max-w-[52ch] text-[13px] leading-7 text-[color:var(--color-ink-soft)]">
            先选条件，再找模型，最后在实验室里一步一步把辅助线画出来。每天十分钟，建立自己的几何模型识别能力。
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/conditions" className="btn-primary" data-cursor="btn">开始条件反射</Link>
            <Link href="/lab" className="btn-outline" data-cursor="btn">辅助线实验室</Link>
            <Link href="/analyze" className="btn-outline" data-cursor="btn">智能分析</Link>
          </div>
        </div>
      </section>
    </>
  );
}
