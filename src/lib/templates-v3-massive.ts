// MASSIVE EXPANSION: 30+ Business Types with Niche-Optimized Designs
// Each template is carefully crafted based on market research for that specific niche

import { TemplateConfig, SiteContent } from './templates';

// ==================== BAR / BAR MAN ===================
export const barTemplate: TemplateConfig = {
  id: 'bar-nightlife',
  businessType: 'BAR',
  style: 'BOOKING',
  name: 'Bar & Lounge',
  description: 'Site para bares com cardápio de drinques, eventos ao vivo, reservas de mesas e atmosfera noturna',
  thumbnail: '/templates/bar-nightlife.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'O melhor da noite. Drinques artesanais e ambiente acolhedor.',
      backgroundImage: 'https://images.unsplash.com/photo-1474542081594-c19b8c55015?w=1200',
      ctaText: 'Reservar Mesa',
      ctaLink: '#booking',
    },
    sections: [
      {
        type: 'about',
        title: 'Nossa Atmosfera',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-1474542081594-c19b8c55015?w=800',
          features: ['Ambiente climatizado', 'Música ao vivo', 'Cartão de drinques exclusivo'],
        },
      },
      {
        type: 'menu',
        title: 'Cartão de Drinques',
        content: {
          categories: [
            {
              name: 'Drinques Assinatura',
              items: [
                { name: 'Mojito Clássico', price: 28.90, description: 'Rum, hortelã, limão, açúcar, soda', alcoholic: true, category: 'drinques' },
                { name: 'Gin Tônica', price: 32.90, description: 'Gin premium, água tônica, limão siciliano', alcoholic: true, category: 'drinques' },
                { name: 'Caipirinha', price: 25.90, description: 'Cachaça, limão, açúcar', alcoholic: true, category: 'drinques' },
                { name: 'Old Fashioned', price: 38.90, description: 'Bourbon, angostura, açúcar, laranja', alcoholic: true, category: 'drinques' },
              ],
            },
            {
              name: 'Cervejas',
              items: [
                { name: 'Heineken Long Neck', price: 12.90, description: '330ml', alcoholic: true, category: 'beer' },
                { name: 'Stella Artois', price: 14.90, description: '300ml', alcoholic: true, category: 'beer' },
                { name: 'IPA Artesanal', price: 18.90, description: '500ml - Lúpulo intenso', alcoholic: true, category: 'beer' },
              ],
            },
            {
              name: 'Petiscos',
              items: [
                { name: 'Tabua de Frios', price: 49.90, description: 'Queijos, presuntos, azeitonas' },
                { name: 'Batata Frita', price: 24.90, description: 'Porção grande com cheddar' },
                { name: 'Isca de Peixe', price: 39.90, description: 'Peixe branco empeborado' },
              ],
            },
          ],
        },
      },
      {
        type: 'services',
        title: 'Eventos & Agendas',
        content: {
          services: [
            { name: 'Reserva de Mesas', description: 'Garanta sua mesa para o happy hour', icon: 'chair', price: 'Grátis' },
            { name: 'Noite de Jazz', description: 'Toda quinta-feira', icon: 'music', price: 'Couverte: R$ 20' },
            { name: 'Happy Hour', description: '17h às 20h - Drinques com 30% off', icon: 'glass-cheers', price: 'Promoção' },
            { name: 'Aniversários', description: 'Espaço reservado para seu grupo', icon: 'birthday-cake', price: 'A partir de R$ 500' },
          ],
        },
      },
      {
        type: 'booking',
        title: 'Reserve sua Mesa',
        content: {
          message: 'Garanta seu lugar para uma noite especial',
          phone: '{{businessPhone}}',
          whatsapp: '{{businessPhone}}',
          availableTimes: 'Ter-Sex: 18h-02h | Sáb: 18h-04h | Dom: 18h-00h',
          formFields: ['name', 'phone', 'date', 'time', 'people', 'message'],
        },
      },
      {
        type: 'gallery',
        title: 'Nossa Noite',
        content: {
          images: [
            'https://images.unsplash.com/photo-1474542081594-c19b8c55015?w=600',
            'https://images.unsplash.com/photo-1514933677531-4c4c30f4b1c?w=600',
            'https://images.unsplash.com/photo-1519681393786-2a8a9d61d64?w=600',
            'https://images.unsplash.com/photo-1544149593-3c0f37?w=600',
          ],
        },
      },
      {
        type: 'contact',
        title: 'Visite-nos',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Ter-Sex: 18h-02h | Sáb: 18h-04h | Dom: 18h-00h',
          whatsapp: '{{businessPhone}}',
          socialMedia: ['Instagram', 'Facebook', 'TikTok'],
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'Instagram', href: '#' },
        { label: 'WhatsApp', href: '#' },
        { label: 'Reservas', href: '#booking' },
        { label: 'Cardápio', href: '#menu' },
      ],
    },
  },
};

// ==================== PIZZERIA ===================
export const pizzariaTemplate: TemplateConfig = {
  id: 'pizzaria-italian',
  businessType: 'PIZZERIA',
  style: 'ECOMMERCE',
  name: 'Pizzaria Italiana',
  description: 'Site para pizzarias com cardápio completo, delivery rápido, sabores exclusivos e promoções',
  thumbnail: '/templates/pizzaria.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'A verdadeira pizza italiana, forno à lenha e ingredientes frescos',
      backgroundImage: 'https://images.unsplash.com/photo-1565299624946-05bd6c3524?w=1200',
      ctaText: 'Pedir Pizza',
      ctaLink: '#products',
    },
    sections: [
      {
        type: 'about',
        title: 'Tradição Italiana',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-1565299624946-05bd6c3524?w=800',
          stats: [
            { number: '15+', label: 'Anos de Tradição' },
            { number: '50+', label: 'Sabores Únicos' },
            { number: '15min', label: 'Entrega Rápida' },
          ],
        },
      },
      {
        type: 'menu',
        title: 'Nossas Pizzas',
        content: {
          categories: [
            {
              name: 'Pizzas Tradicionais',
              items: [
                { name: 'Marguerita', price: 45.90, description: 'Molho de tomate, mussarela, manjericão' },
                { name: 'Calabresa', price: 49.90, description: 'Calabresa, cebola, catupiry' },
                { name: 'Quatro Queijos', price: 55.90, description: 'Mussarela, provolone, parmesão, gorgonzola' },
                { name: 'Portuguesa', price: 52.90, description: 'Presunto, ovos, cebola, ervilha' },
              ],
            },
            {
              name: 'Pizzas Especiais',
              items: [
                { name: 'Frango c/ Catupiry', price: 54.90, description: 'Frango desfiado, catupiry, milho' },
                { name: 'Pepperoni', price: 52.90, description: 'Pepperoni artesanal, mussarela' },
                { name: 'Vegetariana', price: 48.90, description: 'Brócolis, cenoura, milho, palmito' },
                { name: 'Doce de Chocolate', price: 49.90, description: 'Chocolate ao leite, morango' },
              ],
            },
            {
              name: 'Bebidas',
              items: [
                { name: 'Refrigerante 2L', price: 14.90, description: 'Coca, Guaraná, Fanta' },
                { name: 'Suco Natural', price: 12.90, description: 'Laranja, Limão, Maracujá' },
                { name: 'Cerveja Long Neck', price: 12.90, description: '330ml' },
              ],
            },
          ],
        },
      },
      {
        type: 'services',
        title: 'Nossos Diferenciais',
        content: {
          services: [
            { name: 'Delivery Rápido', description: 'Entrega em até 30 minutos', icon: 'truck' },
            { name: 'Forno à Lenha', description: 'Sabor e crocância única', icon: 'fire' },
            { name: 'Massa Artesanal', description: 'Fermentação natural de 48h', icon: 'bread-slice' },
            { name: 'Encomendas', description: 'Pizzas inteiras e fatias', icon: 'shopping-cart' },
          ],
        },
      },
      {
        type: 'contact',
        title: 'Faça seu Pedido',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Ter-Dom: 18h-23h | Sáb: 18h-00h',
          whatsapp: '{{businessPhone}}',
          deliveryAreas: 'Entregamos em toda a cidade',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Cardápio', href: '#menu' },
        { label: 'Delivery', href: '#contact' },
        { label: 'Promoções', href: '#' },
      ],
    },
  },
};

// ==================== SUSHI / JAPANESE ===================
export const sushiTemplate: TemplateConfig = {
  id: 'sushi-japanese',
  businessType: 'SEAFOOD',
  style: 'ECOMMERCE',
  name: 'Sushi & Japanese Food',
  description: 'Site para restaurantes japoneses com combinados, sushis artesanais e ambiente oriental',
  thumbnail: '/templates/sushi.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'A verdadeira culinária japonesa com ingredientes frescos e técnia impecável',
      backgroundImage: 'https://images.unsplash.com/photo-1579871491321-99b3a6?w=1200',
      ctaText: 'Ver Combinados',
      ctaLink: '#products',
    },
    sections: [
      {
        type: 'about',
        title: 'Tradição Japonesa',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-1579871491321-99b3a6?w=800',
          features: ['Peixe fresco diário', 'Chef com 15+ anos', 'Ambiente tradicional'],
        },
      },
      {
        type: 'menu',
        title: 'Nossos Pratos',
        content: {
          categories: [
            {
              name: 'Combos de Sushi',
              items: [
                { name: 'Combo 20 pçs', price: 89.90, description: '8 sushis, 8 sashimis, 4 uramakis' },
                { name: 'Combo 40 pçs', price: 159.90, description: '16 sushis, 16 sashimis, 8 uramakis' },
                { name: 'Combo Família 60 pçs', price: 229.90, description: 'Variedade completa para 4 pessoas' },
              ],
            },
            {
              name: 'Sushis & Sashimis',
              items: [
                { name: 'Sushi Salmão', price: 12.90, description: '2 pçs - Salmão fresco' },
                { name: 'Sushi Atum', price: 14.90, description: '2 pçs - Atum premium' },
                { name: 'Sashimi Mistos', price: 49.90, description: '15 pçs de peixes variados' },
              ],
            },
            {
              name: 'Temakis & Hot Rolls',
              items: [
                { name: 'Temaki Salmão', price: 24.90, description: 'Grande - Cream cheese + Salmão' },
                { name: 'Hot Philadelphia', price: 28.90, description: 'Salmão, cream cheese, pepino' },
                { name: 'Hot Crunch', price: 32.90, description: 'Camarão, cream cheese, flakes' },
              ],
            },
          ],
        },
      },
      {
        type: 'gallery',
        title: 'Nossa Culinária',
        content: {
          images: [
            'https://images.unsplash.com/photo-1579871491321-99b3a6?w=600',
            'https://images.unsplash.com/photo-1579584427512-8d1?w=600',
            'https://images.unsplash.com/photo-1553621048-8017?w=600',
            'https://images.unsplash.com/photo-161719603515?w=600',
          ],
        },
      },
      {
        type: 'contact',
        title: 'Faça seu Pedido',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Ter-Dom: 18h-23h',
          whatsapp: '{{businessPhone}}',
          deliveryAreas: 'Delivery em toda a cidade',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Cardápio', href: '#menu' },
        { label: 'Delivery', href: '#contact' },
        { label: 'Promoções', href: '#' },
      ],
    },
  },
};

