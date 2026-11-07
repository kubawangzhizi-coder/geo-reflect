/**
 * 在受限沙箱中直接以当前进程启动 Next dev server（绕过 next dev CLI 的 fork/子进程）。
 * 用法：node scripts/dev-inprocess.cjs [port]
 */
const path = require("node:path");
const fs = require("node:fs");

const projectDir = path.resolve(__dirname, "..");
process.chdir(projectDir);
process.env.NODE_ENV = "development";
process.env.NEXT_TELEMETRY_DISABLED = "1";

try {
  require("@next/env").loadEnvConfig(projectDir, true);
} catch (e) {
  console.warn("loadEnvConfig skipped:", e.message);
}

const { setGlobal } = require("next/dist/trace/shared");
const { PHASE_DEVELOPMENT_SERVER } = require("next/dist/shared/lib/constants");
setGlobal("phase", PHASE_DEVELOPMENT_SERVER);
setGlobal("distDir", ".next");

const port = Number(process.argv[2] || 3210);
const hostname = process.env.HOST || "127.0.0.1";

const { startServer } = require("next/dist/server/lib/start-server");

startServer({
  dir: projectDir,
  port,
  hostname,
  isDev: true,
  allowRetry: false,
})
  .then(() => {
    console.log(`[dev-inprocess] Next dev server ready at http://${hostname}:${port}`);
  })
  .catch((err) => {
    console.error("[dev-inprocess] failed:", err);
    process.exit(1);
  });

// 防止意外退出，保持进程存活
setInterval(() => {}, 1 << 30);
