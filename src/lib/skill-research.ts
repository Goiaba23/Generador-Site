import * as fs from 'fs';
import * as path from 'path';

export interface NicheDesignTokens {
  businessType: string;
  businessName: string;
  sandwichLayers: {
    foundation: { layout: string; structure: string[]; psychology: string[] };
    colors: { palette: string[]; psychology: string; scheme: string };
    typography: { heading: string; body: string; scale: string; pairing: string };
    animation: { type: string; intensity: string; library: string; patterns: string[] };
    premium: { glassmorphism: boolean; bentoGrid: boolean; noise: boolean; gradients: string };
    threeD: { enabled: boolean; usage: string };
  };
  sections: string[];
  keywords: string[];
  designRationale: string;
}

const SKILL_DIR = path.join(process.cwd(), 'src', 'skill');

const SKILL_CACHE: Record<string, string> = {};

function loadSkill(name: string): string {
  if (SKILL_CACHE[name]) return SKILL_CACHE[name];
  try {
    const files = fs.readdirSync(SKILL_DIR);
    const file = files.find(f => f.includes(name));
    if (file) {
      SKILL_CACHE[name] = fs.readFileSync(path.join(SKILL_DIR, file), 'utf-8');
      return SKILL_CACHE[name];
    }
  } catch { /* ignore */ }
  return '';
}

const NICHE_COLORS: Record<string, { palette: string[]; psychology: string; scheme: string }> = {
  RESTAURANT: {
    palette: ['#1A0F0A', '#D45113', '#F5E6D3', '#8B4513', '#2D1B0E'],
    psychology: 'Laranja queimado estimula apetite, tons terrosos trazem acolhimento',
    scheme: 'Análogo quente + complementar'
  },
  BARBERSHOP: {
    palette: ['#0A0A0F', '#C0C0C0', '#D4A574', '#1A1410', '#F0F0F5'],
    psychology: 'Prata/metálico transmite precisão, couro/quente traz masculinidade premium',
    scheme: 'Monocromático escuro + acetato quente'
  },
  SALON: {
    palette: ['#0A0A0F', '#EC4899', '#F5F0F5', '#D4A574', '#1A1410'],
    psychology: 'Rosa vibrante = feminilidade moderna, dourado = exclusividade',
    scheme: 'Análogo + toque de luxo'
  },
  CLINIC: {
    palette: ['#FFFFFF', '#1A73E8', '#34A853', '#E8F0FE', '#5F6368'],
    psychology: 'Azul = confiança e profissionalismo, verde = saúde e bem-estar',
    scheme: 'Análogo frio + verde de segurança'
  },
  GYM: {
    palette: ['#0A0A0F', '#FF4400', '#00E5FF', '#1A1A2E', '#F0F0F5'],
    psychology: 'Laranja elétrico = energia explosiva, ciano = performance moderna',
    scheme: 'Complementar de alto contraste'
  },
  HOTEL: {
    palette: ['#0A0A0F', '#D4A574', '#F5F0EB', '#8B7355', '#1A1410'],
    psychology: 'Cobre/dourado = hospitalidade premium, off-white = conforto limpo',
    scheme: 'Análogo quente + neutro premium'
  },
  RETAIL: {
    palette: ['#FFFFFF', '#06B6D4', '#F59E0B', '#1A1A2E', '#F5F5F7'],
    psychology: 'Ciano = confiança moderna, âmbar = urgência/compras',
    scheme: 'Split complementar'
  },
  TECH: {
    palette: ['#0A0A0F', '#22D3EE', '#A78BFA', '#F0F0F5', '#14141E'],
    psychology: 'Ciano = inovação, roxo = criatividade tech, dark = sofisticação',
    scheme: 'Triádico frio + neon'
  },
  PET_SHOP: {
    palette: ['#FFFFFF', '#34D399', '#F472B6', '#FEF3C7', '#1A1A2E'],
    psychology: 'Verde = natureza/vida, rosa = fofura/carinho, off-white = limpeza',
    scheme: 'Análogo alegre + complementar'
  },
  SPA: {
    palette: ['#F5F0EB', '#A8D5BA', '#D4A574', '#6B8F71', '#FFFFFF'],
    psychology: 'Verde sálvia = calma/equilíbrio, areia = natural/orgânico',
    scheme: 'Análogo natural + neutro'
  },
  CONSULTING: {
    palette: ['#0A0A0F', '#1A73E8', '#34A853', '#F0F0F5', '#14141E'],
    psychology: 'Azul = confiança/ autoridade, verde = crescimento',
    scheme: 'Azul corporativo + verde resultado'
  },
  REAL_ESTATE: {
    palette: ['#FFFFFF', '#1A365D', '#D4A574', '#E2E8F0', '#2D3748'],
    psychology: 'Azul marinho = estabilidade/ confiança, dourado = valor premium',
    scheme: 'Análogo sério + acetato dourado'
  },
  EDUCATION: {
    palette: ['#FFFFFF', '#6366F1', '#22D3EE', '#EEF2FF', '#1E293B'],
    psychology: 'Índigo = conhecimento/ sabedoria, ciano = aprendizado moderno',
    scheme: 'Análogo de aprendizado'
  },
  EVENT_PLANNER: {
    palette: ['#0A0A0F', '#EC4899', '#D4A574', '#F5F0EB', '#1A1410'],
    psychology: 'Rosa = celebração, dourado = requinte, dark = contraste dramático',
    scheme: 'Análogo festivo + luxo'
  },
  DEFAULT: {
    palette: ['#0A0A0F', '#06B6D4', '#3B82F6', '#F0F0F5', '#14141E'],
    psychology: 'Ciano = modernidade, azul = confiança, dark = premium',
    scheme: 'Análogo frio + contraste'
  },
};