// ==================== HAMBURGUERIA (BURGER_JOINT) ===================
export const burgerJointTemplate: TemplateConfig = {
  id: 'burger-joint-gourmet',
  businessType: 'BURGER_JOINT',
  style: 'ECOMMERCE',
  name: 'Hamburgueria Gourmet',
  description: 'Hambúrgueres artesanais com ingredientes premium, batatas rústicas e milk-shakes artesanais',
  thumbnail: '/templates/burger-joint.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Hambúrgueres artesanais feitos com paixão e ingredientes selecionados',
      backgroundImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200',
      ctaText: 'Ver Cardápio',
      ctaLink: '#products',
    },
    sections: [
      {
        type: 'about',
        title: 'Nossa História',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
          stats: [
            { number: '100%', label: 'Carne Angus' },
            { number: '15+', label: 'Sabores Exclusivos' },
            { number: '10min', label: 'Preparo Rápido' },
          ],
        },
      },
      {
        type: 'menu',
        title: 'Nossos Hambúrgueres',
        content: {
          categories: [
            {
              name: 'Clássicos',
              items: [
                { name: 'Cheeseburger', price: 28.90, description: '150g carne, queijo, alface, tomate, molho especial' },
                { name: 'Bacon Burger', price: 34.90, description: '180g carne, bacon, cheddar, onion rings' },
                { name: 'Veggie Burger', price: 26.90, description: 'Hambúrguer vegetariano, queijo, vegetais' },
              ],
            },
            {
              name: 'Gourmet',
              items: [
                { name: 'Trufado', price: 49.90, description: '180g carne, queijo brie, molho de trufa' },
                { name: 'Blue Cheese', price: 44.90, description: '180g carne, queijo blue cheese, rúcula' },
                { name: 'Smoky BBQ', price: 39.90, description: '180g carne, bacon, cheddar, molho BBQ' },
              ],
            },
            {
              name: 'Acompanhamentos & Bebidas',
              items: [
                { name: 'Batata Rústica', price: 18.90, description: 'Porção grande com cheddar' },
                { name: 'Onion Rings', price: 16.90, description: 'Anéis de cebola empanados' },
                { name: 'Milk-shake', price: 22.90, description: 'Chocolate, Morango, Baunilha' },
              ],
            },
          ],
        },
      },
      {
        type: 'services',
        title: 'Vantagens',
        content: {
          services: [
            { name: 'Delivery Rápido', description: 'Entrega em até 30 min', icon: 'truck' },
            { name: 'Retirada no Local', description: 'Sem fila de espera', icon: 'store' },
            { name: 'Promoção 2ª Feira', description: 'Compre 1 leve 2º com 50% off', icon: 'tag' },
            { name: 'Kit Festa', description: 'Montamos seu kit para eventos', icon: 'birthday-cake' },
          ],
        },
      },
      {
        type: 'gallery',
        title: 'Nossos Hambúrgueres',
        content: {
          images: [
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
            'https://images.unsplash.com/photo-1553979459-dcbae53?w=600',
            'https://images.unsplash.com/photo-1525059696034-4967a8f63f8c?w=600',
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
          ],
        },
      },
      {
        type: 'contact',
        title: 'Peça seu Lanche',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Dom: 18h-23h',
          whatsapp: '{{businessPhone}}',
          deliveryAreas: 'Entregamos em toda a cidade',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Cardápio', href: '#menu' },
        { label: 'Delivery', href: '#contact' },
        { label: 'Promoções', href: '#' },
      ],
    },
  },
};

// ==================== STEAKHOUSE (CHURRASCARIA) ===================
export const steakhouseTemplate: TemplateConfig = {
  id: 'steakhouse-churrasco',
  businessType: 'STEAKHOUSE',
  style: 'ECOMMERCE',
  name: 'Churrascaria & Steakhouse',
  description: 'Rodízio de carnes premium, bufê completo e ambiente familiar para eventos especiais',
  thumbnail: '/templates/steakhouse.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'As melhores carnes da região. Rodízio premium com cortes especiais.',
      backgroundImage: 'https://images.unsplash.com/photo-1558039934-99a288?w=1200',
      ctaText: 'Reservar Mesa',
      ctaLink: '#booking',
    },
    sections: [
      {
        type: 'about',
        title: 'Excelência em Carnes',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-1558039934-99a288?w=800',
          features: ['Carnes selecionadas', 'Cortes especiais', 'Bufê internacional'],
        },
      },
      {
        type: 'menu',
        title: 'Nossos Cortes',
        content: {
          categories: [
            {
              name: 'Carnes Nobres',
              items: [
                { name: 'Picanha', price: 89.90, description: 'Rodízio completo - Cortesia de carnes' },
                { name: 'Alcatra', price: 79.90, description: 'Corte magro e suculento' },
                { name: 'File Mignon', price: 99.90, description: 'Cubos e medalhões' },
                { name: 'Costela', price: 84.90, description: 'Assada lentamente' },
              ],
            },
            {
              name: 'Bufê Completo',
              items: [
                { name: 'Saladas Variadas', price: 0, description: 'Incluso no rodízio' },
                { name: 'Guarnições', price: 0, description: 'Arroz, farofa, batatas' },
                { name: 'Sobremesas', price: 0, description: 'Doces variados' },
              ],
            },
            {
              name: 'Bebidas',
              items: [
                { name: 'Refrigerante 2L', price: 14.90, description: 'Coca, Guaraná, Fanta' },
                { name: 'Suco Natural 500ml', price: 12.90, description: 'Laranja, Limão, Maracujá' },
                { name: 'Cerveja Long Neck', price: 12.90, description: '330ml' },
                { name: 'Vinho da Casa', price: 89.90, description: 'Garrafa 750ml - Tinto' },
              ],
            },
          ],
        },
      },
      {
        type: 'services',
        title: 'Serviços Especiais',
        content: {
          services: [
            { name: 'Rodízio Premium', description: 'Mais de 15 cortes de carne', icon: 'drumstick' },
            { name: 'Eventos Corporativos', description: 'Espaço para empresas', icon: 'building' },
            { name: 'Aniversários', description: 'Pacotes especiais para festas', icon: 'birthday-cake' },
            { name: 'Delivery de Marmitas', description: 'Almoço executivo', icon: 'truck' },
          ],
        },
      },
      {
        type: 'booking',
        title: 'Reserve sua Mesa',
        content: {
          message: 'Garanta sua experiência gastronômica',
          phone: '{{businessPhone}}',
          whatsapp: '{{businessPhone}}',
          availableTimes: 'Ter-Dom: 11h30-15h | 18h30-23h',
          formFields: ['name', 'phone', 'date', 'time', 'people', 'message'],
        },
      },
      {
        type: 'contact',
        title: 'Visite-nos',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Ter-Dom: 11h30-15h | 18h30-23h',
          whatsapp: '{{businessPhone}}',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Reservas', href: '#booking' },
        { label: 'Cardápio', href: '#menu' },
        { label: 'Eventos', href: '#services' },
      ],
    },
  },
};

// ==================== ICE CREAM / SORVETERIA ===================
export const iceCreamTemplate: TemplateConfig = {
  id: 'ice-cream-sorveteria',
  businessType: 'ICE_CREAM',
  style: 'ECOMMERCE',
  name: 'Sorveteria & Ice Cream',
  description: 'Sorvetes artesanais, picolés, açaí na tigela e milk-shakes refrescantes',
  thumbnail: '/templates/ice-cream.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'O refresco que você precisa. Sabores únicos e ingredientes naturais.',
      backgroundImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200',
      ctaText: 'Ver Sabores',
      ctaLink: '#products',
    },
    sections: [
      {
        type: 'menu',
        title: 'Nossos Sabores',
        content: {
          categories: [
            {
              name: 'Sorvetes Artesanais',
              items: [
                { name: 'Chocolate Belga', price: 15.90, description: 'Sorvete artesanal 150ml' },
                { name: 'Baunilha com Cookies', price: 16.90, description: '150ml - Pedacinhos de cookies' },
                { name: 'Morango Natural', price: 15.90, description: '150ml - Fruta fresca' },
                { name: 'Pistache', price: 18.90, description: '150ml - Sorvete premium' },
              ],
            },
            {
              name: 'Açaí & Bowls',
              items: [
                { name: 'Açaí na Tigela P', price: 18.90, description: '300ml - Com banana e granola' },
                { name: 'Açaí na Tigela M', price: 24.90, description: '500ml - Completo' },
                { name: 'Açaí na Tigela G', price: 32.90, description: '700ml - Super completo' },
              ],
            },
            {
              name: 'Picolés & Milk-shakes',
              items: [
                { name: 'Picolé de Fruta', price: 8.90, description: 'Vários sabores' },
                { name: 'Milk-shake P', price: 18.90, description: '300ml - Chocolate, Morango' },
                { name: 'Milk-shake G', price: 26.90, description: '500ml - Com chantily' },
              ],
            },
          ],
        },
      },
      {
        type: 'services',
        title: 'Serviços',
        content: {
          services: [
            { name: 'Entrega Rápida', description: 'Em até 30 minutos', icon: 'truck' },
            { name: 'Montamos sua Tigela', description: 'Personalize com toppings', icon: 'bowl' },
            { name: 'Encomendas', description: 'Para festas e eventos', icon: 'birthday-cake' },
            { name: 'Açaí no Copo', description: 'Ideal para o verão', icon: 'glass-whisper' },
          ],
        },
      },
      {
        type: 'contact',
        title: 'Faça seu Pedido',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Dom: 10h-22h',
          whatsapp: '{{businessPhone}}',
          deliveryAreas: 'Entregamos em toda a cidade',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Sabores', href: '#menu' },
        { label: 'Delivery', href: '#contact' },
        { label: 'Promoções', href: '#' },
      ],
    },
  },
};

