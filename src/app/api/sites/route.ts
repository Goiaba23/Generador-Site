import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const sites = await prisma.site.findMany({
      include: { business: true },
      orderBy: { createdAt: 'desc' },
    });

    const mapped = sites.map(site => ({
      id: site.id,
      slug: site.business.slug,
      businessName: site.business.name,
      businessType: site.business.type,
      createdAt: site.createdAt.toISOString(),
      status: site.published ? 'PUBLISHED' : 'DRAFT',
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    console.error('Error fetching sites:', error);
    return NextResponse.json({ error: 'Erro ao buscar sites' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
