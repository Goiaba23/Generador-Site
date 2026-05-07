// Premium Site Creation API v7.0 - NO DATABASE VERSION
// Integração com templates Dribbble/Landbook $10K+ + YouTube Research
// Modified to work WITHOUT Prisma - generates and returns site directly

import { NextRequest, NextResponse } from 'next/server';
import { BusinessType, TemplateStyle } from '@prisma/client';
import { generateSiteWithInsights } from '@/lib/ai-generator';
import { generatePremiumTemplate } from '@/lib/premium-generator';
import { PippitService } from '@/lib/pippit-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessName, businessType, style, solutions, painPoints, phone, email, address, brandAssets } = body;

    // Validate required fields
    if (!businessName || !businessType) {
      return NextResponse.json(
        { error: 'Nome e tipo de negócio são obrigatórios' },
        { status: 400 }
      );
    }

    console.log(`[API] Starting AI generation for ${businessName} (${businessType})`);

    // Map solutions to features
    const solutionFeatures: Record<string, string> = {
      'online_catalog': 'Catálogo Online',
      'online_booking': 'Agendamento Online',
      'online_orders': 'Pedidos Online',
      'delivery_integration': 'Delivery',
      'reservation_system': 'Reservas',
      'loyalty_program': 'Programa Fidelidade',
      'whatsapp_integration': 'WhatsApp Direct',
      'online_payment': 'Pagamento Online',
      'blog_content': 'Blog/Conteúdo',
      'portfolio_gallery': 'Galeria/Portfólio',
      'customer_area': 'Área do Cliente',
      'reviews_testimonials': 'Depoimentos',
      'modern-site': 'Site Moderno Premium',
      'booking-system': 'Sistema de Agendamento',
      'ecommerce': 'Loja Virtual',
      'seo-optimization': 'SEO Otimizado',
      'analytics': 'Analytics Dashboard',
      'ai-chatbot': 'Chatbot IA',
      'whatsapp': 'WhatsApp Business',
      'loyalty': 'Programa de Fidelidade',
    };

    const selectedFeatures = solutions?.map((s: string) => solutionFeatures[s] || s) || [];

    console.log(`[API] Selected features: ${selectedFeatures.join(', ')}`);

    // Generate site with AI insights
    const mockInsights = {
      objectives: { primary: 'professional_presence' },
      targetAudience: 'Local customers',
      problems: painPoints?.length > 0 
        ? painPoints.map((p: string) => ({ category: 'pain_point', description: p, urgency: 'high' as const }))
        : [{ category: 'visibility', description: 'Need better online presence', urgency: 'high' as const }],
      features: selectedFeatures,
    };

    const businessDetails = {
      name: businessName,
      type: businessType as BusinessType,
      plan: 'PREMIUM' as any,
      style: style as any,
      diferencial: solutions?.join(', ') || 'premium growth',
      features: selectedFeatures,
      contact: { phone, email, address },
      brandAssets: brandAssets || null,
    };

    console.log(`[API] Calling generateSiteWithInsights...`);
    const generatedSite = await generateSiteWithInsights(businessDetails, mockInsights);

    console.log(`[API] Site generated successfully: ${generatedSite.title}`);

    // AI ASSET GENERATION: If AI suggested a prompt for Pippit, generate now
    if (generatedSite.premium?.assetGenerationPrompt) {
      console.log('[API] Triggering autonomous Pippit asset generation...');
      try {
        const pippitService = PippitService.getInstance();
        const generatedAssetUrl = await pippitService.getAssetForNiche(
          businessName, 
          generatedSite.premium.assetGenerationPrompt.toLowerCase().includes('video') ? 'video' : 'image'
        );

        if (generatedAssetUrl) {
          console.log('[API] Pippit asset acquired, injecting into Hero section.');
          if (generatedSite.content?.hero) {
            generatedSite.content.hero.imageUrl = generatedAssetUrl;
          }
        }
      } catch (pippitError) {
        console.error('[API] Pippit generation failed (non-fatal):', pippitError);
      }
    }

    // Generate slug for preview
    const slug = businessName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').substring(0, 50);

    // Return generated site directly (NO DATABASE) - NOW WITH ALL TOOLS DATA
    return NextResponse.json({
      success: true,
      site: {
        id: 'temp-' + Date.now(),
        businessId: 'temp-' + Date.now(),
        slug: slug,
        title: generatedSite.title || businessName,
        metaDescription: generatedSite.metaDescription || '',
        content: generatedSite.content,
        features: selectedFeatures,
        contact: { phone, email, address },
        brandAssets: brandAssets || null,
        designTokens: generatedSite.designTokens,
        nicheProposal: generatedSite.nicheProposal,
        premium: generatedSite.premium,
        // INTEGRATED TOOLS DATA
        animations: generatedSite.animations || [],
        components: generatedSite.components || [],
        logoInspiration: generatedSite.logoInspiration,
        crawledData: generatedSite.crawledData,
        youtubeInsights: generatedSite.youtubeInsights || [],
        trends: generatedSite.trends || [],
      },
      rufloSwarm: generatedSite.rufloSwarm || null,
      message: 'Site premium criado com sucesso usando IA com todas as ferramentas!',
      previewUrl: `/preview/${slug}`,
      // TOOLS STATUS
      toolsIntegrated: {
        animations: !!generatedSite.animations?.length,
        components: !!generatedSite.components?.length,
        logoInspiration: !!generatedSite.logoInspiration,
        crawledData: !!generatedSite.crawledData,
        youtubeResearch: !!generatedSite.youtubeInsights?.length,
      }
    });

  } catch (error: any) {
    const errorDetails = {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    };
    console.error('[API] Error creating premium site:', JSON.stringify(errorDetails, null, 2));
    return NextResponse.json(
      { 
        error: `Erro interno ao criar site premium: ${error.message}`,
        details: process.env.NODE_ENV === 'development' ? errorDetails : undefined
      },
      { status: 500 }
    );
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    message: 'Premium Site Creation API v7.0 - Using Dribbble + YouTube + Memory (animations.ts, 21dev-components.ts, etc.) - NO DATABASE REQUIRED',
    version: '7.0',
    status: 'active',
    features: [
      'OpenAI GPT-4o-mini integration',
      'Real-time Dribbble/Landbook research',
      'YouTube search integration',
      'GSAP animations from animations.ts',
      '21dev components from 21dev-components.ts',
      'UXShowcase logos from uxshowcase-logos.ts',
      'Ruflo swarm agents',
      'Pippit asset generation',
    ],
   });
}
