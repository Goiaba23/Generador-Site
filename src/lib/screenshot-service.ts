export async function captureScreenshot(url: string): Promise<{ url: string | null; format: string }> {
  const key = process.env.SCREENSHOT_SCOUT_KEY || '';
  if (!key || !url) return { url: null, format: 'none' };
  try {
    const apiUrl = `https://api.screenshotscout.com/v1/capture?access_key=${encodeURIComponent(key)}&url=${encodeURIComponent(url)}&format=png&full_page=true&block_ads=true&block_cookie_banners=true`;
    return { url: apiUrl, format: 'png' };
  } catch (err) {
    console.warn('[Screenshot] Failed:', err instanceof Error ? err.message : err);
    return { url: null, format: 'none' };
  }
}
