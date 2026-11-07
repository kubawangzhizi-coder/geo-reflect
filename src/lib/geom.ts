/**
 * 轻量平面几何工具：所有图形坐标均由这些函数精确计算得出，
 * 保证「图上画出来的关系」与「文字描述的关系」一致。
 * 坐标系：数学坐标（y 轴向上），渲染时统一翻转。
 */
export interface P2 {
  x: number;
  y: number;
}

export const p = (x: number, y: number): P2 => ({ x, y });
export const add = (a: P2, b: P2): P2 => ({ x: a.x + b.x, y: a.y + b.y });
export const sub = (a: P2, b: P2): P2 => ({ x: a.x - b.x, y: a.y - b.y });
export const mul = (a: P2, k: number): P2 => ({ x: a.x * k, y: a.y * k });
export const dot = (a: P2, b: P2): number => a.x * b.x + a.y * b.y;
export const cross = (a: P2, b: P2): number => a.x * b.y - a.y * b.x;
export const len = (a: P2): number => Math.hypot(a.x, a.y);
export const dist = (a: P2, b: P2): number => len(sub(a, b));
export const mid = (a: P2, b: P2): P2 => mul(add(a, b), 0.5);
export const lerp = (a: P2, b: P2, t: number): P2 => add(a, mul(sub(b, a), t));
export const unit = (a: P2): P2 => {
  const l = len(a);
  return l < 1e-12 ? { x: 0, y: 0 } : mul(a, 1 / l);
};
export const perp = (a: P2): P2 => ({ x: -a.y, y: a.x });

export const deg2rad = (d: number): number => (d * Math.PI) / 180;
export const rad2deg = (r: number): number => (r * 180) / Math.PI;

/** 以 o 为中心旋转 deg 度（逆时针） */
export function rot(a: P2, deg: number, o: P2 = { x: 0, y: 0 }): P2 {
  const r = deg2rad(deg);
  const c = Math.cos(r);
  const s = Math.sin(r);
  const v = sub(a, o);
  return { x: o.x + v.x * c - v.y * s, y: o.y + v.x * s + v.y * c };
}

/** 以 o 为起点，极角 deg（度）长度 r 的点 */
export function polar(o: P2, deg: number, r: number): P2 {
  const t = deg2rad(deg);
  return { x: o.x + r * Math.cos(t), y: o.y + r * Math.sin(t) };
}

/** 点 c 在直线 ab 上的垂足 */
export function foot(c: P2, a: P2, b: P2): P2 {
  const ab = sub(b, a);
  const t = dot(sub(c, a), ab) / Math.max(dot(ab, ab), 1e-12);
  return add(a, mul(ab, t));
}

/** 点 c 关于直线 ab 的对称点 */
export function reflect(c: P2, a: P2, b: P2): P2 {
  const f = foot(c, a, b);
  return { x: 2 * f.x - c.x, y: 2 * f.y - c.y };
}

/** 直线 a1a2 与 b1b2 的交点；平行时返回 null */
export function intersect(a1: P2, a2: P2, b1: P2, b2: P2): P2 | null {
  const d1 = sub(a2, a1);
  const d2 = sub(b2, b1);
  const den = cross(d1, d2);
  if (Math.abs(den) < 1e-9) return null;
  const t = cross(sub(b1, a1), d2) / den;
  return add(a1, mul(d1, t));
}

/** 角 abc（顶点 b）的度数，范围 0—180 */
export function angleDeg(a: P2, b: P2, c: P2): number {
  const u = sub(a, b);
  const v = sub(c, b);
  const cosv = dot(u, v) / Math.max(len(u) * len(v), 1e-12);
  return rad2deg(Math.acos(Math.max(-1, Math.min(1, cosv))));
}

/** 两点连线中点方向；用于默认标签偏移 */
export function centroid(points: P2[]): P2 {
  const s = points.reduce<P2>((acc, q) => add(acc, q), { x: 0, y: 0 });
  return mul(s, 1 / Math.max(points.length, 1));
}

/** 让一组点整体平移，输出便于在 120×90 画布中排布 */
export function shift<T extends Record<string, P2>>(pts: T, d: P2): T {
  const out = {} as T;
  for (const k of Object.keys(pts) as (keyof T)[]) out[k] = add(pts[k], d) as T[keyof T];
  return out;
}

export function round(n: number, d = 2): number {
  const k = Math.pow(10, d);
  return Math.round(n * k) / k;
}
