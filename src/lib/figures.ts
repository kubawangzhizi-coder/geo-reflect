import type { FigureSpec } from "@/lib/figure";
import { arc, eq, fit, pt, right, sg } from "@/lib/figure";
import {
  add,
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
  unit,
} from "@/lib/geom";
import type { P2 } from "@/lib/geom";
import { CD_BUILDERS } from "./figures-cd";
import { EF_BUILDERS } from "./figures-ef";

const ray = (o: P2, deg: number, r = 300): P2 => polar(o, deg, r);
const degOf = (v: P2) => (Math.atan2(v.y, v.x) * 180) / Math.PI;

/* ------------------------------------------------------------------ */
/* 第一类：全等三角形与旋转模型                                         */
/* ------------------------------------------------------------------ */

const handshake = (): FigureSpec => {
  const A = p(0, 0);
  const B = polar(A, 200, 28);
  const C = rot(B, 60, A);
  const D = polar(A, 310, 28);
  const E = rot(D, 60, A);
  return {
    title: "手拉手模型：两个共顶点等腰三角形，连接对应底角点",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      D: pt(D, "D"),
      E: pt(E, "E"),
    },
    segs: [
      sg("A", "B"), sg("A", "C"), sg("B", "C"),
      sg("A", "D"), sg("A", "E"), sg("D", "E"),
      sg("B", "D", { kind: "aux", step: 1 }),
      sg("C", "E", { kind: "aux", step: 1 }),
    ],
    arcs: [
      arc("A", "B", "C", { label: "60°" }),
      arc("A", "D", "E", { label: "60°" }),
      arc("A", "B", "D", { label: "旋转角", r: 15 }),
    ],
    equals: [eq("A", "B"), eq("A", "C"), eq("A", "D", 2), eq("A", "E", 2)],
  };
};

const footFoot = (): FigureSpec => {
  const A = p(-22, 0);
  const B = p(22, 0);
  const C = p(0, 34);
  const D = p(0, -30);
  const M = p(0, 0);
  return {
    title: "脚拉脚模型：两个等腰三角形共底边，连结两顶角",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      D: pt(D, "D"),
      M: pt(M, "M", { auxStep: 2 }),
    },
    segs: [
      sg("A", "B"), sg("C", "A"), sg("C", "B"), sg("D", "A"), sg("D", "B"),
      sg("C", "M", { kind: "aux", step: 1 }),
      sg("M", "D", { kind: "aux", step: 1 }),
    ],
    rights: [right("M", "A", "C", 1)],
    equals: [eq("C", "A"), eq("C", "B"), eq("D", "A", 2), eq("D", "B", 2)],
  };
};

const backToBack = (): FigureSpec => {
  const A = p(-22, 0);
  const B = p(22, 0);
  const C = p(0, 38.1);
  const D = p(0, -38.1);
  const M = p(0, 0);
  return {
    title: "背靠背模型：两个等边三角形共边，位于两侧",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      D: pt(D, "D"),
      M: pt(M, "M", { auxStep: 1 }),
    },
    segs: [
      sg("A", "B"), sg("A", "C"), sg("B", "C"), sg("A", "D"), sg("B", "D"),
      sg("C", "M", { kind: "aux", step: 1 }),
      sg("M", "D", { kind: "aux", step: 1 }),
    ],
    arcs: [arc("A", "C", "D", { label: "120°" }), arc("C", "A", "B", { label: "60°" })],
    rights: [right("M", "A", "C", 1)],
    equals: [eq("A", "C"), eq("B", "C"), eq("A", "D", 2), eq("B", "D", 2)],
  };
};

