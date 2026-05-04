// ULTIMATE TEMPLATE SYSTEM v4.0
// Features:
// 1. Customizable image spaces for each business type
// 2. Objective-driven functionality (bookings->booking system, sales->e-commerce)
// 3. Research-based design variations per niche
// 4. Dynamic content based on what client wants to highlight

import { BusinessType } from '@prisma/client';

export interface ImageSlot {
  id: string;
  label: string;
  description: string;
  recommendedSize: string; // e.g., "1200x630px"
  required: boolean;
  suggestedImages: string[]; // Placeholder suggestions based on business type
}

export interface FunctionalFeature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  objectiveMatch: string[]; // Which objectives enable this feature
  component: string; // Component to render
}

export interface DesignTheme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  style: 'modern' | 'classic' | 'minimal' | 'bold' | 'elegant' | 'playful';
  mood: string; // e.g., "warm and inviting", "clean and professional"
  researchBasedOn: string; // What market research this is based on
}

export interface UltimateTemplateConfig {
  id: string;
  businessType: BusinessType;
  name: string;
  description: string;
  thumbnail: string;
  
  // Design theme based on research
  designTheme: DesignTheme;
  
  // Image slots for customization
  imageSlots: ImageSlot[];
  
  // Functional features driven by objectives
  features: FunctionalFeature[];
  
  // Default content with dynamic image placeholders
  defaultContent: any;
  
  // SEO and marketing defaults
  seoDefaults: {
    title: string;
    description: string;
    keywords: string[];
  };
}

// ==================== RESEARCH-BASED DESIGN THEMES ====================

