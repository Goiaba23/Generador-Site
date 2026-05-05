/**
 * AI GENERATOR V6.0 - PREMIUM TEMPLATE SYSTEM
 * Integração: Dribbble + Landbook + UXShowcase + GSAP + 21dev
 * Crawler + $10K Designs + Logo Inspiration
 */

import { BusinessType, TemplateStyle } from '@prisma/client';
import { SiteTemplate, getTemplateByType, getTemplateById, getAllTemplates } from './templates';
import { enhanceContentWithInsights, BusinessInsight } from './ai-conversational';
import { analyzeExamplesForAI, getExamplesByNiche, getAllExamples } from './crawler-service';
import { generateLogoInspiration, extractAllUXShowcaseLogos } from './uxshowcase-logos';
import { generatePremiumTemplate, buildPremiumAIPrompt } from './premium-generator';

export interface BusinessDetails {
  name: string;
  type: BusinessType;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  logo?: string;
  style?: TemplateStyle;
  dribbbleInspiration?: string;
  landbookStyle?: string;
  diferencial?: string;
  targetAudience?: string;
  services?: string[];
  toneOfVoice?: 'formal' | 'casual' | 'fun' | 'luxury';
}

export interface GeneratedSite {
  title: string;
  slug: string;
  metaDescription: string;
  content: any;
  designTokens: {
    colors: any;
    fonts: any;
    layout: any;
    dribbbleInspiration: string;
    landbookStyle: string;
  };
  imageSlots: any[];
  nicheProposal?: {
    painPoint: string;
    solution: string;
    expectedOutcome: string;
    growthModules: string[];
  };
  // NEW: Premium metadata v6.0
  premium?: {
    priceLevel: string;
    examplesUsed: number;
    animations: string[];
    gsapCode: string;
    components21Dev: number;
    logoInspiration: string;
    crawlerData: any;
  };
}

