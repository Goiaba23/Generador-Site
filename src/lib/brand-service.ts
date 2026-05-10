const CONTEXT_DEV_API_KEY = process.env.CONTEXT_DEV_API_KEY || '';

export interface BrandData {
  title: string;
  description: string;
  slogan: string;
  domain: string;
  colors: { hex: string; name: string }[];
  logos: { url: string; mode: 'light' | 'dark' | 'has_opaque_background'; type: 'icon' | 'logo' }[];
  socials: { type: string; url: string }[];
  address: {
    street: string; city: string; country: string;
    country_code: string; state_province: string; postal_code: string;
  } | null;
  phone: string;
  email: string;
  industries: { industry: string; subindustry: string }[];
}

export async function fetchBrandData(domain: string): Promise<BrandData | null> {
  if (!CONTEXT_DEV_API_KEY) {
    console.log('[Brand] No CONTEXT_DEV_API_KEY, skipping brand enrichment');
    return null;
  }

  try {
    const res = await fetch(`https://api.context.dev/v1/brand/retrieve?domain=${encodeURIComponent(domain)}&maxSpeed=true`, {
      headers: { Authorization: `Bearer ${CONTEXT_DEV_API_KEY}` },
    });

    if (!res.ok) {
      if (res.status === 404) {
        console.log(`[Brand] No brand data found for domain: ${domain}`);
        return null;
      }
      console.warn(`[Brand] API error ${res.status}`);
      return null;
    }

    const data = await res.json();
    if (data?.status !== 'ok' || !data?.brand) {
      console.warn('[Brand] Unexpected response format');
      return null;
    }

    const b = data.brand;
    return {
      title: b.title || '',
      description: b.description || '',
      slogan: b.slogan || '',
      domain: b.domain || domain,
      colors: b.colors || [],
      logos: b.logos || [],
      socials: b.socials || [],
      address: b.address || null,
      phone: b.phone || '',
      email: b.email || '',
      industries: b.industries?.eic || [],
    };
  } catch (err) {
    console.warn('[Brand] Fetch failed:', err instanceof Error ? err.message : err);
    return null;
  }
}

export function extractBrandColors(brand: BrandData): string[] {
  return brand.colors.map(c => c.hex).filter(Boolean);
}

export function extractBrandLogo(brand: BrandData, preferMode: 'light' | 'dark' = 'dark'): string | null {
  const logos = brand.logos;
  if (logos.length === 0) return null;
  const preferred = logos.find(l => l.mode === preferMode && l.type === 'logo');
  if (preferred) return preferred.url;
  const icon = logos.find(l => l.mode === preferMode && l.type === 'icon');
  if (icon) return icon.url;
  return logos[0]?.url || null;
}

export function enrichDesignTokensWithBrand(tokens: any, brand: BrandData): any {
  if (!brand) return tokens;
  const brandColors = extractBrandColors(brand);
  if (brandColors.length > 0 && tokens?.sandwichLayers?.colors?.palette) {
    const merged = [...brandColors, ...tokens.sandwichLayers.colors.palette.slice(brandColors.length)];
    tokens = {
      ...tokens,
      sandwichLayers: {
        ...tokens.sandwichLayers,
        colors: {
          ...tokens.sandwichLayers.colors,
          palette: merged.slice(0, 5),
          brandInspired: true,
        },
      },
    };
  }
  return tokens;
}