const designThemes: Record<string, DesignTheme> = {
  'food-warm': {
    name: 'Food & Warm',
    colors: {
      primary: '#D97706', // Amber
      secondary: '#F59E0B',
      accent: '#DC2626', // Red for CTAs
      background: '#FFFBEB',
      text: '#1F2937',
    },
    fonts: {
      heading: 'Playfair Display, serif',
      body: 'Inter, sans-serif',
    },
    style: 'elegant',
    mood: 'warm, appetizing, and inviting - triggers hunger and comfort',
    researchBasedOn: 'Restaurant marketing studies show warm colors (red, orange, yellow) stimulate appetite and create cozy atmosphere',
  },
  'bar-nightlife': {
    name: 'Nightlife & Energy',
    colors: {
      primary: '#7C3AED', // Purple
      secondary: '#1F2937', // Dark gray
      accent: '#F59E0B', // Gold
      background: '#111827',
      text: '#F9FAFB',
    },
    fonts: {
      heading: 'Bebas Neue, sans-serif',
      body: 'Montserrat, sans-serif',
    },
    style: 'bold',
    mood: 'energetic, exciting, and sophisticated nightlife atmosphere',
    researchBasedOn: 'Nightlife venues use dark backgrounds with vibrant accents to create exclusivity and energy',
  },
  'health-trust': {
    name: 'Health & Trust',
    colors: {
      primary: '#0EA5E9', // Sky blue
      secondary: '#06B6D4',
      accent: '#10B981', // Green for health
      background: '#F0F9FF',
      text: '#0F172A',
    },
    fonts: {
      heading: 'Poppins, sans-serif',
      body: 'Open Sans, sans-serif',
    },
    style: 'modern',
    mood: 'trustworthy, clean, and professional - builds confidence in health services',
    researchBasedOn: 'Healthcare websites use blue (trust, cleanliness) and green (health, growth) to build patient confidence',
  },
  'beauty-elegant': {
    name: 'Beauty & Elegant',
    colors: {
      primary: '#EC4899', // Pink
      secondary: '#F472B6',
      accent: '#8B5CF6', // Purple
      background: '#FDF2F8',
      text: '#1F2937',
    },
    fonts: {
      heading: 'Cormorant Garamond, serif',
      body: 'Raleway, sans-serif',
    },
    style: 'elegant',
    mood: 'luxurious, elegant, and feminine - appeals to beauty-conscious clients',
    researchBasedOn: 'Beauty salons use soft pinks, purples, and elegant fonts to convey luxury and femininity',
  },
  'barber-masculine': {
    name: 'Barber & Masculine',
    colors: {
      primary: '#1F2937', // Dark gray
      secondary: '#92400E', // Brown
      accent: '#D97706', // Gold
      background: '#F9FAFB',
      text: '#111827',
    },
    fonts: {
      heading: 'Oswald, sans-serif',
      body: 'Roboto, sans-serif',
    },
    style: 'classic',
    mood: 'masculine, classic, and professional - traditional barbershop feel',
    researchBasedOn: 'Barbershops use dark colors, wood tones, and classic fonts to convey tradition and masculinity',
  },
  'tech-modern': {
    name: 'Tech & Modern',
    colors: {
      primary: '#3B82F6', // Blue
      secondary: '#6366F1', // Indigo
      accent: '#8B5CF6',
      background: '#FFFFFF',
      text: '#1E293B',
    },
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Roboto, sans-serif',
    },
    style: 'modern',
    mood: 'clean, minimal, and futuristic - conveys innovation and reliability',
    researchBasedOn: 'Tech stores use minimal designs, blue tones, and clean layouts to convey innovation and trust',
  },
  'wellness-zen': {
    name: 'Wellness & Zen',
    colors: {
      primary: '#059669', // Green
      secondary: '#A7F3D0',
      accent: '#F59E0B', // Warm accent
      background: '#F0FDF4',
      text: '#14532D',
    },
    fonts: {
      heading: 'Lora, serif',
      body: 'Nunito, sans-serif',
    },
    style: 'minimal',
    mood: 'calm, peaceful, and zen - promotes relaxation and wellbeing',
    researchBasedOn: 'Yoga/spa websites use greens, earth tones, and calm fonts to promote relaxation and mindfulness',
  },
  'retail-playful': {
    name: 'Retail & Playful',
    colors: {
      primary: '#F59E0B', // Orange
      secondary: '#10B981', // Green
      accent: '#EF4444', // Red
      background: '#FFFFFF',
      text: '#1F2937',
    },
    fonts: {
      heading: 'Fredoka One, sans-serif',
      body: 'Nunito, sans-serif',
    },
    style: 'playful',
    mood: 'fun, energetic, and approachable - great for retail and kids',
    researchBasedOn: 'Retail stores use bright, contrasting colors and playful fonts to attract attention and create excitement',
  },
  'automotive-strong': {
    name: 'Automotive & Strong',
    colors: {
      primary: '#1E40AF', // Blue
      secondary: '#DC2626', // Red
      accent: '#F59E0B', // Yellow
      background: '#F9FAFB',
      text: '#111827',
    },
    fonts: {
      heading: 'Teko, sans-serif',
      body: 'Barlow, sans-serif',
    },
    style: 'bold',
    mood: 'strong, reliable, and powerful - conveys automotive expertise',
    researchBasedOn: 'Automotive services use strong blues, reds, and bold fonts to convey power, reliability, and expertise',
  },
  'luxury-premium': {
    name: 'Luxury & Premium',
    colors: {
      primary: '#1F2937', // Black
      secondary: '#D4AF37', // Gold
      accent: '#B8860B',
      background: '#FFFFFF',
      text: '#1F2937',
    },
    fonts: {
      heading: 'Playfair Display, serif',
      body: 'Lato, sans-serif',
    },
    style: 'elegant',
    mood: 'luxurious, premium, and exclusive - appeals to high-end clients',
    researchBasedOn: 'Luxury brands use black, gold, serif fonts, and minimal layouts to convey exclusivity and premium quality',
  },
};

// ==================== OBJECTIVE-DRIVEN FEATURES ====================

