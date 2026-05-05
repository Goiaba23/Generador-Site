// Conversational AI system to understand business problems and objectives
// This helps generate better websites by understanding the WHY behind the business

import { BusinessType } from '@prisma/client';

export interface BusinessProblem {
  category: 'visibility' | 'sales' | 'booking' | 'competition' | 'online_presence' | 'customer_service' | 'other';
  description: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
}

export interface BusinessObjective {
  primary: 'sell_online' | 'get_bookings' | 'increase_visibility' | 'generate_leads' | 'showcase_portfolio' | 'informational';
  secondary?: string[];
  targetMetric?: string; // e.g., "20 bookings per week"
  timeline: 'immediate' | '1_month' | '3_months' | '6_months' | '1_year';
}

export interface BusinessInsight {
  problems: BusinessProblem[];
  objectives: BusinessObjective;
  targetAudience: string;
  differentiators: string[];
  competitors?: string[];
  budget?: 'low' | 'medium' | 'high' | 'enterprise';
  currentOnlinePresence?: 'none' | 'basic' | 'moderate' | 'strong';
  messagingTone?: 'formal' | 'casual' | 'fun' | 'luxury';
  recommendedStyle?: string;
}

// Questions the AI will ask based on business type
export function getDiscoveryQuestions(businessType: BusinessType): DiscoveryQuestion[] {
  const baseQuestions: DiscoveryQuestion[] = [
    {
      id: 'problem',
      question: 'Qual é o principal problema que seu comércio enfrenta hoje?',
      type: 'multiple_choice',
      options: [
        { value: 'visibility', label: 'Ninguém conhece meu negócio', icon: 'eye' },
        { value: 'sales', label: 'Vendas baixas ou inexistentes online', icon: 'chart-line' },
        { value: 'booking', label: 'Dificuldade em gerar agendamentos', icon: 'calendar' },
        { value: 'competition', label: 'Concorrência está levando meus clientes', icon: 'users' },
        { value: 'online_presence', label: 'Não tenho presença online nenhuma', icon: 'globe' },
        { value: 'customer_service', label: 'Dificuldade em atender clientes', icon: 'headset' },
        { value: 'other', label: 'Outro problema específico', icon: 'ellipsis-h' },
      ],
      allowMultiple: true,
    },
    {
      id: 'objective',
      question: 'Qual é o seu objetivo principal com este site?',
      type: 'single_choice',
      options: [
        { value: 'sell_online', label: 'Vender produtos online (e-commerce)', icon: 'shopping-cart' },
        { value: 'get_bookings', label: 'Gerar agendamentos online', icon: 'calendar-check' },
        { value: 'increase_visibility', label: 'Aumentar visibilidade e alcance', icon: 'bullhorn' },
        { value: 'generate_leads', label: 'Captar leads e contatos', icon: 'user-plus' },
        { value: 'showcase_portfolio', label: 'Exibir trabalhos/portfólio', icon: 'images' },
        { value: 'informational', label: 'Apenas informativo (institucional)', icon: 'info-circle' },
      ],
    },
    {
      id: 'target_metric',
      question: 'Qual seria um número de sucesso para você? (meta)',
      type: 'text_input',
      placeholder: 'Ex: 30 agendamentos por semana, 50 vendas por mês, etc.',
    },
    {
      id: 'timeline',
      question: 'Em quanto tempo você precisa ver resultados?',
      type: 'single_choice',
      options: [
        { value: 'immediate', label: 'Imediatamente (urgente)' },
        { value: '1_month', label: 'Em 1 mês' },
        { value: '3_months', label: 'Em 3 meses' },
        { value: '6_months', label: 'Em 6 meses' },
        { value: '1_year', label: 'Em 1 ano' },
      ],
    },
  ];

  // Add business-type specific questions
  const specificQuestions: any = {
    RESTAURANT: [
      {
        id: 'restaurant_focus',
        question: 'O que você quer destacar no seu site?',
        type: 'multiple_choice',
        options: [
          { value: 'menu', label: 'Cardápio digital completo', icon: 'utensils' },
          { value: 'delivery', label: 'Delivery e pedidos online', icon: 'truck' },
          { value: 'reservations', label: 'Reservas de mesas', icon: 'chair' },
          { value: 'ambiance', label: 'Ambiente e atmosfera', icon: 'wine-glass' },
        ],
      },
    ],
    BAR: [
      {
        id: 'bar_focus',
        question: 'O que é a atração principal do seu bar?',
        type: 'multiple_choice',
        options: [
          { value: 'drinks', label: 'Drinks artesanais', icon: 'cocktail' },
          { value: 'music', label: 'Música ao vivo', icon: 'music' },
          { value: 'sports', label: 'Esportes na TV', icon: 'tv' },
          { value: 'food', label: 'Petiscos e comida', icon: 'utensils' },
        ],
      },
    ],
    SUSHI: [
      {
        id: 'sushi_focus',
        question: 'O que destacar no seu restaurante japonês?',
        type: 'multiple_choice',
        options: [
          { value: 'freshness', label: 'Peixes frescos', icon: 'fish' },
          { value: 'variety', label: 'Variedade do menu', icon: 'utensils' },
          { value: 'experience', label: 'Experiência cultural', icon: 'flag-jp' },
        ],
      },
    ],
    ROTISSERIE: [],
    BURGER_JOINT: [
      {
        id: 'burger_focus',
        question: 'O que torna seus hamburgueres especiais?',
        type: 'multiple_choice',
        options: [
          { value: 'taste', label: 'Sabor único', icon: 'hamburger' },
          { value: 'variety', label: 'Variedade de cortes', icon: 'utensils' },
          { value: 'size', label: 'Tamanho e exclusividade', icon: 'hamburger' },
        ],
      },
    ],
    STEAKHOUSE: [],
    SEAFOOD: [],
    VEGAN: [],
    ICE_CREAM: [
      {
        id: 'ice_cream_focus',
        question: 'O que promover na sua sorveteria?',
        type: 'multiple_choice',
        options: [
          { value: 'flavors', label: 'Variedade de sabores', icon: 'ice-cream' },
          { value: 'natural', label: 'Ingredientes naturais', icon: 'leaf' },
          { value: 'delivery', label: 'Entrega em domicílio', icon: 'truck' },
        ],
      },
    ],
    BAKERY: [
      {
        id: 'bakery_focus',
        question: 'O que você quer promover?',
        type: 'multiple_choice',
        options: [
          { value: 'ecommerce', label: 'Venda de bolos e doces', icon: 'birthday-cake' },
          { value: 'custom_orders', label: 'Encomendas personalizadas', icon: 'pencil-ruler' },
          { value: 'daily_bread', label: 'Pães diários', icon: 'bread-slice' },
          { value: 'events', label: 'Bolos para eventos', icon: 'glass-cheers' },
        ],
      },
    ],
    CONFECTIONERY: [],
    CAFE: [
      {
        id: 'cafe_focus',
        question: 'O que destacar no seu café?',
        type: 'multiple_choice',
        options: [
          { value: 'coffee_quality', label: 'Qualidade do café', icon: 'coffee' },
          { value: 'ambiance', label: 'Ambiente acolhedor', icon: 'couch' },
          { value: 'pastries', label: 'Doces e salgados', icon: 'cookie' },
        ],
      },
    ],
    BREWERY: [
      {
        id: 'brewery_focus',
        question: 'O que promover na sua cervejaria?',
        type: 'multiple_choice',
        options: [
          { value: 'beer_variety', label: 'Variedade de cervejas', icon: 'beer' },
          { value: 'brewing_process', label: 'Processo de fabricação', icon: 'industry' },
          { value: 'tastings', label: 'Degustações', icon: 'wine-glass-alt' },
        ],
      },
    ],
    BARBERSHOP: [
      {
        id: 'barbershop_focus',
        question: 'O que é mais importante para sua barbearia?',
        type: 'multiple_choice',
        options: [
          { value: 'booking', label: 'Sistema de agendamento', icon: 'calendar-alt' },
          { value: 'portfolio', label: 'Portfólio de cortes', icon: 'images' },
          { value: 'team', label: 'Apresentar sua equipe', icon: 'users' },
          { value: 'products', label: 'Venda de produtos', icon: 'shopping-bag' },
        ],
      },
    ],
    SALON: [
      {
        id: 'salon_focus',
        question: 'Quais serviços destacar no salão?',
        type: 'multiple_choice',
        options: [
          { value: 'hair', label: 'Cabelo e penteados', icon: 'cut' },
          { value: 'nails', label: 'Manicure e pedicure', icon: 'hand-sparkles' },
          { value: 'beauty', label: 'Pacotes de beleza', icon: 'spa' },
        ],
      },
    ],
    SPA: [
      {
        id: 'spa_focus',
        question: 'O que promover no seu spa?',
        type: 'multiple_choice',
        options: [
          { value: 'massage', label: 'Massagens relaxantes', icon: 'hands' },
          { value: 'treatments', label: 'Tratamentos estéticos', icon: 'spa' },
          { value: 'wellness', label: 'Bem-estar completo', icon: 'heart' },
        ],
      },
    ],
    GYM: [
      {
        id: 'gym_focus',
        question: 'O que atrai novos alunos para sua academia?',
        type: 'multiple_choice',
        options: [
          { value: 'equipment', label: 'Equipamentos modernos', icon: 'dumbbell' },
          { value: 'classes', label: 'Aulas coletivas', icon: 'users' },
          { value: 'personal', label: 'Personal Trainer', icon: 'user' },
          { value: 'price', label: 'Preço competitivo', icon: 'dollar-sign' },
        ],
      },
    ],
    YOGA_STUDIO: [],
    DANCE_STUDIO: [],
    RETAIL: [
      {
        id: 'retail_focus',
        question: 'O que impulsiona suas vendas no varejo?',
        type: 'multiple_choice',
        options: [
          { value: 'variety', label: 'Variedade de produtos', icon: 'shopping-bag' },
          { value: 'price', label: 'Preços competitivos', icon: 'dollar-sign' },
          { value: 'online', label: 'Loja virtual 24/7', icon: 'laptop' },
        ],
      },
    ],
    PET_SHOP: [],
    BOOKSTORE: [],
    FLORIST: [],
    TOY_STORE: [],
    ELECTRONICS: [],
    CLOTHING: [],
    JEWELRY: [],
    ART_GALLERY: [],
    SPORTS_STORE: [],
    PHARMACY: [],
    CLINIC: [
      {
        id: 'clinic_focus',
        question: 'O que pacientes procuram na sua clínica?',
        type: 'multiple_choice',
        options: [
          { value: 'booking', label: 'Agendamento médico', icon: 'calendar-check' },
          { value: 'specialty', label: 'Especialidade médica', icon: 'stethoscope' },
          { value: 'insurance', label: 'Convênios aceitos', icon: 'hospital' },
          { value: 'location', label: 'Localização e acesso', icon: 'map-marker-alt' },
        ],
      },
    ],
    DENTIST: [],
    OPTICS: [],
    NUTRITIONIST: [],
    CLEANING_SERVICE: [],
    PLUMBING: [],
    ELECTRICIAN: [],
    LANDSCAPING: [],
    MOVING: [],
    AUTOMOTIVE: [],
    CAR_WASH: [],
    TIRE_SHOP: [],
    DETAILING: [],
    TRAVEL_AGENCY: [],
    REAL_ESTATE: [
      {
        id: 'realestate_focus',
        question: 'O que ajuda a vender imóveis mais rápido?',
        type: 'multiple_choice',
        options: [
          { value: 'photos', label: 'Fotos profissionais', icon: 'camera' },
          { value: 'location', label: 'Localização privilegiada', icon: 'map-marker-alt' },
          { value: 'price', label: 'Preço competitivo', icon: 'dollar-sign' },
          { value: 'financing', label: 'Financiamento disponível', icon: 'chart-line' },
        ],
      },
    ],
    EVENT_PLANNER: [],
    PHOTOGRAPHER: [],
    HOTEL: [],
    OTHER: [],
    TECH: [],
    LAWYER: [],
    CONSULTING: [],
    EDUCATION: [],
    FITNESS: [],
    COFFEE: [],
    NIGHTCLUB: [],
    EVENTS: [],
    DESIGN: [],
    AGENCY: [],
    FREELANCER: [],
    STARTUP: [],
    ECOMMERCE: [],
    MARKETPLACE: [],
    SAAS: [],
    APP: [],
    SOFTWARE: [],
    FINANCIAL: [],
    INSURANCE: [],
    ACCOUNTING: [],
    INVESTMENT: [],
    ARCHITECTURE: [],
    INTERIOR_DESIGN: [],
    CONSTRUCTION: [],
    TRAVEL: [],
    BEAUTY: [],
    FASHION: [],
    ART: [],
    MUSIC: [],
    NONPROFIT: [],
  };

  return [...baseQuestions, ...(specificQuestions[businessType] || [])];
}

