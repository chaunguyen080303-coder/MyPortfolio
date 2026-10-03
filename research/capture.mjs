import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outRoot = path.join(__dirname, "screenshots");
const notesPath = path.join(__dirname, "notes.json");

const sites = [
  {
    slug: "brittany-chiang",
    name: "Brittany Chiang",
    url: "https://brittanychiang.com",
    role: "Featured (required)",
    source: "required",
  },
  {
    slug: "delba",
    name: "Delba",
    url: "https://delba.dev",
    role: "Featured (required)",
    source: "required",
  },
  {
    slug: "lee-robinson",
    name: "Lee Robinson",
    url: "https://leerob.com",
    role: "Featured (required)",
    source: "required",
  },
  {
    slug: "adham-dannaway",
    name: "Adham Dannaway",
    url: "https://www.adhamdannaway.com",
    role: "UX/UI Designer & Frontend Developer",
    source: "required",
  },
  {
    slug: "bruno-simon",
    name: "Bruno Simon",
    url: "https://bruno-simon.com",
    role: "Three.js Developer",
    source: "required",
  },
  {
    slug: "paco",
    name: "Francisco Salido",
    url: "https://paco.fyi",
    role: "Software Engineer",
    source: "required",
  },
  {
    slug: "dauren-abasov",
    name: "Dauren Abasov",
    url: "https://dadashi44.vercel.app",
    role: "Frontend Engineer",
    source: "random",
  },
  {
    slug: "masab-qurban",
    name: "Masab Qurban",
    url: "https://www.masabqurban.com",
    role: "Software Engineer | Full Stack Developer",
    source: "random",
  },
  {
    slug: "tibor-igneczi",
    name: "Tibor Ignéczi",
    url: "https://igneczitibor.hu",
    role: "Full Stack Developer",
    source: "random",
  },
  {
    slug: "priyanshu-ghosh",
    name: "Priyanshu Ghosh",
    url: "https://priyanshu-ghosh-seven.vercel.app",
    role: "Full Stack Developer",
    source: "random",
  },
  {
    slug: "naveen-kumar",
    name: "Naveen Kumar",
    url: "https://naveenweb.site",
    role: "Full Stack Developer | MERN Stack",
    source: "random",
  },
  {
    slug: "rajesh-pal",
    name: "Rajesh Pal",
    url: "https://rajs.app",
    role: "Full Stack Developer | AI Enthusiast",
    source: "random",
  },
  {
    slug: "nikhila-koneru",
    name: "Nikhila Koneru",
    url: "https://nikhilakoneru.com",
    role: "Full Stack Developer | DevOps Engineer",
    source: "random",
  },
  {
    slug: "maciej-pulikowski",
    name: "Maciej Pulikowski",
    url: "https://pulik.dev",
    role: "Software Engineer & Security Researcher",
    source: "random",
  },
  {
    slug: "luke-liukonen",
    name: "Luke Liukonen",
    url: "https://liukonen.dev",
    role: "Senior Software Engineer",
    source: "random",
  },
  {
    slug: "lamine-neggazi",
    name: "Lamine Neggazi",
    url: "https://lamine.cc",
    role: "Full Stack Developer",
    source: "random",
  },
  {
    slug: "philippe-fanaro",
    name: "Philippe Fanaro",
    url: "https://aquarifolio.vercel.app",
    role: "Full Stack Developer",
    source: "random",
  },
  {
    slug: "paritosh-khubchandani",
    name: "Paritosh Khubchandani",
    url: "https://paritosh-dev.vercel.app",
    role: "Full Stack Developer | React, Next.js, Django, FastAPI",
    source: "random",
  },
  {
    slug: "lai-huishan",
    name: "Lai Huishan",
    url: "https://shan-verse.com",
    role: "Full Stack Developer",
    source: "random",
  },
  {
    slug: "cristopher-coronado",
    name: "Cristopher Coronado Moreira",
    url: "https://cristopher-coronado-portfolio.vercel.app/",
    role: "Full Stack Developer | .NET/Angular",
    source: "random",
  },
  {
    slug: "ilija-korodic",
    name: "Ilija Korodic",
    url: "https://ilijakorodic.com",
    role: "Frontend & Webflow Developer",
    source: "random",
  },
  {
    slug: "sharif-rahat",
    name: "Sharif Rahat",
    url: "https://sharifrahat.com",
    role: "Full Stack Developer",
    source: "random",
  },
  {
    slug: "ashutosh-dash",
    name: "Ashutosh Dash",
    url: "https://ashutoshdash.in",
    role: "Frontend Engineer | ReactJS, Next.js",
    source: "random",
  },
  {
    slug: "sairithik",
    name: "Sairithik Komuravelly",
    url: "https://heysai.dev",
    role: "Full Stack Engineer | AI Integration & Tooling",
    source: "random",
  },
];

