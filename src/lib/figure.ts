import type { P2 } from "./geom";
import { add, sub, len } from "./geom";

export type Ref = string | P2;
export type SegKind = "base" | "aux" | "aux2" | "guide";

export interface PtDef {
  at: P2;
  label?: string;
  /** >0 表示该点是辅助线构造出的点，reveal >= auxStep 时显示 */
  auxStep?: number;
  /** 标签偏移（屏幕单位，y 向下为正） */
  offset?: [number, number];
}

export interface SegDef {
  from: Ref;
  to: Ref;
  kind?: SegKind;
  /** 辅助线步骤编号 */
  step?: number;
  dash?: boolean;
  width?: number;
}

export interface ArcDef {
  at: string;
  from: string;
  to: string;
  r?: number;
  label?: string;
  step?: number;
  kind?: SegKind;
}

export interface RightDef {
  at: string;
  from: string;
  to: string;
  step?: number;
}

export interface EqualDef {
  from: string;
  to: string;
  /** 等长标记数量 */
  n?: number;
  step?: number;
  kind?: "tick" | "parallel";
}

export interface CaptionDef {
  at: Ref;
  text: string;
  step?: number;
}

export interface FigureSpec {
  /** 图形标题（读屏用） */
  title?: string;
  W?: number;
  H?: number;
  points: Record<string, PtDef>;
  segs: SegDef[];
  arcs?: ArcDef[];
  rights?: RightDef[];
  equals?: EqualDef[];
  captions?: CaptionDef[];
}

export const pt = (at: P2, label?: string, extra: Partial<PtDef> = {}): PtDef => ({
  at,
  label,
  ...extra,
});

export const sg = (
  from: Ref,
  to: Ref,
  extra: Partial<SegDef> = {},
): SegDef => ({ from, to, ...extra });

export const arc = (at: string, from: string, to: string, extra: Partial<ArcDef> = {}): ArcDef => ({
  at,
  from,
  to,
  ...extra,
});

export const right = (at: string, from: string, to: string, step?: number): RightDef => ({
  at,
  from,
  to,
  step,
});

export const eq = (
  from: string,
  to: string,
  n = 1,
  kind: "tick" | "parallel" = "tick",
  step?: number,
): EqualDef => ({ from, to, n, kind, step });

const refPoint = (spec: FigureSpec, r: Ref): P2 =>
  typeof r === "string" ? spec.points[r].at : r;

/**
 * 将图形等比缩放并居中到统一的 120×90 画布，
 * 保证任何模型的标准图都不会超出边界。
 */
export function fit(spec: FigureSpec, W = 120, H = 90, pad = 11): FigureSpec {
  const pts: P2[] = Object.values(spec.points).map((q) => q.at);
  for (const s of spec.segs) {
    pts.push(refPoint(spec, s.from), refPoint(spec, s.to));
  }
  for (const c of spec.captions ?? []) pts.push(refPoint(spec, c.at));
  if (pts.length === 0) return { ...spec, W, H };

  const xs = pts.map((q) => q.x);
  const ys = pts.map((q) => q.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const w = Math.max(maxX - minX, 1e-6);
  const h = Math.max(maxY - minY, 1e-6);
  const k = Math.min((W - 2 * pad) / w, (H - 2 * pad) / h);
  const ox = (W - w * k) / 2 - minX * k;
  const oy = (H - h * k) / 2 - minY * k;
  const T = (q: P2): P2 => ({ x: q.x * k + ox, y: q.y * k + oy });

  const points: Record<string, PtDef> = {};
  for (const [id, def] of Object.entries(spec.points)) {
    points[id] = { ...def, at: T(def.at) };
  }

  const mapRef = (r: Ref): Ref => (typeof r === "string" ? r : T(r));

  return {
    ...spec,
    W,
    H,
    points,
    segs: spec.segs.map((s) => ({ ...s, from: mapRef(s.from), to: mapRef(s.to) })),
    arcs: (spec.arcs ?? []).map((a) => ({ ...a, r: (a.r ?? 9) * k })),
    equals: spec.equals ?? [],
    rights: spec.rights ?? [],
    captions: (spec.captions ?? []).map((c) => ({ ...c, at: mapRef(c.at) })),
  };
}

export function segLenOf(spec: FigureSpec, s: SegDef): number {
  return len(sub(refPoint(spec, s.to), refPoint(spec, s.from)));
}
