const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const base = 'http://localhost:5174';
  const routes = ['/admin', '/profile', '/settings', '/trips/new'];
  const outDir = path.join(__dirname, 'playwright-smoke');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const browser = await chromium.launch();
  const results = {};

  for (const route of routes) {
    const context = await browser.newContext();
    let delayed = false;
    await context.route('**/*.js', async (routeReq) => {
      try {
        const url = routeReq.request().url();
        if (!delayed && url.includes('/src/') && !url.includes('/src/main') && !url.includes('/@vite')) {
          delayed = true;
          await new Promise((r) => setTimeout(r, 1200));
          await routeReq.continue();
        } else {
          await routeReq.continue();
        }
      } catch (e) {
        try { await routeReq.continue(); } catch (e) {}
      }
    });

    const page = await context.newPage();
    const logs = [];
    page.on('console', (m) => logs.push({ type: m.type(), text: m.text() }));
    page.on('pageerror', (err) => logs.push({ type: 'pageerror', text: String(err) }));

    try {
      await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 10000 });
      await page.waitForTimeout(1500);

      const shotPath = path.join(outDir, `shot${route.replace(/\//g, '_')}.png`);
      await page.screenshot({ path: shotPath, fullPage: true });

      results[route] = { logs, screenshot: shotPath, success: true };
    } catch (err) {
      results[route] = { logs, error: String(err), success: false };
    }

    await context.close();
  }

  await browser.close();

  const reportPath = path.join(outDir, 'report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log('Playwright smoke finished. Report:', reportPath);
})();