function getFeaturesForObjective(objective: string): FunctionalFeature[] {
  const allFeatures: FunctionalFeature[] = [
    {
      id: 'booking-system',
      name: 'Sistema de Agendamento',
      description: 'Agendamento online com calendário, seleção de serviço e confirmação',
      enabled: false,
      objectiveMatch: ['get_bookings', 'showcase_portfolio'],
      component: 'BookingSystem',
    },
    {
      id: 'ecommerce',
      name: 'Loja Online (E-commerce)',
      description: 'Catálogo de produtos, carrinho de compras, checkout integrado',
      enabled: false,
      objectiveMatch: ['sell_online'],
      component: 'EcommerceStore',
    },
    {
      id: 'whatsapp-integration',
      name: 'Integração WhatsApp',
      description: 'Botão flutuante do WhatsApp, pedidos via chat, atendimento rápido',
      enabled: true, // Always enabled by default
      objectiveMatch: ['sell_online', 'get_bookings', 'generate_leads', 'increase_visibility'],
      component: 'WhatsAppButton',
    },
    {
      id: 'seo-optimization',
      name: 'SEO Otimizado',
      description: 'Meta tags, Google Maps, Schema.org, sitemap automático',
      enabled: false,
      objectiveMatch: ['increase_visibility', 'generate_leads'],
      component: 'SEOHead',
    },
    {
      id: 'contact-forms',
      name: 'Formulários de Contato',
      description: 'Formulário de lead capture, orçamentos, mensagens personalizadas',
      enabled: false,
      objectiveMatch: ['generate_leads', 'get_bookings'],
      component: 'ContactForm',
    },
    {
      id: 'gallery-portfolio',
      name: 'Galeria de Trabalhos',
      description: 'Portfólio em grid, lightbox para fotos, antes/depois',
      enabled: false,
      objectiveMatch: ['showcase_portfolio', 'increase_visibility'],
      component: 'GalleryGrid',
    },
    {
      id: 'menu-digital',
      name: 'Cardápio Digital',
      description: 'Cardápio interativo, fotos dos pratos, pedidos online',
      enabled: false,
      objectiveMatch: ['sell_online', 'increase_visibility'],
      component: 'DigitalMenu',
    },
    {
      id: 'testimonials',
      name: 'Depoimentos de Clientes',
      description: 'Carrossel de depoimentos, notas, fotos de clientes',
      enabled: false,
      objectiveMatch: ['increase_visibility', 'generate_leads'],
      component: 'TestimonialCarousel',
    },
    {
      id: 'google-maps',
      name: 'Google Maps Integrado',
      description: 'Mapa interativo, rota do cliente, localização em tempo real',
      enabled: false,
      objectiveMatch: ['increase_visibility'],
      component: 'GoogleMaps',
    },
    {
      id: 'social-media-feed',
      name: 'Feed do Instagram',
      description: 'Instagram embutido, fotos recentes, botão seguir',
      enabled: false,
      objectiveMatch: ['increase_visibility'],
      component: 'InstagramFeed',
    },
  ];

  // Enable features based on objective
  return allFeatures.map(feature => ({
    ...feature,
    enabled: feature.objectiveMatch.includes(objective) || feature.enabled, // Keep defaults enabled
  }));
}

// ==================== IMAGE SLOTS BY BUSINESS TYPE ====================

