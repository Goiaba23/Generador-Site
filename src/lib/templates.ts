/**
 * TEMPLATES V5.0 - BASEADO EM DRIBBLE + LANDBOOK
 * Designs reais de $1.200-$10.000+ de agÃªncias top
 * 
 * Fontes:
 * - Dribbble: Restaurant (Safal_Adhikari, Ronas IT), Medical (FleexStudio, Olack), 
 *   E-commerce (BotiFly, Design Monks, Pixxen), Real Estate (Madhu Miah, Design Monks)
 * - Landbook: Landing pages, Service pages, Portfolio examples
 */

import { BusinessType, TemplateStyle } from '@prisma/client';

// ===== CORES BASEADAS EM DRIBBLE (reais) =====

const DRIBBLE_COLORS = {
  restaurant: {
    primary: '#dc2626',      // Red-600 (food warm)
    secondary: '#f97316',    // Orange-500
    accent: '#fbbf24',      // Yellow-400
    background: '#0a0a1a',
    surface: '#1e293b',
    text: '#f8fafc',
    gradient: 'linear-gradient(135deg, #dc2626, #f97316)',
    gradientSoft: 'linear-gradient(135deg, rgba(220,38,38,0.2), rgba(249,115,22,0.1))',
  },
  medical: {
    primary: '#0891b2',      // Cyan-600 (trust blue)
    secondary: '#0d9488',    // Teal-600
    accent: '#10b981',      // Emerald-500
    background: '#0a0a1a',
    surface: '#1e293b',
    text: '#f8fafc',
    gradient: 'linear-gradient(135deg, #0891b2, #0d9488)',
    gradientSoft: 'linear-gradient(135deg, rgba(8,145,178,0.2), rgba(13,148,136,0.1))',
  },
  store: {
    primary: '#7c3aed',      // Violet-600
    secondary: '#ec4899',    // Pink-600
    accent: '#f43f5e',      // Rose-600
    background: '#0a0a1a',
    surface: '#1e293b',
    text: '#f8fafc',
    gradient: 'linear-gradient(135deg, #7c3aed, #ec4899)',
    gradientSoft: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(236,72,153,0.1))',
  },
  realEstate: {
    primary: '#059669',      // Emerald-600
    secondary: '#0d9488',    // Teal-600
    accent: '#10b981',      // Emerald-500
    background: '#0a0a1a',
    surface: '#1e293b',
    text: '#f8fafc',
    gradient: 'linear-gradient(135deg, #059669, #0d9488)',
    gradientSoft: 'linear-gradient(135deg, rgba(5,150,105,0.2), rgba(13,148,136,0.1))',
  },
  salon: {
    primary: '#db2777',      // Pink-600
    secondary: '#a855f7',    // Purple-500
    accent: '#f472b6',      // Pink-400
    background: '#0a0a1a',
    surface: '#1e293b',
    text: '#f8fafc',
    gradient: 'linear-gradient(135deg, #db2777, #a855f7)',
    gradientSoft: 'linear-gradient(135deg, rgba(219,39,119,0.2), rgba(168,85,247,0.1))',
  },
  gym: {
    primary: '#ea580c',      // Orange-600
    secondary: '#dc2626',    // Red-600
    accent: '#f97316',      // Orange-500
    background: '#0a0a1a',
    surface: '#1e293b',
    text: '#f8fafc',
    gradient: 'linear-gradient(135deg, #ea580c, #dc2626)',
    gradientSoft: 'linear-gradient(135deg, rgba(234,88,12,0.2), rgba(220,38,38,0.1))',
  },
  hotel: {
    primary: '#0891b2',      // Cyan-600
    secondary: '#2563eb',    // Blue-600
    accent: '#0d9488',      // Teal-600
    background: '#0a0a1a',
    surface: '#1e293b',
    text: '#f8fafc',
    gradient: 'linear-gradient(135deg, #0891b2, #2563eb)',
    gradientSoft: 'linear-gradient(135deg, rgba(8,145,178,0.2), rgba(37,99,235,0.1))',
  },
  law: {
    primary: '#1d4ed',      // Blue-700
    secondary: '#0891b2',    // Cyan-600
    accent: '#3b82f6',      // Blue-500
    background: '#0a0a1a',
    surface: '#1e293b',
    text: '#f8fafc',
    gradient: 'linear-gradient(135deg, #1d4ed, #0891b2)',
    gradientSoft: 'linear-gradient(135deg, rgba(29,78,237,0.2), rgba(8,145,178,0.1))',
  },
  tech: {
    primary: '#4f46e5',      // Indigo-600
    secondary: '#7c3aed',    // Violet-600
    accent: '#818cf8',      // Indigo-400
    background: '#0a0a1a',
    surface: '#1e293b',
    text: '#f8fafc',
    gradient: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    gradientSoft: 'linear-gradient(135deg, rgba(79,70,229,0.2), rgba(124,58,237,0.1))',
  },
};

