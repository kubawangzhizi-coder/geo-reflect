import type { ReactNode } from "react";

export default function PageHeader({
  label,
  title,
  description,
  meta = [],
  children,
}: {
  label: string;
  title: string;
  description?: string;
  meta?: string[];
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-[color:var(--color-rule-soft)] pb-12 pt-28 sm:pb-16 sm:pt-36">
      <div className="container-x grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
        <div>
          <p className="section-eyebrow">{label}</p>
          <h1 className="mt-5 max-w-[18ch] font-[family-name:var(--font-display)] text-[clamp(32px,4.4vw,60px)] font-extrabold leading-[0.98] tracking-[-0.03em] text-[color:var(--color-ink)]">
            {title}
          </h1>
        </div>
        <div className="lg:pb-2">
          {description && (
            <p className="max-w-[46ch] text-[13px] leading-7 text-[color:var(--color-ink-soft)]">{description}</p>
          )}
          {meta.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {meta.map((m) => (
                <span key={m} className="chip">
                  {m}
                </span>
              ))}
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
