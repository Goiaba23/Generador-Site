import { NextResponse } from 'next/server';
import { trainingLoop, generateTrainingReport } from '@/lib/ai-training-loop';

export async function GET() {
  const stats = trainingLoop.getTrainingStats();
  const report = generateTrainingReport();

  return NextResponse.json({
    success: true,
    stats,
    report,
    version: '1.0',
    message: 'AI Training & Learning System — cada geração melhora a próxima',
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'feedback') {
      const { businessName, rating, comments, adjustments } = body;
      trainingLoop.recordFeedback(businessName, { rating, comments, adjustments: adjustments || [] });
      return NextResponse.json({ success: true, message: 'Feedback registrado!' });
    }

    if (action === 'stats') {
      return NextResponse.json({ success: true, stats: trainingLoop.getTrainingStats() });
    }

    if (action === 'suggestions') {
      return NextResponse.json({ success: true, suggestions: trainingLoop.getLearningSuggestions() });
    }

    return NextResponse.json({ error: 'Ação inválida. Use: feedback, stats, suggestions' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
