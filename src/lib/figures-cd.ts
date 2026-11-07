import type { FigureSpec } from "@/lib/figure";
import { arc, eq, pt, right, sg } from "@/lib/figure";
import {
  add,
  angleDeg,
  dist,
  foot,
  intersect,
  lerp,
  mid,
  mul,
  p,
  polar,
  reflect,
  rot,
  sub,
} from "@/lib/geom";
import type { P2 } from "@/lib/geom";

const ray = (o: P2, deg: number, r = 300): P2 => polar(o, deg, r);

/* ------------------------------------------------------------------ */
/* 第三类：角平分线模型                                                 */
/* ------------------------------------------------------------------ */

const bisectorProperty = (): FigureSpec => {
  const O = p(0, 0);
  const A = polar(O, 8, 38);
  const B = polar(O, 66, 38);
  const P = polar(O, 37, 30);
  const D = foot(P, O, A);
  const E = foot(P, O, B);
  return {
    title: "角平分线基本性质：角平分线上的点到角两边距离相等",
    points: {
      O: pt(O, "O", { offset: [-6, 3] }),
      A: pt(A, "A"),
      B: pt(B, "B"),
      P: pt(P, "P"),
      D: pt(D, "D", { auxStep: 1 }),
      E: pt(E, "E", { auxStep: 1 }),
    },
    segs: [
      sg("O", "A"), sg("O", "B"), sg("O", "P"),
      sg("P", "D", { kind: "aux", step: 1 }),
      sg("P", "E", { kind: "aux", step: 1 }),
    ],
    arcs: [
      arc("O", "A", "P", { label: "α", r: 11 }),
      arc("O", "P", "B", { label: "α", r: 11 }),
    ],
    rights: [right("D", "O", "P", 1), right("E", "O", "P", 1)],
    equals: [eq("P", "D", 1, "tick", 1), eq("P", "E", 1, "tick", 1)],
  };
};

const bisectorPerp = (): FigureSpec => {
  const B = p(-26, 0);
  const C = p(20, 0);
  const A = p(-2, 26);
  const AB = dist(A, B);
  const AC = dist(A, C);
  const D = lerp(B, C, AB / (AB + AC));
  const E = foot(D, A, B);
  const F = foot(D, A, C);
  return {
    title: "角平分线垂线模型：向角的两边作垂线，得到两个全等直角三角形",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      D: pt(D, "D", { offset: [0, 7] }),
      E: pt(E, "E", { auxStep: 1 }),
      F: pt(F, "F", { auxStep: 1 }),
    },
    segs: [
      sg("A", "B"), sg("A", "C"), sg("B", "C"), sg("A", "D"),
      sg("D", "E", { kind: "aux", step: 1 }),
      sg("D", "F", { kind: "aux", step: 1 }),
    ],
    rights: [right("E", "A", "D", 1), right("F", "A", "D", 1)],
    equals: [eq("D", "E", 1, "tick", 1), eq("D", "F", 1, "tick", 1), eq("A", "E", 2), eq("A", "F", 2, "tick", 1)],
  };
};

const bisectorParallel = (): FigureSpec => {
  const O = p(-18, 0);
  const A = polar(O, 18, 40);
  const B = polar(O, 74, 40);
  const P = polar(O, 46, 25);
  const C = intersect(P, ray(P, 18), O, B)!;
  return {
    title: "角平分线与平行线模型：过角平分线上的点作平行线，构造等腰三角形",
    points: {
      O: pt(O, "O", { offset: [-6, 3] }),
      A: pt(A, "A"),
      B: pt(B, "B"),
      P: pt(P, "P"),
      C: pt(C, "C", { auxStep: 1 }),
    },
    segs: [
      sg("O", "A"), sg("O", "B"), sg("O", "P"),
      sg("P", "C", { kind: "aux", step: 1 }),
    ],
    arcs: [
      arc("O", "A", "P", { label: "α", r: 11 }),
      arc("O", "P", "B", { label: "α", r: 11 }),
    ],
    equals: [eq("O", "C", 1, "tick", 1), eq("P", "C", 1, "tick", 1)],
  };
};

