/**
 * AI GENERATOR V7.0 - PREMIUM TEMPLATE SYSTEM
 * Integração: Dribbble + Landbook + UXShowcase + GSAP + 21dev + Client Finder
 * Crawler + $10K Designs + Logo Inspiration + Animations
 */

import { BusinessType, TemplateStyle } from '@prisma/client';
import { SiteTemplate, getTemplateByType, getTemplateById, getAllTemplates } from './templates';
import { enhanceContentWithInsights, BusinessInsight } from './ai-conversational';
import { analyzeExamplesForAI, getExamplesByNiche, getAllExamples } from './crawler-service';
import { generateLogoInspiration, extractAllUXShowcaseLogos } from './uxshowcase-logos';
import { generatePremiumTemplate, buildPremiumAIPrompt } from './premium-generator';
import { getAnimationsForNiche, generateGSAPCode } from './animations';
import { getComponentsForNiche, get21DevComponent } from './21dev-components';
import { findPotentialClients } from './client-finder';
import { rufloService, RufloSwarm } from './ruflo-service';

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
  brandAssets?: {
    logoUrl?: string;
    imageUrls?: string[];
    primaryColor?: string;
  };
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
  premium?: {
    priceLevel: string;
    examplesUsed: number;
    animations: string[];
    gsapCode: string;
    components21Dev: number;
    logoInspiration: string;
    crawlerData: any;
    assetGenerationPrompt?: string;
    qualityAssuranceLog?: string;
    philosophy?: string;
  };
  rufloSwarm?: {
    id: string;
    status: string;
    agents: Array<{
      id: string;
      type: string;
      name: string;
      status: string;
      task?: string;
    }>;
    dribbbleResearch?: any;
    componentSuggestions?: string[];
    animationSuggestions?: string[];
    codeReview?: string;
  };
}

// Get niche-specific proposal with expected outcomes
export function getNicheProposalLocal(businessType: string): {
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
    'OTHER': '🎯'
  };
  return icons[businessType] || '🎯';
}

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

// Helper to build result object
function buildResult(
  content: any,
  title: string,
  metaDesc: string,
  businessDetails: BusinessDetails,
  premiumResult: any,
  nicheProposal: any,
  rufloSwarmData?: any
) {
  const t = premiumResult.template!;
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
      growthModules: nicheProposal.growthModules,
    },
    premium: {
      priceLevel: premiumResult.priceLevel,
      examplesUsed: premiumResult.premiumExamples.length,
      animations: premiumResult.animations,
      gsapCode: premiumResult.gsapCode,
      components21Dev: premiumResult.components21Dev.length,
      logoInspiration: 'UXShowcase included',
      crawlerData: premiumResult.crawlerData,
      qualityAssuranceLog: 'Not provided',
      assetGenerationPrompt: '',
      philosophy: 'Viktor Oddy + Satori Graphics + Apple Motion',
    },
    rufloSwarm: rufloSwarmData || null,
  };
}

