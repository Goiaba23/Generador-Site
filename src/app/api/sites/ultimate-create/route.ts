// Ultimate Site Creation API v4.0
// Integrates: objective-driven features + image slots + research-based designs

import { NextRequest, NextResponse } from 'next/server';
import { BusinessType } from '@prisma/client';
import { generateUltimateTemplate, UltimateTemplateConfig } from '@/lib/templates-v4-ultimate';
import { enhanceContentWithInsights, BusinessInsight } from '@/lib/ai-conversational';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessName, businessType, objective, images, templateId } = body;

    // Validate required fields
    if (!businessName || !businessType || !objective) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate template based on type and objective
    const template = generateUltimateTemplate(
      businessType as BusinessType,
      objective
    );

    // Replace image placeholders with uploaded images
    let siteContent = JSON.parse(JSON.stringify(template.defaultContent));
    
    // Replace {{image-slots}} with actual uploaded images
    Object.entries(images || {}).forEach(([slotId, imageUrl]) => {
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

    // Replace business info placeholders
    siteContent = JSON.parse(
      JSON.stringify(siteContent)
        .replace(/\{\{businessName\}\}/g, businessName)
        .replace(/\{\{businessType\}\}/g, businessType)
    );

    // Generate AI insights for further enhancement
    const mockInsights: BusinessInsight = {
      problems: [{ category: (objective === 'get_bookings' ? 'booking' : 'visibility') as any, description: 'Need better online presence', urgency: 'high' }],
      objectives: { primary: objective as any, timeline: '3_months' as any },
      targetAudience: 'Local customers',
      diferentiators: ['Quality service', 'Great location'],
    };

    // Enhance content with AI insights
    siteContent = enhanceContentWithInsights(siteContent, mockInsights, businessName);

    // In production, save to database
    // For now, return the generated site data
    const siteId = `site_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Generate HTML preview (in production, this would be saved to CDN/Vercel Blob)
    const htmlPreview = generateSiteHTML(siteContent, template);

    return NextResponse.json({
      success: true,
      siteId,
      site: {
        id: siteId,
        businessName,
        businessType,
        objective,
        template: template.id,
        content: siteContent,
        designTheme: template.designTheme,
        features: template.features.filter(f => f.enabled),
        seo: template.seoDefaults,
      },
      htmlPreview: htmlPreview, // In production, this would be a URL
      previewUrl: `/preview/${siteId}`,
    });

  } catch (error) {
    console.error('Error creating ultimate site:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Generate static HTML for the site
function generateSiteHTML(content: any, template: UltimateTemplateConfig): string {
  const theme = template.designTheme;
  
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.hero.title}</title>
  <meta name="description" content="${template.seoDefaults.description}">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: ${theme.fonts.body}; color: ${theme.colors.text}; background: ${theme.colors.background}; }
    h1, h2, h3 { font-family: ${theme.fonts.heading}; }
    .hero { background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${content.hero.backgroundImage}') center/cover; height: 100vh; display: flex; align-items: center; justify-content: center; color: white; text-align: center; }
    .hero h1 { font-size: 4rem; margin-bottom: 1rem; }
    .hero p { font-size: 1.5rem; margin-bottom: 2rem; }
    .cta-button { background: ${theme.colors.accent}; color: white; padding: 1rem 2rem; border-radius: 0.5rem; text-decoration: none; font-weight: bold; display: inline-block; }
    .section { padding: 4rem 2rem; max-width: 1200px; margin: 0 auto; }
    .section h2 { font-size: 2.5rem; margin-bottom: 2rem; text-align: center; color: ${theme.colors.primary}; }
    .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
    .feature { text-align: center; }
    .footer { background: ${theme.colors.primary}; color: white; padding: 2rem; text-align: center; }
  </style>
</head>
<body>
  <section class="hero">
    <div>
      <h1>${content.hero.title}</h1>
      <p>${content.hero.subtitle}</p>
      <a href="${content.hero.ctaLink}" class="cta-button">${content.hero.ctaText}</a>
    </div>
  </section>

  ${content.sections.map((section: any) => `
    <section class="section">
      <h2>${section.title}</h2>
      ${section.type === 'about' ? `
        <div style="display: flex; gap: 2rem; align-items: center;">
          <div style="flex: 1;">
            <p>${section.content.text}</p>
          </div>
          ${section.content.image ? `<div style="flex: 1;"><img src="${section.content.image}" alt="About" style="width: 100%; border-radius: 1rem;"></div>` : ''}
        </div>
      ` : ''}
      ${section.type === 'booking' ? `
        <div style="text-align: center;">
          <p>${section.content.message}</p>
          <a href="https://wa.me/${section.content.whatsapp}" class="cta-button">Agendar via WhatsApp</a>
        </div>
      ` : ''}
      ${section.type === 'contact' ? `
        <div class="features">
          <div class="feature">
            <h3>📍 Endereço</h3>
            <p>${section.content.address}</p>
          </div>
          <div class="feature">
            <h3>📞 Telefone</h3>
            <p>${section.content.phone}</p>
          </div>
          <div class="feature">
            <h3>🕐 Horário</h3>
            <p>${section.content.hours}</p>
          </div>
        </div>
      ` : ''}
    </section>
  `).join('')}

  <footer class="footer">
    <p>${content.footer.copyright}</p>
    <div style="margin-top: 1rem;">
      ${content.footer.links.map((link: any) => `<a href="${link.href}" style="color: white; margin: 0 1rem;">${link.label}</a>`).join('')}
    </div>
  </footer>
</body>
</html>`;
}

export async function GET() {
  return NextResponse.json({
    message: 'Ultimate Site Creation API v4.0',
    features: [
      'Objective-driven functionality (bookings→booking system, sales→e-commerce)',
      'Customizable image slots per business type',
      'Research-based design themes per niche',
      'AI-powered content enhancement',
    ],
  });
}
