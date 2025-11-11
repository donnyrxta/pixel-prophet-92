import { test, expect } from '@playwright/test';

const sizes = [
  { width: 375, height: 667, name: 'mobile' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 1024, height: 1366, name: 'laptop' },
];

for (const s of sizes) {
  test(`Home visual snapshot - ${s.name}`, async ({ page }) => {
    await page.setViewportSize({ width: s.width, height: s.height });
    await page.goto('http://localhost:8083/');
    await page.waitForLoadState('domcontentloaded');
    // Ensure header is visible and no horizontal scroll
    const hasOverflow = await page.evaluate(() => document.body.scrollWidth > document.body.clientWidth);
    expect(hasOverflow).toBeFalsy();
    expect(await page.screenshot()).toMatchSnapshot(`home-${s.name}.png`);
  });
}

