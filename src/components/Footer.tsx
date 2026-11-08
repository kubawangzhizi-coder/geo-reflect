import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { MODEL_STATS } from "@/data/models";

export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-rule)] bg-[color:var(--color-paper)]">
      <div className="container-x pt-14">
        <p className="font-[family-name:var(--font-display)] text-[clamp(48px,9vw,132px)] font-extrabold leading-[0.82] tracking-[-0.04em] text-[color:var(--color-ink)]">
          GEOREFLEX
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--color-rule-soft)] pt-4 text-[10px] tracking-[0.14em] text-[color:var(--color-muted)]">
          <span>几何模型与辅助线档案 · {MODEL_STATS.total} FRAMES</span>
          <span>看到条件，想到模型</span>
        </div>
      </div>
      <div className="container-x grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="lbl text-[color:var(--color-cobalt)]">ABOUT THE ARCHIVE</p>
          <p className="mt-4 max-w-sm text-[12.5px] leading-6 text-[color:var(--color-ink-soft)]">
            面向初中生的几何模型与辅助线学习档案。不只展示模型，更讲清辅助线为什么这样加、加了以后能得到什么。
          </p>
          <p className="mt-4 max-w-sm text-[11px] leading-5 text-[color:var(--color-muted)]">
            内容依据初中数学教材与常见中考几何模型整理，所有证明均经过推理核验。可视化与条件反射结果用于启发思路，不能替代完整证明。
          </p>
        </div>
        <div>
          <p className="lbl text-[color:var(--color-cobalt)]">学习工具</p>
          <ul className="mt-4 space-y-2 text-[12.5px] text-[color:var(--color-ink-soft)]">
            <li><Link href="/models" className="hover:text-[color:var(--color-cobalt)]">模型库</Link></li>
            <li><Link href="/conditions" className="hover:text-[color:var(--color-cobalt)]">条件反射系统</Link></li>
            <li><Link href="/lab" className="hover:text-[color:var(--color-cobalt)]">辅助线实验室</Link></li>
            <li><Link href="/graph" className="hover:text-[color:var(--color-cobalt)]">知识图谱</Link></li>
            <li><Link href="/analyze" className="hover:text-[color:var(--color-cobalt)]">几何题智能分析</Link></li>
          </ul>
        </div>
        <div>
          <p className="lbl text-[color:var(--color-cobalt)]">知识分类</p>
          <ul className="mt-4 space-y-2 text-[12.5px] text-[color:var(--color-ink-soft)]">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link href={`/category/${c.id}`} className="hover:text-[color:var(--color-cobalt)]">
                  {c.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="lbl text-[color:var(--color-cobalt)]">学习闭环</p>
          <ol className="mt-4 space-y-2 text-[12.5px] text-[color:var(--color-ink-soft)]">
            <li>看到题目条件</li>
            <li>识别几何结构</li>
            <li>联想对应模型</li>
            <li>判断辅助线画法</li>
            <li>推导新关系并证明</li>
          </ol>
          <p className="mt-6 text-[10px] tracking-[0.12em] text-[color:var(--color-muted)]">
            © {new Date().getFullYear()} GEOREFLEX · 为初二几何而建
          </p>
        </div>
      </div>
    </footer>
  );
}
