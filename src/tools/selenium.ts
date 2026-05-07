import { chromium, Browser, Page, BrowserContext } from 'playwright';

let browser: Browser | null = null;
let context: BrowserContext | null = null;
let page: Page | null = null;

export async function selenium_start_browser(options: { browser: string; options: any }) {
  console.log(`[Selenium Tool] Starting ${options.browser}...`);
  browser = await chromium.launch({ headless: options.options.headless ?? false });
  context = await browser.newContext();
  page = await context.newPage();
  return { success: true };
}

export async function selenium_navigate(options: { url: string }) {
  if (!page) throw new Error('Browser not started');
  console.log(`[Selenium Tool] Navigating to ${options.url}...`);
  await page.goto(options.url, { waitUntil: 'networkidle' });
  return { success: true };
}

export async function selenium_interact(options: { action: string; by: string; value: string }) {
  if (!page) throw new Error('Browser not started');
  console.log(`[Selenium Tool] Action: ${options.action} on ${options.value}`);
  
  const selector = options.by === 'css' ? options.value : `[${options.by}="${options.value}"]`;
  
  if (options.action === 'click') {
    await page.click(selector);
  }
  return { success: true };
}

export async function selenium_send_keys(options: { by: string; value: string; text: string }) {
  if (!page) throw new Error('Browser not started');
  console.log(`[Selenium Tool] Sending keys to ${options.value}`);
  
  const selector = options.by === 'css' ? options.value : `[${options.by}="${options.value}"]`;
  await page.fill(selector, options.text);
  return { success: true };
}

export async function selenium_get_element_text(options: { by: string; value: string }) {
  if (!page) throw new Error('Browser not started');
  const selector = options.by === 'css' ? options.value : options.by === 'tag' ? options.value : `[${options.by}="${options.value}"]`;
  return await page.innerText(selector);
}

export async function selenium_press_key(options: { key: string }) {
  if (!page) throw new Error('Browser not started');
  await page.keyboard.press(options.key);
  return { success: true };
}

export async function selenium_take_screenshot(options: { path: string }) {
  if (!page) throw new Error('Browser not started');
  await page.screenshot({ path: options.path });
  return { success: true };
}

export async function selenium_close_session() {
  if (browser) {
    await browser.close();
    browser = null;
    context = null;
    page = null;
  }
  return { success: true };
}