const NICHE_FONTS: Record<string, { heading: string; body: string; pairing: string }> = {
  RESTAURANT: { heading: 'Playfair Display', body: 'Sora', pairing: 'Serif elegante + sans-serif moderna' },
  BARBERSHOP: { heading: 'Oswald', body: 'Inter', pairing: 'Condensado bold + limpa profissional' },
  SALON: { heading: 'Playfair Display', body: 'Sora', pairing: 'Serif luxuosa + sem serifa moderna' },
  CLINIC: { heading: 'Space Grotesk', body: 'Inter', pairing: 'Sans-serif profissional + limpa' },
  GYM: { heading: 'Bebas Neue', body: 'Sora', pairing: 'Extrabold impacto + corpo limpo' },
  HOTEL: { heading: 'Playfair Display', body: 'DM Sans', pairing: 'Serif premium + sans acolhedora' },
  RETAIL: { heading: 'Space Grotesk', body: 'Inter', pairing: 'Moderna bold + limpa conversão' },
  TECH: { heading: 'Space Grotesk', body: 'Sora', pairing: 'Tech sans + limpa legível' },
  PET_SHOP: { heading: 'Fredoka', body: 'Nunito', pairing: 'Arredondada amigável + limpa' },
  SPA: { heading: 'Cormorant Garamond', body: 'Sora', pairing: 'Serif elegante + sans serena' },
  CONSULTING: { heading: 'Space Grotesk', body: 'Inter', pairing: 'Profissional bold + corpo confiável' },
  REAL_ESTATE: { heading: 'Playfair Display', body: 'DM Sans', pairing: 'Serif confiança + sans acolhedora' },
  EDUCATION: { heading: 'Space Grotesk', body: 'Nunito', pairing: 'Moderna + amigável e legível' },
  EVENT_PLANNER: { heading: 'Playfair Display', body: 'Sora', pairing: 'Serif celebração + sans moderna' },
  DEFAULT: { heading: 'Space Grotesk', body: 'Inter', pairing: 'Moderna bold + corpo limpo' },
};

