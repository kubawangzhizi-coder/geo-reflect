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
    errors.push((m.params.exceptionDetails?.exception?.description ?? "").slice(0, 200));
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
const goto = async (url, wait = 2200) => {
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
const drag = async (fromX, toX, y) => {
  await send("Input.dispatchMouseEvent", { type: "mousePressed", x: fromX, y, button: "left", clickCount: 1, buttons: 1 });
  const steps = 14;
  for (let i = 1; i <= steps; i++) {
    await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: fromX + ((toX - fromX) * i) / steps, y, button: "left", buttons: 1 });
    await sleep(30);
  }
  await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: toX, y, button: "left", clickCount: 1, buttons: 0 });
};

await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
await goto(BASE + "/", 2800);
await evaluate("document.querySelector('.arch-cursor')?.setAttribute('style','display:none')");
const before = await evaluate("document.querySelector('.cap-title')?.textContent");
await drag(900, 520, 500);
await sleep(1200);
const after = await evaluate("document.querySelector('.cap-title')?.textContent");

// jump to a later category via timeline
await evaluate(`(() => {
  const tl=document.querySelector('.archive-timeline');
  const r=tl.getBoundingClientRect();
  tl.dispatchEvent(new MouseEvent('click',{bubbles:true,clientX:r.left+r.width*0.68,clientY:r.top+8}));
  return 'ok';
})()`);
await sleep(1400);
await shot("film-home-colors-1440");
const afterJump = await evaluate("document.querySelector('.cap-title')?.textContent");
const overflow = await evaluate("document.documentElement.scrollWidth - window.innerWidth");

await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await goto(BASE + "/", 2600);
await evaluate("document.querySelector('.arch-cursor')?.setAttribute('style','display:none')");
await evaluate(`(() => {
  const tl=document.querySelector('.archive-timeline');
  const r=tl.getBoundingClientRect();
  tl.dispatchEvent(new MouseEvent('click',{bubbles:true,clientX:r.left+r.width*0.55,clientY:r.top+8}));
  return 'ok';
})()`);
await sleep(1400);
await shot("film-home-colors-390");
const mOverflow = await evaluate("document.documentElement.scrollWidth - window.innerWidth");

console.log(JSON.stringify({ before, after, afterJump, overflow, mOverflow, errors }, null, 2));
await send("Page.close").catch(() => {});
ws.close();
process.exit(0);