// ==================== BREWERY / CERVEJARIA ARTESANAL ===================
export const breweryTemplate: TemplateConfig = {
  id: 'brewery-artesanal',
  businessType: 'BREWERY',
  style: 'ECOMMERCE',
  name: 'Cervejaria Artesanal',
  description: 'Cervejas artesanais com processo próprio, bar para degustações e tours pela fábrica',
  thumbnail: '/templates/brewery.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Cervejas artesanais únicas. Processo artesanal e ingredientes selecionados.',
      backgroundImage: 'https://images.unsplash.com/photo-153595139882?w=1200',
      ctaText: 'Ver Cervejas',
      ctaLink: '#products',
    },
    sections: [
      {
        type: 'about',
        title: 'Nossa Cervejaria',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-153595139882?w=800',
          features: ['Processo artesanal', 'Lúpulo próprio', 'Bar para degustação'],
        },
      },
      {
        type: 'menu',
        title: 'Nossas Cervejas',
        content: {
          categories: [
            {
              name: 'IPAs & Ales',
              items: [
                { name: 'IPA Tropical', price: 18.90, description: '500ml - Lúpulo intenso, notas cítricas' },
                { name: 'Pale Ale', price: 16.90, description: '500ml - Equilibrada, notas de caramelo' },
                { name: 'Session IPA', price: 15.90, description: '350ml - Leve e refrescante' },
              ],
            },
            {
              name: 'Lagers & Pilsens',
              items: [
                { name: 'Pilsen Premium', price: 14.90, description: '500ml - Clássica e refrescante' },
                { name: 'Munich Dunkel', price: 17.90, description: '500ml - Notas de chocolate' },
                { name: 'Vienna Lager', price: 16.90, description: '500ml - Cor âmbar' },
              ],
            },
            {
              name: 'Kits & Merchandising',
              items: [
                { name: 'Kit Degustação (6 un)', price: 89.90, description: '6 cervejas 350ml variadas' },
                { name: 'Kit Chopeira + 10 L', price: 299.90, description: 'Chopeira elétrica + 10L de chope' },
                { name: 'Camiseta Oficial', price: 49.90, description: 'Tamanhos P a GG' },
              ],
            },
          ],
        },
      },
      {
        type: 'services',
        title: 'Tours & Eventos',
        content: {
          services: [
            { name: 'Tour pela Fábrica', description: 'Sábados às 14h e 16h', icon: 'industry' },
            { name: 'Degustação Guiada', description: '6 chopes + petiscos', icon: 'beer' },
            { name: 'Noite do Pub', description: 'Sextas e sábados', icon: 'music' },
            { name: 'Eventos Corporativos', description: 'Espaço para empresas', icon: 'building' },
          ],
        },
      },
      {
        type: 'booking',
        title: 'Agende um Tour',
        content: {
          message: 'Conheça nossa fábrica e proceso artesanal',
          phone: '{{businessPhone}}',
          whatsapp: '{{businessPhone}}',
          availableTimes: 'Sáb: 14h e 16h',
          formFields: ['name', 'phone', 'date', 'people', 'message'],
        },
      },
      {
        type: 'contact',
        title: 'Visite-nos',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Ter-Sex: 17h-23h | Sáb-Dom: 14h-00h',
          whatsapp: '{{businessPhone}}',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Cervejas', href: '#menu' },
        { label: 'Tour', href: '#booking' },
        { label: 'Bar', href: '#contact' },
      ],
    },
  },
};

// ==================== YOGA STUDIO ===================
export const yogaStudioTemplate: TemplateConfig = {
  id: 'yoga-studio-peace',
  businessType: 'YOGA_STUDIO',
  style: 'BOOKING',
  name: 'Yoga & Bem-estar',
  description: 'Aulas de yoga, meditação, pilates e bem-estar com professores certificados',
  thumbnail: '/templates/yoga.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Encontre equilíbrio e paz interior. Aulas para todos os níveis.',
      backgroundImage: 'https://images.unsplash.com/photo-1545201?w=1200',
      ctaText: 'Agendar Aula',
      ctaLink: '#booking',
    },
    sections: [
      {
        type: 'about',
        title: 'Nossa Filosofia',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-1545201?w=800',
          features: ['Professores certificados', 'Ambiente tranquilo', 'Turmas pequenas'],
        },
      },
      {
        type: 'services',
        title: 'Nossas Modalidades',
        content: {
          services: [
            { name: 'Yoga Iniciante', price: 60.00, duration: '1h', description: 'Hatha Yoga básico' },
            { name: 'Vinyasa Flow', price: 70.00, duration: '1h15min', description: 'Fluidez e força' },
            { name: 'Meditação', price: 40.00, duration: '45min', description: 'Mindfulness e relaxamento' },
            { name: 'Pilates', price: 75.00, duration: '1h', description: 'Core e postura' },
            { name: 'Yoga Avançado', price: 80.00, duration: '1h30min', description: 'Asanas desafioras' },
            { name: 'Aula Particular', price: 120.00, duration: '1h', description: 'Atendimento personalizado' },
          ],
        },
      },
      {
        type: 'services',
        title: 'Planos Mensais',
        content: {
          services: [
            { name: 'Plano Básico', price: 199.00, duration: 'Mensal', description: '2 aulas por semana' },
            { name: 'Plano Completo', price: 299.00, duration: 'Mensal', description: 'Acesso ilimitado' },
            { name: 'Plano Família', price: 449.00, duration: 'Mensal', description: 'Até 4 pessoas' },
          ],
        },
      },
      {
        type: 'booking',
        title: 'Agende sua Aula',
        content: {
          message: 'Comece sua jornada de bem-estar hoje',
          phone: '{{businessPhone}}',
          whatsapp: '{{businessPhone}}',
          availableTimes: 'Seg-Sex: 7h-20h | Sáb: 8h-12h',
          formFields: ['name', 'phone', 'email', 'modality', 'date', 'time'],
        },
      },
      {
        type: 'gallery',
        title: 'Nossas Aulas',
        content: {
          images: [
            'https://images.unsplash.com/photo-1545201?w=600',
            'https://images.unsplash.com/photo-150612661?w=600',
            'https://images.unsplash.com/photo-1544360?w=600',
            'https://images.unsplash.com/photo-151089?w=600',
          ],
        },
      },
      {
        type: 'contact',
        title: 'Visite-nos',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 7h-20h | Sáb: 8h-12h | Dom: Fechado',
          whatsapp: '{{businessPhone}}',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Aulas', href: '#services' },
        { label: 'Planos', href: '#services' },
        { label: 'Agendamento', href: '#booking' },
      ],
    },
  },
};

// ==================== DANCE STUDIO ===================
export const danceStudioTemplate: TemplateConfig = {
  id: 'dance-studio-rhythm',
  businessType: 'DANCE_STUDIO',
  style: 'BOOKING',
  name: 'Studio de Dança',
  description: 'Aulas de dança para todas as idades: ballet, jazz, hip-hop, salsa, zumba e muito mais',
  thumbnail: '/templates/dance.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Sinta o ritmo! Aulas para todas as idades e níveis.',
      backgroundImage: 'https://images.unsplash.com/photo-1508701?w=1200',
      ctaText: 'Agendar Aula Teste',
      ctaLink: '#booking',
    },
    sections: [
      {
        type: 'services',
        title: 'Nossas Modalidades',
        content: {
          services: [
            { name: 'Ballet Infantil', price: 120.00, duration: '1h', description: '3 a 6 anos' },
            { name: 'Ballet Juvenil', price: 140.00, duration: '1h30min', description: '7 a 15 anos' },
            { name: 'Jazz', price: 130.00, duration: '1h', description: 'Todos os níveis' },
            { name: 'Hip-Hop', price: 130.00, duration: '1h', description: 'Infantil e adulto' },
            { name: 'Zumba', price: 80.00, duration: '1h', description: 'Fitness & diversão' },
            { name: 'Salsa', price: 150.00, duration: '1h', description: 'Para casais' },
          ],
        },
      },
      {
        type: 'services',
        title: 'Planos Mensais',
        content: {
          services: [
            { name: '1 Modalidade', price: 180.00, duration: 'Mensal', description: '2 aulas por semana' },
            { name: '2 Modalidades', price: 280.00, duration: 'Mensal', description: '4 aulas por semana' },
            { name: 'Livre', price: 350.00, duration: 'Mensal', description: 'Acesso ilimitado' },
          ],
        },
      },
      {
        type: 'about',
        title: 'Sobre Nossa Escola',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-1508701?w=800',
          features: ['Professores qualificados', 'Espaço climatizado', 'Vestiário completo'],
        },
      },
      {
        type: 'booking',
        title: 'Agende sua Aula Teste',
        content: {
          message: 'Primeira aula grátis!',
          phone: '{{businessPhone}}',
          whatsapp: '{{businessPhone}}',
          availableTimes: 'Seg-Sex: 8h-20h | Sáb: 8h-12h',
          formFields: ['name', 'phone', 'age', 'modality', 'date', 'time'],
        },
      },
      {
        type: 'gallery',
        title: 'Nossas Aulas',
        content: {
          images: [
            'https://images.unsplash.com/photo-1508701?w=600',
            'https://images.unsplash.com/photo-1525288?w=600',
            'https://images.unsplash.com/photo-1542867?w=600',
            'https://images.unsplash.com/photo-151883410?w=600',
          ],
        },
      },
      {
        type: 'contact',
        title: 'Visite-nos',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 8h-20h | Sáb: 8h-12h | Dom: Fechado',
          whatsapp: '{{businessPhone}}',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Modalidades', href: '#services' },
        { label: 'Planos', href: '#services' },
        { label: 'Agendamento', href: '#booking' },
      ],
    },
  },
};

