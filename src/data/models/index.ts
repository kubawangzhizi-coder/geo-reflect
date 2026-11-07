import { CONGRUENCE_MODELS } from "./congruence";
import { CONGRUENCE_REST_MODELS } from "./congruence-rest";
import { MIDPOINT_AXIS_MODELS } from "./midpoint-axis";
import { BISECTOR_ISOSCELES_MODELS } from "./bisector-isosceles";
import { SIMILARITY_MODELS } from "./similarity";
import type { CategoryId, ModelCard } from "../types";
import { CATEGORIES } from "../categories";

export const MODELS: ModelCard[] = [
  ...CONGRUENCE_MODELS,
  ...CONGRUENCE_REST_MODELS,
  ...MIDPOINT_AXIS_MODELS,
  ...BISECTOR_ISOSCELES_MODELS,
  ...SIMILARITY_MODELS,
];

export const MODEL_MAP: Record<string, ModelCard> = Object.fromEntries(
  MODELS.map((m) => [m.id, m]),
);

export function getModel(id: string): ModelCard | undefined {
  return MODEL_MAP[id];
}

export function modelsByCategory(category: CategoryId): ModelCard[] {
  return MODELS.filter((m) => m.categories.includes(category));
}

export function getCategoryModels(): { category: (typeof CATEGORIES)[number]; models: ModelCard[] }[] {
  return CATEGORIES.map((category) => ({
    category,
    models: modelsByCategory(category.id),
  }));
}

export function featuredModels(n = 6): ModelCard[] {
  return [...MODELS]
    .sort((a, b) => b.importance - a.importance || a.difficulty - b.difficulty)
    .slice(0, n);
}

export function relatedModels(model: ModelCard): ModelCard[] {
  return model.related.map((id) => MODEL_MAP[id]).filter(Boolean);
}

export function adjacentModels(id: string): { prev?: ModelCard; next?: ModelCard } {
  const i = MODELS.findIndex((m) => m.id === id);
  return {
    prev: i > 0 ? MODELS[i - 1] : undefined,
    next: i >= 0 && i < MODELS.length - 1 ? MODELS[i + 1] : undefined,
  };
}

export const MODEL_STATS = {
  total: MODELS.length,
  categories: CATEGORIES.length,
  figures: new Set(MODELS.map((m) => m.figure)).size,
  totalProofSteps: MODELS.reduce((s, m) => s + m.proof.steps.length, 0),
  totalAuxSteps: MODELS.reduce((s, m) => s + m.auxSteps.length, 0),
};

export type { ModelCard };
