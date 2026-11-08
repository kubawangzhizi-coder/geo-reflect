const CDP = "http://127.0.0.1:9222";
const info = await fetch(`${CDP}/json/new?${encodeURIComponent("http://127.0.0.1:3210/")}`, { method: "PUT" }).then((r) => r.json());
const ws = new WebSocket(info.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let id = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) {
    const { resolve } = pending.get(m.id);
    pending.delete(m.id);
    resolve(m.result);
  }
};
const send = (method, params = {}) => new Promise((resolve) => { const i = ++id; pending.set(i, { resolve }); ws.send(JSON.stringify({ id: i, method, params })); });
await send("Page.enable");
await send("Runtime.enable");
await new Promise((r) => setTimeout(r, 3500));
const evaluate = async (expression) => {
  const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  return r.result?.value;
};
console.log(await evaluate(`(() => {
  const f = document.querySelector('.film-frame.is-active');
  const t = f?.querySelector('.film-frame-title');
  return JSON.stringify({
    classes: f?.className,
    title: t?.textContent,
    color: t ? getComputedStyle(t).color : null,
    frameBg: f ? getComputedStyle(f).backgroundColor : null,
    outline: f ? getComputedStyle(f).outlineColor : null,
    activeTitleRule: [...document.styleSheets].flatMap(s => { try { return [...s.cssRules] } catch { return [] } }).filter(r => r.selectorText && r.selectorText.includes('is-active .film-frame-title')).map(r => r.cssText)
  });
})()`));
await send("Page.close").catch(() => {});
ws.close();
process.exit(0);
