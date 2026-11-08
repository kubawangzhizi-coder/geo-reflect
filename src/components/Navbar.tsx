"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CATEGORY_MAP } from "@/data/categories";
import type { SearchItem } from "@/lib/search";
import { searchIndex } from "@/lib/search";

const NAV = [
  { href: "/models", label: "模型库", en: "INDEX" },
  { href: "/conditions", label: "条件反射", en: "REFLEX" },
  { href: "/lab", label: "辅助线实验室", en: "LAB" },
  { href: "/graph", label: "知识图谱", en: "GRAPH" },
  { href: "/analyze", label: "智能分析", en: "ANALYZE" },
];

function Wordmark() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="GeoReflex 首页">
      <span className="grid h-8 w-8 place-items-center border border-[color:var(--color-rule)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <path d="M12 3.5 20.5 19h-17L12 3.5Z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          <circle cx="12" cy="3.5" r="1.2" fill="currentColor" />
          <circle cx="20.5" cy="19" r="1.2" fill="currentColor" />
          <circle cx="3.5" cy="19" r="1.2" fill="currentColor" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block text-[13px] font-bold tracking-[0.08em] text-[color:var(--color-ink)]">
          GEOREFLEX<span className="ml-2 font-normal tracking-[0.14em] text-[color:var(--color-muted)]">几何反射</span>
        </span>
        <span className="block text-[9px] tracking-[0.24em] text-[color:var(--color-muted)]">MODEL ARCHIVE</span>
      </span>
    </Link>
  );
}

function Palette({ items, onClose }: { items: SearchItem[]; onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const results = useMemo(() => searchIndex(items, q, 10), [items, q]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => setActive(0), [q]);

  const go = useCallback(
    (id: string) => {
      onClose();
      router.push(`/models/${id}`);
    },
    [onClose, router],
  );

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]">
      <button type="button" aria-label="关闭搜索" onClick={onClose} className="absolute inset-0 bg-[color:rgba(20,20,20,0.55)]" />
      <div className="relative w-full max-w-xl border border-[color:var(--color-rule)] bg-[color:var(--color-sheet)]">
        <div className="flex items-center gap-3 border-b border-[color:var(--color-rule-soft)] px-4 py-3.5">
          <span className="lbl text-[color:var(--color-cobalt)]">SEARCH</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter" && results[active]) go(results[active].id);
              else if (e.key === "Escape") onClose();
            }}
            placeholder="输入模型名、条件或关键词…"
            className="w-full bg-transparent text-sm text-[color:var(--color-ink)] placeholder:text-[color:var(--color-muted)] focus:outline-none"
            aria-label="搜索模型"
          />
          <span className="shrink-0 text-[9px] tracking-[0.14em] text-[color:var(--color-muted)]">ESC</span>
        </div>
        <div className="max-h-[58vh] overflow-y-auto scrollbar-thin">
          {results.length === 0 && (
            <p className="px-4 py-10 text-center text-xs text-[color:var(--color-muted)]">没有匹配的模型。</p>
          )}
          {results.map((r, i) => (
            <button
              key={r.id}
              type="button"
              onMouseEnter={() => setActive(i)}
              onClick={() => go(r.id)}
              className="grid w-full grid-cols-[32px_1fr] gap-3 border-b border-[color:var(--color-rule-faint)] px-4 py-3 text-left last:border-0"
              style={i === active ? { background: "rgba(31,63,176,0.08)" } : undefined}
            >
              <span className="text-[10px] font-semibold tracking-[0.14em] text-[color:var(--color-cobalt)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-[color:var(--color-ink)]">{r.name}</span>
                  <span className="text-[9px] uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                    {CATEGORY_MAP[r.categories[0]]?.short}
                  </span>
                </span>
                <span className="mt-0.5 line-clamp-1 block text-[11px] text-[color:var(--color-muted)]">{r.summary}</span>
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-[color:var(--color-rule-soft)] px-4 py-2.5">
          <span className="text-[9px] tracking-[0.14em] text-[color:var(--color-muted)]">↑↓ SELECT · ENTER OPEN</span>
          <Link href="/models" onClick={onClose} className="lbl text-[color:var(--color-cobalt)]">
            全部模型 →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Navbar({ searchIndex: items }: { searchIndex: SearchItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [palette, setPalette] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[color:var(--color-rule)] bg-[color:var(--color-paper)]">
        <div className="container-x flex h-[76px] items-center justify-between gap-6">
          <Wordmark />
          <nav className="hidden items-center gap-8 lg:flex" aria-label="主导航">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-cursor="btn"
                  className="group flex items-baseline gap-1.5"
                >
                  <span
                    className={`text-[12px] tracking-[0.06em] ${
                      active ? "text-[color:var(--color-cobalt)]" : "text-[color:var(--color-ink)] group-hover:text-[color:var(--color-cobalt)]"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="text-[8px] tracking-[0.18em] text-[color:var(--color-muted)]">{item.en}</span>
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPalette(true)}
              data-cursor="btn"
              className="hidden items-center gap-2 border border-[color:var(--color-rule)] px-3 py-2 text-[10px] tracking-[0.14em] text-[color:var(--color-ink)] transition hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-paper)] sm:flex"
              aria-label="打开搜索"
            >
              SEARCH
              <span className="text-[9px] text-current/60">⌘K</span>
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center border border-[color:var(--color-rule)] text-[color:var(--color-ink)] lg:hidden"
              aria-label="打开菜单"
              aria-expanded={open}
            >
              <span className="grid gap-[5px]">
                <span className="block h-[1.5px] w-[26px] bg-current" />
                <span className="block h-[1.5px] w-[26px] bg-current" />
              </span>
            </button>
          </div>
        </div>
        {open && (
          <div className="border-t border-[color:var(--color-rule-soft)] bg-[color:var(--color-paper)] lg:hidden">
            <nav className="container-x grid py-2" aria-label="移动端导航">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between border-b border-[color:var(--color-rule-faint)] py-3 text-sm text-[color:var(--color-ink)] last:border-0"
                >
                  <span>{item.label}</span>
                  <span className="text-[9px] tracking-[0.18em] text-[color:var(--color-muted)]">{item.en}</span>
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setPalette(true);
                }}
                className="mt-2 flex items-center justify-between py-3 text-left text-sm"
              >
                <span>搜索模型</span>
                <span className="text-[9px] tracking-[0.18em] text-[color:var(--color-muted)]">SEARCH</span>
              </button>
            </nav>
          </div>
        )}
      </header>
      {palette && <Palette items={items} onClose={() => setPalette(false)} />}
    </>
  );
}