// Generate site with COMPLETE Premium System v6.0
export async function generateSiteWithInsights(
  businessDetails: BusinessDetails,
  insights: any
): Promise<GeneratedSite> {
  const apiKey = process.env.OPENAI_API_KEY;
  
  // 1. Gerar template premium (Dribbble + Crawler + 21dev + GSAP)
  const premiumRequest = {
    businessType: businessDetails.type,
    businessName: businessDetails.name,
    style: businessDetails.style,
    objective: insights?.objectives?.primary,
    diferencial: businessDetails.diferencial,
    useCrawler: true,
    use21Dev: true,
    useGSAP: true,
  };

  // 1.1 Buscar dores e soluções específicas do nicho
  const nicheProposal = getNicheProposalLocal(businessDetails.type);
  
  const premiumResult = await generatePremiumTemplate(premiumRequest);
  
  // 2. Se temos API key, usar AI com TUDO (premium examples + logos + animations)
  if (apiKey) {
    try {
      const premiumData = premiumResult;
      const prompt = buildPremiumAIPrompt(premiumRequest, premiumData);
      
      // Adicionar logo inspiration do UXShowcase
      const logoInspiration = generateLogoInspiration(businessDetails.type);
      const fullPrompt = prompt + `\n\n=== LOGO INSPIRATION (UXShowcase) ===\n${logoInspiration}`;
      
      // Adicionar dores específicas e solução do nicho
      const fullPromptWithPainPoints = fullPrompt + `\n\n=== DORES ESPECIFICAS DO NICHO (${businessDetails.type}) ===\n${nicheProposal.painPoint}\n\n=== SOLUÇÃO QUE O SITE PREMIUM TRARÁ ===\n${nicheProposal.solution}`;
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: `You are a $10K+ web designer specializing in ${businessDetails.type} websites. You UNDERSTAND the specific pain points and create solutions that address them directly. Use ALL examples, animations, and logos provided. Return only valid JSON.` },
            { role: 'user', content: fullPromptWithPainPoints },
          ],
          response_format: { type: 'json_object' },
          temperature: 0.7,
        }),
      });
      
      if (!response.ok) throw new Error(`OpenAI API error: ${response.statusText}`);
      
      const data = await response.json();
      const generated = JSON.parse(data.choices[0].message.content);
      
      return {
        title: generated.title || businessDetails.name,
        slug: createSlug(businessDetails.name),
        metaDescription: generated.metaDescription || `${businessDetails.name} - Premium site`,
        content: generated.content || premiumResult.template.content,
        designTokens: {
          colors: generated.designTokens?.colors || premiumResult.template.designTokens.colors,
          fonts: generated.designTokens?.fonts || premiumResult.template.designTokens.fonts,
          layout: generated.designTokens?.layout || 'premium',
          dribbbleInspiration: premiumResult.premiumExamples.map(e => e.source).join(', '),
          landbookStyle: premiumResult.premiumExamples.map(e => e.layout).join(', '),
        },
        imageSlots: premiumResult.template.imageSlots || [],
        nicheProposal: {
          painPoint: nicheProposal.painPoint,
          solution: nicheProposal.solution,
          expectedOutcome: nicheProposal.expectedOutcome,
          growthModules: nicheProposal.growthModules,
        },
        // NEW: Premium metadata
        premium: {
          priceLevel: premiumResult.priceLevel,
          examplesUsed: premiumResult.premiumExamples.length,
          animations: premiumResult.animations,
          gsapCode: premiumResult.gsapCode,
          components21Dev: premiumResult.components21Dev.length,
          logoInspiration: logoInspiration ? 'UXShowcase included' : 'Not used',
          crawlerData: premiumResult.crawlerData,
        },
      };
    } catch (error) {
      console.error('OpenAI generation failed, falling back to premium template:', error);
    }
  }
  
  // 3. Fallback: usar premium template gerado
  const template = premiumResult.template;
  const baseContent = template.content || generateBaseContent(template, businessDetails);
  const enhancedContent = enhanceContentWithInsights(baseContent, insights, businessDetails.name);

  // Add problem-solution-result section
  const problemSolutionSection = {
    type: 'problem_solution_result',
    title: 'A solução que você procurava',
    content: {
      painPoint: nicheProposal.painPoint,
      solution: nicheProposal.solution,
      expectedOutcome: nicheProposal.expectedOutcome,
      icon: getPainPointIcon(businessDetails.type)
    },
    order: 1
  };

  if (!enhancedContent.sections.find((s: any) => s.type === 'problem_solution_result')) {
    enhancedContent.sections.splice(1, 0, problemSolutionSection);
  }

  // Add growth modules section
  const growthSection = {
    type: 'growth_modules',
    title: 'O que você ganha além do site',
    content: {
      modules: nicheProposal.growthModules,
      description: 'Ferramentas de crescimento inclusas para fazer seu negócio decolar'
    },
    order: enhancedContent.sections.length - 1
  };

  if (!enhancedContent.sections.find((s: any) => s.type === 'growth_modules')) {
    enhancedContent.sections.splice(enhancedContent.sections.length - 1, 0, growthSection);
  }

  // Build result helper
  function buildResult(content: any, title: string, metaDesc: string) {
    const t = template!; // Assert: template is defined after error check above
    return {
      title: title || businessDetails.name,
      slug: createSlug(businessDetails.name),
      metaDescription: metaDesc,
      content,
      designTokens: {
        colors: t.dribbbleInspiration || t.colors,
        fonts: t.landbookStyle || t.fonts,
        layout: 'premium',
        dribbbleInspiration: t.dribbbleInspiration,
        landbookStyle: t.landbookStyle,
      },
      imageSlots: t.imageSlots || [],
      nicheProposal: {
        painPoint: nicheProposal.painPoint,
        solution: nicheProposal.solution,
        expectedOutcome: nicheProposal.expectedOutcome,
        growthModules: nicheProposal.growthModules
      }
    };
  }

  // No API key - return template based
  if (!apiKey) {
    return buildResult(
      enhancedContent,
      businessDetails.name,
      `Site profissional para ${businessDetails.name} - ${nicheProposal.solution}`
    );
  }

  // Try AI enhancement with premium examples
  try {
    // Get premium examples for this niche
    const nicheExamples = analyzeExamplesForAI(businessDetails.type);
    const examples = getExamplesByNiche(businessDetails.type);
    
    const prompt = `You are a PREMIUM web designer ($10K+ level) specialized in ${businessDetails.type}.
    
${nicheExamples}

BUSINESS DETAILS:
- Name: ${businessDetails.name}
- Type: ${businessDetails.type}
- Description: ${businessDetails.description || 'Premium business'}
- Objective: ${businessDetails.diferencial || 'growth'}
- Target Audience: ${businessDetails.targetAudience || 'local customers'}

Create a JSON with:
1. title: SEO-optimized title
2. metaDescription: 155 chars max
3. content: Object with hero, sections (with GSAP animations like "fade-in-up", "parallax-scroll"), footer
4. designTokens: colors (use the premium palette above), fonts, layout
5. animations: Array of GSAP animations to use (from examples above)
6. growthModules: Array of growth modules for this niche

Return ONLY valid JSON.`;
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: `You are a premium web designer ($10K+ level) specialized in ${businessDetails.type}. Use the premium examples provided. Return only valid JSON.` },
          { role: 'user', content: prompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      }),
    });

    if (!response.ok) throw new Error(`OpenAI API error: ${response.statusText}`);
    
    const data = await response.json();
    const generated = JSON.parse(data.choices[0].message.content);
    
    // Add premium examples reference to content
    if (generated.content) {
      generated.content.premiumExamples = examples.map(e => ({
        source: e.source,
        url: e.url,
        layout: e.layout,
        animations: e.animations
      }));
      generated.content.animationLibrary = 'GSAP';
      generated.content.use21devComponents = true;
    }

    return buildResult(
      generated.content || enhancedContent,
      generated.title || businessDetails.name,
      generated.metaDescription || `${businessDetails.name} - ${template.description}`
    );
  } catch (error) {
    console.error('OpenAI generation failed, falling back to template:', error);
    return buildResult(
      enhancedContent,
      businessDetails.name,
      `${businessDetails.name} - ${template.description}. ${insights.objectives?.primary || 'Agende online!'}`
    );
  }
}