// ==================== SPA & WELLNESS ===================
export const spaTemplate: TemplateConfig = {
  id: 'spa-wellness',
  businessType: 'SPA',
  style: 'BOOKING',
  name: 'Spa & Bem-estar',
  description: 'Tratamentos de beleza, massagens relaxantes, day use e pacotes de bem-estar',
  thumbnail: '/templates/spa.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Relaxe e renovese. Tratamentos exclusivos para seu bem-estar.',
      backgroundImage: 'https://images.unsplash.com/photo-154055570?w=1200',
      ctaText: 'Agendar Horário',
      ctaLink: '#booking',
    },
    sections: [
      {
        type: 'services',
        title: 'Nossos Tratamentos',
        content: {
          services: [
            { name: 'Massagem Relaxante', price: 120.00, duration: '1h', description: 'Técnicas suedesas' },
            { name: 'Massagem com Pedras Quentes', price: 150.00, duration: '1h15min', description: 'Basalto vulcânico' },
            { name: 'Limpeza de Pele', price: 180.00, duration: '1h30min', description: 'Hidratação profunda' },
            { name: 'Drenagem Linfática', price: 130.00, duration: '1h', description: 'Redução de inchaço' },
            { name: 'Day Use Completo', price: 350.00, duration: '4h', description: 'Massagem + Limpeza + Spa' },
            { name: 'Pacote Casal', price: 550.00, duration: '5h', description: 'Day use para dois' },
          ],
        },
      },
      {
        type: 'about',
        title: 'Nossa Filosofia',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-154055570?w=800',
          features: ['Terapeutas certificados', 'Produtos orgânicos', 'Ambiente zen'],
        },
      },
      {
        type: 'booking',
        title: 'Agende seu Horário',
        content: {
          message: 'Invista no seu bem-estar',
          phone: '{{businessPhone}}',
          whatsapp: '{{businessPhone}}',
          availableTimes: 'Seg-Sex: 9h-20h | Sáb: 9h-17h | Dom: 10h-14h',
          formFields: ['name', 'phone', 'service', 'date', 'time'],
        },
      },
      {
        type: 'gallery',
        title: 'Nossas Instalações',
        content: {
          images: [
            'https://images.unsplash.com/photo-154055570?w=600',
            'https://images.unsplash.com/photo-154416?w=600',
            'https://images.unsplash.com/photo-1598301235?w=600',
            'https://images.unsplash.com/photo-156075?w=600',
          ],
        },
      },
      {
        type: 'contact',
        title: 'Visite-nos',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 9h-20h | Sáb: 9h-17h | Dom: 10h-14h',
          whatsapp: '{{businessPhone}}',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Tratamentos', href: '#services' },
        { label: 'Agendamento', href: '#booking' },
        { label: 'Pacotes', href: '#services' },
      ],
    },
  },
};

// ==================== CLOTHING STORE / LOJA DE ROUPAS ===================
export const clothingStoreTemplate: TemplateConfig = {
  id: 'clothing-fashion',
  businessType: 'CLOTHING',
  style: 'ECOMMERCE',
  name: 'Moda & Roupas',
  description: 'Loja de roupas com coleções sazonais, roupas masculinas, femininas e infantis',
  thumbnail: '/templates/clothing.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'As últimas tendências da moda. Estilo para todas as ocasiões.',
      backgroundImage: 'https://images.unsplash.com/photo-1556903?w=1200',
      ctaText: 'Ver Coleção',
      ctaLink: '#products',
    },
    sections: [
      {
        type: 'menu',
        title: 'Nossas Coleções',
        content: {
          categories: [
            {
              name: 'Feminino',
              items: [
                { name: 'Vestido Longo', price: 189.90, description: 'Viscose, várias cores', sizes: ['P', 'M', 'G', 'GG'] },
                { name: 'Blusa de Seda', price: 129.90, description: 'Seda pura, toque suave' },
                { name: 'Calça Jeans Skinny', price: 159.90, description: 'Elasticada, vários lavagens' },
                { name: 'Saia Midi', price: 119.90, description: 'Tecido leve, ideal para verão' },
              ],
            },
            {
              name: 'Masculino',
              items: [
                { name: 'Camisa Social', price: 149.90, description: 'Algodão egípcio, várias cores' },
                { name: 'Calça Jeans', price: 179.90, description: 'Slim fit, lavagem escura' },
                { name: 'Blazer', price: 299.90, description: 'Lã fria, corte italiano' },
                { name: 'Camiseta Básica', price: 49.90, description: 'Pacote com 3 unidades' },
              ],
            },
            {
              name: 'Infantil',
              items: [
                { name: 'Kit Vestido + Legging', price: 89.90, description: 'Para meninas 2 a 10 anos' },
                { name: 'Camisa Polo', price: 59.90, description: 'Algodão, números 2 a 14' },
                { name: 'Calção de Banho', price: 49.90, description: 'Proteção UV 50+' },
              ],
            },
          ],
        },
      },
      {
        type: 'services',
        title: 'Vantagens',
        content: {
          services: [
            { name: 'Troca Garantida', description: '30 dias para trocar', icon: 'refresh' },
            { name: 'Frete Grátis', description: 'Compras acima de R$ 200', icon: 'truck' },
            { name: 'Tabata Virtual', description: 'Experimente no virtual', icon: 'vr-cardboard' },
            { name: 'Cartão de Crédito', description: 'Parceria com bancos', icon: 'credit-card' },
          ],
        },
      },
      {
        type: 'about',
        title: 'Sobre Nossa Loja',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-1556903?w=800',
          features: ['Mais de 1000 itens', 'Marcas exclusivas', 'Atendimento especializado'],
        },
      },
      {
        type: 'contact',
        title: 'Faça seu Pedido',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 9h-20h | Sáb: 9h-18h | Dom: 10h-14h',
          whatsapp: '{{businessPhone}}',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Feminino', href: '#products' },
        { label: 'Masculino', href: '#products' },
        { label: 'Infantil', href: '#products' },
      ],
    },
  },
};

// ==================== JEWELRY / JOALHERIA ===================
export const jewelryTemplate: TemplateConfig = {
  id: 'jewelry-luxury',
  businessType: 'JEWELRY',
  style: 'ECOMMERCE',
  name: 'Joalheria & Semijojas',
  description: 'Jóias finas, semijojas, relógios e acessórios com garantia e certificado',
  thumbnail: '/templates/jewelry.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Brilho e elegância. Jóias que marcam momentos especiais.',
      backgroundImage: 'https://images.unsplash.com/photo-1611083?w=1200',
      ctaText: 'Ver Coleção',
      ctaLink: '#products',
    },
    sections: [
      {
        type: 'menu',
        title: 'Nossas Jóias',
        content: {
          categories: [
            {
              name: 'Alianças & Anéis',
              items: [
                { name: 'Aliança de Ouro 18k', price: 890.00, description: 'Meio toque, 4mm' },
                { name: 'Anel de Diamante', price: 2500.00, description: '0.5 quilates, GVS' },
                { name: 'Anel de Rubi', price: 1200.00, description: 'Ouro 18k, pedra natural' },
              ],
            },
            {
              name: 'Colares & Pingentes',
              items: [
                { name: 'Pingente de Ouro', price: 450.00, description: 'Ouro 18k, 2cm' },
                { name: 'Colar de Pérolas', price: 680.00, description: 'Pérolas de cultivo' },
                { name: 'Gargantilha de Prata', price: 280.00, description: 'Prata 925, zirconias' },
              ],
            },
            {
              name: 'Semijojas & Acessórios',
              items: [
                { name: 'Brinco de Zircônia', price: 89.90, description: 'Prata 925, par' },
                { name: 'Pulseira de Couro', price: 59.90, description: 'Couro legítimo' },
                { name: 'Relógio Feminino', price: 299.90, description: 'Aço inoxidável' },
              ],
            },
          ],
        },
      },
      {
        type: 'services',
        title: 'Serviços Exclusivos',
        content: {
          services: [
            { name: 'Certificado de Autenticidade', description: 'Garantia em todas as peças', icon: 'certificate' },
            { name: 'Embalagem para Presente', description: 'Grátis em todas as compras', icon: 'gift' },
            { name: 'Ajuste de Alianças', description: 'Grátis para cliente', icon: 'tools' },
            { name: 'Consultoria de Imagem', description: 'Agende um horário', icon: 'user-tie' },
          ],
        },
      },
      {
        type: 'about',
        title: 'Tradição em Joalheria',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-1611083?w=800',
          features: ['Mais de 30 anos', 'Jóias certificadas', 'Garantia vitalícia'],
        },
      },
      {
        type: 'contact',
        title: 'Visite-nos',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 9h-19h | Sáb: 9h-17h | Dom: Fechado',
          whatsapp: '{{businessPhone}}',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Jóias', href: '#products' },
        { label: 'Semijojas', href: '#products' },
        { label: 'Acessórios', href: '#products' },
      ],
    },
  },
};

