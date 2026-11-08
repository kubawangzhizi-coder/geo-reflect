"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** 掩码滑入：给 [data-reveal] 元素在进入视口时加上 .is-in */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");
    let nodes: HTMLElement[] = [];

    const update = () => {
      const vh = window.innerHeight;
      for (const el of nodes) {
        if (el.classList.contains("is-in")) continue;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > vh * 0.02) el.classList.add("is-in");
      }
    };
    const scan = () => {
      nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
      update();
    };

    const raf = requestAnimationFrame(scan);
    const t1 = setTimeout(update, 200);
    const t2 = setTimeout(update, 800);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const mo = new MutationObserver(() => {
      nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
      update();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