const threePerp = (): FigureSpec => {
  const A = p(0, 0);
  const B = p(-14, 0);
  const C = p(18, 0);
  const D = p(-14, 18);
  const E = p(18, 14);
  return {
    title: "一线三垂直模型：三个直角顶点在同一条直线上",
    points: {
      A: pt(A, "A", { offset: [0, 8] }),
      B: pt(B, "B", { offset: [-1, 8] }),
      C: pt(C, "C", { offset: [1, 8] }),
      D: pt(D, "D"),
      E: pt(E, "E"),
    },
    segs: [
      sg(p(-34, 0), p(38, 0), { kind: "guide" }),
      sg("A", "D"),
      sg("A", "E"),
      sg("B", "D", { kind: "aux", step: 1 }),
      sg("C", "E", { kind: "aux", step: 1 }),
    ],
    arcs: [arc("A", "D", "E", { label: "90°" })],
    rights: [right("B", "A", "D", 1), right("C", "A", "E", 1)],
    equals: [eq("A", "D"), eq("A", "E", 2), eq("A", "B", 3), eq("C", "E", 3), eq("B", "D", 4), eq("A", "C", 4)],
  };
};

const threeAngle = (): FigureSpec => {
  const B = p(0, 0);
  const C = p(30, 0);
  const D = p(60, 0);
  const A = polar(B, 60, 20);
  const caDeg = degOf(sub(A, C));
  const E = intersect(C, ray(C, caDeg - 60), D, ray(D, 120))!;
  return {
    title: "一线三等角模型：同一直线上三个相等的角",
    points: {
      B: pt(B, "B", { offset: [-2, 7] }),
      C: pt(C, "C", { offset: [0, -7] }),
      D: pt(D, "D", { offset: [2, 7] }),
      A: pt(A, "A"),
      E: pt(E, "E"),
    },
    segs: [
      sg(p(-8, 0), p(68, 0), { kind: "guide" }),
      sg("A", "B"), sg("B", "C"), sg("C", "D"),
      sg("A", "C"), sg("C", "E"), sg("D", "E"),
    ],
    arcs: [
      arc("B", "A", "C", { label: "α", step: 1 }),
      arc("C", "A", "E", { label: "α", step: 1 }),
      arc("D", "C", "E", { label: "α", step: 1 }),
    ],
  };
};

const brahmagupta = (): FigureSpec => {
  const A = p(0, 0);
  const B = p(18, 0);
  const C = polar(A, 75, 16);
  const R = (q: P2) => rot(q, 90);
  const E = mul(R(B), -1);
  const D = add(B, E);
  const G = R(C);
  const F = add(C, G);
  const H = foot(A, B, C);
  const M = mid(E, G);
  return {
    title: "婆罗摩笈多模型：以三角形两边向外作正方形",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      D: pt(D, "D"),
      E: pt(E, "E"),
      F: pt(F, "F"),
      G: pt(G, "G"),
      H: pt(H, "H", { auxStep: 2 }),
      M: pt(M, "M", { auxStep: 2 }),
    },
    segs: [
      sg("A", "B"), sg("B", "C"), sg("C", "A"),
      sg("B", "D"), sg("D", "E"), sg("E", "A"),
      sg("C", "F"), sg("F", "G"), sg("G", "A"),
      sg("B", "G", { kind: "aux", step: 1 }),
      sg("C", "E", { kind: "aux", step: 1 }),
      sg("E", "G", { kind: "aux", step: 2 }),
      sg("M", "H", { kind: "aux", step: 2 }),
    ],
    rights: [right("H", "B", "A", 2)],
    equals: [eq("E", "M", 1, "tick", 2), eq("M", "G", 1, "tick", 2)],
  };
};

const equilateralBuild = (): FigureSpec => {
  const A = p(-15, 0);
  const B = p(15, 0);
  const C = p(0, 15 / Math.sqrt(3));
  const D = p(0, -25.98);
  return {
    title: "等边三角形构造：以一条边为边向外作等边三角形",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      D: pt(D, "D", { auxStep: 1 }),
    },
    segs: [
      sg("A", "B"), sg("A", "C"), sg("B", "C"),
      sg("A", "D", { kind: "aux", step: 1 }),
      sg("B", "D", { kind: "aux", step: 1 }),
      sg("C", "D", { kind: "aux2", step: 2 }),
    ],
    arcs: [arc("C", "A", "B", { label: "120°" })],
    equals: [eq("A", "C"), eq("C", "B"), eq("A", "D", 2, "tick", 1), eq("B", "D", 2, "tick", 1)],
  };
};