// Get niche-specific proposal with expected outcomes
function getNicheProposalLocal(businessType: string): { 
  painPoint: string; 
  solution: string; 
  expectedOutcome: string;
  features: string[];
  growthModules: string[];
} {
  const proposals: Record<string, { 
    painPoint: string; 
    solution: string; 
    expectedOutcome: string;
    features: string[];
    growthModules: string[];
  }> = {
    'BARBERSHOP': {
      painPoint: 'Dificuldade em gerenciar horários e filas de espera',
      solution: 'Sistema de agendamento online 24/7 com confirmação automática',
      expectedOutcome: '+60 agendamentos/mês, -40% faltas, +R$ 8.000 faturamento',
      features: ['Agendamento Online', 'WhatsApp Integration', 'Gestão de Horários', 'Histórico de Clientes'],
      growthModules: ['Loyalty Program (10 cortes = 1 grátis)', 'Last-minute slot alerts', 'Barber Team Profiles', 'Review Automation']
    },
    'SALON': {
      painPoint: 'Clientes esquecem os horários e falta de controle',
      solution: 'App de agendamento com lembretes automáticos e fidelidade',
      expectedOutcome: '+45 agendamentos/mês, +R$ 5.500 faturamento, 90% retenção',
      features: ['Booking Inteligente', 'Programa de Fidelidade', 'Galeria de Transformações', 'Avaliações'],
      growthModules: ['Membership Plans', 'Before/After Gallery', 'Referral Rewards', 'Bridal Packages']
    },
    'RESTAURANT': {
      painPoint: 'Cardápio desatualizado e pedidos pelo telefone',
      solution: 'Cardápio digital interativo com pedidos via WhatsApp e QR Code',
      expectedOutcome: '+R$ 12.000 faturamento, +35% ticket médio, -80% ligações',
      features: ['Cardápio Online', 'Delivery Integration', 'Reservas Online', 'Galeria de Pratos'],
      growthModules: ['QR Table Ordering', 'Google Maps Optimization', 'Review Management', 'Delivery Integration']
    },
    'CLINIC': {
      painPoint: 'Agendamento manual e filas telefônicas',
      solution: 'Sistema de agendamento médico com prontuário digital e telemedicina',
      expectedOutcome: '+80 consultas/mês, +R$ 15.000 faturamento, -90% ligações',
      features: ['Booking Médico', 'Área do Paciente', 'Telemedicina', 'Planos de Saúde'],
      growthModules: ['Patient Portal', 'Automatic Reminders', 'Health Blog SEO', 'Health Insurance Integration']
    },
    'GYM': {
      painPoint: 'Dificuldade em atrair novos alunos e controle de planos',
      solution: 'Site com planos personalizados, avaliação física grátis e app do aluno',
      expectedOutcome: '+50 novos alunos/mês, +R$ 10.000 MRR, 85% retenção',
      features: ['Planos de Treino', 'Avaliação Grátis', 'Loja de Suplementos', 'App do Aluno'],
      growthModules: ['Free Trial Automation', 'Nutrition Plans', 'Progress Tracking', 'Referral Program']
    },
    'RETAIL': {
      painPoint: 'Vendas limitadas ao horário comercial',
      solution: 'Loja virtual 24/7 com checkout otimizado e carrinho abandonado',
      expectedOutcome: '+300% conversão, vendas 24/7, +R$ 20.000 faturamento',
      features: ['E-commerce', 'Pagamento Pix', 'Carrinho Abandonado', 'Cupons de Desconto'],
      growthModules: ['Abandoned Cart Recovery', 'WhatsApp Order Notifications', 'Customer Segmentation', 'Upsell Recommendations']
    },
    'REAL_ESTATE': {
      painPoint: 'Imóveis não encontrados por compradores',
      solution: 'Busca avançada com tour virtual, calculadora e mapa interativo',
      expectedOutcome: '+200% leads qualificados, 15 vendas/mês, -70% tempo de busca',
      features: ['Busca Avançada', 'Tour 360°', 'Calculadora de Financiamento', 'Mapa Interativo'],
      growthModules: ['Lead Scoring', 'Virtual Staging', 'WhatsApp Lead Alerts', 'Market Reports Automation']
    },
    'TECH': {
      painPoint: 'Dificuldade em demonstrar valor do software/serviço',
      solution: 'Landing page de alta conversão com demonstração interativa',
      expectedOutcome: '+150% signups, +R$ 25.000 MRR, 12% conversão',
      features: ['Demo Interativa', 'Preços Transparentes', 'Cases de Sucesso', 'Integração API'],
      growthModules: ['Free Trial Automation', 'Customer Success Tracking', 'Integration Marketplace', 'API Documentation Portal']
    },
    'PET_SHOP': {
      painPoint: 'Clientes esquecem vacinas e produtos acabam',
      solution: 'Sistema de lembretes automáticos e loja online de produtos pet',
      expectedOutcome: '+40 agendamentos/mês, +R$ 6.000 faturamento, 95% retenção',
      features: ['Agendamento Banho/Tosa', 'Loja Online', 'Lembretes de Vacinas', 'Fidelidade Pet'],
      growthModules: ['Vaccination Calendar', 'Pet Birthday Reminders', 'Photo Gallery', 'Home Delivery']
    },
    'HOTEL': {
      painPoint: 'Reservas manuais e dependência de OTAs (Booking/Expedia)',
      solution: 'Sistema de reservas diretas com melhor preço garantido',
      expectedOutcome: '+120 reservas/mês diretas, -25% comissões OTA, +R$ 30.000 faturamento',
      features: ['Reservas Online', 'Gallery Quartos', 'Avaliações', 'WhatsApp Booking'],
      growthModules: ['Direct Booking Incentives', 'Guest CRM', 'Upsell Experiences', 'Review Automation']
    },
    'OTHER': {
      painPoint: 'Presença digital limitada e poucos clientes online',
      solution: 'Site profissional otimizado para conversão com WhatsApp direto',
      expectedOutcome: '+200% visitas, +80 leads/mês, +R$ 5.000 faturamento',
      features: ['Design Profissional', 'SEO Otimizado', 'WhatsApp Direct', 'Mobile Responsivo'],
      growthModules: ['Google Business Optimization', 'Lead Capture Forms', 'Email Marketing', 'Analytics Dashboard']
    }
  };  
  return proposals[businessType] || proposals['OTHER'];
}

