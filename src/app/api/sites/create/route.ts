import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { PrismaClient, BusinessType, TemplateStyle } from '@prisma/client';
import { generateSiteWithInsights } from '@/lib/ai-generator';
import { BusinessInsight } from '@/lib/ai-conversational';
import { enhanceContentWithInsights } from '@/lib/ai-conversational';

const prisma = new PrismaClient();

const createSiteSchema = z.object({
  name: z.string().min(2).max(100),
  type: z.enum(['RESTAURANT', 'BARBERSHOP', 'SALON', 'GYM', 'RETAIL', 'HOTEL', 'PHARMACY', 'CAFE', 'BAKERY', 'PET_SHOP', 'BOOKSTORE', 'FLORIST', 'CLEANING_SERVICE', 'AUTOMOTIVE', 'ELECTRONICS', 'TOY_STORE', 'SPORTS_STORE', 'TRAVEL_AGENCY', 'REAL_ESTATE', 'CONFECTIONERY', 'OTHER']),
  description: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  style: z.enum(['CATALOG', 'PORTFOLIO', 'LANDING', 'BOOKING', 'ECOMMERCE', 'BLOG']).optional(),
  diferencial: z.string().optional(),
  targetAudience: z.string().optional(),
  services: z.array(z.string()).optional(),
  toneOfVoice: z.enum(['formal', 'casual', 'fun', 'luxury']).optional(),
  // AI Conversational mode fields
  aiInsights: z.object({}).optional(),
  answers: z.record(z.string(), z.any()).optional(),
  creationMode: z.enum(['template', 'ai-conversational']).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createSiteSchema.parse(body);

    // Determine creation mode
    const mode = data.creationMode || 'template';

    // Generate slug from name
    const slug = data.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Check if slug already exists
    const existing = await prisma.business.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: 'Já existe um site com este nome. Escolha outro nome.' },
        { status: 400 }
      );
    }

    // Get or create a default user (for MVP)
    let defaultUser = await prisma.user.findFirst();
    if (!defaultUser) {
      defaultUser = await prisma.user.create({
        data: {
          name: 'Default User',
          email: 'admin@saas-sites.com',
        },
      });
    }

    // Create business
    const business = await prisma.business.create({
      data: {
        name: data.name,
        slug,
        type: data.type as BusinessType,
        description: data.description,
        address: data.address,
        phone: data.phone,
        email: data.email,
        ownerId: defaultUser.id,
      },
    });

    let generatedSite: any;
    let templateStyle = (data.style || 'CATALOG') as TemplateStyle;

    if (mode === 'ai-conversational' && data.aiInsights) {
      // AI Personalized mode with insights
      const insights = data.aiInsights as BusinessInsight;
      
      // Generate base site with AI
      const businessDetails = {
        name: data.name,
        type: data.type as BusinessType,
        description: data.description,
        address: data.address,
        phone: data.phone,
        email: data.email,
        style: templateStyle,
        diferencial: data.diferencial,
        targetAudience: insights.targetAudience,
        services: data.services,
        toneOfVoice: insights.messagingTone || 'casual',
        aiInsights: insights,
        answers: data.answers,
      };

      // Use enhanced generation with insights
      generatedSite = await generateSiteWithInsights(businessDetails, insights);
      // templateStyle stays as selected by user
    } else {
      // Template Ready mode
      const businessDetails = {
        name: data.name,
        type: data.type as BusinessType,
        description: data.description,
        address: data.address,
        phone: data.phone,
        email: data.email,
        style: templateStyle,
        diferencial: data.diferencial,
        targetAudience: data.targetAudience,
        services: data.services,
        toneOfVoice: data.toneOfVoice,
      };

      generatedSite = await generateSiteWithInsights(businessDetails, {});
    }

    // Create site
    const site = await prisma.site.create({
      data: {
        businessId: business.id,
        templateStyle,
        title: generatedSite.title,
        metaDescription: generatedSite.metaDescription,
        content: generatedSite.content as any,
        customCss: generatedSite.customCss,
        published: false,
      },
    });

    return NextResponse.json({
      success: true,
      mode,
      business: {
        id: business.id,
        name: business.name,
        slug: business.slug,
      },
      site: {
        id: site.id,
        title: site.title,
        published: site.published,
        previewUrl: `/preview/${business.slug}`,
        publishedUrl: `http://${business.slug}.localhost:3000`,
      },
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating site:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Erro ao criar site. Tente novamente.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Get all sites (for dashboard)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ownerId = searchParams.get('ownerId');

    const sites = await prisma.site.findMany({
      include: {
        business: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ sites });
  } catch (error) {
    console.error('Error fetching sites:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar sites' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