const isoRightBuild = (): FigureSpec => {
  const A = p(-15, 0);
  const B = p(15, 0);
  const C = p(0, 15);
  const D = p(0, 0);
  const E = lerp(A, C, 0.35);
  const F = lerp(B, C, 0.65);
  return {
    title: "等腰直角三角形构造：连接斜边中点得到两个等腰直角三角形",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      D: pt(D, "D"),
      E: pt(E, "E"),
      F: pt(F, "F"),
    },
    segs: [
      sg("A", "B"), sg("C", "A"), sg("C", "B"),
      sg("D", "E"), sg("D", "F"),
      sg("C", "D", { kind: "aux", step: 1 }),
    ],
    rights: [right("C", "A", "B"), right("D", "E", "F")],
    equals: [eq("A", "C"), eq("C", "B"), eq("A", "D", 2), eq("D", "B", 2), eq("D", "E", 3), eq("D", "F", 3)],
  };
};

const halfAngle = (): FigureSpec => {
  const A = p(0, 0);
  const B = p(10, 0);
  const C = p(10, 10);
  const D = p(0, 10);
  const E = p(10, 4);
  const aE = degOf(sub(E, A));
  const F = intersect(A, ray(A, aE + 45), D, C)!;
  const G = rot(E, 90, A);
  return {
    title: "半角模型：正方形中 45° 角，绕顶点旋转 90° 补形",
    points: {
      A: pt(A, "A", { offset: [-6, 6] }),
      B: pt(B, "B", { offset: [0, 7] }),
      C: pt(C, "C", { offset: [6, 6] }),
      D: pt(D, "D", { offset: [-6, -6] }),
      E: pt(E, "E"),
      F: pt(F, "F"),
      G: pt(G, "G", { auxStep: 1 }),
    },
    segs: [
      sg("A", "B"), sg("B", "C"), sg("C", "D"), sg("D", "A"),
      sg("A", "E"), sg("A", "F"), sg("E", "F"),
      sg("A", "G", { kind: "aux", step: 1 }),
      sg("G", "F", { kind: "aux", step: 1 }),
    ],
    arcs: [arc("A", "E", "F", { label: "45°" }), arc("A", "B", "D", { label: "90°" })],
    rights: [right("B", "A", "C"), right("D", "A", "C")],
    equals: [eq("A", "B"), eq("A", "D", 2), eq("B", "E"), eq("D", "G", 2), eq("E", "F", 3), eq("F", "G", 3)],
  };
};

const rotationCongruence = (): FigureSpec => {
  const A = p(0, 0);
  const B = p(30, 0);
  const C = p(15, 25.98);
  const D = lerp(B, C, 0.55);
  const E = rot(D, 60, A);
  return {
    title: "旋转全等模型：绕公共顶点旋转 60° 得到全等三角形",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      D: pt(D, "D"),
      E: pt(E, "E"),
    },
    segs: [
      sg("A", "B"), sg("B", "C"), sg("C", "A"), sg("A", "D"),
      sg("D", "E"), sg("E", "A"),
      sg("B", "D", { kind: "aux", step: 1 }),
      sg("C", "E", { kind: "aux", step: 1 }),
    ],
    arcs: [arc("A", "B", "C", { label: "60°" }), arc("A", "D", "E", { label: "60°" })],
    equals: [eq("A", "D", 1), eq("A", "E", 2), eq("D", "E", 3), eq("A", "B", 3), eq("A", "C", 3)],
  };
};

