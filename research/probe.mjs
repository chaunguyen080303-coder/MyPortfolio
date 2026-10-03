import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "screenshots");
const notes = [];

const browser = await chromium.launch({
  headless: true,
  args: ["--use-angle=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"],
});

async function desktopPage() {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    locale: "en-US",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();
  page.setDefaultTimeout(20000);
  return { context, page };
}

function shot(slug, name) {
  return path.join(root, slug, name);
}

try {
  {
    const { context, page } = await desktopPage();
    await page.goto("https://brittanychiang.com/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);
    const exp = page.locator("text=Senior Frontend Engineer").first();
    await exp.hover();
    await page.waitForTimeout(400);
    const hover = await page.evaluate(() => {
      const el = [...document.querySelectorAll("a, li, article, div")].find((node) =>
        (node.innerText || "").includes("Senior Frontend Engineer"),
      );
      if (!el) return null;
      const card = el.closest("li, article, a") || el;
      const style = getComputedStyle(card);
      return {
        tag: card.tagName,
        bg: style.backgroundColor,
        transform: style.transform,
        radius: style.borderRadius,
      };
    });
    await page.screenshot({ path: shot("brittany-chiang", "hover-experience.png"), timeout: 8000 });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(600);
    await page.screenshot({ path: shot("brittany-chiang", "projects.png"), timeout: 8000 });
    notes.push({ slug: "brittany-chiang", hover });
    await context.close();
    console.log("brittany", JSON.stringify(hover));
  }

  {
    const { context, page } = await desktopPage();
    await page.goto("https://www.adhamdannaway.com/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    await page.mouse.move(280, 420);
    await page.waitForTimeout(500);
    await page.screenshot({ path: shot("adham-dannaway", "mouse-left.png"), timeout: 8000 });
    await page.mouse.move(1160, 420);
    await page.waitForTimeout(500);
    await page.screenshot({ path: shot("adham-dannaway", "mouse-right.png"), timeout: 8000 });
    const split = await page.evaluate(() => {
      const html = document.body.innerText.slice(0, 240);
      return { text: html.replace(/\s+/g, " ") };
    });
    notes.push({ slug: "adham-dannaway", split });
    await context.close();
    console.log("adham ok");
  }

  {
    const { context, page } = await desktopPage();
    await page.goto("https://bruno-simon.com/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(9000);
    const info = await page.evaluate(() => {
      const canvas = document.querySelector("canvas");
      const text = (document.body.innerText || "").replace(/\s+/g, " ").slice(0, 300);
      return {
        canvas: canvas ? { w: canvas.width, h: canvas.height } : null,
        text,
      };
    });
    await page.screenshot({ path: shot("bruno-simon", "after-wait.png"), timeout: 8000 });
    notes.push({ slug: "bruno-simon", info });
    await context.close();
    console.log("bruno", JSON.stringify(info));
  }

  {
    const { context, page } = await desktopPage();
    await page.goto("https://leerob.com/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const info = await page.evaluate(() => {
      const anims = document.getAnimations().slice(0, 12).map((anim) => ({
        name: anim.animationName || "",
        target: anim.effect?.target?.tagName || "",
      }));
      const scripts = [...document.querySelectorAll("script[src]")].map((s) => s.src).slice(0, 12);
      const hasThreeSrc = scripts.some((src) => /three/i.test(src));
      return { count: document.getAnimations().length, anims, hasThreeSrc, scripts };
    });
    notes.push({ slug: "lee-robinson", info });
    await context.close();
    console.log("lee", info.count, info.hasThreeSrc, info.anims.map((a) => a.name).join(","));
  }

  {
    const { context, page } = await desktopPage();
    await page.goto("https://igneczitibor.hu/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(7000);
    await page.screenshot({ path: shot("tibor-igneczi", "after-load.png"), timeout: 8000 });
    const text = await page.evaluate(() => (document.body.innerText || "").replace(/\s+/g, " ").slice(0, 240));
    notes.push({ slug: "tibor-igneczi", text });
    await context.close();
    console.log("tibor", text.slice(0, 120));
  }

  {
    const { context, page } = await desktopPage();
    await page.goto("https://heysai.dev/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(5000);
    await page.screenshot({ path: shot("sairithik", "after-load.png"), timeout: 8000 });
    notes.push({ slug: "sairithik", ok: true });
    await context.close();
    console.log("sairithik ok");
  }
} catch (error) {
  console.error("PROBE_ERROR", error);
  notes.push({ error: String(error?.message || error).slice(0, 400) });
}

fs.writeFileSync(path.join(__dirname, "probe.json"), JSON.stringify(notes, null, 2));
await browser.close();
console.log("PROBE_DONE");
