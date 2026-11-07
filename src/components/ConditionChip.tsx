import Link from "next/link";

export function ConditionChip({
  label,
  href,
  active = false,
  onClick,
  title,
}: {
  label: string;
  href?: string;
  active?: boolean;
  onClick?: () => void;
  title?: string;
}) {
  const cls = `inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
    active
      ? "border-sky-400 bg-sky-500 text-white shadow-[0_4px_14px_-6px_rgba(14,165,233,0.8)]"
      : "border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-700"
  }`;
  if (href) {
    return (
      <Link href={href} className={cls} title={title}>
        <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-white" : "bg-sky-400"}`} />
        {label}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls} title={title} aria-pressed={active}>
      <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-white" : "bg-sky-400"}`} />
      {label}
    </button>
  );
}
