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
const goto = async (url, wait = 2000) => {
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
await goto(BASE + "/", 3000);
await evaluate("document.querySelector('.arch-cursor')?.setAttribute('style','display:none')");
await shot("film-home-1440");
const state = await evaluate(`(() => {
  const frames=[...document.querySelectorAll('.film-frame')];
  return JSON.stringify({
    count: frames.length,
    active: document.querySelector('.film-frame.is-active .film-frame-title')?.textContent,
    caption: document.querySelector('.cap-title')?.textContent,
    loupe: (()=>{const l=document.querySelector('.film-loupe'); const r=l?.getBoundingClientRect(); return r?{x:r.x,y:r.y,opacity:getComputedStyle(l).opacity}:null})(),
    firstThree: frames.slice(0,3).map(f=>({t:f.querySelector('.film-frame-title')?.textContent, transform:getComputedStyle(f).transform, bg:getComputedStyle(f).backgroundColor}))
  });
})()`);
console.log(state);

// click non-active frame 2
const clicked = await evaluate(`(() => { const f=[...document.querySelectorAll('.film-frame')][2]; f.click(); return 'ok'; })()`);
await sleep(2000);
const sheet = await evaluate(`JSON.stringify({open:!!document.querySelector('.detail-sheet.is-open'), title:document.querySelector('.detail-title')?.textContent})`);
await shot("film-sheet-1440");
console.log({ clicked, sheet, errors });

await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await goto(BASE + "/", 2800);
await evaluate("document.querySelector('.arch-cursor')?.setAttribute('style','display:none')");
await shot("film-home-390");
await evaluate(`(() => { const f=[...document.querySelectorAll('.film-frame')][1]; f.click(); return 'ok'; })()`);
await sleep(1900);
await shot("film-sheet-390");

await send("Page.close").catch(() => {});
ws.close();
process.exit(0);
