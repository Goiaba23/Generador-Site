// OpenCode Worker API - Stitch + OpenCode Analysis + 21.dev Enhancement
// Supports async execution and progress polling

import { NextRequest, NextResponse } from 'next/server';
import { openCodeWorker } from '@/lib/opencode-worker';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const sessionId = searchParams.get('sessionId');
  
  if (sessionId) {
    const progress = openCodeWorker.getProgress(sessionId);
    const session = openCodeWorker.getSession(sessionId);
    
    return NextResponse.json({
      success: true,
      sessionId,
      status: progress.status,
      progress: {
        current: progress.current,
        total: progress.total,
        percentage: progress.percentage,
      },
      steps: session?.steps || [],
      finalResult: session?.finalResult,
      message: progress.status === 'completed' ? 'Site generation completed with $10K+ quality!' :
               progress.status === 'error' ? 'Error during generation' :
               `Processing with Stitch + OpenCode... ${progress.percentage}% complete`,
    });
  }

  return NextResponse.json({
    message: 'OpenCode Worker API - Stitch + OpenCode + 21.dev + GSAP',
    version: '3.0',
    status: 'active',
    workflow: [
      '1. Stitch (Google) generates initial design',
      '2. OpenCode big-pickle analyzes with COMPLETE knowledge base',
      '3. Enhancement with 21st.dev components + GSAP + Glassmorphism',
      '4. Final delivery of $10K+ quality website'
    ],
    knowledgeBase: 'Full web design knowledge (fonts, colors, animations, components)',
    endpoints: {
      poll: '/api/opencode-worker?sessionId=YOUR_SESSION_ID',
      start: 'POST with { action: "start", businessName, businessType }',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessName, businessType, action, sessionId, stepIndex } = body;

    if (action === 'start') {
      if (!businessName || !businessType) {
        return NextResponse.json(
          { error: 'Nome e tipo de negócio são obrigatórios' },
          { status: 400 }
        );
      }

      const newSessionId = await openCodeWorker.startWorkerSession(businessName, businessType);
      
      // Start execution in background (non-blocking)
      openCodeWorker.startExecution(newSessionId);

      return NextResponse.json({
        success: true,
        sessionId: newSessionId,
        message: 'Stitch + OpenCode big-pickle workflow started',
        totalSteps: openCodeWorker['PROGRAMMED_PATH']?.length || 4,
        workflow: [
          'Stitch design generation',
          'OpenCode critical analysis with full knowledge base',
          'Enhancement with 21st.dev + GSAP + Glassmorphism',
          'Final $10K+ quality delivery'
        ],
        pollUrl: `/api/opencode-worker?sessionId=${newSessionId}`,
      });
    }

    if (action === 'step') {
      if (!sessionId) {
        return NextResponse.json({ error: 'sessionId required' }, { status: 400 });
      }

      const step = await openCodeWorker.executeStep(sessionId, stepIndex);
      return NextResponse.json({ success: true, step });
    }

    if (action === 'status') {
      if (!sessionId) {
        return NextResponse.json({ error: 'sessionId required' }, { status: 400 });
      }

      const session = openCodeWorker.getSession(sessionId);
      if (!session) {
        return NextResponse.json({ error: 'Session not found' }, { status: 404 });
      }

      const progress = openCodeWorker.getProgress(sessionId);
      return NextResponse.json({
        success: true,
        session: {
          businessName: session.businessName,
          businessType: session.businessType,
          status: session.status,
          steps: session.steps,
          progress,
        }
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error: any) {
    console.error('[OpenCode Worker API] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal error' },
      { status: 500 }
    );
  }
}
