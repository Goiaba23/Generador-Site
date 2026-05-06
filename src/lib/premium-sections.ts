/**
 * WORLD CLASS DESIGN SYSTEM v8.0 - Premium Restaurant Templates
 * Baseado nos melhores designs do Dribbble
 * 
 * Seções inspiradas:
 * - Hero com_imagem_de_fundo
 * - Featured Dishes (cards com hover)
 * - Full Menu (categorizado)
 * - About/Story
 * - Reservations
 * - Testimonials
 * - Gallery
 * - Contact/Location
 */

import { BusinessType, TemplateStyle } from '@prisma/client';

// ===== PREMIUM IMAGES (Unsplash) =====

const PREMIUM_IMAGES = {
  restaurant: {
    hero: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34b4?w=1920&q=80',
    hero2: 'https://images.unsplash.com/photo-1552566626-6104e8e86d0c?w=1920&q=80',
    dishes: [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e83c?w=600&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
      'https://images.unsplash.com/photo-1482049016gy-1579029148949-0?w=600&q=80',
      'https://images.unsplash.com/photo-1540189549336-e6f2ee6581c1?w=600&q=80',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e045?w=800&q=80',
      'https://images.unsplash.com/photo-1424847650172-d7a3a8d5f6d9?w=800&q=80',
      'https://images.unsplash.com/photo-1559339352-11d588aa0619?w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34b4?w=800&q=80',
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80',
      'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80',
    ],
  },
  burger: {
    hero: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1920&q=80',
    dishes: [
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
      'https://images.unsplash.com/photo-1594212699903-ec8a3a50f15f?w=600&q=80',
      'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80',
      'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&q=80',
    ],
    gallery: [],
  },
  coffee: {
    hero: 'https://images.unsplash.com/photo-1495474472287-4d71bcd0bee7?w=1920&q=80',
    dishes: [
      'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&q=80',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80',
      'https://images.unsplash.com/photo-1498804103079-a6351b050736?w=600&q=80',
      'https://images.unsplash.com/photo-1514432324607-b09d9c1f5a56?w=600&q=80',
    ],
    gallery: [],
  },
  pizza: {
    hero: 'https://images.unsplash.com/photo-1513104890138-7c749659a388?w=1920&q=80',
    dishes: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
      'https://images.unsplash.com/photo-1574071318508-1a8590a4e7b2?w=600&q=80',
      'https://images.unsplash.com/photo-1595854341625-f71831d36e51?w=600&q=80',
      'https://images.unsplash.com/photo-1565299585326-f9a523d5e1c7?w=600&q=80',
    ],
    gallery: [],
  },
  spa: {
    hero: 'https://images.unsplash.com/photo-1544161515-4ab93ce6368e?w=1920&q=80',
    dishes: [],
    gallery: [],
  },
  clinic: {
    hero: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6e3d0?w=1920&q=80',
    dishes: [],
    gallery: [],
  },
  gym: {
    hero: 'https://images.unsplash.com/photo-1534438327276-14e5900c62dd?w=1920&q=80',
    dishes: [],
    gallery: [],
  },
};

// ===== DISHES SAMPLE DATA =====

const SAMPLE_DISHES = [
  { name: 'Filé Mignon', description: 'Corte nobre, grelhado no ponto perfeito', price: 'R$ 89,00', image: 0 },
  { name: 'Salmão Grelhado', description: 'Salmão fresco com ervas', price: 'R$ 75,00', image: 1 },
  { name: 'Risoto de Funghi', description: 'Arroz arbório com cogumelos', price: 'R$ 65,00', image: 2 },
  { name: 'Pasta do Chef', description: 'Massa artesanal caseira', price: 'R$ 55,00', image: 3 },
];

const SAMPLE_MENU_CATEGORIES = {
  entradas: [
    { name: 'Burrata Italiana', description: 'Queijo fresco com tomate e manjericão', price: 'R$ 45' },
    { name: 'Carpaccio', description: 'Finas fatias de filé com rúcula', price: 'R$ 52' },
    { name: 'Ceviche', description: 'Peixe fresco marinado', price: 'R$ 48' },
  ],
  principais: [
    { name: 'Filé Mignon', description: 'Corte 220g com molho pepper', price: 'R$ 89' },
    { name: 'Salmão', description: 'Salmão grelhado com legumes', price: 'R$ 75' },
    { name: 'Pato', description: 'Pato confitado com laranja', price: 'R$ 95' },
  ],
  sobremesas: [
    { name: 'Pudim', description: 'Pudim de leite condensado', price: 'R$ 25' },
    { name: 'Tiramisu', description: 'Sobremesa italiana clásica', price: 'R$ 32' },
    { name: 'Petit Gâteau', description: 'Bolo de chocolate quente', price: 'R$ 28' },
  ],
};

// ===== TESTIMONIALS =====

