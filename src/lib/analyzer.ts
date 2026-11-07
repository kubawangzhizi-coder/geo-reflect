import { CONDITIONS } from "@/data/conditions";
import type { ConditionDef, Recommendation } from "@/data/types";
import { recommend } from "./reflex";

export interface ConditionHit {
  condition: ConditionDef;
  evidence: string[];
  score: number;
}

export interface AnalysisResult {
  text: string;
  hits: ConditionHit[];
  selected: string[];
  recommendations: Recommendation[];
  summary: string;
  path: { title: string; detail: string }[];
  notes: string[];
}

const anglePattern = /(\d{1,3})\s*(?:°|度)/g;

function evidenceAround(text: string, index: number, len: number): string {
  const start = Math.max(0, index - 8);
  const end = Math.min(text.length, index + len + 10);
  const frag = text.slice(start, end).replace(/\s+/g, " ").trim();
  return (start > 0 ? "…" : "") + frag + (end < text.length ? "…" : "");
}

function matchKeyword(text: string, kw: string): { count: number; evidence: string[] } {
  const evidence: string[] = [];
  let count = 0;
  if (kw.includes(".*")) {
    try {
      const re = new RegExp(kw, "g");
      let m: RegExpExecArray | null;
      while ((m = re.exec(text)) !== null) {
        count += 1;
        evidence.push(evidenceAround(text, m.index, m[0].length));
        if (evidence.length >= 3) break;
      }
    } catch {
      /* 忽略非法正则 */
    }
    return { count, evidence };
  }
  let from = 0;
  while (count < 4) {
    const i = text.indexOf(kw, from);
    if (i < 0) break;
    count += 1;
    evidence.push(evidenceAround(text, i, kw.length));
    from = i + kw.length;
  }
  return { count, evidence };
}

/**
 * 规则化的“几何题智能分析”：
 * 从题干文字中抽取条件（关键词 + 数字角度），再交给条件反射引擎给出模型建议。
 * 注意：这是规则匹配，不是大模型推理，结果用于启发思路，不能替代证明。
 */
