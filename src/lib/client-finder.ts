interface SEOMetrics {
  score: number;
  issues: string[];
  opportunities: string[];
}

interface SiteAnalysis {
  url: string;
  businessType: string;
  currentDesign: 'outdated' | 'basic' | 'modern' | 'premium';
  painPoints: string[];
  seoMetrics: SEOMetrics;
  competitors: Array<{
    name: string;
    url: string;
    strengths: string[];
  }>;
  improvements: Array<{
    feature: string;
    impact: 'high' | 'medium' | 'low';
    effort: 'low' | 'medium' | 'high';
    description: string;
  }>;
  growthPotential: {
    score: number;
    modules: string[];
  };
}

interface ClientMatch {
  url: string;
  businessName: string;
  businessType: string;
  location?: string;
  painPoints: string[];
  opportunity: string;
  estimatedValue: number;
  priority: 'high' | 'medium' | 'low';
  analysis: SiteAnalysis;
}

export async function analyzeWebsite(url: string): Promise<SiteAnalysis> {
  const businessType = detectBusinessType(url);
  
  return {
    url,
    businessType,
    currentDesign: 'basic',
    painPoints: getPainPoints(businessType),
    seoMetrics: {
      score: 45,
      issues: ['Site não é mobile-friendly', 'Meta tags ausentes', 'Velocidade lenta'],
      opportunities: ['Otimizar imagens', 'Adicionar schema markup', 'Melhorar Core Web Vitals']
    },
    competitors: [
      { name: 'Concorrente Premium', url: '#', strengths: ['Design moderno', 'Mobile-first'] }
    ],
    improvements: [
      { feature: 'Booking Online', impact: 'high', effort: 'medium', description: 'Sistema de agendamento 24/7' },
      { feature: 'WhatsApp Integration', impact: 'high', effort: 'low', description: 'Botão flutuante com horários' },
      { feature: 'Google Reviews', impact: 'medium', effort: 'low', description: 'Widget de avaliações' }
    ],
    growthPotential: {
      score: 75,
      modules: ['Loyalty Program', 'Review Automation', 'Email Marketing']
    }
  };
}

export async function findPotentialClients(
  niche: string,
  location: string = 'Brasil'
): Promise<ClientMatch[]> {
  return [
    {
      url: 'https://exemplo-barbearia.com',
      businessName: 'Barbearia Moderna',
      businessType: 'BARBERSHOP',
      location: location,
      painPoints: ['Agendamento manual', 'Não aparece no Google', 'Sem fidelização'],
      opportunity: 'Site premium com booking online pode aumentar agendamentos em 40%',
      estimatedValue: 3500,
      priority: 'high',
      analysis: await analyzeWebsite('https://exemplo-barbearia.com')
    }
  ];
}

function detectBusinessType(url: string): string {
  const urlLower = url.toLowerCase();
  if (urlLower.includes('barber') || urlLower.includes('barbearia')) return 'BARBERSHOP';
  if (urlLower.includes('salon') || urlLower.includes('salao')) return 'SALON';
  if (urlLower.includes('restaurant') || urlLower.includes('restaurante')) return 'RESTAURANT';
  if (urlLower.includes('clinic') || urlLower.includes('clinica')) return 'CLINIC';
  if (urlLower.includes('gym') || urlLower.includes('academia')) return 'GYM';
  if (urlLower.includes('store') || urlLower.includes('loja')) return 'RETAIL';
  if (urlLower.includes('realestate') || urlLower.includes('imobiliaria')) return 'REAL_ESTATE';
  if (urlLower.includes('tech') || urlLower.includes('software')) return 'TECH';
  if (urlLower.includes('pet') || urlLower.includes('veterinario')) return 'PET_SHOP';
  if (urlLower.includes('hotel') || urlLower.includes('pousada')) return 'HOTEL';
  return 'OTHER';
}

function getPainPoints(businessType: string): string[] {
  const painPoints: Record<string, string[]> = {
    BARBERSHOP: ['Perda de clientes por falta de agendamento online', 'Horários ociosos sem controle'],
    SALON: ['Clientes esquecem agendamentos', 'Dificuldade em mostrar portfólio'],
    RESTAURANT: ['Cardápio desatualizado online', 'Reservas manuais geram erros'],
    CLINIC: ['Pacientes ligam para agendar', 'Fila de espera sem controle'],
    GYM: ['Cancelamentos por falta de engajamento', 'Dificuldade em vender planos'],
    RETAIL: ['Loja fechada sem vendas online', 'Sem retargeting de clientes'],
    REAL_ESTATE: ['Imóveis não aparecem no Google', 'Leads se perdem no WhatsApp'],
    TECH: ['Site não converte visitantes', 'Demonstração difícil de solicitar'],
    PET_SHOP: ['Clientes não sabem serviços disponíveis', 'Esquecem vacinas e banhos'],
    HOTEL: ['Reservas pelo telefone apenas', 'Site não inspira confiança'],
    OTHER: ['Site ultrapassado afasta clientes', 'Não aparece nas buscas locais']
  };
  return painPoints[businessType] || painPoints['OTHER'];
}