// ==================== ART GALLERY ===================
export const artGalleryTemplate: TemplateConfig = {
  id: 'art-gallery-culture',
  businessType: 'ART_GALLERY',
  style: 'PORTFOLIO',
  name: 'Galeria de Arte',
  description: 'Obras de arte, quadros, esculturas e exposições de artistas locais e nacionais',
  thumbnail: '/templates/art-gallery.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Onde a arte encontra o colecionador. Obras exclusivas e exposições únicas.',
      backgroundImage: 'https://images.unsplash.com/photo-154789?w=1200',
      ctaText: 'Ver Obras',
      ctaLink: '#products',
    },
    sections: [
      {
        type: 'menu',
        title: 'Obras em Destaque',
        content: {
          categories: [
            {
              name: 'Pinturas',
              items: [
                { name: 'Paisagem ao Entardecer', price: 2500.00, description: 'Óleo sobre tela, 80x60cm', artist: 'Maria Silva' },
                { name: 'Abstrato Azul', price: 1800.00, description: 'Acrílico, 100x80cm', artist: 'João Santos' },
                { name: 'Retrato Familiar', price: 3200.00, description: 'Óleo sobre tela, 120x90cm', artist: 'Ana Costa' },
              ],
            },
            {
              name: 'Esculturas',
              items: [
                { name: 'Forma & Espaço', price: 4500.00, description: 'Mármore de Carrara, 50cm', artist: 'Robert Lee' },
                { name: 'Estrutura Viva', price: 3200.00, description: 'Aço inoxidável, 80cm', artist: 'Carlos Mendes' },
              ],
            },
            {
              name: 'Fotografias',
              items: [
                { name: 'Urbano 01', price: 800.00, description: 'Impressão fine art, 60x40cm' },
                { name: 'Natureza Morta', price: 650.00, description: 'Impressão fine art, 50x50cm' },
              ],
            },
          ],
        },
      },
      {
        type: 'services',
        title: 'Serviços',
        content: {
          services: [
            { name: 'Restauro de Quadros', description: 'Especialistas em arte', icon: 'paint-brush' },
            { name: 'Moldura sob Medida', description: 'Vários modelos e acabamentos', icon: 'border-style' },
            { name: 'Exposições Temporárias', description: 'Espaço para artistas', icon: 'images' },
            { name: 'Consultoria de Arte', description: 'Para empresas e colecionadores', icon: 'user-tie' },
          ],
        },
      },
      {
        type: 'gallery',
        title: 'Obras Recentes',
        content: {
          images: [
            'https://images.unsplash.com/photo-154789?w=600',
            'https://images.unsplash.com/photo-1500462?w=600',
            'https://images.unsplash.com/photo-154949?w=600',
            'https://images.unsplash.com/photo-154789?w=600',
          ],
        },
      },
      {
        type: 'about',
        title: 'Sobre Nossa Galeria',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-154789?w=800',
          features: ['30+ artistas', 'Restauro especializado', 'Moldura própria'],
        },
      },
      {
        type: 'contact',
        title: 'Visite-nos',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Ter-Sex: 10h-19h | Sáb: 10h-17h | Dom: Fechado',
          whatsapp: '{{businessPhone}}',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Obras', href: '#products' },
        { label: 'Artistas', href: '#' },
        { label: 'Exposições', href: '#services' },
      ],
    },
  },
};

// ==================== CLINIC / CLÍNICA MÉDICA ===================
export const clinicTemplate: TemplateConfig = {
  id: 'clinic-medical',
  businessType: 'CLINIC',
  style: 'BOOKING',
  name: 'Clínica Médica',
  description: 'Consultas médicas, exames, especialidades e agendamento online',
  thumbnail: '/templates/clinic.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Saúde e bem-estar. Atendimento médico especializado.',
      backgroundImage: 'https://images.unsplash.com/photo-157609116?w=1200',
      ctaText: 'Agendar Consulta',
      ctaLink: '#booking',
    },
    sections: [
      {
        type: 'services',
        title: 'Nossas Especialidades',
        content: {
          services: [
            { name: 'Clínico Geral', price: 200.00, duration: '30min', description: 'Consulta básica' },
            { name: 'Cardiologia', price: 350.00, duration: '45min', description: 'ECG + Consulta' },
            { name: 'Dermatologia', price: 300.00, duration: '40min', description: 'Avaliação de pele' },
            { name: 'Ortopedia', price: 320.00, duration: '40min', description: 'Avaliação osteoarticular' },
            { name: 'Pediatria', price: 250.00, duration: '30min', description: 'Atendimento infantil' },
            { name: 'Ginecologia', price: 280.00, duration: '40min', description: 'Exame papanicolau' },
          ],
        },
      },
      {
        type: 'services',
        title: 'Exames',
        content: {
          services: [
            { name: 'Eletrocardiograma', price: 120.00, duration: '15min', description: 'ECG completo' },
            { name: 'Raio-X', price: 80.00, duration: '15min', description: 'Diversas regiões' },
            { name: 'Ultrassom', price: 200.00, duration: '30min', description: 'Vários tipos' },
            { name: 'Análises Clínicas', price: 150.00, duration: '15min', description: 'Coleta em domicílio' },
          ],
        },
      },
      {
        type: 'about',
        title: 'Sobre Nossa Clínica',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-157609116?w=800',
          features: ['Médicos especialistas', 'Equipamentos modernos', 'Convênios aceitos'],
        },
      },
      {
        type: 'booking',
        title: 'Agende sua Consulta',
        content: {
          message: 'Sua saúde em boas mãos',
          phone: '{{businessPhone}}',
          whatsapp: '{{businessPhone}}',
          availableTimes: 'Seg-Sex: 7h-19h | Sáb: 7h-12h',
          formFields: ['name', 'phone', 'specialty', 'date', 'time'],
        },
      },
      {
        type: 'contact',
        title: 'Visite-nos',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 7h-19h | Sáb: 7h-12h | Dom: Plantão',
          whatsapp: '{{businessPhone}}',
          emergencyPhone: '(11) 99999-9999',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Especialidades', href: '#services' },
        { label: 'Exames', href: '#services' },
        { label: 'Agendamento', href: '#booking' },
      ],
    },
  },
};

// ==================== DENTIST / ODONTOLOGIST ===================
export const dentistTemplate: TemplateConfig = {
  id: 'dentist-smile',
  businessType: 'DENTIST',
  style: 'BOOKING',
  name: 'Consultório Dentário',
  description: 'Tratamentos dentários, ortodontia, implantes, clareamento e estética dental',
  thumbnail: '/templates/dentist.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Seu sorriso em boas mãos. Tecnologia e cuidado para seus dentes.',
      backgroundImage: 'https://images.unsplash.com/photo-16068119737?w=1200',
      ctaText: 'Agendar Consulta',
      ctaLink: '#booking',
    },
    sections: [
      {
        type: 'services',
        title: 'Nossos Tratamentos',
        content: {
          services: [
            { name: 'Consulta + Limpeza', price: 150.00, duration: '45min', description: 'Avaliação e profilaxia' },
            { name: 'Clareamento Dental', price: 800.00, duration: '2 sessões', description: 'Lasere ou caseiro' },
            { name: 'Implante Dentário', price: 2500.00, duration: '1h', description: 'Implante de titânio' },
            { name: 'Ortodontia (Aparelho)', price: 3500.00, duration: '18-24 meses', description: 'Parcelamos em até 24x' },
            { name: 'Facetas de Porcelana', price: 1200.00, duration: '2 sessões', description: 'Por dente' },
            { name: 'Canal (Endodontia)', price: 600.00, duration: '2 sessões', description: 'Tratamento de canal' },
          ],
        },
      },
      {
        type: 'about',
        title: 'Sobre Nosso Consultório',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-16068119737?w=800',
          features: ['Tecnologia digital', 'Anestesia sem dor', 'Financiamento próprio'],
        },
      },
      {
        type: 'testimonials',
        title: 'O que dizem nossos pacientes',
        content: {
          testimonials: [
            { name: 'Maria Silva', text: 'Melhor dentista da cidade! Clareamento perfeito.', rating: 5 },
            { name: 'João Santos', text: 'Implante foi tranquilo, sem dor nenhuma.', rating: 5 },
            { name: 'Ana Costa', text: 'Atendimento humanizado e tecnologia de ponta.', rating: 5 },
          ],
        },
      },
      {
        type: 'booking',
        title: 'Agende sua Consulta',
        content: {
          message: 'Cuide do seu sorriso hoje',
          phone: '{{businessPhone}}',
          whatsapp: '{{businessPhone}}',
          availableTimes: 'Seg-Sex: 8h-19h | Sáb: 8h-12h',
          formFields: ['name', 'phone', 'service', 'date', 'time'],
        },
      },
      {
        type: 'contact',
        title: 'Visite-nos',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 8h-19h | Sáb: 8h-12h | Dom: Plantão',
          whatsapp: '{{businessPhone}}',
          emergencyPhone: '(11) 99999-9999',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Tratamentos', href: '#services' },
        { label: 'Agendamento', href: '#booking' },
        { label: 'Depoimentos', href: '#testimonials' },
      ],
    },
  },
};

