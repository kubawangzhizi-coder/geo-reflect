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
  rot,
  sub,
} from "@/lib/geom";
import type { P2 } from "@/lib/geom";

const ray = (o: P2, deg: number, r = 300): P2 => polar(o, deg, r);

/* ------------------------------------------------------------------ */
/* 第五类：等腰三角形与等边三角形模型                                   */
/* ------------------------------------------------------------------ */

const isoscelesProperty = (): FigureSpec => {
  const A = p(0, 30);
  const B = p(-24, 0);
  const C = p(24, 0);
  const D = mid(B, C);
  return {
    title: "等腰三角形性质：等边对等角",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      D: pt(D, "D", { offset: [0, -7], auxStep: 1 }),
    },
    segs: [
      sg("A", "B"), sg("A", "C"), sg("B", "C"),
      sg("A", "D", { kind: "aux", step: 1 }),
    ],
    arcs: [
      arc("B", "A", "C", { label: "β", step: 1 }),
      arc("C", "A", "B", { label: "β", step: 1 }),
    ],
    equals: [eq("A", "B"), eq("A", "C", 2)],
  };
};

const isoscelesCriterion = (): FigureSpec => {
  const A = p(0, 28);
  const B = p(-24, 0);
  const C = p(24, 0);
  const D = p(0, 0);
  return {
    title: "等腰三角形判定：等角对等边",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      D: pt(D, "D", { offset: [0, -7], auxStep: 1 }),
    },
    segs: [
      sg("A", "B"), sg("A", "C"), sg("B", "C"),
      sg("A", "D", { kind: "aux", step: 1 }),
    ],
    arcs: [
      arc("B", "A", "C", { label: "β", r: 8 }),
      arc("C", "A", "B", { label: "β", r: 8 }),
    ],
    rights: [right("D", "B", "A", 1)],
    equals: [eq("A", "B", 1, "tick", 1), eq("A", "C", 1, "tick", 1)],
  };
};

const threeInOne = (): FigureSpec => {
  const A = p(0, 30);
  const B = p(-24, 0);
  const C = p(24, 0);
  const D = mid(B, C);
  return {
    title: "三线合一：等腰三角形顶角平分线、底边中线、底边高互相重合",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      D: pt(D, "D", { offset: [0, -7] }),
    },
    segs: [
      sg("A", "B"), sg("A", "C"), sg("B", "C"),
      sg("A", "D", { kind: "aux", step: 1 }),
    ],
    arcs: [
      arc("A", "B", "D", { label: "α", r: 10, step: 1 }),
      arc("A", "D", "C", { label: "α", r: 10, step: 1 }),
    ],
    rights: [right("D", "B", "A", 1)],
    equals: [eq("B", "D"), eq("D", "C", 2), eq("A", "B", 3), eq("A", "C", 3)],
  };
};

const buildEquilateral60 = (): FigureSpec => {
  const B = p(0, 0);
  const A = polar(B, 120, 30);
  const C = polar(B, 60, 30);
  return {
    title: "60° 构造等边三角形：夹角 60° 且两边相等，连结第三边即为等边三角形",
    points: {
      B: pt(B, "B", { offset: [0, -7] }),
      A: pt(A, "A"),
      C: pt(C, "C"),
    },
    segs: [
      sg("B", "A"), sg("B", "C"),
      sg("A", "C", { kind: "aux", step: 1 }),
    ],
    arcs: [arc("B", "A", "C", { label: "60°", r: 8 })],
    equals: [eq("B", "A"), eq("B", "C", 2), eq("A", "C", 3, "tick", 1)],
  };
};

const buildIsoRight45 = (): FigureSpec => {
  const C = p(0, 0);
  const A = p(28, 0);
  const B = p(0, 28);
  return {
    title: "45° 构造等腰直角三角形：一个直角加一个 45° 角，两直角边相等",
    points: {
      C: pt(C, "C", { offset: [-6, 7] }),
      A: pt(A, "A"),
      B: pt(B, "B"),
    },
    segs: [
      sg("C", "A"), sg("C", "B"),
      sg("A", "B", { kind: "aux", step: 1 }),
    ],
    arcs: [arc("A", "B", "C", { label: "45°", r: 8 })],
    rights: [right("C", "A", "B")],
    equals: [eq("C", "A"), eq("C", "B", 2), eq("A", "B", 3, "tick", 1)],
  };
};

