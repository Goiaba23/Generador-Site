// AI Full-Autonomous Site Creation API
// Uses plan-based methods: Simple (standard) = GPT-4o, Premium (OpenCode big-pickle)
// Workflow: Stitch Design → OpenCode Analysis → 21.dev/GSAP Enhancement → Delivery

import { NextRequest, NextResponse } from 'next/server';
import { BusinessType, TemplateStyle, PrismaClient } from '@prisma/client';
import { generateSiteWithInsights } from '@/lib/ai-generator';
import { getNicheProposalLocal } from '@/lib/ai-generator';
import { openCodeWorker } from '@/lib/opencode-worker';
import { getPlanById, getMethodForPlan, canUseOpenCodeWorker } from '@/lib/plan-config';
import { researchNiche } from '@/lib/skill-research';
import { researchNicheWithYouTube } from '@/lib/niche-research-pipeline';
import { trainingLoop } from '@/lib/ai-training-loop';

const prisma = new PrismaClient();

// AI inference for missing fields based on business type
function inferBusinessDetails(businessName: string, businessType: string) {
  const styleMap: Record<string, string> = {
    'RESTAURANT': 'modern',
    'BARBER_SHOP': 'dark',
    'SALON': 'elegant',
    'CLINIC': 'minimalist',
    'GYM': 'bold',
    'RETAIL': 'vibrant',
    'HOTEL': 'luxury',
    'TECH': 'futuristic',
    'PET_SHOP': 'playful',
    'OTHER': 'modern',
  };

  const nicheProposal = getNicheProposalLocal(businessType as any);
  const solutionMap: Record<string, string[]> = {
    'RESTAURANT': ['online_catalog', 'delivery_integration', 'reservation_system'],
    'BARBER_SHOP': ['online_booking', 'loyalty_program', 'whatsapp_integration'],
    'SALON': ['online_booking', 'loyalty_program', 'reviews_testimonials'],
    'CLINIC': ['online_booking', 'customer_area', 'online_payment'],
    'GYM': ['online_booking', 'customer_area', 'loyalty_program'],
    'RETAIL': ['online_catalog', 'online_payment', 'delivery_integration'],
    'HOTEL': ['reservation_system', 'reviews_testimonials', 'whatsapp_integration'],
    'TECH': ['blog_content', 'portfolio_gallery', 'customer_area'],
    'PET_SHOP': ['online_booking', 'loyalty_program', 'delivery_integration'],
    'OTHER': ['whatsapp_integration', 'online_catalog', 'customer_area'],
  };

  return {
    style: styleMap[businessType] || 'modern',
    painPoints: nicheProposal?.painPoint ? [nicheProposal.painPoint] : [],
    solutions: solutionMap[businessType] || ['whatsapp_integration', 'online_catalog'],
    diferencial: nicheProposal?.solution || 'Premium AI-generated site',
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessName, businessType, email, phone, address, plan, skillContext, designTokens } = body;

    if (!businessName || !businessType) {
      return NextResponse.json({ error: 'Nome e tipo de negócio são obrigatórios' }, { status: 400 });
    }

    const inferred = inferBusinessDetails(businessName, businessType);

    let sandwichResearch = skillContext;
    if (!sandwichResearch) {
      try {
        sandwichResearch = await researchNicheWithYouTube(businessType, businessName, businessName);
      } catch {
        sandwichResearch = researchNiche(businessType, businessName, businessName);
      }
    }

    const researchReport = sandwichResearch?.designRationale || null;

    // Get or create user - use plan from request
    const selectedPlan = plan && ['simple', 'premium'].includes(plan) ? plan : 'simple';
    let defaultUser = await prisma.user.findFirst();
    if (!defaultUser) {
      defaultUser = await prisma.user.create({
        data: {
          name: 'Default User',
          email: 'admin@saas-sites.com',
          plan: selectedPlan,
          sitesUsed: 0,
        },
      });
    } else {
      // Update user plan to the selected one for this creation
      await prisma.user.update({
        where: { id: defaultUser.id },
        data: { plan: selectedPlan },
      });
    }

    // Check plan limits
    const planConfig = getPlanById(selectedPlan);
    const sitesLimit = planConfig?.sitesLimit || 5;
    if (sitesLimit !== -1 && defaultUser.sitesUsed >= sitesLimit) {
      return NextResponse.json({ error: 'Limite do plano atingido.', upgrade: true }, { status: 403 });
    }

    // Determine method based on selected plan
    const method = getMethodForPlan(selectedPlan);
    const useOpenCodeWorker = canUseOpenCodeWorker(selectedPlan);
    console.log(`[AI Create] Plan: ${selectedPlan}, Method: ${method}`);

    let siteContent: any = null;
    let workerSessionId: string | null = null;

    // Premium method: Use OpenCode big-pickle worker with Stitch + Analysis + Enhancement
    if (method === 'premium' && useOpenCodeWorker) {
      try {
        workerSessionId = await openCodeWorker.startWorkerSession(businessName, businessType);
        console.log(`[AI Create] Started worker session: ${workerSessionId}`);
        
        // Start execution in background (non-blocking)
        // The worker will: 1) Stitch design → 2) OpenCode analysis → 3) Enhance with 21.dev/GSAP → 4) Deliver
        openCodeWorker.startExecution(workerSessionId);
        
        // Return immediately with session ID for polling
        return NextResponse.json({
          success: true,
          status: 'processing',
          workerSessionId,
          planUsed: selectedPlan,
          message: 'Site generation started with Stitch + OpenCode big-pickle workflow. Poll for progress.',
          pollUrl: `/api/opencode-worker?sessionId=${workerSessionId}`,
          workflow: [
            'Stitch (Google) design generation',
            'OpenCode big-pickle critical analysis',
            'Enhancement with 21.dev components + GSAP + Glassmorphism',
            'Final delivery of $10K+ quality site'
          ]
        });
      } catch (err) {
        console.error('OpenCode Worker failed, falling back to standard:', err);
        // Fall through to standard method
      }
    }

    // Standard method or fallback (synchronous) - Simple plan
    if (!siteContent) {
      const skillDesignTokens = designTokens || null;

      const mockInsights = {
        objectives: { primary: 'professional_presence' },
        targetAudience: 'Local customers',
        problems: inferred.painPoints.map((p: string) => ({
          category: 'pain_point',
          description: p,
          urgency: 'high' as const,
        })),
        features: inferred.solutions,
        skillResearch: sandwichResearch ? {
          sandwichLayers: sandwichResearch.sandwichLayers,
          designRationale: sandwichResearch.designRationale,
          sections: sandwichResearch.sections,
          keywords: sandwichResearch.keywords,
        } : null,
        designTokens: skillDesignTokens || null,
      };
      const businessDetails = {
        name: businessName,
        type: businessType as BusinessType,
        plan: (selectedPlan === 'premium' ? 'PREMIUM' : 'COMMON') as any,
        style: sandwichResearch?.sandwichLayers?.colors?.scheme || inferred.style as any,
        diferencial: inferred.diferencial,
        features: inferred.solutions,
        contact: { phone, email, address },
      };
      const generatedSite = await generateSiteWithInsights(businessDetails, mockInsights);
      siteContent = generatedSite.content;
    }

    // Create Business record
    const slug = businessName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 50);

    const business = await prisma.business.create({
      data: {
        name: businessName,
        slug: slug,
        type: businessType as BusinessType,
        description: `Site ${planConfig?.name || 'premium'} criado por IA para ${businessName}`,
        phone: phone || null,
        email: email || null,
        address: address || null,
        ownerId: defaultUser.id,
      },
    });

    // Create Site record
    const site = await prisma.site.create({
      data: {
        businessId: business.id,
        templateStyle: TemplateStyle.CATALOG,
        title: businessName,
        metaDescription: `Site criado por IA para ${businessName}`,
        content: siteContent as any,
        published: false,
      },
    });

    // Update user sites used count
    await prisma.user.update({
      where: { id: defaultUser.id },
      data: { sitesUsed: { increment: 1 } },
    });

    // Record generation in training loop
    try {
      trainingLoop.recordGeneration({
        businessType,
        businessName,
        style: sandwichResearch?.sandwichLayers?.colors?.scheme || inferred.style,
        sections: sandwichResearch?.sections || [],
        palette: sandwichResearch?.sandwichLayers?.colors?.palette || [],
        success: true,
      });
    } catch {
      // Non-blocking training record
    }

    // Delivery response
    const methodUsed = workerSessionId ? 'OpenCode big-pickle (Premium)' : 'IA Padrão (Simples)';
    return NextResponse.json({
      success: true,
      site: {
        id: site.id,
        businessId: business.id,
        slug: business.slug,
        title: businessName,
        previewUrl: `/sites/${business.slug}`,
        workerSessionId,
        methodUsed,
        planUsed: selectedPlan,
      },
      message: `Site criado automaticamente (${methodUsed})!`,
      designRationale: sandwichResearch?.designRationale || null,
      sandwichLayers: sandwichResearch?.sandwichLayers || null,
      keywords: sandwichResearch?.keywords || [],
      youtubeFindings: sandwichResearch?.youtubeFindings || [],
      trends: sandwichResearch?.trends || [],
      nextSteps: workerSessionId
        ? ['Stitch design gerado', 'OpenCode analisou criticamente', '21.dev + GSAP aplicados', 'Site entregue pronto']
        : ['Site gerado com sucesso', 'Acesse a pré-visualização'],
    });

  } catch (error) {
    console.error('Error in AI creation:', error);
    return NextResponse.json({ error: 'Erro interno na criação' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AI Autonomous Site Creation API - Plan-based methods',
    version: '4.0',
    plans: [
      'simple (R$79,90/mês, lucro líquido ~R$50,00)',
      'premium (R$197,90/mês - Stitch + OpenCode big-pickle + 21.dev + GSAP, lucro líquido ~R$120,00)',
    ],
    workflow: {
      premium: [
        '1. Stitch (Google) generates initial design',
        '2. OpenCode big-pickle performs critical analysis',
        '3. Enhancement with 21.dev components + GSAP animations + Glassmorphism',
        '4. Final delivery of $10K+ quality website'
      ],
      simple: [
        '1. Quick generation with standard AI',
        '2. Basic responsive design',
        '3. SEO optimization',
        '4. Delivery'
      ]
    },
    profitNote: 'Margens de lucro sustentam melhorias futuras de modelos de IA',
  });
}
