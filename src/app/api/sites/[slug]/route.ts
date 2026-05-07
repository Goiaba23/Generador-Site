import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// In-memory store for generated sites (serverless-friendly)
// Using global to persist across hot reloads in development
declare global {
  var generatedSites: Map<string, any> | undefined;
}

if (!global.generatedSites) {
  global.generatedSites = new Map<string, any>();
}
const generatedSites = global.generatedSites;

// Get site by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    
    // Check in-memory store first
    const generatedSite = generatedSites.get(slug);
    
    if (generatedSite) {
      return NextResponse.json({
        success: true,
        site: generatedSite,
        source: 'memory'
      });
    }
    
    // Fallback to database
    const business = await prisma.business.findUnique({
      where: { slug },
      include: {
        sites: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!business || business.sites.length === 0) {
      return NextResponse.json(
        { error: 'Site não encontrado', slug },
        { status: 404 }
      );
    }

    const site = business.sites[0];

    return NextResponse.json({
      success: true,
      site: {
        id: site.id,
        title: site.title,
        metaDescription: site.metaDescription,
        content: site.content,
        businessName: business.name,
        businessType: business.type,
        features: (site.content as any)?.features || [],
        contact: {
          phone: business.phone,
          email: business.email,
        },
        published: site.published,
        createdAt: site.createdAt,
      },
      source: 'database'
    });

  } catch (error) {
    console.error('Error fetching site:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar site' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Store site data
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    const siteData = body.siteData || body;
    
    if (!siteData) {
      return NextResponse.json({ error: 'Dados do site obrigatórios' }, { status: 400 });
    }
    
    // Store site data in memory
    generatedSites.set(params.slug, siteData);
    
    return NextResponse.json({ success: true, slug: params.slug });
  } catch (error) {
    console.error('Error storing site:', error);
    return NextResponse.json({ error: 'Erro ao salvar site' }, { status: 500 });
  }
}

// Update site
export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    const { content, published, title, metaDescription } = body;

    const business = await prisma.business.findUnique({
      where: { slug: params.slug },
      include: { sites: true },
    });

    if (!business || business.sites.length === 0) {
      return NextResponse.json(
        { error: 'Site não encontrado' },
        { status: 404 }
      );
    }

    const site = business.sites[0];

    const updated = await prisma.site.update({
      where: { id: site.id },
      data: {
        ...(content && { content }),
        ...(published !== undefined && { published, publishedAt: published ? new Date() : null }),
        ...(title && { title }),
        ...(metaDescription && { metaDescription }),
      },
    });

    return NextResponse.json({
      success: true,
      site: updated,
    });

  } catch (error) {
    console.error('Error updating site:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar site' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
