import type { Metadata, Viewport } from "next";
import "katex/dist/katex.min.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArchiveCursor from "@/components/ArchiveCursor";
import RevealObserver from "@/components/RevealObserver";
import { MODELS } from "@/data/models";
import { buildSearchIndex } from "@/lib/search";

export const metadata: Metadata = {
  title: {
    default: "GeoReflex 几何反射 · 几何模型与辅助线档案",
    template: "%s · GeoReflex 几何反射",
  },
  description:
    "把每一个初中几何模型做成可翻阅的档案带：拖动书架，打开封面，读条件、辅助线与完整证明。",
  keywords: ["初中数学", "几何模型", "辅助线", "全等三角形", "角平分线", "最短路径", "相似三角形"],
};

export const viewport: Viewport = {
  themeColor: "#ECE8E0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const searchIndex = buildSearchIndex(MODELS);
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-[color:var(--color-paper)] text-[color:var(--color-ink)] antialiased">
        <div className="paper-grain" aria-hidden />
        <Navbar searchIndex={searchIndex} />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
        <ArchiveCursor />
        <RevealObserver />
      </body>
    </html>
  );
}
