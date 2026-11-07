/**
 * 图形构建器自检：确保每个 figure 都能构建、坐标有限、引用完整。
 * 运行：esbuild 打包后 node .tmp/check-figures.cjs
 */
import { FIGURE_IDS, buildFigure } from "@/lib/figures";

let bad = 0;
const report: string[] = [];
for (const id of FIGURE_IDS) {
  try {
    const spec = buildFigure(id);
    const pts = Object.entries(spec.points);
    const nonFinite = pts.filter(([, d]) => !Number.isFinite(d.at.x) || !Number.isFinite(d.at.y));
    const refsOk = spec.segs.every(
      (s) =>
        (typeof s.from !== "string" || !!spec.points[s.from]) &&
        (typeof s.to !== "string" || !!spec.points[s.to]),
    );
    const inCanvas = pts.every(([, d]) => d.at.x >= -1 && d.at.x <= 121 && d.at.y >= -1 && d.at.y <= 91);
    const arcsOk = (spec.arcs ?? []).every((a) => !!spec.points[a.at] && !!spec.points[a.from] && !!spec.points[a.to]);
    const steps = new Set<number>();
    spec.segs.forEach((s) => s.step && steps.add(s.step));
    Object.values(spec.points).forEach((p) => p.auxStep && steps.add(p.auxStep));
    (spec.arcs ?? []).forEach((a) => a.step && steps.add(a.step));
    (spec.rights ?? []).forEach((r) => r.step && steps.add(r.step));
    const ok = nonFinite.length === 0 && refsOk && inCanvas && arcsOk;
    if (!ok) bad++;
    report.push(
      `${ok ? "OK " : "BAD"} ${id.padEnd(28)} points=${String(pts.length).padStart(2)} segs=${String(spec.segs.length).padStart(2)} auxSteps=[${[...steps].sort().join(",")}]`,
    );
  } catch (e) {
    bad++;
    report.push(`ERR ${id}: ${(e as Error).message}`);
  }
}
console.log(report.join("\n"));
console.log(`\n${FIGURE_IDS.length} figures checked, ${bad} bad`);
process.exit(bad ? 1 : 0);