export interface DiscoveryQuestion {
  id: string;
  question: string;
  type: 'single_choice' | 'multiple_choice' | 'text_input';
  options?: { value: string; label: string; icon?: string }[];
  allowMultiple?: boolean;
  placeholder?: string;
}

// Generate insights from answers (with AI or fallback)
export async function generateInsights(
  businessType: BusinessType,
  answers: Record<string, any>
): Promise<BusinessInsight> {
  // Try AI generation if API key exists
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    return generateBasicInsights(businessType, answers);
  }

  try {
    const prompt = `You are a business consultant specializing in ${businessType} businesses.
    
Based on these answers: ${JSON.stringify(answers)}

Generate a JSON with:
{
  "problems": [{ "category": "...", "description": "...", "urgency": "high" }],
  "objectives": { "primary": "...", "targetMetric": "...", "timeline": "..." },
  "targetAudience": "...",
  "differentiators": ["...", "..."],
  "recommendedStyle": "..."
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a business consultant. Return only valid JSON.'
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
    const aiInsights = JSON.parse(data.choices[0].message.content);
    
    return {
      problems: aiInsights.problems || [],
      objectives: aiInsights.objectives || { primary: 'increase_visibility', timeline: '3_months' },
      targetAudience: aiInsights.targetAudience || 'General public',
      differentiators: aiInsights.differentiators || [],
      recommendedStyle: aiInsights.recommendedStyle,
      messagingTone: aiInsights.messagingTone || 'casual',
    };
  } catch (error) {
    console.error('Error generating insights:', error);
    return generateBasicInsights(businessType, answers);
  }
}

// Fallback insights without AI
function generateBasicInsights(businessType: BusinessType, answers: Record<string, any>): BusinessInsight {
  const problems: BusinessProblem[] = (answers.problem || []).map((p: string) => ({
    category: p as any,
    description: `Problem related to ${p}`,
    urgency: 'high' as const,
  }));

  const objectiveMap: Record<string, BusinessObjective['primary']> = {
    'sell_online': 'sell_online',
    'get_bookings': 'get_bookings',
    'increase_visibility': 'increase_visibility',
    'generate_leads': 'generate_leads',
    'showcase_portfolio': 'showcase_portfolio',
    'informational': 'informational',
  };

  return {
    problems,
    objectives: {
      primary: objectiveMap[answers.objective] || 'increase_visibility',
      targetMetric: answers.target_metric || undefined,
      timeline: answers.timeline || '3_months',
    },
    targetAudience: answers.target_audience || 'General public',
    differentiators: answers.differential ? [answers.differential] : [],
    competitors: answers.competitors ? answers.competitors.split(',').map((c: string) => c.trim()) : [],
    recommendedStyle: answers.recommended_style,
    messagingTone: 'casual',
  };
}

// Helper to get human-readable business type
export function getBusinessTypeLabel(type: BusinessType): string {
  const labels: any = {
    'RESTAURANT': 'Restaurante',
    'BAR': 'Bar',
    'PIZZERIA': 'Pizzaria',
    'SUSHI': 'Sushi',
    'ROTISSERIE': 'Rotisserie',
    'BURGER_JOINT': 'Hamburgueria',
    'STEAKHOUSE': 'Steakhouse',
    'SEAFOOD': 'Frutos do Mar',
    'VEGAN': 'Vegano',
    'ICE_CREAM': 'Sorveteria',
    'BAKERY': 'Padaria/Confeitaria',
    'CONFECTIONERY': 'Confeitaria',
    'CAFE': 'Café',
    'BREWERY': 'Cervejaria Artesanal',
    'BARBERSHOP': 'Barbearia',
    'SALON': 'Salão de Beleza',
    'SPA': 'Spa & Wellness',
    'GYM': 'Academia',
    'YOGA_STUDIO': 'Yoga Studio',
    'DANCE_STUDIO': 'Dança Studio',
    'RETAIL': 'Loja',
    'PET_SHOP': 'Pet Shop',
    'BOOKSTORE': 'Livraria',
    'FLORIST': 'Floricultura',
    'TOY_STORE': 'Loja de Brinquedos',
    'ELECTRONICS': 'Loja de Eletrônicos',
    'CLOTHING': 'Loja de Roupas',
    'JEWELRY': 'Joalheria',
    'ART_GALLERY': 'Galeria de Arte',
    'SPORTS_STORE': 'Loja de Esportes',
    'PHARMACY': 'Farmácia',
    'CLINIC': 'Clínica Médica',
    'DENTIST': 'Dentista',
    'OPTICS': 'Ótica',
    'NUTRITIONIST': 'Nutricionista',
    'CLEANING_SERVICE': 'Serviço de Limpeza',
    'PLUMBING': 'Encanador',
    'ELECTRICIAN': 'Eletricista',
    'LANDSCAPING': 'Paisagismo',
    'MOVING': 'Mudanças',
    'AUTOMOTIVE': 'Automotivo',
    'CAR_WASH': 'Lava-rápido',
    'TIRE_SHOP': 'Borracharia',
    'DETAILING': 'Detalhamento',
    'TRAVEL_AGENCY': 'Agência de Viagens',
    'REAL_ESTATE': 'Imobiliária',
    'EVENT_PLANNER': 'Organizadora de Eventos',
    'PHOTOGRAPHER': 'Fotógrafo',
    'HOTEL': 'Hotel',
    'OTHER': 'Outro',
    'TECH': 'Tecnologia',
    'LAWYER': 'Advocacia',
    'CONSULTING': 'Consultoria',
    'EDUCATION': 'Educação',
    'FITNESS': 'Fitness',
    'COFFEE': 'Café',
    'NIGHTCLUB': 'Casa Noturna',
    'EVENTS': 'Eventos',
    'DESIGN': 'Design',
    'AGENCY': 'Agência',
    'FREELANCER': 'Freelancer',
    'STARTUP': 'Startup',
    'ECOMMERCE': 'E-commerce',
    'MARKETPLACE': 'Marketplace',
    'SAAS': 'SaaS',
    'APP': 'App',
    'SOFTWARE': 'Software',
    'FINANCIAL': 'Financeiro',
    'INSURANCE': 'Seguros',
    'ACCOUNTING': 'Contabilidade',
    'INVESTMENT': 'Investimentos',
    'ARCHITECTURE': 'Arquitetura',
    'INTERIOR_DESIGN': 'Design de Interiores',
    'CONSTRUCTION': 'Construção',
    'TRAVEL': 'Viagens',
    'BEAUTY': 'Beleza',
    'FASHION': 'Moda',
    'ART': 'Arte',
    'MUSIC': 'Música',
    'NONPROFIT': 'Sem Fins Lucrativos',
  };
  return labels[type] || type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
}

// Generate enhanced website content based on insights
export function enhanceContentWithInsights(
  baseContent: any,
  insights: BusinessInsight,
  businessName: string
): any {
  const content = JSON.parse(JSON.stringify(baseContent));

  // Add problem-solving messaging
  if (insights.problems.some(p => p.category === 'visibility')) {
    // Add "Why choose us" section if not exists
    if (!content.sections.find((s: any) => s.type === 'why_choose_us')) {
      content.sections.splice(1, 0, {
        type: 'why_choose_us',
        title: `Por que escolher a ${businessName}?`,
        content: {
          reasons: [
            { title: 'Presença Digital', description: 'Encontre-nos facilmente online' },
            { title: 'Atendimento', description: 'Cuidamos de cada cliente' },
            { title: 'Qualidade', description: 'Produtos e serviços de primeira' },
          ],
        },
      });
    }
  }

  // Adjust CTAs based on objectives
  if (insights.objectives.primary === 'get_bookings') {
    content.hero.ctaText = 'Agendar Horário';
    content.hero.ctaLink = '#booking';
  } else if (insights.objectives.primary === 'sell_online') {
    content.hero.ctaText = 'Comprar Agora';
    content.hero.ctaLink = '#products';
  } else if (insights.objectives.primary === 'generate_leads') {
    content.hero.ctaText = 'Fale Conosco';
    content.hero.ctaLink = '#contact';
  }

  // Add urgency messaging if critical
  if (insights.problems.some(p => p.urgency === 'critical')) {
    content.hero.subtitle = `${content.hero.subtitle} ¡ Atendimento imediato disponível!`;
  }

  return content;
}
