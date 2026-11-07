import type { Metadata, Viewport } from "next";
import "katex/dist/katex.min.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MODELS } from "@/data/models";
import { buildSearchIndex } from "@/lib/search";

export const metadata: Metadata = {
  title: {
    default: "GeoReflex 几何反射 · 初中几何模型与辅助线学习平台",
    template: "%s · GeoReflex 几何反射",
  },
  description:
    "面向初中生的几何模型与辅助线智能学习平台：看到条件，识别结构，联想模型，判断辅助线怎么画，推导新关系，完成证明。",
  keywords: ["初中数学", "几何模型", "辅助线", "全等三角形", "角平分线", "最短路径", "相似三角形"],
};

export const viewport: Viewport = {
  themeColor: "#071228",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const searchIndex = buildSearchIndex(MODELS);
  return (
    <html lang="zh-CN">
      <body className="min-h-screen antialiased">
        <Navbar searchIndex={searchIndex} />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