const bisectorCut = (): FigureSpec => {
  const O = p(-20, 0);
  const A = polar(O, 15, 42);
  const B = polar(O, 75, 42);
  const P = polar(O, 45, 30);
  const D = polar(O, 15, 21);
  const E = polar(O, 75, 21);
  return {
    title: "角平分线截等长模型：在角的两边截取等长线段，构造全等三角形",
    points: {
      O: pt(O, "O", { offset: [-6, 3] }),
      A: pt(A, "A"),
      B: pt(B, "B"),
      P: pt(P, "P"),
      D: pt(D, "D", { auxStep: 1 }),
      E: pt(E, "E", { auxStep: 1 }),
    },
    segs: [
      sg("O", "A"), sg("O", "B"), sg("O", "P"),
      sg("D", "P", { kind: "aux", step: 1 }),
      sg("P", "E", { kind: "aux2", step: 1 }),
    ],
    arcs: [
      arc("O", "A", "P", { label: "α", r: 11 }),
      arc("O", "P", "B", { label: "α", r: 11 }),
    ],
    equals: [eq("O", "D"), eq("O", "E", 2, "tick", 1), eq("D", "P", 3, "tick", 1), eq("P", "E", 3)],
  };
};

const bisectorFold = (): FigureSpec => {
  const B = p(-40, 0);
  const C = p(10, 0);
  const A = p(-5, 25);
  const AB = dist(A, B);
  const AC = dist(A, C);
  const D = lerp(B, C, AB / (AB + AC));
  const Cp = reflect(C, A, D);
  return {
    title: "角平分线翻折模型：沿角平分线翻折，构造轴对称的全等三角形",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      D: pt(D, "D", { offset: [0, 7] }),
      Cp: pt(Cp, "C'", { auxStep: 1 }),
    },
    segs: [
      sg("A", "B"), sg("A", "C"), sg("B", "C"), sg("A", "D"),
      sg("A", "Cp", { kind: "aux", step: 1 }),
      sg("Cp", "D", { kind: "aux", step: 1 }),
    ],
    arcs: [
      arc("A", "B", "D", { label: "α", r: 9 }),
      arc("A", "D", "C", { label: "α", r: 9 }),
    ],
    equals: [eq("A", "C"), eq("A", "Cp", 2, "tick", 1), eq("C", "D", 3), eq("Cp", "D", 3, "tick", 1)],
  };
};

const doubleBisector = (): FigureSpec => {
  const A = p(-4, 32);
  const B = p(-32, 0);
  const C = p(22, 0);
  const a = dist(B, C);
  const b = dist(C, A);
  const c = dist(A, B);
  const O = mul(add(add(mul(A, a), mul(B, b)), mul(C, c)), 1 / (a + b + c));
  return {
    title: "双角平分线模型：两内角平分线的夹角等于 90° 加第三个角的一半",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      O: pt(O, "O", { auxStep: 1, offset: [7, 4] }),
    },
    segs: [
      sg("A", "B"), sg("A", "C"), sg("B", "C"),
      sg("B", "O", { kind: "aux", step: 1 }),
      sg("C", "O", { kind: "aux", step: 1 }),
    ],
    arcs: [
      arc("B", "A", "O", { label: "α", r: 8 }),
      arc("B", "O", "C", { label: "α", r: 8 }),
      arc("C", "B", "O", { label: "β", r: 8 }),
      arc("C", "O", "A", { label: "β", r: 8 }),
      arc("O", "B", "C", { label: "90°+A/2", r: 10 }),
    ],
  };
};

const bisectorIsosceles = (): FigureSpec => {
  const A = p(0, 30);
  const B = p(-24, 0);
  const C = p(24, 0);
  const D = mid(B, C);
  const E = mid(A, B);
  return {
    title: "角平分线与等腰三角形：角平分线、平行线、等腰三角形三者互相推出",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      D: pt(D, "D", { offset: [0, -7] }),
      E: pt(E, "E", { offset: [-6, 0], auxStep: 1 }),
    },
    segs: [
      sg("A", "B"), sg("A", "C"), sg("B", "C"), sg("A", "D"),
      sg("D", "E", { kind: "aux", step: 1 }),
    ],
    arcs: [
      arc("A", "B", "D", { label: "α", r: 10 }),
      arc("A", "D", "C", { label: "α", r: 10 }),
    ],
    equals: [eq("A", "E", 1, "tick", 1), eq("E", "D", 1, "tick", 1), eq("A", "B", 2), eq("A", "C", 2)],
  };
};

