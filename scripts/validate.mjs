/**
 * 校验脚本：先启动 dev server，再运行 node scripts/validate.mjs
 * 依次检查数据一致性、图形合法性、KaTeX 渲染与条件反射规则。
 */
const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3210";

try {
  const res = await fetch(`${BASE}/api/validate`);
  const data = await res.json();
  console.log(JSON.stringify({ ok: data.ok, stats: data.stats }, null, 2));
  if (!data.ok) {
    console.error("\n发现错误：");
    for (const e of data.errors ?? []) console.error(" -", e);
    process.exit(1);
  }
  console.log(`\n校验通过：${data.warnings?.length ?? 0} 条提示（不影响运行）`);
} catch (e) {
  console.error("无法连接 dev server，请先在另一个终端运行 npm run dev");
  console.error(String(e));
  process.exit(1);
}
