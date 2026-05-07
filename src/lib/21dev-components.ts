// 21dev Components Library for Premium Sites v6.0
// Integration with 21dev AI-powered component generation

export interface Component21Dev {
  id: string;
  name: string;
  category: 'hero' | 'features' | 'testimonials' | 'cta' | 'footer' | 'navigation' | 'card' | 'form';
  businessTypes: string[];
  animationType: string;
  hasGlow: boolean;
  hasGlassmorphism: boolean;
  code: string;
  previewUrl?: string;
}

export interface ComponentRequest {
  businessType: string;
  category: string;
  style: string;
  withAnimations: boolean;
  withGlassmorphism: boolean;
}

// Get 21dev components for specific niche
export function getComponentsForNiche(businessType: string): Component21Dev[] {
  const componentMap: Record<string, Component21Dev[]> = {
    'VETERINARY': [
      {
        id: '21dev-hero-vet',
        name: 'Hero Veterinária Modern',
        category: 'hero',
        businessTypes: ['VETERINARY', 'PET_SHOP', 'CLINIC'],
        animationType: 'fade-in-up',
        hasGlow: true,
        hasGlassmorphism: true,
        code: `
<section className="hero-vet">
  <div className="hero-overlay" />
  <div className="hero-content">
    <h1 className="hero-title">Cuidamos do seu Pet</h1>
    <p className="hero-subtitle">Veterinários especializados 24h</p>
    <button className="hero-cta">Agendar Consulta</button>
  </div>
</section>`,
      },
      {
        id: '21dev-service-card-vet',
        name: 'Service Card Vet',
        category: 'card',
        businessTypes: ['VETERINARY', 'CLINIC', 'SPA'],
        animationType: 'hover-lift',
        hasGlow: false,
        hasGlassmorphism: true,
        code: `
<div className="service-card">
  <div className="service-icon">{{icon}}</div>
  <h3>{{name}}</h3>
  <p>{{description}}</p>
  <span className="price">{{price}}</span>
</div>`,
      },
    ],
    'HOTEL': [
      {
        id: '21dev-hero-hotel',
        name: 'Hero Hotel Luxury',
        category: 'hero',
        businessTypes: ['HOTEL', 'RESORT', 'SPA'],
        animationType: 'fade-in-up',
        hasGlow: true,
        hasGlassmorphism: true,
        code: `
<section className="hero-hotel">
  <div className="hero-overlay" />
  <div className="hero-content">
    <h1 className="hero-title">Bem-vindo ao Paraíso</h1>
    <p className="hero-subtitle">Hospedagem de luxo com vista para o mar</p>
    <button className="hero-cta">Reservar Agora</button>
  </div>
</section>`,
      },
      {
        id: '21dev-room-card',
        name: 'Room Card Premium',
        category: 'card',
        businessTypes: ['HOTEL', 'RESORT', 'HOSTEL'],
        animationType: 'hover-lift',
        hasGlow: false,
        hasGlassmorphism: true,
        code: `
<div className="room-card">
  <img src="{{image}}" alt="{{name}}" />
  <div className="room-info">
    <h3>{{name}}</h3>
    <p>{{description}}</p>
    <span className="price">R$ {{price}}/noite</span>
  </div>
</div>`,
      },
    ],
    'GYM': [
      {
        id: '21dev-hero-gym',
        name: 'Hero Academia/Ginásio',
        category: 'hero',
        businessTypes: ['GYM', 'FITNESS', 'PERSONAL_TRAINING'],
        animationType: 'slide-up',
        hasGlow: true,
        hasGlassmorphism: false,
        code: `
<section className="hero-gym">
  <div className="hero-gradient" />
  <h1 className="hero-title">Forge seu Corpo</h1>
  <p className="hero-subtitle">Equipamentos de última geração</p>
  <button className="hero-cta">Começar Agora</button>
</section>`,
      },
    ],
    'PERSONAL_TRAINING': [
      {
        id: '21dev-service-personal',
        name: 'Personal Training Card',
        category: 'card',
        businessTypes: ['PERSONAL_TRAINING', 'FITNESS', 'HEALTH'],
        animationType: 'hover-lift',
        hasGlow: false,
        hasGlassmorphism: true,
        code: `
<div className="personal-card">
  <div className="trainer-photo">{{photo}}</div>
  <h3>{{name}}</h3>
  <p>{{specialty}}</p>
  <span className="rating">★ ★ ★ ★ ★</span>
</div>`,
      },
    ],
    'HOSTEL': [
      {
        id: '21dev-hero-hostel',
        name: 'Hero Hostel Economico',
        category: 'hero',
        businessTypes: ['HOSTEL', 'HOTEL', 'TRAVEL'],
        animationType: 'fade-in-up',
        hasGlow: true,
        hasGlassmorphism: true,
        code: `
<section className="hero-hostel">
  <div className="hero-overlay" />
  <div className="hero-content">
    <h1 className="hero-title">Hospedagem Econômica</h1>
    <p className="hero-subtitle">Conforto e preço justo</p>
    <button className="hero-cta">Reservar Agora</button>
  </div>
</section>`,
      },
    ],
    'RESORT': [
      {
        id: '21dev-hero-resort',
        name: 'Hero Resort Luxuoso',
        category: 'hero',
        businessTypes: ['RESORT', 'HOTEL', 'SPA'],
        animationType: 'fade-in',
        hasGlow: true,
        hasGlassmorphism: true,
        code: `
<section className="hero-resort">
  <div className="hero-video-bg" />
  <h1 className="hero-title">Paraíso Tropical</h1>
  <p className="hero-subtitle">Experiência all-inclusive</p>
  <button className="hero-cta">Reservar Suíte</button>
</section>`,
      },
    ],
    'CAFE_BAKERY': [
      {
        id: '21dev-hero-cafe-bakery',
        name: 'Hero Café e Padaria',
        category: 'hero',
        businessTypes: ['CAFE_BAKERY', 'COFFEE', 'BAKERY'],
        animationType: 'slide-up',
        hasGlow: false,
        hasGlassmorphism: true,
        code: `
<section className="hero-cafe-bakery">
  <div className="hero-gradient" />
  <h1 className="hero-title">Café & Padaria Artesanal</h1>
  <p className="hero-subtitle">Grãos selecionados e pães artesanais</p>
  <button className="hero-cta">Fazer Pedido</button>
</section>`,
      },
    ],
    'FOOD_TRUCK': [
      {
        id: '21dev-hero-food-truck',
        name: 'Hero Food Truck',
        category: 'hero',
        businessTypes: ['FOOD_TRUCK', 'RESTAURANT', 'FAST_FOOD'],
        animationType: 'fade-in-up',
        hasGlow: true,
        hasGlassmorphism: false,
        code: `
<section className="hero-food-truck">
  <div className="hero-overlay" />
  <h1 className="hero-title">Sabor sobre Rodas</h1>
  <p className="hero-subtitle">Gastronomia móvel de alta qualidade</p>
  <button className="hero-cta">Ver Localização</button>
</section>`,
      },
    ],
    'NIGHTCLUB': [
      {
        id: '21dev-hero-nightclub',
        name: 'Hero Nightclub Vibrante',
        category: 'hero',
        businessTypes: ['NIGHTCLUB', 'BAR', 'ENTERTAINMENT'],
        animationType: 'slide-up',
        hasGlow: true,
        hasGlassmorphism: false,
        code: `
<section className="hero-nightclub">
  <div className="hero-gradient" />
  <h1 className="hero-title">Noite Inesquecível</h1>
  <p className="hero-subtitle">A melhor experiência noturna da cidade</p>
  <button className="hero-cta">Reservar Mesa</button>
</section>`,
      },
    ],
    'THEATER': [
      {
        id: '21dev-hero-theater',
        name: 'Hero Teatro Cultural',
        category: 'hero',
        businessTypes: ['THEATER', 'ART', 'CULTURE'],
        animationType: 'fade-in',
        hasGlow: true,
        hasGlassmorphism: true,
        code: `
<section className="hero-theater">
  <div className="hero-overlay" />
  <div className="hero-content">
    <h1 className="hero-title">Arte e Cultura</h1>
    <p className="hero-subtitle">Espetáculos únicos para toda família</p>
    <button className="hero-cta">Comprar Ingressos</button>
  </div>
</section>`,
      },
    ],
    'MUSIC_SCHOOL': [
      {
        id: '21dev-hero-music',
        name: 'Hero Escola de Música',
        category: 'hero',
        businessTypes: ['MUSIC_SCHOOL', 'ART', 'EDUCATION'],
        animationType: 'fade-in-up',
        hasGlow: false,
        hasGlassmorphism: true,
        code: `
<section className="hero-music">
  <div className="hero-video-bg" />
  <h1 className="hero-title">Aprenda Música</h1>
  <p className="hero-subtitle">Aulas particulares e em grupo</p>
  <button className="hero-cta">Agendar Aula</button>
</section>`,
      },
    ],
    'INSURANCE': [
      {
        id: '21dev-hero-insurance',
        name: 'Hero Corretora de Seguros',
        category: 'hero',
        businessTypes: ['INSURANCE', 'FINANCE', 'CONSULTING'],
        animationType: 'slide-up',
        hasGlow: true,
        hasGlassmorphism: true,
        code: `
<section className="hero-insurance">
  <div className="hero-overlay" />
  <div className="hero-content">
    <h1 className="hero-title">Proteção que você Precisa</h1>
    <p className="hero-subtitle">Seguros personalizados para você</p>
    <button className="hero-cta">Cotar Seguro</button>
  </div>
</section>`,
      },
    ],
    'ACCOUNTING': [
      {
        id: '21dev-hero-accounting',
        name: 'Hero Contabilidade',
        category: 'hero',
        businessTypes: ['ACCOUNTING', 'FINANCE', 'CONSULTING'],
        animationType: 'fade-in-up',
        hasGlow: false,
        hasGlassmorphism: true,
        code: `
<section className="hero-accounting">
  <div className="hero-gradient" />
  <h1 className="hero-title">Contabilidade Profissional</h1>
  <p className="hero-subtitle">Gestão financeira completa</p>
  <button className="hero-cta">Consultar Agora</button>
</section>`,
      },
    ],
    'FARM': [
      {
        id: '21dev-hero-farm',
        name: 'Hero Farmácia Moderna',
        category: 'hero',
        businessTypes: ['FARM', 'DRUGSTORE', 'HEALTH'],
        animationType: 'fade-in-up',
        hasGlow: true,
        hasGlassmorphism: true,
        code: `
<section className="hero-farm">
  <div className="hero-overlay" />
  <div className="hero-content">
    <h1 className="hero-title">Saúde ao seu Alcance</h1>
    <p className="hero-subtitle">Medicamentos e produtos de beleza</p>
    <button className="hero-cta">Comprar Agora</button>
  </div>
</section>`,
      },
    ],
    'FITNESS': [
      {
        id: '21dev-hero-fitness',
        name: 'Hero Academia Motivacional',
        category: 'hero',
        businessTypes: ['FITNESS', 'GYM', 'PERSONAL_TRAINING'],
        animationType: 'slide-up',
        hasGlow: true,
        hasGlassmorphism: false,
        code: `
<section className="hero-fitness">
  <div className="hero-gradient" />
  <h1 className="hero-title">Transforme seu Corpo</h1>
  <p className="hero-subtitle">Treinos personalizados para seus objetivos</p>
  <button className="hero-cta">Começar Agora</button>
</section>`,
      },
      {
        id: '21dev-pricing-card',
        name: 'Pricing Card Fitness',
        category: 'card',
        businessTypes: ['FITNESS', 'GYM', 'CONSULTING'],
        animationType: 'hover-zoom',
        hasGlow: false,
        hasGlassmorphism: true,
        code: `
<div className="pricing-card">
  <h3>{{plan}}</h3>
  <div className="price">R$ {{price}}<span>/mês</span></div>
  <ul className="features">{{#each features}}<li>✓ {{this}}</li>{{/each}}</ul>
  <button className="select-plan">Escolher Plano</button>
</div>`,
      },
    ],
    'CONSULTING': [
      {
        id: '21dev-hero-consulting',
        name: 'Hero Consultoria Profissional',
        category: 'hero',
        businessTypes: ['CONSULTING', 'FINANCE', 'LAW'],
        animationType: 'fade-in-up',
        hasGlow: true,
        hasGlassmorphism: true,
        code: `
<section className="hero-consulting">
  <div className="hero-overlay" />
  <div className="hero-content">
    <h1 className="hero-title">Resultados que Importam</h1>
    <p className="hero-subtitle">Consultoria especializada para seu negócio</p>
    <button className="hero-cta">Agendar Consultoria</button>
  </div>
</section>`,
      },
    ],
    'LAW': [
      {
        id: '21dev-hero-law',
        name: 'Hero Escritório de Advocacia',
        category: 'hero',
        businessTypes: ['LAW', 'CONSULTING', 'FINANCE'],
        animationType: 'slide-up',
        hasGlow: true,
        hasGlassmorphism: true,
        code: `
<section className="hero-law">
  <div className="hero-gradient" />
  <h1 className="hero-title">Justiça e Excelência</h1>
  <p className="hero-subtitle">Defesa jurídica especializada</p>
  <button className="hero-cta">Consultar Agora</button>
</section>`,
      },
    ],
    'REAL_ESTATE': [
      {
        id: '21dev-property-card',
        name: 'Property Card Real Estate',
        category: 'card',
        businessTypes: ['REAL_ESTATE', 'CONSTRUCTION', 'ARCHITECTURE'],
        animationType: 'hover-zoom',
        hasGlow: false,
        hasGlassmorphism: true,
        code: `
<div className="property-card">
  <img src="{{image}}" alt="{{title}}" />
  <div className="property-info">
    <h3>{{title}}</h3>
    <p>{{address}}</p>
    <span className="price">R$ {{price}}</span>
  </div>
</div>`,
      },
    ],
    'EDUCATION': [
      {
        id: '21dev-course-card',
        name: 'Course Card Education',
        category: 'card',
        businessTypes: ['EDUCATION', 'TRAINING', 'COACHING'],
        animationType: 'hover-lift',
        hasGlow: false,
        hasGlassmorphism: true,
        code: `
<div className="course-card">
  <div className="course-image">{{image}}</div>
  <h3>{{name}}</h3>
  <p>{{description}}</p>
  <span className="price">R$ {{price}}</span>
  <button className="enroll-btn">Matricular-se</button>
</div>`,
      },
    ],
    'AI_AGENCY': [
      {
        id: '21dev-hero-ai-agency',
        name: 'Hero AI Agency Futuristic',
        category: 'hero',
        businessTypes: ['AI_AGENCY', 'TECH', 'SAAS'],
        animationType: 'slide-up',
        hasGlow: true,
        hasGlassmorphism: false,
        code: `
<section className="hero-ai-agency">
  <div className="hero-gradient" />
  <div className="hero-content">
    <h1 className="hero-title">Transforme com IA</h1>
    <p className="hero-subtitle">Soluções inteligentes para seu negócio</p>
    <button className="hero-cta">Começar Agora</button>
  </div>
</section>`,
      },
      {
        id: '21dev-service-ai',
        name: 'AI Service Card',
        category: 'card',
        businessTypes: ['AI_AGENCY', 'TECH', 'CONSULTING'],
        animationType: 'hover-lift',
        hasGlow: true,
        hasGlassmorphism: true,
        code: `
<div className="service-ai-card">
  <div className="service-icon">{{icon}}</div>
  <h3>{{name}}</h3>
  <p>{{description}}</p>
  <div className="features">
    {{#each features}}<span>✓ {{this}}</span>{{/each}}
  </div>
</div>`,
      },
    ],
    'HEALTH': [
      {
        id: '21dev-hero-health',
        name: 'Hero Clínica Moderna',
        category: 'hero',
        businessTypes: ['HEALTH', 'CLINIC', 'HOSPITAL'],
        animationType: 'fade-in-up',
        hasGlow: true,
        hasGlassmorphism: true,
        code: `
<section className="hero-health">
  <div className="hero-overlay" />
  <div className="hero-content">
    <h1 className="hero-title">Sua Saúde em Primeiro Lugar</h1>
    <p className="hero-subtitle">Atendimento médico especializado</p>
    <button className="hero-cta">Agendar Consulta</button>
  </div>
</section>`,
      },
      {
        id: '21dev-service-list-health',
        name: 'Service List Health',
        category: 'features',
        businessTypes: ['HEALTH', 'CLINIC', 'DENTIST'],
        animationType: 'stagger-fade',
        hasGlow: false,
        hasGlassmorphism: true,
        code: `
<div className="service-list">
  {{#each services}}
  <div className="service-item">
    <div className="service-icon">{{icon}}</div>
    <h3>{{name}}</h3>
    <p>{{description}}</p>
  </div>
  {{/each}}
</div>`,
      },
    ],
    'BARBERSHOP': [
      {
        id: '21dev-hero-barber',
        name: 'Hero Barbearia Premium',
        category: 'hero',
        businessTypes: ['BARBERSHOP', 'SALON', 'BEAUTY'],
        animationType: 'slide-up',
        hasGlow: true,
        hasGlassmorphism: false,
        code: `
<section className="hero-barber">
  <div className="hero-video-bg" />
  <h1 className="hero-title">Estilo e Tradição</h1>
  <p className="hero-subtitle">A verdadeira experiência masculina</p>
  <button className="hero-cta">Agendar Horário</button>
</section>`,
      },
    ],
    'WELLNESS': [
      {
        id: '21dev-hero-wellness',
        name: 'Hero Wellness Completo',
        category: 'hero',
        businessTypes: ['WELLNESS', 'SPA', 'YOGA'],
        animationType: 'fade-in',
        hasGlow: true,
        hasGlassmorphism: true,
        code: `
<section className="hero-wellness">
  <div className="hero-overlay" />
  <div className="hero-content">
    <h1 className="hero-title">Bem-estar Completo</h1>
    <p className="hero-subtitle">Sua jornada para uma vida melhor</p>
    <button className="hero-cta">Começar Agora</button>
  </div>
</section>`,
      },
    ],
    'BAKERY': [
      {
        id: '21dev-hero-bakery',
        name: 'Hero Padaria Artesanal',
        category: 'hero',
        businessTypes: ['BAKERY', 'COFFEE', 'CAFE_BAKERY'],
        animationType: 'slide-up',
        hasGlow: false,
        hasGlassmorphism: true,
        code: `
<section className="hero-bakery">
  <div className="hero-video-bg" />
  <h1 className="hero-title">Sabor Artesanal</h1>
  <p className="hero-subtitle">Pães e doces feitos com amor</p>
  <button className="hero-cta">Fazer Pedido</button>
</section>`,
      },
    ],
    'PIZZERIA': [
      {
        id: '21dev-hero-pizzeria',
        name: 'Hero Pizzaria Deliciosa',
        category: 'hero',
        businessTypes: ['PIZZERIA', 'RESTAURANT', 'FOOD_TRUCK'],
        animationType: 'fade-in-up',
        hasGlow: true,
        hasGlassmorphism: false,
        code: `
<section className="hero-pizzeria">
  <div className="hero-gradient" />
  <h1 className="hero-title">Pizza Autêntica</h1>
  <p className="hero-subtitle">Ingredientes frescos e forno à lenha</p>
  <button className="hero-cta">Pedir pelo WhatsApp</button>
</section>`,
      },
    ],
    'DENTIST': [
      {
        id: '21dev-hero-dentist',
        name: 'Hero Consultório Dentário',
        category: 'hero',
        businessTypes: ['DENTIST', 'HEALTH', 'CLINIC'],
        animationType: 'fade-in',
        hasGlow: true,
        hasGlassmorphism: true,
        code: `
<section className="hero-dentist">
  <div className="hero-overlay" />
  <h1 className="hero-title">Seu Sorriso Perfeito</h1>
  <p className="hero-subtitle">Odontologia estética e reconstrução</p>
  <button className="hero-cta">Agendar Consulta</button>
</section>`,
      },
    ],
    'STARTUP': [
      {
        id: '21dev-hero-startup',
        name: 'Hero Startup Inovadora',
        category: 'hero',
        businessTypes: ['STARTUP', 'TECH', 'SAAS'],
        animationType: 'slide-up',
        hasGlow: true,
        hasGlassmorphism: false,
        code: `
<section className="hero-startup">
  <div className="hero-gradient" />
  <h1 className="hero-title">Inove seu Futuro</h1>
  <p className="hero-subtitle">Soluções tecnológicas disruptivas</p>
  <button className="hero-cta">Começar Agora</button>
</section>`,
      },
    ],
    'ECOMMERCE': [
      {
        id: '21dev-product-grid',
        name: 'Product Grid Ecommerce',
        category: 'card',
        businessTypes: ['ECOMMERCE', 'RETAIL', 'STORE'],
        animationType: 'hover-zoom',
        hasGlow: false,
        hasGlassmorphism: true,
        code: `
<div className="product-grid">
  {{#each products}}
  <div className="product-card">
    <img src="{{image}}" alt="{{name}}" />
    <h3>{{name}}</h3>
    <span className="price">R$ {{price}}</span>
    <button className="buy-btn">Comprar</button>
  </div>
  {{/each}}
</div>`,
      },
    ],
    'FINANCE': [
      {
        id: '21dev-hero-finance',
        name: 'Hero Finanças Corporativas',
        category: 'hero',
        businessTypes: ['FINANCE', 'CONSULTING', 'BANKING'],
        animationType: 'fade-in-up',
        hasGlow: true,
        hasGlassmorphism: true,
        code: `
<section className="hero-finance">
  <div className="hero-overlay" />
  <div className="hero-content">
    <h1 className="hero-title">Crescimento Financeiro</h1>
    <p className="hero-subtitle">Consultoria financeira especializada</p>
    <button className="hero-cta">Consultar Agora</button>
  </div>
</section>`,
      },
    ],
    'RESTAURANT': [
      {
        id: '21dev-hero-restaurant',
        name: 'Hero Restaurante Premium',
        category: 'hero',
        businessTypes: ['RESTAURANT', 'BAR', 'PIZZERIA'],
        animationType: 'fade-in-up',
        hasGlow: true,
        hasGlassmorphism: true,
        code: `
<section className="hero-restaurant">
  <div className="hero-overlay" />
  <div className="hero-content">
    <h1 className="hero-title">Sabor Inesquecível</h1>
    <p className="hero-subtitle">Experimente nossa culinária única</p>
    <button className="hero-cta">Reservar Mesa</button>
  </div>
</section>`,
        previewUrl: 'https://21dev.com/examples/restaurant-hero',
      },
      {
        id: '21dev-menu-card',
        name: 'Menu Card Premium',
        category: 'card',
        businessTypes: ['RESTAURANT', 'BAR', 'PIZZERIA', 'COFFEE'],
        animationType: 'hover-lift',
        hasGlow: false,
        hasGlassmorphism: true,
        code: `
<div className="menu-card">
  <img src="{{image}}" alt="{{name}}" />
  <div className="menu-card-body">
    <h3>{{name}}</h3>
    <p>{{description}}</p>
    <span className="price">{{price}}</span>
  </div>
</div>`,
      },
    ],
    'TECH': [
      {
        id: '21dev-hero-tech',
        name: 'Hero Tech Modern',
        category: 'hero',
        businessTypes: ['TECH', 'SAAS', 'STARTUP'],
        animationType: 'slide-up',
        hasGlow: true,
        hasGlassmorphism: false,
        code: `
<section className="hero-tech">
  <div className="hero-gradient" />
  <h1 className="hero-title">Transforme seu Negócio</h1>
  <p className="hero-subtitle">Soluções tecnológicas de ponta</p>
  <button className="hero-cta">Começar Agora</button>
</section>`,
      },
    ],
    'BEAUTY': [
      {
        id: '21dev-hero-beauty',
        name: 'Hero Salon Elegant',
        category: 'hero',
        businessTypes: ['SALON', 'BARBERSHOP', 'SPA'],
        animationType: 'fade-in',
        hasGlow: true,
        hasGlassmorphism: true,
        code: `
<section className="hero-beauty">
  <div className="hero-overlay" />
  <h1 className="hero-title">Realce sua Beleza</h1>
  <p className="hero-subtitle">Tratamentos exclusivos para você</p>
  <button className="hero-cta">Agendar Horário</button>
</section>`,
      },
    ],
    'SALON': [
      {
        id: '21dev-hero-salon',
        name: 'Hero Salon de Beleza',
        category: 'hero',
        businessTypes: ['SALON', 'BEAUTY', 'BARBERSHOP'],
        animationType: 'fade-in',
        hasGlow: true,
        hasGlassmorphism: true,
        code: `
<section className="hero-salon">
  <div className="hero-overlay" />
  <div className="hero-content">
    <h1 className="hero-title">Sua Beleza, Nossa Prioridade</h1>
    <p className="hero-subtitle">Tratamentos estéticos personalizados</p>
    <button className="hero-cta">Agendar Horário</button>
  </div>
</section>`,
      },
    ],
    'GARDENING': [
      {
        id: '21dev-hero-gardening',
        name: 'Hero Jardinagem Profissional',
        category: 'hero',
        businessTypes: ['GARDENING', 'LANDSCAPING', 'FLORIST'],
        animationType: 'slide-up',
        hasGlow: false,
        hasGlassmorphism: true,
        code: `
<section className="hero-gardening">
  <div className="hero-video-bg" />
  <h1 className="hero-title">Transforme seu Jardim</h1>
  <p className="hero-subtitle">Paisagismo e jardinagem especializada</p>
  <button className="hero-cta">Solicitar Orçamento</button>
</section>`,
      },
    ],
    'PHOTOGRAPHY': [
      {
        id: '21dev-portfolio-photo',
        name: 'Portfolio Photography',
        category: 'card',
        businessTypes: ['PHOTOGRAPHY', 'VIDEOGRAPHY', 'ART'],
        animationType: 'hover-zoom',
        hasGlow: false,
        hasGlassmorphism: false,
        code: `
<div className="portfolio-card">
  <img src="{{image}}" alt="{{title}}" />
  <div className="portfolio-overlay">
    <h3>{{title}}</h3>
    <p>{{category}}</p>
  </div>
</div>`,
      },
    ],
    'TRAVEL': [
      {
        id: '21dev-hero-travel',
        name: 'Hero Agência de Viagens',
        category: 'hero',
        businessTypes: ['TRAVEL', 'TOURISM', 'HOTEL'],
        animationType: 'fade-in-up',
        hasGlow: true,
        hasGlassmorphism: true,
        code: `
<section className="hero-travel">
  <div className="hero-overlay" />
  <div className="hero-content">
    <h1 className="hero-title">Destinos Inesquecíveis</h1>
    <p className="hero-subtitle">Pacotes turísticos exclusivos</p>
    <button className="hero-cta">Reservar Agora</button>
  </div>
</section>`,
      },
    ],
    'EVENTS': [
      {
        id: '21dev-hero-events',
        name: 'Hero Eventos Impactantes',
        category: 'hero',
        businessTypes: ['EVENTS', 'WEDDING', 'PARTY'],
        animationType: 'slide-up',
        hasGlow: true,
        hasGlassmorphism: false,
        code: `
<section className="hero-events">
  <div className="hero-gradient" />
  <h1 className="hero-title">Momentos Especiais</h1>
  <p className="hero-subtitle">Produção de eventos completa</p>
  <button className="hero-cta">Solicitar Orçamento</button>
</section>`,
      },
    ],
    'CONSTRUCTION': [
      {
        id: '21dev-hero-construction',
        name: 'Hero Construção Profissional',
        category: 'hero',
        businessTypes: ['CONSTRUCTION', 'ARCHITECTURE', 'REAL_ESTATE'],
        animationType: 'fade-in',
        hasGlow: false,
        hasGlassmorphism: true,
        code: `
<section className="hero-construction">
  <div className="hero-overlay" />
  <h1 className="hero-title">Construindo seu Futuro</h1>
  <p className="hero-subtitle">Obras residenciais e comerciais</p>
  <button className="hero-cta">Solicitar Orçamento</button>
</section>`,
      },
    ],
    'AUTOMOTIVE': [
      {
        id: '21dev-service-card-auto',
        name: 'Service Card Automotive',
        category: 'card',
        businessTypes: ['AUTOMOTIVE', 'MECHANIC', 'CAR_WASH'],
        animationType: 'hover-lift',
        hasGlow: false,
        hasGlassmorphism: true,
        code: `
<div className="service-card-auto">
  <div className="service-icon">{{icon}}</div>
  <h3>{{name}}</h3>
  <p>{{description}}</p>
  <span className="price">A partir de R$ {{price}}</span>
</div>`,
      },
    ],
    'PET_SHOP': [
      {
        id: '21dev-hero-pet-shop',
        name: 'Hero Pet Shop Colorful',
        category: 'hero',
        businessTypes: ['PET_SHOP', 'VETERINARY', 'PET_GROOMING'],
        animationType: 'fade-in-up',
        hasGlow: true,
        hasGlassmorphism: true,
        code: `
<section className="hero-pet-shop">
  <div className="hero-overlay" />
  <div className="hero-content">
    <h1 className="hero-title">Tudo para seu Pet</h1>
    <p className="hero-subtitle">Produtos e serviços de qualidade</p>
    <button className="hero-cta">Comprar Agora</button>
  </div>
</section>`,
      },
    ],
    'SPA': [
      {
        id: '21dev-hero-spa',
        name: 'Hero Spa Relaxing',
        category: 'hero',
        businessTypes: ['SPA', 'WELLNESS', 'MASSAGE'],
        animationType: 'fade-in',
        hasGlow: true,
        hasGlassmorphism: true,
        code: `
<section className="hero-spa">
  <div className="hero-video-bg" />
  <h1 className="hero-title">Relaxe e Renove-se</h1>
  <p className="hero-subtitle">Experiência única de bem-estar</p>
  <button className="hero-cta">Agendar Tratamento</button>
</section>`,
      },
    ],
    'COFFEE': [
      {
        id: '21dev-hero-coffee',
        name: 'Hero Café Aromático',
        category: 'hero',
        businessTypes: ['COFFEE', 'BAKERY', 'CAFE_BAKERY'],
        animationType: 'slide-up',
        hasGlow: false,
        hasGlassmorphism: true,
        code: `
<section className="hero-coffee">
  <div className="hero-gradient" />
  <h1 className="hero-title">O Melhor Café da Cidade</h1>
  <p className="hero-subtitle">Grãos selecionados e torra artesanal</p>
  <button className="hero-cta">Pedir pelo WhatsApp</button>
</section>`,
      },
    ],
    'RETAIL': [
      {
        id: '21dev-product-card',
        name: 'Product Card Modern',
        category: 'card',
        businessTypes: ['RETAIL', 'PET_SHOP', 'BOOKSTORE'],
        animationType: 'hover-zoom',
        hasGlow: false,
        hasGlassmorphism: false,
        code: `
<div className="product-card">
  <div className="product-image">{{image}}</div>
  <h3 className="product-name">{{name}}</h3>
  <span className="product-price">{{price}}</span>
  <button className="add-to-cart">Comprar</button>
</div>`,
      },
    ],
  };

  return componentMap[businessType] || [];
}

