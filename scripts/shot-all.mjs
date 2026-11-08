import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3210";
const CDP = "http://127.0.0.1:9222";
const OUT = join(process.cwd(), ".screens");
mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const info = await fetch(`${CDP}/json/new?${encodeURIComponent("about:blank")}`, { method: "PUT" }).then((r) => r.json());
const ws = new WebSocket(info.webSocketDebuggerUrl);
await new Promise((res, rej) => {
  ws.onopen = res;
  ws.onerror = rej;
});
let id = 0;
const pending = new Map();
const errors = [];
ws.onmessage = (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) {
    const { resolve, reject } = pending.get(m.id);
    pending.delete(m.id);
    if (m.error) reject(new Error(JSON.stringify(m.error)));
    else resolve(m.result);
  } else if (m.method === "Runtime.exceptionThrown") {
    errors.push((m.params.exceptionDetails?.exception?.description ?? m.params.exceptionDetails?.text ?? "").slice(0, 200));
  } else if (m.method === "Log.entryAdded" && m.params.entry.level === "error") {
    errors.push(m.params.entry.text.slice(0, 200));
  }
};
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const i = ++id;
    pending.set(i, { resolve, reject });
    ws.send(JSON.stringify({ id: i, method, params }));
  });
await send("Page.enable");
await send("Runtime.enable");
await send("Log.enable");
const evaluate = async (expr) => {
  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
  return r.result?.value;
};
const goto = async (url, wait = 1500) => {
  await send("Page.navigate", { url });
  for (let i = 0; i < 90; i++) {
    await sleep(150);
    try {
      if ((await evaluate("document.readyState")) === "complete") break;
    } catch {
      /* ignore */
    }
  }
  await sleep(wait);
};
const shot = async (name) => {
  const r = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  writeFileSync(join(OUT, `${name}.png`), Buffer.from(r.data, "base64"));
};

async function pageAt(name, path, width, height, mobile = false, full = false) {
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile });
  await goto(BASE + path, 1800);
  await evaluate("document.querySelector('.arch-cursor')?.setAttribute('style','display:none')");
  const overflow = await evaluate("document.documentElement.scrollWidth - window.innerWidth");
  const title = await evaluate("document.title");
  await shot(name);
  return { name, title, overflow };
}

const report = [];
report.push(await pageAt("v2-home-1440", "/", 1440, 1000));
report.push(await pageAt("v2-home-768", "/", 768, 1024));
report.push(await pageAt("v2-home-390", "/", 390, 844, true));
report.push(await pageAt("v2-models-1440", "/models", 1440, 1100));
report.push(await pageAt("v2-detail-1440", "/models/handshake", 1440, 1100));
report.push(await pageAt("v2-conditions-1440", "/conditions?c=midpoint", 1440, 1100));
report.push(await pageAt("v2-lab-1440", "/lab?model=half-angle", 1440, 1100));
report.push(await pageAt("v2-graph-1440", "/graph", 1440, 1100));
report.push(await pageAt("v2-analyze-1440", "/analyze", 1440, 1100));
report.push(await pageAt("v2-category-1440", "/category/congruence", 1440, 1100));
report.push(await pageAt("v2-models-390", "/models", 390, 844, true));
report.push(await pageAt("v2-detail-390", "/models/handshake", 390, 844, true));
report.push(await pageAt("v2-conditions-390", "/conditions", 390, 844, true));

// detail sheet on desktop
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
await goto(BASE + "/", 2000);
await evaluate("document.querySelector('.arch-cursor')?.setAttribute('style','display:none')");
await evaluate("document.querySelector('.play-ring')?.click()");
await sleep(1700);
await shot("v2-sheet-1440");
await evaluate("document.querySelector('.detail-close')?.click()");
await sleep(900);
await shot("v2-sheet-closed-1440");

writeFileSync(join(OUT, "report-v2.json"), JSON.stringify({ report, errors }, null, 2));
console.log(JSON.stringify({ report, errors: errors.slice(0, 10) }, null, 2));
await send("Page.close").catch(() => {});
ws.close();
process.exit(0);