const cutPatch = (): FigureSpec => {
  const B = p(-10, 0);
  const C = p(10, 0);
  const A = p(-5, 8.66);
  const AB = dist(A, B);
  const AC = dist(A, C);
  const D = lerp(B, C, AB / (AB + AC));
  const F = add(A, mul(unit(sub(C, A)), AB));
  return {
    title: "截长补短模型：在长线段上截取一段等于短线段",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      D: pt(D, "D", { offset: [0, 7] }),
      F: pt(F, "F", { auxStep: 1 }),
    },
    segs: [
      sg("A", "B"), sg("B", "C"), sg("C", "A"), sg("A", "D"),
      sg("D", "F", { kind: "aux", step: 1 }),
    ],
    arcs: [arc("B", "A", "C", { label: "60°" }), arc("C", "A", "B", { label: "30°" })],
    equals: [eq("A", "B"), eq("A", "F", 2, "tick", 1), eq("B", "D", 3), eq("D", "F", 3, "tick", 1)],
  };
};

const doubleSegment = (): FigureSpec => {
  const A = p(-24, 0);
  const B = p(24, 0);
  const O = p(0, 0);
  const C = p(0, 24);
  const D = p(0, -24);
  return {
    title: "倍长线段模型：把线段延长一倍，构造中心对称的全等三角形",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      O: pt(O, "O", { offset: [0, -7] }),
      C: pt(C, "C"),
      D: pt(D, "D", { auxStep: 1 }),
    },
    segs: [
      sg("A", "B"), sg("A", "C"), sg("C", "O"),
      sg("O", "D", { kind: "aux", step: 1 }),
      sg("B", "D", { kind: "aux2", step: 1 }),
    ],
    equals: [eq("A", "O"), eq("O", "B", 2), eq("C", "O", 3), eq("O", "D", 3, "tick", 1)],
  };
};

const oppositeAngle = (): FigureSpec => {
  const A = p(0, 0);
  const B = p(1, 0);
  const C = p(1.5, 0.866);
  const D = p(-0.5, 0.866);
  const Cp = rot(C, 120, A);
  return {
    title: "对角互补模型：旋转后两线段共线，把线段和转化为一条线段",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B", { offset: [2, -6] }),
      C: pt(C, "C", { offset: [5, 3] }),
      D: pt(D, "D", { offset: [-3, 5] }),
      Cp: pt(Cp, "C'", { auxStep: 1 }),
    },
    segs: [
      sg("A", "B"), sg("B", "C"), sg("C", "D"), sg("D", "A"),
      sg("A", "Cp", { kind: "aux", step: 1 }),
      sg("Cp", "D", { kind: "aux", step: 1 }),
      sg("C", "Cp", { kind: "aux2", step: 2 }),
    ],
    arcs: [arc("A", "B", "D", { label: "120°" }), arc("C", "B", "D", { label: "60°" })],
    equals: [eq("A", "B"), eq("A", "D", 2), eq("B", "C", 3), eq("D", "C'", 3, "tick", 1)],
  };
};

const specialAngleRotate = (): FigureSpec => {
  const A = p(0, 0);
  const B = p(30, 0);
  const C = p(15, 25.98);
  const P = p(13, 8);
  const Pp = rot(P, 60, A);
  return {
    title: "特殊角旋转模型：绕等边三角形顶点旋转 60° 聚合三条线段",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      P: pt(P, "P"),
      Pp: pt(Pp, "P'", { auxStep: 1 }),
    },
    segs: [
      sg("A", "B"), sg("B", "C"), sg("C", "A"),
      sg("A", "P"), sg("B", "P"), sg("C", "P"),
      sg("A", "Pp", { kind: "aux", step: 1 }),
      sg("P", "Pp", { kind: "aux", step: 1 }),
      sg("Pp", "C", { kind: "aux2", step: 1 }),
    ],
    arcs: [arc("A", "B", "C", { label: "60°" }), arc("A", "P", "Pp", { label: "60°", kind: "aux", step: 1 })],
    equals: [eq("A", "P", 1), eq("A", "Pp", 1, "tick", 1), eq("B", "P", 2), eq("Pp", "C", 2, "tick", 1)],
  };
};

