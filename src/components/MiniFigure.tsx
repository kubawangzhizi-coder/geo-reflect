"use client";

import { useMemo } from "react";
import GeometryFigure from "./GeometryFigure";
import { buildFigure } from "@/lib/figures";

export default function MiniFigure({
  figure,
  reveal = 0,
  compact = false,
  className = "",
}: {
  figure: string;
  reveal?: number;
  compact?: boolean;
  className?: string;
}) {
  const spec = useMemo(() => buildFigure(figure), [figure]);
  return <GeometryFigure spec={spec} reveal={reveal} compact={compact} className={className} />;
}