// Helper to get icon for pain point
function getPainPointIcon(businessType: string): string {
  const icons: Record<string, string> = {
    'BARBERSHOP': '✂️',
    'SALON': '💇‍♀️',
    'RESTAURANT': '🍽️',
    'CLINIC': '🏥',
    'GYM': '💪',
    'RETAIL': '🛒',
    'REAL_ESTATE': '🏠',
    'TECH': '💻',
    'PET_SHOP': '🐕',
    'HOTEL': '🏨',
    'OTHER': '🚀'
  };
  return icons[businessType] || '🚀';
}

// Generate base content from template
function generateBaseContent(template: SiteTemplate, details: BusinessDetails): any {
  const slots = template.imageSlots.reduce((acc, slot) => {
    acc[slot.id] = slot.defaultUrl;
    return acc;
  }, {} as Record<string, string>);

  return {
    hero: {
      title: `${details.name} - ${getBusinessTypeLabel(details.type)} Premium`,
      subtitle: template.description,
      backgroundImage: slots['hero-bg'] || '',
      ctaText: 'Criar Site Agora',
      ctaLink: '/create',
    },
    sections: template.layout.sections.map(section => ({
      type: section,
      title: getSectionTitle(section, details.type),
      content: getSectionContent(section, template, details),
    })),
    footer: {
      copyright: `© ${new Date().getFullYear()} ${details.name}. Todos os direitos reservados.`,
      links: [
        { label: 'Política de Privacidade', href: '/privacy' },
        { label: 'Termos de Uso', href: '/terms' },
      ],
    },
    imageSlots: slots,
    designTokens: {
      colors: template.colors,
      fonts: template.fonts,
      layout: template.layout,
      dribbbleInspiration: template.dribbbleInspiration,
      landbookStyle: template.landbookStyle,
    },
  };
}

