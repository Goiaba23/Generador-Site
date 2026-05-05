// Serviço de Componentes 21dev - Premium $10K+ UI
// Integração com 21.dev para componentes premium

export interface UIComponent {
  id: string;
  name: string;
  description: string;
  category: 'hero' | 'features' | 'testimonials' | 'pricing' | 'contact' | 'gallery' | 'booking';
  niche: string[];
  code: string;
  animationType: string;
  usesGSAP: boolean;
  priceReference: string; // "$10K+", "$5K", etc.
}

// Componentes premium baseados em 21.dev + Dribbble
export const PREMIUM_21DEV_COMPONENTS: UIComponent[] = [
  // HERO SECTIONS
  {
    id: 'hero-botifly',
    name: 'Hero BotiFly Hamburger',
    description: 'Hero com animação de hambúrguer, CTA forte, gradientes vibrantes',
    category: 'hero',
    niche: ['BURGER_JOINT', 'RESTAURANT', 'BAR'],
    code: `
<section className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-600">
  <div className="absolute inset-0 bg-black/20" />
  <div className="relative z-10 text-center text-white px-4">
    <h1 className="text-6xl md:text-8xl font-black mb-4 animate-bounce-in">
      {businessName}
    </h1>
    <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
      {tagline}
    </p>
    <button className="bg-white text-orange-600 font-bold py-4 px-8 rounded-full text-lg hover:scale-105 transition-transform">
      Pedir Agora →
    </button>
  </div>
</section>
    `,
    animationType: 'bounce-in',
    usesGSAP: true,
    priceReference: '$10K',
  },
  {
    id: 'hero-safal-restaurant',
    name: 'Hero Safal Restaurant',
    description: 'Hero elegante com parallax, tipografia serifada, foco em imagens',
    category: 'hero',
    niche: ['RESTAURANT', 'CAFE', 'BAKERY'],
    code: `
<section className="relative h-screen flex items-end bg-gray-900">
  <div className="absolute inset-0 bg-[url('{heroImage}')] bg-cover bg-center opacity-60" />
  <div className="relative z-10 text-white p-8 max-w-4xl animate-fade-in-up">
    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">
      {businessName}
    </h1>
    <p className="text-lg md:text-xl mb-6 text-gray-200">
      {description}
    </p>
    <div className="flex gap-4">
      <button className="bg-gold-500 text-black px-6 py-3 rounded hover:bg-gold-400 transition">
        Reservar Mesa
      </button>
      <button className="border-2 border-white text-white px-6 py-3 rounded hover:bg-white/10 transition">
        Ver Cardápio
      </button>
    </div>
  </div>
</section>
    `,
    animationType: 'fade-in-up',
    usesGSAP: true,
    priceReference: '$10K+',
  },
  {
    id: 'hero-pixxen-barber',
    name: 'Hero Pixxen Barber',
    description: 'Hero minimalista masculino, foco em portfólio, tons escuros',
    category: 'hero',
    niche: ['BARBERSHOP', 'SALON', 'GYM'],
    code: `
<section className="bg-[#1a1a2e] text-white min-h-screen flex items-center">
  <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
    <div className="animate-slide-in-left">
      <h1 className="text-5xl md:text-7xl font-bold mb-4">
        {businessName}
      </h1>
      <p className="text-xl text-gray-300 mb-8">
        Cortes precisos para o homem moderno
      </p>
      <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition">
        Agendar Horário
      </button>
    </div>
    <div className="relative animate-zoom-in">
      <img src="{barberImage}" alt="Barber" className="rounded-2xl shadow-2xl" />
    </div>
  </div>
</section>
    `,
    animationType: 'slide-in-left',
    usesGSAP: true,
    priceReference: '$10K+',
  },
  {
    id: 'features-design-monks',
    name: 'Features Grid Design Monks',
    description: 'Grid de features com gradientes roxos, ícones animados, estilo tech',
    category: 'features',
    niche: ['TECH', 'SAAS', 'STARTUP'],
    code: `
<section className="py-20 bg-gray-50">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12 animate-text-reveal">
      Recursos Poderosos
    </h2>
    <div className="grid md:grid-cols-3 gap-8">
      {features.map((feature, i) => (
        <div key={i} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition animate-on-scroll">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
            <span className="text-3xl">🚀</span>
          </div>
          <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
    `,
    animationType: 'text-reveal',
    usesGSAP: true,
    priceReference: '$10K+',
  },
  {
    id: 'testimonials-madhu-salon',
    name: 'Testimonials Madhu Salon',
    description: 'Depoimentos com fotos antes/depois, layout limpo, tons neutros',
    category: 'testimonials',
    niche: ['SALON', 'SPA', 'CLINIC'],
    code: `
<section className="py-20 bg-gray-100">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12">O que dizem nossos clientes</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {testimonials.map((t, i) => (
        <div key={i} className="bg-white p-6 rounded-xl shadow-md animate-fade-in">
          <div className="flex items-center gap-4 mb-4">
            <img src="{t.avatar}" alt="" className="w-12 h-12 rounded-full" />
            <div>
              <div className="font-bold">{t.name}</div>
              <div className="text-yellow-500">{'★'.repeat(t.rating)}</div>
            </div>
          </div>
          <p className="text-gray-600 italic">"{t.content}"</p>
          {t.beforeAfter && (
            <div className="flex gap-2 mt-4">
              <img src="{t.before}" alt="Before" className="w-20 h-20 rounded object-cover" />
              <img src="{t.after}" alt="After" className="w-20 h-20 rounded object-cover" />
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</section>
    `,
    animationType: 'fade-in',
    usesGSAP: true,
    priceReference: '$10K',
  },
  {
    id: 'booking-fleex-clinic',
    name: 'Booking Fleex Clinic',
    description: 'Agendamento médico com gradientes azuis, confiança, design corporativo',
    category: 'booking',
    niche: ['CLINIC', 'DENTIST', 'GYM'],
    code: `
<section className="py-20 bg-gradient-to-br from-blue-600 to-blue-900 text-white">
  <div className="max-w-4xl mx-auto px-4 text-center">
    <h2 className="text-4xl font-bold mb-8 animate-gradient-shift">
      Agende sua Consulta
    </h2>
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl mx-auto">
      <div className="grid grid-cols-2 gap-4 mb-6">
        {doctors.map((doc, i) => (
          <div key={i} className="bg-white/20 rounded-xl p-4 hover:bg-white/30 transition cursor-pointer">
            <img src="{doc.photo}" alt="" className="w-16 h-16 rounded-full mx-auto mb-2" />
            <div className="font-semibold">{doc.name}</div>
            <div className="text-sm text-blue-200">{doc.specialty}</div>
          </div>
        ))}
      </div>
      <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:scale-105 transition">
        Agendar Agora
      </button>
    </div>
  </div>
</section>
    `,
    animationType: 'gradient-shift',
    usesGSAP: true,
    priceReference: '$10K+',
  },
];

// Buscar componente por nicho e categoria
export function get21DevComponent(niche: string, category: string): UIComponent | undefined {
  return PREMIUM_21DEV_COMPONENTS.find(
    c => c.category === category && c.niche.includes(niche)
  );
}

// Listar todos os componentes de um nicho
export function getComponentsForNiche(niche: string): UIComponent[] {
  return PREMIUM_21DEV_COMPONENTS.filter(c => c.niche.includes(niche));
}

// Gerar código do componente com animação
export function generateComponentCode(componentId: string, data: any): string {
  const component = PREMIUM_21DEV_COMPONENTS.find(c => c.id === componentId);
  if (!component) return '';
  
  let code = component.code;
  
  // Replace placeholders
  if (data.businessName) {
    code = code.replace(/\{businessName\}/g, data.businessName);
  }
  if (data.description) {
    code = code.replace(/\{description\}/g, data.description);
  }
  
  return code;
}

export default {
  PREMIUM_21DEV_COMPONENTS,
  get21DevComponent,
  getComponentsForNiche,
  generateComponentCode,
};
