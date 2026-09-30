import { chromium } from 'playwright-core';

const executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browser = await chromium.launch({ executablePath, headless: true });
const targets = [
  { name: 'mobile', width: 360, height: 800, screenshot: true },
  { name: 'tablet', width: 768, height: 900 },
  { name: 'laptop', width: 1024, height: 900 },
  { name: 'desktop', width: 1440, height: 1000, screenshot: true },
];

try {
  for (const target of targets) {
    const page = await browser.newPage({ viewport: { width: target.width, height: target.height }, deviceScaleFactor: 1 });
    const errors = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    if (target.screenshot) await page.screenshot({ path: `../docs/screenshots/portfolio-${target.name}.png`, fullPage: false });
    if (dimensions.scrollWidth > dimensions.clientWidth) {
      throw new Error(`${target.name} overflows horizontally: ${dimensions.scrollWidth}px > ${dimensions.clientWidth}px`);
    }
    if (errors.length) throw new Error(`${target.name} console errors: ${errors.join(' | ')}`);
    console.log(`${target.name}: ${dimensions.clientWidth}px viewport, no horizontal overflow or console errors`);
    await page.close();
  }
} finally {
  await browser.close();
}