const NICHE_ANIMATIONS: Record<string, { type: string; intensity: string; patterns: string[] }> = {
  RESTAURANT: { type: 'scroll_reveal', intensity: 'medium', patterns: ['Fade up menu items', 'Stagger cards', 'Parallax hero images'] },
  BARBERSHOP: { type: 'scroll_reveal', intensity: 'medium', patterns: ['Gallery lightbox', 'Stagger services', 'Before/after slider'] },
  SALON: { type: 'elegant_reveal', intensity: 'medium', patterns: ['Gallery fade', 'Price stagger', 'Testimonial carousel'] },
  CLINIC: { type: 'subtle', intensity: 'low', patterns: ['Smooth scroll', 'Fade sections', 'Accordion FAQ'] },
  GYM: { type: 'energetic', intensity: 'high', patterns: ['Number counters', 'Parallax hero', 'Stagger plans'] },
  HOTEL: { type: 'cinematic', intensity: 'medium', patterns: ['Full-screen gallery', 'Parallax rooms', 'Smooth scroll booking'] },
  RETAIL: { type: 'conversion', intensity: 'medium', patterns: ['Hover zoom', 'Stagger products', 'Cart animations'] },
  TECH: { type: 'futuristic', intensity: 'high', patterns: ['Particle background', '3D hero', 'Scroll-triggered reveals'] },
  PET_SHOP: { type: 'playful', intensity: 'medium', patterns: ['Bounce cards', 'Fade gallery', 'Fun hover states'] },
  SPA: { type: 'zen', intensity: 'low', patterns: ['Slow fade', 'Smooth scroll', 'Gentle reveals'] },
  CONSULTING: { type: 'professional', intensity: 'low', patterns: ['Count-up stats', 'Fade sections', 'Testimonial carousel'] },
  REAL_ESTATE: { type: 'cinematic', intensity: 'medium', patterns: ['Full-screen gallery', 'Map interactions', 'Property cards stagger'] },
  EDUCATION: { type: 'clean', intensity: 'low', patterns: ['Fade reveals', 'Course cards', 'Progress animations'] },
  EVENT_PLANNER: { type: 'celebratory', intensity: 'high', patterns: ['Gallery lightbox', 'Countdown', 'Stagger services'] },
  DEFAULT: { type: 'scroll_reveal', intensity: 'medium', patterns: ['Fade up', 'Stagger cards', 'Smooth scroll'] },
};

const NICHE_LAYOUT: Record<string, { pattern: string; structure: string[] }> = {
  RESTAURANT: { pattern: 'bento_grid', structure: ['Hero imagem + CTA', 'Menu categorias', 'Depoimentos', 'Galeria ambiente', 'Localização + contato'] },
  BARBERSHOP: { pattern: 'column_grid', structure: ['Hero bold + CTA', 'Serviços', 'Galeria cortes', 'Equipe', 'Agendamento', 'Localização'] },
  SALON: { pattern: 'bento_grid', structure: ['Hero elegante', 'Serviços', 'Galeria', 'Preços', 'Agendamento', 'Depoimentos'] },
  CLINIC: { pattern: 'clean_grid', structure: ['Hero + agendamento', 'Especialidades', 'Equipe', 'Convênios', 'Depoimentos', 'FAQ'] },
  GYM: { pattern: 'bold_grid', structure: ['Hero impacto', 'Modalidades', 'Planos', 'Equipe', 'Matrícula', 'Resultados'] },
  HOTEL: { pattern: 'magazine', structure: ['Hero cinematic', 'Quartos', 'Comodidades', 'Galeria', 'Reservas', 'Localização'] },
  RETAIL: { pattern: 'product_grid', structure: ['Hero promoção', 'Categorias', 'Produtos', 'Depoimentos', 'FAQ', 'Contato'] },
  TECH: { pattern: 'bento_tech', structure: ['Hero 3D', 'Features', 'Como funciona', 'Preços', 'Depoimentos', 'CTA final'] },
  PET_SHOP: { pattern: 'bento_grid', structure: ['Hero fofo', 'Serviços', 'Produtos', 'Galeria pets', 'Agendamento', 'Depoimentos'] },
  SPA: { pattern: 'clean_grid', structure: ['Hero serene', 'Tratamentos', 'Galeria', 'Preços', 'Agendamento', 'FAQ'] },
  DEFAULT: { pattern: 'column_grid', structure: ['Hero', 'Sobre', 'Serviços', 'Diferenciais', 'Depoimentos', 'FAQ', 'Contato'] },
};

function extractKeywords(userDescription: string, businessType: string): string[] {
  const lower = userDescription.toLowerCase();
  const words = lower.replace(/[^a-zà-ú\s]/g, '').split(/\s+/).filter(w => w.length > 3);
  const stopWords = new Set(['para', 'com', 'que', 'tem', 'uma', 'como', 'mais', 'por', 'dos', 'das', 'ser', 'nos', 'era', 'aos']);
  const unique = [...new Set(words.filter(w => !stopWords.has(w)))];
  const byType = businessType ? [businessType.toLowerCase().replace(/_/g, ' ')] : [];
  return [...byType, ...unique].slice(0, 10);
}

