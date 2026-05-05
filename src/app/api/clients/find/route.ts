import { NextRequest, NextResponse } from 'next/server';
import { findPotentialClients, analyzeWebsite } from '@/lib/client-finder';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { niche, location } = body;

    if (!niche) {
      return NextResponse.json(
        { error: 'Niche é obrigatório' },
        { status: 400 }
      );
    }

    const clients = await findPotentialClients(niche, location || 'Brasil');

    return NextResponse.json({
      success: true,
      count: clients.length,
      clients,
      message: `${clients.length} clientes potenciais encontrados para ${niche}`
    });
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    return NextResponse.json(
      { error: 'Erro interno ao buscar clientes' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json(
        { error: 'URL é obrigatória' },
        { status: 400 }
      );
    }

    const analysis = await analyzeWebsite(url);

    return NextResponse.json({
      success: true,
      analysis,
      message: 'Análise do site concluída'
    });
  } catch (error) {
    console.error('Erro ao analisar site:', error);
    return NextResponse.json(
      { error: 'Erro interno ao analisar site' },
      { status: 500 }
    );
  }
}
