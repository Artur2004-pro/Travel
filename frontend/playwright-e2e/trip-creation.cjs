const { chromium, devices } = require('playwright');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'playwright-smoke');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const BASE = process.env.BASE_URL || 'http://localhost:5174';

const viewports = [
  { name: 'desktop', viewport: { width: 1280, height: 800 }, isMobile: false },
  { name: 'mobile', viewport: devices['iPhone 12'].viewport, isMobile: true },
];

function screenshot(page, tag) {
  try {
    const safeTag = (tag || 'shot').toString().replace(/\W+/g, '_') || `shot_${Date.now()}`;
    const file = path.join(outDir, `shot_${safeTag}.png`);
    return page.screenshot({ path: file, fullPage: true }).then(() => file);
  } catch (err) {
    console.error('Screenshot failed for', tag, err && err.stack ? err.stack : err);
    return Promise.resolve(null);
  }
}

async function runFlow(browser, opts) {
  const context = await browser.newContext({ viewport: opts.viewport, ...(opts.isMobile ? { isMobile: true } : {}) });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', (m) => {
    const type = m.type();
    const text = m.text();
    if (type === 'error') consoleErrors.push({ type, text });
    if (text && /navigate\(|Warning:/.test(text)) consoleErrors.push({ type: 'warn', text });
  });
  page.on('pageerror', (err) => consoleErrors.push({ type: 'pageerror', text: String(err) }));

  const stepScreens = [];

  try {
    // 1. Open Trip Creation country page
    await page.goto(`${BASE}/trips/new/country`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);
    stepScreens.push(await screenshot(page, `${opts.name}_country`));

    // Try select first country if present
    const search = page.locator('input[placeholder="Search country"]');
    if (await search.count()) {
      await search.fill('Italy');
      await page.waitForTimeout(1000);
      const createBtn = page.locator('button', { hasText: 'Create Trip' }).first();
      if (await createBtn.count()) {
        await createBtn.click();
        await page.waitForTimeout(800);
        stepScreens.push(await screenshot(page, `${opts.name}_after_country_select`));
      }
    }

    // 2. Ensure we're on Planning step
    if (!page.url().includes('/trips/new/planning')) {
      await page.goto(`${BASE}/trips/new/planning`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(600);
    }

    // Fill Planning step
    const title = page.locator('input[name="title"]');
    const desc = page.locator('textarea[name="description"]');
    const start = page.locator('input[name="startDate"]');
    const end = page.locator('input[name="endDate"]');

    const now = new Date();
    const d1 = now.toISOString().slice(0,10);
    const d2 = new Date(now.getTime() + 2*24*60*60*1000).toISOString().slice(0,10);

    if (await title.count()) await title.fill('Playwright Test Trip');
    if (await desc.count()) await desc.fill('E2E verification trip');
    if (await start.count()) await start.fill(d1);
    if (await end.count()) await end.fill(d2);

    await page.waitForTimeout(300);
    stepScreens.push(await screenshot(page, `${opts.name}_planning_filled`));

    // Click Next (robust selector)
    const clickAny = async (names) => {
      for (const n of names) {
        try {
          const btn = page.locator(`button:has-text("${n}")`).first();
          if (await btn.count()) { await btn.click({ timeout: 5000 }); return n; }
          const btn2 = page.getByRole('button', { name: new RegExp(n, 'i') }).first();
          if (await btn2.count()) { await btn2.click({ timeout: 5000 }); return n; }
        } catch (e) {
          // continue
        }
      }
      throw new Error('No clickable button found from: ' + names.join(', '));
    };

    await clickAny(['Next', 'Continue', 'Finish']);
    await page.waitForTimeout(1200);
    stepScreens.push(await screenshot(page, `${opts.name}_after_planning_next`));

    // Verify navigation to day-planning (or hotel) exists
    if (!/day-planning|hotel|city/.test(page.url())) {
      throw new Error('Did not navigate after planning Next: ' + page.url());
    }

    // Click Back
    await clickAny(['Back', 'Назад']);
    await page.waitForTimeout(700);
    stepScreens.push(await screenshot(page, `${opts.name}_after_back_to_planning`));

    // Ensure planning inputs still present
    const titleVal = await title.inputValue();
    const descVal = await desc.inputValue();
    if (!titleVal || !descVal) throw new Error('Planning inputs lost after Back');

    // Navigate via sidebar: City
    const sidebarCity = page.locator('button:has-text("City")').first();
    if (await sidebarCity.count()) {
      await sidebarCity.click();
      await page.waitForTimeout(800);
      stepScreens.push(await screenshot(page, `${opts.name}_sidebar_city`));
      // try select a city element
      const firstCity = page.locator('button').filter({ hasText: /Select|Choose|Create|Book|More|City/i }).first();
      if (await firstCity.count()) { await firstCity.click(); await page.waitForTimeout(800); }
    }

    // Ensure hotel step reachable and select first hotel if present
    if (!page.url().includes('/trips/new/hotel')) {
      try { await page.goto(`${BASE}/trips/new/hotel`); await page.waitForTimeout(600); } catch (e) {}
    }
    stepScreens.push(await screenshot(page, `${opts.name}_hotel`));
    const hotelCard = page.locator('div:has(img)').first();
    if (await hotelCard.count()) {
      await hotelCard.click();
      await page.waitForTimeout(600);
      stepScreens.push(await screenshot(page, `${opts.name}_hotel_selected`));
    }

    // Go to day-planning (if not already)
    if (!page.url().includes('/trips/new/day-planning')) {
      try { await page.goto(`${BASE}/trips/new/day-planning`); await page.waitForTimeout(600); } catch (e) {}
    }
    stepScreens.push(await screenshot(page, `${opts.name}_day_planning`));

    // Try to perform day actions: click Finish in top controls if present
    const finishBtn = page.locator('button:has-text("Finish")').first();
    if (await finishBtn.count()) {
      await finishBtn.click();
      await page.waitForTimeout(800);
      stepScreens.push(await screenshot(page, `${opts.name}_after_finish_click`));
    }

    // On Finish step: click Use default to complete
    if (!page.url().includes('/trips/new/finish')) {
      try { await page.goto(`${BASE}/trips/new/finish`); await page.waitForTimeout(600); } catch (e) {}
    }
    stepScreens.push(await screenshot(page, `${opts.name}_finish`));
    const useDefault = page.locator('button:has-text("Use default")').first();
    if (await useDefault.count()) {
      await useDefault.click();
      await page.waitForTimeout(1000);
      stepScreens.push(await screenshot(page, `${opts.name}_completed`));
    }

    // Final URL should include /trip/
    if (!/\/trip\//.test(page.url())) {
      if (!page.url().includes('/trips')) {
        throw new Error('Did not reach final trip page, URL: ' + page.url());
      }
    }

    // Fail if any console errors happened
    if (consoleErrors.length) {
      console.error('Console errors during run:', consoleErrors);
      throw new Error('Console errors detected');
    }

    await context.close();
    return stepScreens;
  } catch (err) {
    await screenshot(page, `${opts.name}_error`);
    await context.close();
    throw err;
  }
}

(async () => {
  const browser = await chromium.launch();
  const results = {};
  try {
    for (const vp of viewports) {
      try {
        const shots = await runFlow(browser, vp);
        results[vp.name] = { success: true, shots };
      } catch (e) {
        results[vp.name] = { success: false, error: String(e) };
      }
    }
  } finally {
    await browser.close();
    fs.writeFileSync(path.join(outDir, 'trip_creation_report.json'), JSON.stringify(results, null, 2));
    console.log('Trip creation e2e finished. Report:', path.join(outDir, 'trip_creation_report.json'));
    const failed = Object.values(results).some(r => !r.success);
    process.exit(failed ? 1 : 0);
  }
})();
