import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get site by business slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const business = await prisma.business.findUnique({
      where: { slug: params.slug },
      include: {
        sites: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!business || business.sites.length === 0) {
      return NextResponse.json(
        { error: 'Site não encontrado' },
        { status: 404 }
      );
    }

    const site = business.sites[0];

    // If site is not published, only show preview for owner
    if (!site.published) {
      // In production, check authentication here
      // For now, allow preview
    }

    return NextResponse.json({
      business: {
        name: business.name,
        type: business.type,
        description: business.description,
        address: business.address,
        phone: business.phone,
        email: business.email,
        logo: business.logo,
      },
      site: {
        id: site.id,
        title: site.title,
        metaDescription: site.metaDescription,
        content: site.content,
        published: site.published,
        createdAt: site.createdAt,
      },
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