const bisectorCongruence = (): FigureSpec => {
  const B = p(-24, 0);
  const C = p(22, 0);
  const A = p(10, 26);
  const AB = dist(A, B);
  const AC = dist(A, C);
  const D = lerp(B, C, AB / (AB + AC));
  const E = add(A, mul(sub(B, A), AC / AB));
  return {
    title: "角平分线与全等三角形：在长边上截取与短边相等的线段",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      D: pt(D, "D", { offset: [0, 7] }),
      E: pt(E, "E", { auxStep: 1 }),
    },
    segs: [
      sg("A", "B"), sg("A", "C"), sg("B", "C"), sg("A", "D"),
      sg("D", "E", { kind: "aux", step: 1 }),
    ],
    arcs: [
      arc("A", "B", "D", { label: "α", r: 9 }),
      arc("A", "D", "C", { label: "α", r: 9 }),
    ],
    equals: [eq("A", "C"), eq("A", "E", 2, "tick", 1), eq("C", "D", 3), eq("D", "E", 3, "tick", 1)],
  };
};

/* ------------------------------------------------------------------ */
/* 第四类：轴对称与最短路径模型                                         */
/* ------------------------------------------------------------------ */

const jinjun = (): FigureSpec => {
  const l1 = p(-38, 0);
  const l2 = p(38, 0);
  const A = p(-18, 22);
  const B = p(18, 16);
  const Ap = reflect(A, l1, l2);
  const P = intersect(Ap, B, l1, l2)!;
  return {
    title: "将军饮马：作对称点，把折线拉直",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      P: pt(P, "P", { auxStep: 2, offset: [0, -7] }),
      Ap: pt(Ap, "A'", { auxStep: 1 }),
    },
    segs: [
      sg(l1, l2, { kind: "guide" }),
      sg("A", "P", { kind: "aux", step: 3 }),
      sg("P", "B", { kind: "aux", step: 3 }),
      sg("A", "Ap", { kind: "aux2", step: 1 }),
      sg("Ap", "P", { kind: "aux2", step: 2 }),
      sg("P", "B", { kind: "aux2", step: 2, dash: true }),
    ],
    equals: [eq("A", "P", 1), eq("Ap", "P", 1)],
  };
};

const hubugui = (): FigureSpec => {
  const l1 = p(-10, 0);
  const l2 = p(52, 0);
  const B = p(0, 0);
  const A = p(25, 18);
  const D = polar(B, -30, 30);
  const H = foot(A, B, D);
  const P = intersect(A, H, l1, l2)!;
  const X = p(34, 0);
  return {
    title: "胡不归：用 sinα = k 把带系数的线段转化为垂线段",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B", { offset: [0, -7] }),
      P: pt(P, "P", { auxStep: 3, offset: [0, -7] }),
      D: pt(D, "D", { auxStep: 1 }),
      H: pt(H, "H", { auxStep: 2 }),
      X: pt(X, "", { offset: [0, -7] }),
    },
    segs: [
      sg(l1, l2, { kind: "guide" }),
      sg("A", "P", { kind: "aux", step: 3 }),
      sg("P", "B", { kind: "aux", step: 3 }),
      sg("B", "D", { kind: "aux2", step: 1 }),
      sg("A", "H", { kind: "aux2", step: 2 }),
    ],
    arcs: [arc("B", "D", "X", { label: "α", r: 12 })],
    rights: [right("H", "B", "A", 2)],
  };
};

const axisBasic = (): FigureSpec => {
  const l1 = p(-38, 0);
  const l2 = p(38, 0);
  const A = p(-16, 22);
  const Ap = reflect(A, l1, l2);
  const H = p(-16, 0);
  const X = p(28, 0);
  return {
    title: "基础轴对称：对称轴垂直平分对应点连线",
    points: {
      A: pt(A, "A"),
      Ap: pt(Ap, "A'", { auxStep: 1 }),
      H: pt(H, "H", { offset: [0, -7], auxStep: 1 }),
      X: pt(X, "", { offset: [0, -7] }),
    },
    segs: [
      sg(l1, l2, { kind: "guide" }),
      sg("A", "Ap", { kind: "aux", step: 1 }),
    ],
    rights: [right("H", "X", "A", 1)],
    equals: [eq("A", "H"), eq("H", "Ap", 2, "tick", 1)],
  };
};

