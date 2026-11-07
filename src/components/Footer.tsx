import Link from "next/link";
import { CATEGORIES } from "@/data/categories";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-navy-950 text-slate-400">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-sky-400/15 ring-1 ring-sky-300/25">
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                <path d="M12 3.5 20.5 19h-17L12 3.5Z" fill="none" stroke="#7dd3fc" strokeWidth="1.4" strokeLinejoin="round" />
                <circle cx="12" cy="3.5" r="1.4" fill="#e0f2fe" />
                <circle cx="20.5" cy="19" r="1.4" fill="#38bdf8" />
                <circle cx="3.5" cy="19" r="1.4" fill="#38bdf8" />
              </svg>
            </span>
            <div>
              <p className="text-sm font-bold text-white">GeoReflex 几何反射</p>
              <p className="text-[11px] tracking-[0.2em] text-slate-500">GEOMETRY MODEL LAB</p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-[13px] leading-6">
            面向初中生的几何模型与辅助线学习平台。不只展示模型，更讲清辅助线为什么这样加、加了以后能得到什么。
          </p>
          <p className="mt-4 text-[11px] leading-5 text-slate-500">
            内容依据初中数学教材与常见中考几何模型整理，所有证明均经过推理核验。网站的可视化与条件反射结果用于启发思路，不能替代完整证明。
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wider text-slate-300">学习工具</p>
          <ul className="mt-3 space-y-2 text-[13px]">
            <li><Link className="hover:text-white" href="/models">模型库</Link></li>
            <li><Link className="hover:text-white" href="/conditions">条件反射系统</Link></li>
            <li><Link className="hover:text-white" href="/lab">辅助线实验室</Link></li>
            <li><Link className="hover:text-white" href="/graph">知识图谱</Link></li>
            <li><Link className="hover:text-white" href="/analyze">几何题智能分析</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wider text-slate-300">知识分类</p>
          <ul className="mt-3 space-y-2 text-[13px]">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link className="hover:text-white" href={`/category/${c.id}`}>
                  <span className="mr-1.5 font-mono text-[11px] text-slate-500">{c.no}</span>
                  {c.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wider text-slate-300">学习闭环</p>
          <ol className="mt-3 space-y-2 text-[13px]">
            <li><span className="mr-1.5 font-mono text-[11px] text-slate-500">01</span>看到题目条件</li>
            <li><span className="mr-1.5 font-mono text-[11px] text-slate-500">02</span>识别几何结构</li>
            <li><span className="mr-1.5 font-mono text-[11px] text-slate-500">03</span>联想对应模型</li>
            <li><span className="mr-1.5 font-mono text-[11px] text-slate-500">04</span>判断辅助线画法</li>
            <li><span className="mr-1.5 font-mono text-[11px] text-slate-500">05</span>推导新关系并证明</li>
          </ol>
          <p className="mt-6 text-[11px] text-slate-500">© {new Date().getFullYear()} GeoReflex · 为初二几何而建</p>
        </div>
      </div>
    </footer>
  );
}
