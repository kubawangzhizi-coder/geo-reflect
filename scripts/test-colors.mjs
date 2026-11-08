import { writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE = "http://127.0.0.1:3210";
const CDP = "http://127.0.0.1:9222";
const OUT = join(process.cwd(), ".screens");
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
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
  return r.result?.value;
};
const goto = async (url, wait = 1800) => {
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

await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
await goto(BASE + "/", 2500);
await evaluate("document.querySelector('.arch-cursor')?.setAttribute('style','display:none')");
await shot("v4-home-colors");

const info1 = await evaluate(`(() => {
  const tapes=[...document.querySelectorAll('.tape')];
  return JSON.stringify(tapes.slice(0,8).map((t,i)=>({
    i, title:t.querySelector('.tape__cover-title')?.textContent,
    bg:getComputedStyle(t.querySelector('.tape__cover')).backgroundColor,
    cut:getComputedStyle(t.querySelector('.tape__cover')).getPropertyValue('--cover-cut'),
    visible:getComputedStyle(t).visibility
  })));
})()`);
console.log("tones", info1);

// click a non-active spine at index 2
const target = await evaluate(`(() => {
  const t=[...document.querySelectorAll('.tape')][2];
  t.click();
  return "clicked";
})()`);
await sleep(1900);
const title = await evaluate("document.querySelector('.detail-title')?.textContent");
const sheetBg = await evaluate("getComputedStyle(document.querySelector('.detail-sheet')).backgroundColor");
const sheetOpen = await evaluate("!!document.querySelector('.detail-sheet.is-open')");
await shot("v4-sheet-colored");
console.log(JSON.stringify({ target, sheetOpen, title, sheetBg }, null, 2));
await send("Page.close").catch(() => {});
ws.close();
process.exit(0);
