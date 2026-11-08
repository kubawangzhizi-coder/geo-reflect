"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import FigureStage from "./FigureStage";
import MathText from "./MathText";
import MiniFigure from "./MiniFigure";
import type { AuxStep } from "@/data/types";

export interface ArchiveTape {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  categoryEn: string;
  figure: string;
  difficulty: number;
  importance: number;
  summary: string;
  definition: string;
  conditions: string[];
  auxSteps: AuxStep[];
  newRelations: string[];
  tags: string[];
}

const DIFF_LABEL: Record<number, string> = { 1: "入门", 2: "进阶", 3: "挑战" };

const CATEGORY_HUE: Record<string, number> = {
  congruence: 226,
  midpoint: 248,
  bisector: 158,
  axis: 38,
  isosceles: 352,
  similarity: 192,
};

/** 每个模型一套书封颜色与轻微形状差异（同一分类内色相、明度、书角都不同） */
function coverTone(categoryId: string, index: number) {
  const base = CATEGORY_HUE[categoryId] ?? 222;
  const hue = (base + ((index % 5) - 2) * 5 + 360) % 360;
  const sat = 24 + (index % 4) * 6;
  const light = 23 + (index % 5) * 3.5;
  const cut = 4 + ((index * 5) % 14);
  const tilt = ((index % 5) - 2) * 0.28;
  return {
    bg: `hsl(${hue} ${sat}% ${light}%)`,
    border: `hsl(${hue} ${Math.min(38, sat + 6)}% ${Math.max(16, light - 8)}%)`,
    cut,
    tilt,
  };
}

