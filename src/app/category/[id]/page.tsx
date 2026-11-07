import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryGlyph from "@/components/CategoryGlyph";
import ModelCard from "@/components/ModelCard";
import { CATEGORIES, CATEGORY_MAP } from "@/data/categories";
import { modelsByCategory } from "@/data/models";
import type { CategoryId } from "@/data/types";
import { toPreview } from "@/lib/preview";
import { rulesForModel } from "@/lib/reflex";
import { CONDITION_MAP } from "@/data/conditions";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const c = CATEGORY_MAP[id];
  if (!c) return { title: "分类不存在" };
  return { title: c.name, description: c.description };
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = CATEGORY_MAP[id];
  if (!category) notFound();
  const models = modelsByCategory(category.id as CategoryId).map(toPreview);
  const conditionIds = new Set<string>();
  for (const m of models) {
    for (const r of rulesForModel(m.id)) r.requires.forEach((c) => conditionIds.add(c));
  }
  const conditions = [...conditionIds].map((c) => CONDITION_MAP[c]).filter(Boolean);

  return (
    <div>
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="absolute inset-0 grid-bg-dark opacity-50" />
        <div
          className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: `radial-gradient(circle, ${category.color}66, transparent 70%)` }}
        />
        <div className="container-x relative py-12 sm:py-16">
          <nav className="flex items-center gap-2 text-xs text-slate-400" aria-label="面包屑">
            <Link href="/" className="hover:text-white">首页</Link>
            <span>/</span>
            <Link href="/models" className="hover:text-white">模型库</Link>
            <span>/</span>
            <span className="text-slate-200">{category.short}</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <span
              className="grid h-14 w-14 place-items-center rounded-2xl ring-1 ring-white/15"
              style={{ backgroundColor: `${category.color}22`, color: category.color }}
            >
              <CategoryGlyph id={category.id} className="h-8 w-8" />
            </span>
            <div>
              <p className="font-mono text-xs tracking-[0.3em] text-slate-400">CATEGORY {category.no}</p>
              <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">{category.name}</h1>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">{category.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
            <span className="chip-dark">{models.length} 个模型</span>
            <span className="chip-dark">核心口诀：{category.tagline}</span>
            <Link href="/conditions" className="text-sky-300 hover:text-sky-200">
              用条件反射查找 →
            </Link>
          </div>
        </div>
      </section>

      <div className="container-x py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {models.map((m) => (
            <ModelCard key={m.id} model={m} />
          ))}
        </div>

        {conditions.length > 0 && (
          <div className="card-light mt-10 p-6">
            <h2 className="text-sm font-bold text-slate-900">本分类涉及的条件信号</h2>
            <p className="mt-1 text-xs text-slate-500">在条件反射系统中勾选这些条件，可以进一步缩小模型范围。</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {conditions.map((c) => (
                <Link
                  key={c.id}
                  href={`/conditions?c=${c.id}`}
                  className="chip hover:border-sky-300 hover:text-sky-700"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
