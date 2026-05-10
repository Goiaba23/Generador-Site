import { NextRequest, NextResponse } from 'next/server';
import { videoGenerator } from '@/lib/video-generator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessName, businessType, style } = body;

    if (!businessName || !businessType) {
      return NextResponse.json(
        { error: 'businessName e businessType são obrigatórios' },
        { status: 400 }
      );
    }

    const result = await videoGenerator.generateVideo(
      businessName,
      businessType,
      style || 'modern'
    );

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Falha ao gerar vídeo', scenes: [], fallback: true },
        { status: 200 }
      );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('[GenerateVideo] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Erro interno', scenes: [], fallback: true },
      { status: 500 }
    );
  }
}
