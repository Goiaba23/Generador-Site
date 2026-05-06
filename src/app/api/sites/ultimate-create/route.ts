// Premium Site Creation API v5.0
// Integração com templates Dribbble/Landbook $10K+

import { NextRequest, NextResponse } from 'next/server';
import { BusinessType, TemplateStyle, PrismaClient } from '@prisma/client';
import { generateSiteWithInsights } from '@/lib/ai-generator';
import { generatePremiumTemplate } from '@/lib/premium-generator';
import { PippitService } from '@/lib/pippit-service';

const prisma = new PrismaClient();

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

    // Style will be processed inside generateSiteWithInsights -> generatePremiumTemplate
    // which fetches from Dribbble + memory (animations.ts, 21dev-components.ts, etc.)

    // Get or create default user
    let defaultUser = await prisma.user.findFirst();
    if (!defaultUser) {
      defaultUser = await prisma.user.create({
        data: {
          name: 'Default User',
          email: 'admin@saas-sites.com',
          plan: 'free',
          sitesUsed: 0,
        },
      });
    }

    // Check plan limits
    if (defaultUser.plan === 'free' && defaultUser.sitesUsed >= 1) {
      return NextResponse.json(
        { error: 'Limite do plano grátis atingido. Faça upgrade para criar mais sites.', upgrade: true },
        { status: 403 }
      );
    }

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
    };

    const selectedFeatures = solutions?.map((s: string) => solutionFeatures[s] || s) || [];

    // Generate site with mock insights
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
      style: style as any, // Will be processed by generatePremiumTemplate
      diferencial: solutions?.join(', ') || 'premium growth',
      features: selectedFeatures,
      contact: { phone, email, address },
      brandAssets: brandAssets || null,
    };

    const generatedSite = await generateSiteWithInsights(businessDetails, mockInsights);

    // AI ASSET GENERATION: Se a IA sugeriu um prompt para Pippit, gerar agora
    if (generatedSite.premium?.assetGenerationPrompt) {
      console.log('[API] Triggering autonomous Pippit asset generation...');
      const pippitService = PippitService.getInstance();
      const generatedAssetUrl = await pippitService.getAssetForNiche(
        businessName, 
        generatedSite.premium.assetGenerationPrompt.toLowerCase().includes('video') ? 'video' : 'image'
      );

      if (generatedAssetUrl) {
        console.log('[API] Pippit asset acquired, injecting into Hero section.');
        // Injetar a URL gerada na seção Hero do conteúdo
        if (generatedSite.content?.hero) {
          generatedSite.content.hero.imageUrl = generatedAssetUrl;
        }
      }
    }

    // Generate slug
    const slug = businessName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').substring(0, 50);

    // Create Business record
    const business = await prisma.business.create({
      data: {
        name: businessName,
        slug: slug,
        type: businessType as BusinessType,
        description: `Site premium para ${businessName}`,
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
        templateStyle: TemplateStyle.CATALOG, // fallback, actual style is inside generatedSite.content
        title: generatedSite.title || businessName,
        metaDescription: generatedSite.metaDescription || '',
        content: generatedSite.content as any,
        published: false,
      },
    });

    // Update user sites used count
    await prisma.user.update({
      where: { id: defaultUser.id },
      data: { sitesUsed: { increment: 1 } },
    });

    return NextResponse.json({
      success: true,
      site: {
        id: site.id,
        businessId: business.id,
        slug: business.slug,
        title: generatedSite.title || businessName,
        metaDescription: generatedSite.metaDescription || '',
        content: generatedSite.content,
        features: selectedFeatures,
        contact: { phone, email, address },
        brandAssets: brandAssets || null,
      },
      rufloSwarm: generatedSite.rufloSwarm || null,
      message: 'Site premium criado com sucesso!',
      previewUrl: `/sites/${business.slug}`,
    });

  } catch (error) {
    console.error('Error creating premium site:', error);
    return NextResponse.json(
      { error: 'Erro interno ao criar site premium' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    message: 'Premium Site Creation API v6.0 - Using Dribbble + Memory (animations.ts, 21dev-components.ts, etc.)',
    version: '6.0',
    status: 'active',
  });
}
