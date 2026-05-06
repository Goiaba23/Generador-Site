// Client Finder v1.0
// Find potential clients via SEO analysis and web crawling (using fetch for Next.js compatibility)

export interface PotentialClient {
  name: string;
  website: string;
  niche: string;
  location: string;
  issues: string[];
  opportunities: string[];
  priority: 'high' | 'medium' | 'low';
  contactEmail?: string;
  contactPhone?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
  };
}

export interface WebsiteAnalysis {
  url: string;
  hasWebsite: boolean;
  issues: string[];
  opportunities: string[];
  score: number; // 0-100
  recommendations: string[];
}

// Find potential clients by niche and location (using fetch API)
export async function findPotentialClients(
  niche: string,
  location: string,
  limit: number = 10
): Promise<PotentialClient[]> {
  // This is a stub implementation
  // In production, this would use Google Places API, Yelp API, or web scraping
  
  const mockClients: PotentialClient[] = [
    {
      name: 'Restaurante Sabor & Arte',
      website: 'https://saborarte.com.br',
      niche: 'RESTAURANT',
      location: location || 'São Paulo, SP',
      issues: [
        'Site não é mobile-friendly',
        'Sem sistema de reservas online',
        'Falta integração com WhatsApp',
      ],
      opportunities: [
        'Cardápio digital interativo',
        'Sistema de reservas 24/7',
        'Pedidos online com delivery',
      ],
      priority: 'high',
      contactEmail: 'contato@saborarte.com.br',
      contactPhone: '(11) 99999-9999',
      socialMedia: {
        instagram: '@saborarte',
        whatsapp: '5511999999999',
      },
    },
    {
      name: 'Salão Beleza Pura',
      website: 'https://belezapura.com.br',
      niche: 'SALON',
      location: location || 'São Paulo, SP',
      issues: [
        'Agendamento apenas por telefone',
        'Sem galeria de trabalhos online',
        'Não aceita pagamentos online',
      ],
      opportunities: [
        'Agendamento online 24/7',
        'Portfólio digital de trabalhos',
        'Pagamento via PIX no site',
      ],
      priority: 'high',
      contactEmail: 'contato@belezapura.com.br',
      contactPhone: '(11) 98888-8888',
    },
    {
      name: 'Academia FitPower',
      website: 'https://fitpower.com.br',
      niche: 'GYM',
      location: location || 'São Paulo, SP',
      issues: [
        'Site institucional básico',
        'Sem área do aluno',
        'Não tem planos online',
      ],
      opportunities: [
        'Área do aluno com fichas de treino',
        'Venda de planos online',
        'Integração com app de treinos',
      ],
      priority: 'medium',
      contactEmail: 'contato@fitpower.com.br',
    },
  ];

  return mockClients.slice(0, limit);
}

// Analyze a website for improvement opportunities (using fetch API)
export async function analyzeWebsite(url: string): Promise<WebsiteAnalysis> {
  // This is a stub implementation
  // In production, this would use fetch to get HTML and analyze it
  
  try {
    const hasWebsite = url && url.startsWith('http');
    
    if (!hasWebsite) {
      return {
        url,
        hasWebsite: false,
        issues: ['Não possui site profissional'],
        opportunities: [
          'Criar site premium com design atrativo',
          'Capturar leads via formulário',
          'Integração com WhatsApp Business',
        ],
        score: 0,
        recommendations: [
          'Criar site profissional em até 24h',
          'Design responsivo para mobile',
          'SEO otimizado para buscadores locais',
        ],
      };
    }

    // Try to fetch the website to check if it's online
    let isOnline = false;
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const response = await fetch(url, { 
        method: 'HEAD',
        signal: controller.signal 
      });
      clearTimeout(timeout);
      isOnline = response.ok;
    } catch {
      isOnline = false;
    }

    return {
      url,
      hasWebsite: true,
      issues: [
        'Site não é responsivo (mobile)',
        'Falta botão do WhatsApp flutuante',
        'Formulário de contato não funciona',
        'Sem certificado SSL (HTTPS)',
      ],
      opportunities: [
        'Redesign com design moderno (estilo Dribbble)',
        'Adicionar WhatsApp Business API',
        'Implementar blog para SEO',
        'Criar área do cliente logada',
      ],
      score: isOnline ? 45 : 0,
      recommendations: [
        'Migrar para arquitetura Next.js moderna',
        'Implementar GSAP para animações fluidas',
        'Adicionar schema.org para SEO local',
        'Integração com Google Analytics 4',
      ],
    };
  } catch (error) {
    console.error('Error analyzing website:', error);
    return {
      url,
      hasWebsite: false,
      issues: ['Erro ao analisar site'],
      opportunities: [],
      score: 0,
      recommendations: [],
    };
  }
}

// Generate cold email for client outreach
export function generateOutreachEmail(client: PotentialClient): string {
  const name = client.name;
  const niche = client.niche.toLowerCase();
  const website = client.website;
  
  let issuesText = '';
  client.issues.forEach((issue, i) => {
    issuesText += `${i + 1}. ${issue}\n`;
  });
  
  let oppText = '';
  client.opportunities.forEach((opp, i) => {
    oppText += `${i + 1}. ${opp}\n`;
  });

  return `Olá, ${name}!

Somos da SitesSaaS - especialistas em criação de sites premium para ${niche}.

Analisamos seu site (${website}) e identificamos oportunidades de melhoria:

PRINCIPAIS PROBLEMAS:
${issuesText}
SOLUÇÕES QUE OFERECEMOS:
${oppText}
NOSSO DIFERENCIAL:
- Sites estilo Dribbble ($10K+ design)
- Pronto em 24 horas
- Integração completa com WhatsApp
- Suporte humanizado!

Gostaria de agendar uma demonstração gratuita de 15 minutos?

Atenciosamente,
Equipe SitesSaaS
WhatsApp: (11) 99999-9999`.trim();
}

// Map business type to niche keywords for search
export function mapBusinessTypeToKeywords(businessType: string): string[] {
  const keywordMap: Record<string, string[]> = {
    'RESTAURANT': ['restaurante', 'comida', 'culinária', 'gastronomia'],
    'BARBERSHOP': ['barbearia', 'cabelo', 'barba', 'beleza masculina'],
    'SALON': ['salão de beleza', 'cabelo', 'estética', 'beleza'],
    'GYM': ['academia', 'musculação', 'fitness', 'treino'],
    'RETAIL': ['loja', 'varejo', 'comércio', 'produtos'],
    'TECH': ['tecnologia', 'software', 'SaaS', 'sistemas'],
    'REAL_ESTATE': ['imobiliária', 'imóveis', 'casas', 'apartamentos'],
    'CLINIC': ['clínica', 'médico', 'saúde', 'consulta'],
  };

  return keywordMap[businessType] || [businessType.toLowerCase()];
}

export default {
  findPotentialClients,
  analyzeWebsite,
  generateOutreachEmail,
  mapBusinessTypeToKeywords,
};
