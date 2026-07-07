import { chromium } from "playwright";

const OUT = "C:/Users/jonra/AppData/Local/Temp/claude/c--Projects-hps/c99b2be4-683e-4a4a-9771-05d3cc29b4b4/scratchpad";

const diag = async (page, label) => {
  return await page.evaluate((label) => {
    const pill = document.querySelector(".backdrop-blur-2xl");
    if (!pill) return { label, error: "pill not found" };
    const rootBreakers = [];
    let el = pill.parentElement;
    while (el && el !== document.documentElement) {
      const s = getComputedStyle(el);
      const flags = {};
      if (s.transform && s.transform !== "none") flags.transform = s.transform;
      if (s.filter && s.filter !== "none") flags.filter = s.filter;
      if (s.backdropFilter && s.backdropFilter !== "none") flags.backdropFilter = s.backdropFilter;
      if (s.perspective && s.perspective !== "none") flags.perspective = s.perspective;
      if (parseFloat(s.opacity) < 1) flags.opacity = s.opacity;
      if (s.willChange && s.willChange !== "auto") flags.willChange = s.willChange;
      if (s.isolation && s.isolation === "isolate") flags.isolation = s.isolation;
      if (s.contain && s.contain !== "none") flags.contain = s.contain;
      if (s.clipPath && s.clipPath !== "none") flags.clipPath = s.clipPath;
      if (s.mixBlendMode && s.mixBlendMode !== "normal") flags.mixBlendMode = s.mixBlendMode;
      if (Object.keys(flags).length)
        rootBreakers.push({ tag: el.tagName, cls: el.className?.toString?.().slice(0, 80), flags });
      el = el.parentElement;
    }
    const ps = getComputedStyle(pill);
    return {
      label,
      pill: {
        backdropFilter: ps.backdropFilter || ps.webkitBackdropFilter,
        webkitBackdropFilter: ps.webkitBackdropFilter,
        background: ps.backgroundColor,
        transform: ps.transform,
      },
      ancestorBackdropRootBreakers: rootBreakers,
    };
  }, label);
};

const run = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // Homepage — wait out the hero + header intro (~2.35s + margin)
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.waitForTimeout(4000);
  const d1 = await diag(page, "home-after-intro");
  await page.screenshot({ path: `${OUT}/01-home-closed.png`, clip: { x: 0, y: 0, width: 1440, height: 260 } });

  // Open language menu by hovering translate
  const langBtn = page.locator('button[aria-label="Select language"]');
  await langBtn.hover();
  await page.waitForTimeout(600);
  const d2 = await diag(page, "home-lang-open");
  await page.screenshot({ path: `${OUT}/02-home-lang-open.png`, clip: { x: 0, y: 0, width: 1440, height: 380 } });

  console.log(JSON.stringify({ d1, d2 }, null, 2));
  await browser.close();
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
