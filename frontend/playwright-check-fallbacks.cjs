const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const base = 'http://localhost:5173';
  const routes = ['/admin', '/profile', '/settings', '/trips/new'];
  const outDir = path.join(__dirname, 'playwright-smoke');
  const results = {};
  const browser = await chromium.launch();

  for (const route of routes) {
    const context = await browser.newContext();
    const page = await context.newPage();
    try {
      // navigate and quickly check for loader presence
      await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 10000 });
      // check early (250ms) before scripts finish, and later (1200ms)
      await page.waitForTimeout(250);
      const early = await page.$('.animate-spin');
      await page.waitForTimeout(1200);
      const late = await page.$('.animate-spin');
      results[route] = {
        foundEarly: Boolean(early),
        foundLate: Boolean(late),
      };
    } catch (err) {
      results[route] = { error: String(err) };
    }
    await context.close();
  }

  await browser.close();
  const out = path.join(outDir, 'fallback-check.json');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
  fs.writeFileSync(out, JSON.stringify(results, null, 2));
  console.log('Fallback check written to', out);
})();