function auditInPage() {
  const bodyStyle = getComputedStyle(document.body);
  const rootStyle = getComputedStyle(document.documentElement);
  const headings = [...document.querySelectorAll("h1, h2")]
    .map((el) => (el.innerText || "").replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .slice(0, 14);
  const nav = [...document.querySelectorAll("nav a, header a")]
    .map((el) => (el.innerText || "").replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .slice(0, 16);
  const scripts = [...document.querySelectorAll("script[src]")].map((s) => s.src);
  const html = document.documentElement.innerHTML.toLowerCase();
  const libNeedles = [
    "gsap",
    "scrolltrigger",
    "three",
    "framer-motion",
    "framer",
    "lenis",
    "locomotive-scroll",
    "spline",
    "animejs",
    "anime.min",
    "barba",
    "lottie",
    "pixi",
    "typed.js",
    "typewriter",
    "split-type",
    "swiper",
    "matter-js",
    "r3f",
    "react-three",
  ];
  const libs = libNeedles.filter(
    (needle) =>
      html.includes(needle) || scripts.some((src) => src.toLowerCase().includes(needle)),
  );
  const fonts = new Set();
  for (const el of document.querySelectorAll("h1, h2, p, a, button, body")) {
    const family = getComputedStyle(el).fontFamily.split(",")[0].replace(/['"]/g, "").trim();
    if (family) fonts.add(family);
  }
  let fixedOrSticky = 0;
  for (const el of document.querySelectorAll("header, nav, aside, [class*='sidebar'], [class*='nav']")) {
    const pos = getComputedStyle(el).position;
    if (pos === "fixed" || pos === "sticky") fixedOrSticky += 1;
  }
  const cursorNone = [...document.querySelectorAll("body, a, button")].some(
    (el) => getComputedStyle(el).cursor === "none",
  );
  return {
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content || "",
    h1: (document.querySelector("h1")?.innerText || "").replace(/\s+/g, " ").trim().slice(0, 180),
    headings,
    nav,
    background: bodyStyle.backgroundColor || rootStyle.backgroundColor,
    color: bodyStyle.color,
    fonts: [...fonts].slice(0, 8),
    cursor: bodyStyle.cursor,
    cursorNone,
    canvases: document.querySelectorAll("canvas").length,
    videos: document.querySelectorAll("video").length,
    animations: document.getAnimations ? document.getAnimations().length : 0,
    libs,
    fixedOrSticky,
    textSample: (document.body?.innerText || "").replace(/\s+/g, " ").trim().slice(0, 420),
  };
}

const results = [];

const browser = await chromium.launch({
  headless: true,
  args: ["--use-angle=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"],
});

for (const site of sites) {
  const dir = path.join(outRoot, site.slug);
  fs.mkdirSync(dir, { recursive: true });
  const result = {
    ...site,
    ok: false,
    mobileOk: false,
    status: null,
    finalUrl: null,
    error: null,
    mobileError: null,
    audit: null,
    desktopBytes: 0,
    mobileBytes: 0,
  };

  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    locale: "en-US",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
  });
  const page = await desktop.newPage();
  try {
    const response = await page.goto(site.url, {
      waitUntil: "domcontentloaded",
      timeout: 35000,
    });
    await page.waitForTimeout(2800);
    result.status = response ? response.status() : null;
    result.finalUrl = page.url();
    result.audit = await page.evaluate(auditInPage);
    const desktopPath = path.join(dir, "desktop.png");
    await page.screenshot({ path: desktopPath });
    result.desktopBytes = fs.statSync(desktopPath).size;
    await page.evaluate(() => window.scrollBy(0, Math.round(window.innerHeight * 0.9)));
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(dir, "desktop-scrolled.png") });
    result.ok = true;
  } catch (error) {
    result.error = String(error?.message || error).slice(0, 400);
  }
  await desktop.close();

  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
    locale: "en-US",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  });
  const mobilePage = await mobile.newPage();
  try {
    await mobilePage.goto(result.finalUrl || site.url, {
      waitUntil: "domcontentloaded",
      timeout: 35000,
    });
    await mobilePage.waitForTimeout(2200);
    const mobilePath = path.join(dir, "mobile.png");
    await mobilePage.screenshot({ path: mobilePath });
    result.mobileBytes = fs.statSync(mobilePath).size;
    result.mobileOk = true;
  } catch (error) {
    result.mobileError = String(error?.message || error).slice(0, 300);
  }
  await mobile.close();

  results.push(result);
  fs.writeFileSync(notesPath, JSON.stringify(results, null, 2));
  const mark = result.ok ? "OK" : "FAIL";
  console.log(`${mark}\t${site.slug}\t${result.finalUrl || result.error}`);
}

await browser.close();
const okCount = results.filter((item) => item.ok).length;
console.log(`DONE ${okCount}/${results.length}`);
