export interface LogoExample {
  id: string;
  name: string;
  category: 'minimalist' | 'wordmark' | 'lettermark' | 'pictorial' | 'abstract' | 'emblem' | 'responsive';
  colors: string[];
  fonts: string[];
  style: 'modern' | 'classic' | 'bold' | 'elegant' | 'playful';
  industry: string[];
  priceRange: string;
  tags: string[];
  notes: string;
}

export const UXSHOWCASE_LOGOS: LogoExample[] = [
  {
    id: 'logo-min-001',
    name: 'Minimalist Sans-Serif',
    category: 'minimalist',
    colors: ['#000000', '#ffffff', '#f5f5f5'],
    fonts: ['Helvetica', 'Arial', 'Futura'],
    style: 'modern',
    industry: ['tech', 'consulting', 'finance'],
    priceRange: '$3K+',
    tags: ['minimalist', 'clean', 'sans-serif', 'geometric'],
    notes: 'Fonte sans-serif limpa, muito usada em tech. Peso médio, espaçamento generoso.'
  },
  {
    id: 'logo-min-002',
    name: 'Minimalist Serif',
    category: 'minimalist',
    colors: ['#1a1a1a', '#fafafa', '#d4af37'],
    fonts: ['Garamond', 'Baskerville', 'Didot'],
    style: 'elegant',
    industry: ['law', 'real-estate', 'luxury'],
    priceRange: '$5K+',
    tags: ['serif', 'elegant', 'timeless', 'premium'],
    notes: 'Serif para marcas de luxo. Transmite tradição e confiança.'
  },
  {
    id: 'logo-word-001',
    name: 'Bold Wordmark',
    category: 'wordmark',
    colors: ['#ff0000', '#000000', '#ffffff'],
    fonts: ['Impact', 'Bebas Neue', 'Montserrat'],
    style: 'bold',
    industry: ['sports', 'gym', 'automotive'],
    priceRange: '$2K+',
    tags: ['bold', 'impactful', 'uppercase'],
    notes: 'Fonte pesada, toda em maiúsculas. Alto impacto visual.'
  },
  {
    id: 'logo-word-002',
    name: 'Script Wordmark',
    category: 'wordmark',
    colors: ['#2196F3', '#FF4081', '#ffffff'],
    fonts: ['Pacifico', 'Dancing Script', 'Lobster'],
    style: 'playful',
    industry: ['salon', 'beauty', 'bakery'],
    priceRange: '$3K+',
    tags: ['script', 'handwritten', 'friendly'],
    notes: 'Fonte cursiva, transmite acolhimento e proximidade.'
  },
  {
    id: 'logo-letter-001',
    name: 'Geometric Lettermark',
    category: 'lettermark',
    colors: ['#4CAF50', '#ffffff', '#333333'],
    fonts: ['Gotham', 'Montserrat'],
    style: 'modern',
    industry: ['tech', 'startup', 'saas'],
    priceRange: '$1K+',
    tags: ['geometric', 'simple', 'memorable'],
    notes: 'Uma única letra estilizada. Ideal para brands curtas.'
  },
  {
    id: 'logo-letter-002',
    name: 'Circular Lettermark',
    category: 'lettermark',
    colors: ['#FF5722', '#ffffff', '#000000'],
    fonts: ['Circular', 'Gotham'],
    style: 'bold',
    industry: ['retail', 'fashion', 'music'],
    priceRange: '$2K+',
    tags: ['circular', 'enclosed', 'strong'],
    notes: 'Letra dentro de círculo. Foco em simetria e equilíbrio.'
  },
  {
    id: 'logo-pict-001',
    name: 'Abstract Symbol',
    category: 'pictorial',
    colors: ['#9C27B0', '#E91E63', '#ffffff'],
    fonts: ['Montserrat', 'Open Sans'],
    style: 'modern',
    industry: ['tech', 'creative', 'design'],
    priceRange: '$5K+',
    tags: ['abstract', 'symbol', 'unique'],
    notes: 'Símbolo abstrato que representa a marca sem palavras. Altamente memorável.'
  },
  {
    id: 'logo-pict-002',
    name: 'Industry-Specific Icon',
    category: 'pictorial',
    colors: ['#FF9800', '#2196F3', '#ffffff'],
    fonts: ['Roboto', 'Open Sans'],
    style: 'modern',
    industry: ['restaurant', 'pet-shop', 'health'],
    priceRange: '$5K+',
    tags: ['iconic', 'recognizable', 'relevant'],
    notes: 'Ícone que remete diretamente à indústria. Fácil associação mental.'
  },
  {
    id: 'logo-abs-001',
    name: 'Premium Abstract',
    category: 'abstract',
    colors: ['#1a1a2e', '#16213e', '#0f3460'],
    fonts: ['Space Grotesk', 'Inter'],
    style: 'elegant',
    industry: ['finance', 'law', 'luxury'],
    priceRange: '$10K+',
    tags: ['custom', 'bespoke', 'high-end'],
    notes: 'Design $10K+ completamente customizado. Difícil de replicar, alta exclusividade.'
  },
  {
    id: 'logo-resp-001',
    name: 'Responsive Logo System',
    category: 'responsive',
    colors: ['#4f46e5', '#7c3aed', '#ffffff'],
    fonts: ['Inter', 'Roboto'],
    style: 'modern',
    industry: ['saas', 'tech', 'startup'],
    priceRange: '$3K+',
    tags: ['responsive', 'system', 'scalable'],
    notes: 'Sistema completo: logo horizontal, vertical e ícone. Funciona em todas as mídias.'
  },
];