// Get a specific 21dev component by ID
export function get21DevComponent(componentId: string): Component21Dev | null {
  const allComponents = Object.values(getComponentsForNiche('')).flat();
  return allComponents.find(c => c.id === componentId) || null;
}

// Generate 21dev component prompt for AI
export function generate21DevPrompt(request: ComponentRequest): string {
  const { businessType, category, style, withAnimations, withGlassmorphism } = request;
  
  return `
Create a premium ${category} component for a ${businessType} business.
Style: ${style}
${withAnimations ? 'Include GSAP animations (fade-in-up, stagger).' : 'No animations.'}
${withGlassmorphism ? 'Use glassmorphism effects (backdrop-filter: blur).' : 'Standard background.'}

Requirements:
- Mobile-first responsive design
- High-converting layout ($10K+ quality)
- Proper semantic HTML
- Modern CSS with clamp() for typography
- Accessibility compliant (WCAG AA)

Return the component as a React functional component with TypeScript.
  `.trim();
}

// Get all available components
export function getAll21DevComponents(): Component21Dev[] {
  const all: Component21Dev[] = [];
  const niches = ['RESTAURANT', 'TECH', 'BEAUTY', 'RETAIL', 'HEALTH', 'FITNESS'];
  
  niches.forEach(niche => {
    all.push(...getComponentsForNiche(niche));
  });
  
  return all;
}

// Check if 21dev components are available for a niche
export function has21DevComponents(businessType: string): boolean {
  return getComponentsForNiche(businessType).length > 0;
}

export default {
  getComponentsForNiche,
  get21DevComponent,
  generate21DevPrompt,
  getAll21DevComponents,
  has21DevComponents,
};
