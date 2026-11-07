import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-mono text-xs tracking-[0.3em] text-sky-500">404 / NOT FOUND</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900">这个几何页面不存在</h1>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        可能是模型链接有误，或者该页面已被移动。可以回到模型库重新查找。
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/models" className="btn-primary">返回模型库</Link>
        <Link href="/" className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          回到首页
        </Link>
      </div>
    </div>
  );
}
