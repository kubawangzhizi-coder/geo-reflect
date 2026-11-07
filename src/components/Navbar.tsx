"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CATEGORY_MAP } from "@/data/categories";
import type { SearchItem } from "@/lib/search";
import { searchIndex } from "@/lib/search";

const NAV = [
  { href: "/models", label: "模型库" },
  { href: "/conditions", label: "条件反射" },
  { href: "/lab", label: "辅助线实验室" },
  { href: "/graph", label: "知识图谱" },
  { href: "/analyze", label: "智能分析" },
];

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="GeoReflex 首页">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-sky-400/25 to-sky-500/5 ring-1 ring-sky-300/30">
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <path d="M12 3.5 20.5 19h-17L12 3.5Z" fill="none" stroke="#7dd3fc" strokeWidth="1.4" strokeLinejoin="round" />
          <circle cx="12" cy="3.5" r="1.5" fill="#e0f2fe" />
          <circle cx="20.5" cy="19" r="1.5" fill="#38bdf8" />
          <circle cx="3.5" cy="19" r="1.5" fill="#38bdf8" />
          <path d="M12 3.5v15.5" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" opacity="0.7" />
        </svg>
        <span className="absolute inset-0 rounded-xl opacity-0 ring-1 ring-sky-300/40 transition group-hover:opacity-100" />
      </span>
      <span className="leading-tight">
        <span className="block text-[15px] font-bold tracking-wide text-white">
          GeoReflex<span className="ml-1 text-sky-300/80">几何反射</span>
        </span>
        <span className="block text-[10px] tracking-[0.22em] text-slate-400">GEOMETRY MODEL LAB</span>
      </span>
    </Link>
  );
}

function Palette({
  items,
  onClose,
}: {
  items: SearchItem[];
  onClose: () => void;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const results = useMemo(() => searchIndex(items, q, 10), [items, q]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setActive(0);
  }, [q]);

  const go = useCallback(
    (id: string) => {
      onClose();
      router.push(`/models/${id}`);
    },
    [onClose, router],
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[10vh]">
      <button
        type="button"
        aria-label="关闭搜索"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-navy-900 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
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
              } else if (e.key === "Enter" && results[active]) {
                go(results[active].id);
              } else if (e.key === "Escape") {
                onClose();
              }
            }}
            placeholder="搜索模型、条件、关键词，例如：中点、45°、手拉手…"
            className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
            aria-label="搜索模型"
          />
          <span className="hidden shrink-0 rounded border border-white/15 px-1.5 py-0.5 text-[10px] text-slate-400 sm:inline">
            ESC
          </span>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin">
          {results.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-slate-400">没有找到匹配的模型，换个关键词试试。</p>
          )}
          {results.map((r, i) => (
            <button
              key={r.id}
              type="button"
              onMouseEnter={() => setActive(i)}
              onClick={() => go(r.id)}
              className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                i === active ? "bg-sky-500/15 ring-1 ring-sky-400/25" : "hover:bg-white/5"
              }`}
            >
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/5 text-xs font-bold text-sky-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-white">{r.name}</span>
                  {r.categories.slice(0, 2).map((c) => (
                    <span key={c} className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-slate-300">
                      {CATEGORY_MAP[c]?.short ?? c}
                    </span>
                  ))}
                </span>
                <span className="mt-0.5 line-clamp-1 block text-xs text-slate-400">{r.summary}</span>
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-white/10 px-4 py-2.5 text-[11px] text-slate-500">
          <span>↑↓ 选择 · Enter 打开 · Esc 关闭</span>
          <Link href="/models" onClick={onClose} className="text-sky-400 hover:text-sky-300">
            浏览全部模型 →
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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/85 backdrop-blur-xl">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="主导航">
            {NAV.map((n) => {
              const active = pathname === n.href || (n.href !== "/" && pathname.startsWith(n.href));
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`rounded-lg px-3 py-2 text-[13.5px] font-medium transition ${
                    active ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPalette(true)}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300 transition hover:bg-white/10 hover:text-white"
              aria-label="打开搜索"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              <span className="hidden sm:inline">搜索模型</span>
              <kbd className="hidden rounded border border-white/15 px-1.5 py-0.5 font-mono text-[10px] text-slate-400 sm:inline">
                Ctrl K
              </kbd>
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-300 lg:hidden"
              aria-label="打开菜单"
              aria-expanded={open}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                {open ? (
                  <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {open && (
          <div className="border-t border-white/10 bg-navy-950 lg:hidden">
            <nav className="container-x grid gap-1 py-3" aria-label="移动端导航">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="rounded-lg px-3 py-2.5 text-sm text-slate-200 hover:bg-white/5"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
      {palette && <Palette items={items} onClose={() => setPalette(false)} />}
    </>
  );
}
