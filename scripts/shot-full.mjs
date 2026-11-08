import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE = "http://127.0.0.1:3210";
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
ws.onmessage = (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) {
    const { resolve, reject } = pending.get(m.id);
    pending.delete(m.id);
    if (m.error) reject(new Error(JSON.stringify(m.error)));
    else resolve(m.result);
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
const evaluate = async (expr) => {
  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
  return r.result?.value;
};
const goto = async (url, wait = 1600) => {
  await send("Page.navigate", { url });
  for (let i = 0; i < 90; i++) {
    await sleep(150);
    try {
      if ((await evaluate("document.readyState")) === "complete") break;
    } catch {}
  }
  await sleep(wait);
};
const shot = async (name, full = false) => {
  const r = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: full });
  writeFileSync(join(OUT, `${name}.png`), Buffer.from(r.data, "base64"));
};

await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
await goto(BASE + "/", 2000);
await evaluate("document.querySelector('.arch-cursor')?.setAttribute('style','display:none')");
const height = await evaluate("document.documentElement.scrollHeight");
console.log("home height", height);
console.log(
  "reveal state:",
  await evaluate("JSON.stringify({ready:document.documentElement.classList.contains('reveal-ready'),nodes:document.querySelectorAll('[data-reveal]').length,shown:document.querySelectorAll('[data-reveal].is-in').length})"),
);
for (const [name, y] of [
  ["home-s1-method", 900],
  ["home-s2-categories", 1750],
  ["home-s3-reflex", 2550],
  ["home-s4-features", 3300],
  ["home-s5-collection", 4050],
  ["home-s6-accuracy", 5100],
  ["home-s7-footer", 6100],
]) {
  await evaluate(`window.scrollTo({ top: ${y}, behavior: "instant" })`);
  await sleep(1600);
  await shot(name);
}

await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
await goto(BASE + "/category/congruence", 1800);
await evaluate("document.querySelector('.arch-cursor')?.setAttribute('style','display:none')");
await shot("v3-category-1440");

await goto(BASE + "/lab?model=half-angle", 1800);
await evaluate("document.querySelector('.arch-cursor')?.setAttribute('style','display:none')");
await shot("v3-lab-1440");

await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await goto(BASE + "/lab?model=half-angle", 1800);
await evaluate("document.querySelector('.arch-cursor')?.setAttribute('style','display:none')");
await shot("v3-lab-390");
await goto(BASE + "/models", 1500);
await shot("v3-models-390");

await send("Page.close").catch(() => {});
ws.close();
process.exit(0);
