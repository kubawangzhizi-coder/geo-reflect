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
const shot = async (name) => {
  const r = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  writeFileSync(join(OUT, `${name}.png`), Buffer.from(r.data, "base64"));
};

const routes = ["/", "/models", "/models/handshake", "/category/congruence", "/conditions", "/lab", "/graph", "/analyze", "/models/not-exist"];
const http = {};
for (const r of routes) http[r] = (await fetch(BASE + r)).status;

await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
await goto(BASE + "/", 2200);
await evaluate("document.querySelector('.arch-cursor')?.setAttribute('style','display:none')");
const before = await evaluate("document.querySelector('.cap-title')?.textContent");
const rect = await evaluate("JSON.stringify(document.querySelector('.film-rig').getBoundingClientRect())");
const r0 = JSON.parse(rect);
const cx = r0.left + r0.width / 2;
const cy = r0.top + r0.height / 2;
await send("Input.dispatchMouseEvent", { type: "mousePressed", x: cx + 200, y: cy, button: "left", clickCount: 1, buttons: 1 });
for (let i = 1; i <= 8; i++) {
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: cx + 200 - i * 25, y: cy, button: "left", buttons: 1 });
  await sleep(40);
}
await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: cx + 0, y: cy, button: "left", clickCount: 1, buttons: 0 });
await sleep(1200);
const after = await evaluate("document.querySelector('.cap-title')?.textContent");
const dragWorked = before !== after;

await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await goto(BASE + "/", 2200);
await evaluate("document.querySelector('.arch-cursor')?.setAttribute('style','display:none')");
await evaluate("document.querySelector('.film-loupe')?.click()");
await sleep(1900);
await shot("final-sheet-390");
const sheetTitle = await evaluate("document.querySelector('.detail-title')?.textContent");
const sheetVisible = await evaluate("!!document.querySelector('.detail-sheet.is-open')");

console.log(JSON.stringify({ http, dragWorked, before, after, sheetVisible, sheetTitle }, null, 2));
await send("Page.close").catch(() => {});
ws.close();
process.exit(0);