function generateDesignRationale(tokens: NicheDesignTokens['sandwichLayers'], businessName: string): string {
  return [
    `Para ${businessName}, apliquei o método sanduíche de design:`,
    `→ Fundação: layout ${tokens.foundation.layout} com ${tokens.foundation.structure.length} seções pensadas na jornada de conversão`,
    `→ Núcleo visual: paleta ${tokens.colors.scheme} baseada em ${tokens.colors.psychology}`,
    `→ Tipografia: ${tokens.typography.heading} + ${tokens.typography.body} (${tokens.typography.pairing})`,
    `→ Movimento: ${tokens.animation.type} com ${tokens.animation.intensity} intensidade`,
    `→ Acabamento: ${tokens.premium.noise ? 'textura noise sutil + ' : ''}${tokens.premium.bentoGrid ? 'bento grid + ' : ''}métricas de conversão da psicologia do design`,
  ].join('\n');
}

export function researchNiche(businessType: string, businessName: string, userDescription: string): NicheDesignTokens {
  const type = businessType?.toUpperCase() || 'DEFAULT';
  const normalizedType = NICHE_COLORS[type] ? type : 'DEFAULT';
  
  const colors = NICHE_COLORS[normalizedType];
  const fonts = NICHE_FONTS[normalizedType];
  const anim = NICHE_ANIMATIONS[normalizedType];
  const layout = NICHE_LAYOUT[normalizedType];
  const keywords = extractKeywords(userDescription, type);

  const sandwichLayers: NicheDesignTokens['sandwichLayers'] = {
    foundation: {
      layout: layout.pattern,
      structure: layout.structure,
      psychology: [
        'Primeira impressão em 50ms - layout define credibilidade',
        'Lei de Hick: máx 5-7 links no nav, 3 tiers de preço',
        'F-Pattern para texto, Z-Pattern para landing',
        'Peak-End Rule: última seção (CTA) define a experiência',
      ],
    },
    colors: {
      palette: colors.palette,
      psychology: colors.psychology,
      scheme: colors.scheme,
    },
    typography: {
      heading: fonts.heading,
      body: fonts.body,
      scale: 'clamp(2.5rem, 5vw, 4.5rem) → clamp(1rem, 1.2vw, 1.125rem)',
      pairing: fonts.pairing,
    },
    animation: {
      type: anim.type,
      intensity: anim.intensity,
      library: 'GSAP + Lenis smooth scroll + Framer Motion',
      patterns: anim.patterns,
    },
    premium: {
      glassmorphism: true,
      bentoGrid: layout.pattern.includes('bento'),
      noise: type === 'RESTAURANT' || type === 'BARBERSHOP' || type === 'HOTEL',
      gradients: 'Micro-gradientes sutis (135deg, rgba(6,182,212,0.06), rgba(59,130,246,0.03))',
    },
    threeD: {
      enabled: type === 'TECH' || type === 'GYM',
      usage: type === 'TECH' ? 'Hero com Three.js particle system ou floating 3D object' : type === 'GYM' ? 'Estatísticas animadas em 3D' : 'Não aplicado',
    },
  };

  return {
    businessType: normalizedType,
    businessName,
    sandwichLayers,
    sections: layout.structure,
    keywords,
    designRationale: generateDesignRationale(sandwichLayers, businessName),
  };
}

export function getSkillKnowledgeBase(): string {
  const required = [
    'web-design-thinking',
    'animacoes-3d-gsap',
    'layout-psicologia-conversao',
    'color-theory-mastery',
    'typography-mastery',
    'premium-design-patterns',
    'framer-motion-react-animations',
    'responsividade-mobile-first',
    'design-systems-componentes',
    'website-design-restaurant',
    'website-design-barbershop',
    'website-design-clinic',
    'website-design-gym',
    'website-design-hotel',
    'website-design-tech',
  ];

  return required.map(name => {
    const content = loadSkill(name);
    if (!content) return null;
    try {
      const parsed = JSON.parse(content.substring(content.indexOf('{')));
      return `=== ${parsed.name || name} ===\nDescrição: ${parsed.description || ''}\nFonte: ${parsed.source || ''}\nPrincípio: ${parsed.sandwichLayers?.foundation?.principle || ''}\n${parsed.keyTakeaways ? 'Key Takeaways:\n' + parsed.keyTakeaways.map((t: string) => '• ' + t).join('\n') : ''}`;
    } catch {
      return `=== ${name} ===\n${content.substring(0, 4000)}`;
    }
  }).filter(Boolean).join('\n\n');
}