function getImageSlots(businessType: BusinessType): ImageSlot[] {
  const commonSlots: ImageSlot[] = [
    {
      id: 'hero-background',
      label: 'Imagem de Fundo do Hero',
      description: 'Imagem principal que aparece no topo do site. Deve representar bem o negócio.',
      recommendedSize: '1920x1080px',
      required: true,
      suggestedImages: [
        'https://images.unsplash.com/photo-1565299624946-05bd6c3524?w=1920', // Generic business
      ],
    },
    {
      id: 'about-image',
      label: 'Foto da Seção "Sobre"',
      description: 'Imagem da equipe, interior do estabelecimento ou processo de trabalho.',
      recommendedSize: '800x600px',
      required: false,
      suggestedImages: [],
    },
    {
      id: 'logo',
      label: 'Logo da Empresa',
      description: 'Logo em PNG com fundo transparente. Recomendado altura máxima de 60px.',
      recommendedSize: '200x60px (ou proporcional)',
      required: false,
      suggestedImages: [],
    },
  ];

  // Business-specific image slots
  const specificSlots: Record<BusinessType, ImageSlot[]> = {
    RESTAURANT: [
      {
        id: 'hero-background',
        label: 'Foto dos Pratos',
        description: 'Foto appetitosa do prato mais famoso do restaurante.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [
          'https://images.unsplash.com/photo-1565299624946-05bd6c3524?w=1920',
          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1920',
        ],
      },
      {
        id: 'menu-item-images',
        label: 'Fotos do Cardápio',
        description: 'Fotos de cada item do cardápio (hambúrgueres, pizzas, etc).',
        recommendedSize: '400x300px',
        required: true,
        suggestedImages: [
          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
        ],
      },

    ],
    BAR: [
      {
        id: 'hero-background',
        label: 'Foto do Bar/Drinks',
        description: 'Foto de drinks artesanais ou ambiente noturno.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [
          'https://images.unsplash.com/photo-1474542081594-c19b8c55015?w=1920',
        ],
      },
    ],
    PIZZERIA: [
      {
        id: 'hero-background',
        label: 'Foto de Pizzas',
        description: 'Foto de pizza recém-saída do forno.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [
          'https://images.unsplash.com/photo-1565299624946-05bd6c3524?w=1920',
        ],
      },
    ],
    SUSHI: [
      {
        id: 'hero-background',
        label: 'Foto de Sushi',
        description: 'Foto de sushi fresco e bem apresentado.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    ROTISSERIE: [
      {
        id: 'hero-background',
        label: 'Foto de Assados',
        description: 'Foto de frangos assados ou carnes grelhadas.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    BURGER_JOINT: [
      {
        id: 'hero-background',
        label: 'Foto de Hambúrgueres',
        description: 'Foto de hambúrguer suculento.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [
          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1920',
        ],
      },
    ],
    STEAKHOUSE: [
      {
        id: 'hero-background',
        label: 'Foto de Carnes',
        description: 'Foto de carnes no ponto certain.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    SEAFOOD: [
      {
        id: 'hero-background',
        label: 'Foto de Frutos do Mar',
        description: 'Foto de peixes e frutos do mar frescos.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    VEGAN: [
      {
        id: 'hero-background',
        label: 'Foto de Comida Vegana',
        description: 'Foto de pratos veganos coloridos e saudáveis.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    ICE_CREAM: [
      {
        id: 'hero-background',
        label: 'Foto de Sorvete',
        description: 'Foto de sorvetes coloridos e apetitosos.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    BAKERY: [
      {
        id: 'hero-background',
        label: 'Foto de Pães/Confeitaria',
        description: 'Foto de pães artesanais, bolos ou doces.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [
          'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1920',
        ],
      },
    ],
    CONFECTIONERY: [
      {
        id: 'hero-background',
        label: 'Foto de Doces',
        description: 'Foto de doces finos e confeitaria.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    CAFE: [
      {
        id: 'hero-background',
        label: 'Foto de Café',
        description: 'Foto de café artesanal e ambientes acolhedores.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    BREWERY: [
      {
        id: 'hero-background',
        label: 'Foto de Cervejaria',
        description: 'Foto de chopp fresca ou processo de fabricação.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    BARBERSHOP: [
      {
        id: 'hero-background',
        label: 'Foto do Barbearia',
        description: 'Interior da barbearia ou barbeiro trabalhando.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [
          'https://images.unsplash.com/photo-150395191487c8-24c8ecb37b12?w=1920',
        ],
      },
    ],
    SALON: [
      {
        id: 'hero-background',
        label: 'Foto do Salão',
        description: 'Interior do salão ou cabeleireiro trabalhando.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    SPA: [
      {
        id: 'hero-background',
        label: 'Foto do Spa',
        description: 'Ambiente relaxante e massagens.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    GYM: [
      {
        id: 'hero-background',
        label: 'Foto da Academia',
        description: 'Equipamentos modernos e pessoas se exercitando.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    YOGA_STUDIO: [
      {
        id: 'hero-background',
        label: 'Foto do Yoga',
        description: 'Aulas de yoga e bem-estar.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    DANCE_STUDIO: [
      {
        id: 'hero-background',
        label: 'Foto de Dança',
        description: 'Aulas de dança e estúdio.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    RETAIL: [
      {
        id: 'hero-background',
        label: 'Foto da Loja',
        description: 'Fachada da loja ou interior organizado.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    PET_SHOP: [
      {
        id: 'hero-background',
        label: 'Foto de Pets',
        description: 'Cachorro ou gato feliz, ou fachada da loja.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [
          'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=1920',
        ],
      },
    ],
    BOOKSTORE: [
      {
        id: 'hero-background',
        label: 'Foto da Livraria',
        description: 'Estantes de livros organizadas.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    FLORIST: [
      {
        id: 'hero-background',
        label: 'Foto de Flores',
        description: 'Arranjos florais coloridos.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    TOY_STORE: [
      {
        id: 'hero-background',
        label: 'Foto de Brinquedos',
        description: 'Loja de brinquedos colorida e divertida.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    SPORTS_STORE: [
      {
        id: 'hero-background',
        label: 'Foto de Esportes',
        description: 'Equipamentos esportivos e roupas.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    ELECTRONICS: [
      {
        id: 'hero-background',
        label: 'Foto de Produtos Tech',
        description: 'Smartphones, laptops ou setup tech.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [
          'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920',
        ],
      },
    ],
    CLOTHING: [
      {
        id: 'hero-background',
        label: 'Foto de Roupas',
        description: 'Roupas organizadas ou modelos usando.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    JEWELRY: [
      {
        id: 'hero-background',
        label: 'Foto de Joias',
        description: 'Joias elegantes e bem apresentadas.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    ART_GALLERY: [
      {
        id: 'hero-background',
        label: 'Foto da Galeria',
        description: 'Obras de arte e exposições.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    PHARMACY: [
      {
        id: 'hero-background',
        label: 'Foto da Farmácia',
        description: 'Fachada da farmácia ou balcão de medicamentos.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [
          'https://images.unsplash.com/photo-1576602976046-b78ca8040d85?w=1920',
        ],
      },
    ],
    CLINIC: [
      {
        id: 'hero-background',
        label: 'Foto da Clínica',
        description: 'Fachada da clínica ou consultório.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    DENTIST: [
      {
        id: 'hero-background',
        label: 'Foto do Dentista',
        description: 'Consultório odontológico moderno.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    OPTICS: [
      {
        id: 'hero-background',
        label: 'Foto da Ótica',
        description: 'Armações de óculos modernas.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    NUTRITIONIST: [
      {
        id: 'hero-background',
        label: 'Foto de Nutrição',
        description: 'Alimentos saudáveis e planos alimentares.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    CLEANING_SERVICE: [
      {
        id: 'hero-background',
        label: 'Foto de Limpeza',
        description: 'Profissionais de limpeza trabalhando.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    PLUMBING: [
      {
        id: 'hero-background',
        label: 'Foto de Encanamento',
        description: 'Encanador trabalhando ou ferramentas.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    ELECTRICIAN: [
      {
        id: 'hero-background',
        label: 'Foto de Elétrica',
        description: 'Eletricista trabalhando ou painel elétrico.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    LANDSCAPING: [
      {
        id: 'hero-background',
        label: 'Foto de Paisagismo',
        description: 'Jardins bem cuidados e paisagismo.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    MOVING: [
      {
        id: 'hero-background',
        label: 'Foto de Mudanças',
        description: 'Caminhão de mudança e embalagens.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    AUTOMOTIVE: [
      {
        id: 'hero-background',
        label: 'Foto de Oficina',
        description: 'Mecânico trabalhando ou oficina organizada.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    CAR_WASH: [
      {
        id: 'hero-background',
        label: 'Foto de Lavagem',
        description: 'Carro sendo lavado ou lavagem automática.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    TIRE_SHOP: [
      {
        id: 'hero-background',
        label: 'Foto de Pneus',
        description: 'Loja de pneus ou serviços de troca.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    DETAILING: [
      {
        id: 'hero-background',
        label: 'Foto de Estética',
        description: 'Carro passando por estética automotiva.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    TRAVEL_AGENCY: [
      {
        id: 'hero-background',
        label: 'Foto de Viagens',
        description: 'Destinos turísticos ou aviões.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    REAL_ESTATE: [
      {
        id: 'hero-background',
        label: 'Foto de Imóveis',
        description: 'Casas à venda ou corretores trabalhando.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    EVENT_PLANNER: [
      {
        id: 'hero-background',
        label: 'Foto de Eventos',
        description: 'Eventos sendo planejados ou decorados.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    PHOTOGRAPHER: [
      {
        id: 'hero-background',
        label: 'Foto de Fotografia',
        description: 'Fotógrafo trabalhando ou câmeras.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    HOTEL: [
      {
        id: 'hero-background',
        label: 'Foto de Hotel',
        description: 'Fachada do hotel ou quartos luxuosos.',
        recommendedSize: '1920x1080px',
        required: true,
        suggestedImages: [],
      },
    ],
    OTHER: [],
  };

  return [...commonSlots, ...(specificSlots[businessType] || [])];
}

// ==================== GENERATE ULTIMATE TEMPLATE ====================

export function generateUltimateTemplate(
  businessType: BusinessType,
  objective: string = 'increase_visibility'
): UltimateTemplateConfig {
  // Select design theme based on business type research
  const themeMap: Record<BusinessType, string> = {
    RESTAURANT: 'food-warm',
    BAR: 'bar-nightlife',
    PIZZERIA: 'food-warm',
    SUSHI: 'food-warm',
    ROTISSERIE: 'food-warm',
    BURGER_JOINT: 'food-warm',
    STEAKHOUSE: 'food-warm',
    SEAFOOD: 'food-warm',
    VEGAN: 'food-warm',
    ICE_CREAM: 'retail-playful',
    BAKERY: 'food-warm',
    CONFECTIONERY: 'food-warm',
    CAFE: 'food-warm',
    BREWERY: 'bar-nightlife',
    BARBERSHOP: 'barber-masculine',
    SALON: 'beauty-elegant',
    SPA: 'wellness-zen',
    GYM: 'wellness-zen',
    YOGA_STUDIO: 'wellness-zen',
    DANCE_STUDIO: 'wellness-zen',
    PHARMACY: 'health-trust',
    CLINIC: 'health-trust',
    DENTIST: 'health-trust',
    OPTICS: 'health-trust',
    NUTRITIONIST: 'health-trust',
    PET_SHOP: 'retail-playful',
    BOOKSTORE: 'tech-modern',
    FLORIST: 'wellness-zen',
    TOY_STORE: 'retail-playful',
    SPORTS_STORE: 'retail-playful',
    ELECTRONICS: 'tech-modern',
    CLOTHING: 'luxury-premium',
    JEWELRY: 'luxury-premium',
    ART_GALLERY: 'luxury-premium',
    CLEANING_SERVICE: 'tech-modern',
    PLUMBING: 'automotive-strong',
    ELECTRICIAN: 'automotive-strong',
    LANDSCAPING: 'wellness-zen',
    MOVING: 'automotive-strong',
    AUTOMOTIVE: 'automotive-strong',
    CAR_WASH: 'automotive-strong',
    TIRE_SHOP: 'automotive-strong',
    DETAILING: 'automotive-strong',
    TRAVEL_AGENCY: 'tech-modern',
    REAL_ESTATE: 'luxury-premium',
    EVENT_PLANNER: 'beauty-elegant',
    PHOTOGRAPHER: 'luxury-premium',
    HOTEL: 'luxury-premium',
    RETAIL: 'retail-playful',
    OTHER: 'tech-modern',
  };

  const themeKey = themeMap[businessType] || 'tech-modern';
  const theme = designThemes[themeKey];

  // Get features based on objective
  const features = getFeaturesForObjective(objective);

  // Get image slots
  const imageSlots = getImageSlots(businessType);

  return {
    id: `${businessType.toLowerCase()}-${objective}`,
    businessType,
    name: `Site para ${businessType}`,
    description: `Site otimizado para ${businessType} com foco em ${objective === 'get_bookings' ? 'agendamentos' : objective === 'sell_online' ? 'vendas online' : 'visibilidade'}`,
    thumbnail: `/templates/${businessType.toLowerCase()}.png`,
    designTheme: theme,
    imageSlots,
    features,
    defaultContent: generateDefaultContent(businessType, objective, theme),
    seoDefaults: {
      title: `{{businessName}} - ${getBusinessTypeName(businessType)}`,
      description: `{{businessDescription}}`,
      keywords: [businessType, objective, 'site profissional', 'online'],
    },
  };
}

function generateDefaultContent(businessType: BusinessType, objective: string, theme: DesignTheme) {
  const hasBooking = objective === 'get_bookings';
  const hasEcommerce = objective === 'sell_online';
  const hasPortfolio = objective === 'showcase_portfolio';

  return {
    design: {
      theme,
      customCSS: `/* Custom styles based on ${theme.name} theme */`,
    },
    hero: {
      title: '{{businessName}}',
      subtitle: getHeroSubtitle(businessType, objective),
      backgroundImage: '{{hero-background}}', // Dynamic image slot
      ctaText: getCTAText(objective),
      ctaLink: getCTALink(objective),
    },
    sections: [
      {
        type: 'about',
        title: 'Sobre Nós',
        content: {
          text: '{{businessDescription}}',
          image: '{{about-image}}',
        },
      },
      ...(hasBooking
        ? [
            {
              type: 'booking',
              title: 'Agende seu Horário',
              content: {
                message: 'Agende online de forma rápida e fácil',
                phone: '{{businessPhone}}',
                whatsapp: '{{businessPhone}}',
                availableTimes: 'Seg-Sex: 9h-18h | Sáb: 9h-13h',
                formFields: ['name', 'phone', 'date', 'time', 'service'],
              },
            },
          ]
        : []),
      ...(hasEcommerce || businessType === 'RESTAURANT' || businessType === 'BAKERY'
        ? [
            {
              type: 'menu',
              title: businessType === 'RESTAURANT' ? 'Nosso Cardápio' : 'Nossos Produtos',
              content: {
                categories: getDefaultCategories(businessType),
              },
            },
          ]
        : []),
      ...(hasPortfolio
        ? [
            {
              type: 'gallery',
              title: 'Nossos Trabalhos',
              content: {
                images: ['{{gallery-image-1}}', '{{gallery-image-2}}', '{{gallery-image-3}}'],
              },
            },
          ]
        : []),
      {
        type: 'contact',
        title: 'Contato',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 9h-18h',
          whatsapp: '{{businessPhone}}',
          socialMedia: ['Instagram', 'Facebook'],
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: 'https://wa.me/{{businessPhone}}' },
        { label: 'Instagram', href: '#' },
      ],
    },
  };
}

// ==================== HELPERS ====================

function getBusinessTypeName(type: BusinessType): string {
  const names: Record<BusinessType, string> = {
    RESTAURANT: 'Restaurante',
    BAR: 'Bar',
    PIZZERIA: 'Pizzaria',
    SUSHI: 'Sushi',
    ROTISSERIE: 'Rotisserie',
    BURGER_JOINT: 'Hamburgueria',
    STEAKHOUSE: 'Churrascaria',
    SEAFOOD: 'Frutos do Mar',
    VEGAN: 'Vegano',
    ICE_CREAM: 'Sorveteria',
    BAKERY: 'Padaria',
    CONFECTIONERY: 'Confeitaria',
    CAFE: 'Café',
    BREWERY: 'Cervejaria',
    BARBERSHOP: 'Barbearia',
    SALON: 'Salão de Beleza',
    SPA: 'Spa',
    GYM: 'Academia',
    YOGA_STUDIO: 'Yoga',
    DANCE_STUDIO: 'Dança',
    PHARMACY: 'Farmácia',
    CLINIC: 'Clínica',
    DENTIST: 'Dentista',
    OPTICS: 'Ótica',
    NUTRITIONIST: 'Nutricionista',
    PET_SHOP: 'Pet Shop',
    BOOKSTORE: 'Livraria',
    FLORIST: 'Floricultura',
    TOY_STORE: 'Brinquedos',
    SPORTS_STORE: 'Esportes',
    ELECTRONICS: 'Eletrônicos',
    CLOTHING: 'Roupas',
    JEWELRY: 'Joias',
    ART_GALLERY: 'Galeria de Arte',
    CLEANING_SERVICE: 'Limpeza',
    PLUMBING: 'Encanador',
    ELECTRICIAN: 'Eletricista',
    LANDSCAPING: 'Paisagismo',
    MOVING: 'Mudanças',
    AUTOMOTIVE: 'Automotiva',
    CAR_WASH: 'Lavagem de Carros',
    TIRE_SHOP: 'Pneus',
    DETAILING: 'Estética Automotiva',
    TRAVEL_AGENCY: 'Viagens',
    REAL_ESTATE: 'Imobiliária',
    EVENT_PLANNER: 'Eventos',
    PHOTOGRAPHER: 'Fotógrafo',
    HOTEL: 'Hotel',
    RETAIL: 'Loja',
    OTHER: 'Comércio',
  };
  return names[type] || type;
}

function getHeroSubtitle(businessType: BusinessType, objective: string): string {
  if (objective === 'get_bookings') return 'Agende seu horário online agora mesmo';
  if (objective === 'sell_online') return 'Compre online com facilidade';
  if (objective === 'showcase_portfolio') return 'Conheça nossos trabalhos';
  return 'O melhor da região. Atendimento de qualidade.';
}

function getCTAText(objective: string): string {
  if (objective === 'get_bookings') return 'Agendar Horário';
  if (objective === 'sell_online') return 'Comprar Agora';
  if (objective === 'generate_leads') return 'Fale Conosco';
  if (objective === 'showcase_portfolio') return 'Ver Portfólio';
  return 'Saiba Mais';
}

function getCTALink(objective: string): string {
  if (objective === 'get_bookings') return '#booking';
  if (objective === 'sell_online') return '#products';
  if (objective === 'showcase_portfolio') return '#gallery';
  return '#about';
}

function getDefaultCategories(businessType: BusinessType): any[] {
  if (businessType === 'RESTAURANT' || businessType === 'BURGER_JOINT') {
    return [
      {
        name: 'Pratos Principais',
        items: [
          { name: 'Especialidade da Casa', price: 39.9, description: 'Descrição do prato', image: '{{menu-item-1}}' },
        ],
      },
    ];
  }
  if (businessType === 'BAKERY') {
    return [
      {
        name: 'Pães',
        items: [
          { name: 'Pão Artesanal', price: 12.9, description: 'Pão caseiro', image: '{{product-1}}' },
        ],
      },
    ];
  }
  return [];
}

// Export all templates
export const ultimateTemplates: Record<string, UltimateTemplateConfig> = {
  'restaurant-bookings': generateUltimateTemplate('RESTAURANT', 'get_bookings'),
  'restaurant-sales': generateUltimateTemplate('RESTAURANT', 'sell_online'),
  'barber-bookings': generateUltimateTemplate('BARBERSHOP', 'get_bookings'),
  'barber-portfolio': generateUltimateTemplate('BARBERSHOP', 'showcase_portfolio'),
  'pharmacy-visibility': generateUltimateTemplate('PHARMACY', 'increase_visibility'),
  'bakery-sales': generateUltimateTemplate('BAKERY', 'sell_online'),
  'pet-shop-services': generateUltimateTemplate('PET_SHOP', 'get_bookings'),
  'electronics-sales': generateUltimateTemplate('ELECTRONICS', 'sell_online'),
};
