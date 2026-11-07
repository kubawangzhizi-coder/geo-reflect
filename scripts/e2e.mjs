/**
 * 无头 Chrome 端到端验证脚本（通过 CDP，不依赖 Playwright）
 * 用法：先启动 dev/prod server 与 chrome --remote-debugging-port=9222，再 node scripts/e2e.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3210";
const CDP = process.env.CDP_URL ?? "http://127.0.0.1:9222";
const OUT = join(process.cwd(), ".screens");
mkdirSync(OUT, { recursive: true });

const results = [];
const failures = [];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function newPage(url) {
  let info;
  try {
    info = await fetch(`${CDP}/json/new?${encodeURIComponent(url)}`, { method: "PUT" }).then((r) => r.json());
  } catch (e) {
    info = await fetch(`${CDP}/json/new?${encodeURIComponent(url)}`, { method: "GET" }).then((r) => r.json());
  }
  const ws = new WebSocket(info.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });
  let id = 0;
  const pending = new Map();
  const logs = [];
  const exceptions = [];
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(JSON.stringify(msg.error)));
      else resolve(msg.result);
    } else if (msg.method === "Log.entryAdded" && msg.params.entry.level === "error") {
      logs.push(msg.params.entry.text);
    } else if (msg.method === "Runtime.exceptionThrown") {
      const d = msg.params.exceptionDetails;
      exceptions.push(
        `${d?.text ?? "unknown"} :: ${d?.exception?.description ?? ""} :: ${d?.stackTrace?.callFrames?.slice(0, 3).map((f) => `${f.functionName}@${f.url}:${f.lineNumber}`).join(" | ")}`,
      );
    }
  };
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const msgId = ++id;
      pending.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Log.enable");
  const evaluate = async (expression) => {
    const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + " :: " + expression);
    return r.result?.value;
  };
  const goto = async (target, wait = 900) => {
    await send("Page.navigate", { url: target });
    for (let i = 0; i < 60; i++) {
      await sleep(150);
      try {
        const ready = await evaluate("document.readyState");
        if (ready === "complete") break;
      } catch {
        /* navigating */
      }
    }
    await sleep(wait);
  };
  const screenshot = async (name) => {
    const r = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    writeFileSync(join(OUT, `${name}.png`), Buffer.from(r.data, "base64"));
  };
  const close = async () => {
    try {
      await send("Page.close");
    } catch {
      /* ignore */
    }
    ws.close();
  };
  return { send, evaluate, goto, screenshot, close, logs, exceptions, ws };
}

async function runPage(page, name, path, checks = {}) {
  const url = BASE + path;
  await page.goto(url);
  const title = await page.evaluate("document.title");
  const h1 = await page.evaluate("document.querySelector('h1')?.innerText ?? ''");
  const overflow = await page.evaluate(
    "Math.max(document.documentElement.scrollWidth, document.body?.scrollWidth || 0) - window.innerWidth",
  );
  const text = await page.evaluate("document.body?.innerText?.slice(0, 4000) ?? ''");
  const checkResults = [];
  for (const [label, fn] of Object.entries(checks)) {
    try {
      const ok = await fn(page, text);
      checkResults.push({ label, ok });
      if (!ok) failures.push(`${name}: 检查失败 ${label}`);
    } catch (e) {
      checkResults.push({ label, ok: false, error: String(e) });
      failures.push(`${name}: 检查异常 ${label} :: ${e}`);
    }
  }
  await page.screenshot(name);
  const consoleErrors = [...page.exceptions, ...page.logs].filter(
    (m) => !/favicon|net::ERR_ABORTED|404 \(Not Found\)/i.test(m),
  );
  if (consoleErrors.length) {
    failures.push(`${name}: 控制台错误 ${consoleErrors.slice(0, 3).join(" | ")}`);
  }
  results.push({ name, path, title, h1, overflow, checks: checkResults, consoleErrors, textSample: text.slice(0, 160) });
}

