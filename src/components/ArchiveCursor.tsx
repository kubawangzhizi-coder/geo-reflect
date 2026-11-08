"use client";

import { useEffect, useRef } from "react";

export default function ArchiveCursor() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");
    const root = rootRef.current;
    if (!root) return;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };
    let raf = 0;
    let state = "";

    const setState = (next: string) => {
      if (next === state) return;
      state = next;
      root.dataset.state = next;
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const el = e.target as HTMLElement | null;
      if (!el) return;
      const tagged = el.closest("[data-cursor]") as HTMLElement | null;
      if (tagged) {
        setState(tagged.dataset.cursor || "btn");
        return;
      }
      const interactive = el.closest("a,button,input,textarea,select,label,[role='button']");
      setState(interactive ? "btn" : "");
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.28;
      pos.y += (target.y - pos.y) * 0.28;
      root.style.setProperty("--cx", `${pos.x}px`);
      root.style.setProperty("--cy", `${pos.y}px`);
      raf = requestAnimationFrame(tick);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerdown", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={rootRef} className="arch-cursor" data-state="" aria-hidden>
      <span className="arch-cursor__ring" />
      <span className="arch-cursor__dot" />
      <span className="arch-cursor__label">
        <b>OPEN</b>
        <span>打开</span>
      </span>
    </div>
  );
}