const foldModel = (): FigureSpec => {
  const A = p(0, 0);
  const B = p(10, 0);
  const C = p(10, 10);
  const D = p(0, 10);
  const E = p(10, 4);
  const F = reflect(B, A, E);
  return {
    title: "翻折模型：折痕是对应点连线的垂直平分线",
    points: {
      A: pt(A, "A", { offset: [-6, 6] }),
      B: pt(B, "B", { offset: [0, 7] }),
      C: pt(C, "C", { offset: [6, 6] }),
      D: pt(D, "D", { offset: [-6, -6] }),
      E: pt(E, "E"),
      F: pt(F, "F", { auxStep: 1 }),
    },
    segs: [
      sg("A", "B"), sg("B", "C"), sg("C", "D"), sg("D", "A"),
      sg("A", "E"),
      sg("A", "F", { kind: "aux", step: 1 }),
      sg("E", "F", { kind: "aux", step: 1 }),
      sg("B", "E", { kind: "aux2", step: 1, dash: false }),
    ],
    arcs: [
      arc("A", "B", "E", { label: "α", r: 7 }),
      arc("A", "E", "F", { label: "α", r: 7 }),
    ],
    rights: [right("F", "A", "E", 1)],
    equals: [eq("A", "B"), eq("A", "F", 2, "tick", 1), eq("B", "E", 3), eq("E", "F", 3, "tick", 1)],
  };
};

const shortestTransform = (): FigureSpec => {
  const O = p(0, 0);
  const A = polar(O, 10, 36);
  const B = polar(O, 70, 36);
  const P = polar(O, 40, 21);
  const P1 = reflect(P, O, A);
  const P2 = reflect(P, O, B);
  const M = intersect(P1, P2, O, A)!;
  const N = intersect(P1, P2, O, B)!;
  return {
    title: "最短路径转化：两次对称把三角形周长转化为一条线段",
    points: {
      O: pt(O, "O", { offset: [-6, 2] }),
      A: pt(A, "A"),
      B: pt(B, "B"),
      P: pt(P, "P"),
      P1: pt(P1, "P₁", { auxStep: 1 }),
      P2: pt(P2, "P₂", { auxStep: 1 }),
      M: pt(M, "M", { auxStep: 2 }),
      N: pt(N, "N", { auxStep: 2 }),
    },
    segs: [
      sg("O", "A"), sg("O", "B"), sg("O", "P"),
      sg("P", "P1", { kind: "aux2", step: 1 }),
      sg("P", "P2", { kind: "aux2", step: 1 }),
      sg("P1", "P2", { kind: "aux", step: 2 }),
      sg("P", "M", { kind: "guide", step: 2 }),
      sg("P", "N", { kind: "guide", step: 2 }),
    ],
    arcs: [
      arc("O", "A", "P", { label: "α", r: 11 }),
      arc("O", "P", "B", { label: "α", r: 11 }),
    ],
    equals: [eq("P", "M", 1, "tick", 2), eq("P1", "M", 1, "tick", 2), eq("P", "N", 2, "tick", 2), eq("P2", "N", 2, "tick", 2)],
  };
};

export const CD_BUILDERS: Record<string, () => FigureSpec> = {
  "bisector-property": bisectorProperty,
  "bisector-perp": bisectorPerp,
  "bisector-parallel": bisectorParallel,
  "bisector-cut": bisectorCut,
  "bisector-fold": bisectorFold,
  "double-bisector": doubleBisector,
  "bisector-isosceles": bisectorIsosceles,
  "bisector-congruence": bisectorCongruence,
  "general-jinjun": jinjun,
  "hu-bugui": hubugui,
  "axis-basic": axisBasic,
  "fold-model": foldModel,
  "shortest-transform": shortestTransform,
};
