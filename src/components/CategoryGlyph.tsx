import type { CategoryId } from "@/data/types";

const GLYPHS: Record<CategoryId, React.ReactNode> = {
  congruence: (
    <>
      <path d="M7 22 14 8l7 14H7Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.55" />
      <path d="M17 20 24 10l7 10H17Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M24 10a9 9 0 0 0-4-6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2.4 2.4" />
      <circle cx="30" cy="4" r="1.1" fill="currentColor" />
      <circle cx="17" cy="20" r="1.4" fill="currentColor" />
    </>
  ),
  midpoint: (
    <>
      <path d="M5 22h22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 17V9l8 8V9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="12" cy="22" r="1.6" fill="currentColor" />
      <circle cx="20" cy="22" r="1.6" fill="currentColor" />
      <circle cx="16" cy="22" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </>
  ),
  bisector: (
    <>
      <path d="M6 24 26 6M6 24 30 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 24 25 12" stroke="currentColor" strokeWidth="1.3" strokeDasharray="3 2.4" />
      <path d="M15 24a9 9 0 0 0 3.4-3.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M14.4 20.6a9 9 0 0 1 3.2-3.4" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </>
  ),
  axis: (
    <>
      <path d="M18 4v24" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 2.6" />
      <path d="M8 9 4 14l4 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M27 9l4 5-4 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="12" cy="14" r="1.6" fill="currentColor" />
      <circle cx="24" cy="14" r="1.6" fill="currentColor" />
    </>
  ),
  isosceles: (
    <>
      <path d="M18 5 31 26H5L18 5Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M18 5v21" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2.6 2.6" />
      <path d="M12 14h2M22 14h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="18" cy="26" r="1.4" fill="currentColor" />
    </>
  ),
  similarity: (
    <>
      <path d="M4 24 10 12l6 12H4Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M16 26 25 8l9 18H16Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.7" />
      <path d="M8 24h5M8.5 21h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.7" />
      <path d="M21 25h9M22 21.5h7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </>
  ),
};

export default function CategoryGlyph({ id, className = "h-8 w-8" }: { id: CategoryId; className?: string }) {
  return (
    <svg viewBox="0 0 38 32" className={className} aria-hidden fill="none">
      {GLYPHS[id]}
    </svg>
  );
}