// ===== LAYOUTS BASEADOS EM DRIBBLE SHOTS =====

export interface ImageSlot {
  id: string;
  label: string;
  type: 'hero' | 'feature' | 'gallery' | 'team' | 'product' | 'background' | 'icon' | 'service';
  defaultUrl: string;
  required: boolean;
  aspectRatio?: string;
  icon?: string;
}

// Layout design style (different from Prisma TemplateStyle)
type LayoutDesignStyle = 'LANDING' | 'classic' | 'bold' | 'minimal' | 'corporate' | 'creative';

export interface SiteTemplate {
  id: string;
  name: string;
  businessType: BusinessType;
  style: TemplateStyle;  // Prisma enum: CATALOG, PORTFOLIO, LANDING, BOOKING, ECOMMERCE, BLOG
  description: string;
  // Layout based on Dribbble shots
  layout: {
    hero: 'fullscreen' | 'split' | 'minimal' | 'video' | 'carousel';
    sections: ('hero' | 'features' | 'gallery' | 'menu' | 'booking' | 'services' | 'products' | 'testimonials' | 'stats' | 'cta' | 'team' | 'pricing' | 'faq' | 'contact' | 'map' | 'properties')[];
    designStyle: LayoutDesignStyle;
  };
  // Colors from Dribbble analysis
  colors: typeof DRIBBLE_COLORS.restaurant;
  fonts: {
    heading: string;
    body: string;
  };
  imageSlots: ImageSlot[];
  features: string[];
  // Based on real Dribbble shots
  dribbbleInspiration: string;
  landbookStyle: string;
}

// ===== TEMPLATES PREMIUM REAIS =====