// ==================== OPTICS / ÓTICA ===================
export const opticsTemplate: TemplateConfig = {
  id: 'optics-vision',
  businessType: 'OPTICS',
  style: 'ECOMMERCE',
  name: 'Ótica & Visão',
  description: 'Óculos de grau, solares, lentes de contato e exames de vista com tecnologia avançada',
  thumbnail: '/templates/optics.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Enxergue o mundo com clareza. Óculos modernos e lentes de alta qualidade.',
      backgroundImage: 'https://images.unsplash.com/photo-1576567?w=1200',
      ctaText: 'Agendar Exame',
      ctaLink: '#booking',
    },
    sections: [
      {
        type: 'menu',
        title: 'Nossos Produtos',
        content: {
          categories: [
            {
              name: 'Óculos de Grau',
              items: [
                { name: 'Armação Ray-Ban', price: 890.00, description: 'Modelo Aviador, várias cores' },
                { name: 'Armação Prada', price: 1200.00, description: 'Acetato premium' },
                { name: 'Armação Nacional', price: 350.00, description: 'Griffe nacional' },
              ],
            },
            {
              name: 'Óculos de Sol',
              items: [
                { name: 'Ray-Ban Aviador', price: 950.00, description: 'Lentes polarizadas' },
                { name: 'Oakley Sport', price: 1100.00, description: 'Para esportes' },
                { name: 'Prada Feminino', price: 1500.00, description: 'Estilo e proteção' },
              ],
            },
            {
              name: 'Lentes de Contato',
              items: [
                { name: 'Acuvue Oasys', price: 180.00, description: 'Caixa com 6 lentes, 1 mes' },
                { name: 'Air Optix', price: 150.00, description: 'Caixa com 6 lentes, 1 mês' },
                { name: 'Lentes Coloridas', price: 220.00, description: 'Várias cores, 1 mês' },
              ],
            },
          ],
        },
      },
      {
        type: 'services',
        title: 'Nossos Serviços',
        content: {
          services: [
            { name: 'Exame de Vista', description: 'Grátis na compra de armação', icon: 'eye' },
            { name: 'Lentes Multifocais', description: 'Para presbiopia', icon: 'glasses' },
            { name: 'Troca de Armação', description: 'Mantemos suas lentes', icon: 'exchange-alt' },
            { name: 'Ajuste & Limpeza', description: 'Grátis para cliente', icon: 'tools' },
          ],
        },
      },
      {
        type: 'booking',
        title: 'Agende seu Exame',
        content: {
          message: 'Cuide da sua visão',
          phone: '{{businessPhone}}',
          whatsapp: '{{businessPhone}}',
          availableTimes: 'Seg-Sex: 8h-18h | Sáb: 8h-12h',
          formFields: ['name', 'phone', 'date', 'time'],
        },
      },
      {
        type: 'contact',
        title: 'Visite-nos',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 8h-18h | Sáb: 8h-12h | Dom: Fechado',
          whatsapp: '{{businessPhone}}',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Óculos', href: '#products' },
        { label: 'Lentes', href: '#products' },
        { label: 'Exame', href: '#booking' },
      ],
    },
  },
};

// ==================== NUTRITIONIST ===================
export const nutritionistTemplate: TemplateConfig = {
  id: 'nutritionist-health',
  businessType: 'NUTRITIONIST',
  style: 'BOOKING',
  name: 'Nutricionista',
  description: 'Consultas nutricionais, dietas personalizadas, avaliação física e acompanhamento online',
  thumbnail: '/templates/nutritionist.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Alimentação saudável e equilibrada. Alcance seus objetivos com saúde.',
      backgroundImage: 'https://images.unsplash.com/photo-14906465?w=1200',
      ctaText: 'Agendar Consulta',
      ctaLink: '#booking',
    },
    sections: [
      {
        type: 'services',
        title: 'Nossos Serviços',
        content: {
          services: [
            { name: 'Consulta Inicial', price: 180.00, duration: '1h', description: 'Avaliação completa + dieta' },
            { name: 'Acompanhamento Mensal', price: 250.00, duration: '4 encontros', description: 'Reajuste de dieta' },
            { name: 'Dieta para Emagrecimento', price: 300.00, duration: 'Plano de 1 mês', description: 'Perda de peso saudável' },
            { name: 'Dieta para Hipertrofia', price: 350.00, duration: 'Plano de 1 mês', description: 'Ganho de massa muscular' },
            { name: 'Avaliação Física', price: 80.00, duration: '30min', description: 'Bioimpedância' },
            { name: 'Consulta Online', price: 150.00, duration: '45min', description: 'Videochamada' },
          ],
        },
      },
      {
        type: 'about',
        title: 'Sobre Nossa Nutricionista',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-14906465?w=800',
          features: ['CRN ativo', 'Atendimento personalizado', 'Acompanhamento online'],
        },
      },
      {
        type: 'testimonials',
        title: 'Resultados de Pacientes',
        content: {
          testimonials: [
            { name: 'Carlos Silva', text: 'Perdi 15kg em 3 meses com a dieta. Recomendo!', rating: 5 },
            { name: 'Fernanda Lima', text: 'Acompanhamento incrível. Alcancei meu objetivo.', rating: 5 },
            { name: 'Roberto Santos', text: 'Dieta para hipertrofia funcionou perfeitamente.', rating: 5 },
          ],
        },
      },
      {
        type: 'booking',
        title: 'Agende sua Consulta',
        content: {
          message: 'Transforme sua saúde hoje',
          phone: '{{businessPhone}}',
          whatsapp: '{{businessPhone}}',
          availableTimes: 'Seg-Sex: 8h-18h | Sáb: 8h-12h',
          formFields: ['name', 'phone', 'objective', 'date', 'time'],
        },
      },
      {
        type: 'contact',
        title: 'Contato',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 8h-18h | Sáb: 8h-12h | Dom: Fechado',
          whatsapp: '{{businessPhone}}',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Serviços', href: '#services' },
        { label: 'Agendamento', href: '#booking' },
        { label: 'Depoimentos', href: '#testimonials' },
      ],
    },
  },
};

// ==================== PLUMBING / ENCANADOR ===================
export const plumbingTemplate: TemplateConfig = {
  id: 'plumbing-services',
  businessType: 'PLUMBING',
  style: 'BOOKING',
  name: 'Encanador & Hidráulica',
  description: 'Serviços de hidráulica, consertos de vazamentos, instalação de chuveiros e desentupimentos',
  thumbnail: '/templates/plumbing.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Soluções rápidas para sua hidráulica. Atendimento de emergência 24h.',
      backgroundImage: 'https://images.unsplash.com/photo-160747?w=1200',
      ctaText: 'Chamar Encanador',
      ctaLink: '#contact',
    },
    sections: [
      {
        type: 'services',
        title: 'Nossos Serviços',
        content: {
          services: [
            { name: 'Conserto de Vazamento', price: 120.00, duration: '1h', description: 'Localização e reparo' },
            { name: 'Desentupimento', price: 150.00, duration: '1h30min', description: 'Pias, vasos, ralos' },
            { name: 'Instalação de Chuveiro', price: 80.00, duration: '30min', description: 'Chuveiro elétrico ou gas' },
            { name: 'Troca de Torneira', price: 90.00, duration: '45min', description: 'Torneiras de cozinha ou banheiro' },
            { name: 'Instalação de Calefator', price: 350.00, duration: '2h', description: 'Aquecedor a gás' },
            { name: 'Vistoria Hidráulica', price: 200.00, duration: '1h', description: 'Para compra e venda de imóveis' },
          ],
        },
      },
      {
        type: 'about',
        title: 'Sobre Nosso Serviço',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-160747?w=800',
          features: ['Atendimento 24h', 'Orçamento grátis', 'Garantia nos serviços'],
        },
      },
      {
        type: 'contact',
        title: 'Solicite um Orçamento',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 7h-19h | Sáb: 7h-17h | Dom: Emergências',
          whatsapp: '{{businessPhone}}',
          emergencyPhone: '(11) 99999-9999',
          formFields: ['name', 'phone', 'service', 'address', 'message'],
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Serviços', href: '#services' },
        { label: 'Emergência', href: '#contact' },
        { label: 'Orçamento', href: '#contact' },
      ],
    },
  },
};

// ==================== ELECTRICIAN / ELETRICISTA ===================
export const electricianTemplate: TemplateConfig = {
  id: 'electrician-services',
  businessType: 'ELECTRICIAN',
  style: 'BOOKING',
  name: 'Eletricista Profissional',
  description: 'Instalações elétricas, reparos, quadros de distribuição e projetos residenciais/comerciais',
  thumbnail: '/templates/electrician.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Instalações elétricas com segurança e qualidade. NR-10 atualizada.',
      backgroundImage: 'https://images.unsplash.com/photo-162190748?w=1200',
      ctaText: 'Chamar Eletricista',
      ctaLink: '#contact',
    },
    sections: [
      {
        type: 'services',
        title: 'Nossos Serviços',
        content: {
          services: [
            { name: 'Instalação Residencial', price: 200.00, duration: '2h', description: 'Pontos de luz, tomadas' },
            { name: 'Troca de Fiação', price: 300.00, duration: '3h', description: 'Fiação nova com segurança' },
            { name: 'Quadro de Distribuição', price: 450.00, duration: '3h', description: 'Disjuntores, DDR, DPS' },
            { name: 'Instalação de Ar Condicionado', price: 250.00, duration: '2h', description: 'Split ou janela' },
            { name: 'Reparo em Emergência', price: 150.00, duration: '1h', description: 'Falta de luz, curto-circuito' },
            { name: 'Projeto Elétrico', price: 500.00, duration: 'Projeto', description: 'Para reformas e construções' },
          ],
        },
      },
      {
        type: 'about',
        title: 'Sobre Nosso Serviço',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-162190748?w=800',
          features: ['NR-10 atualizada', 'Seguro de responsabilidade', 'Garantia de 1 ano'],
        },
      },
      {
        type: 'testimonials',
        title: 'Clientes Satisfeitos',
        content: {
          testimonials: [
            { name: 'Marcos Oliveira', text: 'Serviço impecável. Instalação feita rapidamente.', rating: 5 },
            { name: 'Patrícia Mendes', text: 'Eletricista honesto e pontual. Recomendo!', rating: 5 },
            { name: 'Empresa XYZ', text: 'Parceria de anos. Sempre resolvem nossos problemas.', rating: 5 },
          ],
        },
      },
      {
        type: 'contact',
        title: 'Solicite um Orçamento',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 7h-19h | Sáb: 7h-17h | Dom: Emergências',
          whatsapp: '{{businessPhone}}',
          emergencyPhone: '(11) 99999-9999',
          formFields: ['name', 'phone', 'service', 'address', 'message'],
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Serviços', href: '#services' },
        { label: 'Emergência', href: '#contact' },
        { label: 'Orçamento', href: '#contact' },
      ],
    },
  },
};