const SAMPLE_TESTIMONIALS = [
  { 
    name: 'Maria Silva', 
    text: 'Experiência incrível! O melhor/restaurante que já visitei. Comida deliciosa e ambiente encantador.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  { 
    name: 'João Santos', 
    text: 'Ambiente wonderful, atendimento impecável. Voltarei com certeza!',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  { 
    name: 'Pedro Oliveira', 
    text: 'Local perfeito para um jantar romântico. Recomendo a todos.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg'
  },
];

// ===== SITE SECTIONS CONFIG =====

export interface SiteSection {
  id: string;
  title: string;
  enabled: boolean;
  data?: any;
}

export interface RestaurantTemplate {
  businessType: string;
  hero: {
    style: 'fullscreen' | 'split' | 'centered' | 'with-image';
    backgroundImage?: string;
  };
  sections: SiteSection[];
  menuStyle: 'cards' | 'list' | 'categories';
  hasGallery: boolean;
  hasReservations: boolean;
  hasTestimonials: boolean;
}

// Template registry por tipo de negócio
export const RESTAURANT_TEMPLATES: Record<string, RestaurantTemplate> = {
  RESTAURANT: {
    businessType: 'RESTAURANT',
    hero: { style: 'with-image', backgroundImage: PREMIUM_IMAGES.restaurant.hero },
    sections: [
      { id: 'featured', title: 'Pratos em Destaque', enabled: true },
      { id: 'menu', title: 'Cardápio', enabled: true },
      { id: 'about', title: 'Nossa História', enabled: true },
      { id: 'testimonials', title: 'Depoimentos', enabled: true },
      { id: 'gallery', title: 'Galeria', enabled: true },
      { id: 'reservations', title: 'Reservas', enabled: true },
      { id: 'contact', title: 'Contato', enabled: true },
    ],
    menuStyle: 'categories',
    hasGallery: true,
    hasReservations: true,
    hasTestimonials: true,
  },
  BURGER_JOINT: {
    businessType: 'BURGER_JOINT',
    hero: { style: 'with-image', backgroundImage: PREMIUM_IMAGES.burger.hero },
    sections: [
      { id: 'menu', title: 'Cardápio', enabled: true },
      { id: 'featured', title: 'Mais Vendidos', enabled: true },
      { id: 'about', title: 'Nossa História', enabled: true },
      { id: 'testimonials', title: 'Depoimentos', enabled: true },
      { id: 'contact', title: 'Contato', enabled: true },
    ],
    menuStyle: 'cards',
    hasGallery: false,
    hasReservations: false,
    hasTestimonials: true,
  },
  PIZZERIA: {
    businessType: 'PIZZERIA',
    hero: { style: 'with-image', backgroundImage: PREMIUM_IMAGES.pizza.hero },
    sections: [
      { id: 'menu', title: 'Nossas Pizzas', enabled: true },
      { id: 'featured', title: 'Mais Pedidas', enabled: true },
      { id: 'about', title: 'Tradição Italiana', enabled: true },
      { id: 'testimonials', title: 'Opiniões', enabled: true },
      { id: 'contact', title: 'Contato', enabled: true },
    ],
    menuStyle: 'categories',
    hasGallery: false,
    hasReservations: false,
    hasTestimonials: true,
  },
  COFFEE_SHOP: {
    businessType: 'COFFEE_SHOP',
    hero: { style: 'with-image', backgroundImage: PREMIUM_IMAGES.coffee.hero },
    sections: [
      { id: 'menu', title: 'Cardápio', enabled: true },
      { id: 'about', title: 'Nossa História', enabled: true },
      { id: 'testimonials', title: 'Opiniões', enabled: true },
      { id: 'contact', title: 'Contato', enabled: true },
    ],
    menuStyle: 'list',
    hasGallery: false,
    hasReservations: false,
    hasTestimonials: true,
  },
  SALON: {
    businessType: 'SALON',
    hero: { style: 'fullscreen' },
    sections: [
      { id: 'services', title: 'Serviços', enabled: true },
      { id: 'portfolio', title: 'Trabajos Realizados', enabled: true },
      { id: 'about', title: 'Profissionais', enabled: true },
      { id: 'testimonials', title: 'Depoimentos', enabled: true },
      { id: 'contact', title: 'Contato', enabled: true },
    ],
    menuStyle: 'cards',
    hasGallery: true,
    hasReservations: true,
    hasTestimonials: true,
  },
  CLINIC: {
    businessType: 'CLINIC',
    hero: { style: 'split' },
    sections: [
      { id: 'services', title: 'Atendimentos', enabled: true },
      { id: 'about', title: 'Sobre Nós', enabled: true },
      { id: 'testimonials', title: 'Depoimentos', enabled: true },
      { id: 'contact', title: 'Contato', enabled: true },
    ],
    menuStyle: 'list',
    hasGallery: false,
    hasReservations: true,
    hasTestimonials: true,
  },
  GYM: {
    businessType: 'GYM',
    hero: { style: 'with-image', backgroundImage: PREMIUM_IMAGES.gym.hero },
    sections: [
      { id: 'plans', title: 'Planos', enabled: true },
      { id: 'classes', title: 'Aulas', enabled: true },
      { id: 'about', title: 'Estratégia', enabled: true },
      { id: 'testimonials', title: 'Transformações', enabled: true },
      { id: 'contact', title: 'Contato', enabled: true },
    ],
    menuStyle: 'cards',
    hasGallery: false,
    hasReservations: true,
    hasTestimonials: true,
  },
  default: {
    businessType: 'default',
    hero: { style: 'fullscreen' },
    sections: [
      { id: 'features', title: 'Serviços', enabled: true },
      { id: 'about', title: 'Sobre', enabled: true },
      { id: 'contact', title: 'Contato', enabled: true },
    ],
    menuStyle: 'cards',
    hasGallery: false,
    hasReservations: false,
    hasTestimonials: false,
  },
};

// ===== GET TEMPLATE FOR BUSINESS TYPE =====

export function getRestaurantTemplate(businessType: string): RestaurantTemplate {
  return RESTAURANT_TEMPLATES[businessType] || RESTAURANT_TEMPLATES.default;
}

export function getPremiumImages(businessType: string) {
  const key = businessType as keyof typeof PREMIUM_IMAGES;
  return PREMIUM_IMAGES[key] || PREMIUM_IMAGES.restaurant;
}

export { PREMIUM_IMAGES, SAMPLE_DISHES, SAMPLE_MENU_CATEGORIES, SAMPLE_TESTIMONIALS };