import { CATEGORIES } from "@/data/categories";
import { MODELS } from "@/data/models";
import type { CategoryId, ModelCard } from "@/data/types";

export interface GraphNode {
  id: string;
  name: string;
  short: string;
  category: CategoryId;
  color: string;
  x: number;
  y: number;
  r: number;
  importance: number;
  difficulty: number;
}

export interface GraphEdge {
  a: string;
  b: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  clusters: { id: CategoryId; name: string; short: string; color: string; x: number; y: number; count: number }[];
}

const W = 1200;
const H = 860;

function shortName(name: string): string {
  return name
    .replace(/模型$/, "")
    .replace(/构造$/, "")
    .replace(/三角形/g, "△")
    .replace(/等腰直角/g, "等腰Rt")
    .slice(0, 7);
}

/**
 * 静态知识图谱布局：6 个分类围绕中心分布，类内模型按圆周均匀排布。
 * 布局在服务端一次性计算，客户端只负责交互与高亮。
 */
export function buildGraphData(): GraphData {
  const cx = W / 2;
  const cy = H / 2;
  const clusterRadiusX = 400;
  const clusterRadiusY = 265;

  const nodes: GraphNode[] = [];
  const clusters: GraphData["clusters"] = [];

  CATEGORIES.forEach((cat, ci) => {
    const angle = (-90 + ci * (360 / CATEGORIES.length)) * (Math.PI / 180);
    const ccx = cx + clusterRadiusX * Math.cos(angle);
    const ccy = cy + clusterRadiusY * Math.sin(angle);
    const memberCount = MODELS.filter((m) => m.categories.includes(cat.id)).length;
    const models = MODELS.filter((m) => m.categories[0] === cat.id);
    const ringR = Math.min(70, 28 + models.length * 4.4);
    clusters.push({
      id: cat.id,
      name: cat.name,
      short: cat.short,
      color: cat.color,
      x: ccx,
      y: ccy,
      count: memberCount,
    });
    models.forEach((m, mi) => {
      const a = -Math.PI / 2 + (mi * 2 * Math.PI) / Math.max(models.length, 1);
      const rr = models.length <= 1 ? 0 : ringR;
      nodes.push({
        id: m.id,
        name: m.name,
        short: shortName(m.name),
        category: cat.id,
        color: cat.color,
        x: ccx + rr * Math.cos(a),
        y: ccy + rr * Math.sin(a),
        r: 5 + m.importance * 1.05,
        importance: m.importance,
        difficulty: m.difficulty,
      });
    });
  });

  const edgeSet = new Set<string>();
  const edges: GraphEdge[] = [];
  for (const m of MODELS) {
    for (const rid of m.related) {
      if (!MODELS.some((x) => x.id === rid)) continue;
      const key = [m.id, rid].sort().join("|");
      if (edgeSet.has(key)) continue;
      edgeSet.add(key);
      edges.push({ a: m.id, b: rid });
    }
  }
  return { nodes, edges, clusters };
}

export function neighborIds(data: GraphData, id: string): Set<string> {
  const s = new Set<string>();
  for (const e of data.edges) {
    if (e.a === id) s.add(e.b);
    if (e.b === id) s.add(e.a);
  }
  return s;
}

export function nodeById(data: GraphData, id: string): ModelCard | undefined {
  return MODELS.find((m) => m.id === id);
}

export const GRAPH_SIZE = { W, H };