export function getLogosByIndustry(industry: string): LogoExample[] {
  return UXSHOWCASE_LOGOS.filter(logo =>
    logo.industry.includes(industry) || logo.industry.includes('all')
  );
}

export function getLogosByCategory(category: string): LogoExample[] {
  return UXSHOWCASE_LOGOS.filter(logo => logo.category === category);
}

export function generateLogoInspiration(businessType: string): string {
  const industryMap: Record<string, string> = {
    'BARBERSHOP': 'barber',
    'SALON': 'beauty',
    'RESTAURANT': 'restaurant',
    'CLINIC': 'health',
    'GYM': 'gym',
    'RETAIL': 'retail',
    'REAL_ESTATE': 'real-estate',
    'TECH': 'tech',
    'PET_SHOP': 'pet-shop',
    'HOTEL': 'luxury',
    'LAWYER': 'law',
    'CONSULTING': 'consulting',
    'FINANCE': 'finance',
  };
  const industry = industryMap[businessType] || 'all';
  const logos = getLogosByIndustry(industry);
  let inspiration = `LOGO INSPIRATION FROM UXSHOWCASE:\n\n`;
  logos.forEach((logo, i) => {
    inspiration += `Exemplo ${i + 1} (${logo.priceRange}):\n`;
    inspiration += `- Nome: ${logo.name}\n`;
    inspiration += `- Categoria: ${logo.category}\n`;
    inspiration += `- Cores: ${logo.colors.join(', ')}\n`;
    inspiration += `- Fontes: ${logo.fonts.join(', ')}\n`;
    inspiration += `- Estilo: ${logo.style}\n`;
    inspiration += `- Tags: ${logo.tags.join(', ')}\n`;
    inspiration += `- Notas: ${logo.notes}\n\n`;
  });
  inspiration += `\nINSTRUÇÕES PARA IA CRIAR LOGO:\n`;
  inspiration += `1. Use uma das categorias acima para o nicho ${businessType}\n`;
  inspiration += `2. Paleta de cores deve ser: ${logos[0]?.colors.join(', ') || 'modern palette'}\n`;
  inspiration += `3. Fonte sugerida: ${logos[0]?.fonts[0] || 'Inter'}\n`;
  inspiration += `4. Estilo: ${logos[0]?.style || 'modern'}\n`;
  inspiration += `5. Crie um logo responsivo (horizontal + ícone)\n`;
  inspiration += `6. Preço de referência: ${logos[0]?.priceRange || '$3K+'}\n`;
  return inspiration;
}

export async function extractAllUXShowcaseLogos(): Promise<LogoExample[]> {
  return UXSHOWCASE_LOGOS;
}

export default {
  UXSHOWCASE_LOGOS,
  getLogosByIndustry,
  getLogosByCategory,
  generateLogoInspiration,
  extractAllUXShowcaseLogos,
};
