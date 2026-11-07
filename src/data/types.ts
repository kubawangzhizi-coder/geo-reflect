export type CategoryId =
  | "congruence"
  | "midpoint"
  | "bisector"
  | "axis"
  | "isosceles"
  | "similarity";

export type Difficulty = 1 | 2 | 3;

/** 一条证明/推理步骤：结论 + 依据 */
export interface ProofStep {
  /** 得到的结论，支持 $LaTeX$ 行内公式 */
  s: string;
  /** 依据（定理、定义、条件） */
  r: string;
}

/** 辅助线步骤，与图形中的 step 编号一一对应（从 1 开始） */
export interface AuxStep {
  step: number;
  title: string;
  detail: string;
  gain: string;
}

export interface Variant {
  title: string;
  desc: string;
}

/**
 * 模型知识卡片（15 项标准字段）
 * 1 名称 / 2 分类 / 3 图形 / 4 定义 / 5 条件 / 6 关键词 / 7 辅助线 /
 * 8 为什么 / 9 新关系 / 10 定理 / 11 证明 / 12 例题 / 13 变式 / 14 易错 / 15 关联
 */
export interface ModelCard {
  id: string;
  name: string;
  alias?: string[];
  categories: CategoryId[];
  grade: string;
  difficulty: Difficulty;
  /** 考试权重 1—5 */
  importance: 1 | 2 | 3 | 4 | 5;
  /** 一句话识别口诀 */
  mnemonic: string;
  summary: string;
  definition: string;
  conditions: string[];
  triggers: string[];
  /** figures.ts 中的图形 id */
  figure: string;
  auxSteps: AuxStep[];
  whyAux: string;
  newRelations: string[];
  theorems: string[];
  proof: {
    goal: string;
    steps: ProofStep[];
    note?: string;
  };
  example: {
    problem: string;
    given?: string;
    steps: ProofStep[];
    conclusion: string;
  };
  variants: Variant[];
  pitfalls: string[];
  /** 关联模型 id */
  related: string[];
  tags: string[];
}

export interface Category {
  id: CategoryId;
  no: string;
  name: string;
  short: string;
  tagline: string;
  description: string;
  /** 主色（十六进制，用于渐变与标签） */
  color: string;
  /** 强调色 */
  accent: string;
}

export interface ConditionDef {
  id: string;
  label: string;
  group: "点线" | "角度" | "边" | "结构" | "目标";
  desc: string;
  /** 几何题智能分析用的关键词 */
  keywords: string[];
}

export interface ReflexRule {
  id: string;
  modelId: string;
  /** 必须出现的条件 id */
  requires: string[];
  /** 出现可加分的条件 id */
  optional?: string[];
  /** 基础可信度 1—5 */
  base: number;
  reason: string;
  applicable: string;
  aux: string;
  gain: string;
}

export interface Recommendation {
  model: ModelCard;
  rule: ReflexRule;
  score: number;
  confidence: "高" | "中" | "探索";
  matched: string[];
  missing: string[];
}
