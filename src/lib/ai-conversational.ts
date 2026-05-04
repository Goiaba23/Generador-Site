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
  diferentiators: string[];
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
  const specificQuestions: Record<BusinessType, DiscoveryQuestion[]> = {
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
    PIZZERIA: [
      {
        id: 'pizzeria_focus',
        question: 'O que você quer promover na pizzaria?',
        type: 'multiple_choice',
        options: [
          { value: 'delivery', label: 'Delivery rápido', icon: 'truck' },
          { value: 'dine_in', label: 'Jantar no local', icon: 'chair' },
          { value: 'variety', label: 'Variedade de sabores', icon: 'pizza-slice' },
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
        question: 'O que torna seus hambúrgueres especiais?',
        type: 'multiple_choice',
        options: [
          { value: 'taste', label: 'Sabor único', icon: 'hamburger' },
          { value: 'delivery', label: 'Delivery rápido', icon: 'truck' },
          { value: 'customization', label: 'Monte seu burger', icon: 'sliders-h' },
        ],
      },
    ],
    STEAKHOUSE: [
      {
        id: 'steakhouse_focus',
        question: 'O que destacar na sua churrascaria?',
        type: 'multiple_choice',
        options: [
          { value: 'meat_quality', label: 'Qualidade das carnes', icon: 'drumstick-bite' },
          { value: 'variety', label: 'Variedade de cortes', icon: 'utensils' },
          { value: 'all_you_can_eat', label: 'Rodízio', icon: 'infinity' },
        ],
      },
    ],
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
        question: 'O que destacar na sua academia?',
        type: 'multiple_choice',
        options: [
          { value: 'equipment', label: 'Equipamentos modernos', icon: 'dumbbell' },
          { value: 'classes', label: 'Aulas coletivas', icon: 'users' },
          { value: 'personal', label: 'Personal trainers', icon: 'user-tie' },
        ],
      },
    ],
    YOGA_STUDIO: [
      {
        id: 'yoga_focus',
        question: 'O que promover no seu studio de yoga?',
        type: 'multiple_choice',
        options: [
          { value: 'classes', label: 'Tipos de aula', icon: 'peace' },
          { value: 'instructors', label: 'Instrutores', icon: 'user' },
          { value: 'benefits', label: 'Benefícios para saúde', icon: 'heartbeat' },
        ],
      },
    ],
    DANCE_STUDIO: [
      {
        id: 'dance_focus',
        question: 'Quais estilos de dança ensinar?',
        type: 'multiple_choice',
        options: [
          { value: 'ballet', label: 'Ballet', icon: 'music' },
          { value: 'contemporary', label: 'Contemporâneo', icon: 'running' },
          { value: 'urban', label: 'Danças urbanas', icon: 'city' },
        ],
      },
    ],
    RETAIL: [],
    PET_SHOP: [
      {
        id: 'pet_shop_focus',
        question: 'Quais serviços são prioritários?',
        type: 'multiple_choice',
        options: [
          { value: 'grooming', label: 'Banho e tosa (agendamento)', icon: 'bath' },
          { value: 'products', label: 'Venda de produtos', icon: 'paw' },
          { value: 'veterinary', label: 'Serviços veterinários', icon: 'stethoscope' },
          { value: 'boarding', label: 'Hospedagem para pets', icon: 'home' },
        ],
      },
    ],
    BOOKSTORE: [
      {
        id: 'bookstore_focus',
        question: 'O que destacar na livraria?',
        type: 'multiple_choice',
        options: [
          { value: 'variety', label: 'Variedade de livros', icon: 'book' },
          { value: 'events', label: 'Eventos literários', icon: 'calendar-star' },
          { value: 'online', label: 'Venda online', icon: 'shopping-cart' },
        ],
      },
    ],
    FLORIST: [
      {
        id: 'florist_focus',
        question: 'Quais arranjos promover?',
        type: 'multiple_choice',
        options: [
          { value: 'bouquets', label: 'Buquês', icon: 'flower' },
          { value: 'events', label: 'Decoração de eventos', icon: 'wedding-ring' },
          { value: 'plants', label: 'Plantas e suculentas', icon: 'leaf' },
        ],
      },
    ],
    TOY_STORE: [
      {
        id: 'toy_store_focus',
        question: 'O que destacar na loja de brinquedos?',
        type: 'multiple_choice',
        options: [
          { value: 'variety', label: 'Variedade de brinquedos', icon: 'puzzle-piece' },
          { value: 'educational', label: 'Brinquedos educativos', icon: 'graduation-cap' },
          { value: 'online', label: 'Venda online', icon: 'shopping-cart' },
        ],
      },
    ],
    ELECTRONICS: [
      {
        id: 'electronics_focus',
        question: 'O que destacar na loja de eletrônicos?',
        type: 'multiple_choice',
        options: [
          { value: 'latest', label: 'Últimos lançamentos', icon: 'mobile-alt' },
          { value: 'service', label: 'Assistência técnica', icon: 'tools' },
          { value: 'online', label: 'Venda online', icon: 'shopping-cart' },
        ],
      },
    ],
    SPORTS_STORE: [
      {
        id: 'sports_store_focus',
        question: 'Quais esportes atender?',
        type: 'multiple_choice',
        options: [
          { value: 'fitness', label: 'Academia e fitness', icon: 'dumbbell' },
          { value: 'team_sports', label: 'Esportes coletivos', icon: 'futbol' },
          { value: 'outdoor', label: 'Aventura e ar livre', icon: 'mountain' },
        ],
      },
    ],
    CLOTHING: [
      {
        id: 'clothing_focus',
        question: 'O que promover na loja de roupas?',
        type: 'multiple_choice',
        options: [
          { value: 'new_collection', label: 'Nova coleção', icon: 'tshirt' },
          { value: 'style', label: 'Estilo e moda', icon: 'palette' },
          { value: 'online', label: 'Loja virtual', icon: 'shopping-cart' },
        ],
      },
    ],
    JEWELRY: [
      {
        id: 'jewelry_focus',
        question: 'O que destacar na joalheria?',
        type: 'multiple_choice',
        options: [
          { value: 'craftsmanship', label: 'Artesanato fino', icon: 'gem' },
          { value: 'custom', label: 'Joias personalizadas', icon: 'ring' },
          { value: 'occasions', label: 'Para ocasiões especiais', icon: 'heart' },
        ],
      },
    ],
    ART_GALLERY: [
      {
        id: 'art_gallery_focus',
        question: 'O que promover na galeria?',
        type: 'multiple_choice',
        options: [
          { value: 'exhibitions', label: 'Exposições atuais', icon: 'image' },
          { value: 'artists', label: 'Artistas representados', icon: 'paint-brush' },
          { value: 'sales', label: 'Venda de obras', icon: 'shopping-cart' },
        ],
      },
    ],
    PHARMACY: [
      {
        id: 'pharmacy_focus',
        question: 'Quais serviços você quer destacar?',
        type: 'multiple_choice',
        options: [
          { value: 'prescription', label: 'Upload de receitas', icon: 'prescription-bottle' },
          { value: 'delivery', label: 'Entrega em domicílio', icon: 'truck' },
          { value: 'products', label: 'Catálogo de produtos', icon: 'pills' },
          { value: 'consultation', label: 'Orientação farmacêutica', icon: 'user-md' },
        ],
      },
    ],
    CLINIC: [
      {
        id: 'clinic_focus',
        question: 'Quais especialidades destacar?',
        type: 'multiple_choice',
        options: [
          { value: 'specialists', label: 'Médicos especialistas', icon: 'user-md' },
          { value: 'booking', label: 'Agendamento online', icon: 'calendar-check' },
          { value: 'exams', label: 'Exames laboratoriais', icon: 'vial' },
        ],
      },
    ],
    DENTIST: [
      {
        id: 'dentist_focus',
        question: 'Quais tratamentos promover?',
        type: 'multiple_choice',
        options: [
          { value: 'cosmetic', label: 'Odontologia estética', icon: 'smile' },
          { value: 'implants', label: 'Implantes dentários', icon: 'tooth' },
          { value: 'orthodontics', label: 'Ortodontia', icon: 'teeth-open' },
        ],
      },
    ],
    OPTICS: [
      {
        id: 'optics_focus',
        question: 'O que destacar na ótica?',
        type: 'multiple_choice',
        options: [
          { value: 'frames', label: 'Armações modernas', icon: 'glasses' },
          { value: 'exams', label: 'Exames de vista', icon: 'eye' },
          { value: 'lenses', label: 'Lentes de contato', icon: 'circle' },
        ],
      },
    ],
    NUTRITIONIST: [
      {
        id: 'nutritionist_focus',
        question: 'Como ajudar seus pacientes?',
        type: 'multiple_choice',
        options: [
          { value: 'weight_loss', label: 'Perda de peso', icon: 'weight' },
          { value: 'meal_plans', label: 'Planos alimentares', icon: 'utensils' },
          { value: 'booking', label: 'Consultas online', icon: 'video' },
        ],
      },
    ],
    CLEANING_SERVICE: [
      {
        id: 'cleaning_focus',
        question: 'Quais serviços de limpeza oferecer?',
        type: 'multiple_choice',
        options: [
          { value: 'residential', label: 'Residencial', icon: 'home' },
          { value: 'commercial', label: 'Comercial', icon: 'building' },
          { value: 'deep_clean', label: 'Limpeza pesada', icon: 'broom' },
        ],
      },
    ],
    PLUMBING: [
      {
        id: 'plumbing_focus',
        question: 'Quais serviços de encanamento?',
        type: 'multiple_choice',
        options: [
          { value: 'repairs', label: 'Reparos gerais', icon: 'wrench' },
          { value: 'installations', label: 'Instalações', icon: 'faucet' },
          { value: 'emergency', label: 'Emergências 24h', icon: 'clock' },
        ],
      },
    ],
    ELECTRICIAN: [
      {
        id: 'electrician_focus',
        question: 'Quais serviços elétricos?',
        type: 'multiple_choice',
        options: [
          { value: 'installations', label: 'Instalações', icon: 'bolt' },
          { value: 'repairs', label: 'Reparos', icon: 'tools' },
          { value: 'inspections', label: 'Inspeções', icon: 'clipboard-check' },
        ],
      },
    ],
    LANDSCAPING: [
      {
        id: 'landscaping_focus',
        question: 'Quais serviços de paisagismo?',
        type: 'multiple_choice',
        options: [
          { value: 'design', label: 'Design de jardins', icon: 'seedling' },
          { value: 'maintenance', label: 'Manutenção', icon: 'cut' },
          { value: 'irrigation', label: 'Sistemas de irrigação', icon: 'tint' },
        ],
      },
    ],
    MOVING: [
      {
        id: 'moving_focus',
        question: 'Quais serviços de mudança?',
        type: 'multiple_choice',
        options: [
          { value: 'residential', label: 'Residencial', icon: 'home' },
          { value: 'commercial', label: 'Comercial', icon: 'building' },
          { value: 'packing', label: 'Embalagem', icon: 'box' },
        ],
      },
    ],
    AUTOMOTIVE: [
      {
        id: 'automotive_focus',
        question: 'Quais serviços automotivos?',
        type: 'multiple_choice',
        options: [
          { value: 'mechanical', label: 'Mecânica geral', icon: 'car' },
          { value: 'parts', label: 'Autopeças', icon: 'cogs' },
          { value: 'diagnosis', label: 'Diagnóstico', icon: 'stethoscope' },
        ],
      },
    ],
    CAR_WASH: [
      {
        id: 'car_wash_focus',
        question: 'Quais serviços de lavagem?',
        type: 'multiple_choice',
        options: [
          { value: 'exterior', label: 'Lavagem externa', icon: 'car' },
          { value: 'interior', label: 'Higienização interna', icon: 'soap' },
          { value: 'polish', label: 'Polimento', icon: 'star' },
        ],
      },
    ],
    TIRE_SHOP: [
      {
        id: 'tire_shop_focus',
        question: 'Quais serviços com pneus?',
        type: 'multiple_choice',
        options: [
          { value: 'sales', label: 'Venda de pneus', icon: 'circle' },
          { value: 'alignment', label: 'Alinhamento e balanceamento', icon: 'car' },
          { value: 'repair', label: 'Conserto de pneus', icon: 'tools' },
        ],
      },
    ],
    DETAILING: [
      {
        id: 'detailing_focus',
        question: 'Quais serviços de estética automotiva?',
        type: 'multiple_choice',
        options: [
          { value: 'polish', label: 'Polimento', icon: 'star' },
          { value: 'protection', label: 'Proteção de pintura', icon: 'shield-alt' },
          { value: 'interior', label: 'Limpeza interna', icon: 'soap' },
        ],
      },
    ],
    TRAVEL_AGENCY: [
      {
        id: 'travel_focus',
        question: 'Quais tipos de viagens vender?',
        type: 'multiple_choice',
        options: [
          { value: 'leisure', label: 'Lazer', icon: 'umbrella-beach' },
          { value: 'business', label: 'Negócios', icon: 'briefcase' },
          { value: 'packages', label: 'Pacotes turísticos', icon: 'suitcase' },
        ],
      },
    ],
    REAL_ESTATE: [
      {
        id: 'real_estate_focus',
        question: 'Quais imóveis destacar?',
        type: 'multiple_choice',
        options: [
          { value: 'buy', label: 'Venda', icon: 'home' },
          { value: 'rent', label: 'Aluguel', icon: 'key' },
          { value: 'commercial', label: 'Comercial', icon: 'building' },
        ],
      },
    ],
    EVENT_PLANNER: [
      {
        id: 'event_focus',
        question: 'Quais tipos de eventos planejar?',
        type: 'multiple_choice',
        options: [
          { value: 'weddings', label: 'Casamentos', icon: 'wedding-ring' },
          { value: 'corporate', label: 'Corporativos', icon: 'briefcase' },
          { value: 'birthdays', label: 'Aniversários', icon: 'birthday-cake' },
        ],
      },
    ],
    PHOTOGRAPHER: [
      {
        id: 'photographer_focus',
        question: 'Quais especialidades fotográficas?',
        type: 'multiple_choice',
        options: [
          { value: 'portraits', label: 'Retratos', icon: 'camera' },
          { value: 'events', label: 'Eventos', icon: 'calendar-star' },
          { value: 'commercial', label: 'Comercial', icon: 'building' },
        ],
      },
    ],
    HOTEL: [
      {
        id: 'hotel_focus',
        question: 'O que destacar no hotel?',
        type: 'multiple_choice',
        options: [
          { value: 'rooms', label: 'Acomodações', icon: 'bed' },
          { value: 'amenities', label: 'Comodidades', icon: 'swimming-pool' },
          { value: 'location', label: 'Localização', icon: 'map-marker-alt' },
        ],
      },
    ],
    OTHER: [],
  };

  return [...baseQuestions, ...(specificQuestions[businessType] || [])];
}

