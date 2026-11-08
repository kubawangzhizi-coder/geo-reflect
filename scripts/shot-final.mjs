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
const errors = [];
ws.onmessage = (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) {
    const { resolve, reject } = pending.get(m.id);
    pending.delete(m.id);
    if (m.error) reject(new Error(JSON.stringify(m.error)));
    else resolve(m.result);
  } else if (m.method === "Runtime.exceptionThrown") {
    errors.push((m.params.exceptionDetails?.exception?.description ?? m.params.exceptionDetails?.text ?? "").slice(0, 240));
  } else if (m.method === "Log.entryAdded" && m.params.entry.level === "error") {
    const t = m.params.entry.text;
    if (!/favicon/.test(t)) errors.push(t.slice(0, 240));
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
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
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
const hideCursor = () => evaluate("document.querySelector('.arch-cursor')?.setAttribute('style','display:none')");

const out = {};
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
await goto(BASE + "/", 2000);
await hideCursor();
out.tapes = await evaluate("document.querySelectorAll('.film-frame').length");
const cap0 = await evaluate("document.querySelector('.cap-title')?.textContent");
await evaluate("document.querySelector('.archive-arrow--next')?.click()");
await sleep(1200);
const cap1 = await evaluate("document.querySelector('.cap-title')?.textContent");
out.captionChanged = cap0 !== cap1;
out.caption = `${cap0} -> ${cap1}`;
await shot("final-home-1440");

await evaluate("document.querySelector('.film-loupe')?.click()");
await sleep(1700);
out.sheetOpen = await evaluate("!!document.querySelector('.detail-sheet.is-open')");
out.sheetReady = await evaluate("document.querySelector('.detail-sheet')?.classList.contains('is-ready')");
out.sheetTitle = await evaluate("document.querySelector('.detail-title')?.textContent");
await shot("final-sheet-1440");
await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
await sleep(1400);
out.sheetClosed = !(await evaluate("!!document.querySelector('.detail-sheet.is-open')"));

// timeline click
await evaluate("document.querySelector('.archive-timeline')?.click()");
await sleep(1000);
out.captionAfterTimeline = await evaluate("document.querySelector('.cap-title')?.textContent");

// graph desktop
await goto(BASE + "/graph", 1800);
await hideCursor();
await shot("final-graph-1440");

// detail below fold
await goto(BASE + "/models/handshake", 1600);
await hideCursor();
await shot("final-detail-1440");

// mobile
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await goto(BASE + "/", 2000);
await hideCursor();
await shot("final-home-390");
await goto(BASE + "/lab?model=half-angle", 1600);
await hideCursor();
await shot("final-lab-390");
await goto(BASE + "/models", 1500);
await hideCursor();
await shot("final-models-390");
await goto(BASE + "/models/handshake", 1500);
await hideCursor();
await shot("final-detail-390");
await goto(BASE + "/conditions?c=midpoint", 1600);
await hideCursor();
await shot("final-conditions-390");

writeFileSync(join(OUT, "final-report.json"), JSON.stringify({ out, errors }, null, 2));
console.log(JSON.stringify({ out, errors: errors.slice(0, 8) }, null, 2));
await send("Page.close").catch(() => {});
ws.close();
process.exit(0);
