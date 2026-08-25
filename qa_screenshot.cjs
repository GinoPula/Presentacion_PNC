const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: [
      '--proxy-server=http://127.0.0.1:33845',
      '--proxy-bypass-list=127.0.0.1;localhost',
      '--ignore-certificate-errors',
    ],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push('PAGEERROR: ' + err.message));

  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Switch to Piura via region switcher
  // Try clicking the region switcher button, then Piura option
  async function switchRegion(label) {
    // Open switcher (assume a button showing current region)
    const switcherBtn = await page.locator('button', { hasText: /Tumbes|Puno|Tacna|Piura/ }).first();
    await switcherBtn.click({ timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(300);
    const option = page.locator(`text="${label}"`).first();
    await option.click({ timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(800);
  }

  await switchRegion('Región Piura');
  await page.waitForTimeout(1000);

  await page.screenshot({ path: '/tmp/work/qa_piura_panorama.png', fullPage: false });

  // scroll to map section
  const mapSection = page.locator('#mapa, [id*="mapa"]').first();
  await mapSection.scrollIntoViewIfNeeded().catch(() => {});
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/tmp/work/qa_piura_mapa.png', fullPage: false });

  // scroll to activos/personal section
  const activosSection = page.locator('#activos, #flota, [id*="activo"], [id*="flota"]').first();
  await activosSection.scrollIntoViewIfNeeded().catch(() => {});
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/work/qa_piura_activos.png', fullPage: false });

  // puntos criticos section
  const pcSection = page.locator('#puntos-criticos').first();
  await pcSection.scrollIntoViewIfNeeded().catch(() => {});
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/work/qa_piura_puntos_criticos.png', fullPage: false });

  // gallery section
  const galSection = page.locator('#galeria, [id*="galeria"]').first();
  await galSection.scrollIntoViewIfNeeded().catch(() => {});
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/work/qa_piura_galeria.png', fullPage: false });

  // Now re-check Tumbes / Puno / Tacna panorama with fresh numbers
  for (const region of ['Región Tumbes', 'Región Puno', 'Región Tacna']) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await switchRegion(region);
    await page.waitForTimeout(800);
    const slug = region.split(' ')[1].toLowerCase();
    await page.screenshot({ path: `/tmp/work/qa_${slug}_panorama.png`, fullPage: false });
  }

  console.log('CONSOLE ERRORS:', JSON.stringify(consoleErrors, null, 2));

  await browser.close();
})();
