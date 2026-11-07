import type { ModelCard } from "@/data/types";

export interface SearchItem {
  id: string;
  name: string;
  alias: string[];
  categories: string[];
  summary: string;
  tags: string[];
  triggers: string[];
  difficulty: number;
  importance: number;
}

export function buildSearchIndex(models: ModelCard[]): SearchItem[] {
  return models.map((m) => ({
    id: m.id,
    name: m.name,
    alias: m.alias ?? [],
    categories: m.categories,
    summary: m.summary,
    tags: m.tags,
    triggers: m.triggers,
    difficulty: m.difficulty,
    importance: m.importance,
  }));
}

function norm(s: string): string {
  return s.toLowerCase().replace(/\s+/g, "");
}

export function scoreItem(item: SearchItem, query: string): number {
  const q = norm(query);
  if (!q) return 0;
  const name = norm(item.name);
  let score = 0;
  if (name === q) score += 100;
  else if (name.startsWith(q)) score += 70;
  else if (name.includes(q)) score += 50;
  for (const a of item.alias) {
    if (norm(a).includes(q)) score += 28;
  }
  for (const t of item.tags) if (norm(t).includes(q)) score += 16;
  for (const t of item.triggers) if (norm(t).includes(q)) score += 12;
  if (norm(item.summary).includes(q)) score += 8;
  for (const c of item.categories) if (norm(c).includes(q)) score += 5;
  score += item.importance * 0.4;
  return score;
}

export function searchIndex(items: SearchItem[], query: string, limit = 12): SearchItem[] {
  const q = query.trim();
  if (!q) {
    return [...items].sort((a, b) => b.importance - a.importance).slice(0, limit);
  }
  return items
    .map((item) => ({ item, score: scoreItem(item, q) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.item);
}