/* ------------------------------------------------------------------ */
/* 第二类：中点与线段关系模型                                           */
/* ------------------------------------------------------------------ */

const doubleMedian = (): FigureSpec => {
  const A = p(0, 26);
  const B = p(-24, 0);
  const C = p(20, 0);
  const D = mid(B, C);
  const E = sub(mul(D, 2), A);
  return {
    title: "倍长中线模型：延长中线一倍，构造全等三角形",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      D: pt(D, "D"),
      E: pt(E, "E", { auxStep: 1 }),
    },
    segs: [
      sg("A", "B"), sg("B", "C"), sg("C", "A"), sg("A", "D"),
      sg("D", "E", { kind: "aux", step: 1 }),
      sg("B", "E", { kind: "aux2", step: 1 }),
    ],
    equals: [eq("B", "D"), eq("D", "C", 2), eq("A", "D", 3), eq("D", "E", 3, "tick", 1)],
  };
};

const midline = (): FigureSpec => {
  const A = p(0, 28);
  const B = p(-26, 0);
  const C = p(26, 0);
  const D = mid(A, B);
  const E = mid(A, C);
  return {
    title: "三角形中位线模型：连结两边中点",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      D: pt(D, "D"),
      E: pt(E, "E"),
    },
    segs: [
      sg("A", "B"), sg("B", "C"), sg("C", "A"),
      sg("D", "E", { kind: "aux", step: 1 }),
    ],
    equals: [eq("A", "D"), eq("D", "B", 2), eq("A", "E", 3), eq("E", "C", 3)],
  };
};

const hypotenuseMedian = (): FigureSpec => {
  const A = p(-22, 0);
  const B = p(22, 0);
  const C = polar(p(0, 0), 70, 22);
  const D = p(0, 0);
  return {
    title: "斜边中线模型：直角三角形斜边中线等于斜边一半",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      D: pt(D, "D", { offset: [0, -7] }),
    },
    segs: [
      sg("A", "B"), sg("A", "C"), sg("B", "C"),
      sg("C", "D", { kind: "aux", step: 1 }),
    ],
    rights: [right("C", "A", "B")],
    equals: [eq("A", "D"), eq("D", "B", 2), eq("C", "D", 3, "tick", 1)],
  };
};

const butterflyX = (): FigureSpec => {
  const A = p(0, 0);
  const B = p(22, 0);
  const C = p(28, 16);
  const D = p(6, 16);
  const O = mid(A, C);
  return {
    title: "蝴蝶模型：一组平行线加一个中点，构成 8 字全等",
    points: {
      A: pt(A, "A", { offset: [-5, -6] }),
      B: pt(B, "B", { offset: [5, -6] }),
      C: pt(C, "C"),
      D: pt(D, "D"),
      O: pt(O, "O", { offset: [7, 0], auxStep: 1 }),
    },
    segs: [
      sg("A", "B"), sg("C", "D"), sg("A", "C"),
      sg("B", "O", { kind: "aux", step: 1 }),
      sg("O", "D", { kind: "aux", step: 1 }),
    ],
    equals: [eq("A", "B", 1, "parallel"), eq("C", "D", 1, "parallel"), eq("A", "O"), eq("O", "C", 2)],
  };
};

