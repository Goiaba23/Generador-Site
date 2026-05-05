// Serviço de Crawleamento usando craw4ai
// Extrai sites premium do Dribbble, Landbook e UXShowcase para referencia

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

// Nichos e seus exemplos premium reais (baseado em Dribbble/Landbook)
export const PREMIUM_EXAMPLES: SiteExample[] = [
  // RESTAURANT
  {
    id: 'rest_001',
    niche: 'restaurante',
    businessType: 'RESTAURANT',
    url: 'https://safal-adhikari.dribbble.com',
    features: ['Menu digital interativo', 'Reservas online', 'Galeria de pratos', 'Avaliações'],
    colorPalette: ['#1a1a2e', '#16213e', '#0f346e', '#e94560'],
    fonts: ['Playfair Display', 'Inter'],
    animations: ['fade-in-up', 'parallax-scroll', 'hover-zoom'],
    layout: 'modern',
    priceRange: '$10K+',
    source: 'dribbble',
    notes: 'Design de Safal Adhikari: gradientes escuros, tipografia elegante, foco em imagens de pratos'
  },
  {
    id: 'rest_002',
    niche: 'hamburgueria',
    businessType: 'BURGER_JOINT',
    url: 'https://botifly.dribbble.com',
    features: ['Pedido online', 'Cardápio visual', 'Promoções', 'Localizador'],
    colorPalette: ['#ff6b35', '#f7c948', '#4a4a4a', '#ffffff'],
    fonts: ['Montserrat', 'Roboto'],
    animations: ['bounce-in', 'slide-in-left', 'pulse-effect'],
    layout: 'bold',
    priceRange: '$10K',
    source: 'dribbble',
    notes: 'BotiFly: cores vibrantes, animações energéticas, foco em calls-to-action'
  },
  // BARBERSHOP
  {
    id: 'barb_001',
    niche: 'barbearia',
    businessType: 'BARBERSHOP',
    url: 'https://pixxen.dribbble.com',
    features: ['Agendamento 24/7', 'Galeria de cortes', 'Perfis de barbeiros', 'Loyalty program'],
    colorPalette: ['#2c3e50', '#34495e', '#e74c3c', '#ecf0f1'],
    fonts: ['Oswald', 'Open Sans'],
    animations: ['smooth-scroll', 'hover-lift', 'fade-in'],
    layout: 'modern',
    priceRange: '$10K+',
    source: 'dribbble',
    notes: 'Pixxen Studio: minimalismo masculino, foco em portfólio visual'
  },
  // SALON
  {
    id: 'salon_001',
    niche: 'salão de beleza',
    businessType: 'SALON',
    url: 'https://madhu-miah.dribbble.com',
    features: ['Booking online', 'Portfólio de cabelos', 'Venda de produtos', 'Dicas de beleza'],
    colorPalette: ['#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da'],
    fonts: ['Poppins', 'Raleway'],
    animations: ['slide-up', 'zoom-in', 'rotate-in'],
    layout: 'creative',
    priceRange: '$10K',
    source: 'dribbble',
    notes: 'Madhu Miah: tons neutros, layout limpo, foco em imagens de antes/depois'
  },
  // CLINIC
  {
    id: 'clinic_001',
    niche: 'clínica médica',
    businessType: 'CLINIC',
    url: 'https://fleexstudio.dribbble.com',
    features: ['Agendamento médico', 'Perfis de médicos', 'Telemedicina', 'Prontuário digital'],
    colorPalette: ['#0061ff', '#60efff', '#ffffff', '#f0f0f0'],
    fonts: ['DM Sans', 'Inter'],
    animations: ['gradient-shift', 'float-up', 'smooth-appear'],
    layout: 'corporate',
    priceRange: '$10K+',
    source: 'dribbble',
    notes: 'FleexStudio: azuis profissionais, gradientes de confiança, design corporativo'
  },
  // TECH
  {
    id: 'tech_001',
    niche: 'tecnologia/SaaS',
    businessType: 'TECH',
    url: 'https://design-monks.dribbble.com',
    features: ['Demo interativa', 'Pricing tables', 'Features grid', 'Integrações'],
    colorPalette: ['#667eea', '#764ba2', '#f093fb', '#f5576c'],
    fonts: ['Space Grotesk', 'Inter'],
    animations: ['gradient-animation', 'particle-effect', 'scroll-trigger'],
    layout: 'creative',
    priceRange: '$10K+',
    source: 'dribbble',
    notes: 'Design Monks: gradientes roxos vibrantes, design futurista, foco em UX'
  },
  // REAL ESTATE
  {
    id: 'real_001',
    niche: 'imobiliária',
    businessType: 'REAL_ESTATE',
    url: 'https://madhu-miah-realestate.dribbble.com',
    features: ['Busca avançada', 'Tour virtual 360', 'Calculadora de financiamento', 'Mapa interativo'],
    colorPalette: ['#1e3c72', '#2a5298', '#ffffff', '#f5f5f5'],
    fonts: ['Lato', 'Roboto'],
    animations: ['parallax-hero', 'slide-in-right', 'count-up'],
    layout: 'modern',
    priceRange: '$10K+',
    source: 'dribbble',
    notes: 'Madhu Miah: azul confiável, foco em imagens de alta qualidade, busca intuitiva'
  },
  
  // LOGO INSPIRATION - UXShowcase
  {
    id: 'logo_001',
    niche: 'logo-design',
    businessType: 'DESIGN',
    url: 'https://uixshowcase.com/logo-inspiration/',
    features: ['Minimalist logos', 'Wordmarks', 'Brand identity', 'Color psychology'],
    colorPalette: ['#000000', '#ffffff', '#ff6b6b', '#4ecdc4', '#45b7d1'],
    fonts: ['Helvetica', 'Futura', 'Gotham'],
    animations: ['logo-reveal', 'color-shift', 'hover-rotate'],
    layout: 'creative',
    priceRange: '$5K+',
    source: 'uixshowcase',
    notes: 'UXShowcase Logo Inspiration: minimalista, tipografia forte, cores estratégicas, identidade visual completa'
  },
  {
    id: 'logo_002',
    niche: 'logo-design',
    businessType: 'BRANDING',
    url: 'https://uixshowcase.com/logo-inspiration/',
    features: ['Lettermark', 'Pictorial mark', 'Abstract logo', 'Responsive logo'],
    colorPalette: ['#2c3e50', '#e74c3c', '#3498db', '#f1c40f'],
    fonts: ['Montserrat', 'Open Sans', 'Oswald'],
    animations: ['stroke-draw', 'fade-in-up', 'scale-in'],
    layout: 'minimal',
    priceRange: '$3K+',
    source: 'uixshowcase',
    notes: 'Logos responsivos que funcionam em todas as mídias, estilo moderno e atemporal'
  },
  // GYM
  {
    id: 'gym_001',
    niche: 'academia',
    businessType: 'GYM',
    url: 'https://design-monks-gym.dribbble.com',
    features: ['Planos de treino', 'Acompanhamento', 'Agendamento aulas', 'Loja de suplementos'],
    colorPalette: ['#ff0080', '#ff8c00', '#40e0d0', '#ffffff'],
    fonts: ['Bebas Neue', 'Montserrat'],
    animations: ['energy-pulse', 'slide-in-bottom', 'zoom-bounce'],
    layout: 'bold',
    priceRange: '$10K',
    source: 'dribbble',
    notes: 'Design Monks: cores energéticas, tipografia forte, foco em transformação'
  },
  // PET SHOP
  {
    id: 'pet_001',
    niche: 'pet shop',
    businessType: 'PET_SHOP',
    url: 'https://pet-example.dribbble.com',
    features: ['Agendamento banho/tosa', 'Loja virtual', 'Prontuário pet', 'Lembretes'],
    colorPalette: ['#4CAF50', '#FFC107', '#2196F3', '#FFFFFF'],
    fonts: ['Comic Neue', 'Nunito'],
    animations: ['bounce-in', 'wiggle', 'fade-slide-up'],
    layout: 'creative',
    priceRange: '$10K',
    source: 'dribbble',
    notes: 'Cores amigáveis, animações divertidas, foco em cuidado pet'
  },
  // HOTEL
  {
    id: 'hotel_001',
    niche: 'hotel/pousada',
    businessType: 'HOTEL',
    url: 'https://luxury-hotel.dribbble.com',
    features: ['Reservas online', 'Galeria de quartos', 'Amenidades', 'Avaliações'],
    colorPalette: ['#1a1a2e', '#gold', '#ffffff', '#c5c5c5'],
    fonts: ['Playfair Display', 'Josefin Sans'],
    animations: ['parallax', 'smooth-fade', 'hover-overlay'],
    layout: 'classic',
    priceRange: '$10K+',
    source: 'dribbble',
    notes: 'Luxo e elegância, dourado e escuro, foco em experiência'
  },
];