const isoscelesCongruence = (): FigureSpec => {
  const A = p(0, 30);
  const B = p(-24, 0);
  const C = p(24, 0);
  const D = p(-16, 0);
  const E = p(16, 0);
  return {
    title: "等腰三角形与全等三角形：底边上截取等长线段，构造一对全等三角形",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      D: pt(D, "D", { offset: [0, 7] }),
      E: pt(E, "E", { offset: [0, 7] }),
    },
    segs: [
      sg("A", "B"), sg("A", "C"), sg("B", "C"),
      sg("A", "D", { kind: "aux", step: 1 }),
      sg("A", "E", { kind: "aux", step: 1 }),
    ],
    arcs: [
      arc("B", "A", "C", { label: "β", r: 8 }),
      arc("C", "A", "B", { label: "β", r: 8 }),
    ],
    equals: [eq("A", "B"), eq("A", "C", 2), eq("B", "D", 3), eq("E", "C", 3, "tick", 1), eq("A", "D", 4), eq("A", "E", 4, "tick", 1)],
  };
};

/* ------------------------------------------------------------------ */
/* 第六类：相似三角形与比例模型                                         */
/* ------------------------------------------------------------------ */

const similarBasic = (): FigureSpec => {
  const A = p(-22, 24);
  const B = p(-38, 0);
  const C = p(-8, 0);
  const k = 1.2;
  const tx = 52;
  const ty = 3;
  const T = (q: P2) => add(mul(q, k), p(tx, ty));
  const D = T(A);
  const E = T(B);
  const F = T(C);
  return {
    title: "相似三角形：对应角相等、对应边成比例",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      D: pt(D, "D"),
      E: pt(E, "E"),
      F: pt(F, "F"),
    },
    segs: [
      sg("A", "B"), sg("B", "C"), sg("C", "A"),
      sg("D", "E"), sg("E", "F"), sg("F", "D"),
    ],
    arcs: [
      arc("A", "B", "C", { label: "α", r: 7 }),
      arc("D", "E", "F", { label: "α", r: 8 }),
      arc("B", "A", "C", { label: "β", r: 7 }),
      arc("E", "D", "F", { label: "β", r: 8 }),
      arc("C", "A", "B", { label: "γ", r: 7 }),
      arc("F", "D", "E", { label: "γ", r: 8 }),
    ],
  };
};

const aShape = (): FigureSpec => {
  const A = p(0, 32);
  const B = p(-30, 0);
  const C = p(26, 0);
  const D = lerp(A, B, 0.42);
  const E = lerp(A, C, 0.42);
  return {
    title: "A 字模型：平行于底边的线段，截出相似三角形",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      D: pt(D, "D"),
      E: pt(E, "E"),
    },
    segs: [
      sg("A", "B"), sg("A", "C"), sg("B", "C"),
      sg("D", "E", { kind: "aux", step: 1 }),
    ],
    arcs: [arc("D", "A", "E", { label: "α", r: 8 }), arc("B", "A", "C", { label: "α", r: 8 })],
    equals: [eq("D", "E", 1, "parallel", 1), eq("B", "C", 1, "parallel", 1)],
  };
};

const antiA = (): FigureSpec => {
  const A = p(0, 32);
  const B = p(-30, 0);
  const C = p(24, 0);
  const E = lerp(A, C, 0.5);
  const angB = angleDeg(A, B, C);
  let D: P2 | null = null;
  for (const s of [1, -1]) {
    const dir = rot(sub(A, E), s * angB);
    const cand = intersect(E, add(E, dir), A, B);
    if (!cand) continue;
    const t = (cand.x - A.x) / (B.x - A.x);
    if (t > 0.02 && t < 0.98) {
      D = cand;
      break;
    }
  }
  if (!D) D = lerp(A, B, 0.5);
  return {
    title: "反 A 字模型：一对角相等，但对应边不平行",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      D: pt(D, "D"),
      E: pt(E, "E"),
    },
    segs: [
      sg("A", "B"), sg("A", "C"), sg("B", "C"), sg("D", "E"),
    ],
    arcs: [
      arc("E", "A", "D", { label: "β", r: 7 }),
      arc("B", "A", "C", { label: "β", r: 7 }),
      arc("A", "D", "E", { label: "α", r: 9 }),
      arc("A", "B", "C", { label: "α", r: 9 }),
    ],
  };
};

const eightShape = (): FigureSpec => {
  const A = p(-30, 22);
  const B = p(-5, 22);
  const C = p(2, -10);
  const D = p(42, -10);
  const O = intersect(A, C, B, D)!;
  return {
    title: "8 字模型：两条直线被一组平行线所截，形成相似三角形",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      D: pt(D, "D"),
      O: pt(O, "O", { offset: [7, -4] }),
    },
    segs: [
      sg("A", "B"), sg("C", "D"), sg("A", "C"), sg("B", "D"),
    ],
    equals: [eq("A", "B", 1, "parallel"), eq("C", "D", 1, "parallel")],
  };
};