const midpointCongruence = (): FigureSpec => {
  const A = p(0, 30);
  const B = p(-24, 0);
  const C = p(24, 0);
  const D = p(0, 0);
  const P = p(4, 16);
  return {
    title: "中点与全等构造：等腰三角形底边中点，连结顶点与中点",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      D: pt(D, "D"),
      P: pt(P, "P"),
    },
    segs: [
      sg("A", "B"), sg("A", "C"), sg("B", "C"), sg("A", "D"),
      sg("B", "P", { kind: "aux", step: 1 }),
      sg("C", "P", { kind: "aux2", step: 1 }),
    ],
    rights: [right("D", "B", "A", 1)],
    equals: [eq("A", "B"), eq("A", "C", 2), eq("B", "D", 3), eq("D", "C", 3, "tick", 1)],
  };
};

const midpointParallel = (): FigureSpec => {
  const A = p(0, 34);
  const B = p(-26, 0);
  const C = p(22, 0);
  const D = mid(B, C);
  const E = mid(A, D);
  const F = intersect(A, C, B, E)!;
  const N = mid(F, C);
  return {
    title: "中点与平行线构造：作平行线把中点条件转化为中位线",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      D: pt(D, "D", { offset: [0, -7] }),
      E: pt(E, "E", { offset: [-6, 0] }),
      F: pt(F, "F", { auxStep: 1 }),
      N: pt(N, "N", { auxStep: 2 }),
    },
    segs: [
      sg("A", "B"), sg("B", "C"), sg("C", "A"),
      sg("A", "D"),
      sg("B", "F", { kind: "aux", step: 1 }),
      sg("D", "N", { kind: "aux2", step: 2 }),
    ],
    equals: [eq("B", "D"), eq("D", "C", 2), eq("A", "E", 3), eq("E", "D", 3, "tick", 1), eq("F", "N", 4), eq("N", "C", 4, "tick", 1)],
  };
};

const segmentSumTransform = (): FigureSpec => {
  const B = p(-10, 0);
  const C = p(10, 0);
  const A = p(-5, 8.66);
  const D = foot(A, B, C);
  const E = add(D, sub(D, B));
  return {
    title: "线段和差转化：用垂线把两条线段拼成一条线段",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      D: pt(D, "D", { offset: [0, 7] }),
      E: pt(E, "E", { auxStep: 2 }),
    },
    segs: [
      sg("A", "B"), sg("B", "C"), sg("C", "A"), sg("A", "D"),
      sg("A", "E", { kind: "aux", step: 1 }),
    ],
    arcs: [arc("B", "A", "D", { label: "60°" }), arc("C", "A", "B", { label: "30°" })],
    rights: [right("D", "C", "A")],
    equals: [eq("B", "D"), eq("D", "E", 2, "tick", 1), eq("A", "B", 3), eq("A", "E", 3), eq("A", "E", 4), eq("E", "C", 4)],
  };
};

export const FIGURE_BUILDERS = {
  handshake,
  ...CD_BUILDERS,
  ...EF_BUILDERS,
  "foot-foot": footFoot,
  "back-to-back": backToBack,
  "one-line-three-perp": threePerp,
  "one-line-three-angle": threeAngle,
  brahmagupta,
  "equilateral-build": equilateralBuild,
  "iso-right-build": isoRightBuild,
  "half-angle": halfAngle,
  "rotation-congruence": rotationCongruence,
  "cut-patch": cutPatch,
  "double-segment": doubleSegment,
  "opposite-angle-supplement": oppositeAngle,
  "special-angle-rotate": specialAngleRotate,
  "double-median": doubleMedian,
  midline,
  "hypotenuse-median": hypotenuseMedian,
  "butterfly-x": butterflyX,
  "midpoint-congruence": midpointCongruence,
  "midpoint-parallel": midpointParallel,
  "segment-sum-transform": segmentSumTransform,
} as const;

export const buildFigure = (id: string): FigureSpec => {
  const fn = (FIGURE_BUILDERS as Record<string, () => FigureSpec>)[id];
  if (!fn) throw new Error(`未知图形 id: ${id}`);
  return fit(fn());
};

export const FIGURE_IDS = Object.keys(FIGURE_BUILDERS);