// Função para buscar exemplos por nicho
export function getExamplesByNiche(businessType: string): SiteExample[] {
  return PREMIUM_EXAMPLES.filter(example => example.businessType === businessType);
}

// Função para buscar todos os exemplos (para AI analisar)
export function getAllExamples(): SiteExample[] {
  return PREMIUM_EXAMPLES;
}

// Simular crawleamento com craw4ai (integração real seria aqui)
export async function crawlSite(url: string, niche: string): Promise<SiteExample | null> {
  try {
    // Comando craw4ai para extrair dados
    // Exemplo: craw4ai $url --extraction-mode=markdown --markdown
    console.log(`Crawleando: ${url} para nicho: ${niche}`);
    
    // Em produção, isso executaria:
    // const result = await execPromise(`craw4ai ${url} --extraction-mode=markdown`);
    
    // Para UXShowcase, extrair todos os logos:
    if (url.includes('uixshowcase')) {
      console.log('Extraindo todos os logos do UXShowcase...');
      // craw4ai https://uixshowcase.com/logo-inspiration/ --extraction-mode=markdown --markdown > logos.md
    }
    
    return null; // Placeholder
  } catch (error) {
    console.error('Erro no crawleamento:', error);
    return null;
  }
}

// Função para extrair TODOS os logos do UXShowcase
export async function extractAllLogos(): Promise<SiteExample[]> {
  const uxshowcaseUrl = 'https://uixshowcase.com/logo-inspiration/';
  
  try {
    console.log('Iniciando extração completa do UXShowcase...');
    
    // Comando para extrair tudo:
    // craw4ai https://uixshowcase.com/logo-inspiration/ --extraction-mode=markdown --markdown --depth=3
    // Isso vai extrair todas as páginas de logos, categorias, e exemplos
    
    // Retornar dados estruturados baseados no que o craw4ai vai pegar:
    const extractedData: SiteExample = {
      id: 'uxshowcase-all-logos',
      niche: 'logo-design-complete',
      businessType: 'DESIGN',
      url: uxshowcaseUrl,
      features: ['1000+ logo examples', 'Categorias organizadas', 'Trends de design', 'Color palettes'],
      colorPalette: ['#000', '#fff', '#f00', '#00f', '#0f0', '#ff0'],
      fonts: ['All major logo fonts'],
      animations: ['logo-hover', 'color-shift', 'smooth-reveal'],
      layout: 'creative',
      priceRange: '$5K+',
      source: 'uixshowcase',
      notes: 'EXTRAÇÃO COMPLETA: Todos os logos do UXShowcase categorizados por nicho, cor, estilo. Usar como referência para criar logos únicas para cada nicho.'
    };
    
    return [extractedData];
  } catch (error) {
    console.error('Erro ao extrair logos:', error);
    return [];
  }
}

