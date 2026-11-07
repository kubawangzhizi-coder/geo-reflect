import { NextResponse } from "next/server";
import katex from "katex";
import { CATEGORIES } from "@/data/categories";
import { CONDITIONS, RULES } from "@/data/conditions";
import { MODELS } from "@/data/models";
import type { ModelCard } from "@/data/types";
import { buildFigure } from "@/lib/figures";
import { recommend } from "@/lib/reflex";
import { searchIndex, buildSearchIndex } from "@/lib/search";
import { buildGraphData } from "@/lib/graph";

export const dynamic = "force-dynamic";

const errors: string[] = [];
const warnings: string[] = [];

function check(cond: boolean, msg: string) {
  if (!cond) errors.push(msg);
}

function walkStrings(obj: unknown, path: string, out: { path: string; value: string }[]) {
  if (typeof obj === "string") {
    out.push({ path, value: obj });
  } else if (Array.isArray(obj)) {
    obj.forEach((v, i) => walkStrings(v, `${path}[${i}]`, out));
  } else if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) walkStrings(v, `${path}.${k}`, out);
  }
}

export async function GET() {
  const ids = new Set(MODELS.map((m) => m.id));
  const ruleModelIds = new Set(RULES.map((r) => r.modelId));
  const conditionIds = new Set(CONDITIONS.map((c) => c.id));

  // 1. 模型基础字段
  const seen = new Set<string>();
  for (const m of MODELS) {
    check(!seen.has(m.id), `模型 id 重复：${m.id}`);
    seen.add(m.id);
    check(m.categories.length > 0, `${m.id} 缺少分类`);
    for (const c of m.categories) check(!!CATEGORIES.find((x) => x.id === c), `${m.id} 分类非法：${c}`);
    check(m.conditions.length >= 4, `${m.id} conditions 少于 4 条`);
    check(m.triggers.length >= 3, `${m.id} triggers 少于 3 个`);
    check(m.auxSteps.length >= 2, `${m.id} auxSteps 少于 2 步`);
    check(m.newRelations.length >= 3, `${m.id} newRelations 少于 3 条`);
    check(m.theorems.length >= 3, `${m.id} theorems 少于 3 条`);
    check(m.proof.steps.length >= 4, `${m.id} 证明步骤少于 4 步`);
    check(!!m.proof.goal, `${m.id} 缺证明目标`);
    check(m.example.steps.length >= 3, `${m.id} 例题步骤少于 3 步`);
    check(m.variants.length >= 2, `${m.id} 变式少于 2 条`);
    check(m.pitfalls.length >= 2, `${m.id} 易错点少于 2 条`);
    check(m.related.length >= 2, `${m.id} 关联模型少于 2 个`);
    for (const r of m.related) check(ids.has(r), `${m.id} 关联模型不存在：${r}`);
    check(!!ruleModelIds.has(m.id), `${m.id} 没有任何条件反射规则`);
    // aux step 连续性
    m.auxSteps.forEach((s, i) => check(s.step === i + 1, `${m.id} auxSteps step 不连续：第 ${i + 1} 个为 ${s.step}`));
  }

  // 2. 图形
  const figures = new Map<string, ReturnType<typeof buildFigure>>();
  for (const m of MODELS) {
    if (figures.has(m.figure)) continue;
    try {
      const spec = buildFigure(m.figure);
      figures.set(m.figure, spec);
      const bad = Object.entries(spec.points).filter(
        ([, d]) => !Number.isFinite(d.at.x) || !Number.isFinite(d.at.y),
      );
      check(bad.length === 0, `图形 ${m.figure} 存在非法坐标：${bad.map(([k]) => k).join(",")}`);
      for (const s of spec.segs) {
        const ok =
          (typeof s.from === "string" ? !!spec.points[s.from] : true) &&
          (typeof s.to === "string" ? !!spec.points[s.to] : true);
        check(ok, `图形 ${m.figure} 线段引用了不存在的点`);
      }
      for (const a of spec.arcs ?? []) {
        check(!!spec.points[a.at] && !!spec.points[a.from] && !!spec.points[a.to], `图形 ${m.figure} 角弧引用了不存在的点`);
      }
      // 辅助线步骤是否有对应可见元素
      const maxStep = Math.max(...m.auxSteps.map((s) => s.step), 0);
      for (let st = 1; st <= maxStep; st++) {
        const has =
          spec.segs.some((s) => s.step === st) ||
          Object.values(spec.points).some((p) => p.auxStep === st) ||
          (spec.arcs ?? []).some((a) => a.step === st) ||
          (spec.rights ?? []).some((r) => r.step === st);
        if (!has) warnings.push(`${m.id} 第 ${st} 步为文字说明步骤，图形中没有新增元素`);
      }
    } catch (e) {
      errors.push(`图形 ${m.figure} 构建失败：${(e as Error).message}`);
    }
  }

  // 3. 规则
  for (const rule of RULES) {
    check(ids.has(rule.modelId), `规则 ${rule.id} 指向不存在的模型：${rule.modelId}`);
    check(conditionIds.has(rule.requires[0]), `规则 ${rule.id} requires 含非法条件`);
    for (const c of [...rule.requires, ...(rule.optional ?? [])]) {
      check(conditionIds.has(c), `规则 ${rule.id} 含非法条件 id：${c}`);
    }
    check(rule.requires.length > 0, `规则 ${rule.id} 没有必需条件`);
  }
  for (const c of CONDITIONS) {
    const n = RULES.filter((r) => r.requires.includes(c.id) || (r.optional ?? []).includes(c.id)).length;
    check(n > 0, `条件 ${c.label} 没有任何规则引用`);
  }

  // 4. 条件反射单条件可达性
  const singleConditionResults: Record<string, number> = {};
  for (const c of CONDITIONS) {
    const recs = recommend([c.id], 8);
    singleConditionResults[c.id] = recs.length;
    if (recs.length === 0) warnings.push(`单选条件「${c.label}」没有推荐结果`);
  }

  // 5. LaTeX 渲染
  const strings: { path: string; value: string }[] = [];
  walkStrings(MODELS, "models", strings);
  let mathCount = 0;
  let mathErrors = 0;
  for (const { path, value } of strings) {
    const dollars = (value.match(/\$/g) ?? []).length;
    if (dollars % 2 !== 0) {
      errors.push(`LaTeX 美元符号不成对：${path} -> ${value.slice(0, 40)}`);
      continue;
    }
    if (value.includes("${")) errors.push(`LaTeX 中出现模板插值：${path}`);
    const re = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
    let mm: RegExpExecArray | null;
    while ((mm = re.exec(value)) !== null) {
      mathCount += 1;
      const src = mm[1] ?? mm[2] ?? "";
      try {
        katex.renderToString(src, { throwOnError: true, strict: false });
      } catch (e) {
        mathErrors += 1;
        errors.push(`KaTeX 解析失败 ${path}: ${src} (${(e as Error).message})`);
      }
    }
  }

  // 6. 搜索与图谱
  const index = buildSearchIndex(MODELS);
  check(searchIndex(index, "中点", 5).length > 0, "搜索“中点”没有结果");
  const graph = buildGraphData();
  check(graph.nodes.length === MODELS.length, "图谱节点数与模型数不一致");
  check(graph.edges.every((e) => ids.has(e.a) && ids.has(e.b)), "图谱边指向不存在的模型");

  // 7. 统计
  const stats = {
    models: MODELS.length,
    categories: CATEGORIES.length,
    rules: RULES.length,
    conditions: CONDITIONS.length,
    mathFormulas: mathCount,
    mathErrors,
    figures: figures.size,
    graphNodes: graph.nodes.length,
    graphEdges: graph.edges.length,
    auxSteps: MODELS.reduce((s: number, m: ModelCard) => s + m.auxSteps.length, 0),
    proofSteps: MODELS.reduce((s: number, m: ModelCard) => s + m.proof.steps.length, 0),
  };

  return NextResponse.json(
    {
      ok: errors.length === 0,
      stats,
      errors,
      warnings,
      singleConditionResults,
    },
    { status: errors.length === 0 ? 200 : 500 },
  );
}