function smoothstep(t: number) {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

export default function ArchiveShelf({ tapes }: { tapes: ArchiveTape[] }) {
  const n = tapes.length;
  const heroRef = useRef<HTMLElement>(null);
  const shelfRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);
  const tapeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const coverRefs = useRef<(HTMLDivElement | null)[]>([]);
  const spineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ringRef = useRef<HTMLButtonElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<HTMLButtonElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const sheetOpenRef = useRef(false);

  const [active, setActive] = useState(Math.min(5, n - 1));
  const [dir, setDir] = useState(1);
  const [detail, setDetail] = useState<ArchiveTape | null>(null);
  const [detailIndex, setDetailIndex] = useState(Math.min(5, n - 1));
  const [sheetMounted, setSheetMounted] = useState(false);

  const sRef = useRef(Math.min(5, n - 1));
  const tRef = useRef(Math.min(5, n - 1));
  const lastActive = useRef(Math.min(5, n - 1));
  const dragRef = useRef({ dragging: false, startX: 0, startT: 0, moved: 0 });
  const hoverRef = useRef<number | null>(null);
  const liftRef = useRef<number[]>(Array(n).fill(0));
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const tiltRef = useRef({ x: 0, y: 0 });
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const geoRef = useRef({ H: 300, ws: 50, d: 156, gap: 10, U: 390, P: 1400, XS: [0] });

  /* ---------- measurement ---------- */
  const measure = useCallback(() => {
    const probe = probeRef.current;
    if (!probe) return;
    const H = probe.getBoundingClientRect().height || 300;
    const ws = (H * 142) / 840;
    const d = H * 0.6;
    const gap = H * 0.035;
    const U = H * (window.innerWidth < 768 ? 1.05 : 1.3);
    const P = 1400;
    const XS: number[] = [0];
    let acc = 0;
    for (let u = 2; u <= 3 * U; u += 2) {
      acc += 2 / (1 + Math.pow(u / U, 1.6));
      XS.push(acc);
    }
    geoRef.current = { H, ws, d, gap, U, P, XS };
    const hero = heroRef.current;
    if (hero) {
      hero.style.setProperty("--ws", `${ws}px`);
      hero.style.setProperty("--d", `${d}px`);
    }
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (heroRef.current) ro.observe(heroRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  /* ---------- geometry helpers ---------- */
  const rel = (v: number, s: number) => {
    let r = (((v - s) % n) + n) % n;
    if (r > n / 2) r -= n;
    return r;
  };
  const B = (r: number) => {
    if (Math.abs(r) >= 1) return 0.5 * Math.sign(r || 1);
    return (r + Math.sin(Math.PI * r) / Math.PI) / 2;
  };
  const F = (r: number) => {
    const { ws, gap, d } = geoRef.current;
    return r * (ws + gap) + (d - ws + 1.4 * gap) * B(r);
  };
  const scl = (u: number) => {
    const { U } = geoRef.current;
    return 1 / (1 + Math.pow(Math.abs(u) / U, 1.6));
  };
  const xsc = (u: number) => {
    const { XS } = geoRef.current;
    const a = Math.abs(u) / 2;
    const i = Math.floor(a);
    if (i >= XS.length - 1) return Math.sign(u || 1) * XS[XS.length - 1];
    const f = a - i;
    return Math.sign(u || 1) * (XS[i] + (XS[i + 1] - XS[i]) * f);
  };

  /* ---------- animation loop ---------- */
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(50, now - last) / 1000;
      last = now;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const drag = dragRef.current;
      if (reduced) {
        sRef.current = tRef.current;
      } else {
        const k = drag.dragging ? 18 : 5.2;
        sRef.current += (tRef.current - sRef.current) * (1 - Math.exp(-k * dt));
      }
      const s = sRef.current;
      const { H, ws, d, U } = geoRef.current;

      const act = ((Math.round(s) % n) + n) % n;
      if (act !== lastActive.current) {
        const next = act;
        setDir(Math.sign((tRef.current - sRef.current) || 1));
        lastActive.current = next;
        setActive(next);
      }

      const settled = Math.abs(tRef.current - s) < 0.3;
      const px = pointerRef.current;
      const cx = window.innerWidth / 2;
      const cy = (heroRef.current?.getBoundingClientRect().top ?? 0) + window.innerHeight * 0.52;
      const onCover =
        px.active &&
        settled &&
        Math.abs(px.x - cx) < d * 0.55 &&
        Math.abs(px.y - cy) < H * 0.55;

      const tiltTX = onCover ? ((px.x - cx) / (d * 0.55)) * 8 : ((px.x - cx) / window.innerWidth) * 4;
      const tiltTY = onCover ? -((px.y - cy) / (H / 2)) * 5 : 0;
      tiltRef.current.x += (tiltTX - tiltRef.current.x) * (1 - Math.exp(-7 * dt));
      tiltRef.current.y += (tiltTY - tiltRef.current.y) * (1 - Math.exp(-7 * dt));

      for (let v = 0; v < n; v++) {
        const el = tapeRefs.current[v];
        if (!el) continue;
        const r = rel(v, s);
        const o = smoothstep(Math.max(0, 1 - Math.abs(r)));
        const u = F(r);
        if (Math.abs(u) > U * 1.95) {
          el.style.visibility = "hidden";
          continue;
        }
        el.style.visibility = "visible";
        const sc = scl(u);
        const k = 1 / sc;

        const targetLift = hoverRef.current === v && Math.abs(r) > 0.5 ? 1 : 0;
        liftRef.current[v] += (targetLift - liftRef.current[v]) * (reduced ? 1 : 1 - Math.exp(-12 * dt));
        const lift = liftRef.current[v];

        const z = geoRef.current.P * (1 - k) + o * H * 0.1;
        const x = xsc(u) * k;
        const y = (H * 0.5 * (1 - sc) * 0.42 + o * H * 0.012 - lift * H * 0.05) * k;
        const ry =
          Math.sign(u || 1) * Math.min(1, Math.abs(u) / U) * 26 * (1 - o) -
          90 * o +
          (v === act ? tiltRef.current.x * o : 0);
        const rx = v === act ? tiltRef.current.y * o : 0;

        el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        el.style.zIndex = String(Math.round(3000 + z));

        const spine = spineRefs.current[v];
        const cover = coverRefs.current[v];
        if (spine) spine.style.setProperty("--shade", String(Math.min(0.6, o * 0.55 + (1 - sc) * 0.32)));
        if (cover) cover.style.setProperty("--shade", String((1 - o) * 0.82));
      }

      /* play ring */
      const ring = ringRef.current;
      if (ring) {
        const show = smoothstep(Math.max(0, 1 - Math.abs(tRef.current - s) * 3)) * (sheetOpenRef.current ? 0 : 1);
        const hero = heroRef.current;
        const shelf = shelfRef.current;
        const cov = coverRefs.current[act];
        if (hero && cov && shelf) {
          const cr = cov.getBoundingClientRect();
          const sr = shelf.getBoundingClientRect();
          ring.style.left = `${cr.left - sr.left + cr.width * 0.18}px`;
          ring.style.top = `${cr.top - sr.top + cr.height * 0.76}px`;
        }
        ring.style.transform = `translate(-50%, -50%) scale(${show})`;
        ring.style.opacity = show > 0.02 ? "1" : "0";
        ring.style.pointerEvents = show > 0.6 ? "auto" : "none";
      }
      /* timeline dot */
      if (dotRef.current) {
        const frac = ((s % n) + n) % n / (n - 1 || 1);
        dotRef.current.style.left = `${frac * 100}%`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [n]);

  /* ---------- wheel + drag ---------- */
  useEffect(() => {
    const shelf = shelfRef.current;
    if (!shelf) return;
    const onWheel = (e: WheelEvent) => {
      if (sheetOpenRef.current) return;
      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      tRef.current += (delta / (geoRef.current.ws + geoRef.current.gap)) * 0.5;
      if (wheelTimer.current) clearTimeout(wheelTimer.current);
      wheelTimer.current = setTimeout(() => {
        tRef.current = Math.round(tRef.current);
      }, 160);
    };
    const onDown = (e: PointerEvent) => {
      if (sheetOpenRef.current) return;
      dragRef.current = { dragging: true, startX: e.clientX, startT: tRef.current, moved: 0 };
      shelf.setPointerCapture?.(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY, active: true };
      const dref = dragRef.current;
      if (!dref.dragging) return;
      const dx = e.clientX - dref.startX;
      dref.moved = Math.max(dref.moved, Math.abs(dx));
      tRef.current = dref.startT - dx / (geoRef.current.ws + geoRef.current.gap);
    };
    const onUp = () => {
      const dref = dragRef.current;
      if (!dref.dragging) return;
      dref.dragging = false;
      tRef.current = Math.round(tRef.current);
    };
    const onLeave = () => {
      pointerRef.current.active = false;
    };
    shelf.addEventListener("wheel", onWheel, { passive: false });
    shelf.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    shelf.addEventListener("pointerleave", onLeave);
    return () => {
      shelf.removeEventListener("wheel", onWheel);
      shelf.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      shelf.removeEventListener("pointerleave", onLeave);
      if (wheelTimer.current) clearTimeout(wheelTimer.current);
    };
  }, []);

  /* ---------- keyboard ---------- */
  const go = useCallback((step: number) => {
    tRef.current = Math.round(tRef.current) + step;
  }, []);
  const jumpTo = useCallback(
    (index: number) => {
      const base = Math.round(tRef.current);
      const target = base + rel(index, base);
      tRef.current = target;
    },
    [n],
  );

  const openDetail = useCallback(
    (tape: ArchiveTape, index: number) => {
      const base = Math.round(tRef.current);
      tRef.current = base + rel(index, base);
      sheetOpenRef.current = true;
      setDetailIndex(index);
      setDetail(tape);
      setSheetMounted(true);
    },
    [n],
  );

  const closeDetail = useCallback(() => {
    const sheet = detailRef.current;
    const finish = () => {
      sheetOpenRef.current = false;
      setSheetMounted(false);
      setDetail(null);
      document.body.style.overflow = "";
    };
    if (!sheet) return finish();
    const coverEl = coverRefs.current[detailIndex];
    const rect = coverEl?.getBoundingClientRect();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !rect) {
      finish();
      return;
    }
    const anim = sheet.animate(
      [
        { clipPath: "inset(0px 0px 0px 0px round 0px)" },
        {
          clipPath: `inset(${rect.top}px ${window.innerWidth - rect.right}px ${
            window.innerHeight - rect.bottom
          }px ${rect.left}px round 3px)`,
        },
      ],
      { duration: 850, easing: "cubic-bezier(.76,0,.18,1)", fill: "forwards" },
    );
    anim.onfinish = finish;
  }, [detailIndex]);

  useLayoutEffect(() => {
    if (!sheetMounted) return;
    document.body.style.overflow = "hidden";
    const sheet = detailRef.current;
    if (!sheet) return;
    const coverEl = coverRefs.current[detailIndex];
    const rect = coverEl?.getBoundingClientRect();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced && rect) {
      sheet.animate(
        [
          {
            clipPath: `inset(${rect.top}px ${window.innerWidth - rect.right}px ${
              window.innerHeight - rect.bottom
            }px ${rect.left}px round 3px)`,
          },
          { clipPath: "inset(0px 0px 0px 0px round 0px)" },
        ],
        { duration: 1050, easing: "cubic-bezier(.76,0,.18,1)", fill: "forwards" },
      );
    }
    const t = setTimeout(() => sheet.classList.add("is-ready"), 560);
    return () => clearTimeout(t);
  }, [sheetMounted, detailIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (sheetMounted) {
        if (e.key === "Escape") closeDetail();
        return;
      }
      if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "Enter") openDetail(tapes[((Math.round(tRef.current) % n) + n) % n], ((Math.round(tRef.current) % n) + n) % n);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sheetMounted, closeDetail, go, openDetail, tapes, n]);

  const tape = tapes[active] ?? tapes[0];
  const yearLine = `NO.${String(active + 1).padStart(2, "0")} — ${DIFF_LABEL[tape.difficulty]} · 权重 ${tape.importance}/5`;
  let majorCount = -1;
  const majorFlags = tapes.map((t, i) => {
    const isMajor = i === 0 || t.categoryEn !== tapes[i - 1].categoryEn;
    if (isMajor) majorCount += 1;
    return isMajor ? majorCount : -1;
  });
  const tones = tapes.map((t, i) => coverTone(t.categoryId, i));
  const sheetTone = detail ? coverTone(detail.categoryId, detailIndex) : null;

  return (
    <section className="archive-hero" ref={heroRef} aria-label="几何模型档案书架">
      <div className="archive-kanji archive-kanji--left" aria-hidden>
        几何
      </div>
      <div className="archive-kanji archive-kanji--right" aria-hidden>
        模型
      </div>

      <div className="archive-masthead">
        <div>
          <h1>
            几何模型
            <br />
            <em>档案</em>
          </h1>
          <p className="archive-deck">
            看到条件，想到模型。拖动书架，直接点任意一个模型，就能打开它的条件、辅助线与完整证明。
          </p>
        </div>
        <div className="archive-masthead__meta">
          <span>GEOREFLEX · FILM ARCHIVE</span>
          <span>46 TAPES / 6 CATEGORIES</span>
          <span>DRAG · CLICK TO OPEN</span>
          <span>GRADE 8 — 9 / 几何档案</span>
        </div>
      </div>

      <div className="shelf" ref={shelfRef}>
        <div className="shelf__shadow" aria-hidden />
        <div className="shelf__stage">
          {tapes.map((t, v) => (
            <div
              key={`${t.id}-${v}`}
              ref={(el) => {
                tapeRefs.current[v] = el;
              }}
              className="tape"
              data-cursor="open"
              style={{
                "--cover-bg": tones[v].bg,
                "--cover-border": tones[v].border,
                "--cover-cut": `${tones[v].cut}px`,
                "--page-tilt": `${tones[v].tilt}deg`,
              } as React.CSSProperties}
              onPointerEnter={() => {
                hoverRef.current = v;
              }}
              onPointerLeave={() => {
                if (hoverRef.current === v) hoverRef.current = null;
              }}
              onClick={() => {
                if (dragRef.current.moved > 5) return;
                openDetail(t, v);
              }}
            >
              <div className="tape__spine" ref={(el) => { spineRefs.current[v] = el; }}>
                <div className="tape__spine-art" aria-hidden>
                  <MiniFigure figure={t.figure} compact className="h-full w-full" />
                </div>
                <div className="tape__spine-title">{t.name.replace(/模型|构造/g, "")}</div>
                <div className="tape__spine-brand">GEOREFLEX</div>
                <div className="tape__spine-box">MODEL</div>
              </div>
              <div className="tape__cover" ref={(el) => { coverRefs.current[v] = el; }}>
                <div className="tape__cover-top">
                  <span>A GEOMETRY MODEL</span>
                </div>
                <div className="tape__cover-title">{t.name}</div>
                <div className="tape__cover-sub">{t.category} · {DIFF_LABEL[t.difficulty]}</div>
                <div className="tape__cover-figure">
                  <MiniFigure figure={t.figure} />
                </div>
                <div className="tape__cover-badge">MODEL · {String(v + 1).padStart(2, "0")}</div>
              </div>
            </div>
          ))}
        </div>
        <button
          ref={ringRef}
          type="button"
          className="play-ring"
          data-cursor="open"
          aria-label={`打开 ${tape.name} 档案`}
          onClick={() => openDetail(tape, active)}
        />
      </div>

      <div className="archive-caption" aria-live="polite">
        <div className="cap-mask">
          <span key={`t-${active}-${dir}`} className="cap-title cap-enter" style={{ "--dir": dir } as React.CSSProperties}>
            {tape.name}
          </span>
        </div>
        <div className="cap-mask">
          <span key={`s-${active}-${dir}`} className="cap-sub cap-enter" style={{ "--dir": dir } as React.CSSProperties}>
            {tape.categoryEn} / {tape.category}
          </span>
        </div>
        <div className="cap-mask">
          <span key={`m-${active}-${dir}`} className="cap-meta cap-enter" style={{ "--dir": dir } as React.CSSProperties}>
            {yearLine}
          </span>
        </div>
      </div>

      <button type="button" className="archive-arrow archive-arrow--prev" onClick={() => go(-1)} aria-label="上一个模型">
        <svg viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M6 1 1 6l5 5M1 6h23" />
        </svg>
      </button>
      <button type="button" className="archive-arrow archive-arrow--next" onClick={() => go(1)} aria-label="下一个模型">
        <svg viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M18 1l5 5-5 5M23 6H0" />
        </svg>
      </button>

      <button
        type="button"
        ref={timelineRef}
        className="archive-timeline"
        aria-label="模型时间轴"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const frac = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
          jumpTo(Math.round(frac * (n - 1)));
        }}
      >
        <span className="tl-line" />
        {tapes.map((t, i) => {
          const isMajor = majorFlags[i] >= 0;
          return (
            <span key={`tick-${t.id}`}>
              <span
                className={`tl-tick ${isMajor ? "tl-tick--major" : "tl-tick--minor"}`}
                style={{ left: `${(i / (n - 1)) * 100}%` }}
              />
              {isMajor && (
                <span
                  className={`tl-label ${majorFlags[i] % 2 === 0 ? "tl-label--even" : ""}`}
                  style={{ left: `${(i / (n - 1)) * 100}%`, ...(i === 0 ? { transform: "translateX(0)" } : {}) }}
                >
                  {t.category}
                </span>
              )}
            </span>
          );
        })}
        <span ref={dotRef} className="tl-dot" style={{ left: "0%" }} />
      </button>

      <div ref={probeRef} style={{ height: "var(--H)", width: 0, visibility: "hidden", position: "absolute" }} />

      {sheetMounted && detail && (
        <div
          ref={detailRef}
          className="detail-sheet is-open detail-sheet--book"
          role="dialog"
          aria-modal="true"
          aria-label={`${detail.name} 档案`}
          style={sheetTone ? { background: `color-mix(in srgb, ${sheetTone.bg} 10%, var(--color-sheet))` } : undefined}
        >
          <button type="button" className="btn-outline detail-close" onClick={closeDetail}>
            CLOSE / 关闭
          </button>
          <span className="lbl detail-brand">GEOREFLEX —— MODEL ARCHIVE</span>
          <div className="detail-sheet__inner">
            <div className="detail-lines">
              <div className="detail-line--mask" style={{ "--d": "620ms" } as React.CSSProperties}>
                <div className="detail-sub">
                  {detail.categoryEn} / {detail.category}
                </div>
              </div>
              <div className="detail-line--mask" style={{ "--d": "695ms" } as React.CSSProperties}>
                <div className="detail-title">{detail.name}</div>
              </div>
              <div className="detail-line--mask" style={{ "--d": "770ms" } as React.CSSProperties}>
                <div className="detail-meta">
                  NO.{String(detailIndex + 1).padStart(2, "0")} / {DIFF_LABEL[detail.difficulty]} / 权重 {detail.importance}
                </div>
              </div>
              <div style={{ "--d": "845ms" } as React.CSSProperties}>
                <div className="detail-syn">
                  <MathText text={detail.summary} />
                </div>
              </div>
              <div style={{ "--d": "920ms" } as React.CSSProperties}>
                <div className="detail-meta">题目出现这些条件时想到它</div>
              </div>
              <div style={{ "--d": "980ms" } as React.CSSProperties}>
                <ul className="detail-list">
                  {detail.conditions.slice(0, 5).map((c, i) => (
                    <li key={i}>
                      <MathText text={c} />
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ "--d": "1060ms" } as React.CSSProperties}>
                <div className="detail-cta">
                  <Link href={`/models/${detail.id}`} className="btn-primary">
                    打开完整知识卡片
                  </Link>
                  <Link href={`/lab?model=${detail.id}`} className="btn-outline">
                    在实验室画辅助线
                  </Link>
                </div>
              </div>
            </div>
            <div className="detail-poster">
              <div className="detail-figure">
                <FigureStage
                  figure={detail.figure}
                  auxSteps={detail.auxSteps}
                  name={detail.name}
                  newRelations={detail.newRelations}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
