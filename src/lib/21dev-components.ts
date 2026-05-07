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