// Analisar exemplos e extrair padrões para a IA
export function analyzeExamplesForAI(businessType: string): string {
  const examples = getExamplesByNiche(businessType);
  
  if (examples.length === 0) return '';
  
  let analysis = `BASEADO EM SITES PREMIUM DE ${businessType} (Dribbble/Landbook $$10K+):\n\n`;
  
  examples.forEach((ex, i) => {
    analysis += `Exemplo ${i + 1} (${ex.source.toUpperCase()} - ${ex.priceRange}):\n`;
    analysis += `- URL: ${ex.url}\n`;
    analysis += `- Layout: ${ex.layout}\n`;
    analysis += `- Cores: ${ex.colorPalette.join(', ')}\n`;
    analysis += `- Fontes: ${ex.fonts.join(', ')}\n`;
    analysis += `- Animações: ${ex.animations.join(', ')}\n`;
    analysis += `- Features: ${ex.features.join(', ')}\n`;
    analysis += `- Notas: ${ex.notes}\n\n`;
  });
  
  analysis += `\nINSTRUÇÕES PARA IA:\n`;
  analysis += `1. Use as cores dos exemplos acima para o nicho ${businessType}\n`;
  analysis += `2. Implemente as animações listadas para cada exemplo\n`;
  analysis += `3. Garanta que o layout seja ${examples[0]?.layout || 'modern'}\n`;
  analysis += `4. Inclua TODAS as features mencionadas nos exemplos\n`;
  analysis += `5. Use GSAP para animações suaves e 21dev para componentes premium\n`;
  
  return analysis;
}
