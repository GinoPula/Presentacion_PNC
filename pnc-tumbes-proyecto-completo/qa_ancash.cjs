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

  await page.goto('http://localhost:4178/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  async function switchRegion(label) {
    const switcherBtn = await page.locator('button', { hasText: /Tumbes|Puno|Tacna|Piura|Ancash/ }).first();
    await switcherBtn.click({ timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(300);
    const option = page.locator(`text="${label}"`).first();
    await option.click({ timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(800);
  }

  await switchRegion('Región Ancash');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/work/qa_ancash_panorama.png', fullPage: false });

  const mapSection = page.locator('#mapa, [id*="mapa"]').first();
  await mapSection.scrollIntoViewIfNeeded().catch(() => {});
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/tmp/work/qa_ancash_mapa.png', fullPage: false });

  const escSection = page.locator('#escenarios').first();
  await escSection.scrollIntoViewIfNeeded().catch(() => {});
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/work/qa_ancash_escenarios.png', fullPage: false });

  const pcSection = page.locator('#puntos-criticos').first();
  await pcSection.scrollIntoViewIfNeeded().catch(() => {});
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/work/qa_ancash_puntos_criticos.png', fullPage: false });

  const activosSection = page.locator('#activos, [id*="activo"]').first();
  await activosSection.scrollIntoViewIfNeeded().catch(() => {});
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/work/qa_ancash_activos.png', fullPage: false });

  const galSection = page.locator('#galeria, [id*="galeria"]').first();
  await galSection.scrollIntoViewIfNeeded().catch(() => {});
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/work/qa_ancash_galeria.png', fullPage: false });

  console.log('CONSOLE ERRORS:', JSON.stringify(consoleErrors, null, 2));

  await browser.close();
})();
