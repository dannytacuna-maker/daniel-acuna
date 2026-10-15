/**
 * Portfolio MacBook reel — quick real-site walkthrough (SSC Outsourcing style).
 * Output: public/projects/{id}-hero.mp4 at 1440×720 + true-mobile poster PNG.
 *
 *   SITE=countme node scripts/record-project-reel.mjs
 *   SITE=ontrack node scripts/record-project-reel.mjs
 */
import { chromium, devices } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const projectsDir = path.join(root, "public/projects");
const tmpDir = path.join(root, "scripts/.reel-tmp");
fs.mkdirSync(tmpDir, { recursive: true });

const SITES = {
  countme: {
    id: "countme",
    url: process.env.DEMO_URL || "https://countme-pied.vercel.app/es",
  },
  ontrack: {
    id: "ontrack",
    url: process.env.DEMO_URL || "https://www.ontrackcr.net/es",
  },
};

const siteKey = (process.env.SITE || "countme").toLowerCase();
const site = SITES[siteKey];
if (!site) {
  console.error("SITE=countme|ontrack");
  process.exit(1);
}

const W = 1440;
const H = 720;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function wheelBy(page, total) {
  let left = Math.abs(total);
  const dir = total > 0 ? 1 : -1;
  while (left > 0) {
    const tick = Math.min(left, 110 + Math.floor(Math.random() * 50));
    await page.mouse.wheel(0, tick * dir);
    left -= tick;
    await sleep(18);
  }
  await sleep(140);
}

async function easeMove(page, x, y, ms = 420) {
  const steps = Math.max(8, Math.round(ms / 16));
  await page.mouse.move(x, y, { steps });
}

async function recordDesktop() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: W, height: H },
    deviceScaleFactor: 1.25,
    recordVideo: { dir: tmpDir, size: { width: W, height: H } },
  });
  const page = await context.newPage();
  await page.goto(site.url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForLoadState("networkidle").catch(() => {});
  await sleep(900);

  // Hero hold — show the real landing
  await easeMove(page, W * 0.5, H * 0.42, 500);
  await sleep(1100);

  // Skim nav
  for (const label of ["Sobre", "Por qué", "Servicios", "Contacto"]) {
    const link = page.locator("header a, nav a").filter({ hasText: new RegExp(label, "i") }).first();
    const box = await link.boundingBox().catch(() => null);
    if (!box) continue;
    await easeMove(page, box.x + box.width / 2, box.y + box.height / 2, 320);
    await link.hover({ force: true }).catch(() => {});
    await sleep(260);
  }

  // CTA
  const cta = page.locator("a").filter({ hasText: /Contactar|Continuar|Ver servicios/i }).first();
  {
    const box = await cta.boundingBox().catch(() => null);
    if (box) {
      await easeMove(page, box.x + box.width / 2, box.y + box.height / 2, 380);
      await sleep(400);
    }
  }

  // Scroll the whole site quickly (SSC pacing)
  await easeMove(page, W * 0.7, H * 0.55, 300);
  for (const delta of [650, 750, 800, 850, 700, 650]) {
    await wheelBy(page, delta);
    await sleep(220);
  }

  // Pause on a mid-page heading
  const heading = page.locator("main h2, section h2").nth(1);
  {
    const box = await heading.boundingBox().catch(() => null);
    if (box && box.y > 40 && box.y < H - 80) {
      await easeMove(page, box.x + Math.min(box.width * 0.35, 200), box.y + 10, 360);
      await sleep(500);
    }
  }

  await wheelBy(page, 700);
  await sleep(280);
  await wheelBy(page, 600);
  await sleep(500);

  // Soft end near contact
  await easeMove(page, W * 0.45, H * 0.5, 450);
  await sleep(700);

  const raw = await page.video()?.path();
  await context.close();
  await browser.close();
  return raw;
}

async function captureMobilePoster() {
  const phone = devices["iPhone 14 Pro"];
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ ...phone });
  const page = await context.newPage();
  await page.goto(site.url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForLoadState("networkidle").catch(() => {});
  await sleep(1000);
  const out = path.join(projectsDir, `${site.id}-mobile.png`);
  await page.screenshot({ path: out, type: "png" });
  await context.close();
  await browser.close();
  return out;
}

const raw = await recordDesktop();
if (!raw || !fs.existsSync(raw)) {
  console.error("No desktop video");
  process.exit(1);
}

const webm = path.join(tmpDir, `${site.id}-raw.webm`);
if (fs.existsSync(webm)) fs.unlinkSync(webm);
fs.renameSync(raw, webm);

const mp4 = path.join(projectsDir, `${site.id}-hero.mp4`);
const ff = spawnSync(
  "ffmpeg",
  [
    "-y",
    "-i",
    webm,
    "-vf",
    `scale=${W}:${H}:force_original_aspect_ratio=decrease,pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2`,
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "18",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "-an",
    mp4,
  ],
  { encoding: "utf8" }
);
if (ff.status !== 0) {
  console.error(ff.stderr?.slice(-1000));
  process.exit(1);
}

const poster = path.join(projectsDir, `${site.id}.png`);
spawnSync(
  "ffmpeg",
  ["-y", "-ss", "3.5", "-i", mp4, "-frames:v", "1", "-update", "1", poster],
  { encoding: "utf8" }
);

const mobile = await captureMobilePoster();
console.log(mp4);
console.log(poster);
console.log(mobile);