export interface DiscoveryQuestion {
  id: string;
  question: string;
  type: 'single_choice' | 'multiple_choice' | 'text_input';
  options?: { value: string; label: string; icon?: string }[];
  placeholder?: string;
  allowMultiple?: boolean;
}

// Generate AI-powered insights based on discovery answers
export async function generateBusinessInsights(
  businessType: BusinessType,
  businessName: string,
  answers: Record<string, any>
): Promise<BusinessInsight> {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    // Return basic insights without AI
    return generateBasicInsights(businessType, answers);
  }

  try {
    const prompt = `You are a business consultant helping a ${getBusinessTypeLabel(businessType)} named "${businessName}".

Based on these answers about their business:
${JSON.stringify(answers, null, 2)}

Analyze and provide:
1. The main problems they're facing (categorize each)
2. Their primary and secondary objectives
3. Target audience insights
4. What makes them unique (diferentiators)
5. Recommended website strategy

Return JSON:
{
  "problems": [
    { "category": "visibility|sales|booking|competition|online_presence|customer_service|other", "description": "...", "urgency": "low|medium|high|critical" }
  ],
  "objectives": {
    "primary": "sell_online|get_bookings|increase_visibility|generate_leads|showcase_portfolio|informational",
    "secondary": ["..."],
    "targetMetric": "...",
    "timeline": "immediate|1_month|3_months|6_months|1_year"
  },
  "targetAudience": "...",
  "diferentiators": ["..."],
  "recommendedStyle": "CATALOG|BOOKING|PORTFOLIO|LANDING|ECOMMERCE|BLOG",
  "keyFeatures": ["..."],
  "messagingTone": "formal|casual|fun|luxury",
  "callsToAction": ["..."]
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert business consultant and web strategist. Return only valid JSON.',
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
      diferentiators: aiInsights.diferentiators || [],
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
    diferentiators: answers.diferencial ? [answers.diferencial] : [],
  };
}

// Helper to get human-readable business type
function getBusinessTypeLabel(type: BusinessType): string {
  const labels: Record<BusinessType, string> = {
    RESTAURANT: 'Restaurante/Hamburgueria',
    BAR: 'Bar/Bar e Lounge',
    PIZZERIA: 'Pizzaria',
    SUSHI: 'Sushi/Japonês',
    ROTISSERIE: 'Rotisserie/Grelhados',
    BURGER_JOINT: 'Hamburgueria',
    STEAKHOUSE: 'Churrascaria',
    SEAFOOD: 'Frutos do Mar',
    VEGAN: 'Vegano',
    ICE_CREAM: 'Sorveteria',
    BAKERY: 'Padaria/Confeitaria',
    CONFECTIONERY: 'Confeitaria',
    CAFE: 'Café',
    BREWERY: 'Cervejaria Artesanal',
    BARBERSHOP: 'Barbearia',
    SALON: 'Salão de Beleza',
    SPA: 'Spa & Wellness',
    GYM: 'Academia',
    YOGA_STUDIO: 'Yoga Studio',
    DANCE_STUDIO: 'Dança Studio',
    RETAIL: 'Loja',
    PET_SHOP: 'Pet Shop',
    BOOKSTORE: 'Livraria',
    FLORIST: 'Floricultura',
    TOY_STORE: 'Loja de Brinquedos',
    ELECTRONICS: 'Loja de Eletrônicos',
    CLOTHING: 'Loja de Roupas',
    JEWELRY: 'Joalheria',
    ART_GALLERY: 'Galeria de Arte',
    PHARMACY: 'Farmácia',
    CLINIC: 'Clínica Médica',
    DENTIST: 'Dentista',
    OPTICS: 'Ótica',
    NUTRITIONIST: 'Nutricionista',
    CLEANING_SERVICE: 'Serviço de Limpeza',
    PLUMBING: 'Encanador',
    ELECTRICIAN: 'Eletricista',
    LANDSCAPING: 'Paisagismo',
    MOVING: 'Mudanças',
    AUTOMOTIVE: 'Oficina/Autopeças',
    CAR_WASH: 'Lavagem de Carros',
    TIRE_SHOP: 'Pneus/Tire Shop',
    DETAILING: 'Estética Automotiva',
    TRAVEL_AGENCY: 'Agência de Viagens',
    REAL_ESTATE: 'Imobiliária',
    EVENT_PLANNER: 'Eventos',
    PHOTOGRAPHER: 'Fotógrafo',
    HOTEL: 'Hotel',
    SPORTS_STORE: 'Loja de Artigos Esportivos',
    OTHER: 'Outro Comércio',
  };
  return labels[type] || type;
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
        title: 'Por que escolher a {{businessName}}?',
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
    content.hero.subtitle = `${content.hero.subtitle} ⚡ Atendimento imediato disponível!`;
  }

  return content;
}
