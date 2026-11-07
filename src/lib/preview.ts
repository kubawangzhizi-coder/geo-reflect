import type { CategoryId, Difficulty, ModelCard } from "@/data/types";

export interface ModelPreview {
  id: string;
  name: string;
  summary: string;
  mnemonic: string;
  categories: CategoryId[];
  grade: string;
  difficulty: Difficulty;
  importance: number;
  figure: string;
  tags: string[];
  alias: string[];
}

export function toPreview(m: ModelCard): ModelPreview {
  return {
    id: m.id,
    name: m.name,
    summary: m.summary,
    mnemonic: m.mnemonic,
    categories: m.categories,
    grade: m.grade,
    difficulty: m.difficulty,
    importance: m.importance,
    figure: m.figure,
    tags: m.tags,
    alias: m.alias ?? [],
  };
}
