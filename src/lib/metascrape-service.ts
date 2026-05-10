export interface MetaScrapeResult {
  url: string;
  domain: string;
  title: string;
  description: string;
  favicon: string;
  og: { title: string; description: string; image: string; type: string; site_name: string };
  twitter: { card: string; title: string; image: string; site: string };
  structured_data: Record<string, any>[];
}

export async function extractMetadata(url: string): Promise<MetaScrapeResult | null> {
  const key = process.env.METASCRAPE_KEY || '';
  if (!key || !url) return null;
  try {
    const res = await fetch(`https://api.shanecode.org/v1/extract?url=${encodeURIComponent(url)}`, {
      headers: { 'X-API-Key': key },
    });
    if (!res.ok) { console.warn(`[MetaScrape] API error ${res.status}`); return null; }
    const data = await res.json();
    return data?.data || null;
  } catch (err) {
    console.warn('[MetaScrape] Failed:', err instanceof Error ? err.message : err);
    return null;
  }
}
