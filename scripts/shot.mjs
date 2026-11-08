import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3210";
const CDP = "http://127.0.0.1:9222";
const OUT = join(process.cwd(), ".screens");
mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function newPage(url) {
  const info = await fetch(`${CDP}/json/new?${encodeURIComponent(url)}`, { method: "PUT" }).then((r) => r.json());
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
      errors.push(m.params.exceptionDetails?.exception?.description ?? m.params.exceptionDetails?.text);
    } else if (m.method === "Log.entryAdded" && m.params.entry.level === "error") {
      errors.push(m.params.entry.text);
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
  const goto = async (url2, wait = 1400) => {
    await send("Page.navigate", { url: url2 });
    for (let i = 0; i < 80; i++) {
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
  return { send, evaluate, goto, shot, errors, ws };
}

const page = await newPage(BASE + "/");
await page.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
await page.goto(BASE + "/", 2000);
await page.shot("after-home-1440");
const overflow = await page.evaluate("document.documentElement.scrollWidth - window.innerWidth");
console.log("desktop overflow:", overflow, "errors:", page.errors.slice(0, 4));

// open active cover detail
await page.evaluate("document.querySelector('.play-ring')?.click()");
await sleep(1600);
await page.shot("after-detail-1440");
await page.evaluate("document.querySelector('.detail-close')?.click()");
await sleep(1000);

await page.send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await page.goto(BASE + "/", 2000);
await page.shot("after-home-390");
const mOverflow = await page.evaluate("document.documentElement.scrollWidth - window.innerWidth");
console.log("mobile overflow:", mOverflow, "errors:", page.errors.slice(0, 6));

await page.send("Emulation.setDeviceMetricsOverride", { width: 768, height: 1024, deviceScaleFactor: 1, mobile: false });
await page.goto(BASE + "/models", 1600);
await page.shot("after-models-768");

await page.send("Page.close").catch(() => {});
page.ws.close();
process.exit(0);