// Helper functions
export function getBusinessTypeLabel(type: BusinessType): string {
  const labels: Record<string, string> = {
    'RESTAURANT': 'Restaurante',
    'CLINIC': 'Clínica',
    'STORE': 'Loja',
    'SALON': 'Salão',
    'GYM': 'Academia',
    'HOTEL': 'Hotel',
    'LAWYER': 'Advocacia',
    'REAL_ESTATE': 'Imobiliária',
    'TECH': 'Tecnologia',
    'CONSULTING': 'Consultoria',
    'EDUCATION': 'Educação',
    'FITNESS': 'Fitness',
    'SPA': 'SPA',
    'PET_SHOP': 'Pet Shop',
    'BAKERY': 'Padaria',
    'BARBERSHOP': 'Barbearia',
    'CAFE': 'Café',
    'NIGHTCLUB': 'Casa Noturna',
  };
  return labels[type] || type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
}

function getSectionTitle(section: string, type: BusinessType): string {
  const titles: Record<string, string> = {
    'about': `Sobre a ${getBusinessTypeLabel(type)}`,
    'services': 'Nossos Serviços',
    'gallery': 'Galeria',
    'testimonials': 'Depoimentos',
    'contact': 'Contato',
    'booking': 'Agende Agora',
    'menu': 'Cardápio',
    'products': 'Produtos',
  };
  return titles[section] || section.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function getSectionContent(section: string, template: SiteTemplate, details: BusinessDetails): any {
  return {
    title: getSectionTitle(section, details.type),
    description: `Conheça mais sobre ${details.name}`,
  };
}

function createSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
