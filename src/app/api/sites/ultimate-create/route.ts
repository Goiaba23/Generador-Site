// Premium Site Creation API v5.0
// Integração com templates Dribbble/Landbook $10K+
// Limite: 1 site grátis, depois pagar

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { BusinessType, TemplateStyle } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { getTemplateByType, getAllTemplates, SiteTemplate } from '@/lib/templates';
import { generateSiteWithInsights } from '@/lib/ai-generator';
import { enhanceContentWithInsights } from '@/lib/ai-conversational';
import { getWorldClassTokens, generateWorldClassCSS, WORLD_CLASS_PALETTES, TYPOGRAPHY_SYSTEMS } from '@/lib/world-class-design';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
  // Check authentication and plan limits
  const session = await getServerSession({ req: request, secret: process.env.NEXTAUTH_SECRET! });
    
    if (!session || !(session as any).user?.id) {
      return NextResponse.json(
        { error: 'Login obrigatório para criar sites' },
        { status: 401 }
      );
    }

    const userId = (session as any).user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Check plan limits (1 free site)
    if (user.plan === 'free' && user.sitesUsed >= 1) {
      return NextResponse.json(
        { error: 'Limite do plano grátis atingido. Faça upgrade para criar mais sites.', upgrade: true },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { businessName, businessType, objective, images, style, diferencial, targetAudience, solutions, painPoints, stitchPrompt, phone, email, address } = body;

    // Validate required fields
    if (!businessName || !businessType) {
      return NextResponse.json(
        { error: 'Nome e tipo de negócio são obrigatórios' },
        { status: 400 }
      );
    }

    // Get premium template v5.0 based on type and style
    const templateStyle = style as TemplateStyle | undefined;
    const template = getTemplateByType(
      businessType as BusinessType,
      templateStyle
    ) || getTemplateByType(businessType as BusinessType);

    if (!template) {
      return NextResponse.json(
        { error: 'Nenhum template premium encontrado para este tipo de negócio' },
        { status: 400 }
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

    // Create business details object
    const businessDetails = {
      name: businessName,
      type: businessType as BusinessType,
      style: templateStyle,
      diferencial,
      targetAudience,
      features: selectedFeatures,
      contact: { phone, email, address },
    };

    // Generate site with AI insights (or use template directly)
    const mockInsights = {
      objectives: { primary: objective || 'professional_presence' },
      targetAudience: targetAudience || 'Local customers',
      problems: painPoints?.length > 0 
        ? painPoints.map((p: string) => ({ category: 'pain_point', description: p, urgency: 'high' as const }))
        : [{ category: 'visibility', description: 'Need better online presence', urgency: 'high' as const }],
      features: selectedFeatures,
    };

    const generatedSite = await generateSiteWithInsights(businessDetails, mockInsights);

    // Replace image placeholders with uploaded images
    let siteContent = JSON.parse(JSON.stringify(generatedSite.content));
    
    // Replace {{image-slots}} with actual uploaded images
    if (images && typeof images === 'object') {
      Object.entries(images).forEach(([slotId, imageUrl]) => {
        const replaceInObject = (obj: any): any => {
          if (typeof obj === 'string') {
            return obj.replace(`{{${slotId}}}`, imageUrl as string);
          }
          if (Array.isArray(obj)) {
            return obj.map(replaceInObject);
          }
          if (typeof obj === 'object' && obj !== null) {
            const newObj: any = {};
            Object.entries(obj).forEach(([key, value]) => {
              newObj[key] = replaceInObject(value);
            });
            return newObj;
          }
          return obj;
        };
        
        siteContent = replaceInObject(siteContent);
      });
    }

    // Generate unique site ID
    const siteId = `site_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    const slug = businessName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').substring(0, 50);

    // Update user sites used count
    await prisma.user.update({
      where: { id: userId },
      data: { sitesUsed: { increment: 1 } }
    });

    // Return generated site data with niche proposal (UNIQUE DIFFERENTIATOR)
    return NextResponse.json({
      success: true,
      siteId,
      slug,
      site: {
        id: siteId,
        businessName,
        businessType,
        template: template.id,
        title: generatedSite.title,
        metaDescription: generatedSite.metaDescription,
        content: siteContent,
        designTokens: generatedSite.designTokens,
        dribbbleInspiration: template.dribbbleInspiration,
        landbookStyle: template.landbookStyle,
        features: selectedFeatures,
        contact: { phone, email, address },
        // NEW: Problem-Solution-Result (USP)
        nicheProposal: generatedSite.nicheProposal,
        growthModules: generatedSite.nicheProposal?.growthModules || [],
        seo: {
          title: generatedSite.title,
          description: generatedSite.metaDescription,
        },
      },
      message: generatedSite.nicheProposal 
        ? `Site criado para resolver: ${generatedSite.nicheProposal.painPoint}`
        : 'Site premium criado com sucesso',
      previewUrl: `/sites/${slug}`,
    });

  } catch (error) {
    console.error('Error creating premium site:', error);
    return NextResponse.json(
      { error: 'Erro interno ao criar site premium' },
      { status: 500 }
    );
  }
}

// Get all premium templates
export async function GET() {
  try {
    const templates = getAllTemplates();
    
    return NextResponse.json({
      message: 'Premium Site Creation API v5.0',
      version: '5.0',
      features: [
        'Templates baseados em Dribbble $10K+ (BotiFly, Design Monks, Pixxen)',
        'Designs por nicho com cores reais de agências top',
        'Image slots personalizados por tipo de negócio',
        'Integração com IA para personalização',
        'Landbook-inspired layouts',
      ],
      templates: templates.map(t => ({
        id: t.id,
        name: t.name,
        businessType: t.businessType,
        style: t.style,
        dribbbleInspiration: t.dribbbleInspiration,
      })),
      totalTemplates: templates.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar templates' },
      { status: 500 }
    );
  }
}