export const templates: SiteTemplate[] = [
  // ===== RESTAURANT - Baseado em: Safal_Adhikari, Ronas IT (Dribbble) =====
  {
    id: 'restaurant-modern-v5',
    name: 'Restaurante Moderno Premium',
    businessType: 'RESTAURANT',
    style: 'LANDING',  // Prisma TemplateStyle
    description: 'Design baseado em restaurantes premiados do Dribbble - foco em visual food & reservas',
    layout: {
      hero: 'fullscreen',
      sections: ['hero', 'features', 'menu', 'gallery', 'testimonials', 'booking', 'cta', 'contact', 'map'],
      designStyle: 'LANDING',
    },
    colors: DRIBBLE_COLORS.restaurant,
    fonts: { heading: "'Playfair Display', serif", body: "'Inter', sans-serif" },
    imageSlots: [
      { id: 'hero-bg', label: 'Imagem de Fundo Hero', type: 'hero', defaultUrl: 'https://images.unsplash.com/photo-1517248136294-4c750ece?w=1920', required: true, aspectRatio: '16/9' },
      { id: 'food-1', label: 'Prato Principal', type: 'feature', defaultUrl: 'https://images.unsplash.com/photo-1546833990-eca8c1c4d6?w=800', required: true },
      { id: 'food-2', label: 'Entrada', type: 'feature', defaultUrl: 'https://images.unsplash.com/photo-1567620906292-075ec6552c5?w=800', required: false },
      { id: 'interior', label: 'Interior do Restaurante', type: 'gallery', defaultUrl: 'https://images.unsplash.com/photo-1517248136294-4c750ece?w=800', required: true },
      { id: 'chef', label: 'Foto do Chef', type: 'team', defaultUrl: 'https://images.unsplash.com/photo-1577219495722-5a90f989c9b?w=400', required: false, aspectRatio: '1/1' },
    ],
    features: [
      'CardÃ¡pio Digital Interativo (Dribbble Inspiration)',
      'Sistema de Reservas Online',
      'Galeria de Pratos em Alta Qualidade',
      'IntegraÃ§Ã£o com Delivery Apps',
      'SeÃ§Ã£o de Chef e HistÃ³ria',
      'AvaliaÃ§Ãµes em Tempo Real',
    ],
    dribbbleInspiration: 'Safal_Adhikari, Ronas IT, Jai Sawle (Dribbble)',
    landbookStyle: 'Food & Restaurant Landing Pages',
  },

  // ===== CLINIC - Baseado em: FleexStudio, Olack Branding (Dribbble) =====
  {
    id: 'clinic-modern-v5',
    name: 'ClÃ­nica Medical Premium',
    businessType: 'CLINIC',
    style: 'PORTFOLIO',
    description: 'Design confiÃ¡vel baseado em clÃ­nicas top do Dribbble - foco em confianÃ§a e agendamento',
    layout: {
      hero: 'split',
      sections: ['hero', 'features', 'services', 'team', 'testimonials', 'booking', 'stats', 'faq', 'contact'],
      designStyle: 'corporate',
    },
    colors: DRIBBLE_COLORS.medical,
    fonts: { heading: "'Montserrat', sans-serif", body: "'Open Sans', sans-serif" },
    imageSlots: [
      { id: 'hero-bg', label: 'Imagem de Fundo (MÃ©dico)', type: 'hero', defaultUrl: 'https://images.unsplash.com/photo-1559839734-3b3bfeea7b3?w=1920', required: true, aspectRatio: '16/9' },
      { id: 'doctor-1', label: 'Foto do MÃ©dico Principal', type: 'team', defaultUrl: 'https://images.unsplash.com/photo-161234931499?w=400', required: true, aspectRatio: '1/1' },
      { id: 'facility', label: 'InstalaÃ§Ãµes da ClÃ­nica', type: 'gallery', defaultUrl: 'https://images.unsplash.com/photo-151949402696?w=800', required: true },
      { id: 'service-1', label: 'Consulta MÃ©dica', type: 'service', defaultUrl: 'https://images.unsplash.com/photo-1559839734-3b3bfeea7b3?w=800', required: false },
    ],
    features: [
      'Agendamento Online (HIPAA-aware design)',
      'Perfis de MÃ©dicos Detalhados',
      'FormulÃ¡rios de Pacientes Digitais',
      'IntegraÃ§Ã£o com Planos de SaÃºde',
      'Blog de SaÃºde e Bem-estar',
      'Suporte 24/7 e Telemedicina',
    ],
    dribbbleInspiration: 'FleexStudio, Olack Branding, JA. Parvez (Dribbble)',
    landbookStyle: 'Healthcare & Medical Service Pages',
  },

  // ===== STORE - Baseado em: BotiFly, Design Monks, Pixxen (Dribbble) =====
  {
    id: 'store-bold-v5',
    name: 'Loja E-commerce Premium',
    businessType: 'RETAIL',
    style: 'ECOMMERCE',
    description: 'Loja virtual de alto conversion baseada em E-commerce $10K+ do Dribbble',
    layout: {
      hero: 'carousel',
      sections: ['hero', 'features', 'products', 'testimonials', 'cta', 'contact'],
      designStyle: 'bold',
    },
    colors: DRIBBLE_COLORS.store,
    fonts: { heading: "'Poppins', sans-serif", body: "'Roboto', sans-serif" },
    imageSlots: [
      { id: 'hero-bg', label: 'Banner Principal', type: 'hero', defaultUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920', required: true, aspectRatio: '16/9' },
      { id: 'product-1', label: 'Produto em Destaque', type: 'product', defaultUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c6d30e?w=800', required: true },
      { id: 'product-2', label: 'Produto SecundÃ¡rio', type: 'product', defaultUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800', required: false },
      { id: 'store-interior', label: 'Interior da Loja', type: 'gallery', defaultUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800', required: true },
    ],
    features: [
      'CatÃ¡logo de Produtos com Filtros (Dribbble-inspired)',
      'Carrinho de Compras Animado',
      'Checkout em 1 PÃ¡gina',
      'IntegraÃ§Ã£o com PIX, CartÃ£o, Boleto',
      'Galeria de Produtos ZoomÃ¡vel',
      'Sistema de AvaliaÃ§Ãµes',
    ],
    dribbbleInspiration: 'BotiFly, Design Monks, Pixxen Studio (Dribbble $10K+)',
    landbookStyle: 'E-commerce & Product Landing Pages',
  },

  // ===== REAL ESTATE - Baseado em: Madhu Miah, Design Monks (Dribbble) =====
  {
    id: 'realestate-modern-v5',
    name: 'ImobiliÃ¡ria Premium',
    businessType: 'REAL_ESTATE',
    style: 'LANDING',
    description: 'Design sofisticado baseado em imobiliÃ¡rias de luxo do Dribbble',
    layout: {
      hero: 'fullscreen',
      sections: ['hero', 'features', 'properties', 'testimonials', 'stats', 'cta', 'contact', 'map'],
      designStyle: 'LANDING',
    },
    colors: DRIBBLE_COLORS.realEstate,
    fonts: { heading: "'Playfair Display', serif", body: "'Inter', sans-serif" },
    imageSlots: [
      { id: 'hero-bg', label: 'ImÃ³vel de Luxo', type: 'hero', defaultUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1533a?w=1920', required: true, aspectRatio: '16/9' },
      { id: 'property-1', label: 'Casa Ã  Venda', type: 'product', defaultUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1533a?w=800', required: true },
      { id: 'property-2', label: 'Apartamento', type: 'product', defaultUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800', required: false },
      { id: 'agent', label: 'Foto do Corretor', type: 'team', defaultUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400', required: true, aspectRatio: '1/1' },
    ],
    features: [
      'Busca AvanÃ§ada de ImÃ³veis (Dribbble-inspired)',
      'Tour Virtual 360Â°',
      'Calculadora de Financiamento',
      'Ficha de ImÃ³vel Detalhada',
      'IntegraÃ§Ã£o com Zapier/WhatsApp',
      'Mapa de LocalizaÃ§Ã£o Interativo',
    ],
    dribbbleInspiration: 'Madhu Miah, Design Monks (Dribbble $10K+)',
    landbookStyle: 'Real Estate & Property Landing Pages',
  },

  // ===== SALON - Baseado em: Dribbble Beauty/Clean Designs =====
  {
    id: 'salon-creative-v5',
    name: 'SalÃ£o de Beleza Premium',
    businessType: 'SALON',
    style: 'PORTFOLIO',
    description: 'Design elegante e feminino baseado em salÃµes de luxo do Dribbble',
    layout: {
      hero: 'split',
      sections: ['hero', 'features', 'services', 'gallery', 'team', 'testimonials', 'booking', 'contact'],
      designStyle: 'creative',
    },
    colors: DRIBBLE_COLORS.salon,
    fonts: { heading: "'Dancing Script', cursive", body: "'Open Sans', sans-serif" },
    imageSlots: [
      { id: 'hero-bg', label: 'SalÃ£o de Beleza', type: 'hero', defaultUrl: 'https://images.unsplash.com/photo-1560066987-4d7b3daf93a1?w=1920', required: true, aspectRatio: '16/9' },
      { id: 'service-1', label: 'Corte de Cabelo', type: 'service', defaultUrl: 'https://images.unsplash.com/photo-1560066987-4d7b3daf93a1?w=800', required: true },
      { id: 'team-1', label: 'Cabeleireiro', type: 'team', defaultUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc9?w=400', required: true, aspectRatio: '1/1' },
    ],
    features: [
      'Agendamento Online de ServiÃ§os (Dribbble-inspired)',
      'Galeria de TransformaÃ§Ãµes',
      'Perfis de Profissionais',
      'Venda de Produtos de Beleza',
      'Programa de Fidelidade',
      'Blog de Beleza e TendÃªncias',
    ],
    dribbbleInspiration: 'Dribbble Beauty & Wellness Designs',
    landbookStyle: 'Beauty & Wellness Service Pages',
  },

  // ===== GYM - Baseado em: Fitness Dribbble Designs =====
  {
    id: 'gym-bold-v5',
    name: 'Academia Premium',
    businessType: 'GYM',
    style: 'LANDING',
    description: 'Design energÃ©tico e motivacional para academias',
    layout: {
      hero: 'fullscreen',
      sections: ['hero', 'features', 'services', 'stats', 'testimonials', 'pricing', 'cta', 'contact'],
      designStyle: 'bold',
    },
    colors: DRIBBLE_COLORS.gym,
    fonts: { heading: "'Oswald', sans-serif", body: "'Roboto', sans-serif" },
    imageSlots: [
      { id: 'hero-bg', label: 'Academia Moderna', type: 'hero', defaultUrl: 'https://images.unsplash.com/photo-1534438327276-14e785d1dbe4?w=1920', required: true, aspectRatio: '16/9' },
      { id: 'equipment', label: 'Equipamento', type: 'feature', defaultUrl: 'https://images.unsplash.com/photo-1534438327276-14e785d1dbe4?w=800', required: true },
      { id: 'trainer', label: 'Personal Trainer', type: 'team', defaultUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400', required: true, aspectRatio: '1/1' },
    ],
    features: [
      'Planos de Treino Personalizados (Dribbble-inspired)',
      'Agendamento de Aulas',
      'Calculadora de IMC',
      'Loja de Suplementos',
      'Ãrea do Aluno',
      'Desafios Fitness',
    ],
    dribbbleInspiration: 'Dribbble Fitness & Gym Designs',
    landbookStyle: 'Fitness & Gym Landing Pages',
  },

  // ===== TECH - Baseado em: Design Monks, BotiFly (Dribbble) =====
  {
    id: 'tech-modern-v5',
    name: 'SaaS/Tech Premium',
    businessType: 'OTHER',
    style: 'LANDING',
    description: 'Design moderno e limpo para startups e SaaS baseado em agÃªncias top',
    layout: {
      hero: 'minimal',
      sections: ['hero', 'features', 'stats', 'testimonials', 'pricing', 'cta', 'contact'],
      designStyle: 'minimal',
    },
    colors: DRIBBLE_COLORS.tech,
    fonts: { heading: "'Inter', sans-serif", body: "'Inter', sans-serif" },
    imageSlots: [
      { id: 'hero-bg', label: 'Tech Modern', type: 'hero', defaultUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fb?w=1920', required: true, aspectRatio: '16/9' },
      { id: 'dashboard', label: 'Dashboard do App', type: 'feature', defaultUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', required: true },
      { id: 'team-1', label: 'Tech Team', type: 'team', defaultUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c7?w=800', required: false },
    ],
    features: [
      'Landing Page de Alta ConversÃ£o (Dribbble-inspired)',
      'SeÃ§Ã£o de PreÃ§os Animada',
      'IntegraÃ§Ã£o com API de Pagamentos',
      'Dashboard do UsuÃ¡rio',
      'Blog de Tecnologia',
      'Suporte via Chat 24/7',
    ],
    dribbbleInspiration: 'Design Monks, BotiFly, Pixxen Studio (Dribbble)',
    landbookStyle: 'SaaS & Tech Landing Pages',
  },
];

// ===== HELPER FUNCTIONS =====

// Get template by business type and optional style
export function getTemplateByType(businessType: BusinessType, style?: TemplateStyle): SiteTemplate | undefined {
  const filtered = templates.filter(t => t.businessType === businessType);
  if (style) {
    const withStyle = filtered.find(t => t.style === style);
    if (withStyle) return withStyle;
  }
  return filtered[0]; // Return first match
}

// Get template by ID
export function getTemplateById(id: string): SiteTemplate | undefined {
  return templates.find(t => t.id === id);
}

// Get all templates
export function getAllTemplates(): SiteTemplate[] {
  return templates;
}

// Helper to get business type label
export function getBusinessTypeLabel(type: BusinessType): string {
  const labels: Record<string, string> = {
    'RESTAURANT': 'Restaurante',
    'CLINIC': 'ClÃ­nica',
    'STORE': 'Loja',
    'SALON': 'SalÃ£o',
    'GYM': 'Academia',
    'HOTEL': 'Hotel',
    'LAWYER': 'Advocacia',
    'REAL_ESTATE': 'ImobiliÃ¡ria',
    'TECH': 'Tecnologia',
    'CONSULTING': 'Consultoria',
    'EDUCATION': 'EducaÃ§Ã£o',
    'FITNESS': 'Fitness',
    'SPA': 'SPA',
    'PET_SHOP': 'Pet Shop',
    'BAKERY': 'Padaria',
    'COFFEE': 'CafÃ©',
    'BAR': 'Bar',
    'NIGHTCLUB': 'Casa Noturna',
    'EVENTS': 'Eventos',
    'PHOTOGRAPHY': 'Fotografia',
    'DESIGN': 'Design',
    'AGENCY': 'AgÃªncia',
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
    'CONSTRUCTION': 'ConstruÃ§Ã£o',
    'AUTOMOTIVE': 'Automotivo',
    'TRAVEL': 'Viagens',
    'BEAUTY': 'Beleza',
    'FASHION': 'Moda',
    'JEWELRY': 'Joias',
    'ART': 'Arte',
    'MUSIC': 'MÃºsica',
    'NONPROFIT': 'Sem Fins Lucrativos',
  };
  return labels[type] || type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
}
