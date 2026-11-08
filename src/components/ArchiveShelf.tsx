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

/** 每一帧一套颜色与轻微形状差异：接触印相里的彩色片基 */
function frameTone(categoryId: string, index: number) {
  const base = CATEGORY_HUE[categoryId] ?? 222;
  const hue = (base + ((index % 5) - 2) * 6 + 360) % 360;
  const sat = 30 + (index % 4) * 7;
  const light = 26 + (index % 5) * 4;
  return {
    bg: `hsl(${hue} ${sat}% ${light}%)`,
    border: `hsl(${hue} ${Math.min(44, sat + 8)}% ${Math.max(16, light - 9)}%)`,
    tint: `hsl(${hue} ${Math.min(42, sat + 2)}% 90.5%)`,
    cut: 5 + ((index * 5) % 12),
    tilt: ((index % 5) - 2) * 0.3,
  };
}

export default function ArchiveShelf({ tapes }: { tapes: ArchiveTape[] }) {
  const n = tapes.length;
  const heroRef = useRef<HTMLElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const loupeRef = useRef<HTMLButtonElement>(null);
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
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const geoRef = useRef({ fw: 190, fh: 136, step: 270, heroW: 1440 });

  /* ---------- measurement ---------- */
  const measure = useCallback(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const fw = Math.min(240, Math.max(124, hero.clientWidth * 0.135));
    const fh = fw * 0.72;
    const step = fw * 1.5;
    geoRef.current = { fw, fh, step, heroW: hero.clientWidth };
    hero.style.setProperty("--FW", `${fw}px`);
    hero.style.setProperty("--FH", `${fh}px`);
    hero.style.setProperty("--H", `${fh}px`);
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

  /* ---------- helpers ---------- */
  const rel = (v: number, s: number) => {
    let r = (((v - s) % n) + n) % n;
    if (r > n / 2) r -= n;
    return r;
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
      const act = ((Math.round(s) % n) + n) % n;
      if (act !== lastActive.current) {
        lastActive.current = act;
        setDir(Math.sign(tRef.current - sRef.current || 1));
        setActive(act);
      }

      const { step } = geoRef.current;
      for (let v = 0; v < n; v++) {
        const el = frameRefs.current[v];
        if (!el) continue;
        const r = rel(v, s);
        if (Math.abs(r) > 7) {
          el.style.visibility = "hidden";
          continue;
        }
        el.style.visibility = "visible";
        const near = Math.exp(-(r * r) / 1.4);
        const sc = (0.9 + 0.58 * near) * (1 / (1 + Math.abs(r) * 0.035));
        const x = r * step;
        const y = Math.min(24, Math.abs(r) * 3.2) - (v === act ? 8 : 0);
        const ry = -Math.sign(r || 1) * Math.min(20, Math.abs(r) * 4.2);
        const rz = -r * 0.6;
        el.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${sc})`;
        el.style.zIndex = String(2000 - Math.round(Math.abs(r) * 10));
        el.style.setProperty("--shade", String(Math.min(0.6, Math.abs(r) * 0.095)));
      }

      /* loupe on the active frame */
      const loupe = loupeRef.current;
      if (loupe) {
        const show = Math.max(0, 1 - Math.abs(tRef.current - s) * 3) * (sheetOpenRef.current ? 0 : 1);
        const fr = frameRefs.current[act];
        const rig = rigRef.current;
        if (fr && rig) {
          const cr = fr.getBoundingClientRect();
          const rr = rig.getBoundingClientRect();
          loupe.style.left = `${cr.right - rr.left + 12}px`;
          loupe.style.top = `${cr.bottom - rr.top + 12}px`;
        }
        loupe.style.opacity = show > 0.05 ? "1" : "0";
        loupe.style.pointerEvents = show > 0.6 ? "auto" : "none";
        loupe.style.transform = `scale(${Math.min(1, show)})`;
      }

      if (dotRef.current) {
        const frac = (((s % n) + n) % n) / (n - 1 || 1);
        dotRef.current.style.left = `${frac * 100}%`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [n]);

  /* ---------- wheel + drag ---------- */
  useEffect(() => {
    const rig = rigRef.current;
    if (!rig) return;
    const onWheel = (e: WheelEvent) => {
      if (sheetOpenRef.current) return;
      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      tRef.current += (delta / geoRef.current.step) * 0.5;
      if (wheelTimer.current) clearTimeout(wheelTimer.current);
      wheelTimer.current = setTimeout(() => {
        tRef.current = Math.round(tRef.current);
      }, 160);
    };
    const onDown = (e: PointerEvent) => {
      if (sheetOpenRef.current) return;
      dragRef.current = { dragging: true, startX: e.clientX, startT: tRef.current, moved: 0 };
      rig.setPointerCapture?.(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY, active: true };
      const dref = dragRef.current;
      if (!dref.dragging) return;
      const dx = e.clientX - dref.startX;
      dref.moved = Math.max(dref.moved, Math.abs(dx));
      tRef.current = dref.startT - dx / geoRef.current.step;
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
    rig.addEventListener("wheel", onWheel, { passive: false });
    rig.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    rig.addEventListener("pointerleave", onLeave);
    return () => {
      rig.removeEventListener("wheel", onWheel);
      rig.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      rig.removeEventListener("pointerleave", onLeave);
      if (wheelTimer.current) clearTimeout(wheelTimer.current);
    };
  }, []);

  /* ---------- actions ---------- */
  const go = useCallback((step: number) => {
    tRef.current = Math.round(tRef.current) + step;
  }, []);

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
    const frameEl = frameRefs.current[detailIndex];
    const rect = frameEl?.getBoundingClientRect();
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
          }px ${rect.left}px round 2px)`,
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
    const frameEl = frameRefs.current[detailIndex];
    const rect = frameEl?.getBoundingClientRect();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced && rect) {
      sheet.animate(
        [
          {
            clipPath: `inset(${rect.top}px ${window.innerWidth - rect.right}px ${
              window.innerHeight - rect.bottom
            }px ${rect.left}px round 2px)`,
          },
          { clipPath: "inset(0px 0px 0px 0px round 0px)" },
        ],
        { duration: 1000, easing: "cubic-bezier(.76,0,.18,1)", fill: "forwards" },
      );
    }
    const t = setTimeout(() => sheet.classList.add("is-ready"), 540);
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
      else if (e.key === "Enter") {
        const idx = ((Math.round(tRef.current) % n) + n) % n;
        openDetail(tapes[idx], idx);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sheetMounted, closeDetail, go, openDetail, tapes, n]);

  const tape = tapes[active] ?? tapes[0];
  const metaLine = `FRAME ${String(active + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")} — ${DIFF_LABEL[tape.difficulty]} · 权重 ${tape.importance}/5`;
  let majorCount = -1;
  const majorFlags = tapes.map((t, i) => {
    const isMajor = i === 0 || t.categoryEn !== tapes[i - 1].categoryEn;
    if (isMajor) majorCount += 1;
    return isMajor ? majorCount : -1;
  });
  const tones = tapes.map((t, i) => frameTone(t.categoryId, i));
  const sheetTone = detail ? frameTone(detail.categoryId, detailIndex) : null;

  return (
    <section className="archive-hero contact-hero" ref={heroRef} aria-label="几何模型胶片接触印相">
      <div className="archive-kanji archive-kanji--left" aria-hidden>
        几何
      </div>
      <div className="archive-kanji archive-kanji--right" aria-hidden>
        模型
      </div>

      <div className="contact-grid" aria-hidden />
      <span className="contact-reg contact-reg--tl" aria-hidden />
      <span className="contact-reg contact-reg--tr" aria-hidden />
      <span className="contact-reg contact-reg--bl" aria-hidden />
      <span className="contact-reg contact-reg--br" aria-hidden />

      <div className="archive-masthead">
        <div>
          <h1>
            几何模型
            <br />
            <em>接触印相</em>
          </h1>
          <p className="archive-deck">
            看到条件，想到模型。拖动胶片，直接点任意一格，就能打开它的条件、辅助线与完整证明。
          </p>
        </div>
        <div className="archive-masthead__meta">
          <span>GEOREFLEX · CONTACT SHEET</span>
          <span>46 FRAMES / 6 ROLLS</span>
          <span>DRAG · CLICK TO OPEN</span>
          <span>GRADE 8 — 9 / 几何档案</span>
        </div>
      </div>

      <div className="film-rig" ref={rigRef}>
        <div className="film-glow" aria-hidden />
        <div className="film-band" aria-hidden>
          <span className="film-perf film-perf--top" />
          <span className="film-perf film-perf--bottom" />
          <span className="film-edge film-edge--left">GEOREFLEX 46</span>
          <span className="film-edge film-edge--right">SAFETY FILM / 6 ROLLS</span>
        </div>

        <div className="film-stage">
          {tapes.map((t, v) => (
            <div
              key={`${t.id}-${v}`}
              ref={(el) => {
                frameRefs.current[v] = el;
              }}
              className={`film-frame ${v === active ? "is-active" : ""}`}
              data-cursor="open"
              style={{
                "--cover-bg": tones[v].bg,
                "--cover-border": tones[v].border,
                "--tint": tones[v].tint,
                "--frame-cut": `${tones[v].cut}px`,
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
              <div className="film-window">
                <MiniFigure figure={t.figure} />
              </div>
              <div className="film-frame-meta">
                <span className="film-frame-no">{String(v + 1).padStart(2, "0")}</span>
                <span className="film-frame-cat">{t.category}</span>
              </div>
              <div className="film-frame-title">{t.name}</div>
              <span className="film-frame-shade" aria-hidden />
            </div>
          ))}
        </div>

        <button
          ref={loupeRef}
          type="button"
          className="film-loupe"
          data-cursor="open"
          aria-label={`打开 ${tape.name} 档案`}
          onClick={() => openDetail(tape, active)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
            <circle cx="10.5" cy="10.5" r="6" />
            <path d="m15 15 5 5M8 10.5h5M10.5 8v5" strokeLinecap="round" />
          </svg>
        </button>
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
            {metaLine}
          </span>
        </div>
      </div>

      <button type="button" className="archive-arrow archive-arrow--prev" onClick={() => go(-1)} aria-label="上一帧">
        <svg viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M6 1 1 6l5 5M1 6h23" />
        </svg>
      </button>
      <button type="button" className="archive-arrow archive-arrow--next" onClick={() => go(1)} aria-label="下一帧">
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
          const index = Math.round(frac * (n - 1));
          const base = Math.round(tRef.current);
          tRef.current = base + rel(index, base);
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

      <div
        ref={probeRef}
        style={{ width: "var(--FW, 190px)", height: "var(--FH, 136px)", position: "absolute", visibility: "hidden" }}
      />

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
                  FRAME {String(detailIndex + 1).padStart(2, "0")} / {DIFF_LABEL[detail.difficulty]} / 权重 {detail.importance}
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
