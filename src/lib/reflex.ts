import { CONDITIONS, CONDITION_MAP, RULES } from "@/data/conditions";
import { MODEL_MAP } from "@/data/models";
import type { ConditionDef, ModelCard, Recommendation, ReflexRule } from "@/data/types";

export function confidenceOf(score: number): Recommendation["confidence"] {
  if (score >= 3.9) return "高";
  if (score >= 2.8) return "中";
  return "探索";
}

/**
 * 条件反射核心引擎：
 * 1. 规则必须命中至少一半的必需条件；
 * 2. 只选一个条件时，不推荐需要多个条件的组合，避免噪声；
 * 3. 组合条件越完整、可选条件命中越多，可信度越高。
 */
export function recommend(selected: string[], limit = 10): Recommendation[] {
  const set = new Set(selected);
  if (set.size === 0) return [];
  const best = new Map<string, Recommendation>();

  for (const rule of RULES) {
    const model = MODEL_MAP[rule.modelId];
    if (!model) continue;
    const matched = rule.requires.filter((id) => set.has(id));
    if (matched.length === 0) continue;
    const coverage = matched.length / rule.requires.length;
    if (coverage < 0.5) continue;
    if (coverage < 1 && set.size < 2) continue;
    if (coverage < 1 && rule.requires.length === 2 && set.size === 2) {
      // 两个条件都选上但没命中该规则的一半以上时已在上面被过滤
    }
    const optionalMatched = (rule.optional ?? []).filter((id) => set.has(id));
    const missing = rule.requires.filter((id) => !set.has(id));
    const raw =
      rule.base * (0.55 + 0.45 * coverage) +
      optionalMatched.length * 0.28 +
      (missing.length === 0 ? 0.4 : 0);
    const score = Math.round(Math.min(5, raw) * 10) / 10;
    const rec: Recommendation = {
      model,
      rule,
      score,
      confidence: confidenceOf(score),
      matched,
      missing,
    };
    const prev = best.get(rule.modelId);
    if (!prev || rec.score > prev.score) best.set(rule.modelId, rec);
  }

  return [...best.values()]
    .sort((a, b) => b.score - a.score || b.model.importance - a.model.importance)
    .slice(0, limit);
}

export function conditionDef(id: string): ConditionDef | undefined {
  return CONDITION_MAP[id];
}

export function conditionLabels(ids: string[]): string[] {
  return ids.map((id) => CONDITION_MAP[id]?.label ?? id);
}

/** 某个模型的所有触发规则 */
export function rulesForModel(modelId: string): ReflexRule[] {
  return RULES.filter((r) => r.modelId === modelId);
}

/** 某个模型对应哪些题目条件 */
export function conditionsForModel(modelId: string): ConditionDef[] {
  const ids = new Set<string>();
  for (const r of rulesForModel(modelId)) {
    r.requires.forEach((id) => ids.add(id));
    (r.optional ?? []).forEach((id) => ids.add(id));
  }
  return [...ids].map((id) => CONDITION_MAP[id]).filter(Boolean);
}

/** 每个模型被规则覆盖的情况，用于校验 */
export function ruleCoverage(): { model: ModelCard; rules: number }[] {
  return Object.values(MODEL_MAP).map((model) => ({
    model,
    rules: rulesForModel(model.id).length,
  }));
}

export function conditionsByGroup(): Record<ConditionDef["group"], ConditionDef[]> {
  const out: Record<ConditionDef["group"], ConditionDef[]> = {
    点线: [],
    角度: [],
    边: [],
    结构: [],
    目标: [],
  };
  for (const c of CONDITIONS) out[c.group].push(c);
  return out;
}
