import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FigureStage from "@/components/FigureStage";
import MathText from "@/components/MathText";
import ModelCard from "@/components/ModelCard";
import { CategoryTag, DifficultyBadge, ImportanceBar, MetaRow } from "@/components/Badges";
import { CATEGORY_MAP } from "@/data/categories";
import { CONDITION_MAP } from "@/data/conditions";
import { MODELS, adjacentModels, getModel, relatedModels } from "@/data/models";
import { conditionsForModel } from "@/lib/reflex";
import { toPreview } from "@/lib/preview";

export function generateStaticParams() {
  return MODELS.map((m) => ({ slug: m.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const model = getModel(slug);
  if (!model) return { title: "模型不存在" };
  return {
    title: `${model.name} · 几何模型`,
    description: model.summary.replace(/\$[^$]*\$/g, ""),
  };
}

const TOC = [
  { id: "s03", no: "03", label: "标准几何图形" },
  { id: "s04", no: "04", label: "基本定义" },
  { id: "s05", no: "05", label: "识别条件" },
  { id: "s06", no: "06", label: "触发关键词" },
  { id: "s07", no: "07", label: "辅助线画法" },
  { id: "s08", no: "08", label: "为什么这样加" },
  { id: "s09", no: "09", label: "新关系" },
  { id: "s10", no: "10", label: "定理与性质" },
  { id: "s11", no: "11", label: "完整证明" },
  { id: "s12", no: "12", label: "典型例题" },
  { id: "s13", no: "13", label: "常见变式" },
  { id: "s14", no: "14", label: "易错点" },
  { id: "s15", no: "15", label: "关联模型" },
];

function Section({
  id,
  no,
  title,
  desc,
  children,
}: {
  id: string;
  no: string;
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-slate-200/70 pt-8">
      <div className="flex items-baseline gap-3">
        <span className="num-badge">{no}</span>
        <h2 className="text-lg font-bold tracking-tight text-slate-900">{title}</h2>
      </div>
      {desc && <p className="mt-1.5 pl-10 text-xs text-slate-500">{desc}</p>}
      <div className="mt-4 pl-0 sm:pl-10">{children}</div>
    </section>
  );
}

function ProofTable({ steps }: { steps: { s: string; r: string }[] }) {
  return (
    <ol className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      {steps.map((st, i) => (
        <li key={i} className="grid gap-2 border-b border-slate-100 p-3.5 last:border-0 sm:grid-cols-[1fr_240px] sm:gap-4">
          <div className="flex gap-3">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sky-50 font-mono text-[10px] font-bold text-sky-600">
              {i + 1}
            </span>
            <MathText className="text-[13.5px] leading-6 text-slate-700" text={st.s} />
          </div>
          <div className="pl-8 sm:pl-0">
            <span className="mb-1 block text-[10px] font-semibold tracking-wider text-slate-400 sm:hidden">依据</span>
            <MathText className="text-[12.5px] leading-5 text-slate-500" text={st.r} />
          </div>
        </li>
      ))}
    </ol>
  );
}

export default async function ModelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const model = getModel(slug);
  if (!model) notFound();

  const related = relatedModels(model);
  const relatedPreviews = related.map(toPreview);
  const { prev, next } = adjacentModels(model.id);
  const conditions = conditionsForModel(model.id);
  const primaryCategory = CATEGORY_MAP[model.categories[0]];

  return (
    <div>
      {/* 01 名称 / 02 分类 */}
      <header className="relative overflow-hidden bg-navy-950 text-white">
        <div className="absolute inset-0 grid-bg-dark opacity-50" />
        <div
          className="pointer-events-none absolute -right-40 -top-32 h-[30rem] w-[30rem] rounded-full opacity-30 blur-3xl"
          style={{ background: `radial-gradient(circle, ${primaryCategory?.color ?? "#38bdf8"}55, transparent 70%)` }}
        />
        <div className="container-x relative py-10 sm:py-14">
          <nav className="flex flex-wrap items-center gap-2 text-xs text-slate-400" aria-label="面包屑">
            <Link href="/" className="hover:text-white">首页</Link>
            <span>/</span>
            <Link href="/models" className="hover:text-white">模型库</Link>
            <span>/</span>
            <Link href={`/category/${primaryCategory?.id}`} className="hover:text-white">
              {primaryCategory?.short}
            </Link>
            <span>/</span>
            <span className="text-slate-200">{model.name}</span>
          </nav>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {model.categories.map((c) => (
              <CategoryTag key={c} id={c} />
            ))}
            <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[11px] text-slate-300">
              {model.grade}
            </span>
          </div>

          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{model.name}</h1>
          {model.alias && model.alias.length > 0 && (
            <p className="mt-1.5 text-xs text-slate-400">又称：{model.alias.join("、")}</p>
          )}
          <MathText className="mt-3 block max-w-3xl text-sm leading-7 text-slate-300" text={model.summary} />

          <div className="mt-5 flex flex-wrap items-center gap-5 text-xs text-slate-300">
            <span>难度 <DifficultyBadge value={model.difficulty} /></span>
            <span className="inline-flex items-center gap-2">考试权重 <ImportanceBar value={model.importance} /></span>
            <span>{model.proof.steps.length} 步证明 · {model.auxSteps.length} 步辅助线</span>
          </div>

          <div className="mt-6 rounded-xl border border-sky-400/20 bg-sky-400/[0.07] p-4">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-sky-300/80">识别口诀 · MNEMONIC</p>
            <MathText className="mt-1 block text-sm font-medium text-sky-100" text={model.mnemonic} />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/lab?model=${model.id}`} className="btn-primary">
              在实验室画辅助线
            </Link>
            {conditions.length > 0 && (
              <Link href={`/conditions?c=${conditions[0].id}`} className="btn-ghost-dark">
                从条件反查
              </Link>
            )}
            <Link href="/models" className="btn-ghost-dark">
              返回模型库
            </Link>
          </div>
        </div>
      </header>

      <div className="container-x grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* 主内容 */}
        <div className="min-w-0 space-y-8">
          {/* 03 标准几何图形 */}
          <section id="s03" className="scroll-mt-24">
            <div className="flex items-baseline gap-3">
              <span className="num-badge">03</span>
              <h2 className="text-lg font-bold tracking-tight text-slate-900">标准几何图形</h2>
            </div>
            <p className="mt-1.5 pl-10 text-xs text-slate-500">
              点击下方按钮逐步显示辅助线，观察每一步新增的线段与结论。
            </p>
            <div className="mt-4">
              <FigureStage
                figure={model.figure}
                auxSteps={model.auxSteps}
                name={model.name}
                newRelations={model.newRelations}
              />
            </div>
          </section>

          {/* 04 定义 */}
          <Section id="s04" no="04" title="模型的基本定义">
            <MathText className="prose-geo block" text={model.definition} />
          </Section>

          {/* 05 条件 */}
          <Section
            id="s05"
            no="05"
            title="题目出现什么条件时应该想到它"
            desc="这些是“入口信号”，不要求全部出现，但出现得越多，越应该优先检查本模型。"
          >
            <ul className="grid gap-2.5">
              {model.conditions.map((c, i) => (
                <li key={i} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white text-[10px] font-bold text-sky-600 ring-1 ring-sky-100">
                    {i + 1}
                  </span>
                  <MathText className="text-[13.5px] leading-6 text-slate-700" text={c} />
                </li>
              ))}
            </ul>
          </Section>

          {/* 06 关键词 */}
          <Section id="s06" no="06" title="常见触发关键词">
            <div className="flex flex-wrap gap-2">
              {model.triggers.map((t) => (
                <span key={t} className="rounded-lg border border-sky-100 bg-sky-50 px-2.5 py-1.5 text-xs font-medium text-sky-700">
                  {t}
                </span>
              ))}
            </div>
          </Section>

          {/* 07 辅助线 */}
          <Section id="s07" no="07" title="辅助线具体画法" desc="重点内容：每一步都写清怎么画、为什么画、画完得到什么。">
            <ol className="space-y-3">
              {model.auxSteps.map((s) => (
                <li key={s.step} className="card-light p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-lg bg-amber-500 px-2 py-0.5 font-mono text-[10px] font-bold text-white">
                      STEP {s.step}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">{s.title}</h3>
                  </div>
                  <MathText className="mt-2 block text-[13px] leading-6 text-slate-600" text={s.detail} />
                  <div className="mt-2.5 rounded-lg border border-emerald-100 bg-emerald-50/60 px-3 py-2">
                    <span className="text-[10px] font-semibold tracking-wider text-emerald-600">得到</span>
                    <MathText className="mt-0.5 block text-[12.5px] leading-5 text-emerald-800/90" text={s.gain} />
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          {/* 08 为什么 */}
          <Section id="s08" no="08" title="为什么这样添加辅助线">
            <div className="rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-700">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1.1 1.2 1.1 2V17h5v-1.2c0-.8.5-1.5 1.1-2A6 6 0 0 0 12 3Z" strokeLinejoin="round" />
                    <path d="M9.5 20h5" strokeLinecap="round" />
                  </svg>
                </span>
                <MathText className="prose-geo block" text={model.whyAux} />
              </div>
            </div>
          </Section>

          {/* 09 新关系 */}
          <Section id="s09" no="09" title="添加辅助线后产生的新关系">
            <ul className="grid gap-2">
              {model.newRelations.map((r, i) => (
                <li key={i} className="flex items-start gap-2.5 rounded-lg border border-slate-100 bg-white px-4 py-2.5">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  <MathText className="text-[13.5px] leading-6 text-slate-700" text={r} />
                </li>
              ))}
            </ul>
          </Section>

          {/* 10 定理 */}
          <Section id="s10" no="10" title="能使用哪些定理和性质">
            <div className="flex flex-wrap gap-2">
              {model.theorems.map((t) => (
                <span key={t} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
                  {t}
                </span>
              ))}
            </div>
          </Section>

          {/* 11 证明 */}
          <Section id="s11" no="11" title="完整证明过程" desc="每一步都写明结论与依据，可直接对照考试书写格式。">
            <div className="rounded-xl border border-sky-100 bg-sky-50/50 px-4 py-3">
              <span className="text-[10px] font-semibold tracking-wider text-sky-600">证明目标</span>
              <MathText className="mt-1 block text-[13.5px] font-medium leading-6 text-slate-800" text={model.proof.goal} />
            </div>
            <div className="mt-3">
              <ProofTable steps={model.proof.steps} />
            </div>
            {model.proof.note && (
              <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50/60 p-4">
                <p className="text-[10px] font-semibold tracking-wider text-amber-700">补充说明</p>
                <MathText className="mt-1 block text-[12.5px] leading-6 text-amber-900/90" text={model.proof.note} />
              </div>
            )}
          </Section>

          {/* 12 例题 */}
          <Section id="s12" no="12" title="典型例题">
            <div className="card-light overflow-hidden">
              <div className="border-b border-slate-100 bg-slate-50/70 p-4">
                <span className="inline-flex rounded-md bg-navy-800 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-white">
                  题目
                </span>
                <MathText className="mt-2 block text-[13.5px] leading-7 text-slate-800" text={model.example.problem} />
                {model.example.given && (
                  <MathText className="mt-2 block text-[12.5px] leading-6 text-slate-500" text={`已知：${model.example.given}`} />
                )}
              </div>
              <div className="p-4">
                <p className="mb-2 text-[10px] font-semibold tracking-wider text-slate-400">解答</p>
                <ProofTable steps={model.example.steps} />
                <div className="mt-3 rounded-xl border border-emerald-100 bg-emerald-50/60 p-3.5">
                  <span className="text-[10px] font-semibold tracking-wider text-emerald-600">结论与点评</span>
                  <MathText className="mt-1 block text-[13px] leading-6 text-emerald-900/90" text={model.example.conclusion} />
                </div>
              </div>
            </div>
          </Section>

          {/* 13 变式 */}
          <Section id="s13" no="13" title="常见变式">
            <div className="grid gap-3 sm:grid-cols-2">
              {model.variants.map((v, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="flex items-center gap-2 text-[13px] font-bold text-slate-800">
                    <span className="font-mono text-[10px] text-slate-400">变式 {i + 1}</span>
                    {v.title}
                  </p>
                  <MathText className="mt-1.5 block text-[12.5px] leading-6 text-slate-500" text={v.desc} />
                </div>
              ))}
            </div>
          </Section>

          {/* 14 易错 */}
          <Section id="s14" no="14" title="易错点">
            <ul className="space-y-2">
              {model.pitfalls.map((p, i) => (
                <li key={i} className="flex items-start gap-2.5 rounded-xl border border-rose-100 bg-rose-50/50 px-4 py-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose-100 text-[10px] font-bold text-rose-600">
                    !
                  </span>
                  <MathText className="text-[13px] leading-6 text-rose-900/85" text={p} />
                </li>
              ))}
            </ul>
          </Section>

          {/* 15 关联 */}
          <Section id="s15" no="15" title="关联模型">
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedPreviews.map((r) => (
                <ModelCard key={r.id} model={r} compact />
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-200 pt-5 text-sm">
              {prev ? (
                <Link href={`/models/${prev.id}`} className="group min-w-0 text-slate-500 hover:text-sky-700">
                  <span className="text-[10px] tracking-wider text-slate-400">← 上一个</span>
                  <span className="mt-0.5 block truncate font-semibold text-slate-700 group-hover:text-sky-700">
                    {prev.name}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link href={`/models/${next.id}`} className="group min-w-0 text-right text-slate-500 hover:text-sky-700">
                  <span className="text-[10px] tracking-wider text-slate-400">下一个 →</span>
                  <span className="mt-0.5 block truncate font-semibold text-slate-700 group-hover:text-sky-700">
                    {next.name}
                  </span>
                </Link>
              ) : (
                <span />
              )}
            </div>
          </Section>
        </div>

        {/* 侧栏 */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="card-light p-4">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-slate-400">ON THIS PAGE</p>
            <nav className="mt-2.5 grid grid-cols-2 gap-1 lg:grid-cols-1" aria-label="页面目录">
              {TOC.map((t) => (
                <a key={t.id} href={`#${t.id}`} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12px] text-slate-600 hover:bg-slate-50 hover:text-sky-700">
                  <span className="font-mono text-[10px] text-slate-400">{t.no}</span>
                  {t.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="card-light p-4">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-slate-400">TRIGGER CONDITIONS</p>
            <p className="mt-1 text-xs text-slate-500">在条件反射系统中勾选任一条件，可看到本模型与其他候选模型的对比。</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {conditions.map((c) => (
                <Link
                  key={c.id}
                  href={`/conditions?c=${c.id}`}
                  className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-600 hover:border-sky-300 hover:text-sky-700"
                >
                  {c.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 border-t border-slate-100 pt-3">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-slate-400">QUICK META</p>
              <div className="mt-2">
                <MetaRow grade={model.grade} difficulty={model.difficulty} importance={model.importance} />
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {model.tags.map((t) => (
                  <span key={t} className="chip text-[10px]">{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="card-light bg-gradient-to-br from-navy-900 to-navy-800 p-4 text-white">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-sky-300/80">TRAINING</p>
            <p className="mt-1.5 text-sm font-bold">在实验室里动手画一遍</p>
            <p className="mt-1 text-[11px] leading-5 text-slate-300">
              逐条显示辅助线，观察每一步新增的线段、角与结论，比只看图更有效。
            </p>
            <Link
              href={`/lab?model=${model.id}`}
              className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-sky-500 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-400"
            >
              打开辅助线实验室 →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
