import type { Category } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "congruence",
    no: "01",
    name: "全等三角形与旋转模型",
    short: "全等与旋转",
    tagline: "条件给全等，旋转造全等",
    description:
      "初中几何最核心的模型家族。核心动作只有两个：找全等、造全等。当图中出现共顶点的等长线段、特殊角或线段和差时，旋转、截长补短、倍长就能把分散的条件拼到一起。",
    color: "#38bdf8",
    accent: "#0ea5e9",
  },
  {
    id: "midpoint",
    no: "02",
    name: "中点与线段关系模型",
    short: "中点与线段",
    tagline: "见中点，想倍长、想中位线",
    description:
      "中点不是一句废话，而是一个可以生成平行、生成二分之一、生成全等的“条件发生器”。倍长中线、中位线、斜边中线三条主线几乎覆盖全部中点问题。",
    color: "#a78bfa",
    accent: "#8b5cf6",
  },
  {
    id: "bisector",
    no: "03",
    name: "角平分线模型",
    short: "角平分线",
    tagline: "见角平分线，想对称与距离",
    description:
      "角平分线是天然的对称轴。向两边作垂线、截取等长、翻折、作平行线，四种动作对应四类结论；再叠加双角平分线与等腰三角形，角与边的转化会变得非常自然。",
    color: "#34d399",
    accent: "#10b981",
  },
  {
    id: "axis",
    no: "04",
    name: "轴对称与最短路径模型",
    short: "轴对称与路径",
    tagline: "折线化直线，最短有依据",
    description:
      "把折线通过对称“拉直”，是求线段和最小值的主线。将军饮马解决系数为 1 的和，胡不归用正弦把带系数的线段转化为垂线段，翻折则提供全等与等角。",
    color: "#fbbf24",
    accent: "#f59e0b",
  },
  {
    id: "isosceles",
    no: "05",
    name: "等腰三角形与等边三角形模型",
    short: "等腰与等边",
    tagline: "等边等角，三线合一",
    description:
      "等腰、等边是特殊角的“制造机”。看到 60° 造等边，看到 45° 造等腰直角，看到等腰想三线合一，再与角平分线、全等模型联动，就能把角度条件转为边的关系。",
    color: "#f472b6",
    accent: "#ec4899",
  },
  {
    id: "similarity",
    no: "06",
    name: "相似三角形与比例模型",
    short: "相似与比例",
    tagline: "平行出比例，等角出相似",
    description:
      "八年级下册到九年级的衔接内容，也是条件反射清单中“平行线”一栏的落点。平行出 A 字、8 字，垂直出母子型，等角出一线三等角；比例式、等积式都能回到相似。",
    color: "#60a5fa",
    accent: "#3b82f6",
  },
];

export const CATEGORY_MAP: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
);