const parallelRatio = (): FigureSpec => {
  const lines = [
    { y: 0, label: "l₁" },
    { y: 13, label: "l₂" },
    { y: 26, label: "l₃" },
  ];
  const t1a = p(-34, -6);
  const t1b = p(-8, 34);
  const t2a = p(-6, -6);
  const t2b = p(30, 34);
  const atY = (a: P2, b: P2, y: number): P2 =>
    lerp(a, b, (y - a.y) / (b.y - a.y));
  const P = {
    A: atY(t1a, t1b, 0),
    B: atY(t1a, t1b, 13),
    C: atY(t1a, t1b, 26),
    D: atY(t2a, t2b, 0),
    E: atY(t2a, t2b, 13),
    F: atY(t2a, t2b, 26),
  };
  return {
    title: "平行线分线段成比例：三条平行线截两条直线",
    points: {
      A: pt(P.A, "A"),
      B: pt(P.B, "B"),
      C: pt(P.C, "C"),
      D: pt(P.D, "D"),
      E: pt(P.E, "E"),
      F: pt(P.F, "F"),
    },
    segs: [
      ...lines.map((l) => sg(p(-38, l.y), p(34, l.y), { kind: "guide" as const })),
      sg(t1a, t1b),
      sg(t2a, t2b),
    ],
    equals: lines.flatMap((l) => [
      eq("A", "B", 1, "parallel"),
    ]).slice(0, 0),
    captions: [
      { at: p(-34, 3), text: "l₁" },
      { at: p(-34, 16), text: "l₂" },
      { at: p(-34, 29), text: "l₃" },
    ],
  };
};

const altitudeProjection = (): FigureSpec => {
  const A = p(-24, 0);
  const B = p(24, 0);
  const C = polar(p(0, 0), 70, 24);
  const D = foot(C, A, B);
  return {
    title: "母子型（射影定理）：直角三角形斜边上的高",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      D: pt(D, "D", { offset: [0, -7], auxStep: 1 }),
    },
    segs: [
      sg("A", "B"), sg("A", "C"), sg("B", "C"),
      sg("C", "D", { kind: "aux", step: 1 }),
    ],
    rights: [right("C", "A", "B"), right("D", "A", "C", 1)],
    equals: [
      eq("A", "D", 1, "tick", 1), eq("B", "D", 2, "tick", 1),
    ],
  };
};

const areaMethod = (): FigureSpec => {
  const A = p(0, 30);
  const B = p(-28, 0);
  const C = p(22, 0);
  const D = lerp(B, C, 0.4);
  return {
    title: "面积法：同高三角形的面积比等于底边比",
    points: {
      A: pt(A, "A"),
      B: pt(B, "B"),
      C: pt(C, "C"),
      D: pt(D, "D", { offset: [0, 7] }),
    },
    segs: [
      sg("A", "B"), sg("A", "C"), sg("B", "C"),
      sg("A", "D", { kind: "aux", step: 1 }),
    ],
    equals: [eq("B", "D", 1, "tick", 1), eq("D", "C", 2, "tick", 1)],
    captions: [
      { at: p(-18, 14), text: "S₁" },
      { at: p(12, 14), text: "S₂" },
    ],
  };
};

export const EF_BUILDERS: Record<string, () => FigureSpec> = {
  "isosceles-property": isoscelesProperty,
  "isosceles-criterion": isoscelesCriterion,
  "three-in-one": threeInOne,
  "build-equilateral-60": buildEquilateral60,
  "build-iso-right-45": buildIsoRight45,
  "isosceles-congruence": isoscelesCongruence,
  "similar-basic": similarBasic,
  "a-shape": aShape,
  "anti-a": antiA,
  "eight-shape": eightShape,
  "three-equal-similar": () => {
    // 与一线三等角共用图形
    const B = p(0, 0);
    const C = p(30, 0);
    const D = p(60, 0);
    const A = polar(B, 60, 20);
    const caDeg = (Math.atan2(A.y - C.y, A.x - C.x) * 180) / Math.PI;
    const E = intersect(C, ray(C, caDeg - 60), D, ray(D, 120))!;
    return {
      title: "一线三等角相似：同一直线上三个等角，得到相似三角形",
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
        arc("B", "A", "C", { label: "α" }),
        arc("C", "A", "E", { label: "α" }),
        arc("D", "C", "E", { label: "α" }),
      ],
    };
  },
  "parallel-ratio": parallelRatio,
  "altitude-projection": altitudeProjection,
  "area-method": areaMethod,
};