// Generate site with COMPLETE Premium System v7.0
export async function generateSiteWithInsights(
  businessDetails: BusinessDetails,
  insights: any
): Promise<GeneratedSite> {
  const apiKey = process.env.OPENAI_API_KEY;

  // 1. Generate premium template (Dribbble + Crawler + 21dev + GSAP)
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

  // 1.1 Get niche-specific pain points and solutions
  const nicheProposal = getNicheProposalLocal(businessDetails.type);

  // 1.2 Get animations and components for this niche
  const nicheAnimations = getAnimationsForNiche(businessDetails.type);
  const nicheComponents = getComponentsForNiche(businessDetails.type);
  const gsapCode = generateGSAPCode(nicheAnimations.map(a => a.name), businessDetails.type);

  // Generate premium template
  const premiumResult = await generatePremiumTemplate(premiumRequest);

  // 1.3 Coordinate with Ruflo agents for enhanced suggestions
  let rufloSwarmData: any = null;
  try {
    if (await rufloService.checkAvailability()) {
      const rufloResult = await rufloService.coordinateAgents(
        `Generate premium ${businessDetails.type} website with Dribbble examples`,
        businessDetails.type,
        businessDetails
      );
      rufloSwarmData = {
        id: rufloService.getSwarmState()?.id || 'unknown',
        status: rufloService.getSwarmState()?.status || 'completed',
        agents: rufloService.getSwarmState()?.agents || [],
        dribbbleResearch: rufloResult.dribbbleResearch,
        componentSuggestions: rufloResult.componentSuggestions,
        animationSuggestions: rufloResult.animationSuggestions,
        codeReview: rufloResult.codeReview,
      };
    }
  } catch (rufloError) {
    console.error('Ruflo coordination failed:', rufloError);
  }

  // 2. If we have API key, use AI with EVERYTHING (premium examples + logos + animations + components)
  const openaiKey = process.env.OPENAI_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;
  let logoInspiration: string | null = null;

  if (openaiKey || geminiKey) {
    try {
      const premiumData = premiumResult;
      const prompt = buildPremiumAIPrompt(premiumRequest, premiumData);

      // Add logo inspiration from UXShowcase
      logoInspiration = generateLogoInspiration(businessDetails.type);
      const fullPrompt = prompt + `\n\n=== LOGO INSPIRATION (UXShowcase) ===\n${logoInspiration}`;
      
      // Add REAL Dribbble examples data (from websearch)
      const realExamplesData = premiumResult.premiumExamples.map((ex, i) => `
EXAMPLE ${i+1} (REAL DRIBBLE - ${ex.priceRange || '$10K+'}):
- URL: ${ex.url}
- Layout: ${ex.layout}
- Colors: ${ex.colorPalette?.join(', ') || 'N/A'}
- Fonts: ${ex.fonts?.join(', ') || 'N/A'}
- Animations: ${ex.animations?.join(', ') || 'N/A'}
- Features: ${ex.features?.join(', ') || 'N/A'}
- Notes: ${ex.notes || 'Premium design'}
`).join('\n');
      
      const fullPromptWithRealExamples = fullPrompt + `\n\n=== REAL DRIBBLE EXAMPLES (SEARCHED IN REAL-TIME) ===\n${realExamplesData}`;
      
      // Add niche-specific pain points and solution
      const fullPromptWithPainPoints = fullPromptWithRealExamples + `\n\n=== PAIN POINTS SPECIFIC TO NICHE (${businessDetails.type}) ===\n${nicheProposal.painPoint}\n\n=== SOLUTION THAT THE PREMIUM SITE WILL BRING ===\n${nicheProposal.solution}`;

      // Add animations and components info
      const fullPromptWithAnimations = fullPromptWithPainPoints + `\n\n=== GSAP ANIMATIONS FOR ${businessDetails.type} ===\n${JSON.stringify(nicheAnimations)}\n\n=== 21DEV COMPONENTS ===\n${JSON.stringify(nicheComponents)}\n\n=== GENERATED GSAP CODE ===\n${gsapCode}`;

      // Add research data if available
      const researchData = (businessDetails as any).researchData;
      const fullPromptFinal = researchData?.results?.promptAdditions 
        ? fullPromptWithAnimations + '\n\n' + researchData.results.promptAdditions
        : fullPromptWithAnimations;

      let generated = null;
      let usedAI = 'none';

      // Try OpenAI first
      if (openaiKey) {
        try {
          console.log('[AI Generator] Trying OpenAI GPT-4o-mini...');
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${openaiKey}`,
            },
            body: JSON.stringify({
              model: 'gpt-4o-mini',
              messages: [
                {
                  role: 'system',
                  content: `You are an elite $10K+ web designer specialized in ${businessDetails.type} websites.
You MUST use real-time research, Dribbble examples, and 2026 trends in your design.

=== MANDATORY DESIGN INSPIRATION ===
- Dribbble: ${premiumResult.premiumExamples.map(e => e.url).join(', ')}
- 2026 Trends: Mesh gradients, Glassmorphism 2.0, GSAP ScrollTrigger, Bento grids
- Colors: ${premiumResult.premiumExamples[0]?.colorPalette?.join(', ') || 'Modern palette'}
- Fonts: ${premiumResult.premiumExamples[0]?.fonts?.join(', ') || 'Inter, Montserrat'}

=== ELITE DESIGN DOCTRINES ===
1. MARKETING FUNNEL (AIDA: Attention → Interest → Desire → Action)
2. TYPOGRAPHY: Max 2 fonts, extreme hierarchy (clamp(2.5rem, 7vw, 5.5rem))
3. APPLE-STYLE MOTION: Smooth Bezier curves, blur effects, fade transitions
4. GSAP ANIMATIONS: ScrollTrigger, stagger, parallax (code provided)
5. 21DEV COMPONENTS: Use provided component library
6. OBJECT-FIT: EVERY image MUST have object-fit: cover to prevent layout breaks

=== QUALITY ASSURANCE ===
Before output, analyze: Is layout flawless? Are images object-fit: cover? Is marketing funnel solid?`
                },
                {
                  role: 'user',
                  content: fullPromptFinal +
                    (businessDetails.brandAssets ? `\n\n=== BRAND ASSETS ===\nLogo URL: ${businessDetails.brandAssets.logoUrl || 'None'}\nImage URLs: ${businessDetails.brandAssets.imageUrls?.join(', ') || 'None'}\nPrimary Color: ${businessDetails.brandAssets.primaryColor || 'None'}` : '')
                },
              ],
              response_format: { type: 'json_object' },
              temperature: 0.7,
            }),
          });

          if (!response.ok) throw new Error(`OpenAI API error: ${response.statusText}`);
          
          const data = await response.json();
          generated = JSON.parse(data.choices[0].message.content);
          usedAI = 'openai';
          console.log('[AI Generator] OpenAI generation successful!');
        } catch (openaiError) {
          console.error('[AI Generator] OpenAI failed:', openaiError);
        }
      }

      // Try Gemini as backup
      if (!generated && geminiKey) {
        try {
          console.log('[AI Generator] Trying Gemini API...');
          const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{ text: `You are a $10K+ web designer. Generate a JSON response for a ${businessDetails.type} website.\n\n${fullPromptFinal}` }]
              }],
              generationConfig: { responseMimeType: "application/json" }
            }),
          });

          if (!geminiResponse.ok) throw new Error(`Gemini API error: ${geminiResponse.statusText}`);
          
          const geminiData = await geminiResponse.json();
          const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
          generated = JSON.parse(text);
          usedAI = 'gemini';
          console.log('[AI Generator] Gemini generation successful!');
        } catch (geminiError) {
          console.error('[AI Generator] Gemini failed:', geminiError);
        }
      }

      if (!generated) {
        throw new Error('Both OpenAI and Gemini failed');
      }

      return {
        title: generated.title || businessDetails.name,
        slug: createSlug(businessDetails.name),
        metaDescription: generated.metaDescription || `${businessDetails.name} - Premium site`,
        content: generated.content || premiumResult.template?.content,
        designTokens: {
          colors: generated.designTokens?.colors || premiumResult.template?.designTokens?.colors,
          fonts: generated.designTokens?.fonts || premiumResult.template?.designTokens?.fonts,
          layout: generated.designTokens?.layout || 'premium',
          dribbbleInspiration: premiumResult.premiumExamples.map((e: any) => e.source).join(', '),
          landbookStyle: premiumResult.premiumExamples.map((e: any) => e.layout).join(', '),
        },
        imageSlots: premiumResult.template?.imageSlots || [],
        nicheProposal: {
          painPoint: nicheProposal.painPoint,
          solution: nicheProposal.solution,
          expectedOutcome: nicheProposal.expectedOutcome,
          growthModules: nicheProposal.growthModules,
        },
        premium: {
          priceLevel: premiumResult.priceLevel,
          examplesUsed: premiumResult.premiumExamples.length,
          animations: [...premiumResult.animations, ...nicheAnimations.map((a: any) => a.name)],
          gsapCode: gsapCode.code,
          components21Dev: premiumResult.components21Dev.length + nicheComponents.length,
          logoInspiration: logoInspiration ? 'UXShowcase included' : 'Not used',
          crawlerData: premiumResult.crawlerData,
          qualityAssuranceLog: generated.qualityAssuranceLog || 'Not provided',
          assetGenerationPrompt: generated.assetGenerationPrompt || '',
          philosophy: `Viktor Oddy + Satori Graphics + Apple Motion + GSAP + 21dev (used ${usedAI})`,
        },
        rufloSwarm: rufloSwarmData,
      };
    } catch (error) {
      console.error('AI generation failed, falling back to premium template:', error);
    }
  }

  // 3. Fallback: use generated premium template
  const baseContent = premiumResult.template?.content || generateBaseContent(premiumResult.template!, businessDetails);
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
    enhancedContent.sections.push(growthSection);
  }

  // Return template-based result
  return {
    title: businessDetails.name,
    slug: createSlug(businessDetails.name),
    metaDescription: `${businessDetails.name} - ${premiumResult.template?.description || 'Premium Site'}. ${insights?.objectives?.primary || 'Agende online!'}`,
    content: enhancedContent,
    designTokens: {
      colors: premiumResult.template?.designTokens?.colors,
      fonts: premiumResult.template?.designTokens?.fonts,
      layout: 'premium',
      dribbbleInspiration: premiumResult.premiumExamples.map((e: any) => e.source).join(', '),
      landbookStyle: premiumResult.premiumExamples.map((e: any) => e.layout).join(', '),
    },
    imageSlots: premiumResult.template?.imageSlots || [],
    nicheProposal: {
      painPoint: nicheProposal.painPoint,
      solution: nicheProposal.solution,
      expectedOutcome: nicheProposal.expectedOutcome,
      growthModules: nicheProposal.growthModules,
    },
    premium: {
      priceLevel: premiumResult.priceLevel,
      examplesUsed: premiumResult.premiumExamples.length,
      animations: [...premiumResult.animations, ...nicheAnimations.map((a: any) => a.name)],
      gsapCode: gsapCode.code,
      components21Dev: premiumResult.components21Dev.length + nicheComponents.length,
      logoInspiration: logoInspiration ? 'UXShowcase included' : 'Not used',
      crawlerData: premiumResult.crawlerData,
      qualityAssuranceLog: 'Not provided (template fallback)',
      assetGenerationPrompt: '',
      philosophy: 'Viktor Oddy + Satori Graphics + Apple Motion + GSAP + 21dev (template)',
    },
    rufloSwarm: rufloSwarmData,
  };
}
