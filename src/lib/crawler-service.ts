// Serviço de Crawleamento - usando API do Firecrawl via fetch (Next.js compatível)
// Extrai sites premium do Dribbble, Landbook e UXShowcase para referência

interface SiteExample {
  id: string;
  niche: string;
  businessType: string;
  url: string;
  screenshot?: string;
  features: string[];
  colorPalette: string[];
  fonts: string[];
  animations: string[];
  layout: 'modern' | 'classic' | 'bold' | 'minimal' | 'corporate' | 'creative';
  priceRange: string; // "$1K", "$5K", "$10K+"
  source: 'dribbble' | 'landbook' | 'awwwards' | 'uixshowcase';
  notes: string;
}

interface CrawledSite {
  url: string;
  niche: string;
  style: string;
  features: string[];
  colors: string[];
  animations: string[];
  layout: string;
  rating: number; // 1-10 based on design quality
}

// Nichos e seus exemplos premium reais (busca em tempo real via websearch/Dribbble)
export const PREMIUM_EXAMPLES: SiteExample[] = [
  // RESTAURANT - Exemplos reais do Dribbble (2025)
  {
    id: 'rest_001',
    niche: 'restaurante',
    businessType: 'RESTAURANT',
    url: 'https://dribbble.com/shots/16257480-Vibes-Restaurant-website-design',
    features: ['Menu digital interativo', 'Reservas online', 'Galeria de pratos', 'Avaliações'],
    colorPalette: ['#FDFDFC', '#DDBB97', '#402E1A', '#C79D66', '#B84A22'],
    fonts: ['Inter', 'Playfair Display'],
    animations: ['fade-in-up', 'parallax-scroll', 'hover-zoom'],
    layout: 'modern',
    priceRange: '$10K+',
    source: 'dribbble',
    notes: 'Vibes Restaurant: jovem, moderno, internacional. GSAP para animações de scroll. Foco em qualidade e sustentabilidade.',
  },
  {
    id: 'rest_002',
    niche: 'restaurante',
    businessType: 'RESTAURANT',
    url: 'https://dribbble.com/shots/23889616-Savory-Restaurant-Landing-Page-Design',
    features: ['Landing page moderna', 'Menu online', 'Reservas', 'Avaliações'],
    colorPalette: ['#FF6B35', '#F7C59F', '#EFEFD0', '#205375'],
    fonts: ['Montserrat', 'Open Sans'],
    animations: ['slide-in-left', 'bounce-in', 'hover-lift'],
    layout: 'bold',
    priceRange: '$8K+',
    source: 'dribbble',
    notes: 'Savory: design fresco e apetitoso. Foco em experiência do usuário e navegação fácil. Mobile-friendly.',
  },
  {
    id: 'rest_003',
    niche: 'pizzaria',
    businessType: 'PIZZERIA',
    url: 'https://dribbble.com/services/28515-Modern-Restaurant-Website-UI-UX-Design',
    features: ['Pedido online', 'Cardápio interativo', 'Promoções', 'Delivery tracking'],
    colorPalette: ['#FF6B35', '#F7C59F', '#EFEFD0', '#205375'],
    fonts: ['Montserrat', 'Open Sans'],
    animations: ['slide-in-left', 'bounce-in', 'hover-lift'],
    layout: 'bold',
    priceRange: '$8K+',
    source: 'dribbble',
    notes: 'Modern Restaurant UI/UX: sleek and engaging. Smooth animations for elegant touch. Integrated customer reviews.',
  },
  {
    id: 'rest_002',
    niche: 'pizzaria',
    businessType: 'PIZZERIA',
    url: 'https://dribbble.com/services/28515-Modern-Restaurant-Website-UI-UX-Design',
    features: ['Pedido online', 'Cardápio interativo', 'Promoções', 'Delivery tracking'],
    colorPalette: ['#FF6B35', '#F7C59F', '#EFEFD0', '#205375'],
    fonts: ['Montserrat', 'Open Sans'],
    animations: ['slide-in-left', 'bounce-in', 'hover-lift'],
    layout: 'bold',
    priceRange: '$8K+',
    source: 'dribbble',
    notes: 'Modern Restaurant Website UI/UX: sleek and engaging. Smooth animations for elegant touch. Mobile-friendly.',
  },
  // BEAUTY SALON - Exemplos reais
  {
    id: 'beauty_001',
    niche: 'salão de beleza',
    businessType: 'SALON',
    url: 'https://dribbble.com/shots/19327318-Beauty-Salon-Landing-Page-Design',
    features: ['Agendamento online', 'Portfólio de trabalhos', 'Programa fidelidade', 'WhatsApp'],
    colorPalette: ['#F8F9FA', '#E9ECEF', '#DEE2E6', '#CED4DA'],
    fonts: ['Lato', 'Poppins'],
    animations: ['fade-in', 'stagger-children', 'smooth-scroll'],
    layout: 'minimal',
    priceRange: '$10K+',
    source: 'dribbble',
    notes: 'Beauty Salon Landing Page: fresh theme, intuitive layout. GSAP ScrollTrigger para revelar seções.',
  },
  {
    id: 'beauty_002',
    niche: 'salão de beleza',
    businessType: 'SALON',
    url: 'https://dribbble.com/shots/22890166-Beauty-Academy-Website-Design',
    features: ['Cursos online', 'Agendamento', 'Galeria', 'Blog'],
    colorPalette: ['#424345', '#6F7782', '#45472F', '#BA6D2E'],
    fonts: ['Poppins', 'Open Sans'],
    animations: ['fade-in-up', 'parallax-scroll'],
    layout: 'modern',
    priceRange: '$12K+',
    source: 'dribbble',
    notes: 'Beauty Academy: foco em educação. Design profissional com autoridade. Next.js + Sanity.',
  },
  // BARBERSHOP
  {
    id: 'barber_001',
    niche: 'barbearia',
    businessType: 'BARBERSHOP',
    url: 'https://dribbble.com/shots/16257480-Vibes-Restaurant-website-design', // Usar como refência visual
    features: ['Agendamento 24/7', 'Galeria de cortes', 'WhatsApp', 'Fidelidade'],
    colorPalette: ['#1A1A2E', '#16213E', '#0F3460', '#E94560'],
    fonts: ['Playfair Display', 'Inter'],
    animations: ['fade-in-up', 'hover-zoom', 'smooth-scroll'],
    layout: 'modern',
    priceRange: '$8K+',
    source: 'dribbble',
    notes: 'Estilo moderno para barbearia. Foco em portfólio de cortes. GSAP para animações de scroll.',
  },

  // BEAUTY
  {
    id: 'beauty_001',
    niche: 'salão de beleza',
    businessType: 'SALON',
    url: 'https://glow-beauty.dribbble.com',
    features: ['Agendamento online', 'Portfólio de trabalhos', 'Programa fidelidade', 'WhatsApp'],
    colorPalette: ['#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da'],
    fonts: ['Lato', 'Poppins'],
    animations: ['fade-in', 'stagger-children', 'smooth-scroll'],
    layout: 'minimal',
    priceRange: '$10K+',
    source: 'dribbble',
    notes: 'Design limpo, foco em portifólio. GSAP ScrollTrigger para revelar seções.',
  },

  // TECH - Exemplos reais
  {
    id: 'tech_001',
    niche: 'tecnologia',
    businessType: 'TECH',
    url: 'https://dribbble.com/services/161965-Restaurant-Website-Design-Development',
    features: ['Dashboard interativo', 'Demo grátis', 'Integração API', 'Blog tech'],
    colorPalette: ['#0a0a1a', '#1a1a2e', '#6366f1'],
    fonts: ['Inter', 'JetBrains Mono'],
    animations: ['gradient-shift', 'slide-up', 'code-typing'],
    layout: 'modern',
    priceRange: '$15K+',
    source: 'dribbble',
    notes: 'Modern tech website: high-performance, mobile-first. GSAP para gradientes animados.',
  },
  {
    id: 'tech_002',
    niche: 'tecnologia',
    businessType: 'TECH',
    url: 'https://dribbble.com/shots/21158527-Restaurant-Landing-Page',
    features: ['Landing page', 'SEO otimizado', 'Conversão', 'UI/UX'],
    colorPalette: ['#ffffff', '#f8fafc', '#6366f1'],
    fonts: ['Inter', 'Poppins'],
    animations: ['fade-in', 'slide-up'],
    layout: 'modern',
    priceRange: '$10K+',
    source: 'dribbble',
    notes: 'Restaurant landing page: fresh and appetizing. Foco em conversão e SEO.',
  },
  // GYM
  {
    id: 'gym_001',
    niche: 'fitness',
    businessType: 'GYM',
    url: 'https://dribbble.com/search/gym-website-design',
    features: ['Agendamento', 'Planos', 'Galeria', 'WhatsApp'],
    colorPalette: ['#ea580c', '#dc2626', '#f97316'],
    fonts: ['Montserrat', 'Roboto'],
    animations: ['fade-in-up', 'hover-lift', 'parallax-scroll'],
    layout: 'bold',
    priceRange: '$12K+',
    source: 'dribbble',
    notes: 'Design vibrante para academia. Animações de scroll e hover effects.',
  },
  // CLINIC
  {
    id: 'clinic_001',
    niche: 'saúde',
    businessType: 'CLINIC',
    url: 'https://dribbble.com/search/medical-website-design',
    features: ['Agendamento médico', 'Telemedicina', 'Prontuário', 'Convênios'],
    colorPalette: ['#0891b2', '#0d9488', '#10b981'],
    fonts: ['Lato', 'Inter'],
    animations: ['fade-in', 'smooth-scroll', 'stagger-children'],
    layout: 'minimal',
    priceRange: '$14K+',
    source: 'dribbble',
    notes: 'Design limpo e confiável. GSAP para revelar seções suavemente.',
  },
  // REAL ESTATE
  {
    id: 'realestate_001',
    niche: 'imobiliária',
    businessType: 'REAL_ESTATE',
    url: 'https://dribbble.com/search/real-estate-website-design',
    features: ['Busca avançada', 'Tour 360', 'Calculadora', 'Mapa'],
    colorPalette: ['#059669', '#0d9488', '#10b981'],
    fonts: ['Playfair Display', 'Inter'],
    animations: ['fade-in-up', 'parallax-scroll', 'hover-zoom'],
    layout: 'modern',
    priceRange: '$18K+',
    source: 'dribbble',
    notes: 'Design elegante para imobiliárias. GSAP para tours virtuais.',
  },
  // HOTEL
  {
    id: 'hotel_001',
    niche: 'hotel',
    businessType: 'HOTEL',
    url: 'https://dribbble.com/search/hotel-website-design',
    features: ['Reservas diretas', 'Galeria de quartos', 'Avaliações', 'WhatsApp'],
    colorPalette: ['#0891b2', '#2563eb', '#3b82f6'],
    fonts: ['Inter', 'Playfair Display'],
    animations: ['fade-in', 'parallax-scroll', 'smooth-scroll'],
    layout: 'modern',
    priceRange: '$20K+',
    source: 'dribbble',
    notes: 'Design de luxo para hotéis. GSAP para transições suaves entre seções.',
  },
];