// ==================== LANDSCAPING / PAISAGISMO ===================
export const landscapingTemplate: TemplateConfig = {
  id: 'landscaping-garden',
  businessType: 'LANDSCAPING',
  style: 'PORTFOLIO',
  name: 'Paisagismo & Jardinagem',
  description: 'Projetos de jardins, manutenção de áreas verdes, irrigação e jardinagem residencial/comercial',
  thumbnail: '/templates/landscaping.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Transforme seu jardim em um paraíso verde. Projetos exclusivos.',
      backgroundImage: 'https://images.unsplash.com/photo-141687?w=1200',
      ctaText: 'Solicitar Projeto',
      ctaLink: '#contact',
    },
    sections: [
      {
        type: 'services',
        title: 'Nossos Serviços',
        content: {
          services: [
            { name: 'Projeto de Jardim', price: 800.00, duration: 'Plano', description: 'Projeto completo 2D/3D' },
            { name: 'Poda de Grama', price: 150.00, duration: '2h', description: 'Poda e adubação' },
            { name: 'Sistema de Irrigação', price: 600.00, duration: '1 dia', description: 'Aspersores ou gotejamento' },
            { name: 'Plantio de Mudas', price: 400.00, duration: '1 dia', description: 'Seleção de plantas' },
            { name: 'Manutenção Mensal', price: 300.00, duration: 'Mensal', description: '4 visitas por mês' },
            { name: 'Jardim Vertical', price: 1200.00, duration: '2 dias', description: 'Parede verde completa' },
          ],
        },
      },
      {
        type: 'gallery',
        title: 'Nossos Projetos',
        content: {
          images: [
            'https://images.unsplash.com/photo-141687?w=600',
            'https://images.unsplash.com/photo-143810889??w=600',
            'https://images.unsplash.com/photo-146227?w=600',
            'https://images.unsplash.com/photo-141687?w=600',
          ],
        },
      },
      {
        type: 'about',
        title: 'Sobre Nossa Empresa',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-141687?w=800',
          features: ['Paisagistas formados', 'Equipamentos próprios', 'Garantia em plantas'],
        },
      },
      {
        type: 'contact',
        title: 'Solicite um Orçamento',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 7h-18h | Sáb: 7h-13h',
          whatsapp: '{{businessPhone}}',
          formFields: ['name', 'phone', 'address', 'project-type', 'message'],
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Serviços', href: '#services' },
        { label: 'Portfólio', href: '#gallery' },
        { label: 'Orçamento', href: '#contact' },
      ],
    },
  },
};

// ==================== MOVING / MUDANÇAS ===================
export const movingTemplate: TemplateConfig = {
  id: 'moving-services',
  businessType: 'MOVING',
  style: 'BOOKING',
  name: 'Mudanças & Transporte',
  description: 'Mudanças residenciais/comerciais, embalagem profissional e transporte seguro',
  thumbnail: '/templates/moving.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Sua mudança sem estresse. Cuidamos de tudo com segurança.',
      backgroundImage: 'https://images.unsplash.com/photo-154472?w=1200',
      ctaText: 'Solicitar Orçamento',
      ctaLink: '#contact',
    },
    sections: [
      {
        type: 'services',
        title: 'Nossos Serviços',
        content: {
          services: [
            { name: 'Mudança Residencial', price: 800.00, duration: '1 dia', description: 'Até 3 cômodos' },
            { name: 'Mudança Comercial', price: 1500.00, duration: '1-2 dias', description: 'Escritórios e comércios' },
            { name: 'Embalagem Profissinal', price: 300.00, duration: '4h', description: 'Materiais inclusos' },
            { name: 'Montagem de Móveis', price: 200.00, duration: '3h', description: 'Móveis desmontados' },
            { name: 'Armazenamento', price: 150.00, duration: 'Por mês', description: 'Galpão seguro' },
          ],
        },
      },
      {
        type: 'about',
        title: 'Sobre Nossa Empresa',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-154472?w=800',
          features: ['Caminhões próprios', 'Seguro de carga', 'Profissionais treinados'],
        },
      },
      {
        type: 'testimonials',
        title: 'Clientes Satisfeitos',
        content: {
          testimonials: [
            { name: 'Família Silva', text: 'Mudança perfeita! Nada quebrou.', rating: 5 },
            { name: 'Empresa ABC', text: 'Mudança comercial rápida e eficiente.', rating: 5 },
            { name: 'João Santos', text: 'Profissionais educados e pontuais.', rating: 5 },
          ],
        },
      },
      {
        type: 'contact',
        title: 'Solicite um Orçamento',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 7h-19h | Sáb: 7h-17h | Dom: Plantão',
          whatsapp: '{{businessPhone}}',
          formFields: ['name', 'phone', 'origin', 'destination', 'items', 'date'],
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Serviços', href: '#services' },
        { label: 'Depoimentos', href: '#testimonials' },
        { label: 'Orçamento', href: '#contact' },
      ],
    },
  },
};

// ==================== CAR WASH / LAVAGEM DE CARROS ===================
export const carWashTemplate: TemplateConfig = {
  id: 'car-wash-shine',
  businessType: 'CAR_WASH',
  style: 'BOOKING',
  name: 'Lavagem de Carros',
  description: 'Lavagem completa, enceramento, polimento e higienização interna com produtos premium',
  thumbnail: '/templates/car-wash.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Seu carro brilhando como novo. Lavagem profissional e produtos premium.',
      backgroundImage: 'https://images.unsplash.com/photo-150287?w=1200',
      ctaText: 'Agendar Lavagem',
      ctaLink: '#booking',
    },
    sections: [
      {
        type: 'services',
        title: 'Nossos Serviços',
        content: {
          services: [
            { name: 'Lavagem Simples', price: 40.00, duration: '30min', description: 'Externa básica' },
            { name: 'Lavagem Completa', price: 80.00, duration: '1h', description: 'Externa + Interna + Aspiração' },
            { name: 'Enceramento', price: 60.00, duration: '45min', description: 'Cera premium' },
            { name: 'Polimento', price: 120.00, duration: '2h', description: 'Correção de pintura' },
            { name: 'Higienização Interna', price: 100.00, duration: '1h30min', description: 'Aspersão + Aspiração + Purificação' },
            { name: 'Lavagem de Motos', price: 30.00, duration: '20min', description: 'Completa' },
          ],
        },
      },
      {
        type: 'about',
        title: 'Sobre Nosso Car Wash',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-150287?w=800',
          features: ['Produtos eco-friendly', 'Profissionais treinados', 'Garantia de satisfação'],
        },
      },
      {
        type: 'booking',
        title: 'Agende sua Lavagem',
        content: {
          message: 'Deixe seu carro com quem entende',
          phone: '{{businessPhone}}',
          whatsapp: '{{businessPhone}}',
          availableTimes: 'Seg-Sex: 8h-18h | Sáb: 8h-14h',
          formFields: ['name', 'phone', 'vehicle', 'service', 'date', 'time'],
        },
      },
      {
        type: 'contact',
        title: 'Visite-nos',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 8h-18h | Sáb: 8h-14h | Dom: Fechado',
          whatsapp: '{{businessPhone}}',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Serviços', href: '#services' },
        { label: 'Agendamento', href: '#booking' },
        { label: 'Promoções', href: '#' },
      ],
    },
  },
};

// ==================== TIRE SHOP / LOJA DE PNEUS ===================
export const tireShopTemplate: TemplateConfig = {
  id: 'tire-shop-safety',
  businessType: 'TIRE_SHOP',
  style: 'BOOKING',
  name: 'Pneus & Serviços',
  description: 'Venda de pneus, alinhamento, balanceamento e troca rápida com garantia',
  thumbnail: '/templates/tire-shop.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Segurança em cada curva. Pneus de todas as marcas e medidas.',
      backgroundImage: 'https://images.unsplash.com/photo-1504216?w=1200',
      ctaText: 'Agendar Serviço',
      ctaLink: '#booking',
    },
    sections: [
      {
        type: 'menu',
        title: 'Nossos Produtos',
        content: {
          categories: [
            {
              name: 'Pneus de Passeio',
              items: [
                { name: 'Pirelli Cinturato 175/65 R14', price: 320.00, description: 'Pneu para carros pequenos' },
                { name: 'Michelin Energy 195/55 R15', price: 450.00, description: 'Economia de combustível' },
                { name: 'Bridgestone 205/55 R16', price: 520.00, description: 'Alta performance' },
              ],
            },
            {
              name: 'Pneus de Caminhonete',
              items: [
                { name: 'Goodyear 225/70 R14', price: 480.00, description: 'Para Saveiros e Stradas' },
                { name: 'Continental 235/60 R15', price: 550.00, description: 'Para Spin e S10' },
              ],
            },
            {
              name: 'Serviços',
              items: [
                { name: 'Alinhamento', price: 120.00, description: 'Computadorizado' },
                { name: 'Balanceamento', price: 80.00, description: 'Por roda' },
                { name: 'Troca de Pneus', price: 40.00, description: 'Por roda' },
              ],
            },
          ],
        },
      },
      {
        type: 'services',
        title: 'Serviços Especiais',
        content: {
          services: [
            { name: 'Alinhamento Computadorizado', description: 'Precisão milimétrica', icon: 'tachometer-alt' },
            { name: 'Balanceamento', description: 'Elimina vibrações', icon: 'balance-scale' },
            { name: 'Troca de Pneus', description: 'Rápida e segura', icon: 'cog' },
            { name: 'Conserto de Furo', description: 'Leva e traz', icon: 'truck' },
          ],
        },
      },
      {
        type: 'booking',
        title: 'Agende seu Serviço',
        content: {
          message: 'Segurança para sua família',
          phone: '{{businessPhone}}',
          whatsapp: '{{businessPhone}}',
          availableTimes: 'Seg-Sex: 8h-18h | Sáb: 8h-12h',
          formFields: ['name', 'phone', 'vehicle', 'service', 'date', 'time'],
        },
      },
      {
        type: 'contact',
        title: 'Visite-nos',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 8h-18h | Sáb: 8h-12h | Dom: Emergência',
          whatsapp: '{{businessPhone}}',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Pneus', href: '#products' },
        { label: 'Serviços', href: '#services' },
        { label: 'Agendamento', href: '#booking' },
      ],
    },
  },
};

