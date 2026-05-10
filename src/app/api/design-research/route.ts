import { NextRequest, NextResponse } from 'next/server';
import { designInspirationEngine } from '@/lib/design-inspiration';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessName, businessType, style, keywords, niches } = body;

    if (!businessName || !businessType) {
      return NextResponse.json({ error: 'businessName e businessType obrigatórios' }, { status: 400 });
    }

    const result = await designInspirationEngine.search({
      businessName,
      businessType,
      style: style || 'modern',
      keywords: keywords || [],
      niches: niches || [businessType],
    });

    return NextResponse.json({
      success: true,
      inspirations: result.inspirations,
      aiInsights: result.aiInsights,
      platforms: ['mobbin', 'refero', 'curated', 'bento-grinds', 'httpster', 'github', 'awwwards', 'landbook'],
    });
  } catch (error: any) {
    console.error('[DesignResearch] Error:', error);
    return NextResponse.json({ error: error.message || 'Erro interno', inspirations: [] }, { status: 500 });
  }
}
