import katex from "katex";

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** 将包含 $...$ 行内公式、$$...$$ 块级公式的文本渲染为 KaTeX */
export default function MathText({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split(/(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith("$$") && part.endsWith("$$") && part.length > 4) {
          const html = katex.renderToString(part.slice(2, -2).trim(), {
            throwOnError: false,
            displayMode: true,
            output: "html",
          });
          return (
            <span
              key={i}
              className="block overflow-x-auto py-1"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }
        if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
          const html = katex.renderToString(part.slice(1, -1), {
            throwOnError: false,
            displayMode: false,
            output: "html",
          });
          return <span key={i} dangerouslySetInnerHTML={{ __html: html }} />;
        }
        if (!part) return null;
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

/** 用于 title / 纯文本字段的轻量公式渲染（无 $ 时原样输出） */
export function renderMathToHtml(text: string): string {
  try {
    const parts = text.split(/(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g);
    return parts
      .map((part) => {
        if (part.startsWith("$$") && part.endsWith("$$") && part.length > 4) {
          return katex.renderToString(part.slice(2, -2).trim(), { throwOnError: false, displayMode: true });
        }
        if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
          return katex.renderToString(part.slice(1, -1), { throwOnError: false });
        }
        return escapeHtml(part);
      })
      .join("");
  } catch {
    return escapeHtml(text);
  }
}
