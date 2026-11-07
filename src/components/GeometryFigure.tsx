import type { CSSProperties } from "react";
import type { FigureSpec, Ref, SegDef } from "@/lib/figure";
import type { P2 } from "@/lib/geom";
import { centroid, len, sub, unit } from "@/lib/geom";

const COLORS = {
  base: "#17335f",
  aux: "#d97706",
  aux2: "#0f766e",
  guide: "#94a3b8",
} as const;

const WIDTH: Record<string, number> = {
  base: 1.6,
  aux: 1.9,
  aux2: 1.7,
  guide: 1.2,
};

interface Props {
  spec: FigureSpec;
  /** 显示到第几步辅助线（0 表示只看原图） */
  reveal?: number;
  className?: string;
  style?: CSSProperties;
  /** 隐藏文字标签，用于缩略图 */
  compact?: boolean;
}

export default function GeometryFigure({
  spec,
  reveal = 99,
  className = "",
  style,
  compact = false,
}: Props) {
  const W = spec.W ?? 120;
  const H = spec.H ?? 90;
  const SP = (q: P2): P2 => ({ x: q.x, y: H - q.y });
  const visible = (step?: number) => (step ?? 0) <= reveal;
  const resolve = (r: Ref): P2 => (typeof r === "string" ? spec.points[r].at : r);
  const colorOf = (kind?: string) =>
    kind === "aux" || kind === "aux2" || kind === "guide" ? COLORS[kind] : COLORS.base;
  const widthOf = (s: SegDef) => s.width ?? WIDTH[s.kind ?? "base"] ?? 1.6;
  const isDashed = (s: SegDef) => s.dash ?? (s.kind ? s.kind !== "base" : false);

  const visiblePoints = Object.entries(spec.points).filter(([, d]) => visible(d.auxStep));
  const center = centroid(visiblePoints.map(([, d]) => d.at));

  const segs = [...spec.segs].sort((a, b) => {
    const rank = (s: SegDef) => (s.kind === "base" || !s.kind ? 0 : 1);
    return rank(a) - rank(b);
  });

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`block w-full select-none ${className}`}
      style={style}
      role="img"
      aria-label={spec.title ?? "几何模型示意图"}
    >
      <rect x="0" y="0" width={W} height={H} fill="#f8fbff" />

      {segs.map((s, i) => {
        if (!visible(s.step)) return null;
        const a = SP(resolve(s.from));
        const b = SP(resolve(s.to));
        return (
          <line
            key={`seg-${i}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={colorOf(s.kind)}
            strokeWidth={widthOf(s)}
            strokeLinecap="round"
            strokeDasharray={isDashed(s) ? "4 2.4" : undefined}
          />
        );
      })}

      {(spec.rights ?? []).map((r, i) => {
        if (!visible(r.step) || !spec.points[r.at]) return null;
        const P = SP(spec.points[r.at].at);
        const A = SP(spec.points[r.from].at);
        const B = SP(spec.points[r.to].at);
        const u = unit(sub(A, P));
        const v = unit(sub(B, P));
        const z = 3.1;
        const p1 = { x: P.x + u.x * z, y: P.y + u.y * z };
        const p2 = { x: P.x + (u.x + v.x) * z, y: P.y + (u.y + v.y) * z };
        const p3 = { x: P.x + v.x * z, y: P.y + v.y * z };
        return (
          <path
            key={`right-${i}`}
            d={`M${p1.x},${p1.y} L${p2.x},${p2.y} L${p3.x},${p3.y}`}
            fill="none"
            stroke={COLORS.base}
            strokeWidth="1.1"
          />
        );
      })}

      {(spec.equals ?? []).map((m, i) => {
        if (!visible(m.step) || !spec.points[m.from] || !spec.points[m.to]) return null;
        const A = SP(spec.points[m.from].at);
        const B = SP(spec.points[m.to].at);
        const M = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
        const u = unit(sub(B, A));
        const v = { x: -u.y, y: u.x };
        const n = m.n ?? 1;
        if (m.kind === "parallel") {
          const parts: string[] = [];
          for (let k = 0; k < n; k++) {
            const o = (k - (n - 1) / 2) * 2;
            const tip = { x: M.x + u.x * o, y: M.y + u.y * o };
            const back = { x: tip.x - u.x * 2.4, y: tip.y - u.y * 2.4 };
            parts.push(
              `M${back.x + v.x * 2},${back.y + v.y * 2} L${tip.x},${tip.y} L${back.x - v.x * 2},${back.y - v.y * 2}`,
            );
          }
          return (
            <path
              key={`eq-${i}`}
              d={parts.join(" ")}
              fill="none"
              stroke={COLORS.base}
              strokeWidth="1.1"
              strokeLinejoin="round"
            />
          );
        }
        return (
          <g key={`eq-${i}`} stroke={COLORS.base} strokeWidth="1.2">
            {Array.from({ length: n }).map((_, k) => {
              const o = (k - (n - 1) / 2) * 1.7;
              const c = { x: M.x + u.x * o, y: M.y + u.y * o };
              return (
                <line
                  key={k}
                  x1={c.x + v.x * 2}
                  y1={c.y + v.y * 2}
                  x2={c.x - v.x * 2}
                  y2={c.y - v.y * 2}
                />
              );
            })}
          </g>
        );
      })}

      {(spec.arcs ?? []).map((a, i) => {
        if (!visible(a.step) || !spec.points[a.at] || !spec.points[a.from] || !spec.points[a.to])
          return null;
        const O = SP(spec.points[a.at].at);
        const A = SP(spec.points[a.from].at);
        const B = SP(spec.points[a.to].at);
        const r = a.r ?? 9;
        const a1 = Math.atan2(A.y - O.y, A.x - O.x);
        const a2 = Math.atan2(B.y - O.y, B.x - O.x);
        let d = a2 - a1;
        while (d > Math.PI) d -= 2 * Math.PI;
        while (d < -Math.PI) d += 2 * Math.PI;
        const sweep = d > 0 ? 1 : 0;
        const start = { x: O.x + r * Math.cos(a1), y: O.y + r * Math.sin(a1) };
        const end = { x: O.x + r * Math.cos(a2), y: O.y + r * Math.sin(a2) };
        const midA = a1 + d / 2;
        const lp = { x: O.x + (r + 4.6) * Math.cos(midA), y: O.y + (r + 4.6) * Math.sin(midA) };
        return (
          <g key={`arc-${i}`}>
            <path
              d={`M${start.x},${start.y} A${r},${r} 0 0 ${sweep} ${end.x},${end.y}`}
              fill="none"
              stroke={colorOf(a.kind)}
              strokeWidth="1.15"
              strokeDasharray={a.kind === "aux" ? "3 2" : undefined}
            />
            {a.label && (
              <text
                x={lp.x}
                y={lp.y}
                fontSize="4.8"
                fill="#475569"
                textAnchor="middle"
                dominantBaseline="central"
                fontWeight="500"
              >
                {a.label}
              </text>
            )}
          </g>
        );
      })}

      {Object.entries(spec.points).map(([id, def]) => {
        if (!visible(def.auxStep)) return null;
        const q = SP(def.at);
        const d = sub(def.at, center);
        const u = len(d) < 1e-9 ? { x: 0, y: 1 } : unit(d);
        const off = def.offset ?? [u.x * 6.2, -u.y * 6.2];
        return (
          <g key={`pt-${id}`}>
            <circle
              cx={q.x}
              cy={q.y}
              r={1.45}
              fill="#ffffff"
              stroke={def.auxStep ? COLORS.aux : COLORS.base}
              strokeWidth="1.2"
            />
            {def.label && !compact && (
              <text
                x={q.x + off[0]}
                y={q.y + off[1]}
                fontSize="5"
                fontStyle="italic"
                fontWeight="600"
                fill={def.auxStep ? "#b45309" : "#0f2557"}
                textAnchor="middle"
                dominantBaseline="central"
                style={{ paintOrder: "stroke", stroke: "#ffffff", strokeWidth: 1.6 }}
              >
                {def.label}
              </text>
            )}
          </g>
        );
      })}

      {(spec.captions ?? []).map((c, i) => {
        if (!visible(c.step)) return null;
        const q = typeof c.at === "string" ? spec.points[c.at].at : c.at;
        const qq = SP(q);
        return (
          <text
            key={`cap-${i}`}
            x={qq.x}
            y={qq.y}
            fontSize="4.4"
            fill="#64748b"
            textAnchor="middle"
            dominantBaseline="central"
          >
            {c.text}
          </text>
        );
      })}
    </svg>
  );
}