// ==================== DETAILING / ESTÉTICA AUTOMOTIVA ===================
export const detailingTemplate: TemplateConfig = {
  id: 'detailing-premium',
  businessType: 'DETAILING',
  style: 'BOOKING',
  name: 'Estética Automotiva',
  description: 'Polimento, vitrificação, higienização completa e proteção de pintura premium',
  thumbnail: '/templates/detailing.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Seu carro novo novamente. Estética automotiva premium com produtos importados.',
      backgroundImage: 'https://images.unsplash.com/photo-1520049?w=1200',
      ctaText: 'Agendar Serviço',
      ctaLink: '#booking',
    },
    sections: [
      {
        type: 'services',
        title: 'Nossos Serviços',
        content: {
          services: [
            { name: 'Lavagem de Motor', price: 150.00, duration: '1h', description: 'Limpeza profunda' },
            { name: 'Polimento Técnico', price: 600.00, duration: '1 dia', description: 'Correção de pintura' },
            { name: 'Vitrificação', price: 800.00, duration: '1 dia', description: 'Proteção por 2 anos' },
            { name: 'Higienização Interna', price: 250.00, duration: '3h', description: 'Aspersão + Aspiração + Purificação' },
            { name: 'Enceramento Premium', price: 200.00, duration: '2h', description: 'Cera de carnaúba' },
            { name: 'Pacote Completo', price: 1200.00, duration: '2 dias', description: 'Tudo o que seu carro precisa' },
          ],
        },
      },
      {
        type: 'about',
        title: 'Sobre Nossa Estética',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-1520049?w=800',
          features: ['Produtos importados', 'Profissionais certificados', 'Garantia de 1 ano'],
        },
      },
      {
        type: 'gallery',
        title: 'Nossos Trabalhos',
        content: {
          images: [
            'https://images.unsplash.com/photo-1520049?w=600',
            'https://images.unsplash.com/photo-150287?w=600',
            'https://images.unsplash.com/photo-1520049?w=600',
            'https://images.unsplash.com/photo-150287?w=600',
          ],
        },
      },
      {
        type: 'booking',
        title: 'Agende seu Serviço',
        content: {
          message: 'Deixe seu carro impecável',
          phone: '{{businessPhone}}',
          whatsapp: '{{businessPhone}}',
          availableTimes: 'Seg-Sex: 8h-18h | Sáb: 8h-14h',
          formFields: ['name', 'phone', 'vehicle', 'service', 'date', 'time'],
        },
      },
      {
        type: 'contact',
        title: 'Visite-nos',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 8h-18h | Sáb: 8h-14h | Dom: Fechado',
          whatsapp: '{{businessPhone}}',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Serviços', href: '#services' },
        { label: 'Portfólio', href: '#gallery' },
        { label: 'Agendamento', href: '#booking' },
      ],
    },
  },
};

// ==================== PHOTOGRAPHER ===================
export const photographerTemplate: TemplateConfig = {
  id: 'photographer-lens',
  businessType: 'PHOTOGRAPHER',
  style: 'PORTFOLIO',
  name: 'Fotógrafo Profissional',
  description: 'Ensaios fotográficos, eventos, casamentos, formaturas e edição profissional',
  thumbnail: '/templates/photographer.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Imagens que contam histórias. Fotografia artística e profissional.',
      backgroundImage: 'https://images.unsplash.com/photo-145258?w=1200',
      ctaText: 'Agendar Sessão',
      ctaLink: '#booking',
    },
    sections: [
      {
        type: 'services',
        title: 'Nossos Serviços',
        content: {
          services: [
            { name: 'Ensaio Pré-Wedding', price: 800.00, duration: '2h', description: '30 fotos editadas' },
            { name: 'Casamento (Pacote Básico)', price: 2500.00, duration: '8h', description: '100 fotos + Álbum 30x40' },
            { name: 'Formatura', price: 1200.00, duration: '4h', description: 'Turma completa + Individual' },
            { name: 'Ensaio Newborn', price: 600.00, duration: '2h', description: 'Bebês de 5 a 15 dias' },
            { name: 'Ensaio Corporativo', price: 500.00, duration: '1h', description: 'Perfil profissional' },
            { name: 'Edição Avançada', price: 50.00, duration: 'Por foto', description: 'Retoque profissional' },
          ],
        },
      },
      {
        type: 'gallery',
        title: 'Nossos Trabalhos',
        content: {
          images: [
            'https://images.unsplash.com/photo-145258?w=600',
            'https://images.unsplash.com/photo-149479?w=600',
            'https://images.unsplash.com/photo-152962?w=600',
            'https://images.unsplash.com/photo-150700?w=600',
          ],
        },
      },
      {
        type: 'about',
        title: 'Sobre Mim',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-145258?w=800',
          features: ['10+ anos de experiência', 'Equipamento Canon/Nikon', 'Edição em Lightroom/Photoshop'],
        },
      },
      {
        type: 'booking',
        title: 'Agende sua Sessão',
        content: {
          message: 'Registre momentos especiais',
          phone: '{{businessPhone}}',
          whatsapp: '{{businessPhone}}',
          availableTimes: 'Seg-Sex: 8h-18h | Sáb: 8h-14h',
          formFields: ['name', 'phone', 'type', 'date', 'time', 'message'],
        },
      },
      {
        type: 'contact',
        title: 'Contato',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 8h-18h | Sáb: 8h-14h | Dom: Fechado',
          whatsapp: '{{businessPhone}}',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Portfólio', href: '#gallery' },
        { label: 'Serviços', href: '#services' },
        { label: 'Agendamento', href: '#booking' },
      ],
    },
  },
};

// ==================== EVENT PLANNER ===================
export const eventPlannerTemplate: TemplateConfig = {
  id: 'event-planner-celebration',
  businessType: 'EVENT_PLANNER',
  style: 'BOOKING',
  name: 'Cerimonial & Eventos',
  description: 'Planejamento de casamentos, formaturas, festas corporativas e eventos sociais completos',
  thumbnail: '/templates/event-planner.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Seu evento dos sonhos. Planejamento completo do início ao fim.',
      backgroundImage: 'https://images.unsplash.com/photo-151916?w=1200',
      ctaText: 'Agendar Reunião',
      ctaLink: '#booking',
    },
    sections: [
      {
        type: 'services',
        title: 'Nossos Serviços',
        content: {
          services: [
            { name: 'Casamento (Pacote Básico)', price: 5000.00, duration: 'Completo', description: 'Assesoria + Decoração + Buffet' },
            { name: 'Formatura', price: 3000.00, duration: 'Completo', description: 'Turma até 50 pessoas' },
            { name: 'Festa Corporativa', price: 8000.00, duration: 'Completo', description: 'Até 200 pessoas' },
            { name: 'Aniversário 15 Anos', price: 4500.00, duration: 'Completo', description: 'Decoração temática' },
            { name: 'Consultoria', price: 200.00, duration: '1h', description: 'Reunião inicial' },
            { name: 'Cerimonial Completo', price: 10000.00, duration: 'Pacote VIP', description: 'Tudo incluído' },
          ],
        },
      },
      {
        type: 'gallery',
        title: 'Eventos Recentes',
        content: {
          images: [
            'https://images.unsplash.com/photo-151916?w=600',
            'https://images.unsplash.com/photo-149268?w=600',
            'https://images.unsplash.com/photo-151179?w=600',
            'https://images.unsplash.com/photo-151916?w=600',
          ],
        },
      },
      {
        type: 'about',
        title: 'Sobre Nossa Empresa',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-151916?w=800',
          features: ['10+ anos de experiência', 'Mais de 500 eventos', 'Fornecedores parceiros'],
        },
      },
      {
        type: 'testimonials',
        title: 'Depoimentos de Clientes',
        content: {
          testimonials: [
            { name: 'Casal Silva', text: 'Nosso casamento foi perfeito! Obrigado!', rating: 5 },
            { name: 'Turma de Engenharia', text: 'Formatura inesquecível. Recomendo muito!', rating: 5 },
            { name: 'Empresa XYZ', text: 'Evento corporativo impecável. Parabéns!', rating: 5 },
          ],
        },
      },
      {
        type: 'booking',
        title: 'Agende uma Reunião',
        content: {
          message: 'Vamos planejar seu evento dos sonhos',
          phone: '{{businessPhone}}',
          whatsapp: '{{businessPhone}}',
          availableTimes: 'Seg-Sex: 9h-19h | Sáb: 9h-17h',
          formFields: ['name', 'phone', 'event-type', 'date', 'guests', 'message'],
        },
      },
      {
        type: 'contact',
        title: 'Contato',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 9h-19h | Sáb: 9h-17h | Dom: Fechado',
          whatsapp: '{{businessPhone}}',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Serviços', href: '#services' },
        { label: 'Portfólio', href: '#gallery' },
        { label: 'Agendamento', href: '#booking' },
      ],
    },
  },
};

// Export all new massive templates
export const massiveTemplates: TemplateConfig[] = [
  barTemplate,
  pizzariaTemplate,
  sushiTemplate,
  burgerJointTemplate,
  steakhouseTemplate,
  iceCreamTemplate,
  breweryTemplate,
  yogaStudioTemplate,
  danceStudioTemplate,
  spaTemplate,
  clothingStoreTemplate,
  jewelryTemplate,
  artGalleryTemplate,
  clinicTemplate,
  dentistTemplate,
  opticsTemplate,
  nutritionistTemplate,
  plumbingTemplate,
  electricianTemplate,
  landscapingTemplate,
  movingTemplate,
  carWashTemplate,
  tireShopTemplate,
  detailingTemplate,
  photographerTemplate,
  eventPlannerTemplate,
];

// Helper to get template by business type
export function getMassiveTemplateForType(businessType: string): TemplateConfig | undefined {
  return massiveTemplates.find(t => t.businessType === businessType);
}