async function main() {
  const page = await newPage(BASE + "/");
  await page.goto(BASE + "/", 1500);

  const pages = [
    ["home", "/", { hasHero: (p, t) => t.includes("看到条件") && t.includes("六大核心知识分类") }],
    ["models", "/models", { hasList: (p, t) => t.includes("几何模型库") }],
    ["detail-handshake", "/models/handshake", { hasSections: (p, t) => t.includes("辅助线具体画法") && t.includes("完整证明过程") && t.includes("易错点") }],
    ["detail-brahmagupta", "/models/brahmagupta", { hasProof: (p, t) => t.includes("婆罗摩笈多") && t.includes("BG=CE") }],
    ["category-congruence", "/category/congruence", { hasCategory: (p, t) => t.includes("全等三角形与旋转模型") }],
    ["conditions", "/conditions?c=midpoint", { hasRecs: async (p) => (await p.evaluate("document.querySelectorAll('[data-testid=rec-card]').length")) > 0 }],
    ["lab", "/lab?model=half-angle", { hasLab: (p, t) => t.includes("辅助线实验室") && t.includes("半角模型") }],
    ["graph", "/graph", { hasSvg: async (p) => (await p.evaluate("document.querySelectorAll('svg [data-node]').length")) > 20 }],
    ["analyze", "/analyze", { hasForm: async (p) => await p.evaluate("!!document.querySelector('[data-testid=problem-input]')") }],
  ];

  for (const [name, path, checks] of pages) {
    await runPage(page, name, path, checks);
  }

  // 交互：条件反射多选
  await page.goto(BASE + "/conditions");
  await page.evaluate("document.querySelector('[data-condition=midpoint]').click()");
  await sleep(400);
  const recSingle = await page.evaluate("document.querySelectorAll('[data-testid=rec-card]').length");
  await page.evaluate("document.querySelector('[data-condition=angle-bisector]').click()");
  await sleep(400);
  const recCombo = await page.evaluate("document.querySelectorAll('[data-testid=rec-card]').length");
  await page.screenshot("conditions-selected");
  if (!(recSingle > 0 && recCombo > 0)) failures.push("条件反射交互失败：无推荐卡片");
  results.push({ name: "interaction-conditions", recSingle, recCombo });

  // 交互：详情页辅助线切换
  await page.goto(BASE + "/models/half-angle");
  const stageLinesAll = await page.evaluate(
    "document.querySelector('[data-aux-step=\"0\"]')?.closest('div.card-light')?.querySelectorAll('svg line').length ?? 0",
  );
  await page.evaluate("document.querySelector('[data-aux-step=\"0\"]').click()");
  await sleep(500);
  const stageLinesZero = await page.evaluate(
    "document.querySelector('[data-aux-step=\"0\"]')?.closest('div.card-light')?.querySelectorAll('svg line').length ?? 0",
  );
  const stageHeader = await page.evaluate(
    "document.querySelector('[data-aux-step=\"0\"]')?.closest('div.card-light')?.innerText?.slice(0, 80) ?? ''",
  );
  await page.evaluate("document.querySelector('[data-aux-step=\"1\"]').click()");
  await sleep(400);
  await page.screenshot("detail-aux-step1");
  results.push({ name: "interaction-detail", stageLinesAll, stageLinesZero, stageHeader });
  if (!(stageLinesZero < stageLinesAll || stageHeader.includes("原图"))) {
    failures.push(`详情页辅助线切换失败：${stageLinesAll} -> ${stageLinesZero}`);
  }

  // 交互：实验室换模型与步骤
  await page.goto(BASE + "/lab?model=handshake");
  await page.evaluate("document.querySelector('[data-lab-model=half-angle]').click()");
  await sleep(500);
  await page.evaluate("document.querySelector('[data-lab-step=\"1\"]').click()");
  await sleep(400);
  const labText = await page.evaluate("document.body.innerText");
  await page.screenshot("lab-after-click");
  if (!labText.includes("辅助线进度 1")) failures.push("实验室步骤切换失败");

  // 交互：智能分析
  await page.goto(BASE + "/analyze");
  await page.evaluate(`(() => {
    const el = document.querySelector('[data-testid=problem-input]');
    const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
    setter.call(el, '在正方形ABCD中，E是BC上一点，F是CD上一点，∠EAF=45°，求证：EF=BE+DF。');
    el.dispatchEvent(new Event('input', { bubbles: true }));
  })()`);
  await sleep(300);
  await page.evaluate("document.querySelector('[data-testid=analyze-btn]').click()");
  await sleep(600);
  const analysisOk = await page.evaluate("!!document.querySelector('[data-testid=analysis-result]')");
  const analysisRecs = await page.evaluate("document.querySelectorAll('[data-testid=analysis-result] [data-testid=rec-card]').length");
  await page.screenshot("analyze-result");
  if (!analysisOk) failures.push("智能分析没有生成结果");
  results.push({ name: "interaction-analyze", analysisOk, analysisRecs });

  // 交互：模型库搜索
  await page.goto(BASE + "/models");
  const before = await page.evaluate("document.querySelectorAll('[data-testid=model-card]').length");
  await page.evaluate(`(() => {
    const el = document.querySelector('[data-testid=model-search]');
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(el, '中点');
    el.dispatchEvent(new Event('input', { bubbles: true }));
  })()`);
  await sleep(400);
  const after = await page.evaluate("document.querySelectorAll('[data-testid=model-card]').length");
  await page.screenshot("models-search");
  results.push({ name: "interaction-search", before, after });
  if (!(after > 0 && after < before)) failures.push(`模型库搜索失败：${before} -> ${after}`);

  // Graph 节点点击
  await page.goto(BASE + "/graph");
  const nodeCount = await page.evaluate("document.querySelectorAll('[data-node]').length");
  await page.evaluate("document.querySelector('[data-node=handshake]').dispatchEvent(new MouseEvent('click', { bubbles: true }))");
  await sleep(300);
  const graphInspector = await page.evaluate("document.body.innerText.includes('关联模型')");
  await page.screenshot("graph-node-selected");
  results.push({ name: "interaction-graph", nodeCount, graphInspector });
  if (!graphInspector) failures.push("图谱节点点击后没有显示详情");

  // 移动端适配
  await page.send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  for (const [name, path] of [
    ["mobile-home", "/"],
    ["mobile-detail", "/models/half-angle"],
    ["mobile-conditions", "/conditions"],
    ["mobile-graph", "/graph"],
  ]) {
    await page.goto(BASE + path);
    const overflow = await page.evaluate(
      "Math.max(document.documentElement.scrollWidth, document.body?.scrollWidth || 0) - window.innerWidth",
    );
    await page.screenshot(name);
    results.push({ name, overflow });
    if (overflow > 2) failures.push(`${name}: 移动端横向溢出 ${overflow}px`);
  }
  await page.send("Emulation.clearDeviceMetricsOverride");

  // HTTP 检查
  const httpChecks = {};
  for (const p of ["/", "/models", "/conditions", "/lab", "/graph", "/analyze", "/api/validate", "/models/not-exist"]) {
    try {
      const r = await fetch(BASE + p);
      httpChecks[p] = r.status;
    } catch (e) {
      httpChecks[p] = String(e);
    }
  }
  const validate = await fetch(BASE + "/api/validate").then((r) => r.json()).catch((e) => ({ error: String(e) }));

  writeFileSync(join(OUT, "report.json"), JSON.stringify({ results, failures, httpChecks, validate }, null, 2));
  console.log(JSON.stringify({ failures, httpChecks, validate: { ok: validate.ok, stats: validate.stats, errors: validate.errors?.slice(0, 20), warnings: validate.warnings?.slice(0, 20) } }, null, 2));
  await page.close();
  process.exit(failures.length ? 1 : 0);
}

main().catch((e) => {
  console.error("E2E 脚本异常：", e);
  writeFileSync(join(OUT, "report-error.json"), String(e?.stack ?? e));
  process.exit(2);
});
