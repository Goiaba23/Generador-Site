import { NextRequest, NextResponse } from 'next/server';

interface StockImage {
  id: string;
  url: string;
  thumb: string;
  small: string;
  description: string;
  photographer: string;
  photographerUrl: string;
  source: 'unsplash' | 'pexels';
  width: number;
  height: number;
}

async function searchUnsplash(query: string, perPage: number): Promise<StockImage[]> {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key || key === 'YOUR_UNSPLASH_ACCESS_KEY') return [];

  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=squarish`,
    { headers: { Authorization: `Client-ID ${key}` } }
  );

  if (!res.ok) {
    console.warn(`[StockImages] Unsplash error: ${res.status}`);
    return [];
  }

  const data = await res.json();
  return (data.results || []).map((img: any) => ({
    id: `unsplash_${img.id}`,
    url: img.urls.full,
    thumb: img.urls.thumb,
    small: img.urls.small,
    description: img.alt_description || img.description || query,
    photographer: img.user.name,
    photographerUrl: img.user.links.html,
    source: 'unsplash' as const,
    width: img.width,
    height: img.height,
  }));
}

async function searchPexels(query: string, perPage: number): Promise<StockImage[]> {
  const key = process.env.PEXELS_API_KEY;
  if (!key || key === 'YOUR_PEXELS_API_KEY') return [];

  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=square`,
    { headers: { Authorization: key } }
  );

  if (!res.ok) {
    console.warn(`[StockImages] Pexels error: ${res.status}`);
    return [];
  }

  const data = await res.json();
  return (data.photos || []).map((img: any) => ({
    id: `pexels_${img.id}`,
    url: img.src.original,
    thumb: img.src.tiny,
    small: img.src.medium,
    description: img.alt || query,
    photographer: img.photographer,
    photographerUrl: img.photographer_url,
    source: 'pexels' as const,
    width: img.width,
    height: img.height,
  }));
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || searchParams.get('query') || '';
  const perPage = Math.min(Number(searchParams.get('per_page')) || 10, 30);

  if (!query.trim()) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  const [unsplashResults, pexelsResults] = await Promise.all([
    searchUnsplash(query, perPage),
    searchPexels(query, perPage),
  ]);

  const images = [...unsplashResults, ...pexelsResults];

  return NextResponse.json({
    success: true,
    query,
    total: images.length,
    sources: {
      unsplash: unsplashResults.length,
      pexels: pexelsResults.length,
    },
    images,
  });
}