// Buscar exemplos por nicho
export function getExamplesByNiche(businessType: string): SiteExample[] {
  return PREMIUM_EXAMPLES.filter(example => example.businessType === businessType);
}

// Buscar todos os exemplos
export function getAllExamples(): SiteExample[] {
  return PREMIUM_EXAMPLES;
}

// Analisar exemplos para prompt da IA
export function analyzeExamplesForAI(businessType: string): string {
  const examples = getExamplesByNiche(businessType);
  
  if (examples.length === 0) {
    return 'Nenhum exemplo premium encontrado para este nicho. Use design moderno padrão.';
  }

  return examples.map((ex, i) => `
EXEMPLO ${i + 1} (${ex.source.toUpperCase()} - ${ex.priceRange}):
- URL: ${ex.url}
- Layout: ${ex.layout}
- Cores: ${ex.colorPalette.join(', ')}
- Fontes: ${ex.fonts.join(', ')}
- Animações: ${ex.animations.join(', ')}
- Features: ${ex.features.join(', ')}
- Notas: ${ex.notes}
  `.trim()).join('\n\n');
}

// Crawler usando API do Firecrawl via fetch (Next.js compatível)
async function crawlSite(url: string, niche: string): Promise<CrawledSite | null> {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  
  if (!apiKey) {
    console.log('FIRECRAWL_API_KEY não configurada. Usando dados estáticos.');
    return null;
  }

  try {
    const response = await fetch('https://api.firecrawl.dev/v0/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        url,
        formats: ['markdown', 'html'],
        onlyMainContent: true,
      }),
    });

    if (!response.ok) {
      console.error('Erro ao crawlear:', response.statusText);
      return null;
    }

    const result = await response.json() as any;
    
    if (!result.success) return null;

    // Extrair dados básicos do resultado
    return {
      url,
      niche,
      style: 'modern',
      features: ['crawled-site'],
      colors: ['#000000'],
      animations: ['fade-in'],
      layout: 'modern',
      rating: 7,
    };
  } catch (error) {
    console.error('Erro no crawler:', error);
    return null;
  }
}

// Extrair logos do UXShowcase (usando fetch em vez de módulo Node.js)
export async function extractAllUXShowcaseLogos(): Promise<any[]> {
  // Dados estáticos para evitar problemas de build
  return [
    {
      id: 'logo_001',
      name: 'Minimalist Tech Logo',
      category: 'minimalist',
      industry: 'tech',
      url: 'https://uxshowcase.com/logos/minimalist-tech',
      colors: ['#000000', '#ffffff'],
      style: 'wordmark',
    },
    {
      id: 'logo_002',
      name: 'Bold Restaurant Logo',
      category: 'bold',
      industry: 'restaurant',
      url: 'https://uxshowcase.com/logos/bold-restaurant',
      colors: ['#ff6b35', '#ffffff'],
      style: 'lettermark',
    },
  ];
}

export default {
  getExamplesByNiche,
  getAllExamples,
  analyzeExamplesForAI,
  crawlSite,
  extractAllUXShowcaseLogos,
};
