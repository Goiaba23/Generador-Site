// Template configurations for different business types
// Each template defines layout, components, and default content

export interface TemplateConfig {
  id: string;
  businessType: string;
  style: string;
  name: string;
  description: string;
  thumbnail: string;
  defaultContent: SiteContent;
}

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    ctaText: string;
    ctaLink: string;
  };
  sections: Section[];
  footer: {
    copyright: string;
    links: { label: string; href: string }[];
  };
}

export interface Section {
  type: 'about' | 'menu' | 'services' | 'gallery' | 'contact' | 'testimonials' | 'booking';
  title: string;
  content: any;
}

// Restaurant / Hamburgueria - Catalog style
export const restaurantTemplate: TemplateConfig = {
  id: 'restaurant-catalog',
  businessType: 'RESTAURANT',
  style: 'CATALOG',
  name: 'Cardápio Digital',
  description: 'Site estilo catálogo para restaurantes e hamburguerias com cardápio online',
  thumbnail: '/templates/restaurant-catalog.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Os melhores hambúrgueres da cidade',
      backgroundImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200',
      ctaText: 'Ver Cardápio',
      ctaLink: '#menu',
    },
    sections: [
      {
        type: 'about',
        title: 'Sobre Nós',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
        },
      },
      {
        type: 'menu',
        title: 'Nosso Cardápio',
        content: {
          categories: [
            {
              name: 'Hambúrgueres',
              items: [
                { name: 'Clássico', price: 25.9, description: 'Pão, carne, queijo, alface, tomate', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
                { name: 'Bacon', price: 29.9, description: 'Com bacon crocante e molho especial', image: 'https://images.unsplash.com/photo-1553979459-dcbae53a8d40?w=400' },
                { name: 'Veggie', price: 27.9, description: 'Opção vegetariana deliciosa', image: 'https://images.unsplash.com/photo-1525059696034-4967a8f63f8c?w=400' },
              ],
            },
            {
              name: 'Bebidas',
              items: [
                { name: 'Refrigerante', price: 6.9, description: 'Lata 350ml' },
                { name: 'Suco Natural', price: 9.9, description: 'Copo 500ml' },
              ],
            },
          ],
        },
      },
      {
        type: 'gallery',
        title: 'Galeria',
        content: {
          images: [
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
            'https://images.unsplash.com/photo-1553979459-dcbae53a8d40?w=600',
            'https://images.unsplash.com/photo-1525059696034-4967a8f63f8c?w=600',
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600',
          ],
        },
      },
      {
        type: 'contact',
        title: 'Contato',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 18h-23h | Sáb-Dom: 18h-00h',
          mapEmbed: '',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'Instagram', href: '#' },
        { label: 'WhatsApp', href: '#' },
        { label: 'Avalie no Google', href: '#' },
      ],
    },
  },
};

// Barber Shop - Portfolio/Booking style
export const barbershopTemplate: TemplateConfig = {
  id: 'barbershop-booking',
  businessType: 'BARBERSHOP',
  style: 'BOOKING',
  name: 'Barbearia Pro',
  description: 'Site para barbearias com agendamento online e portfólio de cortes',
  thumbnail: '/templates/barbershop-booking.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Estilo e tradição em cada corte',
      backgroundImage: 'https://images.unsplash.com/photo-150395191487c8-24c8e4f8d2a8?w=1200',
      ctaText: 'Agendar Horário',
      ctaLink: '#booking',
    },
    sections: [
      {
        type: 'about',
        title: 'Nossa História',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-150395191487c8-24c8e4f8d2a8?w=800',
        },
      },
      {
        type: 'services',
        title: 'Nossos Serviços',
        content: {
          services: [
            { name: 'Corte Masculino', price: 35.0, duration: '30min', description: 'Corte tradicional ou degradê' },
            { name: 'Barba', price: 25.0, duration: '20min', description: 'Aparar e modelar barba' },
            { name: 'Corte + Barba', price: 55.0, duration: '50min', description: 'Pacote completo' },
            { name: 'Pigmentação', price: 40.0, duration: '40min', description: 'Design de sobrancelha' },
          ],
        },
      },
      {
        type: 'gallery',
        title: 'Nossos Cortes',
        content: {
          images: [
            'https://images.unsplash.com/photo-150395191487c8-24c8e4f8d2a8?w=600',
            'https://images.unsplash.com/photo-1516257984-b1b4c1dfba52?w=600',
            'https://images.unsplash.com/photo-1521563400462-6225d9ce9c42?w=600',
            'https://images.unsplash.com/photo-1599351431205-8abd1dca91d3?w=600',
          ],
        },
      },
      {
        type: 'booking',
        title: 'Agende seu Horário',
        content: {
          calendarLink: '',
          phone: '{{businessPhone}}',
          message: 'Ou agende pelo WhatsApp',
        },
      },
      {
        type: 'contact',
        title: 'Visite-nos',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 9h-20h | Sáb: 9h-18h | Dom: Fechado',
          mapEmbed: '',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'Instagram', href: '#' },
        { label: 'WhatsApp', href: '#' },
        { label: 'Facebook', href: '#' },
      ],
    },
  },
};

// Template registry
export const templates: TemplateConfig[] = [
  restaurantTemplate,
  barbershopTemplate,
  // Add more templates here...
];

export function getTemplateByType(businessType: string, style?: string): TemplateConfig | undefined {
  return templates.find(t => 
    t.businessType === businessType && (!style || t.style === style)
  );
}

export function getAllTemplates() {
  return templates;
}