export function analyzeProblem(rawText: string): AnalysisResult {
  const text = rawText.trim();
  const noteSet = new Set<string>();

  // 数字角度先归一化
  const angleHits: Record<string, string[]> = {};
  let m: RegExpExecArray | null;
  anglePattern.lastIndex = 0;
  while ((m = anglePattern.exec(text)) !== null) {
    const deg = Number(m[1]);
    const id =
      deg === 45 ? "angle-45" : deg === 60 ? "angle-60" : deg === 90 ? "angle-90" : deg === 120 ? "angle-120" : "";
    if (!id) continue;
    angleHits[id] = angleHits[id] ?? [];
    angleHits[id].push(evidenceAround(text, m.index, m[0].length));
  }

  const hits: ConditionHit[] = [];
  for (const c of CONDITIONS) {
    let count = 0;
    const evidence: string[] = [...(angleHits[c.id] ?? [])];
    if (evidence.length) count += evidence.length;
    for (const kw of c.keywords) {
      if (c.id in angleHits && /^\d/.test(kw)) continue; // 角度已用数字规则处理
      const r = matchKeyword(text, kw);
      if (r.count > 0) {
        count += r.count;
        evidence.push(...r.evidence);
      }
    }
    if (count === 0) continue;
    // 过于宽泛的关键词降权
    const generic = new Set(["相等", "=", "等于", "∠", "等角", "高", "沿", "交于", "交点", "面积"]);
    let weight = 0;
    for (const kw of c.keywords) {
      if (text.includes(kw)) weight += generic.has(kw) ? 0.35 : 1;
    }
    if (evidence.length) weight += 0.3;
    if (weight <= 0.4) continue;
    hits.push({ condition: c, evidence: [...new Set(evidence)].slice(0, 3), score: weight });
  }

  hits.sort((a, b) => b.score - a.score);

  // 只保留信息量最大的若干条件，避免泛化词把结果淹没
  const selected = hits.slice(0, 7).map((h) => h.condition.id);
  const recommendations = recommend(selected, 8);

  // 额外的结构判断
  if (/AB\s*=\s*AC|等腰/.test(text)) noteSet.add("出现等腰关系时，注意“三线合一”是否需要先证明。");
  if (/边边角|SSA/.test(text)) noteSet.add("SSA 不能作为一般全等判定，只能作为特殊情形的分析。");
  if (/相似/.test(text) || /∽/.test(text)) noteSet.add("使用相似时必须写清对应角与对应边，比例式要与顶点顺序一致。");
  if (/求.*(?:最小|最短)|最小值/.test(text)) noteSet.add("最值问题先判断是“和最小”还是“带系数线段和最小”，两者对应不同模型。");
  if (/求证.*=.*\+/.test(text)) noteSet.add("结论是线段和差，优先考虑截长补短、旋转或作垂线转化。");
  if (/求证.*相等/.test(text) && /(两个|共顶点)/.test(text)) noteSet.add("要证线段相等时，先找现成的全等，再考虑构造全等。");
  if (hits.length === 0) noteSet.add("没有识别到明确的条件关键词，建议手动选择条件，或把题干写得更完整（例如“D 是 BC 的中点”）。");
  if (selected.length > 0 && recommendations.length === 0) noteSet.add("条件组合暂时没有命中规则，请继续补充其他条件（如角度、垂直、相等）。");
  noteSet.add("分析结果是“可能方向”，不是唯一解法；实际解题还要结合图形位置与已知条件核对。");

  const topNames = recommendations.slice(0, 3).map((r) => r.model.name);
  const summary =
    hits.length === 0
      ? "未从题干中识别到明确条件关键词。"
      : `识别到 ${hits.length} 个条件信号（${hits
          .slice(0, 5)
          .map((h) => h.condition.label)
          .join("、")}）${topNames.length ? `，优先考虑：${topNames.join("、")}` : ""}。`;

  const path: { title: string; detail: string }[] = [];
  path.push({
    title: "① 提取条件",
    detail:
      hits.length > 0
        ? hits.map((h) => h.condition.label).join(" → ")
        : "题干中没有识别到标准条件关键词。请手动勾选条件。",
  });
  if (recommendations.length) {
    path.push({
      title: "② 匹配模型",
      detail: recommendations
        .slice(0, 3)
        .map((r) => `${r.model.name}（${r.confidence}可信）`)
        .join("；"),
    });
    path.push({
      title: "③ 画辅助线",
      detail: recommendations
        .slice(0, 3)
        .map((r) => `${r.model.name}：${r.rule.aux}`)
        .join("；"),
    });
    path.push({
      title: "④ 得到新关系",
      detail: recommendations
        .slice(0, 3)
        .map((r) => `${r.model.name}：${r.rule.gain}`)
        .join("；"),
    });
  } else {
    path.push({
      title: "② 补充条件",
      detail: "再补充“中点、角平分线、垂直、平行、特殊角、共顶点”等条件后重新分析。",
    });
  }
  path.push({
    title: "⑤ 完成证明",
    detail: "按模型详情页的“辅助线 → 新关系 → 定理 → 证明”顺序书写步骤，每一步都写清依据。",
  });

  return { text, hits, selected, recommendations, summary, path, notes: [...noteSet] };
}

export const EXAMPLE_PROBLEMS: { title: string; text: string }[] = [
  {
    title: "正方形 + 45°",
    text: "如图，正方形 ABCD 中，E 是 BC 上一点，F 是 CD 上一点，且 ∠EAF=45°。求证：EF=BE+DF。",
  },
  {
    title: "中点 + 平行",
    text: "在 △ABC 中，D 是 BC 的中点，E 是 AD 的中点，BE 的延长线交 AC 于 F。求证：AF:FC=1:2。",
  },
  {
    title: "角平分线 + 线段和",
    text: "在 △ABC 中，∠B=2∠C，AD 平分 ∠BAC 交 BC 于 D。求证：AC=AB+BD。",
  },
  {
    title: "直角三角形斜边中线",
    text: "在 Rt△ABC 中，∠ACB=90°，D 是斜边 AB 的中点，CD=5，求 AB 的长。",
  },
  {
    title: "将军饮马",
    text: "直线 l 同侧有两点 A、B，在直线 l 上求一点 P，使 PA+PB 最小。",
  },
  {
    title: "手拉手背景",
    text: "已知两个等边三角形 ABC 与 ADE 共顶点 A，连接 BD、CE，求证：BD=CE。",
  },
  {
    title: "对角互补",
    text: "四边形 ABCD 中，∠A+∠C=180°，AB=AD，∠BAD=90°，求证：BC+CD=√2 AC。",
  },
  {
    title: "平行四边形对角线",
    text: "在平行四边形 ABCD 中，对角线 AC、BD 交于点 O，求证：OA=OC，OB=OD。",
  },
];
