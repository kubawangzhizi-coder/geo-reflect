import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryGlyph from "@/components/CategoryGlyph";
import ModelCard from "@/components/ModelCard";
import PageHeader from "@/components/PageHeader";
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
      <PageHeader
        label={`Category ${category.no} / ${category.short}`}
        title={category.name}
        description={category.description}
        meta={[`${models.length} 个模型`, `核心口诀：${category.tagline}`, "条件反射可查"]}
      />

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
