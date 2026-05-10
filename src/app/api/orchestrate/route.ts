import { NextRequest, NextResponse } from 'next/server';
import { multiAI } from '@/lib/multi-ai-orchestrator';

export async function POST(request: NextRequest) {
  try {
    const { action, task, params, businessName, businessType, style } = await request.json();

    if (action === 'status') {
      return NextResponse.json({
        providers: multiAI.getProviderStats(),
        available: multiAI.getAvailableProviders().map(p => ({ provider: p.provider, tasks: p.tasks })),
      });
    }

    if (action === 'full-site') {
      if (!businessName || !businessType) {
        return NextResponse.json({ error: 'businessName and businessType required' }, { status: 400 });
      }
      const result = await multiAI.orchestrateFullSiteGeneration(businessName, businessType, style || 'modern');
      return NextResponse.json({ success: true, ...result });
    }

    if (action === 'task') {
      if (!task || !params) {
        return NextResponse.json({ error: 'task and params required' }, { status: 400 });
      }
      const result = await multiAI.executeTask(task, params);
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err) {
    console.error('Orchestration error:', err);
    return NextResponse.json({ error: 'Orchestration failed' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    orchestrator: 'Multi-AI Orchestrator v2',
    providers: multiAI.getProviderStats(),
    endpoints: ['POST /api/orchestrate { action: "status" }', 'POST /api/orchestrate { action: "task", task, params }', 'POST /api/orchestrate { action: "full-site", businessName, businessType, style }'],
  });
}
