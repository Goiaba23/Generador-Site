// AI Service for dynamic site generation
// Uses OpenAI API to generate site content based on business details

import { BusinessType, TemplateStyle } from '@prisma/client';
import { TemplateConfig, getTemplateByType } from './templates';
import { enhanceContentWithInsights, BusinessInsight } from './ai-conversational';

export interface BusinessDetails {
  name: string;
  type: BusinessType;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  logo?: string;
  style?: TemplateStyle;
  // Additional details for AI generation
  diferencial?: string; // What makes this business unique
  targetAudience?: string;
  services?: string[]; // List of services/products
  toneOfVoice?: 'formal' | 'casual' | 'fun' | 'luxury';
}

export interface GeneratedSite {
  title: string;
  metaDescription: string;
  content: any; // Structured content based on template
  suggestedColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  suggestedFonts: {
    heading: string;
    body: string;
  };
}

// Generate site with AI insights from conversational AI
export async function generateSiteWithInsights(
  businessDetails: BusinessDetails,
  insights: any
): Promise<GeneratedSite> {
  const apiKey = process.env.OPENAI_API_KEY;
  
  // Get base template
  const template = getTemplateByType(
    businessDetails.type,
    businessDetails.style
  ) || getTemplateByType(businessDetails.type);

  if (!template) {
    throw new Error(`No template found for business type: ${businessDetails.type}`);
  }

  // Enhance content with insights
  const baseContent = JSON.parse(JSON.stringify(template.defaultContent));
  const enhancedContent = enhanceContentWithInsights(baseContent, insights, businessDetails.name);

  if (!apiKey) {
    // Return template-based with insights enhancements
    return {
      title: businessDetails.name,
      metaDescription: `${businessDetails.name} - ${getBusinessTypeLabel(businessDetails.type)}. ${insights.objectives?.primary === 'get_bookings' ? 'Agende online!' : 'Compre online!'}`,
      content: enhancedContent,
      suggestedColors: {
        primary: insights.messagingTone === 'luxury' ? '#1a1a2e' : '#0ea5e9',
        secondary: '#f0f9ff',
        accent: insights.messagingTone === 'luxury' ? '#d4af37' : '#6366f1',
      },
      suggestedFonts: {
        heading: insights.messagingTone === 'formal' ? 'Playfair Display' : 'Inter',
        body: 'Inter',
      },
    };
  }

  try {
    // Call OpenAI with enhanced prompt including insights
    const prompt = `You are a professional web designer. Generate website content for a ${getBusinessTypeLabel(businessDetails.type)} named "${businessDetails.name}".

BUSINESS PROBLEMS:
${insights.problems?.map((p: any) => `- ${p.description} (${p.category}, urgency: ${p.urgency})`).join('\n') || 'None specified'}

BUSINESS OBJECTIVES:
- Primary: ${insights.objectives?.primary}
- Target Metric: ${insights.objectives?.targetMetric || 'Not specified'}
- Timeline: ${insights.objectives?.timeline}
- Secondary objectives: ${insights.objectives?.secondary?.join(', ') || 'None'}

TARGET AUDIENCE: ${insights.targetAudience || 'General public'}
DIFFERENTIATORS: ${insights.differentiators?.join(', ') || 'None specified'}

Generate a website that:
1. Addresses their specific problems
2. Achieves their objectives (${insights.objectives?.primary})
3. Speaks directly to their target audience
4. Highlights their differentiators
5. Uses a ${insights.messagingTone || 'casual'} tone of voice

Template Style: ${template.style}
Business Type: ${businessDetails.type}

Return JSON:
{
  "title": "...",
  "metaDescription": "...",
  "content": { /* enhanced content structure */ },
  "colors": { "primary": "#...", "secondary": "#...", "accent": "#..." },
  "fonts": { "heading": "...", "body": "..." }
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert web designer and business consultant. Create websites that solve real business problems. Return only valid JSON.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const aiContent = JSON.parse(data.choices[0].message.content);
    
    return {
      title: aiContent.title || businessDetails.name,
      metaDescription: aiContent.metaDescription,
      content: aiContent.content || enhancedContent,
      suggestedColors: aiContent.colors || {
        primary: '#0ea5e9',
        secondary: '#f0f9ff',
        accent: '#6366f1',
      },
      suggestedFonts: aiContent.fonts || {
        heading: 'Inter',
        body: 'Inter',
      },
    };
  } catch (error) {
    console.error('Error generating site with AI:', error);
    // Fallback
    return {
      title: businessDetails.name,
      metaDescription: `${businessDetails.name} - ${getBusinessTypeLabel(businessDetails.type)}`,
      content: enhancedContent,
      suggestedColors: {
        primary: '#0ea5e9',
        secondary: '#f0f9ff',
        accent: '#6366f1',
      },
      suggestedFonts: {
        heading: 'Inter',
        body: 'Inter',
      },
    };
  }
}

// Main function to generate a site based on business details
export async function generateSite(businessDetails: BusinessDetails): Promise<GeneratedSite> {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.warn('OPENAI_API_KEY not set, using template defaults');
    return generateFromTemplate(businessDetails);
  }

  try {
    // Get base template for this business type
    const template = getTemplateByType(
      businessDetails.type,
      businessDetails.style
    ) || getTemplateByType(businessDetails.type);

    if (!template) {
      throw new Error(`No template found for business type: ${businessDetails.type}`);
    }

    // Call OpenAI API to generate enhanced content
    const generatedContent = await callOpenAI(businessDetails, template);
    
    return {
      title: generatedContent.title || businessDetails.name,
      metaDescription: generatedContent.metaDescription || businessDetails.description || `${businessDetails.name} - ${getBusinessTypeLabel(businessDetails.type)}`,
      content: generatedContent.content || template.defaultContent,
      suggestedColors: generatedContent.colors || {
        primary: '#0ea5e9',
        secondary: '#f0f9ff',
        accent: '#6366f1',
      },
      suggestedFonts: generatedContent.fonts || {
        heading: 'Inter',
        body: 'Inter',
      },
    };
  } catch (error) {
    console.error('Error generating site with AI:', error);
    // Fallback to template-based generation
    return generateFromTemplate(businessDetails);
  }
}

// Fallback: Generate site from template without AI
function generateFromTemplate(businessDetails: BusinessDetails): GeneratedSite {
  const template = getTemplateByType(
    businessDetails.type,
    businessDetails.style
  ) || getTemplateByType(businessDetails.type);

  if (!template) {
    throw new Error(`No template found for business type: ${businessDetails.type}`);
  }

  // Replace template placeholders with business details
  const content = JSON.parse(JSON.stringify(template.defaultContent));
  
  // Replace placeholders in content
  const contentStr = JSON.stringify(content);
  const replaced = contentStr
    .replace(/\{\{businessName\}\}/g, businessDetails.name)
    .replace(/\{\{businessDescription\}\}/g, businessDetails.description || '')
    .replace(/\{\{businessAddress\}\}/g, businessDetails.address || '')
    .replace(/\{\{businessPhone\}\}/g, businessDetails.phone || '')
    .replace(/\{\{businessEmail\}\}/g, businessDetails.email || '');
  
  const processedContent = JSON.parse(replaced);

  return {
    title: businessDetails.name,
    metaDescription: businessDetails.description || `${businessDetails.name} - ${getBusinessTypeLabel(businessDetails.type)}`,
    content: processedContent,
    suggestedColors: {
      primary: '#0ea5e9',
      secondary: '#f0f9ff',
      accent: '#6366f1',
    },
    suggestedFonts: {
      heading: 'Inter',
      body: 'Inter',
    },
  };
}

// Call OpenAI API for enhanced content generation
async function callOpenAI(businessDetails: BusinessDetails, template: TemplateConfig): Promise<any> {
  const apiKey = process.env.OPENAI_API_KEY!;
  
  const prompt = `You are a professional web designer. Generate website content for a ${getBusinessTypeLabel(businessDetails.type)} named "${businessDetails.name}".

Business Details:
- Type: ${businessDetails.type}
- Description: ${businessDetails.description || 'Not provided'}
- Diferencial: ${businessDetails.diferencial || 'Not provided'}
- Target Audience: ${businessDetails.targetAudience || 'General public'}
- Services/Products: ${businessDetails.services?.join(', ') || 'Not specified'}
- Tone of Voice: ${businessDetails.toneOfVoice || 'casual'}
- Template Style: ${template.style}

Based on the template style "${template.style}" and business type, generate:
1. An engaging website title (max 60 chars)
2. A compelling meta description (max 160 chars)
3. Enhanced content for each section (hero, about, services/menu, gallery, contact, etc.)
4. Suggested color scheme (primary, secondary, accent) in hex
5. Suggested fonts (heading and body)

For a ${businessDetails.type === 'RESTAURANT' ? 'restaurant/catalog style site with menu items' : businessDetails.type === 'BARBERSHOP' ? 'barbershop site with booking focus' : 'business site'}, make it:
- ${businessDetails.toneOfVoice === 'luxury' ? 'Elegant and premium' : businessDetails.toneOfVoice === 'fun' ? 'Playful and energetic' : 'Professional and welcoming'}
- Focused on converting visitors to customers
- Optimized for mobile viewing
- SEO-friendly

Return JSON in this exact format:
{
  "title": "...",
  "metaDescription": "...",
  "content": { /* enhanced content structure matching template */ },
  "colors": { "primary": "#...", "secondary": "#...", "accent": "#..." },
  "fonts": { "heading": "...", "body": "..." }
}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an expert web designer and copywriter. Always respond with valid JSON only, no markdown or extra text.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  
  return JSON.parse(content);
}

// Helper to get human-readable business type
function getBusinessTypeLabel(type: BusinessType): string {
  const labels: Record<BusinessType, string> = {
    RESTAURANT: 'Restaurante',
    BAR: 'Bar/Bar e Lounge',
    PIZZERIA: 'Pizzaria',
    SUSHI: 'Sushi/Japonês',
    ROTISSERIE: 'Rotisserie/Grelhados',
    BURGER_JOINT: 'Hamburgueria',
    STEAKHOUSE: 'Churrascaria',
    SEAFOOD: 'Frutos do Mar',
    VEGAN: 'Vegano',
    ICE_CREAM: 'Sorveteria',
    BAKERY: 'Padaria',
    CONFECTIONERY: 'Confeitaria',
    CAFE: 'Café',
    BREWERY: 'Cervejaria Artesanal',
    BARBERSHOP: 'Barbearia',
    SALON: 'Salão de Beleza',
    SPA: 'Spa & Wellness',
    GYM: 'Academia',
    YOGA_STUDIO: 'Yoga Studio',
    DANCE_STUDIO: 'Dança Studio',
    RETAIL: 'Loja',
    PET_SHOP: 'Pet Shop',
    BOOKSTORE: 'Livraria',
    FLORIST: 'Floricultura',
    TOY_STORE: 'Loja de Brinquedos',
    ELECTRONICS: 'Loja de Eletrônicos',
    CLOTHING: 'Loja de Roupas',
    JEWELRY: 'Joalheria',
    ART_GALLERY: 'Galeria de Arte',
    PHARMACY: 'Farmácia',
    CLINIC: 'Clínica Médica',
    DENTIST: 'Dentista',
    OPTICS: 'Ótica',
    NUTRITIONIST: 'Nutricionista',
    CLEANING_SERVICE: 'Serviço de Limpeza',
    PLUMBING: 'Encanador',
    ELECTRICIAN: 'Eletricista',
    LANDSCAPING: 'Paisagismo',
    MOVING: 'Mudanças',
    AUTOMOTIVE: 'Oficina/Autopeças',
    CAR_WASH: 'Lavagem de Carros',
    TIRE_SHOP: 'Pneus/Tire Shop',
    DETAILING: 'Estética Automotiva',
    TRAVEL_AGENCY: 'Agência de Viagens',
    REAL_ESTATE: 'Imobiliária',
    EVENT_PLANNER: 'Eventos',
    PHOTOGRAPHER: 'Fotógrafo',
    HOTEL: 'Hotel',
    SPORTS_STORE: 'Loja de Artigos Esportivos',
    OTHER: 'Outro Comércio',
  };
  return labels[type] || type;
}

// Generate site with AI enhancements for specific use cases
export async function generateRestaurantSite(businessDetails: BusinessDetails): Promise<GeneratedSite> {
  // Enhance with restaurant-specific AI generation
  return generateSite({
    ...businessDetails,
    type: BusinessType.RESTAURANT,
    style: TemplateStyle.CATALOG,
  });
}

export async function generateBarbershopSite(businessDetails: BusinessDetails): Promise<GeneratedSite> {
  // Enhance with barbershop-specific AI generation
  return generateSite({
    ...businessDetails,
    type: BusinessType.BARBERSHOP,
    style: TemplateStyle.BOOKING,
  });
}

// More business type generators can be added here...
